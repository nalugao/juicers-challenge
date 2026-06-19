import { useTranslation } from "../../context/LanguageContext";
import "../../style/EntendaProjeto.css";

const T = {
  pt: {
    eyebrow: "Conheça o projeto",
    h2: "Entenda mais sobre nosso projeto.",
    p: "Um vídeo rápido explicando por que a Juicers existe e como ela ajuda no seu acompanhamento de saúde.",
    placeholder: "Vídeo em breve",
  },
  en: {
    eyebrow: "Get to know the project",
    h2: "Learn more about our project.",
    p: "A quick video explaining why Juicers exists and how it helps with your health tracking.",
    placeholder: "Video coming soon",
  },
};

export default function EntendaProjeto() {
  const t = useTranslation(T, "EntendaProjeto.T");

  return (
    <section id="entenda" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.h2}</h2>
          <p>{t.p}</p>
        </div>
        <div className="video-frame reveal">
          {/* Trocar pelo embed do YouTube quando o vídeo for publicado: <iframe src="https://www.youtube.com/embed/VIDEO_ID" ... /> */}
          <div className="video-placeholder">
            <svg className="play-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none" />
            </svg>
            <span>{t.placeholder}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
