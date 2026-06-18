/* Juicers — dados mockados (módulo ES). */

// Datas dos 4 exames (mais antigo -> mais recente)
export const examDates = ['12 set 2025', '10 dez 2025', '18 mar 2026', '05 jun 2026'];

// [categoria, nome, unidade, referência, [v1,v2,v3,v4], status, display?]
// status: 'ok' | 'atencao' | 'risco'
const ROWS = [
  // HEPÁTICO
  ['Hepático', 'ALT / TGP', 'U/L', '7–56', [30, 38, 49, 58], 'atencao'],
  ['Hepático', 'AST / TGO', 'U/L', '10–40', [28, 33, 39, 42], 'atencao'],
  ['Hepático', 'GGT', 'U/L', '8–61', [22, 27, 31, 35], 'ok'],
  ['Hepático', 'Fosfatase Alcalina', 'U/L', '40–129', [78, 84, 90, 96], 'ok'],
  ['Hepático', 'Bilirrubina Total', 'mg/dL', '0.3–1.2', [0.7, 0.8, 0.9, 1.0], 'ok'],
  ['Hepático', 'Albumina', 'g/dL', '3.5–5.2', [4.6, 4.5, 4.5, 4.4], 'ok'],
  // LIPÍDICO
  ['Lipídico', 'LDL', 'mg/dL', '< 100', [118, 132, 145, 160], 'atencao'],
  ['Lipídico', 'HDL', 'mg/dL', '> 40', [46, 43, 40, 38], 'atencao'],
  ['Lipídico', 'Triglicerídeos', 'mg/dL', '< 150', [128, 145, 158, 172], 'atencao'],
  ['Lipídico', 'Colesterol Total', 'mg/dL', '< 190', [186, 198, 210, 225], 'atencao'],
  // HORMONAL
  ['Hormonal', 'Testosterona Total', 'ng/dL', '264–916', [880, 1180, 1410, 1580], 'atencao'],
  ['Hormonal', 'Testosterona Livre', 'pg/mL', '8.7–25.1', [22, 28, 33, 38], 'atencao'],
  ['Hormonal', 'LH', 'mUI/mL', '1.7–8.6', [1.2, 0.6, 0.3, 0.2], 'risco'],
  ['Hormonal', 'FSH', 'mUI/mL', '1.5–12.4', [1.1, 0.6, 0.3, 0.2], 'risco'],
  ['Hormonal', 'Estradiol', 'pg/mL', '11–44', [34, 47, 57, 66], 'atencao'],
  ['Hormonal', 'SHBG', 'nmol/L', '18.3–54.1', [28, 22, 18, 15], 'atencao'],
  ['Hormonal', 'Prolactina', 'ng/mL', '4–15.2', [10, 12, 13, 14], 'ok'],
  ['Hormonal', 'Cortisol', 'µg/dL', '6.2–19.4', [14, 15, 16, 17], 'ok'],
  ['Hormonal', 'TSH', 'µUI/mL', '0.27–4.2', [2.1, 2.3, 2.4, 2.5], 'ok'],
  // HEMATOLÓGICO
  ['Hematológico', 'Hematócrito', '%', '38.8–50', [48, 51, 53, 55], 'risco'],
  ['Hematológico', 'Hemoglobina', 'g/dL', '13.5–17.5', [16.2, 17.1, 17.8, 18.4], 'risco'],
  ['Hematológico', 'Plaquetas', 'mil/µL', '150–450', [240, 250, 245, 255], 'ok'],
  ['Hematológico', 'VCM', 'fL', '80–100', [88, 89, 90, 91], 'ok'],
  // RENAL
  ['Renal', 'Creatinina', 'mg/dL', '0.7–1.3', [1.1, 1.2, 1.3, 1.35], 'atencao'],
  ['Renal', 'Ureia', 'mg/dL', '16.6–48.5', [38, 42, 45, 48], 'ok'],
  ['Renal', 'Ácido Úrico', 'mg/dL', '3.4–7.0', [6.2, 6.6, 6.9, 7.2], 'atencao'],
  ['Renal', 'TFG estimada', 'mL/min', '> 90', [98, 92, 88, 85], 'atencao'],
  // METABÓLICO
  ['Metabólico', 'Glicemia jejum', 'mg/dL', '70–99', [88, 92, 95, 97], 'ok'],
  ['Metabólico', 'HbA1c', '%', '< 5.7', [5.2, 5.3, 5.4, 5.5], 'ok'],
  ['Metabólico', 'Insulina', 'µUI/mL', '2.6–24.9', [8, 10, 12, 14], 'ok'],
  // CARDIOVASCULAR
  ['Cardiovascular', 'Pressão Arterial', 'mmHg', '< 130/85', [128, 132, 136, 140], 'atencao', '140/90'],
  ['Cardiovascular', 'FC repouso', 'bpm', '60–100', [64, 66, 68, 70], 'ok'],
  ['Cardiovascular', 'PSA', 'ng/mL', '< 4.0', [0.8, 0.9, 1.0, 1.1], 'ok'],
];

export const markers = ROWS.map((r, i) => ({
  id: 'm' + i,
  cat: r[0],
  name: r[1],
  unit: r[2],
  ref: r[3],
  values: r[4],
  status: r[5],
  display: r[6] != null ? r[6] : null,
}));

const CAT_ORDER = ['Hepático', 'Lipídico', 'Hormonal', 'Hematológico', 'Renal', 'Metabólico', 'Cardiovascular'];
export const categories = CAT_ORDER.map((c) => ({
  name: c,
  markers: markers.filter((m) => m.cat === c),
}));

