import grupo from "../models/GruposUsuarios.js"
import { grupos } from "./listaDeRegras.js"

export default async function AdicionarRegrasNosGrupos(nomeGrupo) {

    const grupoEncontrado = grupos.find(grupo => grupo.nome === nomeGrupo)

    if (grupoEncontrado) {
        await grupo.create(grupoEncontrado)
    } else {
        console.log(`Grupo "${nomeGrupo}" não encontrado.`)
    }
}



