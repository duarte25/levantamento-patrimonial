import AdicionarRegrasNosGrupos from "../utils/criadorDeGrupos.js";
import db from "../config/db_config.js";


await db.collection("grupos").deleteMany();





await AdicionarRegrasNosGrupos("Administrador", ["criar_usuarios"]);





db.close();