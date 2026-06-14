# Juicer

Aplicação web desenvolvida como projeto de challenge da FIAP (1º ano) para monitoramento de saúde voltado a usuários que fazem uso de esteroides anabolizantes. O sistema permite acompanhar marcadores laboratoriais, visualizar alertas de risco por sistema orgânico e simular o impacto de compostos no organismo.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Roteamento | React Router DOM 7 |
| Gráficos | Recharts 3 |
| Estilização | CSS modular por componente + Bootstrap 5 |
| Linting | ESLint 9 |

---

## Time

| Nome | Papel |
|---|---|
| Jefferson Gomes | Pesquisa científica, validação médica e organização dos dados de saúde |
| Natalia Lugão | Frontend / UI-UX — construção visual e experiência do usuário |
| Sophia Coelho | Criação dos gráficos interativos e visualização dos dados de saúde |
| Gabriel Soares | Análises de risco, cálculos e regras que processam os dados de saúde do sistema |
| André Melo | Processo criativo do projeto, construção do pitch e apresentação da proposta |

---

## Arquitetura

```
src/
├── App.jsx                  # Configuração de rotas e providers globais
├── main.jsx                 # Entrypoint
├── pages/                   # Páginas (uma por rota)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Perfil.jsx
│   └── Sobre.jsx
├── components/              # Componentes reutilizáveis e seções
│   ├── Navbar.jsx / Footer.jsx / Topbar.jsx / Layout.jsx
│   ├── inicio/              # Seção hero da Home
│   ├── painel/              # Painel de visão geral na Home
│   ├── mapaCorporal/        # Mapa corporal interativo (HumanBody)
│   ├── simulador/           # Simulador de compostos e riscos
│   ├── perfilDoUsuario/     # Cards de métricas, gráficos e alertas do Perfil
│   │   └── graficos/        # Gráficos por sistema (Recharts)
│   ├── sobreProjeto/        # Contextualização, time e stacks
│   ├── Acessibilidade/      # Menu e botões de acessibilidade
│   ├── LeitorDeAudio/       # Leitor de áudio (screen reader próprio)
│   ├── DadosConta.jsx       # Formulário de dados pessoais (persiste em localStorage)
│   ├── HistoricoExames.jsx  # Listagem cronológica de exames
│   └── OnboardingForm.jsx   # Formulário de onboarding inicial
├── data/
│   ├── mockData.js          # Dados simulados de exames, métricas e alertas
│   └── time.js              # Dados dos membros do time
└── style/                   # Arquivos CSS individuais por componente
```

**Persistência:** os dados da conta do usuário são salvos no `localStorage` com a chave `dadosContaCicloRisco` e carregados dinamicamente na página de perfil.

**Dados:** atualmente toda a camada de dados é mockada em `mockData.js`, que gera métricas e alertas dinamicamente a partir de séries históricas de exames laboratoriais (cardiovascular, endócrino, hepático, hematológico e renal).

---

## Fluxo de Navegação

```
/ (Home)
├── Início       — hero com apresentação do produto
├── Painel       — visão geral dos principais indicadores
├── Mapa Corporal — corpo humano interativo com sistemas de risco
└── Simulador    — simulação de efeitos de compostos

/sobre
├── Contextualização — problema e proposta
├── Time             — membros do projeto
└── Stacks Usadas    — tecnologias

/login           — autenticação do usuário

/perfil          — dashboard individual
├── Topbar           — identificação e resumo do ciclo
├── Dados da Conta   — accordion com formulário editável
├── Métricas         — cards com testosterona, LDL, TGO/TGP, HDL
├── Gráfico          — evolução temporal por sistema orgânico
├── Alertas / Exames / Insights — painel lateral
└── Histórico de Exames — linha do tempo completa

/conta           — edição isolada dos dados da conta
```

Componentes de acessibilidade (`AccessibilityMenu` e `LeitorDeAudio`) são montados globalmente no `App.jsx` e ficam disponíveis em todas as rotas.

---

## Como rodar

```bash
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173` por padrão.
