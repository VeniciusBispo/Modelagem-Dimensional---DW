import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  Trophy, 
  BookOpen, 
  Check, 
  X,
  Share2
} from 'lucide-react';

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<{ qId: number, isCorrect: boolean }>>([]);

  const currentQuestion = quizQuestions[currentIdx];

  const handleOptionSelect = (optIdx: number) => {
    if (showAnswer) return;
    setSelectedOpt(optIdx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null || showAnswer) return;
    
    const isCorrect = selectedOpt === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, { qId: currentQuestion.id, isCorrect }]);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setShowAnswer(false);

    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowAnswer(false);
    setScore(0);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  // Determine Architect rank based on score
  const getRank = (sc: number) => {
    if (sc === 15) return { title: 'Arquiteto de Dados Sênior', color: 'text-emerald-400', badge: 'Golden Master' };
    if (sc >= 12) return { title: 'Arquiteto Dimensional Pleno', color: 'text-amber-400', badge: 'Silver Practitioner' };
    if (sc >= 8) return { title: 'Analista de DW Júnior', color: 'text-emerald-450', badge: 'Bronze Associate' };
    return { title: 'Estudante Acadêmico', color: 'text-zinc-500', badge: 'Active Learner' };
  };

  const rank = getRank(score);

  return (
    <div className="bg-[#111113] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-2xl animate-fade-in font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
      
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-550/10 rounded-lg text-emerald-400">
            <Trophy className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 font-serif italic">Simulador de Certificação DW</h3>
            <p className="text-sm text-zinc-405 mt-0.5">Teste seus conhecimentos com 15 perguntas oficiais sobre modelagem dimensional.</p>
          </div>
        </div>
        {!quizComplete && (
          <div className="text-right font-mono text-xs text-zinc-500 font-sans">
            Questão <span className="text-emerald-400 font-bold">{currentIdx + 1}</span> de <span className="font-bold">{quizQuestions.length}</span>
          </div>
        )}
      </div>

      {/* QUIZ IN PROGRESS */}
      {!quizComplete ? (
        <div className="space-y-6">
          
          {/* Progress Bar */}
          <div className="w-full bg-[#09090b] h-1.5 rounded-full overflow-hidden border border-zinc-800">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="bg-[#09090b] p-5 rounded-xl border border-zinc-800">
            <h4 className="text-sm md:text-base font-semibold text-zinc-200 leading-relaxed font-sans">
              {currentQuestion.question}
            </h4>
          </div>

          {/* Options list */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              const isCorrect = optIdx === currentQuestion.correctAnswer;
              const isWrongSelected = isSelected && !isCorrect;

              let btnClass = 'bg-[#09090b] hover:bg-zinc-900 border-zinc-800 text-zinc-300';
              
              if (isSelected && !showAnswer) {
                btnClass = 'bg-emerald-500/10 border-emerald-550 text-emerald-400 font-bold';
              } else if (showAnswer) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-500/15 border-emerald-550 text-emerald-300 font-semibold shadow shadow-emerald-500/5';
                } else if (isWrongSelected) {
                  btnClass = 'bg-red-500/15 border-red-550 text-red-300 opacity-60';
                } else {
                  btnClass = 'bg-[#09090b] border-zinc-900 text-zinc-600 opacity-40';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionSelect(optIdx)}
                  disabled={showAnswer}
                  className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnClass}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center font-mono text-[10px] ${
                    isSelected ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold' : 'border-zinc-800 text-zinc-450'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="flex-1 font-sans">{opt}</span>
                  
                  {showAnswer && isCorrect && <Check className="w-4 h-4 text-emerald-450 mt-0.5 flex-shrink-0" />}
                  {showAnswer && isWrongSelected && <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation panel */}
          {showAnswer && (
            <div className="bg-[#09090b] p-5 rounded-xl border border-zinc-800 animate-fade-in">
              <span className="text-[10px] font-mono text-emerald-450 uppercase block mb-1 flex items-center gap-1 font-bold">
                <BookOpen className="w-3.5 h-3.5" /> Justificativa Acadêmica
              </span>
              <p className="text-xs text-zinc-350 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4 font-sans">
            {!showAnswer ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOpt === null}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 text-xs font-bold rounded-lg disabled:bg-zinc-900 disabled:text-zinc-600 transition-colors cursor-pointer"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                {currentIdx < quizQuestions.length - 1 ? (
                  <>
                    Próxima Questão <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Ver Resultado Final <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      ) : (
        /* QUIZ COMPLETE - CERTIFICATE & DETAILED FEEDBACK */
        <div className="space-y-8 animate-fade-in font-sans">
          
          {/* Certificate Frame */}
          <div className="border-4 border-double border-zinc-800 bg-[#09090b] rounded-2xl p-6 md:p-10 relative overflow-hidden text-center flex flex-col items-center justify-center max-w-2xl mx-auto">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-zinc-900/10 pointer-events-none" />
            <div className="absolute top-4 left-4 text-zinc-800"><Award className="w-16 h-16 opacity-10 text-emerald-500" /></div>
            
            <Trophy className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
            
            <span className="text-[10px] font-mono tracking-widest text-emerald-405 uppercase font-bold">Certificado de Aproveitamento</span>
            <h2 className="text-lg md:text-2xl font-bold text-zinc-100 mt-2 font-serif italic">Arquiteto de Data Warehouse</h2>
            <div className="w-24 h-[1px] bg-zinc-800 my-4" />

            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-md font-sans">
              Certificamos que o estudante concluiu com êxito o exame interativo de modelagem dimensional, respondendo corretamente a 
              <strong className="text-zinc-200 mx-1">{score} de {quizQuestions.length} questões</strong> 
              e alcançando o título de:
            </p>

            <span className={`text-base md:text-xl font-extrabold tracking-wider mt-4 block uppercase font-serif italic ${rank.color}`}>
              {rank.title}
            </span>
            <span className="text-[9px] text-zinc-500 font-mono mt-1">// Credencial Acadêmica: {rank.badge}</span>

            <div className="w-full grid grid-cols-3 gap-2 mt-8 text-center text-zinc-500 font-mono text-[9px] md:text-xs border-t border-zinc-850 pt-6">
              <div>
                <span className="block text-zinc-400 font-bold font-sans">{score} / 15</span>
                <span className="font-sans">Pontuação</span>
              </div>
              <div>
                <span className="block text-zinc-400 font-bold font-sans">{((score/15)*100).toFixed(0)}%</span>
                <span className="font-sans">Aproveitamento</span>
              </div>
              <div>
                <span className="block text-zinc-400 font-bold font-sans">2026-07-08</span>
                <span className="font-sans">Emissão</span>
              </div>
            </div>
          </div>

          {/* Quick List Answers Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-zinc-500 uppercase font-sans font-bold">Resumo de Respostas</h4>
            <div className="grid grid-cols-5 sm:grid-cols-15 gap-2 font-sans">
              {userAnswers.map((ans, idx) => (
                <div 
                  key={idx}
                  className={`p-2 rounded text-center font-mono text-xs font-bold border ${
                    ans.isCorrect 
                      ? 'bg-emerald-500/10 border-emerald-550/20 text-emerald-450' 
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                  title={`Questão ${idx+1}: ${ans.isCorrect ? 'Correta' : 'Incorreta'}`}
                >
                  Q{idx+1}
                  <span className="block text-[8px] font-normal mt-0.5 font-sans">
                    {ans.isCorrect ? 'OK' : 'ERR'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 border border-zinc-800"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" /> Tentar Novamente
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
