import { motion } from "framer-motion";
import { Beaker, Download, Globe, TrendingUp, Database, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const drugData = [
  { year: "2020", efficacy: 72 },
  { year: "2021", efficacy: 76 },
  { year: "2022", efficacy: 79 },
  { year: "2023", efficacy: 83 },
  { year: "2024", efficacy: 86 },
  { year: "2025", efficacy: 89 },
];

const datasets = [
  { name: "Infection Rate by Region", records: "12,340", updated: "Mar 2026", format: "CSV" },
  { name: "Parasite Morphology Dataset", records: "8,920", updated: "Feb 2026", format: "JSON" },
  { name: "Treatment Outcome Analysis", records: "5,670", updated: "Mar 2026", format: "CSV" },
  { name: "Drug Resistance Patterns", records: "3,450", updated: "Jan 2026", format: "CSV" },
];

const ResearchPage = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Pharmaceutical <span className="text-gradient">Research</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Aggregated, anonymized diagnostic data for malaria drug research, epidemiological studies, and disease pattern analysis.
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Database, label: "Data Points", value: "2.4M+", desc: "Anonymized diagnostic records" },
          { icon: Globe, label: "Regions Covered", value: "45+", desc: "Countries with active data" },
          { icon: TrendingUp, label: "Research Papers", value: "28", desc: "Published using our data" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <m.icon size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{m.value}</p>
            <p className="text-sm font-medium text-foreground">{m.label}</p>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Drug Efficacy Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Beaker size={18} className="text-primary" /> ACT Drug Efficacy Trend (%)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={drugData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(200, 15%, 45%)" }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: "hsl(200, 15%, 45%)" }} />
              <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(195, 20%, 88%)", borderRadius: "8px", fontSize: 12 }} />
              <Line type="monotone" dataKey="efficacy" stroke="hsl(172, 66%, 30%)" strokeWidth={3} dot={{ fill: "hsl(172, 66%, 30%)", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Downloadable Datasets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText size={18} className="text-primary" /> Available Datasets
          </h3>
          <div className="space-y-3">
            {datasets.map((d) => (
              <div key={d.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.records} records · Updated {d.updated}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1 shrink-0">
                  <Download size={14} /> {d.format}
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Future Expansion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card-gradient rounded-xl border border-border p-8 text-center"
      >
        <h3 className="text-xl font-display font-bold text-foreground mb-2">Coming Soon: Multi-Disease Detection</h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-4">
          Our platform is expanding to detect Dengue, Leukemia, and Anemia from blood samples using advanced AI models.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Dengue", "Leukemia", "Anemia"].map((d) => (
            <span key={d} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              {d}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default ResearchPage;
