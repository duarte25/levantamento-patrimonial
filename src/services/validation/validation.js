import mongoose from "mongoose";
import messages from "../../utils/mensagens.js";

import { isCPF, isCNPJ, isCNH } from "validation-br";

// Acessar objeto com caminho "a.b.c"
const getValueByPath = (obj, path) => {
    if(!path.includes(".")) 
        return obj[path];

    let parts = path.split(".");
    let current = obj;
    for(let p of parts) {
        if(current === undefined || current === null || current[p] === undefined) return undefined;
        current = current[p];
    }
    return current;
    //return path.split(".").reduce((o, i) => o[i], obj);
};

const setValueByPath = (obj, path, value) => {
    if(!path.includes(".")) {
        obj[path] = value;
        return;
    }

    let parts = path.split(".");
    let lastPart = parts.pop();
    let current = obj;
    for(let p of parts) {
        if(current[p] === undefined || current[p] === null ) current[p] = {};
        current = current[p];
    }
    current[lastPart] = value;
};

export class ValidationResult {
    constructor(path, body) {
        this.path = path;
        this.body = body;
        this.error = false;
    }

    hasError() {
        return this.error !== false;
    }

    getValue() {
        return getValueByPath(this.body, this.path);
    }

    setValue(newValue) {
        setValueByPath(this.body, this.path, newValue);
    }

    // toString
    toString() {
        return JSON.stringify({
            path: this.path,
            value: getValueByPath(this.body, this.path),
            error: this.error
        });
    }
}

/**
    A ideia é que as funções que serão usadas para
    validação sejam fácil de acessar e reutilizar.

    O funcionamento é que você irá criar um novo validador e então
    chamar a função validate para cada um dos
    campos que deseja validar. 
    
    Como argumento ao chamar a função validate, além do nome e valor do campo, 
    é passado todas as funções de validação que serão executadas, parando na primeira que der erro.

    @example
    // Exemplo de uso:
    let val = new Validator(req.body);

    await val.validate("nome", v.required(), v.trim(), v.length({ min: 4, max: 200 }));
    await val.validate("cpf",
            v.required(),
            v.CPF(),
            v.unique({ model: Motorista, query: { cpf: req.body.cpf } })
    );
    await val.validate("data_admissao",
            v.required(),
            v.toUTCDate(),
            v.max({ max: new Date() })
    );

    if (val.anyErrors()) return sendError(res, 422, val.getErrors());

    // Apenas mantém os valores sanitizados
    req.body = val.getSanitizedBody();
*/
export class Validator {

    constructor(bodyObj) {
        if(bodyObj === undefined || typeof bodyObj !== "object" || bodyObj === null)
            throw new Error("O construtor de Validator deve receber um objeto body com os valores a serem validados!");

        this.validations = {};
        this.body = bodyObj;
    }

    /**
     * Valida o campo 'path' usando as funções 'funcoes'.
     * Obs: Pode utilizar . para subcampos, ex: "endereco.cep"
     * Obs: Utilize await é uma função async
     */
    async validate(path, ...funcoes) {
        let val = new ValidationResult(path, this.body);
        this.validations[path] = val;

        for (let funcao of funcoes) {
            let continuar = await funcao(val.getValue(), val);

            if(continuar === true) {
                // continua nas verificações
            } else {
                // Se retornar qualquer coisa que não seja true, não continua
                val.error = continuar;
                return this;
            }
        }
        return this;
    }

    /**
     * Verifica se existe algum erro nas validações, retornando falso quando não houver nenhum erro
     */
    anyErrors() {
        return Object.keys(this.validations).some((path) => !this.isValid(path));
    }

    /**
     * Retorna um array com todos os erros encontrados, ou um array vazio caso não haja nenhum
     */
    getErrors() {
        const errosFiltrados = Object.keys(this.validations).filter((path) => !this.isValid(path));
        if (errosFiltrados.length > 0) {
            return errosFiltrados.map((path) => {
                return {
                    message: this.validations[path].error,
                    path: path
                };
            });
        } else {
            return [];
        }
    }

    /**
     * Retorna um objeto com todos os valores sanitizados que passaram pelo validador
     * (Ignorando valores undefined)
     */
    getSanitizedBody() {
        let sanitizedBody = {};
        Object.keys(this.validations).forEach((path) => {
            let value = this.validations[path].getValue();
            if(value !== undefined) {
                setValueByPath(sanitizedBody, path, value);
            }
        });
        return sanitizedBody;
    }

    /**
     * Retorna o valor sanitizado do campo 'name' 
     */
    getValue(path) {
        if(this.validations[path] === undefined) return undefined;
        
        return this.validations[path].getValue();
    }

    /**
     * Retorna verdadeiro caso o campo 'name' tenha passado por todas as validações sem erros
     */
    isValid(path) {
        return path in this.validations 
            && this.validations[path] !== undefined 
            && this.validations[path].error === false;
    }
}

