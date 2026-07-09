import { Topic } from '../types';

export const topicsData: Topic[] = [
  {
    id: 'drill-down',
    number: 1,
    title: 'Drill Down',
    category: 'Navegação',
    shortDesc: 'Navegação detalhada que desce na hierarquia de dados, de resumos para detalhes.',
    simpleDef: 'É como dar um zoom em um mapa. Você começa vendo o país inteiro e vai clicando até ver a sua rua e a sua casa.',
    technicalDef: 'Operação OLAP que desagrega dados de um nível superior para um nível inferior ao longo de uma hierarquia dimensional definida (por exemplo, Ano -> Mês -> Dia). Isso aumenta o nível de granularidade dos dados exibidos e diminui o nível de agrupamento.',
    practicalExample: 'Ao analisar as vendas anuais de uma loja de chocolates, você clica no ano "2025" e o sistema exibe as vendas divididas por semestre. Clicando no semestre, vê as vendas por mês, depois por semana, e finalmente por dia.',
    businessExample: 'A rede de varejo Lojas Renner usa o Drill Down em seus dashboards para identificar qual filial específica ou mesmo qual vendedor foi responsável pela queda de vendas de uma determinada categoria de roupas em uma semana específica.',
    pros: [
      'Permite identificar a causa raiz de anomalias nos dados.',
      'Facilita a análise de desempenho de níveis micro (vendedores, lojas, produtos).',
      'Mantém a interface inicial limpa, revelando complexidade sob demanda.'
    ],
    cons: [
      'Pode sobrecarregar o banco de dados se consultas de baixo nível exigirem varredura de bilhões de linhas sem indexação correta.',
      'Exige uma estrutura hierárquica dimensional rígida e bem modelada para funcionar.'
    ],
    commonErrors: [
      'Ignorar a consistência da hierarquia (pular do Ano direto para o Dia sem passar por Mês ou Semana).',
      'Permitir Drill Down em dimensões não relacionadas hierarquicamente.'
    ],
    whenToUse: 'Sempre que o usuário precisar investigar comportamentos específicos ocultos em médias ou totais agregados.',
    whenNotToUse: 'Quando os dados de destino não possuem relação hierárquica lógica ou quando as chaves estrangeiras não suportam granularidades mais finas.'
  },
  {
    id: 'drill-up',
    number: 2,
    title: 'Drill Up (Roll Up)',
    category: 'Navegação',
    shortDesc: 'Agregação dos dados subindo na hierarquia, consolidando detalhes em resumos.',
    simpleDef: 'É o oposto do zoom. É afastar o mapa para ver o estado inteiro em vez de apenas uma rua específica.',
    technicalDef: 'Operação OLAP que realiza a agregação ou consolidação dos dados ao subir na hierarquia dimensional (ex: Dia -> Semana -> Mês -> Ano). Esta operação reduz a granularidade (detalhes) e aumenta o nível de abstração e agrupamento dos dados usando funções como SUM, COUNT ou AVG.',
    practicalExample: 'Você está visualizando a quantidade de pães vendidos dia a dia na padaria. Ao fazer Drill Up, os dados diários são somados e apresentados por semana, depois por mês, e por fim consolidados no total do ano.',
    businessExample: 'A diretoria da Ambev utiliza o Drill Up para consolidar as vendas diárias de milhares de rotas de distribuição em relatórios de faturamento mensal por estado e região geográfica para tomadas de decisão estratégica.',
    pros: [
      'Excelente para apresentações executivas e relatórios de alto nível.',
      'Reduz significativamente o volume de dados exibido na tela, facilitando a identificação de tendências gerais.',
      'Reduz o ruído de flutuações diárias irrelevantes para decisões de longo prazo.'
    ],
    cons: [
      'Pode mascarar problemas graves em níveis inferiores (ex: uma média alta que esconde uma filial falindo).',
      'Inviabiliza a descoberta de padrões de comportamento de clientes individuais.'
    ],
    commonErrors: [
      'Tentar aplicar Drill Up em métricas não-aditivas (como margem de lucro percentual ou temperaturas médias sem a devida ponderação).',
      'Subir em hierarquias fracas ou mal configuradas, gerando somas sem sentido de produtos diferentes.'
    ],
    whenToUse: 'Ao preparar relatórios para gerentes seniores e diretores que precisam de uma visão macro do negócio e tendências sazonais.',
    whenNotToUse: 'Quando se está investigando fraudes, perdas pontuais ou comportamento de nicho de mercado.'
  },
  {
    id: 'drill-across',
    number: 3,
    title: 'Drill Across',
    category: 'Navegação',
    shortDesc: 'Consulta simultânea a duas ou mais tabelas fato compartilhando dimensões conformadas.',
    simpleDef: 'É cruzar informações de duas fontes diferentes (como vendas e estoque) usando uma ponte comum (como o mesmo produto e a mesma data) para ver se as coisas batem.',
    technicalDef: 'Processo de combinar dados de múltiplas tabelas fato que possuem granularidades diferentes, mas compartilham uma ou mais dimensões conformadas (idênticas em estrutura e conteúdo). O Drill Across executa consultas separadas para cada tabela fato e depois une os resultados em nível de aplicação usando as chaves das dimensões conformadas.',
    practicalExample: 'Você quer ver quanto vendeu de um produto e quanto ainda tem dele no estoque físico. A venda está na Fato Vendas e o estoque está na Fato Estoque. Ambas compartilham a Dimensão Produto. O sistema busca os dados em ambas e os exibe lado a lado alinhados por produto.',
    businessExample: 'O Magazine Luiza utiliza o Drill Across para correlacionar a Fato Vendas Online com a Fato Estoque nos Centros de Distribuição e a Fato Logística de Entrega, permitindo que o time de compras veja se o estoque atende à demanda de vendas projetada para a Black Friday.',
    pros: [
      'Evita a criação de uma única tabela fato gigantesca e ineficiente ("superfato").',
      'Mantém a modularidade do Data Warehouse (arquitetura de barramento de Kimball).',
      'Permite comparar processos de negócios independentes de forma limpa.'
    ],
    cons: [
      'Requer governança de dados rígida para garantir que as dimensões compartilhadas sejam verdadeiramente "conformadas".',
      'A junção dos dados na aplicação ou em consultas SQL complexas (com subconsultas e FULL OUTER JOIN) pode ser lenta.'
    ],
    commonErrors: [
      'Tentar fazer Drill Across com dimensões que têm nomes parecidos mas dados diferentes (não conformadas).',
      'Realizar JOIN direto entre duas tabelas fato, o que gera um produto cartesiano devastador e contagens duplicadas.'
    ],
    whenToUse: 'Quando processos de negócios distintos (ex: Vendas, Compras, Estoque) precisam ser analisados juntos sob as mesmas perspectivas (Tempo, Produto, Loja).',
    whenNotToUse: 'Se os processos de negócios puderem ser representados por uma única tabela fato com a mesma granularidade e tempo de ocorrência.'
  },
  {
    id: 'dimensoes-multivaloradas',
    number: 4,
    title: 'Dimensões Multivaloradas',
    category: 'Modelagem Avançada',
    shortDesc: 'Situação onde uma linha de uma tabela fato se associa a múltiplos valores de uma dimensão.',
    simpleDef: 'É quando uma única compra ou transação envolve vários elementos do mesmo tipo ao mesmo tempo. Exemplo: Uma conta bancária que tem dois donos (titular e cotitular) ou um paciente que recebe vários diagnósticos numa consulta.',
    technicalDef: 'Ocorre quando a relação entre um evento registrado na tabela fato (com granularidade de transação) e uma dimensão associada é de 1-para-Muitos (1:N) ou Muitos-para-Muitos (N:M), violando a premissa básica do Star Schema de que cada linha da fato deve se associar a exatamente uma chave substituta de cada dimensão.',
    practicalExample: 'No faturamento de uma consulta médica, o paciente recebe três diagnósticos simultâneos (Gripe, Hipertensão e Enxaqueca). Se colocarmos os diagnósticos diretamente na tabela de faturamento, como dividiremos o custo da consulta de R$ 300 entre eles sem duplicar o valor?',
    businessExample: 'Seguradoras de veículos como a Porto Seguro enfrentam dimensões multivaloradas ao associar um único sinistro (acidente) a múltiplos condutores ou múltiplas causas (ex: pista molhada, falha mecânica, distração), necessitando rastrear custos de forma isolada e integrada.',
    pros: [
      'Representa com precisão a realidade complexa dos negócios sem simplificações artificiais.',
      'Permite análises ricas e cruzadas de perfis de clientes de múltiplos atributos.'
    ],
    cons: [
      'Aumenta drasticamente a complexidade das consultas SQL escritas pelos usuários.',
      'Gera alto risco de erros de cálculo (como contagem duplicada ou inflação de receitas) se não for tratada corretamente.'
    ],
    commonErrors: [
      'Criar colunas fixas na tabela fato (Diagnostico1, Diagnostico2, Diagnostico3), o que limita a quantidade de valores e dificulta buscas.',
      'Duplicar a linha da fato para cada valor da dimensão, inflando a receita total registrada.'
    ],
    whenToUse: 'Sempre que houver uma relação natural de muitos-para-muitos entre os eventos da fato e as entidades da dimensão que precise ser mantida para auditoria ou análise.',
    whenNotToUse: 'Se for aceitável escolher apenas um atributo principal (como "Diagnóstico Primário") e descartar os secundários nas análises financeiras primárias.'
  },
  {
    id: 'alternativas-de-projeto',
    number: 5,
    title: 'Alternativas de Projeto',
    category: 'Modelagem Avançada',
    shortDesc: 'Abordagens diferentes para lidar com dimensões multivaloradas e granularidade.',
    simpleDef: 'Diferentes formas de desenhar o seu banco de dados para resolver um problema. Você pode escolher a forma mais rápida (mas desorganizada) ou a forma mais estruturada (mas complexa).',
    technicalDef: 'Estratégias de design para resolver relações muitos-para-muitos no Star Schema. Inclui três abordagens principais: 1. Achatar a dimensão (criar colunas repetitivas na fato); 2. Duplicar linhas da fato (gerando o problema da contagem duplicada); 3. Utilizar tabelas auxiliares de ligação (Bridge Tables) com fatores de ponderação.',
    practicalExample: 'Para registrar os interesses de um cliente (Esportes, Tecnologia, Viagens), podemos: 1. Criar colunas fixas "Interesse_1", "Interesse_2" no cadastro de clientes; 2. Salvar o cliente várias vezes na fato de vendas (multiplicando o valor da venda); 3. Usar uma Tabela de Ponte (Bridge Table) intermediária.',
    businessExample: 'Bancos de investimento como o Itaú BBA escolhem alternativas de projeto ao modelar contas conjuntas. Eles podem manter apenas o titular principal para relatórios de faturamento rápido, ou usar uma Bridge Table de clientes para campanhas de marketing direcionadas a todos os co-proprietários.',
    pros: [
      'Flexibilidade para adaptar o modelo de dados ao perfil de hardware e maturidade da equipe.',
      'Permite balancear performance de leitura versus facilidade de escrita.'
    ],
    cons: [
      'Escolhas ruins podem arruinar a performance de relatórios e confundir ferramentas modernas de BI (como Power BI ou Tableau).'
    ],
    commonErrors: [
      'Adotar a alternativa mais fácil (duplicação de dados) sem implementar travas de soma nos relatórios, resultando em decisões financeiras erradas baseadas em faturamento fictício.'
    ],
    whenToUse: 'Na fase de arquitetura de dados, avaliando o volume de dados multivalorados e como as ferramentas de BI do cliente lidam com relacionamentos complexos.',
    whenNotToUse: 'Quando as dimensões do negócio seguem estritamente o padrão de relacionamento 1:N simples (uma linha da fato aponta para exatamente uma linha de cada dimensão).'
  },
  {
    id: 'multiplas-chaves',
    number: 6,
    title: 'Múltiplas Chaves',
    category: 'Modelagem Avançada',
    shortDesc: 'A composição de uma chave primária composta na tabela fato a partir de várias chaves estrangeiras.',
    simpleDef: 'É como a receita de um bolo. Para identificar uma venda única, você precisa saber: Quem comprou? O que comprou? Quando comprou? Em qual loja comprou? A combinação de todas essas respostas identifica aquela venda.',
    technicalDef: 'O conceito de que uma tabela fato não possui uma chave primária simples de coluna única. Sua chave primária é tipicamente uma chave composta formada pela união das chaves estrangeiras (FKs) que referenciam todas as dimensões associadas. Adicionalmente, as chaves das dimensões no DW são chaves substitutas (Surrogate Keys) numéricas e sequenciais, não as chaves naturais dos sistemas transacionais (Operational Keys).',
    practicalExample: 'Uma linha na tabela `fato_vendas` contém: `id_tempo: 20260708`, `id_produto: 452`, `id_cliente: 9811`, `id_loja: 12`. Juntas, essas quatro chaves estrangeiras formam a chave única daquela transação, permitindo acessar detalhes de cada entidade correspondente.',
    businessExample: 'A rede de drogarias RaiaDrogasil usa chaves compostas em suas tabelas fatos de vendas diárias para identificar de forma exclusiva a combinação exata de medicamento vendido, receita médica vinculada, cliente cadastrado no programa de fidelidade, loja física e convênio de desconto utilizado.',
    pros: [
      'Garante integridade referencial absoluta entre eventos de negócio e dimensões.',
      'Facilita a indexação composta de tabelas fato, acelerando filtros multidimensionais.',
      'O uso de chaves substitutas numéricas reduz o espaço de armazenamento no disco.'
    ],
    cons: [
      'Chaves compostas gigantescas (com mais de 10 dimensões) aumentam o tamanho físico dos índices e podem degradar a performance de inserção (cargas de ETL).'
    ],
    commonErrors: [
      'Usar chaves naturais textuais (como CPF, CNPJ ou código SKU de produto) diretamente na tabela fato em vez de chaves substitutas numéricas geradas pelo ETL.'
    ],
    whenToUse: 'Em todas as tabelas fato (transacionais, acumuladas ou instantâneas) para representar de forma correta o contexto dimensional de cada métrica registrada.',
    whenNotToUse: 'Em tabelas fato sem dimensões definidas (fatos sem fatos - "factless fact tables"), embora estas ainda usem chaves para registrar a ocorrência de eventos.'
  },
  {
    id: 'bridge-table',
    number: 7,
    title: 'Bridge Table (Tabela de Ponte)',
    category: 'Pontes e Alocação',
    shortDesc: 'Tabela intermediária usada para resolver relacionamentos de muitos-para-muitos entre dimensões e tabelas fato.',
    simpleDef: 'Imagine que uma venda de seguro cobre três pessoas da mesma família. Em vez de duplicar a venda três vezes, criamos uma "ponte" que lista quem são as pessoas daquele grupo familiar específico. A tabela de vendas aponta apenas para o "grupo", e a ponte diz quem está no grupo.',
    technicalDef: 'Tabela física posicionada entre uma dimensão e uma tabela fato para resolver a relação muitos-para-muitos (N:M). A Bridge Table contém pares de chaves: a chave da entidade individual da dimensão e uma chave de grupo (Group Key) que é referenciada pela tabela fato. Ela também costuma conter um fator de ponderação (Allocation Factor) para permitir a correta distribuição de valores aditivos.',
    practicalExample: 'Um cliente realiza um empréstimo de R$ 10.000 que possui dois fiadores associados. A tabela fato aponta para o ID de Grupo de Fiadores `G_004` na Bridge Table. A Bridge Table aponta que o grupo `G_004` é composto pelos fiadores `F_01` (João) e `F_02` (Maria).',
    businessExample: 'A Netflix usa tabelas de ponte para associar um filme/série (Fato Exibição) a múltiplos gêneros (Dimensão Gênero). Um único filme como "Matrix" pertence a "Ficção Científica" e "Ação", e a Bridge Table mapeia esse relacionamento sem duplicar as estatísticas de visualização.',
    pros: [
      'Resolve elegantemente o problema da contagem duplicada e de relacionamentos N:M.',
      'Preserva a granularidade original da tabela fato e evita modificações na sua estrutura.',
      'Permite a emissão de relatórios consolidados ("impacto total") e relatórios ponderados ("valores alocados").'
    ],
    cons: [
      'Aumenta o número de JOINs na consulta SQL, o que pode reduzir a performance se as tabelas contiverem centenas de milhões de registros.',
      'Pode confundir usuários finais se não for encapsulada por visões (Views) ou modelos semânticos amigáveis.'
    ],
    commonErrors: [
      'Esquecer de aplicar o fator de ponderação nas somas gerais, resultando em valores totais muito maiores do que a realidade da empresa.'
    ],
    whenToUse: 'Quando entidades de uma dimensão mudam de grupo de forma dinâmica ou quando um evento da fato se relaciona nativamente com múltiplos elementos de uma dimensão.',
    whenNotToUse: 'Quando a relação é estritamente 1:N ou quando a análise aceita apenas o registro de um membro principal (Primary Member).'
  },
  {
    id: 'problema-da-contagem-duplicada',
    number: 8,
    title: 'Problema da Contagem Duplicada',
    category: 'Pontes e Alocação',
    shortDesc: 'Erro de cálculo clássico que ocorre ao somar métricas de fatos ligadas a dimensões multivaloradas sem ponte ponderada.',
    simpleDef: 'Se um cliente faz uma compra de R$ 100 e tem interesse em "Esportes" e "Música", e você duplicar a linha para mostrar os dois interesses, o faturamento total parecerá ser de R$ 200. Isso é um faturamento fantasma que quebra a contabilidade!',
    technicalDef: 'Fenômeno que ocorre quando uma ferramenta de BI executa um comando SUM em uma coluna de valor aditivo de uma tabela fato que foi unida a uma dimensão multivalorada por meio de um relacionamento Muitos-para-Muitos desprotegido. A repetição das linhas da fato para acomodar múltiplos valores da dimensão multiplica o valor original no conjunto de resultados retornado pelo banco.',
    practicalExample: 'Uma apólice de seguro de R$ 5.000 é contratada por 2 pessoas. Se o sistema retornar duas linhas (uma para cada segurado) e o analista somar o faturamento, o resultado será R$ 10.000. O caixa real do banco, porém, só tem R$ 5.000.',
    businessExample: 'Agências de publicidade que gerenciam campanhas multicanais sofrem com contagem duplicada quando um mesmo cliente clica em anúncios no Instagram e no Google antes de comprar. Se as fatos de atribuição não usarem fatores de alocação, a soma de vendas atribuídas aos canais será o dobro das vendas reais registradas no ERP.',
    pros: [
      'Compreender este problema é o primeiro passo para projetar DWs corporativos financeiramente confiáveis.',
      'Impõe a necessidade de regras rígidas de validação de balanço de contas (conciliação).'
    ],
    cons: [
      'É um dos erros mais comuns e catastróficos em implementações de Business Intelligence, destruindo a confiança da diretoria nos dados fornecidos.'
    ],
    commonErrors: [
      'Achar que o banco de dados vai resolver o problema sozinho sem uma modelagem de Bridge Table ou sem usar DISTINCT nas contagens e fatores de alocação nas somas.'
    ],
    whenToUse: 'Sempre como caso de teste prioritário durante o desenvolvimento de modelos dimensionais para garantir que a soma das vendas detalhadas por dimensão coincida exatamente com o faturamento contábil geral.',
    whenNotToUse: 'Não aplicável em dimensões estritamente monovaloradas (onde cada fato aponta para apenas um registro).'
  },
  {
    id: 'fator-de-alocacao',
    number: 9,
    title: 'Fator de Alocação (Allocation Factor)',
    category: 'Pontes e Alocação',
    shortDesc: 'Percentual numérico usado para distribuir valores de forma justa entre múltiplos elementos multivalorados.',
    simpleDef: 'É a regra de divisão. Se dois departamentos trabalharam em um projeto de R$ 1.000, podemos definir que o Departamento A recebe R$ 600 (fator de 60%) e o Departamento B recebe R$ 400 (fator de 40%) para que a soma continue dando R$ 1.000.',
    technicalDef: 'Um valor numérico fracionário entre 0 e 1 (geralmente cuja soma para um grupo é igual a 1.0 ou 100%) armazenado na Bridge Table. Ao multiplicar as métricas da tabela fato por esse fator em consultas SQL, garante-se que a agregação dos dados não cause contagem duplicada, distribuindo proporcionalmente os valores aditivos.',
    practicalExample: 'Uma venda de celular de R$ 2.000 é associada a dois vendedores na mesma venda. A Bridge Table define um fator de alocação de 0.5 (50%) para cada um. Em relatórios de desempenho, cada vendedor recebe R$ 1.000 de crédito. A soma total de crédito de vendas continua sendo R$ 2.000.',
    businessExample: 'Hospitais como o Albert Einstein usam fatores de alocação para distribuir os custos operacionais de uma cirurgia complexa de R$ 50.000 entre as diferentes equipes médicas envolvidas (anestesia, cirurgia geral, enfermagem), garantindo uma análise de margem de lucro precisa por especialidade.',
    pros: [
      'Garante que a soma de qualquer subcategoria feche perfeitamente com o total contábil (aditividade perfeita).',
      'Permite regras flexíveis de distribuição (divisão igual, divisão baseada em esforço, ou divisão histórica).'
    ],
    cons: [
      'Exige manutenção ativa dos fatores na base de dados durante cargas de ETL.',
      'Dificulta consultas ad-hoc feitas por usuários que não conhecem a coluna do fator de alocação.'
    ],
    commonErrors: [
      'Não manter a soma dos fatores igual a 1.0 para cada grupo, resultando em sub-alocação (valores somam menos que o real) ou super-alocação (valores somam mais).'
    ],
    whenToUse: 'Em Bridge Tables que lidam com faturamento, custos, horas trabalhadas ou qualquer métrica financeira que deva somar um total fixo.',
    whenNotToUse: 'Quando a análise exige relatórios de "Impacto Total" onde cada membro do grupo deve receber o valor total sem divisões (ex: mapeamento de sintomas médicos onde cada sintoma tem impacto de 100%).'
  },
  {
    id: 'membro-primario',
    number: 10,
    title: 'Membro Primário (Primary Member)',
    category: 'Pontes e Alocação',
    shortDesc: 'A designação de um item principal em um grupo multivalorado para fins de simplificação financeira.',
    simpleDef: 'É definir quem é o "chefe" do grupo. Se um casal abre uma conta conjunta, definimos o titular (membro primário) e o cônjuge (membro secundário). Se quisermos somar o dinheiro do banco sem complicação, atribuímos o valor total apenas ao titular.',
    technicalDef: 'Estratégia de modelagem utilizada para eliminar a complexidade da Bridge Table em relatórios financeiros de alto nível. Consiste em adicionar um indicador booleano (`is_primary`) ou uma coluna dedicada na tabela fato que aponta exclusivamente para a entidade principal do grupo multivalorado, canalizando 100% do valor contábil para ela em consultas padrão.',
    practicalExample: 'Um combo de eletrônicos é vendido por R$ 3.000 (contendo uma TV, um suporte e pilhas). A TV é definida como o "Membro Primário". Em relatórios financeiros rápidos, os R$ 3.000 são atribuídos integralmente à categoria "Televisores", ignorando os acessórios secundários para evitar fracionamento.',
    businessExample: 'A operadora de saúde Amil utiliza o conceito de Membro Primário para direcionar a cobrança e análise de custos de planos de saúde familiares para a figura do "Titular" do plano, tratando os dependentes como membros associados para fins fiscais e de faturamento contábil.',
    pros: [
      'Simplifica drasticamente as consultas SQL básicas (sem necessidade de JOINs complexos com Bridge Tables).',
      'Evita qualquer possibilidade de contagem duplicada em relatórios corporativos simplificados.',
      'Alinha o DW com estruturas contábeis rígidas de faturamento de Notas Fiscais.'
    ],
    cons: [
      'Oculta a participação e contribuição de membros secundários em análises de perfil de consumo.',
      'Pode gerar ressentimento ou distorções em comissões de equipes se o papel secundário for muito importante.'
    ],
    commonErrors: [
      'Esquecer de documentar quem é o membro primário, fazendo com que analistas de BI somem dados de titulares e dependentes de forma errônea.'
    ],
    whenToUse: 'Quando a gerência financeira exige relatórios simplificados onde cada transação deve obrigatoriamente cair em um único balde de categoria contábil sem divisões.',
    whenNotToUse: 'Quando a análise de marketing ou de comportamento de uso de produtos exige saber a participação de todos os membros de forma detalhada.'
  },
  {
    id: 'agregados',
    number: 11,
    title: 'Agregados',
    category: 'Desempenho e Agregados',
    shortDesc: 'Tabelas resumo pré-calculadas que aceleram drasticamente o tempo de resposta das consultas.',
    simpleDef: 'Se você sabe que toda segunda-feira seu chefe pede a média de vendas da semana passada, você calcula isso no domingo à noite e deixa o papel pronto na mesa. Assim, quando ele pedir, você responde em 1 segundo em vez de passar 2 horas somando nota por nota na frente dele.',
    technicalDef: 'Tabelas fato e dimensões derivadas que armazenam dados pré-calculados e sumarizados em um nível de granularidade mais alto (ex: vendas mensais por marca, em vez de vendas diárias por SKU). Elas reduzem o número de linhas físicas que o motor do banco de dados precisa ler (I/O) de bilhões de registros para apenas milhares ou centenas, acelerando consultas em até 1000 vezes.',
    practicalExample: 'Uma tabela `fato_vendas_detalhada` tem 500 milhões de linhas de cupons diários. A tabela agregada `fato_vendas_marca_mes` tem apenas 24.000 linhas de totais mensais. Uma consulta por vendas anuais da marca X roda instantaneamente na tabela de agregados.',
    businessExample: 'O Carrefour possui bilhões de registros de vendas de supermercado. Para alimentar o aplicativo de BI dos diretores no celular, eles criam agregados noturnos que calculam o faturamento diário por loja e departamento, permitindo que as telas carreguem instantaneamente.',
    pros: [
      'Melhoria monumental de performance e experiência do usuário final.',
      'Reduz a carga de processamento do banco de dados durante o horário comercial.',
      'Maximiza a utilidade de hardware antigo ou limitado.'
    ],
    cons: [
      'Consome espaço em disco adicional para armazenar as tabelas resumos.',
      'Aumenta o tempo e a complexidade da janela de ETL (carga diária de dados), que precisa atualizar os agregados.'
    ],
    commonErrors: [
      'Criar agregados para todas as combinações possíveis de dimensões (explosão dimensional), o que inviabiliza o tempo de carga e estoura o espaço em disco.'
    ],
    whenToUse: 'Quando as consultas dos usuários em tabelas detalhadas começam a demorar mais do que alguns segundos, prejudicando o uso de relatórios gerenciais recorrentes.',
    whenNotToUse: 'Quando os usuários exigem consultar a granularidade máxima de transação o tempo todo ou quando o volume total de dados do DW é pequeno (menos de 5 milhões de linhas).'
  },
  {
    id: 'criterios-criacao-agregados',
    number: 12,
    title: 'Critérios para Criação de Agregados',
    category: 'Desempenho e Agregados',
    shortDesc: 'Conjunto de regras para decidir quais tabelas de agregados valem a pena construir.',
    simpleDef: 'Não adianta preparar resumos de coisas que ninguém nunca pergunta. Você deve criar resumos apenas das perguntas mais comuns e difíceis, equilibrando o tempo de preparo com a utilidade do resumo.',
    technicalDef: 'Metodologia de tomada de decisão para projetar agregados baseada em quatro pilares: 1. Frequência de Consultas (consultas recorrentes do BI); 2. Fator de Compressão (a tabela resumida deve ter no mínimo 10x menos linhas que a original); 3. Custo de Armazenamento e Carga (ETL); 4. Desempenho Crítico de Negócios.',
    practicalExample: 'Ao analisar o histórico de uso, nota-se que 85% dos relatórios gerenciais consultam faturamento mensal por região. Criar o agregado `fato_vendas_regiao_mes` reduzirá o faturamento de 100 milhões para 1.200 linhas. Atende a todos os critérios com louvor!',
    businessExample: 'O banco digital Nubank monitora quais painéis do Looker são mais acessados por seus analistas e cria agregados específicos focados em faturamento diário por tipo de transação de cartão, economizando milhões de dólares em custos de processamento de nuvem.',
    pros: [
      'Evita desperdício de espaço de armazenamento de dados inúteis.',
      'Garante que os recursos de engenharia de dados sejam aplicados nos gargalos reais do negócio.'
    ],
    cons: [
      'Requer monitoramento constante das consultas dos usuários (análise de logs do banco de dados).'
    ],
    commonErrors: [
      'Criar agregados que têm quase o mesmo tamanho da tabela de origem (baixo fator de compressão), gastando processamento e disco sem ganho real de velocidade.'
    ],
    whenToUse: 'Durante a fase de otimização de performance do Data Warehouse, geralmente após as primeiras semanas de uso real do sistema de BI.',
    whenNotToUse: 'No início do projeto, quando ainda não se sabe quais perguntas os usuários farão com mais frequência.'
  },
  {
    id: 'requisitos-comuns-usuarios',
    number: 13,
    title: 'Requisitos Comuns dos Usuários',
    category: 'Desempenho e Agregados',
    shortDesc: 'As perguntas de negócio típicas que direcionam as decisões de agregação e modelagem.',
    simpleDef: 'O que os diretores e gerentes realmente querem saber no dia a dia? Eles querem ver tendências, comparar este mês com o mês anterior e identificar áreas de crescimento ou prejuízo de forma rápida.',
    technicalDef: 'Padrões de consulta repetitivos submetidos por analistas de negócios. Tipicamente envolvem: Análise de Tendência Temporal (Ano contra Ano, Mês contra Mês), Faturamento por Divisão Geográfica, Rankings de Produtos (Curva ABC - Top N) e Métricas de Atividade de Clientes (Clientes Ativos, Churn). Identificar esses padrões é crucial para alimentar o design de agregados e índices.',
    practicalExample: 'Um analista financeiro sempre abre o dashboard na segunda-feira querendo ver: "Margem de Lucro por Categoria de Produto no trimestre atual". Este requisito comum exige faturamento e custos agregados por categoria e trimestre.',
    businessExample: 'A rede de drogarias Droga Raia mapeou que a gerência regional sempre pede "Taxa de ruptura de estoque (itens faltantes) por loja na última semana". Eles criaram uma tabela agregada semanal de rupturas para acelerar essa consulta crítica.',
    pros: [
      'Foca o desenvolvimento do DW em gerar valor real para o negócio de forma imediata.',
      'Alinha o design de banco de dados com a experiência de uso final nos dashboards.'
    ],
    cons: [
      'Focar apenas nos requisitos comuns pode deixar o sistema inflexível para descobertas científicas de dados ad-hoc inesperadas.'
    ],
    commonErrors: [
      'Modelar o DW com base em como o sistema transacional (ERP) funciona, em vez de modelar com base em como os usuários fazem perguntas de negócio.'
    ],
    whenToUse: 'Na fase de levantamento de requisitos de qualquer projeto de Business Intelligence ou Engenharia de Dados.',
    whenNotToUse: 'Nunca deve ser ignorado. O DW existe exclusivamente para responder às perguntas dos usuários de forma rápida e precisa.'
  },
  {
    id: 'distribuicao-estatistica',
    number: 14,
    title: 'Distribuição Estatística dos Dados',
    category: 'Desempenho e Agregados',
    shortDesc: 'A forma como os dados estão espalhados pelas categorias e períodos, influenciando os índices e partições.',
    simpleDef: 'Os dados nem sempre são divididos de forma certinha. Às vezes, 80% das suas vendas acontecem no Natal (dados concentrados) ou 10% dos seus produtos representam 90% das suas vendas. Conhecer esse comportamento ajuda a organizar as gavetas do banco.',
    technicalDef: 'O padrão de dispersão dos dados nas colunas das dimensões e fatos (ex: uniforme, normal, Pareto/lei de potência). A distribuição dita a seletividade dos índices do banco de dados. Dados muito concentrados ou com "escassez" (Sparsity) exigem estratégias especiais de particionamento físico e indexação de bitmap para evitar buscas sequenciais pesadas na tabela fato.',
    practicalExample: 'Uma seguradora tem dados de sinistros. A distribuição por idade dos motoristas segue uma curva normal (concentrada entre 25 e 50 anos). A distribuição de fraudes é extremamente concentrada em um pequeno grupo. O banco de dados usa estatísticas de coluna para planejar o caminho mais rápido de busca.',
    businessExample: 'A Amazon estuda a distribuição de vendas de produtos. Com milhões de livros de "Cauda Longa" que vendem pouco e poucos "Bestsellers" que vendem milhões (Distribuição Concentrada/Pareto), a equipe de dados otimiza o armazenamento mantendo agregados diários apenas para os produtos líderes de vendas.',
    pros: [
      'Permite otimizar partições de banco de dados físicas de forma cirúrgica (ex: particionar por Mês se as vendas forem sazonais).',
      'Auxilia no design de algoritmos de compressão de dados mais eficientes.'
    ],
    cons: [
      'Requer conhecimento matemático/estatístico básico da equipe de engenharia de dados.',
      'A distribuição pode mudar ao longo dos anos, exigindo re-indexação e re-particionamento.'
    ],
    commonErrors: [
      'Assumir que os dados são distribuídos uniformemente e criar partições de tamanho igual que acabam vazias ou sobrecarregadas (desequilíbrio de partição).'
    ],
    whenToUse: 'Ao planejar índices avançados, chaves de partição e compressão de tabelas fato com centenas de milhões de linhas.',
    whenNotToUse: 'Em bancos de dados pequenos onde qualquer busca em tabela inteira leva menos de um segundo.'
  },
  {
    id: 'navegador-em-agregados',
    number: 15,
    title: 'Navegador em Agregados (Aggregate Navigator)',
    category: 'Desempenho e Agregados',
    shortDesc: 'Mecanismo inteligente que redireciona consultas automaticamente para a tabela agregada ideal sem intervenção do usuário.',
    simpleDef: 'É como ter um assistente pessoal inteligente. Você pergunta "Qual o faturamento de 2025?". O assistente sabe que tem uma planilha resumida e lê dela em 1 segundo, em vez de abrir um arquivo gigante de 1 milhão de páginas para somar tudo na hora. Você nem precisa dizer qual arquivo ele deve abrir.',
    technicalDef: 'Componente de middleware ou funcionalidade nativa do motor OLAP/BI que intercepta consultas SQL estruturadas submetidas pelos usuários ou relatórios. Ele analisa as tabelas solicitadas e as restrições da consulta e reescreve o SQL em tempo real, direcionando a busca para a tabela agregada mais adequada (de menor tamanho que responda à pergunta) em vez da tabela fato de granularidade atômica.',
    practicalExample: 'O usuário escreve `SELECT SUM(valor) FROM fato_vendas WHERE ano = 2025`. O Navegador de Agregados reescreve a consulta nos bastidores para: `SELECT soma_valor FROM fato_vendas_ano_agregada WHERE ano = 2025`, reduzindo o tempo de execução de minutos para milissegundos.',
    businessExample: 'Empresas que utilizam plataformas de BI modernas como o Tableau, Looker ou sistemas de cubos OLAP (como Microsoft SSAS) usam navegadores de agregados automáticos para manter painéis executivos rápidos sem que os diretores precisem entender de programação de bancos de dados.',
    pros: [
      'Transparência absoluta para o usuário final (ele não precisa saber que as tabelas agregadas existem).',
      'Simplifica a criação de relatórios (uma única consulta atende tanto a visões de alto nível quanto detalhadas).',
      'Permite que administradores de banco de dados criem e removam agregados sem quebrar os relatórios existentes.'
    ],
    cons: [
      'A configuração inicial do middleware de navegação pode ser complexa e exigir ferramentas caras.',
      'Se houver falha de sincronização no ETL, as tabelas agregadas podem retornar dados ligeiramente diferentes da tabela detalhada, gerando inconsistências.'
    ],
    commonErrors: [
      'Tentar forçar o usuário a escolher manualmente as tabelas agregadas em seus códigos, gerando manutenção pesada de relatórios sempre que o banco muda.'
    ],
    whenToUse: 'Em arquiteturas de BI corporativas maduras com múltiplos níveis de agregação e centenas de usuários ativos consumindo dados diariamente.',
    whenNotToUse: 'Em projetos pequenos ou simples onde os analistas escrevem suas próprias consultas SQL diretamente e o volume de dados é facilmente gerenciável.'
  },
  {
    id: 'scd',
    number: 16,
    title: 'Slowly Changing Dimensions (SCD)',
    category: 'Dimensões de Histórico',
    shortDesc: 'Abordagens para gerenciar e rastrear mudanças nos atributos das dimensões ao longo do tempo.',
    simpleDef: 'Como o banco de dados lida com mudanças na vida real? Se um cliente muda de endereço de São Paulo para o Rio de Janeiro, nós apagamos o histórico, guardamos a informação antiga ou criamos uma linha nova? É isso que as SCDs explicam.',
    technicalDef: 'Técnicas de modelagem de dados para gerenciar o aspecto temporal em tabelas dimensões. Como as dimensões contêm atributos descritivos que mudam lentamente ao longo do tempo (como cargo de funcionário, cidade de cliente ou preço de custo de produto), as SCDs definem políticas formais para preservar ou descartar o histórico dessas mudanças para análises retroativas.',
    practicalExample: 'Um cliente cadastrado em 2024 morava em Curitiba e comprou R$ 5.000 lá. Em 2025 ele se muda para Salvador. Se fizermos um relatório de vendas por cidade de todos os tempos, os R$ 5.000 de 2024 devem aparecer em Curitiba ou Salvador? A escolha da SCD dita este resultado.',
    businessExample: 'O iFood usa técnicas SCD para rastrear categorias de restaurantes. Se um restaurante de hambúrguer muda o foco para comida saudável, o iFood precisa decidir se o histórico de pedidos passados continua classificado como fast-food ou se migra para o novo perfil saudável.',
    pros: [
      'Garante a integridade histórica dos relatórios (capacidade de viajar no tempo).',
      'Permite análises comparativas de comportamento antes e depois de mudanças de perfil.'
    ],
    cons: [
      'Modelos que rastreiam histórico completo (Tipo 2) aumentam significativamente a quantidade de linhas das dimensões e complicam o processo de carga (ETL).'
    ],
    commonErrors: [
      'Não definir políticas de SCD no início do projeto, fazendo com que dados históricos sejam reescritos e alterados silenciosamente, invalidando relatórios financeiros auditados anteriormente.'
    ],
    whenToUse: 'Em todas as dimensões de um Data Warehouse para garantir consistência histórica e governança corporativa clara dos dados descritivos.',
    whenNotToUse: 'Em bancos transacionais operacionais (OLTP) onde apenas o estado atual dos dados é relevante para as operações diárias.'
  }
];
