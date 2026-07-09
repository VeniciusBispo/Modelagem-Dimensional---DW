import React, { useState } from 'react';
import { 
  BarChart3, 
  Cpu, 
  Network, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  Database,
  Search,
  Check,
  TrendingUp,
  LineChart,
  HelpCircle
} from 'lucide-react';

export default function AggregateVisualizer() {
  // Query Performance States
  const [queryState, setQueryState] = useState<'idle' | 'running_raw' | 'running_agg' | 'done_raw' | 'done_agg'>('idle');
  const [queryProgress, setQueryProgress] = useState(0);

  // Aggregate Criteria selector
  const [selectedScenario, setSelectedScenario] = useState<string>('ano_pais');

  // Stats distribution selector
  const [selectedDist, setSelectedDist] = useState<'uniform' | 'normal' | 'concentrated'>('normal');

  const scenarios = {
    ano_pais: {
      name: 'Vendas Anuais por País',
      compression: 'Alto (10.000.000x menor)',
      frequency: 'Alta (80% dos relatórios da gerência)',
      etlCost: 'Baixo (Calculado uma vez por dia)',
      decision: 'RECOMENDADO',
      color: 'text-emerald-450 bg-emerald-500/10 border-emerald-500/25',
      icon: CheckCircle,
      explanation: 'Excelente agregado. Alta compressão e consultas frequentes garantem ganho maciço de desempenho para a empresa sem custos relevantes de disco.'
    },
    hora_vendedor: {
      name: 'Vendas por Hora e Vendedor',
      compression: 'Baixíssimo (Apenas 2x menor)',
      frequency: 'Baixa (Uso eventual operacional)',
      etlCost: 'Altíssimo (Milhões de combinações diárias)',
      decision: 'REJEITADO',
      color: 'text-red-400 bg-red-500/10 border-red-500/25',
      icon: XCircle,
      explanation: 'Péssimo agregado. Quase não há ganho de espaço (compressão de apenas 2x) e a tabela gerada seria gigantesca, gerando explosão dimensional e estourando o tempo de carga de ETL.'
    },
    mes_loja_categoria: {
      name: 'Faturamento Mensal por Loja e Categoria',
      compression: 'Médio (500x menor)',
      frequency: 'Média (Utilizado no fechamento do mês)',
      etlCost: 'Médio (Processado mensalmente)',
      decision: 'ANALISAR VIABILIDADE',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
      icon: ShieldAlert,
      explanation: 'Caso limite. Depende do volume de dados geral do DW. Recomendado se as buscas de fechamento mensal estiverem levando mais de 10 segundos.'
    }
  };

  const executeRawQuery = () => {
    setQueryState('running_raw');
    setQueryProgress(0);
    const interval = setInterval(() => {
      setQueryProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setQueryState('done_raw');
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const executeAggQuery = () => {
    setQueryState('running_agg');
    setQueryProgress(0);
    const interval = setInterval(() => {
      setQueryProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setQueryState('done_agg');
          return 100;
        }
        return prev + 50;
      });
    }, 50);
  };

  return (
    <div className="space-y-12">
      
      {/* 11 & 15. AGREGADOS & NAVEGADOR (CORRIDA DE PERFORMANCE) */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2 font-serif italic">
              <Cpu className="w-5 h-5 text-emerald-400" />
              11 & 15. O Impacto dos Agregados e o Navegador Inteligente
            </h3>
            <p className="text-sm text-zinc-405 mt-1">
              Simule uma consulta de faturamento anual de vendas para observar a diferença gritante de desempenho entre varrer a tabela bruta e a agregada.
            </p>
          </div>
          <div className="flex gap-2 font-sans">
            <button
              onClick={executeRawQuery}
              disabled={queryState === 'running_raw' || queryState === 'running_agg'}
              className="px-3 py-1.5 text-xs bg-red-650/10 hover:bg-red-650/25 border border-red-500/20 text-red-400 font-semibold rounded-lg disabled:bg-zinc-900 disabled:text-zinc-600 cursor-pointer transition-colors flex items-center gap-1"
            >
              <Database className="w-3.5 h-3.5" /> Tabela Bruta (500M)
            </button>
            <button
              onClick={executeAggQuery}
              disabled={queryState === 'running_raw' || queryState === 'running_agg'}
              className="px-3 py-1.5 text-xs bg-emerald-650 text-zinc-950 font-bold hover:bg-emerald-500 rounded-lg disabled:bg-zinc-900 disabled:text-zinc-600 cursor-pointer transition-colors flex items-center gap-1"
            >
              <Cpu className="w-3.5 h-3.5" /> Tabela Agregada (1k)
            </button>
            <button
              onClick={() => setQueryState('idle')}
              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-450 transition-colors cursor-pointer"
              title="Resetar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 space-y-6 font-sans">
          
          {/* Track 1: Raw Query */}
          <div className="space-y-2 font-sans">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-red-400 font-semibold flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Tabela Fato Bruta (vendas_detalhada)
              </span>
              <span className="text-zinc-500">
                {queryState === 'running_raw' ? 'Buscando blocos no disco...' : queryState === 'done_raw' ? 'Concluído em 4.8 segundos!' : 'Pronto para busca'}
              </span>
            </div>
            <div className="w-full bg-[#111113] h-6 rounded-lg overflow-hidden border border-zinc-800 relative flex items-center px-3 text-[10px] font-mono text-zinc-400">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-red-650/15 transition-all duration-150" 
                style={{ width: `${queryState === 'running_raw' ? queryProgress : queryState === 'done_raw' ? 100 : 0}%` }}
              />
              <span className="relative z-10">
                {queryState === 'running_raw' ? `Varrendo partições físicas: ${queryProgress}%` : queryState === 'done_raw' ? 'Faturamento Calculado: R$ 120.000.000 (Lidos 500.000.000 registros)' : '500M linhas para somar'}
              </span>
            </div>
          </div>

          {/* Track 2: Aggregated Query */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Tabela Agregada (fato_vendas_ano_agregada)
              </span>
              <span className="text-zinc-500">
                {queryState === 'running_agg' ? 'Buscando sumário...' : queryState === 'done_agg' ? 'Concluído em 0.002 segundos!' : 'Pronto para busca'}
              </span>
            </div>
            <div className="w-full bg-[#111113] h-6 rounded-lg overflow-hidden border border-zinc-800 relative flex items-center px-3 text-[10px] font-mono text-zinc-400">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-emerald-500/20 transition-all duration-150" 
                style={{ width: `${queryState === 'running_agg' ? queryProgress : queryState === 'done_agg' ? 100 : 0}%` }}
              />
              <span className="relative z-10">
                {queryState === 'running_agg' ? 'Varrendo agregados: 100%' : queryState === 'done_agg' ? 'Faturamento Calculado: R$ 120.000.000 (Lidos 1.000 registros pré-soma)' : 'Apenas 1.000 registros resumidos para ler'}
              </span>
            </div>
          </div>

          {/* Aggregate Navigator Interceptor Animation */}
          <div className="bg-[#111113] p-4 rounded-lg border border-zinc-800 text-xs text-zinc-350 leading-relaxed font-mono relative">
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-amber-450 font-bold border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 rounded uppercase">
              <Network className="w-3 h-3 animate-ping" /> Aggregate Navigator Ativo
            </div>
            <div className="text-zinc-500 mb-2">// Interceptação de Consulta em tempo real:</div>
            <div>
              <span className="text-purple-400">SELECT</span> <span className="text-emerald-450">SUM</span>(valor) <span className="text-purple-400">FROM</span> fato_vendas <span className="text-purple-400">WHERE</span> ano = 2025;
            </div>
            <div className="my-2 text-amber-400">
              &rarr; <span className="font-bold">REESCRITA AUTOMÁTICA EM MEMÓRIA:</span>
            </div>
            <div className="text-emerald-400 font-semibold">
              <span className="text-purple-400">SELECT</span> faturamento_anual <span className="text-purple-400">FROM</span> fato_vendas_ano_agregada <span className="text-purple-400">WHERE</span> ano = 2025;
            </div>
            <p className="text-[10px] text-zinc-500 mt-3 leading-normal">
              O Navegador de Agregados reescreveu a consulta original sem que o analista de BI precisasse trocar o nome da tabela no painel, economizando tempo e evitando erros.
            </p>
          </div>

        </div>
      </div>

      {/* 12. CRITÉRIOS PARA CRIAÇÃO DE AGREGADOS */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <h3 className="text-lg font-semibold text-zinc-200 mb-2 font-serif italic">12. Critérios para Criação de Agregados</h3>
        <p className="text-sm text-zinc-400 mb-6">
          Selecione uma proposta de agregado abaixo para testar sua viabilidade técnica contra os pilares do Data Warehouse.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-sans">
          {Object.keys(scenarios).map((key) => {
            const sc = scenarios[key as keyof typeof scenarios];
            return (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                  selectedScenario === key 
                    ? 'bg-emerald-500/10 border-emerald-550 shadow-lg shadow-emerald-500/5' 
                    : 'bg-[#09090b] border-zinc-800 hover:bg-zinc-800/50'
                }`}
              >
                <span className="text-[10px] font-mono text-zinc-500 block mb-1 uppercase tracking-wider">PROPOSTA DE AGREGADO</span>
                <span className="font-semibold text-sm text-zinc-200 block">{sc.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected aggregate analysis */}
        {(() => {
          const active = scenarios[selectedScenario as keyof typeof scenarios];
          const IconComponent = active.icon;
          return (
            <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 font-sans">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
                <span className="text-sm font-bold text-zinc-300">Análise de Viabilidade Técnica:</span>
                <span className={`px-3 py-1 text-xs font-extrabold rounded-full border flex items-center gap-1 ${active.color}`}>
                  <IconComponent className="w-4 h-4" /> {active.decision}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs font-mono">
                <div className="p-3 bg-[#111113] rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">FATOR DE COMPRESSÃO</span>
                  <span className="font-bold text-zinc-200">{active.compression}</span>
                </div>
                <div className="p-3 bg-[#111113] rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">FREQUÊNCIA DE CONSULTAS</span>
                  <span className="font-bold text-zinc-200">{active.frequency}</span>
                </div>
                <div className="p-3 bg-[#111113] rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">CUSTO DE ARMAZENAMENTO & ETL</span>
                  <span className="font-bold text-zinc-200">{active.etlCost}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                <strong className="text-emerald-400 font-mono">Justificativa do Arquiteto:</strong> {active.explanation}
              </p>
            </div>
          );
        })()}
      </div>

      {/* 13. REQUISITOS COMUNS DOS USUÁRIOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Requisitos Comuns */}
        <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
          <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2 font-serif italic">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            13. Relatórios Comuns de Usuários de BI
          </h3>
          <p className="text-sm text-zinc-405 mb-6">
            Representação visual das consultas gerenciais clássicas alimentadas pelas dimensões consolidadas.
          </p>

          <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 space-y-6">
            {/* Sales by Month Chart */}
            <div className="space-y-3 font-sans">
              <span className="text-xs font-semibold text-zinc-300 block">Vendas por Mês (Análise de Tendência)</span>
              <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2">
                {[45, 60, 55, 80, 95, 110].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div 
                      className="w-full bg-emerald-500/80 rounded-t hover:bg-emerald-400 transition-all duration-300"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-mono text-zinc-500">M{idx+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales by Region Chart */}
            <div className="space-y-2 text-xs font-mono font-sans">
              <span className="text-xs font-semibold text-zinc-300 block font-sans">Vendas por Região (% do Total)</span>
              
              <div className="space-y-3 pt-2 font-sans">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-zinc-300">Sudeste</span>
                    <span className="text-emerald-400 font-bold">52%</span>
                  </div>
                  <div className="w-full bg-[#111113] h-2 rounded-full overflow-hidden border border-zinc-800">
                    <div className="bg-emerald-500 h-full" style={{ width: '52%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-zinc-300">Nordeste</span>
                    <span className="text-emerald-400 font-bold">28%</span>
                  </div>
                  <div className="w-full bg-[#111113] h-2 rounded-full overflow-hidden border border-zinc-800">
                    <div className="bg-emerald-500 h-full" style={{ width: '28%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-zinc-300">Outros</span>
                    <span className="text-emerald-400 font-bold">20%</span>
                  </div>
                  <div className="w-full bg-[#111113] h-2 rounded-full overflow-hidden border border-zinc-800">
                    <div className="bg-emerald-500 h-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 14. DISTRIBUIÇÃO ESTATÍSTICA */}
        <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
          <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2 font-serif italic">
            <LineChart className="w-5 h-5 text-emerald-400" />
            14. Distribuição Estatística dos Dados
          </h3>
          <p className="text-sm text-zinc-405 mb-6">
            Selecione o padrão estatístico para visualizar sua curva e compreender seu impacto em índices e partições físicas de bancos de dados.
          </p>

          <div className="flex gap-2 mb-6 font-sans">
            {['uniform', 'normal', 'concentrated'].map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDist(dist as any)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors border cursor-pointer ${
                  selectedDist === dist 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold' 
                    : 'bg-[#09090b] border-zinc-800 hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                {dist === 'uniform' ? 'Uniforme' : dist === 'normal' ? 'Normal (Gauss)' : 'Concentrado (Pareto)'}
              </button>
            ))}
          </div>

          <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 flex flex-col justify-between min-h-[220px]">
            {/* SVG Interactive Chart representing distribution */}
            <div className="h-28 w-full flex items-center justify-center pt-4">
              <svg viewBox="0 0 300 100" className="w-full h-full text-emerald-400 overflow-visible">
                {selectedDist === 'uniform' && (
                  <>
                    <path d="M 10,70 L 290,70" fill="none" stroke="currentColor" strokeWidth="3" className="animate-pulse" />
                    <line x1="10" y1="90" x2="290" y2="90" stroke="#27272a" strokeWidth="1" strokeDasharray="3" />
                  </>
                )}
                {selectedDist === 'normal' && (
                  <>
                    <path d="M 10,90 Q 75,90 150,20 Q 225,90 290,90" fill="none" stroke="currentColor" strokeWidth="3" className="animate-pulse" />
                    <line x1="150" y1="20" x2="150" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="3" />
                  </>
                )}
                {selectedDist === 'concentrated' && (
                  <>
                    <path d="M 10,20 Q 40,85 100,90 L 290,90" fill="none" stroke="currentColor" strokeWidth="3" className="animate-pulse" />
                    <line x1="30" y1="35" x2="30" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="3" />
                  </>
                )}
                
                {/* Axes */}
                <line x1="10" y1="90" x2="290" y2="90" stroke="#27272a" strokeWidth="1.5" />
                <line x1="10" y1="10" x2="10" y2="90" stroke="#27272a" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-zinc-300 font-mono bg-[#111113] p-3 rounded-lg border border-zinc-800 font-sans">
              {selectedDist === 'uniform' && (
                <div>
                  <span className="font-semibold text-emerald-400 block mb-1">Distribuição Uniforme:</span>
                  Dados espalhados por igual. Excelente para particionamento horizontal (ex: ID do cliente). Garante partições físicas de tamanhos idênticos e saudáveis.
                </div>
              )}
              {selectedDist === 'normal' && (
                <div>
                  <span className="font-semibold text-emerald-400 block mb-1">Distribuição Normal (Sino):</span>
                  Maior parte dos dados concentrada no centro (ex: faixa etária ou preços de produtos médios). Os índices funcionam muito bem nas bordas de baixa ocorrência.
                </div>
              )}
              {selectedDist === 'concentrated' && (
                <div>
                  <span className="font-semibold text-emerald-400 block mb-1">Distribuição Concentrada (Lei de Pareto / 80-20):</span>
                  Pouquíssimos itens representam quase todo o volume (ex: campeões de venda ou períodos festivos). Risco de sobrecarga de partição física ("Hotspots"). Exige indexação inteligente.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
