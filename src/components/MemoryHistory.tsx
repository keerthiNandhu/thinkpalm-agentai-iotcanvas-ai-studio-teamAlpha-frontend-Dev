"use client";

import { MemorySession } from "../memory/MemoryService";

const VISIBLE_LIMIT = 5;

interface MemoryHistoryProps {
  /** The latest VISIBLE_LIMIT sessions to display */
  sessions: MemorySession[];
  /** Total sessions in storage (queue), including non-visible ones */
  totalStored: number;
  onSelectSession: (prd: string) => void;
  onDeleteSession: (id: string) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MemoryHistory({
  sessions,
  totalStored,
  onSelectSession,
  onDeleteSession,
}: MemoryHistoryProps) {
  const queued = totalStored - sessions.length; // sessions waiting behind the visible window

  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recent Sessions</h2>
        <div className="flex items-center gap-2">
          {sessions.length > 0 && (
            <span className="text-xs text-slate-500">
              showing {sessions.length} of {totalStored}
            </span>
          )}
        </div>
      </div>

      {sessions.length === 0 ? (
        <p className="text-sm italic text-slate-500 mt-2">No history yet.</p>
      ) : (
        <>
          <ul className="flex flex-col gap-2">
            {sessions.map((s) => (
              <li
                key={s.id}
                onClick={() => {
                  onSelectSession(s.prd);
                  const element = document.getElementById("prd-section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="flex items-center rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 gap-3 cursor-pointer hover:border-cyan-500 hover:bg-slate-800/80 transition-all group"
              >
                {/* Left: PRD snippet + meta */}
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {s.prd.length > 80 ? s.prd.slice(0, 80) + "…" : s.prd}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{s.dashboardType}</span>
                    {s.runCount > 1 && (
                      <span className="text-xs text-amber-400 font-medium">
                        · ran {s.runCount}×
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: widget count + timestamp */}
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 px-2 py-0.5 text-xs font-semibold">
                    {s.widgetCount} widget{s.widgetCount !== 1 ? "s" : ""}
                  </span>
                  <span className="text-xs text-slate-500 text-right">
                    {formatDate(s.updatedAt ?? s.createdAt)}
                  </span>
                </div>

                {/* Delete button — fades in on row hover */}
                <button
                  title="Delete session"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(s.id);
                  }}
                  className="ml-1 shrink-0 p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-500"
                  aria-label="Delete session"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Queue indicator — only shown when there are sessions waiting behind the window */}
          {queued > 0 && (
            <p className="text-xs text-slate-500 text-center pt-1">
              <span className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {queued} more in queue — delete an entry above to reveal the next
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
}
