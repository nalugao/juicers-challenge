import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Layout from './components/Layout' 

import Home from './pages/Home'
import Equipe from "./pages/Equipe";
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Perfil from './pages/Perfil'
import HistoricoExames from './components/HistoricoExames'
import DadosConta from './components/DadosConta'

import AccessibilityMenu from './components/Acessibilidade/AccessibilityMenu'
import LeitorDeAudio from './components/LeitorDeAudio/AudioReader'

export default function App() {
    const [mostrarLeitor, setMostrarLeitor] = useState(false)

    return (
        <>
            <Routes>
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
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/conta" element={<DadosConta />} />
            </Routes>

            {/* Componentes de acessibilidade trazidos da main */}
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
