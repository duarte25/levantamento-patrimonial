import messages from "../../utils/mensagens.js";

export const inventarioPaths = {
  "/inventarios": {
    get: {
      tags: ["Inventários"],
      summary: "Listar inventários",
      description: "Retorna uma lista de todos os inventários",
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Inventario"
                }
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
      tags: ["Inventários"],
      summary: "Cadastrar inventário",
      description: "Cadastra um novo inventário",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Inventario"
            }
          }
        }
      },
      responses: {
        201: {
          description: messages.httpCodes[201],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Inventario"
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
  "/inventarios/{id}": {
    get: {
      tags: ["Inventários"],
      summary: "Buscar um inventário por ID",
      description: "Retorna um inventário pelo seu ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do inventário",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Inventario"
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
      tags: ["Inventários"],
      summary: "Atualizar inventário",
      description: "Atualiza o inventário",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do inventário",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Inventario"
            }
          }
        }
      },
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Inventario"
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
      tags: ["Inventários"],
      summary: "Deletar inventário",
      description: "Deleta o inventário",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do inventário",
          required: true,
          schema: {
            type: "string"
          }
        }
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
