import { useState, useRef, useEffect } from "react";

const SYSTEMS = {
  idp: `You are CrisisConnect, a compassionate humanitarian AI assistant helping Internally Displaced Persons (IDPs) in Cameroon. Nearly 845,000 people are displaced due to the Anglophone crisis (Northwest/Southwest) and Far North conflicts.

Your role:
1. Find out the person's region or town (Northwest, Southwest, Far North, Littoral, Centre, East, Adamawa, etc.)
2. Identify their most urgent need: food, shelter, medical care, education, protection, or psychosocial support
3. Ask about household size and vulnerabilities (children, elderly, pregnant women, disability)
4. Give practical, actionable guidance on where to get help

Key organizations in Cameroon:
- IOM: shelter, NFIs, displacement tracking
- UNHCR: protection, cash assistance, shelter kits
- UNICEF: child protection, nutrition, education, WASH
- WFP: food assistance, cash for food
- MSF: medical care (especially NW/SW)
- NRC: legal aid, education, shelter
- IRC: health, safety, economic recovery
- Emergency: 117 (police), 15 (medical), 1513 (social emergencies)

Rules:
- Respond in the same language the person uses (English, French, or Cameroonian Pidgin)
- Keep replies under 150 words — simple and actionable
- Never ask for GPS or full name — use general zones only for safety
- Always end with a follow-up question or next step
- Remind users to confirm aid locations before traveling
- If someone is in immediate danger, give them 117 right away
- Always be honest that you are an AI if asked`,

  ngo: `You are CrisisConnect Coordinator, an AI assistant for humanitarian coordinators, NGO staff, and UN agency workers responding to the Cameroon displacement crisis.

You help with:
1. NEEDS MAPPING: Summarize IDP needs by sector (food, shelter, health, WASH, education, protection) and region
2. RESOURCE GAPS: Identify areas with unmet needs and no active organizational presence
3. COORDINATION REPORTS: Generate structured summaries for cluster meetings
4. RESPONSE PLANNING: Suggest prioritization based on severity levels and population size

Crisis context (2025-2026):
- 844,953 IDPs total; Northwest/Southwest: Anglophone crisis; Far North: Boko Haram, intercommunal conflict, floods
- 3.3 million people need assistance; only 17% of humanitarian funding covered
- Key clusters: Food Security (WFP lead), Shelter/NFI (IOM lead), Health (WHO/MSF), Protection (UNHCR), Education (UNICEF)

Use clear headers, severity levels (Critical/High/Medium/Low), and actionable recommendations. Flag estimated vs verified data.`
};

const WELCOME = {
  idp: "Hello! I am CrisisConnect, your humanitarian assistant.\n\nI can help you find food, shelter, medical care, education, and protection support in Cameroon.\n\nWhich region or town are you currently in?",
  ngo: "Welcome to CrisisConnect Coordinator mode.\n\nI can help you map IDP needs, identify resource gaps, and generate coordination reports across Cameroon's crisis zones.\n\nWhat would you like to work on today?"
};

const QUICK = {
  idp: ["I need food assistance", "Where can I find shelter?", "I need medical help", "School for my children", "I feel unsafe"],
  ngo: ["Gap analysis — Far North", "Food Security Cluster report", "NW/SW protection needs", "Generate coordination brief", "IDP numbers by region"]
};

