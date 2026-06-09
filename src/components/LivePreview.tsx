import { useEffect, useRef } from "react";
import DeviceCard from "../widgets/DeviceCard";
import TemperatureChart from "../widgets/TemperatureChart";
import BatteryGauge from "../widgets/BatteryGauge";
import AlertPanel from "../widgets/AlertPanel";

interface LivePreviewProps {
  widgets: string[];
  selectedWidget: string | null;
}

type WidgetKey = "DeviceCard" | "TemperatureChart" | "BatteryGauge" | "AlertPanel";

const WIDGET_MAP: Record<WidgetKey, React.ReactNode> = {
  DeviceCard: <DeviceCard />,
  TemperatureChart: <TemperatureChart />,
  BatteryGauge: <BatteryGauge />,
  AlertPanel: <AlertPanel />,
};

export default function LivePreview({ widgets, selectedWidget }: LivePreviewProps) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to selected widget when it changes
  useEffect(() => {
    if (selectedWidget && refs.current[selectedWidget]) {
      refs.current[selectedWidget]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedWidget]);

  return (
    <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold text-white">Live Preview</h2>

      {widgets.length === 0 ? (
        <p className="text-sm italic text-slate-500 mt-2">
          No widgets to preview. Run Analyze first.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-auto max-h-[520px] pr-1">
          {widgets.map((name) => {
            const isSelected = selectedWidget === name;
            return (
              <div
                key={name}
                ref={(el) => { refs.current[name] = el; }}
                className={`rounded-xl transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.01]"
                    : ""
                }`}
              >
                {WIDGET_MAP[name as WidgetKey] ?? (
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-400 text-xs">
                    Unknown widget: {name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
