export default function MetricCard({ title, value, label, accent = "cyan" }) {
    const colors = {
        cyan: "from-cyan-400/25 to-cyan-900/10 border-cyan-300/20 text-cyan-100",
        purple: "from-purple-400/25 to-purple-900/10 border-purple-300/20 text-purple-100",
        emerald: "from-emerald-400/25 to-emerald-900/10 border-emerald-300/20 text-emerald-100",
        amber: "from-amber-400/25 to-amber-900/10 border-amber-300/20 text-amber-100",
    };

    return (
        <div className={`rounded-3xl border bg-gradient-to-br p-5 shadow-xl ${colors[accent]}`}>
            <p className="text-sm text-slate-300">{title}</p>
            <div className="mt-3 flex items-end gap-2">
                <p className="text-4xl font-bold text-white">{value}</p>
                <p className="pb-1 text-sm text-slate-400">/100</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{label}</p>
        </div>
    );
}