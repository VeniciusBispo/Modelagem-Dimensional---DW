import React, { useState } from 'react';
import { 
  solvedExercises, 
  practiceChallenges, 
  glossaryTerms, 
  timelineEvents, 
  triviaCards 
} from '../data/quizData';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Clock, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp,
  RotateCcw,
  BookMarked
} from 'lucide-react';

export default function ExtrasContainer() {
  const [activeTab, setActiveTab] = useState<'solved' | 'practice' | 'glossary' | 'timeline' | 'trivia'>('solved');
  
  // Solved exercise collapse/expand state
  const [expandedSolved, setExpandedSolved] = useState<number | null>(1);

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceStatus, setPracticeStatus] = useState<Record<number, 'success' | 'error' | 'idle'>>({});

  // Glossary search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState('All');

  const handlePracticeSelect = (challengeId: number, optionSelected: string) => {
    setPracticeAnswers(prev => ({ ...prev, [challengeId]: optionSelected }));
    setPracticeStatus(prev => ({ ...prev, [challengeId]: 'idle' }));
  };

  const validatePracticeAnswer = (challengeId: number, correctAnswer: string) => {
    const userAns = practiceAnswers[challengeId];
    if (!userAns) return;
    const isCorrect = userAns === correctAnswer;
    setPracticeStatus(prev => ({ ...prev, [challengeId]: isCorrect ? 'success' : 'error' }));
  };

  const resetPractice = (challengeId: number) => {
    setPracticeAnswers(prev => {
      const copy = { ...prev };
      delete copy[challengeId];
      return copy;
    });
    setPracticeStatus(prev => {
      const copy = { ...prev };
      delete copy[challengeId];
      return copy;
    });
  };

  // Filter glossary
  const filteredGlossary = glossaryTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedGlossaryCategory === 'All' || item.category === selectedGlossaryCategory;
    return matchesSearch && matchesCategory;
  });

  const glossaryCategories = ['All', 'Geral', 'Modelagem', 'Componentes'];

  return (
    <div className="space-y-6">
      
      {/* Navigation tabs */}
      <div className="flex flex-wrap bg-[#09090b] p-1.5 rounded-xl border border-zinc-800 gap-1 font-sans">
        {[
          { id: 'solved', label: 'Casos Reais Resolvidos' },
          { id: 'practice', label: 'Exercícios Práticos' },
          { id: 'glossary', label: 'Glossário Técnico' },
          { id: 'timeline', label: 'Linha do Tempo' },
          { id: 'trivia', label: 'Curiosidades & Fatos' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[140px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-emerald-500 text-zinc-950 font-extrabold shadow-md' 
                : 'text-zinc-450 hover:text-zinc-200 hover:bg-zinc-900/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 min-h-[350px]">
        
        {/* TAB 1: SOLVED CORPORATE CASES */}
        {activeTab === 'solved' && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-zinc-200 flex items-center gap-2 font-serif italic">
                <BookMarked className="w-5 h-5 text-emerald-400" />
                Estudos de Caso e Exercícios Resolvidos do Mundo Real
              </h3>
              <p className="text-xs text-zinc-405 mt-1">Veja como consultores de Business Intelligence projetam e resolvem desafios reais de modelagem dimensional.</p>
            </div>

            <div className="space-y-4">
              {solvedExercises.map((ex) => {
                const isExpanded = expandedSolved === ex.id;
                return (
                  <div key={ex.id} className="border border-zinc-800 bg-[#09090b] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedSolved(isExpanded ? null : ex.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-900/40 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-sm text-zinc-200 flex items-center gap-2 font-sans">
                        <span className="text-xs text-emerald-400 font-mono font-bold">Caso {ex.id}:</span>
                        {ex.title}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                    </button>

                    {isExpanded && (
                      <div className="p-5 border-t border-zinc-850/50 bg-[#111113]/30 text-xs leading-relaxed space-y-4 font-sans text-zinc-300">
                        <div>
                          <strong className="text-zinc-450 block uppercase text-[10px] tracking-wider mb-1 font-mono font-bold">Cenário Corporativo:</strong>
                          <p className="bg-[#09090b] p-3 rounded-lg border border-zinc-800">{ex.scenario}</p>
                        </div>
                        <div>
                          <strong className="text-zinc-450 block uppercase text-[10px] tracking-wider mb-1 font-mono font-bold">Desafio Proposto:</strong>
                          <p className="bg-[#09090b] p-3 rounded-lg border border-zinc-800 text-amber-400 font-medium">{ex.challenge}</p>
                        </div>
                        <div>
                          <strong className="text-emerald-400 block uppercase text-[10px] tracking-wider mb-1 font-mono font-bold">Solução do Especialista:</strong>
                          <p className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/20 leading-relaxed">{ex.solution}</p>
                        </div>
                        {ex.techNotes && (
                          <p className="text-[10px] text-zinc-500 font-mono italic">
                            * Nota de Engenharia: {ex.techNotes}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE PRACTICE CHALLENGES */}
        {activeTab === 'practice' && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-zinc-200 flex items-center gap-2 font-serif italic">
                <HelpCircle className="w-5 h-5 text-emerald-405" />
                Desafios Práticos de Decisão Arquitetural
              </h3>
              <p className="text-xs text-zinc-405 mt-1">Coloque-se na pele de um líder de engenharia de dados. Escolha a resposta ideal e valide seu conhecimento.</p>
            </div>

            <div className="space-y-6">
              {practiceChallenges.map((ch) => {
                const userChoice = practiceAnswers[ch.id];
                const status = practiceStatus[ch.id] || 'idle';

                return (
                  <div key={ch.id} className="p-5 bg-[#09090b] border border-zinc-800 rounded-xl space-y-4">
                    <h4 className="text-sm font-bold text-zinc-200 flex items-start gap-2 leading-relaxed">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] rounded mt-0.5 font-bold">D{ch.id}</span>
                      {ch.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans bg-[#111113]/40 p-3 rounded border border-zinc-800/80">
                      {ch.description}
                    </p>

                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {ch.options.map((opt) => {
                        const isSelected = userChoice === opt;
                        return (
                          <button
                            key={opt}
                            disabled={status !== 'idle'}
                            onClick={() => handlePracticeSelect(ch.id, opt)}
                            className={`p-3 text-left rounded-lg text-xs transition-all flex items-start gap-2 cursor-pointer ${
                              isSelected 
                                ? 'bg-emerald-500/10 border border-emerald-500 text-emerald-450 font-bold' 
                                : 'bg-[#111113] hover:bg-zinc-850 border border-zinc-800 text-zinc-300'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full border mt-0.5 flex-shrink-0 ${isSelected ? 'bg-emerald-500 border-emerald-450' : 'border-zinc-700'}`} />
                            <span className="flex-1 font-sans">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Results of Validation */}
                    {status === 'success' && (
                      <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-lg flex items-start gap-2 font-sans">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="block text-emerald-400 mb-0.5 font-bold">Desafio Concluído!</strong>
                          {ch.feedback.success}
                        </div>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-lg flex items-start gap-2 font-sans">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <strong className="block text-red-400 mb-0.5 font-bold">Quase lá...</strong>
                          {ch.feedback.error}
                        </div>
                        <button onClick={() => resetPractice(ch.id)} className="text-[10px] font-bold text-red-400 hover:underline cursor-pointer">Tentar de Novo</button>
                      </div>
                    )}

                    {/* Validation controls */}
                    {status === 'idle' && (
                      <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                        {userChoice && (
                          <button
                            onClick={() => validatePracticeAnswer(ch.id, ch.correctAnswer)}
                            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 text-[11px] font-bold rounded cursor-pointer transition-colors"
                          >
                            Validar Decisão
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SEARCHABLE GLOSSARY */}
        {activeTab === 'glossary' && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-zinc-200 font-serif italic">Glossário de Termos de DW & Modelagem</h3>
                <p className="text-xs text-zinc-405 mt-0.5">Dicionário técnico com 15+ verbetes comuns de modelagem dimensional.</p>
              </div>
              
              {/* Category selector */}
              <div className="flex bg-[#09090b] p-1 rounded-lg border border-zinc-800 text-xs font-sans">
                {glossaryCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedGlossaryCategory(cat)}
                    className={`px-3 py-1.5 rounded transition-colors font-semibold cursor-pointer ${
                      selectedGlossaryCategory === cat ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-455 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="relative font-sans">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Buscar termos ou definições..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            {/* Vocabulary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {filteredGlossary.map((item) => (
                <div key={item.term} className="p-4 bg-[#09090b] border border-zinc-800 rounded-xl space-y-1.5 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs md:text-sm text-zinc-200">{item.term}</span>
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">{item.category}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.definition}</p>
                </div>
              ))}
              {filteredGlossary.length === 0 && (
                <div className="md:col-span-2 text-center py-10 text-zinc-500 text-xs font-mono">
                  Nenhum termo encontrado para "{searchTerm}".
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CHRONOLOGICAL TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-zinc-200 flex items-center gap-2 font-serif italic">
                <Clock className="w-5 h-5 text-emerald-400" />
                Linha do Tempo: Evolução dos Conceitos de Data Warehouse
              </h3>
              <p className="text-xs text-zinc-405 mt-1">Conheça o percurso histórico e os teóricos por trás do nascimento e expansão do armazenamento de dados corporativos.</p>
            </div>

            {/* Vertical timeline representation */}
            <div className="relative pl-8 space-y-8 max-w-2xl mx-auto pt-4">
              <div className="absolute left-[11px] top-4 bottom-4 w-[2.5px] bg-zinc-800" />
              
              {timelineEvents.map((evt, index) => (
                <div key={evt.year} className="relative">
                  {/* Point */}
                  <div className="absolute -left-[27px] top-1.5 w-[15px] h-[15px] rounded-full bg-emerald-500 flex items-center justify-center border-4 border-[#09090b] z-10 shadow" />
                  
                  <div className="p-4 bg-[#09090b] rounded-xl border border-zinc-800 space-y-1 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{evt.year}</span>
                      {evt.author && <span className="text-[10px] text-zinc-500 font-mono italic">Autor: {evt.author}</span>}
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-zinc-200 mt-1 font-sans">{evt.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TRIVIA / FACT CARDS */}
        {activeTab === 'trivia' && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-zinc-200 flex items-center gap-2 font-serif italic">
                <Award className="w-5 h-5 text-emerald-400" />
                Cartões de Curiosidades e Fatos do DW
              </h3>
              <p className="text-xs text-zinc-405 mt-1">Descobertas surpreendentes e fatos curiosos que moldaram a ciência e engenharia de dados.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              {triviaCards.map((tr) => (
                <div key={tr.id} className="p-5 bg-[#09090b] border border-zinc-800 rounded-xl space-y-4 hover:border-emerald-550/30 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded font-mono font-bold uppercase">Fato #{tr.id}</span>
                      <h4 className="text-xs font-bold text-zinc-200 font-sans">{tr.title}</h4>
                    </div>
                    <p className="text-xs text-zinc-405 leading-relaxed font-sans">{tr.fact}</p>
                  </div>

                  <div className="bg-[#111113]/65 p-3 rounded-lg border border-zinc-800 text-[10px] text-zinc-400 leading-relaxed font-mono font-sans">
                    <strong className="text-emerald-400 block mb-0.5 uppercase tracking-wider text-[9px] font-bold">Impacto no Design:</strong>
                    {tr.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
