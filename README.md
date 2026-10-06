# 📊 Simulatore Welfare: Metriche di Diffusione & Impatto Territoriale Integrato

> **Modellazione delle sinergie con Matching Grant di Biglietti, Welfare Aziendale, Eventi, Attività Ricettive e Qualificazione e Valorizzazione della Filiera Km 0.**  
> Applicazione Enterprise sviluppata in **React 18 + TypeScript + TailwindCSS + Recharts + Vite** con interfaccia Dark Liquid Glassmorphism e presentazione immersiva 3D.

---

## 🧭 1. Visione del Progetto e Logica di Business

### Il Contesto del Settore Vending B2B (AS-IS)
Il mercato della somministrazione automatica aziendale è storicamente caratterizzato da:
1. **Pressione al ribasso sui margini unitari**: Forte concorrenza focalizzata sul canone macchine e sul prezzo della singola consumazione.
2. **Tasso di abbandono annuo (Churn Rate) del 10%**: Elevata fungibilità dei fornitori alla scadenza dei contratti di somministrazione.
3. **Inefficienza della micro-logistica territoriale**: Difficoltà per i produttori agroalimentari locali a Km 0 di raggiungere le sedi aziendali senza costi di trasporto sproporzionati ed emissioni dedicate.

### Il Modello Integrato Ecosistemico (TO-BE)
Il simulatore analizza e quantifica la transizione dell'operatore Vending in **Hub e Promotore del Welfare Territoriale**:
- **Interlocuzione Diretta C-Level / HR**: L'operatore valorizza la relazione commerciale con le direzioni aziendali, proponendo piani di welfare deducibili ex art. 51 TUIR (Voucher Soggiorno €50 + Voucher Food €25).
- **Matching Grant Culturale**: La Startup partner co-finanzia l'iniziativa erogando **biglietti omaggio** (€25 cad.) per eventi e spettacoli del territorio, stimolando la fruizione esperienziale senza oneri diretti per il promotore.
- **Logistica di Rifornimento a Emissioni Zero**: I furgoni tecnici dell'operatore, già operativi per il rifornimento e la sanificazione programmata dei distributori, consegnano i panieri agroalimentari ordinati dagli addetti, azzerando le tratte dedicate e le emissioni $\text{CO}_2$ (Scope 3).
- **Protezione del Portafoglio & Pipeline Commerciale Qualificata**: Il circuito integrato abbatte il churn dal **10% al 2%** (-80%) e attiva un passaparola qualificato: gli addetti delle imprese clienti condividono l'attestazione del benefit con colleghi di altre realtà, aprendo nuove opportunità contrattuali B2B.

---

## 🤝 2. I 5 Attori dell'Ecosistema e le Responsabilità Economiche

```
+----------------------------------------------------------------------------------------------------+
|                                    ECOSISTEMA A 5 ATTORI                                          |
+-----------------------------------+--------------------------------+-------------------------------+
| ATTORE                            | RUOLO OPERATIVO                | RESPONSABILITÀ ECONOMICA      |
+-----------------------------------+--------------------------------+-------------------------------+
| 1. Operatore Vending (Promotore)  | Hub relazionale e logistico    | € 0 spesa diretta.            |
|                                   | per consegne Km 0              | Ritorno: Nuovi contratti + CLV|
+-----------------------------------+--------------------------------+-------------------------------+
| 2. Imprese Clienti (CSR Partner)  | Finanziatrici voucher welfare  | 100% spesa voucher welfare    |
|                                   | per i propri dipendenti        | (deducibile dal reddito)      |
+-----------------------------------+--------------------------------+-------------------------------+
| 3. Addetti Imprese Clienti        | Beneficiari ed ambassador      | Partecipazione con benefit    |
|                                   | dell'esperienza territoriale   | Spesa panieri locali Km 0     |
+-----------------------------------+--------------------------------+-------------------------------+
| 4. Startup Tecnologica & Culturale| Gestore piattaforma software   | Finanziamento Matching Grant  |
|                                   | e fornitore dei voucher        | Copre costo biglietti omaggio |
+-----------------------------------+--------------------------------+-------------------------------+
| 5. Territorio (Hotel, Food, Km 0) | Strutture ricettive, locali,   | Tariffe convenzionate         |
|                                   | produttori agricoli ed eventi  | Ricavo netto diretto + 2.5×   |
+-----------------------------------+--------------------------------+-------------------------------+
```

