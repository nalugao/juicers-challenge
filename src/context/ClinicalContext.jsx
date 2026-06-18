import { createContext, useContext } from 'react';
import { useClinicalState } from '../hooks/useClinicalState.js';

/* ----------------------------------------------------------------------------
   ClinicalContext — compartilha o estado clínico (anotações, exames
   solicitados, uploads, conta do atleta, perfil do médico) entre as rotas.
   Envolva as rotas do médico (de preferência dentro do MedicoLayout) com
   <ClinicalProvider> e leia com useClinical().
   ---------------------------------------------------------------------------- */

const ClinicalContext = createContext(null);

export function ClinicalProvider({ children }) {
  const value = useClinicalState();
  return <ClinicalContext.Provider value={value}>{children}</ClinicalContext.Provider>;
}

export function useClinical() {
  const ctx = useContext(ClinicalContext);
  if (!ctx) throw new Error('useClinical() precisa estar dentro de <ClinicalProvider>');
  return ctx;
}
