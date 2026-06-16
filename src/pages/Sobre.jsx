import "../style/sobre.css";
import "../style/cardMembros.css";
import "../style/stacksUsadas.css"
import TituloSubtitulo from "../components/TituloSubtitulo";

export default function Sobre() {
    return (
        <div id="sobre-pagina" className="sobre-pagina">
            <TituloSubtitulo
                titulo="Sobre o projeto"
                subtitulo="O Juicers foi desenvolvido com o objetivo de conscientizar sobre os impactos do uso de esteroides anabolizantes através de visualizações interativas, dados científicos e análise de riscos à saúde."
                variante="escuro"
            />
        </div>
    );
}
