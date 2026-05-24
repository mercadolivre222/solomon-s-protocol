import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  Star, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  MessageSquare,
  BadgeAlert,
  ChevronDown
} from "lucide-react";
import lockImg from "@/assets/solomon-lock.jpg";
import stoneImg from "@/assets/stone-bg.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
      "Sim, trabalho duro mas o dinheiro simplesmente desaparece",
      "Às vezes sinto um bloqueio invisível que suga meus frutos",
    ],
  },
  {
    q: "Você carrega dívidas ou boletos acumulados que parecem nunca ter fim?",
    options: [
      "Sim, vivo sufocado por contas e parcelas recorrentes",
      "Sim, sinto que herdei essa dificuldade financeira da minha família",
    ],
  },
  {
    q: "Você percebe padrões repetitivos de perdas financeiras na sua linhagem (pais, avós)?",
    options: [
      "Sim, minha família sempre trabalhou muito e nunca prosperou realmente",
      "Sim, vejo a mesma escassez se repetindo de geração em geração",
    ],
  },
  {
    q: "Qual área da sua vida financeira mais precisa de uma liberação imediata hoje?",
    options: [
      "Quitar todas as dívidas e restaurar a paz no meu nome",
      "Multiplicar meus ganhos e ativar a abundância diária",
    ],
  },
] as const;

