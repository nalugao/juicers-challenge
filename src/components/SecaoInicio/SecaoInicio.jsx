import { AreaChart, Area, ResponsiveContainer } from "recharts";
import "../../style/SecaoInicio.css";

const TREND = [{ v: 44 }, { v: 47 }, { v: 46 }, { v: 50 }, { v: 51 }, { v: 52 }];

export default function SecaoInicio() {
return (
    <header className="hero section" id="inicio">
    <div className="wrap hero-grid">
        <div>
        <span className="eyebrow">Acompanhamento • Redução de danos</span>
        <h1>
            Acompanhe sua saúde com a mesma{" "}
            <span className="accent">disciplina que você treina.</span>
        </h1>
        <p className="lead">
            Registre seus exames, veja seus indicadores evoluírem no tempo e entenda como seu
            corpo responde, sem julgamento.
        </p>
        <p className="body-t">
            A Juicers reúne seus exames em um só lugar, mostra a <b>tendência</b> de cada indicador
            e te ajuda a saber a hora certa de procurar um profissional.
            </p>
        <div className="hero-ctas">
            <a className="btn-j btn-primary-j" href="#">Começar a acompanhar</a>
            <a className="btn-j btn-ghost-j" href="#como">Ver como funciona</a>
        </div>
        <div className="reassure">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Anônimo e privado. Seus dados de saúde ficam com você.
        </div>
        </div>

        <div className="panel reveal">
        <div className="panel-top">
            <span className="ttl">Sua linha do tempo</span>
            <span className="chip ok">● acompanhando</span>
        </div>
        <div className="indicator-row">
            <span className="ind-name"><span className="dot teal" /> HDL (colesterol bom)</span>
            <span className="ind-val"><b>52</b> mg/dL ↑</span>
        </div>
        <div className="indicator-row">
            <span className="ind-name"><span className="dot amber" /> Pressão arterial</span>
            <span className="ind-val"><b>138/88</b> atenção</span>
        </div>
        <div className="indicator-row">
            <span className="ind-name"><span className="dot teal" /> Testosterona total</span>
            <span className="ind-val"><b>410</b> ng/dL</span>
        </div>
        <div className="trend">
            <div className="trend-label"><span>HDL — últimos 6 meses</span><span>tendência ↑</span></div>
            <ResponsiveContainer width="100%" height={74}>
            <AreaChart data={TREND} margin={{ top: 6, right: 4, left: 4, bottom: 0 }}>
                <defs>
                <linearGradient id="hdl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2FD6BE" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2FD6BE" stopOpacity={0} />
                </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#2FD6BE" strokeWidth={2.5} fill="url(#hdl)" dot={false} />
            </AreaChart>
            </ResponsiveContainer>
        </div>
        </div>
    </div>
    </header>
);
}
