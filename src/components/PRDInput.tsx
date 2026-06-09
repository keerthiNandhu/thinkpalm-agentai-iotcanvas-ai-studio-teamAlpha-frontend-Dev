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
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Product Requirements</h2>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-md">PRD</span>
      </div>

      <textarea
        className="flex-1 min-h-[200px] resize-none rounded-lg bg-slate-950 border border-slate-700 text-white text-sm placeholder:text-slate-600 p-3 leading-relaxed outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition"
        placeholder="Describe your IoT dashboard requirements here…&#10;&#10;e.g. I need a dashboard to monitor temperature, battery, device status and alerts."
        value={prd}
        onChange={(e) => setPrd(e.target.value)}
        rows={10}
      />

      <button
        className="self-start px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-sm font-bold shadow shadow-cyan-500/30 transition"
        onClick={handleSubmit}
        disabled={!prd.trim()}
      >
        Analyze Requirements
      </button>
    </div>
  );
}
