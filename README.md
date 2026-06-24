# AI CHRO Dashboard — BeeForce Workforce Intelligence Demo

A multi-persona AI workforce dashboard demo for BeeForce (BlueTree), built per the BeeForce Enterprise Metric Framework.

## What's in here

- **CHRO view** — Executive Overview, Compliance, Attendance & Time, Vendor Management, and 9 additional module tabs (Onboarding, Scheduling, Payroll, Engagement, Grievance, Referral, Productivity, Safety, Offboarding), each with the full metric set from the framework.
- **CFO / CIO / CDO persona dashboards** — 5 dedicated tabs each (Cost Overview, Intelligence Feed, Digital Health, etc.), scoped to a single company per the BeeForce Persona Dashboard UI Spec.
- **7-company demo switcher** spanning the workforce health spectrum, from critical/low-compliance to excellent.
- AI Insight panels with follow-up Q&A, NLQ search, anomaly feeds, and predictive signal cards — all backed by mock data.

## Stack

Vite + React 19 + TypeScript + Tailwind, with hand-built SVG chart components (no charting library dependency).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.
