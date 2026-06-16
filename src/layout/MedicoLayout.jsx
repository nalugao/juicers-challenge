import { Outlet } from 'react-router-dom'
import SidebarMedico from '../components/SidebarMedico'
import '../style/medicoLayout.css'

export default function MedicoLayout() {
    return (
        <div className="medico-layout">
            <SidebarMedico />
            <div className="medico-layout-main">
                <Outlet />
            </div>
        </div>
    )
}