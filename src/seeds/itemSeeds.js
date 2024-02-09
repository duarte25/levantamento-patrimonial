import faker from "faker-br";
import Setor from "../models/Setor.js";
import Usuario from "../models/Usuario.js";
import Item from "../models/Item.js";
import inventario from "../models/Inventario.js";

export default async function itemSeed(quantidade) {

    const estado = ["Bem danificado", "Bem em condições de uso", "Bem inservivel"];
    const ativo = ["Ativo", "Inativo", "Pendente"];
    const inventarios = await inventario.aggregate([{ $sample: { size: 50 } }, { $project: { _id: 1 } }]);
    const usuarios = await Usuario.aggregate([{ $sample: { size: 50 } }, { $project: { _id: 1 } }]);
    const setores = await Setor.aggregate([{ $sample: { size: 50 } }, { $project: { _id: 1 } }]);

    const itensCriados = [];
   
    for (let i = 0; i < quantidade; i++) {

        itensCriados.push({
            etiqueta: faker.random.number({ digits: 10 }),
            nome: faker.commerce.productName(),
            estado: faker.random.arrayElement(estado),
            ativo: faker.random.arrayElement(ativo),
            descricao: faker.company.catchPhraseDescriptor(),
            inventario: faker.random.arrayElement(inventarios.map(inventario => inventario._id)),
            setor: faker.random.arrayElement(setores.map(setor => setor._id)),
            auditor: faker.random.arrayElement(usuarios.map(usuario => usuario._id)),
            //Incluir imagem primeiro depois inclui aqui o seu campo
        });
    }

    await Item.insertMany(itensCriados);

    console.log(quantidade + " Itens inseridos");
}
