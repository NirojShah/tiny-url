import { useState } from "react";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #020617, #020617, #000000)",
      padding: "16px",
      fontFamily: "Inter, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(16px)",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    title: {
      color: "#fff",
      textAlign: "center",
      fontSize: "24px",
      fontWeight: 700,
      marginBottom: "6px",
    },
    subtitle: {
      color: "#9ca3af",
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "14px",
    },
    input: {
      width: "95%",
      padding: "14px",
      borderRadius: "12px",
      background: "#020617",
      border: "1px solid #374151",
      color: "#fff",
      outline: "none",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      background: "#4f46e5",
      color: "#fff",
      border: "none",
      fontWeight: 600,
      cursor: "pointer",
      marginTop: "12px",
      transition: "0.2s",
    },
    resultBox: {
      marginTop: "20px",
    },
    label: {
      color: "#9ca3af",
      fontSize: "12px",
      marginBottom: "6px",
    },
    resultRow: {
      display: "flex",
      gap: "8px",
    },
    resultInput: {
      flex: 1,
      padding: "12px",
      borderRadius: "12px",
      background: "#020617",
      border: "1px solid #374151",
      color: "#818cf8",
    },
    copyBtn: {
      padding: "12px 16px",
      borderRadius: "12px",
      background: "#16a34a",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
    },
  };

  const generateUrl = async () => {
    if (!originalUrl) {
      alert("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      const serverUrl = "http://localhost:5000";
      const resp = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: originalUrl,
        }),
      });

      const data = await resp.json();
      console.log(data);
      // adjust key name if your backend uses something else
      setShortUrl(serverUrl+"/"+data.url);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔗 Tiny URL</h1>
        <p style={styles.subtitle}>Shorten your long links instantly</p>

        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          style={styles.input}
        />

        <button
          onClick={generateUrl}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Generating..." : "Generate Short URL"}
        </button>

        {shortUrl && (
          <div style={styles.resultBox}>
            <div style={styles.label}>Your short link</div>
            <div style={styles.resultRow}>
              <input readOnly value={shortUrl} style={styles.resultInput} />
              <button onClick={copyUrl} style={styles.copyBtn}>
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
