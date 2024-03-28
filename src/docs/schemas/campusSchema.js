
export const campusSchema = {
  Campus: {
    type: "object",
    properties: {
      nome: {
        type: "string",
        description: "Nome do campus",
        example: "Campus 1"
      },
      cidade: {
        type: "string",
        description: "Cidade do campus",
        example: "Campina Grande"
      },
      ativo: {
        type: "boolean",
        description: "Se o campus está ativo",
        example: true
      }
    }
  }
};

