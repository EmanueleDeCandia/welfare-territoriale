# 🎨 Design & Layout Guide: Dark Liquid Glassmorphism (Minimal & Premium)

Questo documento illustra l'architettura visiva, il design system e la struttura dei componenti aggiornati secondo lo stile **Dark Liquid Glassmorphism / Frosted Glass** minimale e senza fronzoli ispirato allo screenshot di riferimento.

---

## 1. Principi Guida del Nuovo Design

1. **Abolizione totale dei "colori arlecchino"**:
   - Eliminati tutti i box multicolore saturi (rosa acceso, verde pastello, viola, giallo disordinati).
   - Palette coerente ed elegante: superfici traslucide scure (`rgba(18, 22, 34, 0.65)` / `rgba(8, 11, 18, 0.65)`), bordi raffinati semi-trasparenti (`rgba(255, 255, 255, 0.10 - 0.12)`), bagliore di accento **Electric Blue** (`#3b82f6` / `#60a5fa`).
2. **Minimalismo e profondità visiva**:
   - Effetto vetro smerigliato (*frosted glass*) con `backdrop-filter: blur(28px) saturate(180%)` e riflesso speculare superiore (*inner highlight*).
   - Sfondo immersivo fotografico al tramonto nel deserto con luci ambientali morbide (`fixed background`).
   - Wells scuri scavati (`.glass-well`) per input numerici e indicatori secondari.
3. **Preservazione rigorosa di icone e logica**:
   - Tutte le icone Lucide originali sono state rigorosamente conservate, integrate con tonalità sobrie (blu elettrico o slate).
   - Tutte le formule e metriche restano attive e interattive al 100%.

---

## 2. Token Visivi & Classi di Stile (CSS Primitives)

| Token / Classe | Stile Applicato | Utilizzo Tipico |
|---|---|---|
| `.glass-panel` | `bg-[rgba(18,22,34,0.65)]`, blur 28px, border `white/12`, shadow-2xl, inner glow | Schede principali, KPI card, grafici |
| `.glass-panel-subtle` | `bg-[rgba(13,17,27,0.55)]`, blur 20px, border `white/8` | Sezioni interne, card secondarie |
| `.glass-well` | `bg-[rgba(8,11,18,0.65)]`, border `white/7`, inner shadow | Campi input, box di dettaglio, liste |
| `.glass-pill` | `bg-[rgba(255,255,255,0.06)]`, border `white/12`, pill radius | Badge, tag scenari, switchers |
| `.glow-blue` | `box-shadow: 0 0 25px -4px rgba(59, 130, 246, 0.45)` | Elementi attivi, bottoni primari |

---

## 3. Struttura del Layout (Wireframe Liquid Glass)

```text
+----------------------------------------------------------------------------------------------------+
|  [✨ Sparkles] Simulatore Referral: Vending × Welfare × Eventi               [Scenari: Cons | Bal | Vir] |
+----------------------------------------------------------------------------------------------------+
|  [📊 KPI 1: ROI Vending]   |  [💎 KPI 2: Valore B2B]   |  [🌍 KPI 3: Territorio]   |  [👥 KPI 4: Presenze]  |
+----------------------------------------------------------------------------------------------------+
|  TABS: [📊 Dashboard Principale] [⚙️ Parametri Modello] [🔬 Analisi Dettagliata] [📐 Metodologia]       |
+----------------------------------------------------------------------------------------------------+
|  +--------------------------------------------------+-------------------------------------------+  |
|  | 🏆 Bilancio Economico & Impatto Sviluppo Locale   | [ ROI: +XXX% ]                            |  |
|  +--------------------------------------------------+-------------------------------------------+  |
|  | STRUTTURA COSTI & BENEFIT (Startup)              | RITORNO & VALORE GENERATO B2B + TERRITORIO|  |
|  | - Biglietti Matching Grant erogati:  €[XX]       | [ SVILUPPO LOCALE & TERRITORIO ]          |  |
|  | - Spesa Voucher Imprese CSR:         €[XX]       |   + Indotto Hotel & Ristorazione:  +€[XX] |  |
|  | ------------------------------------------------ |   + Moltiplicatore CSR Territorio: +€[XX] |  |
|  | + Entrate della Startup:             €[XX]       |   + Valore Filiera Corta Km 0:     +€[XX] |  |
|  | - Benefit Omaggio Matching Grant:   -€[XX]       |   = Valore Generato Territorio:    +€[XX] |  |
|  | = Margini Netti Startup:             €[XX]       | [ COMMERCIALE B2B VENDING ]               |  |
|  | ------------------------------------------------ |   + Nuovi Contratti Acquisiti:     +€[XX] |  |
|  | [ GRAFICI INTEGRATI NELLO SPAZIO A SINISTRA ]    |   + Retention Clienti Esistenti:   +€[XX] |  |
|  | [ Bar/Line: Crescita ] [ Donut: Breakdown Valore]|   = Valore Stimato B2B Vending:    +€[XX] |  |
|  +--------------------------------------------------+-------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
|  [👥 Partner Vending]   |   [🏢 Imprese CSR]   |   [🎟️ Startup Eventi]   |   [🌾 Territorio & Km0]  |
+----------------------------------------------------------------------------------------------------+
```

---

## 4. Tipografia & Componenti UI

* **Font Primario**: `Plus Jakarta Sans` con pesi 400 (regular), 600 (semibold) e 800 (extrabold).
* **Font Dati / Formule**: `JetBrains Mono` con sfondo `.glass-well` per formule pulite e leggibili.
* **Input Numerici**: Sfondo `bg-black/40`, bordi `border-white/10`, focus ring blu elettrico `focus:border-blue-500/80`, senza spinner frecce invasive.
* **Tabs**: Barra di navigazione in vetro scuro con pill blu attiva ad alta luminosità e testo bianco nitido.
* **Badge**: Pill traslucidi con testo satinato e bordi sottili.
