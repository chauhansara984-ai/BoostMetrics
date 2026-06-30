import React, { useState } from 'react';
import { SERVICES } from '../data/agencyData';
import { Service } from '../types';
import { Check, CheckCircle2, ChevronRight, FileText, HelpCircle, Landmark, Minus, Plus, Sparkles, Trash2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicePlannerProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onClearServices: () => void;
  onGoToProposalForm: () => void;
}

export default function ServicePlanner({
  selectedServices,
  onToggleService,
  onClearServices,
  onGoToProposalForm
}: ServicePlannerProps) {
  const [trafficGoal, setTrafficGoal] = useState<number>(25000); // visitors
  const [contractLength, setContractLength] = useState<number>(6); // months
  const [expandedService, setExpandedService] = useState<string | null>('seo');

  const selectedObjects = SERVICES.filter(s => selectedServices.includes(s.id));

  // Compute calculated values
  // Base cost = sum of selected services
  const baseCost = selectedObjects.reduce((acc, s) => acc + s.priceEstimate, 0);
  
  // Traffic scaling modifier: scaled linearly. Baseline is 10k visitors. Above 10k, scale operating efforts up.
  // E.g., for every 10k above 10k, add 5% operational overhead. Below 10k, subtract up to 10% discount.
  const trafficModifier = trafficGoal > 10000 
    ? 1 + ((trafficGoal - 10000) / 100000) * 0.4  // up to +40% cost for 100k visitors
    : 1 - ((10000 - trafficGoal) / 10000) * 0.15; // up to -15% cost for small volumes

  const subtotalBeforeDiscount = Math.round(baseCost * trafficModifier);
  
  // Contract discount: 3 months = 0%, 6 months = 10% discount, 12 months = 20% discount
  const discountPercent = contractLength === 12 ? 20 : contractLength === 6 ? 10 : 0;
  const discountAmount = Math.round(subtotalBeforeDiscount * (discountPercent / 100));
  const finalMonthlyEstimate = Math.max(0, subtotalBeforeDiscount - discountAmount);
  
  // Project quarterly/annual stats
  const annualTotalContractValue = finalMonthlyEstimate * contractLength;

  return (
    <div className="py-6 relative z-10" id="service-planner-container">
      {/* Introduction */}
      <div className="mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
          Interactive Service Retainer Builder
        </h2>
        <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
          Select individual digital marketing services to build a custom growth plan. Adjust contract terms and target traffic to instantly review real-time monthly agency price estimates, volume discounts, and deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Selector & Parameters */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Services List */}
          <div className="glass-panel border-white/5 rounded-xl p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide">
                1. Choose Core Campaign Services
              </h3>
              {selectedServices.length > 0 && (
                <button
                  onClick={onClearServices}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer font-mono uppercase"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear Selections
                </button>
              )}
            </div>

            <div className="space-y-3">
              {SERVICES.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const isExpanded = expandedService === service.id;

                return (
                  <div
                    key={service.id}
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                      isSelected 
                        ? 'border-cyan-500 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.05)]' 
                        : 'border-white/5 hover:border-white/10 bg-white/5'
                    }`}
                  >
                    {/* Header Row */}
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer select-none"
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleService(service.id);
                          }}
                          className={`flex h-5 w-5 items-center justify-center rounded border cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-cyan-500 border-cyan-500 text-black shadow-sm' 
                              : 'border-white/20 bg-black/40 hover:border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="font-sans text-xs font-bold text-cyan-400 tracking-wider uppercase font-mono block">
                            {service.category}
                          </span>
                          <h4 className="font-display text-sm font-bold text-white leading-tight mt-0.5">
                            {service.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-300 bg-white/10 px-2.5 py-1 rounded-full font-semibold">
                          Est. ${service.priceEstimate}/mo
                        </span>
                        <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-black/40 border-t border-white/5"
                        >
                          <div className="p-4 space-y-4 text-xs">
                            <p className="text-slate-300 font-sans leading-relaxed">
                              {service.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                              {/* Left: Key Features */}
                              <div>
                                <h5 className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest mb-2.5">
                                  Scope of Work Deliverables
                                </h5>
                                <ul className="space-y-1.5 text-slate-300 font-sans">
                                  {service.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-1.5">
                                      <span className="text-cyan-400 font-bold shrink-0">&bull;</span>
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Right: Key Benefits */}
                              <div>
                                <h5 className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest mb-2.5">
                                  Strategic Growth Impact
                                </h5>
                                <ul className="space-y-2 font-sans text-slate-300">
                                  {service.benefits.map((benefit, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2 bg-cyan-950/30 text-cyan-200 p-2 rounded-lg border border-cyan-500/10">
                                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Parameters & Scaling */}
          <div className="glass-panel border-white/5 rounded-xl p-5 shadow-2xl space-y-6">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide border-b border-white/5 pb-3">
              2. Adjust Scale & Engagement Parameters
            </h3>

            {/* Slider: Monthly Traffic Goal */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-200 font-sans flex items-center gap-1">
                  <span>Target Monthly Traffic Capacity</span>
                  <div className="group relative">
                    <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 rounded bg-slate-950 p-2.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none leading-normal font-sans shadow-xl border border-white/10">
                      Higher traffic goals require scaling content production volumes and monitoring paid campaign bidding closely.
                    </span>
                  </div>
                </label>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {trafficGoal.toLocaleString()} unique visitors / mo
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="100000"
                step="2000"
                value={trafficGoal}
                onChange={(e) => setTrafficGoal(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                <span>2,000 visitors (Low Scale)</span>
                <span>100,000 visitors (Enterprise Scale)</span>
              </div>
            </div>

            {/* Selector: Contract Length / Duration */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-semibold text-slate-200 font-sans">
                  Contract Term & Retainer Length
                </label>
                {discountPercent > 0 && (
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    -{discountPercent}% Term Discount Applied
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[3, 6, 12].map((months) => {
                  const isSelected = contractLength === months;
                  const discount = months === 12 ? 'Save 20%' : months === 6 ? 'Save 10%' : 'No discount';
                  
                  return (
                    <button
                      key={months}
                      onClick={() => setContractLength(months)}
                      className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-display font-bold">
                        {months} Months
                      </span>
                      <span className="font-mono text-[9px] text-slate-500 uppercase mt-0.5 font-bold">
                        {discount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Price Summary & SLA Proposal */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="glass-panel border-white/5 text-white rounded-xl p-6 shadow-2xl relative overflow-hidden">
            {/* Ambient detail */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <h3 className="font-display text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Landmark className="h-4 w-4 text-cyan-400" />
              Retainer Investment Summary
            </h3>

            {/* Large Price Display */}
            <div className="border-b border-white/5 pb-5 mb-5 text-center sm:text-left">
              <span className="font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest block font-bold">
                ESTIMATED MONTHLY AGENCY INVESTMENT
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-1">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  ${finalMonthlyEstimate.toLocaleString()}
                </span>
                <span className="font-mono text-sm text-slate-400 uppercase">
                  / month
                </span>
              </div>
              
              {discountPercent > 0 && (
                <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Saves ${(discountAmount).toLocaleString()}/mo with {contractLength}M contract</span>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 border-b border-white/5 pb-5 mb-5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Selected Services ({selectedServices.length}):</span>
                <span className="text-white font-semibold">${baseCost.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Traffic Scale Factor:</span>
                <span className="text-white font-semibold">x{trafficModifier.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Term Discount Applied:</span>
                <span className="text-emerald-400 font-semibold">-{discountPercent}%</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2 text-sm text-slate-300 font-bold">
                <span>Contract Period:</span>
                <span className="text-white">{contractLength} Months</span>
              </div>
              <div className="flex justify-between text-sm text-slate-300 font-bold">
                <span>Total Contract Value:</span>
                <span className="text-cyan-400 font-bold">${annualTotalContractValue.toLocaleString()}</span>
              </div>
            </div>

            {/* Live Document Preview */}
            <div className="bg-black/40 rounded-lg p-3 border border-white/5 mb-5">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-2 font-bold">
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Generated Service Level Agreement Outline</span>
              </div>
              <div className="font-mono text-[10px] text-slate-300 space-y-1.5 leading-relaxed max-h-36 overflow-y-auto">
                <div>&bull; <strong className="text-slate-200">SLA Standard</strong>: 24/7 client communication & continuous visual metrics reporting portal.</div>
                <div>&bull; <strong className="text-slate-200">Optimization Loop</strong>: Bi-weekly analytics updates, negative bidding revisions, structural web cleanups.</div>
                <div>&bull; <strong className="text-slate-200">Selected Services Scope</strong>:</div>
                {selectedObjects.length === 0 ? (
                  <div className="text-rose-400 italic font-semibold ml-3">No core services selected. Please select services above.</div>
                ) : (
                  selectedObjects.map(s => (
                    <div key={s.id} className="ml-3 text-cyan-400/90 font-bold">&bull; {s.name}</div>
                  ))
                )}
                <div>&bull; <strong className="text-slate-200">Growth Guarantee</strong>: Full attribution reports outlining conversion value performance against ad spends.</div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <button
              onClick={onGoToProposalForm}
              disabled={selectedServices.length === 0}
              className={`w-full rounded-lg py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
                selectedServices.length === 0
                  ? 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:brightness-110 active:scale-95 cursor-pointer'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Finalize Proposal Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
