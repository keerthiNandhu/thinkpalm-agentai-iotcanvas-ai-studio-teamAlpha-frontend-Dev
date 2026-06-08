"use client";

import { DashboardPlan } from "../types/dashboard";

interface ComponentTreeProps {
  plan: DashboardPlan | null;
}

export default function ComponentTree({ plan }: ComponentTreeProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm h-full">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Component Tree
      </h2>

      {!plan || plan.sections.length === 0 ? (
        <p className="text-sm italic text-slate-400">No plan generated yet.</p>
      ) : (
        <ul className="font-mono text-sm leading-relaxed text-slate-700">
          {/* Root */}
          <li className="mb-1 font-semibold text-indigo-700">Dashboard</li>

          {/* Header row always shown */}
          <li className="ml-4 mb-1 text-slate-500">├─ Header</li>

          {plan.sections.map((section, si) => {
            const isLast = si === plan.sections.length - 1;
            const connector = isLast ? "└─" : "├─";
            return (
              <li key={section.name} className="ml-4">
                <span className="text-slate-600">
                  {connector} {section.name}
                </span>
                <ul className="ml-6">
                  {section.widgets.map((widget, wi) => {
                    const wLast = wi === section.widgets.length - 1;
                    return (
                      <li key={widget} className="text-slate-500">
                        {wLast ? "└─" : "├─"}{" "}
                        <span className="text-emerald-700 font-medium">
                          {widget}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}

          {/* Tailwind class hint */}
          <li className="mt-3 ml-4 text-xs text-slate-400 italic">
            Layout: <span className="text-indigo-500">{plan.tailwind}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
