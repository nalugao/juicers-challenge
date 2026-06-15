import { useState } from 'react'
import '../style/login.css'
import { Link, useNavigate } from 'react-router-dom'
import logoIcon from '../assets/juicers.png'
import OnboardingForm from '../components/OnboardingForm'
import { loginUser, registerUser } from '../services/api'

export default function Login() {
    const navigate = useNavigate()

    const [modoCadastro, setModoCadastro] = useState(false)
    const [mostrarOnboarding, setMostrarOnboarding] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const [nomeCadastro, setNomeCadastro] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    function limparCamposLoginCadastro() {
        setNomeCadastro('')
        setEmail('')
        setSenha('')
        setConfirmarSenha('')
    }

    function abrirCadastro() {
        limparCamposLoginCadastro()
        setModoCadastro(true)
        setMostrarOnboarding(false)
    }

    function abrirLogin() {
        limparCamposLoginCadastro()
        setModoCadastro(false)
        setMostrarOnboarding(false)
    }

    async function fazerCadastro() {
        try {
            if (!nomeCadastro || !email || !senha || !confirmarSenha) {
                alert('Preencha todos os campos.')
                return
            }

            if (senha !== confirmarSenha) {
                alert('As senhas não são iguais.')
                return
            }

            setCarregando(true)

            await registerUser({
                name: nomeCadastro,
                email,
                password: senha,
                role: 'patient',
            })

            const loginResponse = await loginUser({
                email,
                password: senha,
            })

            localStorage.setItem('tokenJuicers', loginResponse.token)
            localStorage.setItem('usuarioLogadoJuicers', JSON.stringify(loginResponse.user))

            setMostrarOnboarding(true)
            setModoCadastro(false)
        } catch (error) {
            alert(error.message)
        } finally {
            setCarregando(false)
        }
    }

    async function fazerLogin() {
        try {
            if (!email || !senha) {
                alert('Preencha o e-mail e a senha.')
                return
            }

            setCarregando(true)

            const data = await loginUser({
                email,
                password: senha,
            })

            localStorage.setItem('tokenJuicers', data.token)
            localStorage.setItem('usuarioLogadoJuicers', JSON.stringify(data.user))

            navigate('/perfil')
        } catch (error) {
            alert(error.message)
        } finally {
            setCarregando(false)
        }
    }

    if (mostrarOnboarding) {
        return (
            <OnboardingForm
                nomeCompleto={nomeCadastro}
                emailUsuario={email}
                onBack={() => {
                    setMostrarOnboarding(false)
                    setModoCadastro(true)
                }}
                onFinish={() => navigate('/perfil')}
            />
        )
    }

    return (
        <div className="login_wrap">

            <div className="login_left">
                <a className="logo" href="/">
                    <img src={logoIcon} alt="Logo" className="logo-icon" />
                </a>

                <div className="login_left_middle">
                    <h1 className="login_left_headline">
                        Monitore o impacto<br /><em>no seu corpo.</em>
                    </h1>

                    <p className="login_left_sub">
                        Acompanhe exames, identifique riscos reais e entenda como os anabolizantes afetam sua saúde.
                    </p>
                </div>

                <div className="login_left_stats"></div>
            </div>

            <div className="login_right">
                <div className="login_card">

                    {!modoCadastro ? (
                        <>
                            <p className="login_card_title">Entrar</p>
                            <p className="login_card_sub">
                                Acesse sua conta para visualizar seus dados.
                            </p>

                            <div className="field">
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>

                            <a href="#" className="forgot">Esqueci minha senha</a>

                            <button
                                className="btn_entrar"
                                onClick={fazerLogin}
                                disabled={carregando}
                            >
                                {carregando ? 'Entrando...' : 'Entrar'}
                            </button>

                            <div className="divider"><span>ou</span></div>

                            <Link to="/" className="btn_voltar">
                                ← Voltar para o site
                            </Link>

                            <p className="login_card_footer">
                                Não tem conta?{' '}
                                <button
                                    type="button"
                                    className="link_button"
                                    onClick={abrirCadastro}
                                >
                                    Cadastre-se
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="login_card_title">Criar conta</p>
                            <p className="login_card_sub">
                                Preencha seus dados para começar.
                            </p>

                            <div className="field">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    placeholder="Seu nome"
                                    value={nomeCadastro}
                                    onChange={(e) => setNomeCadastro(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>Confirmar senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                            </div>

                            <button
                                className="btn_entrar"
                                onClick={fazerCadastro}
                                disabled={carregando}
                            >
                                {carregando ? 'Criando conta...' : 'Criar conta'}
                            </button>

                            <div className="divider"><span>ou</span></div>

                            <button
                                type="button"
                                className="btn_voltar"
                                onClick={abrirLogin}
                            >
                                ← Já tenho conta
                            </button>

                            <p className="login_card_footer">
                                Ao cadastrar, você concorda com os <a href="#">Termos de Uso</a>.
                            </p>
                        </>
                    )}

                </div>
            </div>

        </div>
    )
}