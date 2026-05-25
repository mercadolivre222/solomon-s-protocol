import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Star, 
  Sparkles, 
  Clock, 
  ArrowRight,
  BadgeAlert
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
  const [city, setCity] = useState("sua cidade");
  // Real-time IP Geolocation Fetch & Security Shield
  useEffect(() => {
    const cachedCity = localStorage.getItem("solomon_user_city");

    if (cachedCity) {
      setCity(cachedCity);
    } else {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 3000);

      fetch("https://ipinfo.io/json", { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          clearTimeout(timeoutId);
          if (data.city) {
            localStorage.setItem("solomon_user_city", data.city);
            setCity(data.city);
          } else {
            throw new Error("No city in ipinfo");
          }
        })
        .catch(() => {
          clearTimeout(timeoutId);
          // Try ipapi.co as a fallback
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => {
              if (data.city) {
                localStorage.setItem("solomon_user_city", data.city);
                setCity(data.city);
              } else {
                setCity("sua região");
              }
            })
            .catch(() => {
              setCity("sua região");
            });
        });
    }

    // Security Shield event handlers
    const preventDefault = (e: Event) => e.preventDefault();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Disable Ctrl+U
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Disable Ctrl+S
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Disable Ctrl+P
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Disable Ctrl+C and Ctrl+X
      if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 88)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).nodeName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);
  return (
    <main
      className="min-h-screen w-full text-foreground select-none overflow-x-hidden font-sans"
      style={{
        backgroundColor: "#080808",
        backgroundImage: "radial-gradient(circle at 50% 0%, #151515 0%, #060606 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-4 pb-20 pt-6 sm:pt-12">
        <SalesPage innerRef={salesRef} city={city} />
      </div>
    </main>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState(300);

  useEffect(() => {
    // Check if there is an existing target timestamp in localStorage
    const storedTarget = localStorage.getItem("solomon_timer_target");
    let targetTime: number;

    if (storedTarget) {
      targetTime = parseInt(storedTarget, 10);
      const remaining = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
      // If timer already expired, reset it to a new 5-minute countdown for demo/high conversion convenience
      if (remaining <= 0) {
        const newTarget = Date.now() + 300 * 1000;
        localStorage.setItem("solomon_timer_target", newTarget.toString());
        targetTime = newTarget;
        setTime(300);
      } else {
        setTime(remaining);
      }
    } else {
      const newTarget = Date.now() + 300 * 1000;
      localStorage.setItem("solomon_timer_target", newTarget.toString());
      targetTime = newTarget;
      setTime(300);
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
      setTime(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
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
function ScarcityCounter({ city }: { city: string }) {
  const isCityValid = city && city !== "sua cidade" && city !== "sua região";
  const text = isCityValid
    ? `🔴 ATENÇÃO: Restam apenas 3 licenças espirituais de liberação para a região de ${city} hoje.`
    : `🔴 ATENÇÃO: Restam apenas 3 licenças espirituais de liberação para a sua região hoje.`;

  return (
    <p id="urgency-text" className="mt-4 text-center text-xs sm:text-sm font-bold text-[#ff4c4c] leading-relaxed max-w-md px-2 uppercase tracking-wide">
      {text}
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
                <span>O dinheiro sumia misteriosamente no fim do mês</span>
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

// Facebook Comments Section
function FacebookComments() {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(65);
  const [userCity, setUserCity] = useState("MG");
  const [userComments, setUserComments] = useState<Array<{
    name: string;
    age: number;
    role: string;
    initials: string;
    text: string;
    time: string;
    likes: number;
    replies: any[];
  }>>([]);

  const initialComments = [
    {
      name: "Sebastião Gomes",
      age: 67,
      role: "Aposentado, MG",
      initials: "SG",
      text: "Minha filha me mostrou esse diagnóstico na semana passada. Estava com um pé atrás, mas aos 67 anos eu já não aguentava mais dever. Fiz a ativação e ontem mesmo recebi um valor de uma causa na justiça que estava travada há 11 anos! Deus seja louvado!",
      time: "há 2 minutos",
      likes: 42,
      replies: [
        {
          name: "Tereza Souza",
          age: 61,
          role: "Pensionista, SP",
          initials: "TS",
          text: "Seu Sebastião, também tenho 61 anos e aconteceu algo parecido comigo! Uma dívida antiga que parecia impossível de receber foi quitada anteontem. É uma sensação maravilhosa ver essa barreira caindo.",
          time: "há 1 minuto",
          likes: 9
        }
      ]
    },
    {
      name: "Maria das Graças Silva",
      age: 62,
      role: "Professora Aposentada, RJ",
      initials: "MG",
      text: "Tenho 62 anos e nós sempre fomos pessoas honestas e muito trabalhadoras, mas parecia que nossa família carregava um ralo invisível. O dinheiro sumia. Depois que ativei o Protocolo de Salomão, a provisão entrou na minha casa de um jeito extraordinário. Comprei para os meus três filhos também.",
      time: "há 12 minutos",
      likes: 56,
      replies: []
    },
    {
      name: "Geraldo de Almeida",
      age: 65,
      role: "Técnico Industrial, SP",
      initials: "GA",
      text: "Amigos, façam sem medo de errar. Eu estava desempregado, com contas acumuladas e sem dormir. Fiz a ativação do código, escutei os áudios do templo toda noite e essa semana assinei um contrato de serviço excelente. A escassez da minha linhagem acabou!",
      time: "há 24 minutos",
      likes: 31,
      replies: []
    },
    {
      name: "Helena Silveira",
      age: 59,
      role: "Dona de Casa, RS",
      initials: "HS",
      text: "Fiz o diagnóstico e parecia que estavam descrevendo a minha vida inteira. Liberei a chave e anteontem mesmo meu marido recebeu uma proposta excelente de venda de um terreno que estava parado há anos. Agradeço todos os dias por ter encontrado esse protocolo.",
      time: "há 45 minutos",
      likes: 19,
      replies: []
    }
  ];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    const initials = userName
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const comment = {
      name: userName,
      age: userAge,
      role: `Membro Ativo, ${userCity.toUpperCase()}`,
      initials: initials || "VC",
      text: newComment,
      time: "há poucos segundos",
      likes: 0,
      replies: []
    };

    setUserComments([comment, ...userComments]);
    setNewComment("");
    setUserName("");
  };

  const allComments = [...userComments, ...initialComments];

  return (
    <div className="mt-14 w-full p-0.5 rounded-2xl border border-neutral-800 bg-[#0d0d0d]/80 shadow-xl relative">
      <div className="p-5 sm:p-6 rounded-[14px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
          <h3 className="font-display font-bold text-sm tracking-widest text-[#ddc08e] uppercase flex items-center gap-2">
            💬 Discussão Ativa (Facebook Comments)
          </h3>
          <span className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase font-semibold">
            {allComments.length + 1} comentários ativos
          </span>
        </div>

        {/* Dynamic Comment Form */}
        <form onSubmit={handlePostComment} className="mb-6 p-4 rounded-xl border border-neutral-800 bg-[#121212]/50 flex flex-col gap-3">
          <p className="text-xs text-[#ddc08e] font-bold uppercase tracking-wider">Deixe seu depoimento:</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Seu nome completo"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="flex-1 bg-black/50 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#ddc08e]/50"
              required
            />
            <div className="flex gap-2">
              <input
                type="number"
                min="18"
                max="100"
                placeholder="Idade"
                value={userAge || ""}
                onChange={(e) => setUserAge(parseInt(e.target.value) || 0)}
                className="w-16 bg-black/50 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#ddc08e]/50"
                required
              />
              <input
                type="text"
                maxLength={2}
                placeholder="UF"
                value={userCity}
                onChange={(e) => setUserCity(e.target.value.toUpperCase())}
                className="w-12 bg-black/50 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#ddc08e]/50 text-center"
                required
              />
            </div>
          </div>
          <textarea
            placeholder="Compartilhe sua benção ou resultado com o Protocolo..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-black/50 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#ddc08e]/50 min-h-[65px] resize-none"
            required
          />
          <button
            type="submit"
            className="self-end bg-gradient-to-r from-[#ddc08e] to-[#b09260] text-black font-black text-[10px] uppercase px-4 py-2 rounded-lg hover:scale-[1.015] active:scale-[0.98] transition cursor-pointer"
          >
            Publicar Depoimento
          </button>
        </form>

        {/* Comment List */}
        <div className="flex flex-col gap-6">
          {allComments.map((c, i) => (
            <div key={i} className="flex gap-3 text-left">
              {/* Profile Avatar */}
              <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-display font-black text-xs bg-gradient-to-br from-[#ddc08e] via-[#b09260] to-neutral-800 text-black border border-[#ddc08e]/35 shadow-inner select-none">
                {c.initials}
              </div>
              
              {/* Comment Content */}
              <div className="flex-1">
                <div className="bg-[#121212] border border-neutral-800/40 rounded-2xl px-4 py-3 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-neutral-100 flex items-center gap-1">
                        {c.name}
                        <span className="text-[10px] text-neutral-500 font-normal">({c.age} anos)</span>
                      </span>
                      <p className="text-[9px] text-neutral-500 font-semibold uppercase tracking-wider leading-none mt-0.5">{c.role}</p>
                    </div>
                    <span className="text-[9px] text-[#ddc08e]/60 font-medium sm:mt-0 mt-1">{c.time}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed mt-2.5">
                    {c.text}
                  </p>
                </div>

                {/* Comment footer */}
                <div className="flex items-center gap-4.5 mt-2.5 pl-3 text-[10px] font-bold text-neutral-500 select-none">
                  <button className="hover:text-[#ddc08e] cursor-pointer transition">Curtir</button>
                  <span>·</span>
                  <button className="hover:text-[#ddc08e] cursor-pointer transition">Responder</button>
                  
                  <div className="flex items-center gap-1 text-[#ddc08e]/80 ml-auto bg-[#ddc08e]/5 px-2 py-0.5 border border-[#ddc08e]/10 rounded-full text-[9px] font-bold font-mono">
                    👍 {c.likes > 0 ? c.likes : 1}
                  </div>
                </div>

                {/* Sub replies */}
                {c.replies && c.replies.map((r, rIdx) => (
                  <div key={rIdx} className="flex gap-3 text-left mt-4.5 pl-3 border-l border-neutral-800">
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-display font-black text-[10px] bg-gradient-to-br from-[#ddc08e] via-[#b09260] to-neutral-800 text-black border border-[#ddc08e]/35 shadow-inner select-none">
                      {r.initials}
                    </div>
                    <div className="flex-1">
                      <div className="bg-[#161616] border border-neutral-800/40 rounded-2xl px-4 py-3 shadow-inner">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="font-bold text-[11px] sm:text-xs text-neutral-100 flex items-center gap-1">
                              {r.name}
                              <span className="text-[9px] text-neutral-500 font-normal">({r.age} anos)</span>
                            </span>
                            <p className="text-[8px] text-neutral-500 font-semibold uppercase tracking-wider leading-none mt-0.5">{r.role}</p>
                          </div>
                          <span className="text-[8px] text-[#ddc08e]/60 font-medium">{r.time}</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-neutral-300 leading-relaxed mt-2">
                          {r.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 pl-3 text-[9px] font-bold text-neutral-500 select-none">
                        <button className="hover:text-[#ddc08e] cursor-pointer transition">Curtir</button>
                        <span>·</span>
                        <button className="hover:text-[#ddc08e] cursor-pointer transition">Responder</button>
                        
                        <div className="flex items-center gap-1 text-[#ddc08e]/80 ml-auto bg-[#ddc08e]/5 px-2 py-0.5 border border-[#ddc08e]/10 rounded-full text-[8px] font-bold font-mono">
                          👍 {r.likes > 0 ? r.likes : 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Adelaide Menezes",
      age: 68,
      city: "Salvador, BA",
      text: "Eu e meu marido vivíamos de uma aposentadoria muito apertada, cheios de remédios caros para comprar todo mês. Ativamos o protocolo há 3 meses. Ganhamos uma ação judicial antiga e nosso neto nos deu um ótimo suporte. A prosperidade entrou na nossa casa definitivamente!",
      stars: 5,
      avatar: "AM"
    },
    {
      name: "Valdemar Castro",
      age: 71,
      city: "Curitiba, PR",
      text: "Sempre trabalhei de sol a sol na roça e depois na metalúrgica. Mas o dinheiro parecia que escorria pelas mãos por conta de uma maldita escassez familiar. Quebrei o selo de Salomão e, aos 71 anos, consegui comprar meu carro próprio à vista. Nunca é tarde para a provisão divina.",
      stars: 5,
      avatar: "VC"
    },
    {
      name: "Nair Rodrigues",
      age: 64,
      city: "Belo Horizonte, MG",
      text: "Minhas contas de luz e água estavam atrasadas e o desespero era muito grande. Fiz a ativação com muita fé. Dois dias depois, recebi um reembolso inesperado do banco de uma conta antiga de quase 5 mil reais! Quebrou em definitivo o ciclo da falta na minha vida.",
      stars: 5,
      avatar: "NR"
    }
  ];

  return (
    <div className="mt-14 w-full px-1 text-center">
      <h3 className="font-display gold-gradient-text text-xl font-bold uppercase tracking-widest mb-6">
        ✦ Milagres e Ativações Reais ✦
      </h3>
      <div className="flex flex-col gap-5">
        {testimonials.map((t, idx) => (
          <div 
            key={idx} 
            className="p-0.5 rounded-2xl border border-[#ddc08e]/15 bg-neutral-950/20 shadow-xl transition duration-200 hover:border-[#ddc08e]/35 text-left"
          >
            <div 
              className="p-5 sm:p-6 rounded-[14px] relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #111111 0%, #080808 100%)",
              }}
            >
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-display font-black text-sm bg-gradient-to-br from-[#ddc08e] via-[#b09260] to-neutral-800 text-black border border-[#ddc08e]/35 shadow-inner">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-100">
                        {t.name} <span className="text-xs text-neutral-500 font-normal">({t.age} anos)</span>
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{t.city}</p>
                    </div>
                    <div className="flex text-[#ddc08e] text-xs">
                      {Array.from({ length: t.stars }).map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-[#ddc08e]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
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

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      q: "O que é o Protocolo de Salomão?",
      a: "É um método prático espiritual e mental baseado nos ensinamentos de sabedoria e provisão financeira do Rei Salomão, focado em quebrar bloqueios de escassez familiar e ativar a prosperidade terrena imediata."
    },
    {
      q: "Eu já sou aposentado(a) ou idoso(a), isso funciona para a minha idade?",
      a: "Sim! A sabedoria de Salomão e as leis da provisão divina não têm idade. De fato, a maioria dos nossos membros ativos tem mais de 60 anos e relatam a quitação de dívidas históricas e liberação de valores travados (como heranças ou processos judiciais)."
    },
    {
      q: "Como vou receber o acesso ao Protocolo?",
      a: "O acesso é enviado imediatamente para o seu e-mail cadastrado logo após a confirmação do pagamento. Você receberá o guia passo a passo, os aceleradores e os áudios binaurais em formato digital seguro."
    },
    {
      q: "E se eu não ver nenhum resultado?",
      a: "Nós oferecemos uma Garantia Divina de 7 Dias. Se dentro desse período você sentir que o protocolo não ativou a prosperidade na sua vida, basta solicitar o reembolso total por e-mail ou WhatsApp de suporte. O risco é zero."
    },
    {
      q: "O pagamento é seguro e sigiloso?",
      a: "Absolutamente. Todo o processo de pagamento é intermediado pela Kiwify, uma das maiores e mais seguras plataformas de educação digital do Brasil, com criptografia SSL avançada e sigilo absoluto dos seus dados."
    }
  ];

  return (
    <div className="mt-14 w-full px-1">
      <h3 className="font-display gold-gradient-text text-center text-xl font-bold uppercase tracking-widest mb-6">
        ✦ Perguntas Frequentes ✦
      </h3>
      
      <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
        {faqs.map((faq, idx) => (
          <AccordionItem 
            key={idx} 
            value={`item-${idx}`}
            className="border border-[#ddc08e]/15 bg-neutral-950/20 rounded-xl px-4 py-1"
          >
            <AccordionTrigger className="text-left font-bold text-xs sm:text-sm text-[#ddc08e] hover:text-[#ffd700] transition py-3">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-neutral-400 leading-relaxed pb-3 pt-1">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function SalesPage({
  innerRef,
  city,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
  city: string;
}) {
  return (
    <div ref={innerRef} className="reveal is-visible flex w-full flex-col items-center">
      
      {/* Immersive Warning Container matching uploaded design exactly, customized with IP Geolocation City */}
      <div className="alert-blink mb-10 w-full rounded-2xl border border-red-500/25 bg-[#170202]/70 p-5 sm:p-6 backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.15)] flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left relative">
        <div className="absolute inset-0 rounded-2xl border border-red-500/10 pointer-events-none" />
        <div className="shrink-0 flex items-center justify-center relative w-20 h-20 bg-red-950/20 border border-red-500/10 rounded-xl">
          <svg className="w-12 h-12 text-[#ff3b3b] filter drop-shadow-[0_0_12px_rgba(255,59,59,0.75)]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-[#ff6b6b] font-display font-black tracking-[0.25em] flex items-center justify-center sm:justify-start gap-1">
            ▲ SISTEMA BLOQUEADO
          </p>
          <h3 className="font-display font-bold text-neutral-100 text-base sm:text-lg tracking-wide uppercase mt-1 leading-snug">
            LINHAGEM SOB ESCASSEZ DETECTADA EM {city.toUpperCase()}
          </h3>
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed max-w-sm">
            O cruzamento de dados identificou padrões recorrentes de endividamento e travamentos vinculados ao seu endereço IP em <span class="text-[#ff6b6b] font-bold">{city}</span>. Protocolo ativado de emergência.
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

      {/* Dynamic Seat Scarcity Widget with Geolocation City */}
      <ScarcityCounter city={city} />

      {/* Facebook Comments Section */}
      <FacebookComments />

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
          O Protocolo de Salomão é um guia de sabedoria e reflexão espiritual e financeira. Se você fechar esta página, seu código temporário expira e será redirecionado para outra linhagem necessitada em {city}.
        </p>
      </div>
    </div>
  );
}