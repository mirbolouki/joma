#!/usr/bin/env python3
"""
سرور بازبینی جوما — با هدرهای no-store تا مرورگر نسخهٔ قدیمی را نشان ندهد.
این فایل بخشی از محصول نیست؛ ابزار بازبینی است.

استفاده:  python3 preview/_serve.py [port]
"""
import sys, os, functools, http.server, socketserver

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # ریشهٔ ریپو
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        # هیچ‌چیز کش نشود — نسخهٔ تازه هر بار از سرور بیاید
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def send_head(self):
        # ریشه → صفحهٔ شروع بازبینی
        if self.path in ('/', ''):
            self.path = '/preview/proto/index.html'
        return super().send_head()

    def log_message(self, fmt, *args):
        sys.stderr.write('%s - %s\n' % (self.address_string(), fmt % args))

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == '__main__':
    with Server(('0.0.0.0', PORT), functools.partial(Handler)) as httpd:
        print('JOMA preview on 0.0.0.0:%d (root=%s) — no-store' % (PORT, ROOT))
        httpd.serve_forever()
