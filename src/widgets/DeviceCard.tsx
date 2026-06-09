export default function DeviceCard() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
        Device Status
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-white">IoT Gateway</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Online
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
        <span>Device Health</span>
        <span className="text-white font-bold">85%</span>
      </div>
      <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Uptime</p>
          <p className="text-sm font-semibold text-white">14d 6h</p>
        </div>
        <div className="bg-slate-900 rounded-lg px-3 py-2">
          <p className="text-xs text-slate-500">Signal</p>
          <p className="text-sm font-semibold text-cyan-400">Strong</p>
        </div>
      </div>
    </div>
  );
}
