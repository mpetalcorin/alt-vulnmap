import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

function Gauge({ title, value, label, color }) {
  const data = [{ name: title, value }];

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        {title}
      </h3>

      <div className="mt-2 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={data}
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              cornerRadius={20}
              background={{ fill: "rgba(148,163,184,0.15)" }}
              fill={color}
            />
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-4xl font-bold"
            >
              {value}
            </text>
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-400 text-xs"
            >
              /100
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-300">{label}</p>
    </div>
  );
}

export default function ScoreGauges({ result }) {
  if (!result) return null;

  const top = result.vulnerabilities?.[0];

  return (
    <section className="grid gap-5 lg:grid-cols-3">
      <Gauge
        title="ALT likelihood"
        value={result.alt_likelihood.score}
        label={result.alt_likelihood.label}
        color="#22d3ee"
      />

      <Gauge
        title="Replication stress"
        value={result.replication_stress.score}
        label={result.replication_stress.label}
        color="#a855f7"
      />

      <Gauge
        title="Top vulnerability"
        value={top?.score ?? 0}
        label={top?.target ?? "No result"}
        color="#10b981"
      />
    </section>
  );
}
