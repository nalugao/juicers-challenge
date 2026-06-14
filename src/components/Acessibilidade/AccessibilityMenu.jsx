import { useState } from "react";
import AudioReader from "../LeitorDeAudio/AudioReader";
import Acessibilidade from "../../assets/Acessibilidade.png";

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [audioAtivo, setAudioAtivo] = useState(false);

  const abrirVLibras = () => {
    const btn = document.querySelector("[vw-access-button]");
    if (btn) {
      btn.classList.add("active");
      btn.style.display = "block";
      btn.style.visibility = "visible";
      btn.style.opacity = "1";
      btn.click();
      setTimeout(() => {
        btn.style.display = "none";
      }, 500);
    }

    const wrapper = document.querySelector("[vw]");
    if (wrapper) {
      wrapper.classList.add("active");
    }

    setIsOpen(false);
  };

  const abrirUserWay = () => {
    if (window.UserWay) window.UserWay.widgetOpen();
    setIsOpen(false);
  };

  const items = [
    { label: "VLibras",        icon: "👋", color: "#3a86ff", onClick: abrirVLibras },
    { label: "Leitor de Tela", icon: "🔊", color: "#06d6a0", onClick: () => { setAudioAtivo(true); setIsOpen(false); } },
    { label: "Acessibilidade", icon: "👤", color: "#f77f00", onClick: abrirUserWay },
  ];

  return (
    <>
      {audioAtivo && <AudioReader onClose={() => setAudioAtivo(false)} />}

      <div style={{ position: "fixed", bottom: "130px", right: "54px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>

        {isOpen && items.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ background: "rgba(0,0,0,0.75)", color: "white", fontSize: "13px", padding: "5px 10px", borderRadius: "8px", whiteSpace: "nowrap" }}>
              {item.label}
            </span>
            <button
              onClick={item.onClick}
              aria-label={item.label}
              style={{ width: "44px", height: "44px", borderRadius: "50%", background: item.color, border: "none", color: "white", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {item.icon}
            </button>
          </div>
        ))}

        <button
          onClick={() => setIsOpen(prev => !prev)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu de acessibilidade"}
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "#e8f5e9",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          {isOpen ? (
            <span style={{ width: "68px", height: "68px", borderRadius: "50%", color: "black", fontSize: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ✕
            </span>
          ) : (
            <img
              src={Acessibilidade}
              alt="Abrir menu de acessibilidade"
              style={{ width: "94px", height: "94px", objectFit: "contain" }}
            />
          )}
        </button>
      </div>
    </>
  );
};

export default AccessibilityMenu;