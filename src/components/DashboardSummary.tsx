"use client";

import { DashboardAnalysis } from "../types/dashboard";

interface DashboardSummaryProps {
  analysis: DashboardAnalysis | null;
}

export default function DashboardSummary({ analysis }: DashboardSummaryProps) {
  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-white">Dashboard Summary</h2>

      {!analysis ? (
        <p className="text-sm italic text-slate-500 mt-2">
          No dashboard generated yet.
        </p>
      ) : (
        <>
          {/* Dashboard type badge */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">Type</span>
            <span className="text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-3 py-0.5 rounded-full">
              {analysis.dashboardType}
            </span>
          </div>

          <hr className="border-slate-800" />

          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Recommended Widgets ({analysis.widgets.length})
          </p>

          {analysis.widgets.length === 0 ? (
            <p className="text-sm italic text-slate-500">
              No widgets matched. Try mentioning temperature, battery, alert, or device.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {analysis.widgets.map((widget, idx) => (
                <li
                  key={idx}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 hover:border-cyan-500 transition"
                >
                  <p className="text-sm font-semibold text-white">{widget.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{widget.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
