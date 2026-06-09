"use client";

import { useState } from "react";
import { exportTool } from "../tools/ExportTool";

interface CodePreviewProps {
  generatedCode: string;
}

export default function CodePreview({ generatedCode }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing silently
    }
  };

  const handleExport = () => {
    exportTool();
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard.tsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Generated Code</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-500 hover:text-cyan-300 transition"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow shadow-cyan-500/30 transition"
          >
            Export
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-black border border-slate-700 overflow-auto max-h-64">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800 bg-slate-900/60">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-xs text-slate-500 font-mono">dashboard.tsx</span>
        </div>
        <pre className="font-mono text-sm text-cyan-300 p-4 leading-relaxed whitespace-pre overflow-x-auto">
          <code>{generatedCode || PLACEHOLDER}</code>
        </pre>
      </div>
    </div>
  );
}

const PLACEHOLDER = `// Run Analyze to generate your dashboard code

<section id="top">
  <DeviceCard />
</section>

<section id="main">
  <TemperatureChart />
  <BatteryGauge />
</section>

<section id="alerts">
  <AlertPanel />
</section>`;
