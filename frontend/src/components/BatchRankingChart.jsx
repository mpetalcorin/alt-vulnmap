import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

function colour(score) {
  if (score >= 85) return "#ef4444";
  if (score >= 70) return "#f97316";
  if (score >= 55) return "#eab308";
  if (score >= 40) return "#22d3ee";
  return "#64748b";
}

export default function BatchRankingChart({ results }) {
  if (!results?.length) return null;

  const data = [...results]
    .map((r) => ({
      sample: r.sample_id,
      score: r.vulnerabilities[0]?.score || 0,
      vulnerability: r.vulnerabilities[0]?.target || "NA",
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Batch priority ranking</h2>
      <p className="mt-1 text-sm text-slate-400">
        Samples ranked by their strongest predicted synthetic-lethality vulnerability.
      </p>

      <div className="mt-5 h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 70, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
            <YAxis
              dataKey="sample"
              type="category"
              width={140}
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "14px",
                color: "white",
              }}
              formatter={(value, name, props) => [
                `${value}/100, ${props.payload.vulnerability}`,
                "Top score",
              ]}
            />
            <Bar dataKey="score" radius={[0, 12, 12, 0]}>
              {data.map((entry) => (
                <Cell key={entry.sample} fill={colour(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
