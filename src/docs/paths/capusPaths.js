
export const campusPaths = {
    "/campus": {
        "get": {
            "tags": ["Campus"],
            "summary": "Buscar Campus",
            "description": "Retorna uma lista de campus",
            "responses": {
                "200": {
                    "description": "Sucesso",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Campus"
                                }
                            }
                        }
                    }
                }
            }
        },
        "post": {
            "tags": ["Campus"],
            "summary": "Criar Campus",
            "description": "Cria um novo campus",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Campus"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Sucesso",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Campus"
                            }
                        }
                    }
                }
            }
        }
    },
    "/campus/{id}": {
        "get": {
            "tags": ["Campus"],
            "summary": "Buscar Campus por ID",
            "description": "Retorna um campus",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "ID do campus",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Sucesso",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Campus"
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "tags": ["Campus"],
            "summary": "Deletar Campus",
            "description": "Deleta um campus",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "ID do campus",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "204": {
                    "description": "Sucesso"
                }
            }
        },
        "put": {
            "tags": ["Campus"],
            "summary": "Atualizar Campus",
            "description": "Atualiza um campus",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "ID do campus",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Campus"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Sucesso",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Campus"
                            }
                        }
                    }
                }
            }
        }
    }
}