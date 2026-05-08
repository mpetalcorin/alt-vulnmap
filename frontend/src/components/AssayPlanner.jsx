import { FlaskConical, Microscope, TestTube2 } from "lucide-react";

export default function AssayPlanner({ result }) {
    if (!result) return null;

    const top = result.vulnerabilities[0];

    const baselineAssays = [
        "C-circle assay to validate ALT activity",
        "Telomere FISH to measure telomere length heterogeneity and fragility",
        "APB immunofluorescence using PML plus telomere probe",
        "pSer33-RPA and pSer345-CHK1 telomere colocalisation",
        "Clonogenic survival after target knockdown or inhibitor treatment",
    ];

    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-400/20 p-3 text-emerald-200">
                    <FlaskConical className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Experimental validation planner</h2>
                    <p className="text-sm text-slate-400">
                        Suggested follow-up assays based on the highest-ranked vulnerability.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="mb-3 flex items-center gap-2 text-cyan-200">
                        <Microscope className="h-5 w-5" />
                        <h3 className="font-semibold">Core ALT validation panel</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                        {baselineAssays.map((a) => (
                            <li key={a} className="rounded-xl bg-white/5 p-3">{a}</li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="mb-3 flex items-center gap-2 text-purple-200">
                        <TestTube2 className="h-5 w-5" />
                        <h3 className="font-semibold">Top-axis validation: {top.axis}</h3>
                    </div>

                    <p className="mb-3 text-sm text-slate-300">{top.rationale}</p>

                    <ul className="space-y-2 text-sm text-slate-300">
                        {top.recommended_assays.map((a) => (
                            <li key={a} className="rounded-xl bg-white/5 p-3">{a}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}