
const relatorioPath = {
    "/relatorio/itens": {
        get: {
            tags: ["Relatórios"],
            summary: "Gerar relatório em PDF",
            description: "Essa rota gera um relatório em PDF com todos os usuários cadastrados",
            parameters:[
                {
                    in: "query",
                    name: "etiqueta",
                    required: false,
                    description: "Etiqueta do item",
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "nao_tiquetado",
                    required: false,
                    description: "Item não tiquetado",
                    schema: {
                        type: "boolean"
                    }
                },
                {
                    in: "query",
                    name: "encontrado",
                    required: false,
                    description: "Item encontrado",
                    schema: {
                        type: "boolean"
                    }
                },
                {
                    in: "query",
                    name: "estado",
                    required: false,
                    description: "Estado do item",
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "ativo",
                    required: false,
                    description: "Item ativo",
                    schema: {
                        type: "boolean"
                    }
                },
                {
                    in: "query",
                    name: "ocioso",
                    required: false,
                    description: "Item ocioso",
                    schema: {
                        type: "boolean" 
                    }
                },
                {
                    in: "query",
                    name: "inventario",
                    required: false,
                    description: "Inventário do item",
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "setor",
                    required: false,
                    description: "Setor do item",
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "auditor",
                    required: false,
                    description: "Auditor do item",
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "responsavel",
                    required: false,
                    description: "Responsável pelo item",
                    schema: {
                        type: "string"
                    }
                }
            ],
            operationId: "gerarPdf",
            responses: {
                200: {
                    description: "Relatório gerado com sucesso"
                },
                401: {
                    description: "Não autorizado"
                },
                500: {
                    description: "Erro interno do servidor"
                }
            }
        }
    }
}

export default relatorioPath;