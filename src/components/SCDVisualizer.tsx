import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  User, 
  History, 
  RefreshCw, 
  Check, 
  X, 
  ArrowRight,
  Database,
  CheckCircle,
  Clock,
  RotateCcw
} from 'lucide-react';

export default function SCDVisualizer() {
  const [activeScdType, setActiveScdType] = useState<0 | 1 | 2 | 3>(2);
  const [customerCity, setCustomerCity] = useState<'Curitiba' | 'Salvador'>('Curitiba');
  const [changeSimulated, setChangeSimulated] = useState(false);

  const simulateChange = () => {
    setCustomerCity(prev => prev === 'Curitiba' ? 'Salvador' : 'Curitiba');
    setChangeSimulated(true);
  };

  const resetSimulation = () => {
    setCustomerCity('Curitiba');
    setChangeSimulated(false);
  };

  return (
    <div className="space-y-12">
      
      {/* Interactive Timeline Simulation Card */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
        <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2 font-serif italic">
          <History className="w-5 h-5 text-emerald-400" />
          16. Tratamento de Histórico (Slowly Changing Dimensions)
        </h3>
        <p className="text-sm text-zinc-405 mb-6">
          Simule a mudança de cidade do cliente <strong>Carlos Silva</strong> de <strong>Curitiba</strong> para <strong>Salvador</strong> e selecione o Tipo de SCD para ver como a tabela de dimensões reage.
        </p>

        {/* Controller and simulation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* SCD Types Selector */}
          <div className="flex bg-[#09090b] p-1.5 rounded-lg border border-zinc-800 font-sans">
            {([0, 1, 2, 3] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveScdType(type)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeScdType === type 
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Tipo {type}
              </button>
            ))}
          </div>

          <div className="flex gap-2 font-sans">
            <button
              onClick={simulateChange}
              className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-zinc-950 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Mudar Cidade para {customerCity === 'Curitiba' ? 'Salvador' : 'Curitiba'}
            </button>
            <button
              onClick={resetSimulation}
              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-450 transition-colors cursor-pointer"
              title="Resetar"
            >
              <RotateCcw className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Timeline Visual & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
          
          {/* Left: Interactive Timeline Map */}
          <div className="bg-[#09090b] p-5 rounded-xl border border-zinc-800 flex flex-col justify-between min-h-[250px]">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-3 font-sans font-bold">Linha do Tempo de Cadastro</span>
              
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-zinc-800" />
                
                {/* 2024 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-zinc-950" />
                  <div className="text-xs font-bold text-zinc-300 font-sans">Ano 2024 (Início)</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5 font-sans">
                    <MapPin className="w-3 h-3 text-emerald-400" /> Mora em Curitiba
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">// Registrou R$ 5.000 em compras</div>
                </div>

                {/* 2025 (Change) */}
                <div className="relative">
                  <div className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 border-zinc-950 transition-colors ${
                    changeSimulated ? 'bg-amber-450' : 'bg-zinc-800'
                  }`} />
                  <div className="text-xs font-bold text-zinc-300 font-sans">Ano 2025 (Mudança)</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5 font-sans">
                    <MapPin className="w-3 h-3 text-amber-400" /> Mora em {changeSimulated ? 'Salvador' : 'Curitiba'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">// Registrou R$ 8.000 em compras</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              SCD Tipo {activeScdType} ativa.
            </div>
          </div>

          {/* Right: Dimension Table State */}
          <div className="lg:col-span-2 bg-[#09090b] p-5 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-3 flex items-center gap-1 font-sans font-bold">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Estado Físico da Tabela: Dim_Cliente
            </span>

            {/* SCD TYPE 0 */}
            {activeScdType === 0 && (
              <div className="space-y-4 animate-fade-in font-sans">
                <table className="w-full text-xs font-mono text-zinc-300">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800 text-left">
                      <th className="pb-2">SK_Cliente</th>
                      <th className="pb-2 font-sans font-bold text-zinc-400">Nome</th>
                      <th className="pb-2 font-sans font-bold text-zinc-400">Cidade</th>
                      <th className="pb-2 text-right font-sans font-bold text-zinc-400">Comentário</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-850">
                      <td className="py-2">SK_901</td>
                      <td>Carlos Silva</td>
                      <td className="text-emerald-400 font-bold">Curitiba</td>
                      <td className="text-right text-zinc-500 py-2">Nunca se altera</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-[11px] text-red-400 font-mono bg-red-500/5 p-3 rounded border border-red-500/10">
                  // Tipo 0 (Imutável): A mudança de endereço foi ignorada. O histórico e o presente continuam gravados como "Curitiba". Excelente para dados que nunca deveriam mudar (como data de nascimento).
                </div>
              </div>
            )}

            {/* SCD TYPE 1 */}
            {activeScdType === 1 && (
              <div className="space-y-4 animate-fade-in font-sans">
                <table className="w-full text-xs font-mono text-zinc-300">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800 text-left">
                      <th className="pb-2">SK_Cliente</th>
                      <th className="pb-2 font-sans font-bold text-zinc-400">Nome</th>
                      <th className="pb-2 font-sans font-bold text-zinc-400">Cidade</th>
                      <th className="pb-2 text-right font-sans font-bold text-zinc-400">Alterado?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-850">
                      <td className="py-2">SK_901</td>
                      <td>Carlos Silva</td>
                      <td className={changeSimulated ? 'text-amber-450 font-bold' : 'text-emerald-400'}>
                        {customerCity}
                      </td>
                      <td className="text-right text-zinc-500 py-2">
                        {changeSimulated ? 'Sim (Sobrescrito)' : 'Não'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-[11px] text-amber-450 font-mono bg-amber-500/5 p-3 rounded border border-amber-500/10">
                  // Tipo 1 (Sobrescrever): O registro antigo foi simplesmente alterado para "Salvador". O histórico de compras de 2024 de Curitiba agora será incorretamente somado em Salvador no BI, pois o passado foi apagado!
                </div>
              </div>
            )}

            {/* SCD TYPE 2 */}
            {activeScdType === 2 && (
              <div className="space-y-4 animate-fade-in font-sans">
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] font-mono text-zinc-300">
                    <thead>
                      <tr className="text-zinc-500 border-b border-zinc-800 text-left">
                        <th className="pb-2">SK_Cli</th>
                        <th className="pb-2 font-sans font-bold text-zinc-400">Nome</th>
                        <th className="pb-2 font-sans font-bold text-zinc-400">Cidade</th>
                        <th className="pb-2 font-sans font-bold text-zinc-400">Dt_Início</th>
                        <th className="pb-2 font-sans font-bold text-zinc-400">Dt_Fim</th>
                        <th className="pb-2 font-sans font-bold text-zinc-400">Ativo</th>
                        <th className="pb-2 font-sans font-bold text-zinc-400">Ver</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`border-b border-zinc-850/50 ${changeSimulated ? 'opacity-45' : 'bg-emerald-500/5'}`}>
                        <td className="py-2">901_1</td>
                        <td>Carlos</td>
                        <td className="text-emerald-400">Curitiba</td>
                        <td>2024-01-01</td>
                        <td>{changeSimulated ? '2025-06-30' : '9999-12-31'}</td>
                        <td>{changeSimulated ? 'Não' : 'Sim'}</td>
                        <td>v1</td>
                      </tr>
                      {changeSimulated && (
                        <tr className="border-b border-zinc-850/50 bg-amber-500/5 font-semibold animate-fade-in">
                          <td className="text-amber-450 py-2">901_2</td>
                          <td>Carlos</td>
                          <td className="text-amber-450">Salvador</td>
                          <td>2025-07-01</td>
                          <td>9999-12-31</td>
                          <td className="text-emerald-450 font-bold">Sim</td>
                          <td>v2</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono bg-emerald-500/5 p-3 rounded border border-emerald-500/10 leading-relaxed font-sans">
                  // Tipo 2 (Histórico Completo): Uma nova linha física foi criada! As compras de 2024 apontam para o SK <code className="bg-[#09090b] border border-zinc-800 px-1 text-emerald-400">901_1</code> (Curitiba), enquanto as novas de 2025 usam <code className="bg-[#09090b] border border-zinc-800 px-1 text-amber-400">901_2</code> (Salvador). O faturamento histórico é mantido perfeitamente íntegro!
                </div>
              </div>
            )}

            {/* SCD TYPE 3 */}
            {activeScdType === 3 && (
              <div className="space-y-4 animate-fade-in font-sans">
                <table className="w-full text-xs font-mono text-zinc-300">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800 text-left">
                      <th className="pb-2">SK_Cliente</th>
                      <th className="pb-2 font-sans font-bold text-zinc-400">Nome</th>
                      <th className="pb-2 font-sans font-bold text-zinc-400">Cidade Atual</th>
                      <th className="pb-2 font-sans font-bold text-zinc-400">Cidade Anterior</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-850">
                      <td className="py-2">SK_901</td>
                      <td>Carlos Silva</td>
                      <td className={changeSimulated ? 'text-amber-450 font-bold' : 'text-emerald-400'}>
                        {changeSimulated ? 'Salvador' : 'Curitiba'}
                      </td>
                      <td className="text-zinc-500 py-2">
                        {changeSimulated ? 'Curitiba' : 'Nenhuma'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-[11px] text-purple-400 font-mono bg-purple-500/5 p-3 rounded border border-purple-500/10">
                  // Tipo 3 (Histórico Parcial): A cidade anterior foi movida para a coluna secundária, mantendo o estado imediatamente anterior. Não há controle de múltiplas alterações passadas (guarda apenas uma mudança de rastro).
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 16. COMPARATIVO FINAL TABLE */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in font-sans">
        <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2 font-serif italic">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          Comparativo de Abordagens de Histórico (SCD Tipo 0, 1, 2 e 3)
        </h3>
        <p className="text-sm text-zinc-405 mb-6">
          Uma visão geral consolidada para te ajudar a escolher a abordagem ideal para cada tabela dimensão do seu projeto.
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 font-sans">
          <table className="w-full text-xs text-zinc-300 text-left">
            <thead>
              <tr className="bg-[#09090b] text-zinc-400 font-mono border-b border-zinc-800">
                <th className="p-3 font-sans font-bold text-zinc-400">Característica</th>
                <th className="p-3 text-emerald-400 font-sans font-bold">SCD Tipo 0</th>
                <th className="p-3 text-amber-400 font-sans font-bold">SCD Tipo 1</th>
                <th className="p-3 text-emerald-400 font-sans font-bold">SCD Tipo 2</th>
                <th className="p-3 text-purple-450 font-sans font-bold">SCD Tipo 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-900/40">
                <td className="p-3 font-semibold bg-[#09090b]/20">Mantém histórico?</td>
                <td className="p-3 text-zinc-400">Não (Dado imutável)</td>
                <td className="p-3 text-red-450 font-bold">Não (Apaga o passado)</td>
                <td className="p-3 text-emerald-400 font-bold">Sim (Completo)</td>
                <td className="p-3 text-purple-400">Sim (Apenas 1 alteração)</td>
              </tr>
              <tr className="hover:bg-zinc-900/40">
                <td className="p-3 font-semibold bg-[#09090b]/20">Cria novos registros?</td>
                <td className="p-3">Não</td>
                <td className="p-3">Não</td>
                <td className="p-3 text-emerald-400 font-bold">Sim (Novas linhas)</td>
                <td className="p-3">Não</td>
              </tr>
              <tr className="hover:bg-zinc-900/40">
                <td className="p-3 font-semibold bg-[#09090b]/20">Atualiza registros?</td>
                <td className="p-3 text-zinc-500">Nunca</td>
                <td className="p-3 text-amber-400">Sim (Sobrescreve)</td>
                <td className="p-3 text-emerald-400">Sim (Inativa antigos)</td>
                <td className="p-3">Sim (Inverte colunas)</td>
              </tr>
              <tr className="hover:bg-zinc-900/40">
                <td className="p-3 font-semibold bg-[#09090b]/20">Complexidade</td>
                <td className="p-3 text-zinc-400">Nula</td>
                <td className="p-3 text-zinc-400">Baixíssima</td>
                <td className="p-3 text-amber-400 font-semibold">Alta (Requer controle ETL)</td>
                <td className="p-3">Média</td>
              </tr>
              <tr className="hover:bg-zinc-900/40">
                <td className="p-3 font-semibold bg-[#09090b]/20">Espaço ocupado</td>
                <td className="p-3">Mínimo</td>
                <td className="p-3">Mínimo</td>
                <td className="p-3 text-amber-400 font-semibold">Crescente (Tabela aumenta)</td>
                <td className="p-3">Pouco acrescido</td>
              </tr>
              <tr className="hover:bg-zinc-900/40">
                <td className="p-3 font-semibold bg-[#09090b]/20">Quando utilizar?</td>
                <td className="p-3 text-zinc-400 leading-normal">Dados cadastrais estáticos (nascimento, CPF, gênero)</td>
                <td className="p-3 text-zinc-400 leading-normal">Correções ortográficas ou quando histórico não importa</td>
                <td className="p-3 text-emerald-400 font-bold leading-normal">Atributos críticos de faturamento (Região, Cargo)</td>
                <td className="p-3 text-zinc-400 leading-normal">Análise de metas baseadas estritamente no estado anterior</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
