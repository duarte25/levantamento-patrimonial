import messages from "../../utils/mensagens.js";

export const setorPaths = {
  "/Setores": {
    get: {
      tags: ["Setores"],
      summary: "Listar todos os setores",
      description: "Retorna uma lista de todos os setores.",
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
          name: "local",
          in: "query",
          description: "Local do setor",
          required: false,
          schema: {
            type: "string"
          }
        },
        {
          name: "status",
          in: "query",
          description: "Status do setor",
          required: false,
          schema: {
            type: "boolean"
          }
        },
        {
          name: "campus",
          in: "query",
          description: "Campus do setor",
          required: false,
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
                type: "array",
                items: {
                  $ref: "#/components/schemas/Setor"
                }
              }
            }
          }
        },
        500: {
          escription: messages.httpCodes[500]
        }
      }
    },
    post: {
      tags: ["Setores"],
      summary: "Cadastrar Setor",
      description: "Cadastra um novo setor.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Setor",
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
                $ref: "#/components/schemas/Setor"
              }
            }
          }
        },
        500: {
          escription: messages.httpCodes[500]
        }
      }
    }
  },

  "/setores/{id}": {
    get: {
      tags: ["Setores"],
      summary: "Buscar setor por ID",
      description: "Retorna um setor.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do setor",
          required: true,
          schema: {
            type: "string",
          }
        }
      ],
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Setor"
              }
            }
          }
        },
        500: {
          description: messages.httpCodes[500]
        }
      }
    },
    patch: {
      tags: ["Setores"],
      summary: "Atualizar setor",
      description: "Atualiza um setor.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do setor",
          required: true,
          schema: {
            type: "string",
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Setor",
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
                $ref: "#/components/schemas/Setor"
              }
            }
          }
        },
        500: {
          description: messages.httpCodes[500]
        }
      }
    },
    delete: {
      tags: ["Setores"],
      summary: "Deletar setor",
      description: "Deleta um Setor.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do setor",
          required: true,
          schema: {
            type: "string",
          }
        }
      ],
      responses: {
        200: {
          description: messages.httpCodes[200]
        },
        404: {
          description: messages.httpCodes[404]
        },
        500: {
          description: messages.httpCodes[500]
        }
      }
    }
  }
};