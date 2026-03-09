import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Activity, Users, Microscope, AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const monthlyData = [
  { month: "Jul", infected: 42, uninfected: 128 },
  { month: "Aug", infected: 56, uninfected: 145 },
  { month: "Sep", infected: 38, uninfected: 162 },
  { month: "Oct", infected: 61, uninfected: 139 },
  { month: "Nov", infected: 47, uninfected: 171 },
  { month: "Dec", infected: 35, uninfected: 188 },
  { month: "Jan", infected: 52, uninfected: 155 },
  { month: "Feb", infected: 44, uninfected: 167 },
  { month: "Mar", infected: 29, uninfected: 193 },
];

const infectionRate = [
  { month: "Jul", rate: 24.7 },
  { month: "Aug", rate: 27.9 },
  { month: "Sep", rate: 19.0 },
  { month: "Oct", rate: 30.5 },
  { month: "Nov", rate: 21.6 },
  { month: "Dec", rate: 15.7 },
  { month: "Jan", rate: 25.1 },
  { month: "Feb", rate: 20.9 },
  { month: "Mar", rate: 13.1 },
];

const pieData = [
  { name: "P. falciparum", value: 62 },
  { name: "P. vivax", value: 24 },
  { name: "P. malariae", value: 9 },
  { name: "P. ovale", value: 5 },
];

const PIE_COLORS = ["hsl(172, 66%, 30%)", "hsl(160, 60%, 45%)", "hsl(38, 92%, 50%)", "hsl(200, 50%, 50%)"];

const stats = [
  { icon: Microscope, label: "Total Analyses", value: "2,847", change: "+12.3%" },
  { icon: AlertCircle, label: "Infections Found", value: "404", change: "-8.1%" },
  { icon: CheckCircle2, label: "Clear Results", value: "2,443", change: "+15.7%" },
  { icon: Users, label: "Active Users", value: "156", change: "+23.4%" },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Analytics <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Real-time insights on malaria detection and research data.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon size={20} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-healthy">{s.change}</span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" /> Monthly Analysis Results
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(200, 15%, 45%)" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(200, 15%, 45%)" }} />
                <Tooltip
                  contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(195, 20%, 88%)", borderRadius: "8px", fontSize: 12 }}
                />
                <Bar dataKey="uninfected" fill="hsl(152, 60%, 42%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="infected" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Infection Rate Trend (%)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={infectionRate}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(195, 20%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(200, 15%, 45%)" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(200, 15%, 45%)" }} />
                <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(195, 20%, 88%)", borderRadius: "8px", fontSize: 12 }} />
                <defs>
                  <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(172, 66%, 30%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(172, 66%, 30%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="rate" stroke="hsl(172, 66%, 30%)" fill="url(#rateGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity size={18} className="text-primary" /> Parasite Species Distribution
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(195, 20%, 88%)", borderRadius: "8px", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  {d.name} ({d.value}%)
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
          >
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> Recent Analyses
            </h3>
            <div className="space-y-3">
              {[
                { id: "MLR-2847", status: "infected", confidence: 94.2, time: "2 min ago" },
                { id: "MLR-2846", status: "uninfected", confidence: 97.8, time: "15 min ago" },
                { id: "MLR-2845", status: "uninfected", confidence: 91.3, time: "1 hr ago" },
                { id: "MLR-2844", status: "infected", confidence: 88.7, time: "2 hrs ago" },
                { id: "MLR-2843", status: "uninfected", confidence: 96.1, time: "3 hrs ago" },
              ].map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${r.status === "infected" ? "bg-infected" : "bg-healthy"}`} />
                    <span className="text-sm font-medium text-foreground">{r.id}</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    r.status === "infected" ? "bg-infected/10 text-infected" : "bg-healthy/10 text-healthy"
                  }`}>
                    {r.status === "infected" ? "Infected" : "Clear"} · {r.confidence}%
                  </span>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
