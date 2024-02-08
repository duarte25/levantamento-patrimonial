import faker from "faker-br";
import Setor from "../models/Setor.js";

export default async function setorSeed(quantidade) {

    const setorCriados = [];
    const setores = await Setor.find({ _id: 1, nome: 1, bloco: 1 });

    for (let i = 0; i < quantidade; i++) {

        setorCriados.push({
            etiqueta: faker.random.number(),
            nome: faker.name.findName(),
            setor: setorCriados._id,
            estado: 
        });
    }

    await Setor.insertMany(setorCriados);

    console.log(quantidade + " Setores inseridos");
}
