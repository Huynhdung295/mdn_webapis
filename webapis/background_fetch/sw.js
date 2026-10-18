// webapis/background_fetch/sw.js - Service Worker xử lý Background Fetch
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Sự kiện khi Background Fetch tải xong thành công
self.addEventListener('backgroundfetchsuccess', (event) => {
  const bgFetch = event.registration;
  event.waitUntil(async function() {
    // Mở cache lưu trữ các phản hồi tải ngầm
    const cache = await caches.open(bgFetch.id);
    const records = await bgFetch.matchAll();

    const promises = records.map(async (record) => {
      const response = await record.responseReady;
      await cache.put(record.request, response);
    });

    await Promise.all(promises);

    // Cập nhật giao diện thanh thông báo tải xong
    await event.updateUI({ title: `Đã hoàn tất tải ngầm: ${bgFetch.id}!` });

    // Thông báo cho các tab mở
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) {
      client.postMessage({
        type: 'BACKGROUND_FETCH_SUCCESS',
        id: bgFetch.id
      });
    }
  }());
});

// Sự kiện khi Background Fetch thất bại
self.addEventListener('backgroundfetchfail', (event) => {
  console.warn('[SW] Background Fetch failed:', event.registration.id);
});

// Sự kiện khi người dùng click vào thông báo tiến trình của Background Fetch
self.addEventListener('backgroundfetchclick', (event) => {
  const bgFetch = event.registration;
  event.waitUntil(async function() {
    const clients = await self.clients.matchAll({ type: 'window' });
    if (clients.length > 0) {
      clients[0].focus();
    } else {
      self.clients.openWindow('/webapis/background_fetch/index.html');
    }
  }());
});
