import messages from "../../utils/mensagens.js";

const imagePath = {
  "/imagens": {
    get: {
      tags: ["Imagens"],
      summary: "Lista todas as imagens",
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Imagem"
              },
            },
          },
        },
        401: {
          description: messages.httpCodes[401],
        },
        403: {
          description: messages.httpCodes[403],
        },
        500: {
          description: messages.httpCodes[500],
        },
      },
    },
    post: {
      tags: ["Imagens"],
      summary: "Envia uma imagem",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                },
              },
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
                $ref: "#/components/schemas/Imagem"
              },
            },
          },
        },
        400: {
          description: messages.httpCodes[400],
        },
        401: {
          description: messages.httpCodes[401],
        },
        403: {
          description: messages.httpCodes[403],
        },
        500: {
          description: messages.httpCodes[500],
        },
      },
    },
  },
  "/imagens/{id}": {
    delete: {
      tags: ["Imagens"],
      summary: "Deleta uma imagem",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Id da imagem que vai ser deletada",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: messages.httpCodes[200],
        },
        401: {
          description: messages.httpCodes[401],
        },
        403: {
          description: messages.httpCodes[403],
        },
        404: {
          description: messages.httpCodes[404],
        },
        500: {
          description: messages.httpCodes[500],
        },
      },
    },
    get: {
      tags: ["Imagens"],
      summary: "Recupera uma imagem pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Id da imagem que vai ser exibida",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: messages.httpCodes[200],
          content: {
            image: {
              schema: {
                type: "string",
                format: "binary",
              },
            },
          },
        },
        401: {
          description: messages.httpCodes[401],
        },
        403: {
          description: messages.httpCodes[403],
        },
        404: {
          description: messages.httpCodes[404],
        },
        500: {
          description: messages.httpCodes[500],
        },
      },
    },
  },
}



export default imagePath;