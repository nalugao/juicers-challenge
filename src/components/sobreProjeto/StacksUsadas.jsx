

function StacksUsadas() {
  return (
    <section className="stacks-section">

      <div className="container">

        <h2 className="section-title text-center mb-5 fw-bold">
          Tecnologias Utilizadas
        </h2>

        <p className="tech-description">
          Tecnologias modernas utilizadas no desenvolvimento
          da plataforma e aplicadas ao longo do curso.
        </p>

        <div className="tech-grid">

          <div className="tech-badge">React</div>
          <div className="tech-badge">Bootstrap</div>
          <div className="tech-badge">CSS</div>
          <div className="tech-badge">JavaScript</div>
          <div className="tech-badge">Recharts (biblioteca JS)</div>
          <div className="tech-badge">LocalStorage</div>

        </div>

      </div>

    </section>
  );
}

export default StacksUsadas;