import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Database, 
  Layers, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle,
  TrendingUp,
  Search,
  Grid
} from 'lucide-react';

export default function DrillVisualizer() {
  // Drill Down / Drill Up States
  const [drillLevel, setDrillLevel] = useState(0); // 0: Ano, 1: Semestre, 2: Trimestre, 3: Mês, 4: Semana, 5: Dia
  const [isPlayingDrillDown, setIsPlayingDrillDown] = useState(false);
  const [isPlayingDrillUp, setIsPlayingDrillUp] = useState(false);

  // Drill Across States
  const [drillAcrossActive, setDrillAcrossActive] = useState(false);
  const [drillAcrossStep, setDrillAcrossStep] = useState(0); // 0: Idle, 1: Querying Vendas, 2: Querying Estoque, 3: Joining, 4: Complete

  const drillLevels = [
    { label: 'Ano', value: '2025', desc: 'Granularidade Macro (1 registro por ano)', metric: 'Total Vendas: R$ 1.200.000', count: '120.000 itens' },
    { label: 'Semestre', value: '2º Semestre', desc: 'Faturamento consolidado em 6 meses', metric: 'Total Vendas: R$ 680.000', count: '68.000 itens' },
    { label: 'Trimestre', value: '4º Trimestre', desc: 'Faturamento consolidado em 3 meses', metric: 'Total Vendas: R$ 350.000', count: '35.000 itens' },
    { label: 'Mês', value: 'Novembro', desc: 'Granularidade Mensal (Faturamento mensal)', metric: 'Total Vendas: R$ 120.000', count: '12.000 itens' },
    { label: 'Semana', value: 'Semana 46', desc: 'Granularidade Semanal (Ritmo de vendas)', metric: 'Total Vendas: R$ 32.000', count: '3.200 itens' },
    { label: 'Dia', value: 'Quarta-feira, Dia 12', desc: 'Granularidade Diária (Cupons atômicos)', metric: 'Total Vendas: R$ 5.400', count: '540 itens' }
  ];

  // Drill Down Play Animation
  useEffect(() => {
    let timer: any;
    if (isPlayingDrillDown) {
      setDrillLevel(0);
      const runDrill = (step: number) => {
        if (step <= 5) {
          setDrillLevel(step);
          timer = setTimeout(() => runDrill(step + 1), 1500);
        } else {
          setIsPlayingDrillDown(false);
        }
      };
      timer = setTimeout(() => runDrill(1), 1500);
    }
    return () => clearTimeout(timer);
  }, [isPlayingDrillDown]);

  // Drill Up Play Animation
  useEffect(() => {
    let timer: any;
    if (isPlayingDrillUp) {
      setDrillLevel(5);
      const runDrill = (step: number) => {
        if (step >= 0) {
          setDrillLevel(step);
          timer = setTimeout(() => runDrill(step - 1), 1500);
        } else {
          setIsPlayingDrillUp(false);
        }
      };
      timer = setTimeout(() => runDrill(4), 1500);
    }
    return () => clearTimeout(timer);
  }, [isPlayingDrillUp]);

  // Drill Across Animation loop
  useEffect(() => {
    let timer: any;
    if (drillAcrossActive) {
      setDrillAcrossStep(1);
      timer = setTimeout(() => {
        setDrillAcrossStep(2);
        timer = setTimeout(() => {
          setDrillAcrossStep(3);
          timer = setTimeout(() => {
            setDrillAcrossStep(4);
          }, 1500);
        }, 1500);
      }, 1500);
    } else {
      setDrillAcrossStep(0);
    }
    return () => clearTimeout(timer);
  }, [drillAcrossActive]);

  return (
    <div className="space-y-12">
      {/* 1 & 2. DRILL DOWN & DRILL UP SIMULATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Drill Down Card */}
        <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <ArrowDown className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-200">Simulação de Drill Down</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setIsPlayingDrillDown(true);
                  setIsPlayingDrillUp(false);
                }}
                disabled={isPlayingDrillDown}
                className="flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" /> Animar
              </button>
              <button 
                onClick={() => { setDrillLevel(0); setIsPlayingDrillDown(false); }}
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-450 transition-colors cursor-pointer"
                title="Resetar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-zinc-400 mb-6">
            Explore a granularidade clicando nos níveis abaixo ou clique no botão de Animar para ver o mergulho em tempo real.
          </p>

          {/* Interactive Steps */}
          <div className="flex flex-col gap-3 relative mb-6">
            <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-zinc-800" />
            {drillLevels.map((lvl, index) => {
              const isCurrent = drillLevel === index;
              const isPast = drillLevel > index;
              return (
                <button
                  key={lvl.label}
                  onClick={() => { setDrillLevel(index); setIsPlayingDrillDown(false); setIsPlayingDrillUp(false); }}
                  className={`flex items-start gap-4 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isCurrent 
                      ? 'bg-emerald-500/10 border border-emerald-500/30 shadow-lg shadow-emerald-500/5 translate-x-2' 
                      : 'hover:bg-zinc-800/50 border border-transparent'
                  }`}
                >
                  <div className={`w-14 text-center py-1 text-[10px] font-mono font-bold uppercase rounded-md ${
                    isCurrent 
                      ? 'bg-emerald-500 text-zinc-950' 
                      : isPast 
                        ? 'bg-zinc-800 text-zinc-450' 
                        : 'bg-[#09090b] text-zinc-600'
                  }`}>
                    {lvl.label}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm ${isCurrent ? 'text-emerald-400' : 'text-zinc-300'}`}>
                        {lvl.value}
                      </span>
                      {isCurrent && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />}
                    </div>
                    <span className="text-xs text-zinc-405 block mt-0.5">{lvl.desc}</span>
                  </div>

                  {isCurrent && (
                    <div className="text-right font-mono text-xs text-emerald-400/90 font-semibold self-center">
                      <div>{lvl.metric}</div>
                      <div className="text-[10px] text-zinc-500">{lvl.count}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-[#09090b]/75 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-400">
            <div className="text-zinc-500 mb-1">// Consulta SQL Gerada nos bastidores:</div>
            <span className="text-purple-400">SELECT</span> {
              drillLevel === 0 ? 'ano, SUM(valor_venda)' :
              drillLevel === 1 ? 'ano, semestre, SUM(valor_venda)' :
              drillLevel === 2 ? 'ano, semestre, trimestre, SUM(valor_venda)' :
              drillLevel === 3 ? 'ano, mes, SUM(valor_venda)' :
              drillLevel === 4 ? 'ano, mes, semana, SUM(valor_venda)' :
              'ano, mes, dia, SUM(valor_venda)'
            } <span className="text-purple-400">FROM</span> fato_vendas <span className="text-purple-400">GROUP BY</span> {
              drillLevel === 0 ? 'ano' :
              drillLevel === 1 ? 'ano, semestre' :
              drillLevel === 2 ? 'ano, semestre, trimestre' :
              drillLevel === 3 ? 'ano, mes' :
              drillLevel === 4 ? 'ano, mes, semana' :
              'ano, mes, dia'
            }
          </div>
        </div>

        {/* Drill Up / Roll Up Card */}
        <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <ArrowUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-200">Simulação de Drill Up (Roll Up)</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setIsPlayingDrillUp(true);
                  setIsPlayingDrillDown(false);
                }}
                disabled={isPlayingDrillUp}
                className="flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" /> Animar
              </button>
              <button 
                onClick={() => { setDrillLevel(5); setIsPlayingDrillUp(false); }}
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-455 transition-colors cursor-pointer"
                title="Resetar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-zinc-400 mb-6">
            Observe a consolidação dos dados subindo na hierarquia diária até a anual, agregando registros individuais em resumos robustos.
          </p>

          {/* Aggregation Visualizer Fannel */}
          <div className="bg-[#09090b]/80 border border-zinc-800 rounded-xl p-5 mb-6 flex flex-col items-center justify-center min-h-[280px]">
            <div className="text-center mb-4 text-xs font-mono text-zinc-500">Fluxo de Consolidação de Dados (Soma de Linhas)</div>
            
            <div className="w-full max-w-[280px] flex flex-col gap-2">
              {[5, 4, 3, 2, 1, 0].map((stepIndex) => {
                const lvl = drillLevels[stepIndex];
                const isSelected = drillLevel === stepIndex;
                const widthPercent = 40 + (stepIndex * 12); // wider at day, narrower at year (funnel)
                return (
                  <div 
                    key={lvl.label}
                    style={{ width: `${widthPercent}%`, margin: '0 auto' }}
                    className={`h-9 flex items-center justify-between px-3 rounded-lg text-xs font-mono transition-all duration-300 ${
                      isSelected 
                        ? 'bg-emerald-500 text-zinc-950 font-bold border border-emerald-450 scale-105 shadow-lg shadow-emerald-500/20' 
                        : stepIndex > drillLevel
                          ? 'bg-zinc-900/60 border border-zinc-800 text-zinc-400 opacity-60'
                          : 'bg-zinc-800 border border-zinc-750 text-zinc-350'
                    }`}
                  >
                    <span>{lvl.label}</span>
                    <span className={isSelected ? 'text-zinc-950 font-bold' : 'text-emerald-450 font-semibold'}>
                      {stepIndex === 5 ? '540' : stepIndex === 4 ? '3.200' : stepIndex === 3 ? '12.000' : stepIndex === 2 ? '35.000' : stepIndex === 1 ? '68.000' : '120.000'} un.
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div className="text-xs text-zinc-305">
              <span className="font-semibold text-emerald-400 block">Como funciona a agregação?</span>
              Para {drillLevels[drillLevel].label} ({drillLevels[drillLevel].value}), o banco compacta {
                drillLevel === 5 ? 'vendas individuais' :
                drillLevel === 4 ? '7 dias de vendas' :
                drillLevel === 3 ? '4 semanas de vendas' :
                drillLevel === 2 ? '3 meses de vendas' :
                drillLevel === 1 ? '2 trimestres de vendas' :
                '12 meses de vendas'
              } em uma única linha agregada de {drillLevels[drillLevel].metric}.
            </div>
          </div>
        </div>

      </div>

      {/* 3. DRILL ACROSS SIMULATION */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Grid className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-200">Simulação de Drill Across (Tabelas Fato Compartilhadas)</h3>
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Demonstração de como cruzar duas tabelas fatos independentes utilizando a dimensão conformada de Produto.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDrillAcrossActive(!drillAcrossActive)}
              className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-550 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> {drillAcrossActive ? 'Reiniciar Cruzamento' : 'Cruzar Informações'}
            </button>
          </div>
        </div>

        {/* Drill Across Animation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center bg-[#09090b] p-6 rounded-xl border border-zinc-800 min-h-[300px]">
          
          {/* Fact 1: Sales */}
          <div className={`p-4 rounded-xl border transition-all duration-500 ${
            drillAcrossStep === 1 ? 'border-blue-500 bg-blue-500/5 scale-102' : 'border-zinc-800 bg-[#111113]'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono uppercase font-bold text-zinc-300">Fato Vendas</span>
            </div>
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left pb-1">SK_Prod</th>
                  <th className="text-right pb-1">Unidades</th>
                  <th className="text-right pb-1">Total</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className={drillAcrossStep >= 1 ? 'text-blue-400 bg-blue-500/10 font-bold' : ''}>
                  <td>SK_101 (TV)</td>
                  <td className="text-right">150</td>
                  <td className="text-right">R$ 300k</td>
                </tr>
                <tr>
                  <td>SK_102 (Fone)</td>
                  <td className="text-right">800</td>
                  <td className="text-right">R$ 160k</td>
                </tr>
                <tr>
                  <td>SK_103 (Celular)</td>
                  <td className="text-right">400</td>
                  <td className="text-right">R$ 800k</td>
                </tr>
              </tbody>
            </table>
            {drillAcrossStep === 1 && (
              <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded mt-2 inline-block animate-pulse font-mono">Consultando vendas...</span>
            )}
          </div>

          {/* Shared Conformed Dimension (Middle) */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-emerald-500/5 rounded-xl pointer-events-none" />
            <div className="text-xs font-mono uppercase font-bold text-zinc-300 mb-4 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Dimensão Conformada
            </div>
            
            <div className="text-center p-2.5 bg-[#09090b] border border-amber-500/30 rounded-lg w-full mb-3 shadow-md">
              <div className="text-xs font-semibold text-amber-400 font-sans">Dim_Produto</div>
              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">SK_101 | Smart TV 55"</div>
            </div>

            {/* Connecting Visual Lines */}
            <div className="flex justify-between w-full text-zinc-500 text-[10px] font-mono px-2">
              <span className="flex items-center gap-0.5">Vendas <ChevronRight className="w-3 h-3 text-blue-400" /></span>
              <span className="flex items-center gap-0.5"><ChevronRight className="w-3 h-3 text-emerald-400" /> Estoque</span>
            </div>

            {drillAcrossStep === 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#09090b]/90 rounded-xl">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <span className="text-[10px] font-mono text-amber-400">Cruzando em Memória...</span>
                </div>
              </div>
            )}
          </div>

          {/* Fact 2: Inventory */}
          <div className={`p-4 rounded-xl border transition-all duration-500 ${
            drillAcrossStep === 2 ? 'border-emerald-500 bg-emerald-500/5 scale-102' : 'border-zinc-800 bg-[#111113]'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase font-bold text-zinc-300">Fato Estoque</span>
            </div>
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left pb-1">SK_Prod</th>
                  <th className="text-right pb-1">Disponível</th>
                  <th className="text-right pb-1">Custo Armaz.</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className={drillAcrossStep >= 2 ? 'text-emerald-400 bg-emerald-500/10 font-bold' : ''}>
                  <td>SK_101 (TV)</td>
                  <td className="text-right">45 unidades</td>
                  <td className="text-right">R$ 5.000</td>
                </tr>
                <tr>
                  <td>SK_102 (Fone)</td>
                  <td className="text-right">1.200 unidades</td>
                  <td className="text-right">R$ 1.200</td>
                </tr>
                <tr>
                  <td>SK_103 (Celular)</td>
                  <td className="text-right">80 unidades</td>
                  <td className="text-right">R$ 4.000</td>
                </tr>
              </tbody>
            </table>
            {drillAcrossStep === 2 && (
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded mt-2 inline-block animate-pulse font-mono">Consultando estoque...</span>
            )}
          </div>

        </div>

        {/* Final Join Result */}
        {drillAcrossStep === 4 && (
          <div className="mt-6 p-5 bg-blue-950/20 border border-blue-500/30 rounded-xl animate-fade-in">
            <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2 font-serif italic">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              Resultado Integrado (Drill Across Executado com Sucesso!)
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-zinc-300">
                <thead>
                  <tr className="text-zinc-450 border-b border-blue-900 pb-2 bg-blue-950/40">
                    <th className="text-left p-2 rounded-l-lg font-sans font-bold">Produto (Dim Conformada)</th>
                    <th className="text-right p-2 font-sans font-bold">Vendas (Fato Vendas)</th>
                    <th className="text-right p-2 font-sans font-bold">Receita (Fato Vendas)</th>
                    <th className="text-right p-2 font-sans font-bold">Estoque (Fato Estoque)</th>
                    <th className="text-right p-2 font-sans font-bold">Custo Armaz. (Fato Estoque)</th>
                    <th className="text-center p-2 rounded-r-lg text-amber-400 font-sans font-bold">Status de Cobertura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                    <td className="p-2 font-semibold font-sans">Smart TV 55" (SK_101)</td>
                    <td className="text-right p-2">150 un.</td>
                    <td className="text-right p-2">R$ 300.000</td>
                    <td className="text-right p-2 text-emerald-400">45 un.</td>
                    <td className="text-right p-2">R$ 5.000</td>
                    <td className="text-center p-2 text-amber-400 font-bold bg-amber-500/5 font-sans">Risco de Ruptura (Baixo Estoque)</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                    <td className="p-2 font-semibold font-sans">Fone Bluetooth (SK_102)</td>
                    <td className="text-right p-2">800 un.</td>
                    <td className="text-right p-2">R$ 160.000</td>
                    <td className="text-right p-2 text-emerald-400">1.200 un.</td>
                    <td className="text-right p-2">R$ 1.200</td>
                    <td className="text-center p-2 text-emerald-400 font-bold bg-emerald-500/5 font-sans">Excelente (Estoque Confortável)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
              <strong className="text-blue-400 font-mono">Análise do Arquiteto:</strong> Observe que o sistema executou duas queries separadas e alinhou os dados na tela do dashboard utilizando a chave <code className="bg-[#09090b] px-1 py-0.5 rounded text-amber-400 font-mono border border-zinc-800">SK_Prod</code>. Sem as dimensões conformadas, o faturamento e estoque estariam desordenados e seriam impossíveis de cruzar de forma segura.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
