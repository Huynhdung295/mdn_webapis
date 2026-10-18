// webapis/background_sync/sw.js - Service Worker xử lý Background Sync
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Bắt sự kiện đồng bộ ngầm khi thiết bị có mạng
self.addEventListener('sync', (event) => {
  console.log('[SW] Bắt được sự kiện sync với tag:', event.tag);

  if (event.tag === 'sync-outbox-messages') {
    event.waitUntil(syncOutboxMessages());
  } else if (event.tag.startsWith('custom-sync-')) {
    event.waitUntil(handleCustomSync(event.tag));
  }
});

async function syncOutboxMessages() {
  // Gửi thông báo cho trang web biết là đang đồng bộ
  const clients = await self.clients.matchAll({ type: 'window' });
  for (const client of clients) {
    client.postMessage({
      type: 'SYNC_IN_PROGRESS',
      tag: 'sync-outbox-messages',
      timestamp: Date.now()
    });
  }

  // Giả lập gửi dữ liệu qua API
  try {
    const res = await fetch('/api/echo?source=sw-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "Đồng bộ ngầm thành công qua Service Worker!", timestamp: Date.now() })
    });
    const result = await res.json();

    for (const client of clients) {
      client.postMessage({
        type: 'SYNC_COMPLETED',
        tag: 'sync-outbox-messages',
        result: result,
        timestamp: Date.now()
      });
    }
  } catch (err) {
    console.error('[SW Sync] Gửi dữ liệu thất bại, sẽ thử lại sau:', err);
    throw err; // Ném lỗi để trình duyệt tự động thử lại sync lần sau
  }
}

async function handleCustomSync(tag) {
  const clients = await self.clients.matchAll({ type: 'window' });
  for (const client of clients) {
    client.postMessage({
      type: 'SYNC_COMPLETED',
      tag: tag,
      timestamp: Date.now()
    });
  }
}
