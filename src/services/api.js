const API_URL = 'http://localhost:3000/api'

function getToken() {
    return localStorage.getItem('tokenJuicers')
}

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
    const token = getToken()

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

export async function getMyPatientProfile() {
    const token = getToken()

    const response = await fetch(`${API_URL}/patients/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar perfil do paciente.')
    }

    return data
}

export async function updateUserProfile(userData) {
    const token = getToken()

    const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar usuário.')
    }

    return data
}

export async function getMyExams() {
    const token = getToken()

    const response = await fetch(`${API_URL}/exams`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar exames.')
    }

    return data
}

export async function createExam(examData) {
    const token = getToken()

    const response = await fetch(`${API_URL}/exams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(examData),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar exame.')
    }

    return data
}

export async function deleteExam(id) {
    const token = getToken()

    const response = await fetch(`${API_URL}/exams/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao deletar exame.')
    }

    return data
}

export async function createDoctorInvite({ patientName, patientEmail }) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/invites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            patientName,
            patientEmail,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar convite.')
    }

    return data
}

export async function getDoctorPatients() {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/patients`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar pacientes do médico.')
    }

    return data
}

export async function getDoctorPatientById(id) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/patients/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar paciente.')
    }

    return data
}

export async function getInviteByToken(inviteToken) {
    const response = await fetch(`${API_URL}/doctors/invites/${inviteToken}`)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar convite.')
    }

    return data
}

export async function acceptDoctorInvite(inviteToken) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/invites/${inviteToken}/accept`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao aceitar convite.')
    }

    return data
}