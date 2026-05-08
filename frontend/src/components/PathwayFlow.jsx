import { ArrowRight, Dna, Activity, Target, FlaskConical } from "lucide-react";

function Node({ icon: Icon, title, text, gradient }) {
  return (
    <div className={`min-w-[220px] rounded-3xl border border-white/10 bg-gradient-to-br ${gradient} p-5 shadow-xl`}>
      <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-white">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-200">{text}</p>
    </div>
  );
}

export default function PathwayFlow({ result }) {
  if (!result) return null;

  const top = result.vulnerabilities?.[0];

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">ALT vulnerability pathway flow</h2>
      <p className="mt-1 text-sm text-slate-400">
        A visual summary of how sample biology leads to a synthetic-lethality hypothesis.
      </p>

      <div className="mt-5 flex gap-4 overflow-x-auto pb-3">
        <Node
          icon={Dna}
          title="ALT identity"
          text={`${result.alt_likelihood.score}/100, ${result.alt_likelihood.label}`}
          gradient="from-cyan-400/30 via-blue-600/20 to-slate-950"
        />

        <div className="flex items-center text-slate-400">
          <ArrowRight className="h-7 w-7" />
        </div>

        <Node
          icon={Activity}
          title="Replication stress"
          text={`${result.replication_stress.score}/100, ${result.replication_stress.label}`}
          gradient="from-purple-400/30 via-fuchsia-600/20 to-slate-950"
        />

        <div className="flex items-center text-slate-400">
          <ArrowRight className="h-7 w-7" />
        </div>

        <Node
          icon={Target}
          title="Top vulnerability"
          text={`${top?.target || "No target"}, score ${top?.score || 0}/100`}
          gradient="from-emerald-400/30 via-teal-600/20 to-slate-950"
        />

        <div className="flex items-center text-slate-400">
          <ArrowRight className="h-7 w-7" />
        </div>

        <Node
          icon={FlaskConical}
          title="Validation"
          text={top?.recommended_assays?.[0] || "Run validation assay"}
          gradient="from-amber-400/30 via-orange-600/20 to-slate-950"
        />
      </div>
    </section>
  );
}
