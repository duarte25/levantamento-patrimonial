import faker from "faker-br";
import Setor from "../models/Setor.js";
import Usuario from "../models/Usuario.js";
import Inventario from "../models/Inventario.js";
import Campus from "../models/Campus.js";

export default async function inventarioSeed(quantidade) {

    const campusID = await Campus.aggregate([{ $sample: { size: 50 } }, { $project: { _id: 1 } }]);
    const usuarios = await Usuario.aggregate([{ $sample: { size: 50 } }, { $project: { _id: 1 } }]);
    const dataInicio = faker.date.between("2024-01-01", "2024-12-31").toDateString();
    const inventariosCriados = [];
   
    for (let i = 0; i < quantidade; i++) {

        inventariosCriados.push({
            campus: faker.random.arrayElement(campusID.map(campus => campus._id)),
            responsavel:  faker.random.arrayElement(usuarios.map(usuario => usuario._id)),
            auditores: [
                {
                    _id: faker.random.arrayElement(usuarios.map(usuario => usuario._id))
                },
                {
                    _id: faker.random.arrayElement(usuarios.map(usuario => usuario._id))
                }
            ],
            data_inicio: dataInicio,
            data_fim: faker.date.between(dataInicio, "2025-12-31").toDateString()
        });
    }

    await Inventario.insertMany(inventariosCriados);

    console.log(quantidade + " Inventarios inseridos");
}
