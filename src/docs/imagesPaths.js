const imageSchemas = {
  Imagem: {
    type: "object",
    properties: {
      id: { type: "string" },
      nome: { type: "string" },
      src: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
    },
  },
};
const imagePaths = {
  "/uploads": {
    post: {
      tags: ["Imagens"],
      summary: "Envia um arquivo tipo imagem (.png, .jpg, .jpeg)",
      description:
        "Faça o upload de um arquivo de imagem no formato .png, .jpg ou .jpeg.",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: { type: "string", format: "binary" },
                nome: { type: "string", example: "Imagem cadeira" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Imagem salva com sucesso!",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Imagem",
              },
            },
          },
        },
        500: {
          description: "Erro interno Servidor",
        },
      },
    },
  },
  "/images": {
    get: {
      tags: ["Imagens"],
      summary: "Lista todas as imagens",
      description: "Retorna uma lista de todas as imagens salvas no servidor.",
      responses: {
        200: {
          description: "Retorna a imagens salvas no servidor.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Imagem",
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
  "/remover/{id}": {
    delete: {
      tags: ["Imagens"],
      summary: "Deleta Imagem do Servidor por Id",
      description:
        "Deleta a imagem selecionada pela escolha do Id informado nos parametros da requisição.",
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",
          },
          description: "ID da Imagem a ser deletada",
        },
      ],
      responses: {
        200: {
          description: "Imagem removida com sucesso",
        },
        404: {
          description: "Imagem não encontrada",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
};
export { imagePaths, imageSchemas };
