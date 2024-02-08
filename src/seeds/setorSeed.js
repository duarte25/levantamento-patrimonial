import faker from "faker-br";
import Setor from "../models/Setor.js";

export default async function setorSeed(quantidade) {

    const setorCriados = [];
    for (let i = 0; i < quantidade; i++) {

        setorCriados.push({
            nome: faker.system.fileName(),
            bloco: faker.system.fileName(),
        });
    }

    await Setor.insertMany(setorCriados);

    console.log(quantidade + " Setores inseridos");
}
