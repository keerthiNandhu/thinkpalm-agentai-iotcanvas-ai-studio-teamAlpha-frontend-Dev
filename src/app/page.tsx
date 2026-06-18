"use client";

import { useState, useEffect } from "react";
import PRDInput from "../components/PRDInput";
import DashboardSummary from "../components/DashboardSummary";
import MemoryHistory from "../components/MemoryHistory";
import ComponentTree from "../components/ComponentTree";
import LivePreview from "../components/LivePreview";
import AgentTimeline from "../components/AgentTimeline";
import CodePreview from "../components/CodePreview";
import { RequirementAnalysisAgent } from "../agents/RequirementAnalysisAgent";
import { DashboardPlanningAgent } from "../agents/DashboardPlanningAgent";
import { MemoryService, MemorySession } from "../memory/MemoryService";
import { recommendWidgets } from "../tools/WidgetRecommendationTool";
import { generateLayout } from "../tools/TailwindLayoutTool";
import { DashboardAnalysis, DashboardPlan } from "../types/dashboard";

const requirementAgent = new RequirementAnalysisAgent();
const planningAgent = new DashboardPlanningAgent();
const memory = new MemoryService();

/** Build a TSX code string from the plan sections in requested readable TSX preview format */
function buildGeneratedCode(plan: DashboardPlan): string {
  const sections = plan.sections
    .map((s) => {
      const widgets = s.widgets.map((w) => `<${w}/>`).join("\n\n");
      return `<section id="${s.name.toLowerCase()}">\n\n${widgets}\n\n</section>`;
    })
    .join("\n\n");
  return `<div className="${plan.tailwind}">\n\n${sections}\n\n</div>`;
}

export default function Home() {
  const [analysis, setAnalysis] = useState<DashboardAnalysis | null>(null);
  const [plan, setPlan] = useState<DashboardPlan | null>(null);
  const [history, setHistory] = useState<MemorySession[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [pipelineRan, setPipelineRan] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [selectedPRD, setSelectedPRD] = useState<string>("");

  // Load persisted history on first render (client only)
  useEffect(() => {
    setHistory(memory.getHistory());
  }, []);

  const handleAnalyze = (prd: string) => {
    // 1. Run RequirementAnalysisAgent
    const result = requirementAgent.analyze(prd);

    // 2. Extract widget names → Run WidgetRecommendationTool
    const widgetNames = result.widgets.map((w) => w.name);
    recommendWidgets(widgetNames);

    // 3. Run DashboardPlanningAgent
    const dashboardPlan = planningAgent.planDashboard(widgetNames);

    // 4. Generate Tailwind classes via TailwindLayoutTool
    const tailwindClass = generateLayout(widgetNames.length);

    // 5. Attach { sections, tailwind } to plan
    const finalPlan = {
      sections: dashboardPlan.sections,
      tailwind: tailwindClass,
    };

    // 6. setAnalysis → setPlan → save memory
    setAnalysis(result);
    setPlan(finalPlan);
    memory.saveSession(prd, result);
    setHistory(memory.getHistory());

    // generated code + timeline
    setGeneratedCode(buildGeneratedCode(finalPlan));
    setPipelineRan(true);
    setRunKey((prev) => prev + 1); // trigger animation re-run/reset in AgentTimeline
    setSelectedWidget(null);
  };

  const handleSelectSession = (prd: string) => {
    setSelectedPRD("");
    setTimeout(() => {
      setSelectedPRD(prd);
    }, 0);
  };

  const handleDeleteSession = (id: string) => {
    memory.deleteSession(id);
    setHistory(memory.getHistory());
  };

  const handleUpdatePlan = (newPlan: DashboardPlan) => {
    const flatWidgetNames = newPlan.sections.flatMap((s) => s.widgets);
    const tailwindClass = generateLayout(flatWidgetNames.length);
    newPlan.tailwind = tailwindClass;

    const newWidgetsAnalysis = flatWidgetNames.map((name) => {
      const existing = analysis?.widgets.find((w) => w.name === name);
      return {
        name,
        reason: existing?.reason ?? "Manually placed in custom layout",
      };
    });

    const updatedAnalysis = {
      dashboardType: analysis?.dashboardType ?? "IoT Monitoring Dashboard",
      widgets: newWidgetsAnalysis,
    };

    setAnalysis(updatedAnalysis);
    setPlan(newPlan);
    setGeneratedCode(buildGeneratedCode(newPlan));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* ── HEADER ── */}
        <header className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.121m-1.5-2.121c.251.023.501.05.75.082M12 12.75l-4.5 4.5m0 0L5 19m2.5-1.75H5m9.75 0l4.5 4.5M19 17.25h-2.5m0 0l2.5-2.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                IoTCanvas <span className="text-cyan-400">AI Studio</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Describe your IoT requirements and let AI plan your dashboard.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Multi-Agent
            </span>
            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Memory Enabled
            </span>
            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Tool Calling
            </span>
          </div>
        </header>

        {/* ── ROW 1: PRD | SUMMARY ── */}
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
          <PRDInput onAnalyze={handleAnalyze} value={selectedPRD} />
          <DashboardSummary analysis={analysis} />
        </div>

        {/* ── ROW 2: MEMORY | AGENT TIMELINE ── */}
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
          <MemoryHistory
            sessions={history.slice(0, 5)}
            totalStored={history.length}
            onSelectSession={handleSelectSession}
            onDeleteSession={handleDeleteSession}
          />
          <AgentTimeline ran={pipelineRan} key={runKey} />
        </div>

        {/* ── ROW 3: COMPONENT TREE | LIVE PREVIEW ── */}
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
          <ComponentTree
            plan={plan}
            selectedWidget={selectedWidget}
            onSelectWidget={setSelectedWidget}
            onUpdatePlan={handleUpdatePlan}
          />
          <LivePreview
            plan={plan}
            selectedWidget={selectedWidget}
          />
        </div>

        {/* ── ROW 4: CODE PREVIEW (full width) ── */}
        <CodePreview generatedCode={generatedCode} />

      </div>
    </main>
  );
}