function Index() {
  const [step, setStep] = useState<Step>("quiz");
  const [qIndex, setQIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const salesRef = useRef<HTMLDivElement>(null);

  const onAnswer = (option: string) => {
    setSelectedOption(option);
    
    // Pause briefly to show selected state animation, then transition
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        if (qIndex < QUESTIONS.length - 1) {
          setQIndex(qIndex + 1);
          setSelectedOption(null);
          setIsTransitioning(false);
        } else {
          setStep("loading");
        }
      }, 250);
    }, 400);
  };

  const handleLoadingComplete = () => {
    setStep("sales");
    setTimeout(() => {
      salesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main
      className="min-h-screen w-full text-foreground select-none overflow-x-hidden"
      style={{
        backgroundColor: "#000",
        backgroundImage: `radial-gradient(ellipse at top, rgba(255,215,0,0.08), transparent 55%), radial-gradient(ellipse at bottom, rgba(139,69,19,0.06), transparent 65%), url(${stoneImg})`,
        backgroundSize: "cover, cover, 700px",
        backgroundBlendMode: "screen, screen, overlay",
        backgroundRepeat: "no-repeat, no-repeat, repeat",
      }}
    >
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-4 pb-20 pt-6 sm:pt-12">
        {step === "quiz" && (
          <QuizStep
            index={qIndex}
            total={QUESTIONS.length}
            question={QUESTIONS[qIndex].q}
            options={QUESTIONS[qIndex].options}
            onAnswer={onAnswer}
            isTransitioning={isTransitioning}
            selectedOption={selectedOption}
          />
        )}
        {step === "loading" && <LoadingStep onComplete={handleLoadingComplete} />}
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
  isTransitioning,
  selectedOption,
}: {
  index: number;
  total: number;
  question: string;
  options: readonly string[];
  onAnswer: (opt: string) => void;
  isTransitioning: boolean;
  selectedOption: string | null;
}) {
  const progressPercentage = ((index + 1) / total) * 100;

  return (
    <div className={`reveal is-visible mt-4 w-full max-w-md transition-all duration-300 ${isTransitioning ? "opacity-0 scale-95 translate-y-2" : "opacity-100 scale-100 translate-y-0"}`}>
      <p className="font-display mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-gold flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-gold animate-pulse" />
        Diagnóstico Espiritual Ativo
      </p>
      
      <h1 className="font-display gold-gradient-text mb-6 text-center text-2xl font-black leading-tight sm:text-3xl">
        Protocolo de Salomão
      </h1>

      {/* Progress Bar Container */}
      <div className="mb-6 w-full px-1">
        <div className="flex justify-between items-center text-[10px] text-neutral-400 mb-2 uppercase tracking-wider font-semibold">
          <span>ETAPA {index + 1} DE {total}</span>
          <span className="text-gold-light animate-pulse">{Math.round(progressPercentage)}% CONCLUÍDO</span>
        </div>
        <div className="h-1.5 w-full bg-black/40 rounded-full border border-gold-dim/40 p-0.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,215,0,0.5)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div
        className="rounded-2xl border border-gold-dim p-6 sm:p-8 relative"
        style={{
          background:
            "linear-gradient(160deg, rgba(30,22,4,0.92) 0%, rgba(10,8,2,0.98) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,215,0,0.15), 0 20px 50px rgba(0,0,0,0.85)",
        }}
      >
        {/* Glow corner elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40 rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40 rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40 rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40 rounded-br-2xl pointer-events-none" />

        <div className="mb-5 flex items-center justify-between text-[9px] uppercase tracking-widest text-neutral-500 font-semibold border-b border-gold-dim/20 pb-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Criptografia Ativa
          </span>
          <span className="text-gold/70 flex items-center gap-1">
            <Lock className="h-2.5 w-2.5" />
            CONEXÃO SEGURA
          </span>
        </div>

        <h2 className="font-display mb-6 text-center text-lg leading-snug text-neutral-100 sm:text-xl font-bold px-2">
          {question}
        </h2>

        <div className="flex flex-col gap-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onAnswer(opt)}
                disabled={selectedOption !== null}
                className={`group w-full text-left text-sm rounded-xl px-5 py-4 transition-all duration-300 relative border flex items-center justify-between outline-none cursor-pointer sm:text-base ${
                  isSelected
                    ? "border-gold bg-gold-deep/30 text-gold-light scale-[1.01] shadow-[0_0_15px_rgba(255,215,0,0.25)]"
                    : "border-gold-dim/40 bg-black/50 text-neutral-300 hover:border-gold hover:bg-[#1a1408]/80 hover:text-gold-light hover:scale-[1.005]"
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <span className={`text-xs transition-colors duration-300 font-serif ${isSelected ? "text-gold animate-bounce" : "text-gold/60 group-hover:text-gold"}`}>
                    ✦
                  </span>
                  <span>{opt}</span>
                </div>
                
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isSelected 
                    ? "border-gold bg-gold text-neutral-900" 
                    : "border-neutral-700 bg-black/40 group-hover:border-gold/60"
                }`}>
                  {isSelected ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-5 text-center text-[9px] uppercase tracking-[0.18em] text-neutral-500 font-medium flex items-center justify-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        Análise espiritual e comportamental em tempo real
      </p>
    </div>
  );
}

function LoadingStep({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    "Estabelecendo conexão espiritual criptografada...",
    "Rastreando assinaturas e selos de escassez hereditária...",
    "Consultando registros históricos do Protocolo de Salomão...",
    "Decodificando frequências vibracionais de endividamento...",
    "Identificando chaves de liberação para sua linhagem...",
    "Selo de Escassez Detectado! Gerando diagnóstico final..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }
        return prev + 1;
      });
    }, 45); // ~4.5 seconds

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < statusMessages.length - 1 ? prev + 1 : prev));
    }, 750);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="reveal is-visible mt-20 flex w-full max-w-md flex-col items-center text-center px-4">
      {/* Immersive radial glow spinning */}
      <div className="relative h-28 w-28 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "4px solid rgba(255,215,0,0.05)",
            borderTopColor: "#ffd700",
            animation: "spin 1s linear infinite",
            boxShadow: "0 0 50px rgba(255,215,0,0.25)",
          }}
        />
        <div
          className="absolute inset-4 rounded-full"
          style={{
            border: "3px solid rgba(255,215,0,0.05)",
            borderBottomColor: "#ffe97a",
            animation: "spin 1.5s linear infinite reverse",
          }}
        />
        <span className="font-display text-xl font-black text-gold tracking-widest">{progress}%</span>
      </div>

      <h2 className="font-display gold-gradient-text mt-10 text-xl font-bold uppercase tracking-wider h-16 flex items-center justify-center leading-snug">
        {statusMessages[statusIndex]}
      </h2>
      
      {/* Elegant Progress bar track */}
      <div className="mt-6 w-full h-2 bg-black/60 rounded-full border border-gold-dim p-0.5 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(255,215,0,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-5 text-[9px] tracking-[0.25em] text-neutral-500 uppercase flex items-center gap-2 font-semibold">
        <Sparkles className="h-3 w-3 text-gold animate-pulse" />
        Processamento e Criptografia
      </p>
      
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState(597); // 9 minutes and 57 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 rounded-xl bg-black/60 border border-[#ff3b3b]/30 px-3.5 py-2 text-[11px] font-bold text-[#ff6b6b] tracking-wider shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <Clock className="h-3.5 w-3.5 animate-pulse text-[#ff4c4c]" />
      <span>SUA VAGA EXPIRA EM:</span>
      <span className="font-mono text-[12px] font-black tracking-widest text-[#ff4c4c]">{formatTime(time)}</span>
    </div>
  );
}

function ScarcityCounter() {
  const [count, setCount] = useState(7);

  useEffect(() => {
    // Random decrease in available seats to mimic active signups
    const interval = setTimeout(() => {
      if (count > 3) {
        setCount(count - 1);
      }
    }, 12000);

    return () => clearTimeout(interval);
  }, [count]);

  return (
    <p className="mt-4 text-center text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-semibold">
      Restam apenas <span className="text-[#ff4c4c] font-black underline decoration-2">{count} licenças espirituais</span> para o seu IP.
    </p>
  );
}

