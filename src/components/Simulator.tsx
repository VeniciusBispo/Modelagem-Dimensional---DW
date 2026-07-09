import React, { useState } from 'react';
import { 
  Briefcase, 
  Settings, 
  Play, 
  RotateCcw, 
  Database, 
  Cpu, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export default function Simulator() {
  const [selectedScenario, setSelectedScenario] = useState<'retail' | 'health' | 'marketing'>('retail');
  
  // Configurations chosen by the user
  const [bridgeConfig, setBridgeConfig] = useState<'yes' | 'no'>('yes');
  const [scdConfig, setScdConfig] = useState<'type2' | 'type1'>('type2');
  const [aggConfig, setAggConfig] = useState<'yes' | 'no'>('yes');

  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<any>(null);

  const runSimulation = () => {
    setIsRunning(true);
    setRunResult(null);

    setTimeout(() => {
      let faturamentoCorreto = 15000;
      let faturamentoBI = 15000;
      let integrityStatus: 'success' | 'warning' | 'error' = 'success';
      let integrityMsg = 'Dados Financeiros 100% Corretos e Auditáveis.';
      let queryTime = '0.005 segundos';

      // Adjust based on user configuration
      if (bridgeConfig === 'no') {
        faturamentoBI = faturamentoCorreto * 2.2; // inflated
        integrityStatus = 'error';
        integrityMsg = 'ERRO DE DUPLICIDADE: Faturamento duplicado no relatório de BI devido a clientes multivalorados sem Bridge Table.';
      }

      if (scdConfig === 'type1' && integrityStatus === 'success') {
        integrityStatus = 'warning';
        integrityMsg = 'PERDA HISTÓRICA: Vendas antigas foram atribuídas à cidade nova do cliente. O faturamento de 2024 de Curitiba agora aparece em Salvador.';
      }

      if (aggConfig === 'no') {
        queryTime = '3.820 segundos';
      }

      setRunResult({
        faturamentoCorreto,
        faturamentoBI,
        integrityStatus,
        integrityMsg,
        queryTime,
        recordsRead: aggConfig === 'yes' ? '120 registros (agregados)' : '15.000.000 registros (tabela atômica completa)'
      });
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-550/10 rounded-lg text-emerald-400">
          <Settings className="w-5 h-5 text-emerald-400 animate-spin-slow" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-200 font-serif italic">Simulador Avançado de Cenários de DW</h3>
          <p className="text-sm text-zinc-405 mt-0.5">
            Monte seu próprio cenário corporativo, ajuste as chaves arquiteturais e simule o impacto instantâneo no banco de dados.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left Col: Configurations */}
        <div className="lg:col-span-1 space-y-5 bg-[#09090b] p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1 font-bold">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> 1. Escolher Cenário de Negócio
          </div>
          
          <div className="space-y-2">
            {[
              { id: 'retail', label: 'E-Commerce Global', desc: 'Venda de eletrônicos com clientes multivalorados de múltiplos perfis geográficos.' },
              { id: 'health', label: 'Sistema Médico Familiar', desc: 'Consultas médicas faturadas associadas a múltiplos diagnósticos por paciente.' },
              { id: 'marketing', label: 'Campanha de Atribuição', desc: 'Rastrear cliques em múltiplos canais de anúncio antes da conversão final.' }
            ].map(sc => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id as any)}
                className={`w-full p-3 rounded-lg text-left transition-all border text-xs cursor-pointer ${
                  selectedScenario === sc.id 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold shadow-md' 
                    : 'bg-[#111113] border-zinc-800 hover:bg-zinc-800/60 text-zinc-405'
                }`}
              >
                <div className="font-bold mb-0.5 text-zinc-200">{sc.label}</div>
                <div className="text-zinc-450">{sc.desc}</div>
              </button>
            ))}
          </div>

          <div className="border-t border-zinc-800 pt-4 space-y-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 font-bold">
              2. Configurar Modelo de Dados
            </div>

            {/* Config: Bridge Table */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Usar Bridge Table para N:M?</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setBridgeConfig('yes')}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    bridgeConfig === 'yes' ? 'bg-emerald-500 text-zinc-950 font-bold border-emerald-500' : 'bg-[#111113] border-zinc-800 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  Sim (Recomendado)
                </button>
                <button 
                  onClick={() => setBridgeConfig('no')}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    bridgeConfig === 'no' ? 'bg-red-500/15 text-red-400 border-red-500/30 font-bold' : 'bg-[#111113] border-zinc-800 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  Não (Fato Direta)
                </button>
              </div>
            </div>

            {/* Config: Slowly Changing Dimensions */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Tratamento de Endereços (SCD)?</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setScdConfig('type2')}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    scdConfig === 'type2' ? 'bg-emerald-500 text-zinc-950 font-bold border-emerald-500' : 'bg-[#111113] border-zinc-800 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  SCD Tipo 2 (Histórico)
                </button>
                <button 
                  onClick={() => setScdConfig('type1')}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    scdConfig === 'type1' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 font-bold' : 'bg-[#111113] border-zinc-800 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  SCD Tipo 1 (Sobrescrever)
                </button>
              </div>
            </div>

            {/* Config: Aggregates */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Pré-calcular Agregados Mensais?</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setAggConfig('yes')}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    aggConfig === 'yes' ? 'bg-emerald-500 text-zinc-950 font-bold border-emerald-500' : 'bg-[#111113] border-zinc-800 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  Sim (Veloz)
                </button>
                <button 
                  onClick={() => setAggConfig('no')}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    aggConfig === 'no' ? 'bg-amber-500/15 text-amber-450 border-amber-500/30 font-bold' : 'bg-[#111113] border-zinc-800 text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  Não (Lento)
                </button>
              </div>
            </div>

            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="w-full mt-4 py-2.5 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 text-xs font-extrabold rounded-lg cursor-pointer transition-all shadow-md shadow-emerald-500/5 flex items-center justify-center gap-1.5"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  Processando Dados...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-zinc-950 fill-zinc-950" /> Simular e Executar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center & Right Col: Database State & Simulation Results */}
        <div className="lg:col-span-2 space-y-6 font-sans">
          
          {/* Active Database Schema Schema on the fly */}
          <div className="bg-[#09090b] p-5 rounded-xl border border-zinc-800 relative">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-4 font-sans font-bold">
              Visualização Estrutural do Banco de Dados Gerado
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              
              {/* Dim Table */}
              <div className="bg-[#111113] p-3 rounded-lg border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold font-mono text-emerald-400 mb-1 flex items-center gap-1 font-sans">
                    <Layers className="w-3 h-3" /> Dim_Clientes
                  </div>
                  <div className="text-[9px] text-zinc-450 font-mono space-y-1">
                    <div>pk_cli_sk (Int)</div>
                    <div>id_cliente_natural</div>
                    <div>nome_completo</div>
                    <div>cidade_residencia</div>
                    {scdConfig === 'type2' && (
                      <div className="text-emerald-400 font-semibold space-y-1 mt-1">
                        <div>+ dt_inicio (Date)</div>
                        <div>+ dt_fim (Date)</div>
                        <div>+ status_ativo (Bool)</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-[9px] text-zinc-500 mt-2">// Dimensão de Clientes</div>
              </div>

              {/* Bridge Table or Connection */}
              <div className="bg-[#111113] p-3 rounded-lg border border-zinc-800 flex flex-col justify-between">
                {bridgeConfig === 'yes' ? (
                  <div>
                    <div className="text-[10px] font-bold font-mono text-amber-400 mb-1 flex items-center gap-1 font-sans">
                      <Layers className="w-3 h-3" /> Ponte_Interesses
                    </div>
                    <div className="text-[9px] text-zinc-450 font-mono space-y-1">
                      <div>sk_grupo_ponte</div>
                      <div>sk_interesse_id</div>
                      <div className="text-emerald-400 font-semibold mt-1">+ fator_alocacao (Decimal)</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center p-3 text-red-400 text-[10px] font-sans font-semibold border border-dashed border-red-500/20 rounded bg-red-500/5 leading-normal">
                    Sem Tabela de Ponte. Relacionamento Muitos-para-Muitos feito de forma direta na fato.
                  </div>
                )}
                {bridgeConfig === 'yes' && <div className="text-[9px] text-zinc-500 mt-2">// Ponte de Relação N:M</div>}
              </div>

              {/* Fact Table */}
              <div className="bg-[#111113] p-3 rounded-lg border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold font-mono text-emerald-450 mb-1 flex items-center gap-1 font-sans">
                    <Database className="w-3 h-3 text-emerald-400" /> Fato_Vendas
                  </div>
                  <div className="text-[9px] text-zinc-450 font-mono space-y-1">
                    <div>fk_tempo_sk (Int)</div>
                    <div>fk_cliente_sk (Int)</div>
                    {bridgeConfig === 'yes' ? (
                      <div className="text-amber-400 font-semibold">fk_grupo_ponte_sk</div>
                    ) : (
                      <div className="text-red-400 font-semibold">fk_interesse_sk (Direto)</div>
                    )}
                    <div>vendas_faturamento</div>
                  </div>
                </div>
                <div className="text-[9px] text-zinc-500 mt-2">// Tabela Fato Central</div>
              </div>

            </div>
          </div>

          {/* Results Block */}
          {isRunning && (
            <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 flex items-center justify-center min-h-[160px]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <span className="text-xs font-mono text-zinc-400">Calculando cubos dimensionais e executando SQL no DW...</span>
              </div>
            </div>
          )}

          {runResult && (
            <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 space-y-5 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-zinc-800"><Sparkles className="w-12 h-12" /></div>
              
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <span className="text-xs font-mono text-zinc-500 uppercase">Resultado da Execução:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#111113] rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-mono block">Faturamento Real do Caixa</span>
                  <span className="text-xl font-bold font-mono text-zinc-200">R$ {runResult.faturamentoCorreto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="p-3.5 bg-[#111113] rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-mono block">Faturamento Exibido no BI</span>
                  <span className={`text-xl font-bold font-mono ${runResult.integrityStatus === 'success' ? 'text-emerald-450' : 'text-red-400'}`}>R$ {runResult.faturamentoBI.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Status Report Badge */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                runResult.integrityStatus === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                  : runResult.integrityStatus === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                    : 'bg-red-500/10 border-red-500/20 text-red-300'
              }`}>
                {runResult.integrityStatus === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                ) : runResult.integrityStatus === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-xs block mb-1">Diagnóstico do Modelo:</span>
                  <p className="text-xs leading-normal opacity-90">{runResult.integrityMsg}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-500" />
                  <span>Tempo de Consulta: <strong className="text-emerald-400">{runResult.queryTime}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-zinc-500" />
                  <span>Varredura de Disco: <strong className="text-emerald-400 leading-normal">{runResult.recordsRead}</strong></span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
