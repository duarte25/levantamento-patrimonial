import { imagePaths } from "../paths/imagePaths.js";
import { imageSchemas } from "../schemas/imageSchema.js";
import loginPaths from "../paths/loginPaths.js";
import recuperarSenhaPaths from "../paths/recuperarSenhaPaths.js";

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
        description: `API em desenvovlvimento`,
      },
      {
        url: `http://localhost:${process.env.PORT}`,
        description: `API em produção`,
      }
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
    ],
    paths: {
      ...imagePaths,
      ...loginPaths,
      ...recuperarSenhaPaths
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...imageSchemas,
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;
