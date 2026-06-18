import React, { useState } from 'react';

/**
 * InviteModal — adicionar paciente: envio de convite por e-mail
 * ou compartilhamento de link de cadastro gerado.
 */
export default function InviteModal({ onClose, onSend, onToast }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [code] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase());
  const link = 'https://app.juicers.com.br/cadastro/' + code;

  const send = () => {
    const e = email.trim();
    if (!e) {
      onToast && onToast('Informe o e-mail do paciente');
      return;
    }
    onSend && onSend({ nome, email: e });
  };

  const copy = () => {
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(link);
    } catch (err) {
      /* ignore */
    }
    onToast && onToast('Link de cadastro copiado');
  };

  const inputStyle = {
    background: '#0f0f0f',
    border: '1px solid #2a2a2a',
    borderRadius: 9,
    padding: '11px 13px',
    color: '#f0f0f0',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
  };
  const labelStyle = { fontSize: 11, fontWeight: 600, color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '.04em' };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.62)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 60,
        padding: 24,
        animation: 'jc-fade .15s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="jc-modal-anim"
        style={{
          background: '#161616',
          border: '1px solid #2a2a2a',
          borderRadius: 18,
          width: 'min(460px,100%)',
          padding: '26px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          boxShadow: '0 30px 70px -30px rgba(0,0,0,.8)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-.01em' }}>Adicionar paciente</h2>
            <p style={{ margin: 0, fontSize: 12.5, color: '#888' }}>Envie um convite por e-mail ou compartilhe o link de cadastro</p>
          </div>
          <button
            onClick={onClose}
            className="jc-close"
            style={{ flex: 'none', width: 34, height: 34, borderRadius: 9, background: '#1f1f1f', border: '1px solid #2a2a2a', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Nome do paciente</label>
            <input className="jc-input teal" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: João Mendes" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>E-mail</label>
            <input className="jc-input teal" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="paciente@email.com" style={inputStyle} />
          </div>
          <button
            onClick={send}
            className="jc-btn-teal"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#2fd6be', color: '#06201d', border: 'none', fontSize: 13.5, fontWeight: 700, fontFamily: 'inherit', borderRadius: 10, padding: 12, cursor: 'pointer' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06201d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            Enviar convite
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: '#272727' }} />
          <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '.06em' }}>ou compartilhe o link</span>
          <div style={{ flex: 1, height: 1, background: '#272727' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: 10, padding: '4px 4px 4px 13px' }}>
            <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: '#bdbdbd', fontFamily: "'Space Grotesk',monospace", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {link}
            </span>
            <button
              onClick={copy}
              className="jc-btn-soft-teal"
              style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(47,214,190,.12)', border: '1px solid rgba(47,214,190,.3)', color: '#2fd6be', fontSize: 12, fontWeight: 650, fontFamily: 'inherit', borderRadius: 7, padding: '8px 12px', cursor: 'pointer' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copiar
            </button>
          </div>
          <p style={{ margin: 0, fontSize: 11.5, color: '#777', lineHeight: 1.45 }}>
            O paciente completa o cadastro pelo link e aparece automaticamente na sua lista.
          </p>
        </div>
      </div>
    </div>
  );
}
