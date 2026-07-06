import { useState } from "react";
import api from "../../api/axios";

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
      {history.map((m, i) => (
        <div key={i} className={m.role === "user" ? "bubble-user" : "bubble-ai"}>
          {m.text}
        </div>
      ))}
      {loading && <div className="bubble-ai">Thinking…</div>}
      {error && <div className="bubble-ai error">{error}</div>}

      {result && (
        <div className={`result ${result.urgent ? "urgent" : ""}`}>
          <h3>Recommended: {result.service}</h3>
          <p>{result.reason}</p>
          {result.urgent && <p>⚠️ This may be urgent — please seek care now.</p>}
          <small>A dentist will confirm during your visit.</small>
        </div>
      )}

      {!result && (
        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Describe your symptom…"
          />
          <button onClick={send}>Send</button>
        </div>
      )}
    </div>
  );
}