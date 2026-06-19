import { createContext, useContext } from 'react'
import { useClinicalState } from '../hooks/useClinicalState.js'

const ClinicalContext = createContext(null)

export function ClinicalProvider({ children }) {
  const value = useClinicalState()

  return (
    <ClinicalContext.Provider value={value}>
      {children}
    </ClinicalContext.Provider>
  )
}

export function useClinical() {
  const ctx = useContext(ClinicalContext)

  if (!ctx) {
    throw new Error('useClinical precisa estar dentro de ClinicalProvider')
  }

  return ctx
}