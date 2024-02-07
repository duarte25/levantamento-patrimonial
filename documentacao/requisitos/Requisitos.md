# LEVANTAMENTO PATRIMONIAL REQUISITOS

## Requisitos Funcionais Desejáveis:
| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
:---|:---|:---|
|RF-001 | Cadastrar a Base de dados do inventário  |   Cadastrar a lista de bens queserão conferidos por setor pelo inventário.
|RF-002 | Gerenciar Inventário  |   Cadastrar, Alterar inventário realizado por setor.
|RF-003 | Gerenciar Escaneamento de Identificação  |   Realizar leitura de QR Code, Códigos de Barra e Números (OCR) com Câmera do celular.
|RF-004 | Gerenciar Relatórios  |   Gerar e baixar relatórios de: ● Bens não encontrados. ● Bens encontrados não pertencentes ao setor. ● Bens sem etiqueta. ● Bens com divergência.
|RF-005 | Gerenciar Usuários  |   Cadastrar, Alterar e Excluir.
## Requisitos Não Funcionais Desejáveis:
| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
:---|:---|:---|
|RNF-001 | Permitir acesso concorrente às informações do banco |   A aplicação deve gerenciar a acesso concorrente a base de dados de forma que mais de um usuário possa incluir informações na mesma base e ao mesmo tempo.
|RNF-002 | Otimizar a performance de operações com dados no banco.  |   O inventário pode conter dezenas de milhares de itens, portanto a aplicação deve ser robusta o suficiente para lidar com os dados sem problemas.

