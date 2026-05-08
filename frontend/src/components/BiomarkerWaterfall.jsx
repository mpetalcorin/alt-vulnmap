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

function driverData(result) {
  if (!result) return [];

  const altDrivers = Object.entries(result.alt_likelihood.drivers || {}).map(([name, value]) => ({
    group: "ALT",
    marker: name.replaceAll("_", " "),
    value,
  }));

  const stressDrivers = Object.entries(result.replication_stress.drivers || {}).map(([name, value]) => ({
    group: "Stress",
    marker: name.replaceAll("_", " "),
    value,
  }));

  return [...altDrivers, ...stressDrivers].sort((a, b) => b.value - a.value);
}

export default function BiomarkerWaterfall({ result }) {
  if (!result) return null;

  const data = driverData(result);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Biomarker contribution waterfall</h2>
      <p className="mt-1 text-sm text-slate-400">
        The tallest bars show which markers contribute most strongly to ALT classification and stress scoring.
      </p>

      <div className="mt-5 h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 90, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
            <YAxis
              type="category"
              dataKey="marker"
              width={160}
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
            />
            <Bar dataKey="value" radius={[0, 12, 12, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.group === "ALT" ? "#22d3ee" : "#a855f7"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
