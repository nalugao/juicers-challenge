import { useState } from "react";
import "../../style/Publicos.css";

const TABS = [
  {
    id: "user", num: "01", tab: "Quem usa", tabDesc: "Acompanhe seu corpo com informação de verdade.",
    role: "Para você", title: "Quem usa anabolizantes",
    p: "Você decide sobre o seu corpo e merece fazer isso com informação de verdade. Reúna seus exames, veja seus números evoluírem e saiba quando algo merece atenção. Sem sermão, sem julgamento.",
    feats: [
      { t: "Linha do tempo", p: "Todos os exames numa trajetória única.", icon: <><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></> },
      { t: "Alertas discretos", p: "Avisa quando um marcador sai da faixa.", icon: <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/> },
    ],
  },
  {
    id: "health", num: "02", tab: "Profissionais de saúde", tabDesc: "Histórico e tendências dos seus pacientes.",
    role: "Apoio clínico", title: "Profissionais de saúde",
    p: "Acompanhe o histórico e a evolução dos indicadores dos seus pacientes em um só lugar. Identifique tendências mais cedo e baseie a conduta em dados organizados ao longo do tempo. A Juicers amplia o seu trabalho, não substitui sua avaliação.",
    feats: [
      { t: "Visão longitudinal", p: "Tendências em vez de exames isolados.", icon: <><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></> },
      { t: "Histórico organizado", p: "Tudo do paciente, pronto para a consulta.", icon: <path d="M4 19V5l8 4 8-4v14"/> },
    ],
  },
  {
    id: "fit", num: "03", tab: "Profissionais do fitness", tabDesc: "Sinais para orientar e encaminhar com responsabilidade.",
    role: "Na academia", title: "Profissionais do fitness",
    p: "Coach seus alunos confiam em você. Acompanhe sinais e indicadores, reconheça quando é hora de recomendar avaliação médica e atue com responsabilidade no seu papel. Cuidar e orientar na hora certa.",
    feats: [
      { t: "Sinais de atenção", p: "Saiba quando encaminhar a um médico.", icon: <path d="M20 7 9 18l-5-5"/> },
      { t: "Cuidado responsável", p: "Apoio sem prescrever, dentro do seu papel.", icon: <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z"/> },
    ],
  },
];

export default function Publicos() {
  const [active, setActive] = useState("user");
  const cur = TABS.find((t) => t.id === active);

  return (
    <section className="section" id="pub">
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 640 }}>
          <span className="eyebrow sec-tag">Para quem é</span>
          <h2 className="sec-h">Uma plataforma, três frentes de cuidado.</h2>
        </div>
        <div className="aud reveal">
          <div className="aud-tabs" role="tablist">
            {TABS.map((t) => (
              <button key={t.id} className={"aud-tab" + (active === t.id ? " on" : "")}
                      role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)}>
                <span className="tt"><span className="tnum">{t.num}</span> {t.tab}</span>
                <span className="tdesc">{t.tabDesc}</span>
              </button>
            ))}
          </div>
          <div className="aud-panel aud-panel-anim" key={cur.id}>
            <span className="ap-role">{cur.role}</span>
            <h3>{cur.title}</h3>
            <p>{cur.p}</p>
            <div className="aud-feats">
              {cur.feats.map((f) => (
                <div className="aud-feat" key={f.t}>
                  <div className="af-t">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{f.icon}</svg> {f.t}
                  </div>
                  <p>{f.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
