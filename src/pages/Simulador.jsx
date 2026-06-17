import { useState } from "react";
import "../style/simulador.css";

function calculateRiskScore({ age, sex, frequency, months, route, stacking }) {
  let pontos = 0;

  if (age < 18) {
    pontos += 30;
  } else if (age <= 25) {
    pontos += 15;
  }

  if (frequency === "Ocasional") {
    pontos += 10;
  } else if (frequency === "Frequente") {
    pontos += 25;
  } else {
    pontos += 40;
  }

  if (months <= 6) {
    pontos += 10;
  } else if (months <= 12) {
    pontos += 20;
  } else {
    pontos += 35;
  }

  if (sex === "Feminino") {
    pontos += 10;
  }

  if (route === "Oral") {
    pontos += 10;
  }

  if (route === "Ambos") {
    pontos += 20;
  }

  if (stacking) {
    pontos += 15;
  }

  if (pontos > 100) {
    pontos = 100;
  }

  return pontos;
}
// Define o nível de risco e a cor
function getRiskProfile(score) {
  if (score <= 20) return { label: "Baixo", hex: "#22c55e" };
  if (score <= 40) return { label: "Moderado", hex: "#eab308" };
  if (score <= 60) return { label: "Alto", hex: "#f97316" };
  if (score <= 80) return { label: "Muito Alto", hex: "#ef4444" };
  return { label: "Crítico", hex: "#dc2626" };
}

