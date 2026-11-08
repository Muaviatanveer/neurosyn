import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  User,
  Share2,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { getArticleBySlug, getRelatedArticles, ContentSection } from "../data/insights";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) {
      return {
        meta: [{ title: "Paper Not Found — NeuroSyn Insights" }],
      };
    }

    const articleUrl = `https://www.neurosyn.it.com/insights/${article.slug}`;

    // TechArticle & BreadcrumbList JSON-LD Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": `${articleUrl}#article`,
          "headline": article.title,
          "name": article.shortTitle,
          "description": article.description,
          "url": articleUrl,
          "datePublished": article.publishedAt,
          "dateModified": article.modifiedAt,
          "inLanguage": "en-US",
          "keywords": article.keywords.join(", "),
          "author": {
            "@type": "Person",
            "name": article.author.name,
            "url": "https://www.neurosyn.it.com/founder",
          },
          "publisher": {
            "@type": "Organization",
            "name": "NeuroSyn",
            "url": "https://www.neurosyn.it.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.neurosyn.it.com/logo.png",
            },
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl,
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${articleUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.neurosyn.it.com",
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Insights",
              "item": "https://www.neurosyn.it.com/insights",
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": article.shortTitle,
              "item": articleUrl,
            },
          ],
        },
      ],
    };

    return {
      meta: [
        { title: article.title },
        { name: "description", content: article.description },
        { name: "keywords", content: article.keywords.join(", ") },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: articleUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
      ],
      links: [{ rel: "canonical", href: articleUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(articleSchema),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) {
      throw notFound();
    }
    const related = getRelatedArticles(params.slug, 3);
    return { article, related };
  },
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { article, related } = Route.useLoaderData();

  // Extract table of contents headings
  const tocHeadings = article.sections
    .filter((s) => s.type === "heading2" && s.content)
    .map((s, idx) => ({
      id: `section-${idx}`,
      title: s.content as string,
    }));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Header */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 pt-24 pb-14 md:px-10 md:pt-32 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px]">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-slate-500">
            <Link to="/" className="hover:text-[#1D81F2] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link to="/insights" className="hover:text-[#1D81F2] transition-colors">
              Insights
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-slate-900 font-medium truncate max-w-[280px] sm:max-w-none">
              {article.shortTitle}
            </span>
          </nav>

          {/* Category & Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 font-mono text-xs font-semibold text-[#1D81F2]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{article.category}</span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-[46px] lg:leading-[1.15]">
            {article.shortTitle}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            {article.description}
          </p>

          {/* Author and Metadata Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 font-mono text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-slate-800 font-medium">
                <User className="h-3.5 w-3.5 text-[#1D81F2]" />
                <Link to={article.author.profileUrl} className="hover:underline">
                  {article.author.name}
                </Link>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Published {article.publishedAt}</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <Link
              to="/insights"
              className="inline-flex items-center gap-1 text-[#1D81F2] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Papers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[960px] grid gap-12 lg:grid-cols-12">
          {/* Table of Contents Sidebar */}
          {tocHeadings.length > 2 && (
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-2xs">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
                  <BookOpen className="h-4 w-4 text-[#1D81F2]" />
                  <span>Table of Contents</span>
                </div>
                <nav className="mt-4 space-y-2.5">
                  {tocHeadings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="block text-xs font-medium text-slate-600 transition-colors hover:text-[#1D81F2] hover:underline"
                    >
                      {h.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Article Text Column */}
          <article className={`${tocHeadings.length > 2 ? "lg:col-span-8" : "lg:col-span-12"} space-y-6 text-slate-800`}>
            {article.sections.map((sec, idx) => (
              <RenderSection key={idx} section={sec} sectionIndex={idx} />
            ))}

            {/* Author Attribution Box */}
            <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src="/muavia.jpeg"
                  alt="Muavia Tanveer Khan"
                  className="h-16 w-16 rounded-full object-cover border-2 border-[#1D81F2]/30 shadow-xs"
                />
                <div>
                  <h4 className="font-display text-lg font-bold text-slate-950">
                    {article.author.name}
                  </h4>
                  <p className="font-mono text-xs text-[#1D81F2]">
                    {article.author.role} · NeuroSyn AI
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Lead systems architect specializing in cognitive reasoning architectures, enterprise SAP modernization, and private sovereign AI deployments.
                  </p>
                  <div className="mt-3 flex items-center gap-3 font-mono text-xs">
                    <Link to="/founder" className="text-[#1D81F2] hover:underline font-medium">
                      View Founder Profile →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Papers Section */}
      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50/70 px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Related Architecture Papers
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-slate-950">
                  Continue Reading
                </h3>
              </div>
              <Link
                to="/insights"
                className="hidden sm:inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#1D81F2] hover:underline"
              >
                <span>Browse All Insights</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {related.map((rel) => (
                <div
                  key={rel.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-[#1D81F2]/60 hover:shadow-md transition-all"
                >
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1D81F2]">
                      {rel.category}
                    </span>
                    <h4 className="mt-2 font-display text-base font-bold text-slate-950 line-clamp-2">
                      {rel.shortTitle}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      to="/insights/$slug"
                      params={{ slug: rel.slug }}
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#1D81F2] hover:underline"
                    >
                      <span>Read Paper</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-white px-6 py-16 text-center md:px-10 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <h3 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Ready to implement sovereign AI or modernize enterprise SAP?
          </h3>
          <p className="mt-4 text-base text-slate-600">
            Our engineering team reviews your technical specifications under mutual NDA and provides production-ready architecture blueprints.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#1D81F2] px-8 py-3.5 font-mono text-xs font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#156CD4]"
            >
              <span>Engage Engineering Team</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-mono text-xs font-semibold text-slate-800 hover:border-[#1D81F2]"
            >
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function RenderSection({ section, sectionIndex }: { section: ContentSection; sectionIndex: number }) {
  switch (section.type) {
    case "heading2":
      return (
        <h2
          id={`section-${sectionIndex}`}
          className="mt-10 mb-4 scroll-mt-28 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
        >
          {section.content}
        </h2>
      );

    case "heading3":
      return (
        <h3 className="mt-7 mb-2 font-display text-lg font-bold text-slate-900 sm:text-xl">
          {section.content}
        </h3>
      );

    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-slate-700">
          {section.content}
        </p>
      );

    case "list":
      return (
        <ul className="my-5 space-y-2.5 pl-6 list-disc text-sm leading-relaxed text-slate-700 marker:text-[#1D81F2]">
          {section.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs text-slate-700">
            {section.tableHeaders && (
              <thead className="bg-slate-100/80 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-900 border-b border-slate-200">
                <tr>
                  {section.tableHeaders.map((h, i) => (
                    <th key={i} className="px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-100">
              {section.tableRows?.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "linkCard":
      if (!section.linkCard) return null;
      return (
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50/40 p-6 sm:p-7 shadow-xs">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1D81F2]">
            Contextual Architecture Resource
          </div>
          <h4 className="mt-2 font-display text-lg font-bold text-slate-950">
            {section.linkCard.title}
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            {section.linkCard.description}
          </p>
          <div className="mt-4">
            <Link
              to={section.linkCard.to}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#1D81F2] hover:underline"
            >
              <span>{section.linkCard.cta}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      );

    default:
      return null;
  }
}
