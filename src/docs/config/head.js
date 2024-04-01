import imagePaths from "../paths/imagePaths.js";
import { imageSchemas } from "../schemas/imageSchema.js";
import loginPaths from "../paths/loginPaths.js";
import recuperarSenhaPaths from "../paths/recuperarSenhaPaths.js";
import { itensPaths } from "../paths/itensPath.js";
import { itensSchemas } from "../schemas/itensSchema.js";
import { campusSchema } from "../schemas/campusSchema.js";
import { campusPaths } from "../paths/campusPaths.js";
import { setorSchema } from "../schemas/setorSchema.js";
import { setorPaths } from "../paths/setorPaths.js";
import { inventarioSchema } from "../schemas/inventarioSchema.js";
import { inventarioPaths } from "../paths/inventarioPaths.js";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API- Levantamento Patrimonial",
      description:
        "O projeto foi desenvolvido para a Fabrica de Softwre(FSLab) do curso de Análise e Desenvolvimento de Sistemas do Instituto Federal de Rondônia - IFRO.",
      version: "0.0.1",
      license: {
        name: "GPLv3",
        url: "http://www.gnu.org/licenses/gpl-3.0.html",
      },
    },
    externalDocs: {
      description: "Documentação detalhada",
      url: "",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "API em desenvolvimento",
      },
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "API em produção",
      }
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ...imageSchemas,
        ...itensSchemas,
        ...inventarioSchema,
        ...campusSchema,
        ...setorSchema,
      },
    },
    security: [
      {
        jwtAuth: [],
      },
    ],
    tags: [
      {
        name: "Login",
        description: "Login do usuário",
      },
      {
        name: "Recuperar senha",
        description: "Recuperação de senha",
      },
      {
        name: "Imagens",
        description: "Upload de imagens",
      },
      {
        name: "Usuários",
        description: "Usuários do sistema",
      },
      {
        name: "Itens",
        description: "Itens do inventário",
      },
      { 
        name: "Inventários",
        description: "Invetários do campus"
      },
      {
        name: "Setores",
        description: "Setores do inventário",
      },
      {
        name: "Campus",
        description: "Campus do usuário"
      },
    ],
    paths: {
      ...imagePaths,
      ...loginPaths,
      ...recuperarSenhaPaths,
      ...itensPaths,
      ...inventarioPaths,
      ...setorPaths,
      ...campusPaths,

    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;