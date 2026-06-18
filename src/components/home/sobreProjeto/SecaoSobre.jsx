import "../../../style/SecaoProjeto.css";

export default function SecaoSobre() {
  return (
    <section id="sobre" className="section" style={{ background: "var(--j-surface)" }}>
      <div className="wrap">
        <div className="about-grid">
          <div className="reveal">
            <span className="eyebrow">Sobre o projeto</span>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", margin: "12px 0 16px" }}>
              Acompanhar é cuidar.
            </h2>
            <p>
              A Juicers é uma ferramenta de acompanhamento de saúde, educação e redução de danos
              para quem usa anabolizantes, e para os profissionais que os apoiam. A maioria das
              pessoas já conhece os riscos; o que costuma faltar é acompanhamento. Em vez de julgar,
              ajudamos a enxergar e a decidir melhor.
            </p>
          </div>
          <div className="seal reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <h4>Privado por padrão</h4>
            <p>Seus dados de saúde ficam no seu dispositivo. Você no controle, sempre.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
