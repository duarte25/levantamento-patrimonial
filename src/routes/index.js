import logRoutes from "../middlewares/LogRoutesMiddleware.js";
import uploads from "../routes/imageRouter.js"

const routes = (app) => {

    if (process.env.DEBUGLOG === "true") {
        app.use(logRoutes);
    }

    app.route("/").get((req, res) => {
        res.status(200).redirect("/docs")
    });

    app.use(
        uploads,
        
        // Aqui ficarão as rotas da API, que serão definidas posteriormente
    );
};

export default routes;