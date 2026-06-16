import "../../style/ComoFunciona.css";

const STEPS = [
  { num: "01", t: "Registre exames", p: "Anexe seu pdf. Lipidograma, hormônios, fígado, rim, hemograma e perfil hormonal.",
    icon: <path d="M12 5v14M5 12h14" /> },
  { num: "02", t: "Visualize indicadores", p: "Cada marcador na sua faixa de referência, fácil de ler.",
    icon: <><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></> },
  { num: "03", t: "Acompanhe a evolução", p: "A trajetória mostra o que melhora, estabiliza ou pede atenção.",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></> },
  { num: "04", t: "Busque orientação", p: "Nos sinais de alerta, a Juicers indica a busca de um profissional.",
    icon: <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z" /> },
];

export default function ComoFunciona() {
  return (
    <section className="section" id="sol">
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 640 }}>
          <span className="eyebrow sec-tag">A solução</span>
          <h2 className="sec-h">Uma camada de organização e acompanhamento.</h2>
          <p className="sec-lead">A Juicers não diz o que fazer com o seu corpo. Ele transforma exames soltos em uma trajetória legível e te orienta a buscar ajuda na hora certa.</p>
        </div>
        <div className="flow reveal">
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <div className="node">
                <span className="num">{s.num}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{s.icon}</svg>
              </div>
              <h4>{s.t}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
