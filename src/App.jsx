import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import Home from './pages/Home'
import Equipe from './pages/Equipe'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import DadosConta from './components/DadosConta'
import HistoricoExames from './components/HistoricoExames'
import PerfilLayout from './pages/PerfilLayout'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AccessibilityMenu from './components/Acessibilidade/AccessibilityMenu'
import LeitorDeAudio from './components/LeitorDeAudio/AudioReader'

export default function App() {
    const [mostrarLeitor, setMostrarLeitor] = useState(false)

    return (
        <>
            <Routes>
                {/* Rotas públicas com Navbar + Footer */}
                <Route element={
                    <>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </>
                }>
                    <Route path="/" element={<Home />} />
                    <Route path="/equipe" element={<Equipe />} />
                </Route>

                {/* Login isolado */}
                <Route path="/login" element={<Login />} />

                {/* Área do perfil — sidebar + topbar via PerfilLayout */}
                <Route path="/perfil" element={<PerfilLayout />}>
                    <Route index element={<Perfil />} />
                    <Route path="dados-da-conta" element={<DadosConta embedded />} />
                    <Route path="historico-exames" element={<HistoricoExames />} />
                </Route>
            </Routes>

            <AccessibilityMenu
                onOpenAudioReader={() => setMostrarLeitor(true)}
            />

            {mostrarLeitor && (
                <LeitorDeAudio
                    onClose={() => setMostrarLeitor(false)}
                />
            )}
        </>
    )
}