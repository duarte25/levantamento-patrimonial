import messages from "../../utils/mensagens.js";

const recuperarSenhaPaths = {
    "/recuperarsenha": {
        post: {
            tags: ["Recuperar senha"],
            description: "Esta função é responsável por recuperar a senha",
            summary: "Recuperação de senha",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    example: "dev@gmail.com"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Login efetuado com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        example: []
                                    },
                                    error: {
                                        type: "bollean",
                                        example: "false"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "200"
                                    },
                                    message: {
                                        type: "string",
                                        example: "Solicitação de alteração de senha enviada com sucesso!"
                                    },
                                    errors: {
                                        type: "array",
                                        example: []
                                    }
                                }
                            }
                        }
                    }
                },
                422: {
                    description: "Erro de validação",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        example: "[]"
                                    },
                                    error: {
                                        type: "bollean",
                                        example: "true"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "422"
                                    },
                                    message: {
                                        type: "string",
                                        example: messages.httpCodes[422]
                                    },
                                    errors: {
                                        type: "array",
                                        example: ["Email no formato inválido!"]
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Erro interno",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        example: "[]"
                                    },
                                    error: {
                                        type: "bollean",
                                        example: "false"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "500"
                                    },
                                    message: {
                                        type: "string",
                                        example: messages.httpCodes[500]
                                    },
                                    errors: {
                                        type: "array",
                                        example: ["Variável Teste não declarada!"]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/alterarsenha": {
        post: {
            tags: ["Recuperar senha"],
            description: "Esta função é responsável por alterar a senha através da recuparação",
            summary: "Alteração de senha",
            parameters: [
                {
                    name: "token",
                    in: "query",
                    description: "token de recuperação de senha",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "email",
                    in: "query",
                    description: "email do usuário",
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
                            type: "object",
                            properties: {
                                senha: {
                                    type: "string",
                                    example: "Dev@1234"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Login efetuado com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        example: []
                                    },
                                    error: {
                                        type: "bollean",
                                        example: "false"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "200"
                                    },
                                    message: {
                                        type: "string",
                                        example: "Solicitação de alteração de senha enviada com sucesso!"
                                    },
                                    errors: {
                                        type: "array",
                                        example: []
                                    }
                                }
                            }
                        }
                    }
                },
                422: {
                    description: "Erro de validação",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        example: "[]"
                                    },
                                    error: {
                                        type: "bollean",
                                        example: "true"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "422"
                                    },
                                    message: {
                                        type: "string",
                                        example: messages.httpCodes[422]
                                    },
                                    errors: {
                                        type: "array",
                                        example: ["Email no formato inválido!"]
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Erro interno",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        example: "[]"
                                    },
                                    error: {
                                        type: "bollean",
                                        example: "false"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "500"
                                    },
                                    message: {
                                        type: "string",
                                        example: messages.httpCodes[500]
                                    },
                                    errors: {
                                        type: "array",
                                        example: ["Variável Teste não declarada!"]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default recuperarSenhaPaths;