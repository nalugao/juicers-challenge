import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import '../style/atletaLayout.css'

export default function AtletaLayout() {
    return (
        <div className="atleta-layout">
            <Sidebar variant="atleta" />
            <div className="atleta-layout-main">
                <Outlet />
            </div>
        </div>
    )
}