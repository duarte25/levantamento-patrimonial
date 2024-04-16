
import messages from "../../utils/mensagens.js";

export const campusPaths = {
  "/campus": {
    get: {
      tags: ["Campus"],
      summary: "Listar todos os Campus",
      description: "Retorna uma lista de campus",
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
          name: "nome",
          in: "query",
          description: "Nome do campus",
          required: false,
          schema: {
            type: "string"
          }
        },
        {
          name: "cidade",
          in: "query",
          description: "Cidade do campus",
          required: false,
          schema: {
            type: "string"
          }
        },
        {
          name: "ativo",
          in: "query",
          description: "status do campus",
          required: false,
          schema: {
            type: "boolean"
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
                  $ref: "#/components/schemas/Campus"
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
      tags: ["Campus"],
      summary: "Cadastrar Campus",
      description: "Cadastra um novo campus",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Campus"
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
                $ref: "#/components/schemas/Campus"
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
  "/campus/{id}": {
    get: {
      tags: ["Campus"],
      summary: "Buscar Campus por ID",
      description: "Retorna um campus po ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do campus",
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
                $ref: "#/components/schemas/Campus"
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
      tags: ["Campus"],
      summary: "Atualizar Campus",
      description: "Atualiza um campus por ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do campus",
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
              $ref: "#/components/schemas/Campus"
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
                $ref: "#/components/schemas/Campus"
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
      tags: ["Campus"],
      summary: "Deletar Campus",
      description: "Deleta um campus por ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do campus",
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