import { motion } from "framer-motion";
import { FileText, Download, Search, Filter, AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generatePatientPDF } from "@/lib/generateReport";

const mockReports = [
  { id: "RPT-2847", patient: "Patient #4821", date: "Mar 9, 2026", status: "infected" as const, confidence: 94.2, species: "P. falciparum" },
  { id: "RPT-2846", patient: "Patient #4820", date: "Mar 9, 2026", status: "uninfected" as const, confidence: 97.8, species: "—" },
  { id: "RPT-2845", patient: "Patient #4819", date: "Mar 8, 2026", status: "uninfected" as const, confidence: 91.3, species: "—" },
  { id: "RPT-2844", patient: "Patient #4818", date: "Mar 8, 2026", status: "infected" as const, confidence: 88.7, species: "P. vivax" },
  { id: "RPT-2843", patient: "Patient #4817", date: "Mar 7, 2026", status: "uninfected" as const, confidence: 96.1, species: "—" },
  { id: "RPT-2842", patient: "Patient #4816", date: "Mar 7, 2026", status: "infected" as const, confidence: 92.5, species: "P. falciparum" },
  { id: "RPT-2841", patient: "Patient #4815", date: "Mar 6, 2026", status: "uninfected" as const, confidence: 95.4, species: "—" },
  { id: "RPT-2840", patient: "Patient #4814", date: "Mar 6, 2026", status: "infected" as const, confidence: 89.9, species: "P. malariae" },
];

const ReportsPage = () => {
  const [filter, setFilter] = useState<"all" | "infected" | "uninfected">("all");
  const filtered = filter === "all" ? mockReports : mockReports.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Diagnostic <span className="text-gradient">Reports</span>
          </h1>
          <p className="text-muted-foreground">View, download, and manage all diagnostic reports.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {(["all", "infected", "uninfected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Reports" : f === "infected" ? "Infected" : "Clear"}
            </button>
          ))}
          <span className="text-sm text-muted-foreground ml-auto">
            {filtered.length} reports
          </span>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  r.status === "infected" ? "bg-infected/10" : "bg-healthy/10"
                }`}>
                  {r.status === "infected" ? (
                    <AlertCircle size={20} className="text-infected" />
                  ) : (
                    <CheckCircle2 size={20} className="text-healthy" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.id} — {r.patient}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} /> {r.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  r.status === "infected" ? "bg-infected/10 text-infected" : "bg-healthy/10 text-healthy"
                }`}>
                  {r.status === "infected" ? "Infected" : "Clear"}
                </span>
                <span className="text-xs text-muted-foreground w-16 text-right">{r.confidence}%</span>
                <span className="text-xs text-muted-foreground w-24">{r.species}</span>
                <Button variant="outline" size="sm" className="gap-1 shrink-0" onClick={() => generatePatientPDF(r)}>
                  <Download size={14} /> PDF
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
