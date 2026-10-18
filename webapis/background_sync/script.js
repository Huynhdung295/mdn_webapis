// webapis/background_sync/script.js - Background Synchronization API: Workflow thực tế
(function() {
  'use strict';

  let swReg = null;
  let simulatedOutbox = [];

  WebAPICore.init({
    id: "background_sync",
    name: "Background Synchronization API",
    group: "B",
    category: "Network & Background",
    status: "Standard",
    browserMatrix: {
      chrome: "49+",
      edge: "79+",
      firefox: "No",
      safari: "No"
    },
    supportCheck: () => {
      return 'SyncManager' in window;
    },
    why: "Giải quyết bài toán mất kết nối mạng: người dùng gửi tin nhắn hay bài đăng lúc offline, trình duyệt lưu tag lại và tự động gửi dữ liệu lên server trong nền ngay khi thiết bị có mạng, dù người dùng đã đóng tab.",
    whenToUse: "Ứng dụng chat, mạng xã hội, ứng dụng ghi chú ngoại tuyến, gửi đơn đặt hàng khi mạng chập chờn.",
    whenNotToUse: "Các thao tác yêu cầu kết quả đồng bộ tức thời (như xác thực mã OTP, thanh toán trực tiếp qua cổng ngân hàng).",
    coreItems: [
      "ServiceWorkerRegistration.prototype.sync",
      "SyncManager.prototype.register(tag)",
      "SyncManager.prototype.getTags()",
      "ServiceWorker: self.addEventListener('sync', (event) => ...)"
    ],
    onReady: function(core) {
      core.workflowStep("Khởi động môi trường Background Sync");
      initSyncSW();
      setupNetworkListeners();
      setupListeners();
    }
  });

  async function initSyncSW() {
    const box = document.getElementById('sync-sw-status');
    if (!('serviceWorker' in navigator)) {
      if (box) box.innerHTML = `<span style="color:#f87171;">Trình duyệt không hỗ trợ Service Worker.</span>`;
      return;
    }

    try {
      WebAPICore.workflowStep("Đăng ký Service Worker: sw.js");
      swReg = await navigator.serviceWorker.register('sw.js');
      WebAPICore.success("Service Worker đã sẵn sàng:", { scope: swReg.scope });

      const hasSync = 'sync' in swReg;
      if (box) {
        box.innerHTML = `
          <div>Service Worker: <strong style="color:#34d399;">Active</strong></div>
          <div style="margin-top:2px;">Giao diện registration.sync: <strong style="color:${hasSync ? '#34d399' : '#f87171'}">${hasSync ? '✔ Có hỗ trợ' : '✖ Không'}</strong></div>
        `;
      }

      navigator.serviceWorker.addEventListener('message', (event) => {
        const data = event.data;
        if (!data) return;

        if (data.type === 'SYNC_IN_PROGRESS') {
          WebAPICore.workflowStep(`[SW Sự Kiện] Đang đồng bộ dữ liệu tag: "${data.tag}"`);
          markOutboxStatus('Đang gửi lên server...');
        } else if (data.type === 'SYNC_COMPLETED') {
          WebAPICore.success(`[SW Sự Kiện] Hoàn tất đồng bộ tag: "${data.tag}"`, data.result);
          markOutboxStatus('✔ Đã đồng bộ');
        }
      });

    } catch (err) {
      WebAPICore.error("Lỗi đăng ký Service Worker:", err);
      if (box) box.innerHTML = `<span style="color:#f87171;">Lỗi SW: ${err.message}</span>`;
    }
  }

  function setupNetworkListeners() {
    const statusChip = document.getElementById('network-status-chip');

    function updateNetworkStatus() {
      const isOnline = navigator.onLine;
      if (statusChip) {
        if (isOnline) {
          statusChip.style.background = 'rgba(16, 185, 129, 0.15)';
          statusChip.style.color = '#34d399';
          statusChip.style.borderColor = 'rgba(16, 185, 129, 0.3)';
          statusChip.innerHTML = '🟢 Online (Đang có mạng)';
        } else {
          statusChip.style.background = 'rgba(239, 68, 68, 0.15)';
          statusChip.style.color = '#f87171';
          statusChip.style.borderColor = 'rgba(239, 68, 68, 0.3)';
          statusChip.innerHTML = '🔴 Offline (Mất mạng)';
        }
      }
    }

    window.addEventListener('online', () => {
      updateNetworkStatus();
      WebAPICore.event("online", "Khôi phục kết nối mạng! Trình duyệt sẽ tự động kích hoạt Service Worker sync.");
    });

    window.addEventListener('offline', () => {
      updateNetworkStatus();
      WebAPICore.event("offline", "Thiết bị mất mạng! Các tác vụ đồng bộ sẽ được hoãn lại.");
    });

    updateNetworkStatus();
  }

  function setupListeners() {
    const btnRegisterTag = document.getElementById('btn-register-tag');
    const btnQueryTags = document.getElementById('btn-query-tags');
    const btnSimulateMsg = document.getElementById('btn-simulate-offline-msg');

    btnRegisterTag.addEventListener('click', async () => {
      if (!swReg || !swReg.sync) {
        WebAPICore.error("Trình duyệt không hỗ trợ swRegistration.sync.");
        return;
      }

      const tag = document.getElementById('sync-tag-input').value.trim() || 'default-sync-tag';
      WebAPICore.workflowStep(`Gọi swRegistration.sync.register("${tag}")`);

      try {
        await swReg.sync.register(tag);
        WebAPICore.success(`Đã đăng ký tag đồng bộ "${tag}" thành công!`);
        btnQueryTags.click();
      } catch (err) {
        WebAPICore.error(`Lỗi khi đăng ký thẻ "${tag}":`, err);
      }
    });

    btnQueryTags.addEventListener('click', async () => {
      if (!swReg || !swReg.sync) {
        WebAPICore.warn("SyncManager không khả dụng.");
        return;
      }

      WebAPICore.workflowStep("Gọi swRegistration.sync.getTags()");
      try {
        const tags = await swReg.sync.getTags();
        WebAPICore.info(`Số thẻ đồng bộ đang chờ (${tags.length}):`, tags);
      } catch (err) {
        WebAPICore.error("Lỗi getTags():", err);
      }
    });

    btnSimulateMsg.addEventListener('click', () => {
      const msg = {
        id: Date.now(),
        content: `Tin nhắn gửi lúc ${new Date().toLocaleTimeString()}`,
        status: navigator.onLine ? 'Đang gửi qua sync...' : 'Đang chờ mạng (Queued)'
      };

      simulatedOutbox.push(msg);
      renderOutbox();
      WebAPICore.workflowStep("Đã tạo tin nhắn vào hàng đợi Outbox", msg);

      document.getElementById('sync-tag-input').value = 'sync-outbox-messages';
      btnRegisterTag.click();
    });
  }

  function renderOutbox() {
    const container = document.getElementById('outbox-queue-container');
    if (!container) return;

    if (simulatedOutbox.length === 0) {
      container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem;">Chưa có tin nhắn trong hàng đợi.</span>`;
      return;
    }

    container.innerHTML = simulatedOutbox.map(m => `
      <div class="queue-item">
        <div>
          <strong style="color:#fff;">${m.content}</strong>
          <div style="font-size:0.72rem;color:var(--text-muted);font-family:var(--font-mono);">ID: ${m.id}</div>
        </div>
        <span class="badge ${m.status.includes('✔') ? 'badge-success' : 'badge-warning'}">${m.status}</span>
      </div>
    `).join('');
  }

  function markOutboxStatus(newStatus) {
    simulatedOutbox.forEach(m => m.status = newStatus);
    renderOutbox();
  }

})();
