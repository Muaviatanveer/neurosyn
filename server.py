#!/usr/bin/env python3
"""
NeuroSyn Production Development Server
- Automatically resolves clean / extensionless URLs (e.g. /services -> services.html)
- Cleanly serves 404.html on any missing path with proper 404 HTTP status
- Handles static assets (CSS, JS, SVG, WEBP, PNG, Fonts) with accurate MIME types and caching headers
"""

import http.server
import os
import posixpath
import socketserver
import urllib.parse
import sys

DIRECTORY = os.path.abspath(os.path.dirname(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

class NeuroSynHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Disable all caching during development so browser always sees immediate edits
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def send_head(self):
        # Completely bypass 304 caching so clients always receive fresh files
        try:
            while 'If-Modified-Since' in self.headers:
                del self.headers['If-Modified-Since']
            while 'if-modified-since' in self.headers:
                del self.headers['if-modified-since']
        except Exception:
            pass
        return super().send_head()

    def do_GET(self):
        # Strip conditional headers to prevent 304 Not Modified responses
        if 'If-Modified-Since' in self.headers:
            del self.headers['If-Modified-Since']
        if 'If-None-Match' in self.headers:
            del self.headers['If-None-Match']

        parsed = urllib.parse.urlsplit(self.path)
        path = parsed.path

        # 1. Root path
        if path in ('/', ''):
            return super().do_GET()

        # 2. Translate path to filesystem
        clean_path = posixpath.normpath(urllib.parse.unquote(path))
        words = clean_path.split('/')
        words = [w for w in words if w]
        local_path = DIRECTORY
        for word in words:
            if os.path.dirname(word) or word in (os.curdir, os.pardir):
                continue
            local_path = os.path.join(local_path, word)

        # 3. Exact match exists (file or directory)
        if os.path.exists(local_path):
            return super().do_GET()

        # 4. Clean URL support: e.g. /services -> services.html
        if os.path.exists(local_path + '.html'):
            self.path = clean_path + '.html'
            if parsed.query:
                self.path += '?' + parsed.query
            return super().do_GET()

        # 5. Route Not Found: Serve 404.html with proper HTTP 404 status
        four_o_four = os.path.join(DIRECTORY, '404.html')
        if os.path.exists(four_o_four):
            try:
                with open(four_o_four, 'rb') as f:
                    content = f.read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception as e:
                pass

        return super().do_GET()

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    with ThreadedHTTPServer(("", PORT), NeuroSynHandler) as httpd:
        print(f"Serving NeuroSyn on http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
