import { useState, useEffect } from 'react'
import '../style/navbar.css'
import { Link } from 'react-router-dom'
import logoIcon from '../assets/logo-nome.png'

const LEFT_LINKS = [
    { label: 'Início',           href: '#inicio'        },
    { label: 'Solução',          href: '#sol'           },
    { label: 'O que acompanhar', href: '#monitorar'     },
    { label: 'Impacto',          to: "/mapa-corporal" },
    { label: 'Simulador',        to: "/simulador"     },
]

const RIGHT_LINKS = [
    { label: 'Para quem é',   href: '#pub'      },
    { label: 'Transparência', href: '#naofaz'   },
    { label: 'Sobre',         href: '#sobre'    },
    { label: 'Feedback',      href: '#feedback' },
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

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <ul className="menu_list menu_left">
                    {LEFT_LINKS.map(l => (
                        <li key={l.href}><a href={l.href}>{l.label}</a></li>
                    ))}
                </ul>

                <a className="navbar-brand" href="/">
                    <img src={logoIcon} alt="Juicers" className="logo-icon" />
                    <span className="brand-name">Juicers</span>
                </a>

                <div className="nav-end">
                    <ul className="menu_list menu_right">
                        {RIGHT_LINKS.map(l => (
                            <li key={l.href}><a href={l.href}>{l.label}</a></li>
                        ))}
                        <li><Link className="btn-login" to="/login">Entrar</Link></li>
                    </ul>
                    <div
                        className={`hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span /><span /><span />
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu${menuOpen ? ' open' : ''}${scrolled ? ' scrolled' : ''}`}>
                {[...LEFT_LINKS, ...RIGHT_LINKS].map(l => (
                    <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
                ))}
                <Link className="btn-login" to="/login" onClick={close}>Entrar</Link>
            </div>
        </>
    )
}
