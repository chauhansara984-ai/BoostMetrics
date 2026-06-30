import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicePlanner from './components/ServicePlanner';
import RoiCalculator from './components/RoiCalculator';
import PainPoints from './components/PainPoints';
import SwotAnalysis from './components/SwotAnalysis';
import Roadmap from './components/Roadmap';
import AuditForm from './components/AuditForm';
import { Sparkles, Heart, Globe, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedServices, setSelectedServices] = useState<string[]>(['seo', 'ppc']);

  // Handle adding/removing services to retainer
  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const handleClearServices = () => {
    setSelectedServices([]);
  };

  // Pre-select service and navigate
  const handleSelectServiceFromCTA = (serviceId: string) => {
    if (!selectedServices.includes(serviceId)) {
      setSelectedServices(prev => [...prev, serviceId]);
    }
    setActiveTab('services');
    
    // Smooth scroll to top of service tab section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030408] text-slate-100 flex flex-col font-sans relative overflow-hidden" id="app-root-container">
      {/* Background radial glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ambient-glow-1 rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] ambient-glow-2 rounded-full pointer-events-none z-0"></div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onRequestAudit={() => {
          setActiveTab('home');
          setTimeout(() => {
            const auditEl = document.getElementById('audit-tool');
            auditEl?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* Main Content Render */}
      <main className="flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            id={`tab-viewport-${activeTab}`}
          >
            {activeTab === 'home' && (
              <div className="space-y-16">
                <Hero 
                  onSelectService={handleSelectServiceFromCTA} 
                  onGoToProposal={() => setActiveTab('services')}
                />
                
                {/* Embedded Audit Form at the very bottom of Home for seamless funnel */}
                <div className="border-t border-slate-800/80 pt-12">
                  <AuditForm 
                    selectedServices={selectedServices}
                    onToggleService={handleToggleService}
                  />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <ServicePlanner 
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
                onClearServices={handleClearServices}
                onGoToProposalForm={() => {
                  setActiveTab('home');
                  setTimeout(() => {
                    const formEl = document.getElementById('proposal-form-container');
                    formEl?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              />
            )}

            {activeTab === 'roi' && (
              <RoiCalculator />
            )}

            {activeTab === 'painpoints' && (
              <PainPoints 
                onAddService={handleSelectServiceFromCTA}
                selectedServices={selectedServices}
              />
            )}

            {activeTab === 'swot' && (
              <SwotAnalysis />
            )}

            {activeTab === 'roadmap' && (
              <Roadmap />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate Professional Footer */}
      <footer className="border-t border-slate-900 bg-black/60 backdrop-blur-md py-12 z-10 relative" id="app-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-900 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500 text-black font-bold text-sm shadow-md shadow-cyan-500/20">
                  BM
                </div>
                <span className="font-display font-bold text-lg text-white">BoostMetrics</span>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
                Data-driven digital marketing and advertising agency focused on multiplying search visibility, lead conversions, and maximum return on investment.
              </p>
            </div>

            <div>
              <h5 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                Core Agency Competencies
              </h5>
              <ul className="space-y-2 text-xs text-slate-400 font-sans">
                <li className="hover:text-cyan-400 transition-colors">&bull; Search Engine Optimization (SEO)</li>
                <li className="hover:text-cyan-400 transition-colors">&bull; Pay-Per-Click Advertising (PPC)</li>
                <li className="hover:text-cyan-400 transition-colors">&bull; Conversion Rate Optimization (CRO)</li>
                <li className="hover:text-cyan-400 transition-colors">&bull; AI-Powered Marketing Automation</li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                Strategic Mission
              </h5>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                "To empower businesses with innovative digital marketing solutions that drive measurable growth, maximize return on investment, and build strong online brands."
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <span>&copy; 2026 BoostMetrics Digital. All Rights Reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
