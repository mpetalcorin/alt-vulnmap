import { useEffect, useState } from "react";
import { getProteins, getPairs } from "../lib/api";

export default function KnowledgeTable() {
    const [proteins, setProteins] = useState([]);
    const [pairs, setPairs] = useState([]);

    useEffect(() => {
        getProteins().then(setProteins).catch(console.error);
        getPairs().then(setPairs).catch(console.error);
    }, []);

    return (
        <section className="grid gap-5 xl:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
                <h2 className="text-xl font-semibold text-white">ALT protein knowledge base</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Curated protein roles, vulnerability logic, and confidence scores.
                </p>

                <div className="mt-4 max-h-[520px] overflow-auto rounded-2xl border border-white/10">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="sticky top-0 bg-slate-950 text-slate-300">
                            <tr>
                                <th className="p-3">Protein</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">ALT role</th>
                                <th className="p-3">Confidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proteins.map((p) => (
                                <tr key={p.protein} className="border-t border-white/10">
                                    <td className="p-3 font-semibold text-cyan-200">{p.protein}</td>
                                    <td className="p-3 text-slate-300">{p.category}</td>
                                    <td className="p-3 text-slate-300">{p.alt_role}</td>
                                    <td className="p-3 text-white">{p.confidence}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
                <h2 className="text-xl font-semibold text-white">Synthetic-lethal pairs</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Candidate ALT-relevant protein combinations and experimental interpretation.
                </p>

                <div className="mt-4 space-y-3">
                    {pairs.map((pair) => (
                        <div key={pair.pair} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="font-semibold text-purple-200">{pair.pair}</h3>
                                <span className="rounded-full bg-purple-400/20 px-3 py-1 text-xs text-purple-100">
                                    {pair.confidence}/100
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-slate-300">{pair.effect}</p>
                            <p className="mt-2 text-xs text-slate-500">Context: {pair.context}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}