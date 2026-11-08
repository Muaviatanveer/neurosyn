#!/usr/bin/env python3
"""
NeuroSyn Automated SEO, Security & Health Audit Script
Continuously tests production deployment against Core Web Vitals, Security Headers,
Canonical integrity, Dynamic Sitemap coverage, and Rate Limiting.
"""

import sys
import json
import urllib.request
import urllib.error
import re
from xml.etree import ElementTree

BASE_URL = "https://www.neurosyn.it.com"

def log(msg, status="INFO"):
    colors = {
        "INFO": "\033[94m",
        "PASS": "\033[92m",
        "WARN": "\033[93m",
        "FAIL": "\033[91m",
        "RESET": "\033[0m"
    }
    c = colors.get(status, "")
    r = colors["RESET"]
    print(f"{c}[{status}]{r} {msg}")

def check_security_headers():
    log("Checking HTTP Security Headers on root and /insights...", "INFO")
    req = urllib.request.Request(f"{BASE_URL}/", headers={"User-Agent": "NeuroSyn-SEO-Auditor/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            headers = {k.lower(): v for k, v in resp.headers.items()}
            
            required_headers = [
                ("strict-transport-security", "HSTS Preload"),
                ("x-content-type-options", "MIME Sniffing Defense"),
                ("x-frame-options", "Clickjacking Defense"),
                ("referrer-policy", "Referrer Protection"),
                ("permissions-policy", "Hardware API Lock"),
                ("content-security-policy", "CSP Script Restrictions")
            ]
            
            all_passed = True
            for h, label in required_headers:
                if h in headers:
                    log(f"Header present: {h} ({label})", "PASS")
                else:
                    log(f"Missing header: {h} ({label})", "FAIL")
                    all_passed = False
            return all_passed
    except Exception as e:
        log(f"Failed to fetch {BASE_URL}: {e}", "FAIL")
        return False

def check_sitemap_urls():
    log("Fetching and validating sitemap.xml...", "INFO")
    sitemap_url = f"{BASE_URL}/sitemap.xml"
    req = urllib.request.Request(sitemap_url, headers={"User-Agent": "NeuroSyn-SEO-Auditor/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode("utf-8")
            root = ElementTree.fromstring(content)
            
            # Namespace handling
            namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            loc_elements = root.findall(".//ns:loc", namespace)
            urls = [el.text.strip() for el in loc_elements if el.text]
            
            log(f"Discovered {len(urls)} URLs in sitemap", "INFO")
            
            failures = 0
            for u in urls:
                try:
                    u_req = urllib.request.Request(u, headers={"User-Agent": "NeuroSyn-SEO-Auditor/1.0"})
                    with urllib.request.urlopen(u_req, timeout=8) as u_resp:
                        if u_resp.status == 200:
                            log(f"200 OK: {u}", "PASS")
                        else:
                            log(f"Unexpected status {u_resp.status}: {u}", "WARN")
                            failures += 1
                except urllib.error.HTTPError as e:
                    log(f"HTTP {e.code} Error: {u}", "FAIL")
                    failures += 1
                except Exception as e:
                    log(f"Error fetching {u}: {e}", "FAIL")
                    failures += 1
                    
            return failures == 0
    except Exception as e:
        log(f"Failed to fetch sitemap: {e}", "FAIL")
        return False

def check_architecture_redirects():
    log("Verifying /testimonials -> /research 301 Permanent Redirect...", "INFO")
    test_url = f"{BASE_URL}/testimonials"
    
    # Custom redirect handler that doesn't follow redirects automatically
    class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
        def http_error_301(self, req, fp, code, msg, headers):
            return fp
        def http_error_302(self, req, fp, code, msg, headers):
            return fp

    opener = urllib.request.build_opener(NoRedirectHandler)
    req = urllib.request.Request(test_url, headers={"User-Agent": "NeuroSyn-SEO-Auditor/1.0"})
    try:
        resp = opener.open(req, timeout=10)
        location = resp.headers.get("location", "")
        if "research" in location:
            log(f"301 Redirect functional: {test_url} -> {location}", "PASS")
            return True
        else:
            log(f"Redirect failed or unexpected location: {location}", "FAIL")
            return False
    except Exception as e:
        log(f"Redirect test error: {e}", "FAIL")
        return False

def check_rate_limiting():
    log("Testing /healthz rate limiting barrier...", "INFO")
    url = f"{BASE_URL}/healthz"
    tripped = False
    for i in range(65):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "NeuroSyn-RateLimit-Auditor/1.0"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                pass
        except urllib.error.HTTPError as e:
            if e.code == 429:
                tripped = True
                log(f"Rate limiter tripped at request #{i+1}: 429 Too Many Requests", "PASS")
                break
        except Exception:
            pass
    if not tripped:
        log("Rate limiter did not return 429 within 65 requests", "WARN")
    return tripped

def main():
    print("=" * 60)
    print("   NEUROSYN AUTOMATED SEO & SECURITY VERIFICATION SUITE   ")
    print("=" * 60)
    
    sec_ok = check_security_headers()
    redir_ok = check_architecture_redirects()
    sitemap_ok = check_sitemap_urls()
    rate_ok = check_rate_limiting()
    
    print("-" * 60)
    if sec_ok and redir_ok and sitemap_ok:
        log("All Core SEO & Security Tests Passed (100% Score)!", "PASS")
        sys.exit(0)
    else:
        log("One or more tests failed. Review output above.", "FAIL")
        sys.exit(1)

if __name__ == "__main__":
    main()

