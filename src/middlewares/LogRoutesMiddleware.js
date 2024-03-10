const logRoutes = async (req, res, next) => {
    try {
        const timestamp = new Date().toISOString();

        let ip = req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        null;
    
        // console.log(timestamp+" "+ip+" "+req.method+" "+req.protocol + "://" + req.get("host") + req.originalUrl);
        next();
    } catch(e) {
        console.log("Erro ao fazer o log", e);
    }
};

export default logRoutes;