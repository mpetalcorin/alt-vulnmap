import { useState } from "react";
import { Upload, Download } from "lucide-react";
import Papa from "papaparse";
import { batchAnalyze, getTemplate } from "../lib/api";

export default function BatchUpload({ onBatchResult }) {
    const [loading, setLoading] = useState(false);

    async function uploadFile(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const result = await batchAnalyze(file);
            onBatchResult(result.results);
        } catch (error) {
            alert("Batch upload failed. Check CSV format and backend connection.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function downloadTemplate() {
        const template = await getTemplate();
        const csv = Papa.unparse([template.example]);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "alt_vulnmap_template.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Batch sample upload</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Upload a CSV of multiple tumour samples or cell lines using the template columns.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={downloadTemplate}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                    >
                        <Download className="h-4 w-4" />
                        Download CSV template
                    </button>

                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-purple-300">
                        <Upload className="h-4 w-4" />
                        {loading ? "Analysing..." : "Upload CSV"}
                        <input type="file" accept=".csv" onChange={uploadFile} className="hidden" />
                    </label>
                </div>
            </div>
        </section>
    );
}