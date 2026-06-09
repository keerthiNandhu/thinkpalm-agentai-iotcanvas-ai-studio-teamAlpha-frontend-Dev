const LEVEL = 72;

export default function BatteryGauge() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Battery Level
        </p>
        <span className="text-xs font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
          ⚡ Charging
        </span>
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-bold text-white">{LEVEL}%</span>
        <span className="text-slate-500 text-xs mb-1">remaining</span>
      </div>

      <div className="relative h-3 w-full bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300"
          style={{ width: `${LEVEL}%` }}
        />
      </div>

      <div className="flex justify-between mt-1.5 text-[10px] text-slate-600">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Est. Life</p>
          <p className="text-sm font-semibold text-white">~4h 20m</p>
        </div>
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Cells</p>
          <p className="text-sm font-semibold text-white">4 / 4 OK</p>
        </div>
      </div>
    </div>
  );
}
