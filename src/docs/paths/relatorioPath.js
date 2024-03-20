
const relatorioPath = {
    "/relatorio": {
        get: {
            tags: ["Relatórios"],
            summary: "Gerar relatório em PDF",
            description: "Essa rota gera um relatório em PDF com todos os usuários cadastrados",
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