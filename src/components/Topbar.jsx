import { Link } from 'react-router-dom'
import "../style/navbar.css"
import logoIcon from '../assets/logo-nome.png'
import logoExit from '../assets/exit.png'

export default function Topbar() {

    return (
        <div className="topbar">
            <div className="logo">
                <img src={logoIcon} alt="Logo" className="logo-icon" />
            </div>

            <div className="nav-right">
                <Link className="topbar-exit-link" to="/#">
                    <span>Sair</span>
                    <img className="exit-icon" src={logoExit} alt="Sair" className="exit-icon" />
                </Link>
            </div>
        </div>
    )
}