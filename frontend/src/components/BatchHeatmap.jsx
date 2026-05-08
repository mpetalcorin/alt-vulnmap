function getColor(value) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  if (v >= 80) return "bg-red-500/80 text-white";
  if (v >= 60) return "bg-orange-400/80 text-slate-950";
  if (v >= 40) return "bg-yellow-300/80 text-slate-950";
  if (v >= 20) return "bg-cyan-400/50 text-white";
  return "bg-slate-800 text-slate-300";
}

export default function BatchHeatmap({ results }) {
  if (!results?.length) return null;

  const vulnerabilityNames = results[0].vulnerabilities.map((v) => v.target);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Batch vulnerability heatmap</h2>
      <p className="mt-1 text-sm text-slate-400">
        Samples are rows. Vulnerability axes are columns. Higher values suggest stronger predicted dependency.
      </p>

      <div className="mt-4 overflow-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[1200px] text-left text-xs">
          <thead className="sticky top-0 bg-slate-950 text-slate-300">
            <tr>
              <th className="p-3">Sample</th>
              <th className="p-3">ALT</th>
              <th className="p-3">Stress</th>
              {vulnerabilityNames.map((name) => (
                <th key={name} className="p-3">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.sample_id} className="border-t border-white/10">
                <td className="p-3 font-semibold text-cyan-200">{r.sample_id}</td>
                <td className={`p-3 font-semibold ${getColor(r.alt_likelihood.score)}`}>
                  {r.alt_likelihood.score}
                </td>
                <td className={`p-3 font-semibold ${getColor(r.replication_stress.score)}`}>
                  {r.replication_stress.score}
                </td>
                {r.vulnerabilities.map((v) => (
                  <td key={v.target} className={`p-3 font-semibold ${getColor(v.score)}`}>
                    {v.score}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
