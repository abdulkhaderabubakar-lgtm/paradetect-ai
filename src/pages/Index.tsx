import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Microscope, Brain, BarChart3, Shield, FileText, Beaker, ArrowRight, Zap, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Brain, title: "CNN-Powered Detection", desc: "Deep learning model analyzes blood smear images with over 95% accuracy." },
  { icon: Microscope, title: "Instant Analysis", desc: "Upload microscopic images and get results in seconds, not hours." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track infection trends, diagnosis history, and research insights." },
  { icon: FileText, title: "Auto Reports", desc: "Generate downloadable diagnostic reports with AI confidence scores." },
  { icon: Beaker, title: "Pharma Research", desc: "Export anonymized data for drug research and disease studies." },
  { icon: Shield, title: "Secure & Compliant", desc: "HIPAA-ready architecture with encrypted cloud storage." },
];

const stats = [
  { value: "95.7%", label: "Detection Accuracy" },
  { value: "< 3s", label: "Analysis Time" },
  { value: "50K+", label: "Images Analyzed" },
  { value: "120+", label: "Labs Connected" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-hero">
        <div className="absolute inset-0 opacity-30">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-medium mb-6 border border-primary/30">
                <Zap size={14} /> AI-Powered Healthcare Platform
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
                Intelligent Malaria{" "}
                <span className="text-gradient">Detection</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-8 font-body">
                Revolutionizing malaria diagnosis with deep learning and computer vision. 
                Faster, more accurate, and built for doctors, labs, and pharmaceutical research.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/detect">
                  <Button size="lg" className="gap-2 shadow-glow">
                    Start Detection <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl font-display font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Powerful Features for <span className="text-gradient">Healthcare</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything medical professionals need for rapid malaria diagnosis and pharmaceutical research insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card-gradient rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Transform Malaria Diagnosis?
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Join healthcare professionals worldwide using AI to save lives and accelerate research.
            </p>
            <Link to="/detect">
              <Button size="lg" className="gap-2 shadow-glow">
                Try AI Detection Now <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
