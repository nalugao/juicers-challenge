import Inicio from '../components/inicio/Inicio'
import Painel from '../components/painel/Painel'
import MapaCorporal from '../components/mapaCorporal/MapaCorporal'
import Simulador from '../components/simulador/Simulador'
import Sobre from '../pages/Sobre'

export default function Home() {
    return (
        <>
            <Inicio />
            <Painel />
            <MapaCorporal />
            <Simulador />
            <Sobre />
        </>
    )
}