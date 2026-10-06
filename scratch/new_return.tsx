// @ts-nocheck
/* eslint-disable */
// Temporary scratch fragment (active code is in src/App.tsx)
export function ScratchNewReturn() {
  return (
    <div className="min-h-screen py-6 px-3 sm:px-6 lg:px-8 relative selection:bg-blue-600 selection:text-white">
      {/* Background ambient glow matching twilight horizon */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[10%] w-[450px] h-[350px] bg-amber-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header Principale */}
        <Card className="glass-panel text-white shadow-2xl border border-white/12 p-5 sm:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 glass-pill text-blue-400 shadow-sm">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  Simulatore Referral: Vending × Welfare × Eventi
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Modellazione sinergica con Matching Grant Biglietti, Metriche di Viralità & Impatto Territoriale Integrato
                </p>
              </div>
            </div>

            {/* Scenari rapidi globali */}
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
          </div>
        </Card>

        {/* Tab Navigazione Principale */}
        <Tabs defaultValue="simulatore" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md glass-well p-1 border border-white/10">
            <TabsTrigger value="simulatore" className="rounded-xl font-medium">
              Simulatore & Risultati
            </TabsTrigger>
            <TabsTrigger value="metodologia" className="rounded-xl font-medium">
              Metodologia & Algoritmi
            </TabsTrigger>
          </TabsList>

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
              {/* 1. Investimento Operatore (MATCHING GRANT) */}
              <Card className="glass-panel p-4 sm:p-5 border border-white/12 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
                    Investimento Operatore
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* =========================================
                  COLONNA SINISTRA: FORMS DI CONFIGURAZIONE
                  ========================================= */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* FORM 1: CANALE WELFARE & REFERRAL CSR */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div>
                    <h2 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      1. Canale Welfare Imprese CSR Partner
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Base dipendenti aziendali, tassi di riscatto voucher e moltiplicatori presenze
                    </p>
                  </div>

                  <div className="space-y-4 text-sm">
                    {/* Imprese clienti & Dipendenti */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">
                          Imprese Partner CSR
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={impreseClienti}
                          onChange={(e) =>
                            setImpreseClienti(clampNum(e.target.value, 0, 100000))
                          }
                          className="font-bold text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">
                          Dipendenti / Impresa
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={dipendentiPerImpresa}
                          onChange={(e) =>
                            setDipendentiPerImpresa(clampNum(e.target.value, 0, 100000))
                          }
                          className="font-bold text-white"
                        />
                      </div>
                    </div>

                    <div className="glass-well p-2.5 text-xs text-slate-300 flex justify-between items-center border border-white/10">
                      <span>Bacino Totale Dipendenti:</span>
                      <span className="font-bold text-sm text-white">
                        {formatNum(stats.dipendentiTotaliPotenziali)} dipendenti
                      </span>
                    </div>

                    {/* TASSI DI ADESIONE AI VOUCHER */}
                    <div className="glass-panel-subtle p-3.5 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Percent className="w-3.5 h-3.5 text-blue-400" />
                          Tassi di Adesione & Riscatto Effettivo Voucher
                        </span>
                        <Badge variant="outline" className="text-[10px] text-blue-300 border-white/15">
                          Seed Reale
                        </Badge>
                      </div>

                      {/* Tasso Adesione Hotel */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <Label className="text-slate-300 font-medium flex items-center gap-1">
                            <Hotel className="w-3 h-3 text-blue-400" />
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
                          className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      {/* Tasso Adesione Aperitivo */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <Label className="text-slate-300 font-medium flex items-center gap-1">
                            <Utensils className="w-3 h-3 text-blue-400" />
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
                          className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs text-slate-300">
                        <span>Base Seed Attiva per Referral Welfare:</span>
                        <span className="font-bold text-xs glass-pill text-white px-2 py-0.5 rounded">
                          {formatNum(stats.seedPopulation)} aderenti con voucher
                        </span>
                      </div>
                    </div>

                    {/* MOLTIPLICATORE PRESENZE EFFETTIVE / ACCOMPAGNATORI */}
                    <div className="glass-panel-subtle p-3.5 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-white flex items-center gap-1.5">
                          <UserPlus className="w-3.5 h-3.5 text-blue-400" />
                          Moltiplicatore Accompagnatori / Presenze
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">da 0.5× a 3.0×</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1 glass-well p-2 border border-white/10">
                          <div className="flex justify-between items-center">
                            <Label className="text-[11px] font-semibold text-slate-300">Hotel (×)</Label>
                            <span className="text-xs font-bold text-blue-400">{moltiplicatoreHotel}×</span>
                          </div>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="3.0"
                            value={moltiplicatoreHotel}
                            onChange={(e) => setMoltiplicatoreHotel(clampNum(e.target.value, 0.5, 3.0))}
                            className="h-7 text-xs font-bold text-white"
                          />
                          <p className="text-[10px] text-slate-400">
                            ={formatNum(stats.presenzeDiretteHotelSeed)} notti dirette
                          </p>
                        </div>

                        <div className="space-y-1 glass-well p-2 border border-white/10">
                          <div className="flex justify-between items-center">
                            <Label className="text-[11px] font-semibold text-slate-300">Aperitivo (×)</Label>
                            <span className="text-xs font-bold text-blue-400">{moltiplicatoreAperitivo}×</span>
                          </div>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="3.0"
                            value={moltiplicatoreAperitivo}
                            onChange={(e) => setMoltiplicatoreAperitivo(clampNum(e.target.value, 0.5, 3.0))}
                            className="h-7 text-xs font-bold text-white"
                          />
                          <p className="text-[10px] text-slate-400">
                            ={formatNum(stats.presenzeDiretteAperitivoSeed)} aperitivi diretti
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        * I moltiplicatori determinano le presenze dirette e i biglietti omaggio matching grant ({formatNum(stats.bigliettiDistribuiti)} biglietti).
                      </p>
                    </div>

                    {/* Referral Rate & Conversion Rate Welfare */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium text-slate-300">Referral (%)</Label>
                          <Badge variant="secondary" className="text-[10px] font-bold">{referralRate}%</Badge>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="40"
                          value={referralRate}
                          onChange={(e) => setReferralRate(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs font-medium text-slate-300">Conversione (%)</Label>
                          <Badge variant="secondary" className="text-[10px] font-bold">{conversionRate}%</Badge>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="50"
                          value={conversionRate}
                          onChange={(e) => setConversionRate(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                    </div>

                    {/* Cicli Referral Welfare & Costo Biglietto */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">
                          Cicli Referral (1 - 6)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="6"
                          value={cicliReferral}
                          onChange={(e) =>
                            setCicliReferral(clampNum(e.target.value, 1, 6))
                          }
                          className="font-semibold text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">
                          Biglietto (€)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={costoBiglietto}
                          onChange={(e) =>
                            setCostoBiglietto(clampNum(e.target.value, 0, 10000))
                          }
                          className="font-semibold text-blue-400"
                        />
                        <span className="text-[10px] text-slate-400 block leading-none">
                          Matching Grant Operatore
                        </span>
                      </div>
                    </div>

                    {/* VOUCHER WELFARE CSR: HOTEL & APERITIVO-CENA */}
                    <div className="glass-panel-subtle p-3.5 border border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Coins className="w-4 h-4 text-blue-400" />
                          Voucher Erogati da Imprese Partner CSR
                        </Label>
                        <span className="text-[10px] glass-pill text-blue-300 px-2 py-0.5 rounded font-semibold">
                          Tot. €{stats.costoVoucherTotaleUnitario}/persona
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1 glass-well p-2 border border-white/10">
                          <Label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                            <Hotel className="w-3 h-3 text-blue-400" />
                            Voucher Hotel (€)
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={costoVoucherHotel}
                            onChange={(e) =>
                              setCostoVoucherHotel(clampNum(e.target.value, 0, 10000))
                            }
                            className="h-8 font-bold text-white"
                          />
                          <span className="text-[10px] text-slate-400 block">Pernottamento (0 per escludere)</span>
                        </div>

                        <div className="space-y-1 glass-well p-2 border border-white/10">
                          <Label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                            <Utensils className="w-3 h-3 text-blue-400" />
                            Voucher Aperitivo (€)
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={costoVoucherAperitivo}
                            onChange={(e) =>
                              setCostoVoucherAperitivo(clampNum(e.target.value, 0, 10000))
                            }
                            className="h-8 font-bold text-white"
                          />
                          <span className="text-[10px] text-slate-400 block">Food & Drink (0 per escludere)</span>
                        </div>
                      </div>
                    </div>

                    {/* Parametri Avanzati Welfare & Modello Economico Startup */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-xs text-slate-300 hover:text-white hover:bg-white/10 h-8 border border-white/10 rounded-xl"
                      onClick={() => setShowAdvancedWelfare((s) => !s)}
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                        Opzioni avanzate Welfare, Prezzi & Margini Startup
                      </span>
                      {showAdvancedWelfare ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </Button>

                    {showAdvancedWelfare && (
                      <div className="space-y-3 pt-2 border-t border-dashed border-white/10 text-xs">
                        
                        {/* Box Prezzi & Margini Startup */}
                        <div className="glass-panel-subtle p-3 border border-white/10 space-y-2">
                          <p className="font-semibold text-white text-[11px] flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                            Prezzi & Margini Startup (% trattenute su voucher)
                          </p>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-[10px] text-slate-400">Prezzo Hotel/Agriturismo (€)</Label>
                              <Input
                                type="number"
                                min="0"
                                value={prezzoHotel}
                                onChange={(e) => setPrezzoHotel(clampNum(e.target.value, 0, 10000))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-[10px] text-slate-400">Margine Startup Hotel (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={margineStartupHotel}
                                onChange={(e) => setMargineStartupHotel(clampNum(e.target.value, 0, 100))}
                                className="h-7 text-xs font-semibold text-blue-400"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-[10px] text-slate-400">Prezzo Aperitivo-Cena (€)</Label>
                              <Input
                                type="number"
                                min="0"
                                value={prezzoAperitivo}
                                onChange={(e) => setPrezzoAperitivo(clampNum(e.target.value, 0, 10000))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-[10px] text-slate-400">Margine Startup Aperitivo (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={margineStartupAperitivo}
                                onChange={(e) => setMargineStartupAperitivo(clampNum(e.target.value, 0, 100))}
                                className="h-7 text-xs font-semibold text-blue-400"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-[11px] text-slate-400">Inviti medi / ambassador</Label>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={invitiMediPerAmbassador}
                              onChange={(e) => setInvitiMediPerAmbassador(clampNum(e.target.value, 1, 10))}
                              className="h-8 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-[11px] text-slate-400">Fattore TAM esteso (×)</Label>
                            <Input
                              type="number"
                              step="0.5"
                              min="1"
                              max="10"
                              value={fattoreEspansioneMercato}
                              onChange={(e) => setFattoreEspansioneMercato(clampNum(e.target.value, 1, 10))}
                              className="h-8 text-white"
                            />
                          </div>
                        </div>

                        {/* Pipeline B2B & Churn Differenziale */}
                        <div className="glass-panel-subtle p-3 border border-white/10 space-y-2">
                          <p className="font-semibold text-white text-[11px] flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-blue-400" />
                            Pipeline B2B & Retention da Churn Differenziale
                          </p>

                          <div>
                            <Label className="text-[11px] text-slate-400">LTV annuo B2B (€/anno)</Label>
                            <Input
                              type="number"
                              value={valoreMedioAcquisto}
                              onChange={(e) => setValoreMedioAcquisto(clampNum(e.target.value, 0, 100000))}
                              className="h-8 text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 glass-well border border-white/10 rounded-xl">
                              <div className="flex justify-between items-center mb-0.5">
                                <Label className="text-[10px] font-bold text-slate-300">Churn AS-IS (%)</Label>
                                <span className="text-[10px] text-slate-400 font-semibold">{churnRateAsIs}%</span>
                              </div>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={churnRateAsIs}
                                onChange={(e) => setChurnRateAsIs(clampNum(e.target.value, 0, 100))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                              <span className="text-[9px] text-slate-400 block mt-0.5">Storico pre-welfare</span>
                            </div>

                            <div className="p-2 glass-well border border-white/10 rounded-xl">
                              <div className="flex justify-between items-center mb-0.5">
                                <Label className="text-[10px] font-bold text-slate-300">Churn TO-BE (%)</Label>
                                <span className="text-[10px] text-blue-400 font-semibold">{churnRateToBe}%</span>
                              </div>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={churnRateToBe}
                                onChange={(e) => setChurnRateToBe(clampNum(e.target.value, 0, 100))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                              <span className="text-[9px] text-slate-400 block mt-0.5">Post-welfare (Δ +{stats.deltaChurnRetention}%)</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div>
                              <Label className="text-[11px] text-slate-400">% Nuovi Prospect B2B</Label>
                              <Input
                                type="number"
                                value={nuoviProspectRate}
                                onChange={(e) => setNuoviProspectRate(clampNum(e.target.value, 0, 100))}
                                className="h-8 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-[11px] text-slate-400">Chiusura Prospect (%)</Label>
                              <Input
                                type="number"
                                value={tassoChiusuraProspect}
                                onChange={(e) => setTassoChiusuraProspect(clampNum(e.target.value, 0, 100))}
                                className="h-8 text-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Modulo Produttori Locali Km 0 & Sinergia ESG */}
                        <div className="glass-panel-subtle p-3.5 border border-white/10 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-white text-[11px] flex items-center gap-1">
                              <Leaf className="w-3.5 h-3.5 text-blue-400" />
                              Store Km 0 & Sinergia ESG (Produttori Locali)
                            </p>
                            <span className="text-[10px] glass-pill text-blue-300 px-2 py-0.5 rounded font-semibold">
                              Base: {formatNum(stats.baseDipendentiDiretti)} dip. diretti
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight">
                            Opportunità per i produttori locali di promuovere e vendere prodotti ai dipendenti delle imprese partner che erogano i Voucher (esclusi referral).
                          </p>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-[10px] text-slate-400">Adozione Store Km 0 (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={adozioneKmZero}
                                onChange={(e) => setAdozioneKmZero(clampNum(e.target.value, 0, 100))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                              <span className="text-[9px] text-slate-400 block mt-0.5">
                                {stats.dipendentiAttiviKmZero} acquirenti attivi
                              </span>
                            </div>
                            <div>
                              <Label className="text-[10px] text-slate-400">Frequenza Acquisti (ordini/anno)</Label>
                              <Input
                                type="number"
                                min="1"
                                max="52"
                                value={frequenzaAcquistiKmZero}
                                onChange={(e) => setFrequenzaAcquistiKmZero(clampNum(e.target.value, 1, 52))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                              <span className="text-[9px] text-slate-400 block mt-0.5">
                                {formatNum(stats.ordiniTotaliKmZero)} ordini/anno
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-[10px] text-slate-400">Scontrino Medio Km 0 (€)</Label>
                              <Input
                                type="number"
                                min="0"
                                value={scontrinoMedioKmZero}
                                onChange={(e) => setScontrinoMedioKmZero(clampNum(e.target.value, 0, 1000))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                              <span className="text-[9px] text-slate-400 block mt-0.5">
                                Indotto: {formatEuro(stats.fatturatoProduttoriKmZero)}
                              </span>
                            </div>
                            <div>
                              <Label className="text-[10px] text-slate-400">Tratta Evitata (km/consegna)</Label>
                              <Input
                                type="number"
                                min="0"
                                value={trattaLogisticaEvitata}
                                onChange={(e) => setTrattaLogisticaEvitata(clampNum(e.target.value, 0, 500))}
                                className="h-7 text-xs font-semibold text-white"
                              />
                              <span className="text-[9px] text-slate-400 block mt-0.5">
                                -{formatNum(stats.kmLogisticaEvitati)} km totali
                              </span>
                            </div>
                          </div>

                          <div className="p-2 glass-well border border-white/10 flex justify-between items-center text-[11px]">
                            <span className="text-slate-300 font-semibold flex items-center gap-1">
                              <Trees className="w-3.5 h-3.5 text-blue-400" />
                              CO₂ Risparmiata Stimata:
                            </span>
                            <span className="font-bold text-white">
                              -{formatNum(stats.co2RisparmiataKg)} kg CO₂/anno
                            </span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-[11px] text-slate-400">Moltiplicatore Turismo indotto</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={moltiplicatoreTurismo}
                            onChange={(e) => setMoltiplicatoreTurismo(clampNum(e.target.value, 1, 10))}
                            className="h-8 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* FORM 2: CANALE ADVERTISING & LOCAL EVENT LOYALTY */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                        <Megaphone className="w-5 h-5 text-blue-400" />
                        2. Advertising & Local Event Loyalty
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Domanda generata della Campagna di Advertising: Fidelizzazione e passaparola per eventi successivi nella stessa località
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-semibold text-slate-300 border-white/15">
                      Edizioni Successive
                    </Badge>
                  </div>

                  <div className="space-y-4 text-sm">
                    {/* Persone per Evento Iniziale */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
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
                        className="font-bold text-lg text-white"
                      />
                      <p className="text-[11px] text-slate-400">
                        Capienza / base partecipanti dell'evento iniziale sul territorio.
                      </p>
                    </div>

                    {/* a) Tasso di Retention */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs font-medium text-slate-300">
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
                        className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <p className="text-[11px] text-slate-400">
                        Partecipanti che tornano spontaneamente all'edizione successiva
                      </p>
                    </div>

                    {/* b) & c) Inviti medi & Tasso di Referral */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-300">
                          b) Inviti medi / persona
                        </Label>
                        <Input
                          type="number"
                          step="0.5"
                          min="1"
                          max="10"
                          value={invitiMediEvento}
                          onChange={(e) => setInvitiMediEvento(clampNum(e.target.value, 0.5, 20))}
                          className="font-semibold text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-300">
                          c) Tasso Referral (%)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={referralRateEvento}
                          onChange={(e) => setReferralRateEvento(clampNum(e.target.value, 0, 100))}
                          className="font-semibold text-white"
                        />
                      </div>
                    </div>

                    {/* d) & e) Tasso di Conversione & Numero Cicli */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-300">
                          d) Conversione Referral (%)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={conversionRateEvento}
                          onChange={(e) => setConversionRateEvento(clampNum(e.target.value, 0, 100))}
                          className="font-semibold text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-300">
                          e) Edizioni simulate (1-5)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={cicliEvento}
                          onChange={(e) => setCicliEvento(clampNum(e.target.value, 1, 5))}
                          className="font-bold text-blue-400"
                        />
                      </div>
                    </div>

                    {/* Parametri Opzionali Evento */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-xs text-slate-300 hover:text-white hover:bg-white/10 h-8 border border-white/10 rounded-xl"
                      onClick={() => setShowAdvancedEvent((s) => !s)}
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                        Parametri economici & Artisti evento
                      </span>
                      {showAdvancedEvent ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </Button>

                    {showAdvancedEvent && (
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-white/10 text-xs">
                        <div>
                          <Label className="text-[11px] text-slate-400">Spesa media / persona (€)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={spesaMediaTerritorioEvento}
                            onChange={(e) => setSpesaMediaTerritorioEvento(clampNum(e.target.value, 0, 1000))}
                            className="h-8 text-white"
                          />
                          <p className="text-[10px] text-slate-500 mt-0.5">Indotto locale partecipante</p>
                        </div>
                        <div>
                          <Label className="text-[11px] text-slate-400">Artisti per evento</Label>
                          <Input
                            type="number"
                            min="0"
                            value={artistiPerEvento}
                            onChange={(e) => setArtistiPerEvento(clampNum(e.target.value, 0, 100))}
                            className="h-8 text-white"
                          />
                          <p className="text-[10px] text-slate-500 mt-0.5">Talenti/artisti promossi</p>
                        </div>
                      </div>
                    )}

                    <Button onClick={reset} variant="outline" size="sm" className="w-full mt-2 text-xs border-white/12 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl">
                      <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                      Ripristina tutti i valori di default
                    </Button>
                  </div>
                </Card>
              </div>

              {/* =========================================
                  COLONNA DESTRA: RISULTATI E ANALISI
                  ========================================= */}
              <div className="lg:col-span-7 space-y-6">

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
                            backgroundColor: 'rgba(10, 14, 23, 0.95)',
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '12px',
                            color: '#fff',
                            backdropFilter: 'blur(16px)',
                          }}
                          formatter={(value, name) => [
                            formatNum(value),
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

                {/* 5. SEZIONE RISULTATI CANALE WELFARE & ROI OPERATORE */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-white">
                        <Award className="w-5 h-5 text-blue-400" />
                        Bilancio Economico & Impatto sullo Sviluppo Locale
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Distinzione trasparente tra investimento dell'operatore vending (Matching Grant) e spesa voucher coperta dalle imprese CSR
                      </p>
                    </div>
                    <Badge className={`${roiBadgeClass} text-sm px-3 py-1 font-bold self-start sm:self-auto`}>
                      ROI: +{formatNum(stats.roi)}%
                    </Badge>
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
                        <span className="font-bold text-blue-400 text-sm">
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
                      <div className="flex justify-between items-center font-bold text-white pt-0.5">
                        <span>Totale Benefit erogati dalla Startup:</span>
                        <span className="text-blue-400 text-sm">{formatEuro(stats.totaleBenefitStartup)}</span>
                      </div>
                    </div>

                    {/* Colonna Destra: Valore Generato B2B + Territorio */}
                    <div className="space-y-3 p-4 glass-panel-subtle rounded-xl border border-white/10 text-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-white/10">
                        <span className="font-bold text-white uppercase tracking-wide">
                          Ritorno & Valore Generato B2B + Territorio
                        </span>
                        <span className="text-blue-400 font-semibold">Distinzione Canali</span>
                      </div>

                      {/* SEZIONE TERRITORIO */}
                      <div className="space-y-1.5 p-3 glass-well rounded-xl border border-white/10">
                        <p className="font-bold text-white text-[11px] uppercase tracking-wider">
                          Sviluppo Locale & Territorio
                        </p>

                        <div className="flex justify-between items-center py-0.5 text-slate-300">
                          <div>
                            <p className="font-semibold text-white">Hotel & Agriturismi (netto)</p>
                            <p className="text-[10px] text-slate-400">Ricavo diretto strutture ricettive locali</p>
                          </div>
                          <span className="font-bold text-blue-400">+{formatEuro(stats.quotaNettaHotel)}</span>
                        </div>

                        <div className="flex justify-between items-center py-0.5 text-slate-300">
                          <div>
                            <p className="font-semibold text-white">Aperitivo & Cena (netto)</p>
                            <p className="text-[10px] text-slate-400">Ricavo netto food & ristoratori locali</p>
                          </div>
                          <span className="font-bold text-blue-400">+{formatEuro(stats.quotaNettaAperitivo)}</span>
                        </div>

                        <div className="flex justify-between items-center py-0.5 text-slate-300">
                          <div>
                            <p className="font-semibold text-white">Impatto Territoriale CSR Voucher</p>
                            <p className="text-[10px] text-slate-400">Moltiplicatore 2.5×</p>
                          </div>
                          <span className="font-bold text-blue-400">+{formatEuro(stats.valoreTerritorioMoltiplicato)}</span>
                        </div>

                        <div className="flex justify-between items-center py-0.5 text-slate-300">
                          <div>
                            <p className="font-semibold text-white flex items-center gap-1">
                              <Leaf className="w-3 h-3 text-blue-400" />
                              Valore della Valorizzazione Filiera Corta Locale
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {stats.dipendentiAttiviKmZero} acquirenti dipendenti partner ({formatNum(stats.ordiniTotaliKmZero)} ordini Km 0)
                            </p>
                          </div>
                          <span className="font-bold text-blue-400">+{formatEuro(stats.fatturatoProduttoriKmZero)}</span>
                        </div>

                        <div className="flex justify-between items-center pt-1.5 border-t border-white/10 font-bold text-white">
                          <span>= Valore Generato Territorio:</span>
                          <span className="text-blue-400 text-sm">+{formatEuro(stats.totaleValoreTerritorio)}</span>
                        </div>
                      </div>

                      {/* SEZIONE B2B */}
                      <div className="space-y-1.5 p-3 glass-well rounded-xl border border-white/10">
                        <p className="font-bold text-white text-[11px] uppercase tracking-wider">
                          Impatto Commerciale B2B Vending
                        </p>

                        <div className="flex justify-between items-center py-0.5 text-slate-300">
                          <div>
                            <p className="font-semibold text-white">Nuovi Clienti B2B Vending</p>
                            <p className="text-[10px] text-slate-400">
                              {stats.nuoviClientiB2B} nuovi contratti acquisiti (da Referral con Certificato mostrato al datore di lavoro)
                            </p>
                          </div>
                          <span className="font-bold text-white">+{formatEuro(stats.valoreNuoviClienti)}</span>
                        </div>

                        <div className="flex justify-between items-center py-0.5 text-slate-300">
                          <div>
                            <p className="font-semibold text-white">Retention Clienti Esistenti</p>
                            <p className="text-[10px] text-slate-400">
                              {stats.clientiRitenuti} imprese più fedeli (Churn {churnRateAsIs}% → {churnRateToBe}%, Δ +{stats.deltaChurnRetention}%)
                            </p>
                          </div>
                          <span className="font-bold text-white">+{formatEuro(stats.valoreRetention)}</span>
                        </div>

                        <div className="flex justify-between items-center pt-1.5 border-t border-white/10 font-bold text-white">
                          <span>= Totale Valore Stimato B2B:</span>
                          <span className="text-white text-sm">+{formatEuro(stats.totaleValoreB2B)}</span>
                        </div>
                      </div>

                      <Separator className="bg-white/10" />
                      <div className="space-y-1 pt-0.5">
                        <div className="flex justify-between items-center font-bold text-slate-200 text-xs">
                          <span>Totale Valore Stimato B2B:</span>
                          <span className="text-white">+{formatEuro(stats.totaleValoreB2B)}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-slate-200 text-xs">
                          <span>Totale Valore Stimato Territorio:</span>
                          <span className="text-blue-400">+{formatEuro(stats.totaleValoreTerritorio)}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 italic pt-0.5">
                          * I 2 totali sono rigorosamente distinti: il canale B2B non finanzia più i biglietti né si confonde con l'indotto territoriale.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grafici Welfare & Valore */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="h-56 glass-well p-3 rounded-2xl border border-white/10">
                      <p className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5 text-blue-400" />
                        Crescita Referral Welfare per Ciclo
                      </p>
                      <ResponsiveContainer width="100%" height="90%">
                        <ComposedChart data={growthDataWelfare}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(10, 14, 23, 0.95)',
                              borderColor: 'rgba(255, 255, 255, 0.15)',
                              borderRadius: '12px',
                              color: '#fff',
                              backdropFilter: 'blur(16px)',
                            }}
                            formatter={(value) => formatNum(value)}
                          />
                          <Bar dataKey="nuovi" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Nuovi" />
                          <Line type="monotone" dataKey="cumulativo" stroke="#ffffff" strokeWidth={2} name="Cumulativo" dot={{ fill: '#3b82f6' }} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="h-56 glass-well p-3 rounded-2xl border border-white/10">
                      <p className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <PieChart className="w-3.5 h-3.5 text-blue-400" />
                        Composizione del Valore Generato
                      </p>
                      <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                          <Pie
                            data={valueBreakdownData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={65}
                            label={({ name, percent }) =>
                              `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {valueBreakdownData.map((entry, idx) => (
                              <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} stroke="rgba(10, 14, 23, 0.8)" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(10, 14, 23, 0.95)',
                              borderColor: 'rgba(255, 255, 255, 0.15)',
                              borderRadius: '12px',
                              color: '#fff',
                              backdropFilter: 'blur(16px)',
                            }}
                            formatter={(value) => formatEuro(value)}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                {/* 6. QUADRO DEI VANTAGGI STRATEGICI PER L'OPERATORE E IL TERRITORIO */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
                  <div className="pb-2 border-b border-white/10">
                    <h3 className="flex items-center gap-2 text-base font-bold text-white">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      Quadro di Sintesi dei Vantaggi Strategici
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                </Card>

                {/* MODELLO PARTNERSHIP RIASSUNTIVO */}
                <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-3">
                  <p className="font-bold text-white text-sm flex items-center gap-1.5 pb-2 border-b border-white/10">
                    <Sparkles className="w-4 h-4 text-blue-400" /> Modello di Partnership & Responsabilità Economiche
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 rounded-xl glass-well border border-white/10">
                      <span className="text-blue-400 font-semibold block text-xs">1. Operatore Vending</span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Genera impatto locale con i propri clienti esistenti e abilita il meccanismo di matching grant su tutte le presenze dirette con voucher.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl glass-well border border-white/10">
                      <span className="text-blue-300 font-semibold block text-xs">2. Imprese CSR Partner</span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Erogano voucher welfare (Hotel €{costoVoucherHotel} + Aperitivo €{costoVoucherAperitivo}) per i propri collaboratori.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl glass-well border border-white/10">
                      <span className="text-slate-200 font-semibold block text-xs">3. Dipendenti & Partecipanti</span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Vivono l'esperienza evento, ritornano nelle edizioni successive (retention) e invitano amici (referral).
                      </p>
                    </div>
                    <div className="p-3 rounded-xl glass-well border border-white/10">
                      <span className="text-blue-400 font-semibold block text-xs">4. Hotel, Ristoratori & Startup</span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Beneficiano di flussi continui, prenotazioni dirette ed economie di scala generate dal modello.
                      </p>
                    </div>
                  </div>
                </Card>

              </div>
            </div>
          </TabsContent>

          {/* ============ TAB METODOLOGIA ============ */}
          <TabsContent value="metodologia" className="space-y-4 mt-4">
            <Card className="glass-panel p-5 sm:p-6 border border-white/12 space-y-4">
              <div className="pb-2 border-b border-white/10">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                  <Info className="w-5 h-5 text-blue-400" />
                  Metodologia di Calcolo e Architettura Algoritmica
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Documentazione analitica di tutte le componenti matematiche del simulatore integrato.
                </p>
              </div>
              <div className="space-y-3.5 text-sm text-slate-300">
                <MetodoItem
                  titolo="1. Indicatori di Risultato dell'Attività di Referral & K-Factor"
                  formula="K = Referral Rate (%) × Inviti Medi × Conversion Rate (%)"
                  spiegazione="Quantifica la viralità del passaparola. Se K ≥ 1 ogni partecipante genera più di un nuovo utente (crescita esponenziale auto-alimentata); se K < 1 il passaparola genera un moltiplicatore organico sui seed immessi periodicamente."
                />
                <MetodoItem
                  titolo="2. Struttura Benefit Startup (Matching Grant Biglietti)"
                  formula="Benefit Startup = Presenze Dirette Seed × Costo Biglietto (€)"
                  spiegazione="La Startup eroga il biglietto omaggio (matching grant) per tutte le presenze dirette generate dai voucher welfare aziendali (dipendente + accompagnatori). L'operatore vending abilita il matching grant con i suoi clienti, ma i benefit sono forniti come leva d'impatto."
                />
                <MetodoItem
                  titolo="3. Tassi di Adesione / Riscatto Voucher e Base Seed Reale"
                  formula="Seed = max(Dipendenti × Tasso Hotel%, Dipendenti × Tasso Aperitivo%)"
                  spiegazione="I dipendenti delle aziende partner non aderiscono tutti automaticamente. Applicando i tassi di adesione (es. 20% hotel, 40% aperitivo), si ricava la popolazione seed reale che attiva i voucher e che successivamente avvia i cicli di passaparola."
                />
                <MetodoItem
                  titolo="4. Valore Sviluppo Locale & Impatto Territoriale Distinto da B2B"
                  formula="Valore Territorio = Quota Netta Hotel + Quota Netta Aperitivi + (Spesa CSR × 2.5×) + Valore Filiera Corta Km 0"
                  spiegazione="Il Valore Territoriale aggrega le quote nette dirette trattenute dagli esercenti locali (hotel e ristoratori), l'indotto turistico catalizzato dai Voucher CSR moltiplicato per 2.5× e il Valore della Valorizzazione Filiera Corta Locale generato dai produttori a Km 0. Questo valore è rigorosamente distinto dal Valore B2B Vending (nuovi contratti + retention), poiché il canale commerciale B2B non finanzia i biglietti omaggio."
                />
                <MetodoItem
                  titolo="5. Ripartizione Entrate & Ricavi Startup"
                  formula="Ricavi Startup = (Volume Hotel × Margine% Hotel) + (Volume Aperitivo × Margine% Aperitivo)"
                  spiegazione="Specifica le entrate trattenute dalla Startup sulle transazioni voucher, distinguendo le quote nette accreditate alle strutture ricettive (Hotel & Agriturismi) e agli esercenti del food/ristorazione locale."
                />
                <MetodoItem
                  titolo="6. Modulo 'Advertising & Local Event Loyalty' (Edizioni Successive)"
                  formula="P_t = (P_{t-1} × Tasso Retention) + [(P_{t-1} × Tasso Referral) × Inviti Medi × Tasso Conversione]"
                  spiegazione="Modella la domanda generata dalla campagna di advertising generale e dalla fidelizzazione sul territorio. I partecipanti sono la somma di coloro che ritornano (Retention) e dei nuovi attratti dal passaparola locale (Referral)."
                />
                <MetodoItem
                  titolo="7. Acquisizione Nuove Imprese B2B & Meccanismo Virale del Certificato Welfare"
                  formula="Nuovi Prospect B2B = Persone da Referral × % Prospect B2B | Nuove Imprese = Prospect × % Chiusura | Imprese Totali = Imprese Partner Iniziali + Nuove Imprese"
                  spiegazione="I partecipanti esterni attratti dal passaparola (Referral) lavorano in aziende terze non ancora clienti. Convertendo il voucher ed effettuando l'esperienza, ottengono un Certificato ufficiale di Partecipazione & Welfare da ripubblicare e mostrare al proprio datore di lavoro o ufficio HR: l'azienda terza viene così stimolata a iscriversi a sua volta alla piattaforma per erogare questo benefit ai propri collaboratori. In questo modo il 20% dei referral diventa un contatto aziendale qualificato (prospect) e il 15% si converte in un nuovo contratto di fornitura vending firmato."
                />
                <MetodoItem
                  titolo="8. Fidelizzazione B2B: Churn Differenziale (AS-IS vs TO-BE)"
                  formula="Δ Retention = Churn AS-IS (%) - Churn TO-BE (%) | Imprese più fedeli = Imprese Partner × Δ Retention | Valore = Imprese × Valore Annuo Contratto"
                  spiegazione="Il beneficio di fidelizzazione sui clienti B2B dell'operatore vending è quantificato misurando la riduzione del tasso di abbandono (Churn). Se il churn storico passa dal 10% (AS-IS) al 2% (TO-BE), il differenziale dell'8% quantifica esattamente le imprese fidelizzate grazie al programma welfare (es. '2 imprese più fedeli')."
                />
                <MetodoItem
                  titolo="9. Produttori Locali a Km 0 & Sinergia ESG (Dipendenti Diretti)"
                  formula="Fatturato Km 0 = (Dipendenti Diretti × Adozione%) × Frequenza Ordini × Scontrino Medio | CO₂ Risparmiata = Ordini × Tratta Evitata (km) × 0.19 kg CO₂/km"
                  spiegazione="Quantifica l'opportunità offerta ai produttori agroalimentari e artigianali locali di vendere tramite la piattaforma di erogazione voucher. La base di calcolo adotta rigorosamente il numero dei dipendenti delle imprese partner che erogano il voucher (escludendo i partecipanti che provengono dai cicli di referral esterni)."
                />
              </div>
            </Card>

            <Alert variant="default" className="glass-panel border border-blue-400/30 bg-blue-950/30 text-blue-200">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <AlertTitle className="text-white font-semibold">Validità e Flessibilità del Modello</AlertTitle>
              <AlertDescription className="text-slate-300 text-xs mt-1">
                La netta distinzione tra la base dati del <strong>Canale Welfare CSR</strong> e la base dati di <strong>Advertising & Local Event Loyalty</strong> permette di presentare proposte modulari sia ai responsabili HR/CSR delle aziende che agli organizzatori di eventi e alle amministrazioni territoriali.
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

function MetodoItem({
  titolo,
  formula,
  spiegazione,
}: {
  titolo: string;
  formula: string;
  spiegazione: string;
}) {
  return (
    <div className="glass-panel-subtle p-3.5 space-y-1.5 border-l-2 border-l-blue-500 border border-white/10 rounded-r-xl">
      <h4 className="font-semibold text-white text-sm">{titolo}</h4>
      <p className="text-xs font-mono bg-black/40 border border-white/10 text-blue-300 rounded-lg px-2.5 py-1 inline-block">
        {formula}
      </p>
      <p className="text-xs text-slate-400 leading-relaxed">{spiegazione}</p>
    </div>
  );
}
