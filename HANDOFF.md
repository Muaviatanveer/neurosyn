# Handoff notes for development

These notes are for whoever builds this into the live site. neurosyn.it.com runs on TanStack Start with React 19 and Tailwind v4 (built in Lovable), so the mapping below is for that setup. Every file name in the concept matches a live route, so the move is one page at a time.

| Concept file | Live route |
| --- | --- |
| `index.html` | `/` |
| `services.html` | `/services` |
| `products.html`, `products/sap.html` and so on | `/products`, `/products/sap`, `/products/dev`, `/products/aero`, `/products/copilot` |
| `case-studies.html` | `/case-studies` |
| `industries.html`, `technology.html`, `reviews.html`, `founder.html`, `about.html`, `contact.html`, `investors.html` | same names without `.html` |
| `research.html`, `research/<id>.html` | `/research`, `/research/$projectId` |
| `insights.html`, `insights/<slug>.html` | `/insights`, `/insights/$slug` |

## Type

The font stack is `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Helvetica Neue", Arial, sans-serif`. Apple devices get SF Pro from the system. Everyone else gets Inter (variable, weights 400 to 700, optical size on), loaded from Google Fonts without blocking the page. The only mono is the system mono, used for code and the product readouts.

| Token | Size | Weight | Line height | Spacing |
| --- | --- | --- | --- | --- |
| Home headline | `clamp(2.5rem, 1.35rem + 3.7vw, 4.6rem)` | 600 | 1.05 | -0.032em |
| Page headline `.h1` | `clamp(2.4rem, 1.5rem + 3.4vw, 4.5rem)` | 600 | 1.06 | -0.03em |
| Section headline `.h2` | `clamp(2rem, 1.4rem + 2.4vw, 3.5rem)` | 600 | 1.08 | -0.028em |
| Card headline | 1.1 to 2rem | 600 | 1.14 to 1.3 | -0.015 to -0.026em |
| Intro `.intro` | `clamp(1.1rem, 1rem + .45vw, 1.35rem)` in `#A1A1A6` | 500 | 1.42 | -0.016em |
| Body | 17px | 400 | 1.47 | -0.012em |
| Small print (footer) | 12.5px in `#8E8E93` | 400 | 1.5 | 0 |

Headlines use `text-wrap: balance`, intros use `text-wrap: pretty`.

## Colours

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | #000000 | Page background |
| `--bg-2` | #07090E | Alternate sections and the contact band |
| `--tile`, `--tile-2`, `--tile-3` | #101217, #171A21, #1F232C | Cards and panels |
| `--text` | #F5F5F7 | Headings and body |
| `--text-2` | #A1A1A6 | Intros and secondary text |
| `--muted` | #8E8E93 | Meta text and small print |
| `--btn` | #1272E6 | Every main button. It is NeuroSyn's #1D81F2 brand blue, deepened just enough for white text to pass contrast |
| `--blue` | #1D81F2 | Brand blue for accents and the logo dot |
| `--link` | #2997FF | Text links, focus ring and chevrons |
| `--cyan`, `--ice` | #06B6D4, #A5F3FC | The crystal light, small labels |
| `--violet`, `--pink` | #A78BFA, #F0ABFC | Only as thin film light on glass |
| `--ok` | #30D158 | Live dots and success |

All tokens are CSS variables at the top of `css/style.css`. In Tailwind v4 they go straight into `@theme`.

## Layout and spacing

- One container: 1200px of content plus a side gutter of `clamp(18px, 4vw, 44px)`. Card gap `clamp(12px, 1.6vw, 22px)`.
- Section padding is `clamp(36px, 4vw, 45px)` top and bottom, so content in two sections is never more than 90px apart.
- Tile corners: 28px for big tiles, 22 to 26px for cards, 12px for inputs, full pill for buttons and chips.
- Global nav is 48px, the local nav is 52px (48px on phones). On inner pages the global nav scrolls away and the local nav sticks, as on apple.com.

## Motion system

Everything is CSS and plain JavaScript in `js/main.js`. No animation library, no WebGL. One scroll loop reads every position first and then writes, so the page never measures twice in a frame. All curves use Apple's `cubic-bezier(.28, .11, .32, 1)`.

| Attribute or class | What it does |
| --- | --- |
| `data-fade` | Rises 36px and fades in once, when it comes into view. `--d` sets a delay, `data-fade="scale"` grows from 95% instead |
| `data-words` | Splits the text into words and lights them up as the block moves through the screen. Words inside `.c` light up in ice blue |
| `data-scene` | The home hero. The section is 160vh tall with a sticky inner panel, and JavaScript writes `--p` (0 to 1). CSS uses `--p` for the copy lifting away, the crystal growing, the bubbles fading and the caption appearing |
| `data-zoom` | Writes `--z` (0 to 1) as the element scrolls in. `.zoom` scales from 84% to 100% and the corners go from 46px to 24px |
| `data-gal` | A sideways scroll-snap gallery with round paddles that switch off at each end |
| `data-story` | Steps on the left, a sticky panel on the right. An IntersectionObserver on the middle line of the screen swaps the panel content and fills the ring |
| `data-count` | Counts the first number in the text up once, keeping anything before and after it |
| `data-term` / `data-type` | Product readouts type out one line at a time |
| `data-progress`, `data-toc` | Reading progress bar and the contents list on papers |
| `data-filter` | Chip filters and text search over a set of cards (technology, research, insights) |

