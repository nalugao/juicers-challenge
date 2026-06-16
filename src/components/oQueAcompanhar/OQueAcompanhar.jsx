import "../../style/oQueAcompanhar.css";

const HeartIco = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg>);
const HormonIco = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
const LiverIco = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 4h10l-1 7a5 5 0 0 1-8 0L7 4z"/><path d="M9 20h6"/></svg>);
const MoodIco = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>);

const CARDS = [
  { Ico: HeartIco, t: "Coração", p: "Pressão e colesterol podem se alterar de forma silenciosa é o que menos se vê e mais importa acompanhar.", track: "pressão arterial, HDL, LDL e triglicérides." },
  { Ico: HormonIco, t: "Hormônios", p: "A produção natural de testosterona pode oscilar. Acompanhar mostra como o corpo está respondendo ao longo do tempo.", track: "testosterona total e livre, LH e FSH." },
  { Ico: LiverIco, t: "Fígado e rim", p: "Marcadores hepáticos e renais contam muito sobre como o organismo está lidando com a rotina.", track: "ALT, AST, GGT, ureia e creatinina." },
  { Ico: MoodIco, t: "Sono, humor e disposição", p: "Bem-estar também é indicador. Registrar ajuda a perceber padrões que passam despercebidos no dia a dia.", track: "qualidade do sono, humor e energia." },
];

export default function OQueAcompanhar() {
  return (
    <section id="monitorar" className="section" style={{ background: "var(--j-surface)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">O que vale acompanhar</span>
          <h2>Cada parte do corpo dá sinais.</h2>
          <p>A Juicers ajuda você a enxergá-los a tempo com exames de rotina, fáceis de acompanhar.</p>
        </div>
        <div className="mon-grid">
          {CARDS.map(({ Ico, t, p, track }) => (
            <div className="mon reveal" key={t}>
              <div className="mon-head"><div className="mon-ico"><Ico /></div><h3>{t}</h3></div>
              <p>{p}</p>
              <div className="mon-track"><span>📋</span><div>O que acompanhar: {track}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
