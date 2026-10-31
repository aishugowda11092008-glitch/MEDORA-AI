import { useState } from "react";

export default function ScanwiseUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function uploadReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Please select a PDF report.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/api/scanwise/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "PDF upload failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-panel">
      <h2>SCANWISE AI</h2>
      <h3>Medical Report Reader</h3>
      <p>Upload a PDF medical report to extract its selectable text for review.</p>

      <form onSubmit={uploadReport}>
        <label>Select medical report (PDF)</label>
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setResult(null);
            setError("");
          }}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Extracting..." : "Upload and Extract Text"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="notice">
          <h3>Report processed</h3>
          <p>{result.message}</p>
          <p>Pages: {result.page_count}</p>
          <p>File: {result.filename}</p>
          <pre style={{ whiteSpace: "pre-wrap", maxHeight: 350, overflowY: "auto" }}>
            {result.extracted_text || "No selectable text found. OCR is not connected yet."}
          </pre>
          <p>{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