function getContextualMessages({
  age,
  sex,
  frequency,
  months,
  route,
  stacking,
  score,
}) {
  const msgs = [];

  if (age <= 18) {
    msgs.push({
      severity: "danger",
      title: "Adolescente em desenvolvimento",
      text: "Antes dos 18 anos o eixo Hipotálamo-Hipófise-Testicular (HPT) ainda está em formação. O uso nessa fase pode causar fechamento prematuro das placas de crescimento e supressão hormonal permanente — comprometendo a produção natural de testosterona pelo resto da vida.",
    });
  }

  if (age > 18 && age <= 25) {
    msgs.push({
      severity: "warning",
      title: "Sistema endócrino ainda em maturação",
      text: "Entre 18 e 25 anos a produção natural de testosterona ainda está se estabelecendo. O uso de anabolizantes nessa janela pode suprimir o pico hormonal natural da juventude de forma irreversível, mesmo que o eixo HPT já seja considerado funcionalmente maduro.",
    });
  }

  if (sex === "Feminino") {
    msgs.push({
      severity: "danger",
      title: "Risco elevado para o sexo feminino",
      text: "Mulheres são muito mais sensíveis a doses menores do que homens. O uso pode causar virilização — engrossamento permanente da voz, hipertrofia do clitóris e hirsutismo — além de interrupção do ciclo menstrual. Muitos desses efeitos não regridem com a interrupção do uso.",
    });

    if (frequency === "Intenso") {
      msgs.push({
        severity: "danger",
        title: "Virilização irreversível — uso intenso",
        text: "Com uso intenso em mulheres, as chances de virilização permanente são muito elevadas. Alterações como mudança de voz e hipertrofia clitoriana não regridem mesmo após anos sem uso, pois resultam de mudanças estruturais nos tecidos.",
      });
    }

    if (stacking) {
      msgs.push({
        severity: "danger",
        title: "Combinação especialmente perigosa para mulheres",
        text: "O uso de múltiplos compostos em mulheres multiplica o risco de virilização e distúrbios hormonais graves. Cada composto adicional eleva exponencialmente a chance de efeitos androgenizantes permanentes.",
      });
    }
  }

  if (route === "Oral") {
    msgs.push({
      severity: "warning",
      title: "Hepatotoxicidade — compostos orais",
      text: "Anabolizantes orais são modificados quimicamente (17-alfa alquilados) para resistir ao metabolismo hepático, causando acúmulo de toxinas no fígado. O uso prolongado pode levar a peliose hepática, colestase e, em casos graves, carcinoma hepatocelular. Monitoramento de ALT, AST e bilirrubinas é essencial.",
    });
  }

  if (route === "Ambos") {
    msgs.push({
      severity: "danger",
      title: "Toxicidade hepática composta",
      text: "Combinar compostos orais e injetáveis potencializa o estresse hepático de forma aditiva. Os 17-alfa alquilados orais já sobrecarregam o fígado individualmente — associados a injetáveis que passam pelo mesmo ciclo metabólico, o risco de lesão hepática grave é consideravelmente elevado.",
    });
  }

  if (stacking) {
    msgs.push({
      severity: "danger",
      title: "Polifarmácia — múltiplos compostos",
      text: "O uso simultâneo de mais de um anabolizante (stacking) potencializa a supressão do eixo HPT, aumenta o risco cardiovascular com queda de HDL e elevação de LDL, e dificulta identificar qual composto está causando efeitos adversos. A recuperação hormonal pós-ciclo é significativamente mais lenta.",
    });
  }

  if (months >= 24) {
    msgs.push({
      severity: "warning",
      title: "Risco de dependência hormonal (TRT)",
      text: "Após 2 anos ou mais de uso contínuo, a recuperação natural do eixo HPT pode nunca ser completa. Muitos usuários de longo prazo desenvolvem dependência de Terapia de Reposição Hormonal (TRT) permanente, pois o organismo perde a capacidade de produzir testosterona endógena.",
    });
  }

  if (months >= 12 && (route === "Oral" || route === "Ambos")) {
    msgs.push({
      severity: "warning",
      title: "Lesão hepática cumulativa",
      text: "Mais de 12 meses de uso de compostos orais aumenta significativamente o risco de lesão hepática cumulativa. A fibrose e alterações histológicas no tecido hepático podem não apresentar sintomas evidentes até estágios avançados da doença.",
    });
  }

  if (frequency !== "Ocasional" && months >= 6) {
    msgs.push({
      severity: "info",
      title: "Risco cardiovascular",
      text: "O uso regular de anabolizantes causa dislipidemia (queda do HDL e elevação do LDL), hipertrofia ventricular esquerda e aumento da pressão arterial. Esses fatores combinados elevam o risco de infarto e AVC mesmo em pessoas jovens e aparentemente saudáveis.",
    });
  }

  if (score >= 80) {
    msgs.push({
      severity: "danger",
      title: "Perfil de risco crítico — busque ajuda",
      text: "A combinação de fatores inseridos representa um perfil de risco muito elevado. Danos cardiovasculares, hepáticos e hormonais nesse contexto costumam ser permanentes. Se você está nessa situação, buscar acompanhamento médico especializado com endocrinologista ou cardiologista é urgente.",
    });
  }

  return msgs;
}

