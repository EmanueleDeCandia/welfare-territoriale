import { useState, useMemo } from 'react';
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

const clampNum = (v, min = 0, max = Infinity) => {
  const n = Number(v);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
};

const PIE_COLORS = ["#6366f1", "#22c55e", "#f59e0b"];

export default function ReferralSimulator() {
  // Parametri base
  const [impreseClienti, setImpreseClienti] = useState(20);
  const [dipendentiPerImpresa, setDipendentiPerImpresa] = useState(50);
  const [referralRate, setReferralRate] = useState(15);
  const [conversionRate, setConversionRate] = useState(25);
  const [invitiMediPerAmbassador, setInvitiMediPerAmbassador] = useState(3);
  const [fattoreEspansioneMercato, setFattoreEspansioneMercato] = useState(3);
  const [cicliReferral, setCicliReferral] = useState(3);
  const [costoBiglietto, setCostoBiglietto] = useState(15);
  const [costoVoucher, setCostoVoucher] = useState(50);

  // Parametri avanzati
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [personePerEvento, setPersonePerEvento] = useState(200);
  const [artistiPerEvento, setArtistiPerEvento] = useState(3);
  const [valoreMedioAcquisto, setValoreMedioAcquisto] = useState(1200);
  const [incrementoRetention, setIncrementoRetention] = useState(8);
  const [nuoviProspectRate, setNuoviProspectRate] = useState(20);
  const [tassoChiusuraProspect, setTassoChiusuraProspect] = useState(15);
  const [moltiplicatoreTurismo, setMoltiplicatoreTurismo] = useState(2.5);

  const applyPreset = (tipo) => {
    if (tipo === "conservativo") {
      setReferralRate(8);
      setConversionRate(15);
      setInvitiMediPerAmbassador(2);
      setFattoreEspansioneMercato(1.5);
    } else if (tipo === "realistico") {
      setReferralRate(15);
      setConversionRate(25);
      setInvitiMediPerAmbassador(3);
      setFattoreEspansioneMercato(3);
    } else if (tipo === "ottimistico") {
      setReferralRate(25);
      setConversionRate(35);
      setInvitiMediPerAmbassador(5);
      setFattoreEspansioneMercato(5);
    }
  };

  const reset = () => {
    setImpreseClienti(20);
    setDipendentiPerImpresa(50);
    setReferralRate(15);
    setConversionRate(25);
    setInvitiMediPerAmbassador(3);
    setFattoreEspansioneMercato(3);
    setCicliReferral(3);
    setCostoBiglietto(15);
    setCostoVoucher(50);
    setPersonePerEvento(200);
    setArtistiPerEvento(3);
    setValoreMedioAcquisto(1200);
    setIncrementoRetention(8);
    setNuoviProspectRate(20);
    setTassoChiusuraProspect(15);
    setMoltiplicatoreTurismo(2.5);
  };

  const stats = useMemo(() => {
    const seedPopulation = impreseClienti * dipendentiPerImpresa;
    const tamEsteso = seedPopulation * fattoreEspansioneMercato;
    const kFactor =
      (referralRate / 100) * invitiMediPerAmbassador * (conversionRate / 100);

    const storicoCicli = [
      {
        ciclo: 1,
        ambassador: Math.round((seedPopulation * referralRate) / 100),
        nuovi: seedPopulation,
        cumulativo: seedPopulation,
      },
    ];

    let waveSize = seedPopulation;
    let growthSoFar = 0;
    let cumulativeParticipants = seedPopulation;
    let saturato = false;
    let cicloSaturazione = null;

    for (let i = 1; i < cicliReferral; i++) {
      const ambassadorWave = Math.round((waveSize * referralRate) / 100);
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

    const bigliettiDistribuiti = cumulativeParticipants;
    const pernottamenti = bigliettiDistribuiti;
    const saturazionePct =
      tamEsteso > 0 ? Math.min((growthSoFar / tamEsteso) * 100, 100) : 0;

    const costoTotaleBiglietti = bigliettiDistribuiti * costoBiglietto;
    const costoTotaleVoucher = pernottamenti * costoVoucher;
    const costiOperatore = costoTotaleBiglietti;

    const valoreTerritorio = pernottamenti * costoVoucher * moltiplicatoreTurismo;

    const nuoviProspectB2B = Math.round((growthSoFar * nuoviProspectRate) / 100);
    const nuoviClientiB2B = Math.round(
      (nuoviProspectB2B * tassoChiusuraProspect) / 100
    );
    const valoreNuoviClienti = nuoviClientiB2B * valoreMedioAcquisto;

    const clientiRitenuti = Math.round((impreseClienti * incrementoRetention) / 100);
    const valoreRetention = clientiRitenuti * valoreMedioAcquisto;

    const valoreTotaleGenerato = valoreTerritorio + valoreNuoviClienti + valoreRetention;
    const roi =
      costiOperatore > 0
        ? ((valoreTotaleGenerato - costiOperatore) / costiOperatore) * 100
        : 0;
    const costoPerPersona =
      cumulativeParticipants > 0 ? costiOperatore / cumulativeParticipants : 0;

    const impreseCoinvolte = impreseClienti + nuoviClientiB2B;
    const eventiValorizzati =
      personePerEvento > 0 ? Math.ceil(bigliettiDistribuiti / personePerEvento) : 0;
    const artistiValorizzati = eventiValorizzati * artistiPerEvento;

    const inputValido = impreseClienti > 0 && dipendentiPerImpresa > 0;

    return {
      seedPopulation,
      tamEsteso,
      kFactor,
      storicoCicli,
      bigliettiDistribuiti,
      pernottamenti,
      saturazionePct,
      saturato,
      cicloSaturazione,
      costoTotaleBiglietti,
      costoTotaleVoucher,
      costiOperatore,
      valoreTerritorio,
      nuoviProspectB2B,
      nuoviClientiB2B,
      valoreNuoviClienti,
      clientiRitenuti,
      valoreRetention,
      valoreTotaleGenerato,
      roi,
      costoPerPersona,
      impreseCoinvolte,
      eventiValorizzati,
      artistiValorizzati,
      partecipantiTotali: cumulativeParticipants,
      inputValido,
    };
  }, [
    impreseClienti,
    dipendentiPerImpresa,
    referralRate,
    conversionRate,
    invitiMediPerAmbassador,
    fattoreEspansioneMercato,
    cicliReferral,
    costoBiglietto,
    costoVoucher,
    personePerEvento,
    artistiPerEvento,
    valoreMedioAcquisto,
    incrementoRetention,
    nuoviProspectRate,
    tassoChiusuraProspect,
    moltiplicatoreTurismo,
  ]);

  const formatEuro = (n) => {
    if (!Number.isFinite(n)) return "€ 0";
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);
  };

  const formatNum = (n) => {
    if (!Number.isFinite(n)) return "0";
    return new Intl.NumberFormat("it-IT").format(Math.round(n));
  };

  const growthData = stats.storicoCicli.map((c) => ({
    name: `Ciclo ${c.ciclo}`,
    nuovi: c.nuovi,
    cumulativo: c.cumulativo,
  }));

  const valueBreakdownData = [
    { name: "Territorio & Turismo", value: Math.round(stats.valoreTerritorio) },
    { name: "Nuovi Clienti B2B", value: Math.round(stats.valoreNuoviClienti) },
    { name: "Retention Clienti", value: Math.round(stats.valoreRetention) },
  ].filter((d) => d.value > 0);

  const roiBadgeClass =
    stats.roi >= 100
      ? "bg-green-100 text-green-800"
      : stats.roi >= 0
      ? "bg-blue-100 text-blue-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl">
                  Simulatore Referral: Vending × Welfare × Eventi
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm md:text-base mt-1">
                  Modellazione impatto marketing e CSR per Operatori Vending Machine
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="simulatore" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="simulatore">Simulatore</TabsTrigger>
            <TabsTrigger value="metodologia">Metodologia & Assunzioni</TabsTrigger>
          </TabsList>

          {/* ============ TAB SIMULATORE ============ */}
          <TabsContent value="simulatore" className="space-y-6 mt-4">
            {!stats.inputValido && (
              <Alert className="border-red-300 bg-red-50">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <AlertTitle className="text-red-800">Input non valido</AlertTitle>
                <AlertDescription className="text-red-700">
                  Imposta "Imprese clienti" e "Dipendenti per impresa" a valori maggiori di zero
                  per avviare la simulazione.
                </AlertDescription>
              </Alert>
            )}

            {/* Banner riepilogativo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Card className="bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                <CardContent className="pt-5 pb-4">
                  <p className="text-xs uppercase tracking-wide opacity-70">
                    Investimento Totale (Operatore)
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {formatEuro(stats.costiOperatore)}
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    {formatNum(stats.bigliettiDistribuiti)} biglietti × €{costoBiglietto}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white">
                <CardContent className="pt-5 pb-4">
                  <p className="text-xs uppercase tracking-wide opacity-70">
                    Valore Generato Stimato
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {formatEuro(stats.valoreTotaleGenerato)}
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    Territorio + Nuovi clienti + Retention
                  </p>
                </CardContent>
              </Card>
              <Card
                className={
                  stats.roi >= 0
                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
                    : "bg-gradient-to-br from-red-600 to-rose-700 text-white"
                }
              >
                <CardContent className="pt-5 pb-4">
                  <p className="text-xs uppercase tracking-wide opacity-70">
                    ROI Netto
                  </p>
                  <p className="text-3xl font-bold mt-1">{formatNum(stats.roi)}%</p>
                  <p className="text-xs opacity-60 mt-1">
                    Rispetto all'investimento in biglietti
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pannello Configurazione */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    Parametri Simulazione
                  </CardTitle>
                  <CardDescription>
                    Configura lo scenario della tua campagna
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Preset */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-slate-600">
                      Scenari rapidi
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => applyPreset("conservativo")}
                      >
                        Conservativo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => applyPreset("realistico")}
                      >
                        Realistico
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => applyPreset("ottimistico")}
                      >
                        Ottimistico
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Imprese clienti */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      Imprese clienti attuali
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={impreseClienti}
                      onChange={(e) =>
                        setImpreseClienti(clampNum(e.target.value, 0, 100000))
                      }
                      className="text-lg font-semibold"
                    />
                  </div>

                  {/* Dipendenti per impresa */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Users className="w-4 h-4 text-indigo-600" />
                      Dipendenti per impresa
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={dipendentiPerImpresa}
                      onChange={(e) =>
                        setDipendentiPerImpresa(clampNum(e.target.value, 0, 100000))
                      }
                      className="text-lg font-semibold"
                    />
                  </div>

                  {/* Referral rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Share2 className="w-4 h-4 text-green-600" />
                        Referral rate (%)
                      </Label>
                      <Badge variant="secondary" className="font-bold">
                        {referralRate}%
                      </Badge>
                    </div>
                    <Input
                      type="range"
                      min="1"
                      max="40"
                      value={referralRate}
                      onChange={(e) => setReferralRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500">
                      Dipendenti/partecipanti che diventano ambassador
                    </p>
                  </div>

                  {/* Conversion rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <ArrowRight className="w-4 h-4 text-orange-600" />
                        Conversion rate (%)
                      </Label>
                      <Badge variant="secondary" className="font-bold">
                        {conversionRate}%
                      </Badge>
                    </div>
                    <Input
                      type="range"
                      min="1"
                      max="50"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500">
                      Persone invitate che attivano il voucher
                    </p>
                  </div>

                  {/* Cicli referral */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Cicli di referral simulati
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="6"
                      value={cicliReferral}
                      onChange={(e) =>
                        setCicliReferral(clampNum(e.target.value, 1, 6))
                      }
                      className="text-lg font-semibold"
                    />
                    <p className="text-xs text-slate-500">
                      Numero di "onde" di condivisione (max 6)
                    </p>
                  </div>

                  <Separator />

                  {/* Costi */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">
                        Costo Biglietto (€)
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={costoBiglietto}
                        onChange={(e) =>
                          setCostoBiglietto(clampNum(e.target.value, 0, 100000))
                        }
                        className="font-semibold"
                      />
                      <p className="text-xs text-slate-400">a carico Operatore</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">
                        Costo Voucher (€)
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={costoVoucher}
                        onChange={(e) =>
                          setCostoVoucher(clampNum(e.target.value, 0, 100000))
                        }
                        className="font-semibold"
                      />
                      <p className="text-xs text-slate-400">a carico Impresa</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Toggle avanzati */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setShowAdvanced((s) => !s)}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <SlidersHorizontal className="w-4 h-4" />
                      Parametri avanzati
                    </span>
                    {showAdvanced ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>

                  {showAdvanced && (
                    <div className="space-y-4 pt-2 border-t border-dashed">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium text-slate-600">
                            Inviti medi per ambassador
                          </Label>
                          <Badge variant="secondary">{invitiMediPerAmbassador}</Badge>
                        </div>
                        <Input
                          type="range"
                          min="1"
                          max="8"
                          value={invitiMediPerAmbassador}
                          onChange={(e) =>
                            setInvitiMediPerAmbassador(Number(e.target.value))
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium text-slate-600">
                            Fattore espansione mercato (× seed)
                          </Label>
                          <Badge variant="secondary">{fattoreEspansioneMercato}×</Badge>
                        </div>
                        <Input
                          type="range"
                          min="1"
                          max="8"
                          step="0.5"
                          value={fattoreEspansioneMercato}
                          onChange={(e) =>
                            setFattoreEspansioneMercato(Number(e.target.value))
                          }
                          className="w-full"
                        />
                        <p className="text-xs text-slate-500">
                          Quanto oltre la base dipendenti può crescere il referral (amici,
                          familiari, altre imprese)
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs font-medium text-slate-600">
                            Persone per evento
                          </Label>
                          <Input
                            type="number"
                            min="1"
                            value={personePerEvento}
                            onChange={(e) =>
                              setPersonePerEvento(clampNum(e.target.value, 1, 100000))
                            }
                            className="font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-medium text-slate-600">
                            Artisti per evento
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={artistiPerEvento}
                            onChange={(e) =>
                              setArtistiPerEvento(clampNum(e.target.value, 0, 1000))
                            }
                            className="font-semibold"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-600">
                          LTV annuo cliente B2B (€)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={valoreMedioAcquisto}
                          onChange={(e) =>
                            setValoreMedioAcquisto(clampNum(e.target.value, 0, 10000000))
                          }
                          step="100"
                          className="font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-600">
                          Incremento retention clienti (%)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={incrementoRetention}
                          onChange={(e) =>
                            setIncrementoRetention(clampNum(e.target.value, 0, 100))
                          }
                          className="font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-600">
                          % nuovi partecipanti = potenziali prospect B2B
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={nuoviProspectRate}
                          onChange={(e) =>
                            setNuoviProspectRate(clampNum(e.target.value, 0, 100))
                          }
                          className="font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-600">
                          Tasso chiusura prospect→cliente (%)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={tassoChiusuraProspect}
                          onChange={(e) =>
                            setTassoChiusuraProspect(clampNum(e.target.value, 0, 100))
                          }
                          className="font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-600">
                          Moltiplicatore valore turistico indotto
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          step="0.1"
                          value={moltiplicatoreTurismo}
                          onChange={(e) =>
                            setMoltiplicatoreTurismo(clampNum(e.target.value, 1, 10))
                          }
                          className="font-semibold"
                        />
                      </div>
                    </div>
                  )}

                  <Button onClick={reset} variant="outline" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Ripristina valori default
                  </Button>
                </CardContent>
              </Card>

              {/* Pannello Risultati */}
              <div className="lg:col-span-2 space-y-6">
                {/* K-factor & saturazione */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <Zap className="w-4 h-4 text-amber-500" />
                          Coefficiente virale (K-factor)
                        </span>
                        <Badge
                          className={
                            stats.kFactor >= 1
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {stats.kFactor.toFixed(2)}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        {stats.kFactor >= 1
                          ? "🚀 Ogni ambassador genera più di un nuovo partecipante: crescita auto-sostenibile."
                          : "🔄 Crescita in decadimento: il programma richiede nuovi seed periodici per mantenersi attivo."}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <Gauge className="w-4 h-4 text-blue-500" />
                          Saturazione mercato esteso
                        </span>
                        <Badge variant="secondary">
                          {formatNum(stats.saturazionePct)}%
                        </Badge>
                      </div>
                      <Progress value={stats.saturazionePct} className="h-2" />
                      <p className="text-xs text-slate-500 mt-2">
                        Rispetto al mercato addizionale raggiungibile (
                        {formatNum(stats.tamEsteso)} persone oltre la base)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {stats.saturato && (
                  <Alert className="border-amber-300 bg-amber-50">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">
                      Mercato saturato al ciclo {stats.cicloSaturazione}
                    </AlertTitle>
                    <AlertDescription className="text-amber-700">
                      Il referral ha raggiunto il limite del mercato addizionale stimato.
                      Aumenta il "Fattore espansione mercato" nei parametri avanzati per
                      simulare un bacino più ampio (nuove imprese, territori, community).
                    </AlertDescription>
                  </Alert>
                )}

                {/* KPI principali */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <CardContent className="pt-5 pb-4">
                      <Ticket className="w-6 h-6 mb-2 opacity-80" />
                      <p className="text-2xl font-bold">
                        {formatNum(stats.bigliettiDistribuiti)}
                      </p>
                      <p className="text-xs opacity-90">Biglietti distribuiti</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <CardContent className="pt-5 pb-4">
                      <Hotel className="w-6 h-6 mb-2 opacity-80" />
                      <p className="text-2xl font-bold">
                        {formatNum(stats.pernottamenti)}
                      </p>
                      <p className="text-xs opacity-90">Pernottamenti Hotel</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                    <CardContent className="pt-5 pb-4">
                      <Users className="w-6 h-6 mb-2 opacity-80" />
                      <p className="text-2xl font-bold">
                        {formatNum(stats.partecipantiTotali)}
                      </p>
                      <p className="text-xs opacity-90">Persone raggiunte</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <CardContent className="pt-5 pb-4">
                      <Heart className="w-6 h-6 mb-2 opacity-80" />
                      <p className="text-2xl font-bold">
                        {formatNum(stats.impreseCoinvolte)}
                      </p>
                      <p className="text-xs opacity-90">Imprese coinvolte</p>
                    </CardContent>
                  </Card>
                </div>

                {/* ROI Card */}
                <Card
                  className={
                    stats.roi >= 0 ? "border-2 border-green-400" : "border-2 border-red-300"
                  }
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        ROI Stimato della Campagna
                      </span>
                      <Badge className={`${roiBadgeClass} text-lg px-4 py-1`}>
                        {formatNum(stats.roi)}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
                          Costi Operatore
                        </h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            Biglietti omaggio ({formatNum(stats.bigliettiDistribuiti)} × €
                            {costoBiglietto})
                          </span>
                          <span className="font-bold text-red-600">
                            -{formatEuro(stats.costoTotaleBiglietti)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Totale investimento</span>
                          <span className="text-red-600">
                            {formatEuro(stats.costiOperatore)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 pt-2">
                          Nota: il costo del voucher welfare (
                          {formatEuro(stats.costoTotaleVoucher)}) è a carico delle imprese
                          clienti, non dell'operatore.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
                          Valore Generato
                        </h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Valore territorio (turismo)</span>
                          <span className="font-bold text-green-600">
                            +{formatEuro(stats.valoreTerritorio)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            Nuovi clienti B2B ({stats.nuoviClientiB2B})
                          </span>
                          <span className="font-bold text-green-600">
                            +{formatEuro(stats.valoreNuoviClienti)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            Retention clienti ({stats.clientiRitenuti})
                          </span>
                          <span className="font-bold text-green-600">
                            +{formatEuro(stats.valoreRetention)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Valore totale</span>
                          <span className="text-green-600">
                            {formatEuro(stats.valoreTotaleGenerato)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Grafici */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Crescita del referral per ciclo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={growthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                              formatter={(value, name) => [
                                formatNum(value),
                                name === "nuovi" ? "Nuovi partecipanti" : "Cumulativo",
                              ]}
                            />
                            <Legend
                              formatter={(value) =>
                                value === "nuovi" ? "Nuovi partecipanti" : "Cumulativo"
                              }
                            />
                            <Bar dataKey="nuovi" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Line
                              type="monotone"
                              dataKey="cumulativo"
                              stroke="#f59e0b"
                              strokeWidth={2}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Composizione del valore generato
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        {valueBreakdownData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={valueBreakdownData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                              >
                                {valueBreakdownData.map((entry, idx) => (
                                  <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => formatEuro(value)} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex items-center justify-center text-sm text-slate-400">
                            Nessun valore da mostrare con i parametri attuali
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Vantaggi per l'Operatore */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-6 h-6 text-indigo-600" />
                      Vantaggi per l'Operatore Vending Machine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <VantaggioItem
                        icon={<Building2 className="w-5 h-5" />}
                        title="Fidelizzazione B2B"
                        value={`${incrementoRetention}% retention↑`}
                        detail={`${stats.clientiRitenuti} clienti trattenuti = ${formatEuro(
                          stats.valoreRetention
                        )}`}
                        color="bg-indigo-50 text-indigo-700 border-indigo-200"
                      />
                      <VantaggioItem
                        icon={<TrendingUp className="w-5 h-5" />}
                        title="Nuovi Clienti B2B"
                        value={`${stats.nuoviClientiB2B} acquisiti`}
                        detail={`Via passaparola = ${formatEuro(stats.valoreNuoviClienti)}`}
                        color="bg-green-50 text-green-700 border-green-200"
                      />
                      <VantaggioItem
                        icon={<MapPin className="w-5 h-5" />}
                        title="Impatto Territoriale"
                        value={`${formatNum(stats.pernottamenti)} pernottamenti`}
                        detail={`Valore turismo indotto: ${formatEuro(stats.valoreTerritorio)}`}
                        color="bg-blue-50 text-blue-700 border-blue-200"
                      />
                      <VantaggioItem
                        icon={<Heart className="w-5 h-5" />}
                        title="CSR & Brand Equity"
                        value={`${stats.eventiValorizzati} eventi valorizzati`}
                        detail={`${stats.artistiValorizzati} artisti promossi, ${stats.impreseCoinvolte} imprese attivate`}
                        color="bg-pink-50 text-pink-700 border-pink-200"
                      />
                      <VantaggioItem
                        icon={<Ticket className="w-5 h-5" />}
                        title="Costo per Persona Raggiunta"
                        value={formatEuro(stats.costoPerPersona)}
                        detail="Confronta con il CAC medio dei tuoi canali tradizionali"
                        color="bg-amber-50 text-amber-700 border-amber-200"
                      />
                      <VantaggioItem
                        icon={<Share2 className="w-5 h-5" />}
                        title="Viralità del Network"
                        value={`K = ${stats.kFactor.toFixed(2)}`}
                        detail={
                          stats.kFactor >= 1
                            ? "Crescita auto-sostenibile"
                            : "Richiede nuovi seed periodici"
                        }
                        color="bg-purple-50 text-purple-700 border-purple-200"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Footer informativo */}
                <Card className="bg-slate-800 text-slate-200">
                  <CardContent className="pt-5 pb-5 text-sm space-y-2">
                    <p className="font-semibold text-white">📋 Modello Partnership</p>
                    <p>
                      <span className="text-blue-400 font-medium">Operatore Vending</span> →
                      eroga biglietti omaggio (€{costoBiglietto}/biglietto) come reward referral
                    </p>
                    <p>
                      <span className="text-green-400 font-medium">Imprese Clienti</span> →
                      erogano voucher welfare (€{costoVoucher}/dipendente) per pernottamento
                      Hotel
                    </p>
                    <p>
                      <span className="text-purple-400 font-medium">Dipendenti</span> → vivono
                      l'esperienza evento e diventano ambassador del referral
                    </p>
                    <p>
                      <span className="text-amber-400 font-medium">
                        Hotel + Artisti + Territorio
                      </span>{" "}
                      → beneficiano dell'indotto economico e della valorizzazione
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ============ TAB METODOLOGIA ============ */}
          <TabsContent value="metodologia" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Come funziona il modello
                </CardTitle>
                <CardDescription>
                  Ogni formula è trasparente e modificabile tramite i parametri avanzati, per
                  poter argomentare il modello con i tuoi stakeholder.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-700">
                <MetodoItem
                  titolo="1. Popolazione Seed"
                  formula="Imprese clienti × Dipendenti per impresa"
                  spiegazione="È la base già coperta dalla partnership welfare: tutti questi dipendenti ricevono il biglietto omaggio al Ciclo 1, indipendentemente dal referral."
                />
                <MetodoItem
                  titolo="2. Coefficiente virale (K-factor)"
                  formula="Referral rate × Inviti medi per ambassador × Conversion rate"
                  spiegazione="Misura quante nuove persone genera in media ogni ambassador. Se K ≥ 1 il programma si auto-alimenta; se K < 1 la crescita decade nel tempo e serve rinnovare il seeding."
                />
                <MetodoItem
                  titolo="3. Saturazione del mercato"
                  formula="TAM esteso = Popolazione Seed × Fattore espansione mercato"
                  spiegazione="La crescita virale non è infinita: è limitata da un mercato addizionale raggiungibile (amici, familiari, altre imprese). Superata questa soglia, il programma satura e servono nuove leve (nuovi eventi, nuove aree geografiche, nuove imprese partner)."
                />
                <MetodoItem
                  titolo="4. Valore Territorio & Turismo"
                  formula="Pernottamenti × Costo Voucher × Moltiplicatore turismo"
                  spiegazione="Stima l'indotto economico locale (ristorazione, trasporti, retail) generato da ogni pernottamento, oltre al valore del voucher stesso."
                />
                <MetodoItem
                  titolo="5. Nuovi Clienti B2B"
                  formula="(Crescita da referral) × % prospect × Tasso di chiusura"
                  spiegazione="Solo la crescita generata dal referral (non la base seed, già clienti) viene considerata come fonte di nuovi lead B2B per l'operatore vending."
                />
                <MetodoItem
                  titolo="6. Retention Clienti"
                  formula="Imprese clienti × Incremento retention%"
                  spiegazione="Stima quante imprese clienti vengono trattenute (churn evitato) grazie al valore percepito del programma di welfare/CSR."
                />
                <MetodoItem
                  titolo="7. ROI"
                  formula="(Valore generato − Investimento biglietti) / Investimento biglietti"
                  spiegazione="Il ROI confronta solo l'investimento diretto dell'operatore (i biglietti omaggio) con il valore totale generato, escludendo il costo del voucher che è a carico delle imprese clienti."
                />
              </CardContent>
            </Card>

            <Alert className="border-blue-300 bg-blue-50">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Suggerimento per la presentazione</AlertTitle>
              <AlertDescription className="text-blue-700">
                Usa gli "Scenari rapidi" (Conservativo/Realistico/Ottimistico) per mostrare una
                forbice di risultati agli stakeholder, evidenziando che anche nello scenario più
                prudente il programma genera valore netto positivo.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function VantaggioItem({ icon, title, value, detail, color }) {
  return (
    <div className={`p-4 rounded-xl border ${color}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-lg font-bold mt-1">{value}</p>
          <p className="text-xs opacity-80 mt-1">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function MetodoItem({ titolo, formula, spiegazione }) {
  return (
    <div className="border-l-4 border-blue-400 pl-4 py-1">
      <h4 className="font-semibold text-slate-800">{titolo}</h4>
      <p className="text-xs font-mono bg-slate-100 rounded px-2 py-1 inline-block mt-1">
        {formula}
      </p>
      <p className="text-slate-600 mt-1">{spiegazione}</p>
    </div>
  );
}