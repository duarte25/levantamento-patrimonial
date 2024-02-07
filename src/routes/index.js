import uploads from "../routes/imageRouter.js"

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).redirect("/docs")
    });

    app.use(
        uploads,
        
        // Aqui ficarão as rotas da API, que serão definidas posteriormente
    );
};

export default routes;