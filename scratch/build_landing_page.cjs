const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'asset', 'landing-page-3d-vetro.html');
let content = fs.readFileSync(srcPath, 'utf8');

// 1. Add Three.js script before </head> if not present
if (!content.includes('three.min.js')) {
  const headInject = `  <!-- THREE.JS 3D ENGINE (LOCAL WITH CDN FALLBACK) -->
  <script src="/js/three.min.js"></script>
  <script>
    if (typeof THREE === 'undefined') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\\/script>');
    }
  </script>
</head>`;
  content = content.replace('</head>', headInject);
}

// 2. Add New Styles for Welfare Trigger, Smoke Particle System, Onboarding Portal, Giant 3D Cup, Calculator, and FAQ
const additionalCSS = `
    /* =========================================================
       WELFARE PERMANENT TRIGGER & SMOKE PARTICLES & PORTAL 3D
       ========================================================= */

    /* Fixed Welfare Access Trigger Button (under spin-trigger) */
    .welfare-trigger {
      position: fixed;
      top: calc(50% + 95px);
      right: 12px;
      z-index: 50;
      width: 68px;
      min-height: 120px;
      padding: 14px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border: 1px solid rgba(220, 235, 255, 0.45);
      border-radius: 20px;
      color: #ffffff;
      font-family: inherit;
      background: linear-gradient(150deg, #8b5cf6 0%, #6366f1 48%, #3b82f6 100%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.42),
        inset 0 -8px 16px rgba(15, 23, 42, 0.22),
        0 14px 32px rgba(0, 0, 0, 0.45),
        0 0 24px rgba(139, 92, 246, 0.35);
      cursor: pointer;
      transform: translateY(-50%);
      transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
    }

    .welfare-trigger:hover {
      transform: translateY(-50%) translateY(-3px);
      border-color: rgba(255, 255, 255, 0.9);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.55),
        0 18px 40px rgba(0, 0, 0, 0.5),
        0 0 32px rgba(139, 92, 246, 0.5);
    }

    .welfare-trigger:active {
      transform: translateY(-50%) scale(0.97);
    }

    .welfare-icon {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .welfare-icon svg {
      width: 20px;
      height: 20px;
      color: #ffffff;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }

    .welfare-label {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    /* Smoke Particle Typography Overlay */
    .smoke-overlay {
      position: fixed;
      inset: 0;
      z-index: 120;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, rgba(10, 18, 32, 0.88) 0%, rgba(5, 8, 15, 0.96) 80%);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .smoke-overlay.is-active {
      opacity: 1;
      pointer-events: auto;
    }

    .smoke-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .smoke-cta-box {
      position: relative;
      z-index: 2;
      max-width: 680px;
      padding: 36px 32px;
      margin: 20px;
      text-align: center;
      background: linear-gradient(145deg, rgba(23, 37, 60, 0.85), rgba(12, 20, 35, 0.92));
      border: 1px solid rgba(219, 234, 254, 0.35);
      border-radius: 28px;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.45),
        0 24px 60px rgba(0, 0, 0, 0.6),
        0 0 50px rgba(96, 165, 250, 0.25);
      transform: scale(0.92) translateY(20px);
      opacity: 0;
      transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease;
    }

    .smoke-overlay.is-active .smoke-cta-box {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    .smoke-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #93c5fd;
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(147, 197, 253, 0.35);
      margin-bottom: 16px;
    }

    .smoke-typography {
      margin: 10px 0 16px;
      cursor: pointer;
    }

    .smoke-title {
      font-size: clamp(2rem, 5.2vw, 3.2rem);
      font-weight: 900;
      letter-spacing: -0.02em;
      line-height: 1.1;
      color: #ffffff;
      text-shadow:
        0 0 20px rgba(147, 197, 253, 0.8),
        0 0 45px rgba(59, 130, 246, 0.5),
        0 4px 12px rgba(0, 0, 0, 0.7);
    }

    .smoke-subtitle {
      font-size: clamp(1.4rem, 3.8vw, 2.2rem);
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-top: 6px;
      background: linear-gradient(90deg, #60a5fa, #a78bfa, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 18px rgba(167, 139, 250, 0.6));
    }

    .smoke-desc {
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.6;
      max-width: 540px;
      margin: 0 auto 24px;
    }

    .smoke-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .smoke-enter-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 13px 28px;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: linear-gradient(135deg, #3b82f6, #2563eb 50%, #1d4ed8);
      color: #ffffff;
      font-family: inherit;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 10px 24px rgba(37, 99, 235, 0.4);
      transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
    }

    .smoke-enter-btn:hover {
      transform: translateY(-2px);
      border-color: #ffffff;
      box-shadow: 0 14px 30px rgba(37, 99, 235, 0.55), 0 0 20px rgba(96, 165, 250, 0.5);
    }

    .smoke-dismiss-btn {
      padding: 13px 20px;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.06);
      color: #94a3b8;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 180ms ease, color 180ms ease;
    }

    .smoke-dismiss-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }

    /* Onboarding Portal (Fullscreen Same-Page Morphing) */
    .onboarding-portal {
      position: fixed;
      inset: 0;
      z-index: 150;
      background-color: #07090e;
      background-image:
        linear-gradient(to bottom, rgba(5, 7, 12, 0.7), rgba(7, 10, 16, 0.88)),
        url('background.jpg');
      background-size: cover;
      background-position: center top;
      background-attachment: fixed;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 24px 20px 48px;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.96);
      transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .onboarding-portal.is-visible {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1);
    }

    .onboarding-nav-bar {
      max-width: 1240px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      flex-wrap: wrap;
    }

    .onboarding-nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .onboarding-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 16px;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 700;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      backdrop-filter: blur(8px);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
      transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
    }

    .onboarding-nav-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-1px);
    }

    .onboarding-nav-title {
      text-align: center;
      flex: 1 1 auto;
    }

    .portal-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #60a5fa;
      background: rgba(59, 130, 246, 0.12);
      border: 1px solid rgba(59, 130, 246, 0.3);
      padding: 3px 10px;
      border-radius: 9999px;
      margin-bottom: 4px;
    }

    .onboarding-nav-title h2 {
      font-size: clamp(1.2rem, 2.4vw, 1.6rem);
      font-weight: 800;
      color: #ffffff;
    }

    .onboarding-compliance-pill {
      font-size: 11px;
      font-weight: 700;
      color: #a7f3d0;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
    }

    /* 5-Profile Selector Tabs */
    .profile-tabs {
      max-width: 1240px;
      margin: 0 auto 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 10px;
    }

    .profile-tab-btn {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(10px);
      color: #94a3b8;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      transition: all 200ms ease;
    }

    .profile-tab-btn:hover {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.25);
      color: #ffffff;
    }

    .profile-tab-btn.is-active {
      background: linear-gradient(135deg, rgba(30, 58, 102, 0.85), rgba(15, 28, 50, 0.95));
      border-color: var(--active-border, #60a5fa);
      color: #ffffff;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        0 8px 24px rgba(0, 0, 0, 0.4),
        0 0 20px var(--active-glow, rgba(59, 130, 246, 0.3));
    }

    .tab-icon-box {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--active-border, #93c5fd);
      flex-shrink: 0;
    }

    .tab-info {
      min-width: 0;
      flex: 1 1 auto;
    }

    .tab-role-name {
      display: block;
      font-size: 12.5px;
      font-weight: 800;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tab-role-tag {
      display: block;
      font-size: 10.5px;
      color: #94a3b8;
      margin-top: 2px;
    }

    /* 3-Column Portal Content Grid */
    .portal-content-grid {
      max-width: 1240px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.1fr 1fr 1.15fr;
      gap: 20px;
      align-items: stretch;
    }

    .portal-col {
      background: linear-gradient(145deg, rgba(20, 33, 53, 0.92), rgba(10, 17, 30, 0.95));
      border: 1px solid rgba(210, 230, 255, 0.22);
      border-radius: 24px;
      padding: 22px;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        0 16px 36px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* CENTER COLUMN: 3D GIANT CUP */
    .portal-col-center {
      align-items: center;
      justify-content: space-between;
      text-align: center;
      background: radial-gradient(circle at 50% 40%, rgba(30, 58, 102, 0.5) 0%, rgba(10, 18, 32, 0.95) 75%);
    }

    .cup-3d-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .cup-badge {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #93c5fd;
      background: rgba(59, 130, 246, 0.15);
      padding: 3px 9px;
      border-radius: 999px;
    }

    .cup-hint {
      font-size: 10.5px;
      color: #94a3b8;
    }

    .cup-3d-canvas-wrap {
      position: relative;
      width: 100%;
      height: 290px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      user-select: none;
    }

    .cup-3d-canvas-wrap:active {
      cursor: grabbing;
    }

    .hero-cup-canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .cup-color-legend {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.14);
      font-size: 12px;
      font-weight: 700;
      color: #ffffff;
    }

    .cup-color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #3b82f6;
      box-shadow: 0 0 8px currentColor;
    }

    /* LEFT COLUMN: REQUISITI & FAQ */
    .portal-section-title {
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .requirements-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .requirement-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 10px 12px;
      font-size: 12px;
      color: #cbd5e1;
      line-height: 1.45;
    }

    .req-check {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid rgba(16, 185, 129, 0.5);
      color: #34d399;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .req-check svg {
      width: 11px;
      height: 11px;
    }

    .benefits-box {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(30, 58, 102, 0.25));
      border: 1px solid rgba(147, 197, 253, 0.28);
      border-radius: 14px;
      padding: 12px 14px;
      font-size: 12px;
      color: #e2e8f0;
      line-height: 1.5;
    }

    .benefits-box strong {
      color: #93c5fd;
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* FAQ ACCORDION */
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .faq-item {
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.25);
      overflow: hidden;
    }

    .faq-question {
      width: 100%;
      text-align: left;
      padding: 10px 12px;
      background: none;
      border: none;
      color: #ffffff;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: pointer;
    }

    .faq-question:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    .faq-answer {
      display: none;
      padding: 0 12px 10px;
      font-size: 11.5px;
      color: #94a3b8;
      line-height: 1.45;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      margin-top: 4px;
      padding-top: 8px;
    }

    .faq-item.is-open .faq-answer {
      display: block;
    }

    .faq-item.is-open .faq-toggle-icon {
      transform: rotate(180deg);
    }

    /* RIGHT COLUMN: FORM & VALUE CALCULATOR */
    .calc-card {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8));
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .calc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .calc-header span {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #60a5fa;
    }

    .calc-slider-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .calc-slider-label {
      display: flex;
      justify-content: space-between;
      font-size: 11.5px;
      color: #cbd5e1;
      font-weight: 600;
    }

    .calc-slider {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.15);
      outline: none;
      accent-color: #3b82f6;
      cursor: pointer;
    }

    .calc-results-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 4px;
    }

    .calc-pill {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 8px 10px;
    }

    .calc-pill span {
      display: block;
      font-size: 10px;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
    }

    .calc-pill strong {
      display: block;
      font-size: 13.5px;
      color: #ffffff;
      font-weight: 800;
      margin-top: 2px;
    }

    /* REGISTRATION FORM */
    .portal-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .form-group label {
      font-size: 11px;
      font-weight: 700;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .form-control {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(15, 23, 42, 0.6);
      color: #ffffff;
      font-family: inherit;
      font-size: 12.5px;
      outline: none;
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }

    .form-control:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    textarea.form-control {
      resize: vertical;
      min-height: 52px;
    }

    .form-submit-btn {
      width: 100%;
      padding: 12px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: #ffffff;
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.35),
        0 8px 20px rgba(29, 78, 216, 0.35);
      transition: all 160ms ease;
    }

    .form-submit-btn:hover {
      background: linear-gradient(135deg, #60a5fa, #2563eb);
      transform: translateY(-1px);
      box-shadow: 0 12px 24px rgba(29, 78, 216, 0.45);
    }

    /* Modal Feedback */
    .success-modal {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      padding: 20px;
    }

    .modal-card {
      max-width: 460px;
      width: 100%;
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border: 1px solid rgba(147, 197, 253, 0.4);
      border-radius: 24px;
      padding: 28px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }

    .modal-icon {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34d399;
      display: grid;
      place-items: center;
      margin: 0 auto 16px;
    }

    .modal-card h3 {
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .modal-card p {
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .modal-btn {
      padding: 10px 24px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: #3b82f6;
      color: #ffffff;
      font-weight: 700;
      cursor: pointer;
    }

    /* Responsive Onboarding */
    @media (max-width: 1024px) {
      .portal-content-grid {
        grid-template-columns: 1fr;
      }
      .portal-col-center {
        order: -1;
      }
      .cup-3d-canvas-wrap {
        height: 220px;
      }
    }
`;

