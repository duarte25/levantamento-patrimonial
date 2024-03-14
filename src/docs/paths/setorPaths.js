export const setorPaths = {
    "/buscarSetores": {
      post: {
        tags: ["Setores"],
        summary: "Cadastrar um novo setor",
        description: "Faça o cadastro de um novo setor.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Setor",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Setor cadastrado com sucesso!",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Setor",
                },
              },
            },
          },
          500: {
            description: "Erro interno no servidor.",
          },
        },
      },
    },
      get: {
        tags: ["Setores"],
        summary: "Listar todos os setores",
        description: "Retorna uma lista de todos os setores cadastrados.",
        responses: {
          200: {
            description: "Retorna os setores cadastrados.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Setor",
                },
              },
            },
          },
          500: {
            description: "Erro interno no servidor.",
          },
        },
      },
      
    "/setores/{id}": {
      get: {
        tags: ["Setores"],
        summary: "Buscar setor por ID",
        description: "Retorna um setor com base no ID fornecido.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "ID do setor",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorna o setor encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Setor",
                },
              },
            },
          },
          404: {
            description: "Setor não encontrado!",
          },
          500: {
            description: "Erro interno no servidor.",
          },
        },
      },
      patch: {
        tags: ["Setores"],
        summary: "Atualizar um setor",
        description: "Atualiza um setor existente com novos dados.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "ID do setor",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Setor",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Setor atualizado com sucesso!",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Setor",
                },
              },
            },
          },
          404: {
            description: "Setor não encontrado!",
          },
          500: {
            description: "Erro interno no servidor.",
          },
        },
      },
      delete: {
        tags: ["Setores"],
        summary: "Excluir um setor",
        description: "Remove um setor com base no ID fornecido.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "ID do setor",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Setor excluído com sucesso!",
          },
          404: {
            description: "Setor não encontrado!",
          },
          500: {
            description: "Erro interno no servidor.",
          },
        },
      },
    },
  };
  