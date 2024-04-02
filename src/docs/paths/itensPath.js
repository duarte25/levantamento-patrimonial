
import messages from "../../utils/mensagens.js";

export const itensPaths = {
  "/itens": {
    get: {
      tags: ["Itens"],
      summary: "Listar itens",
      description:
        "Retorna uma lista de todos os itens cadastrados no inventário.",
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Itens",
              }
            }
          }
        },
        500: {
          description: messages.httpCodes[500],
        }
      }
    },

    post: {
      tags: ["Itens"],
      summary: "Cadastrar Item",
      description: "Cadastra um novo item no inventário.",
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
          description: messages.httpCodes[201],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Itens",
              }
            }
          }
        },
        500: {
          description: messages.httpCodes[500],
        }
      }
    }
  },
  
  "/itens/{id}": {
    get: {
      tags: ["Itens"],
      summary: "Buscar Item por ID",
      description: "Retorna um item pelo ID do inventário.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do item",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Itens"
              }
            }
          }
        },
        500: {
          description: messages.httpCodes[500],
        }
      }
    },
    patch: {
      tags: ["Itens"],
      summary: "Atualizar Item",
      description: "Atualiza um item no inventário.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do item",
          required: true,
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
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Itens"
              }
            }
          }
        },
        500: {
          description: messages.httpCodes[500],
        }
      }
    },

    delete: {
      tags: ["Itens"],
      summary: "Deletar Item",
      description: "Deleta um item do inventário.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do item",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          description: messages.httpCodes[204]
        },
        404: {
          description: messages.httpCodes[404]
        },
        500: {
          description: messages.httpCodes[500],
        }
      }
    }
  }
};
