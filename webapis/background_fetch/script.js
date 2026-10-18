// webapis/background_fetch/script.js - Background Fetch API: Workflow thực tế
(function() {
  'use strict';

  let swRegistration = null;
  let activeRegistration = null;

  WebAPICore.init({
    id: "background_fetch",
    name: "Background Fetch API",
    group: "B",
    category: "Network & Background",
    status: "Standard",
    browserMatrix: {
      chrome: "74+",
      edge: "79+",
      firefox: "No",
      safari: "No"
    },
    supportCheck: () => {
      return 'BackgroundFetchManager' in window;
    },
    why: "Tải file lớn (phim, nhạc, asset 3D) nếu dùng fetch thường sẽ bị huỷ ngay khi người dùng tắt tab hoặc khoá điện thoại. Background Fetch bàn giao việc tải cho OS quản lý, có thanh tiến trình hệ thống và tiếp tục tải ngầm.",
    whenToUse: "Ứng dụng nghe nhạc ngoại tuyến (Spotify PWA), tải video xem trên máy bay (Netflix PWA), tải gói tài nguyên game PWA.",
    whenNotToUse: "Tải file nhỏ dưới 5MB hoặc gọi API JSON thông thường (nên dùng fetch tiêu chuẩn).",
    coreItems: [
      "BackgroundFetchManager.prototype.fetch(id, requests, options)",
      "BackgroundFetchRegistration.prototype.abort()",
      "BackgroundFetchRegistration.prototype.matchAll()",
      "ServiceWorker: self.addEventListener('backgroundfetchsuccess')"
    ],
    onReady: function(core) {
      core.workflowStep("Khởi động môi trường Background Fetch");
      initServiceWorker();
      setupListeners();
    }
  });

  async function initServiceWorker() {
    const box = document.getElementById('sw-status-box');
    if (!('serviceWorker' in navigator)) {
      if (box) box.innerHTML = `<span style="color:#f87171;">Trình duyệt không hỗ trợ Service Worker.</span>`;
      return;
    }

    try {
      WebAPICore.workflowStep("Đang đăng ký Service Worker: sw.js");
      swRegistration = await navigator.serviceWorker.register('sw.js');
      WebAPICore.success("Service Worker đã sẵn sàng:", { scope: swRegistration.scope });
      
      const hasBgFetch = 'backgroundFetch' in swRegistration;
      if (box) {
        box.innerHTML = `
          <div>Service Worker: <strong style="color:#34d399;">Active</strong></div>
          <div style="margin-top:2px;">Hỗ trợ registration.backgroundFetch: <strong style="color:${hasBgFetch ? '#34d399' : '#f87171'}">${hasBgFetch ? '✔ Có hỗ trợ' : '✖ Không'}</strong></div>
        `;
      }

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'BACKGROUND_FETCH_SUCCESS') {
          WebAPICore.workflowStep(`[SW Sự Kiện] Hoàn tất tải ngầm task: ${event.data.id}`);
          const badge = document.getElementById('task-status-badge');
          if (badge) {
            badge.className = 'badge badge-success';
            badge.innerText = 'Hoàn tất tải ngầm';
          }
        }
      });

    } catch (err) {
      WebAPICore.error("Đăng ký Service Worker thất bại:", err);
      if (box) box.innerHTML = `<span style="color:#f87171;">Lỗi SW: ${err.message}</span>`;
    }
  }

  function setupListeners() {
    const btnRegister = document.getElementById('btn-register-sw');
    const btnGetTasks = document.getElementById('btn-get-existing-tasks');
    const btnStart = document.getElementById('btn-start-bg-fetch');
    const btnAbort = document.getElementById('btn-abort-bg-fetch');
    const btnInspectCache = document.getElementById('btn-inspect-cache');
    const btnClearCache = document.getElementById('btn-clear-cache');

    btnRegister.addEventListener('click', () => initServiceWorker());

    btnGetTasks.addEventListener('click', async () => {
      if (!swRegistration || !swRegistration.backgroundFetch) {
        WebAPICore.warn("backgroundFetch chưa khả dụng trên Service Worker.");
        return;
      }

      WebAPICore.workflowStep("Gọi swRegistration.backgroundFetch.getIds()");
      try {
        const ids = await swRegistration.backgroundFetch.getIds();
        WebAPICore.info(`Số tác vụ tải ngầm đang hoạt động: ${ids.length}`, ids);
      } catch (err) {
        WebAPICore.error("Lỗi getIds():", err);
      }
    });

    btnStart.addEventListener('click', async () => {
      if (!swRegistration || !swRegistration.backgroundFetch) {
        WebAPICore.error("Trình duyệt không hỗ trợ registration.backgroundFetch");
        return;
      }

      const taskId = document.getElementById('task-id-input').value.trim() || `task-${Date.now()}`;
      const taskTitle = document.getElementById('task-title-input').value.trim() || "Tải tài nguyên";
      const urlsToFetch = ['../shared/styles.css', '../shared/ui-core.js', '../shared/api-data.js'];

      WebAPICore.workflowStep(`Bắt đầu tải ngầm: backgroundFetch.fetch("${taskId}")`);
      try {
        activeRegistration = await swRegistration.backgroundFetch.fetch(taskId, urlsToFetch, {
          title: taskTitle,
          icons: [{
            sizes: '192x192',
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%236366f1"/></svg>',
            type: 'image/svg+xml'
          }],
          downloadTotal: 40000
        });

        WebAPICore.success(`Tạo task "${activeRegistration.id}" thành công!`, {
          id: activeRegistration.id,
          total: activeRegistration.downloadTotal
        });

        renderActiveTask(activeRegistration, taskTitle);
        trackTaskProgress(activeRegistration);
      } catch (err) {
        WebAPICore.error("Lỗi khởi tạo backgroundFetch:", err);
      }
    });

    btnAbort.addEventListener('click', async () => {
      if (!activeRegistration) {
        WebAPICore.warn("Không có tác vụ tải nào đang chạy để huỷ.");
        return;
      }

      WebAPICore.workflowStep(`Gọi activeRegistration.abort() cho task: ${activeRegistration.id}`);
      try {
        await activeRegistration.abort();
        WebAPICore.warn(`Đã huỷ tác vụ: ${activeRegistration.id}`);
        const badge = document.getElementById('task-status-badge');
        if (badge) {
          badge.className = 'badge badge-danger';
          badge.innerText = 'Đã huỷ';
        }
      } catch (err) {
        WebAPICore.error("Lỗi huỷ task:", err);
      }
    });

    btnInspectCache.addEventListener('click', async () => {
      const taskId = document.getElementById('task-id-input').value.trim();
      WebAPICore.workflowStep(`Kiểm tra Cache Storage của task: "${taskId}"`);

      try {
        const cache = await caches.open(taskId);
        const keys = await cache.keys();
        WebAPICore.info(`Cache "${taskId}" chứa ${keys.length} tệp:`, keys.map(k => k.url));

        const listEl = document.getElementById('cached-files-list');
        if (keys.length === 0) {
          listEl.innerHTML = `<span>Cache "${taskId}" hiện trống (đang tải hoặc chưa hoàn tất).</span>`;
        } else {
          listEl.innerHTML = keys.map(k => `<div>✔ ${k.url}</div>`).join('');
        }
      } catch (err) {
        WebAPICore.error("Lỗi đọc cache:", err);
      }
    });

    btnClearCache.addEventListener('click', async () => {
      const taskId = document.getElementById('task-id-input').value.trim();
      try {
        const deleted = await caches.delete(taskId);
        WebAPICore.success(`Đã xoá Cache Storage "${taskId}". Thành công: ${deleted}`);
        document.getElementById('cached-files-list').innerHTML = `<span>Đã xoá cache "${taskId}".</span>`;
      } catch (err) {
        WebAPICore.error("Lỗi xoá cache:", err);
      }
    });
  }

  function renderActiveTask(reg, title) {
    const card = document.getElementById('active-task-container');
    if (!card) return;
    card.style.display = 'block';

    document.getElementById('task-label-title').innerText = title;
    document.getElementById('task-label-id').innerText = `ID: ${reg.id}`;
    document.getElementById('task-status-badge').className = 'badge badge-info';
    document.getElementById('task-status-badge').innerText = 'Đang tải';
  }

  function trackTaskProgress(reg) {
    const fill = document.getElementById('progress-bar-fill');
    const bytesLabel = document.getElementById('progress-bytes-label');
    const pctLabel = document.getElementById('progress-pct-label');

    reg.addEventListener('progress', () => {
      const downloaded = reg.downloaded;
      const total = reg.downloadTotal || 1;
      const pct = Math.min(100, Math.round((downloaded / total) * 100));

      fill.style.width = `${pct}%`;
      bytesLabel.innerText = `${(downloaded / 1024).toFixed(1)} KB / ${(total / 1024).toFixed(1)} KB`;
      pctLabel.innerText = `${pct}%`;

      WebAPICore.log(`Tiến độ tải: ${downloaded}/${total} bytes (${pct}%)`, 'info');
    });
  }

})();
