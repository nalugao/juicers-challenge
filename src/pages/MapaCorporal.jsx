<<<<<<<< HEAD:src/components/home/mapaCorporal/MapaCorporal.jsx
import HumanBody from "../HumanBody"
import TituloSubtitulo from "../../TituloSubtitulo"
import './MapaCorporal.css'
========
import HumanBody from "../components/HumanBody"
import TituloSubtitulo from "../components/TituloSubtitulo"
import '../style/MapaCorporal.css'
>>>>>>>> feature/novas-paginas:src/pages/MapaCorporal.jsx

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