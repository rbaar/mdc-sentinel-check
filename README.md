# ☀️ Microsoft Security APK Zomercheck

A client-side web application for conducting structured Microsoft Security assessments. Built as an interactive 8-step wizard, it guides security consultants through a comprehensive review of a customer's cloud and on-premise security posture.

## Features

- **8-step wizard** — Klantgegevens → Overzicht → Defender for Cloud → XDR Data → AMA Coverage → Retentie → Sentinel Logbronnen → Resultaat
- **100+ checklist items** covering Defender for Cloud plans, XDR connectors, AMA agents, data retention, and Sentinel log sources
- **Status tracking** per item (left to right): N.v.t. → Uit → Niet consistent → Aan
- **Result scoring** per item:
  - 🟢 Configuratie is zoals verwacht
  - 🟡 Configuratie is niet helemaal zoals verwacht
  - 🔴 Configuratie niet zoals verwacht, actie vereist
- **Follow-up marking** (🔄) to flag items for a next session
- **Scope management** — mark entire sections as "Out of Scope"
- **Conditional config sections** — configuration checklists (CSPM, AI Services, Storage, Servers) only appear when the parent plan is enabled
- **Notes** at item, section, and global level (positive findings, attention points, critical findings, action items)
- **Auto-save** to localStorage with debouncing (300ms)
- **Multiple assessments** — save, load, and manage assessments per customer
- **Report generation** with banner image, summary table, legend, per-section details, follow-up overview, and findings
- **Print / PDF** via browser print dialog
- **Export** — JSON for archiving, CSV (Excel-compatible with UTF-8 BOM and semicolon delimiter)
- **Accessibility** — aria-labels on status buttons
- **Data loss prevention** — browser warns before closing tab with active assessment

## Getting Started

No build step required. Open `index.html` in a browser.

```
├── index.html    # Application structure and wizard steps
├── app.js        # State management, wizard logic, report generation
├── styles.css    # Styling and responsive layout
├── banner.png    # Hero banner image (used in app and report)
└── README.md
```

## Usage

1. Enter customer details in step 1
2. Review the overview and optionally mark sections as out-of-scope
3. Walk through each security domain (steps 3–7), setting status and notes per item
4. Review results in step 8, add findings and action items
5. Generate the report, then print, export as JSON, or export as Excel (CSV)

## Data Storage

All data is stored in the browser's `localStorage`. No server or database required. Data does not leave the browser.

To clear all saved assessments, run in the browser console:

```js
localStorage.removeItem("apk-zomercheck-assessments");
location.reload();
```

## License

Internal use only — Microsoft Security.
