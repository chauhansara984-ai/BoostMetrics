import React, { useState } from 'react';
import { ProposalRequest, Service } from '../types';
import { SERVICES } from '../data/agencyData';
import { FileText, Mail, Building2, Globe, DollarSign, Sparkles, Send, Download, CheckCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuditFormProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

export default function AuditForm({ selectedServices, onToggleService }: AuditFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState<number>(3000);
  const [targetAudience, setTargetAudience] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalHtml, setProposalHtml] = useState<string | null>(null);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail || !websiteUrl) return;

    setIsSubmitting(true);

    // Simulate standard compiler delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      const chosenServices = SERVICES.filter(s => selectedServices.includes(s.id));
      const chosenNames = chosenServices.length > 0 
        ? chosenServices.map(s => s.name)
        : ['Full-Service Brand Discovery & Technical SEO Audit'];

      // Generate a gorgeous dynamic print proposal text
      setProposalHtml(`
        <div class="space-y-6 text-slate-200">
          <!-- Document Header -->
          <div class="flex justify-between items-start border-b border-white/10 pb-5">
            <div>
              <span class="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase block mb-1">PROPOSAL ID: BM-2026-9482</span>
              <h4 class="text-xl font-display font-extrabold text-white">Digital Growth Campaign & SLA</h4>
              <p class="text-xs text-slate-400 font-sans mt-1">Prepared for: <strong class="text-white">${companyName}</strong> (${websiteUrl})</p>
            </div>
            <div class="text-right font-mono text-xs">
              <span class="font-bold text-white">BoostMetrics Agency</span><br/>
              <span class="text-slate-400">Date: June 30, 2026</span>
            </div>
          </div>

          <!-- Executive Summary -->
          <div class="space-y-2">
            <h5 class="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest">1. Strategic Vision</h5>
            <p class="text-xs font-sans text-slate-300 leading-relaxed">
              BoostMetrics is pleased to submit this operational proposal to partner with <strong>${companyName}</strong>. Our core mandate is to deploy data-driven strategies that expand online lead generation, lower Customer Acquisition Costs (CAC), and maximize your return on ad spend.
            </p>
          </div>

          <!-- Selected Deliverables -->
          <div class="space-y-3">
            <h5 class="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest">2. Scope of Campaign Deliverables</h5>
            <div class="grid grid-cols-1 gap-2 text-xs font-sans">
              ${chosenServices.map(s => `
                <div class="bg-black/30 border border-white/5 rounded-lg p-3">
                  <span class="font-mono text-[9px] font-bold text-cyan-400 uppercase block">${s.category} SERVICE</span>
                  <strong class="text-white block mt-0.5">${s.name}</strong>
                  <p class="text-[11px] text-slate-300 mt-1 leading-normal">${s.description}</p>
                </div>
              `).join('')}
              ${chosenServices.length === 0 ? `
                <div class="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <strong class="text-amber-400 text-xs block mb-1">Audit Discovery Retainer</strong>
                  <p class="text-[11px] text-amber-300 leading-normal">
                    Since no custom modules are pre-selected, BoostMetrics will initiate a 30-day comprehensive brand audit and technical web optimization crawl to structure target campaigns.
                  </p>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Pricing & Terms -->
          <div class="space-y-3 pt-2">
            <h5 class="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest">3. Financial Investment Structures</h5>
            <table class="w-full text-xs font-mono border-collapse">
              <thead>
                <tr class="border-b border-white/10 text-left text-[10px] text-slate-450">
                  <th class="py-1 text-slate-400">Core Retainer Component</th>
                  <th class="py-1 text-right text-slate-400">Target Allocation / mo</th>
                </tr>
              </thead>
              <tbody>
                ${chosenServices.map(s => `
                  <tr class="border-b border-white/5 text-slate-300">
                    <td class="py-2">${s.name}</td>
                    <td class="py-2 text-right font-bold text-white">$${s.priceEstimate.toLocaleString()}</td>
                  </tr>
                `).join('')}
                ${chosenServices.length === 0 ? `
                  <tr class="border-b border-white/5 text-slate-300">
                    <td class="py-2">Baseline Technical Auditing Retainer</td>
                    <td class="py-2 text-right font-bold text-white">$1,200</td>
                  </tr>
                ` : ''}
                <tr class="text-white font-bold bg-white/5">
                  <td class="py-2.5 px-2">Total Proposed Monthly Investment:</td>
                  <td class="py-2.5 px-2 text-right text-cyan-400 font-extrabold">$${(chosenServices.reduce((a, s) => a + s.priceEstimate, 0) || 1200).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Service SLA Guarantees -->
          <div class="space-y-2">
            <h5 class="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest">4. Service Level Guarantees</h5>
            <ul class="list-disc pl-4 text-[11px] text-slate-305 text-slate-300 font-sans space-y-1 leading-relaxed">
              <li>Bi-Weekly campaign metrics report with complete multi-touch attribution.</li>
              <li>Dedicated Slack/Email thread with under 4-hour business day response latency.</li>
              <li>Ongoing technical keyword auditing adjustments at zero marginal cost.</li>
            </ul>
          </div>

          <!-- Signature Block -->
          <div class="border-t border-white/10 pt-6 mt-6">
            <div class="grid grid-cols-2 gap-8 text-[11px] font-sans text-slate-400">
              <div class="space-y-3">
                <span>Accepted by (Client Authorized):</span>
                <div class="border-b border-white/10 h-8"></div>
                <div class="font-mono text-[9px] text-slate-500">Authorized Officer &bull; Zenith</div>
              </div>
              <div class="space-y-3 text-right">
                <span>Endorsed by (BoostMetrics Agency):</span>
                <div class="h-8 font-serif italic text-cyan-450 text-cyan-400 text-base flex items-end justify-end">Sarah Chauhan</div>
                <div class="border-b border-white/10"></div>
                <div class="font-mono text-[9px] text-slate-500">Chief Executive &bull; BoostMetrics</div>
              </div>
            </div>
          </div>
        </div>
      `);
    }, 1500);
  };

  const handleResetForm = () => {
    setProposalHtml(null);
    setCompanyName('');
    setContactEmail('');
    setWebsiteUrl('');
    setTargetAudience('');
  };

  return (
    <div className="py-6 relative z-10" id="proposal-form-container">
      {/* Introduction */}
      <div className="mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
          Request Personalized Growth Proposal
        </h2>
        <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
          Ready to supercharge your digital presence? Fill in your target business details below to instantly compile a professional digital campaign proposal and Service Level Agreement (SLA) custom-tailored to your marketing requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs Form */}
        <div className="lg:col-span-5 glass-panel border-white/5 rounded-xl p-5 shadow-2xl text-white">
          <AnimatePresence mode="wait">
            {!proposalHtml ? (
              <motion.form
                key="form-inputs"
                onSubmit={handleSubmitRequest}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Field 1: Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 font-sans mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Zenith Tech"
                      className="block w-full pl-9 pr-3 py-2 text-xs bg-black/30 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-sans"
                    />
                  </div>
                </div>

                {/* Field 2: Contact Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 font-sans mb-1.5">
                    Contact Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. growth@company.com"
                      className="block w-full pl-9 pr-3 py-2 text-xs bg-black/30 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-sans"
                    />
                  </div>
                </div>

                {/* Field 3: Website URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 font-sans mb-1.5">
                    Website Domain
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
                      <Globe className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="e.g. www.zenith.com"
                      className="block w-full pl-9 pr-3 py-2 text-xs bg-black/30 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-sans"
                    />
                  </div>
                </div>

                {/* Field 4: Custom Target Audience description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 font-sans mb-1.5">
                    Target Customers & Campaign Goals
                  </label>
                  <textarea
                    rows={3}
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. We want to target local real estate agencies to capture listings..."
                    className="block w-full p-3 text-xs bg-black/30 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-sans"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold py-2.5 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/10 hover:brightness-110 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Compiling Corporate SLA...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Generate Campaign Proposal</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg mb-2">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="font-display text-base font-bold text-white leading-tight">
                  Proposal Compiled Successfully
                </h3>
                <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto leading-relaxed">
                  Your customized campaign framework and digital marketing SLA has been generated. Review the document on the right panel.
                </p>
                <button
                  onClick={handleResetForm}
                  className="rounded bg-white/5 hover:bg-white/10 border border-white/5 text-white font-semibold text-xs py-2 px-4 cursor-pointer transition-all"
                >
                  Compile New Proposal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Render printable proposal block */}
        <div className="lg:col-span-7">
          <div className="glass-panel border-white/5 p-6 sm:p-8 rounded-xl shadow-2xl relative min-h-[400px]">
            {/* Subtle background detail to make it look like paper */}
            <div className="absolute top-0 right-0 left-0 bg-cyan-500/10 border-b border-cyan-500/20 rounded-t-xl h-1"></div>

            <AnimatePresence mode="wait">
              {proposalHtml ? (
                <motion.div
                  key="proposal-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="prose prose-sm max-w-none text-slate-200"
                >
                  <div dangerouslySetInnerHTML={{ __html: proposalHtml }} />
                </motion.div>
              ) : (
                <motion.div
                  key="proposal-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[350px] flex flex-col items-center justify-center text-center text-slate-400 p-6"
                >
                  <FileText className="h-10 w-10 text-cyan-400 mb-3 animate-pulse" />
                  <h4 className="font-display text-sm font-bold text-white">Proposal Document Idle</h4>
                  <p className="text-[11px] font-sans text-slate-300 max-w-xs mt-1.5 leading-relaxed">
                    Once you fill in your corporate details and click "Generate Campaign Proposal" on the left, your customized business SLA outline will compile here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
