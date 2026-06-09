"use client";

import { useEffect, useState } from "react";

interface AgentTimelineProps {
  ran: boolean;
}

const STEPS = [
  { label: "Requirement Agent", key: "req" },
  { label: "Memory Retrieved", key: "mem" },
  { label: "Widget Recommendation Tool", key: "widget" },
  { label: "Dashboard Planning", key: "plan" },
  { label: "Tailwind Layout Tool", key: "tailwind" },
  { label: "Component Generation", key: "comp" },
  { label: "Preview Tool", key: "preview" },
  { label: "Export Tool", key: "export" },
];

export default function AgentTimeline({ ran }: AgentTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (ran) {
      setFinished(false);
      setActiveStep(0);
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step < STEPS.length) {
          setActiveStep(step);
        } else {
          setActiveStep(99);
          setFinished(true);
          clearInterval(interval);
        }
      }, 150); // 150ms delay between steps -> 1.2 sec total
      return () => clearInterval(interval);
    } else {
      setActiveStep(-1);
      setFinished(false);
    }
  }, [ran]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Agent Execution Timeline</h2>
          {finished && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">
                Pipeline Complete
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Execution: ~1.2 sec
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isCurrent = idx === activeStep;
            
            let dotClass = "bg-slate-700";
            let textClass = "text-slate-500";
            let statusText = "Pending";
            let statusClass = "text-slate-500";

            if (isCompleted) {
              dotClass = "bg-emerald-500 shadow shadow-emerald-500/50";
              textClass = "text-slate-200 font-medium";
              statusText = "Completed";
              statusClass = "text-emerald-400";
            } else if (isCurrent) {
              dotClass = "bg-cyan-400 animate-pulse shadow shadow-cyan-400/50";
              textClass = "text-cyan-300 font-medium";
              statusText = "Running...";
              statusClass = "text-cyan-400 animate-pulse";
            }

            return (
              <div key={step.key} className="flex justify-between items-center py-1.5 border-b border-slate-800/40 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
                  <span className={`text-sm ${textClass}`}>{step.label}</span>
                </div>
                <span className={`text-xs font-mono ${statusClass}`}>{statusText}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {!ran && (
        <div className="mt-4 text-xs italic text-slate-500">
          Ready to run multi-agent orchestration.
        </div>
      )}
    </div>
  );
}
