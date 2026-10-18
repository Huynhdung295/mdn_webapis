// webapis/service_worker/script.js - Service Worker API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentReg = null;

  const spec = {
    id: "service_worker",
    panels: [
      {
        id: "panel-sw-controls",
        title: "1. Vòng Đời & Đăng Ký Service Worker",
        badge: "navigator.serviceWorker",
        desc: "Đăng ký script sw.js đóng vai trò reverse-proxy cache tài nguyên và quản lý vòng đời ứng dụng PWA.",
        actions: [
          { id: "btn-register-sw", label: "Đăng Ký SW (register('sw.js'))", variant: "primary", handler: "registerSW" },
          { id: "btn-check-sw", label: "Kiểm Tra Trạng Thái Đang Chạy", variant: "secondary", handler: "checkStatus" },
          { id: "btn-inspect-cache", label: "Kiểm Tra Cache Storage", variant: "secondary", handler: "inspectCaches" },
          { id: "btn-unregister-sw", label: "Gỡ Đăng Ký (unregister)", variant: "danger", handler: "unregisterSW" }
        ],
        previewBox: {
          id: "sw-status-box",
          initialText: "Đang kiểm tra Service Worker..."
        }
      }
    ]
  };

  async function updateDisplay(ctx) {
    if (!('serviceWorker' in navigator)) {
      ctx.setHtml('sw-status-box', '<span style="color:#f87171;">navigator.serviceWorker không khả dụng.</span>');
      return;
    }

    const reg = await navigator.serviceWorker.getRegistration();
    currentReg = reg;

    if (!reg) {
      ctx.setHtml('sw-status-box', '<div style="color:var(--text-muted);">Chưa có Service Worker nào được đăng ký cho phạm vi này.</div>');
      return;
    }

    const state = reg.active ? 'active' : (reg.installing ? 'installing' : (reg.waiting ? 'waiting' : 'unknown'));
    ctx.setHtml('sw-status-box', `
      <div style="color:#34d399; font-weight:700; margin-bottom:6px;">● Service Worker Đang Hoạt Động:</div>
      <div>• Phạm vi (scope): <code>${reg.scope}</code></div>
      <div>• Trạng thái vòng đời: <strong style="color:#38bdf8; text-transform:uppercase;">${state}</strong></div>
      <div>• Script URL: <code>${reg.active ? reg.active.scriptURL : 'Đang kích hoạt...'}</code></div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Service Worker API sẵn sàng");
      updateDisplay(ctx);
    },

    registerSW: async (ctx) => {
      ctx.workflowStep("Gọi navigator.serviceWorker.register('sw.js')");
      if (!('serviceWorker' in navigator)) {
        ctx.error("Trình duyệt không hỗ trợ Service Worker.");
        return;
      }

      try {
        const reg = await navigator.serviceWorker.register('sw.js', { scope: './' });
        currentReg = reg;
        ctx.success(`Đăng ký SW thành công! Scope: ${reg.scope}`);

        reg.onupdatefound = () => {
          ctx.info("Phát hiện bản cập nhật Service Worker mới.");
        };

        updateDisplay(ctx);
      } catch (err) {
        ctx.error("Lỗi đăng ký Service Worker:", err.message);
      }
    },

    checkStatus: async (ctx) => {
      ctx.workflowStep("Kiểm tra navigator.serviceWorker.controller");
      const ctrl = navigator.serviceWorker.controller;
      if (ctrl) {
        ctx.success(`Trang web đang được điều khiển bởi SW: ${ctrl.scriptURL} (state: ${ctrl.state})`);
      } else {
        ctx.warn("Trang web chưa được điều khiển bởi SW (Hãy tải lại trang sau khi đăng ký hoặc chạy clients.claim())");
      }
      updateDisplay(ctx);
    },

    inspectCaches: async (ctx) => {
      ctx.workflowStep("Kiểm tra caches.keys() & caches.match()");
      if (!('caches' in window)) {
        ctx.warn("Cache API không khả dụng.");
        return;
      }

      const keys = await caches.keys();
      ctx.info(`Tìm thấy ${keys.length} kho cache:`, keys);

      let totalItems = 0;
      for (const k of keys) {
        const c = await caches.open(k);
        const reqs = await c.keys();
        totalItems += reqs.length;
        ctx.info(`- Kho '${k}': chứa ${reqs.length} URLs được lưu offline`);
      }

      ctx.success(`Tổng cộng ${totalItems} tài nguyên đã sẵn sàng phục vụ khi mất mạng!`);
    },

    unregisterSW: async (ctx) => {
      ctx.workflowStep("Gỡ bỏ Service Worker: registration.unregister()");
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) {
        ctx.warn("Không có Service Worker nào để gỡ.");
        return;
      }

      const ok = await reg.unregister();
      if (ok) {
        ctx.warn("Đã huỷ đăng ký Service Worker thành công.");
        currentReg = null;
        updateDisplay(ctx);
      } else {
        ctx.error("Không thể huỷ đăng ký Service Worker.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
