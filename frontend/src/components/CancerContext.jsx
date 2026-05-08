const contexts = [
  {
    cancer: "Osteosarcoma",
    altContext: "Classic ALT model context, including U2OS and SAOS-2-like systems.",
    usefulMarkers: "C-circles, APBs, ATRX status, telomere length heterogeneity, pRPA, pCHK1.",
    colour: "from-cyan-400/30 to-blue-950",
  },
  {
    cancer: "Glioma",
    altContext: "ALT can be associated with ATRX loss and chromatin-remodelling defects.",
    usefulMarkers: "ATRX, DAXX, H3.3/H3F3A, telomere FISH, replication-stress markers.",
    colour: "from-purple-400/30 to-fuchsia-950",
  },
  {
    cancer: "Pancreatic neuroendocrine tumour",
    altContext: "ALT can appear in tumours with ATRX/DAXX pathway disruption.",
    usefulMarkers: "ATRX, DAXX, C-circles, APBs, telomere length heterogeneity.",
    colour: "from-emerald-400/30 to-teal-950",
  },
  {
    cancer: "Soft tissue sarcoma",
    altContext: "ALT is often considered in sarcomas with abnormal telomere maintenance.",
    usefulMarkers: "C-circles, telomere FISH, APBs, ATRX/DAXX status.",
    colour: "from-amber-400/30 to-orange-950",
  },
];

export default function CancerContext() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Cancer-type ALT context</h2>
      <p className="mt-1 text-sm text-slate-400">
        Tumour contexts where ALT biology and telomere vulnerability analysis can be especially relevant.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contexts.map((item) => (
          <div
            key={item.cancer}
            className={`rounded-3xl border border-white/10 bg-gradient-to-br ${item.colour} p-5 shadow-xl`}
          >
            <h3 className="font-semibold text-white">{item.cancer}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">{item.altContext}</p>

            <div className="mt-4 rounded-xl bg-white/10 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">
                Useful markers
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-200">{item.usefulMarkers}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