---

## ⚙️ 3. Parametri di Configurazione e Valori di Default

I parametri sono raggruppati in 4 sezioni e controllabili tramite slider e input dedicati:

| Parametro | Descrizione Funzionale | Default | Range | Unità di Misura |
| :--- | :--- | :---: | :---: | :---: |
| **`impreseClienti`** | Numero iniziale di aziende clienti convenzionate con l'operatore | **150** | 10 – 1.000 | Imprese |
| **`dipendentiPerImpresa`** | Organico medio dipendenti per ciascuna impresa cliente | **30** | 5 – 500 | Dipendenti |
| **`tassoAdesioneHotel`** | % addetti che attivano il voucher soggiorno in hotel/agriturismo | **16%** | 1 – 100 | % |
| **`tassoAdesioneAperitivo`** | % addetti che attivano il voucher food/aperitivo territoriale | **25%** | 1 – 100 | % |
| **`moltiplicatoreHotel`** | Presenze effettive generate per voucher hotel (dipendente + accompagnatori) | **2.0** | 0.5 – 5.0 | Moltiplicatore |
| **`moltiplicatoreAperitivo`**| Presenze effettive generate per voucher aperitivo | **2.0** | 0.5 – 5.0 | Moltiplicatore |
| **`referralRate`** | Quota di partecipanti al welfare che invita attivamente colleghi o amici | **25%** | 0 – 100 | % |
| **`conversionRate`** | Tasso di conversione degli inviti ricevuti in nuovi partecipanti effettivi | **25%** | 0 – 100 | % |
| **`invitiMediPerAmbassador`**| Numero medio di contatti invitati da ciascun partecipante ambassador | **5** | 1 – 20 | Inviti |
| **`fattoreEspansioneMercato`**| Moltiplicatore massimo del bacino potenziale raggiungibile (TAM Esteso) | **3** | 1 – 10 | Moltiplicatore |
| **`cicliReferral`** | Numero di generazioni successive di propagazione del passaparola | **3** | 1 – 5 | Cicli |
| **`costoBiglietto`** | Costo unitario sostenuto dalla Startup per ciascun biglietto omaggio | **25** | 5 – 100 | € / biglietto |
| **`costoVoucherHotel`** | Valore nominale del voucher soggiorno finanziato dall'impresa | **50** | 0 – 300 | € / voucher |
| **`costoVoucherAperitivo`** | Valore nominale del voucher food/aperitivo finanziato dall'impresa | **25** | 0 – 150 | € / voucher |
| **`prezzoHotel`** | Tariffa convenzionata riconosciuta alle strutture ricettive | **50** | 10 – 300 | € / presenza |
| **`prezzoAperitivo`** | Tariffa convenzionata riconosciuta ai ristoranti e bar locali | **25** | 5 – 150 | € / presenza |
| **`margineStartupHotel`** | Commissione lorda trattenuta dalla Startup sul voucher hotel | **25%** | 0 – 100 | % |
| **`margineStartupAperitivo`** | Commissione lorda trattenuta dalla Startup sul voucher food | **75%** | 0 – 100 | % |
| **`valoreMedioAcquisto`** | Customer Lifetime Value (CLV) triennale di un cliente B2B Vending | **1.000** | 100 – 10.000 | € / 3 anni |
| **`churnRateAsIs`** | Tasso di abbandono annuo storico del portafoglio clienti (senza welfare) | **10%** | 1 – 50 | % |
| **`churnRateToBe`** | Tasso di abbandono annuo post-adozione welfare integrato | **2%** | 0 – 20 | % |
| **`nuoviProspectRate`** | Quota di partecipanti al welfare che genera un lead B2B qualificato (HR) | **30%** | 0 – 100 | % |
| **`tassoChiusuraProspect`** | Tasso di conversione dei prospect HR in contratti Vending firmati | **20%** | 0 – 100 | % |
| **`moltiplicatoreTurismo`** | Indotto turistico extra attivato da ogni euro speso in voucher | **2.5** | 1.0 – 5.0 | Moltiplicatore |
| **`adozioneKmZero`** | Quota di dipendenti delle imprese partner che acquista regolarmente Km 0 | **20%** | 1 – 100 | % |
| **`frequenzaAcquistiKmZero`**| Ordini annuali medi effettuati da ciascun dipendente acquirente | **6** | 1 – 52 | Ordini / anno |
| **`scontrinoMedioKmZero`** | Valore medio della spesa per ciascun paniere locale ordinato | **30** | 5 – 200 | € / ordine |
| **`trattaLogisticaEvitata`** | Distanza media di trasporto dedicata risparmiata grazie ai furgoni vending | **50** | 5 – 200 | km / ordine |
| **`fattoreEmissioniTrasporto`**| Coefficiente emissivo per trasporto su gomma commerciale leggero | **0.19** | 0.05 – 0.50 | kg CO₂ / km |
| **`personePerEvento`** | Spettatori presenti alla prima edizione di un evento culturale locale | **1.000** | 50 – 20.000 | Partecipanti |
| **`retentionRateEvento`** | Quota di spettatori che ritorna all'edizione successiva dell'evento | **40%** | 0 – 100 | % |
| **`invitiMediEvento`** | Numero medio di persone invitate da ciascuno spettatore | **5** | 1 – 20 | Inviti |
| **`referralRateEvento`** | Quota di spettatori che consiglia l'evento ad amici e conoscenti | **20%** | 0 – 100 | % |
| **`conversionRateEvento`** | Tasso di conversione degli inviti all'evento in biglietti effettivi | **30%** | 0 – 100 | % |
| **`cicliEvento`** | Numero di edizioni consecutive dell'evento modellate nel tempo | **3** | 1 – 5 | Edizioni |
| **`spesaMediaTerritorioEvento`**| Spesa extra media del partecipante all'evento sul territorio locale | **50** | 10 – 300 | € / presenza |
| **`artistiPerEvento`** | Numero di artisti e professionisti locali ingaggiati per edizione | **20** | 1 – 100 | Artisti |

