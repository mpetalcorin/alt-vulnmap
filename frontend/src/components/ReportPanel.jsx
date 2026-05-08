import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

export default function ReportPanel({ result }) {
    if (!result) return null;

    async function exportPDF() {
        const element = document.getElementById("report-panel");
        const canvas = await html2canvas(element, {
            backgroundColor: "#020617",
            scale: 2,
        });

        const img = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const width = 210;
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(img, "PNG", 0, 0, width, height);
        pdf.save(`${result.sample_id}_ALT_VulnMap_report.pdf`);
    }

    const top = result.vulnerabilities[0];

    return (
        <section id="report-panel" className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Interpretation report</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Concise biological interpretation for the analysed sample.
                    </p>
                </div>

                <button
                    onClick={exportPDF}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                >
                    <Download className="h-4 w-4" />
                    Export PDF
                </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                <h3 className="text-lg font-semibold text-cyan-200">{result.sample_id}</h3>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs text-slate-400">ALT likelihood</p>
                        <p className="mt-2 text-3xl font-bold text-white">{result.alt_likelihood.score}</p>
                        <p className="mt-1 text-sm text-slate-300">{result.alt_likelihood.label}</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs text-slate-400">Replication stress</p>
                        <p className="mt-2 text-3xl font-bold text-white">{result.replication_stress.score}</p>
                        <p className="mt-1 text-sm text-slate-300">{result.replication_stress.label}</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs text-slate-400">Top vulnerability</p>
                        <p className="mt-2 text-lg font-semibold text-purple-200">{top.target}</p>
                        <p className="mt-1 text-sm text-slate-300">{top.score}/100</p>
                    </div>
                </div>

                <div className="mt-5 space-y-3">
                    {result.interpretation.map((line, index) => (
                        <p key={index} className="rounded-xl bg-white/5 p-3 text-sm leading-6 text-slate-300">
                            {line}
                        </p>
                    ))}
                </div>

                <div className="mt-5">
                    <h4 className="font-semibold text-white">Top ranked vulnerabilities</h4>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                        {result.vulnerabilities.slice(0, 4).map((v) => (
                            <div key={v.target} className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="font-semibold text-cyan-100">{v.target}</p>
                                    <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-100">
                                        {v.score}
                                    </span>
                                </div>
                                <p className="mt-2 text-xs leading-5 text-slate-400">{v.rationale}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}