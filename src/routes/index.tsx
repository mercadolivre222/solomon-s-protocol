import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import lockImg from "@/assets/solomon-lock.jpg";
import stoneImg from "@/assets/stone-bg.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Protocolo de Salomão — Sua Linha de Escassez Foi Detectada" },
      {
        name: "description",
        content:
          "Diagnóstico concluído. Quebre o selo familiar e ative a Provisão Terrena Absoluta. Assista ao vídeo agora.",
      },
    ],
  }),
});

const REVEAL_DELAY_MS = 40_000;

function Index() {
  const [revealed, setRevealed] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setRevealed(true);
      requestAnimationFrame(() => {
        revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className="min-h-screen w-full text-foreground"
      style={{
        backgroundColor: "#000",
        backgroundImage: `radial-gradient(ellipse at top, rgba(255,215,0,0.08), transparent 55%), radial-gradient(ellipse at bottom, rgba(139,69,19,0.06), transparent 65%), url(${stoneImg})`,
        backgroundSize: "cover, cover, 700px",
        backgroundBlendMode: "screen, screen, overlay",
        backgroundRepeat: "no-repeat, no-repeat, repeat",
      }}
    >
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-5 pb-20 pt-6 sm:pt-10">
        {/* Top Alert */}
        <div className="alert-blink mb-8 w-full rounded-md border border-[#ff3b3b]/60 bg-[#1a0000]/80 px-4 py-2.5 text-center backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff6b6b] sm:text-xs">
            🛡️ Diágnostico Concluído — Protocolo de Salomão Ativado
          </p>
        </div>

        {/* Heading */}
        <h1 className="font-display gold-gradient-text text-center text-3xl font-black leading-[1.1] sm:text-5xl">
          SUA LINHA DE ESCASSEZ<br />FOI DETECTADA
        </h1>
        <p className="mt-4 max-w-md text-center text-sm text-neutral-400 sm:text-base">
          Assista ao vídeo abaixo imediatamente para liberar seu código de ativação.
        </p>

        {/* Video Container — 9:16 */}
        <div className="gold-glow mt-8 w-full max-w-[360px] overflow-hidden rounded-2xl bg-black">
          <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1408] via-black to-[#0a0800]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-black/60 backdrop-blur-sm">
                <svg viewBox="0 0 24 24" fill="#ffd700" className="ml-1 h-8 w-8">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-display mt-6 px-6 text-center text-xs uppercase tracking-[0.25em] text-gold">
                Vídeo de Ativação
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-neutral-500">
                Protocolo Confidencial
              </p>
            </div>
          </div>
        </div>

        {/* Delayed Reveal Section */}
        <div
          ref={revealRef}
          className={`reveal mt-16 flex w-full flex-col items-center ${revealed ? "is-visible" : "pointer-events-none"}`}
          aria-hidden={!revealed}
        >
          {/* Artifact */}
          <div className="relative artifact-float">
            <div
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,215,0,0.55), transparent 65%)" }}
            />
            <div className="gold-glow-strong flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-black sm:h-72 sm:w-72">
              <img
                src={lockImg}
                alt="Cadeado dourado de Salomão"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Manifesto */}
          <p className="mt-12 max-w-xl text-center text-[15px] leading-relaxed text-neutral-300 sm:text-lg">
            O veredito do seu Quiz confirmou o <span className="text-gold font-semibold">bloqueio</span>.
            Sua linhagem está sob o peso da <span className="text-gold font-semibold">escassez hereditária</span>.
            Ao quebrar esse selo agora, você ativa a{" "}
            <span className="text-gold font-semibold">Provisão Terrena Absoluta</span> para esvaziar
            seus boletos e garante o seu{" "}
            <span className="text-gold font-semibold">Terreno Sagrado</span> e morada eterna no Reino dos Céus.
          </p>

          {/* Benefits Card */}
          <div
            className="mt-10 w-full max-w-md rounded-2xl border border-gold-dim p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(160deg, rgba(40, 30, 5, 0.85) 0%, rgba(10, 8, 2, 0.95) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,215,0,0.15), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            <h3 className="font-display gold-gradient-text mb-5 text-center text-lg font-bold uppercase tracking-widest">
              O Que Você Recebe
            </h3>
            <ul className="space-y-4">
              {[
                { t: "Quebra do Selo Familiar", d: "Rompimento imediato da maldição hereditária da escassez." },
                { t: "Ativação do Ouro Terreno", d: "Provisão financeira sobrenatural liberada sobre sua vida." },
                { t: "Garantia de Herança Eterna", d: "Seu Terreno Sagrado registrado no Reino dos Céus." },
              ].map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 text-xl text-gold leading-none">✦</span>
                  <div>
                    <p className="font-semibold text-gold-light">{b.t}</p>
                    <p className="text-sm text-neutral-400">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            className="gold-bar-btn font-display mt-10 w-full max-w-md cursor-pointer rounded-xl px-6 py-5 text-base font-black uppercase leading-tight tracking-wider text-[#3a2700] sm:text-lg"
          >
            🔑 Quebrar Selo & Reivindicar Minha Herança
          </button>

          <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-neutral-500">
            Acesso Imediato · Pagamento Único · Sigilo Total
          </p>

          {/* Urgency Footer */}
          <p className="mt-12 max-w-md text-center text-[11px] leading-relaxed text-neutral-600 sm:text-xs">
            Aviso fatal: Restam apenas <span className="text-[#ff3b3b]/80">7 licenças</span> de
            liberação espiritual para o seu IP. Se você fechar esta página, seu nome será
            removido do protocolo de Salomão.
          </p>
        </div>
      </div>
    </main>
  );
}
