import "../../style/cta.css";

export default function CTAFinal() {
  return (
    <section className="cta" id="feedback">
      <div className="wrap">
        <div className="cta-card reveal">
          <div className="cta-inner">
            <div>
              <h2>Ajude a validar a próxima versão da Juicers.</h2>
              <p>Teste o protótipo, registre um exame de exemplo e nos diga o que faria você acompanhar de verdade.</p>
            </div>
            <div className="cta-actions">
              <a className="btn-j btn-primary-j" href="#">Testar o protótipo</a>
              <a className="btn-j btn-ghost-j" href="#">Enviar feedback</a>
              <span className="note">leva ~2 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
