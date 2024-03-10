const messages = {

    // Mensagens para respostas via rotas da api
    httpCodes: {
        200: "Requisição bem sucedida!",
        201: "Requisição bem sucedida, recurso foi criado!",
        202: "Requisição aceita para processamento em andamento!",
        204: "Requisição bem sucedida, sem conteúdo para retornar!",
        205: "Requisição precisa de mais dados para ser processada!",
        206: "Requisição bem sucedida, porém apenas parte do recurso foi retornada!",
        207: "Requisição bem sucedida, mas a resposta possui mais de um recurso associado!",
        208: "Requisição bem sucedida, mas o conteúdo retornado não é mais válido!",

        300: "Requisição bem sucedida, mas requisição tem múltiplas respostas possíveis, cliente deve escolher uma!",
        301: "O recurso solicitado foi movido permanentemente para um novo endereço!",
        302: "O recurso solicitado foi encontrado, mas foi movido temporariamente para um novo endereço!",
        303: "Recurso encontrado, mas atenção a referência mais adequada a seguir!",
        304: "A requisição foi bem sucedida, cliente possui a versãomais atualizada!",
        305: "Recurso solicitado só está disponível por meio do proxy",
        307: "O recurso solicitado foi temporariamente movido para um novo endereço!",
        308: "O recurso solicitado foi permanentemente movido para um novo endereço!",

        400: "Requisição com sintaxe incorreta ou outros problemas!",
        401: "Cliente sem credenciais para acessar o recurso solicitado!",
        403: "Sem permissão para atender a requisição!",
        404: "O recurso solicitado não foi encontrado no servidor!",
        405: "O método HTTP não é suportado para o recurso solicitado!",
        408: "O servidor terminou a conexão, requisição levou muito tempo!",
        409: "A requisição do cliente em conflito com o estado atual do servidor!",
        410: "O recurso solicitado não está mais disponível no servidor!",
        413: "O servidor recusou a requisição porque o corpo da requisição é muito grande!",
        422: "A requisição foi mal sucedida, falha na validação!",
        423: "Recurso bloqueado!",
        431: "Cabeçalhos da requisição são muito grandes!",
        451: "Acesso negado por motivos legais!",
        498: "Acesso negado devido o token ser inválido!",

        500: "Servidor encontrou um erro interno!",
        501: "Funcionalidade não suportada!",
        502: "O servidor atuando como gateway ou proxy recebeu uma resposta inválida!",
        503: "O servidor está temporariamente indisponível, em manutenção ou em sobrecarga!"
    },

    // Mensagens informativas
    info: {
        welcome: "Bem-vindo à nossa aplicação!",
        userLoggedIn: (username) => `Usuário ${username} logado com sucesso!`,
    },

    success: {
        success: "Operação concluída com sucesso!",
    },

    error: {
        error: "Ocorreu um erro ao processar a solicitação!",
        serverError: "Erro interno do servidor, Tente novamente mais tarde!",
        invalidRequest: "Requisição inválida, Verifique os parâmetros fornecidos!",
        unauthorizedAccess: "Acesso não autorizado, Faça login para continuar!",
        invalidURL: "URL inválida, Verifique a URL fornecida!",
        unsupportedOperation: "Operação não suportada neste contexto!",
        dataParsingError: "Erro ao analisar os dados recebidos!",
        externalServiceError: "Erro ao se comunicar com um serviço externo!",
        invalidApiKey: "Chave de API inválida!",
        operationCanceled: "Operação cancelada pelo usuário!",
        resourceNotFound: (id) => `O campo ${id} não foi encontrado!`,
        invalidID: "O ID informado deve estar em um formato válido (12 bytes)!"
    },

    // Mensagens de validação genéricas
    validationGeneric: {
        // deve retornar um objeto com a propriedade message
        fieldIsRequired: (fieldName) => {
            return { message: `O campo ${fieldName} é obrigatório!` };
        },
        fieldIsRepeated: (fieldName) => {
            return { message: `O campo ${fieldName} informado já está cadastrado!` };
        },
        invalidInputFormatForField: (fieldName) => {
            return { message: `Formato de entrada inválido para o campo ${fieldName}!` };
        },
        resourceInUse: (fieldName) => {
            return { message:`Recurso em uso em ${fieldName}!` };
        },
        invalid: (fieldName) => {
            return { message: `Valor informado em ${fieldName} é inválido!` };
        },
        mascCamp: (campo) => {
            return { message: `${campo} não encontrado!` };
        },
        femCamp: (campo) => {
            return { message: `${campo} não encontrada!` };
        },
        notFound: (fieldName) => {
            return { message: `Nenhum registro encontrado com este ${fieldName}.` };
        },
        mustBeOneOf: (fieldName, values) => {
            return { message: `O campo ${fieldName} deve ser um dos seguintes valores: ${values.join(", ")}` };
        }

    },

    // Mensagens de validação personalizadas
    customValidation: {
        invalidCPF: "CPF inválido, Verifique o formato e tente novamente!",
        invalidCNPJ: "CNPJ inválido, Verifique o formato e tente novamente!",
        invalidCEP: "CEP inválido, Verifique o formato e tente novamente!",
        invalidPhoneNumber: "Número de telefone inválido, Verifique o formato e tente novamente!",
        invalidMail: "Email no formato inválido!",
        invalidYear: "Ano inválido, Verifique o formato e tente novamente!",
        invalidDate: "Data inválida, Verifique o formato e tente novamente!",
        invalidKilometerInitial: "Quilometragem inicial inválida!",
        invalidKilometer: "Quilometragem inválida!",
        invalidDatePast: "Data do inicio deve ser uma data atual ou futura!",
        invalidDateFuture: "A data de conclusão deve ser maior do que a data de inicio!",
        invalidDateCurrent: "Data do inicio deve ser uma data atual ou passada!",
        invalidDateMonths: "A data final da vigência não pode ser um período maior que 12 meses após a data de início da vigência!",
        invalidDataNascimento: "Data de nascimento deve ser uma data passada e maior que 18!",
        invalidDataAdmissao: "Data de admissão deve ser uma data atual ou passada!",
    },


    auth: {
        authenticationFailed: "Falha na autenticação! Credenciais inválidas!",
        userNotFound: (userId) => `Usuário com ID ${userId} não encontrado!`,

        invalidPermission: "Permissão insuficiente para executar a operação!",
        duplicateEntry: (fieldName) => `Já existe um registro com o mesmo ${fieldName}!`,

        accountLocked: "Conta bloqueada! Entre em contato com o suporte!",
        invalidToken: "Token inválido, Faça login novamente!",

        timeoutError: "Tempo de espera excedido, Tente novamente mais tarde!",
        databaseConnectionError: "Erro de conexão com o banco de dados, Tente novamente mais tarde!",
        emailAlreadyExists: (email) => `O endereço de e-mail ${email} já está em uso!`,

        invalidCredentials: "Credenciais inválidas! Verifique seu usuário e senha!",
    },
};


