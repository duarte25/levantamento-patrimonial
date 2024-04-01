export const inventarioSchema = {
  Inventario: {
    type: "object",
    properties: {
      auditores: {
        type: "string",
        description: "Auditor do inventario",
        example: "65de780e1dfefb1e27eb2d91"
      },
      data_inicio: {
        type: "string",
        format: "date-time", 
        example: "2024-04-01" 
      }
    }
  }
};
