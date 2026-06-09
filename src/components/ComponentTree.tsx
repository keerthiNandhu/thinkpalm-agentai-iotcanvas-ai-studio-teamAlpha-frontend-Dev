"use client";

import { DashboardPlan } from "../types/dashboard";
import { useRef } from "react";

interface ComponentTreeProps {
  plan: DashboardPlan | null;
  selectedWidget: string | null;
  onSelectWidget: (name: string) => void;
}

export default function ComponentTree({
  plan,
  selectedWidget,
  onSelectWidget,
}: ComponentTreeProps) {
  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-white">Component Tree</h2>

      {!plan || plan.sections.length === 0 ? (
        <p className="text-sm italic text-slate-500 mt-2">No plan generated yet.</p>
      ) : (
        <div className="rounded-lg bg-black border border-slate-700 p-4 flex-1">
          <ul className="font-mono text-sm leading-relaxed">
            {/* Root */}
            <li className="mb-1 font-bold text-cyan-400">Dashboard</li>

            {/* Header row */}
            <li className="ml-4 mb-1 text-slate-500">├─ Header</li>

            {plan.sections.map((section, si) => {
              const isLast = si === plan.sections.length - 1;
              const connector = isLast ? "└─" : "├─";
              return (
                <li key={section.name} className="ml-4">
                  <span className="text-slate-400">
                    {connector} {section.name}
                  </span>
                  <ul className="ml-6">
                    {section.widgets.map((widget, wi) => {
                      const wLast = wi === section.widgets.length - 1;
                      const isSelected = selectedWidget === widget;
                      return (
                        <li
                          key={widget}
                          onClick={() => onSelectWidget(widget)}
                          className={`cursor-pointer rounded px-1 py-0.5 transition-all duration-200 ${
                            isSelected
                              ? "bg-cyan-950 text-cyan-300"
                              : "text-slate-500 hover:text-cyan-400"
                          }`}
                        >
                          {wLast ? "└─" : "├─"}{" "}
                          <span className={`font-medium ${isSelected ? "text-cyan-300" : "text-cyan-400"}`}>
                            {widget}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}

            {/* Tailwind layout hint */}
            <li className="mt-3 ml-4 text-xs text-slate-600 italic">
              layout:{" "}
              <span className="text-cyan-600">{plan.tailwind}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
