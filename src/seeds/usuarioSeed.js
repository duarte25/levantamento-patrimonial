import faker from "faker-br";
import Usuario from "../models/Usuario.js";

export default async function usuarioSeed(quantidade) {

    const usuariosCriados = [];
    
    for (let i = 0; i < quantidade; i++) {

        usuariosCriados.push({
            nome: faker.name.findName(),
            cpf: faker.br.cpf(),
            email: faker.internet.email(),
            senha: faker.internet.password()
        });
    }

    await Usuario.insertMany(usuariosCriados);

    console.log(quantidade + " Usuarios inseridos");
}
