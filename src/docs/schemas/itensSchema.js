export const itensSchemas = {
  Itens: {
    type: "object",
    properties: {
      nome: { 
        type: "string",
        example: "Cadeira"
      },
      descricao: {
        type: "string",
        example: "Cadeira de madeira"
      },
      etiqueta: {
        type: "string",
        example: "10378"
      },
      Ativo: {
        type: "boolean",
        example: true
      },
      estado: {
        type: "string",
        example: "Bem danificado"
      },
      setor: {
        type: "string", 
        example: "660c7b166b21494b232c8284"
      },
      responsavel: {
        type: "string",
        example: ""
      }
    }
  }
};