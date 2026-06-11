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
      await navigator.clipboard.writeText(generatedCode || PLACEHOLDER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleExport = () => {
    exportTool();
    const code = generatedCode || PLACEHOLDER;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-dashboard.tsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const codeToShow = generatedCode || PLACEHOLDER;

  return (
    <div className="bg-black border border-slate-800 rounded-xl p-6 font-mono text-cyan-300 shadow-xl flex flex-col gap-4">
      {/* Header bar of Terminal */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-slate-400">generated-dashboard.tsx</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold border border-slate-800 bg-slate-900 text-slate-300 hover:border-cyan-500 hover:text-cyan-300 transition"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow shadow-cyan-500/30 transition"
          >
            Export
          </button>
        </div>
      </div>

      <pre className="overflow-auto max-h-[350px] leading-relaxed text-sm whitespace-pre">
        <code>{codeToShow}</code>
      </pre>
    </div>
  );
}

const PLACEHOLDER = `// Run Analyze to generate your dashboard code

<div className="grid gap-6 grid-cols-3">

<section id="top">
  <DeviceCard />
</section>

<section id="main">
  <TemperatureChart />
  <BatteryGauge />
</section>

<section id="alerts">
  <AlertPanel />
</section>

</div>`;
