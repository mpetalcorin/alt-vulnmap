import { useState } from "react";
import Header from "./components/Header";
import BrandBar from "./components/BrandBar";
import Tabs from "./components/Tabs";
import ManualInput from "./components/ManualInput";
import MetricCard from "./components/MetricCard";
import VulnerabilityChart from "./components/VulnerabilityChart";
import ProteinNetwork from "./components/ProteinNetwork";
import KnowledgeTable from "./components/KnowledgeTable";
import BatchUpload from "./components/BatchUpload";
import AssayPlanner from "./components/AssayPlanner";
import ReportPanel from "./components/ReportPanel";
import BiomarkerPanel from "./components/BiomarkerPanel";
import BatchHeatmap from "./components/BatchHeatmap";
import ExportBatchCSV from "./components/ExportBatchCSV";
import EvidencePanel from "./components/EvidencePanel";
import DrugTargetTable from "./components/DrugTargetTable";
import SampleScatter from "./components/SampleScatter";
import TopAxisExplainer from "./components/TopAxisExplainer";
import ScoreGauges from "./components/ScoreGauges";
import VulnerabilityCards from "./components/VulnerabilityCards";
import BiomarkerWaterfall from "./components/BiomarkerWaterfall";
import BatchSummaryCards from "./components/BatchSummaryCards";
import BatchRankingChart from "./components/BatchRankingChart";
import PathwayFlow from "./components/PathwayFlow";
import AssayTimeline from "./components/AssayTimeline";
import CancerContext from "./components/CancerContext";
import PhenotypeBadges from "./components/PhenotypeBadges";

function BatchResults({ results }) {
  if (!results?.length) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Batch results</h2>
          <p className="mt-1 text-sm text-slate-400">
            Summary of uploaded samples ranked by top predicted vulnerability.
          </p>
        </div>

        <ExportBatchCSV results={results} />
      </div>

      <div className="mt-4 overflow-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-950 text-slate-300">
            <tr>
              <th className="p-3">Sample</th>
              <th className="p-3">ALT score</th>
              <th className="p-3">Stress score</th>
              <th className="p-3">Top vulnerability</th>
              <th className="p-3">Top score</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => (
              <tr key={r.sample_id} className="border-t border-white/10">
                <td className="p-3 font-semibold text-cyan-200">{r.sample_id}</td>
                <td className="p-3 text-white">{r.alt_likelihood.score}</td>
                <td className="p-3 text-white">{r.replication_stress.score}</td>
                <td className="p-3 text-slate-300">
                  {r.vulnerabilities[0]?.target}
                </td>
                <td className="p-3 text-white">{r.vulnerabilities[0]?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Dashboard({ result }) {
  if (!result) {
    return (
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center shadow-xl">
        <h2 className="text-2xl font-semibold text-white">
          Start by analysing a sample
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-slate-400">
          Go to Manual Sample, run the example, then return here to view the ALT
          likelihood, replication-stress burden, top vulnerability, recommended
          assays, and biological interpretation.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <ScoreGauges result={result} />

      <section className="grid gap-5 md:grid-cols-3">
        <MetricCard
          title="ALT likelihood"
          value={result.alt_likelihood.score}
          label={result.alt_likelihood.label}
          accent="cyan"
        />

        <MetricCard
          title="Replication stress"
          value={result.replication_stress.score}
          label={result.replication_stress.label}
          accent="purple"
        />

        <MetricCard
          title="Top vulnerability"
          value={result.vulnerabilities[0]?.score ?? 0}
          label={result.vulnerabilities[0]?.target ?? "No result"}
          accent="emerald"
        />
      </section>

      <PhenotypeBadges result={result} />
      <PathwayFlow result={result} />
      <VulnerabilityCards result={result} />
      <TopAxisExplainer result={result} />
      <ReportPanel result={result} />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [result, setResult] = useState(null);
  const [lastSample, setLastSample] = useState(null);
  const [batchResults, setBatchResults] = useState([]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <BrandBar />
        <Header />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "Dashboard" && <Dashboard result={result} />}

        {activeTab === "Manual Sample" && (
          <ManualInput
            onResult={(r, sample) => {
              setResult(r);
              setLastSample(sample);
              setActiveTab("Dashboard");
            }}
          />
        )}

        {activeTab === "Batch Upload" && (
          <div className="space-y-6">
            <BatchUpload onBatchResult={setBatchResults} />
            <BatchSummaryCards results={batchResults} />
            <BatchResults results={batchResults} />
            <BatchRankingChart results={batchResults} />
            <SampleScatter results={batchResults} />
            <BatchHeatmap results={batchResults} />
          </div>
        )}

        {activeTab === "Vulnerability Charts" && (
          <div className="space-y-6">
            <VulnerabilityChart result={result} />
            <BiomarkerWaterfall result={result} />
          </div>
        )}

        {activeTab === "Protein Network" && <ProteinNetwork />}

        {activeTab === "Assay Planner" && (
          <div className="space-y-6">
            <AssayPlanner result={result} />
            <AssayTimeline result={result} />
          </div>
        )}

        {activeTab === "Biomarker Panel" && (
          <BiomarkerPanel sample={lastSample} />
        )}

        {activeTab === "Evidence Logic" && (
          <div className="space-y-6">
            <EvidencePanel />
            <CancerContext />
          </div>
        )}

        {activeTab === "Drug Targets" && <DrugTargetTable />}

        {activeTab === "Knowledge Base" && <KnowledgeTable />}

        {activeTab === "Report" && <ReportPanel result={result} />}

        <footer className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-sm leading-6 text-slate-400">
          <p>
            ALT-VulnMap is a research decision-support prototype. Scores are
            heuristic and should be interpreted as hypothesis-generating, not as
            clinical treatment recommendations. Experimental validation is
            essential.
          </p>
        </footer>
      </div>
    </main>
  );
}
