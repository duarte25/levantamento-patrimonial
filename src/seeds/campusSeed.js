
import Campus from "../models/Campus.js";

export default async function seedCampus(qtd) {
    const nome = [
        "Campus Vilhena",
        "Campus Colorado do Oeste",
        "Campus Cacoal",
        "Campus Ji-Paraná",
        "Campus Porto Velho Calama",
        "Campus Porto Velho Zona Norte",
        "Campus Ariquemes",
        "Campus Guajará-Mirim",
        "Campus Jaru",
        "Campus Presidente Médici",
        "Campus Rolim de Moura",
        "Campus São Francisco do Guaporé",
        "Campus Urupá",
        "Campus Porto Velho Centro",
        "Campus Porto Velho Pantanal",
        "Campus Satanás de Seed",
        "Campus Porto Velho Zona Sul",
    ];
    const cidade = [
        "Vilhena",
        "Colorado do Oeste",
        "Cacoal",
        "Ji-Paraná",
        "Porto Velho",
        "Porto Velho",
        "Ariquemes",
        "Guajará-Mirim",
        "Jaru",
        "Presidente Médici",
        "Rolim de Moura",
        "São Francisco do Guaporé",
        "Urupá",
        "Porto Velho",
        "Porto Velho",
        "Inferno",
        "Porto Velho",
    ];

    const campus = [];
    for (let i = 0; i < nome.length; i++) {
        campus.push({
            nome: nome[i],
            cidade: cidade[i],
            ativo: true,
        });
    }

    await Campus.insertMany(campus);
    console.log(campus.length + " Campus inseridos");
}
