import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, ArrowRight, CheckCircle, Flame, ShieldCheck, Percent, HelpCircle } from 'lucide-react';

export default function RoiCalculator() {
  // Input states
  const [monthlyBudget, setMonthlyBudget] = useState<number>(3000); // $500 - $10,000
  const [currentTraffic, setCurrentTraffic] = useState<number>(5000); // 100 - 50,000
  const [currentConvRate, setCurrentConvRate] = useState<number>(1.2); // 0.1% - 10.0%
  const [averageOrderValue, setAverageOrderValue] = useState<number>(150); // $10 - $1,000

  // Calculation Logic (Simulating BoostMetrics' performance optimization)
  // 1. Traffic growth from PPC + SEO spend:
  // Each dollar of PPC typically generates, say, 0.4 unique visitor depending on sector.
  // SEO optimization boosts baseline traffic organic multipliers.
  // Projected traffic is current traffic + visitors bought via PPC + SEO compound traffic bump.
  const adTrafficMultiplier = 0.55; // visitor per dollar spent
  const boughtTraffic = monthlyBudget * adTrafficMultiplier;
  const organicSeoBoost = currentTraffic * 0.45; // +45% organic growth via technical SEO
  const projectedTraffic = Math.round(currentTraffic + boughtTraffic + organicSeoBoost);

  // 2. Conversion Rate Lift via CRO:
  // BoostMetrics' conversion rate optimization typical lift factor is 1.45x (min 0.5% gain, capped at 12%)
  const croMultiplier = 1.55; // +55% conversion rate improvement
  const projectedConvRate = Math.min(12, Math.max(currentConvRate + 0.6, parseFloat((currentConvRate * croMultiplier).toFixed(2))));

  // 3. Output Calculations:
  // Current performance
  const currentMonthlyLeads = Math.round(currentTraffic * (currentConvRate / 100));
  const currentMonthlyRevenue = Math.round(currentMonthlyLeads * averageOrderValue);

  // Projected performance
  const projectedMonthlyLeads = Math.round(projectedTraffic * (projectedConvRate / 100));
  const projectedMonthlyRevenue = Math.round(projectedMonthlyLeads * averageOrderValue);

  // Growth performance
  const incrementalLeads = Math.max(0, projectedMonthlyLeads - currentMonthlyLeads);
  const incrementalRevenue = Math.max(0, projectedMonthlyRevenue - currentMonthlyRevenue);
  
  // Return on Investment: (Net Profit / Investment) * 100
  const monthlyNetProfit = incrementalRevenue - monthlyBudget;
  const projectedRoi = monthlyBudget > 0 
    ? Math.round((monthlyNetProfit / monthlyBudget) * 100) 
    : 0;

  return (
    <div className="py-6 relative z-10" id="roi-calculator-container">
      {/* Introduction */}
      <div className="mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
          Campaign Performance & ROI Calculator
        </h2>
        <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
          See the direct math behind our ROI-focused approach. Slide your budget and current website performance indicators to calculate how our SEO traffic compounding and CRO conversion optimization translate to actual incremental bottom-line revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Sliders Form */}
        <div className="lg:col-span-6 glass-panel border-white/5 rounded-xl p-5 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-2">
            <Calculator className="h-5 w-5 text-cyan-400 animate-pulse" />
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide">
              1. Your Marketing Indicators
            </h3>
          </div>

          {/* Slider 1: Monthly Marketing Budget */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 font-sans flex items-center gap-1">
                <span>Proposed Marketing Budget</span>
                <HelpCircle className="h-3.5 w-3.5 text-slate-400 cursor-help" title="Your budget used for PPC ad buy + SEO retention retainer" />
              </label>
              <span className="font-mono text-xs font-bold text-cyan-400">
                ${monthlyBudget.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              step="500"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>$500</span>
              <span>$15,000</span>
            </div>
          </div>

          {/* Slider 2: Current Traffic */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 font-sans">
                Current Monthly Website Traffic
              </label>
              <span className="font-mono text-xs font-bold text-cyan-400">
                {currentTraffic.toLocaleString()} unique visitors
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="50000"
              step="200"
              value={currentTraffic}
              onChange={(e) => setCurrentTraffic(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>200 visitors</span>
              <span>50,000 visitors</span>
            </div>
          </div>

          {/* Slider 3: Current Conversion Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 font-sans">
                Current Conversion Rate
              </label>
              <span className="font-mono text-xs font-bold text-cyan-400">
                {currentConvRate}% of traffic converts
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.1"
              value={currentConvRate}
              onChange={(e) => setCurrentConvRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>0.1% (Low)</span>
              <span>10.0% (High)</span>
            </div>
          </div>

          {/* Slider 4: Average Order Value / Lead Value */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 font-sans">
                Average Value per Customer Lead
              </label>
              <span className="font-mono text-xs font-bold text-cyan-400">
                ${averageOrderValue.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>$10</span>
              <span>$2,000</span>
            </div>
          </div>
        </div>

        {/* Right: Results Dashboard & SVG Chart */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Results Board */}
          <div className="glass-panel border-white/5 text-white rounded-xl p-6 shadow-2xl relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 h-28 w-28 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <h3 className="font-display text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                Growth Projections
              </h3>
              <div className="rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-wider">
                ROI PROJECTION: {projectedRoi > 0 ? `+${projectedRoi}%` : `${projectedRoi}%`}
              </div>
            </div>

            {/* Incremental Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 border border-white/5 rounded-lg p-3.5 text-center">
                <span className="text-[9px] font-bold font-mono text-cyan-400/80 uppercase tracking-wider block mb-1">
                  Traffic Compounded
                </span>
                <span className="font-display text-lg font-extrabold text-cyan-400">
                  {projectedTraffic.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  was {currentTraffic.toLocaleString()}
                </span>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-lg p-3.5 text-center">
                <span className="text-[9px] font-bold font-mono text-emerald-400/80 uppercase tracking-wider block mb-1">
                  CRO Target Lift
                </span>
                <span className="font-display text-lg font-extrabold text-emerald-400">
                  {projectedConvRate}%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  was {currentConvRate}%
                </span>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-lg p-3.5 text-center">
                <span className="text-[9px] font-bold font-mono text-amber-400/80 uppercase tracking-wider block mb-1">
                  Incremental Leads
                </span>
                <span className="font-display text-lg font-extrabold text-amber-400">
                  +{incrementalLeads} / mo
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Total: {projectedMonthlyLeads}
                </span>
              </div>
            </div>

            {/* Large Value Metrics: Current vs Projected Revenue */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5 mb-5">
              <div>
                <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                  Current Revenue
                </span>
                <span className="font-display text-xl font-bold text-slate-300">
                  ${currentMonthlyRevenue.toLocaleString()} <span className="text-[10px] text-slate-500 font-mono">/mo</span>
                </span>
              </div>
              <div>
                <span className="text-[9px] font-bold font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">
                  Projected Revenue
                </span>
                <span className="font-display text-xl font-extrabold text-white">
                  ${projectedMonthlyRevenue.toLocaleString()} <span className="text-[10px] text-cyan-400 font-mono">/mo</span>
                </span>
              </div>
            </div>

            {/* Custom High-Fidelity SVG Bar Chart comparing Current vs Projected revenue and Net Profits */}
            <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-5">
              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-3 text-center">
                Monthly Net Business Yield (USD)
              </span>
              
              <div className="h-32 flex items-end justify-around px-4">
                {/* Bar 1: Current Revenue */}
                <div className="flex flex-col items-center gap-1.5 w-20">
                  <div className="text-[10px] font-mono text-slate-400">${currentMonthlyRevenue.toLocaleString()}</div>
                  <div 
                    className="w-8 bg-slate-600 rounded-t transition-all duration-500"
                    style={{ 
                      height: `${Math.max(12, Math.min(80, (currentMonthlyRevenue / (projectedMonthlyRevenue || 1)) * 80))}px` 
                    }}
                  ></div>
                  <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider text-center">Current</div>
                </div>

                {/* Bar 2: Marketing Budget */}
                <div className="flex flex-col items-center gap-1.5 w-20">
                  <div className="text-[10px] font-mono text-rose-400">${monthlyBudget.toLocaleString()}</div>
                  <div 
                    className="w-8 bg-rose-600 rounded-t transition-all duration-500"
                    style={{ 
                      height: `${Math.max(12, Math.min(80, (monthlyBudget / (projectedMonthlyRevenue || 1)) * 80))}px` 
                    }}
                  ></div>
                  <div className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-wider text-center">Ad Budget</div>
                </div>

                {/* Bar 3: Projected Revenue */}
                <div className="flex flex-col items-center gap-1.5 w-20">
                  <div className="text-[10px] font-mono text-cyan-400">${projectedMonthlyRevenue.toLocaleString()}</div>
                  <div 
                    className="w-8 bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-t transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    style={{ height: '80px' }}
                  ></div>
                  <div className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-wider text-center">Projected</div>
                </div>
              </div>
            </div>

            {/* Tactical Explainer text */}
            <div className="flex items-start gap-2.5 bg-cyan-950/20 border border-cyan-500/10 rounded-lg p-3 text-[11px] text-slate-300 font-sans leading-normal">
              <Flame className="h-4 w-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
              <p>
                By compounding an organic traffic lift with conversion rate tweaks, BoostMetrics increases customer conversion probability. This avoids buying expensive cold ads repeatedly and scales revenue without leaking ad spends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
