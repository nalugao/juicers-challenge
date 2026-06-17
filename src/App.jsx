import { useState } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

/* layouts */
import PerfilLayout from './layout/PerfilLayout'
import MedicoLayout from './layout/MedicoLayout'

/* páginas públicas */
import Home from './pages/Home'
import Login from './pages/Login'
import MapaCorporal from './pages/MapaCorporal'
import Simulador from './pages/Simulador'

/* páginas do atleta */
import Perfil from './pages/Perfil'
import DadosConta from './components/DadosConta'
import HistoricoExames from './components/HistoricoExames'

/* páginas do médico */
import MeusAtletas from './pages/MeusAtletas'
import PerfilAtletaMedico from './pages/PerfilAtletaMedico'
import DadosContaMedico from './components/DadosContaMedico'

/* acessibilidade */
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AccessibilityMenu from './components/Acessibilidade/AccessibilityMenu'
import LeitorDeAudio from './components/LeitorDeAudio/AudioReader'

export default function App() {
    const [mostrarLeitor, setMostrarLeitor] = useState(false)

    return (
        <AuthProvider>
            <Routes>

                {/* Rotas públicas com Navbar + Footer */}
                <Route element={<><Navbar /><Outlet /><Footer /></>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/mapa-corporal" element={<MapaCorporal />} />
                    <Route path="/simulador" element={<Simulador />} />
                </Route>

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Área do atleta */}
                <Route path="/perfil" element={
                    <ProtectedRoute role="atleta">
                        <PerfilLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Perfil />} />
                    <Route path="historico-exames" element={<HistoricoExames />} />
                    <Route path="dados-da-conta" element={<DadosConta embedded />} />
                </Route>

                {/* Área do médico */}
                <Route path="/medico" element={
                    <ProtectedRoute role="medico">
                        <MedicoLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<MeusAtletas />} />
                    <Route path="atleta/:id" element={<PerfilAtletaMedico />} />
                    <Route path="dados-da-conta" element={<DadosContaMedico />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>

            <AccessibilityMenu onOpenAudioReader={() => setMostrarLeitor(true)} />
            {mostrarLeitor && <LeitorDeAudio onClose={() => setMostrarLeitor(false)} />}
        </AuthProvider>
    )
}