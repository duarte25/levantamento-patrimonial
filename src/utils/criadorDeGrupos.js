import grupo from "../models/GruposUsuarios.js"
import { grupos, regras } from "./listaDeRegras.js"

export default async function AdicionarRegrasNosGrupos(nomeGrupo, arrayDeRegras) {

    const grupoEncontrado = grupos.find(grupo => grupo.nome === nomeGrupo)

    if (grupoEncontrado) {
        for (const regra of arrayDeRegras) {

            const regraEncontrada = regras.find(res => res.nome === regra)

            if (regraEncontrada) {
                grupoEncontrado.regras.push(regraEncontrada)
                await grupo.create(grupoEncontrado)
                
            } else {
                console.log(`Regra "${regra}" não encontrada.`)
            }
        }
        console.log(`O Grupo ${nomeGrupo} recebeu as seguintes regras: ${JSON.stringify(grupoEncontrado.regras)}`)
    } else {
        console.log(`Grupo "${nomeGrupo}" não encontrado.`)
    }
}
