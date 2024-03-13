import db from "../config/db_config.js";
import usuarioSeed from "./usuarioSeed.js";
import setorSeed from "./setorSeed.js";
import inventarioSeed from "./inventarioSeed.js";
import itemSeed from "./itemSeeds.js";
import campusSeed from "./campusSeed.js";

let quantidade = parseInt(50);

// CAMPUS
await db.collection("campus").deleteMany();
await campusSeed();

// USUARIO
await db.collection("usuarios").deleteMany();
await usuarioSeed(quantidade);

// SETOR
await db.collection("setores").deleteMany();
await setorSeed(quantidade * 2);

// INVENTARIO
await db.collection("inventarios").deleteMany();
await inventarioSeed(quantidade);

// ITEM
await db.collection("itens").deleteMany();
await itemSeed(quantidade * 10);


db.close();
