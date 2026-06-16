import { useState } from 'react'
import '../style/login.css'
import { Link, useNavigate } from 'react-router-dom'
import logoIcon from '../assets/juicers.png'
import OnboardingForm from '../components/OnboardingForm'
import { loginUser, registerUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const navigate = useNavigate()
    const { loginComToken, loginMock } = useAuth()

    const [role, setRole] = useState('atleta')
    const [modoCadastro, setModoCadastro] = useState(false)
    const [mostrarOnboarding, setMostrarOnboarding] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [erroLogin, setErroLogin] = useState(false)

    const [nomeCadastro, setNomeCadastro] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const destinoMock = role === 'medico' ? '/medico' : '/perfil'

    function limparCampos() {
        setNomeCadastro('')
        setEmail('')
        setSenha('')
        setConfirmarSenha('')
        setErroLogin(false)
    }

    function abrirCadastro() {
        limparCampos()
        setModoCadastro(true)
        setMostrarOnboarding(false)
    }

    function abrirLogin() {
        limparCampos()
        setModoCadastro(false)
        setMostrarOnboarding(false)
    }

    async function backendOnline() {
        try {
            const res = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: '__ping__', password: '__ping__' }),
                signal: AbortSignal.timeout(2000),
            })

            return res.status !== 0
        } catch {
            return false
        }
    }

    function getRoleApi() {
        return role === 'medico' ? 'doctor' : 'patient'
    }

    function getRoleFront(userRole) {
        return userRole === 'doctor' ? 'medico' : 'atleta'
    }

    function redirecionarPorTipo(user) {
        if (user.role === 'doctor') {
            navigate('/medico')
            return
        }

        navigate('/perfil')
    }

    async function fazerCadastro() {
        if (!nomeCadastro || !email || !senha || !confirmarSenha) {
            alert('Preencha todos os campos.')
            return
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não são iguais.')
            return
        }

        setCarregando(true)
        setErroLogin(false)

        const online = await backendOnline()

        if (!online) {
            const fakeUser = {
                id: Date.now(),
                name: nomeCadastro,
                email,
                role: getRoleApi(),
            }

            const fakeToken = `mock-token-${Date.now()}`

            loginComToken(fakeToken, fakeUser, role)
            setCarregando(false)

            if (fakeUser.role === 'doctor') {
                navigate('/medico')
                return
            }

            setMostrarOnboarding(true)
            setModoCadastro(false)
            return
        }

        try {
            await registerUser({
                name: nomeCadastro,
                email,
                password: senha,
                role: getRoleApi(),
            })

            const loginResponse = await loginUser({
                email,
                password: senha,
            })

            loginComToken(
                loginResponse.token,
                loginResponse.user,
                getRoleFront(loginResponse.user.role)
            )

            if (loginResponse.user.role === 'doctor') {
                navigate('/medico')
                return
            }

            setMostrarOnboarding(true)
            setModoCadastro(false)
        } catch (error) {
            alert(error.message)
        } finally {
            setCarregando(false)
        }
    }

    async function fazerLogin() {
        if (!email || !senha) {
            alert('Preencha o e-mail e a senha.')
            return
        }

        setCarregando(true)
        setErroLogin(false)

        const online = await backendOnline()

        if (!online) {
            const resultado = loginMock(email, senha, role)
            setCarregando(false)

            if (resultado.ok) {
                navigate(destinoMock)
            } else {
                setErroLogin(true)
            }

            return
        }

        try {
            const data = await loginUser({
                email,
                password: senha,
            })

            loginComToken(
                data.token,
                data.user,
                getRoleFront(data.user.role)
            )

            redirecionarPorTipo(data.user)
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
                    <div className="login_role_toggle">
                        <button
                            type="button"
                            className={`login_role_btn${role === 'atleta' ? ' login_role_btn--active login_role_btn--atleta' : ''}`}
                            onClick={() => {
                                setRole('atleta')
                                setErroLogin(false)
                            }}
                        >
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M8 2C6 2 5 3.5 5 5C5 7 6.5 8.5 8 8.5C9.5 8.5 11 7 11 5C11 3.5 10 2 8 2Z" />
                                <path d="M3 15C3 11.5 5.5 9.5 8 9.5C10.5 9.5 13 11.5 13 15" />
                            </svg>
                            Atleta
                        </button>

                        <button
                            type="button"
                            className={`login_role_btn${role === 'medico' ? ' login_role_btn--active login_role_btn--medico' : ''}`}
                            onClick={() => {
                                setRole('medico')
                                setErroLogin(false)
                            }}
                        >
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <rect x="2" y="2" width="12" height="12" rx="2" />
                                <path d="M8 5.5V10.5M5.5 8H10.5" />
                            </svg>
                            Médico
                        </button>
                    </div>

                    {erroLogin && (
                        <div className="login_offline_banner">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 5v4M8 11v.5" strokeLinecap="round" />
                            </svg>

                            Credenciais não encontradas. Use as contas de teste:

                            <span className="login_offline_hint">
                                atleta@juicers.com · medico@juicers.com · senha: 123456
                            </span>
                        </div>
                    )}

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
                                    onChange={e => {
                                        setEmail(e.target.value)
                                        setErroLogin(false)
                                    }}
                                />
                            </div>

                            <div className="field">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={e => {
                                        setSenha(e.target.value)
                                        setErroLogin(false)
                                    }}
                                />
                            </div>

                            <a href="#" className="forgot">Esqueci minha senha</a>

                            <button
                                className={`btn_entrar btn_entrar--${role}`}
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
                                {role === 'medico'
                                    ? 'Crie sua conta para gerenciar seus atletas.'
                                    : 'Preencha seus dados para começar.'}
                            </p>

                            <div className="login_selected_role">
                                Tipo de conta:{' '}
                                <strong>
                                    {role === 'medico' ? 'Médico' : 'Atleta'}
                                </strong>
                            </div>

                            <div className="field">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    placeholder="Seu nome"
                                    value={nomeCadastro}
                                    onChange={e => setNomeCadastro(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>Confirmar senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmarSenha}
                                    onChange={e => setConfirmarSenha(e.target.value)}
                                />
                            </div>

                            <button
                                className={`btn_entrar btn_entrar--${role}`}
                                onClick={fazerCadastro}
                                disabled={carregando}
                            >
                                {carregando
                                    ? 'Aguarde...'
                                    : role === 'medico'
                                        ? 'Criar conta e acessar'
                                        : 'Criar conta'}
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