const byName = (n) => markers.find((m) => m.name === n);
const lastVal = (m) => (m.display != null ? m.display : m.values[m.values.length - 1]);

// Faixa de resumo (4 cards)
export const summary = ['Testosterona Total', 'LDL', 'AST / TGO', 'HDL'].map((n) => {
  const m = byName(n);
  return { name: m.name, value: lastVal(m), unit: m.unit, status: m.status };
});
summary[0].name = 'Testosterona';
summary[2].name = 'TGO / TGP';

// Alertas ativos do atleta
export const alerts = [
  { level: 'risco', title: 'Risco alto', desc: 'Hemograma completo + Perfil lipídico fora do alvo' },
  { level: 'atencao', title: 'LDL elevado', desc: 'LDL em 160 mg/dL no último exame' },
  { level: 'atencao', title: 'HDL abaixo do ideal', desc: 'HDL em 38 mg/dL' },
  { level: 'atencao', title: 'Atenção hepática', desc: 'TGO 42, TGP 58 e GGT 35' },
];

export const athlete = {
  name: 'Caue',
  fullName: 'Caue Oliveira',
  age: 40,
  sexo: 'Masculino',
  peso: 92,
  altura: 178,
  cicloStatus: 'ativo',
  cicloTempo: '6–12 meses',
  dose: 400,
  lastExam: '05 jun 2026',
  compounds: ['Testosterona Enantato', 'Trembolona', 'Boldenona', 'Oxandrolona'],
  condicoes: ['Colesterol elevado'],
  examFreq: 'trimestral',
};

// Pacientes do médico (ordenados por prioridade de risco)
export const patients = [
  { id: 'p1', name: 'Caue Oliveira', initials: 'CO', age: 40, compounds: ['Test. Enantato', 'Trembolona', 'Boldenona'], lastExam: '05 jun 2026', status: 'risco', alerts: 4 },
  { id: 'p3', name: 'Diego Martins', initials: 'DM', age: 27, compounds: ['Test. Enantato', 'Stanozolol'], lastExam: '02 jun 2026', status: 'risco', alerts: 3 },
  { id: 'p2', name: 'Bruno Santos', initials: 'BS', age: 33, compounds: ['Test. Cipionato', 'Nandrolona'], lastExam: '28 mai 2026', status: 'atencao', alerts: 2 },
  { id: 'p5', name: 'Rafael Lima', initials: 'RL', age: 30, compounds: ['Trembolona', 'Test. Propionato'], lastExam: '30 mai 2026', status: 'atencao', alerts: 2 },
  { id: 'p6', name: 'Lucas Ferreira', initials: 'LF', age: 38, compounds: ['Oxandrolona'], lastExam: '20 mai 2026', status: 'atencao', alerts: 1 },
  { id: 'p4', name: 'Felipe Costa', initials: 'FC', age: 45, compounds: ['Boldenona', 'Masteron'], lastExam: '15 mai 2026', status: 'estavel', alerts: 0 },
];

// Histórico de exames importados (atleta)
export const examHistory = [
  { date: '05 jun 2026', lab: 'Laboratório Fleury', markers: 32, status: 'risco' },
  { date: '18 mar 2026', lab: 'Laboratório Fleury', markers: 32, status: 'atencao' },
  { date: '10 dez 2025', lab: 'Hermes Pardini', markers: 30, status: 'atencao' },
  { date: '12 set 2025', lab: 'Hermes Pardini', markers: 28, status: 'ok' },
];

export const suggestedExams = [
  'Hemograma completo (controle de hematócrito)',
  'Perfil lipídico completo',
  'Painel hepático (TGO, TGP, GGT)',
  'Estradiol sérico',
  'PSA total e livre',
  'Ecocardiograma + aferição de PA',
];

export const medico = {
  nome: 'Ana',
  sobrenome: 'Souza',
  especialidade: 'Endocrinologia',
  crm: 'CRM-SP 123456',
  rqe: 'RQE 45678',
  email: 'ana.souza@vitalis.com.br',
  telefone: '(11) 98888-1234',
  instituicao: 'Clínica Vitalis',
};

export const compoundsCatalog = [
  'Testosterona Enantato', 'Testosterona Cipionato', 'Trembolona', 'Oxandrolona',
  'Nandrolona', 'Boldenona', 'Stanozolol', 'Masteron',
];

export const conditionsCatalog = [
  'Hipertensão', 'Colesterol elevado', 'Problemas hepáticos',
  'Histórico cardíaco familiar', 'Nenhuma das anteriores',
];

/* ----------------------------------------------------------------------------
   MOCK_DATA — formato esperado pelo seu PerfilAtleta.jsx (fallback do dashboard
   do atleta quando a API ainda não respondeu). Mantém compatibilidade com o
   código que usa `const { perfil } = MOCK_DATA`.
   ---------------------------------------------------------------------------- */
export const MOCK_DATA = {
  perfil: {
    nome: athlete.fullName,            // 'Caue Oliveira'
    idade: athlete.age,                // 40
    sexo: 'masculino',
    tempoUso: athlete.cicloTempo,      // '6–12 meses'
    dosagem: athlete.dose + 'mg/sem',  // '400mg/sem'
    esteroides: athlete.compounds.slice(),
    cicloAtivo: 'sim',
    ultimoExame: athlete.lastExam,     // '05 jun 2026'
  },
};

const JuicersData = {
  examDates, markers, categories, summary, alerts, athlete, medico,
  patients, examHistory, suggestedExams, compoundsCatalog, conditionsCatalog,
};

export default JuicersData;