"use client";

import { useState } from "react";
import { exportTool } from "../tools/ExportTool";

interface CodePreviewProps {
  generatedCode: string;
}

const DEVICE_CARD_CODE = `export default function DeviceCard() {
  return (
    <div className="bg-slate-850 border border-slate-800 rounded-xl shadow-lg p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
        Device Status
      </p>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-white">IoT Gateway</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Online
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
        <span>Device Health</span>
        <span className="text-white font-bold">85%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Uptime</p>
          <p className="text-sm font-semibold text-white">14d 6h</p>
        </div>
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Signal</p>
          <p className="text-sm font-semibold text-cyan-400">Strong</p>
        </div>
      </div>
    </div>
  );
}`;

const TEMPERATURE_CHART_CODE = `const BARS = [
  { label: "Mon", value: 62, temp: "62°" },
  { label: "Tue", value: 75, temp: "75°" },
  { label: "Wed", value: 58, temp: "58°" },
  { label: "Thu", value: 81, temp: "81°" },
  { label: "Fri", value: 70, temp: "70°" },
  { label: "Sat", value: 66, temp: "66°" },
  { label: "Sun", value: 74, temp: "74°" },
];

export default function TemperatureChart() {
  return (
    <div className="bg-slate-850 border border-slate-800 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Temperature (°C)
        </p>
        <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
          Weekly
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-24">
        {BARS.map((bar) => {
          const heightPct = bar.value + '%';
          return (
            <div key={bar.label} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-slate-500 text-[10px]">{bar.temp}</span>
              <div className="w-full flex items-end" style={{ height: "64px" }}>
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-orange-600 to-orange-400"
                  style={{ height: heightPct }}
                />
              </div>
              <span className="text-slate-500 text-[10px]">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}`;

const BATTERY_GAUGE_CODE = `const LEVEL = 72;

export default function BatteryGauge() {
  return (
    <div className="bg-slate-850 border border-slate-800 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Battery Level
        </p>
        <span className="text-xs font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
          ⚡ Charging
        </span>
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-bold text-white">{LEVEL}%</span>
        <span className="text-slate-500 text-xs mb-1">remaining</span>
      </div>
      <div className="relative h-3 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300"
          style={{ width: LEVEL + '%' }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-slate-600">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Est. Life</p>
          <p className="text-sm font-semibold text-white">~4h 20m</p>
        </div>
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Cells</p>
          <p className="text-sm font-semibold text-white">4 / 4 OK</p>
        </div>
      </div>
    </div>
  );
}`;

const ALERT_PANEL_CODE = `const ALERTS = [
  {
    level: "critical",
    title: "Sensor Offline",
    message: "Sensor #3 offline — no heartbeat for 5 min",
    time: "2m ago",
  },
  {
    level: "warning",
    title: "High Temperature",
    message: "Temperature exceeded 80°C on Node B",
    time: "11m ago",
  },
];

const levelConfig = {
  critical: {
    bar: "bg-red-500",
    badge: "bg-red-500/10 border-red-500/30 text-red-400",
    title: "text-red-300",
    icon: "✕",
  },
  warning: {
    bar: "bg-yellow-500",
    badge: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    title: "text-yellow-300",
    icon: "⚠",
  },
};

export default function AlertPanel() {
  return (
    <div className="bg-slate-850 border border-slate-800 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Active Alerts
        </p>
        <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">
          {ALERTS.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {ALERTS.map((alert, i) => {
          const cfg = levelConfig[alert.level];
          return (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 overflow-hidden relative"
            >
              <div className={'absolute left-0 top-0 bottom-0 w-1 ' + cfg.bar + ' rounded-l-lg'} />
              <div className="pl-1 flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={'text-xs font-bold ' + cfg.title}>
                    {cfg.icon} {alert.title}
                  </span>
                  <span className={'text-[10px] font-semibold px-1.5 py-0.5 rounded border ' + cfg.badge}>
                    {alert.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">{alert.message}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`;

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

  const handleOpenInStackBlitz = () => {
    const code = generatedCode || PLACEHOLDER;
    
    // Virtual project structure files map
    const files: Record<string, string> = {
      "package.json": JSON.stringify(
        {
          name: "iotcanvas-generated-dashboard",
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: {
            dev: "vite",
            build: "tsc && vite build",
            preview: "vite preview",
          },
          dependencies: {
            react: "^18.3.1",
            "react-dom": "^18.3.1",
          },
          devDependencies: {
            "@types/react": "^18.3.3",
            "@types/react-dom": "^18.3.0",
            "@vitejs/plugin-react": "^4.3.1",
            autoprefixer: "^10.4.19",
            postcss: "^8.4.38",
            tailwindcss: "^3.4.4",
            typescript: "^5.2.2",
            vite: "^5.3.1",
          },
        },
        null,
        2
      ),
      "vite.config.ts": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
      "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
      "postcss.config.js": `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
      "tsconfig.json": JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            useDefineForClassFields: true,
            lib: ["DOM", "DOM.Iterable", "ScriptHost", "ES2020"],
            module: "ESNext",
            skipLibCheck: true,
            moduleResolution: "bundler",
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: "react-jsx",
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noFallthroughCasesInSwitch: true,
          },
          include: ["src"],
        },
        null,
        2
      ),
      "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IoTCanvas Generated Dashboard</title>
  </head>
  <body class="bg-slate-950">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      "src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;`,
      "src/main.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
      "src/widgets/DeviceCard.tsx": DEVICE_CARD_CODE,
      "src/widgets/TemperatureChart.tsx": TEMPERATURE_CHART_CODE,
      "src/widgets/BatteryGauge.tsx": BATTERY_GAUGE_CODE,
      "src/widgets/AlertPanel.tsx": ALERT_PANEL_CODE,
      "src/App.tsx": `import DeviceCard from "./widgets/DeviceCard";
import TemperatureChart from "./widgets/TemperatureChart";
import BatteryGauge from "./widgets/BatteryGauge";
import AlertPanel from "./widgets/AlertPanel";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-6xl w-full">
        <h1 className="text-xl font-bold mb-6 text-slate-400">IoTCanvas Generated Live Dashboard</h1>
        ${code}
      </div>
    </div>
  );
}`,
    };

    // Construct POST request elements
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://stackblitz.com/run";
    form.target = "_blank";

    const appendInput = (name: string, val: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = val;
      form.appendChild(input);
    };

    appendInput("project[title]", "IoTCanvas AI Studio - Generated Dashboard");
    appendInput(
      "project[description]",
      "Tailwind IoT Dashboard generated interactively by IoTCanvas AI Studio"
    );
    appendInput("project[template]", "node");

    Object.keys(files).forEach((filePath) => {
      appendInput(`project[files][${filePath}]`, files[filePath]);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
            onClick={handleOpenInStackBlitz}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow shadow-indigo-500/20 transition flex items-center gap-1.5"
          >
            ⚡ Open in StackBlitz
          </button>
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
