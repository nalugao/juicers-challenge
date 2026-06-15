const API_URL = 'http://localhost:3000/api'

export async function registerUser({ name, email, password, role = 'patient' }) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
            role,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário.')
    }

    return data
}

export async function loginUser({ email, password }) {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login.')
    }

    return data
}

export async function savePatientProfile(patientData) {
    const token = localStorage.getItem('tokenJuicers')

    const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patientData),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao salvar perfil do paciente.')
    }

    return data
}