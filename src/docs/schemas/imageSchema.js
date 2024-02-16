export const imageSchemas = {
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