
import { useState } from "react";

export default function MednexusForm() {
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [history, setHistory] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function submitAssessment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/mednexus/assess",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age: Number(age),
            symptoms,
            duration: duration || "Not specified",
            medical_history: history || "Not provided"
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail?.[0]?.msg || "Unable to submit information.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Backend connection failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-panel">
      <h2>MEDNEXUS AI</h2>
      <h3>Health Information Assessment</h3>
      <p>Enter your information to prepare a summary for healthcare professional review.</p>

      <form onSubmit={submitAssessment}>
        <label>Age</label>
        <input
          type="number"
          min="1"
          max="120"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
        />

        <label>Symptoms</label>
        <textarea
          required
          minLength={3}
          maxLength={1000}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms"
          rows={4}
        />

        <label>How long have you experienced them?</label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Example: 2 days"
        />

        <label>Relevant medical history (optional)</label>
        <textarea
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          placeholder="Enter relevant history or leave blank"
          rows={3}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit for Review"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="notice">
          <h3>Information received successfully</h3>
          <p>{result.message}</p>
          <strong>{result.review_status}</strong>
          <p>{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
