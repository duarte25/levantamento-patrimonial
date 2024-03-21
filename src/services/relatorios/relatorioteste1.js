import faker from "faker-br";
// Função para gerar dados aleatórios de inventário
const gerarDadosAleatorios = (quantidade) => {
    const itens = [];
    const estados = ['Em condições de uso', 'Danificado', 'Inservível'];
    const ociosidade = ['Sim', 'Não'];

    for (let i = 0; i < quantidade; i++) {
        const item = {
            nome: faker.commerce.productName(),
            etiqueta: faker.random.number({ min: 100000, max: 999999 }).toString(), // Número aleatório de 6 dígitos
            estado: faker.random.arrayElement(estados), // Estado aleatório da lista de estados
            ocioso: faker.random.arrayElement(ociosidade), // Estado de ociosidade aleatório
            responsavel: faker.name.findName() // Nome aleatório do responsável
        };
        itens.push(item);
    }

    return itens;
}

// Exemplo de uso: gerar 5 itens aleatórios
const dadosAleatorios = gerarDadosAleatorios(50);
const item = dadosAleatorios.slice(',');




const data = item.map((item) => {
    return `
    <tr>
    <td style="border: 1px solid #dddddd; padding: 8px;">${item.nome}</td>
    <td style="border: 1px solid #dddddd; padding: 8px;">${item.etiqueta}</td>
    <td style="border: 1px solid #dddddd; padding: 8px;">${item.estado}</td>
    <td style="border: 1px solid #dddddd; padding: 8px;">${item.ocioso}</td>
    <td style="border: 1px solid #dddddd; padding: 8px;">${item.responsavel}</td>
    </tr>
    `
})

export const tabela = `
            <h1 style="text-align: center; color: blue;">Relatório de Iventario</h1>
            <table style="width: 100%; border-collapse: collapse;">
            <thead>
            <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #dddddd; padding: 8px;">Nome do Item</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">Etiqueta</th>
            <th style="border: 1px solid #dddddd; padding: 8px;">Estado</th>
                    <th style="border: 1px solid #dddddd; padding: 8px;">Ocioso</th>
                    <th style="border: 1px solid #dddddd; padding: 8px;">Responsável</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${data}                                                      
                    </tbody >
        </table >
    `;