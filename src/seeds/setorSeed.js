import faker from "faker-br";
import Setor from "../models/Setor.js";

export default async function setorSeed() {
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
    for (let i = 0; i < local.length; i++) {
        setoresCriados.push({
            local: local[i]
        });
    }

    await Setor.insertMany(setoresCriados);

    console.log(local.length + " Setores inseridos");
}
