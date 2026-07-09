import { QuizQuestion, SolvedExercise, PracticeChallenge, GlossaryTerm, TimelineEvent, TriviaCard } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é o principal objetivo de uma operação de "Drill Down"?',
    options: [
      'Subir na hierarquia de dados para obter uma visão mais resumida e consolidada.',
      'Descer na hierarquia de dados para visualizar informações com maior nível de detalhes e menor agrupamento.',
      'Consultar duas tabelas fato simultaneamente compartilhando dimensões conformadas.',
      'Substituir o histórico de dados antigo por dados mais recentes sem deixar rastro.'
    ],
    correctAnswer: 1,
    explanation: 'O Drill Down "desce" na hierarquia (ex: de Ano para Mês), aumentando a granularidade e revelando os detalhes que compõem o resumo anterior.'
  },
  {
    id: 2,
    question: 'Qual das alternativas descreve corretamente o problema da "Contagem Duplicada"?',
    options: [
      'É quando o banco de dados falha ao inserir chaves estrangeiras duplicadas.',
      'Ocorre quando atualizamos uma dimensão do Tipo 1 e perdemos o histórico anterior.',
      'Acontece quando multiplicamos valores de uma tabela fato ao uni-la diretamente a uma dimensão multivalorada sem usar pesos ou tabelas de ponte apropriadas.',
      'É o cálculo correto feito por agregados que soma duas vezes para garantir integridade fiscal.'
    ],
    correctAnswer: 2,
    explanation: 'Ao juntar uma linha da tabela fato com múltiplos registros de uma dimensão multivalorada (ex: 2 interesses de 1 cliente), a linha da fato é repetida no JOIN. Sem o fator de alocação, a soma simples inflará artificialmente os totais.'
  },
  {
    id: 3,
    question: 'O que caracteriza uma Dimensão de Histórico do "Tipo 2" (SCD Tipo 2)?',
    options: [
      'As alterações de atributos sobrescrevem os valores antigos diretamente, perdendo o histórico.',
      'Os dados antigos nunca mudam, e novos registros de alterações são simplesmente rejeitados.',
      'Cria-se um novo campo na tabela para armazenar o valor atual e outro para o valor anterior.',
      'Cria-se uma nova linha física para a alteração, controlada por campos como Data Início, Data Fim, Versão e Status Ativo.'
    ],
    correctAnswer: 3,
    explanation: 'O SCD Tipo 2 rastreia o histórico completo criando um novo registro (linha) para cada alteração física. Ele usa chaves substitutas diferentes para ligar o fato histórico ao estado correto da dimensão naquele período.'
  },
  {
    id: 4,
    question: 'Em modelagem dimensional, o que é uma "Bridge Table" (Tabela de Ponte)?',
    options: [
      'Uma tabela fato que conecta duas bases de dados relacionais distintas de servidores diferentes.',
      'Uma tabela intermediária usada para resolver relacionamentos Muitos-para-Muitos entre uma tabela fato e uma dimensão multivalorada.',
      'Uma tabela auxiliar que guarda cópias de segurança do banco de dados.',
      'Um índice especial que conecta chaves primárias textuais no Star Schema.'
    ],
    correctAnswer: 1,
    explanation: 'A Bridge Table fica posicionada no meio da relação N:M. Ela agrupa chaves individuais sob uma chave de grupo (Group Key) que a tabela fato pode apontar de maneira limpa.'
  },
  {
    id: 5,
    question: 'Para que serve um "Fator de Alocação" em uma tabela de ponte?',
    options: [
      'Para definir a quantidade máxima de conexões simultâneas que o banco de dados suporta.',
      'Para dividir e distribuir um valor financeiro de forma proporcional entre os membros de um grupo, garantindo que a soma feche com o faturamento original.',
      'Para acelerar as buscas do navegador de agregados.',
      'Para deletar registros inativos de dimensões antigas.'
    ],
    correctAnswer: 1,
    explanation: 'O fator de alocação (ex: 0.5 para cada um de dois vendedores) distribui de forma proporcional e matemática a receita ou custos, evitando inflação de valores agregados.'
  },
  {
    id: 6,
    question: 'Qual a principal vantagem das tabelas "Agregadas" em um Data Warehouse?',
    options: [
      'Garantir que os dados fiquem normalizados na terceira forma normal.',
      'Reduzir drasticamente o tempo de resposta de consultas que exigem somas e médias ao ler dados pré-calculados em menor volume físico.',
      'Permitir a inserção de dados em tempo real no banco OLTP.',
      'Resolver o relacionamento muitos-para-muitos automaticamente.'
    ],
    correctAnswer: 1,
    explanation: 'As tabelas agregadas contêm resumos pré-processados (ex: vendas mensais por filial). Consultá-las lê significativamente menos dados físicos do que processar milhões de registros atômicos individuais, acelerando a resposta.'
  },
  {
    id: 7,
    question: 'O que faz o componente conhecido como "Navegador em Agregados"?',
    options: [
      'Um navegador web especializado para engenheiros de dados visualizarem esquemas físicos.',
      'Um robô de ETL que apaga tabelas fatos vazias.',
      'Um sistema inteligente que redireciona consultas SQL do usuário automaticamente para a tabela agregada ideal sem que ele precise alterar o código da consulta.',
      'Um painel visual onde os diretores decidem quais agregados criar.'
    ],
    correctAnswer: 2,
    explanation: 'O Navegador de Agregados atua como um middleware inteligente: se o usuário pede faturamento anual, ele reescreve a consulta para buscar na tabela de agregação anual em vez da tabela fato de cupons detalhados.'
  },
  {
    id: 8,
    question: 'Qual é uma dimensão considerada "Conformada"?',
    options: [
      'Uma dimensão que possui apenas dados numéricos e sem textos descritivos.',
      'Uma dimensão que foi compactada usando algoritmos de compressão zip.',
      'Uma dimensão compartilhada por múltiplas tabelas fato com exatamente a mesma estrutura, chaves e semântica de dados (ex: Dimensão Tempo ou Dimensão Produto).',
      'Uma dimensão que só aceita atualizações do Tipo 0.'
    ],
    correctAnswer: 2,
    explanation: 'Dimensões conformadas são a base do barramento dimensional de Ralph Kimball. Elas garantem integridade conceitual quando cruzamos dados de fatos distintos (como Vendas e Estoque) por meio de Drill Across.'
  },
  {
    id: 9,
    question: 'O que representa uma "Chave Substituta" (Surrogate Key) no contexto de modelagem dimensional?',
    options: [
      'Uma chave secreta para criptografia de dados confidenciais.',
      'A chave primária natural que vem diretamente do sistema transacional operacional (ex: número da placa do carro ou CPF).',
      'Um ID numérico simples e sequencial (geralmente inteiro) criado e controlado inteiramente pelo DW/ETL para identificar unicamente um registro de dimensão.',
      'Uma chave estrangeira temporária que é excluída após a consolidação da carga.'
    ],
    correctAnswer: 2,
    explanation: 'A Surrogate Key (SK) desvincula o DW de mudanças nos sistemas de origem, economiza espaço em disco por ser um número inteiro simples e permite gerenciar históricos (como no Tipo 2, onde um mesmo código de cliente possui várias SKs).'
  },
  {
    id: 10,
    question: 'Quando NÃO se deve criar tabelas agregadas?',
    options: [
      'Quando o volume de dados é pequeno (ex: menos de 5 milhões de linhas) e as consultas normais rodam em milissegundos.',
      'Quando os usuários solicitam faturamento mensal com frequência.',
      'Quando o banco de dados possui discos de alta velocidade.',
      'Sempre se deve criar agregados para todas as combinações, sem exceções.'
    ],
    correctAnswer: 0,
    explanation: 'Criar agregados gasta espaço em disco e aumenta a janela de processamento do ETL. Se as tabelas originais já são rápidas, as agregadas trazem mais custo de manutenção do que benefícios reais.'
  },
  {
    id: 11,
    question: 'O que descreve um "Membro Primário" na modelagem de grupos multivalorados?',
    options: [
      'O primeiro registro inserido no banco de dados na data de criação.',
      'A designação de um item ou participante principal do grupo que receberá 100% do crédito financeiro em relatórios de contabilidade simplificados para evitar divisões.',
      'O ID do servidor principal que gerencia o cluster de banco de dados.',
      'A única chave primária que pode ser usada em tabelas fato.'
    ],
    correctAnswer: 1,
    explanation: 'O Membro Primário canaliza o faturamento ou custo para um único responsável contábil, eliminando a necessidade de somas ponderadas em visões executivas consolidadas.'
  },
  {
    id: 12,
    question: 'O que descreve a SCD do "Tipo 3"?',
    options: [
      'Armazenar histórico completo duplicando linhas indefinidamente.',
      'Rastrear histórico parcial guardando o valor atual e o valor imediatamente anterior em colunas separadas do mesmo registro.',
      'Uma dimensão que apaga dados após 3 anos de inatividade.',
      'Modelagem onde apenas 3 dimensões são permitidas por tabela fato.'
    ],
    correctAnswer: 1,
    explanation: 'O Tipo 3 usa colunas adicionais (ex: CidadeAtual, CidadeAnterior). É útil quando você deseja ver dados sob duas perspectivas (atual e imediatamente anterior), sem criar múltiplas linhas na dimensão.'
  },
  {
    id: 13,
    question: 'Quais são os principais critérios para a criação inteligente de agregados?',
    options: [
      'Cor da interface, tamanho do monitor do usuário e tipo de navegador web.',
      'Apenas a quantidade de tabelas fato existentes no projeto.',
      'Frequência de consultas, alto fator de compressão, custo de armazenamento/janela de ETL e impacto crítico nos negócios.',
      'Utilizar inteligência artificial para apagar todos os dados atômicos detalhados.'
    ],
    correctAnswer: 2,
    explanation: 'Criar agregados exige um balanço cuidadoso de custos e benefícios. Deve-se priorizar consultas frequentes com alta taxa de consolidação de dados e que gerem valor de performance aos usuários de negócios.'
  },
  {
    id: 14,
    question: 'Como a "Distribuição Estatística" dos dados afeta as tabelas fatos?',
    options: [
      'Ela define as cores que os gráficos gerenciais devem usar.',
      'Ela altera fisicamente os valores monetários das vendas armazenadas.',
      'Ela dita a dispersão dos dados nas colunas (como sazonalidades ou concentração de vendas), influenciando a seletividade dos índices e as chaves de particionamento do banco.',
      'Ela garante que todos os meses do ano tenham exatamente o mesmo número de compras.'
    ],
    correctAnswer: 2,
    explanation: 'Conhecer a distribuição (uniforme, concentrada, etc.) ajuda a definir chaves de partição e índices. Por exemplo, se 90% dos dados concentram-se no último mês, um particionamento mensal otimizará muito as buscas.'
  },
  {
    id: 15,
    question: 'Em um Star Schema, qual é a principal característica da Tabela Fato?',
    options: [
      'Contém apenas textos descritivos e longos sobre o negócio.',
      'Contém as chaves estrangeiras que ligam às dimensões e as métricas numéricas aditivas que medem o evento de negócio.',
      'Contém o cadastro completo de clientes atualizado diariamente.',
      'É altamente normalizada e nunca possui chaves estrangeiras compostas.'
    ],
    correctAnswer: 1,
    explanation: 'A tabela fato registra os eventos quantitativos do negócio (quanto vendeu, qual custo, que horas). Ela é estruturada por chaves estrangeiras (FKs) que conectam o evento ao contexto descritivo das dimensões.'
  }
];
export const solvedExercises = [
  {
    id: 1,
    title: 'Caso E-Commerce Global: Transição de SCD Tipo 1 para Tipo 2',
    scenario: 'Uma grande varejista operava seu Data Warehouse tratando a dimensão "Clientes" com Slowly Changing Dimension (SCD) do Tipo 1. Diante disso, sempre que um cliente mudava de endereço, o campo "Cidade" era atualizado diretamente. O setor financeiro e logístico percebeu que as análises de "Faturamento por Região" do passado estavam distorcidas, mostrando vendas históricas de 2024 em cidades para onde os clientes só se mudaram em 2026.',
    challenge: 'Como redesenhar a tabela "Dim_Cliente" e o processo de ETL para rastrear as mudanças geográficas e corrigir os relatórios de faturamento histórico de forma correta?',
    solution: 'Migrar a dimensão para SCD Tipo 2. 1. Adicionar uma Chave Substituta (Surrogate Key) sequencial `sk_cliente` como chave primária da dimensão, desvinculando-a da chave natural `id_cliente` do ERP. 2. Adicionar as colunas de controle: `data_inicio`, `data_fim`, `versao` e `status_ativo` (Booleano). 3. No processo de ETL, quando houver mudança de endereço, a linha ativa antiga recebe `data_fim` igual ao momento da mudança e `status_ativo = false`. Uma nova linha é inserida com `sk_cliente` incremental, os dados novos de endereço, `data_inicio` atual, `data_fim` infinito (ou 9999-12-31) e `status_ativo = true`. 4. As vendas históricas na Fato continuam associadas à `sk_cliente` que estava ativa no momento em que a compra ocorreu, preservando a cidade correta daquela época.',
    techNotes: 'Certifique-se de re-indexar a tabela de fatos se ela precisar ser atualizada retroativamente, embora o ideal de um DW seja que o histórico já gravado nunca seja alterado, apenas as novas vendas herdem a nova Surrogate Key ativa.'
  },
  {
    id: 2,
    title: 'Modelagem de Sinistros de Seguros com Bridge Table',
    scenario: 'Uma seguradora automotiva precisa modelar os acidentes registrados (sinistros). Um único sinistro pode ser causado por múltiplos fatores simultâneos (ex: neblina na pista, falha nos freios do veículo, embriaguez do condutor). A diretoria precisa saber quanto dinheiro foi gasto por causa de cada "Fator de Causa", mas a soma das causas não pode inflar o custo total real dos sinistros pagos pela empresa.',
    challenge: 'Desenhar um modelo dimensional que suporte múltiplos fatores por sinistro sem duplicar o faturamento ou causar relatórios financeiros inflados.',
    solution: 'Criar uma Bridge Table de Causas. 1. Criar a dimensão `Dim_Causa_Sinistro` contendo os fatores possíveis de forma isolada. 2. Criar a tabela de ponte `Ponte_Grupo_Causa` contendo as colunas: `id_grupo_causa`, `sk_causa_sinistro` e `fator_alocacao` (decimal). 3. Se um sinistro custou R$ 10.000 e teve 2 causas de peso igual, criamos um grupo de causas no banco associando as duas chaves de causa com `fator_alocacao = 0.5` para cada uma. 4. A tabela `Fato_Sinistro` aponta apenas para o `id_grupo_causa`. 5. Para relatórios contábeis de auditoria, as métricas da Fato são multiplicadas pelo `fator_alocacao` da ponte, fazendo com que a soma detalhada resulte exatamente nos R$ 10.000 reais corretos.',
    techNotes: 'Para relatórios rápidos de marketing ou prevenção de acidentes, pode-se ignorar o fator de alocação para calcular o impacto bruto absoluto ("quantos sinistros tiveram neblina como uma das causas"). Isso é chamado de Relatório de Impacto de Cobertura.'
  },
  {
    id: 3,
    title: 'Agregação Inteligente de Telecomunicações',
    scenario: 'Uma empresa de telefonia registra 3 bilhões de registros de chamadas telefônicas por mês na tabela `Fato_Ligacoes`. Os cientistas de dados precisam de dados atômicos de segundos, mas a gerência corporativa e os diretores de vendas apenas acessam relatórios comparativos mensais para avaliar o faturamento por plano de celular e região do DDD.',
    challenge: 'Desenhar uma estratégia de agregados que acelere os relatórios de nível de diretoria em menos de 2 segundos, sem comprometer o acesso dos cientistas aos dados atômicos e sem exceder a janela de carga noturna de 4 horas.',
    solution: 'Criar uma tabela agregada `Fato_Ligacoes_Mes_Plano` com fator de compressão superior a 10.000x. 1. Sumarizar os registros diários em totais mensais contendo as chaves: `sk_mes` (Tempo), `sk_plano` (Plano), `sk_regiao` (Geografia). 2. As métricas agregadas serão: `quantidade_chamadas_total`, `minutos_totais` e `faturamento_total`. 3. Configurar um Aggregate Navigator na ferramenta de BI (como Looker ou Tableau) para redirecionar automaticamente as buscas de faturamento mensal para essa nova tabela resumida. 4. Manter a tabela atômica `Fato_Ligacoes` particionada diariamente em armazenamento frio de nuvem com índices específicos para os cientistas de dados.',
    techNotes: 'O fator de compressão reduzirá 3 bilhões de linhas mensais para aproximadamente 50.000 linhas na agregada, o que permite buscas instantâneas e consome menos de 0.01% de armazenamento comparado à atômica.'
  }
];

