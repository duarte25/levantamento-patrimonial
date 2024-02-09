import db from "../config/db_config.js";
import usuarioSeed from "./usuarioSeed.js";
import Usuario from "../models/Usuario.js";
import setorSeed from "./setorSeed.js";
import Setor from "../models/Setor.js";
import inventarioSeed from "./inventarioSeed.js";
import Inventario from "../models/Inventario.js";
import itemSeed from "./itemSeeds.js";
import Item from "../models/Image.js";

let quantidade = parseInt(50);

// USUARIO
await Usuario.deleteMany();
await usuarioSeed(quantidade);

// SETOR
await Setor.deleteMany();
await setorSeed();

// INVENTARIO
await Inventario.deleteMany();
await inventarioSeed(quantidade);

// ITEM
await Item.deleteMany();
await itemSeed(quantidade * 10);

db.close();
