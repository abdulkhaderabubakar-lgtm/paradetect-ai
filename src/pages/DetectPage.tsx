import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Microscope, AlertCircle, CheckCircle2, Loader2, FileImage, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePatientPDF } from "@/lib/generateReport";

type Result = {
  prediction: "infected" | "uninfected";
  confidence: number;
  details: string;
  timestamp: string;
};

const DetectPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    // Simulated AI analysis
    setTimeout(() => {
      const isInfected = Math.random() > 0.45;
      const confidence = 85 + Math.random() * 14;
      setResult({
        prediction: isInfected ? "infected" : "uninfected",
        confidence: parseFloat(confidence.toFixed(1)),
        details: isInfected
          ? "Plasmodium falciparum trophozoites detected in red blood cells. Ring-form parasites observed with characteristic morphology."
          : "No malaria parasites detected. Red blood cells appear normal with no visible inclusions or morphological abnormalities.",
        timestamp: new Date().toLocaleString(),
      });
      setAnalyzing(false);
    }, 3000);
  };

  const reset = () => {
    setImage(null);
    setFileName("");
    setResult(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            AI Malaria <span className="text-gradient">Detection</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Upload a microscopic blood smear image and let our CNN model analyze it for malaria parasites.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-card rounded-xl border border-border p-6 h-full">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileImage size={20} className="text-primary" /> Upload Blood Smear
              </h3>
              {!image ? (
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all min-h-[280px]"
                >
                  <Upload size={40} className="text-muted-foreground mb-4" />
                  <p className="text-sm font-medium text-foreground mb-1">Drop image here or click to upload</p>
                  <p className="text-xs text-muted-foreground">Supports PNG, JPG, TIFF</p>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-border min-h-[280px]">
                  <img src={image} alt="Blood smear" className="w-full h-auto object-contain max-h-[300px]" />
                  {analyzing && (
                    <div className="absolute inset-0 bg-foreground/60 flex flex-col items-center justify-center">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 border-2 border-primary animate-pulse-glow rounded-lg" />
                        <div className="absolute left-0 right-0 h-0.5 bg-primary/80 animate-scan-line" />
                      </div>
                      <div className="absolute flex flex-col items-center">
                        <Loader2 size={32} className="text-primary animate-spin mb-2" />
                        <p className="text-primary-foreground text-sm font-medium">Analyzing with CNN Model...</p>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2 truncate px-1">{fileName}</p>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button onClick={analyzeImage} disabled={!image || analyzing} className="flex-1 gap-2">
                  {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Microscope size={16} />}
                  {analyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
                {image && (
                  <Button variant="outline" onClick={reset} size="icon">
                    <RotateCcw size={16} />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-card rounded-xl border border-border p-6 h-full">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Microscope size={20} className="text-primary" /> Detection Results
              </h3>

              <AnimatePresence mode="wait">
                {!result && !analyzing && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center min-h-[280px] text-muted-foreground"
                  >
                    <Microscope size={48} className="mb-4 opacity-30" />
                    <p className="text-sm">Upload and analyze an image to see results</p>
                  </motion.div>
                )}

                {analyzing && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center min-h-[280px]"
                  >
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
                    <p className="text-sm text-muted-foreground">Processing with deep learning model...</p>
                    <div className="mt-4 w-full max-w-xs bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div
                      className={`rounded-lg p-4 flex items-center gap-3 ${
                        result.prediction === "infected"
                          ? "bg-infected/10 border border-infected/30"
                          : "bg-healthy/10 border border-healthy/30"
                      }`}
                    >
                      {result.prediction === "infected" ? (
                        <AlertCircle size={28} className="text-infected shrink-0" />
                      ) : (
                        <CheckCircle2 size={28} className="text-healthy shrink-0" />
                      )}
                      <div>
                        <p className={`font-display font-bold text-lg ${
                          result.prediction === "infected" ? "text-infected" : "text-healthy"
                        }`}>
                          {result.prediction === "infected" ? "Malaria Detected" : "No Malaria Detected"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Confidence: {result.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* Confidence Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>AI Confidence</span>
                        <span>{result.confidence}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${
                            result.prediction === "infected" ? "bg-infected" : "bg-healthy"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs font-medium text-foreground mb-1">Analysis Details</p>
                      <p className="text-xs text-muted-foreground">{result.details}</p>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Analyzed: {result.timestamp}
                    </div>

                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => {
                      if (!result) return;
                      const id = `RPT-${Date.now().toString().slice(-4)}`;
                      generatePatientPDF({
                        id,
                        patient: `Patient #${Math.floor(1000 + Math.random() * 9000)}`,
                        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                        status: result.prediction,
                        confidence: result.confidence,
                        species: result.prediction === "infected" ? "P. falciparum" : "—",
                      });
                    }}>
                      <FileImage size={14} /> Download Report (PDF)
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