function TestimonialsSection() {
  const testimonies = [
    {
      name: "Carlos Eduardo Mendes",
      role: "Empreendedor, SP",
      text: "Senti o peso das dívidas de minha família sumirem na primeira semana. O Protocolo me deu o direcionamento exato para quebrar a escassez hereditária. Hoje vivo em provisão extraordinária.",
      initials: "CM"
    },
    {
      name: "Dra. Elizabeth Ramos",
      role: "Líder Comunitária, MG",
      text: "Sempre fomos trabalhadores, mas vivíamos devendo. Após quebrar o selo hereditário da escassez, minha situação financeira mudou de forma extraordinária. Recomendo imensamente.",
      initials: "ER"
    },
    {
      name: "Pastor Roberto Silveira",
      role: "Ministro Religioso, RJ",
      text: "Decodificar as chaves espirituais me trouxe uma paz imensa. Senti uma verdadeira barreira invisível caindo. Minhas economias e paz familiar foram restauradas.",
      initials: "RS"
    }
  ];

  return (
    <div className="mt-14 w-full">
      <h3 className="font-display gold-gradient-text text-center text-xl font-bold uppercase tracking-widest mb-6">
        Testemunhos de Libertação
      </h3>
      <div className="flex flex-col gap-4">
        {testimonies.map((t, i) => (
          <div 
            key={i} 
            className="rounded-2xl border border-gold-dim/20 p-5 transition duration-300 hover:border-gold-dim relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(20,15,5,0.75) 0%, rgba(5,4,2,0.9) 100%)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex gap-4.5">
              <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-display font-black text-sm bg-gradient-to-br from-gold via-gold-deep to-amber-950 text-black border border-gold/40 shadow-inner">
                {t.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h4 className="font-display font-bold text-sm text-neutral-100 flex items-center gap-1.5">
                      {t.name}
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500/10 stroke-[2.5]" />
                    </h4>
                    <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-gold">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-3 w-3 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mt-14 w-full">
      <h3 className="font-display gold-gradient-text text-center text-xl font-bold uppercase tracking-widest mb-6">
        Perguntas Frequentes
      </h3>
      <Accordion type="single" collapsible className="w-full space-y-3">
        <AccordionItem value="item-1" className="border border-gold-dim/20 rounded-xl bg-black/60 px-4 transition hover:border-gold-dim/40">
          <AccordionTrigger className="text-gold-light font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
            Como o Protocolo de Salomão funciona?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-[13px] leading-relaxed pb-4">
            O Protocolo é um método prático detalhado que reúne as chaves espirituais e ferramentas reveladas na sabedoria antiga de Salomão para quebrar bloqueios hereditários invisíveis e ativar a provisão financeira na sua linhagem.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border border-gold-dim/20 rounded-xl bg-black/60 px-4 transition hover:border-gold-dim/40">
          <AccordionTrigger className="text-gold-light font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
            O acesso é imediato?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-[13px] leading-relaxed pb-4">
            Sim! Assim que o seu diagnóstico for concluído e a ativação realizada, você recebe o acesso digital imediato em seu e-mail e em seu WhatsApp com as orientações do Protocolo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border border-gold-dim/20 rounded-xl bg-black/60 px-4 transition hover:border-gold-dim/40">
          <AccordionTrigger className="text-gold-light font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
            Existe alguma garantia?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-[13px] leading-relaxed pb-4">
            Absolutamente. Oferecemos uma garantia sagrada e incondicional de 7 dias. Se você aplicar e não sentir as chaves agindo em sua vida e libertação, devolvemos todo o seu investimento integralmente.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border border-gold-dim/20 rounded-xl bg-black/60 px-4 transition hover:border-gold-dim/40">
          <AccordionTrigger className="text-gold-light font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
            Isso é seguro e sigiloso?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-[13px] leading-relaxed pb-4">
            Sim, o seu processo de ativação é processado em ambiente criptografado de nível bancário militar (SSL 256 bits) e mantido sob sigilo espiritual absoluto.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
      <div className="alert-blink mb-8 w-full rounded-xl border border-[#ff3b3b]/60 bg-[#1e0000]/90 px-4 py-3.5 text-center backdrop-blur-sm shadow-[0_0_20px_rgba(255,59,59,0.25)] flex items-center justify-center gap-2">
        <BadgeAlert className="h-4.5 w-4.5 text-[#ff4c4c] shrink-0 animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff6b6b] sm:text-xs">
          ⚠️ Sistema Bloqueado: Linhagem Sob Escassez Detectada
        </p>
      </div>

      <h1 className="font-display gold-gradient-text text-center text-3xl font-black leading-[1.1] sm:text-5xl uppercase tracking-tight">
        O SELO DE SALOMÃO
        <br />
        FOI REVELADO
      </h1>
      <p className="mt-4 max-w-md text-center text-sm text-neutral-400 sm:text-base leading-relaxed">
        Seu diagnóstico confirmou a presença da <span className="text-[#ff5c5c] font-semibold">Maldição da Escassez Hereditária</span> em sua árvore genealógica.
      </p>

      {/* Pulsing floating lock container */}
      <div className="artifact-float relative mt-12 mb-4">
        <div
          className="absolute inset-0 -z-10 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.65), transparent 60%)",
            animationDuration: "3s"
          }}
        />
        <div className="gold-glow-strong flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-black relative sm:h-72 sm:w-72 shadow-[0_0_50px_rgba(255,215,0,0.3)]">
          <img
            src={lockImg}
            alt="Cadeado dourado de Salomão"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* Floating Urgency Countdown */}
      <div className="mt-8 flex justify-center w-full">
        <CountdownTimer />
      </div>

      <p className="mt-8 max-w-xl text-center text-[15px] leading-relaxed text-neutral-300 sm:text-lg px-2">
        O diagnóstico detectou a{" "}
        <span className="text-gold font-bold">Maldição da Escassez Hereditária</span>{" "}
        operando sobre as suas finanças. Ao quebrar esse selo agora, você ativa a{" "}
        <span className="text-gold font-bold">Provisão Terrena Absoluta</span> — dinheiro
        fluindo de fontes inesperadas e o fim do ciclo das dívidas — garantindo a sua{" "}
        <span className="text-gold font-bold">Herança Divina</span>.
      </p>

      <div
        className="mt-10 w-full max-w-md rounded-2xl border border-gold-dim p-6 sm:p-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(30,22,4,0.92) 0%, rgba(10,8,2,0.98) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,215,0,0.15), 0 20px 60px rgba(0,0,0,0.85)",
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <h3 className="font-display gold-gradient-text mb-6 text-center text-lg font-bold uppercase tracking-widest border-b border-gold-dim/20 pb-3">
          O Que Você Irá Ativar
        </h3>
        <ul className="space-y-4">
          {[
            {
              t: "A Chave de Salomão",
              d: "O selo sagrado prático para quebrar em definitivo a barreira hereditária da escassez.",
            },
            {
              t: "Provisão Terrena Absoluta",
              d: "Ativação sobrenatural do fluxo financeiro e encerramento total de dívidas históricas.",
            },
            {
              t: "Garantia Sagrada de 7 Dias",
              d: "Satisfação completa com garantia divina. Zero risco para sua jornada espiritual.",
            },
          ].map((b) => (
            <li key={b.t} className="flex gap-3 items-start">
              <span className="mt-1 text-base text-gold shrink-0">✦</span>
              <div>
                <p className="font-bold text-gold-light text-sm tracking-wide">{b.t}</p>
                <p className="text-xs sm:text-sm text-neutral-400 leading-normal mt-0.5">{b.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="https://pay.kiwify.com.br/G1r08mQ"
        target="_blank"
        rel="noopener noreferrer"
        className="gold-bar-btn font-display mt-10 block w-full max-w-md rounded-2xl px-6 py-5 text-center text-base font-black uppercase leading-tight tracking-wider text-[#3a2700] no-underline shadow-[0_10px_40px_rgba(255,215,0,0.4)] transition-all duration-300 hover:scale-[1.015] sm:text-lg flex items-center justify-center gap-2 border border-gold/60 cursor-pointer"
      >
        🔑 Quebrar o Selo e Ativar Meu Código
        <ArrowRight className="h-4.5 w-4.5 stroke-[2.5]" />
      </a>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold flex items-center justify-center gap-1">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        Acesso Imediato · Criptografia SSL · Sigilo Total
      </p>

      {/* Dynamic Seat Scarcity Widget */}
      <ScarcityCounter />

      {/* Social Proof Testimonials */}
      <TestimonialsSection />

      {/* FAQ accordion */}
      <FAQSection />

      {/* Secure footer */}
      <div className="mt-16 w-full border-t border-gold-dim/15 pt-8 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-5 text-neutral-600 text-xs">
          <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> SSL Seguro</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Verificado</span>
        </div>
        <p className="max-w-md text-[10px] leading-relaxed text-neutral-600 sm:text-xs">
          O Protocolo de Salomão é um guia de sabedoria e reflexão espiritual e financeira. Se você fechar esta página, seu código temporário expira e será redirecionado para outra linhagem necessitada.
        </p>
      </div>
    </div>
  );
}