/**
 * Envia uma resposta de erro com o código e a mensagem especificada
 * de acordo com o padrão de envio de respostas da API
 * 
 * @example
 * //Exemplos de diferentes formas aceitáveis de usar:
 * sendError(res, 400, "Mensagem de erro")
 * sendError(res, 400, [{message:"msg A"}, {message:"msg B"}])
 * sendError(res, 400, {message:"Campo Obrigatório", field:"senha"})
 */
export const sendError = (res,code, errors = []) => {
    // Detecta diferentes formas de usar:
    let _errors = undefined;
    if(Array.isArray(errors)) { 
        // Se for um array de erros --> sendError(res, 400, [{message:"A"},{message:"B"}])
        _errors = errors;
    } else if(typeof errors === "object" && errors.message !== undefined) {
        // Se for um objeto com a propriedade message --> sendError(res, 400, {message:"A"})
        _errors = [errors];
    } else {
        // Se for uma string ou qualquer outro tipo --> sendError(res, 400, "A")
        _errors = [{message: ""+errors}];
    }
    return res.status(code).json({
        data: [],
        error: true,
        code: code,
        message: messages.httpCodes[code],
        errors: _errors,
    });
};

/**
 * Envia uma resposta com o código e a mensagem especificada
 * de acordo com o padrão de envio de respostas da API
 * 
 * @example
 * sendResponse(res, 200, {
 *    data: usuario
 * });
 */
export const sendResponse = (res,code, resp = {}) => {
    return res.status(code).json({
        ...{
            data: [],
            error: false,
            code: code,
            message: messages.httpCodes[code],
            errors: []
        }, ...resp
    });
};

export default messages;
