// api/sse-stream.js - Serverless Endpoint cho Server-Sent Events (SSE)
module.exports = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
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

    if (count >= 30) {
      clearInterval(sseInterval);
      res.end();
    }
  }, 1500);

  req.on('close', () => {
    clearInterval(sseInterval);
  });
};