export const practiceChallenges: PracticeChallenge[] = [
  {
    id: 1,
    title: 'Desafio SCD: Nova Categoria de Produto',
    description: 'Um produto mudou sua categoria de "Eletrônicos" para "Decoração" para fins tributários. Queremos salvar essa mudança de forma que as vendas antigas do produto continuem aparecendo sob a categoria antiga "Eletrônicos" nos balanços de 2025, e as novas vendas a partir de hoje caiam em "Decoração". Qual técnica SCD devemos usar?',
    options: [
      'SCD Tipo 0 (Nunca atualizar o produto no banco)',
      'SCD Tipo 1 (Sobrescrever a categoria antiga diretamente na dimensão)',
      'SCD Tipo 2 (Inserir nova linha na dimensão gerando uma nova chave substituta e inativando a anterior)',
      'SCD Tipo 3 (Criar uma coluna "Categoria Anterior" na tabela fato)'
    ],
    correctAnswer: 'SCD Tipo 2 (Inserir nova linha na dimensão gerando uma nova chave substituta e inativando a anterior)',
    feedback: {
      success: 'Excelente! A SCD Tipo 2 cria uma linha nova com uma chave substituta inédita. A tabela fato mantém a chave antiga associada às vendas antigas, garantindo faturamento histórico imutável.',
      error: 'Incorreto. Pense em como o banco de dados pode manter o histórico de vendas antigas apontando para a categoria antiga, enquanto as novas apontam para a nova. O Tipo 1 sobrescreve o passado, e o Tipo 0 ignora a mudança.'
    }
  },
  {
    id: 2,
    title: 'Desafio Métricas: Evitando a Duplicação de Somas',
    description: 'Uma conta conjunta pertence a dois clientes (João e Maria) e tem saldo de R$ 5.000. Para criar um relatório de faturamento que mostre o saldo por cliente sem que o saldo total do banco apareça como R$ 10.000 (soma de João e Maria), qual modelagem resolve o problema de forma robusta?',
    options: [
      'Duplicar a linha de saldo da conta na fato para cada cliente participante.',
      'Criar uma Bridge Table com um fator de alocação de 0.5 (50%) para cada participante no grupo da conta.',
      'Ignorar o cliente Maria e cadastrar apenas o João na base de dados.',
      'Normalizar a tabela fato na 3ª Forma Normal deletando a dimensão Clientes.'
    ],
    correctAnswer: 'Criar uma Bridge Table com um fator de alocação de 0.5 (50%) para cada participante no grupo da conta.',
    feedback: {
      success: 'Perfeito! O fator de alocação distribui o saldo de R$ 5.000 de forma ponderada (R$ 2.500 para João e R$ 2.500 para Maria), fazendo com que a soma geral continue resultando exatamente em R$ 5.000, evitando faturamento fantasma.',
      error: 'Incorreto. Duplicar as linhas gera o problema da contagem duplicada. Deletar clientes ou ignorá-los oculta informações valiosas de marketing. A Bridge Table com fator de ponderação é a solução de ouro.'
    }
  },
  {
    id: 3,
    title: 'Desafio Desempenho: O Agregado Ideal',
    description: 'Você precisa otimizar o tempo de carregamento de um painel de faturamento que calcula vendas anuais por país. A tabela fato atômica diária possui 400 milhões de registros. Qual das seguintes opções de tabelas agregadas oferece o melhor fator de compressão mantendo a capacidade de responder à consulta?',
    options: [
      'Agregado de vendas diárias por cidade',
      'Agregado de vendas semanais por produto e filial',
      'Agregado de vendas mensais por país',
      'Manter a tabela atômica original sem nenhum agregado'
    ],
    correctAnswer: 'Agregado de vendas mensais por país',
    feedback: {
      success: 'Correto! Agregar por Mês e por País reduz drasticamente o número de linhas (de 400 milhões diários detalhados para apenas algumas dezenas de países multiplicados por 12 meses). Isso gera excelente velocidade de carregamento.',
      error: 'Incorreto. Agregados por cidade diária ou produto semanal ainda contêm muito volume de dados e detalhe, gerando baixo fator de compressão para um dashboard que só precisa de dados anuais por país.'
    }
  }
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Data Warehouse (DW)',
    definition: 'Um repositório de dados corporativo centralizado, projetado especificamente para consultas, relatórios, tomada de decisão e análise histórica, em vez de processamento de transações diárias.',
    category: 'Geral'
  },
  {
    term: 'Modelagem Dimensional',
    definition: 'Técnica de design de banco de dados otimizada para consultas de Business Intelligence, estruturada em tabelas Fato (métricas quantitativas) e tabelas Dimensão (contexto descritivo).',
    category: 'Modelagem'
  },
  {
    term: 'Star Schema (Esquema Estrela)',
    definition: 'A arquitetura dimensional clássica onde uma tabela fato centralizada é cercada e conectada diretamente a tabelas dimensão desnormalizadas, assemelhando-se a uma estrela.',
    category: 'Modelagem'
  },
  {
    term: 'Snowflake Schema (Esquema Floco de Neve)',
    definition: 'Uma variação do Star Schema onde as tabelas dimensão são parcialmente ou totalmente normalizadas em múltiplas tabelas associadas, gerando uma estrutura mais complexa de junções.',
    category: 'Modelagem'
  },
  {
    term: 'Tabela Fato (Fact Table)',
    definition: 'A tabela central em um modelo dimensional que armazena os eventos quantitativos mensuráveis (métricas como preço, quantidade, duração) e chaves estrangeiras para as dimensões.',
    category: 'Componentes'
  },
  {
    term: 'Tabela Dimensão (Dimension Table)',
    definition: 'Tabelas que armazenam os atributos qualitativos descritivos e textuais que dão contexto às métricas da tabela fato (ex: quem comprou, onde, quando, o que).',
    category: 'Componentes'
  },
  {
    term: 'Chave Substituta (Surrogate Key)',
    definition: 'Uma chave primária artificial gerada sequencialmente pelo processo de ETL no DW (geralmente um número inteiro simples), usada para desvincular o DW de chaves transacionais dinâmicas.',
    category: 'Componentes'
  },
  {
    term: 'Granularidade (Granularity)',
    definition: 'O nível de detalhe físico representado por uma única linha de dados em uma tabela fato (ex: uma linha por venda diária individual versus uma linha por faturamento consolidado mensal).',
    category: 'Geral'
  },
  {
    term: 'Dimensões Conformadas',
    definition: 'Dimensões idênticas ou subconjuntos matemáticos estritos de dimensões que possuem as mesmas chaves e significados em diferentes processos de negócios, permitindo o Drill Across.',
    category: 'Modelagem'
  },
  {
    term: 'ETL / ELT',
    definition: 'Extract, Transform, Load (Extrair, Transformar, Carregar). Processo de engenharia de dados responsável por mover informações dos sistemas de origem para o Data Warehouse.',
    category: 'Geral'
  },
  {
    term: 'OLAP (Online Analytical Processing)',
    definition: 'Sistemas e ferramentas de software projetados para realizar análises e consultas multidimensionais complexas em alta velocidade sobre volumes históricos de dados.',
    category: 'Geral'
  },
  {
    term: 'OLTP (Online Transaction Processing)',
    definition: 'Sistemas transacionais operacionais tradicionais otimizados para registrar transações de negócios rápidas em tempo real (ex: caixas registradoras, ERPs, CRMs).',
    category: 'Geral'
  },
  {
    term: 'Métrica Aditiva',
    definition: 'Medidas numéricas na tabela fato que podem ser somadas de forma lógica ao longo de qualquer dimensão disponível (ex: faturamento bruto, quantidade de itens).',
    category: 'Componentes'
  },
  {
    term: 'Métrica Não-Aditiva',
    definition: 'Medidas numéricas que não fazem sentido serem somadas diretamente, como margens de lucro percentuais ou temperaturas médias, exigindo médias ponderadas ou outras fórmulas.',
    category: 'Componentes'
  },
  {
    term: 'Inmon vs Kimball',
    definition: 'As duas grandes filosofias de DW. Bill Inmon defende um modelo centralizado normalizado na 3ª Forma Normal. Ralph Kimball defende um modelo descentralizado de Star Schemas integrados.',
    category: 'Geral'
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '1970',
    title: 'Fundação do Modelo Relacional',
    description: 'Edgar F. Codd publica seu artigo revolucionário descrevendo o Modelo Relacional de Dados, estabelecendo as bases para bancos de dados modernos.',
    author: 'Edgar F. Codd'
  },
  {
    year: '1988',
    title: 'Arquitetura do Data Warehouse',
    description: 'Barry Devlin e Paul Murphy da IBM publicam o primeiro artigo formalizando a arquitetura de um "Business Data Warehouse", focado no fluxo corporativo de informações.',
    author: 'Barry Devlin & Paul Murphy'
  },
  {
    year: '1992',
    title: 'Filosofia Corporativa Unificada (CIF)',
    description: 'Bill Inmon publica "Building the Data Warehouse", defendendo uma abordagem integrada com armazenamento normalizado corporativo central (3NF). É considerado o "Pai do Data Warehouse".',
    author: 'Bill Inmon'
  },
  {
    year: '1996',
    title: 'Revolução Dimensional (Star Schema)',
    description: 'Ralph Kimball publica "The Data Warehouse Toolkit", introduzindo a Modelagem Dimensional e o Star Schema de forma prática, focando em facilidade de uso e velocidade para o BI.',
    author: 'Ralph Kimball'
  },
  {
    year: '2008',
    title: 'Data Warehouses em Nuvem',
    description: 'Surgem as primeiras arquiteturas de armazenamento massivo em nuvem e bancos MPP (Massively Parallel Processing), que mudam drasticamente o custo de processamento de Big Data.',
    author: 'Indústria Cloud'
  },
  {
    year: '2012',
    title: 'Bancos Serverless e Colunares',
    description: 'Lançamento do Google BigQuery e Amazon Redshift, permitindo analisar petabytes de dados dimensionais em segundos usando consultas SQL nativas e de baixo custo.',
    author: 'Google / Amazon'
  },
  {
    year: '2020+',
    title: 'A Era do Lakehouse',
    description: 'Unificação dos conceitos de Data Lake e Data Warehouse. Plataformas modernas gerenciam dados estruturados, semiestruturados e não estruturados mantendo integridade e ACID.',
    author: 'Comunidade Open Source'
  }
];

