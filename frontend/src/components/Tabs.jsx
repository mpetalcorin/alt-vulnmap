const tabs = [
  "Dashboard",
  "Manual Sample",
  "Batch Upload",
  "Vulnerability Charts",
  "Protein Network",
  "Assay Planner",
  "Biomarker Panel",
  "Evidence Logic",
  "Drug Targets",
  "Knowledge Base",
  "Report",
];

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <nav className="sticky top-3 z-40 rounded-3xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur">
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl px-3 py-2 text-center text-sm font-medium transition ${
              activeTab === tab
                ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
