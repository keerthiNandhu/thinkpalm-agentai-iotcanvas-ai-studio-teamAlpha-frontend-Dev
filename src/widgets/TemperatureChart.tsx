const BARS = [
  { label: "Mon", value: 62, temp: "62°" },
  { label: "Tue", value: 75, temp: "75°" },
  { label: "Wed", value: 58, temp: "58°" },
  { label: "Thu", value: 81, temp: "81°" },
  { label: "Fri", value: 70, temp: "70°" },
  { label: "Sat", value: 66, temp: "66°" },
  { label: "Sun", value: 74, temp: "74°" },
];

export default function TemperatureChart() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Temperature (°C)
        </p>
        <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
          Weekly
        </span>
      </div>

      <div className="flex items-end gap-1.5 h-24">
        {BARS.map((bar) => {
          const heightPct = `${bar.value}%`;
          return (
            <div key={bar.label} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-slate-500 text-[10px]">{bar.temp}</span>
              <div className="w-full flex items-end" style={{ height: "64px" }}>
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-orange-600 to-orange-400"
                  style={{ height: heightPct }}
                />
              </div>
              <span className="text-slate-500 text-[10px]">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