/**
 * Funções de validação
 * 
 * Aqui estão contidas todas as funções de validação que podem ser usadas
 * 
 * Veja que as funções retornam uma função,  com a possibilidade de configurar com um objeto de opções como ela deve se comportar
 * 
 * Sempre comece com v.required() ou v.optional() para definir se o campo é obrigatório ou não e não causar erros nas próximas validações
 * @example
 * // Exemplo de uso:
 * let val = new Validator();
 * await val.validate("nome", nome, v.required(), v.trim(), v.length({ min: 4, max: 200 }));
 */
export class ValidationFuncs {
    // ---------------------------------------------------
    // Funções de sanitização
    // ---------------------------------------------------

    static trim = (opcoes = {allowEmpty: false}) => async (value, val) => {
        if (typeof value?.trim !== "function") return opcoes.message || messages.validationGeneric.invalid(val.path).message;

        value = value.trim();
        val.setValue(value);

        if (!opcoes.allowEmpty && !value) {
            return opcoes.message || messages.validationGeneric.fieldIsRequired(val.path).message;
        }

        return true;
    };

    static toLowerCase = (opcoes = {}) => async (value, val) => {
        if (typeof value?.toLowerCase !== "function") return opcoes.message || messages.validationGeneric.invalid(val.path).message;

        val.setValue(value.toLowerCase());
        return true;
    };

    static toUpperCase = (opcoes = {}) => async (value, val) => {
        if (typeof value?.toUpperCase !== "function") return opcoes.message || messages.validationGeneric.invalid(val.path).message;

        val.setValue(value.toUpperCase());
        return true;
    };

    static toFloat = (opcoes = {}) => async (value, val) => {
        value = parseFloat(value);

        if (isNaN(value)) {
            return opcoes.message || messages.validationGeneric.invalid(val.path).message;
        }

        val.setValue(value);
        return true;
    };

    static toInt = (opcoes = {}) => async (value, val) => {
        value = parseInt(value);

        if (isNaN(value)) {
            return opcoes.message || messages.validationGeneric.invalid(val.path).message;
        }

        val.setValue(value);
        return true;
    };

    static toBoolean = (opcoes = {}) => async (value, val) => {
        val.setValue(value == "true" ? true : false);
        return true;
    };

    /**
     * Converte o valor para um objeto do Mongoose ou dá erro que o valor não foi encontrado
     */
    static toMongooseObj = (opcoes = {model: false, query: false}) => async (value, val) => {
        const path = val.path;

        if(opcoes.model === false) throw new Error("A função de validação existe deve receber o Model que irá pesquisar!");

        let resultado = await opcoes.model.findOne(opcoes.query || {[path]: value});
        if (!resultado) {
            return opcoes.message || messages.validationGeneric.notFound(path).message;
        }

        val.setValue(resultado);
        return true;
    };

    /**
     * Converte o valor para um Date do javascript (Com informação da hora) ou dá erro que o valor é inválido
     * Formatos aceitos:
     * YYYY-MM-DDTHH:mm
     * YYYY-MM-DDTHH:mm:ss
     * YYYY-MM-DDTHH:mm:ss.sss
     * (data)Z (UTC)
     * (data)[+-]HH:mm (com timezone offset)
     * 
     * Datas sem informação de timezone serão convertidas usando tempo local
     * 
     * Obs: se defaultTimezoneLocal for falso, então datas sem timezone serão convertidas usando o tempo UTC
     */
    static toDateTime = (opcoes = {defaultTimezoneLocal: true}) => async (value, val) => {
        let dateString;
        // Se é uma data apenas com a data, sem hora, então adiciona a hora 00:00:00
        // Pois caso contrário a data será interpretada como UTC
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
        // When the time zone offset is absent, date-only forms are interpreted as a UTC time and date-time forms are interpreted as local time. 
        // This is due to a historical spec error that was not consistent with ISO 8601 but could not be changed due to web compatibility.
        // See Also: https://maggiepint.com/2017/04/11/fixing-javascript-date-web-compatibility-and-reality/
        // --------------------------------------------------------------------------------------------------------
        // Sem informação de hora, a data é interpretada como UTC
        //  new Date('2017-04-08').toISOString()
        //  "2017-04-08T00:00:00.000Z"
        // Com informação de hora, a data é interpretada como local
        //  new Date('2017-04-08T08:30').toISOString() 
        //  "2017-04-08T15:30:00.000Z"
        if(/^\d\d\d\d\-\d\d\-\d\dT\d\d\:\d\d(\:\d\d(\.\d+)?)?([+-]\d\d\:\d\d|Z)?$/.test(value)) {
            // YYYY-MM-DDTHH:mm, YYYY-MM-DDTHH:mm:ss, YYYY-MM-DDTHH:mm:ss.sss (with or without timezone offset +HH:mm or Z)
            if(!opcoes.defaultTimezoneLocal && !value.endsWith("Z") && !(/^.*[+-]\d\d\:\d\d$/.test(value))) {
                // Se não possui timezone e deve ser default UTC, então adiciona Z para indicar que é UTC
                dateString = value + "Z";
            }
            dateString = value;
        } else {
            return opcoes.message || messages.customValidation.invalidDate;
        }

        // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
        let timestamp = Date.parse(dateString);
        if (isNaN(timestamp)) {
            return opcoes.message || messages.customValidation.invalidDate;
        }

        // Se passou, então é uma data válida, então converte para um objeto Date
        val.setValue(new Date(timestamp));
        return true;
    };

