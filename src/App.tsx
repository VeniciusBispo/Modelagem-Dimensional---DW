import React, { useState, useEffect } from 'react';
import { topicsData } from './data/topicsData';
import DrillVisualizer from './components/DrillVisualizer';
import BridgeVisualizer from './components/BridgeVisualizer';
import AggregateVisualizer from './components/AggregateVisualizer';
import SCDVisualizer from './components/SCDVisualizer';
import Simulator from './components/Simulator';
import Quiz from './components/Quiz';
import ExtrasContainer from './components/ExtrasContainer';

import { 
  BookOpen, 
  Search, 
  HelpCircle, 
  Database, 
  Award, 
  Cpu, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  History, 
  Layers, 
  Settings, 
  Terminal, 
  ArrowUp,
  Sliders,
  Check,
  Menu,
  X,
  Clock
} from 'lucide-react';

export default function App() {
  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Active selected/scroll-to topic or extras
  const [selectedNav, setSelectedNav] = useState<string>('drill-down');
  
  // Accordion open/close state for the 16 topics
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    'drill-down': true // first one open by default
  });

  // Tab selection inside each topic: 'teoria' | 'exemplo' | 'interativo' | 'regras'
  const [activeTabs, setActiveTabs] = useState<Record<string, 'teoria' | 'exemplo' | 'interativo' | 'regras'>>({});

  // Search filter for 16 topics
  const [searchQuery, setSearchQuery] = useState('');

  // Read progress tracking state
  const [readTopics, setReadTopics] = useState<Record<string, boolean>>({
    'drill-down': true
  });

  // Floating Back to Top state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Simulated live clock and status
  const [liveTime, setLiveTime] = useState('2026-07-08 16:44:11');

  useEffect(() => {
    // Update showBackToTop based on scroll
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set initial tabs for all topics
  useEffect(() => {
    const initialTabs: Record<string, 'teoria' | 'exemplo' | 'interativo' | 'regras'> = {};
    topicsData.forEach(topic => {
      initialTabs[topic.id] = 'teoria';
    });
    setActiveTabs(initialTabs);
  }, []);

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopics(prev => {
      const isCurrentlyExpanded = prev[topicId];
      // Mark as read when first expanded
      if (!isCurrentlyExpanded && !readTopics[topicId]) {
        setReadTopics(r => ({ ...r, [topicId]: true }));
      }
      return {
        ...prev,
        [topicId]: !isCurrentlyExpanded
      };
    });
    setSelectedNav(topicId);
  };

  const handleTabChange = (topicId: string, tab: 'teoria' | 'exemplo' | 'interativo' | 'regras') => {
    setActiveTabs(prev => ({
      ...prev,
      [topicId]: tab
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedNav(id);
      setSidebarOpen(false);

      // If it is one of the 16 topics, expand it and mark as read
      if (topicsData.some(t => t.id === id)) {
        setExpandedTopics(prev => ({ ...prev, [id]: true }));
        setReadTopics(prev => ({ ...prev, [id]: true }));
      }
    }
  };

  // Calculate overall reading progress (16 topics + simulator + quiz = 18 total read targets)
  const totalReadTargets = 18;
  const readCount = Object.keys(readTopics).length;
  const readingProgress = Math.min(100, Math.round((readCount / totalReadTargets) * 100));

  // Filtered topics
  const filteredTopics = topicsData.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-white">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-[#111113]/90 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-zinc-800 rounded-lg lg:hidden text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-zinc-950 font-bold font-mono">
              DW
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold text-zinc-100 tracking-tight">Manual de Modelagem Dimensional</h1>
              <p className="text-[10px] text-zinc-500 font-mono hidden md:block">Módulo Acadêmico Interativo v4.2</p>
            </div>
          </div>
        </div>

        {/* Header Right Stats and Live Clocks */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 bg-zinc-900/60 px-3.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{liveTime}</span>
            </div>
            <div className="h-3 w-[1px] bg-zinc-800" />
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Cluster OLAP: Ativo</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-zinc-500 uppercase font-mono block">Seu Progresso</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">{readingProgress}% concluído</span>
            </div>
            <div className="w-20 bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full transition-all duration-500" 
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE: SIDEBAR + MAIN AREA */}
      <div className="flex-1 flex relative">
        
        {/* SIDEBAR NAVIGATION (LEFT) */}
        <aside className={`
          fixed lg:sticky top-[57px] bottom-0 left-0 z-30
          w-72 bg-[#111113] border-r border-zinc-800 p-5
          flex flex-col gap-6 overflow-y-auto transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:h-[calc(100vh-57px)]
        `}>
          
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Filtrar tópicos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          {/* Nav List */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Conceitos de Modelagem (16)</span>
              <nav className="space-y-1">
                {filteredTopics.map((topic) => {
                  const isSelected = selectedNav === topic.id;
                  const isRead = !!readTopics[topic.id];
                  return (
                    <button
                      key={topic.id}
                      onClick={() => scrollToSection(topic.id)}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/10 text-emerald-400 font-bold border-l-2 border-emerald-500' 
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                      }`}
                    >
                      <span className="truncate pr-2 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-zinc-600">#{topic.number}</span>
                        {topic.title}
                      </span>
                      <div className={`w-2.5 h-2.5 rounded-full border flex-shrink-0 ${
                        isRead ? 'bg-emerald-500 border-emerald-400' : 'border-zinc-800'
                      }`} title={isRead ? 'Concluído' : 'Não Lido'} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Extras Section Navigation Links */}
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Laboratórios & Extras</span>
              <nav className="space-y-1">
                {[
                  { id: 'simulator', label: 'Simulador Corporativo', icon: Settings, countId: 'simulator' },
                  { id: 'quiz', label: 'Exame de Certificação', icon: Award, countId: 'quiz' },
                  { id: 'extras', label: 'Estudos, Prática & Glossário', icon: BookOpen, countId: 'extras' }
                ].map((item) => {
                  const isSelected = selectedNav === item.id;
                  const isRead = !!readTopics[item.countId];
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        if (!readTopics[item.countId]) {
                          setReadTopics(prev => ({ ...prev, [item.countId]: true }));
                        }
                      }}
                      className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/10 text-emerald-400 font-bold border-l-2 border-emerald-500' 
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-emerald-400" />
                        {item.label}
                      </span>
                      <div className={`w-2.5 h-2.5 rounded-full border flex-shrink-0 ${
                        isRead ? 'bg-emerald-500 border-emerald-400' : 'border-zinc-800'
                      }`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Academic Footer inside Sidebar */}
          <div className="pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono space-y-1">
            <div>Plataforma de Treinamento</div>
            <div>Bancos de Dados Multidimensionais</div>
          </div>
        </aside>

        {/* MAIN CANVAS SCROLLABLE AREA */}
        <main className="flex-1 px-4 md:px-10 py-8 overflow-x-hidden space-y-16 max-w-5xl mx-auto">
          
          {/* ACADEMIC OVERVIEW BENTO INTRO */}
          <section className="bg-gradient-to-br from-[#111113] to-[#09090b] border border-zinc-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/15">
                Material de Estudo Interativo
              </span>
              <h2 className="text-xl md:text-3xl font-extrabold text-white mt-4 tracking-tight leading-tight font-serif italic">
                Modelagem Dimensional para Engenharia de Dados corporativos
              </h2>
              <p className="text-xs md:text-sm text-zinc-350 mt-2 leading-relaxed">
                Bem-vindo ao laboratório definitivo de Data Warehouses! Este livro interativo foi projetado para ensinar com precisão conceitos complexos do modelo de dados de Ralph Kimball por meio de simuladores ativos, diagramas esquemáticos e animações.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5 bg-[#09090b]/50 px-3 py-1.5 rounded-lg border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 16 Tópicos Ativos
                </div>
                <div className="flex items-center gap-1.5 bg-[#09090b]/50 px-3 py-1.5 rounded-lg border border-zinc-800">
                  <Sliders className="w-4 h-4 text-blue-400" /> Simulador de Escala
                </div>
                <div className="flex items-center gap-1.5 bg-[#09090b]/50 px-3 py-1.5 rounded-lg border border-zinc-800">
                  <Award className="w-4 h-4 text-amber-400" /> Quiz de Certificação
                </div>
              </div>
            </div>
          </section>

          {/* THE 16 TOPICS ACCORDIONS SECTION */}
          <section className="space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-extrabold text-zinc-100 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                Matriz de Conteúdos e Técnicas Dimensionais (16 Tópicos)
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">Explore cada técnica abrindo os tópicos abaixo e navegando pelas abas teóricas e simuladores.</p>
            </div>

            <div className="space-y-4">
              {filteredTopics.map((topic) => {
                const isExpanded = !!expandedTopics[topic.id];
                const activeTab = activeTabs[topic.id] || 'teoria';
                
                return (
                  <div 
                    key={topic.id} 
                    id={topic.id}
                    className={`border transition-all rounded-xl overflow-hidden ${
                      isExpanded 
                        ? 'bg-[#111113] border-zinc-800 shadow-xl ring-1 ring-emerald-500/5' 
                        : 'bg-[#111113]/50 border-zinc-850 hover:border-zinc-800'
                    }`}
                  >
                    {/* Header accordion trigger */}
                    <button
                      onClick={() => toggleTopicExpand(topic.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                          isExpanded ? 'bg-emerald-500 text-zinc-950 font-semibold' : 'bg-[#09090b] text-zinc-500'
                        }`}>
                          {topic.number}
                        </span>
                        <div>
                          <h3 className="font-bold text-xs md:text-sm text-zinc-200 flex items-center gap-2">
                            {topic.title}
                            <span className="text-[9px] font-normal uppercase tracking-wider font-mono bg-[#09090b] px-2 py-0.5 rounded text-zinc-500 border border-zinc-800/50">
                              {topic.category}
                            </span>
                          </h3>
                          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{topic.shortDesc}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {readTopics[topic.id] && (
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Lançado
                          </span>
                        )}
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-zinc-500 rotate-180 transition-transform" /> : <ChevronDown className="w-4 h-4 text-zinc-500 transition-transform" />}
                      </div>
                    </button>

                    {/* Accordion Content Panel */}
                    {isExpanded && (
                      <div className="border-t border-zinc-800 p-5 space-y-6">
                        
                        {/* Tab navigation inside Accordion */}
                        <div className="flex bg-[#09090b] p-1.5 rounded-lg border border-zinc-800 gap-1 text-[11px] font-mono">
                          {[
                            { id: 'teoria', label: 'Conceito Teórico' },
                            { id: 'exemplo', label: 'Estudo de Caso' },
                            { id: 'interativo', label: 'Simulação Ativa' },
                            { id: 'regras', label: 'Boas Práticas' }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => handleTabChange(topic.id, t.id as any)}
                              className={`flex-1 py-1.5 rounded transition-all font-semibold cursor-pointer ${
                                activeTab === t.id 
                                  ? 'bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20' 
                                  : 'text-zinc-500 hover:text-zinc-350'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                          {/* TAB 1: ACADEMIC THEORY */}
                        {activeTab === 'teoria' && (
                          <div className="space-y-4 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-[#09090b]/60 rounded-xl border border-zinc-800">
                                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block mb-1.5 font-bold">Explicação Simples</span>
                                <p className="text-xs md:text-sm text-zinc-350 leading-relaxed font-sans">{topic.simpleDef}</p>
                              </div>
                              <div className="p-4 bg-[#09090b]/60 rounded-xl border border-zinc-800">
                                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-wider block mb-1.5 font-bold">Explicação Técnica</span>
                                <p className="text-xs md:text-sm text-zinc-350 leading-relaxed font-sans">{topic.technicalDef}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 2: EXAMPLES */}
                        {activeTab === 'exemplo' && (
                          <div className="space-y-4 animate-fade-in font-sans">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-[#09090b]/40 rounded-xl border border-zinc-800 space-y-1.5">
                                <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider block font-bold">Exemplo do Cotidiano</span>
                                <p className="text-xs text-zinc-350 leading-relaxed">{topic.practicalExample}</p>
                              </div>
                              <div className="p-4 bg-[#09090b]/40 rounded-xl border border-zinc-800 space-y-1.5">
                                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">Aplicação no Mercado Real</span>
                                <p className="text-xs text-zinc-350 leading-relaxed">{topic.businessExample}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 3: DYNAMIC EMBEDDED SIMULATION */}
                        {activeTab === 'interativo' && (
                          <div className="animate-fade-in">
                            {topic.number <= 3 && <DrillVisualizer />}
                            {topic.number >= 4 && topic.number <= 10 && <BridgeVisualizer />}
                            {topic.number >= 11 && topic.number <= 15 && <AggregateVisualizer />}
                            {topic.number === 16 && <SCDVisualizer />}
                          </div>
                        )}

                        {/* TAB 4: RULES AND BEST PRACTICES */}
                        {activeTab === 'regras' && (
                          <div className="space-y-5 animate-fade-in font-sans">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-[#09090b]/60 rounded-xl border border-emerald-500/15 space-y-2">
                                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Quando Utilizar?
                                </span>
                                <p className="text-xs text-zinc-350 leading-relaxed">{topic.whenToUse}</p>
                              </div>

                              <div className="p-4 bg-[#09090b]/60 rounded-xl border border-red-500/15 space-y-2">
                                <span className="text-[9px] font-mono text-red-400 uppercase tracking-wider block font-bold flex items-center gap-1">
                                  <X className="w-4 h-4 text-red-400 border border-red-400 rounded-full p-0.5" /> Quando Não Utilizar?
                                </span>
                                <p className="text-xs text-zinc-350 leading-relaxed">{topic.whenNotToUse}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-[#09090b]/40 rounded-xl border border-zinc-800 space-y-2">
                                <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">Pontos Relevantes</span>
                                <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1">
                                  {topic.pros.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                              </div>

                              <div className="p-4 bg-[#09090b]/40 rounded-xl border border-zinc-800 space-y-2">
                                <span className="text-[10px] font-mono text-red-400 font-bold block uppercase tracking-wider">Erros Mais Comuns de Modeladores</span>
                                <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1">
                                  {topic.commonErrors.map((e, i) => <li key={i}>{e}</li>)}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-3 border-t border-zinc-800">
                          <span>Seção do Livro Acadêmico</span>
                          <span>Fim do Módulo {topic.number}</span>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
              {filteredTopics.length === 0 && (
                <div className="text-center py-12 text-zinc-500 font-mono text-xs border border-zinc-800 rounded-xl">
                  Nenhum tópico dimensional encontrado para "{searchQuery}".
                </div>
              )}
            </div>
          </section>

          {/* ADVANCED SCENARIO SIMULATOR SECTION */}
          <section id="simulator">
            <div className="border-b border-zinc-800 pb-3 mb-6">
              <span className="text-[10px] font-mono font-bold uppercase text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/15 inline-block mb-2">
                Simulador de Escala Real
              </span>
              <h2 className="text-lg font-extrabold text-zinc-100 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Laboratório Prático de Escala e Desempenho
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">Configure diferentes arquiteturas de bancos de dados OLAP e visualize o impacto imediato na integridade contábil.</p>
            </div>

            <Simulator />
          </section>

          {/* CERTIFICATION EXAM QUIZ SECTION */}
          <section id="quiz">
            <div className="border-b border-zinc-800 pb-3 mb-6">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/15 inline-block mb-2">
                Validação de Conhecimento
              </span>
              <h2 className="text-lg font-extrabold text-zinc-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Exame de Certificação Dimensional (15 Questões Oficiais)
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">Responda a perguntas técnicas elaboradas para testar sua proficiência de engenheiro de DW.</p>
            </div>

            <Quiz />
          </section>

          {/* ACTIVITIES, CASES AND GLOSSARY CONTAINER */}
          <section id="extras">
            <div className="border-b border-zinc-800 pb-3 mb-6">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/15 inline-block mb-2">
                Atividades Complementares
              </span>
              <h2 className="text-lg font-extrabold text-zinc-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Dicionário, Estudos Avançados e Prática Complementar
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">Explore casos reais resolvidos, resolva pequenos testes de design ou consulte termos chave no dicionário.</p>
            </div>

            <ExtrasContainer />
          </section>

        </main>
      </div>

      {/* FLOATING BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-emerald-500 text-zinc-950 font-bold rounded-full shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-all cursor-pointer z-50 animate-bounce"
          title="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* APP FOOTER */}
      <footer className="bg-[#111113] border-t border-zinc-800 py-6 px-4 md:px-8 text-center text-xs text-zinc-500 font-mono space-y-1">
        <div>Manual de Data Warehouse & Modelagem Dimensional Interativa &copy; 2026.</div>
        <div className="text-[10px]">Desenvolvido inteiramente com tecnologias web nativas para fins pedagógicos.</div>
      </footer>

    </div>
  );
}
