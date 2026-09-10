import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Building2 
} from 'lucide-react'

interface Model {
  id: string
  title: string
  subtitle: string
  badge: string
  badgeColor: string
  accentColor: string
  description: string
  idealFor: string
  teamComposition: string[]
  deliverables: string[]
  timeline: string
  pricingModel: string
  popular?: boolean
}

const ENGAGEMENT_MODELS: Model[] = [
  {
    id: 'dedicated-pods',
    title: 'Dedicated Engineering Pod',
    subtitle: 'Autonomous squads embedded into your product roadmap',
    badge: 'Most Strategic',
    badgeColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/30',
    accentColor: 'from-cyan-500/20 to-blue-500/5',
    popular: true,
    description: 'A dedicated cross-functional pod of senior software, AI, and cloud engineers that operates as a natural extension of your engineering leadership.',
    idealFor: 'Funded scale-ups & enterprises building flagship core platforms with ongoing roadmaps.',
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
    badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/30',
    accentColor: 'from-indigo-500/20 to-violet-500/5',
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
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
    accentColor: 'from-emerald-500/20 to-teal-500/5',
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
]

export function EngagementModels() {
  const [selectedModel, setSelectedModel] = useState<string>('dedicated-pods')

  return (
    <section id="engagement-models" className="relative py-24 bg-surface border-y border-line overflow-hidden">
      {/* Colorful mesh backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
            <Users className="w-3.5 h-3.5" />
            Commercial Flexibility
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-foreground">
            How We Partner With You
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            Choose the engagement model that matches your product stage, timeline, and internal engineering structure. No bureaucratic overhead, no junior bait-and-switch.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ENGAGEMENT_MODELS.map((model) => {
            const isSelected = selectedModel === model.id

            return (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`group relative rounded-2xl p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white shadow-xl shadow-cyan-950/5 border-2 border-brand ring-4 ring-brand/10'
                    : 'bg-white/80 hover:bg-white border border-line hover:border-line-strong hover:shadow-lg'
                }`}
              >
                {/* Subtle top gradient accent */}
                <div className={`absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${model.accentColor}`} />

                <div>
                  {/* Badge & Popular pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-flex items-center text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${model.badgeColor}`}>
                      {model.badge}
                    </span>
                    {model.popular && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand bg-brand-subtle px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" /> Preferred
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-display font-semibold text-foreground tracking-tight group-hover:text-brand transition-colors">
                    {model.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-mono">
                    {model.subtitle}
                  </p>

                  <p className="text-sm text-text-secondary mt-4 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-line/60 space-y-4">
                    {/* Ideal for */}
                    <div>
                      <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">
                        Best For
                      </div>
                      <div className="text-xs font-medium text-foreground">
                        {model.idealFor}
                      </div>
                    </div>

                    {/* Team Pod */}
                    <div>
                      <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">
                        Squad Composition
                      </div>
                      <ul className="space-y-1.5">
                        {model.teamComposition.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                            <Layers className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Deliverables */}
                    <div>
                      <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">
                        Included Deliverables
                      </div>
                      <ul className="space-y-1.5">
                        {model.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer specs & CTA */}
                <div className="mt-8 pt-6 border-t border-line">
                  <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-text-muted" /> {model.timeline}
                    </span>
                    <span className="font-medium text-foreground bg-surface-2 px-2 py-0.5 rounded">
                      {model.pricingModel}
                    </span>
                  </div>

                  <Link
                    to="/contact"
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-foreground text-white hover:bg-slate-800 shadow-md'
                        : 'bg-surface-2 hover:bg-surface-3 text-foreground'
                    }`}
                  >
                    <span>Initiate {model.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-line flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-brand shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display font-semibold text-foreground text-sm">
                2-Week Risk-Free Evaluation Period
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                Every dedicated pod begins with a 14-day evaluation sprint. If code quality or velocity does not meet your standard, you pay nothing.
              </div>
            </div>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-line-strong hover:border-brand text-xs font-mono font-medium text-foreground hover:text-brand bg-white hover:bg-surface-2 transition-all"
          >
            <Building2 className="w-4 h-4" />
            Request Master Services Agreement (MSA)
          </Link>
        </div>
      </div>
    </section>
  )
}
