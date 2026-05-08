import { CalendarDays, FlaskConical, Microscope, BarChart3, FileText } from "lucide-react";

const steps = [
  {
    title: "Day 0",
    icon: FlaskConical,
    colour: "from-cyan-400/30 to-blue-900/20",
    text: "Seed ALT-positive and control cells. Prepare siRNA, inhibitor, or CRISPR perturbation conditions.",
  },
  {
    title: "Day 1",
    icon: Microscope,
    colour: "from-purple-400/30 to-fuchsia-900/20",
    text: "Apply target perturbation, for example FANCM knockdown, ATR inhibition, RAD52 knockdown, or WEE1 inhibition.",
  },
  {
    title: "Day 2 to 3",
    icon: BarChart3,
    colour: "from-emerald-400/30 to-teal-900/20",
    text: "Measure pRPA, pCHK1, γH2AX, APBs, telomere fragility, C-circles, and early viability.",
  },
  {
    title: "Day 7 to 14",
    icon: CalendarDays,
    colour: "from-amber-400/30 to-orange-900/20",
    text: "Run clonogenic survival or long-term growth assay to assess synthetic-lethal effect.",
  },
  {
    title: "Final report",
    icon: FileText,
    colour: "from-rose-400/30 to-red-900/20",
    text: "Compare ALT-positive and ALT-negative controls. Confirm whether phenotype is rescued by pathway-specific rescue.",
  },
];

export default function AssayTimeline({ result }) {
  if (!result) return null;

  const top = result.vulnerabilities?.[0];

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Colourful assay timeline</h2>
      <p className="mt-1 text-sm text-slate-400">
        Suggested experimental sequence for testing: {top?.target || "top vulnerability"}.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${step.colour} p-4 shadow-xl`}
            >
              <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-white">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{step.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
