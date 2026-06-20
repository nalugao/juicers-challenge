import { useState } from "react";
import "../../style/planos.css";

// ─── Dados ────────────────────────────────────────────────────────────────────

const ABAS = [
  { id: "profissionais", label: "Médicos & Personal Trainers" },
  { id: "individual",    label: "Usuário Individual" },
  { id: "creditos",      label: "Comprar por Exame" },
];

const PLANOS = {
  profissionais: [
    {
      id: "starter",
      nome: "Starter",
      preco: "49",
      precoMax: "99",
      periodo: "/mês",
      descricao: "Para profissionais autônomos dando os primeiros passos",
      recursos: [
        "Até 20 pacientes",
        "Interpretação de exames por IA",
        "Histórico dos exames",
        "Dashboard básico",
      ],
      cta: "Começar grátis",
      destaque: false,
    },
    {
      id: "profissional",
      nome: "Profissional",
      preco: "149",
      precoMax: "299",
      periodo: "/mês",
      descricao: "Para quem está crescendo a cartela de pacientes",
      badge: "Mais popular",
      recursos: [
        "Até 100 pacientes",
        "Relatórios automáticos",
        "Comparação de exames ao longo do tempo",
        "Alertas de alterações importantes",
      ],
      cta: "Assinar agora",
      destaque: true,
    },
    {
      id: "clinica",
      nome: "Clínica",
      preco: "499",
      periodo: "/mês",
      descricao: "Para clínicas e equipes multiprofissionais",
      recursos: [
        "Pacientes ilimitados",
        "Múltiplos profissionais",
        "White label (logo da clínica)",
        "Exportação de relatórios em PDF",
      ],
      cta: "Falar com o time",
      destaque: false,
    },
  ],
  individual: [
    {
      id: "premium",
      nome: "Premium Individual",
      preco: "19,90",
      precoMax: "39,90",
      periodo: "/mês",
      descricao: "Acompanhe sua própria saúde com autonomia e precisão",
      badge: "Tudo incluso",
      recursos: [
        "Exames ilimitados",
        "Histórico completo",
        "Gráficos de evolução",
        "Alertas personalizados",
      ],
      cta: "Assinar Premium",
      destaque: true,
    },
  ],
  creditos: [
    {
      id: "avulso",
      nome: "Avulso",
      preco: "9,90",
      unidade: "1 exame",
      precoPorExame: "R$ 9,90 / exame",
      descricao: "Sem assinatura, sem compromisso",
      recursos: [
        "1 exame interpretado",
        "Resultado em minutos",
        "Crédito não expira",
      ],
      cta: "Comprar",
      destaque: false,
    },
    {
      id: "pacote5",
      nome: "Pacote 5",
      preco: "29,90",
      unidade: "5 exames",
      precoPorExame: "R$ 5,98 / exame",
      descricao: "Economia de 40% por exame",
      badge: "Melhor custo",
      recursos: [
        "5 exames interpretados",
        "Válidos por 6 meses",
        "Resultado em minutos",
      ],
      cta: "Comprar pacote",
      destaque: true,
      economia: "Você economiza R$ 19,60",
    },
    {
      id: "pacote20",
      nome: "Pacote 20",
      preco: "79,90",
      unidade: "20 exames",
      precoPorExame: "R$ 3,99 / exame",
      descricao: "Economia de 60% por exame",
      recursos: [
        "20 exames interpretados",
        "Válidos por 12 meses",
        "Resultado em minutos",
      ],
      cta: "Comprar pacote",
      destaque: false,
      economia: "Você economiza R$ 118,10",
    },
  ],
};

// ─── Ícone de check ───────────────────────────────────────────────────────────

function IconeCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.5" stroke="#38BDF8" strokeOpacity="0.22" />
      <path
        d="M5.5 9l2.5 2.5L12.5 6"
        stroke="#38BDF8"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Card de plano ────────────────────────────────────────────────────────────

function CardPlano({ plano, isCreditos }) {
  return (
    <div className={`planos-card${plano.destaque ? " planos-card--destaque" : ""}`}>
      {plano.badge && <div className="planos-badge">{plano.badge}</div>}

      <div className="planos-nome">{plano.nome}</div>
      <div className="planos-descricao">{plano.descricao}</div>

      <div className="planos-preco-bloco">
        <div className="planos-preco-linha">
          <span className="planos-moeda">R$</span>
          <span className="planos-valor">{plano.preco}</span>
          {plano.periodo && <span className="planos-periodo">{plano.periodo}</span>}
        </div>

        {plano.precoMax && (
          <div className="planos-preco-nota">até R$ {plano.precoMax}{plano.periodo}</div>
        )}
        {isCreditos && plano.unidade && (
          <div className="planos-preco-nota">para {plano.unidade} · {plano.precoPorExame}</div>
        )}
        {plano.economia && (
          <span className="planos-economia">{plano.economia}</span>
        )}
      </div>

      <div className="planos-divisor" />

      <ul className="planos-recursos">
        {plano.recursos.map((recurso, i) => (
          <li key={i} className="planos-recurso">
            <IconeCheck />
            <span>{recurso}</span>
          </li>
        ))}
      </ul>

      <button className={`planos-cta${plano.destaque ? " planos-cta--primario" : " planos-cta--fantasma"}`}>
        {plano.cta}
      </button>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────

export default function Planos() {
  const [abaAtiva, setAbaAtiva] = useState("profissionais");
  const planos      = PLANOS[abaAtiva];
  const isCreditos  = abaAtiva === "creditos";
  const isUnico     = planos.length === 1;

  return (
    <section className="planos-secao reveal" id="precos">
      <div className="planos-bg-radial" aria-hidden="true" />
      <div className="planos-bg-grid"   aria-hidden="true" />

      <div className="planos-container">

        <header className="planos-header">
          <span className="planos-eyebrow">Planos &amp; Preços</span>
          <h2 className="planos-titulo">
            Seus exames, finalmente
            <br />
            <span className="planos-titulo-destaque">interpretados com precisão</span>
          </h2>
          <p className="planos-subtitulo">
            Para médicos, personal trainers e usuários que levam a sério
            o que os números dizem.
          </p>
        </header>

        <nav className="planos-abas" role="tablist" aria-label="Tipos de plano">
          {ABAS.map((aba) => (
            <button
              key={aba.id}
              role="tab"
              aria-selected={abaAtiva === aba.id}
              className={`planos-aba${abaAtiva === aba.id ? " planos-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva(aba.id)}
            >
              {aba.label}
            </button>
          ))}
        </nav>

        <div
          key={abaAtiva}
          role="tabpanel"
          className={`planos-grid${isUnico ? " planos-grid--unico" : " planos-grid--triplo"}`}
        >
          {planos.map((plano) => (
            <CardPlano key={plano.id} plano={plano} isCreditos={isCreditos} />
          ))}
        </div>

        <footer className="planos-rodape">
          <span>🔒 Pagamento seguro</span>
          <span className="planos-sep" aria-hidden="true" />
          <span>Cancele quando quiser</span>
          <span className="planos-sep" aria-hidden="true" />
          <span>Suporte 7 dias por semana</span>
        </footer>

      </div>
    </section>
  );
}