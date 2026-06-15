import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logoIcon from '../assets/juicers.png'
import '../style/sidebar.css'

const NAV_ITEMS = [
    {
        to: '/perfil',
        end: true,
        label: 'Dashboard',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
        ),
    },
    {
        to: '/perfil/dados-da-conta',
        end: false,
        label: 'Dados da Conta',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="5.5" r="3" />
                <path d="M2 14.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
            </svg>
        ),
    },
    {
        to: '/perfil/historico-exames',
        end: false,
        label: 'Histórico de Exames',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
                <path d="M6 6h4M6 8.5h4M6 11h2" />
            </svg>
        ),
    },
]

export default function SidebarPerfil() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleSair = () => navigate('/home')

    return (
        <>
            {/* Botão hambúrguer — só mobile */}
            <button
                className="sidebar-hamburger"
                onClick={() => setOpen(v => !v)}
                aria-label="Abrir menu"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {open
                        ? <path d="M4 4l12 12M16 4L4 16" />
                        : <path d="M3 5h14M3 10h14M3 15h14" />
                    }
                </svg>
            </button>

            {/* Overlay — só mobile quando aberto */}
            {open && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>

                <div className="sidebar-logo">
                    <img src={logoIcon} alt="Juicers" className="sidebar-logo-img" />
                </div>

                <nav className="sidebar-nav">
                    {NAV_ITEMS.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
                            }
                            onClick={() => setOpen(false)}
                        >
                            <span className="sidebar-link-icon">{item.icon}</span>
                            <span className="sidebar-link-label">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-sair" onClick={handleSair}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" />
                            <path d="M10 11l3-3-3-3M13 8H6" />
                        </svg>
                        Sair
                    </button>
                </div>

            </aside>
        </>
    )
}