export const itensSchemas = {
  Itens: {
    type: "object",
    properties: {
      id: { type: "string", example: "1" },
      nome: { type: "string", example: "Cadeira" },
      descricao: { type: "string", example: "Cadeira de madeira" },
      etiqueta: { type: "string", example: "Cadeira01" },
      ativo: { type: "boolean", example: true },
      estado: { type: "string", example: "Bom" },
      inventario: { type: "string", example: "Inventario01" },
      setor: { type: "string", example: "Setor01" },
      auditor: { type: "string", example: "Luccas" },
      imagem: { type: "string", example: "http://localhost:3000/images/1" },
    },
  },
};