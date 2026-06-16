import { Outlet } from 'react-router-dom'
import SidebarAtleta from '../components/SidebarAtleta'
import '../style/atletaLayout.css'

export default function AtletaLayout() {
    return (
        <div className="atleta-layout">
            <SidebarAtleta />
            <div className="atleta-layout-main">
                <Outlet />
            </div>
        </div>
    )
}