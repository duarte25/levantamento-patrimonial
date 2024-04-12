
export const usuarioSchema = {
	Usuario: {
		type: "object",
		properties: {
			nome: {
				type: "string",
				description: "Nome do usuário",
				example: "João da Silva"
			},
			cpf: {
				type: "string",
				description: "CPF do usuário",
				example: "89601807004"
			},
			email: {
				type: "string",
				description: "E-mail do usuário",
				example: "joao@example.com"
			},
			senha: {
				type: "string",
				description: "Senha do usuário",
				example: "Senha123@"
			},
			ativo: {
				type: "boolean",
				description: "Se o usuário está ativo",
				example: true
			}
		}
	}
};
