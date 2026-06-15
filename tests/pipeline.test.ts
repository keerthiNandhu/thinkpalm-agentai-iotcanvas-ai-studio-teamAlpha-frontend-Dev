import { test, describe } from "node:test";
import assert from "node:assert";
import { RequirementAnalysisAgent } from "../src/agents/RequirementAnalysisAgent";
import { DashboardPlanningAgent } from "../src/agents/DashboardPlanningAgent";
import { recommendWidgets } from "../src/tools/WidgetRecommendationTool";
import { generateLayout } from "../src/tools/TailwindLayoutTool";

describe("IoTCanvas Pipeline Integration Tests", () => {
  const requirementAgent = new RequirementAnalysisAgent();
  const planningAgent = new DashboardPlanningAgent();

  test("RequirementAnalysisAgent maps temperature and battery keywords", () => {
    const prd = "I need temperature metrics and battery charge gauges.";
    const analysis = requirementAgent.analyze(prd);

    assert.strictEqual(analysis.dashboardType, "IoT Monitoring Dashboard");
    
    const widgetNames = analysis.widgets.map((w) => w.name);
    assert.ok(widgetNames.includes("TemperatureChart"));
    assert.ok(widgetNames.includes("BatteryGauge"));
    assert.strictEqual(widgetNames.includes("AlertPanel"), false);
  });

  test("RequirementAnalysisAgent handles empty/generic specs", () => {
    const prd = "Create a generic dashboard client view.";
    const analysis = requirementAgent.analyze(prd);

    assert.strictEqual(analysis.dashboardType, "Generic Dashboard");
    assert.strictEqual(analysis.widgets.length, 0);
  });

  test("DashboardPlanningAgent handles 1-2 widgets (Top Section only)", () => {
    const widgets = ["TemperatureChart", "DeviceCard"];
    const plan = planningAgent.planDashboard(widgets);

    assert.strictEqual(plan.sections.length, 1);
    assert.strictEqual(plan.sections[0].name, "Top");
    assert.deepStrictEqual(plan.sections[0].widgets, widgets);
  });

  test("DashboardPlanningAgent handles 3-4 widgets (Top & Main Sections)", () => {
    const widgets = ["TemperatureChart", "DeviceCard", "BatteryGauge"];
    const plan = planningAgent.planDashboard(widgets);

    assert.strictEqual(plan.sections.length, 2);
    assert.strictEqual(plan.sections[0].name, "Top");
    assert.strictEqual(plan.sections[1].name, "Main");
  });

  test("WidgetRecommendationTool assigns correct priority mapping", () => {
    const list = ["TemperatureChart", "BatteryGauge"];
    const recommendations = recommendWidgets(list);

    assert.strictEqual(recommendations.length, 2);
    
    const tempRec = recommendations.find((r) => r.widget === "TemperatureChart");
    const battRec = recommendations.find((r) => r.widget === "BatteryGauge");

    assert.strictEqual(tempRec?.priority, "high");
    assert.strictEqual(battRec?.priority, "medium");
  });

  test("TailwindLayoutTool computes dynamic columns accurately", () => {
    assert.strictEqual(generateLayout(1), "grid gap-6 grid-cols-1");
    assert.strictEqual(generateLayout(3), "grid gap-6 grid-cols-2");
    assert.strictEqual(generateLayout(5), "grid gap-6 grid-cols-3");
    assert.strictEqual(generateLayout(8), "grid gap-6 grid-cols-4");
  });
});
