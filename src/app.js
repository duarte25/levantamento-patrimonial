import cors from "cors";
import express from "express";
import db from "./config/db_config.js";
import routes from "./routes/index.js";
import moment from "moment-timezone";

const app = express();
moment.tz.setDefault("America/Manaus");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Conectado ao banco de dados.");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

export default app;