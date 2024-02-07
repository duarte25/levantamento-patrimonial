const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API- Levantamento Patrimonial",
        description:
          "O projeto foi desenvolvido para a Fabrica de Softwre(FSLab) do curso de Análise e Desenvolvimento de Sistemas do Instituto Federal de Rondônia - IFRO.",
        version: "0.0.1",
        termsOfService: "http://localhost:3030",
        // contact: {
        //   name: "Alexandre Nogueira",
        //   email: "alx.delira@gmail.com",
        //   url: "https://portfolioalxdelira.vercel.app/",
        // },
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
          description: `API em desenvovlvimento no localhost:${process.env.PORT}`,
        },
      ],
      tags: [
        {
          name: "Login",
          description: "Login do usuário",
        },
        {
          name: "Usuários",
          description: "Usuários do sistema",
        },
        
      ],
      paths: {
        // ...usuariosPaths,
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
        //   ...usuariosSchemas,
        },
      },
    },
    apis: ["./src/routes/*.js"],
  };
  
  export default swaggerOptions;
  