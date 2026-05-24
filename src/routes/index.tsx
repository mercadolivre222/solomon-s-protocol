import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import lockImg from "@/assets/solomon-lock.jpg";
import stoneImg from "@/assets/stone-bg.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Protocolo de Salomão — Diagnóstico Espiritual" },
      {
        name: "description",
        content:
          "Descubra se sua linhagem está sob o selo da escassez hereditária. Faça o diagnóstico agora.",
      },
    ],
  }),
});

type Step = "quiz" | "loading" | "sales";

const QUESTIONS = [
  {
    q: "Você sente que o seu dinheiro some misteriosamente antes do final do mês?",
    options: [
      "Sim, trabalho duro mas o dinheiro desaparece",
      "Às vezes sinto um bloqueio invisível",
    ],
  },
  {
    q: "Você carrega dívidas ou boletos acumulados que parecem nunca ter fim?",
    options: [
      "Sim, vivo sufocado por dívidas",
      "Sim, herdei essa dificuldade da minha família",
    ],
  },
] as const;

function Index() {
  const [step, setStep] = useState<Step>("quiz");
  const [qIndex, setQIndex] = useState(0);
  const salesRef = useRef<HTMLDivElement>(null);

  const onAnswer = () => {
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setStep("loading");
      setTimeout(() => {
        setStep("sales");
        requestAnimationFrame(() => {
          salesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }, 3000);
    }
  };

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
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-5 pb-20 pt-8 sm:pt-14">
        {step === "quiz" && (
          <QuizStep
            key={qIndex}
            index={qIndex}
            total={QUESTIONS.length}
            question={QUESTIONS[qIndex].q}
            options={QUESTIONS[qIndex].options}
            onAnswer={onAnswer}
          />
        )}
        {step === "loading" && <LoadingStep />}
        {step === "sales" && <SalesStep innerRef={salesRef} />}
      </div>
    </main>
  );
}

function QuizStep({
  index,
  total,
  question,
  options,
  onAnswer,
}: {
  index: number;
  total: number;
  question: string;
  options: readonly string[];
  onAnswer: () => void;
}) {
  return (
    <div className="reveal is-visible mt-6 w-full max-w-md">
      <p className="font-display mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-gold">
        Diagnóstico Espiritual
      </p>
      <h1 className="font-display gold-gradient-text mb-8 text-center text-2xl font-black leading-tight sm:text-3xl">
        Protocolo de Salomão
      </h1>

      <div
        className="rounded-2xl border border-gold-dim p-6 sm:p-8"
        style={{
          background:
            "linear-gradient(160deg, rgba(40,30,5,0.85) 0%, rgba(10,8,2,0.95) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,215,0,0.15), 0 20px 60px rgba(0,0,0,0.7)",
        }}
      >
        <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-500">
          <span>
            Pergunta {index + 1} de {total}
          </span>
          <span className="text-gold/70">Sigilo Ativo</span>
        </div>
        <h2 className="font-display mb-6 text-center text-lg leading-snug text-neutral-100 sm:text-xl">
          {question}
        </h2>
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={onAnswer}
              className="group w-full rounded-xl border border-gold-dim bg-black/60 px-5 py-4 text-left text-sm text-neutral-200 transition hover:border-gold hover:bg-[#1a1408] hover:text-gold-light sm:text-base"
            >
              <span className="mr-2 text-gold">›</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-[10px] uppercase tracking-widest text-neutral-600">
        Suas respostas são analisadas em tempo real
      </p>
    </div>
  );
}

