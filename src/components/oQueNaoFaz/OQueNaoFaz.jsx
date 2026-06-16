import "../../style/OQueNaoFaz.css";

const X = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

export default function OQueNaoFaz() {
  return (
    <section id="naofaz" className="section">
      <div className="wrap">
        <div className="notdo reveal">
          <div>
            <span className="eyebrow">Transparência</span>
            <h2 style={{ marginTop: 12 }}>
              O que a Juicers <span style={{ color: "var(--j-red)" }}>não</span> faz
            </h2>
            <p>
              Acompanhar não é prescrever. A Juicers existe para dar clareza e reduzir danos —
              sempre incentivando a orientação profissional.{" "}
              <span className="green">Educação em saúde, do começo ao fim.</span>
            </p>
          </div>
          <ul>
            <li><X /> Não prescreve ciclos</li>
            <li><X /> Não sugere doses ou substâncias</li>
            <li><X /> Não incentiva o uso de anabolizantes</li>
            <li><X /> Não substitui consulta, diagnóstico ou tratamento médico</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
