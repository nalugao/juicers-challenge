import '../style/footer.css'
import logoIcon from '../assets/juicers.png'

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer_top">

                {/* Brand */}
                <div className="footer_brand">
                    <a className="logo" href="/">
                        <img src={logoIcon} alt="Logo" className="logo-icon" />
                    </a>
                    <p className="footer_tagline">
                        A Juicers é uma ferramenta consultiva de apoio para usuários e profissionais. Acompanhe o histórico de exames, visualize a evolução dos indicadores ao longo do tempo, identifique tendências de risco mais cedo e tome decisões mais conscientes com base em dados organizados.
                    </p>

                    {/* Redes sociais */}
                    <div className="footer_sociais">
                        <a
                            className="footer_social_link"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.613.074-3.067.48-4.172 1.585C1.776 2.762 1.37 4.216 1.296 5.829 1.238 7.109 1.224 7.517 1.224 12c0 4.483.014 4.891.072 6.171.074 1.613.48 3.067 1.585 4.172 1.105 1.105 2.559 1.511 4.172 1.585C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.613-.074 3.067-.48 4.172-1.585 1.105-1.105 1.511-2.559 1.585-4.172.058-1.28.072-1.688.072-6.171 0-4.483-.014-4.891-.072-6.171-.074-1.613-.48-3.067-1.585-4.172C19.014.494 17.56.088 15.947.014 14.667-.042 14.259-.056 12-.056h.056zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                            </svg>
                        </a>
                        <a
                            className="footer_social_link"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Navegação */}
                <div className="footer_nav">
                    <p className="footer_nav_titulo">Navegação</p>
                    <ul>
                        <li><a href="/">Menu</a></li>
                        <li><a href="#sobre-pagina">Sobre o Projeto</a></li>
                        <li><a href="/login">Entrar</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="footer_nav">
                    <p className="footer_nav_titulo">Legal</p>
                    <ul>
                        <li><a href="#">Termos de Uso</a></li>
                        <li><a href="#">Privacidade</a></li>
                        <li><a href="#">Fontes</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer_bottom">
                <p>© {new Date().getFullYear()} Juicer. Todos os direitos reservados.</p>
                <p className="footer_disclaimer">
                    Este site é informativo e não substitui orientação médica profissional.
                </p>
            </div>
        </footer>
    )
}