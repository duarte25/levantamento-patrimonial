export const itensPaths = {
  "/itens": {
    post: {
      tags: ["Itens"],
      summary: "Cadastra um item no Inventário",
      description: "Faça o cadastro de um item no inventário.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Itens",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Item cadastrado com sucesso!",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Itens",
              },
            },
          },
        },
        500: {
          description: "Erro interno no servidor",
        },
      },
    },
  },
  "/itens": {
    get: {
      tags: ["Itens"],
      summary: "Lista todos os itens",
      description:
        "Retorna uma lista de todos os itens cadastrados no inventário.",
      responses: {
        200: {
          description: "Retorna os itens cadastrados no inventário.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Itens",
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
  "/itens/{id}": {
    patch: {
      tags: ["Itens"],
      summary: "Atualiza um item no Inventário",
      description: "Atualize um item no inventário.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do item",
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
              $ref: "#/components/schemas/Itens",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Item atualizado com sucesso!",
        },
        404: {
          description: "Item não encontrado!",
        },
        500: {
          description: "Erro interno no servidor.",
        },
      },
    },
  },
    delete: {
      tags: ["Itens"],
      summary: "Remove um item do Inventário",
      description: "Remova um item do inventário.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do item",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Item removido com sucesso!",
        },
        404: {
          description: "Item não encontrado!",
        },
        500: {
          description: "Erro interno no servidor.",
        },
      },
    },
  
};
