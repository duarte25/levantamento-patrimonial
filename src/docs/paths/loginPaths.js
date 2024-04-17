import messages from "../../utils/mensagens.js";

const loginPaths = {
    "/login": {
        post: {
            tags: ["Login"],
            description: "Esta função é responsável por logar um usuário na API",
            summary: "Login de usuário",
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
                                },
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
                                    token: {
                                        type: "string",
                                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU3ODBlMWRmZWZiMWUyN2ViMmQ5MSIsIm5vbWUiOiJEZXYgT2xpdmVpcmEiLCJlbWFpbCI6ImRldkBnbWFpbC5jb20iLCJhdGl2byI6dHJ1ZSwiaWF0IjoxNzA5NTk4OTExLCJleHAiOjE3MTA4OTQ5MTF9.KvhEcRDZ37XZsv9J9FcqEGFlDYvC_imuT32PulE3sbA",
                                    },
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "id",
                                                example: "65de780e1dfefb1e27eb2d91"
                                            },
                                            nome: {
                                                type: "string",
                                                example: "Dev Oliveira"
                                            },
                                            email: {
                                                type: "string",
                                                example: "dev@gmail.com"
                                            },
                                            ativo: {
                                                type: "boolean",
                                                example: true
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Erro ao validar o login",
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
                                        type: "boolean",
                                        example: "true"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "422"
                                    },
                                    message: {
                                        type: "string",
                                        example: messages.httpCodes[424002]
                                    },
                                    errors: {
                                        type: "array",
                                        example: ["Usuário ou senha incorretos!"]
                                    }
                                }
                            }
                        }
                    }
                },
                422: {
                    description: "Erro ao validar o email",
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
        },
    }
};


export default loginPaths;
