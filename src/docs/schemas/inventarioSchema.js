export const inventarioSchema = {
  inventario: {
    type: "object",
    properties: {
      campus: {
        type: "string",
        example: "6605ad8fcd03e0e45692c91c"
      },
      responsavel: {
        type: "string",
        required: true
      },
      auditores: {
        type: "array",
        items: {
          type: "string",
          required: true
        }
      },
      data_inicio: {
        type: "Date",
        required: true,
      },
      data_fim: {
        type: "Date"
      }
    }
  }
};
