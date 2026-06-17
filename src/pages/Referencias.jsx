import { useMemo, useState } from "react";
import referencias from "../data/referencias";
import "../style/referencias.css";

const filtros = [
  "Todos",
  "Esteroides",
  "Cardiovascular",
  "Fígado",
  "Hormonal",
  "Saúde mental",
  "Saúde pública"
];

export default function Referencias() {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const referenciasFiltradas = useMemo(() => {
    return referencias.filter((ref) => {
      const textoBusca = busca.toLowerCase().trim();

      const combinaBusca =
        ref.titulo.toLowerCase().includes(textoBusca) ||
        ref.categoria.toLowerCase().includes(textoBusca) ||
        ref.fonte.toLowerCase().includes(textoBusca) ||
        ref.descricao.toLowerCase().includes(textoBusca);

      const combinaFiltro =
        filtroAtivo === "Todos" || ref.categoria === filtroAtivo;

      return combinaBusca && combinaFiltro;
    });
  }, [busca, filtroAtivo]);

  return (
    <main className="referencias-page">
      <section className="referencias-hero">
        <span className="ref-kicker">BASE CIENTÍFICA • JUICERS</span>

        <h1>
          Referências que sustentam o projeto.
        </h1>

        <p>
          Fontes institucionais e científicas usadas para orientar os conteúdos
          sobre riscos, acompanhamento de exames, redução de danos e sinais de
          alerta relacionados ao uso de esteroides anabolizantes.
        </p>

        <div className="ref-controls">
          <label className="search-bar">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Buscar por tema, fonte ou palavra-chave..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </label>

          <div className="filters" aria-label="Filtros de referências">
            {filtros.map((filtro) => (
              <button
                key={filtro}
                type="button"
                className={`filter ${filtroAtivo === filtro ? "active" : ""}`}
                onClick={() => setFiltroAtivo(filtro)}
              >
                {filtro}
              </button>
            ))}
          </div>

          <p className="ref-count">
            <b>{referenciasFiltradas.length}</b>{" "}
            {referenciasFiltradas.length === 1
              ? "referência encontrada"
              : "referências encontradas"}
          </p>
        </div>
      </section>

      <section className="ref-grid-3">
        {referenciasFiltradas.length > 0 ? (
          referenciasFiltradas.map((ref) => (
            <article className="ref-card" key={ref.id}>
              <div className="ref-card__top">
                <span className="ref-card__category">{ref.categoria}</span>
                <span className="ref-card__year">{ref.ano}</span>
              </div>

              <h2>{ref.titulo}</h2>

              <p>{ref.descricao}</p>

              <div className="ref-card__footer">
                <span>{ref.fonte}</span>

                <a href={ref.link} target="_blank" rel="noreferrer">
                  Acessar →
                </a>
              </div>
            </article>
          ))
        ) : (
          <p className="no-results">
            Nenhuma referência encontrada para essa busca.
          </p>
        )}
      </section>
    </main>
  );
}