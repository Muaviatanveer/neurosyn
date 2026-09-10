import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Building2 
} from 'lucide-react';

interface Model {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  idealFor: string;
  teamComposition: string[];
  deliverables: string[];
  timeline: string;
  pricingModel: string;
  popular?: boolean;
}

const ENGAGEMENT_MODELS: Model[] = [
  {
    id: 'dedicated-pods',
    title: 'Dedicated Engineering Pod',
    subtitle: 'Autonomous squads embedded into your product roadmap',
    badge: 'Most Strategic',
    badgeColor: 'bg-blue-50 text-[#1D81F2] border-blue-200',
    popular: true,
    description: 'A dedicated cross-functional pod of senior software, AI, and cloud engineers that operates as a natural extension of your engineering leadership.',
    idealFor: 'Enterprises & growth companies building core software with continuous quarterly roadmaps.',
    teamComposition: [
      '1 Principal / Lead Architect',
      '2-3 Senior Full-Stack Engineers',
      '1 AI/ML or Cloud DevOps Specialist',
      '1 Embedded QA Automation Engineer'
    ],
    deliverables: [
      'Bi-weekly production sprint releases',
      'Direct Slack/Discord & Jira sync',
      'Full CI/CD & automated test suites',
      '100% IP & source code handover continuously'
    ],
    timeline: 'Ongoing (3, 6, or 12 month commitments)',
    pricingModel: 'Monthly Retainer per Pod'
  },
  {
    id: 'turnkey-projects',
    title: 'Turnkey Fixed-Scope',
    subtitle: 'Milestone-based delivery with guaranteed delivery timelines',
    badge: 'Fixed Budget SLA',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    description: 'End-to-end execution from architecture specification to cloud production deployment. We take full accountability for timeline, architecture, and quality.',
    idealFor: 'Companies with a clear scope needing an MVP, major platform overhaul, or new AI system built fast.',
    teamComposition: [
      'Solution Architect',
      'Product Delivery Manager',
      'Dedicated Frontend & Backend Specialists',
      'DevOps Deployment Engineer'
    ],
    deliverables: [
      'Fixed-scope Architecture Specification Document',
      'Milestone-gated staging review & demo',
      'Air-gapped or Cloud production deployment',
      '30-day post-launch hypercare & warranty'
    ],
    timeline: '6 to 16 weeks typical duration',
    pricingModel: 'Milestone-based Fixed Price'
  },
  {
    id: 'staff-augmentation',
    title: 'Embedded Specialists',
    subtitle: 'Rapid senior talent injection into your existing team',
    badge: '48h Deployment',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Plug senior engineers specialized in high-complexity domains (LLM pipelines, Kubernetes, distributed systems) directly into your existing in-house team.',
    idealFor: 'Engineering teams with immediate capacity shortages or niche tech stack requirements.',
    teamComposition: [
      'Pre-vetted Senior Engineers (Top 3%)',
      'Aligned to your timezone & working hours',
      'Direct reporting to your Engineering Manager',
      'Zero onboarding overhead'
    ],
    deliverables: [
      'Immediate commit access within 48-72 hours',
      'Daily standup participation',
      'High code review velocity (>95% acceptance rate)',
      'Knowledge transfer documentation'
    ],
    timeline: 'Flexible (1+ month commitments)',
    pricingModel: 'Time & Materials / Monthly per Engineer'
  }
];

export function EngagementModels() {
  const [selectedModel, setSelectedModel] = useState<string>('dedicated-pods');

  return (
    <section id="engagement-models" className="relative py-24 bg-[#FFFFFF] border-y border-slate-200 overflow-hidden">
      {/* Subtle NETSOL Pinstripes */}
      <div className="pointer-events-none absolute inset-0 opacity-20 netsol-pinstripes" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-4">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Commercial Flexibility</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-slate-950">
            How we partner with{' '}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              you.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Choose the engagement model that matches your product stage, timeline, and internal engineering structure. Zero bureaucratic friction, 100% senior engineering talent.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ENGAGEMENT_MODELS.map((model) => {
            const isSelected = selectedModel === model.id;

            return (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`group relative rounded-[28px] p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white shadow-xl shadow-blue-500/10 border-2 border-[#1D81F2] ring-4 ring-[#1D81F2]/10 -translate-y-1'
                    : 'bg-white hover:bg-slate-50/50 border border-slate-200/85 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Badge & Popular pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-flex items-center text-xs font-mono font-semibold px-3 py-1 rounded-full border ${model.badgeColor}`}>
                      {model.badge}
                    </span>
                    {model.popular && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1D81F2] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" /> Preferred
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-display font-bold text-slate-950 tracking-tight group-hover:text-[#1D81F2] transition-colors">
                    {model.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    {model.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">
                    {/* Ideal for */}
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                        Best For
                      </div>
                      <div className="text-xs font-medium text-slate-800">
                        {model.idealFor}
                      </div>
                    </div>

                    {/* Team Pod */}
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Squad Composition
                      </div>
                      <ul className="space-y-1.5">
                        {model.teamComposition.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Layers className="w-3.5 h-3.5 text-[#1D81F2] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Deliverables */}
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Included Deliverables
                      </div>
                      <ul className="space-y-1.5">
                        {model.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1D81F2] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer specs & CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {model.timeline}
                    </span>
                    <span className="font-semibold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {model.pricingModel}
                    </span>
                  </div>

                  <Link
                    to="/contact"
                    className={`w-full group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#1D81F2] text-white shadow-lg shadow-blue-500/25 hover:bg-[#156CD4]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>Initiate {model.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 p-6 md:p-8 rounded-[24px] bg-[#F8FAFC] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1D81F2] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display font-bold text-slate-950 text-sm">
                2-Week Risk-Free Evaluation Period
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Every dedicated pod begins with a 14-day evaluation sprint. If code quality or velocity does not meet your standard, you pay nothing.
              </div>
            </div>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 hover:border-slate-300 text-xs font-mono font-semibold text-slate-800 bg-white hover:bg-slate-50 transition-all shadow-xs"
          >
            <Building2 className="w-4 h-4 text-[#1D81F2]" />
            Request Master Services Agreement (MSA)
          </Link>
        </div>
      </div>
    </section>
  );
}
