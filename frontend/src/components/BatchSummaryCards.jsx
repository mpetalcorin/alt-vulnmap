import { Users, Activity, Target, Flame } from "lucide-react";

function countWhere(results, predicate) {
  return results.filter(predicate).length;
}

function Card({ title, value, subtitle, icon: Icon, gradient }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${gradient} p-5 shadow-xl`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-200">{title}</p>
          <p className="mt-2 text-4xl font-bold text-white">{value}</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-3 text-white">
          <Icon className="h-7 w-7" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-200">{subtitle}</p>
    </div>
  );
}

export default function BatchSummaryCards({ results }) {
  if (!results?.length) return null;

  const total = results.length;
  const altHigh = countWhere(results, (r) => r.alt_likelihood.score >= 70);
  const stressHigh = countWhere(results, (r) => r.replication_stress.score >= 70);
  const fanCmTop = countWhere(results, (r) => r.vulnerabilities[0]?.target?.includes("FANCM"));
  const veryHighTop = countWhere(results, (r) => r.vulnerabilities[0]?.score >= 80);

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Total samples"
        value={total}
        subtitle="Samples analysed in the uploaded batch."
        icon={Users}
        gradient="from-slate-500/30 via-slate-700/30 to-slate-950"
      />

      <Card
        title="ALT-high samples"
        value={altHigh}
        subtitle="Samples with ALT likelihood score of 70 or above."
        icon={Target}
        gradient="from-cyan-400/30 via-blue-600/20 to-slate-950"
      />

      <Card
        title="Stress-high samples"
        value={stressHigh}
        subtitle="Samples with replication-stress score of 70 or above."
        icon={Activity}
        gradient="from-purple-400/30 via-fuchsia-600/20 to-slate-950"
      />

      <Card
        title="Very high priority"
        value={veryHighTop}
        subtitle={`${fanCmTop} samples have FANCM-related top vulnerability.`}
        icon={Flame}
        gradient="from-orange-400/30 via-red-600/20 to-slate-950"
      />
    </section>
  );
}