    /** Não aceita parte de hora, apenas Ano, Mes, Dia
     * Retorna um objeto Date do javascript (utilizando UTC, ignora timezone)
     * 
     * Formatos aceitos:
     * YYYY-MM
     * YYYY-MM-DD
    */
    static toUTCDate = (opcoes = {}) => async (value, val) => {
        let dateString;
        if(/^\d\d\d\d\-\d\d\-\d\d$/.test(value)) { // YYYY-MM-DD
            dateString = value + "T00:00:00Z";
        } else if(/^\d\d\d\d\-\d\d$/.test(value)) { // YYYY-MM
            dateString = value + "-01T00:00:00Z";
        } else {
            return opcoes.message || messages.customValidation.invalidDate;
        }

        // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
        let timestamp = Date.parse(dateString);
        if (isNaN(timestamp)) {
            return opcoes.message || messages.customValidation.invalidDate;
        }

        // Se passou, então é uma data válida, então converte para um objeto Date
        val.setValue(new Date(timestamp));
        return true;
    };

    // ---------------------------------------------------
    // Funções de validação genéricas, isto é, sem regras de negócio específicas
    // ---------------------------------------------------

    /** Se não existir irá parar as validações (sem dar erro). */ 
    static optional = (opcoes = {}) => async (value) => {
        if (value === undefined) return false;
        else return true;
    };

    /** Se não existir irá parar as validações (com erro). */
    static required = (opcoes = {}) => async (value, val) => {
        if (value === undefined) {
            return opcoes.message || messages.validationGeneric.fieldIsRequired(val.path).message;
        } else return true;
    };

    /** Se não existir continua com o valor default */
    static requiredOrDefault = (opcoes = {default: ""}) => async (value, val) => {
        if (!value) {
            val.setValue(opcoes.default);
        }
        
        return true;
    };

    /**
     * Pesquisa no banco Mongo se existe este valor, se existir irá parar as validações
     */
    static unique = (opcoes = {model: false, query: false}) => async (value, val) => {
        if(opcoes.model === false) throw new Error("A função de validação unique deve receber o Model que irá pesquisar!");

        let resultado = await opcoes.model.findOne(opcoes.query || {[val.path]: value});
        if (resultado) {
            return opcoes.message || messages.validationGeneric.fieldIsRepeated(val.path).message;
        } else return true;
    };

    /**
     * Pesquisa no banco Mongo se existe este valor, se não existir irá parar as validações
     */
    static exists = (opcoes = {model: false, query: false}) => async (value, val) => {
        if(opcoes.model === false) throw new Error("A função de validação exists deve receber o Model que irá pesquisar!");

        let resultado = await opcoes.model.findOne(opcoes.query || {[val.path]: value});
        if (!resultado) {
            return opcoes.message || messages.validationGeneric.notFound(val.path).message;
        } else return true;
    };

    /**
     * Verifica se o valor se está entre min e max caracteres (Deve ser uma string, produz erro se o valor for undefined)
     */
    static length = (opcoes = {max: false, min: false}) => async (value, val) => {
        if(opcoes.min === false && opcoes.max === false) throw new Error("A função de validação length deve receber um objeto com as propriedades min e/ou max");
        if(value === undefined) throw new Error("A função de validação length não consegue verificar o tamanho de um valor undefined");

        if (opcoes.min !== false && value.length < opcoes.min) {
            return opcoes.message || messages.validationGeneric.invalidInputFormatForField(val.path).message;
        } 

        if (opcoes.max !== false && value.length > opcoes.max) {
            return opcoes.message || messages.validationGeneric.invalidInputFormatForField(val.path).message;
        } 
        
        return true;
    };

    static regex = (opcoes = {regex: false}) => async (value, val) => {
        if(opcoes.regex === false) throw new Error("A função de validação regex deve receber um objeto com a propriedade regex");

        if (!opcoes.regex.test(value)) {
            return opcoes.message || messages.validationGeneric.invalidInputFormatForField(val.path).message;
        } else return true;
    };

