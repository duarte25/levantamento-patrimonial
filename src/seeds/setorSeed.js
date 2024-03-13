import faker from "faker-br";
import Setor from "../models/Setor.js";
import Campus from "../models/Campus.js";

export default async function setorSeed(quantidade) {
    const campusID = await Campus.aggregate([{ $sample: { size: 50 } }, { $project: { _id: 1 } }]);
    const local = [
        "BIBLIOTECA - ACERVO (VLH - BLOCO A)",
        "LABORATÓRIO DE ANÁLISE E DESENV. DE SISTEMAS (VLH - BLOCO A)",
        "VLH-CAED",
        "COORD. COMUNICAÇÃO E EVENTOS (CCOM) (VLH - BLOCO A)",
        "IMPLANTAÇÃO SUAP - RECEBIDOS (VLH - BLOCO A)",
        "LAB. 05 - USINAGEM (VLH - BLOCO C)",
        "LAB. 02 - FÍSICA (VLH - BLOCO B)",
        "COORD. GESTÃO DA TECNOLOGIA DA INFORMAÇÃO (CGTI) (VLH - BLOCO A)",
        "DIRETORIA DE ENSINO (DE) (VLH - BLOCO A)",
        "DIRETORIA DE PLANEJAMENTO E ADMINISTRAÇÃO (DPLAD) (VLH - BLOCO A)",
        "LAB. 03 - SOLOS (VLH - BLOCO C)"
    ];
    const setoresCriados = [];
    
    for (let i = 0; i < quantidade; i++) {
        setoresCriados.push({
            campus: faker.random.arrayElement(campusID.map(campus => campus._id)),
            local: faker.name.findName()
        });
    }

    await Setor.insertMany(setoresCriados);

    console.log(local.length + " Setores inseridos");
}
