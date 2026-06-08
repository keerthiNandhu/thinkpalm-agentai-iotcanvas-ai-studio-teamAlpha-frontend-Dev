"use client";

import { useState, useEffect } from "react";
import PRDInput from "../components/PRDInput";
import DashboardSummary from "../components/DashboardSummary";
import MemoryHistory from "../components/MemoryHistory";
import ComponentTree from "../components/ComponentTree";
import { RequirementAnalysisAgent } from "../agents/RequirementAnalysisAgent";
import { DashboardPlanningAgent } from "../agents/DashboardPlanningAgent";
import { MemoryService, MemorySession } from "../memory/MemoryService";
import { recommendWidgets } from "../tools/WidgetRecommendationTool";
import { generateLayout } from "../tools/TailwindLayoutTool";
import { DashboardAnalysis, DashboardPlan } from "../types/dashboard";

const requirementAgent = new RequirementAnalysisAgent();
const planningAgent = new DashboardPlanningAgent();
const memory = new MemoryService();

export default function Home() {
  const [analysis, setAnalysis] = useState<DashboardAnalysis | null>(null);
  const [plan, setPlan] = useState<DashboardPlan | null>(null);
  const [history, setHistory] = useState<MemorySession[]>([]);

  // Load persisted history on first render (client only)
  useEffect(() => {
    setHistory(memory.getHistory());
  }, []);

  const handleAnalyze = (prd: string) => {
    // 1. Requirement analysis
    const result = requirementAgent.analyze(prd);

    // 2. Widget recommendation
    const widgetNames = result.widgets.map((w) => w.name);
    recommendWidgets(widgetNames);

    // 3. Dashboard planning
    const dashboardPlan = planningAgent.planDashboard(widgetNames);

    // 4. Tailwind layout (merged into plan, also available standalone)
    const tailwindClass = generateLayout(widgetNames.length);
    dashboardPlan.tailwind = tailwindClass;

    // 5. Persist to memory
    memory.saveSession(prd, result);

    // 6. Update state
    setAnalysis(result);
    setPlan(dashboardPlan);
    setHistory(memory.getHistory());
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      {/* Top: Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          IoTCanvas AI Studio
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Describe your IoT requirements and let AI plan your dashboard.
        </p>
      </div>

      {/* Middle: PRD left / Summary right */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <PRDInput onAnalyze={handleAnalyze} />
        </div>
        <div>
          <DashboardSummary analysis={analysis} />
        </div>
      </div>

      {/* Bottom: Memory left / Component Tree right */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <MemoryHistory sessions={history} />
        </div>
        <div>
          <ComponentTree plan={plan} />
        </div>
      </div>
    </main>
  );
}
