import TituloSubtitulo from "../../TituloSubtitulo";
import "./painel.css";
import Navbar from "../../Navbar";

/* ---------------------------------------------------
   CardInfo: substitui CardGraphPainel nesta seção.
   Recebe: titulo, descricao, fonteNome, link
--------------------------------------------------- */
function CardInfo({ titulo, descricao, fonteNome, link }) {
  return (
    <div className="card_info">
      {titulo && <p className="card_info__titulo">{titulo}</p>}
      <p className="card_info__descricao">{descricao}</p>
      {fonteNome && link && (
        <a
          className="card_info__fonte"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fonte: {fonteNome} ↗
        </a>
      )}
    </div>
  );
}

export default function Painel() {
  const painelData = {
    titulo: "Números que não mentem",
    subtitulo:
      "Explore as evidências científicas sobre o impacto do uso de anabolizantes — dos riscos cardíacos à dependência psicológica.",
    variante: "claro",
  };

  const novosCardsInformacao = [

  ];

  const cardsGraph = [
    {
      titulo: "Saúde sexual ineficaz",
      descricao:
        "O uso de anabolizantes pode “desligar” a produção natural de testosterona, causando infertilidade, impotência sexual e atrofia testicular.",
      fonteNome: "Sociedade Brasileira de Urologia",
      link: "https://portaldaurologia.org.br/sua-saude/dicas/riscos-urologicos-do-uso-de-anabolizantes",
    },
    {
      titulo: "Ruptura muscular",
      descricao:
        "Risco de ruptura dos tendões chega a ser 9x maior pq os tendões que os prende às articulações não os acompanha a hipertrofia dos músculos",
      fonteNome: "Sociedade Brasileira de Endocrinologia e Metabologia",
      link: "https://s3.endocrino.org.br/bomba-to-fora-e-book-SBEM.pdf",
    },
    {
      titulo: "Perigo para o coração",
      descricao:
        "Infarto: Usuários têm 3× mais risco de sofrer um ataque cardíaco.\nCardiomiopatia: O risco de desenvolver danos graves na musculatura do coração é quase 9× maior.",
      fonteNome: "Associação Americana do Coração, revista Circulation",
      link: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.124.071117",
    },
    {
      titulo: "Um Problema em crescimento",
      descricao:
        "Estima-se que 3,3% da população geral faça uso dessas substâncias (6,4% dos homens e 1,6% das mulheres).\nO uso chega a 13,4% entre atletas e a impressionantes 18,4% entre praticantes de atividade física.",
      fonteNome: "Sociedade Brasileira de Endocrinologia e Metabologia",
      link: "https://www.endocrino.org.br/wp-content/uploads/2022/09/Posicionamento-da-SBEM-Anabolizantes.docx.pdf",
    },
    {
      titulo: "Comportamento de risco",
      descricao:
        "O uso de esteroides está fortemente associado ao abuso de outras substâncias. Quem consome anabolizantes tem uma frequência muito maior de dependência de álcool, nicotina e cocaína.",
      fonteNome: "Sociedade Brasileira de Endocrinologia e Metabologia",
      link: "https://www.endocrino.org.br/wp-content/uploads/2022/09/Posicionamento-da-SBEM-Anabolizantes.docx.pdf",
    },
    {
      titulo: "Efeitos irreversíveis em mulheres",
      descricao:
        "Marcas da masculinização podem ser permanentes: engrossamento definitivo da voz, hipertrofia do clitóris e crescimento de pelos faciais.\nAumento da resistência à insulina e risco de ruptura dos tendões chega a ser 9× maior.",
      fonteNome: "Scielo, 2014",
      link: "https://www.scielo.br/j/refuem/a/Yp3sBLmsrV7phpZMtsbmCpj/?format=html&lang=pt"
    },
  ];

  return (
    <section id="painel" className="painel_page">
      <TituloSubtitulo
        titulo={painelData.titulo}
        subtitulo={painelData.subtitulo}
        variante={painelData.variante}
      />

      <div className="secao_midia_dados">

        <div className="video_container_painel">
          <iframe
            src="https://www.youtube.com/embed/qcFVGOuTeR0"
            title="Vídeo Informativo sobre Anabolizantes"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Cards com scroll */}
        <div className="scroll_cards_painel">
          {novosCardsInformacao.map((card, i) => (
            <CardInfo key={i} titulo={card.titulo} descricao={card.descricao} />
          ))}
          {cardsGraph.map((card, i) => (
            <CardInfo
              key={i + novosCardsInformacao.length}
              titulo={card.titulo}
              descricao={card.descricao}
              fonteNome={card.fonteNome}
              link={card.link}
            />
          ))}
        </div>

      </div>
    </section>
  );
}