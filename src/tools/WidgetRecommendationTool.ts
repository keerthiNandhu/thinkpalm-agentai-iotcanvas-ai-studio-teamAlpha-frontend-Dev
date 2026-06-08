export type WidgetPriority = "high" | "medium";

export interface WidgetRecommendation {
  widget: string;
  priority: WidgetPriority;
}

const PRIORITY_MAP: Record<string, WidgetPriority> = {
  TemperatureChart: "high",
  BatteryGauge: "medium",
  AlertPanel: "high",
  DeviceCard: "medium",
};

export function recommendWidgets(widgets: string[]): WidgetRecommendation[] {
  return widgets.map((widget) => ({
    widget,
    priority: PRIORITY_MAP[widget] ?? "medium",
  }));
}
