

export const tabela = async () => {
   
    

    let linhasTabela = '';
    for (const item of items) {
        linhasTabela += `
            <tr>
                <td style="border: 1px solid #dddddd; padding: 8px;">${item.nome}</td>
                <td style="border: 1px solid #dddddd; padding: 8px;">${item.etiqueta}</td>
                <td style="border: 1px solid #dddddd; padding: 8px;">${item.estado}</td>
                <td style="border: 1px solid #dddddd; padding: 8px;">${item.ocioso}</td>
                <td style="border: 1px solid #dddddd; padding: 8px;">${item.responsavel}</td>
            </tr>
        `;
    }

    return `
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
                ${linhasTabela}
            </tbody>
        </table>
    `;
};