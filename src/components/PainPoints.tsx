import React, { useState } from 'react';
import { PAIN_POINTS } from '../data/agencyData';
import { PainPoint } from '../types';
import { HelpCircle, Sparkles, CheckCircle, Flame, ArrowRight, ShieldAlert, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PainPointsProps {
  onAddService: (serviceId: string) => void;
  selectedServices: string[];
}

export default function PainPoints({ onAddService, selectedServices }: PainPointsProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<string>(PAIN_POINTS[0].challenge);

  const activeItem = PAIN_POINTS.find(item => item.challenge === selectedChallenge) || PAIN_POINTS[0];

  return (
    <div className="py-6 relative z-10" id="pain-points-container">
      {/* Introduction */}
      <div className="mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
          Your Business Pain-Points & Solutions
        </h2>
        <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
          Every company faces unique digital road blocks. Select a common customer challenge below to explore how BoostMetrics replaces friction with data-driven strategic frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Challenges List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest block mb-1">
            Select a Pain Point
          </span>
          <div className="space-y-2">
            {PAIN_POINTS.map((item, idx) => {
              const isSelected = item.challenge === selectedChallenge;
              const hasService = selectedServices.includes(item.serviceId);

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedChallenge(item.challenge)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                      : 'border-white/5 bg-white/5 text-slate-300 hover:border-white/10 hover:text-white'
                  }`}
                  id={`painpoint-item-${idx}`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold font-sans">
                      {item.challenge}
                    </span>
                  </div>
                  {hasService && (
                    <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Solution Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tailored Solution Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.challenge}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-panel border-white/5 rounded-xl p-6 shadow-2xl space-y-6 text-white"
            >
              {/* Challenge Header */}
              <div className="border-b border-white/5 pb-4">
                <span className="font-mono text-[9px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-full px-2.5 py-0.5 uppercase tracking-widest inline-block mb-2">
                  Identified Challenge
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                  {activeItem.challenge}
                </h3>
              </div>

              {/* Solution Body */}
              <div className="space-y-4">
                {/* Proposed Solution */}
                <div>
                  <span className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest block mb-1.5">
                    BoostMetrics Systematic Solution
                  </span>
                  <div className="flex items-start gap-2.5 bg-cyan-950/20 border border-cyan-500/10 rounded-lg p-3.5">
                    <Zap className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                    <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed font-semibold">
                      {activeItem.solution}
                    </p>
                  </div>
                </div>

                {/* Business Impact & Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest block mb-1">
                      Business Growth Impact
                    </span>
                    <p className="text-xs font-sans text-slate-300 leading-relaxed">
                      {activeItem.impact}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest block mb-1">
                      Resolution Complexity
                    </span>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`inline-block h-2 w-2 rounded-full ${
                        activeItem.difficulty === 'High' ? 'bg-amber-500' : activeItem.difficulty === 'Medium' ? 'bg-cyan-400' : 'bg-slate-400'
                      }`} />
                      <span className="text-xs font-mono font-semibold text-slate-300">
                        {activeItem.difficulty} Complexity Implementation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Associated Service Integration Call-to-Action */}
              <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 font-sans text-center sm:text-left">
                  This pain-point is resolved by our{' '}
                  <strong className="text-white font-bold">
                    {activeItem.serviceId.toUpperCase()}
                  </strong>{' '}
                  module packages.
                </div>

                <button
                  onClick={() => onAddService(activeItem.serviceId)}
                  className={`w-full sm:w-auto rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedServices.includes(activeItem.serviceId)
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:brightness-110 active:scale-95 shadow-md shadow-cyan-500/10'
                  }`}
                >
                  {selectedServices.includes(activeItem.serviceId) ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Service Added to Retainer</span>
                    </>
                  ) : (
                    <>
                      <span>Integrate Solution Service</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