---

## 📐 4. Motore Analitico e Formule di Calcolo

### A. Bacino Dipendenti & Base Seed
$$\text{Dipendenti Totali Potenziali} = \text{Imprese Clienti} \times \text{Dipendenti per Impresa} = 150 \times 30 = 4.500$$
$$\text{Dipendenti Aderenti Hotel} = \text{round}\left(4.500 \times \frac{16}{100}\right) = 720$$
$$\text{Dipendenti Aderenti Aperitivo} = \text{round}\left(4.500 \times \frac{25}{100}\right) = 1.125$$
$$\text{Seed Population} = \max(720, 1.125) = 1.125 \text{ addetti}$$

Presenze con accompagnatori:
$$\text{Presenze Hotel Seed} = 720 \times 2 = 1.440 \qquad \text{Presenze Aperitivo Seed} = 1.125 \times 2 = 2.250$$
$$\text{Presenze Dirette Seed Totali} = \max(1.440, 2.250) = 2.250$$

### B. Meccanica Referral e K-Factor
$$K\text{-Factor} = \frac{\text{referralRate}}{100} \times \text{invitiMediPerAmbassador} \times \frac{\text{conversionRate}}{100} = 0.25 \times 5 \times 0.25 = 0.3125$$
Poiché $K < 1$, il passaparola converge in modo stabile entro il TAM Esteso:
$$\text{TAM Esteso} = \text{Seed Population} \times 3 = 1.125 \times 3 = 3.375$$
$$\text{Growth So Far} = \sum \text{Nuovi da Referral nei cicli successivi}$$

### C. Matching Grant & Economia della Startup
$$\text{Biglietti Distribuiti} = \text{Presenze Dirette Seed Totali} = 2.250 \text{ biglietti}$$
$$\text{Costo Biglietti Startup} = 2.250 \times 25 \text{ €} = 56.250 \text{ €}$$
$$\text{Entrate Lorde Startup} = \text{Margine Hotel (€)} + \text{Margine Aperitivo (€)}$$
$$\mathbf{\text{Margini Netti Startup}} = \text{Entrate Lorde Startup} - \text{Costo Biglietti Startup}$$

