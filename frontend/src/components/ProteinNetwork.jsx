import ReactFlow, {
    Background,
    Controls,
    MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
    { id: "ALT", position: { x: 0, y: 150 }, data: { label: "ALT-positive state" }, style: { background: "#22d3ee", color: "#020617", borderRadius: 20, padding: 12 } },
    { id: "SLX4IP", position: { x: 260, y: 40 }, data: { label: "SLX4IP" }, style: { background: "#f97316", color: "white", borderRadius: 20, padding: 12 } },
    { id: "FANCM", position: { x: 260, y: 150 }, data: { label: "FANCM" }, style: { background: "#a855f7", color: "white", borderRadius: 20, padding: 12 } },
    { id: "BLM", position: { x: 520, y: 95 }, data: { label: "BLM" }, style: { background: "#ef4444", color: "white", borderRadius: 20, padding: 12 } },
    { id: "ATR", position: { x: 260, y: 280 }, data: { label: "ATR/CHK1" }, style: { background: "#10b981", color: "white", borderRadius: 20, padding: 12 } },
    { id: "RAD52", position: { x: 520, y: 250 }, data: { label: "RAD52/POLD3" }, style: { background: "#eab308", color: "#020617", borderRadius: 20, padding: 12 } },
    { id: "SMARCAL1", position: { x: 760, y: 40 }, data: { label: "SMARCAL1" }, style: { background: "#38bdf8", color: "#020617", borderRadius: 20, padding: 12 } },
    { id: "EXD2", position: { x: 760, y: 170 }, data: { label: "EXD2/DNA2" }, style: { background: "#fb7185", color: "white", borderRadius: 20, padding: 12 } },
    { id: "WEE1", position: { x: 760, y: 300 }, data: { label: "WEE1" }, style: { background: "#c084fc", color: "#020617", borderRadius: 20, padding: 12 } },
];

const edges = [
    { id: "e1", source: "ALT", target: "SLX4IP", label: "telomere stress control", animated: true },
    { id: "e2", source: "ALT", target: "FANCM", label: "fork remodelling", animated: true },
    { id: "e3", source: "SLX4IP", target: "BLM", label: "restrains", animated: true },
    { id: "e4", source: "FANCM", target: "BLM", label: "limits BLM stress", animated: true },
    { id: "e5", source: "ALT", target: "ATR", label: "checkpoint dependency", animated: true },
    { id: "e6", source: "ALT", target: "RAD52", label: "BIR/recombination", animated: true },
    { id: "e7", source: "FANCM", target: "SMARCAL1", label: "synthetic-lethal axis", animated: true },
    { id: "e8", source: "BLM", target: "EXD2", label: "processing axis", animated: true },
    { id: "e9", source: "ATR", target: "WEE1", label: "checkpoint stress", animated: true },
    { id: "e10", source: "RAD52", target: "EXD2", label: "telomere processing", animated: true },
];

export default function ProteinNetwork() {
    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
            <h2 className="text-xl font-semibold text-white">ALT synthetic-lethality network</h2>
            <p className="mt-1 text-sm text-slate-400">
                Interactive map of protein axes implicated in ALT telomere maintenance, replication stress, and synthetic lethality.
            </p>

            <div className="mt-4 h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                <ReactFlow nodes={nodes} edges={edges} fitView>
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </section>
    );
}