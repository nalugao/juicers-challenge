import React, { useState } from 'react';

/**
 * UploadZone — área de drag & drop estilizada (PDF).
 * accent: cor de acento (âmbar atleta / verde-água médico).
 * onUpload(filename): chamado quando um arquivo é solto/selecionado.
 */
export default function UploadZone({ accent = '#e6a817', label = 'Importar exame (PDF)', onUpload }) {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (name) => {
    const fname = name || 'exame_05jun2026.pdf';
    setFile(fname);
    if (onUpload) onUpload(fname);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!drag) setDrag(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrag(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        handleFile(f ? f.name : null);
      }}
      style={{
        border: `2px dashed ${drag ? accent : '#333'}`,
        background: drag ? 'rgba(255,255,255,.025)' : '#141414',
        borderRadius: 14,
        padding: '30px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 9,
        textAlign: 'center',
        transition: 'border-color .15s ease, background .15s ease',
      }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 2 }}>
        <path d="M12 16V4" />
        <path d="M8 8l4-4 4 4" />
        <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
      </svg>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 650, color: '#e8e8e8' }}>{label}</p>
      <p style={{ margin: 0, fontSize: 12.5, color: '#7e7e7e' }}>Arraste o arquivo PDF aqui, ou</p>
      <label
        style={{
          marginTop: 4,
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: 12.5,
          fontWeight: 650,
          color: accent,
          border: `1px solid ${accent}`,
          background: 'transparent',
          borderRadius: 8,
          padding: '7px 16px',
        }}
      >
        Selecionar arquivo
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFile(e.target.files[0] ? e.target.files[0].name : null)}
          style={{ display: 'none' }}
        />
      </label>
      {file && (
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#3fb950' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span style={{ color: '#cfcfcf' }}>{file}</span>
          <span>importado</span>
        </div>
      )}
    </div>
  );
}
