# 🛡️ Security Posture & Operations Check

A free, client-side web application for conducting structured Microsoft Security assessments. Built as an interactive 8-step wizard, it guides security consultants and engineers through a comprehensive review of a customer's cloud and on-premise security posture — covering Defender for Cloud, Microsoft Sentinel, XDR, AMA agents, log sources, and data retention.

No account, no server, no installation required. Everything runs in your browser.

---

## Getting Started

1. Download or clone this repository
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox)
3. That's it — no build step, no dependencies

```
├── index.html    # Application structure and wizard steps
├── app.js        # State management, wizard logic, report generation
├── styles.css    # Styling and responsive layout
└── README.md
```

---

## How to Use

### Step 1 — Customer details
Fill in the organisation name, customer contact, assessment date, and your name as the consultant. This information appears in the generated report.

### Step 2 — Overview
Get an overview of all assessment sections. You can mark entire sections as **Out of Scope** here if they are not relevant for this customer (e.g. a customer without Sentinel).

### Steps 3–7 — Assessment domains
Walk through each security domain:

| Step | Domain |
|------|--------|
| 3 | Defender for Cloud |
| 4 | XDR Data |
| 5 | AMA Coverage |
| 6 | Retentie |
| 7 | Sentinel Logbronnen |

For each item you can:

- **Set the status** — use the coloured buttons to indicate whether a setting is on, off, partially configured, or not applicable (N.v.t.)
- **Set a result** — click the result dot to mark the finding as 🟢 as expected, 🟡 needs attention, or 🔴 action required
- **Add a note** — click "+ Notitie toevoegen" to attach a free-text note to any item
- **Flag for follow-up** — click 🔄 to mark an item for a next session

For toggle-style settings (Defender CSPM extensions, AI Services, Storage, Servers), click the toggle to cycle through **Aan / Uit / N.v.t.**

Some sections only appear when a parent setting is enabled (e.g. CSPM configuration details only appear when Defender CSPM is turned on).

### Step 8 — Results
Review the summary of all sections with their conclusions. Add overall findings in four categories:
- Positieve bevindingen
- Aandachtspunten
- Kritieke bevindingen
- Actiepunten

Then click **Rapport genereren** to open the full report.

---

## Report & Export

From the report screen you can:

- **Print / PDF** — use the browser print dialog (works well with "Save as PDF")
- **Export JSON** — save the full assessment for archiving or loading later
- **Export Excel** — download a CSV file (semicolon-delimited, UTF-8 with BOM for Excel compatibility)

---

## Saving & Loading Assessments

All data is stored in your browser's `localStorage`. No data leaves your device.

- Assessments are **auto-saved** as you work (300ms debounce)
- To load a previous assessment, click **Opgeslagen assessments laden** on the first screen
- To export for backup or transfer to another device, use **Export JSON** and re-import via the load panel

To clear all saved assessments, run in the browser console:

```js
localStorage.removeItem("cloud-security-posture-check-assessments");
location.reload();
```

---

## Requirements

- Any modern browser (Chrome 90+, Edge 90+, Firefox 88+)
- No internet connection required after the page loads (fonts load from Google Fonts on first open)
- No server, no backend, no login

---

## Disclaimer

This tool is a **configuration helper**, not a security audit tool. It is intended as a structured conversation aid to help consultants and engineers review security settings together with a customer.

- Results reflect what was observed and discussed during the session — they are **not** the output of automated scanning or testing
- The tool does **not** connect to any environment, API, or external system
- **No rights, guarantees, or certifications** of any kind can be derived from the output of this tool
- Always consult a qualified security professional for formal audits, penetration tests, or compliance assessments

