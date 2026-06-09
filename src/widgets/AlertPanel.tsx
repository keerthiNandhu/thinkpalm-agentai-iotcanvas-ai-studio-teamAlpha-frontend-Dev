const ALERTS = [
  {
    level: "critical",
    title: "Sensor Offline",
    message: "Sensor #3 offline — no heartbeat for 5 min",
    time: "2m ago",
  },
  {
    level: "warning",
    title: "High Temperature",
    message: "Temperature exceeded 80°C on Node B",
    time: "11m ago",
  },
];

const levelConfig: Record<
  string,
  { bar: string; badge: string; title: string; icon: string }
> = {
  critical: {
    bar: "bg-red-500",
    badge: "bg-red-500/10 border-red-500/30 text-red-400",
    title: "text-red-300",
    icon: "✕",
  },
  warning: {
    bar: "bg-yellow-500",
    badge: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    title: "text-yellow-300",
    icon: "⚠",
  },
};

export default function AlertPanel() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Active Alerts
        </p>
        <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">
          {ALERTS.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {ALERTS.map((alert, i) => {
          const cfg = levelConfig[alert.level];
          return (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 overflow-hidden relative"
            >
              {/* left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bar} rounded-l-lg`} />
              <div className="pl-1 flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-xs font-bold ${cfg.title}`}>
                    {cfg.icon} {alert.title}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${cfg.badge}`}>
                    {alert.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">{alert.message}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
