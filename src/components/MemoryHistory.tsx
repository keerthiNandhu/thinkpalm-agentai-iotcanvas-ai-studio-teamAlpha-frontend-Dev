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
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Recent Sessions
      </h2>

      {sessions.length === 0 ? (
        <p className="text-sm italic text-slate-400">No history yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {sessions.map((s) => (
            <li
              key={s.id}
              className="flex items-start justify-between rounded-md border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <p className="truncate text-sm font-medium text-slate-700">
                  {s.prd.length > 80 ? s.prd.slice(0, 80) + "…" : s.prd}
                </p>
                <span className="text-xs text-slate-500">
                  {s.dashboardType}
                </span>
              </div>
              <div className="ml-4 flex flex-col items-end shrink-0 gap-1">
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  {s.widgetCount} widget{s.widgetCount !== 1 ? "s" : ""}
                </span>
                <span className="text-xs text-slate-400">
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