The bubbles in the hero sit at fixed points on a wide U shape around the core and sway a little. The scene measures itself with a ResizeObserver, so the core and bubbles always fit under the headline. The rising bubbles are one cached sprite drawn on a 2D canvas, and the whole hero loop stops when it is off screen or the tab is hidden. With reduced motion turned on, everything is placed and still.

## Components

Global nav with the Services mega menu and three dropdowns, local nav, page hero (`.phero`), statement, gallery cards, client tiles, sticky story, product tiles with readouts, compare plans, estimator, founder split, papers, questions with the expert box, contact band (`.cta-band`), forms with checks and a success state, booking stepper, sector, layer, case, research and article templates, footer, search, phone menu, video pop-up, cookie card, toast and back to top. In React each one becomes a component and the CSS can stay as it is.

## Where the content comes from

| On the page | Live source |
| --- | --- |
| Services | `serviceCategories` in `routes/services.tsx` |
| Solutions and product pages | `products` in `routes/products.index.tsx` and the `ProductPage` props in each `products.*.tsx` |
| Work | The home `caseStudies` (AAKS, Polarions, IJAIKE) and `caseStudies` in `routes/case-studies.tsx` |
| Industries | `sectorList` in `routes/industries.tsx` |
| Technology | `techLayers` in `routes/technology.tsx` |
| Research | `researchProjects` and `researchCategories` in `data/innovations.ts` |
| Papers | `INSIGHT_ARTICLES` in `data/insights.ts` |
| Founder | `recognitions`, `philosophy`, `journey`, `products`, `tech`, `socials`, `durations` and `times` in `routes/founder.tsx` |
| About, investors, contact | `deliveryFramework`, `principles`, `investmentThemes` and `serviceOptions` in their routes |
| Delivery phases, engagement models, estimator | `DeliveryTimelineStepper.tsx`, `EngagementModels.tsx`, `ProjectConfigurator.tsx` |
| Reviews | `.data/reviews.json` |

One thing to fix in the live data: the paper tables in `data/insights.ts` are stored as long runs of `heading2` entries, so the live pages show each table cell as a heading. The concept rebuilds them into real tables with the same words. Adding a `table` section type (`{ type: 'table', head: [], rows: [[]] }`) to the data would fix this for good.

## Search

`js/data.js` holds the search index (57 entries across pages, services, solutions, work, industries, research and papers), the popular searches, a small list of everyday words and the estimator options. On the live site it should be built from the same arrays at build time, so it never goes out of date. Links in the index are relative to the site root, and `main.js` adds the right prefix for pages in subfolders.

## SEO

- Unique title (under 65 characters) and description (under 160) on every page, canonical on the live address, Open Graph and Twitter tags.
- One H1 per page, then H2 per section.
- Structured data: Organization, Person and WebSite on the home page, Service on services, SoftwareApplication on product pages, TechArticle on every paper, ProfilePage on the founder page, FAQPage on contact, and BreadcrumbList on every inner page.
- The 404 page is `noindex` and uses `<base href="/">` so it works at any depth when hosted.

## Accessibility

- Skip link, visible focus ring everywhere, and every colour pair passes WCAG AA, including the dimmed words before they light up.
- Menus open on hover or keyboard focus and close with Esc. Search, phone menu and video pop-up trap focus and close with Esc. Press / or Ctrl K to search.
- Questions are buttons with `aria-expanded`, closed answers are hidden from screen readers.
- Gallery tracks are focusable and scroll with the arrow keys. Tables on papers sit in a labelled scroll region on small screens.
- Lighthouse in my setup: accessibility 100 on every page I tested.

## Breakpoints

| Width | What changes |
| --- | --- |
| 1180px and under | The burger menu replaces the nav, footer goes 3 across, feature lists go 2 across |
| 1024px and under | Two-column layouts stack, the delivery story becomes a simple list, plans slide sideways, the paper contents list hides |
| 820px and under | Bento tiles and case cards stack, local nav keeps the title and button only |
| 640px and under | Phone layout: smaller bubbles, single-column grids, compact estimator, cookie card full width |

## Storage

Two small keys in the browser: `ns_recent` (recent searches) and `ns_cookies` (cookie choices). Every read and write is wrapped, so the site still works when storage is blocked.

## Concept-only behaviour

The contact form, review form, meeting booking and cookie choices check what you enter and show a success state, but don't send anything. Connect them to the existing `sendContactEmail` action and the reviews endpoint. The founder's "Ask Muavia AI" chat is left out because it needs a server.
