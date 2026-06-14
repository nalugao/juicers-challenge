import HumanBody from "../HumanBody"
import TituloSubtitulo from "../TituloSubtitulo"
import './mapa_corporal.css'

export default function MapaCorporal() {
    return (
        <section id="mapa-corporal" className="mapa_corporal_page">
            <TituloSubtitulo
                titulo="Impacto no Seu Corpo"
                subtitulo="Clique em cada órgão para saber como os esteroides anabolizantes o afetam."
                variante="escuro"
            />
            <HumanBody />
        </section>
    )
}