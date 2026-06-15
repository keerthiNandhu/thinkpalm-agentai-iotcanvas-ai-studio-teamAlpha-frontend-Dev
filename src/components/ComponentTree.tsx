"use client";

import { useState } from "react";
import { DashboardPlan } from "../types/dashboard";

interface ComponentTreeProps {
  plan: DashboardPlan | null;
  selectedWidget: string | null;
  onSelectWidget: (name: string) => void;
  onUpdatePlan?: (newPlan: DashboardPlan) => void;
}

const AVAILABLE_WIDGETS = [
  "DeviceCard",
  "TemperatureChart",
  "BatteryGauge",
  "AlertPanel",
];

export default function ComponentTree({
  plan,
  selectedWidget,
  onSelectWidget,
  onUpdatePlan,
}: ComponentTreeProps) {
  const [activeSectionAddMenu, setActiveSectionAddMenu] = useState<string | null>(null);

  const handleAddWidget = (sectionName: string, widgetName: string) => {
    if (!plan || !onUpdatePlan) return;
    const newSections = plan.sections.map((sec) => {
      if (sec.name === sectionName) {
        return {
          ...sec,
          widgets: [...sec.widgets, widgetName],
        };
      }
      return sec;
    });
    onUpdatePlan({ ...plan, sections: newSections });
    setActiveSectionAddMenu(null);
  };

  const handleDeleteWidget = (e: React.MouseEvent, sectionName: string, widgetIdx: number) => {
    e.stopPropagation();
    if (!plan || !onUpdatePlan) return;
    const newSections = plan.sections.map((sec) => {
      if (sec.name === sectionName) {
        const filtered = sec.widgets.filter((_, idx) => idx !== widgetIdx);
        return {
          ...sec,
          widgets: filtered,
        };
      }
      return sec;
    });
    onUpdatePlan({ ...plan, sections: newSections });
  };

  const handleMoveWidget = (
    e: React.MouseEvent,
    sectionName: string,
    widgetIdx: number,
    direction: "up" | "down"
  ) => {
    e.stopPropagation();
    if (!plan || !onUpdatePlan) return;

    const secIdx = plan.sections.findIndex((s) => s.name === sectionName);
    if (secIdx === -1) return;

    const sections = JSON.parse(JSON.stringify(plan.sections)) as typeof plan.sections;
    const currentSection = sections[secIdx];
    const widget = currentSection.widgets[widgetIdx];

    if (direction === "up") {
      if (widgetIdx > 0) {
        // Swap within current section
        currentSection.widgets[widgetIdx] = currentSection.widgets[widgetIdx - 1];
        currentSection.widgets[widgetIdx - 1] = widget;
      } else if (secIdx > 0) {
        // Move to the end of the previous section
        currentSection.widgets.splice(widgetIdx, 1);
        sections[secIdx - 1].widgets.push(widget);
      }
    } else {
      if (widgetIdx < currentSection.widgets.length - 1) {
        // Swap within current section
        currentSection.widgets[widgetIdx] = currentSection.widgets[widgetIdx + 1];
        currentSection.widgets[widgetIdx + 1] = widget;
      } else if (secIdx < sections.length - 1) {
        // Move to the beginning of the next section
        currentSection.widgets.splice(widgetIdx, 1);
        sections[secIdx + 1].widgets.unshift(widget);
      }
    }

    onUpdatePlan({ ...plan, sections });
  };

  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full transition-all duration-300">
      <h2 className="text-2xl font-bold text-white">Component Tree</h2>

      {!plan || plan.sections.length === 0 ? (
        <p className="text-sm italic text-slate-500 mt-2">No plan generated yet.</p>
      ) : (
        <div className="rounded-lg bg-black border border-slate-700 p-4 flex-1">
          <ul className="font-mono text-sm leading-relaxed">
            {/* Root */}
            <li className="mb-1.5 font-bold text-cyan-400">Dashboard</li>

            {/* Header row */}
            <li className="ml-4 mb-1.5 text-slate-500">├─ Header</li>

            {plan.sections.map((section, si) => {
              const isLast = si === plan.sections.length - 1;
              const connector = isLast ? "└─" : "├─";
              return (
                <li key={section.name} className="ml-4 mb-2">
                  <div className="flex items-center gap-2 group/sec py-0.5">
                    <span className="text-slate-400">
                      {connector} {section.name}
                    </span>
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setActiveSectionAddMenu(
                            activeSectionAddMenu === section.name ? null : section.name
                          )
                        }
                        className="opacity-0 group-hover/sec:opacity-100 transition-opacity px-1.5 py-0.5 bg-slate-850 hover:bg-slate-800 text-cyan-400 text-[10px] font-sans rounded border border-slate-700"
                        title="Add widget"
                      >
                        + Add
                      </button>

                      {activeSectionAddMenu === section.name && (
                        <div className="absolute left-0 top-6 z-15 bg-slate-900 border border-slate-700 rounded shadow-xl py-1 w-36 text-[10px] font-sans">
                          {AVAILABLE_WIDGETS.map((w) => (
                            <button
                              key={w}
                              onClick={() => handleAddWidget(section.name, w)}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 text-slate-300 hover:text-white"
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="ml-6 flex flex-col gap-0.5 mt-0.5">
                    {section.widgets.map((widget, wi) => {
                      const wLast = wi === section.widgets.length - 1;
                      const isSelected = selectedWidget === widget;
                      return (
                        <li
                          key={`${widget}-${wi}`}
                          onClick={() => onSelectWidget(widget)}
                          className={`group/widget flex items-center justify-between cursor-pointer rounded px-2 py-0.5 transition-all duration-200 ${
                            isSelected
                              ? "bg-cyan-950/60 text-cyan-300 border border-cyan-800/40"
                              : "text-slate-500 hover:text-cyan-400 hover:bg-slate-950/40"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-slate-700">{wLast ? "└─" : "├─"}</span>{" "}
                            <span
                              className={`truncate ${
                                isSelected ? "font-semibold text-cyan-300" : "font-medium text-cyan-400"
                              }`}
                            >
                              {widget}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover/widget:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handleMoveWidget(e, section.name, wi, "up")}
                              className="p-0.5 hover:text-cyan-300 text-slate-600 text-[10px] transition-colors"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              onClick={(e) => handleMoveWidget(e, section.name, wi, "down")}
                              className="p-0.5 hover:text-cyan-300 text-slate-600 text-[10px] transition-colors"
                              title="Move Down"
                            >
                              ▼
                            </button>
                            <button
                              onClick={(e) => handleDeleteWidget(e, section.name, wi)}
                              className="p-0.5 hover:text-red-400 text-slate-600 text-xs font-bold ml-1 transition-colors"
                              title="Delete"
                            >
                              ✕
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}

            {/* Tailwind layout hint */}
            <li className="mt-3 ml-4 text-xs text-slate-600 italic">
              layout: <span className="text-cyan-600">{plan.tailwind}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
