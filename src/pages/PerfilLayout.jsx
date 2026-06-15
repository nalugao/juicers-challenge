import { Outlet } from 'react-router-dom'
import SidebarPerfil from '../components/Sidebar'
import '../style/perfilLayout.css'

export default function PerfilLayout() {
    return (
        <div className="perfil-layout">
            <SidebarPerfil />
            <div className="perfil-layout-main">
                <Outlet />
            </div>
        </div>
    )
}