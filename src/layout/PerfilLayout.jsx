import { Outlet } from 'react-router-dom'
import SidebarAtleta from '../components/SidebarAtleta'
import '../style/perfilLayout.css'

export default function PerfilLayout() {
    return (
        <div className="perfil-layout">
            <SidebarAtleta />
            <div className="perfil-layout-main">
                <Outlet />
            </div>
        </div>
    )
}