function Badge({ label, active, activeClass }) {
  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        active ? activeClass : "bg-slate-800 text-slate-400"
      }`}
    >
      {label}
    </span>
  );
}

export default function PhenotypeBadges({ result }) {
  if (!result) return null;

  const altHigh = result.alt_likelihood.score >= 70;
  const stressHigh = result.replication_stress.score >= 70;
  const fanCm = result.vulnerabilities[0]?.target?.includes("FANCM");
  const atr = result.vulnerabilities[0]?.target?.includes("ATR");
  const bir = result.vulnerabilities[0]?.target?.includes("RAD52");

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Sample phenotype badges</h2>
      <p className="mt-1 text-sm text-slate-400">
        Quick visual classification of the analysed sample.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Badge
          label="ALT-high"
          active={altHigh}
          activeClass="bg-cyan-400 text-slate-950"
        />

        <Badge
          label="Replication-stress-high"
          active={stressHigh}
          activeClass="bg-purple-400 text-slate-950"
        />

        <Badge
          label="FANCM-axis candidate"
          active={fanCm}
          activeClass="bg-emerald-400 text-slate-950"
        />

        <Badge
          label="ATR-checkpoint candidate"
          active={atr}
          activeClass="bg-amber-300 text-slate-950"
        />

        <Badge
          label="RAD52/POLD3-BIR candidate"
          active={bir}
          activeClass="bg-rose-400 text-white"
        />
      </div>
    </section>
  );
}
