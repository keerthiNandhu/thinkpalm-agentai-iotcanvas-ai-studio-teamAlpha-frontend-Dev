import { DashboardAnalysis, WidgetAnalysis } from "../types/dashboard";

const KEYWORD_MAP: { keyword: string; widget: string; reason: string }[] = [
  {
    keyword: "temperature",
    widget: "TemperatureChart",
    reason: "Temperature monitoring requested",
  },
  {
    keyword: "battery",
    widget: "BatteryGauge",
    reason: "Battery level tracking requested",
  },
  {
    keyword: "alert",
    widget: "AlertPanel",
    reason: "Alert and notification monitoring requested",
  },
  {
    keyword: "device",
    widget: "DeviceCard",
    reason: "Device status overview requested",
  },
];

export class RequirementAnalysisAgent {
  analyze(prd: string): DashboardAnalysis {
    const lower = prd.toLowerCase();
    const widgets: WidgetAnalysis[] = [];

    for (const { keyword, widget, reason } of KEYWORD_MAP) {
      if (lower.includes(keyword)) {
        widgets.push({ name: widget, reason });
      }
    }

    const dashboardType =
      widgets.length > 0 ? "IoT Monitoring Dashboard" : "Generic Dashboard";

    return { dashboardType, widgets };
  }
}