export default function CrisisConnect() {
  const [mode, setMode] = useState("idp");
  const [messages, setMessages] = useState([{ role: "bot", text: WELCOME.idp }]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function switchMode(m) {
    if (m === mode) return;
    setMode(m);
    setMessages([{ role: "bot", text: WELCOME[m] }]);
    setHistory([]);
    setInput("");
  }

  async function send(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const newHistory = [...history, { role: "user", content: msg }];
    setMessages(prev => [...prev, { role: "user", text: msg }, { role: "typing" }]);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEMS[mode],
          messages: newHistory
        })
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || "Sorry, I could not get a response. Please try again.";
      setHistory([...newHistory, { role: "assistant", content: reply }]);
      setMessages(prev => [...prev.filter(m => m.role !== "typing"), { role: "bot", text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev.filter(m => m.role !== "typing"), { role: "bot", text: "Sorry, something went wrong. Please try again. For emergencies call 117." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column", height: 600, border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", background: "#fff" }}>

      {/* Header */}
      <div style={{ background: "#0B2D3A", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, background: "#0D7377", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🤝</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>CrisisConnect</div>
          <div style={{ color: "#5DCAA5", fontSize: 11, marginTop: 1 }}>AI Humanitarian Assistant · Cameroon Crisis Response</div>
        </div>
      </div>

      {/* Mode tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", flexShrink: 0 }}>
        {[["idp", "👥 Mode 1 — For IDPs"], ["ngo", "🏢 Mode 2 — For NGO Coordinators"]].map(([m, label]) => (
          <button key={m} onClick={() => switchMode(m)} style={{
            flex: 1, padding: "10px 8px", fontSize: 12, fontWeight: 500, border: "none",
            borderBottom: mode === m ? "2px solid #0D7377" : "none",
            background: mode === m ? "#fff" : "#f8fafc",
            color: mode === m ? "#0D7377" : "#64748b",
            cursor: "pointer"
          }}>{label}</button>
        ))}
      </div>

      {/* Context bar */}
      <div style={{ padding: "6px 14px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#64748b", flexShrink: 0 }}>
        <span style={{ color: "#0D7377", fontWeight: 600 }}>{mode === "idp" ? "IDP Mode" : "Coordinator Mode"}</span>
        {" — "}
        {mode === "idp" ? "Ask about food, shelter, medical care, education, or protection near you." : "Needs mapping, gap analysis, cluster reports, and response planning."}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => {
          if (m.role === "typing") return (
            <div key={i} style={{ alignSelf: "flex-start" }}>
              <div style={{ background: "#f1f5f9", borderRadius: "12px 12px 12px 4px", padding: "12px 16px", display: "flex", gap: 4 }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{
                    width: 6, height: 6, background: "#0D7377", borderRadius: "50%",
                    animation: "bounce 1.2s infinite",
                    animationDelay: `${d * 0.2}s`
                  }} />
                ))}
              </div>
            </div>
          );
          const isUser = m.role === "user";
          return (
            <div key={i} style={{ alignSelf: isUser ? "flex-end" : "flex-start", maxWidth: "82%" }}>
              {!isUser && <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, paddingLeft: 4 }}>CrisisConnect</div>}
              <div style={{
                padding: "10px 13px",
                borderRadius: isUser ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                background: isUser ? "#0B2D3A" : "#f1f5f9",
                color: isUser ? "#fff" : "#1e293b",
                fontSize: 13, lineHeight: 1.6,
                whiteSpace: "pre-wrap"
              }}>{m.text}</div>
              {isUser && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2, textAlign: "right", paddingRight: 4 }}>You</div>}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Quick buttons */}
      <div style={{ display: "flex", gap: 6, padding: "8px 14px", overflowX: "auto", flexShrink: 0, borderTop: "1px solid #e2e8f0", background: "#f8fafc" }}>
        {QUICK[mode].map(q => (
          <button key={q} onClick={() => send(q)} style={{
            whiteSpace: "nowrap", padding: "5px 10px", fontSize: 11,
            background: "#fff", border: "1px solid #cbd5e1", borderRadius: 20,
            cursor: "pointer", color: "#475569", flexShrink: 0
          }}>{q}</button>
        ))}
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderTop: "1px solid #e2e8f0", background: "#fff", flexShrink: 0 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder={mode === "idp" ? "Type in English, French, or Pidgin..." : "Ask about needs, gaps, or coordination reports..."}
          style={{
            flex: 1, padding: "9px 12px", fontSize: 13,
            border: "1px solid #cbd5e1", borderRadius: 8,
            outline: "none", color: "#1e293b"
          }}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{
          width: 38, height: 38, background: loading ? "#94a3b8" : "#0B2D3A",
          border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer",
          color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center"
        }}>➤</button>
      </div>

      <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", padding: "4px 0 8px" }}>
        AI assistant · Verify aid locations before traveling · Emergency: 117
      </div>

      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}