### D. Spesa Welfare Aziende Clienti (CSR)
$$\mathbf{\text{Spesa Imprese Partner}} = (\text{Aderenti Hotel} + \text{Growth}) \times 50 \text{ €} + (\text{Aderenti Aperitivo} + \text{Growth}) \times 25 \text{ €}$$

### E. Filiera Corta Km 0 & Impatto Ambientale $\text{CO}_2$
La base d'acquisto include **esclusivamente i dipendenti diretti** delle aziende clienti (esclusi referral esterni):
$$\text{Dipendenti Acquirenti} = 4.500 \times 20\% = 900 \text{ dipendenti}$$
$$\text{Ordini Totali Km 0} = 900 \times 6 \text{ ordini/anno} = 5.400 \text{ consegne}$$
$$\mathbf{\text{Fatturato Filiera Corta}} = 5.400 \times 30 \text{ €} = 162.000 \text{ €}$$
$$\text{Km Logistica Evitati} = 5.400 \times 50 \text{ km} = 270.000 \text{ km}$$
$$\mathbf{\text{CO}_2 \text{ Risparmiata}} = \text{round}(270.000 \times 0.19) = 51.300 \text{ kg di CO}_2 \text{ (-51,3 tonnellate)}$$

### F. Ritorno Economico Diretto Vending B2B
$$\text{Nuovi Prospect HR} = \text{round}(\text{Growth So Far} \times 30\%)$$
$$\text{Nuovi Clienti B2B Contratti} = \text{round}(\text{Nuovi Prospect HR} \times 20\%)$$
$$\text{Valore Nuovi Clienti} = \text{Nuovi Clienti B2B} \times 1.000 \text{ € (CLV / 3 anni)}$$

$$\Delta \text{ Retention} = 10\% - 2\% = +8\% \text{ guadagno di retention}$$
$$\text{Clienti Protetti dal Churn} = 150 \times 8\% = 12 \text{ aziende salvate}$$
$$\text{Valore Retention} = 12 \times 1.000 \text{ €} = 12.000 \text{ €}$$
$$\mathbf{\text{Totale Valore B2B}} = \text{Valore Nuovi Clienti} + \text{Valore Retention}$$

### G. Valore Generato per il Territorio
$$\mathbf{\text{Totale Valore Territorio}} = \text{Quota Netta Hotel} + \text{Quota Netta Aperitivo} + (\text{Spesa Imprese Partner} \times 2.5) + \text{Fatturato Filiera Km 0}$$

---

## 🖥️ 5. Struttura delle Viste dell'Applicazione

L'applicazione si articola in 3 macro-viste:

### 1. `Simulatore & Risultati` (`simulatore`)
- **Header Scenari**: Presets rapidi (*Conservativo*, *Realistico*, *Ottimistico*) e pulsante `Copia Parametri`.
- **KPI Summary**: Totale partecipanti, valore complessivo generato, presenze territoriali e K-Factor.
- **Scheda Bilancio Economico**: Due colonne bilanciate che separano chiaramente i costi di responsabilità (Startup e Imprese) dal valore generato (Territorio e Vending).
- **Griglia a 4 Pilastri Promotore**: Core business, logistica Km 0, autorevolezza gateway e punteggio ESG.
- **Grafici Analitici Recharts**: Curva di espansione referral a 7 colonne (`ComposedChart`) e donut chart a 5 voci del valore (`PieChart`).
- **Quadro Sintesi Vantaggi & Modello Partnership**: Indicatori numerici di sintesi e matrice di coordinamento partner.

