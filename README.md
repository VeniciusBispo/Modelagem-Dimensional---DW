# 📊 Modelagem Dimensional - Manual Interativo

Um **manual acadêmico interativo** completo sobre **Modelagem Dimensional** para Engenharia de Dados Corporativa. Ferramenta educacional com simulador, quiz de certificação e componentes interativos.

🌐 **[Acesso Online](https://veniciusbispo.github.io/Modelagem-Dimensional---DW/)** | Hospedado em GitHub Pages

---

## ✨ Características

✅ **16 Conceitos Fundamentais** - Drill Down, Drill Up, Drill Across, SCD Tipos 1-2, Bridge Tables, Agregados, etc.

✅ **Interface Interativa** - 4 abas por tema: Teoria, Exemplos, Interativo e Regras de Negócio

✅ **Simulador Corporativo** - Monte cenários reais com Bridge Tables, SCD e Agregados para visualizar impacto

✅ **Quiz de Certificação** - Avalie seu conhecimento com questões baseadas em cenários reais

✅ **Extras Educacionais** - Glossário técnico, estudos de caso, exercícios práticos

✅ **Dark Theme Moderno** - Interface responsiva otimizada para desktop e mobile

✅ **Rastreamento de Progresso** - Acompanhe sua evolução através dos tópicos

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ 
- npm 9+

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/VeniciusBispo/Modelagem-Dimensional---DW.git
cd Modelagem-Dimensional---DW

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000/`

---

## 📦 Build para Produção

```bash
# Build da aplicação
npm run build

# Visualize a build localmente
npm run preview
```

A pasta `dist/` contém os arquivos estáticos prontos para deploy.

---

## 🏗️ Estrutura do Projeto

```
src/
├── App.tsx                 # Componente principal
├── main.tsx               # Entry point React
├── types.ts               # Interfaces TypeScript
├── index.css              # Estilos globais (Tailwind)
├── components/
│   ├── DrillVisualizer.tsx       # Visualizador Drill Down/Up
│   ├── BridgeVisualizer.tsx      # Visualizador Bridge Table
│   ├── AggregateVisualizer.tsx   # Visualizador de Agregados
│   ├── SCDVisualizer.tsx         # Visualizador Slow Changing Dimensions
│   ├── Simulator.tsx             # Simulador de Cenários
│   ├── Quiz.tsx                  # Quiz Interativo
│   └── ExtrasContainer.tsx       # Glossário e Extras
└── data/
    ├── topicsData.ts      # 16 tópicos de modelagem dimensional
    └── quizData.ts        # Perguntas, exercícios e glossário

package.json              # Dependências
vite.config.ts           # Configuração Vite
tsconfig.json            # Configuração TypeScript
```

---

## 🎯 Tópicos Cobertos

### Navegação (3 tópicos)
- **Drill Down** - Descer na hierarquia para visualizar detalhes
- **Drill Up (Roll Up)** - Subir para consolidar em resumos
- **Drill Across** - Consultar múltiplas tabelas fato com dimensões conformadas

### Modelagem Avançada (5 tópicos)
- Bridge Tables para relacionamentos N:M
- Slowly Changing Dimensions (SCD Tipo 1 e 2)
- Dimensões Degeneradas
- Fatos Semiadditivos
- Dimensões Jogo-Caractere

### Pontes e Alocação (4 tópicos)
- Tabelas Auxiliares e Weight Factors
- Alocação de Fatos
- Integridade Referencial

### Desempenho (2 tópicos)
- Agregados e Pré-Agregação
- Compressão de Dados

### Dimensões de Histórico (2 tópicos)
- Rastreamento Temporal
- Auditorias e Versionamento

---

## 💻 Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React | 19.0+ | UI Framework |
| TypeScript | 5.8+ | Type Safety |
| Vite | 6.2+ | Build Tool |
| Tailwind CSS | 4.1+ | Styling |
| Lucide React | 0.546+ | Ícones |
| Motion | 12.23+ | Animações |

---

## 🔐 Segurança

✅ **Sem dados sensíveis** - Apenas dados de exemplo educacional  
✅ **`.env` ignorado** - Credenciais não são versionadas (ver `.gitignore`)  
✅ **Build estático** - Não há servidor backend exposto

---

## 📱 Responsividade

Totalmente responsivo:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1919px)
- ✅ Mobile (< 768px)

Teste com `npm run dev` e redimensione a janela.

---

## 🚢 Deploy no GitHub Pages

Este projeto está configurado para rodar no GitHub Pages automaticamente:

```bash
npm run build
# Arquivos estáticos gerados em dist/
# GitHub Pages servir automaticamente via branch gh-pages
```

**URL do Projeto:** `https://veniciusbispo.github.io/Modelagem-Dimensional---DW/`

---

## 📚 Como Usar

1. **Explorar Tópicos** - Use a sidebar esquerda para navegar pelos 16 conceitos
2. **Ler Teoria** - Comece com a aba "Teoria" de cada tópico
3. **Ver Exemplos** - Clique em "Exemplo" para cenários práticos
4. **Testar Interativo** - Use a aba "Interativo" para visualizadores
5. **Simular** - Vá ao "Simulador Corporativo" para montar seus próprios cenários
6. **Praticar** - Responda o "Exame de Certificação" para validar conhecimento

---

## 📊 Componentes Principais

### Drill Visualizer
Mostra visualmente como os dados navegam pela hierarquia dimensional.

### Bridge Visualizer
Demonstra o impacto das Bridge Tables em relacionamentos N:M.

### Aggregate Visualizer
Visualiza como agregados reduzem volume e melhoram performance.

### SCD Visualizer
Compara SCD Tipo 1 vs Tipo 2 com rastreamento temporal.

### Simulator
Monte cenários corporativos reais e veja impacto em faturamento e integridade.

### Quiz
10+ questões com feedback detalhado baseado em cenários reais.

---

## 👨‍💻 Desenvolvido por

**Vinicius Bispo**  
GitHub: [@VeniciusBispo](https://github.com/VeniciusBispo)

---

## 📄 Licença

Este projeto é fornecido como material educacional. Sinta-se livre para usar, modificar e distribuir com atribuição.

---

## 🤝 Contribuições

Sugestões e correções são bem-vindas! Abra uma issue ou pull request.

---

## 📞 Suporte

Encontrou um problema? Abra uma [issue](https://github.com/VeniciusBispo/Modelagem-Dimensional---DW/issues) no GitHub.

---

## ⭐ Se Gostou

Se este material foi útil para seus estudos, deixe uma ⭐ no repositório!
