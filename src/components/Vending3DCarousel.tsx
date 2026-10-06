import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Building2,
  ShieldCheck,
  Truck,
  Leaf,
  Ticket,
  Hotel,
  Award,
  Share2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CardData {
  id: number;
  number: string;
  verb: string;
  verbIcon: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  badge: string;
  accentColor: string;
  frontMetric1: { label: string; value: string };
  frontMetric2: { label: string; value: string };
  backHeadline: string;
  backDescription: string;
  backStats: { label: string; value: string; note?: string }[];
  strategicTakeaway: string;
}

export const VENDING_CARDS: CardData[] = [
  {
    id: 0,
    number: "01",
    verb: "Coinvolgi",
    verbIcon: <Building2 className="w-3.5 h-3.5" />,
    icon: <Building2 className="w-5 h-5 text-blue-400" />,
    title: "Proposte Dirette Grandi Imprese",
    tagline: "Superamento della competizione sul prezzo della singola consumazione",
    badge: "Acquisizione C-Level",
    accentColor: "#3b82f6",
    frontMetric1: { label: "Margine di Trattativa", value: "Preservato" },
    frontMetric2: { label: "Valore Percepito HR", value: "Benefit Reale" },
    backHeadline: "Perché le grandi imprese aderiscono all'iniziativa",
    backDescription:
      "Per un'azienda strutturata il costo dei voucher welfare è marginale ed è deducibile dal reddito d'impresa (TUIR), mentre assicura agli addetti delle imprese clienti benefit esperienziali memorabili (soggiorno, enogastronomia, spettacoli gratuiti).",
    backStats: [
      { label: "Target Imprese Pilota", value: "150 aziende" },
      { label: "Interlocutore Diretto", value: "Direzione HR / AD" },
      { label: "Tasso Chiusura Stimato", value: "20% dei prospect" },
    ],
    strategicTakeaway:
      "L'operatore si posiziona come partner strategico di welfare e CSR, superando i confronti al ribasso sul listino della somministrazione.",
  },
  {
    id: 1,
    number: "02",
    verb: "Proteggi",
    verbIcon: <ShieldCheck className="w-3.5 h-3.5" />,
    icon: <ShieldCheck className="w-5 h-5 text-sky-400" />,
    title: "Customer Lifetime Value (CLV)",
    tagline: "Fidelizzazione differenziale del portafoglio storico",
    badge: "Protezione Core Business",
    accentColor: "#38bdf8",
    frontMetric1: { label: "CLV Cliente Vending", value: "€ 1.000 / 3 anni" },
    frontMetric2: { label: "Abbattimento Churn", value: "10% → 2% (-80%)" },
    backHeadline: "Protezione del fatturato storico e barriera all'uscita",
    backDescription:
      "Rendere l'operatore promotore insostituibile: un'azienda che adotta il welfare territoriale per i propri addetti non rescinde il contratto di somministrazione per differenze marginali di prezzo, evitando la revoca dei benefit al personale.",
    backStats: [
      { label: "Clienti Storici Protetti", value: "12 aziende/anno" },
      { label: "Fatturato Diretto Salvato", value: "+€ 12.000 / anno" },
      { label: "Nuovi Contratti Referral", value: "+28 clienti B2B" },
    ],
    strategicTakeaway:
      "La fidelizzazione attiva protegge la cassa operativa e stabilizza i contratti pluriennali contro offerte concorrenti.",
  },
  {
    id: 2,
    number: "03",
    verb: "Attiva",
    verbIcon: <Truck className="w-3.5 h-3.5" />,
    icon: <Truck className="w-5 h-5 text-blue-400" />,
    title: "Logistica di Rifornimento a Emissioni Zero",
    tagline: "Distribuzione Km 0 sui percorsi ordinari di manutenzione",
    badge: "Dorsale Logistica Integrata",
    accentColor: "#60a5fa",
    frontMetric1: { label: "Tratte Evitate", value: "-270.000 km" },
    frontMetric2: { label: "CO₂ Non Emessa", value: "-51,3 t / anno" },
    backHeadline: "Consegne integrate sui giri-visite programmati",
    backDescription:
      "I furgoni tecnici dell'operatore visitano regolarmente le sedi aziendali per rifornire e sanificare i distributori. La consegna dei panieri Km 0 ordinati dagli addetti delle imprese clienti avviene all'interno di quegli stessi percorsi, senza veicoli dedicati né costi logistici addizionali. Oltre a valorizzare le produzioni locali con la vendita, l'impatto ambientale è materialmente azzerato creando economie di scopo condivise.",
    backStats: [
      { label: "Ordini Km 0 Gestiti", value: "5.400 consegne/anno" },
      { label: "Fattore Emissivo Evitato", value: "0,19 kg CO₂/km" },
      { label: "Impatto Logistico Addizionale", value: "0 tratte dedicate" },
    ],
    strategicTakeaway:
      "La flotta operativa assorbe la micro-distribuzione locale generando credenziali Scope 3 GHG certificate per il bilancio di sostenibilità.",
  },
  {
    id: 3,
    number: "04",
    verb: "Valorizza",
    verbIcon: <Leaf className="w-3.5 h-3.5" />,
    icon: <Leaf className="w-5 h-5 text-blue-400" />,
    title: "Store Prodotti Territoriali a Km 0",
    tagline: "Piattaforma di acquisto diretto sul luogo di lavoro",
    badge: "Filiera Corta Territoriale",
    accentColor: "#38bdf8",
    frontMetric1: { label: "Fatturato alla Filiera", value: "€ 162.000 / anno" },
    frontMetric2: { label: "Ordini Gestiti", value: "5.400 acquisti" },
    backHeadline: "Nuovo mercato per Prodotti a Km 0",
    backDescription:
      "Gli addetti delle imprese clienti acquistano le produzioni agricole locali tramite la piattaforma dedicata, ricevendole direttamente in azienda durante il turno lavorativo, eliminando intermediari commerciali e passaggi speculativi.",
    backStats: [
      { label: "Addetti Acquirenti Attivi", value: "900 addetti (20%)" },
      { label: "Frequenza d'Acquisto", value: "6 ordini/anno" },
      { label: "Scontrino Medio Paniere", value: "€ 30,00" },
    ],
    strategicTakeaway:
      "L'operatore promotore apre un canale di sbocco primario per i coltivatori e produttori locali con consegna diretta sul posto di lavoro.",
  },
  {
    id: 4,
    number: "05",
    verb: "Sblocca",
    verbIcon: <Ticket className="w-3.5 h-3.5" />,
    icon: <Ticket className="w-5 h-5 text-blue-400" />,
    title: "Matching Grant & Budget Startup",
    tagline: "Biglietti omaggio finanziati per sbloccare le presenze",
    badge: "Matching Grant Culturale",
    accentColor: "#60a5fa",
    frontMetric1: { label: "Fondo Startup", value: "€ 56.250" },
    frontMetric2: { label: "Biglietti Omaggio", value: "2.250 erogati" },
    backHeadline: "Co-finanziamento delle presenze culturali ed eventi",
    backDescription:
      "La Startup stanzia un fondo Matching Grant erogando biglietti omaggio del valore di 25 € per ciascuna presenza diretta attivata dai voucher. L'operatore promotore non sostiene alcun onere finanziario per i biglietti.",
    backStats: [
      { label: "Costo Unitario Biglietto", value: "€ 25,00 (Startup)" },
      { label: "Oneri Diretti Promotore", value: "€ 0,00" },
      { label: "Copertura Presenze Seed", value: "100% presenze dirette" },
    ],
    strategicTakeaway:
      "La gratuità del biglietto di spettacolo sblocca la decisione del lavoratore di attivare il voucher alberghiero e la ristorazione locale a costo zero per l'operatore.",
  },
  {
    id: 5,
    number: "06",
    verb: "Orchestra",
    verbIcon: <Hotel className="w-3.5 h-3.5" />,
    icon: <Hotel className="w-5 h-5 text-sky-400" />,
    title: "Budget Welfare a Carico delle Imprese",
    tagline: "Investimento CSR finanziato al 100% dalle aziende clienti",
    badge: "Orchestrazione Piani Welfare",
    accentColor: "#38bdf8",
    frontMetric1: { label: "Spesa Imprese Partner", value: "€ 98.700" },
    frontMetric2: { label: "Presenze Attivate", value: "2.711 persone" },
    backHeadline: "Zero oneri finanziari per il promotore",
    backDescription:
      "I pernottamenti alberghieri e i voucher aperitivo-cena sono acquistati e distribuiti dalle aziende clienti per i propri dipendenti, sfruttando la detassazione dei fringe benefit. Viene fornita la piattaforma di erogazione e gestione dei Voucher conforme alla normativa, senza alcun costo aggiuntivo. Ogni impresa partecipante viene promossa con una pagina web per comunicare la sua adesione.",
    backStats: [
      { label: "Voucher Soggiorno Hotel", value: "€ 59.050 (1.181 notti)" },
      { label: "Voucher Enogastronomia Food", value: "€ 39.650 (1.586 exp)" },
      { label: "Moltiplicatore Accompagnatori", value: "2.0× presenze" },
    ],
    strategicTakeaway:
      "L'operatore orchestra flussi economici per oltre 98.000 € verso il territorio, consolidando partnership ad altissima fedeltà con le direzioni HR.",
  },
  {
    id: 6,
    number: "07",
    verb: "Certifica",
    verbIcon: <Award className="w-3.5 h-3.5" />,
    icon: <Award className="w-5 h-5 text-blue-400" />,
    title: "Punteggio Tecnico Gare & Appalti ESG",
    tagline: "Criteri premianti nei contratti di somministrazione pubblica",
    badge: "Concessioni & Appalti Pubblici",
    accentColor: "#60a5fa",
    frontMetric1: { label: "Criteri CAM & ESG", value: "Conformi" },
    frontMetric2: { label: "Punteggio Tecnico", value: "Fascia Massima" },
    backHeadline: "Aggiudicazione delle gare su criteri qualitativi e territoriali",
    backDescription:
      "I capitolati di gara per la concessione di spazi ristoro in Enti Pubblici, Università, Ospedali e Municipalizzate premiano i progetti con filiera corta documentata, riduzione comprovata delle emissioni e valorizzazione del tessuto produttivo locale.",
    backStats: [
      { label: "Dossier ESG & CAM", value: "Pronto all'uso" },
      { label: "Differenziale vs Ribasso Puro", value: "Punteggio decisivo" },
      { label: "Rendicontazione Direttiva CSRD", value: "Tracciabilità verificata" },
    ],
    strategicTakeaway:
      "Il modello fornisce credenziali qualitative che consentono di vincere appalti pubblici senza subire la pressione di ribassi economici distruttivi.",
  },
  {
    id: 7,
    number: "08",
    verb: "Espandi",
    verbIcon: <Share2 className="w-3.5 h-3.5" />,
    icon: <Share2 className="w-5 h-5 text-blue-400" />,
    title: "Funnel B2B & Certificato Welfare",
    tagline: "Acquisizione contratti generata dall'attestazione dei benefit",
    badge: "Pipeline Commerciale B2B",
    accentColor: "#3b82f6",
    frontMetric1: { label: "Nuovi Contratti B2B", value: "+28 stipule" },
    frontMetric2: { label: "Valore Portafoglio", value: "+€ 28.000 / 3y" },
    backHeadline: "Gli addetti attivano contatti commerciali qualificati",
    backDescription:
      "Riscattando i voucher ed effettuando le esperienze, gli addetti delle imprese clienti ricevono il Certificato di Partecipazione Welfare Territoriale; la condivisione spontanea con colleghi di altre realtà induce gli uffici HR di aziende terze a richiedere la medesima convenzione all'operatore.",
    backStats: [
      { label: "Prospect B2B Qualificati", value: "138 aziende" },
      { label: "Tasso Chiusura Commerciale", value: "20% dei lead" },
      { label: "Costo Acquisizione Lead (CAC)", value: "Marginale (€0 media)" },
    ],
    strategicTakeaway:
      "I beneficiari del welfare agiscono come moltiplicatore fiduciario aprendo trattative B2B pre-qualificate con altre direzioni del personale.",
  },
];