// Inject CSS before </style>
if (!content.includes('.welfare-trigger')) {
  content = content.replace('</style>', additionalCSS + '\n  </style>');
}

// 3. Inject HTML Elements:
// - welfare-trigger button right after spin-trigger
const welfareTriggerHTML = `
  <button type="button" class="welfare-trigger" id="welfareTrigger" title="Accedi al Portale Welfare & Iscrizioni"
    aria-label="Accedi al Portale Welfare Territoriale">
    <span class="welfare-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    </span>
    <span class="welfare-label">Iscriviti</span>
  </button>
`;

if (!content.includes('id="welfareTrigger"')) {
  content = content.replace('</button>\n  <p class="sr-only" id="spinStatus"', '</button>' + welfareTriggerHTML + '\n  <p class="sr-only" id="spinStatus"');
}

// - Smoke Overlay & Onboarding Portal HTML right before <script>
const smokeAndPortalHTML = `
  <!-- SMOKE PARTICLE TYPOGRAPHY OVERLAY -->
  <div class="smoke-overlay" id="smokeOverlay" style="display: none;" role="dialog" aria-modal="true" aria-label="Attivazione Welfare">
    <canvas id="smokeCanvas" class="smoke-canvas"></canvas>
    
    <div class="smoke-cta-box" id="smokeCtaBox">
      <div class="smoke-badge">Ecosistema Territoriale Attivo</div>
      <div class="smoke-typography" id="smokeTypography" role="button" tabindex="0" title="Clicca per aprire il portale">
        <h2 class="smoke-title">IL NOSTRO WELFARE</h2>
        <h3 class="smoke-subtitle">ISCRIVITI CON NOI</h3>
      </div>
      <p class="smoke-desc">
        Dalla tazzina al territorio: scopri i requisiti, i vantaggi esclusivi e attiva la tua partecipazione a impatto zero.
      </p>
      <div class="smoke-actions">
        <button type="button" class="smoke-enter-btn" id="smokeEnterBtn">
          <span>Accedi al Portale di Iscrizione</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button type="button" class="smoke-dismiss-btn" id="smokeDismissBtn" aria-label="Chiudi e torna alle schede">
          Chiudi
        </button>
      </div>
    </div>
  </div>

  <!-- ONBOARDING PORTAL (SAME-PAGE 3D MORPHING) -->
  <div class="onboarding-portal" id="onboardingPortal" style="display: none;">
    <!-- TOP NAVIGATION BAR -->
    <div class="onboarding-nav-bar">
      <div class="onboarding-nav-actions">
        <button type="button" class="onboarding-nav-btn" id="portalBackToCardsBtn" aria-label="Torna alle 8 Schede 3D">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>‹ 8 Vantaggi 3D</span>
        </button>
        <button type="button" class="onboarding-nav-btn" id="portalBackToSimBtn" onclick="goToSimulator()" aria-label="Torna al Simulatore">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span>Simulatore</span>
        </button>
      </div>
      <div class="onboarding-nav-title">
        <span class="portal-badge">Accreditamento Partecipanti</span>
        <h2>Il Nostro Welfare: Iscriviti con Noi</h2>
      </div>
      <div class="onboarding-compliance-pill">
        <span>Conforme Art. 51 TUIR • CAM • CSRD</span>
      </div>
    </div>

    <!-- PROFILE SELECTOR (5 TABS) -->
    <div class="profile-tabs" id="profileTabs"></div>

    <!-- MAIN INTERACTIVE GRID -->
    <div class="portal-content-grid">
      <!-- LEFT COLUMN: REQUISITI, VANTAGGI & FAQ -->
      <div class="portal-col portal-col-left" id="portalLeftCol"></div>

      <!-- CENTER COLUMN: HERO CUP 3D VIEWER -->
      <div class="portal-col portal-col-center">
        <div class="cup-3d-header">
          <span class="cup-badge" id="cupBadge">Modello 3D Interattivo</span>
          <span class="cup-hint">Trascina per ruotare a 360°</span>
        </div>
        <div class="cup-3d-canvas-wrap" id="cup3dCanvasWrap">
          <canvas id="heroCupCanvas" class="hero-cup-canvas"></canvas>
        </div>
        <div class="cup-color-legend" id="cupColorLegend">
          <span class="cup-color-dot" id="cupColorDot"></span>
          <span class="cup-profile-name" id="cupProfileName">Grandi Imprese</span>
        </div>
      </div>

      <!-- RIGHT COLUMN: FORM DI ISCRIZIONE CON CALCOLATORE DEL VALORE -->
      <div class="portal-col portal-col-right" id="portalRightCol"></div>
    </div>
  </div>
`;

