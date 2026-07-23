import { useState } from "react";
import api from "../../api/axios";
import "./SymptomTriage.css";

export default function SymptomTriage() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async () => {
    if (!input.trim()) return;
    const next = [...history, { role: "user", text: input }];
    setHistory(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/triage", { history: next });

      if (data.status === "asking") {
        setHistory([...next, { role: "model", text: data.message }]); // ask again
      } else if (data.status === "done") {
        setResult(data); // show recommendation
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="triage">
      <div className="triage-messages">
        {history.length === 0 && !result && (
          <p className="triage-intro">Describe what you're feeling and we'll suggest the right service for your visit.</p>
        )}
        {history.map((m, i) => (
          <div key={i} className={m.role === "user" ? "triage-bubble-user" : "triage-bubble-ai"}>
            {m.text}
          </div>
        ))}
        {loading && <div className="triage-bubble-ai">Thinking…</div>}
        {error && <div className="triage-bubble-ai triage-error">{error}</div>}

        {result && (
          <div className={`triage-result ${result.urgent ? "urgent" : ""}`}>
            <h3>Recommended: {result.service}</h3>
            <p>{result.reason}</p>
            {result.urgent && <p>⚠️ This may be urgent — please seek care now.</p>}
            <small>A dentist will confirm during your visit.</small>
          </div>
        )}
      </div>

      {!result && (
        <div className="triage-input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Describe your symptom…"
          />
          <button onClick={send} disabled={loading || !input.trim()}>Send</button>
        </div>
      )}
    </div>
  );
}