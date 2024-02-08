import db from "../config/db_config.js";
import usuarioSeed from "./usuarioSeed.js";
import Usuario from "../models/Usuario.js";

let quantidade = parseInt(5);

await Usuario.deleteMany();
await usuarioSeed(quantidade);

db.close();
