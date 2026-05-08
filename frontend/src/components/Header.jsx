import { Activity, Dna, Network, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <header className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-950 p-6 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.20),transparent_30%)]" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100"
                    >
                        <Dna className="h-4 w-4" />
                        ALT-positive cancer synthetic lethality explorer
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-3xl font-bold tracking-tight text-white md:text-5xl"
                    >
                        ALT-VulnMap
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg"
                    >
                        A research decision-support app for mapping ALT status, telomere replication stress,
                        and synthetic-lethal vulnerabilities across the SLX4IP, FANCM, BLM, ATR, RAD52,
                        SMARCAL1, EXD2, DNA2, POLD3, BRCA1, and WEE1 axes.
                    </motion.p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <Activity className="mb-2 h-5 w-5 text-cyan-200" />
                        <p className="text-sm text-slate-300">Score replication-stress burden</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <Network className="mb-2 h-5 w-5 text-purple-200" />
                        <p className="text-sm text-slate-300">Visualise protein-axis interactions</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <FlaskConical className="mb-2 h-5 w-5 text-emerald-200" />
                        <p className="text-sm text-slate-300">Generate assay recommendations</p>
                    </div>
                </div>
            </div>
        </header>
    );
}