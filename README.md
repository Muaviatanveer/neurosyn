# NeuroSyn website concept

A full redesign of neurosyn.it.com: all 35 pages, with type and motion in the style of apple.com.

The site is black, calm and very clear. Headlines are big and set tight, the text is easy to read, and the animations follow your scroll the way Apple's product pages do. The crystal core and the glass bubbles from the first concept are still the heart of the home page, but now they move gently and react to scrolling rather than to dragging.

Every service, product, number, case study, paper, research system and fact comes from neurosyn.it.com. The photos and screenshots are NeuroSyn's own. Nothing is made up.

## How to view it

The quickest way is to drag the whole folder onto https://app.netlify.com/drop and open the link it gives you.

You can also double-click `index.html`. Every page works straight from the folder and all links between pages work. The only things that need the internet are the Inter font (the fallback font, see below), the demo videos and the documentary, which play from Google Drive.

## What's in the folder

```
index.html              home
services.html           six disciplines and the engagement models
products.html           the four NeuroSyn platforms (Solutions)
products/               sap, dev, aero and copilot pages
case-studies.html       client work and field notes (Work)
industries.html         six sectors
technology.html         the stack in seven layers
research.html           research systems and the Mamba language
research/               one page for each of the 9 systems
insights.html           all papers, with topic filters and search
insights/               one page for each of the 8 papers
reviews.html            verified reviews and the review form
founder.html            Hon. Dr. Muavia Tanveer Khan, with meeting booking
about.html              mission, vision, lifecycle and principles
contact.html            contact form and questions answered
investors.html          investment themes
404.html                page not found
css/style.css           all styles, with comments
js/data.js              the search index and the scope estimator options
js/main.js              every animation and interaction
images/                 NeuroSyn's own logo, mark, photos and screenshots
README.md               this file
HANDOFF.md              notes for the developer
```

To change text, edit the HTML. To change what the search finds or what the estimator recommends, edit `js/data.js`. Nothing needs rebuilding.

## Type

Headlines and text use SF Pro, the same font apple.com uses, on Apple devices (Mac, iPhone, iPad). On Windows and Android, where SF Pro can't be used, the site falls back to Inter, which is the closest free match. Sizes, weights and letter spacing follow Apple's rhythm: big headlines at weight 600 with tight spacing, a 21px intro line in soft grey, and 17px body text.

## Motion, the Apple way

| Where | What happens |
| --- | --- |
| Home hero | The page opens with the headline fading up out of a soft blur. The crystal core sits under it with the six glass bubbles on a slow, calm orbit and lines of light running between them. As you scroll, the headline lifts away, the crystal grows, the bubbles drift outward and fade, and a new line appears: "Built for work where failure isn't an option." Each bubble opens its service. |
| Statement | A paragraph lights up word by word as you read down the page |
| Disciplines | Cards slide sideways with Apple's round arrow buttons |
| Work | The AAKS screenshot starts small with round corners and grows to full size as you scroll |
| Delivery | A sticky panel on the right changes as each of the four phases scrolls past, with a progress ring |
| Products | Each card types out its live status line when it comes into view |
| Numbers | Every key number counts up once |
| Every page | Headings and cards rise softly into place, the menu bar is translucent and blurred, and each inner page has its own sticky bar with section links, like Apple's product pages |
| Papers | A thin progress line at the top and a contents list that follows the section you are reading |

With reduced motion turned on, everything is in place from the start and nothing moves.

## Look and feel

Pure black backgrounds, with dark grey tiles at 28px corners, like Apple's product tiles. NeuroSyn's brand blue is used for every main button, links are Apple blue, and the crystal colours (ice, blue, violet and pink) only appear as light on glass: the film on the bubbles, the ring around the founder photo and the most popular plan.

## Pages, in short

- **Home:** hero, statement, clients, six disciplines, work (AAKS, Polarions, IJAIKE), four delivery phases, four products, three ways to work together with the 2-week risk-free start, the scope estimator, the founder, three latest papers and one contact band.
- **Services:** all 6 disciplines with their 33 capabilities and the 3 engagement models.
- **Solutions:** the 4 platforms with their validated numbers and stacks. Each product has its own page with the description, numbers, every feature, benefits, who it's built for, status and the demo video.
- **Work:** the 3 named client systems with screenshots and results, plus the 5 field notes.
- **Industries:** 6 sectors with what we build and the compliance standards.
- **Technology:** 128 tools in 7 layers, with filters, and the engineering philosophy.
- **Research:** the Mamba language with a real code sample, then all 9 systems with filters. Each system has its own page with the overview, verified attributes, how the parts connect, the runtime steps and real code.
- **Insights:** all 8 papers with topic filters and search. Each paper is a full reading page with contents, author, keywords and related papers. The comparison tables in the papers are shown as real tables.
- **Reviews, Founder, About, Contact, Investors:** everything from the live pages, plus a working meeting booking on the founder page and the questions with an expert box on the contact page.

## Search

Press / or Ctrl K on any page, or click the magnifier. It searches pages, services, products, work, industries, research systems and papers. It copes with typos ("kubernetis" still finds Kubernetes), understands everyday words ("pricing", "on-prem", "blog"), offers "Did you mean", remembers recent searches, shows popular searches and works with the arrow keys, Enter and Esc.

## The feedback checklist, applied

- Real data only, with no notes to the client on any page
- NeuroSyn's own logo saved in `images/`, and its own photos and screenshots only
- Same 10 menu items as the live site. The Services mega menu has 3 link columns, 2 image cards and 4 quick picks, and it fits on screen
- Eyebrow pills on every page hero and on key sections
- Questions with an expert box (on the contact page)
- The contact ask appears once per page, there is no newsletter because the live site has none
- Compact cookie card bottom left
- Advanced search with typo matching, "Did you mean", recent and popular searches and keyboard hints
- Plain HTML, CSS and JavaScript in separate folders, no build step, no libraries
- No item repeated within a page
- Never more than 90px between sections
- Tested at 390, 820, 1024, 1280 and 1440 wide on every page, with no sideways scrolling and no console errors

## SEO and speed

- Every page has its own title, description and canonical address on neurosyn.it.com, plus Open Graph and Twitter tags
- One H1 per page, structured data on every page (organisation, founder, services, products, papers, breadcrumbs and the questions)
- All text is real HTML, so search engines can read every section
- Lighthouse in my setup: performance 97 to 100 on phones and 100 on desktop, accessibility 100, SEO 100. Best practices shows 96 only because my test setup blocks Google Fonts, so the browser logs that failed request
- About 36 KB of compressed CSS and JavaScript for the whole site, shared by every page

## Things to know before showing the client

- **Reviews.** The live site has one verified review (Dr Brian, VP at AAKS), so the page shows that one honestly and does not repeat the "4.9 out of 5" rating, which one review can't support.
- **Forms.** The contact form, review form, booking, estimator and cookie choices all work on the page but don't send anything anywhere yet.
- **Ask Muavia AI.** The founder page's AI chat on the live site needs a server, so it's left out of the concept.
- **CV.** The download button links to the live PDF on neurosyn.it.com.
- **Papers.** The live paper data stores its tables as long runs of headings. The concept turns them back into proper tables, with the same words.
- **Clients.** Client names are shown as clean wordmarks because there are no logo files for them.
