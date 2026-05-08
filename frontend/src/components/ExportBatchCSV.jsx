import Papa from "papaparse";
import { Download } from "lucide-react";

export default function ExportBatchCSV({ results }) {
  if (!results?.length) return null;

  function exportCSV() {
    const rows = results.map((r) => {
      const row = {
        sample_id: r.sample_id,
        ALT_likelihood_score: r.alt_likelihood.score,
        ALT_likelihood_label: r.alt_likelihood.label,
        replication_stress_score: r.replication_stress.score,
        replication_stress_label: r.replication_stress.label,
        top_vulnerability: r.vulnerabilities[0]?.target,
        top_axis: r.vulnerabilities[0]?.axis,
        top_score: r.vulnerabilities[0]?.score,
      };

      r.vulnerabilities.forEach((v) => {
        const key = v.target.replaceAll(" ", "_").replaceAll("/", "_").replaceAll("-", "_");
        row[`${key}_score`] = v.score;
      });

      return row;
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "alt_vulnmap_batch_results.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportCSV}
      className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
    >
      <Download className="h-4 w-4" />
      Export batch results CSV
    </button>
  );
}
