"use client";

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
  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Agent Execution Timeline</h2>
        {ran && (
          <span className="text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full">
            ✓ Execution Completed
          </span>
        )}
      </div>

      <ol className="flex flex-col gap-2 mt-1">
        {STEPS.map((step, i) => {
          const done = ran;
          // Simulate progressive completion: all steps done when ran=true
          return (
            <li key={step.key} className="flex items-center gap-3">
              {/* Dot */}
              <div className="relative flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {done ? (
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow shadow-emerald-500/40" />
                ) : (
                  <span className="w-3 h-3 rounded-full bg-slate-700" />
                )}
                {/* Connecting line */}
                {i < STEPS.length - 1 && (
                  <span className={`absolute top-4 left-1/2 -translate-x-1/2 w-px h-4 ${done ? "bg-emerald-800" : "bg-slate-700"}`} />
                )}
              </div>

              {/* Label */}
              <span className={`text-sm transition-all duration-300 ${done ? "text-white font-medium" : "text-slate-600"}`}>
                {done ? "✓ " : ""}{step.label}
              </span>
            </li>
          );
        })}
      </ol>

      {!ran && (
        <p className="text-xs italic text-slate-600 mt-2">
          Run Analyze to execute the pipeline.
        </p>
      )}
    </div>
  );
}
