import messages from "../../utils/mensagens.js";

export const usuarioPaths = {
  "/usuarios": {
    get: {
      tags: ["Usuários"],
      summary: "Listar Usuários",
      description: "Lista todos os usuários",
      parameters: [
        {
          name: "pagina",
          in: "query",
          description: "Pagina",
          required: false,
          schema: {
            type: "integer"
          }
        },
        {
          name: "cpf",
          in: "query",
          description: "CPF do usuário",
          required: false,
          schema: {
            type: "number"
          }
        },
      ],
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Usuario"
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
      tags: ["Usuários"],
      summary: "Criar Usuário",
      description: "Cria um novo usuário",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Usuario"
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
                $ref: "#/components/schemas/Usuario"
              }
            }
          }
        },
        500: {
          description: messages.httpCodes[500],
        }
      }
    },
  },
  "/usuarios/{id}": {
    get: {
      tags: ["Usuários"],
      summary: "Obter Usuário por ID",
      description: "Retorna um usuário por ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do usuário",
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
                $ref: "#/components/schemas/Usuario"
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
      tags: ["Usuários"],
      summary: "Atualizar Usuário",
      description: "Atualiza um usuário",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do usuário",
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
              $ref: "#/components/schemas/Usuario"
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
                $ref: "#/components/schemas/Usuario"
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
      tags: ["Usuários"],
      summary: "Deletar Usuário",
      description: "Deleta um usuário por ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do usuário",
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
