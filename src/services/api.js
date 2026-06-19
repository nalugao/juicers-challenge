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
        body: JSON.stringify({ name, email, password, role }),
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
        body: JSON.stringify({ email, password }),
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
        body: JSON.stringify({ patientName, patientEmail }),
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

export async function getDoctorPatientExams(id) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/patients/${id}/exams`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar exames do paciente.')
    }

    return data
}

export async function uploadDoctorPatientExamPdf(id, file) {
    const token = getToken()

    const formData = new FormData()
    formData.append('examPdf', file)

    const response = await fetch(`${API_URL}/doctors/patients/${id}/exams/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao importar PDF do exame.')
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
export async function getMyFollowup() {
    const token = getToken()

    const response = await fetch(`${API_URL}/patients/me/followup`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar acompanhamento médico.')
    }

    return data
}
export async function getDoctorPatientFollowup(patientId) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/patients/${patientId}/followup`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar acompanhamento do paciente.')
    }

    return data
}

export async function createDoctorPatientNote(patientId, text) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/patients/${patientId}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar anotação clínica.')
    }

    return data
}

export async function toggleDoctorPatientRequestedExam(patientId, label) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/patients/${patientId}/requested-exams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ label }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao solicitar exame.')
    }

    return data
}

export async function deleteDoctorPatientExam(patientId, examId) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/patients/${patientId}/exams/${examId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao deletar exame do paciente.')
    }

    return data
}
export async function getMyDoctorProfile() {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar perfil médico.')
    }

    return data
}

export async function updateMyDoctorProfile({ crm, specialty }) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            crm,
            specialty,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar perfil médico.')
    }

    return data
}
export async function updateDoctorPatientNote(noteId, text) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao editar anotação.')
    }

    return data
}

export async function deleteDoctorPatientNote(noteId) {
    const token = getToken()

    const response = await fetch(`${API_URL}/doctors/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao excluir anotação.')
    }

    return data
}