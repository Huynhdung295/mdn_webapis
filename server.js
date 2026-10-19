// server.js - Máy chủ phát triển HTTP nội bộ dành cho MDN Web API Demos
// Không phụ thuộc thư viện ngoài (zero-dependencies), tối ưu cho thử nghiệm Web APIs
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'audio/ogg',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  // Cho phép CORS để test các API mạng
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Mock API endpoints cho các thử nghiệm như Beacon API, Background Fetch, Fetch API
  if (req.url.startsWith('/api/beacon-collector')) {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const data = Buffer.concat(body).toString();
      console.log(`[Beacon Received] Length: ${data.length} bytes, Time: ${new Date().toLocaleTimeString()}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', receivedBytes: data.length, timestamp: Date.now() }));
    });
    return;
  }

  if (req.url.startsWith('/api/echo')) {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const data = Buffer.concat(body).toString();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: data
      }));
    });
    return;
  }

  // Server-Sent Events (SSE) Stream Endpoint
  if (req.url.startsWith('/api/sse-stream')) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    res.write(`data: ${JSON.stringify({ msg: "Kết nối SSE thành công!", timestamp: Date.now() })}\n\n`);

    let count = 0;
    const sseInterval = setInterval(() => {
      count++;
      const samplePrice = (2400 + Math.random() * 50).toFixed(2);
      res.write(`event: price-update\n`);
      res.write(`data: ${JSON.stringify({ count, price: samplePrice, time: new Date().toLocaleTimeString() })}\n\n`);

      if (count >= 100) clearInterval(sseInterval);
    }, 1500);

    req.on('close', () => {
      clearInterval(sseInterval);
      console.log('[SSE] Client disconnected');
    });
    return;
  }

  // Xử lý tệp tĩnh
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') {
    res.writeHead(302, { 'Location': '/client/index.html' });
    res.end();
    return;
  }

  let filePath = path.join(ROOT, decodeURIComponent(reqUrl));

  // Kiểm tra an toàn path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Fallback tìm kiếm trong thư mục client (cho client.css, client.js)
      const clientFallback = path.join(ROOT, 'client', decodeURIComponent(reqUrl));
      if (fs.existsSync(clientFallback) && fs.statSync(clientFallback).isFile()) {
        filePath = clientFallback;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`404 Not Found: ${reqUrl}`);
        return;
      }
    } else if (stats && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`404 Not Found`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      // Hỗ trợ Permissions-Policy và Service Workers
      const headers = {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      };

      if (ext === '.js' && filePath.includes('sw.js')) {
        headers['Service-Worker-Allowed'] = '/';
      }

      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

if (require.main === module || !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` MDN Web APIs Interactive Laboratory Server Running!`);
    console.log(` Truy cập bảng điều khiển: http://localhost:${PORT}/client/index.html`);
    console.log(` Hoặc trang chủ: http://localhost:${PORT}/`);
    console.log(`====================================================`);
  });
}

module.exports = server;
