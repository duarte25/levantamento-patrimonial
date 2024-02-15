import logRoutes from "../middlewares/LogRoutesMiddleware.js";
import uploads from "./imageRouter.js"
import auth from "./authRouter.js"

const routes = (app) => {

    if (process.env.DEBUGLOG === "true") {
        app.use(logRoutes);
    }

    app.route("/").get((req, res) => {
        res.status(200).redirect("/docs")
    });

    app.use(
        uploads,
        auth
        
        // Aqui ficarão as rotas da API, que serão definidas posteriormente
    );
};

export default routes;