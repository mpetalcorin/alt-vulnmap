import { Sparkles } from "lucide-react";

export default function BrandBar() {
  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-slate-950/95 px-5 py-4 shadow-2xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30">
            <Sparkles className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              aAidea
            </h1>
            <p className="text-sm text-slate-400">
              AI, molecular biology, and precision oncology software
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100">
          ALT-VulnMap, Synthetic Lethality Explorer
        </div>
      </div>
    </div>
  );
}
