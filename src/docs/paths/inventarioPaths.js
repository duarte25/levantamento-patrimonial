import messages from "../../utils/mensagens.js";

export const inventarioPaths = {
  "/inventarios": {
    get: {
      tags: ["Inventarios"],
      summary: "Listar todos os itens do inventário",
      description: "Retorna uma lista de todos os itens do inventário",
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
      tags: ["Inventarios"],
      summary: "Cadastrar Item no inventário",
      description: "Cadastra um novo item no inventário",
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
      tags: ["Inventarios"],
      summary: "Buscar item do inventário por ID",
      description: "Retorna um item do inventário pelo seu ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do item do inventário",
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
      tags: ["Inventarios"],
      summary: "Atualizar item do inventário",
      description: "Atualiza um item do inventário",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do item do inventário",
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
      tags: ["Inventarios"],
      summary: "Deletar item do inventário",
      description: "Deleta um item do inventário",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do item do inventário",
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
