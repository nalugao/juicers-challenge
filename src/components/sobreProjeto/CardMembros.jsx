function CardMembros({ membro }) {
  return (
    <div className="card-membro h-100">

      <div className="text-center">

        <div className="membro-img-wrapper">

          <img
            src={membro.img}
            alt={membro.nome}
            className="membro-img"
          />

        </div>

        <h3>{membro.nome}</h3>

        <span className="membro-descricao">
          {membro.titulo}
        </span>

        <p className="descricao-limitada">
          {membro.descricao}
        </p>

      </div>

    </div>
  );
}

export default CardMembros;