import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Search,
  Sparkles,
  Layers,
  ArrowUpRight,
  Calendar,
  User,
} from "lucide-react";
import { INSIGHT_ARTICLES, INSIGHT_CATEGORIES, InsightArticle } from "../data/insights";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights & Technical Papers — NeuroSyn" },
      {
        name: "description",
        content:
          "Engineering insights, private enterprise AI search architecture, SAP ledger anomaly detection, and autonomous systems research from NeuroSyn.",
      },
      { property: "og:title", content: "Insights & Technical Papers — NeuroSyn" },
      {
        property: "og:description",
        content:
          "Engineering insights, private enterprise AI search architecture, SAP ledger anomaly detection, and autonomous systems research from NeuroSyn.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.neurosyn.it.com/insights" },
    ],
    links: [
      { rel: "canonical", href: "https://www.neurosyn.it.com/insights" },
    ],
  }),
  component: InsightsIndexPage,
});

function InsightsIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredArticles = useMemo(() => {
    return INSIGHT_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.categoryKey === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = INSIGHT_ARTICLES[0];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Header */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>NEUROSYN / KNOWLEDGE HUB & TECHNICAL PAPERS</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            Architectural Insights &{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              Engineering Papers.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            In-depth technical papers, private AI search governance, enterprise SAP ledger modernization, and autonomous multi-agent reasoning engineered from first principles.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-2xs font-medium">
              <strong className="text-slate-900">{INSIGHT_ARTICLES.length}</strong> Technical Papers Published
            </span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-2xs font-medium">
              <strong className="text-slate-900">100%</strong> Peer-Verifiable Engineering
            </span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-2xs font-medium">
              <strong className="text-slate-900">Enterprise</strong> US & UK B2B Focus
            </span>
          </div>
        </div>
      </section>

      {/* Featured Lead Article */}
      <section className="border-b border-slate-200 bg-slate-50/70 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-white via-blue-50/20 to-white p-8 md:p-12 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1D81F2]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Featured Lead Paper · {featuredArticle.category}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                  {featuredArticle.shortTitle}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {featuredArticle.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#1D81F2]" />
                    <span>{featuredArticle.author.name}</span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{featuredArticle.publishedAt}</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-end">
                <Link
                  to="/insights/$slug"
                  params={{ slug: featuredArticle.slug }}
                  className="inline-flex items-center justify-between gap-3 rounded-2xl bg-[#1D81F2] px-6 py-4 font-mono text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#156CD4] hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <span>Read Complete Paper</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-18 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 md:px-10">
        <div className="mx-auto max-w-[1240px] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {INSIGHT_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? "bg-[#1D81F2] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers, keywords..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#1D81F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D81F2]/20"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1240px]">
          {filteredArticles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center">
              <p className="font-mono text-sm text-slate-500">
                No papers found matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 font-mono text-xs font-semibold text-[#1D81F2] underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {/* Bottom Enterprise Advisory Banner */}
          <div className="mt-20 rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                Direct Engineering Collaboration
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-950">
                Need customized enterprise architecture or sovereign AI deployment?
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Our architects work directly with enterprise CTOs and VPs of Engineering under mutual NDA to design custom pipelines and private systems.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1D81F2] px-6 py-3 font-mono text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-[#156CD4]"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArticleCard({ article }: { article: InsightArticle }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#1D81F2]/60 hover:shadow-md">
      <div>
        {/* Eyebrow & Read Time */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1D81F2]">
            {article.category}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
            <Clock className="h-3 w-3" />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-slate-950 transition-colors group-hover:text-[#1D81F2]">
          {article.shortTitle}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Keywords preview */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {article.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <Link
          to="/insights/$slug"
          params={{ slug: article.slug }}
          className="inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 font-mono text-xs font-semibold text-slate-800 transition-all group-hover:bg-[#1D81F2] group-hover:text-white"
        >
          <span>Read Paper</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

