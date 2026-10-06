import React, { useState, useMemo } from 'react';
import { Vending3DCarousel } from "./components/Vending3DCarousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Ticket,
  Hotel,
  TrendingUp,
  Heart,
  Share2,
  Calculator,
  Award,
  Building2,
  MapPin,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Info,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Zap,
  Gauge,
  Repeat,
  Calendar,
  Layers,
  Coins,
  Utensils,
  Briefcase,
  UserPlus,
  Percent,
  Megaphone,
  UserCheck,
  ArrowUpRight,
  Activity,
  Leaf,
  ShoppingBag,
  Truck,
  Trees,
  Copy,
  Check,
} from "lucide-react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const clampNum = (v: any, min = 0, max = Infinity) => {
  const n = Number(v);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
};

const PIE_COLORS = ["#2563eb", "#38bdf8", "#1d4ed8", "#60a5fa", "#0284c7"];

export default function ReferralSimulator() {
  const [activeTab, setActiveTab] = useState("simulatore");

  // Ascolta l'evento di ritorno dal pulsante "Simulatore" della Landing Page 3D
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.action === "GO_TO_SIMULATOR") {
        setActiveTab("simulatore");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ==========================================
  // 1. PARAMETRI CANALE WELFARE & REFERRAL CSR
  // ==========================================
  const [impreseClienti, setImpreseClienti] = useState(150);
  const [dipendentiPerImpresa, setDipendentiPerImpresa] = useState(30);

  // Tassi di Adesione / Riscatto Voucher Dipendenti (%)
  const [tassoAdesioneHotel, setTassoAdesioneHotel] = useState(16);
  const [tassoAdesioneAperitivo, setTassoAdesioneAperitivo] = useState(25);

  // Moltiplicatori Presenze Effettive / Accompagnatori (0.5x - 3.0x)
  const [moltiplicatoreHotel, setMoltiplicatoreHotel] = useState(2);
  const [moltiplicatoreAperitivo, setMoltiplicatoreAperitivo] = useState(2);

  // Dinamica Referral Welfare
  const [referralRate, setReferralRate] = useState(25);
  const [conversionRate, setConversionRate] = useState(25);
  const [invitiMediPerAmbassador, setInvitiMediPerAmbassador] = useState(5);
  const [fattoreEspansioneMercato, setFattoreEspansioneMercato] = useState(3);
  const [cicliReferral, setCicliReferral] = useState(3);
  const [costoBiglietto, setCostoBiglietto] = useState(25);

  // Valori Voucher Welfare CSR
  const [costoVoucherHotel, setCostoVoucherHotel] = useState(50);
  const [costoVoucherAperitivo, setCostoVoucherAperitivo] = useState(25);

  // Prezzi & Margini Economici Startup
  const [prezzoHotel, setPrezzoHotel] = useState(50);
  const [prezzoAperitivo, setPrezzoAperitivo] = useState(25);
  const [margineStartupHotel, setMargineStartupHotel] = useState(25);
  const [margineStartupAperitivo, setMargineStartupAperitivo] = useState(75);

  // Parametri avanzati Welfare & B2B (Pipeline & Churn Rate)
  const [showAdvancedWelfare, setShowAdvancedWelfare] = useState(false);
  const [valoreMedioAcquisto, setValoreMedioAcquisto] = useState(1000);
  // Churn Rate AS-IS e TO-BE: sostituiscono completamente la vecchia variabile di incremento retention
  const [churnRateAsIs, setChurnRateAsIs] = useState(10); // Tasso abbandono storico (es. 10%)
  const [churnRateToBe, setChurnRateToBe] = useState(2);  // Tasso abbandono post-welfare (es. 2%)
  const [nuoviProspectRate, setNuoviProspectRate] = useState(30);
  const [tassoChiusuraProspect, setTassoChiusuraProspect] = useState(20);
  const [moltiplicatoreTurismo, setMoltiplicatoreTurismo] = useState(2.5);

  // Parametri Produttori Locali a Km 0 & Sinergia ESG (Voucher Welfare)
  const [showKmZero, setShowKmZero] = useState(false);
  const [adozioneKmZero, setAdozioneKmZero] = useState(20); // % dipendenti delle imprese partner che acquistano cibo/bevande locali
  const [frequenzaAcquistiKmZero, setFrequenzaAcquistiKmZero] = useState(6); // ordini/anno
  const [scontrinoMedioKmZero, setScontrinoMedioKmZero] = useState(30); // € spesa media per ordine
  const [trattaLogisticaEvitata, setTrattaLogisticaEvitata] = useState(50); // km risparmiati per singola consegna
  const [fattoreEmissioniTrasporto, setFattoreEmissioniTrasporto] = useState(0.19); // kg CO2/km furgone diesel LCV

  // ==========================================
  // 2. PARAMETRI CANALE ADVERTISING & LOCAL EVENT LOYALTY
  // ==========================================
  const [showAdvancedEvent, setShowAdvancedEvent] = useState(false);
  const [personePerEvento, setPersonePerEvento] = useState(1000);
  const [retentionRateEvento, setRetentionRateEvento] = useState(40);
  const [invitiMediEvento, setInvitiMediEvento] = useState(5);
  const [referralRateEvento, setReferralRateEvento] = useState(20);
  const [conversionRateEvento, setConversionRateEvento] = useState(30);
  const [cicliEvento, setCicliEvento] = useState(3);
  const [spesaMediaTerritorioEvento, setSpesaMediaTerritorioEvento] = useState(50);
  const [artistiPerEvento, setArtistiPerEvento] = useState(20);

  // ==========================================
  // PRESET & RESET
  // ==========================================
  const applyPreset = (tipo: string) => {
    if (tipo === "conservativo") {
      setTassoAdesioneHotel(10);
      setTassoAdesioneAperitivo(25);
      setMoltiplicatoreHotel(1.5);
      setMoltiplicatoreAperitivo(1.5);
      setReferralRate(8);
      setConversionRate(15);
      setInvitiMediPerAmbassador(2);
      setFattoreEspansioneMercato(1.5);
      setRetentionRateEvento(25);
      setReferralRateEvento(15);
      setConversionRateEvento(20);
      setInvitiMediEvento(1.5);
    } else if (tipo === "realistico") {
      setTassoAdesioneHotel(20);
      setTassoAdesioneAperitivo(40);
      setMoltiplicatoreHotel(2.0);
      setMoltiplicatoreAperitivo(2.0);
      setReferralRate(15);
      setConversionRate(25);
      setInvitiMediPerAmbassador(3);
      setFattoreEspansioneMercato(3);
      setRetentionRateEvento(40);
      setReferralRateEvento(25);
      setConversionRateEvento(30);
      setInvitiMediEvento(2.5);
    } else if (tipo === "ottimistico") {
      setTassoAdesioneHotel(35);
      setTassoAdesioneAperitivo(60);
      setMoltiplicatoreHotel(2.5);
      setMoltiplicatoreAperitivo(2.5);
      setReferralRate(25);
      setConversionRate(35);
      setInvitiMediPerAmbassador(5);
      setFattoreEspansioneMercato(5);
      setRetentionRateEvento(55);
      setReferralRateEvento(35);
      setConversionRateEvento(40);
      setInvitiMediEvento(4);
    }
  };

  const reset = () => {
    // Welfare
    setImpreseClienti(150);
    setDipendentiPerImpresa(30);
    setTassoAdesioneHotel(16);
    setTassoAdesioneAperitivo(25);
    setMoltiplicatoreHotel(2);
    setMoltiplicatoreAperitivo(2);
    setReferralRate(25);
    setConversionRate(25);
    setInvitiMediPerAmbassador(5);
    setFattoreEspansioneMercato(3);
    setCicliReferral(3);
    setCostoBiglietto(25);
    setCostoVoucherHotel(50);
    setCostoVoucherAperitivo(25);
    setPrezzoHotel(50);
    setPrezzoAperitivo(25);
    setMargineStartupHotel(25);
    setMargineStartupAperitivo(75);
    setValoreMedioAcquisto(1000);
    setChurnRateAsIs(10);
    setChurnRateToBe(2);
    setNuoviProspectRate(30);
    setTassoChiusuraProspect(20);
    setMoltiplicatoreTurismo(2.5);

    // Km 0 & ESG
    setAdozioneKmZero(20);
    setFrequenzaAcquistiKmZero(6);
    setScontrinoMedioKmZero(30);
    setTrattaLogisticaEvitata(50);
    setFattoreEmissioniTrasporto(0.19);

    // Event Loyalty
    setPersonePerEvento(1000);
    setRetentionRateEvento(40);
    setInvitiMediEvento(5);
    setReferralRateEvento(20);
    setConversionRateEvento(30);
    setCicliEvento(3);
    setSpesaMediaTerritorioEvento(50);
    setArtistiPerEvento(20);
  };

  const [copied, setCopied] = useState(false);

  const copyCurrentConfig = () => {
    const config = {
      impreseClienti,
      dipendentiPerImpresa,
      tassoAdesioneHotel,
      tassoAdesioneAperitivo,
      moltiplicatoreHotel,
      moltiplicatoreAperitivo,
      referralRate,
      conversionRate,
      cicliReferral,
      costoBiglietto,
      costoVoucherHotel,
      costoVoucherAperitivo,
      prezzoHotel,
      margineStartupHotel,
      prezzoAperitivo,
      margineStartupAperitivo,
      invitiMediPerAmbassador,
      fattoreEspansioneMercato,
      valoreMedioAcquisto,
      churnRateAsIs,
      churnRateToBe,
      nuoviProspectRate,
      tassoChiusuraProspect,
      adozioneKmZero,
      frequenzaAcquistiKmZero,
      scontrinoMedioKmZero,
      trattaLogisticaEvitata,
      fattoreEmissioniTrasporto,
      moltiplicatoreTurismo,
      personePerEvento,
      retentionRateEvento,
      invitiMediEvento,
      referralRateEvento,
      conversionRateEvento,
      cicliEvento,
      spesaMediaTerritorioEvento,
      artistiPerEvento,
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ==========================================
  // CALCOLI E STATISTICHE
  // ==========================================
  const stats = useMemo(() => {
    // ------------------------------------------
    // A. CALCOLO CANALE WELFARE & REFERRAL CSR
    // ------------------------------------------
    const dipendentiTotaliPotenziali = impreseClienti * dipendentiPerImpresa;

    // Dipendenti effettivi che aderiscono e riscattano i voucher (Seed Iniziale)
    const dipendentiAderentiHotel =
      costoVoucherHotel > 0
        ? Math.round((dipendentiTotaliPotenziali * tassoAdesioneHotel) / 100)
        : 0;

    const dipendentiAderentiAperitivo =
      costoVoucherAperitivo > 0
        ? Math.round((dipendentiTotaliPotenziali * tassoAdesioneAperitivo) / 100)
        : 0;

    // Base Seed dei Referral Welfare: i dipendenti che hanno aderito ad almeno un voucher
    const seedPopulation = Math.max(
      1,
      costoVoucherHotel > 0 && costoVoucherAperitivo > 0
        ? Math.max(dipendentiAderentiHotel, dipendentiAderentiAperitivo)
        : costoVoucherHotel > 0
          ? dipendentiAderentiHotel
          : costoVoucherAperitivo > 0
            ? dipendentiAderentiAperitivo
            : Math.round((dipendentiTotaliPotenziali * 20) / 100)
    );

    // Presenze Dirette dei Dipendenti Seed (con Moltiplicatore Accompagnatori)
    const presenzeDiretteHotelSeed = Math.round(
      dipendentiAderentiHotel * moltiplicatoreHotel
    );
    const accompagnatoriHotelSeed = Math.max(
      0,
      presenzeDiretteHotelSeed - dipendentiAderentiHotel
    );

    const presenzeDiretteAperitivoSeed = Math.round(
      dipendentiAderentiAperitivo * moltiplicatoreAperitivo
    );
    const accompagnatoriAperitivoSeed = Math.max(
      0,
      presenzeDiretteAperitivoSeed - dipendentiAderentiAperitivo
    );

    const presenzeDiretteSeedTotali = Math.max(
      presenzeDiretteHotelSeed,
      presenzeDiretteAperitivoSeed
    );

    // Matching Grant: Biglietti omaggio erogati per coprire le presenze dirette seed
    const bigliettiDistribuiti = presenzeDiretteSeedTotali;
    const costoTotaleBiglietti = bigliettiDistribuiti * costoBiglietto;
    const costiOperatore = costoTotaleBiglietti;

    const tamEsteso = seedPopulation * fattoreEspansioneMercato;
    const kFactor =
      (referralRate / 100) * invitiMediPerAmbassador * (conversionRate / 100);

    // Evoluzione Cicli Referral (basati esclusivamente sui dipendenti aderenti seed)
    const ambassadorCiclo1 = Math.round((seedPopulation * referralRate) / 100);
    const storicoCicli = [
      {
        ciclo: 1,
        ambassador: ambassadorCiclo1,
        nuovi: seedPopulation,
        cumulativo: seedPopulation,
      },
    ];

    let waveSize = seedPopulation;
    let growthSoFar = 0;
    let cumulativeParticipants = seedPopulation;
    let saturato = false;
    let cicloSaturazione: number | null = null;
    let sommaAmbassadorWelfare = ambassadorCiclo1;

    for (let i = 1; i < cicliReferral; i++) {
      const ambassadorWave = Math.round((waveSize * referralRate) / 100);
      sommaAmbassadorWelfare += ambassadorWave;
      const rawNew = Math.round(
        (ambassadorWave * invitiMediPerAmbassador * conversionRate) / 100
      );
      const capacitaResidua = Math.max(tamEsteso - growthSoFar, 0);
      const nuoviEffettivi = Math.max(Math.min(rawNew, capacitaResidua), 0);

      growthSoFar += nuoviEffettivi;
      cumulativeParticipants += nuoviEffettivi;
      waveSize = nuoviEffettivi;

      storicoCicli.push({
        ciclo: i + 1,
        ambassador: ambassadorWave,
        nuovi: nuoviEffettivi,
        cumulativo: cumulativeParticipants,
      });

      if (nuoviEffettivi <= 0 && !saturato && i > 0 && rawNew > 0) {
        saturato = true;
        cicloSaturazione = i + 1;
      }
    }

    const pernottamenti = cumulativeParticipants;
    const saturazionePct =
      tamEsteso > 0 ? Math.min((growthSoFar / tamEsteso) * 100, 100) : 0;

    // Presenze Complessive Canale Welfare (Seed + Accompagnatori + Nuovi da Referral)
    const presenzeTotaliHotelWelfare =
      presenzeDiretteHotelSeed + (costoVoucherHotel > 0 ? growthSoFar : 0);
    const presenzeTotaliAperitivoWelfare =
      presenzeDiretteAperitivoSeed + (costoVoucherAperitivo > 0 ? growthSoFar : 0);

    const totalePersoneRaggiunteWelfare =
      seedPopulation +
      growthSoFar +
      Math.max(accompagnatoriHotelSeed, accompagnatoriAperitivoSeed);

    // Spesa Imprese CSR Partner (Voucher pagati dalle aziende)
    const spesaImpreseHotel =
      costoVoucherHotel > 0
        ? (dipendentiAderentiHotel + growthSoFar) * costoVoucherHotel
        : 0;
    const spesaImpreseAperitivo =
      costoVoucherAperitivo > 0
        ? (dipendentiAderentiAperitivo + growthSoFar) * costoVoucherAperitivo
        : 0;
    const spesaImpresePartner = spesaImpreseHotel + spesaImpreseAperitivo;

    // Ripartizione Economica Entrate (Hotel, Aperitivo, Startup)
    const volumeLordoHotel =
      costoVoucherHotel > 0 ? presenzeTotaliHotelWelfare * prezzoHotel : 0;
    const margineStartupHotelValore = volumeLordoHotel * (margineStartupHotel / 100);
    const quotaNettaHotel = volumeLordoHotel - margineStartupHotelValore;

    const volumeLordoAperitivo =
      costoVoucherAperitivo > 0
        ? presenzeTotaliAperitivoWelfare * prezzoAperitivo
        : 0;
    const margineStartupAperitivoValore =
      volumeLordoAperitivo * (margineStartupAperitivo / 100);
    const quotaNettaAperitivo = volumeLordoAperitivo - margineStartupAperitivoValore;

    const totaleRicaviStartup =
      margineStartupHotelValore + margineStartupAperitivoValore;
    const totaleVolumeVoucherGestito = volumeLordoHotel + volumeLordoAperitivo;
    const takeRateMedioStartupPct =
      totaleVolumeVoucherGestito > 0
        ? (totaleRicaviStartup / totaleVolumeVoucherGestito) * 100
        : 0;

    // Valore Economico Generato (B2B & Territorio Distinti)
    const costoVoucherTotaleUnitario = costoVoucherHotel + costoVoucherAperitivo;
    const valoreBaseVoucherTerritorio =
      spesaImpresePartner > 0 ? spesaImpresePartner : pernottamenti * 35;
    const valoreTerritorioMoltiplicato = valoreBaseVoucherTerritorio * moltiplicatoreTurismo;
    // ------------------------------------------
    // A2. INDICATORI PRODUTTORI LOCALI A KM 0 & SINERGIA ESG
    // Base di calcolo: dipendenti diretti delle imprese che erogano il voucher (NO referral)
    // ------------------------------------------
    const baseDipendentiDiretti = dipendentiTotaliPotenziali; // Imprese Clienti × Dipendenti per Impresa
    const dipendentiAttiviKmZero = Math.round((baseDipendentiDiretti * adozioneKmZero) / 100);
    const ordiniTotaliKmZero = dipendentiAttiviKmZero * frequenzaAcquistiKmZero;
    // Valore della Valorizzazione Filiera Corta Locale (OUTPUT per i produttori locali a Km 0)
    const fatturatoProduttoriKmZero = ordiniTotaliKmZero * scontrinoMedioKmZero;
    const kmLogisticaEvitati = ordiniTotaliKmZero * trattaLogisticaEvitata;
    const co2RisparmiataKg = Math.round(kmLogisticaEvitati * fattoreEmissioniTrasporto);

    // Valore Generato Territorio: Quota netta Hotel & Agriturismi + Quota netta Aperitivo & Cena + Impatto Territoriale CSR Voucher (moltiplicatore 2.5x) + Valore Valorizzazione Filiera Corta Locale (Km 0)
    const totaleValoreTerritorio =
      quotaNettaHotel +
      quotaNettaAperitivo +
      valoreTerritorioMoltiplicato +
      fatturatoProduttoriKmZero;

    const nuoviProspectB2B = Math.round((growthSoFar * nuoviProspectRate) / 100);
    const nuoviClientiB2B = Math.round(
      (nuoviProspectB2B * tassoChiusuraProspect) / 100
    );
    const valoreNuoviClienti = nuoviClientiB2B * valoreMedioAcquisto;
    // Calcolo Churn Rate differenziale (AS-IS vs TO-BE)
    // Sostituisce la retention fissa con il guadagno di retention = Churn AS-IS - Churn TO-BE (es. 10% - 2% = 8%)
    const deltaChurnRetention = Math.max(0, churnRateAsIs - churnRateToBe);
    const clientiRitenuti = Math.round((impreseClienti * deltaChurnRetention) / 100);
    const valoreRetention = clientiRitenuti * valoreMedioAcquisto;
    // Totale Valore Stimato B2B Vending (Nuovi Clienti + Retention da churn differenziale)
    const totaleValoreB2B = valoreNuoviClienti + valoreRetention;

    // Totale Benefit erogati dalla Startup (Matching Grant biglietti)
    const totaleBenefitStartup = costoTotaleBiglietti;
    const marginiNettiStartup = totaleRicaviStartup - costoTotaleBiglietti;

    // Totale Valore Welfare complessivo (B2B + Territorio)
    const valoreTotaleGeneratoWelfare = totaleValoreB2B + totaleValoreTerritorio;

    const roi =
      costiOperatore > 0
        ? ((valoreTotaleGeneratoWelfare - costiOperatore) / costiOperatore) * 100
        : 0;
    const costoPerPersona =
      totalePersoneRaggiunteWelfare > 0
        ? costiOperatore / totalePersoneRaggiunteWelfare
        : 0;

    const impreseCoinvolte = impreseClienti + nuoviClientiB2B;

    // ------------------------------------------
    // B. CALCOLO CANALE ADVERTISING & LOCAL EVENT LOYALTY
    // ------------------------------------------
    const kFactorEvento =
      (referralRateEvento / 100) * invitiMediEvento * (conversionRateEvento / 100);

    const storicoEdizioni = [];
    let prevPartecipanti = personePerEvento;
    let cumulativoPresenze = 0;
    let sommaFedeli = 0;
    let sommaNuoviReferral = 0;
    let sommaAmbassadorEventi = Math.round((personePerEvento * referralRateEvento) / 100);

    // Edizione 1 (Base)
    cumulativoPresenze += personePerEvento;
    storicoEdizioni.push({
      edizione: 1,
      label: "Edizione 1 (Base)",
      partecipantiTotali: personePerEvento,
      fedeliRitorno: 0,
      nuoviReferral: 0,
      baseIniziale: personePerEvento,
      cumulativo: cumulativoPresenze,
      indottoLocale: personePerEvento * spesaMediaTerritorioEvento,
    });

    // Edizioni successive da 2 a cicliEvento (fino a 5)
    for (let ed = 2; ed <= cicliEvento; ed++) {
      const fedeli = Math.round((prevPartecipanti * retentionRateEvento) / 100);
      const ambassador = Math.round((prevPartecipanti * referralRateEvento) / 100);
      sommaAmbassadorEventi += ambassador;
      const invitiTotali = Math.round(ambassador * invitiMediEvento);
      const nuoviDaReferral = Math.round((invitiTotali * conversionRateEvento) / 100);
      const totaleEdizione = fedeli + nuoviDaReferral;

      cumulativoPresenze += totaleEdizione;
      sommaFedeli += fedeli;
      sommaNuoviReferral += nuoviDaReferral;
      prevPartecipanti = totaleEdizione;

      storicoEdizioni.push({
        edizione: ed,
        label: `Edizione ${ed}`,
        partecipantiTotali: totaleEdizione,
        fedeliRitorno: fedeli,
        nuoviReferral: nuoviDaReferral,
        baseIniziale: 0,
        cumulativo: cumulativoPresenze,
        indottoLocale: totaleEdizione * spesaMediaTerritorioEvento,
      });
    }

    const totalePresenzeEdizioni = cumulativoPresenze;
    const indottoEconomicoEventi = totalePresenzeEdizioni * spesaMediaTerritorioEvento;
    const ultimaEdizione = storicoEdizioni[storicoEdizioni.length - 1];
    const crescitaPresenzeEdizioniPct =
      personePerEvento > 0
        ? ((ultimaEdizione.partecipantiTotali - personePerEvento) / personePerEvento) * 100
        : 0;

    const eventiValorizzati = cicliEvento;
    const artistiValorizzati = eventiValorizzati * artistiPerEvento;

    // ------------------------------------------
    // C. INDICATORI SPECIFICI DI IMPATTO REFERRAL
    // ------------------------------------------
    const upliftReferralWelfarePct =
      seedPopulation > 0 ? (growthSoFar / seedPopulation) * 100 : 0;
    const upliftReferralEventiPct =
      personePerEvento > 0 ? (sommaNuoviReferral / personePerEvento) * 100 : 0;

    const totaleInvitiWelfare = Math.round(sommaAmbassadorWelfare * invitiMediPerAmbassador);
    const totaleInvitiEventi = Math.round(sommaAmbassadorEventi * invitiMediEvento);
    const totaleNuoviReferralCombinati = growthSoFar + sommaNuoviReferral;
    const cacRisparmiatoStimato = (growthSoFar + sommaNuoviReferral) * 25; // €25 CAC medio evitato per lead/partecipante acquisito organicamente

    // ------------------------------------------
    // D. CALCOLO AGGREGATO TOTALE ECOSISTEMA
    // ------------------------------------------
    const totalePresenzeEcosistema =
      totalePersoneRaggiunteWelfare + totalePresenzeEdizioni;
    const totaleValoreEconomicoEcosistema =
      valoreTotaleGeneratoWelfare + indottoEconomicoEventi;
    const totaleEsperienzeNottiTerritorio =
      presenzeTotaliHotelWelfare +
      presenzeTotaliAperitivoWelfare +
      totalePresenzeEdizioni;

    const inputValido =
      impreseClienti > 0 && dipendentiPerImpresa > 0 && personePerEvento > 0;

    return {
      // Welfare & B2B
      dipendentiTotaliPotenziali,
      dipendentiAderentiHotel,
      dipendentiAderentiAperitivo,
      seedPopulation,
      presenzeDiretteHotelSeed,
      accompagnatoriHotelSeed,
      presenzeDiretteAperitivoSeed,
      accompagnatoriAperitivoSeed,
      presenzeDiretteSeedTotali,
      growthSoFar,
      totalePersoneRaggiunteWelfare,
      presenzeTotaliHotelWelfare,
      presenzeTotaliAperitivoWelfare,

      tamEsteso,
      kFactor,
      storicoCicli,
      bigliettiDistribuiti,
      pernottamenti,
      saturazionePct,
      saturato,
      cicloSaturazione,
      costoTotaleBiglietti,
      costoVoucherTotaleUnitario,
      spesaImpreseHotel,
      spesaImpreseAperitivo,
      spesaImpresePartner,
      costiOperatore,
      valoreTerritorio: totaleValoreTerritorio,
      valoreTerritorioMoltiplicato,
      totaleValoreTerritorio,
      totaleValoreB2B,
      totaleBenefitStartup,
      marginiNettiStartup,
      nuoviProspectB2B,
      nuoviClientiB2B,
      valoreNuoviClienti,
      deltaChurnRetention,
      clientiRitenuti,
      valoreRetention,
      valoreTotaleGeneratoWelfare,
      roi,
      costoPerPersona,
      impreseCoinvolte,
      partecipantiTotali: cumulativeParticipants,

      // Produttori Locali Km 0 & Sinergia ESG
      baseDipendentiDiretti,
      dipendentiAttiviKmZero,
      ordiniTotaliKmZero,
      fatturatoProduttoriKmZero,
      kmLogisticaEvitati,
      co2RisparmiataKg,

      // Ripartizione Entrate & Margini Startup
      volumeLordoHotel,
      quotaNettaHotel,
      margineStartupHotelValore,
      volumeLordoAperitivo,
      quotaNettaAperitivo,
      margineStartupAperitivoValore,
      totaleRicaviStartup,
      totaleVolumeVoucherGestito,
      takeRateMedioStartupPct,

      // Advertising & Local Event Loyalty
      kFactorEvento,
      storicoEdizioni,
      totalePresenzeEdizioni,
      sommaFedeli,
      sommaNuoviReferral,
      indottoEconomicoEventi,
      crescitaPresenzeEdizioniPct,
      eventiValorizzati,
      artistiValorizzati,

      // Indicatori Referral & Viralità
      upliftReferralWelfarePct,
      upliftReferralEventiPct,
      sommaAmbassadorWelfare,
      sommaAmbassadorEventi,
      totaleInvitiWelfare,
      totaleInvitiEventi,
      totaleNuoviReferralCombinati,
      cacRisparmiatoStimato,

      // Sintesi Totale Integrata
      totalePresenzeEcosistema,
      totaleValoreEconomicoEcosistema,
      totaleEsperienzeNottiTerritorio,

      inputValido,
    };
  }, [
    impreseClienti,
    dipendentiPerImpresa,
    tassoAdesioneHotel,
    tassoAdesioneAperitivo,
    moltiplicatoreHotel,
    moltiplicatoreAperitivo,
    referralRate,
    conversionRate,
    invitiMediPerAmbassador,
    fattoreEspansioneMercato,
    cicliReferral,
    costoBiglietto,
    costoVoucherHotel,
    costoVoucherAperitivo,
    prezzoHotel,
    prezzoAperitivo,
    margineStartupHotel,
    margineStartupAperitivo,
    valoreMedioAcquisto,
    churnRateAsIs,
    churnRateToBe,
    nuoviProspectRate,
    tassoChiusuraProspect,
    moltiplicatoreTurismo,
    adozioneKmZero,
    frequenzaAcquistiKmZero,
    scontrinoMedioKmZero,
    trattaLogisticaEvitata,
    fattoreEmissioniTrasporto,
    personePerEvento,
    retentionRateEvento,
    invitiMediEvento,
    referralRateEvento,
    conversionRateEvento,
    cicliEvento,
    spesaMediaTerritorioEvento,
    artistiPerEvento,
  ]);

  const formatEuro = (n: number) => {
    if (!Number.isFinite(n)) return "€ 0";
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);
  };

  const formatNum = (n: number) => {
    if (!Number.isFinite(n)) return "0";
    return new Intl.NumberFormat("it-IT").format(Math.round(n));
  };

  const growthDataWelfare = stats.storicoCicli.map((c) => ({
    name: `Ciclo ${c.ciclo}`,
    nuovi: c.nuovi,
    cumulativo: c.cumulativo,
  }));

  const valueBreakdownData = [
    { name: "Valore Territoriale (2.5×)", value: Math.round(stats.valoreTerritorioMoltiplicato) },
    { name: "Filiera Corta Km 0", value: Math.round(stats.fatturatoProduttoriKmZero) },
    { name: "Nuovi Clienti B2B", value: Math.round(stats.valoreNuoviClienti) },
    { name: "Retention B2B", value: Math.round(stats.valoreRetention) },
    { name: "Advertising & Loyalty", value: Math.round(stats.indottoEconomicoEventi) },
  ].filter((d) => d.value > 0);

  return (
    <div className="min-h-screen py-6 px-3 sm:px-6 lg:px-8 relative selection:bg-blue-600 selection:text-white">
      {/* Background ambient glow matching twilight horizon */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[10%] w-[450px] h-[350px] bg-amber-500/5 rounded-full blur-[160px]" />
      </div>

      <div className={`max-w-7xl mx-auto relative z-10 ${activeTab === "landing3d" ? "space-y-2 py-0" : "space-y-6"}`}>
        {/* Header Principale: visibile solo nelle schede ordinarie (nascosto nella Landing Page 3D a tutto schermo) */}
        {activeTab !== "landing3d" && (
          <Card className="glass-panel text-white shadow-2xl border border-white/12 p-5 sm:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 glass-pill text-blue-400 shadow-sm">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    Simulatore Welfare: Metriche di Diffusione & Impatto Territoriale Integrato
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Modellazione delle sinergie con Matching Grant di Biglietti, Welfare Aziendale, Eventi, Attività Ricettive e Qualificazione e Valorizzazione della Filiera Km 0.
                  </p>
                </div>
              </div>

              {/* Scenari rapidi globali & Copia Configurazione */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 glass-well p-1.5 border border-white/10 backdrop-blur-md">
                  <span className="text-xs font-semibold px-2 text-slate-300">Scenari:</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 px-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
                    onClick={() => applyPreset("conservativo")}
                  >
                    Conservativo
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs h-7 px-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-sm"
                    onClick={() => applyPreset("realistico")}
                  >
                    Realistico
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 px-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
                    onClick={() => applyPreset("ottimistico")}
                  >
                    Ottimistico
                  </Button>
                </div>

                {/* Pulsante Copia Parametri Attuali */}
                <Button
                  size="sm"
                  variant="outline"
                  className={`text-xs h-9 px-3.5 rounded-xl border transition-all flex items-center gap-1.5 font-semibold ${copied
                      ? "bg-emerald-500/25 text-emerald-200 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                      : "border-white/15 bg-white/5 hover:bg-white/12 text-slate-200 hover:text-white hover:border-blue-400/40"
                    }`}
                  onClick={copyCurrentConfig}
                  title="Copia tutti i parametri correnti negli appunti per inviarli in chat"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-blue-400" />
                  )}
                  <span>{copied ? "Parametri Copiati!" : "Copia Parametri"}</span>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Tab Navigazione Principale */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {activeTab !== "landing3d" && (
            <TabsList className="grid grid-cols-3 w-full max-w-2xl glass-well p-1 border border-white/10">
              <TabsTrigger value="simulatore" className="rounded-xl font-medium">
                Simulatore & Risultati
              </TabsTrigger>
              <TabsTrigger value="landing3d" className="rounded-xl font-medium">
                Vantaggi B2B (3D Landing)
              </TabsTrigger>
              <TabsTrigger value="metodologia" className="rounded-xl font-medium">
                Metodologia & Algoritmi
              </TabsTrigger>
            </TabsList>
          )}

          {/* ============ TAB SIMULATORE ============ */}
          <TabsContent value="simulatore" className="space-y-6 mt-4">
            {!stats.inputValido && (
              <Alert variant="destructive" className="border border-red-500/30 bg-red-950/40 text-red-200 shadow-lg backdrop-blur-md rounded-2xl">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <AlertTitle className="text-red-300 font-semibold">Parametri non validi</AlertTitle>
                <AlertDescription className="text-red-300/80 text-xs">
                  Assicurati che imprese clienti, dipendenti e partecipanti evento siano maggiori di zero.
                </AlertDescription>
              </Alert>
            )}

            {/* BANNER RIEPILOGATIVO A 4 METRICHE CHIAVE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* 1. Budget Startup (MATCHING GRANT) */}
              <Card className="glass-panel p-4 sm:p-5 border border-white/12 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
                    Budget Startup
                  </p>
                  <Ticket className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold mt-1 text-white">
                  {formatEuro(stats.costiOperatore)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Matching Grant: {formatNum(stats.bigliettiDistribuiti)} biglietti omaggio × €{costoBiglietto}
                </p>
              </Card>

              {/* 2. Spesa Imprese CSR Partner */}
              <Card className="glass-panel p-4 sm:p-5 border border-white/12 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
                    Spesa Imprese CSR Partner
                  </p>
                  <Building2 className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold mt-1 text-blue-400">
                  {formatEuro(stats.spesaImpresePartner)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Hotel ({formatEuro(stats.spesaImpreseHotel)}) + Aperitivo ({formatEuro(stats.spesaImpreseAperitivo)})
                </p>
              </Card>

              {/* 3. Valore Generato Complessivo */}
              <Card className="glass-panel p-4 sm:p-5 border border-white/12 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
                    Valore Generato B2B & Territorio
                  </p>
                  <Coins className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold mt-1 text-white">
                  {formatEuro(stats.valoreTotaleGeneratoWelfare)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  ROI Operatore Vending: <span className="font-bold text-blue-400">+{formatNum(stats.roi)}%</span>
                </p>
              </Card>

              {/* 4. Advertising & Local Event Loyalty Presenze */}
              <Card className="glass-panel p-4 sm:p-5 border border-white/12 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
                    Advertising & Local Event Loyalty
                  </p>
                  <Repeat className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold mt-1 text-white">
                  {formatNum(stats.totalePresenzeEdizioni)} presenze
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Su {cicliEvento} edizioni ({formatNum(stats.sommaFedeli)} ritorni + {formatNum(stats.sommaNuoviReferral)} referral)
                </p>
              </Card>
            </div>

            {/* SCHEDA DI SINTESI TOTALE COMBINATA */}
            <Card className="glass-panel text-white shadow-xl border border-white/12 p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 glass-pill text-blue-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Sintesi Totale Integrata: Impatto Territoriale CSR Voucher + Advertising & Local Event Loyalty
                    </h3>
                    <p className="text-xs text-slate-400">
                      Aggregazione complessiva dei due flussi: dipendenti e referral aziendali (Welfare CSR) + pubblico edizioni locali (Advertising)
                    </p>
                  </div>
                </div>
                <Badge variant="default" className="text-xs px-3 py-1 font-semibold self-start sm:self-auto">
                  Impatto Globale Ecosistema
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* Totale Presenze Ecosistema */}
                <div className="glass-well p-3.5 border border-white/10">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Presenze Totali Ecosistema
                  </span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {formatNum(stats.totalePresenzeEcosistema)}
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {formatNum(stats.totalePersoneRaggiunteWelfare)} (CSR) + {formatNum(stats.totalePresenzeEdizioni)} (Advertising)
                  </span>
                </div>

                {/* Valore Economico & Indotto Globale */}
                <div className="glass-well p-3.5 border border-white/10">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Valore & Indotto Globale
                  </span>
                  <p className="text-2xl font-extrabold text-blue-400 mt-1">
                    {formatEuro(stats.totaleValoreEconomicoEcosistema)}
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {formatEuro(stats.valoreTotaleGeneratoWelfare)} (CSR) + {formatEuro(stats.indottoEconomicoEventi)} (Eventi)
                  </span>
                </div>

                {/* Esperienze e Notti Generate */}
                <div className="glass-well p-3.5 border border-white/10">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Esperienze / Notti Attivate
                  </span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {formatNum(stats.totaleEsperienzeNottiTerritorio)}
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Notti Hotel + Aperitivi + Ingressi Eventi
                  </span>
                </div>

                {/* Artisti & Imprese Mobilitate */}
                <div className="glass-well p-3.5 border border-white/10">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Artisti & Imprese Attivate
                  </span>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {stats.artistiValorizzati} artisti / {stats.impreseCoinvolte} impr.
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {impreseClienti} partner iniziali + {stats.nuoviClientiB2B} nuove da Certificato Referral
                  </span>
                </div>
              </div>
            </Card>

            {/* GRIGLIA PRINCIPALE: INPUT (SX) E RISULTATI (DX) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* =========================================
                  COLONNA SINISTRA: FORMS DI CONFIGURAZIONE (ENLARGED & DISTRIBUTED)
                  ========================================= */}
              <div className="lg:col-span-6 space-y-8">

                {/* 1. CANALE WELFARE IMPRESE CSR PARTNER */}
                <Card className="glass-panel p-6 sm:p-7 border border-white/12 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 glass-pill text-blue-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          1. Canale Welfare Imprese CSR Partner
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Base aziendale, adesione ai voucher e moltiplicatori presenze
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs text-blue-300 border-white/15 self-start sm:self-auto">
                      Seed Aziendale
                    </Badge>
                  </div>

                  <div className="space-y-5">
                    {/* Imprese clienti & Dipendenti */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200">
                          Imprese Partner CSR
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={impreseClienti}
                          onChange={(e) =>
                            setImpreseClienti(clampNum(e.target.value, 0, 100000))
                          }
                          className="h-10 font-bold text-white text-base"
                        />
                        <p className="text-[11px] text-slate-400">Aziende partner che erogano il welfare</p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200">
                          Dipendenti / Impresa
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={dipendentiPerImpresa}
                          onChange={(e) =>
                            setDipendentiPerImpresa(clampNum(e.target.value, 0, 100000))
                          }
                          className="h-10 font-bold text-white text-base"
                        />
                        <p className="text-[11px] text-slate-400">Organico medio per impresa</p>
                      </div>
                    </div>

                    {/* Bacino Totale Dipendenti */}
                    <div className="glass-well p-3.5 text-xs text-slate-300 flex justify-between items-center border border-white/10">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-blue-400" />
                        Bacino Totale Dipendenti Potenziali:
                      </span>
                      <span className="font-extrabold text-sm sm:text-base text-white">
                        {formatNum(stats.dipendentiTotaliPotenziali)} dipendenti
                      </span>
                    </div>

                    {/* TASSI DI ADESIONE AI VOUCHER */}
                    <div className="glass-panel-subtle p-4 border border-white/10 space-y-4 rounded-2xl">
                      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Percent className="w-4 h-4 text-blue-400" />
                          Tassi di Riscatto & Adesione Dipendenti ai Voucher
                        </span>
                        <Badge variant="outline" className="text-[10px] text-blue-300 border-white/15">
                          Redemption
                        </Badge>
                      </div>

                      {/* Tasso Adesione Hotel */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                          <Label className="text-slate-200 font-medium flex items-center gap-1.5">
                            <Hotel className="w-3.5 h-3.5 text-blue-400" />
                            Adesione Voucher Hotel (%)
                          </Label>
                          <span className="font-bold text-white">
                            {tassoAdesioneHotel}% ({formatNum(stats.dipendentiAderentiHotel)} dipendenti)
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tassoAdesioneHotel}
                          onChange={(e) => setTassoAdesioneHotel(Number(e.target.value))}
                          className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      {/* Tasso Adesione Aperitivo */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                          <Label className="text-slate-200 font-medium flex items-center gap-1.5">
                            <Utensils className="w-3.5 h-3.5 text-blue-400" />
                            Adesione Voucher Aperitivo-Cena (%)
                          </Label>
                          <span className="font-bold text-white">
                            {tassoAdesioneAperitivo}% ({formatNum(stats.dipendentiAderentiAperitivo)} dipendenti)
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tassoAdesioneAperitivo}
                          onChange={(e) => setTassoAdesioneAperitivo(Number(e.target.value))}
                          className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="pt-2.5 border-t border-white/10 flex justify-between items-center text-xs text-slate-300">
                        <span>Base Seed Attiva per Referral Welfare:</span>
                        <span className="font-bold text-xs glass-pill text-white px-2.5 py-1 rounded-lg">
                          {formatNum(stats.seedPopulation)} aderenti con voucher
                        </span>
                      </div>
                    </div>

                    {/* MOLTIPLICATORE PRESENZE EFFETTIVE / ACCOMPAGNATORI */}
                    <div className="glass-panel-subtle p-4 border border-white/10 space-y-3.5 rounded-2xl">
                      <div className="flex justify-between items-center">
                        <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                          <UserPlus className="w-4 h-4 text-blue-400" />
                          Moltiplicatore Accompagnatori / Presenze Effettive
                        </p>
                        <span className="text-[11px] text-slate-400 font-medium">da 0.5× a 3.0×</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5 glass-well p-3 border border-white/10">
                          <div className="flex justify-between items-center">
                            <Label className="text-xs font-semibold text-slate-300">Hotel (×)</Label>
                            <span className="text-xs font-bold text-blue-400">{moltiplicatoreHotel}×</span>
                          </div>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="3.0"
                            value={moltiplicatoreHotel}
                            onChange={(e) => setMoltiplicatoreHotel(clampNum(e.target.value, 0.5, 3.0))}
                            className="h-9 text-xs sm:text-sm font-bold text-white"
                          />
                          <p className="text-[11px] text-slate-400">
                            ={formatNum(stats.presenzeDiretteHotelSeed)} notti dirette sul territorio
                          </p>
                        </div>

                        <div className="space-y-1.5 glass-well p-3 border border-white/10">
                          <div className="flex justify-between items-center">
                            <Label className="text-xs font-semibold text-slate-300">Aperitivo (×)</Label>
                            <span className="text-xs font-bold text-blue-400">{moltiplicatoreAperitivo}×</span>
                          </div>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="3.0"
                            value={moltiplicatoreAperitivo}
                            onChange={(e) => setMoltiplicatoreAperitivo(clampNum(e.target.value, 0.5, 3.0))}
                            className="h-9 text-xs sm:text-sm font-bold text-white"
                          />
                          <p className="text-[11px] text-slate-400">
                            ={formatNum(stats.presenzeDiretteAperitivoSeed)} aperitivi diretti sul territorio
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        * I moltiplicatori determinano le presenze effettive e i biglietti omaggio del matching grant ({formatNum(stats.bigliettiDistribuiti)} biglietti erogati).
                      </p>
                    </div>
                  </div>
                </Card>

                {/* 2. VALORE VOUCHER CSR & MECCANISMO MATCHING GRANT */}
                <Card className="glass-panel p-6 sm:p-7 border border-white/12 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 glass-pill text-blue-400">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          2. Valore Voucher CSR & Matching Grant
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Spesa voucher delle imprese partner, biglietto omaggio e revenue model startup
                        </p>
                      </div>
                    </div>
                    <span className="text-xs glass-pill text-blue-300 px-3 py-1 rounded-lg font-semibold self-start sm:self-auto">
                      Tot. €{stats.costoVoucherTotaleUnitario}/persona
                    </span>
                  </div>

                  <div className="space-y-5">
                    {/* VOUCHER WELFARE CSR: HOTEL & APERITIVO-CENA */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 glass-well p-3.5 border border-white/10">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                          <Hotel className="w-3.5 h-3.5 text-blue-400" />
                          Voucher Hotel CSR (€)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={costoVoucherHotel}
                          onChange={(e) =>
                            setCostoVoucherHotel(clampNum(e.target.value, 0, 10000))
                          }
                          className="h-10 font-bold text-white text-base"
                        />
                        <span className="text-[11px] text-slate-400 block">Pernottamento (0 per escludere)</span>
                      </div>

                      <div className="space-y-1.5 glass-well p-3.5 border border-white/10">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-blue-400" />
                          Voucher Aperitivo CSR (€)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={costoVoucherAperitivo}
                          onChange={(e) =>
                            setCostoVoucherAperitivo(clampNum(e.target.value, 0, 10000))
                          }
                          className="h-10 font-bold text-white text-base"
                        />
                        <span className="text-[11px] text-slate-400 block">Food & Drink (0 per escludere)</span>
                      </div>
                    </div>

                    {/* MATCHING GRANT BIGLIETTO OPERATORE VENDING */}
                    <div className="glass-well p-4 border border-white/10 space-y-2.5">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                          <Ticket className="w-4 h-4 text-blue-400" />
                          Biglietto Omaggio Operatore (Matching Grant)
                        </Label>
                        <span className="font-bold text-sm text-blue-400">€{costoBiglietto} / biglietto</span>
                      </div>
                      <Input
                        type="number"
                        min="0"
                        value={costoBiglietto}
                        onChange={(e) =>
                          setCostoBiglietto(clampNum(e.target.value, 0, 10000))
                        }
                        className="h-10 font-bold text-blue-400 text-base"
                      />
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 gap-1 border-t border-white/10">
                        <span>Investimento totale Matching Grant erogato:</span>
                        <span className="font-bold text-white">{formatEuro(stats.costiOperatore)} ({formatNum(stats.bigliettiDistribuiti)} biglietti omaggio)</span>
                      </div>
                    </div>

                    {/* PREZZI & MARGINI STARTUP */}
                    <div className="glass-panel-subtle p-4 border border-white/10 space-y-3.5 rounded-2xl">
                      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-blue-400" />
                          Prezzi Convenzionati Strutture & Margini Trattenuti Startup
                        </span>
                        <Badge variant="outline" className="text-[10px] text-blue-300 border-white/15">
                          Revenue Model
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1.5 glass-well p-3 border border-white/10">
                          <Label className="text-xs text-slate-300">Prezzo Hotel/Agriturismo (€)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={prezzoHotel}
                            onChange={(e) => setPrezzoHotel(clampNum(e.target.value, 0, 10000))}
                            className="h-8 text-xs font-semibold text-white"
                          />
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[11px] text-slate-400">Margine Startup Hotel:</span>
                            <span className="text-xs font-bold text-blue-400">{margineStartupHotel}%</span>
                          </div>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={margineStartupHotel}
                            onChange={(e) => setMargineStartupHotel(clampNum(e.target.value, 0, 100))}
                            className="h-8 text-xs font-semibold text-blue-400"
                          />
                        </div>

                        <div className="space-y-1.5 glass-well p-3 border border-white/10">
                          <Label className="text-xs text-slate-300">Prezzo Aperitivo-Cena (€)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={prezzoAperitivo}
                            onChange={(e) => setPrezzoAperitivo(clampNum(e.target.value, 0, 10000))}
                            className="h-8 text-xs font-semibold text-white"
                          />
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[11px] text-slate-400">Margine Startup Aperitivo:</span>
                            <span className="text-xs font-bold text-blue-400">{margineStartupAperitivo}%</span>
                          </div>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={margineStartupAperitivo}
                            onChange={(e) => setMargineStartupAperitivo(clampNum(e.target.value, 0, 100))}
                            className="h-8 text-xs font-semibold text-blue-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 3. VIRALITÀ REFERRAL & PIPELINE COMMERCIALE B2B */}
                <Card className="glass-panel p-6 sm:p-7 border border-white/12 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 glass-pill text-blue-400">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          3. Viralità Referral & Pipeline Commerciale B2B
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Passaparola dipendenti, retention con Churn Differenziale e nuovi contratti
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs text-blue-300 border-white/15 self-start sm:self-auto">
                      K-Factor & Retention
                    </Badge>
                  </div>

                  <div className="space-y-5">
                    {/* Referral Rate & Conversion Rate Welfare */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2 glass-well p-3.5 border border-white/10">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs sm:text-sm font-medium text-slate-200">Tasso Referral Welfare (%)</Label>
                          <Badge variant="secondary" className="text-xs font-bold">{referralRate}%</Badge>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="40"
                          value={referralRate}
                          onChange={(e) => setReferralRate(Number(e.target.value))}
                          className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <p className="text-[11px] text-slate-400">Dipendenti che condividono con colleghi/amici</p>
                      </div>

                      <div className="space-y-2 glass-well p-3.5 border border-white/10">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs sm:text-sm font-medium text-slate-200">Conversione Referral (%)</Label>
                          <Badge variant="secondary" className="text-xs font-bold">{conversionRate}%</Badge>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="50"
                          value={conversionRate}
                          onChange={(e) => setConversionRate(Number(e.target.value))}
                          className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <p className="text-[11px] text-slate-400">Inviti convertiti in partecipanti effettivi</p>
                      </div>
                    </div>

                    {/* Cicli, Inviti medi e TAM */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">Cicli Referral</Label>
                        <Input
                          type="number"
                          min="1"
                          max="6"
                          value={cicliReferral}
                          onChange={(e) => setCicliReferral(clampNum(e.target.value, 1, 6))}
                          className="h-9 font-semibold text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">Inviti medi/ambass.</Label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={invitiMediPerAmbassador}
                          onChange={(e) => setInvitiMediPerAmbassador(clampNum(e.target.value, 1, 10))}
                          className="h-9 font-semibold text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">Fattore TAM (×)</Label>
                        <Input
                          type="number"
                          step="0.5"
                          min="1"
                          max="10"
                          value={fattoreEspansioneMercato}
                          onChange={(e) => setFattoreEspansioneMercato(clampNum(e.target.value, 1, 10))}
                          className="h-9 font-semibold text-white"
                        />
                      </div>
                    </div>

                    {/* Pipeline B2B & Churn Differenziale */}
                    <div className="glass-panel-subtle p-4 border border-white/10 space-y-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-blue-400" />
                          Fidelizzazione B2B & Churn Rate Differenziale
                        </p>
                        <Badge variant="outline" className="text-[10px] text-blue-300 border-white/15">
                          Δ +{stats.deltaChurnRetention}% retention
                        </Badge>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-300">Customer Lifetime Value (CLV) Cliente B2B Vending (€ / 3 anni)</Label>
                        <Input
                          type="number"
                          value={valoreMedioAcquisto}
                          onChange={(e) => setValoreMedioAcquisto(clampNum(e.target.value, 0, 100000))}
                          className="h-10 font-bold text-white text-base"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-3 glass-well border border-white/10 rounded-xl space-y-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <Label className="text-xs font-bold text-slate-300">Churn AS-IS (%)</Label>
                            <span className="text-xs text-slate-400 font-semibold">{churnRateAsIs}%</span>
                          </div>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={churnRateAsIs}
                            onChange={(e) => setChurnRateAsIs(clampNum(e.target.value, 0, 100))}
                            className="h-8 text-xs font-semibold text-white"
                          />
                          <span className="text-[10px] text-slate-400 block">Tasso di abbandono storico pre-welfare</span>
                        </div>

                        <div className="p-3 glass-well border border-white/10 rounded-xl space-y-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <Label className="text-xs font-bold text-slate-300">Churn TO-BE (%)</Label>
                            <span className="text-xs text-blue-400 font-semibold">{churnRateToBe}%</span>
                          </div>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={churnRateToBe}
                            onChange={(e) => setChurnRateToBe(clampNum(e.target.value, 0, 100))}
                            className="h-8 text-xs font-semibold text-white"
                          />
                          <span className="text-[10px] text-slate-400 block">Post-welfare ({stats.clientiRitenuti} imprese più fedeli)</span>
                        </div>
                      </div>

                      {/* Nuovi Prospect B2B */}
                      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10">
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-300">% Nuovi Prospect B2B</Label>
                          <Input
                            type="number"
                            value={nuoviProspectRate}
                            onChange={(e) => setNuoviProspectRate(clampNum(e.target.value, 0, 100))}
                            className="h-9 text-white font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-300">Chiusura Prospect (%)</Label>
                          <Input
                            type="number"
                            value={tassoChiusuraProspect}
                            onChange={(e) => setTassoChiusuraProspect(clampNum(e.target.value, 0, 100))}
                            className="h-9 text-white font-semibold"
                          />
                        </div>
                      </div>

                      <div className="p-2.5 glass-well border border-white/10 flex justify-between items-center text-xs">
                        <span className="text-slate-300">Nuovi Clienti B2B Acquisiti:</span>
                        <span className="font-bold text-white text-sm">+{stats.nuoviClientiB2B} contratti B2B ({formatEuro(stats.valoreNuoviClienti)})</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 4. STORE PRODUTTORI LOCALI KM 0 & SINERGIA ESG */}
                <Card className="glass-panel p-6 sm:p-7 border border-white/12 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 glass-pill text-blue-400">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          4. Produttori Locali Filiera Corta Km 0 & ESG
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Promozione e vendita dei produttori del territorio ai dipendenti delle imprese partner
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs text-blue-300 border-white/15 self-start sm:self-auto">
                      Base: {formatNum(stats.baseDipendentiDiretti)} dip. diretti
                    </Badge>
                  </div>

                  <div className="space-y-5">
                    <p className="text-xs text-slate-300 leading-relaxed glass-well p-3 border border-white/10">
                      * La base di calcolo sono i dipendenti delle imprese partner che erogano i Voucher (esclusi referral).
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 glass-well p-3.5 border border-white/10">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs sm:text-sm font-semibold text-slate-200">Adozione Store Km 0 (%)</Label>
                          <span className="text-xs font-bold text-blue-400">{adozioneKmZero}%</span>
                        </div>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={adozioneKmZero}
                          onChange={(e) => setAdozioneKmZero(clampNum(e.target.value, 0, 100))}
                          className="h-10 text-base font-bold text-white"
                        />
                        <span className="text-[11px] text-slate-400 block">
                          ={stats.dipendentiAttiviKmZero} acquirenti dipendenti attivi
                        </span>
                      </div>

                      <div className="space-y-1.5 glass-well p-3.5 border border-white/10">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs sm:text-sm font-semibold text-slate-200">Frequenza Acquisti (ordini/anno)</Label>
                          <span className="text-xs font-bold text-blue-400">{frequenzaAcquistiKmZero}</span>
                        </div>
                        <Input
                          type="number"
                          min="1"
                          max="52"
                          value={frequenzaAcquistiKmZero}
                          onChange={(e) => setFrequenzaAcquistiKmZero(clampNum(e.target.value, 1, 52))}
                          className="h-10 text-base font-bold text-white"
                        />
                        <span className="text-[11px] text-slate-400 block">
                          ={formatNum(stats.ordiniTotaliKmZero)} ordini totali generati/anno
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 glass-well p-3.5 border border-white/10">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200">Scontrino Medio Km 0 (€)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={scontrinoMedioKmZero}
                          onChange={(e) => setScontrinoMedioKmZero(clampNum(e.target.value, 0, 1000))}
                          className="h-10 text-base font-bold text-white"
                        />
                        <span className="text-[11px] text-slate-400 block">
                          Indotto Diretto Filiera: <strong className="text-white">{formatEuro(stats.fatturatoProduttoriKmZero)}</strong>
                        </span>
                      </div>

                      <div className="space-y-1.5 glass-well p-3.5 border border-white/10">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200">Tratta Evitata (km/consegna)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={trattaLogisticaEvitata}
                          onChange={(e) => setTrattaLogisticaEvitata(clampNum(e.target.value, 0, 500))}
                          className="h-10 text-base font-bold text-white"
                        />
                        <span className="text-[11px] text-slate-400 block">
                          -{formatNum(stats.kmLogisticaEvitati)} km di trasporto merci evitati
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 glass-panel-subtle border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm text-slate-200 font-semibold flex items-center gap-1.5">
                        <Trees className="w-4 h-4 text-blue-400" />
                        CO₂ Risparmiata Stimata (ESG):
                      </span>
                      <span className="font-extrabold text-sm sm:text-base text-white">
                        -{formatNum(stats.co2RisparmiataKg)} kg CO₂/anno
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs font-semibold text-slate-300">Moltiplicatore Turismo indotto</Label>
                        <span className="text-xs font-bold text-blue-400">{moltiplicatoreTurismo}×</span>
                      </div>
                      <Input
                        type="number"
                        step="0.1"
                        value={moltiplicatoreTurismo}
                        onChange={(e) => setMoltiplicatoreTurismo(clampNum(e.target.value, 1, 10))}
                        className="h-10 text-white font-bold"
                      />
                    </div>
                  </div>
                </Card>

                {/* 5. CANALE ADVERTISING & LOCAL EVENT LOYALTY */}
                <Card className="glass-panel p-6 sm:p-7 border border-white/12 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 glass-pill text-blue-400">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          5. Advertising & Local Event Loyalty
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Campagna di Advertising: Fidelizzazione e passaparola per edizioni successive sul territorio
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs font-semibold text-slate-300 border-white/15 self-start sm:self-auto">
                      Edizioni Successive
                    </Badge>
                  </div>

                  <div className="space-y-5">
                    {/* Persone per Evento Iniziale */}
                    <div className="space-y-1.5 glass-well p-4 border border-white/10">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-blue-400" />
                          Partecipanti Base per Evento (Edizione 1)
                        </Label>
                        <span className="text-xs text-slate-400 font-mono">Seed Evento</span>
                      </div>
                      <Input
                        type="number"
                        min="10"
                        value={personePerEvento}
                        onChange={(e) =>
                          setPersonePerEvento(clampNum(e.target.value, 1, 1000000))
                        }
                        className="h-11 font-extrabold text-lg sm:text-xl text-white"
                      />
                      <p className="text-[11px] text-slate-400">
                        Capienza e affluenza iniziale del primo evento sul territorio.
                      </p>
                    </div>

                    {/* a) Tasso di Retention */}
                    <div className="space-y-2 glass-well p-4 border border-white/10">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs sm:text-sm font-medium text-slate-200">
                          a) Tasso di Retention Partecipanti (%)
                        </Label>
                        <Badge variant="secondary" className="font-bold text-xs">
                          {retentionRateEvento}%
                        </Badge>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="90"
                        value={retentionRateEvento}
                        onChange={(e) => setRetentionRateEvento(Number(e.target.value))}
                        className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <p className="text-[11px] text-slate-400">
                        Partecipanti che tornano spontaneamente all'edizione successiva
                      </p>
                    </div>

                    {/* b) & c) Inviti medi & Tasso di Referral */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <Label className="text-xs sm:text-sm font-medium text-slate-200">
                          b) Inviti medi / persona
                        </Label>
                        <Input
                          type="number"
                          step="0.5"
                          min="1"
                          max="10"
                          value={invitiMediEvento}
                          onChange={(e) => setInvitiMediEvento(clampNum(e.target.value, 0.5, 20))}
                          className="h-10 font-semibold text-white text-base"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs sm:text-sm font-medium text-slate-200">
                          c) Tasso Referral Evento (%)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={referralRateEvento}
                          onChange={(e) => setReferralRateEvento(clampNum(e.target.value, 0, 100))}
                          className="h-10 font-semibold text-white text-base"
                        />
                      </div>
                    </div>

                    {/* d) & e) Tasso di Conversione & Numero Cicli */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <Label className="text-xs sm:text-sm font-medium text-slate-200">
                          d) Conversione Referral (%)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={conversionRateEvento}
                          onChange={(e) => setConversionRateEvento(clampNum(e.target.value, 0, 100))}
                          className="h-10 font-semibold text-white text-base"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs sm:text-sm font-semibold text-slate-200">
                          e) Edizioni simulate (1-5)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={cicliEvento}
                          onChange={(e) => setCicliEvento(clampNum(e.target.value, 1, 5))}
                          className="h-10 font-bold text-blue-400 text-base"
                        />
                      </div>
                    </div>

                    {/* Parametri Opzionali Evento */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      <div className="space-y-1 glass-well p-3 border border-white/10">
                        <Label className="text-xs text-slate-300">Spesa media / persona (€)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={spesaMediaTerritorioEvento}
                          onChange={(e) => setSpesaMediaTerritorioEvento(clampNum(e.target.value, 0, 1000))}
                          className="h-9 text-white font-semibold text-sm"
                        />
                        <p className="text-[10px] text-slate-400 mt-0.5">Indotto locale partecipante</p>
                      </div>
                      <div className="space-y-1 glass-well p-3 border border-white/10">
                        <Label className="text-xs text-slate-300">Artisti per evento</Label>
                        <Input
                          type="number"
                          min="0"
                          value={artistiPerEvento}
                          onChange={(e) => setArtistiPerEvento(clampNum(e.target.value, 0, 100))}
                          className="h-9 text-white font-semibold text-sm"
                        />
                        <p className="text-[10px] text-slate-400 mt-0.5">Talenti/artisti promossi</p>
                      </div>
                    </div>

                    <Button onClick={reset} variant="outline" size="sm" className="w-full mt-2 text-xs h-10 border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl">
                      <RotateCcw className="w-4 h-4 mr-2 text-blue-400" />
                      Ripristina tutti i valori di default
                    </Button>
                  </div>
                </Card>
              </div>

              {/* =========================================
                  COLONNA DESTRA: RISULTATI E ANALISI
                  ========================================= */}
              <div className="lg:col-span-6 space-y-8">

                {/* 1. SEZIONE SCOMPOSIZIONE PARTECIPANTI WELFARE */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                        <Users className="w-5 h-5 text-blue-400" />
                        Scomposizione Popolazione & Presenze Welfare Aziendale
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Distinzione trasparente tra dipendenti aziendali aderenti con voucher, presenze dirette con accompagnatori e nuovi partecipanti da passaparola
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs px-2.5 py-0.5 font-bold self-start sm:self-auto">
                      {formatNum(stats.totalePersoneRaggiunteWelfare)} persone raggiunte
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* Step 1: Dipendenti Potenziali */}
                    <div className="p-3 glass-well border border-white/10 rounded-xl">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        1. Bacino Dipendenti
                      </span>
                      <p className="text-lg font-bold text-white mt-1">
                        {formatNum(stats.dipendentiTotaliPotenziali)}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {impreseClienti} impr. × {dipendentiPerImpresa} dip.
                      </span>
                    </div>

                    {/* Step 2: Aderenti con Voucher (Seed) */}
                    <div className="p-3 glass-well border border-white/10 rounded-xl">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        2. Aderenti con Voucher
                      </span>
                      <p className="text-lg font-bold text-white mt-1">
                        {formatNum(stats.seedPopulation)}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Base Seed per Referral
                      </span>
                    </div>

                    {/* Step 3: Presenze Dirette Seed */}
                    <div className="p-3 glass-well border border-white/10 rounded-xl">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        3. Presenze Dirette Seed
                      </span>
                      <p className="text-lg font-bold text-white mt-1">
                        {formatNum(stats.presenzeDiretteSeedTotali)}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        = {formatNum(stats.bigliettiDistribuiti)} Biglietti Matching Grant
                      </span>
                    </div>

                    {/* Step 4: Nuovi da Referral Welfare */}
                    <div className="p-3 glass-well border border-white/10 rounded-xl">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        4. Nuovi da Referral
                      </span>
                      <p className="text-lg font-bold text-blue-400 mt-1">
                        +{formatNum(stats.growthSoFar)}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        su {cicliReferral} cicli passaparola
                      </span>
                    </div>
                  </div>

                  {/* Box Distinzione Chiara vs Event Loyalty */}
                  <div className="p-3.5 glass-panel-subtle rounded-xl text-xs space-y-2 border border-white/10">
                    <div className="flex items-center justify-between text-white font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        Distinzione tra Canale Welfare e Advertising & Local Event Loyalty
                      </span>
                      <Badge variant="outline" className="text-[10px] text-slate-300">
                        2 Flussi Indipendenti
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                      <div className="glass-well p-2.5 rounded-lg border border-white/10">
                        <span className="text-blue-400 font-semibold block">A. Iniziativa Welfare CSR</span>
                        Coinvolge i dipendenti delle imprese partner ({formatNum(stats.seedPopulation)} aderenti reali) e il loro passaparola ({formatNum(stats.growthSoFar)} nuovi prospect B2B).
                      </div>
                      <div className="glass-well p-2.5 rounded-lg border border-white/10">
                        <span className="text-blue-300 font-semibold block">B. Advertising & Local Event Loyalty</span>
                        Coinvolge il pubblico generale dell'evento sul territorio ({formatNum(personePerEvento)} persone base) e ne misura la retention nelle edizioni successive.
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 2. SCHEDA INDICATORI DI RISULTATO ATTIVITÀ DI REFERRAL & VIRALITÀ */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                        <Zap className="w-5 h-5 text-blue-400" />
                        Metriche di Impatto & Viralità del Referral (Welfare × Eventi)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Indicatori di performance che quantificano l'effetto moltiplicatore e il valore incrementale generato dal passaparola
                      </p>
                    </div>
                    <Badge variant="default" className="text-xs px-2.5 py-0.5 font-bold self-start sm:self-auto">
                      +{formatNum(stats.totaleNuoviReferralCombinati)} Persone da Passaparola
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {/* 1. K-Factor Virale Doppio */}
                    <div className="p-3.5 glass-well rounded-xl border border-white/10 space-y-1.5">
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-blue-400" />
                        K-Factor Virale (K)
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-white">K₁ = {stats.kFactor.toFixed(2)}</span>
                        <span className="text-sm font-bold text-slate-400">| K₂ = {stats.kFactorEvento.toFixed(2)}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Welfare B2B ({stats.kFactor.toFixed(2)}) × Advertising Eventi ({stats.kFactorEvento.toFixed(2)})
                      </p>
                    </div>

                    {/* 2. Uplift Organico da Referral */}
                    <div className="p-3.5 glass-well rounded-xl border border-white/10 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                          <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
                          Uplift Organico (%)
                        </span>
                        <Badge variant="secondary" className="text-[10px]">
                          +{formatNum(stats.upliftReferralWelfarePct)}%
                        </Badge>
                      </div>
                      <p className="text-xl font-extrabold text-white">
                        +{formatNum(stats.growthSoFar)} persone
                      </p>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Incremento di partecipanti gratuiti generati via passaparola
                      </p>
                    </div>

                    {/* 3. Ambassador & Inviti Totali */}
                    <div className="p-3.5 glass-well rounded-xl border border-white/10 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                          <Share2 className="w-3.5 h-3.5 text-blue-400" />
                          Network & Inviti
                        </span>
                        <Badge variant="secondary" className="text-[10px]">
                          {formatNum(stats.totaleInvitiWelfare + stats.totaleInvitiEventi)} inviti
                        </Badge>
                      </div>
                      <p className="text-xl font-extrabold text-white">
                        {formatNum(stats.sommaAmbassadorWelfare + stats.sommaAmbassadorEventi)} Ambassador
                      </p>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Utenti attivi che promuovono l'iniziativa ai propri contatti
                      </p>
                    </div>
                  </div>

                  {/* Barra Saturazione TAM Esteso e Risparmio CAC */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 glass-well rounded-xl border border-white/10 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-300 flex items-center gap-1">
                          <Gauge className="w-3.5 h-3.5 text-blue-400" />
                          Saturazione Mercato Esteso (TAM)
                        </span>
                        <span className="font-bold text-blue-400">{formatNum(stats.saturazionePct)}%</span>
                      </div>
                      <Progress value={stats.saturazionePct} className="h-2 bg-white/10" />
                      <p className="text-[10px] text-slate-400">
                        Copertura rispetto al potenziale relazionale raggiungibile ({formatNum(stats.tamEsteso)} contatti)
                      </p>
                    </div>

                    <div className="p-3.5 glass-well rounded-xl border border-white/10 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-300 flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 text-blue-400" />
                          Valore Acquisizione Organica
                        </span>
                        <span className="font-bold text-blue-400">+{formatEuro(stats.cacRisparmiatoStimato)}</span>
                      </div>
                      <p className="text-xs font-bold text-white mt-1">
                        CAC Azzerato sui {formatNum(stats.totaleNuoviReferralCombinati)} Partecipanti Referral
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Risparmio stimato di budget pubblicitario a pagamento per lead generato
                      </p>
                    </div>
                  </div>
                </Card>

                {/* 3. RIPARTIZIONE ECONOMICA ENTRATE (HOTEL, APERITIVO, STARTUP) */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                        <Coins className="w-5 h-5 text-blue-400" />
                        Ripartizione Entrate Voucher & Ricavi Startup
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Scomposizione dettagliata delle entrate generate dai voucher Hotel/Agriturismo e Aperitivo-Cena erogati dalle Imprese Partner CSR
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs px-2.5 py-0.5 font-bold self-start sm:self-auto text-slate-300 border-white/15">
                      Take-rate medio: {stats.takeRateMedioStartupPct.toFixed(1)}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Box 1: Hotel & Agriturismi */}
                    <div className="p-3.5 glass-panel-subtle rounded-xl border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Hotel className="w-3.5 h-3.5 text-blue-400" />
                            Hotel & Agriturismi
                          </span>
                          <Badge variant="outline" className="text-[10px] border-white/15 text-slate-300">
                            {100 - margineStartupHotel}% netto
                          </Badge>
                        </div>
                        <p className="text-xl font-bold text-white mt-1.5">
                          {formatEuro(stats.quotaNettaHotel)}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Incasso netto strutture ({formatNum(stats.presenzeTotaliHotelWelfare)} notti)
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 space-y-0.5">
                        <div className="flex justify-between">
                          <span>Volume Lordo:</span>
                          <span className="font-semibold text-white">{formatEuro(stats.volumeLordoHotel)}</span>
                        </div>
                        <div className="flex justify-between text-blue-400">
                          <span>Margine trattenuto:</span>
                          <span>{margineStartupHotel}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Box 2: Aperitivo-Cena */}
                    <div className="p-3.5 glass-panel-subtle rounded-xl border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Utensils className="w-3.5 h-3.5 text-blue-400" />
                            Aperitivo & Cena
                          </span>
                          <Badge variant="outline" className="text-[10px] border-white/15 text-slate-300">
                            {100 - margineStartupAperitivo}% netto
                          </Badge>
                        </div>
                        <p className="text-xl font-bold text-white mt-1.5">
                          {formatEuro(stats.quotaNettaAperitivo)}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Incasso partner food ({formatNum(stats.presenzeTotaliAperitivoWelfare)} aperitivi)
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 space-y-0.5">
                        <div className="flex justify-between">
                          <span>Volume Lordo:</span>
                          <span className="font-semibold text-white">{formatEuro(stats.volumeLordoAperitivo)}</span>
                        </div>
                        <div className="flex justify-between text-blue-400">
                          <span>Margine trattenuto:</span>
                          <span>{margineStartupAperitivo}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Box 3: Ricavi Startup */}
                    <div className="p-3.5 glass-panel-subtle rounded-xl border border-blue-400/30 flex flex-col justify-between glow-blue">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            Ricavi & Margine Startup
                          </span>
                          <Badge variant="default" className="text-[10px]">
                            Margine
                          </Badge>
                        </div>
                        <p className="text-xl font-bold text-blue-400 mt-1.5">
                          {formatEuro(stats.totaleRicaviStartup)}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Commissioni totali trattenute
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 space-y-0.5">
                        <div className="flex justify-between">
                          <span>Da Hotel ({margineStartupHotel}%):</span>
                          <span className="font-semibold text-white">{formatEuro(stats.margineStartupHotelValore)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Da Aperitivo ({margineStartupAperitivo}%):</span>
                          <span className="font-semibold text-white">{formatEuro(stats.margineStartupAperitivoValore)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 4. SEZIONE RISULTATI ADVERTISING & LOCAL EVENT LOYALTY */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                        <Megaphone className="w-5 h-5 text-blue-400" />
                        Impatto "Advertising & Local Event Loyalty" ({cicliEvento} Edizioni nella Stessa Località)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Domanda generata della Campagna di Advertising: Fidelizzazione e passaparola per eventi successivi nella stessa località
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs px-2.5 py-0.5 font-bold text-slate-300 border-white/15">
                        K-event = {stats.kFactorEvento.toFixed(2)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs px-2.5 py-0.5 font-bold">
                        Retention {retentionRateEvento}%
                      </Badge>
                    </div>
                  </div>

                  {/* 4 Mini KPI Event Loyalty */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 glass-well rounded-xl border border-white/10">
                      <span className="text-[11px] font-semibold text-slate-400 block">Presenze Totali</span>
                      <p className="text-xl font-bold text-white mt-0.5">
                        {formatNum(stats.totalePresenzeEdizioni)}
                      </p>
                      <span className="text-[10px] text-slate-500">su {cicliEvento} edizioni</span>
                    </div>
                    <div className="p-3 glass-well rounded-xl border border-white/10">
                      <span className="text-[11px] font-semibold text-slate-400 block">Fedeli di Ritorno</span>
                      <p className="text-xl font-bold text-white mt-0.5">
                        {formatNum(stats.sommaFedeli)}
                      </p>
                      <span className="text-[10px] text-slate-500">retention attiva</span>
                    </div>
                    <div className="p-3 glass-well rounded-xl border border-white/10">
                      <span className="text-[11px] font-semibold text-slate-400 block">Nuovi da Passaparola</span>
                      <p className="text-xl font-bold text-white mt-0.5">
                        {formatNum(stats.sommaNuoviReferral)}
                      </p>
                      <span className="text-[10px] text-slate-500">da referral locale</span>
                    </div>
                    <div className="p-3 glass-well rounded-xl border border-white/10">
                      <span className="text-[11px] font-semibold text-slate-400 block">Indotto Economico</span>
                      <p className="text-xl font-bold text-blue-400 mt-0.5">
                        {formatEuro(stats.indottoEconomicoEventi)}
                      </p>
                      <span className="text-[10px] text-slate-500">spesa sul territorio</span>
                    </div>
                  </div>

                  {/* Tabella Dettaglio Edizioni Successive (1 a 5) */}
                  <div className="border border-white/10 rounded-xl overflow-hidden glass-well">
                    <div className="bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 flex justify-between items-center border-b border-white/10">
                      <span>Progressione Partecipanti per Edizione</span>
                      <span className="text-[11px] font-normal text-slate-400">
                        Crescita finale: <strong className="text-blue-400">+{formatNum(stats.crescitaPresenzeEdizioniPct)}%</strong> rispetto all'Edizione 1
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-black/30 text-slate-400 border-b border-white/10">
                          <tr>
                            <th className="py-2.5 px-3">Edizione</th>
                            <th className="py-2.5 px-3">Fedeli (Retention)</th>
                            <th className="py-2.5 px-3">Nuovi (Referral)</th>
                            <th className="py-2.5 px-3 text-right">Totale Partecipanti</th>
                            <th className="py-2.5 px-3 text-right">Indotto (€)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {stats.storicoEdizioni.map((ed) => (
                            <tr key={ed.edizione} className="hover:bg-white/5 transition-colors">
                              <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                {ed.label}
                              </td>
                              <td className="py-2.5 px-3 text-slate-300 font-medium">
                                {ed.edizione === 1 ? (
                                  <span className="text-slate-500">Base Iniziale</span>
                                ) : (
                                  `${formatNum(ed.fedeliRitorno)} (${retentionRateEvento}%)`
                                )}
                              </td>
                              <td className="py-2.5 px-3 text-blue-400 font-medium">
                                {ed.edizione === 1 ? (
                                  <span className="text-slate-500">-</span>
                                ) : (
                                  `+${formatNum(ed.nuoviReferral)}`
                                )}
                              </td>
                              <td className="py-2.5 px-3 text-right font-bold text-white">
                                {formatNum(ed.partecipantiTotali)}
                              </td>
                              <td className="py-2.5 px-3 text-right text-blue-400 font-semibold">
                                {formatEuro(ed.indottoLocale)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Grafico Evoluzione Edizioni Local Loyalty */}
                  <div className="h-56 w-full pt-1">
                    <p className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      Composizione presenze nelle edizioni successive
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={stats.storicoEdizioni}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0c111d',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
                            padding: '6px 10px',
                          }}
                          itemStyle={{ color: '#ffffff', fontSize: '11px', fontWeight: 600 }}
                          labelStyle={{ color: '#60a5fa', fontSize: '11px', fontWeight: 700, marginBottom: '2px' }}
                          formatter={(value: any, name: any) => [
                            formatNum(Number(value)),
                            name === "fedeliRitorno"
                              ? "Fedeli (Retention)"
                              : name === "nuoviReferral"
                                ? "Nuovi da Referral"
                                : name === "baseIniziale"
                                  ? "Base Iniziale"
                                  : "Totale Presenze",
                          ]}
                        />
                        <Legend
                          formatter={(value) => (
                            <span className="text-slate-300 text-xs">
                              {value === "fedeliRitorno"
                                ? "Fedeli (Retention)"
                                : value === "nuoviReferral"
                                  ? "Nuovi da Referral"
                                  : value === "baseIniziale"
                                    ? "Base Iniziale"
                                    : value}
                            </span>
                          )}
                        />
                        <Bar dataKey="baseIniziale" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="fedeliRitorno" stackId="a" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="nuoviReferral" stackId="a" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                        <Line
                          type="monotone"
                          dataKey="partecipantiTotali"
                          stroke="#ffffff"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#3b82f6' }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* 5. SEZIONE RISULTATI CANALE WELFARE & SVILUPPO LOCALE */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="pb-3 border-b border-white/10">
                    <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                      <Award className="w-5 h-5 text-blue-400" />
                      Bilancio Economico & Impatto sullo Sviluppo Locale
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Distinzione trasparente tra investimento dell'operatore vending (Matching Grant) e spesa voucher coperta dalle imprese CSR
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Colonna Sinistra: Chi Paga Cosa */}
                    <div className="space-y-3 p-4 glass-panel-subtle rounded-xl border border-white/10 text-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-white/10">
                        <span className="font-bold text-white uppercase tracking-wide">
                          Struttura Costi & Impegni Responsabilità
                        </span>
                        <span className="text-slate-400">Responsabilità</span>
                      </div>

                      {/* Biglietti Omaggio (Matching Grant) */}
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <p className="font-semibold text-white">Biglietti Omaggio (Matching Grant)</p>
                          <p className="text-[11px] text-slate-400">
                            {formatNum(stats.bigliettiDistribuiti)} biglietti omaggio erogati Startup × €{costoBiglietto}
                          </p>
                        </div>
                        <span className="font-bold text-white text-sm">
                          {formatEuro(stats.costoTotaleBiglietti)}
                        </span>
                      </div>

                      {/* Spesa Imprese Partner CSR */}
                      <div className="p-3 glass-well rounded-xl border border-white/10 space-y-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-white">Spesa Imprese CSR Partner</p>
                            <p className="text-[11px] text-slate-400">
                              Voucher erogati alle persone aderenti e referral
                            </p>
                          </div>
                          <span className="font-bold text-white text-sm">
                            {formatEuro(stats.spesaImpresePartner)}
                          </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                          <span>Hotel: {formatEuro(stats.spesaImpreseHotel)}</span>
                          <span>Aperitivo: {formatEuro(stats.spesaImpreseAperitivo)}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
                          * Erogato dalle aziende clienti come benefit welfare. Non costituisce costo per il promotore.
                        </p>
                      </div>

                      <Separator className="bg-white/10" />

                      {/* Entrate della Startup & Margini Netti Startup */}
                      <div className="p-3 glass-well rounded-xl border border-white/10 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-white">Entrate della Startup</p>
                            <p className="text-[10px] text-slate-400">
                              Ricavi & Margine Startup (commissioni convenzionate voucher)
                            </p>
                          </div>
                          <span className="font-bold text-white text-sm">
                            +{formatEuro(stats.totaleRicaviStartup)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-white pt-1.5 border-t border-white/10">
                          <span className="text-xs">Margini Netti Startup:</span>
                          <span className="text-sm font-extrabold text-white">
                            {formatEuro(stats.marginiNettiStartup)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Colonna Destra: Sviluppo Locale & Territorio */}
                    <div className="space-y-3 p-4 glass-panel-subtle rounded-xl border border-white/10 text-xs flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between pb-1 border-b border-white/10">
                          <span className="font-bold text-white uppercase tracking-wide">
                            Ritorno & Valore Generato Territorio
                          </span>
                          <span className="text-blue-400 font-semibold">Sviluppo Locale</span>
                        </div>

                        <div className="space-y-2 p-3 glass-well rounded-xl border border-white/10">
                          <div className="flex justify-between items-center py-0.5 text-slate-300">
                            <div>
                              <p className="font-semibold text-white">Hotel & Agriturismi (netto)</p>
                              <p className="text-[10px] text-slate-400">Ricavo diretto strutture ricettive locali</p>
                            </div>
                            <span className="font-bold text-white">+{formatEuro(stats.quotaNettaHotel)}</span>
                          </div>

                          <div className="flex justify-between items-center py-0.5 text-slate-300">
                            <div>
                              <p className="font-semibold text-white">Aperitivo & Cena (netto)</p>
                              <p className="text-[10px] text-slate-400">Ricavo netto food & ristoratori locali</p>
                            </div>
                            <span className="font-bold text-white">+{formatEuro(stats.quotaNettaAperitivo)}</span>
                          </div>

                          <div className="flex justify-between items-center py-0.5 text-slate-300">
                            <div>
                              <p className="font-semibold text-white">Impatto Territoriale CSR Voucher</p>
                              <p className="text-[10px] text-slate-400">Moltiplicatore 2.5×</p>
                            </div>
                            <span className="font-bold text-white">+{formatEuro(stats.valoreTerritorioMoltiplicato)}</span>
                          </div>

                          <div className="flex justify-between items-center py-0.5 text-slate-300">
                            <div>
                              <p className="font-semibold text-white flex items-center gap-1">
                                <Leaf className="w-3.5 h-3.5 text-blue-400" />
                                Valore della Valorizzazione Filiera Corta Locale
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {stats.dipendentiAttiviKmZero} acquirenti dipendenti partner ({formatNum(stats.ordiniTotaliKmZero)} ordini Km 0)
                              </p>
                            </div>
                            <span className="font-bold text-white">+{formatEuro(stats.fatturatoProduttoriKmZero)}</span>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-white/10 font-bold text-white">
                            <span>= Totale Valore Stimato Territorio:</span>
                            <span className="text-white text-sm font-extrabold">+{formatEuro(stats.totaleValoreTerritorio)}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                        * L'indotto economico sul territorio supporta direttamente la filiera corta Km 0, il settore ricettivo e la ristorazione locale.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* 5b. SCHEDA: OPERATORE B2B - PROMOTORE WELFARE TERRITORIALE */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-5">
                  <div className="pb-3 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                        Operatore B2B: Promotore Welfare Territoriale & Ritorno Strategico
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Hub sistemico e orchestratore: ritorno commerciale diretto, flotta a impatto zero per il Km 0, gateway di fiducia verso le imprese e posizionamento ESG
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs text-slate-300 border-white/15 self-start sm:self-auto">
                      Hub & Promotore Ecosistema
                    </Badge>
                  </div>

                  {/* Griglia a 4 Pilastri */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pilastro 1: Ritorno Economico Diretto Vending */}
                    <div className="p-4 glass-panel-subtle rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                          <span className="font-bold text-white uppercase tracking-wide text-xs flex items-center gap-1.5">
                            <Coins className="w-3.5 h-3.5 text-blue-400" />
                            1. Ritorno Economico Diretto Vending
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Core Business
                          </span>
                        </div>

                        <div className="p-3 glass-well rounded-xl border border-white/10 space-y-2.5 text-xs">
                          <div className="flex justify-between items-center py-0.5 text-slate-300">
                            <div>
                              <p className="font-semibold text-white">Nuovi Clienti B2B Contrattualizzati</p>
                              <p className="text-[10px] text-slate-400">
                                {stats.nuoviClientiB2B} contratti acquisiti su {stats.nuoviProspectB2B} prospect (da Referral con Certificato HR)
                              </p>
                            </div>
                            <span className="font-bold text-white text-sm">+{formatEuro(stats.valoreNuoviClienti)}</span>
                          </div>

                          <div className="flex justify-between items-center py-0.5 text-slate-300">
                            <div>
                              <p className="font-semibold text-white">Protezione Portafoglio & Retention</p>
                              <p className="text-[10px] text-slate-400">
                                {stats.clientiRitenuti} imprese fidelizzate (Churn {churnRateAsIs}% → {churnRateToBe}%, Δ +{stats.deltaChurnRetention}%)
                              </p>
                            </div>
                            <span className="font-bold text-white text-sm">+{formatEuro(stats.valoreRetention)}</span>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-white/10 font-bold text-white">
                            <span className="text-xs">= Totale Ritorno Diretto B2B:</span>
                            <span className="text-white text-sm font-extrabold">+{formatEuro(stats.totaleValoreB2B)}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                        * Il canale B2B misura l'efficacia del circuito nel proteggere il fatturato esistente e convertire nuovi lead aziendali ad alto scontrino.
                      </p>
                    </div>

                    {/* Pilastro 2: Flotta Logistica & Impatto Ambientale Azzerato (Km 0) */}
                    <div className="p-4 glass-panel-subtle rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                          <span className="font-bold text-white uppercase tracking-wide text-xs flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-blue-400" />
                            2. Flotta Logistica & Impatto CO₂ Azzerato
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Km 0 Backbone
                          </span>
                        </div>

                        <div className="p-3 glass-well rounded-xl border border-white/10 space-y-2 text-xs">
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            La flotta dell'operatore, già attiva per il rifornimento dei distributori, consegna i panieri locali alle aziende clienti durante i normali giri-visite, rendendo l'impatto di trasporto a zero emissioni aggiuntive.
                          </p>

                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                              <p className="text-[10px] text-slate-400">Tratte Logistica Evitate</p>
                              <p className="text-xs font-bold text-white">{formatNum(stats.kmLogisticaEvitati)} km</p>
                              <p className="text-[9px] text-slate-500">{formatNum(stats.ordiniTotaliKmZero)} ordini Km 0 gestiti</p>
                            </div>
                            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                              <p className="text-[10px] text-slate-400">Emissioni Risparmiate</p>
                              <p className="text-xs font-bold text-white">-{formatNum(stats.co2RisparmiataKg)} kg CO₂</p>
                              <p className="text-[9px] text-slate-500">{stats.dipendentiAttiviKmZero} dipendenti acquirenti</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-1.5 border-t border-white/10 text-xs">
                            <span className="text-slate-300 font-medium">Valore per i Produttori Locali:</span>
                            <span className="font-bold text-white">+{formatEuro(stats.fatturatoProduttoriKmZero)}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                        * Senza la flotta dell'operatore, la micro-logistica dei produttori locali non avrebbe sostenibilità economica né ecologica.
                      </p>
                    </div>

                    {/* Pilastro 3: Autorevolezza, Gateway & Orchestrazione Welfare */}
                    <div className="p-4 glass-panel-subtle rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                          <span className="font-bold text-white uppercase tracking-wide text-xs flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-blue-400" />
                            3. Autorevolezza B2B & Gateway Startup
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Trust & Onboarding
                          </span>
                        </div>

                        <div className="p-3 glass-well rounded-xl border border-white/10 space-y-2 text-xs">
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            Senza l'accreditamento storico dell'operatore vending, la Startup non avrebbe accesso alle direzioni HR. L'operatore orchestra l'ingresso delle imprese e attiva il welfare interamente finanziato dai clienti stessi.
                          </p>

                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                              <p className="text-[10px] text-slate-400">Imprese Mobilitate</p>
                              <p className="text-xs font-bold text-white">{stats.impreseCoinvolte} aziende</p>
                              <p className="text-[9px] text-slate-500">{impreseClienti} clienti + {stats.nuoviClientiB2B} nuovi</p>
                            </div>
                            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                              <p className="text-[10px] text-slate-400">Welfare Spesato dai Clienti</p>
                              <p className="text-xs font-bold text-white">+{formatEuro(stats.spesaImpresePartner)}</p>
                              <p className="text-[9px] text-slate-500">Costo sostenuto dai partner CSR</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-1.5 border-t border-white/10 text-xs">
                            <span className="text-slate-300 font-medium">Persone Attivate nel Circuito:</span>
                            <span className="font-bold text-white">{formatNum(stats.totalePersoneRaggiunteWelfare)} persone</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                        * L'operatore non si fa carico dei voucher: è l'abilitatore istituzionale che motiva le aziende a spesare il welfare dei dipendenti.
                      </p>
                    </div>

                    {/* Pilastro 4: Posizionamento ESG & Differenziazione Competitiva */}
                    <div className="p-4 glass-panel-subtle rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                          <span className="font-bold text-white uppercase tracking-wide text-xs flex items-center gap-1.5">
                            <Leaf className="w-3.5 h-3.5 text-blue-400" />
                            4. Posizionamento ESG & Vantaggio Competitivo
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Strategia & Gare
                          </span>
                        </div>

                        <div className="p-3 glass-well rounded-xl border border-white/10 space-y-2.5 text-xs">
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <p className="text-[11px] text-slate-300">
                                Da fornitore di commodity a partner strategico ESG: supera la concorrenza sul mero prezzo del caffè offrendo un ecosistema di sostenibilità integrata.
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <p className="text-[11px] text-slate-300">
                                Punteggio premiante nei contratti pubblici con gli enti locali: barriera d'ingresso competitiva e premialità nei criteri ESG per bandi e concessioni.
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <p className="text-[11px] text-slate-300">
                                Store e-commerce Welfare per la Filiera Km 0: promozione e vendita continua delle produzioni locali direttamente ai dipendenti aziendali.
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-white/10 text-xs">
                            <span className="text-slate-300 font-medium">Indotto Territoriale Totale Abilitato:</span>
                            <span className="font-bold text-white text-sm">+{formatEuro(stats.totaleValoreTerritorio)}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                        * Certifica l'impatto sociale, ambientale e di governance dell'operatore valorizzandone il brand equity.
                      </p>
                    </div>
                  </div>
                </Card>

              </div>
            </div>

            {/* ==============================================================
                SEZIONE TRASVERSALE A TUTTA LARGHEZZA: ANALISI GRAFICA & CRESCITA
                ============================================================== */}
            <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-5 w-full">
              <div className="pb-3 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Dinamiche di Crescita & Composizione del Valore Ecosistemico
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Visualizzazione analitica dell'espansione dei cicli referral welfare e scomposizione coordinata del valore economico generato
                  </p>
                </div>
                <Badge variant="outline" className="text-xs text-slate-300 border-white/15 self-start sm:self-auto">
                  Analisi Grafica Coordinata
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Grafico 1: Crescita Referral Welfare (lg:col-span-7) */}
                <div className="lg:col-span-7 glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/10 flex flex-col justify-between space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                    <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-blue-400" />
                      Curva di Espansione Referral Welfare (Partecipanti per Ciclo)
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        K-Factor: <strong className="text-blue-400">{stats.kFactor.toFixed(2)}</strong>
                      </span>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        Saturazione: <strong className="text-white">{stats.saturazionePct.toFixed(0)}%</strong>
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-72 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={growthDataWelfare} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0c111d',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
                            padding: '10px 14px',
                          }}
                          itemStyle={{ color: '#ffffff', fontSize: '12px', fontWeight: 600 }}
                          labelStyle={{ color: '#60a5fa', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}
                          formatter={(value: any, name: string) => [
                            formatNum(Number(value)),
                            name === "nuovi" ? "Nuovi Partecipanti" : "Cumulativo Totale",
                          ]}
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: '10px', fontSize: '11px', color: '#cbd5e1' }}
                          formatter={(value) => (value === "nuovi" ? "Nuovi nel Ciclo" : "Cumulativo Totale")}
                        />
                        <Bar dataKey="nuovi" fill="#3b82f6" radius={[6, 6, 0, 0]} name="nuovi" maxBarSize={56} />
                        <Line type="monotone" dataKey="cumulativo" stroke="#60a5fa" strokeWidth={3} name="cumulativo" dot={{ fill: '#93c5fd', stroke: '#1e3a8a', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#ffffff' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    <span>Base iniziale: <strong className="text-white">{formatNum(stats.seedPopulation)}</strong> dipendenti seed</span>
                    <span>Cumulativo finale: <strong className="text-blue-400">{formatNum(stats.partecipantiTotali)}</strong> partecipanti</span>
                  </div>
                </div>

                {/* Grafico 2: Composizione del Valore Ecosistemico (lg:col-span-5) */}
                <div className="lg:col-span-5 glass-panel-subtle p-4 sm:p-5 rounded-xl border border-white/10 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <PieChart className="w-4 h-4 text-blue-400" />
                      Composizione del Valore Generato
                    </p>
                    <span className="text-[10px] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      Ecosistema
                    </span>
                  </div>

                  {/* Donut Chart centrato e pulito */}
                  <div className="w-full h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={valueBreakdownData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={72}
                          innerRadius={44}
                          paddingAngle={3}
                        >
                          {valueBreakdownData.map((entry, idx) => (
                            <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} stroke="rgba(10, 14, 23, 0.9)" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0c111d',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
                            padding: '8px 12px',
                          }}
                          itemStyle={{ color: '#ffffff', fontSize: '12px', fontWeight: 600 }}
                          labelStyle={{ color: '#60a5fa', fontSize: '12px', fontWeight: 700, marginBottom: '3px' }}
                          formatter={(value: any) => [formatEuro(Number(value)), "Valore Generato"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legenda Analitica coordinata con percentuali ed Euro esatti */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {(() => {
                      const totalVal = valueBreakdownData.reduce((acc, curr) => acc + curr.value, 0);
                      return valueBreakdownData.map((item, idx) => {
                        const pct = totalVal > 0 ? ((item.value / totalVal) * 100).toFixed(0) : "0";
                        return (
                          <div key={item.name} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                              />
                              <span className="text-slate-300 text-[11px] font-medium">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2 font-mono">
                              <span className="text-[10px] text-slate-400">({pct}%)</span>
                              <span className="text-xs font-bold text-white">{formatEuro(item.value)}</span>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  <div className="flex justify-between items-center text-[11px] pt-2 border-t border-white/5 font-semibold">
                    <span className="text-slate-400">Totale Ecosistema:</span>
                    <span className="text-white font-mono font-bold">
                      {formatEuro(valueBreakdownData.reduce((acc, curr) => acc + curr.value, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* ==============================================================
                SEZIONE CONCLUSIVA TRASVERSALE: LE 2 SCHEDE FINALI (SX E DX)
                ============================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
              {/* Scheda Sinistra: 6. QUADRO DEI VANTAGGI STRATEGICI PER L'OPERATORE E IL TERRITORIO */}
              <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4 h-full flex flex-col justify-between">
                <div>
                  <div className="pb-2 border-b border-white/10">
                    <h3 className="flex items-center gap-2 text-base font-bold text-white">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      Quadro di Sintesi dei Vantaggi Strategici
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    <VantaggioItem
                      icon={<Building2 className="w-4 h-4" />}
                      title="Fidelizzazione B2B"
                      value={`${stats.deltaChurnRetention}% retention↑`}
                      detail={`${stats.clientiRitenuti} imprese più fedeli = ${formatEuro(stats.valoreRetention)}`}
                    />
                    <VantaggioItem
                      icon={<TrendingUp className="w-4 h-4" />}
                      title="Nuovi Clienti B2B"
                      value={`${stats.nuoviClientiB2B} contratti`}
                      detail={`Passaparola = ${formatEuro(stats.valoreNuoviClienti)}`}
                    />
                    <VantaggioItem
                      icon={<MapPin className="w-4 h-4" />}
                      title="Impatto Territoriale CSR Voucher"
                      value={`${formatNum(stats.totalePersoneRaggiunteWelfare)} persone`}
                      detail={`Indotto turistico: ${formatEuro(stats.valoreTerritorioMoltiplicato)}`}
                    />
                    <VantaggioItem
                      icon={<Leaf className="w-4 h-4" />}
                      title="Produttori Km 0 & ESG"
                      value={`${formatEuro(stats.fatturatoProduttoriKmZero)}`}
                      detail={`${stats.dipendentiAttiviKmZero} acquirenti diretti (-${formatNum(stats.co2RisparmiataKg)} kg CO₂)`}
                    />
                    <VantaggioItem
                      icon={<Heart className="w-4 h-4" />}
                      title="CSR & Brand Equity"
                      value={`${stats.eventiValorizzati} edizioni`}
                      detail={`${stats.artistiValorizzati} artisti, ${stats.impreseCoinvolte} aziende attive`}
                    />
                    <VantaggioItem
                      icon={<Megaphone className="w-4 h-4" />}
                      title="Advertising & Local Event Loyalty"
                      value={`${formatNum(stats.totalePresenzeEdizioni)} presenze`}
                      detail={`Indotto locale: ${formatEuro(stats.indottoEconomicoEventi)}`}
                    />
                  </div>
                </div>
              </Card>

              {/* Scheda Destra: MODELLO PARTNERSHIP RIASSUNTIVO */}
              <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4 h-full flex flex-col justify-between">
                <div>
                  <p className="font-bold text-white text-base flex items-center gap-1.5 pb-2 border-b border-white/10">
                    <Sparkles className="w-4 h-4 text-blue-400" /> Modello di Partnership & Responsabilità Economiche
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 mt-4">
                    <div className="p-3.5 rounded-xl glass-well border border-white/10">
                      <span className="text-blue-400 font-semibold block text-xs">1. Operatore Vending (Promotore Welfare Territoriale)</span>
                      <p className="text-xs text-slate-400 mt-1">
                        Orchestra il welfare aziendale con i propri clienti, azzera l'impatto ambientale delle consegne Km 0 con la propria flotta e apre la porta d'accesso alle imprese per la Startup.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl glass-well border border-white/10">
                      <span className="text-blue-300 font-semibold block text-xs">2. Imprese CSR Partner</span>
                      <p className="text-xs text-slate-400 mt-1">
                        Erogano voucher welfare (Hotel €{costoVoucherHotel} + Aperitivo €{costoVoucherAperitivo}) per gli addetti delle imprese clienti.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl glass-well border border-white/10">
                      <span className="text-slate-200 font-semibold block text-xs">3. Dipendenti & Partecipanti</span>
                      <p className="text-xs text-slate-400 mt-1">
                        Vivono l'esperienza evento, ritornano nelle edizioni successive (retention) e invitano amici (referral).
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl glass-well border border-white/10">
                      <span className="text-blue-400 font-semibold block text-xs">4. Hotel, Ristoratori & Startup</span>
                      <p className="text-xs text-slate-400 mt-1">
                        Beneficiano di flussi continui, prenotazioni dirette ed economie di scala generate dal modello.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ============ TAB VANTAGGI OPERATORE 3D (LANDING) ============ */}
          <TabsContent value="landing3d" className="mt-0 pb-0 focus-visible:outline-none">
            <div className="fixed inset-0 z-50 bg-[#07090e]">
              <iframe
                src="/landing-page-3d-vetro.html"
                className="w-full h-full border-0"
                title="Landing Page Operatore Vending 3D"
              />
            </div>
          </TabsContent>

          {/* ============ TAB METODOLOGIA ============ */}
          <TabsContent value="metodologia" className="space-y-6 mt-4">
            {/* Header Introduttivo Metodologia */}
            <Card className="glass-panel p-6 sm:p-7 border border-white/12 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 glass-pill text-blue-400">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Metodologia di Calcolo & Architettura Algoritmica
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Documentazione analitica e trasparente di tutti i modelli matematici, flussi di referral ed economie di scala dell'ecosistema.
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs text-slate-300 border-white/15 self-start sm:self-auto">
                  Architettura Certificata
                </Badge>
              </div>
            </Card>

            {/* Griglia a 2 Colonne Schede Algoritmiche Bilanciate (Sx e Dx) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
              {/* COPPIA 1 - SX: 1. Dinamica Referral & K-Factor */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        1. Meccanica dei Referral & K-Factor Virale
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Viral Engine
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    K = Referral Rate (%) × Inviti Medi × Conversion Rate (%)
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Quantifica la capacità del circuito welfare di propagarsi organicamente nel tempo attraverso il passaparola spontaneo degli addetti delle imprese clienti. Se K ≥ 1, ogni partecipante genera in media più di un nuovo utente nel ciclo successivo, attivando una crescita virale moltiplicativa. Se K &lt; 1, il passaparola si assesta come un moltiplicatore organico stabile e quantificabile, amplificando costantemente la base seed immessa.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Dinamica: Crescita ciclica e saturazione TAM</span>
                  <span className="font-mono text-slate-300 font-medium">K-Factor: {stats.kFactor.toFixed(2)}</span>
                </div>
              </Card>

              {/* COPPIA 1 - DX: 2. Base Seed Dipendenti & Adozione Voucher */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        2. Base Seed Dipendenti & Adozione Voucher Welfare
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Adesione CSR
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Seed = max(Dipendenti × Tasso Hotel%, Dipendenti × Tasso Aperitivo%)
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Gli addetti delle aziende partner non aderiscono in blocco: il simulatore applica tassi realistici di riscatto su ciascuna tipologia di benefit. La popolazione seed costituisce il nucleo di partenza reale che effettua l'esperienza e innesca la prima ondata di referral territoriali. I moltiplicatori di presenza (0.5× - 3.0×) quantificano gli accompagnatori al seguito (familiari e conoscenti).
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Presenze Dirette: Dipendenti + Accompagnatori</span>
                  <span className="font-mono text-slate-300 font-medium">{formatNum(stats.presenzeDiretteSeedTotali)} persone</span>
                </div>
              </Card>

              {/* COPPIA 2 - SX: 3. Struttura Benefit Startup */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        3. Struttura Benefit Startup (Matching Grant Biglietti)
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Matching Grant
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Benefit Startup = Presenze Dirette Seed × Costo Unitario Biglietto (€)
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    La Startup co-finanzia l'esperienza culturale erogando biglietti omaggio alle sole presenze dirette generate dai voucher welfare aziendali. L'operatore vending abilita questo matching grant coinvolgendo le imprese partner, impiegando i biglietti omaggio come leva di attrazione. I voucher alberghieri e di ristorazione sono interamente sostenuti dalle imprese clienti come investimento welfare.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Biglietti omaggio erogati: {formatNum(stats.bigliettiDistribuiti)}</span>
                  <span className="font-mono text-slate-300 font-medium">{formatEuro(stats.costoTotaleBiglietti)}</span>
                </div>
              </Card>

              {/* COPPIA 2 - DX: 4. Ripartizione Economica Voucher & Margini Netti */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        4. Ripartizione Economica Voucher & Margini Netti Startup
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Economia Circolare
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Margini Netti Startup = Entrate Commissioni Voucher - Costo Biglietti
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    I ricavi della Startup sono determinati dalle commissioni convenzionate trattenute sulle prenotazioni (Hotel/Agriturismi e Food/Aperitivi). La maggior quota del volume lordo viene riversata direttamente agli esercenti locali, consolidando la filiera turistico-ricettiva. Il margine netto evidenzia la sostenibilità operativa, deducendo dal margine lordo il costo effettivo dei biglietti in matching grant.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Entrate Startup: {formatEuro(stats.totaleRicaviStartup)}</span>
                  <span className="font-mono text-slate-300 font-medium">Margine Netto: {formatEuro(stats.marginiNettiStartup)}</span>
                </div>
              </Card>

              {/* COPPIA 3 - SX: 5. Acquisizione B2B & Certificato HR */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        5. Acquisizione Nuove Imprese B2B & Certificato HR
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Pipeline Vending
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Nuovi Clienti B2B = (Referral × % Prospect B2B) × Tasso Chiusura Commerciale
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    I partecipanti attratti dal passaparola lavorano prevalentemente in aziende terze non ancora convenzionate con l'operatore vending. Al termine dell'evento ricevono il Certificato ufficiale di Partecipazione & Welfare da mostrare al datore di lavoro o all'ufficio HR. Il riscontro positivo stimola l'azienda terza a convenzionarsi: il 20% dei referral diventa prospect qualificato e il 15% firma un nuovo contratto.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Prospect: {stats.nuoviProspectB2B} | Chiusura: {tassoChiusuraProspect}%</span>
                  <span className="font-mono text-slate-300 font-medium">+{formatEuro(stats.valoreNuoviClienti)}</span>
                </div>
              </Card>

              {/* COPPIA 3 - DX: 6. Fidelizzazione B2B & Churn Differenziale */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        6. Fidelizzazione B2B: Churn Differenziale (AS-IS vs TO-BE)
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Anti-Churn & Gare
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Valore Retention = Imprese Partner × (Churn AS-IS% - Churn TO-BE%) × Valore Contratto
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Misura la protezione del portafoglio clienti quantificando l'abbattimento del tasso di abbandono (es. da Churn 10% storico a 2% fidelizzato). Il differenziale di retention (+8%) calcola matematicamente le imprese salvaguardate dalla disdetta contrattuale per il servizio vending. Il pacchetto welfare e Km 0 crea un posizionamento ad alto valore aggiunto e conferisce punteggio premiante nelle gare pubbliche.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Δ Retention: +{stats.deltaChurnRetention}% ({stats.clientiRitenuti} imprese)</span>
                  <span className="font-mono text-slate-300 font-medium">+{formatEuro(stats.valoreRetention)}</span>
                </div>
              </Card>

              {/* COPPIA 4 - SX: 7. Valore Sviluppo Locale & Moltiplicatore 2.5x */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        7. Valore Sviluppo Locale & Moltiplicatore Territoriale (2.5×)
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Sviluppo Locale
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Valore Territorio = Netto Hotel + Netto Food + (Spesa CSR × 2.5×) + Valore Km 0
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Raccoglie i ricavi netti diretti erogati agli hotel, agriturismi e locali convenzionati per i servizi consumati con i voucher. Integra l'indotto turistico esteso moltiplicando per 2.5× la spesa voucher, stimando la spesa collaterale in trasporti, visite e shopping. Comprende il fatturato generato a favore della filiera corta locale, rimanendo rigorosamente distinto dai ricavi B2B dell'operatore vending.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Spesa Partner CSR: {formatEuro(stats.spesaImpresePartner)}</span>
                  <span className="font-mono text-slate-300 font-medium">Totale: +{formatEuro(stats.totaleValoreTerritorio)}</span>
                </div>
              </Card>

              {/* COPPIA 4 - DX: 8. Produttori Km 0 & Logistica Flotta Vending */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        8. Produttori Locali Km 0 & Logistica Flotta Vending
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Backbone Green
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Fatturato Km 0 = Ordini Totali × Scontrino Medio | CO₂ = Tratta Evitata × 0.19 kg/km
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    La base di calcolo considera esclusivamente i dipendenti diretti delle imprese convenzionate, escludendo i partecipanti esterni da referral. La flotta dell'operatore vending consegna i panieri agroalimentari durante i normali giri-visite, azzerando l'impatto ambientale da trasporto dedicato. Quantifica i chilometri di trasporto convenzionale risparmiati e le corrispondenti emissioni di gas serra evitate.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>CO₂ Evitata: -{formatNum(stats.co2RisparmiataKg)} kg</span>
                  <span className="font-mono text-slate-300 font-medium">Filiera Corta: +{formatEuro(stats.fatturatoProduttoriKmZero)}</span>
                </div>
              </Card>

              {/* COPPIA 5 - SX: 9. Advertising & Local Event Loyalty */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        9. Advertising & Local Event Loyalty (Edizioni nel Tempo)
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Event Loyalty
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Presenze_t = (Presenze_{'{t-1}'} × Retention%) + [Ambassador × Inviti × Conversione%]
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Modella la dinamica delle presenze attraverso le edizioni successive dell'evento, combinando fidelizzazione organica e passaparola. La componente di retention misura la fedeltà del pubblico storico che rinnova la partecipazione negli anni successivi. La componente virale stima i nuovi spettatori attratti dalla campagna territoriale, quantificando l'indotto economico sul comune ospitante.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Edizioni Valorizzate: {stats.eventiValorizzati}</span>
                  <span className="font-mono text-slate-300 font-medium">Indotto Eventi: +{formatEuro(stats.indottoEconomicoEventi)}</span>
                </div>
              </Card>

              {/* COPPIA 5 - DX: 10. Operatore B2B: Promotore Welfare Territoriale */}
              <Card className="glass-panel p-6 sm:p-7 border border-white/12 shadow-2xl rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        10. Operatore B2B: Promotore del Welfare Territoriale
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      Governance Ecosistema
                    </span>
                  </div>

                  <div className="glass-well p-3 rounded-xl border border-white/10 font-mono text-xs text-blue-300">
                    Valore Ecosistema = Ritorno B2B + Valore Territoriale + Indotto Eventi
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    L'operatore B2B non è un semplice fornitore di ristoro, ma l'hub operativo che rende possibile l'intera architettura relazionale e logistica. Apre le porte della Startup alle direzioni HR grazie alla propria reputazione e orchestra i piani welfare spesati direttamente dai clienti. Il modello integrato conferisce punteggio premiante nei contratti pubblici con gli enti locali e valorizza il brand in ottica ESG.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span>Imprese Mobilitate: {stats.impreseCoinvolte}</span>
                  <span className="font-mono text-slate-300 font-medium">Totale B2B: +{formatEuro(stats.totaleValoreB2B)}</span>
                </div>
              </Card>
            </div>

            <Alert variant="default" className="glass-panel border border-white/15 bg-black/30 text-slate-200 p-5 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              <AlertTitle className="text-white font-semibold text-sm">Validità e Flessibilità del Modello Ecosistemico</AlertTitle>
              <AlertDescription className="text-slate-300 text-xs mt-1 leading-relaxed">
                La netta separazione tra la base dati del Canale Welfare CSR (finanziato dalle imprese clienti), il motore logistico Km 0 (flotta vending) e la base di Advertising &amp; Local Event Loyalty permette di presentare proposte modulari e scalabili a direzioni HR, promotori culturali e pubbliche amministrazioni territoriali.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function VantaggioItem({
  icon,
  title,
  value,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="glass-well p-3.5 space-y-1 border border-white/10 hover:border-white/20 transition-all rounded-xl">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
        <span className="text-blue-400">{icon}</span>
        <span>{title}</span>
      </div>
      <p className="text-base font-bold text-white">{value}</p>
      <p className="text-[11px] text-slate-400 leading-tight">{detail}</p>
    </div>
  );
}
