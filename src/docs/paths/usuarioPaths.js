import messages from "../../utils/mensagens.js";

export const usuarioPath = {
  "/usuarios": {
    get: {
      tags: ["Usuário"],
      summary: "Listar Usuários",
      description: "Lista todos os usuários",
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
      tags: ["Usuário"],
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
      tags: ["Usuário"],
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
      tags: ["Usuário"],
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
      tags: ["Usuário"],
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
