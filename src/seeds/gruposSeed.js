import AdicionarRegrasNosGrupos from "../utils/criadorDeGrupos.js";

export default async function seedGrupos(){
    AdicionarRegrasNosGrupos("Administrador")
    AdicionarRegrasNosGrupos("Responsavel")
    AdicionarRegrasNosGrupos("Auditor")
}