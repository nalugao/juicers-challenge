import Time from "../components/sobreProjeto/Time"
import StacksUsadas from "../components/sobreProjeto/StacksUsadas"

import "../style/sobre.css";
import "../style/cardMembros.css";
import TituloSubtitulo from "../components/TituloSubtitulo";

export default function Equipe() {
    return (
        <div id="sobre-pagina" className="sobre-pagina">

            <br />
            <br />

            <TituloSubtitulo
                titulo="Sobre o projeto"
                subtitulo="O Juicer foi desenvolvido com o objetivo de conscientizar sobre os impactos do uso de esteroides anabolizantes através de visualizações interativas, dados científicos e análise de riscos à saúde."
                variante="escuro"
            />
            <Time />
            

        </div>
    );
}

