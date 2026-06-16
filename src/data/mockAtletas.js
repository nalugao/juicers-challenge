export const ATLETAS_MOCK = [
    {
        id: 1,
        nome: 'Lucas Ferreira',
        iniciais: 'LF',
        idade: 31,
        cicloAtivo: 'ativo',
        ultimoExame: '11 Mar 2026',
        risco: 'warn',
    },
    {
        id: 2,
        nome: 'Bruno Alves',
        iniciais: 'BA',
        idade: 38,
        cicloAtivo: 'ativo',
        ultimoExame: '09 Mar 2026',
        risco: 'high',
    },
    {
        id: 3,
        nome: 'Carlos Mendez',
        iniciais: 'CM',
        idade: 29,
        cicloAtivo: 'off',
        ultimoExame: '06 Mar 2026',
        risco: 'normal',
    },
    {
        id: 4,
        nome: 'Diego Pinto',
        iniciais: 'DP',
        idade: 26,
        cicloAtivo: 'nunca',
        ultimoExame: '21 Fev 2026',
        risco: null,
    },
    {
        id: 5,
        nome: 'Marcos Souza',
        iniciais: 'MS',
        idade: 42,
        cicloAtivo: 'off',
        ultimoExame: '02 Mar 2026',
        risco: 'normal',
    },
]

export const CICLO_LABEL = {
    ativo: 'Ciclo ativo',
    off: 'Em off',
    nunca: 'Nunca usou',
}

export const CICLO_COLOR = {
    ativo: '#E6A817',
    off: '#2FD6BE',
    nunca: '#6b6b6b',
}

export const RISCO_LABEL = {
    high: 'Alto',
    warn: 'Atenção',
    normal: 'Normal',
}

export const RISCO_COLOR = {
    high: '#E5484D',
    warn: '#E6A817',
    normal: '#35B57E',
}