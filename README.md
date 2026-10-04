# 🎯 BlindSpot — AI Decision Intelligence & Cognitive Bias Analyzer

> *"BlindSpot doesn't make the decision for you. It makes your thinking better."*

**BlindSpot** is a competition-ready AI thinking companion designed to stress-test high-stakes personal, career, financial, and strategic decisions. Unlike a standard chatbot that gives opinions or tells users what to do, BlindSpot acts as an analytical mirror—exposing unexamined assumptions, surfacing cognitive-bias signals, separating facts from unknowns, and building a comprehensive **Before vs After Thinking Map**.

---

## 🌟 Key Features & Signature Capabilities

### 1. 🔍 Decision X-Ray (Fact & Assumption Audit)
Explicitly separates and categorizes decision inputs:
- 📌 **FACTS**: Information explicitly provided by the user.
- 💡 **ASSUMPTIONS**: Hidden dependencies the decision relies upon.
- ❓ **UNKNOWNS**: Missing information critical to de-risking the choice.
- 🔮 **HYPOTHETICALS**: Stress-test premises and downside tests.
- 🔍 **EVIDENCE GAPS**: Claims categorized as `SUPPORTED`, `UNSUPPORTED`, `UNKNOWN`, or `SUBJECTIVE` with actionable verification steps.

### 2. ⚠️ Blind Spots & Cognitive Bias Signals
- **Severity-Rated Cards**: `High`, `Medium`, and `Low` severity risks with single-sentence scannable summaries, root causes, and reflection prompts.
- **Cognitive Bias Signals**: Detects analytical signals (e.g. *Anchoring*, *Confirmation Bias*, *Planning Fallacy*, *Status Quo Bias*) framed as analytical indicators with practical mitigations.

### 3. 🛡️ "Challenge My Thinking" & "Flip The Decision"
- **Challenge My Thinking**: Probes disconfirming evidence ("What if your strongest assumption is wrong?", "What information would change your mind?").
- **Flip The Decision**: Analyzes *"What if I chose the opposite path?"*—revealing overlooked benefits, costs, and success conditions without declaring the opposite choice better.

### 4. 🧭 Scenario Explorer & Control Matrix
- **Plausible Scenarios**: Best Case, Base / Plausible Case, and Worst Case scenarios.
- **Control vs Uncertainty Matrix**: Distinguishes **I CAN INFLUENCE** from **I CANNOT FULLY CONTROL** (external uncertainties).
- **Stakeholder & Temporal Lenses**: Analyzes viewpoints from *Me*, *Family*, *Friend/Mentor*, *Employer/Team*, *1 Year From Now*, and *5 Years From Now*.

### 5. 📊 Thinking Completeness Index
Replaces arbitrary decision scores with a transparent **Thinking Completeness Index** (0-100%) measuring coverage across assumptions, evidence, risks, alternatives, stakeholders, trade-offs, and scenarios.

### 6. 🗺️ Before vs After Thinking Map & Executive Brief
- **Before/After Map**: Visualizes the evolution from initial intuition to deep analytical clarity.
- **Verification Checklist**: "Before You Decide" interactive action list.
- **Markdown Export**: Download formatted `.md` executive briefs or copy to clipboard.

---

## 🔒 Secure Server API Architecture

BlindSpot enforces strict zero-trust security:

```
[ FRONTEND REACT APP ]
        │
        ▼ (POST /api/analyze - Sanitized JSON Payload)
[ SECURE SERVER API ENDPOINT ]
        │
        ├── Reads GEMINI_API_KEY from server environment ONLY
        ├── Performs input sanitization & prompt-injection defense
        ├── Calls Gemini API securely (server-side)
        └── Validates structured JSON schema response
        │
        ▼
[ GEMINI API ]
```

### Security Directives Enforced:
1. **Zero User API Key Input**: No user, judge, or evaluator is ever asked to enter an API key.
2. **Server-Side Credentials**: `GEMINI_API_KEY` exists strictly on the server process and is NEVER exposed to client JavaScript bundles, LocalStorage, sessionStorage, HTML, or logs.
3. **Deterministic Fallback Engine**: If `GEMINI_API_KEY` is omitted or Gemini API is unreachable, the system seamlessly uses its server/client deterministic reasoning engine, clearly setting `isFallbackMode: true` without falsely claiming Gemini was called.
4. **Input & Output Sanitization**: User text is treated strictly as decision content, NOT system commands. AI outputs undergo JSON schema validation before rendering.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **Backend / API**: Vite Server Middleware / Express Node API Server (`server/apiHandler.js`)
- **AI Integration**: Google Gemini API (`gemini-1.5-flash`) + Fallback Reasoning Engine
- **Storage**: LocalStorage (decision history & drafts)

---

## 🚀 Quick Start & Launch Instructions

### Prerequisites:
- Node.js (v18+)

### 1. Clone & Install
```bash
cd blindspot
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your `GEMINI_API_KEY` to `.env`. *(If left as default, BlindSpot operates in fallback reasoning mode).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Run Production Server
```bash
npm run build
npm run preview
```
Or run standalone Node server:
```bash
node server.js
```

---

## 🏆 Hackathon Alignment & Verification

- **Problem Alignment**: Solves "The Blind Spot" challenge by helping users discover overlooked variables before making irreversible choices.
- **Git Branch Audit**: Exactly **1 Git Branch** (`main`).
- **Production Build Status**: Verified zero compilation errors (`tsc && vite build`).
