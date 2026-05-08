import { Brain, GitBranch, ShieldAlert } from "lucide-react";

export default function TopAxisExplainer({ result }) {
  if (!result) return null;

  const top = result.vulnerabilities?.[0];

  if (!top) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-cyan-400/20 p-3 text-cyan-200">
          <Brain className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">Top-axis explainer</h2>
          <p className="mt-1 text-sm text-slate-400">
            Biological reasoning behind the highest-ranked vulnerability.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <GitBranch className="mb-3 h-5 w-5 text-cyan-200" />
          <h3 className="font-semibold text-white">{top.axis}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {top.rationale}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <ShieldAlert className="mb-3 h-5 w-5 text-amber-200" />
          <h3 className="font-semibold text-white">Risk interpretation</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            A high score does not mean a treatment will work clinically. It means this sample
            has a pattern worth testing experimentally using knockdown, inhibitor, rescue,
            and survival assays.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <h3 className="font-semibold text-white">Recommended first experiment</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Start with the top-ranked axis and test whether perturbing that axis reduces
            clonogenic survival while increasing telomeric replication-stress markers.
          </p>

          <div className="mt-3 rounded-xl bg-cyan-400/10 p-3 text-sm text-cyan-100">
            Top score: {top.score}/100
          </div>
        </div>
      </div>
    </section>
  );
}
