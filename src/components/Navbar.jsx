import { useState, useEffect, useRef } from 'react'
import '../style/navbar.css'
import { Link } from 'react-router-dom'
import { useLanguage, useTranslation } from '../context/LanguageContext'
import logoIcon from '../assets/juicers.png'

<<<<<<< HEAD
const LEFT_LINKS = [
    { label: 'Início', href: '/#inicio' },
    { label: 'Solução', href: '/#sol' },
    { label: 'O que acompanhar', href: '/#monitorar' },
    { label: 'Impacto', to: '/mapa-corporal' },
    { label: 'Simulador', to: '/simulador' },
    { label: "Referências", to: "/referencias" }
]

const RIGHT_LINKS = [
    { label: 'Para quem é', href: '/#pub' },
    { label: 'Transparência', href: '/#naofaz' },
    { label: 'Sobre', href: '/#sobre' },
    { label: 'Feedback', href: '/#feedback' },
]
=======
const MENU_LINKS = {
    pt: [
        { label: 'INÍCIO',        href: '#inicio'    },
        { label: 'CONHEÇA',       href: '#entenda'   },
        { label: 'SOBRE',         href: '#sobre'     },
        { label: 'SOLUÇÃO',       href: '#sol'       },
        { label: 'SINAIS',        href: '#monitorar' },
        { label: 'PÚBLICO',       href: '#pub'       },
        { label: 'TRANSPARÊNCIA', href: '#naofaz'    },
    ],
    en: [
        { label: 'HOME',          href: '#inicio'    },
        { label: 'LEARN',         href: '#entenda'   },
        { label: 'ABOUT',         href: '#sobre'     },
        { label: 'SOLUTION',      href: '#sol'       },
        { label: 'SIGNALS',       href: '#monitorar' },
        { label: 'AUDIENCE',      href: '#pub'       },
        { label: 'TRANSPARENCY',  href: '#naofaz'    },
    ],
}

const NAV_LINKS = {
    pt: [
        { label: 'SIMULADOR',  href: null        },
        { label: 'REFERÊNCIA', href: null        },
        { label: 'FEEDBACK',   href: '#feedback' },
    ],
    en: [
        { label: 'SIMULATOR',  href: null        },
        { label: 'REFERENCE',  href: null        },
        { label: 'FEEDBACK',   href: '#feedback' },
    ],
}

const ENTRAR = { pt: 'Entrar', en: 'Sign in' }
>>>>>>> feat/pagina-inicial.att

export default function Navbar() {
    const { lang, setLang } = useLanguage()
    const menuLinks = useTranslation(MENU_LINKS, 'Navbar.MENU_LINKS')
    const navLinks = useTranslation(NAV_LINKS, 'Navbar.NAV_LINKS')
    const entrar = useTranslation(ENTRAR, 'Navbar.ENTRAR')
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)

        window.addEventListener('scroll', onScroll, { passive: true })

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!menuOpen) return
        const onClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [menuOpen])

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
<<<<<<< HEAD
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
=======
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="nav-start">
                <a className="navbar-brand" href="/">
                    <img src={logoIcon} alt="Juicers" className="logo-icon" />
                </a>

                <div className="lang-switch">
                    <svg className="lang-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M3 12h18M12 3c2.4 2.5 3.8 5.6 3.8 9s-1.4 6.5-3.8 9c-2.4-2.5-3.8-5.6-3.8-9s1.4-6.5 3.8-9z" />
                    </svg>
                    <button
                        type="button"
                        className={lang === 'pt' ? 'active' : ''}
                        onClick={() => setLang('pt')}
                    >
                        PT
                    </button>
                    <span className="lang-sep">/</span>
                    <button
                        type="button"
                        className={lang === 'en' ? 'active' : ''}
                        onClick={() => setLang('en')}
                    >
                        EN
                    </button>
                </div>
            </div>

            <div className="nav-end">
                <div className="menu-wrap" ref={menuRef}>
                    <button
                        type="button"
                        className={`menu-btn${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                    >
                        MENU
                        <svg className="menu-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>

                    <div className={`nav-dropdown${menuOpen ? ' open' : ''}`}>
                        {menuLinks.map(l => (
                            <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
                        ))}
>>>>>>> feat/pagina-inicial.att
                    </div>
                </div>

<<<<<<< HEAD
            <div className={`mobile-menu${menuOpen ? ' open' : ''}${scrolled ? ' scrolled' : ''}`}>
                {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
                    <div key={link.to || link.href}>
                        {renderLink(link)}
                    </div>
                ))}

                <Link className="btn-login" to="/login" onClick={close}>
                    Entrar
                </Link>
=======
                {navLinks.map(l => (
                    <a
                        key={l.label}
                        className="nav-link"
                        href={l.href ?? '#'}
                        onClick={l.href ? undefined : (e) => e.preventDefault()}
                    >
                        {l.label}
                    </a>
                ))}

                <Link className="btn-login" to="/login">{entrar}</Link>
>>>>>>> feat/pagina-inicial.att
            </div>
        </nav>
    )
}