function formatDuration(months) {
  if (months < 12) return `${months} ${months === 1 ? "mês" : "meses"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} ${years === 1 ? "ano" : "anos"}`;
  return `${years}a ${rem}m`;
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="d-flex gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`btn flex-fill fw-medium ${
            value === opt ? "option-btn" : "btn-outline-secondary"
          }`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MessageCard({ severity, title, text }) {
  return (
    <div className={`sim-msg sim-msg--${severity} mb-2`}>
      <div className="d-flex align-items-center gap-2 mb-1">
        <span className={`sim-msg__dot sim-msg__dot--${severity}`} />
        <strong className={`sim-msg__title sim-msg__title--${severity}`}>
          {title}
        </strong>
      </div>
      <p className="sim-msg__text mb-0">{text}</p>
    </div>
  );
}

export default function Simulador() {
 
  const [age, setAge] = useState(25);
  const [sex, setSex] = useState("Masculino");
  const [frequency, setFrequency] = useState("Ocasional");
  const [duration, setDuration] = useState(6);
  const [route, setRoute] = useState("Injetável");
  const [stacking, setStacking] = useState(false);


  const [result, setResult] = useState(null); 
  const [messages, setMessages] = useState([]); 

  function handleCalculate() {
    const params = {
      age,
      sex,
      frequency,
      months: duration,
      route,
      stacking,
    };

    const score = calculateRiskScore(params);

    const msgs = getContextualMessages({
      ...params,
      score,
    });

    setResult(score);
    setMessages(msgs);
  }

  const profile = result !== null ? getRiskProfile(result) : null;

  return (
    <section id="simulador" className="sim-wrapper sim-page-spacing" data-bs-theme="dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            {/* Cabeçalho */}
            <h2 className="text-center text-white fw-bold mb-2">
              Simulador de Risco
            </h2>
            <p className="text-center text-secondary small mb-4">
              Estime seu perfil de risco com base no seu histórico de uso.
            </p>

            {/* Card do formulário */}
            <div className="sim-card p-4">
              {/* Idade */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-1">
                  Idade: <strong className="text-white">{age}</strong>
                </label>
                <input
                  type="range"
                  className="form-range sim-range"
                  min={15}
                  max={60}
                  step={1}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between sim-ticks">
                  <span>15</span>
                  <span>60</span>
                </div>
              </div>

              {/* Sexo biológico */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Sexo biológico
                </label>
                <ToggleGroup
                  options={["Masculino", "Feminino"]}
                  value={sex}
                  onChange={setSex}
                />
              </div>

              {/* Frequência de uso */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Frequência de uso
                </label>
                <ToggleGroup
                  options={["Ocasional", "Frequente", "Intenso"]}
                  value={frequency}
                  onChange={setFrequency}
                />
              </div>

              {/* Duração */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-1">
                  Duração:{" "}
                  <strong className="text-white">
                    {formatDuration(duration)}
                  </strong>
                </label>
                <input
                  type="range"
                  className="form-range sim-range"
                  min={1}
                  max={60}
                  step={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between sim-ticks">
                  <span>1 mês</span>
                  <span>5 anos</span>
                </div>
              </div>

              {/* Via de administração */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Via de administração
                </label>
                <ToggleGroup
                  options={["Injetável", "Oral", "Ambos"]}
                  value={route}
                  onChange={setRoute}
                />
              </div>

              {/* Usa mais de um composto */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-2">
                  Usa mais de um composto?
                </label>
                <ToggleGroup
                  options={["Não", "Sim"]}
                  value={stacking ? "Sim" : "Não"}
                  onChange={(v) => setStacking(v === "Sim")}
                />
              </div>

              {/* Botão de cálculo */}
              <button
                className="btn option-btn w-100 py-2 fw-semibold"
                onClick={handleCalculate}
              >
                Calcular Risco
              </button>

              {/* Bloco de resultado — só aparece após o cálculo */}
              {result !== null && profile && (
                <div className="mt-4">
                  {/* Score */}
                  <div
                    className="sim-result text-center p-4 rounded-3 mb-3"
                    style={{
                      border: `1px solid ${profile.hex}44`,
                      background: `${profile.hex}11`,
                    }}
                  >
                    <div className="sim-score" style={{ color: profile.hex }}>
                      {result}%
                    </div>
                    <div
                      className="fw-semibold mt-1"
                      style={{ color: profile.hex }}
                    >
                      Risco {profile.label}
                    </div>
                    <div className="progress sim-progress mt-3">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${result}%`, background: profile.hex }}
                        aria-valuenow={result}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small className="text-muted d-block mt-2">
                      Score calculado com base em todos os fatores clínicos
                      combinados
                    </small>
                  </div>

                  {/* Mensagens contextuais */}
                  {messages.length > 0 && (
                    <>
                      <p className="sim-msg-header">
                        {messages.length} fator{messages.length > 1 ? "es" : ""}{" "}
                        de risco identificado{messages.length > 1 ? "s" : ""}
                      </p>
                      {messages.map((msg, i) => (
                        <MessageCard key={i} {...msg} />
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
            {/* /sim-card */}
          </div>
        </div>
      </div>
    </section>
  );
}
