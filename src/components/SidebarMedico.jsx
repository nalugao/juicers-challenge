import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logoIcon from '../assets/juicers.png'
import '../style/sidebarMedico.css'

const NAV_ITEMS = [
    {
        to: '/medico',
        end: true,
        label: 'Meus Atletas',
        icon: (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="6" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1.5 15C1.5 11.5 4 10 6 10C8 10 10.5 11.5 10.5 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="12" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M11 10C12.5 10 14.5 11 14.5 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        to: '/medico/dados-da-conta',
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

export default function SidebarMedico() {
    const [open, setOpen] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleSair = () => { logout(); navigate('/login') }

    return (
        <>
            <button className="sm-hamburger" onClick={() => setOpen(v => !v)} aria-label="Menu">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {open
                        ? <path d="M4 4l12 12M16 4L4 16" />
                        : <path d="M3 5h14M3 10h14M3 15h14" />}
                </svg>
            </button>

            {open && <div className="sm-overlay" onClick={() => setOpen(false)} />}

            <aside className={`sm-sidebar${open ? ' sm-sidebar--open' : ''}`}>
                <div className="sm-logo">
                    <img src={logoIcon} alt="Juicers" className="sm-logo-img" />                </div>

                <nav className="sm-nav">
                    {NAV_ITEMS.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => `sm-link${isActive ? ' sm-link--active' : ''}`}
                            onClick={() => setOpen(false)}
                        >
                            <span className="sm-link-icon">{item.icon}</span>
                            <span className="sm-link-label">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sm-footer">
                    <button className="sm-sair" onClick={handleSair}>
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