import logRoutes from "../middlewares/LogRoutesMiddleware.js";
import imagens from "../routes/imageRouter.js";
import auth from "./authRouter.js";
import usuarios from "./usuarioRouter.js";
import recuperarSenha from "./recuperaSenhaRouter.js";
import setor from "./setorRouter.js";
import itens from "./itemRoutes.js";
import inventarios from "./inventarioRoutes.js";
import campus from "./campusRouter.js";
import relatorio from "./pdfRouter.js";
import GrupoController from "../controllers/GrupoController.js";

const routes = (app) => {

    if (process.env.DEBUGLOG === "true") {
        app.use(logRoutes);
    }

    app.route("/").get((req, res) => {
        res.status(200).redirect("/docs");
    });

    // Para, se necessário, atualizar as informações dos grupos antes de verificar as permissões
    app.use(GrupoController.carregarGrupos);

    app.use(
        imagens,
        auth,
        usuarios,
        recuperarSenha,
        itens,
        inventarios,
        setor,
        campus,
        relatorio

        // Aqui ficarão as rotas da API, que serão definidas posteriormente
    );
};

export default routes;