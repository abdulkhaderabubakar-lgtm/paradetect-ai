import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Pill,
  ShieldCheck,
  Apple,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Clock,
  Droplets,
  Thermometer,
  BedDouble,
  Ban,
  Salad,
  Egg,
  CupSoda,
  Citrus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  prediction: "infected" | "uninfected";
  confidence: number;
};

const infectedMedications = [
  { name: "Artemether-Lumefantrine (Coartem)", dosage: "4 tablets twice daily for 3 days", note: "First-line treatment for uncomplicated P. falciparum malaria" },
  { name: "Chloroquine Phosphate", dosage: "600mg initial, then 300mg at 6, 24, and 48 hours", note: "For P. vivax, P. ovale, P. malariae infections" },
  { name: "Primaquine", dosage: "15mg daily for 14 days", note: "To prevent relapse of P. vivax and P. ovale" },
  { name: "Paracetamol (Acetaminophen)", dosage: "500-1000mg every 6-8 hours as needed", note: "For fever and pain management" },
];

const precautions = [
  { icon: ShieldCheck, text: "Use insecticide-treated mosquito nets (ITNs) while sleeping" },
  { icon: Ban, text: "Avoid outdoor activities during dusk and dawn when mosquitoes are most active" },
  { icon: Droplets, text: "Apply DEET-based mosquito repellent on exposed skin" },
  { icon: Thermometer, text: "Monitor body temperature regularly and seek help if fever exceeds 38.5°C" },
  { icon: BedDouble, text: "Get adequate rest — your body needs energy to fight the infection" },
  { icon: ShieldCheck, text: "Wear long-sleeved clothing and long pants in endemic areas" },
  { icon: Droplets, text: "Eliminate stagnant water sources near your home" },
  { icon: Clock, text: "Complete the full course of prescribed medication — never stop early" },
];

const dietInfected = [
  { icon: Droplets, category: "Hydration", items: "Drink 3-4 liters of water daily. Include ORS, coconut water, and clear broths." },
  { icon: Egg, category: "Protein", items: "Lean chicken, fish, eggs, lentils, and beans to support recovery." },
  { icon: Citrus, category: "Vitamin C", items: "Oranges, lemons, guava, papaya, and bell peppers to boost immunity." },
  { icon: Salad, category: "Easy-to-digest foods", items: "Rice porridge, oatmeal, boiled vegetables, and bananas." },
  { icon: Ban, category: "Avoid", items: "Oily/spicy food, alcohol, caffeine, processed sugar, and raw/uncooked food." },
];

const dietHealthy = [
  { icon: Salad, category: "Immune-Boosting Foods", items: "Garlic, turmeric, ginger, spinach, and citrus fruits." },
  { icon: Egg, category: "Balanced Nutrition", items: "Include proteins, whole grains, fruits, and vegetables in every meal." },
  { icon: Droplets, category: "Stay Hydrated", items: "Drink at least 2-3 liters of clean water daily." },
  { icon: Citrus, category: "Antioxidants", items: "Berries, green tea, dark leafy greens, and nuts." },
];

const PostDiagnosisGuidance = ({ prediction, confidence }: Props) => {
  const [showConsult, setShowConsult] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    prediction === "infected" ? "medications" : "precautions"
  );
  const isInfected = prediction === "infected";

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Stethoscope size={22} className="text-primary" />
        Post-Diagnosis Guidance
      </h2>

      {/* Consult Doctor CTA */}
      {isInfected && (
        <Card className="mb-4 border-infected/30 bg-infected/5">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-infected/10 flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} className="text-infected" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    Medical Consultation Recommended
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    With {confidence}% confidence of infection, we strongly recommend consulting a healthcare professional.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setShowConsult(true)}
                  className="flex-1 sm:flex-none gap-2"
                  size="sm"
                >
                  <Phone size={14} /> Consult Doctor
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowConsult(false)}
                  className="flex-1 sm:flex-none gap-2"
                  size="sm"
                >
                  <Pill size={14} /> Self-Care Guide
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showConsult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 bg-card rounded-lg border border-border space-y-3">
                    <p className="text-sm font-medium text-foreground">Contact a Healthcare Provider</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="tel:+1234567890"
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
                      >
                        <Phone size={18} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Emergency Hotline</p>
                          <p className="text-xs text-muted-foreground">+1 (234) 567-890</p>
                        </div>
                      </a>
                      <a
                        href="mailto:consult@paradetect.ai"
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
                      >
                        <MessageSquare size={18} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Online Consultation</p>
                          <p className="text-xs text-muted-foreground">consult@paradetect.ai</p>
                        </div>
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ⏰ Available 24/7. A certified physician will review your diagnostic report and provide personalized treatment guidance.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* Accordion Sections */}
      <div className="space-y-3">
        {/* Medications */}
        {isInfected && (
          <Card className="border-border">
            <button
              onClick={() => toggleSection("medications")}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <span className="flex items-center gap-2 font-display font-semibold text-foreground text-sm">
                <Pill size={18} className="text-primary" /> Recommended Medications
              </span>
              {expandedSection === "medications" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <AnimatePresence>
              {expandedSection === "medications" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <CardContent className="pt-0 pb-4 px-4 space-y-3">
                    <p className="text-xs text-muted-foreground mb-2">
                      ⚠️ These are general guidelines. Always consult a doctor before taking any medication.
                    </p>
                    {infectedMedications.map((med, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm font-medium text-foreground">{med.name}</p>
                        <p className="text-xs text-primary font-medium mt-1">Dosage: {med.dosage}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{med.note}</p>
                      </div>
                    ))}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        )}

        {/* Precautions */}
        <Card className="border-border">
          <button
            onClick={() => toggleSection("precautions")}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <span className="flex items-center gap-2 font-display font-semibold text-foreground text-sm">
              <ShieldCheck size={18} className="text-primary" /> Precautions & Prevention
            </span>
            {expandedSection === "precautions" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <AnimatePresence>
            {expandedSection === "precautions" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0 pb-4 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {precautions.map((p, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50">
                        <p.icon size={16} className="text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">{p.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Diet */}
        <Card className="border-border">
          <button
            onClick={() => toggleSection("diet")}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <span className="flex items-center gap-2 font-display font-semibold text-foreground text-sm">
              <Apple size={18} className="text-primary" /> Diet & Nutrition Guide
            </span>
            {expandedSection === "diet" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <AnimatePresence>
            {expandedSection === "diet" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0 pb-4 px-4 space-y-2">
                  {(isInfected ? dietInfected : dietHealthy).map((d, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                      <d.icon size={18} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{d.category}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{d.items}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </motion.div>
  );
};

export default PostDiagnosisGuidance;
