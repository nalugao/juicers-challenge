import { useState, useEffect } from 'react'
import '../style/navbar.css'
import { Link } from 'react-router-dom'
import logoIcon from '../assets/logo-nome.png'

const LEFT_LINKS = [
    { label: 'Início', href: '/#inicio' },
    { label: 'Solução', href: '/#sol' },
    { label: 'O que acompanhar', href: '/#monitorar' },
    { label: 'Impacto', to: '/mapa-corporal' },
    { label: 'Simulador', to: '/simulador' },
]

const RIGHT_LINKS = [
    { label: 'Para quem é', href: '/#pub' },
    { label: 'Transparência', href: '/#naofaz' },
    { label: 'Sobre', href: '/#sobre' },
    { label: 'Feedback', href: '/#feedback' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)

        window.addEventListener('scroll', onScroll, { passive: true })

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const close = () => setMenuOpen(false)

    function renderLink(link) {
        if (link.to) {
            return (
                <Link to={link.to} onClick={close}>
                    {link.label}
                </Link>
            )
        }

        return (
            <a href={link.href} onClick={close}>
                {link.label}
            </a>
        )
    }

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <ul className="menu_list menu_left">
                    {LEFT_LINKS.map((link) => (
                        <li key={link.to || link.href}>
                            {renderLink(link)}
                        </li>
                    ))}
                </ul>

                <Link className="navbar-brand" to="/" onClick={close}>
                    <img src={logoIcon} alt="Juicers" className="logo-icon" />
                    <span className="brand-name">Juicers</span>
                </Link>

                <div className="nav-end">
                    <ul className="menu_list menu_right">
                        {RIGHT_LINKS.map((link) => (
                            <li key={link.to || link.href}>
                                {renderLink(link)}
                            </li>
                        ))}

                        <li>
                            <Link className="btn-login" to="/login" onClick={close}>
                                Entrar
                            </Link>
                        </li>
                    </ul>

                    <div
                        className={`hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu${menuOpen ? ' open' : ''}${scrolled ? ' scrolled' : ''}`}>
                {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
                    <div key={link.to || link.href}>
                        {renderLink(link)}
                    </div>
                ))}

                <Link className="btn-login" to="/login" onClick={close}>
                    Entrar
                </Link>
            </div>
        </>
    )
}