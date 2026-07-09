export interface Topic {
  id: string;
  number: number;
  title: string;
  category: 'Navegação' | 'Modelagem Avançada' | 'Pontes e Alocação' | 'Desempenho e Agregados' | 'Dimensões de Histórico';
  shortDesc: string;
  simpleDef: string;
  technicalDef: string;
  practicalExample: string;
  businessExample: string;
  pros: string[];
  cons: string[];
  commonErrors: string[];
  whenToUse: string;
  whenNotToUse: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SolvedExercise {
  id: number;
  title: string;
  scenario: string;
  challenge: string;
  solution: string;
  techNotes: string;
}

export interface PracticeChallenge {
  id: number;
  title: string;
  description: string;
  options: string[];
  correctAnswer: string;
  feedback: {
    success: string;
    error: string;
  };
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  author?: string;
}

export interface TriviaCard {
  id: number;
  title: string;
  fact: string;
  impact: string;
}
