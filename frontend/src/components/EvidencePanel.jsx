const evidence = [
  {
    axis: "SLX4IP-FANCM-BLM",
    summary:
      "SLX4IP and FANCM act as parallel safeguards that restrain harmful BLM-driven replication stress at ALT telomeres. Combined SLX4IP and FANCM loss can create BLM-dependent synthetic lethality.",
    biomarkers:
      "Low SLX4IP, high BLM, high telomeric pRPA, high pCHK1, APB accumulation, C-circles, telomere fragility.",
    validation:
      "FANCM knockdown, BLM rescue, clonogenic survival, telomeric pRPA/pCHK1, APB quantification, telomere FISH.",
  },
  {
    axis: "ATR-CHK1 checkpoint",
    summary:
      "ALT telomeres carry chronic replication stress and may become dependent on ATR checkpoint signalling to avoid collapse.",
    biomarkers:
      "High pRPA, high pCHK1, high γH2AX, ssDNA gaps, ADPr, telomere fragility.",
    validation:
      "ATR inhibitor dose-response, pCHK1 suppression, DNA damage staining, cell-cycle profiling, clonogenic survival.",
  },
  {
    axis: "RAD52-POLD3 BIR",
    summary:
      "ALT telomere extension can use recombination-coupled DNA synthesis, including RAD52-supported and POLD3-associated break-induced replication.",
    biomarkers:
      "High RAD52, high POLD3, APBs, telomeric EdU, C-circles, telomere length heterogeneity.",
    validation:
      "RAD52 knockdown, POLD3 knockdown, G2 telomeric EdU, C-circle assay, APB quantification.",
  },
  {
    axis: "SMARCAL1-FANCM fork remodelling",
    summary:
      "Fork-remodelling proteins help ALT cells manage difficult-to-replicate telomeric DNA. Combined impairment may overload fork repair systems.",
    biomarkers:
      "ALT-positive state, ATRX loss, high fork-stress markers, high SMARCAL1 or FANCM dependency.",
    validation:
      "SMARCAL1 knockdown, FANCM co-depletion, replication fork restart assay, telomere fragility analysis.",
  },
  {
    axis: "EXD2-DNA2-BLM-POLD3",
    summary:
      "ALT cells may rely on coordinated nuclease, helicase, and DNA synthesis factors to process telomeric replication and recombination intermediates.",
    biomarkers:
      "High EXD2, high DNA2, high BLM, high POLD3, C-circle positivity, high telomeric stress.",
    validation:
      "Pairwise knockdown matrix, C-circle assay, clonogenic survival, DNA fibre analysis.",
  },
  {
    axis: "WEE1-G2/M checkpoint",
    summary:
      "Replication-stressed ALT cells may require WEE1 to delay mitosis until damaged or under-replicated DNA is repaired.",
    biomarkers:
      "High γH2AX, high pRPA, high pCHK1, high WEE1, high telomere fragility.",
    validation:
      "WEE1 inhibitor dose-response, phospho-histone H3, γH2AX, cell-cycle analysis, mitotic catastrophe markers.",
  },
];

export default function EvidencePanel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Evidence logic panel</h2>
      <p className="mt-1 text-sm text-slate-400">
        Biological interpretation of major ALT synthetic-lethality axes used by the app.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {evidence.map((item) => (
          <div key={item.axis} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <h3 className="font-semibold text-cyan-200">{item.axis}</h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {item.summary}
            </p>

            <div className="mt-4 rounded-xl bg-white/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-200">
                Biomarkers
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {item.biomarkers}
              </p>
            </div>

            <div className="mt-3 rounded-xl bg-white/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                Validation
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {item.validation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
