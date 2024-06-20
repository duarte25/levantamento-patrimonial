export const inventarioSchema = {
  Inventario: {
    type: "object",
    properties: {
      auditores: {
        type: "string",
        description: "Auditor do inventario",
        example: [
          {
            "_id": "660c7b166b21494b232c8228"
          },
          {
            "_id": "660c7b166b21494b232c8200"
          }
        ]
      },
      data_inicio: {
        type: "string",
        format: "date-time", 
        example: "2024-04-01" 
      }
    }
  }
};
