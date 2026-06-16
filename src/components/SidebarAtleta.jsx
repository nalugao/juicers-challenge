import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logoIcon from '../assets/juicers.png'
import '../style/sidebarAtleta.css'

const NAV_ITEMS = [
    {
        to: '/perfil',
        end: true,
        label: 'Dashboard',
        icon: (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <rect x="10" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <rect x="1" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
        ),
    },
    {
        to: '/perfil/historico-exames',
        end: false,
        label: 'Histórico de Exames',
        icon: (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <rect x="3" y="1.5" width="11" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <line x1="6" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="6" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="6" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        to: '/perfil/dados-da-conta',
        end: false,
        label: 'Dados da Conta',
        icon: (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="8.5" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2 15.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
]

export default function SidebarAtleta() {
    const [open, setOpen] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleSair = () => { logout(); navigate('/login') }

    return (
        <>
            <button className="sa-hamburger" onClick={() => setOpen(v => !v)} aria-label="Menu">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {open
                        ? <path d="M4 4l12 12M16 4L4 16" />
                        : <path d="M3 5h14M3 10h14M3 15h14" />}
                </svg>
            </button>

            {open && <div className="sa-overlay" onClick={() => setOpen(false)} />}

            <aside className={`sa-sidebar${open ? ' sa-sidebar--open' : ''}`}>
                <div className="sa-logo">
                    <img src={logoIcon} alt="Juicers" className="sa-logo-img" />
                </div>

                <nav className="sa-nav">
                    {NAV_ITEMS.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => `sa-link${isActive ? ' sa-link--active' : ''}`}
                            onClick={() => setOpen(false)}
                        >
                            <span className="sa-link-icon">{item.icon}</span>
                            <span className="sa-link-label">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sa-footer">
                    <button className="sa-sair" onClick={handleSair}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path d="M7 1.5H3a1.5 1.5 0 00-1.5 1.5v11A1.5 1.5 0 003 15.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            <path d="M10 5L13.5 8.5 10 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="13" y1="8.5" x2="6" y2="8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        Sair
                    </button>
                </div>
            </aside>
        </>
    )
}