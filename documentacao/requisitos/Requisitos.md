# LEVANTAMENTO PATRIMONIAL REQUISITOS

## Requisitos Funcionais Desejáveis:
| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
:---|:---|:---|
|RF-001 | Gerenciar Inventário  |   Cadastrar, alterar inventário realizado por setor.
|RF-002 | Seleção de Ambiente  |   Os usuários devem poder selecionar o ambiente ou local onde desejam realizar o inventário. Isso pode incluir diferentes seções de um armazém, prateleiras específicas, salas, etc.
|RF-003 | Lançamento Manual de Itens  |   Deve ser possível adicionar itens manualmente ao inventário, fornecendo informações como nome do item, descrição, quantidade, condições e outras peculiaridades relevantes.
|RF-004 | Lançamento com Escaneamento de Identificação  |   Realizar leitura de QR Code, Códigos de Barra e Números (OCR) com Câmera do celular.
|RF-005 | Gerenciar Usuários  |   Cadastrar, Alterar e Excluir.
|RF-006 | Login Usuário  |   Os usuários devem poder fazer login utilizando credenciais válidas, como e-mail e senha.
|RF-007 | Listagem de Inventário |  O aplicativo deve fornecer uma interface para os usuários visualizarem o inventário disponível, incluindo todos os itens listados.
|RF-008 | Listagem de Itens e suas Condições  |   O aplicativo deve exibir uma lista detalhada dos itens presentes no inventário, juntamente com suas condições atuais e outras informações relevantes fornecidas pelos usuários durante o processo de lançamento.
|RF-009 | Gerenciar Relatórios  |   Gerar e baixar relatórios de: ● Bens não encontrados ● Bens encontrados não pertencentes ao setor ● Bens sem etiqueta ● Bens com divergência
## Requisitos Não Funcionais Desejáveis:
| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
:---|:---|:---|
|RNF-001 | Permitir acesso concorrente às informações do banco |   A aplicação deve gerenciar a acesso concorrente a base de dados de forma que mais de um usuário possa incluir informações na mesma base e ao mesmo tempo.
|RNF-002 | Otimizar a performance de operações com dados no banco  |   O inventário pode conter dezenas de milhares de itens, portanto a aplicação deve ser robusta o suficiente para lidar com os dados sem problemas.
|RNF-003 | Atualização em Tempo Real |   O sistema deve ser capaz de atualizar o inventário em tempo real conforme novos itens são adicionados ou as condições dos itens existentes são modificadas.