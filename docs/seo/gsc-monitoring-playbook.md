# NeuroSyn — Google Search Console & Continuous SEO Monitoring Playbook

This playbook establishes a weekly 10-minute cadence to monitor indexing velocity, crawl statistics, and search performance across North American and European enterprise traffic.

---

## 📅 Weekly 10-Minute Audit Cadence

### Step 1: Host Status & Crawl Failures (0% Tolerance)
1. Navigate to: **Google Search Console** > **Settings** > **Crawl stats**.
2. Click **Host status**.
3. Verify that **Server connectivity**, **Robots.txt fetch**, and **DNS resolution** all show **Green Checks (99–100% OK)**.
4. *If any "Server connection error" appears:* Check whether Render free instance slept or if UptimeRobot ping on `https://www.neurosyn.it.com/healthz` missed an interval.

### Step 2: Indexing Progress (Pages Report)
1. Navigate to **Indexing** > **Pages**.
2. Compare:
   - **Indexed Pages:** Should climb steadily toward the 25 total URLs listed in `sitemap.xml`.
   - **Not Indexed > Discovered - currently not indexed:** Normal for newly published pages (< 2 weeks old).
   - **Not Indexed > Crawled - currently not indexed:** If pages stay here for > 3 weeks, syndicate them on Dev.to/Medium to trigger backlinks that accelerate indexing.
   - **Page with redirect:** Verify that `/testimonials` is recognized under this category with target `/research`.

### Step 3: Top International Query Clicks & Impressions
1. Navigate to **Performance** > **Search results**.
2. Filter:
   - **Country:** United States & United Kingdom.
   - **Date range:** Last 28 days vs Previous Period.
3. Track commercial queries:
   - *"private AI search company documents"*
   - *"SAP ledger anomaly detection AI"*
   - *"enterprise copilot architecture"*
   - *"sovereign AI infrastructure"*
4. For queries with high impressions but low CTR (< 2%), adjust the title tags and meta descriptions in `src/data/insights.ts` to improve click appeal.

---

## 🛡️ Monthly Security & Header Audit

Run automated verification:
```bash
python3 scripts/seo-audit.py
```
Or check third-party security evaluators:
- **Mozilla Observatory:** Verify `A+` score on `https://www.neurosyn.it.com`
- **SecurityHeaders.com:** Confirm green scores for CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
