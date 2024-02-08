import db from "../config/db_config.js";
import usuarioSeed from "./usuarioSeed.js";
import Usuario from "../models/Usuario.js";
import setorSeed from "./setorSeed.js";
import Setor from "../models/Setor.js";

let quantidade = parseInt(5);

// USUARIO
await Usuario.deleteMany();
await usuarioSeed(quantidade);

// SETOR
await Setor.deleteMany();
await setorSeed(quantidade);

db.close();
