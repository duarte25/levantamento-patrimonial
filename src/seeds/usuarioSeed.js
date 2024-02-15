import faker from "faker-br";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs"

export default async function usuarioSeed(quantidade) {

    const usuariosCriados = [];
   
    usuariosCriados.push({
        nome: "Dev Oliveira",
        cpf: faker.br.cpf(),
        email: "dev@gmail.com",
        senha: bcrypt.hashSync("12345678",8)
    })
    
    for (let i = 0; i < quantidade; i++) {

        usuariosCriados.push({
            nome: faker.name.findName(),
            cpf: faker.br.cpf(),
            email: faker.internet.email(),
            senha: bcrypt.hashSync(faker.internet.password(),8)
        });
    }

    await Usuario.insertMany(usuariosCriados);

    console.log((quantidade+1) + " Usuários inseridos");
}
