import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Globe, Activity, ShieldCheck, CheckCircle, 
  ArrowRight, AlertCircle, RefreshCw, BarChart3, Users, Landmark, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuditReport } from '../types';

interface HeroProps {
  onSelectService: (serviceId: string) => void;
  onGoToProposal: () => void;
}

export default function Hero({ onSelectService, onGoToProposal }: HeroProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessType, setBusinessType] = useState('ecommerce');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [report, setReport] = useState<AuditReport | null>(null);

  const agencyStats = [
    { label: 'Data-Driven USP', value: '100% Attribution', desc: 'No marketing guesswork' },
    { label: 'Growth Target', value: '3x ROI Focus', desc: 'Maximizing digital spends' },
    { label: 'Expert Guidance', value: '24/7 Portal Support', desc: 'Dedicated campaign strategists' },
    { label: 'Service Coverage', value: 'Full-Stack Solutions', desc: 'SEO, PPC, CRO & Dev' },
  ];

  const auditSteps = [
    { progress: 15, text: 'Resolving domain name server and crawling robots.txt...' },
    { progress: 35, text: 'Auditing page titles, meta descriptions, and header hierarchy...' },
    { progress: 55, text: 'Simulating Core Web Vitals and measuring Time to First Byte (TTFB)...' },
    { progress: 75, text: 'Evaluating SSL certificates, HTTPS redirects, and security headers...' },
    { progress: 90, text: 'Clustering semantic keywords and analyzing mobile-responsiveness...' },
    { progress: 100, text: 'Compiling structural growth metrics report...' }
  ];

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) return;

    // Normalize URL
    let formattedUrl = websiteUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setIsAuditing(true);
    setAuditProgress(0);
    setReport(null);

    // Simulate audit progression
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < auditSteps.length) {
        setAuditProgress(auditSteps[currentStep].progress);
        setProgressText(auditSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Generate dynamic mock report based on URL & business sector
        const cleanDomain = formattedUrl.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
        
        // Seeded values based on string length to make it deterministic but responsive
        const seed = cleanDomain.length;
        const seoScore = Math.floor(65 + (seed % 25)); // 65 - 90
        const performanceScore = Math.floor(55 + ((seed * 3) % 35)); // 55 - 90
        const mobileFriendly = (seed % 3) !== 0;
        const isSecure = (seed % 5) !== 0;

        const issues: string[] = [];
        const recommendations: string[] = [];
        const preselectedServices: string[] = [];

        // Dynamic audits based on business sector
        if (businessType === 'ecommerce') {
          issues.push('Missing OpenGraph schemas for product listings');
          issues.push('Slow visual layout shifts on product gallery pages (CLS > 0.25)');
          issues.push('Abandoned cart email automation flows are not integrated');
          
          recommendations.push('Implement product schema markups & rich Snippets to capture organic buyers (SEO)');
          recommendations.push('Optimize landing pages and deploy Conversion Rate Optimization scripts (CRO)');
          recommendations.push('Integrate automated email nurture loops and abandoned cart triggers (Email Marketing)');
        } else if (businessType === 'local') {
          issues.push('Google Business Profile is unverified or lacks local keywords');
          issues.push('Duplicate heading tags (Multiple H1 blocks) causing index confusion');
          issues.push('No call-to-action touch targets on mobile viewports');
          
          recommendations.push('Execute local citation campaigns and map pack keyword optimization (SEO)');
          recommendations.push('Refactor website structure for responsive mobile speed optimization (Web Dev)');
          recommendations.push('Launch targeted, geo-gated hyper-local paid Google search ads (PPC)');
        } else if (businessType === 'saas') {
          issues.push('LCP (Largest Contentful Paint) is elevated at 3.4 seconds');
          issues.push('Conversion funnel tracking codes are firing duplicate purchase pixels');
          issues.push('Low search ranking for competitive top-of-funnel comparative keywords');
          
          recommendations.push('Perform heavy core web vital optimization and code minification (Web Dev)');
          recommendations.push('Redesign subscription checkout flows to eliminate user friction (CRO)');
          recommendations.push('Develop targeted search campaigns for long-tail high-intent terms (PPC)');
        } else {
          issues.push('Meta descriptions exceed length standards or are completely empty');
          issues.push('Lack of structural whitepapers or high-quality downloadable lead assets');
          issues.push('SSL certificate is present but security headers (HSTS) are absent');
          
          recommendations.push('Rewrite meta text data across critical landing layouts (SEO)');
          recommendations.push('Author premium lead-magnet guides to scale prospect subscriptions (Content Marketing)');
          recommendations.push('Integrate automated newsletter nurture funnels to build repeat customer interest (Email Marketing)');
        }

        if (!isSecure) {
          issues.push('Insecure connection fallback - HTTP is not forcefully redirected to HTTPS');
          recommendations.push('Configure SSL server redirects and HSTS security policies (Web Dev)');
        }

        setReport({
          websiteUrl: cleanDomain,
          seoScore,
          performanceScore,
          mobileFriendly,
          securityStatus: isSecure ? 'Secure' : 'Warning',
          issuesFound: issues,
          recommendations
        });
        setIsAuditing(false);
      }
    }, 700);
  };

  const resetAudit = () => {
    setReport(null);
    setWebsiteUrl('');
  };

  return (
    <div className="py-8 relative animate-fade-in" id="hero-section-container">
      {/* Hero Headline */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 text-xs font-semibold text-cyan-400 font-mono mb-6 shadow-sm shadow-cyan-500/5">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span className="tracking-wider uppercase">BOOSTMETRICS DIGITAL AGENCY &bull; GOALS 2026-2028</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Maximize Your Digital ROI With <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">Data-Driven Campaigns</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl mx-auto leading-relaxed">
          We empower businesses with innovative digital marketing solutions that drive measurable growth, maximize return on investment, and build commanding online brands.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button 
            onClick={onGoToProposal}
            className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Build Custom Marketing Retainer</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
          <a 
            href="#audit-tool"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('audit-tool');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-lg bg-white/5 border border-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-200 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
          >
            <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span>Launch Free Website Audit</span>
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agencyStats.map((stat, idx) => (
            <div 
              key={idx} 
              className="glass-panel border-white/5 rounded-xl p-5 shadow-xl hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest block mb-1">
                  {stat.label}
                </span>
                <span className="font-display text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2.5 font-sans leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Audit Tool Sandbox */}
      <div id="audit-tool" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="glass-panel border-white/5 text-white rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle design details */}
          <div className="absolute top-0 right-0 h-48 w-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-cyan-400 animate-pulse" />
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                Instant BoostMetrics Audit Engine
              </h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 font-sans">
              Enter your website URL to simulate our automated crawler auditing your metadata, SEO structures, page-load speed, and security setups.
            </p>

            <AnimatePresence mode="wait">
              {!isAuditing && !report ? (
                <motion.form 
                  key="audit-form"
                  onSubmit={handleRunAudit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-cyan-400/80 uppercase tracking-wider mb-1.5 font-bold">
                        Your Website URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <Globe className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          placeholder="e.g. www.mybusiness.com"
                          className="block w-full pl-9 pr-3 py-2.5 text-sm bg-black/40 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyan-400/80 uppercase tracking-wider mb-1.5 font-bold">
                        Business Sector
                      </label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="block w-full py-2.5 px-3 text-sm bg-black/40 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-sans"
                      >
                        <option value="ecommerce">E-commerce Store</option>
                        <option value="local">Local Service Provider</option>
                        <option value="saas">SaaS / Tech Startup</option>
                        <option value="professional">Professional Consultant</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-md shadow-cyan-500/20 hover:brightness-110 hover:shadow-cyan-400/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Activity className="h-4 w-4" />
                      Run Free Growth Diagnostic
                    </button>
                  </div>
                </motion.form>
              ) : isAuditing ? (
                <motion.div 
                  key="audit-loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 flex flex-col items-center text-center"
                >
                  <RefreshCw className="h-10 w-10 text-cyan-400 animate-spin mb-4" />
                  <div className="w-full max-w-md bg-white/5 h-2 rounded-full overflow-hidden mb-3 border border-white/5">
                    <motion.div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${auditProgress}%` }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                  <span className="font-mono text-xs text-cyan-300 font-bold mb-1">
                    Analyzing: {auditProgress}% Complete
                  </span>
                  <p className="text-xs text-slate-400 max-w-md font-sans">
                    {progressText}
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="audit-report"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-0.5">
                        Audit Report Completed
                      </span>
                      <h3 className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                        <Globe className="h-4 w-4 text-cyan-400/80" />
                        {report?.websiteUrl}
                      </h3>
                    </div>
                    <button 
                      onClick={resetAudit}
                      className="rounded bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                      Audit New Domain
                    </button>
                  </div>

                  {/* Score Rings Dashboard */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* SEO Score Card */}
                    <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                      <div className="relative flex items-center justify-center h-16 w-16 shrink-0">
                        {/* Circular progress bar SVG */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="#111827" strokeWidth="4" fill="transparent" />
                          <circle cx="32" cy="32" r="28" stroke="#06b6d4" strokeWidth="4" fill="transparent"
                            strokeDasharray={175.9}
                            strokeDashoffset={175.9 - (175.9 * (report?.seoScore || 0)) / 100}
                          />
                        </svg>
                        <span className="absolute text-sm font-extrabold font-mono text-cyan-400">
                          {report?.seoScore}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase">SEO Index</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-sans">
                          {report && report.seoScore >= 80 ? 'Optimal technical health' : 'Critical tags missing'}
                        </p>
                      </div>
                    </div>

                    {/* Performance Score Card */}
                    <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                      <div className="relative flex items-center justify-center h-16 w-16 shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="#111827" strokeWidth="4" fill="transparent" />
                          <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="4" fill="transparent"
                            strokeDasharray={175.9}
                            strokeDashoffset={175.9 - (175.9 * (report?.performanceScore || 0)) / 100}
                          />
                        </svg>
                        <span className="absolute text-sm font-extrabold font-mono text-emerald-400">
                          {report?.performanceScore}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase">PageSpeed</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-sans">
                          {report && report.performanceScore >= 80 ? 'High visual speed' : 'Significant load latency'}
                        </p>
                      </div>
                    </div>

                    {/* Security & Mobile Card */}
                    <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className={`h-4 w-4 ${report?.securityStatus === 'Secure' ? 'text-emerald-400' : 'text-amber-400'}`} />
                        <span className="text-xs font-bold text-slate-300 font-mono">
                          Security: <span className={report?.securityStatus === 'Secure' ? 'text-emerald-400' : 'text-amber-400'}>{report?.securityStatus}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`h-4 w-4 ${report?.mobileFriendly ? 'text-emerald-400' : 'text-amber-400'}`} />
                        <span className="text-xs font-bold text-slate-300 font-mono">
                          Mobile Index: <span className={report?.mobileFriendly ? 'text-emerald-400' : 'text-amber-400'}>{report?.mobileFriendly ? 'Responsive' : 'Failing'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    {/* Issues List */}
                    <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                      <h4 className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Friction Points Found ({report?.issuesFound.length})
                      </h4>
                      <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                        {report?.issuesFound.map((issue, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold shrink-0 mt-0.5">&bull;</span>
                            <span className="leading-relaxed">{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Agency Recommendations & Direct CTAs */}
                    <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                      <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Flame className="h-4 w-4 shrink-0 text-amber-500 animate-pulse" />
                        BoostMetrics Recommended Actions
                      </h4>
                      <ul className="space-y-4">
                        {report?.recommendations.map((rec, i) => {
                          // Extract target service name from parentheses
                          const match = rec.match(/\(([^)]+)\)/);
                          const serviceLabel = match ? match[1] : '';
                          let serviceId = '';
                          if (serviceLabel.includes('SEO')) serviceId = 'seo';
                          else if (serviceLabel.includes('PPC')) serviceId = 'ppc';
                          else if (serviceLabel.includes('CRO')) serviceId = 'cro';
                          else if (serviceLabel.includes('Email')) serviceId = 'email';
                          else if (serviceLabel.includes('Web')) serviceId = 'webdev';
                          else if (serviceLabel.includes('Content')) serviceId = 'content';

                          return (
                            <li key={i} className="flex flex-col gap-1 text-xs">
                              <div className="flex items-start gap-2 text-slate-300 font-sans leading-relaxed">
                                <CheckCircle className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{rec}</span>
                              </div>
                              {serviceId && (
                                <button
                                  type="button"
                                  onClick={() => onSelectService(serviceId)}
                                  className="self-start text-[10px] text-cyan-400 hover:text-cyan-300 font-bold font-mono uppercase tracking-wide ml-5.5 cursor-pointer hover:underline"
                                >
                                  View Custom Package Details &rarr;
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