function LoadingStep() {
  return (
    <div className="reveal is-visible mt-20 flex w-full flex-col items-center text-center">
      <div className="relative h-24 w-24">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "3px solid rgba(255,215,0,0.15)",
            borderTopColor: "#ffd700",
            animation: "spin 1.1s linear infinite",
            boxShadow: "0 0 40px rgba(255,215,0,0.35)",
          }}
        />
        <div
          className="absolute inset-3 rounded-full"
          style={{
            border: "2px solid rgba(255,215,0,0.1)",
            borderBottomColor: "#ffd700",
            animation: "spin 1.6s linear infinite reverse",
          }}
        />
      </div>
      <h2 className="font-display gold-gradient-text mt-10 text-xl font-bold uppercase tracking-wider sm:text-2xl">
        Analisando sua linhagem hereditária...
      </h2>
      <p className="mt-3 text-sm text-neutral-400">
        Cruzando dados com o Protocolo de Salomão...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SalesStep({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={innerRef} className="reveal is-visible flex w-full flex-col items-center">
      <div className="alert-blink mb-8 w-full rounded-md border border-[#ff3b3b]/60 bg-[#1a0000]/80 px-4 py-2.5 text-center backdrop-blur-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff6b6b] sm:text-xs">
          ⚠️ Sistema Bloqueado: Sua Escassez Foi Rastreada
        </p>
      </div>

      <h1 className="font-display gold-gradient-text text-center text-3xl font-black leading-[1.1] sm:text-5xl">
        O SELO DE SALOMÃO
        <br />
        FOI REVELADO
      </h1>
      <p className="mt-4 max-w-md text-center text-sm text-neutral-400 sm:text-base">
        Seu diagnóstico confirmou a presença da Maldição da Escassez Hereditária.
      </p>

      <div className="artifact-float relative mt-12">
        <div
          className="absolute inset-0 -z-10 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.6), transparent 65%)",
          }}
        />
        <div className="gold-glow-strong flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-black sm:h-72 sm:w-72">
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

      <p className="mt-12 max-w-xl text-center text-[15px] leading-relaxed text-neutral-300 sm:text-lg">
        O diagnóstico detectou a{" "}
        <span className="text-gold font-semibold">Maldição da Escassez Hereditária</span>{" "}
        operando sobre a sua linhagem. Ao quebrar esse selo agora, você ativa a{" "}
        <span className="text-gold font-semibold">Provisão Terrena Absoluta</span> — dinheiro
        fluindo e o fim das dívidas — e garante sua{" "}
        <span className="text-gold font-semibold">Herança Divina</span>, com morada eterna nas
        mansões celestiais.
      </p>

      <div
        className="mt-10 w-full max-w-md rounded-2xl border border-gold-dim p-6 sm:p-8"
        style={{
          background:
            "linear-gradient(160deg, rgba(40,30,5,0.85) 0%, rgba(10,8,2,0.95) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,215,0,0.15), 0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h3 className="font-display gold-gradient-text mb-5 text-center text-lg font-bold uppercase tracking-widest">
          O Que Você Recebe
        </h3>
        <ul className="space-y-4">
          {[
            {
              t: "A Chave de Salomão",
              d: "O selo sagrado que rompe a maldição hereditária da escassez.",
            },
            {
              t: "Provisão Terrena",
              d: "Liberação sobrenatural de finanças e fim do ciclo das dívidas.",
            },
            {
              t: "Terreno no Reino",
              d: "Sua morada eterna registrada nas mansões celestiais.",
            },
          ].map((b) => (
            <li key={b.t} className="flex gap-3">
              <span className="mt-0.5 text-xl leading-none text-gold">✦</span>
              <div>
                <p className="font-semibold text-gold-light">{b.t}</p>
                <p className="text-sm text-neutral-400">{b.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#"
        className="gold-bar-btn font-display mt-10 block w-full max-w-md rounded-xl px-6 py-5 text-center text-base font-black uppercase leading-tight tracking-wider text-[#3a2700] no-underline sm:text-lg"
      >
        🔑 Quebrar o Selo e Ativar Meu Código
      </a>

      <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-neutral-500">
        Acesso Imediato · Pagamento Único · Sigilo Total
      </p>

      <p className="mt-12 max-w-md text-center text-[11px] leading-relaxed text-neutral-600 sm:text-xs">
        Restam apenas <span className="text-[#ff3b3b]/80">7 licenças espirituais</span>{" "}
        disponíveis para o seu IP. Se você fechar esta página, seu código será trancado e
        removido do Protocolo de Salomão.
      </p>
    </div>
  );
}