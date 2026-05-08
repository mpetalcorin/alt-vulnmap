import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { analyzeSample } from "../lib/api";

const defaultSample = {
    sample_id: "U2OS_like_ALT_sample",
    cancer_type: "osteosarcoma",
    ATRX_status: "loss",
    DAXX_status: "normal",
    H3F3A_status: "normal",
    BRCA1_status: "normal",
    C_circle_score: 95,
    APB_score: 85,
    telomere_length_heterogeneity: 90,
    TERT_or_telomerase_score: 5,
    SLX4IP_expression: 15,
    FANCM_expression: 70,
    BLM_expression: 85,
    RAD52_expression: 75,
    POLD3_expression: 70,
    SMARCAL1_expression: 65,
    EXD2_expression: 60,
    DNA2_expression: 60,
    WEE1_expression: 75,
    FANCM_dependency_score: 80,
    pRPA_score: 90,
    pCHK1_score: 85,
    gammaH2AX_score: 80,
    ssDNA_gap_score: 85,
    ADPr_score: 75,
    telomere_fragility_score: 90,
    telomeric_EdU_score: 70,
};

const fields = [
    ["sample_id", "Sample ID", "text"],
    ["cancer_type", "Cancer type", "text"],
    ["ATRX_status", "ATRX status", "select"],
    ["DAXX_status", "DAXX status", "select"],
    ["H3F3A_status", "H3.3/H3F3A status", "select"],
    ["BRCA1_status", "BRCA1 status", "select"],
    ["C_circle_score", "C-circle score", "number"],
    ["APB_score", "APB score", "number"],
    ["telomere_length_heterogeneity", "Telomere length heterogeneity", "number"],
    ["TERT_or_telomerase_score", "TERT/telomerase score", "number"],
    ["SLX4IP_expression", "SLX4IP expression", "number"],
    ["FANCM_expression", "FANCM expression", "number"],
    ["BLM_expression", "BLM expression", "number"],
    ["RAD52_expression", "RAD52 expression", "number"],
    ["POLD3_expression", "POLD3 expression", "number"],
    ["SMARCAL1_expression", "SMARCAL1 expression", "number"],
    ["EXD2_expression", "EXD2 expression", "number"],
    ["DNA2_expression", "DNA2 expression", "number"],
    ["WEE1_expression", "WEE1 expression", "number"],
    ["FANCM_dependency_score", "FANCM dependency score", "number"],
    ["pRPA_score", "pRPA score", "number"],
    ["pCHK1_score", "pCHK1 score", "number"],
    ["gammaH2AX_score", "γH2AX score", "number"],
    ["ssDNA_gap_score", "ssDNA gap score", "number"],
    ["ADPr_score", "ADP-ribose score", "number"],
    ["telomere_fragility_score", "Telomere fragility score", "number"],
    ["telomeric_EdU_score", "Telomeric EdU score", "number"],
];

export default function ManualInput({ onResult }) {
    const [sample, setSample] = useState(defaultSample);
    const [loading, setLoading] = useState(false);

    function updateField(key, value, type) {
        setSample((prev) => ({
            ...prev,
            [key]: type === "number" ? Number(value) : value,
        }));
    }

    async function submit() {
        setLoading(true);
        try {
            const result = await analyzeSample(sample);
            onResult(result, sample);
        } catch (error) {
            alert("Backend error. Make sure FastAPI is running on http://127.0.0.1:8000");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Sample input</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Enter biomarker values from 0 to 100. For status fields, use normal, loss, mutant, low, high, present, or absent.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setSample(defaultSample)}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Example
                    </button>

                    <button
                        onClick={submit}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
                    >
                        <Play className="h-4 w-4" />
                        {loading ? "Analysing..." : "Run analysis"}
                    </button>
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {fields.map(([key, label, type]) => (
                    <label key={key} className="block rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                        <span className="text-xs font-medium text-slate-400">{label}</span>

                        {type === "select" ? (
                            <select
                                value={sample[key] ?? ""}
                                onChange={(e) => updateField(key, e.target.value, type)}
                                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
                            >
                                <option value="normal">normal</option>
                                <option value="loss">loss</option>
                                <option value="mutant">mutant</option>
                                <option value="low">low</option>
                                <option value="high">high</option>
                                <option value="present">present</option>
                                <option value="absent">absent</option>
                            </select>
                        ) : (
                            <input
                                type={type}
                                min={type === "number" ? 0 : undefined}
                                max={type === "number" ? 100 : undefined}
                                value={sample[key] ?? ""}
                                onChange={(e) => updateField(key, e.target.value, type)}
                                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
                            />
                        )}
                    </label>
                ))}
            </div>
        </section>
    );
}