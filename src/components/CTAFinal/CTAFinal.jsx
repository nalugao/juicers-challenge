import { Link } from "react-router-dom";
import { useTranslation } from "../../context/LanguageContext";
import "../../style/cta.css";

const T = {
  pt: {
    h2: "Ajude a validar a próxima versão da Juicers.",
    p: "Teste o protótipo, registre um exame de exemplo e nos diga o que faria você acompanhar de verdade.",
    primary: "Testar o protótipo",
    ghost: "Enviar feedback",
    note: "leva ~2 min",
  },
  en: {
    h2: "Help validate the next version of Juicers.",
    p: "Try the prototype, log a sample exam and tell us what would make you actually keep track.",
    primary: "Try the prototype",
    ghost: "Send feedback",
    note: "takes ~2 min",
  },
};

export default function CTAFinal() {
  const t = useTranslation(T, "CTAFinal.T");

  return (
    <section className="cta" id="feedback">
      <div className="wrap">
        <div className="cta-card reveal">
          <div className="cta-inner">
            <div>
              <h2>{t.h2}</h2>
              <p>{t.p}</p>
            </div>
            <div className="cta-actions">
              <Link className="btn-j btn-primary-j" to="/login">{t.primary}</Link>
              <a className="btn-j btn-ghost-j" href="https://forms.gle/Px1jDZzcVkgYH9zD9" target="_blank" rel="noopener noreferrer">{t.ghost}</a>
              <span className="note">{t.note}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
