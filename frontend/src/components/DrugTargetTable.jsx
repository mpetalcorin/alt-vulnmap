const targets = [
  {
    target: "ATR",
    feasibility: "High",
    altRelevance: "High",
    risk: "Medium",
    priority: "Very high",
    notes: "Checkpoint dependency target in replication-stressed ALT cells.",
  },
  {
    target: "WEE1",
    feasibility: "High",
    altRelevance: "Medium-high",
    risk: "Medium",
    priority: "High",
    notes: "May exploit G2/M checkpoint dependency in damaged ALT cells.",
  },
  {
    target: "FANCM",
    feasibility: "Emerging",
    altRelevance: "Very high",
    risk: "Medium-high",
    priority: "High",
    notes: "Strong ALT dependency, especially in SLX4IP-deficient contexts.",
  },
  {
    target: "RAD52",
    feasibility: "Emerging",
    altRelevance: "High",
    risk: "Medium",
    priority: "High",
    notes: "ALT recombination and BIR-associated dependency.",
  },
  {
    target: "SMARCAL1",
    feasibility: "Low-emerging",
    altRelevance: "High",
    risk: "Unknown",
    priority: "Medium",
    notes: "Fork-remodelling vulnerability in some ALT contexts.",
  },
  {
    target: "BLM",
    feasibility: "Emerging",
    altRelevance: "High but complex",
    risk: "High",
    priority: "Context-dependent",
    notes: "BLM can support ALT but can also drive toxicity when unrestrained.",
  },
  {
    target: "POLD3",
    feasibility: "Low",
    altRelevance: "High",
    risk: "High",
    priority: "Research target",
    notes: "Central to BIR-like ALT telomere synthesis.",
  },
  {
    target: "EXD2",
    feasibility: "Low-emerging",
    altRelevance: "Medium-high",
    risk: "Unknown",
    priority: "Research target",
    notes: "Potential telomere-processing dependency.",
  },
];

function badge(value) {
  const text = String(value).toLowerCase();

  if (text.includes("very high") || text === "high") {
    return "bg-emerald-400/20 text-emerald-100";
  }

  if (text.includes("medium")) {
    return "bg-cyan-400/20 text-cyan-100";
  }

  if (text.includes("low")) {
    return "bg-slate-700 text-slate-200";
  }

  if (text.includes("unknown") || text.includes("complex")) {
    return "bg-amber-400/20 text-amber-100";
  }

  return "bg-purple-400/20 text-purple-100";
}

export default function DrugTargetTable() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Drug and target prioritisation</h2>
      <p className="mt-1 text-sm text-slate-400">
        This table separates biological importance from practical target feasibility.
      </p>

      <div className="mt-4 overflow-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-950 text-slate-300">
            <tr>
              <th className="p-3">Target</th>
              <th className="p-3">Drug feasibility</th>
              <th className="p-3">ALT relevance</th>
              <th className="p-3">Risk</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>

          <tbody>
            {targets.map((t) => (
              <tr key={t.target} className="border-t border-white/10">
                <td className="p-3 font-semibold text-cyan-200">{t.target}</td>

                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${badge(t.feasibility)}`}>
                    {t.feasibility}
                  </span>
                </td>

                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${badge(t.altRelevance)}`}>
                    {t.altRelevance}
                  </span>
                </td>

                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${badge(t.risk)}`}>
                    {t.risk}
                  </span>
                </td>

                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${badge(t.priority)}`}>
                    {t.priority}
                  </span>
                </td>

                <td className="p-3 text-slate-300">{t.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
