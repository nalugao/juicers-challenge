import { useState, useCallback } from 'react';
import data, { athlete, medico as medicoSeed, examHistory, patients } from '../data/mockData';

const TODAY = '16 jun 2026';

/** Estado clínico compartilhado por paciente (anotações, exames solicitados, uploads),
 *  além dos dados editáveis da conta do atleta e do perfil do médico. */
export function useClinicalState() {
  const [account, setAccount] = useState(() => {
    const parts = athlete.fullName.split(' ');
    return {
      nome: parts[0],
      sobrenome: parts.slice(1).join(' '),
      idade: athlete.age,
      sexo: athlete.sexo,
      peso: athlete.peso,
      altura: athlete.altura,
      cicloStatus: athlete.cicloStatus,
      dose: athlete.dose,
      cicloTempo: athlete.cicloTempo,
      compounds: athlete.compounds.slice(),
      condicoes: athlete.condicoes.slice(),
      examFreq: athlete.examFreq,
      lastExam: athlete.lastExam,
    };
  });

  const [medico, setMedico] = useState(() => ({ ...medicoSeed }));

  const [clinical, setClinical] = useState(() => {
    const c = {};
    patients.forEach((p) => {
      c[p.id] = { notes: [], requested: {}, uploads: [] };
    });
    // Caue (p1) é o atleta logado — semeia histórico clínico de exemplo
    if (c.p1) {
      c.p1.uploads = examHistory.map((e) => ({ ...e }));
      c.p1.notes = [
        {
          date: '18 mar 2026',
          text: 'Hematócrito e LDL em elevação. Orientada redução da dosagem semanal e reavaliação do perfil lipídico em 90 dias. Reforçar hidratação e monitorar pressão arterial.',
        },
      ];
      c.p1.requested = {
        'Hemograma completo (controle de hematócrito)': '18 mar 2026',
        'Perfil lipídico completo': '18 mar 2026',
      };
    }
    return c;
  });

  const updAccount = useCallback((k, v) => setAccount((a) => ({ ...a, [k]: v })), []);
  const updMed = useCallback((k, v) => setMedico((m) => ({ ...m, [k]: v })), []);

  const toggleCompound = useCallback((c) => {
    setAccount((a) => {
      const has = a.compounds.includes(c);
      return { ...a, compounds: has ? a.compounds.filter((x) => x !== c) : a.compounds.concat(c) };
    });
  }, []);

  const toggleCondition = useCallback((c) => {
    setAccount((a) => {
      let arr = a.condicoes;
      if (c === 'Nenhuma das anteriores') {
        arr = arr.includes(c) ? [] : ['Nenhuma das anteriores'];
      } else {
        arr = arr.filter((x) => x !== 'Nenhuma das anteriores');
        arr = arr.includes(c) ? arr.filter((x) => x !== c) : arr.concat(c);
      }
      return { ...a, condicoes: arr };
    });
  }, []);

  const addNote = useCallback((pid, text) => {
    const draft = (text || '').trim();
    if (!draft) return false;
    setClinical((c) => {
      const pc = c[pid] || { notes: [], requested: {}, uploads: [] };
      return { ...c, [pid]: { ...pc, notes: [{ date: TODAY, text: draft }, ...pc.notes] } };
    });
    return true;
  }, []);

  const togglePatientExam = useCallback((pid, label) => {
    setClinical((c) => {
      const pc = c[pid];
      const req = { ...pc.requested };
      if (req[label]) delete req[label];
      else req[label] = TODAY;
      return { ...c, [pid]: { ...pc, requested: req } };
    });
  }, []);

  const addUpload = useCallback((pid, filename) => {
    setClinical((c) => {
      const pc = c[pid] || { notes: [], requested: {}, uploads: [] };
      const entry = { date: TODAY, lab: 'Importação manual', markers: 32, status: 'atencao', file: filename || 'exame.pdf' };
      return { ...c, [pid]: { ...pc, uploads: [entry, ...pc.uploads] } };
    });
  }, []);

  return {
    data,
    today: TODAY,
    account,
    medico,
    clinical,
    updAccount,
    updMed,
    toggleCompound,
    toggleCondition,
    addNote,
    togglePatientExam,
    addUpload,
  };
}
