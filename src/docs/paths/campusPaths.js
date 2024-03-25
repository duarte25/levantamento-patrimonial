
import messages from "../../utils/mensagens.js";

export const campusPaths = {
    "/campus": {
        get: {
            tags: ["Campus"],
            summary: "Buscar Campus",
            description: "Retorna uma lista de campus",
            responses: {
                200: {
                    description: messages.httpCodes[200],
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Campus"
                                }
                            }
                        }
                    }
                },
                404: {
                    description: messages.httpCodes[404],
                },
                500: {
                    description: messages.httpCodes[500],
                }
            }
        },
        post: {
            tags: ["Campus"],
            summary: "Criar Campus",
            description: "Cria um novo campus",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Campus"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: messages.httpCodes[201],
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Campus"
                            }
                        }
                    }
                },
                404: {
                    description: messages.httpCodes[404],
                },
                500: {
                    description: messages.httpCodes[500],
                }
            }
        }
    },
    "/campus/{id}": {
        get: {
            tags: ["Campus"],
            summary: "Buscar Campus por ID",
            description: "Retorna um campus",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do campus",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: messages.httpCodes[200],
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Campus"
                            }
                        }
                    }
                },
                404: {
                    description: messages.httpCodes[404],
                },
                500: {
                    description: messages.httpCodes[500],
                }
            }
        },
        put: {
            tags: ["Campus"],
            summary: "Atualizar Campus",
            description: "Atualiza um campus",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do campus",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Campus"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: messages.httpCodes[200],
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Campus"
                            }
                        }
                    }
                },
                500: {
                    description: messages.httpCodes[500],
                }
            }
        },
        delete: {
            tags: ["Campus"],
            summary: "Deletar Campus",
            description: "Deleta um campus",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do campus",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                204: {
                    description: messages.httpCodes[204]
                },
                404: {
                    description: messages.httpCodes[404],
                },
                500: {
                    description: messages.httpCodes[500],
                }
            }
        }
    }
};