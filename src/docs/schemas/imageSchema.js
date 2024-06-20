export const imageSchemas = {
  Imagem: {
    type: "array",
    items: {
      type: "object",
      properties: {
        tipo_arquivo: {
          type: "string",
        },
        enviado_por: {
          type: "string",
        },
        caminho: {
          type: "string",
        },
        id_imagem: {
          type: "string",
        },
        criado_em: {
          type: "string",
          format: "date-time",
        },
        atualizado_em: {
          type: "string",
          format: "date-time",
        },
        _id: {
          type: "string",
        },
      },
    },
  },
};