### 2. `Vantaggi B2B (3D Landing)` (`landing3d`)
- **Carosello 3D Orbitale**: 8 schede vetrate (Liquid Glass) interattive con rotazione fluida su 3 assi, inclinazione fino a 30°, rotazione a 180° sul retro e pulsante roulette "Gira ora":
  1. **Card 01 - Proposte Dirette Grandi Imprese**: Superamento della competizione sul prezzo della singola consumazione; interlocuzione diretta con la Direzione HR/AD; deducibilità integrale ex TUIR art. 51.
  2. **Card 02 - Customer Lifetime Value (CLV)**: Protezione del fatturato storico e barriera all'uscita; abbattimento del churn dal 10% al 2% (-80%); incremento della vita media contrattuale.
  3. **Card 03 - Logistica di Rifornimento a Emissioni Zero**: Consegne dei panieri Km 0 integrate nei regolari giri-visita di manutenzione dei distributori; oltre a valorizzare le produzioni locali con la vendita, l'impatto ambientale è materialmente azzerato creando economie di scopo condivise; 270.000 km risparmiati; rendicontazione certificabile Scope 3 GHG.
  4. **Card 04 - Store Prodotti Territoriali a Km 0 (Retro: *Nuovo mercato per Prodotti a Km 0*)**: Gli addetti delle imprese clienti acquistano produzioni agricole locali direttamente sul luogo di lavoro, eliminando intermediazioni e tratte dedicate.
  5. **Card 05 - Matching Grant & Budget Startup**: Co-finanziamento delle presenze culturali con biglietti omaggio da 25 € stanziati dal fondo Startup; oneri diretti promotore pari a € 0.
  6. **Card 06 - Budget Welfare a Carico delle Imprese (Retro: *Zero oneri finanziari per il promotore*)**: Voucher hotel e food acquistati al 100% dalle imprese clienti. Viene fornita la piattaforma di erogazione e gestione dei Voucher conforme alla normativa, senza alcun costo aggiuntivo; ogni impresa partecipante viene promossa con una pagina web dedicata per comunicare la propria adesione.
  7. **Card 07 - Punteggio Tecnico Gare & Appalti ESG**: Criteri premianti nei contratti di somministrazione pubblica (CAM); conformità alla Direttiva CSRD e dossier qualitativo pronto per stazioni appaltanti.
  8. **Card 08 - Funnel B2B & Certificato Welfare (*Gli addetti attivano contatti commerciali qualificati*)**: Gli addetti esibiscono il Certificato Welfare al proprio network, generando lead inbound qualificati verso gli uffici HR di altre aziende.
- **Grafica e Layout**: Clearance ottimizzata senza sovrapposizione tra testi e icone; contrasto elevato e tipografia Inter.
- **Fumo Tipografico Volumetrico & Attivazione Welfare**: Particelle in risalita dalla tazzina al termine della ruota ("Gira Ora") o su click del tasto permanente "Iscriviti" che compongono la scritta glow **"IL NOSTRO WELFARE ISCRIVITI CON NOI"**.
- **Portale Onboarding con Tazzina 3D Gigante**: Transizione same-page con modello 3D interattivo Three.js a morphing cromatico su 5 profili (Zaffiro, Azzurro, Smeraldo, Ambra, Ametista), requisiti, FAQ e form con calcolatore istantaneo del valore.
- **Sfondo Dark Liquid Glass Comune**: Sfondo uniforme coordinato con il simulatore.
- **Pulsante `‹ Simulatore`**: Fisso in alto a sinistra per tornare istantaneamente alla scheda di calcolo tramite postMessage.

### 3. `Metodologia & Algoritmi` (`metodologia`)
- 10 schede didattiche bilanciate a coppie (Sx e Dx) per spiegare ogni formula algebrica a stakeholder, investitori e comitati etico-scientifici.

---

## 🛠️ 6. Comandi di Esecuzione e Sviluppo

```bash
# Installazione delle dipendenze
npm install

# Avvio del server di sviluppo locale (Vite su porta 3000)
npm run dev

# Verifica TypeScript e bundle di produzione
npm run build

# Preview del bundle di produzione
npm run preview
```

---

## 📄 7. Documentazione Integrativa
Per la specifica tecnica dettagliata di prodotto, consultare il documento dedicato:
- [asset/PDR_Key_Features.md](file:///c:/Users/user/Desktop/Simulatore%20Referral%20Vending%20%C3%97%20Welfare%20%C3%97%20Eventi%20(v2)/asset/PDR_Key_Features.md)
