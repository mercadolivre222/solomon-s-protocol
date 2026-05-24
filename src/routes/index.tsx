import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Star, 
  Sparkles, 
  Clock, 
  ArrowRight
} from "lucide-react";
import lockImg from "@/assets/solomon-lock.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Protocolo de Salomão — Liberação Espiritual" },
      {
        name: "description",
        content:
          "Quebre o selo da escassez hereditária e ative a Provisão Terrena Absoluta. Ativação imediata.",
      },
    ],
  }),
});

function Index() {
  const salesRef = useRef<HTMLDivElement>(null);

  return (
    <main
      className="min-h-screen w-full text-foreground select-none overflow-x-hidden font-sans"
      style={{
        backgroundColor: "#080808",
        backgroundImage: "radial-gradient(circle at 50% 0%, #151515 0%, #060606 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-4 pb-20 pt-6 sm:pt-12">
        <SalesPage innerRef={salesRef} />
      </div>
    </main>
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

function ComparisonSection() {
  return (
    <div className="mt-14 w-full px-1">
      <h3 className="font-display text-center text-xl font-bold uppercase tracking-widest mb-6" style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ddc08e 65%, #b09260 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        Diagnóstico Vibracional
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Curse Card */}
        <div className="p-0.5 rounded-xl border border-red-500/10 bg-red-950/5">
          <div className="p-5 rounded-[10px] bg-[#100505] border border-red-500/10 min-h-[175px]">
            <h4 className="font-display font-bold text-xs text-[#ff5c5c] border-b border-red-950 pb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              ☠ Maldição Hereditária
            </h4>
            <ul className="space-y-3 mt-4 text-[11px] text-neutral-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c5c] font-bold">✕</span>
                <span>O dinheiro some misteriosamente no fim do mês</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c5c] font-bold">✕</span>
                <span>Acúmulo de boletos e dívidas que nunca terminam</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c5c] font-bold">✕</span>
                <span>Esforço exaustivo com zero frutos ou economias</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Provision Card */}
        <div className="p-0.5 rounded-xl border border-[#ddc08e]/10 bg-neutral-950/20 shadow-lg">
          <div className="p-5 rounded-[10px] bg-[#121212] border border-[#ddc08e]/10 min-h-[175px]">
            <h4 className="font-display font-bold text-xs text-[#ddc08e] border-b border-neutral-900 pb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              ✦ Provisão Ativada
            </h4>
            <ul className="space-y-3 mt-4 text-[11px] text-neutral-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#ddc08e] font-bold">✔</span>
                <span>Fluxo constante de ganhos e estabilidade financeira</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ddc08e] font-bold">✔</span>
                <span>Quitação definitiva de dívidas e bloqueios no nome</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ddc08e] font-bold">✔</span>
                <span>Acesso imediato à sua prosperidade e herança divina</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderbumpSection() {
  return (
    <div className="mt-14 w-full p-0.5 rounded-2xl border border-[#ddc08e]/15 bg-neutral-950/20 shadow-2xl relative">
      <div 
        className="p-6 sm:p-8 rounded-[14px] border border-[#ddc08e]/15 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #111111 0%, #080808 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ddc08e]/5 rounded-full blur-3xl pointer-events-none" />
        
        <h3 className="font-display text-center text-lg font-bold uppercase tracking-widest border-b border-[#ddc08e]/25 pb-3" style={{
          background: "linear-gradient(180deg, #ffffff 0%, #ddc08e 75%, #b09260 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          💡 Aceleradores de Provisão
        </h3>
        
        <p className="text-xs text-neutral-400 text-center mt-3 max-w-xs mx-auto leading-relaxed">
          Você poderá selecionar estes selos adicionais diretamente no formulário de pagamento com até <span className="text-[#ddc08e] font-bold">80% de desconto</span>:
        </p>

        <div className="flex flex-col gap-4 mt-6">
          {[
            {
              title: "1. O Selo de Salomão Contra Perdas e Ralos",
              price: "R$ 19,90",
              desc: "Um escudo espiritual para travar suas finanças, impedindo que o dinheiro escape com imprevistos, acidentes ou quebras de equipamentos.",
              icon: "🛡️"
            },
            {
              title: "2. Frequências do Templo: 528Hz Binaural",
              price: "R$ 14,95",
              desc: "Coleção de áudios harmônicos para escutar dormindo. Reprograma crenças inconscientes e remove bloqueios de escassez em tempo recorde.",
              icon: "🎧"
            },
            {
              title: "3. O Manual Oculto dos Sócios de Salomão",
              price: "R$ 27,90",
              desc: "Os 7 princípios de sabedoria comercial, negociação e acumulação de ouro que Salomão usou para erguer seu templo e império.",
              icon: "📖"
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl border border-neutral-900 bg-black/60 flex items-start gap-4 transition duration-200 hover:border-[#ddc08e]/35"
            >
              <span className="text-2xl mt-0.5 shrink-0 select-none">{item.icon}</span>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-[#ddc08e] text-xs sm:text-sm tracking-wide">{item.title}</h4>
                  <span className="text-[10px] text-[#ddc08e] bg-[#ddc08e]/10 border border-[#ddc08e]/30 px-2 py-0.5 rounded-full font-black w-fit uppercase font-mono tracking-wider shrink-0">{item.price}</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonies = [
    {
      name: "Carlos Eduardo Mendes",
      role: "Empreendedor, SP",
      text: "Senti o peso das dívidas de minha família sumirem na primeira semana. O Protocolo me deu o direcionamento exato para quebrar a escassez hereditária. Hoje vivemos em provisão extraordinária.",
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
      <h3 className="font-display text-center text-xl font-bold uppercase tracking-widest mb-6" style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ddc08e 65%, #b09260 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        Testemunhos de Libertação
      </h3>
      <div className="flex flex-col gap-4">
        {testimonies.map((t, i) => (
          <div 
            key={i} 
            className="p-0.5 rounded-2xl border border-[#ddc08e]/10 bg-neutral-950/20 shadow-xl transition-all duration-300 hover:border-[#ddc08e]/35"
          >
            <div 
              className="p-5 rounded-[14px] border border-[#ddc08e]/10 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #121212 0%, #0a0a0a 100%)",
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ddc08e]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex gap-4.5">
                <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-display font-black text-sm bg-gradient-to-br from-[#ddc08e] via-[#b09260] to-neutral-900 text-black border border-[#ddc08e]/40 shadow-inner">
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
                    <div className="flex gap-0.5 text-[#ddc08e]">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="h-3 w-3 fill-[#ddc08e] text-[#ddc08e]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
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
      <h3 className="font-display text-center text-xl font-bold uppercase tracking-widest mb-6" style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ddc08e 65%, #b09260 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        Perguntas Frequentes
      </h3>
      <Accordion type="single" collapsible className="w-full space-y-3">
        <AccordionItem value="item-1" className="border border-[#ddc08e]/15 rounded-xl bg-[#121212]/95 px-4 transition hover:border-[#ddc08e]/35">
          <AccordionTrigger className="text-[#ddc08e] font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
            Como o Protocolo de Salomão funciona?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-[13px] leading-relaxed pb-4">
            O Protocolo é um método prático detalhado que reúne as chaves espirituais e ferramentas reveladas na sabedoria antiga de Salomão para quebrar bloqueios hereditários invisíveis e ativar a provisão financeira na sua linhagem.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border border-[#ddc08e]/15 rounded-xl bg-[#121212]/95 px-4 transition hover:border-[#ddc08e]/35">
          <AccordionTrigger className="text-[#ddc08e] font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
            O acesso é imediato?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-[13px] leading-relaxed pb-4">
            Sim! Assim que a sua ativação for realizada, você recebe o acesso digital imediato em seu e-mail e em seu WhatsApp com as orientações do Protocolo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border border-[#ddc08e]/15 rounded-xl bg-[#121212]/95 px-4 transition hover:border-[#ddc08e]/35">
          <AccordionTrigger className="text-[#ddc08e] font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
            Existe alguma garantia?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-[13px] leading-relaxed pb-4">
            Absolutamente. Oferecemos uma garantia sagrada e incondicional de 7 dias. Se você aplicar e não sentir as chaves agindo em sua vida e libertação, devolvemos todo o seu investimento integralmente.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border border-[#ddc08e]/15 rounded-xl bg-[#121212]/95 px-4 transition hover:border-[#ddc08e]/35">
          <AccordionTrigger className="text-[#ddc08e] font-display text-sm font-semibold tracking-wide hover:no-underline py-4">
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

function SalesPage({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={innerRef} className="reveal is-visible flex w-full flex-col items-center">
      
      {/* Immersive Warning Container matching uploaded design exactly */}
      <div className="alert-blink mb-10 w-full rounded-2xl border border-red-500/25 bg-[#170202]/70 p-5 sm:p-6 backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.15)] flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left relative">
        <div className="absolute inset-0 rounded-2xl border border-red-500/10 pointer-events-none" />
        <div className="shrink-0 flex items-center justify-center relative w-20 h-20 bg-red-950/20 border border-red-500/10 rounded-xl">
          <svg className="w-12 h-12 text-[#ff3b3b] filter drop-shadow-[0_0_12px_rgba(255,59,59,0.75)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-[#ff6b6b] font-display font-black tracking-[0.25em] flex items-center justify-center sm:justify-start gap-1">
            ▲ SISTEMA BLOQUEADO
          </p>
          <h3 className="font-display font-bold text-neutral-100 text-base sm:text-lg tracking-wide uppercase mt-1 leading-snug">
            LINHAGEM SOB ESCASSEZ DETECTADA
          </h3>
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed max-w-sm">
            O cruzamento de dados identificou padrões recorrentes de endividamento e travamentos vinculados ao seu endereço IP. Protocolo ativado de emergência.
          </p>
        </div>
      </div>

      <h1 className="font-display text-center text-3xl font-black leading-[1.1] sm:text-5xl uppercase tracking-tight" style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ddc08e 65%, #b09260 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        O SELO DE SALOMÃO
        <br />
        FOI REVELADO
      </h1>
      <p className="mt-4 max-w-md text-center text-sm text-neutral-400 sm:text-base leading-relaxed font-medium">
        Seu diagnóstico confirmou a presença da <span className="text-[#ff5c5c] font-semibold">Maldição da Escassez Hereditária</span> em sua árvore genealógica.
      </p>

      {/* Pulsing floating lock container */}
      <div className="artifact-float relative mt-12 mb-4">
        <div
          className="absolute inset-0 -z-10 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(221,192,142,0.45), transparent 60%)",
            animationDuration: "3s"
          }}
        />
        <div className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border border-[#ddc08e]/60 bg-black relative sm:h-72 sm:w-72 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-2 rounded-full border border-[#ddc08e]/20 pointer-events-none" />
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
        <span className="text-[#ddc08e] font-bold">Maldição da Escassez Hereditária</span>{" "}
        operando sobre as suas finanças. Ao quebrar esse selo agora, você ativa a{" "}
        <span className="text-[#ddc08e] font-bold">Provisão Terrena Absoluta</span> — dinheiro
        fluindo de fontes inesperadas e o fim do ciclo das dívidas — garantindo a sua{" "}
        <span className="text-[#ddc08e] font-bold">Herança Divina</span>.
      </p>

      {/* Nested Double Champagne Rounded Border Box */}
      <div className="mt-10 w-full max-w-md p-0.5 rounded-2xl border border-[#ddc08e]/15 bg-neutral-950/20 shadow-2xl relative">
        <div
          className="p-6 sm:p-8 rounded-[14px] border border-[#ddc08e]/15 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #111111 0%, #080808 100%)",
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ddc08e]/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="font-display text-center text-lg font-bold uppercase tracking-widest border-b border-[#ddc08e]/25 pb-3" style={{
            background: "linear-gradient(180deg, #ffffff 0%, #ddc08e 75%, #b09260 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            O Que Você Irá Ativar
          </h3>
          <ul className="space-y-4 mt-5">
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
                <span className="mt-1 text-base text-[#ddc08e] shrink-0">✦</span>
                <div>
                  <p className="font-bold text-[#ddc08e] text-sm tracking-wide">{b.t}</p>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-normal mt-0.5">{b.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dynamic Comparison Section */}
      <ComparisonSection />

      {/* Dynamic Orderbumps Ideas Preview */}
      <OrderbumpSection />

      <a
        href="https://pay.kiwify.com.br/G1r08mQ"
        target="_blank"
        rel="noopener noreferrer"
        className="font-display mt-14 block w-full max-w-md rounded-2xl px-6 py-5 text-center text-base font-black uppercase leading-tight tracking-wider text-[#1a1202] no-underline shadow-[0_10px_40px_rgba(221,192,142,0.25)] transition-all duration-300 hover:scale-[1.015] sm:text-lg flex items-center justify-center gap-2 border border-[#ddc08e]/70 cursor-pointer"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #ddc08e 30%, #cfae78 70%, #9e7f4c 100%)",
        }}
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
      <div className="mt-16 w-full border-t border-[#ddc08e]/10 pt-8 flex flex-col items-center gap-4 text-center">
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