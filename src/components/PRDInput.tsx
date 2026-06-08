"use client";

import { useState } from "react";

interface PRDInputProps {
  onAnalyze: (prd: string) => void;
}

export default function PRDInput({ onAnalyze }: PRDInputProps) {
  const [prd, setPrd] = useState("");

  const handleSubmit = () => {
    if (prd.trim()) {
      onAnalyze(prd.trim());
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Product Requirements</h2>
      <textarea
        style={styles.textarea}
        placeholder="Describe your IoT dashboard requirements here…"
        value={prd}
        onChange={(e) => setPrd(e.target.value)}
        rows={10}
      />
      <button
        style={styles.button}
        onClick={handleSubmit}
        disabled={!prd.trim()}
      >
        Analyze Requirements
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    height: "100%",
  },
  heading: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#1a202c",
  },
  textarea: {
    resize: "vertical",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #cbd5e0",
    borderRadius: "6px",
    fontFamily: "inherit",
    lineHeight: 1.6,
    color: "#2d3748",
    outline: "none",
  },
  button: {
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 600,
    background: "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "flex-start",
    opacity: 1,
    transition: "opacity 0.2s",
  },
};
