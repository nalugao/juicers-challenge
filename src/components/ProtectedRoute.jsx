import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, role }) {
    const { usuario } = useAuth()

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    if (role && usuario.role !== role) {
        const redirecionar = usuario.role === 'medico' ? '/medico' : '/perfil'
        return <Navigate to={redirecionar} replace />
    }

    return children
}