export const triviaCards: TriviaCard[] = [
  {
    id: 1,
    title: 'Origem do Nome',
    fact: 'O termo "Data Warehouse" (Armazém de Dados) foi inspirado nos armazéns físicos de distribuição de mercadorias. A ideia era criar um local centralizado onde "mercadorias de informação" chegam desorganizadas, são higienizadas, organizadas em prateleiras lógicas e distribuídas de forma limpa para os gerentes.',
    impact: 'Esse conceito consolidou o papel do processo de ETL de preparar, rotular e organizar a informação para facilitar a entrega e o consumo rápido.'
  },
  {
    id: 2,
    title: 'O Primeiro Data Warehouse',
    fact: 'Nos anos 1980, um dos primeiros casos de sucesso de DW foi construído pelo Walmart. Eles modelaram compras de clientes em um sistema Teradata com capacidade de incríveis (para a época) 1 Terabyte. Isso permitiu descobrir padrões sazonais bizarros e otimizar estoques globais antes dos concorrentes.',
    impact: 'O Walmart usou esses dados para posicionar fraldas e cervejas próximas no corredor nas sextas-feiras, descobrindo que maridos enviados para comprar fraldas compravam cerveja por impulso.'
  },
  {
    id: 3,
    title: 'Por que o Star Schema é tão rápido?',
    fact: 'Os bancos de dados relacionais são projetados para fazer junções (JOINs). No Star Schema, qualquer dimensão descritiva está a exatamente um JOIN de distância da tabela fato central. Isso reduz drasticamente a profundidade da árvore de busca que o otimizador SQL precisa percorrer para entregar o resultado.',
    impact: 'Ao contrário de modelos altamente normalizados onde são necessários 15 JOINs em cascata, o Esquema Estrela resolve consultas complexas em uma fração do tempo.'
  }
];
