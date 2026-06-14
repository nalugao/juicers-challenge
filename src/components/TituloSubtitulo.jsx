import "../style/tituloSubtitulo.css";

export default function TituloSubtitulo({ titulo, subtitulo, variante = "escuro" }) {
    return (
        <div className={`titulo_bloco titulo_bloco--${variante}`}>
            <div className="titulo_linha" />
            <h2 className="h2_titulo">{titulo}</h2>
            <p className="p_subtitulo">{subtitulo}</p>
        </div>
    );
}