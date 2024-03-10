import faker from "faker-br";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import Campus from "../models/Campus.js";

export default async function usuarioSeed(quantidade) {

    const campusID = await Campus.aggregate([{ $sample: { size: 50 } }, { $project: { _id: 1 } }]);
    const usuariosCriados = [];
   
    usuariosCriados.push({
        nome: "Dev Oliveira",
        cpf: faker.br.cpf(),
        email: "dev@gmail.com",
        senha: bcrypt.hashSync("Dev@1234",8)
    });
    
    for (let i = 0; i < quantidade; i++) {

        usuariosCriados.push({
            nome: faker.name.findName(),
            cpf: faker.br.cpf(),
            email: faker.internet.email(),
            senha: bcrypt.hashSync("Dev@1234",8),
            campus: faker.random.arrayElement(campusID.map(campus => campus._id))
        });
    }

    await Usuario.insertMany(usuariosCriados);

    console.log((quantidade+1) + " Usuários inseridos");
}
