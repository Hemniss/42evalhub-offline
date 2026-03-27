#!/bin/bash
cd "$(dirname "$0")/www.42evalhub.com"
echo "42 EvalHub local server: http://localhost:8000"
open "http://localhost:8000"
python3 -c "
import http.server, os

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            self.path = '/index.html'
            return self.do_GET()
        super().send_error(code, message, explain)
    def log_message(self, format, *args):
        print(f'{self.address_string()} - {format % args}')

http.server.test(HandlerClass=SPAHandler, port=8000, bind='')
"