if (!content.includes('id="onboardingPortal"')) {
  content = content.replace('<script>', smokeAndPortalHTML + '\n  <script>');
}

// 4. Inject Profiles Data and Script Logic
const additionalScript = `
    /* =========================================================
       PROFILI ONBOARDING, 3D GIANT CUP & CALCOLATORE DEL VALORE
       ========================================================= */

    const PROFILES = [
      {
        id: "imprese",
        name: "Grandi Imprese & HR",
        tagline: "Welfare Aziendale & Deducibilità 100% TUIR",
        badge: "Acquisizione C-Level",
        color: "#2563eb",
        colorRgb: [37, 99, 235],
        activeGlow: "rgba(37, 99, 235, 0.4)",
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v14M21 7v14M7 3h10v18H7zM10 7h4M10 11h4M10 15h4"/></svg>',
        requirements: [
          "Organico minimo di 15 addetti in sede aziendale servita (o candidabile) con distributori.",
          "Attivazione piano welfare deducibile dal reddito d'impresa (TUIR art. 51 comma 2).",
          "Consenso al recapito periodico dei panieri a Km 0 ai dipendenti durante il turno di lavoro."
        ],
        benefits: "Fornitura a costo zero della piattaforma di gestione voucher, con pagina web promozionale dedicata a comunicare l'impegno CSR dell'impresa.",
        faqs: [
          { q: "La piattaforma comporta canoni annuali per l'azienda?", a: "Nessun costo. La piattaforma di gestione e la pagina web dedicata sono fornite a titolo gratuito." },
          { q: "Qual è il regime fiscale dei voucher welfare?", a: "I voucher Hotel e Food sono interamente deducibili e privi di oneri fiscali/contributivi per azienda e lavoratore." },
          { q: "Come impatta sulla gestione interna del personale?", a: "Migliora il clima aziendale e protegge il rapporto contrattuale vending, con churn rate abbattuto al 2%." }
        ],
        calc: {
          title: "Calcolatore Deducibilità & Valore",
          sliderLabel: "Addetti in Azienda",
          min: 15, max: 300, default: 50, step: 5, unit: "addetti",
          compute: (val) => {
            const voucherBudget = Math.round(val * (50 * 0.16 + 25 * 0.25));
            const retSaving = Math.round(val * 18);
            return [
              { l: "Budget Welfare Deducibile", v: "€ " + voucherBudget.toLocaleString("it-IT") },
              { l: "Costo Piattaforma Software", v: "€ 0 (Inclusa)" },
              { l: "Abbattimento Churn", v: "-80% (fidelizzato)" },
              { l: "Pagina Web Dedicata", v: "Attiva a € 0" }
            ];
          }
        }
      },
      {
        id: "addetti",
        name: "Addetti Imprese Clienti",
        tagline: "Voucher Gratuiti, Biglietti Omaggio & Spesa Km 0",
        badge: "Dipendenti Beneficiari",
        color: "#0ea5e9",
        colorRgb: [14, 165, 233],
        activeGlow: "rgba(14, 165, 233, 0.4)",
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        requirements: [
          "Dipendente o addetto regolarmente in forza presso un'azienda cliente convenzionata.",
          "Registrazione gratuita con matricola o e-mail aziendale per l'accredito dei voucher.",
          "Ritiro dei panieri agricoli locali direttamente sul luogo di lavoro a zero spese di trasporto."
        ],
        benefits: "Fino a 75 € di voucher gratuiti (soggiorno hotel + food), biglietti spettacolo coperti da Matching Grant e spesa Km 0 senza intermediari.",
        faqs: [
          { q: "I biglietti per spettacoli ed eventi sono davvero gratuiti?", a: "Sì, il fondo Matching Grant della Startup stanzia 25 € per ogni presenza sbloccata dal voucher." },
          { q: "Come ricevo i panieri locali a Km 0?", a: "I furgoni dell'operatore consegnano la spesa direttamente in azienda durante il giro di rifornimento settimanale." },
          { q: "Posso portare familiari o colleghi?", a: "Certamente, i voucher attivano un moltiplicatore medio di 2.0x presenze per accompagnatori." }
        ],
        calc: {
          title: "Stima Benefit Personale Annuo",
          sliderLabel: "Eventi / Esperienze a cui Partecipare",
          min: 1, max: 5, default: 2, step: 1, unit: "esperienze",
          compute: (val) => {
            const benefitVoucher = val * 75;
            const omaggioBiglietto = val * 25;
            const savingDelivery = val * 30;
            return [
              { l: "Voucher Esperienziali Gratuiti", v: "€ " + benefitVoucher },
              { l: "Biglietti Omaggio Startup", v: "€ " + omaggioBiglietto },
              { l: "Spese di Consegna Risparmiate", v: "€ " + savingDelivery },
              { l: "Certificato Welfare Rilasciato", v: "Incluso" }
            ];
          }
        }
      },
      {
        id: "produttori",
        name: "Produttori Agricoli Km 0",
        tagline: "Filiera Corta, Zero Spese Logistiche & Ricavi Diretti",
        badge: "Agroalimentare Locale",
        color: "#059669",
        colorRgb: [5, 150, 105],
        activeGlow: "rgba(5, 150, 105, 0.4)",
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10M12 20v-8M4 14l8-8 8 8M12 6V2"/></svg>',
        requirements: [
          "Produzione agricola o trasformazione locale entro raggio territoriale di 50-70 km.",
          "Conformità HACCP, tracciabilità e confezionamento in panieri standard da 30 €.",
          "Conferimento settimanale dei lotti ordinati presso l'hub logistico del promotore."
        ],
        benefits: "Canale di vendita diretta sul posto di lavoro verso 4.500 addetti, a prezzo pieno senza sconti della GDO e con zero costi di trasporto su gomma.",
        faqs: [
          { q: "Quanto pago per la consegna nelle aziende?", a: "Zero costi. I mezzi dell'operatore integrano la consegna nei loro giri di rifornimento ordinari." },
          { q: "Qual è la frequenza di incasso?", a: "Pagamento garantito alla consegna dei panieri ordinati tramite piattaforma con rendicontazione trasparente." },
          { q: "Qual è il beneficio ecologico Scope 3?", a: "Ogni ordine evita 50 km di trasporto dedicato, risparmiando 0,19 kg CO₂/km." }
        ],
        calc: {
          title: "Stima Fatturato Diretto & Risparmio",
          sliderLabel: "Panieri Settimanali Forniti",
          min: 5, max: 100, default: 25, step: 5, unit: "panieri/sett",
          compute: (val) => {
            const fatturato = val * 30 * 48;
            const kmEvitati = val * 50 * 48;
            const co2Evitata = Math.round(kmEvitati * 0.19);
            return [
              { l: "Fatturato Diretto Annuo", v: "€ " + fatturato.toLocaleString("it-IT") },
              { l: "Tratte Dedicate Risparmiate", v: kmEvitati.toLocaleString("it-IT") + " km" },
              { l: "CO₂ Non Emessa (Scope 3)", v: co2Evitata.toLocaleString("it-IT") + " kg" },
              { l: "Costi di Spedizione Logistica", v: "€ 0,00" }
            ];
          }
        }
      },
      {
        id: "ospitalita",
        name: "Hotel & Ristoranti",
        tagline: "Presenze Infrasettimanali, Zero Fee OTA & Indotto 2.5×",
        badge: "Ricettività & Ristorazione",
        color: "#d97706",
        colorRgb: [217, 119, 6],
        activeGlow: "rgba(217, 119, 6, 0.4)",
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 10h5M6 14h5"/></svg>',
        requirements: [
          "Struttura ricettiva o pubblico esercizio attivo nel distretto territoriale degli eventi.",
          "Accettazione voucher al valore nominale pieno garantito (Hotel €50, Aperitivo/Cena €25).",
          "Disponibilità a riservare contingenti di posti/camere concordati."
        ],
        benefits: "Flussi diretti senza il 18-25% di commissioni dei portali OTA, con indotto accessorio sul posto pari a 2.5× il valore iniziale del voucher.",
        faqs: [
          { q: "Quali sono i tempi di liquidazione dei voucher?", a: "L'accredito avviene telematicamente entro 5 giorni lavorativi dalla scansione digitale del voucher." },
          { q: "Gli accompagnatori pagano a parte?", a: "Sì, ogni lavoratore porta mediamente 1-2 accompagnatori paganti a tariffa piena." },
          { q: "Aiuta a destagionalizzare le presenze?", a: "Certamente, la maggior parte dei voucher viene fruita durante il calendario culturale e infrasettimanale." }
        ],
        calc: {
          title: "Stima Incassi & Indotto Extra",
          sliderLabel: "Voucher Accolti al Mese",
          min: 10, max: 150, default: 30, step: 5, unit: "voucher/mese",
          compute: (val) => {
            const incassoVoucher = val * 37.5 * 12;
            const indottoExtra = Math.round(incassoVoucher * 2.5);
            const feeRisparmiate = Math.round(incassoVoucher * 0.20);
            return [
              { l: "Incasso Diretto Voucher", v: "€ " + Math.round(incassoVoucher).toLocaleString("it-IT") },
              { l: "Indotto Extra Stimato (2.5×)", v: "€ " + indottoExtra.toLocaleString("it-IT") },
              { l: "Commissioni OTA Risparmiate", v: "€ " + feeRisparmiate.toLocaleString("it-IT") },
              { l: "Clienti Fidelizzati Annuali", v: (val * 12) + " ospiti" }
            ];
          }
        }
      },
      {
        id: "cultura",
        name: "Cultura & Spettacoli",
        tagline: "Matching Grant Startup & 2.250 Presenze Garantite",
        badge: "Eventi & Spettacoli",
        color: "#7c3aed",
        colorRgb: [124, 58, 237],
        activeGlow: "rgba(124, 58, 237, 0.4)",
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>',
        requirements: [
          "Organizzazione di spettacoli, concerti, rassegne o festival sul territorio.",
          "Adesione alla convenzione Matching Grant della Startup per gli ingressi omaggio.",
          "Condivisione dati di presenza per la quantificazione dell'impatto economico locale."
        ],
        benefits: "Fondo di 56.250 € a copertura integrale dei biglietti omaggio, con effetto moltiplicatore virale (K-Factor) ed estensione del pubblico.",
        faqs: [
          { q: "Chi rimborsa il valore dei biglietti omaggio?", a: "La Startup partner copre al 100% il costo dei biglietti (25 € cad.) tramite il proprio fondo Matching Grant." },
          { q: "Qual è la retention nelle edizioni successive?", a: "Il modello attesta una fidelizzazione del 40% del pubblico che riacquista per l'edizione seguente." },
          { q: "Come vengono coinvolte le aziende?", a: "L'operatore vending presenta l'evento come benefit ai vertici C-Level e HR delle aziende clienti." }
        ],
        calc: {
          title: "Sinergia Matching Grant & Presenze",
          sliderLabel: "Spettatori Edizione Base",
          min: 500, max: 5000, default: 1500, step: 250, unit: "spettatori",
          compute: (val) => {
            const retention = Math.round(val * 0.40);
            const indotto = Math.round(val * 50);
            return [
              { l: "Fondo Matching Grant Startup", v: "€ 56.250" },
              { l: "Biglietti Omaggio Erogati", v: "2.250 biglietti" },
              { l: "Spettatori Fedeli Ciclo Succ.", v: retention + " persone" },
              { l: "Indotto Economico Locale", v: "€ " + indotto.toLocaleString("it-IT") }
            ];
          }
        }
      }
    ];

    let currentProfileIndex = 0;
    let heroScene, heroCamera, heroRenderer, heroCupMesh, heroSteamGroup;
    let heroTargetColor = new THREE.Color(PROFILES[0].color);

    // ==========================================
    // SMOKE PARTICLE TYPOGRAPHY ENGINE (CANVAS)
    // ==========================================
    const smokeOverlay = document.getElementById("smokeOverlay");
    const smokeCanvas = document.getElementById("smokeCanvas");
    const smokeCtx = smokeCanvas.getContext("2d");
    const smokeEnterBtn = document.getElementById("smokeEnterBtn");
    const smokeDismissBtn = document.getElementById("smokeDismissBtn");
    const smokeTypography = document.getElementById("smokeTypography");
    const welfareTrigger = document.getElementById("welfareTrigger");

    let smokeParticles = [];
    let smokeAnimId = null;
    let smokeStartTime = 0;

    function resizeSmokeCanvas() {
      smokeCanvas.width = window.innerWidth;
      smokeCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeSmokeCanvas);

    class SmokeParticle {
      constructor(originX, originY) {
        this.reset(originX, originY);
      }
      reset(ox, oy) {
        this.x = ox + (Math.random() - 0.5) * 40;
        this.y = oy + (Math.random() - 0.5) * 20;
        this.vx = (Math.random() - 0.5) * 1.4;
        this.vy = -1.2 - Math.random() * 2.2;
        this.radius = 8 + Math.random() * 14;
        this.maxRadius = 35 + Math.random() * 30;
        this.alpha = 0.05 + Math.random() * 0.22;
        this.decay = 0.0015 + Math.random() * 0.0025;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.03;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.radius = Math.min(this.maxRadius, this.radius + 0.35);
        this.alpha -= this.decay;
        this.angle += this.angularSpeed;
      }
      draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        grad.addColorStop(0, "rgba(224, 242, 254, " + (this.alpha * 0.9) + ")");
        grad.addColorStop(0.4, "rgba(147, 197, 253, " + (this.alpha * 0.5) + ")");
        grad.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function initSmokeParticles() {
      smokeParticles = [];
      const originX = window.innerWidth / 2;
      const originY = window.innerHeight * 0.58;
      for (let i = 0; i < 110; i++) {
        smokeParticles.push(new SmokeParticle(originX, originY));
      }
    }

    function animateSmoke(timestamp) {
      if (!smokeStartTime) smokeStartTime = timestamp;
      smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
      const originX = window.innerWidth / 2;
      const originY = window.innerHeight * 0.58;

      smokeParticles.forEach((p) => {
        p.update();
        if (p.alpha <= 0) p.reset(originX, originY);
        p.draw(smokeCtx);
      });

      smokeAnimId = requestAnimationFrame(animateSmoke);
    }

    function launchSmokeExperience() {
      resizeSmokeCanvas();
      initSmokeParticles();
      smokeOverlay.style.display = "flex";
      requestAnimationFrame(() => {
        smokeOverlay.classList.add("is-active");
      });
      smokeStartTime = 0;
      if (smokeAnimId) cancelAnimationFrame(smokeAnimId);
      smokeAnimId = requestAnimationFrame(animateSmoke);
    }

    function dismissSmokeExperience() {
      smokeOverlay.classList.remove("is-active");
      setTimeout(() => {
        smokeOverlay.style.display = "none";
        if (smokeAnimId) cancelAnimationFrame(smokeAnimId);
      }, 500);
    }

    smokeDismissBtn.addEventListener("click", dismissSmokeExperience);
    welfareTrigger.addEventListener("click", launchSmokeExperience);
    smokeEnterBtn.addEventListener("click", openOnboardingPortal);
    smokeTypography.addEventListener("click", openOnboardingPortal);

    // ==========================================
    // ONBOARDING PORTAL SAME-PAGE MORPHING
    // ==========================================
    const onboardingPortal = document.getElementById("onboardingPortal");
    const portalBackToCardsBtn = document.getElementById("portalBackToCardsBtn");
    const profileTabsContainer = document.getElementById("profileTabs");
    const portalLeftCol = document.getElementById("portalLeftCol");
    const portalRightCol = document.getElementById("portalRightCol");
    const cupProfileName = document.getElementById("cupProfileName");
    const cupColorDot = document.getElementById("cupColorDot");

    function openOnboardingPortal() {
      dismissSmokeExperience();
      onboardingPortal.style.display = "block";
      requestAnimationFrame(() => {
        onboardingPortal.classList.add("is-visible");
      });
      renderProfileTabs();
      selectProfile(0);
      initHeroCup3D();
    }

    function closeOnboardingPortal() {
      onboardingPortal.classList.remove("is-visible");
      setTimeout(() => {
        onboardingPortal.style.display = "none";
      }, 500);
    }

    portalBackToCardsBtn.addEventListener("click", closeOnboardingPortal);

    function renderProfileTabs() {
      profileTabsContainer.innerHTML = PROFILES.map((p, idx) => \`
        <button type="button" class="profile-tab-btn \${idx === currentProfileIndex ? "is-active" : ""}"
          onclick="selectProfile(\${idx})"
          style="--active-border: \${p.color}; --active-glow: \${p.activeGlow};"
          aria-selected="\${idx === currentProfileIndex ? "true" : "false"}">
          <div class="tab-icon-box" style="color: \${p.color};">
            \${p.iconSvg}
          </div>
          <div class="tab-info">
            <span class="tab-role-name">\${p.name}</span>
            <span class="tab-role-tag">\${p.badge}</span>
          </div>
        </button>
      \`).join("");
    }

    function selectProfile(index) {
      currentProfileIndex = index;
      const p = PROFILES[index];
      renderProfileTabs();

      // Update Center Legend
      cupProfileName.textContent = p.name;
      cupColorDot.style.backgroundColor = p.color;
      cupColorDot.style.color = p.color;

      // Update 3D Cup Color & Pirouette
      if (typeof THREE !== "undefined" && heroCupMesh) {
        heroTargetColor.set(p.color);
        heroCupMesh.rotation.y += Math.PI * 2;
      }

      // Render Left Column (Requirements & FAQs)
      portalLeftCol.innerHTML = \`
        <div class="portal-section-title">
          <span>Requisiti di Partecipazione Ufficiali</span>
        </div>
        <ul class="requirements-list">
          \${p.requirements.map(req => \`
            <li class="requirement-item">
              <span class="req-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span>\${req}</span>
            </li>
          \`).join("")}
        </ul>

        <div class="benefits-box">
          <strong>Vantaggio Istituzionale Chiave</strong>
          <p>\${p.benefits}</p>
        </div>

        <div class="portal-section-title" style="margin-top: 4px;">
          <span>Domande Frequenti (FAQ)</span>
        </div>
        <div class="faq-list">
          \${p.faqs.map((faq, fIdx) => \`
            <div class="faq-item \${fIdx === 0 ? "is-open" : ""}">
              <button type="button" class="faq-question" onclick="toggleFaq(this)">
                <span>\${faq.q}</span>
                <svg class="faq-toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transition: transform 200ms ease;"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-answer">\${faq.a}</div>
            </div>
          \`).join("")}
        </div>
      \`;

      // Render Right Column (Live Calculator & Form)
      portalRightCol.innerHTML = \`
        <div class="calc-card">
          <div class="calc-header">
            <span>\${p.calc.title}</span>
            <span style="color: \${p.color}; font-weight: 800;">Real-Time</span>
          </div>
          <div class="calc-slider-row">
            <div class="calc-slider-label">
              <span>\${p.calc.sliderLabel}</span>
              <strong id="calcSliderVal">\${p.calc.default} \${p.calc.unit}</strong>
            </div>
            <input type="range" class="calc-slider" id="profileCalcSlider"
              min="\${p.calc.min}" max="\${p.calc.max}" step="\${p.calc.step}" value="\${p.calc.default}"
              oninput="updateCalcValues(\${index}, this.value)"
              style="accent-color: \${p.color};" />
          </div>
          <div class="calc-results-grid" id="calcResultsGrid">
            \${p.calc.compute(p.calc.default).map(item => \`
              <div class="calc-pill">
                <span>\${item.l}</span>
                <strong style="color: \${p.color};">\${item.v}</strong>
              </div>
            \`).join("")}
          </div>
        </div>

        <div class="portal-section-title" style="margin-top: 2px;">
          <span>Modulo di Pre-Adesione Ufficiale</span>
        </div>
        <form class="portal-form" onsubmit="handleOnboardingSubmit(event, '\${p.name}')">
          <div class="form-group">
            <label for="regName">Ragione Sociale o Nominativo *</label>
            <input type="text" id="regName" class="form-control" placeholder="Es. Rossi & Partners S.p.A." required />
          </div>
          <div class="form-group">
            <label for="regEmail">E-mail Istituzionale o Personale *</label>
            <input type="email" id="regEmail" class="form-control" placeholder="nome@azienda.it" required />
          </div>
          <div class="form-group">
            <label for="regPhone">Recapito Telefonico Diretto</label>
            <input type="tel" id="regPhone" class="form-control" placeholder="+39 02 1234567" />
          </div>
          <div class="form-group">
            <label for="regNotes">Note Operative o Requisiti Specifici</label>
            <textarea id="regNotes" class="form-control" placeholder="Specificare sede o esigenze logistiche..."></textarea>
          </div>
          <button type="submit" class="form-submit-btn" style="background: linear-gradient(135deg, \${p.color}, #1e3a8a);">
            <span>Conferma Candidatura & Scarica Dossier</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </form>
      \`;
    }

    function toggleFaq(btn) {
      const item = btn.closest(".faq-item");
      item.classList.toggle("is-open");
    }

    function updateCalcValues(profileIdx, val) {
      const p = PROFILES[profileIdx];
      const sliderVal = document.getElementById("calcSliderVal");
      const grid = document.getElementById("calcResultsGrid");
      if (sliderVal) sliderVal.textContent = val + " " + p.calc.unit;
      if (grid) {
        const results = p.calc.compute(Number(val));
        grid.innerHTML = results.map(item => \`
          <div class="calc-pill">
            <span>\${item.l}</span>
            <strong style="color: \${p.color};">\${item.v}</strong>
          </div>
        \`).join("");
      }
    }

    function handleOnboardingSubmit(e, profileName) {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;

      // Show Success Modal
      const modal = document.createElement("div");
      modal.className = "success-modal";
      modal.innerHTML = \`
        <div class="modal-card">
          <div class="modal-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3>Candidatura Inviata con Successo!</h3>
          <p>
            Grazie <strong>\${name}</strong>. La tua richiesta per il profilo <strong>\${profileName}</strong> è stata acquisita. Abbiamo inviato il Dossier Tecnico di Conformità TUIR e CAM a <em>\${email}</em>.
          </p>
          <button type="button" class="modal-btn" onclick="this.closest('.success-modal').remove()">Chiudi</button>
        </div>
      \`;
      document.body.appendChild(modal);
    }

    // ==========================================
    // 3D GIANT COFFEE CUP VIEWER (THREE.JS)
    // ==========================================
    function initHeroCup3D() {
      if (typeof THREE === "undefined") return;
      const wrap = document.getElementById("cup3dCanvasWrap");
      const canvas = document.getElementById("heroCupCanvas");
      if (!wrap || !canvas) return;

      const width = wrap.clientWidth;
      const height = wrap.clientHeight;

      if (!heroScene) {
        heroScene = new THREE.Scene();
        heroCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        heroCamera.position.set(0, 1.2, 4.2);
        heroCamera.lookAt(0, 0, 0);

        heroRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        heroRenderer.setSize(width, height);
        heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Ambient & Spot Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        heroScene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1.6);
        spotLight.position.set(5, 8, 5);
        heroScene.add(spotLight);

        const rimLight = new THREE.PointLight(0x60a5fa, 2.2, 10);
        rimLight.position.set(-4, 3, -3);
        heroScene.add(rimLight);

        // Cup Body (Cylinder with conical taper)
        const cupGeo = new THREE.CylinderGeometry(1.0, 0.68, 1.5, 36, 1, true);
        const cupMat = new THREE.MeshPhysicalMaterial({
          color: heroTargetColor,
          roughness: 0.18,
          metalness: 0.1,
          transmission: 0.45,
          thickness: 0.8,
          ior: 1.45,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        });
        heroCupMesh = new THREE.Mesh(cupGeo, cupMat);
        heroCupMesh.position.y = -0.15;
        heroScene.add(heroCupMesh);

        // Cup Base
        const baseGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.08, 36);
        const baseMesh = new THREE.Mesh(baseGeo, cupMat);
        baseMesh.position.y = -0.9;
        heroCupMesh.add(baseMesh);

        // Handle (Torus)
        const handleGeo = new THREE.TorusGeometry(0.48, 0.1, 16, 32, Math.PI * 1.15);
        const handleMesh = new THREE.Mesh(handleGeo, cupMat);
        handleMesh.position.set(0.96, 0.05, 0);
        handleMesh.rotation.z = -Math.PI / 2;
        heroCupMesh.add(handleMesh);

        // Coffee Surface Disk
        const coffeeGeo = new THREE.CircleGeometry(0.94, 36);
        const coffeeMat = new THREE.MeshStandardMaterial({
          color: 0x3d1f0d,
          roughness: 0.3,
          metalness: 0.2
        });
        const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
        coffeeMesh.rotation.x = -Math.PI / 2;
        coffeeMesh.position.y = 0.58;
        heroCupMesh.add(coffeeMesh);

        // Crema Swirl
        const cremaGeo = new THREE.RingGeometry(0.2, 0.75, 32);
        const cremaMat = new THREE.MeshBasicMaterial({
          color: 0xb4793d,
          transparent: true,
          opacity: 0.45
        });
        const cremaMesh = new THREE.Mesh(cremaGeo, cremaMat);
        cremaMesh.rotation.x = -Math.PI / 2;
        cremaMesh.position.y = 0.59;
        heroCupMesh.add(cremaMesh);

        // Subtle Steam Particles from Cup Rim
        heroSteamGroup = new THREE.Group();
        const steamGeo = new THREE.SphereGeometry(0.04, 8, 8);
        const steamMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.25 });
        for (let i = 0; i < 24; i++) {
          const steamParticle = new THREE.Mesh(steamGeo, steamMat);
          steamParticle.position.set(
            (Math.random() - 0.5) * 0.7,
            0.6 + Math.random() * 0.8,
            (Math.random() - 0.5) * 0.7
          );
          steamParticle.userData = { speedY: 0.008 + Math.random() * 0.012 };
          heroSteamGroup.add(steamParticle);
        }
        heroCupMesh.add(heroSteamGroup);

        // Drag to Rotate
        let cupDragging = false;
        let cupPrevX = 0;
        wrap.addEventListener("pointerdown", (e) => {
          cupDragging = true;
          cupPrevX = e.clientX;
          wrap.setPointerCapture(e.pointerId);
        });
        wrap.addEventListener("pointermove", (e) => {
          if (!cupDragging || !heroCupMesh) return;
          const dx = e.clientX - cupPrevX;
          heroCupMesh.rotation.y += dx * 0.015;
          cupPrevX = e.clientX;
        });
        const stopCupDrag = () => { cupDragging = false; };
        wrap.addEventListener("pointerup", stopCupDrag);
        wrap.addEventListener("pointercancel", stopCupDrag);

        function animateHeroCup() {
          requestAnimationFrame(animateHeroCup);
          if (heroCupMesh) {
            if (!cupDragging) {
              heroCupMesh.rotation.y += 0.005;
            }
            // Smooth Color Lerp
            if (heroCupMesh.material.color) {
              heroCupMesh.material.color.lerp(heroTargetColor, 0.08);
            }
          }
          // Animate Steam
          if (heroSteamGroup) {
            heroSteamGroup.children.forEach(sp => {
              sp.position.y += sp.userData.speedY;
              sp.scale.x += 0.005;
              sp.scale.z += 0.005;
              if (sp.position.y > 1.6) {
                sp.position.y = 0.6;
                sp.scale.set(1, 1, 1);
              }
            });
          }
          heroRenderer.render(heroScene, heroCamera);
        }
        animateHeroCup();
      }
    }
`;

// Inject into spinCarousel to launch smoke automatically when spin finishes
if (!content.includes('launchSmokeExperience()')) {
  content = content.replace(
    'goTo(spinTargetIndex);',
    'goTo(spinTargetIndex);\n          setTimeout(() => { launchSmokeExperience(); }, 850);'
  );
}

// Inject additional script before </script>
if (!content.includes('initHeroCup3D()')) {
  content = content.replace('// Initial setup', additionalScript + '\n    // Initial setup');
}

fs.writeFileSync(srcPath, content, 'utf8');
console.log('Successfully updated asset/landing-page-3d-vetro.html');
