"use client";

import { useEffect, useRef, useState } from "react";
import DeviceCard from "../widgets/DeviceCard";
import TemperatureChart from "../widgets/TemperatureChart";
import BatteryGauge from "../widgets/BatteryGauge";
import AlertPanel from "../widgets/AlertPanel";
import { DashboardPlan } from "../types/dashboard";

interface LivePreviewProps {
  plan: DashboardPlan | null;
  selectedWidget: string | null;
}

type WidgetKey = "DeviceCard" | "TemperatureChart" | "BatteryGauge" | "AlertPanel";

const WIDGET_MAP: Record<WidgetKey, React.ReactNode> = {
  DeviceCard: <DeviceCard />,
  TemperatureChart: <TemperatureChart />,
  BatteryGauge: <BatteryGauge />,
  AlertPanel: <AlertPanel />,
};

type TabType = "Overview" | "Devices" | "Alerts" | "Settings";

const COL_SPAN_MAP: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

export default function LivePreview({ plan, selectedWidget }: LivePreviewProps) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeTab, setActiveTab] = useState<TabType>("Overview");

  // Settings tab states
  const [refreshInterval, setRefreshInterval] = useState("2s");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Scroll to selected widget inside layout when it changes
  useEffect(() => {
    if (selectedWidget && refs.current[selectedWidget]) {
      // If widget changes, force switch to Overview tab so widget is visible
      setActiveTab("Overview");
      setTimeout(() => {
        refs.current[selectedWidget]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 50);
    }
  }, [selectedWidget]);

  // Tab content renderer
  const renderTabContent = () => {
    if (!plan) return null;

    switch (activeTab) {
      case "Devices":
        return (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h4 className="text-sm font-semibold text-slate-300">Registered Client Nodes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DeviceCard />
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Connected Node Index
                  </h5>
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-300">Node A (Gateway 1)</span>
                      <span className="text-emerald-400 font-semibold">Online</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-300">Node B (Temp Sensor)</span>
                      <span className="text-red-400 font-semibold">Offline</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-slate-300">Node C (Battery Monitor)</span>
                      <span className="text-emerald-400 font-semibold">Online</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 italic mt-4">
                  Showing 3 active telemetry devices.
                </div>
              </div>
            </div>
          </div>
        );

      case "Alerts":
        return (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h4 className="text-sm font-semibold text-slate-300">Real-time Warning System</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AlertPanel />
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 font-mono text-[10px] text-slate-400">
                <span className="text-xs font-bold font-sans text-slate-300 mb-1">Incident Logger</span>
                <div className="bg-black/40 rounded border border-slate-800/80 p-2.5 flex-1 overflow-auto max-h-[160px] flex flex-col gap-2 leading-relaxed">
                  <div className="text-red-400">[14:12:05] Node B temp limit warning raised</div>
                  <div className="text-yellow-400">[14:10:00] Battery cell 3 voltage low threshold</div>
                  <div className="text-slate-500">[14:05:00] IoT gateway telemetry stream connected</div>
                  <div className="text-slate-500">[13:58:12] Agent Planning session handshake OK</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 animate-fade-in text-xs">
            <h4 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-2">
              Telemetry Configurations
            </h4>
            
            <div className="flex justify-between items-center py-1">
              <div>
                <p className="font-semibold text-slate-200">Refresh Frequency</p>
                <p className="text-[10px] text-slate-500">Determine data polling frequency.</p>
              </div>
              <select 
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-300 rounded px-2.5 py-1 outline-none focus:border-cyan-400 transition"
              >
                <option value="1s">1 second</option>
                <option value="2s">2 seconds</option>
                <option value="5s">5 seconds</option>
              </select>
            </div>

            <div className="flex justify-between items-center py-1">
              <div>
                <p className="font-semibold text-slate-200">System Notification Alerts</p>
                <p className="text-[10px] text-slate-500">Enable warnings alerts via SMS webhook logs.</p>
              </div>
              <input 
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded p-3 text-[10px] text-slate-500 mt-2">
              <span className="font-bold text-slate-400 block mb-1">Developer Credentials Token</span>
              <code className="text-cyan-400">client_tkn_thinkpalm_9c28e8a7bc83f0a</code>
            </div>
          </div>
        );

      case "Overview":
      default:
        return (
          <div className={plan.tailwind}>
            {plan.sections.map((section) => (
              <div 
                key={section.name} 
                className={`bg-slate-900/40 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-3 shadow-inner ${
                  COL_SPAN_MAP[section.widgets.length] || "col-span-1"
                }`}
              >
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 border-b border-slate-800/40 pb-1 flex justify-between items-center">
                  <span>{section.name} Panel</span>
                  <span className="text-[8px] text-slate-600 font-mono">w: {section.widgets.length}</span>
                </span>
                <div className="flex flex-col gap-3.5">
                  {section.widgets.map((widgetName) => {
                    const Widget = WIDGET_MAP[widgetName as WidgetKey];
                    const isSelected = selectedWidget === widgetName;
                    return (
                      <div
                        key={widgetName}
                        ref={(el) => {
                          refs.current[widgetName] = el;
                        }}
                        className={`transition-all duration-300 rounded-xl ${
                          isSelected
                            ? "ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.01]"
                            : ""
                        }`}
                      >
                        {Widget ?? (
                          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-400 text-xs">
                            Unknown: {widgetName}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-full min-h-[520px]">
      
      {/* 🌐 Browser Top Frame */}
      <div className="flex items-center justify-between bg-slate-950 px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 max-w-md mx-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-xs py-1 px-3 text-center truncate select-none">
            https://thinkpalm-client.local/dashboard
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <span>⚙</span>
          <span>↻</span>
        </div>
      </div>

      {!plan || plan.sections.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950 text-slate-500 text-sm">
          <p className="italic text-center">No widgets to preview. Run Analyze first.</p>
        </div>
      ) : (
        <div className="flex flex-1 min-h-0 bg-slate-950">
          
          {/* 📂 Active Left Navigation Sidebar */}
          <aside className="w-44 bg-slate-900/60 border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex shrink-0">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                  ThinkPalm IoT
                </span>
              </div>
              
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
                {(["Overview", "Devices", "Alerts", "Settings"] as TabType[]).map((tabName) => {
                  const isActive = activeTab === tabName;
                  const icons: Record<TabType, string> = {
                    Overview: "📊",
                    Devices: "🔌",
                    Alerts: "🔔",
                    Settings: "⚙",
                  };
                  return (
                    <li
                      key={tabName}
                      onClick={() => setActiveTab(tabName)}
                      className={`flex items-center gap-2 cursor-pointer px-2.5 py-2 rounded border transition ${
                        isActive
                          ? "text-cyan-400 font-semibold bg-slate-800/40 border-slate-800/80"
                          : "hover:text-slate-200 border-transparent hover:bg-slate-900/40"
                      }`}
                    >
                      <span>{icons[tabName]}</span> {tabName}
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 flex items-center justify-between text-[9px] text-slate-400">
              <span>Telemetry</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Stream
              </span>
            </div>
          </aside>

          {/* 🖥️ Mock Dashboard Main Area */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[500px] flex flex-col gap-4">
            
            {/* Header Telemetries */}
            <div className="flex justify-between items-start border-b border-slate-800/60 pb-3">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {activeTab === "Overview" ? "Connected Devices Dashboard" : `${activeTab} Interface`}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">ThinkPalm Enterprise Client Portal</p>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded shadow-sm">
                ● LIVE FEED
              </span>
            </div>

            {/* Dynamic Content */}
            {renderTabContent()}

          </div>
        </div>
      )}
    </div>
  );
}
