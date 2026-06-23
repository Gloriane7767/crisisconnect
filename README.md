# 🤝 CrisisConnect — AI Tool for IDPs in Cameroon

> An AI-powered needs and aid matching tool for Internally Displaced Persons in Cameroon, built with Claude AI and prompt engineering.

![CrisisConnect Banner](https://img.shields.io/badge/Field-Humanitarian%20Aid-teal) ![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-blue) ![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-green)

---

## 🌍 The Problem

Cameroon's ongoing Anglophone crisis and Far North conflicts have displaced nearly **845,000 people**, with 3.3 million needing humanitarian assistance — yet only **17% of funding** is covered. The Norwegian Refugee Council ranks it the **world's most neglected displacement crisis**.

Three critical gaps block aid delivery:
- **Information Gap** — IDPs don't know what aid exists or where
- **Coordination Gap** — NGOs lack real-time resource matching tools
- **Language Gap** — Aid communication ignores Pidgin, Fulfulde, and local languages

---

## 💡 The Solution

**CrisisConnect** is an AI chatbot with two modes:

| Mode | Who it's for | What it does |
|---|---|---|
| Mode 1 — IDP | Displaced persons | Identifies needs, matches to nearest aid organizations |
| Mode 2 — NGO | Coordinators & UN staff | Needs mapping, gap analysis, cluster coordination reports |

Built using **prompt engineering** with Claude AI (claude-sonnet-4-6).

---

## 🚀 Live Demo

👉 **[Try CrisisConnect Live](https://Gloriane7767.github.io/crisisconnect)**

---

## 📁 Project Structure

```
crisisconnect/
├── index.html                          # Full website + chatbot
├── CrisisConnect_IDP_AI_Cameroon.pptx  # Project presentation slides
└── README.md                           # This file
```

---

## 🛠️ How to Run Locally

1. Clone the repo:
```bash
git clone https://github.com/YOUR-USERNAME/crisisconnect.git
cd crisisconnect
```

2. Open `index.html` in your browser — no build step needed!

> ⚠️ Note: The chatbot requires an Anthropic API key to respond. When hosted on Claude.ai or GitHub Pages with proper API proxy, it works automatically.

---

## 🧠 Prompt Engineering Strategy

The core of CrisisConnect is two carefully designed system prompts:

**IDP Mode prompt** guides Claude to:
- Ask for location (region/town, not GPS)
- Identify urgency level and vulnerability factors
- Respond in the user's language (English, French, or Pidgin)
- Recommend verified organizations and emergency numbers

**NGO Coordinator prompt** guides Claude to:
- Generate structured needs assessments by sector
- Flag coverage gaps by region and severity
- Output cluster-ready coordination reports

---

## ⚖️ Ethical Considerations

| Risk | Safeguard |
|---|---|
| Security — location data could endanger IDPs | General zones only, no GPS, no personal data stored |
| Bias — AI weaker in Fulfulde/Pidgin | Community language validators, local prompt testing |
| Misinformation — wrong aid location = dangerous journey | Weekly data verification, travel disclaimer on every response |
| Digital exclusion — many IDPs have no smartphone | USSD and radio channels planned for offline access |
| Over-dependency — AI replacing human workers | Positioned as complement, human override always available |
| Transparency — users may not know it's AI | AI identity disclosed at start of every conversation |

---

## 📊 Presentation Slides

Download the full 6-slide project presentation:
👉 [CrisisConnect_IDP_AI_Cameroon.pptx](./CrisisConnect_IDP_AI_Cameroon.pptx)

---

## 🏗️ Built With

- [Claude AI](https://claude.ai) — Anthropic's claude-sonnet-4-6 model
- Prompt Engineering — custom multilingual system prompts
- HTML / CSS / JavaScript — no frameworks, runs in any browser
- GitHub Pages — free deployment

---

## 📌 Project Context

This project was developed as part of an AI literacy course, demonstrating how generative AI tools can be applied to real-world humanitarian challenges in Cameroon.

**Field:** Humanitarian Aid / Project Management  
**Tools:** Claude AI, Prompt Engineering  
**Context:** Cameroon Anglophone Crisis & Far North Displacement

---

*CrisisConnect — Connecting displaced people to the help they need, faster, smarter, and in their own language.*
