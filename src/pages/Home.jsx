import { useEffect } from "react";
import Navbar from "../components/Navbar";
import "../style/juicer-tokens.css";
import "../style/home.css";
import SecaoInicio from "../components/SecaoInicio/SecaoInicio";
import ComoFunciona from "../components/comoFunciona/ComoFunciona";
import OQueAcompanhar from "../components/oQueAcompanhar/OQueAcompanhar";

import MapaCorporal from "./MapaCorporal";
import Simulador from "./Simulador";

import Publicos from "../components/publicos/Publicos";
import OQueNaoFaz from "../components/oQueNaoFaz/OQueNaoFaz";
import SecaoSobre from "../components/home/sobreProjeto/SecaoSobre";
import CTAFinal from "../components/CTAFinal/CTAFinal";


export default function Home() {
    useEffect(() => {
        const els = document.querySelectorAll(".juicer .reveal");
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        io.unobserve(e.target);
                    }
                }),
            { threshold: 0.12 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);


    return (
        <div className="juicer">
            <Navbar />
            <SecaoInicio />
            <ComoFunciona />
            <OQueAcompanhar />
            <Publicos />
            <OQueNaoFaz />
            <SecaoSobre />
            <CTAFinal />
            {/* <Footer /> */}
        </div>
    );

}
