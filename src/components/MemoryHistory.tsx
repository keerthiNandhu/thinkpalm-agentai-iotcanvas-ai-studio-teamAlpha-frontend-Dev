"use client";

import { MemorySession } from "../memory/MemoryService";

interface MemoryHistoryProps {
  sessions: MemorySession[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MemoryHistory({ sessions }: MemoryHistoryProps) {
  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-white">Recent Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-sm italic text-slate-500 mt-2">No history yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sessions.map((s) => (
            <li
              key={s.id}
              className="flex items-start justify-between rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 gap-3"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {s.prd.length > 80 ? s.prd.slice(0, 80) + "…" : s.prd}
                </p>
                <span className="text-xs text-slate-400">{s.dashboardType}</span>
              </div>
              <div className="ml-2 flex flex-col items-end shrink-0 gap-1">
                <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 px-2 py-0.5 text-xs font-semibold">
                  {s.widgetCount} widget{s.widgetCount !== 1 ? "s" : ""}
                </span>
                <span className="text-xs text-slate-500 text-right">
                  {formatDate(s.createdAt)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
