export const setorSchema = {
    Setor: {
      type: "object",
      properties: {
        id: { type: "string", example: "1" },
        campus: { type: "string", example: "Campus01" },
        local: { type: "string", example: "Setor01" },
        status: { type: "boolean", example: true },
      },
    },
  };