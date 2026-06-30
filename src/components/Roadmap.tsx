import React, { useState } from 'react';
import { ROADMAP_GOALS } from '../data/agencyData';
import { Calendar, CheckCircle2, ChevronRight, HelpCircle, Landmark, Star, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Roadmap() {
  // Setup interactive states for milestones to allow live checking/unchecking
  const [goals, setGoals] = useState(ROADMAP_GOALS);

  // Toggle milestone completion
  const handleToggleMilestone = (yearIdx: number, achIdx: number) => {
    const updatedGoals = [...goals];
    updatedGoals[yearIdx].achievements[achIdx].completed = !updatedGoals[yearIdx].achievements[achIdx].completed;
    setGoals(updatedGoals);
  };

  // Compute overall completion stats
  const totalMilestones = goals.reduce((acc, goal) => acc + goal.achievements.length, 0);
  const completedMilestones = goals.reduce(
    (acc, goal) => acc + goal.achievements.filter(a => a.completed).length,
    0
  );
  const overallPercentage = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="py-6 relative z-10" id="roadmap-container">
      {/* Introduction */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            Strategic Growth Roadmap (2026-2028)
          </h2>
          <p className="text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
            Follow our progress as we scale from a foundational marketing agency to an international hybrid service and SaaS enterprise. Toggle the milestones below to simulate growth progress.
          </p>
        </div>

        {/* Master Progress Meter */}
        <div className="glass-panel border-white/5 text-white rounded-xl p-4 shrink-0 w-full md:w-64 shadow-2xl">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400 font-bold uppercase tracking-wider">Agency Readiness</span>
            <span className="text-cyan-450 font-extrabold text-cyan-400">{overallPercentage}%</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-1.5">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
          <span className="font-mono text-[9px] text-slate-500 block text-right">
            {completedMilestones} of {totalMilestones} Milestones Completed
          </span>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="relative border-l-2 border-white/10 ml-3 md:ml-8 pl-6 md:pl-10 space-y-12">
        {goals.map((goal, yearIdx) => {
          // Calculate year specific completion rate
          const yearTotal = goal.achievements.length;
          const yearCompleted = goal.achievements.filter(a => a.completed).length;
          const yearPercent = yearTotal > 0 ? Math.round((yearCompleted / yearTotal) * 100) : 0;

          return (
            <div key={yearIdx} className="relative">
              {/* Bullet node */}
              <span className="absolute -left-[37px] md:-left-[53px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-black ring-8 ring-slate-950 shadow-lg font-mono text-[10px] font-extrabold">
                {yearIdx + 1}
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Year Header & Description (LHS) */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-2xl font-extrabold text-white tracking-tight">
                      {goal.year}
                    </span>
                    <span className="font-mono text-xs text-cyan-450 text-cyan-400 font-semibold px-2.5 py-0.5 rounded-full border border-white/5 bg-white/5">
                      Term: {goal.timeline}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-cyan-400 uppercase tracking-wide">
                    {goal.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {goal.description}
                  </p>

                  {/* Small progress stats */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>Year Completion</span>
                      <span className="font-bold text-white">{yearPercent}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-cyan-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                        style={{ width: `${yearPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Achievements Checklist (RHS) */}
                <div className="lg:col-span-7 glass-panel border-white/5 p-5 rounded-xl shadow-2xl space-y-3">
                  <span className="font-mono text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest block border-b border-white/5 pb-2">
                    Checklist Milestones ({yearCompleted}/{yearTotal})
                  </span>

                  <div className="space-y-2.5">
                    {goal.achievements.map((ach, achIdx) => (
                      <div
                        key={achIdx}
                        onClick={() => handleToggleMilestone(yearIdx, achIdx)}
                        className={`p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer select-none ${
                          ach.completed
                            ? 'bg-emerald-500/10 border-emerald-500/25'
                            : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                        id={`milestone-box-${yearIdx}-${achIdx}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div 
                            className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border mt-0.5 transition-all ${
                              ach.completed
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-white/10 bg-white/5'
                            }`}
                          >
                            {ach.completed && (
                              <svg className="h-3 w-3 stroke-[3.5] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs font-sans font-medium leading-relaxed ${ach.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                            {ach.text}
                          </span>
                        </div>

                        {ach.completed && (
                          <span className="font-mono text-[8px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                            Verified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center text-xs text-slate-500 font-sans max-w-xl mx-auto border-t border-white/5 pt-6">
        BoostMetrics operates strictly according to these milestone thresholds, adjusting campaign metrics in response to macro-economic changes.
      </div>
    </div>
  );
}
