import React from 'react';
import { TrendingUp, Activity, Sparkles, Zap, Phone } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestAudit: () => void;
}

export default function Header({ activeTab, setActiveTab, onRequestAudit }: HeaderProps) {
  const tabs = [
    { id: 'home', label: 'Home & Live Audit' },
    { id: 'services', label: 'Services & Retainer' },
    { id: 'roi', label: 'ROI Calculator' },
    { id: 'painpoints', label: 'Pain-Point Solver' },
    { id: 'swot', label: 'SWOT Strategy' },
    { id: 'roadmap', label: '2026-2028 Roadmap' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('home')}
          id="header-brand-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-400/40">
            <TrendingUp className="h-5.5 w-5.5 text-black font-extrabold" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Boost<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Metrics</span>
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-400/80">
              Data-Driven Growth
            </span>
          </div>
        </div>

        {/* Live Operations Indicator */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 rounded-full bg-cyan-950/40 px-3 py-1 text-cyan-400 border border-cyan-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-semibold tracking-wider uppercase text-[10px]">Agency Ready</span>
          </div>
          <div className="text-slate-700">|</div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>AI-Powered Insights Enabled</span>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRequestAudit}
            className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-md shadow-cyan-500/20 hover:shadow-cyan-400/40 active:scale-95 hover:brightness-110 transition-all duration-300 flex items-center gap-1.5"
            id="header-cta-audit"
          >
            <Sparkles className="h-4 w-4" />
            Get Free Proposal
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1.5 py-1.5 overflow-x-auto scrollbar-none" aria-label="Tabs" id="header-navigation-tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative shrink-0 rounded-md px-3 py-2 text-xs font-medium font-sans tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-cyan-400 shadow-sm border border-white/10 font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  id={`tab-btn-${tab.id}`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
