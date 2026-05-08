import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

export default function SampleScatter({ results }) {
  if (!results?.length) return null;

  const data = results.map((r) => ({
    sample: r.sample_id,
    ALT: r.alt_likelihood.score,
    Stress: r.replication_stress.score,
    TopScore: r.vulnerabilities[0]?.score || 0,
    TopVulnerability: r.vulnerabilities[0]?.target || "NA",
  }));

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Sample landscape map</h2>
      <p className="mt-1 text-sm text-slate-400">
        Samples in the upper-right quadrant combine high ALT likelihood with high replication stress.
      </p>

      <div className="mt-4 h-[440px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />

            <XAxis
              type="number"
              dataKey="ALT"
              name="ALT score"
              domain={[0, 100]}
              stroke="#94a3b8"
            />

            <YAxis
              type="number"
              dataKey="Stress"
              name="Stress score"
              domain={[0, 100]}
              stroke="#94a3b8"
            />

            <ZAxis type="number" dataKey="TopScore" range={[80, 450]} />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const d = payload[0].payload;

                return (
                  <div className="rounded-xl border border-white/10 bg-slate-950 p-3 text-sm shadow-xl">
                    <p className="font-semibold text-cyan-200">{d.sample}</p>
                    <p className="text-slate-300">ALT: {d.ALT}</p>
                    <p className="text-slate-300">Stress: {d.Stress}</p>
                    <p className="text-slate-300">Top: {d.TopVulnerability}</p>
                    <p className="text-slate-300">Top score: {d.TopScore}</p>
                  </div>
                );
              }}
            />

            <Scatter name="Samples" data={data} fill="#22d3ee" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
