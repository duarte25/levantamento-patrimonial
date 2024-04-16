export const setorSchema = {
  Setor: {
    type: "object",
    properties: {
      campus: {
        type: "object",
        example: "6605ad8fcd03e0e45692c91c"
      },
      local: {
        type: "string",
        example: "Setor01"
      },
      status: {
        type: "boolean",
        example: true
      },
    },
  },
};