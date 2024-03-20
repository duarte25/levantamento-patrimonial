import logRoutes from "../middlewares/LogRoutesMiddleware.js";
import imagens from "../routes/imageRouter.js"
import auth from "./authRouter.js";
import usuarios from "./usuarioRouter.js";
import recuperarSenha from "./recuperaSenhaRouter.js";
import setor from "./setorRouter.js";
import itens from "./itemRoutes.js";
import inventarios from "./inventarioRoutes.js";
import campus from "./campusRouter.js";

const routes = (app) => {

    if (process.env.DEBUGLOG === "true") {
        app.use(logRoutes);
    }

    app.route("/").get((req, res) => {
        res.status(200).redirect("/docs");
    });

    app.use(
        imagens,
        auth,
        usuarios,
        recuperarSenha,
        itens,
        inventarios,
        setor,
        campus
        
        // Aqui ficarão as rotas da API, que serão definidas posteriormente
    );
};

export default routes;