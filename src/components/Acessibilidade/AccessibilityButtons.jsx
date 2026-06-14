import { useState } from 'react'
import AudioReader from './AudioReader'
import './AccessibilityButtons.css'

export default function AccessibilityButtons() {
    const [showReader, setShowReader] = useState(false)
    const [highContrast, setHighContrast] = useState(false)

    const aumentarFonte = () => {
        document.documentElement.classList.remove('font-small')
        document.documentElement.classList.add('font-large')
    }

    const diminuirFonte = () => {
        document.documentElement.classList.remove('font-large')
        document.documentElement.classList.add('font-small')
    }

    const resetarFonte = () => {
        document.documentElement.classList.remove('font-large')
        document.documentElement.classList.remove('font-small')
    }

    const alternarContraste = () => {
        setHighContrast(prev => {
            const novoValor = !prev

            if (novoValor) {
                document.body.classList.add('high-contrast')
            } else {
                document.body.classList.remove('high-contrast')
            }

            return novoValor
        })
    }

    return (
        <>
            <div className="accessibility-buttons">
                <button
                    type="button"
                    className="accessibility-btn"
                    onClick={aumentarFonte}
                    title="Aumentar fonte"
                >
                    A+
                </button>

                <button
                    type="button"
                    className="accessibility-btn"
                    onClick={diminuirFonte}
                    title="Diminuir fonte"
                >
                    A-
                </button>

                <button
                    type="button"
                    className="accessibility-btn"
                    onClick={resetarFonte}
                    title="Resetar fonte"
                >
                    A
                </button>

                <button
                    type="button"
                    className={`accessibility-btn ${highContrast ? 'active' : ''}`}
                    onClick={alternarContraste}
                    title="Alto contraste"
                >
                    ◐
                </button>

                <button
                    type="button"
                    className="accessibility-btn reader-btn"
                    onClick={() => setShowReader(true)}
                    title="Leitor de tela"
                >
                    🔊
                </button>
            </div>

            {showReader && (
                <AudioReader onClose={() => setShowReader(false)} />
            )}
        </>
    )
}