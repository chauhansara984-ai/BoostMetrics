import React, { useState } from 'react';
import { SWOT_ITEMS } from '../data/agencyData';
import { SwotItem } from '../types';
import { ShieldCheck, ShieldAlert, Sparkles, TrendingUp, ChevronRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SwotAnalysis() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'strength' | 'weakness' | 'opportunity' | 'threat'>('all');
  const [selectedItem, setSelectedItem] = useState<SwotItem | null>(SWOT_ITEMS[0]);

  const categories = [
    { id: 'all', label: 'All Indicators' },
    { id: 'strength', label: 'Strengths', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'weakness', label: 'Weaknesses', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'opportunity', label: 'Opportunities', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 'threat', label: 'Threats', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  ];

  const filteredItems = activeCategory === 'all'
    ? SWOT_ITEMS
    : SWOT_ITEMS.filter(item => item.type === activeCategory);

  const getSwotTypeStyles = (type: string) => {
    switch(type) {
      case 'strength': return { label: 'Strength', icon: Award, textClass: 'text-emerald-400', bgClass: 'bg-emerald-500/10' };
      case 'weakness': return { label: 'Weakness', icon: ShieldAlert, textClass: 'text-amber-400', bgClass: 'bg-amber-500/10' };
      case 'opportunity': return { label: 'Opportunity', icon: Sparkles, textClass: 'text-cyan-400', bgClass: 'bg-cyan-500/10' };
      case 'threat': return { label: 'Threat', icon: TrendingUp, textClass: 'text-rose-400', bgClass: 'bg-rose-500/10' };
      default: return { label: 'SWOT', icon: Award, textClass: 'text-slate-400', bgClass: 'bg-white/5' };
    }
  };

  return (
    <div className="py-6 relative z-10" id="swot-analysis-container">
      {/* Introduction */}
      <div className="mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
          Agency Strategic SWOT Analysis
        </h2>
        <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
          An honest, metrics-first evaluation of the digital marketing landscape. Explore our agency strengths, vulnerabilities, market opportunities, and external threats, together with our systematic strategic counter-actions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6" id="swot-category-filters">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                // Pre-select first item of newly selected category
                const matches = cat.id === 'all' ? SWOT_ITEMS : SWOT_ITEMS.filter(i => i.type === cat.id);
                if (matches.length > 0) setSelectedItem(matches[0]);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold border transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Grid list of items */}
        <div className="lg:col-span-6 space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
          {filteredItems.map((item, idx) => {
            const isSelected = selectedItem?.title === item.title;
            const meta = getSwotTypeStyles(item.type);
            const IconComponent = meta.icon;

            return (
              <div
                key={idx}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between select-none ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.1)] text-cyan-400'
                    : 'border-white/5 bg-white/5 text-white hover:border-white/10 hover:bg-white/10'
                }`}
                id={`swot-item-${item.type}-${idx}`}
              >
                <div className="flex gap-3">
                  <div className={`h-8 w-8 rounded-lg ${meta.bgClass} flex items-center justify-center shrink-0 mt-0.5`}>
                    <IconComponent className={`h-4.5 w-4.5 ${meta.textClass}`} />
                  </div>
                  <div>
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-wider block ${meta.textClass}`}>
                      {meta.label}
                    </span>
                    <h4 className={`font-display text-sm font-bold leading-tight mt-0.5 ${isSelected ? 'text-white' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ChevronRight className={`h-4 w-4 text-slate-400 mt-2 shrink-0 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic strategic analysis display */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-panel border-white/5 text-white rounded-xl p-6 shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      selectedItem.type === 'strength' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      selectedItem.type === 'weakness' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                      selectedItem.type === 'opportunity' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                      'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                      {selectedItem.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-3 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-5 space-y-3">
                  <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                    BoostMetrics Tactical Action Response
                  </span>
                  
                  <div className="bg-black/40 rounded-lg p-4 border border-white/5 shadow-inner">
                    <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed font-semibold">
                      {selectedItem.actionableStrategy}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono text-center pt-2">
                  Systematic counter-action maps to Goal Milestones (2026-2028).
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel border-white/5 border-dashed rounded-xl p-10 text-center text-slate-400 text-xs">
                Select an item on the left to view deep strategic response guidelines.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
