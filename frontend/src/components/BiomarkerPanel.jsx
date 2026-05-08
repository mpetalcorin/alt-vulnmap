import { CheckCircle2, AlertTriangle, CircleHelp } from "lucide-react";

const biomarkers = [
  {
    group: "ALT identity",
    items: [
      ["ATRX_status", "ATRX loss"],
      ["DAXX_status", "DAXX loss"],
      ["H3F3A_status", "H3.3/H3F3A alteration"],
      ["C_circle_score", "C-circle positivity"],
      ["APB_score", "ALT-associated PML bodies"],
      ["telomere_length_heterogeneity", "Telomere length heterogeneity"],
    ],
  },
  {
    group: "Replication stress",
    items: [
      ["pRPA_score", "pSer33-RPA"],
      ["pCHK1_score", "pSer345-CHK1"],
      ["gammaH2AX_score", "γH2AX"],
      ["ssDNA_gap_score", "ssDNA gaps"],
      ["ADPr_score", "ADP-ribose"],
      ["telomere_fragility_score", "Telomere fragility"],
    ],
  },
  {
    group: "ALT synthetic-lethality axes",
    items: [
      ["SLX4IP_expression", "SLX4IP expression"],
      ["FANCM_expression", "FANCM expression"],
      ["BLM_expression", "BLM expression"],
      ["RAD52_expression", "RAD52 expression"],
      ["POLD3_expression", "POLD3 expression"],
      ["SMARCAL1_expression", "SMARCAL1 expression"],
      ["EXD2_expression", "EXD2 expression"],
      ["DNA2_expression", "DNA2 expression"],
      ["WEE1_expression", "WEE1 expression"],
      ["BRCA1_status", "BRCA1 status"],
    ],
  },
];

function classify(value, key) {
  if (value === undefined || value === null || value === "") {
    return { label: "Missing", icon: CircleHelp, color: "text-slate-400", bg: "bg-slate-800" };
  }

  const text = String(value).toLowerCase();

  if (["loss", "lost", "mutant", "low", "absent", "deficient"].includes(text)) {
    return { label: "Abnormal/low", icon: AlertTriangle, color: "text-amber-200", bg: "bg-amber-400/10" };
  }

  const num = Number(value);
  if (!Number.isNaN(num)) {
    if (key.includes("SLX4IP") && num < 30) {
      return { label: "Low", icon: AlertTriangle, color: "text-amber-200", bg: "bg-amber-400/10" };
    }
    if (num >= 70) {
      return { label: "High", icon: CheckCircle2, color: "text-emerald-200", bg: "bg-emerald-400/10" };
    }
    if (num >= 35) {
      return { label: "Intermediate", icon: CircleHelp, color: "text-cyan-200", bg: "bg-cyan-400/10" };
    }
    return { label: "Low", icon: CircleHelp, color: "text-slate-300", bg: "bg-slate-800" };
  }

  return { label: String(value), icon: CheckCircle2, color: "text-slate-200", bg: "bg-white/5" };
}

export default function BiomarkerPanel({ sample }) {
  if (!sample) {
    return (
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Biomarker panel builder</h2>
        <p className="mt-2 text-slate-400">Run a sample first to view biomarker completeness.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Biomarker panel builder</h2>
      <p className="mt-1 text-sm text-slate-400">
        Check whether the sample has enough information to support ALT classification and synthetic-lethality ranking.
      </p>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {biomarkers.map((group) => (
          <div key={group.group} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <h3 className="font-semibold text-cyan-200">{group.group}</h3>

            <div className="mt-4 space-y-2">
              {group.items.map(([key, label]) => {
                const status = classify(sample[key], key);
                const Icon = status.icon;

                return (
                  <div key={key} className={`rounded-xl p-3 ${status.bg}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">{label}</p>
                        <p className="text-xs text-slate-400">{key}</p>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${status.color}`}>
                        <Icon className="h-4 w-4" />
                        {status.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
