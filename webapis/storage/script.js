// webapis/storage/script.js - Storage API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "storage",
    panels: [
      {
        id: "panel-storage-estimate",
        title: "1. Ước Lượng Dung Lượng & Lưu Trữ Vĩnh Viễn",
        badge: "navigator.storage.estimate()",
        desc: "Truy vấn hạn mức ổ đĩa (quota), lượng dung lượng đã sử dụng (usage) và xin quyền lưu trữ vĩnh viễn (persistent storage) để tránh bị trình duyệt tự động xoá khi đầy bộ nhớ.",
        actions: [
          { id: "btn-estimate-storage", label: "Kiểm Tra Dung Lượng (estimate)", variant: "primary", handler: "estimateStorage" },
          { id: "btn-request-persist", label: "Xin Quyền Lưu Trữ Vĩnh Viễn (persist)", variant: "secondary", handler: "requestPersist" }
        ],
        previewBox: {
          id: "storage-status-box",
          initialText: "Đang ước lượng dung lượng lưu trữ..."
        }
      }
    ]
  };

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Storage API sẵn sàng");
      handlers.estimateStorage(ctx);
    },

    estimateStorage: async (ctx) => {
      ctx.workflowStep("Gọi navigator.storage.estimate()");
      if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
        ctx.warn("navigator.storage.estimate không khả dụng.");
        return;
      }

      try {
        const est = await navigator.storage.estimate();
        const isPersisted = navigator.storage.persisted ? await navigator.storage.persisted() : false;

        const usageStr = formatBytes(est.usage || 0);
        const quotaStr = formatBytes(est.quota || 0);
        const pct = est.quota ? ((est.usage / est.quota) * 100).toFixed(3) : 0;

        ctx.success(`Đã ước lượng: Dùng ${usageStr} / Tổng cấp ${quotaStr} (${pct}%)`);

        ctx.setHtml('storage-status-box', `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <div style="font-size:0.85rem; color:var(--text-muted);">Dung lượng đã sử dụng: <strong style="color:#38bdf8;">${usageStr}</strong></div>
            <div style="font-size:0.85rem; color:var(--text-muted);">Tổng hạn mức cấp phát: <strong style="color:#34d399;">${quotaStr}</strong></div>
          </div>
          <div class="storage-meter">
            <div class="storage-meter-fill" style="width: ${Math.max(1, pct)}%;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
            <div>• Tỷ lệ sử dụng: <code>${pct}%</code></div>
            <div>• Chế độ lưu trữ: <span class="badge ${isPersisted ? 'badge-success' : 'badge-warning'}">
              ${isPersisted ? '✔ Persistent (Vĩnh viễn - Không bị tự xoá)' : 'Best-effort (Tạm thời)'}
            </span></div>
          </div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi ước lượng dung lượng:", err);
      }
    },

    requestPersist: async (ctx) => {
      ctx.workflowStep("Gọi navigator.storage.persist()");
      if (!('storage' in navigator) || !('persist' in navigator.storage)) {
        ctx.warn("navigator.storage.persist không khả dụng.");
        return;
      }

      try {
        const granted = await navigator.storage.persist();
        if (granted) {
          ctx.success("Quyền lưu trữ vĩnh viễn (Persistent Storage) ĐÃ ĐƯỢC CẤP! Dữ liệu sẽ không bao giờ bị trình duyệt tự xoá.");
        } else {
          ctx.warn("Trình duyệt từ chối cấp quyền lưu trữ vĩnh viễn (do trang chưa được bookmark hoặc chưa đủ tương tác).");
        }
        handlers.estimateStorage(ctx);
      } catch (err) {
        ctx.error("Lỗi xin quyền persist:", err);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
