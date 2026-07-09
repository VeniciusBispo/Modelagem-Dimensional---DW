import React, { useState } from 'react';
import { 
  Users, 
  Tag, 
  ArrowRight, 
  Check, 
  X, 
  HelpCircle, 
  AlertTriangle, 
  Sliders, 
  Percent, 
  Play, 
  RotateCcw,
  Key,
  Calendar,
  ShoppingBag,
  MapPin,
  Plus
} from 'lucide-react';

export default function BridgeVisualizer() {
  // States for Double Counting simulation
  const [doubleCountingStep, setDoubleCountingStep] = useState(0); // 0: Idle, 1: Wrong Duplication, 2: Bridge Table Solution
  const [allocationFactorA, setAllocationFactorA] = useState(60); // Percentage for Dept A
  const [membroPrimarioAtivo, setMembroPrimarioAtivo] = useState(false);

  // Star Schema keys hover state
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Allocation calculation
  const totalSale = 1000;
  const valA = (totalSale * allocationFactorA) / 100;
  const valB = totalSale - valA;

  return (
    <div className="space-y-12">
      
      {/* 4. DIMENSÕES MULTIVALORADAS & 7. BRIDGE TABLE */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
        <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2 font-serif italic">
          <Users className="w-5 h-5 text-emerald-400" />
          Relação Muitos-para-Muitos: Dimensão Multivalorada e Bridge Table
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          Veja abaixo como ligar um Cliente que possui múltiplos interesses a uma venda na Fato Vendas sem causar inconsistência de dados.
        </p>

        <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Dimension: Cliente */}
            <div className="bg-[#111113] p-4 rounded-lg border border-zinc-800 text-center relative">
              <span className="absolute -top-2.5 left-4 bg-[#09090b] px-2 text-[10px] font-mono text-zinc-500">DIMENSÃO CLIENTE</span>
              <div className="font-semibold text-sm text-zinc-200 font-sans">Dim_Cliente</div>
              <div className="mt-2 text-xs bg-[#09090b] p-2 rounded text-zinc-400 font-mono text-left border border-zinc-850">
                <div>SK_Cliente: <span className="text-amber-400 font-semibold">901</span></div>
                <div>Nome: Carlos Silva</div>
                <div>Cidade: Belo Horizonte</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/15">Futebol</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/15">Tecnologia</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/15">Viagens</span>
              </div>
            </div>

            {/* Bridge Table */}
            <div className="bg-[#111113] p-4 rounded-lg border border-emerald-500/30 text-center relative">
              <span className="absolute -top-2.5 left-4 bg-[#09090b] px-2 text-[10px] font-mono text-emerald-450">BRIDGE TABLE (GRUPO INTERESSE)</span>
              <div className="font-semibold text-sm text-emerald-400 font-sans">Ponte_Interesses</div>
              <div className="mt-2 text-[10px] bg-[#09090b] p-2 rounded text-zinc-400 font-mono text-left space-y-1 border border-zinc-850">
                <div className="border-b border-zinc-800 pb-1 text-zinc-500">// Mapeamento do Grupo SK_GP_55:</div>
                <div className="flex justify-between"><span>SK_Grupo: <span className="text-emerald-400">GP_55</span></span> <span>SK_Interesse: FUT</span></div>
                <div className="flex justify-between"><span>SK_Grupo: <span className="text-emerald-400">GP_55</span></span> <span>SK_Interesse: TEC</span></div>
                <div className="flex justify-between"><span>SK_Grupo: <span className="text-emerald-400">GP_55</span></span> <span>SK_Interesse: VIA</span></div>
              </div>
              <div className="text-[9px] text-zinc-500 mt-2">// Resolve o relacionamento N:M</div>
            </div>

            {/* Fact Table */}
            <div className="bg-[#111113] p-4 rounded-lg border border-zinc-800 text-center relative">
              <span className="absolute -top-2.5 left-4 bg-[#09090b] px-2 text-[10px] font-mono text-zinc-500">TABELA FATO</span>
              <div className="font-semibold text-sm text-zinc-200 font-sans">Fato_Vendas</div>
              <div className="mt-2 text-xs bg-[#09090b] p-2 rounded text-zinc-400 font-mono text-left border border-zinc-850">
                <div>SK_Tempo: 20260708</div>
                <div>SK_Cliente: <span className="text-zinc-500">901</span></div>
                <div>SK_Grupo_Interesse: <span className="text-emerald-400">GP_55</span></div>
                <div>Valor_Venda: <span className="text-emerald-400 font-bold">R$ 1.200</span></div>
              </div>
            </div>

          </div>

          <div className="mt-5 p-3.5 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-xs text-zinc-355 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="font-sans leading-relaxed">
              <span className="font-semibold text-emerald-400 block font-sans">Por que usar a Bridge Table aqui?</span>
              Se colocássemos os interesses diretamente na tabela fato, teríamos que salvar três linhas idênticas de faturamento (uma para cada interesse), somando R$ 3.600 de faturamento falso. Com a Bridge Table, a Fato registra apenas uma linha de R$ 1.200 apontando para o grupo de interesse, e as ferramentas de BI conseguem abrir as divisões por interesse sem quebrar a integridade financeira.
            </div>
          </div>
        </div>
      </div>

      {/* 5. ALTERNATIVAS DE PROJETO (COMPARATIVO) */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl">
        <h3 className="text-lg font-semibold text-zinc-200 mb-2 font-serif italic">5. Alternativas de Projeto de Modelagem</h3>
        <p className="text-sm text-zinc-400 mb-6">
          Comparação visual entre as três principais abordagens arquiteturais para lidar com dimensões multivaloradas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          {/* Abordagem A: Achatamento */}
          <div className="bg-[#09090b] p-4 rounded-lg border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold font-mono text-red-400 mb-1">ABORDAGEM 1</div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-2">Achatamento de Colunas</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Criar colunas fixas diretamente na dimensão ou fato: <code className="text-zinc-300">Interesse_1</code>, <code className="text-zinc-300">Interesse_2</code>, <code className="text-zinc-300">Interesse_3</code>.
              </p>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400"><Check className="w-3.5 h-3.5" /> Performance rápida (sem JOINs)</div>
                <div className="flex items-center gap-1.5 text-[11px] text-red-400"><X className="w-3.5 h-3.5" /> Limita a quantidade máxima de itens</div>
                <div className="flex items-center gap-1.5 text-[11px] text-red-400"><X className="w-3.5 h-3.5" /> Dificulta buscas genéricas por interesse</div>
              </div>
            </div>
            <span className="text-[10px] bg-red-950/40 text-red-400 p-1.5 rounded text-center block font-semibold border border-red-900/30">Baixa Flexibilidade</span>
          </div>

          {/* Abordagem B: Duplicar Linhas */}
          <div className="bg-[#09090b] p-4 rounded-lg border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold font-mono text-amber-400 mb-1">ABORDAGEM 2</div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-2">Duplicação de Registros</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Duplicar a linha da fato para cada interesse correspondente ao cliente no momento da compra.
              </p>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400"><Check className="w-3.5 h-3.5" /> Fácil de desenhar e programar</div>
                <div className="flex items-center gap-1.5 text-[11px] text-red-400"><X className="w-3.5 h-3.5" /> Causa duplicidade de somas de faturamento</div>
                <div className="flex items-center gap-1.5 text-[11px] text-red-400"><X className="w-3.5 h-3.5" /> Infla o banco de dados desnecessariamente</div>
              </div>
            </div>
            <span className="text-[10px] bg-amber-950/40 text-amber-400 p-1.5 rounded text-center block font-semibold border border-amber-900/30">Gera Erros Financeiros</span>
          </div>

          {/* Abordagem C: Bridge Table */}
          <div className="bg-[#09090b] p-4 rounded-lg border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold font-mono text-emerald-400 mb-1">RECOMENDADO</div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-2">Tabela de Ponte Ponderada</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Criar uma Bridge Table intermediária com fator de ponderação para divisão correta dos valores.
              </p>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400"><Check className="w-3.5 h-3.5" /> Flexibilidade infinita de interesses</div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400"><Check className="w-3.5 h-3.5" /> Mantém faturamento 100% exato e seguro</div>
                <div className="flex items-center gap-1.5 text-[11px] text-red-400"><X className="w-3.5 h-3.5" /> Requer JOINs adicionais no SQL</div>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950/40 text-emerald-400 p-1.5 rounded text-center block font-semibold border border-emerald-900/30">Modelo Profissional</span>
          </div>

        </div>
      </div>

      {/* 6. MÚLTIPLAS CHAVES */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2 font-serif italic">
          <Key className="w-5 h-5 text-emerald-400" />
          6. Chave Composta da Tabela Fato (Múltiplas Chaves)
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          Passe o mouse (ou clique) sobre as dimensões estrangeiras abaixo para observar como a Tabela Fato centralizada conecta múltiplas dimensões independentes para formar seu contexto único.
        </p>

        {/* Interactive Star Schema Diagram */}
        <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 flex flex-col items-center justify-center min-h-[350px]">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center w-full max-w-4xl">
            
            {/* Dimensions (Left Column) */}
            <div className="space-y-4 md:col-span-2">
              <button 
                onMouseEnter={() => setHoveredKey('tempo')}
                onMouseLeave={() => setHoveredKey(null)}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  hoveredKey === 'tempo' ? 'border-emerald-500 bg-emerald-500/5 translate-x-2' : 'border-zinc-800 bg-[#111113]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Calendar className="w-4 h-4" /> Dim_Tempo
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1">Chave: SK_Tempo (Int)</div>
              </button>

              <button 
                onMouseEnter={() => setHoveredKey('produto')}
                onMouseLeave={() => setHoveredKey(null)}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  hoveredKey === 'produto' ? 'border-emerald-500 bg-emerald-500/5 translate-x-2' : 'border-zinc-800 bg-[#111113]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <ShoppingBag className="w-4 h-4" /> Dim_Produto
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1">Chave: SK_Produto (Int)</div>
              </button>
            </div>

            {/* Fact (Center Column) */}
            <div className="bg-[#111113] border-2 border-emerald-500/30 rounded-xl p-5 text-center shadow-lg md:col-span-1 relative z-10">
              <span className="text-[10px] bg-emerald-500 text-zinc-950 px-2 py-0.5 rounded font-bold uppercase block mb-3 font-sans">Tabela Fato</span>
              <div className="font-bold text-sm text-zinc-200 font-sans">Fato_Vendas</div>
              
              <div className="mt-3 space-y-1 text-[10px] font-mono text-left">
                <div className={`p-1 rounded ${hoveredKey === 'tempo' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-500'}`}>FK_Tempo</div>
                <div className={`p-1 rounded ${hoveredKey === 'produto' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-500'}`}>FK_Produto</div>
                <div className={`p-1 rounded ${hoveredKey === 'cliente' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-500'}`}>FK_Cliente</div>
                <div className={`p-1 rounded ${hoveredKey === 'loja' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-500'}`}>FK_Loja</div>
                <div className="border-t border-zinc-800 my-1 pb-1"></div>
                <div className="text-emerald-400 font-semibold text-center mt-1">Qtd_Vendida</div>
                <div className="text-emerald-400 font-semibold text-center">Faturamento</div>
              </div>
            </div>

            {/* Dimensions (Right Column) */}
            <div className="space-y-4 md:col-span-2">
              <button 
                onMouseEnter={() => setHoveredKey('cliente')}
                onMouseLeave={() => setHoveredKey(null)}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  hoveredKey === 'cliente' ? 'border-emerald-500 bg-emerald-500/5 -translate-x-2' : 'border-zinc-800 bg-[#111113]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Users className="w-4 h-4" /> Dim_Cliente
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1">Chave: SK_Cliente (Int)</div>
              </button>

              <button 
                onMouseEnter={() => setHoveredKey('loja')}
                onMouseLeave={() => setHoveredKey(null)}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  hoveredKey === 'loja' ? 'border-emerald-500 bg-emerald-500/5 -translate-x-2' : 'border-zinc-800 bg-[#111113]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <MapPin className="w-4 h-4" /> Dim_Loja
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1">Chave: SK_Loja (Int)</div>
              </button>
            </div>

          </div>

          <div className="mt-6 text-center text-xs font-mono text-zinc-500">
            {hoveredKey ? (
              <span className="text-emerald-400 font-semibold">A Fato associa-se à dimensão selecionada por uma Surrogate Key numérica otimizada.</span>
            ) : (
              <span>Passe o mouse sobre as dimensões para ver o relacionamento das chaves compostas.</span>
            )}
          </div>
        </div>
      </div>

      {/* 8. PROBLEMA DA CONTAGEM DUPLICADA */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2 font-serif italic">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            8. O Problema da Contagem Duplicada (Simulação Ativa)
          </h3>
          <div className="flex gap-2 font-sans">
            <button
              onClick={() => setDoubleCountingStep(1)}
              className="px-3 py-1.5 text-xs bg-red-650/10 hover:bg-red-650/20 text-red-400 border border-red-500/20 rounded-lg cursor-pointer transition-colors"
            >
              Simular Contagem Incorreta
            </button>
            <button
              onClick={() => setDoubleCountingStep(2)}
              className="px-3 py-1.5 text-xs bg-emerald-550/10 hover:bg-emerald-550/20 text-emerald-400 border border-emerald-500/20 rounded-lg cursor-pointer transition-colors"
            >
              Simular Com Bridge Table
            </button>
            <button 
              onClick={() => setDoubleCountingStep(0)}
              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-450 transition-colors cursor-pointer"
              title="Resetar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-zinc-400 mb-6">
          Uma transação única de faturamento de <strong>R$ 10.000</strong> para uma apólice de seguro com <strong>2 beneficiários (João e Maria)</strong>.
        </p>

        {/* Dynamic simulation box */}
        <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 min-h-[220px] flex flex-col justify-center font-sans">
          {doubleCountingStep === 0 && (
            <div className="text-center py-6 text-zinc-500 font-mono text-xs">
              Selecione uma das simulações acima para comparar como os relatórios processam essa transação em nível de banco de dados.
            </div>
          )}

          {doubleCountingStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                <AlertTriangle className="w-4 h-4" /> ATENÇÃO: Erro de Contagem Duplicada Detectado!
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#111113] p-3 rounded-lg border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 font-mono mb-2">// Dados no resultado do JOIN:</div>
                  <table className="w-full text-[11px] font-mono text-zinc-455">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500">
                        <th className="text-left pb-1">Beneficiário</th>
                        <th className="text-right pb-1">Faturamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-850/50">
                        <td className="py-1.5">João (Beneficiário 1)</td>
                        <td className="text-right text-red-400 font-bold py-1.5">R$ 10.000</td>
                      </tr>
                      <tr>
                        <td className="py-1.5">Maria (Beneficiário 2)</td>
                        <td className="text-right text-red-400 font-bold py-1.5">R$ 10.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col justify-center items-center p-4 bg-red-950/10 rounded-lg border border-red-900/40 text-center">
                  <span className="text-xs text-zinc-400">Soma Agregada Exibida no BI:</span>
                  <span className="text-3xl font-extrabold text-red-500 font-mono my-1">R$ 20.000</span>
                  <span className="text-[10px] text-red-450 font-mono">// ERRO: R$ 10.000 a mais (duplicidade financeira!)</span>
                </div>
              </div>
            </div>
          )}

          {doubleCountingStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                <Check className="w-4 h-4 text-emerald-400" /> SUCESSO: Contagem Ponderada de Faturamento Ativa!
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#111113] p-3 rounded-lg border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 font-mono mb-2">// JOIN utilizando Fator de Alocação de 0.5:</div>
                  <table className="w-full text-[11px] font-mono text-zinc-455">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500">
                        <th className="text-left pb-1">Beneficiário</th>
                        <th className="text-center pb-1">Peso</th>
                        <th className="text-right pb-1">Valor Ponderado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-850/50">
                        <td className="py-1.5">João (Beneficiário 1)</td>
                        <td className="text-center text-amber-400 py-1.5">50%</td>
                        <td className="text-right text-emerald-400 font-bold py-1.5">R$ 5.000</td>
                      </tr>
                      <tr>
                        <td className="py-1.5">Maria (Beneficiário 2)</td>
                        <td className="text-center text-amber-400 py-1.5">50%</td>
                        <td className="text-right text-emerald-400 font-bold py-1.5">R$ 5.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col justify-center items-center p-4 bg-emerald-950/10 rounded-lg border border-emerald-900/40 text-center">
                  <span className="text-xs text-zinc-400">Soma Agregada Exibida no BI:</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono my-1">R$ 10.000</span>
                  <span className="text-[10px] text-emerald-405 font-mono">// PERFEITO: Coincide exatamente com o caixa contábil!</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 9. FATOR DE ALOCAÇÃO (CALCULADORA ATIVA) */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <h3 className="text-lg font-semibold text-zinc-200 mb-2 flex items-center gap-2 font-serif italic">
          <Percent className="w-5 h-5 text-emerald-400" />
          9. Fator de Alocação (Simulador Numérico Dinâmico)
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          Ajuste o controle deslizante para alterar a divisão de faturamento de uma venda corporativa de <strong>R$ 1.000</strong> entre dois departamentos distintos.
        </p>

        <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800 space-y-6 font-sans">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2 space-y-2">
              <label className="text-xs font-mono text-zinc-400 flex justify-between">
                <span>Fator de Ponderação (Depto A):</span>
                <span className="text-emerald-400 font-bold">{allocationFactorA}% (Fator: {(allocationFactorA/100).toFixed(2)})</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={allocationFactorA} 
                onChange={(e) => setAllocationFactorA(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="w-full sm:w-1/2 flex items-center justify-center gap-4 bg-zinc-900/20 p-4 rounded-lg border border-zinc-800">
              <div className="text-center">
                <div className="text-[10px] text-zinc-500 font-mono uppercase">Depto B (Fator)</div>
                <div className="text-sm font-bold text-amber-400 font-mono">{100 - allocationFactorA}% (Fator: {((100 - allocationFactorA)/100).toFixed(2)})</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-[#111113] rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-mono block">Crédito Depto A</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">R$ {valA.toFixed(2)}</span>
            </div>

            <div className="p-4 bg-[#111113] rounded-lg border border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-mono block">Crédito Depto B</span>
              <span className="text-xl font-bold text-amber-400 font-mono">R$ {valB.toFixed(2)}</span>
            </div>

            <div className="p-4 bg-emerald-950/10 rounded-lg border border-emerald-900/30">
              <span className="text-[10px] text-zinc-400 font-mono block">Soma Consolidada (DW)</span>
              <span className="text-xl font-bold text-white font-mono">R$ {(valA + valB).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 10. MEMBRO PRIMÁRIO */}
      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2 font-serif italic">
            <Tag className="w-5 h-5 text-emerald-400" />
            10. Estratégia do Membro Primário (Primary Member)
          </h3>
          <button
            onClick={() => setMembroPrimarioAtivo(!membroPrimarioAtivo)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
              membroPrimarioAtivo 
                ? 'bg-emerald-500 text-zinc-950 font-bold' 
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
            }`}
          >
            {membroPrimarioAtivo ? 'Desativar Canalização' : 'Ativar Canalização Contábil'}
          </button>
        </div>
        <p className="text-sm text-zinc-400 mb-6">
          Venda de um pacote combo (Smart TV de R$ 3.000 + Suporte de TV de R$ 300). Veja como o faturamento é classificado quando definimos a TV como Membro Primário.
        </p>

        <div className="bg-[#09090b] p-5 rounded-xl border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            
            {/* Ledger */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-zinc-500">// Livro Diário de Faturamento de Vendas</div>
              
              <div className="p-3 bg-[#111113] rounded-lg border border-zinc-800 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-zinc-300 block">Item: Smart TV 55"</span>
                  <span className="text-[10px] text-amber-400 font-mono uppercase font-bold">Membro Primário</span>
                </div>
                <span className="text-sm font-bold font-mono text-emerald-400">R$ 3.000,00</span>
              </div>

              <div className={`p-3 rounded-lg border transition-all ${
                membroPrimarioAtivo 
                  ? 'bg-zinc-900/10 border-dashed border-zinc-800 opacity-50' 
                  : 'bg-[#111113] border-zinc-800'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-zinc-300 block">Item: Suporte de Parede</span>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase">Membro Secundário</span>
                  </div>
                  <span className={`text-sm font-bold font-mono ${membroPrimarioAtivo ? 'text-zinc-500 line-through' : 'text-emerald-400'}`}>R$ 300,00</span>
                </div>
                {membroPrimarioAtivo && (
                  <span className="text-[9px] text-amber-400 font-mono mt-1 block">// Valor canalizado para o Membro Primário</span>
                )}
              </div>
            </div>

            {/* Accounting distribution */}
            <div className="flex flex-col justify-center items-center p-5 bg-[#111113] rounded-lg border border-zinc-800 text-center">
              <span className="text-xs text-zinc-400">Faturamento Atribuído por Categoria no BI:</span>
              
              <div className="w-full space-y-3 mt-4 text-left max-w-[260px]">
                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>Categoria: Televisores</span>
                    <span className="font-bold text-emerald-400">R$ {membroPrimarioAtivo ? '3.300,00' : '3.000,00'}</span>
                  </div>
                  <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-zinc-800">
                    <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: membroPrimarioAtivo ? '100%' : '90.9%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>Categoria: Acessórios</span>
                    <span className={`font-bold ${membroPrimarioAtivo ? 'text-zinc-500' : 'text-amber-400'}`}>R$ {membroPrimarioAtivo ? '0,00' : '300,00'}</span>
                  </div>
                  <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-zinc-800">
                    <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: membroPrimarioAtivo ? '0%' : '9.1%' }} />
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-zinc-500 mt-5 leading-relaxed font-mono">
                {membroPrimarioAtivo 
                  ? '// Simplificação financeira ativa: 100% da nota fiscal atribuído à categoria líder, facilitando auditoria padrão sem Bridge Tables.' 
                  : '// Divisão detalhada: Exige que cada pequeno item seja tratado individualmente na contabilidade.'}
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