    static enum = (opcoes = {values: []}) => async (value, val) => {
        if(!Array.isArray(opcoes) || opcoes.length === 0) throw new Error("A função de validação enum deve receber um array values");

        if (!opcoes.includes(value)) {
            return opcoes.message || messages.validationGeneric.mustBeOneOf(val.path,opcoes).message;
        } else return true;
    };

    static min = (opcoes = {min: false}) => async (value, val) => {
        if(opcoes.min === false) throw new Error("A função de validação min deve receber o valor mínimo min");

        if (value < opcoes.min) {
            return opcoes.message || messages.validationGeneric.invalidInputFormatForField(val.path).message;
        } else return true;
    };

    static max = (opcoes = {max: false}) => async (value, val) => {
        if(opcoes.max === false) throw new Error("A função de validação max deve receber o valor máximo max");

        if (value > opcoes.max) {
            return opcoes.message || messages.validationGeneric.invalidInputFormatForField(val.path).message;
        } else return true;
    };

    // ---------------------------------------------------
    // Funções de validação para campos específicos
    // (Insira mais funções aqui, se necessário)
    // ---------------------------------------------------

    /**
     * Verifica se o valor é um id do Mongoose válido
     */
    static mongooseID = (opcoes = {}) => async (value, val) => {
        if(!mongoose.Types.ObjectId.isValid(value)) {
            return opcoes.message || messages.validationGeneric.invalid(val.path).message;
        } else return true;
    };

    static CPF = (opcoes = {}) => async (value, val) => {
        if (!isCPF(value)) {
            return opcoes.message || messages.validationGeneric.invalidInputFormatForField(val.path).message;
        } else return true;
    };

    /**
     * Calcula se a idade de alguém que nasceu nesta data de nascimento está entre min e max (em anos)
     * 
     * Obs: Deve chamar v.toDate() antes de chamar esta função, pois ela espera o valor como um objeto Date
     * 
     * @example
     * let val = new Validator();
     * await val.validate("data_nascimento", data_nascimento,
     *     v.required(),
     *     v.toDate(),
     *     v.birthdateAge({ min: 18 })
     * );
     */
    static birthdateAge = (opcoes = {max: 120, min: 18}) => async (value, val) => {
        if(value instanceof Date === false) throw new Error("A função de validação data de nascimento deve ser precedida de uma sanitização v.toDate()");
        // https://stackoverflow.com/questions/7091130/how-can-i-validate-that-someone-is-over-18-from-their-date-of-birth
        let nascimento = value;
        let hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        let mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        if (opcoes.min !== false && (idade < opcoes.min)) {
            return opcoes.message || messages.customValidation.invalidDataNascimento.message;
        }

        if (opcoes.max !== false && (idade > opcoes.max)) {
            return opcoes.message || messages.customValidation.invalidDataNascimento.message;
        }
        
        return true;
    };

    static CNH = (opcoes = {}) => async (value, val) => {
        if (!isCNH(value)) {
            return opcoes.message || messages.validationGeneric.invalidInputFormatForField(val.path).message;
        } else return true;
    };

    static CEP = (opcoes = {}) => ValidationFuncs.regex({regex: /^\d{8}$/, message: opcoes.message});

    static telephone = (opcoes = {}) => ValidationFuncs.regex({regex: /^\d{11}$/, message: opcoes.message});

    static email = (opcoes = {}) => ValidationFuncs.regex({regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: opcoes.message});


    // =============================================================
    //                    EXEMPLO DE FUNÇÃO
    // =============================================================
    // Veja que para criar a sua própria função de validação, deve seguir este formato:
    // - Recebe um objeto opcoes e retorna uma função de validação
    // - A função de validação deve ser async
    // - A função de validação recebe como parâmetro um único objeto contendo as chaves name e value, desestruturado no exemplo para ficar mais fácil de usar
    // - e deve retornar:
    //    - true se a validação passou,
    //    - false se deve parar as próximas validações sem causar erro
    //    - uma string com a mensagem de erro, que deve ser mensagem passada em opcoes, ou uma mensagem padrão quando não for passada
    // O exemplo abaixo produz um erro caso o conteúdo do campo não seja igual à "EXEMPLO"
    static EXEMPLO_VALIDADOR = (opcoes = {}) => async (value, val) => {
        if(value != "EXEMPLO") {
            return opcoes.message || val.path+" deve ser igual a 'EXEMPLO'";
        }

        return true;
    };

    // Caso queira fazer um sanitizador, siga o mesmo formato, 
    // Porém alterando o valor da chave 'value' do objeto recebido como parâmetro
    // O exemplo abaixo irá deixar TUDO EM MAIÚSCULAS no campo que for aplicado
    static EXEMPLO_SANITIZADOR = (opcoes = {}) => async (value, val) => {
        
        val.setValue(value.toUpperCase());
        return true;
    };
}