interface Vending3DCarouselProps {
  onSelectSimulator?: () => void;
}

export const Vending3DCarousel: React.FC<Vending3DCarouselProps> = ({ onSelectSimulator }) => {
  const [current, setCurrent] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [pitch, setPitch] = useState(-2);
  const [isDragging, setIsDragging] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const stageRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    startRotation: 0,
    moved: false,
  });

  const totalCards = VENDING_CARDS.length; // 8
  const step = 360 / totalCards; // 45 deg

  const modulo = (n: number, m: number) => ((n % m) + m) % m;

  const goTo = useCallback(
    (index: number) => {
      const normalizedIndex = modulo(index, totalCards);
      const baseRotation = -normalizedIndex * step;

      let targetRotation = baseRotation;
      let smallestDistance = Infinity;

      for (let turn = -2; turn <= 2; turn++) {
        const candidate = baseRotation + turn * 360;
        const distance = Math.abs(candidate - rotation);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          targetRotation = candidate;
        }
      }

      setRotation(targetRotation);
      setPitch(-2);
      setCurrent(normalizedIndex);
    },
    [rotation, step, totalCards]
  );

  const handleToggleFlip = (cardIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (current !== cardIndex) {
      goTo(cardIndex);
    }
    setFlippedCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "ArrowRight") {
        goTo(current + 1);
      } else if (e.key === "ArrowLeft") {
        goTo(current - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, goTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest(".action-btn")) return;

    dragInfo.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startRotation: rotation,
      moved: false,
    };
    setIsDragging(true);
    stageRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || e.pointerId !== dragInfo.current.pointerId) return;

    const deltaX = e.clientX - dragInfo.current.startX;
    const deltaY = e.clientY - dragInfo.current.startY;

    if (Math.hypot(deltaX, deltaY) > 5) {
      dragInfo.current.moved = true;
    }

    if (!dragInfo.current.moved) return;

    const newRotation = dragInfo.current.startRotation + deltaX * 0.35;
    const newPitch = Math.max(-8, Math.min(3, -2 - deltaY * 0.03));

    setRotation(newRotation);
    setPitch(newPitch);

    const nearest = modulo(Math.round(-newRotation / step), totalCards);
    if (nearest !== current) {
      setCurrent(nearest);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging || e.pointerId !== dragInfo.current.pointerId) return;

    if (dragInfo.current.moved) {
      const targetStep = Math.round(-rotation / step);
      const snapRotation = -targetStep * step;
      setRotation(snapRotation);
      setCurrent(modulo(targetStep, totalCards));
    }

    setIsDragging(false);
    setPitch(-2);
    if (stageRef.current?.hasPointerCapture(e.pointerId)) {
      stageRef.current.releasePointerCapture(e.pointerId);
    }
    dragInfo.current.pointerId = null;
  };

  const activeCard = VENDING_CARDS[current];

  return (
    <div className="w-full space-y-2 select-none py-1">
      {/* Top Bar with 'Simulatore' Back Button */}
      <div className="flex items-center justify-between max-w-5xl mx-auto px-2 pt-0 pb-1">
        {onSelectSimulator ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSelectSimulator}
            className="rounded-xl border-white/20 bg-slate-900/80 hover:bg-blue-600/20 hover:border-blue-400/50 text-slate-200 hover:text-white transition-all flex items-center gap-2 px-3.5 h-9 font-bold text-xs shadow-lg backdrop-blur-md cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-blue-400" />
            <span>Simulatore</span>
          </Button>
        ) : (
          <div />
        )}

        <div className="text-center">
          <Badge
            variant="outline"
            className="text-[9.5px] px-2.5 py-0.5 text-blue-400 border-blue-400/30 bg-blue-500/10 font-bold uppercase tracking-wider"
          >
            Landing Page B2B • 8 Vantaggi Strategici
          </Badge>
          <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight mt-0.5">
            Gli 8 Vantaggi Chiave per l'Operatore Vending
          </h2>
        </div>

        <div className="w-28 hidden sm:block" />
      </div>

      {/* 3D CAROUSEL STAGE CONTAINER */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2/3 h-52 rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-700"
          style={{ background: activeCard.accentColor }}
        />

        {/* The 3D Stage - Proportionate Height */}
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative h-[440px] w-full flex items-center justify-center overflow-visible touch-none cursor-grab active:cursor-grabbing focus:outline-none"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 45%",
          }}
          tabIndex={0}
        >
          {/* Subtle 3D Orbit Ring */}
          <div
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[250px] rounded-full pointer-events-none border border-white/10"
            style={{
              transform: "translate(-50%, -50%) rotateX(74deg) translateZ(-130px)",
              background:
                "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            }}
          />

          {/* The Rotating Cylinder (Carousel Hub) */}
          <div
            className="absolute top-[38%] left-1/2 w-0 h-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${pitch}deg) rotateY(${rotation}deg)`,
              transition: isDragging
                ? "none"
                : "transform 700ms cubic-bezier(0.2, 0.85, 0.25, 1)",
            }}
          >
            {VENDING_CARDS.map((card, index) => {
              const angle = index * step;
              const isActive = index === current;
              const isFlipped = !!flippedCards[index];

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (!isDragging && current !== index) {
                      goTo(index);
                    }
                  }}
                  className={`absolute top-0 left-0 w-[230px] sm:w-[245px] h-[305px] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-75 hover:opacity-90"
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(275px) ${
                      isActive ? "translateY(-8px) scale(1.0)" : "scale(0.92)"
                    }`,
                    transformStyle: "preserve-3d",
                    cursor: isActive ? "default" : "pointer",
                  }}
                >
                  {/* CARD INNER FLIPPER (3D ROTATION ON CLICK) */}
                  <div
                    className="relative w-full h-full rounded-2xl transition-transform duration-700 ease-out"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* ========================================================
                        FRONT FACE OF CARD
                        ======================================================== */}
                    <div
                      className={`absolute inset-0 rounded-2xl p-3 flex flex-col justify-between border backdrop-blur-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-slate-900/95 border-blue-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(59,130,246,0.25)] ring-1 ring-blue-400/30"
                          : "bg-slate-950/80 border-white/10 hover:border-white/20 shadow-lg"
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      {/* Top Header Row */}
                      <div>
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                          <Badge
                            variant="outline"
                            className="text-[8.5px] font-semibold text-blue-300 border-white/15 px-1.5 py-0.5 leading-none"
                          >
                            {card.badge}
                          </Badge>
                          <span className="font-mono text-[10px] font-extrabold text-slate-500">
                            {card.number} / 08
                          </span>
                        </div>

                        {/* Icon Emblem with Soft Aura */}
                        <div className="flex flex-col items-center justify-center my-1.5 text-center">
                          <div
                            className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                              isActive
                                ? "bg-blue-600/20 border-blue-400/40 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                                : "bg-white/5 border-white/10"
                            }`}
                          >
                            {card.icon}
                          </div>
                          <h3 className="font-bold text-white text-xs sm:text-[13px] mt-1.5 leading-tight line-clamp-1">
                            {card.title}
                          </h3>
                          <p className="text-slate-400 text-[9.5px] mt-0.5 px-0.5 line-clamp-1">
                            {card.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Middle Data Highlights (2 Mini-Pills) */}
                      <div className="grid grid-cols-2 gap-1.5 my-1">
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-center">
                          <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-semibold truncate">
                            {card.frontMetric1.label}
                          </span>
                          <span className="text-[11px] font-extrabold text-white mt-0.5 block truncate">
                            {card.frontMetric1.value}
                          </span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-center">
                          <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-semibold truncate">
                            {card.frontMetric2.label}
                          </span>
                          <span className="text-[11px] font-extrabold text-blue-400 mt-0.5 block truncate">
                            {card.frontMetric2.value}
                          </span>
                        </div>
                      </div>

                      {/* Card Footer: Contextual Action Button */}
                      <div className="pt-1.5 border-t border-white/10">
                        <Button
                          type="button"
                          size="sm"
                          onClick={(e) => handleToggleFlip(index, e)}
                          className={`action-btn w-full h-7 font-bold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md ${
                            isActive
                              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25"
                              : "bg-white/10 hover:bg-white/20 text-slate-200"
                          }`}
                        >
                          {card.verbIcon}
                          <span>{card.verb}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* ========================================================
                        BACK FACE OF CARD (REVEALED ON ACTION CLICK)
                        ======================================================== */}
                    <div
                      className="absolute inset-0 rounded-2xl p-3 flex flex-col justify-between border bg-slate-900/98 border-blue-400/50 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(59,130,246,0.3)] text-white ring-1 ring-blue-400/30"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div>
                        {/* Top Row Back */}
                        <div className="flex items-center justify-between pb-1 border-b border-white/10">
                          <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[10px]">
                            <Sparkles className="w-3 h-3" />
                            <span>Dettaglio Operativo</span>
                          </div>
                          <span className="font-mono text-[9.5px] text-slate-400">
                            {card.number}
                          </span>
                        </div>

                        {/* In-depth text */}
                        <div className="mt-1.5 space-y-0.5">
                          <h4 className="font-bold text-white text-[11px] leading-tight line-clamp-1">
                            {card.backHeadline}
                          </h4>
                          <p className="text-slate-300 text-[9px] leading-tight line-clamp-2">
                            {card.backDescription}
                          </p>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="mt-1.5 space-y-1">
                          {card.backStats.map((st, i) => (
                            <div
                              key={i}
                              className="p-1 px-1.5 rounded-md bg-white/5 border border-white/10 flex justify-between items-center text-[9px]"
                            >
                              <span className="text-slate-400 font-medium truncate pr-1">
                                {st.label}
                              </span>
                              <span className="font-bold text-white text-[9.5px] shrink-0">
                                {st.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strategic Takeaway & Flip-Back Button */}
                      <div className="pt-1 border-t border-white/10 space-y-1">
                        <p className="text-[8.5px] text-blue-300 italic leading-tight line-clamp-1">
                          💡 {card.strategicTakeaway}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleToggleFlip(index, e)}
                          className="action-btn w-full h-6.5 text-[9.5px] font-semibold rounded-lg border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 py-0"
                        >
                          <RotateCcw className="w-2.5 h-2.5 mr-1 text-blue-400" />
                          Torna alla scheda iniziale
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Carousel Navigation Controls */}
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Scheda precedente"
            className="absolute left-2 sm:left-4 top-[38%] -translate-y-1/2 z-20 p-2.5 rounded-full glass-panel border border-white/20 hover:border-blue-400/50 hover:bg-blue-600/20 text-white transition-all shadow-xl"
          >
            <ChevronLeft className="w-4 h-4 text-blue-400" />
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Scheda successiva"
            className="absolute right-2 sm:right-4 top-[38%] -translate-y-1/2 z-20 p-2.5 rounded-full glass-panel border border-white/20 hover:border-blue-400/50 hover:bg-blue-600/20 text-white transition-all shadow-xl"
          >
            <ChevronRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {VENDING_CARDS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Scheda ${i + 1}: ${c.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
