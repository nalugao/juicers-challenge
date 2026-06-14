import './inicio.css'
import { Link } from 'react-router-dom'
import fisioImg from '../../assets/fisio2_home_edited.png'

export default function Inicio() {
    return (
        <section className='home_page'>


            <div className='apresentacao'>
                <h1>
                    Você sabe o que está acontecendo{' '}
                    <em>com seu corpo?</em>
                </h1>

                <p className='sub'>
                    Visualize dados interativos e simule seu nível de risco pessoal.
                </p>

                <p>Aqui você <span style={{ fontWeight: 'bold', color: '#E24B4A' }}>acompanha</span> seus exames, <span style={{ fontWeight: 'bold', color: '#E24B4A' }}>identifica</span> riscos reais e <span style={{ fontWeight: 'bold', color: '#E24B4A' }}>entende como os anabolizantes impactam seu corpo</span>, antes que esses sinais evoluam.</p>

                <div className='btn_container'>
                    <Link className='btn_login' to={'/login'}>Entrar</Link>
                    <button
                        className='btn_dados'
                        onClick={() => document.getElementById('painel').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Explorar dados ▼
                    </button>
                </div>
            </div>

            <div className='image_container'>
                <img src={fisioImg} alt="homem e anabolizantes" />
            </div>

        </section>
    )
}