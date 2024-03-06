import logRoutes from "../middlewares/LogRoutesMiddleware.js";
import uploads from "./imageRouter.js";
import auth from "./authRouter.js";
import usuarios from "./usuarioRouter.js";
import recuperarSenha from "./recuperaSenhaRouter.js";
import setor from "./setorRouter.js";
import itens from "./itemRoutes.js";
import inventarios from "./inventarioRoutes.js";

const routes = (app) => {

    if (process.env.DEBUGLOG === "true") {
        app.use(logRoutes);
    }

    app.route("/").get((req, res) => {
        res.status(200).redirect("/docs");
    });

    app.use(
        uploads,
        auth,
        usuarios,
        recuperarSenha,
        itens,
        inventarios,
        setor
        
        // Aqui ficarão as rotas da API, que serão definidas posteriormente
    );
};

export default routes;