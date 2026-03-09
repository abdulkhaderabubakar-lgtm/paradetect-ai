import { Link } from "react-router-dom";
import { Microscope } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="ParaDetect AI" className="h-8 w-8" />
            <span className="font-display font-bold text-foreground">ParaDetect AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered malaria detection for healthcare professionals and researchers.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Platform</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/detect" className="hover:text-primary transition-colors">AI Detection</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/research" className="hover:text-primary transition-colors">Research</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Resources</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/reports" className="hover:text-primary transition-colors">Reports</Link>
            <span>Documentation</span>
            <span>API Access</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>support@paradetect.ai</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © 2026 ParaDetect AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
