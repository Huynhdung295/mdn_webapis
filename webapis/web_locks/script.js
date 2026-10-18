// webapis/web_locks/script.js - Web Locks API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "web_locks",
    panels: [
      {
        id: "panel-locks-demo",
        title: "1. Đồng Bộ Tài Nguyên Độc Quyền (Mutex / Exclusive Lock)",
        badge: "navigator.locks.request()",
        desc: "Đảm bảo chỉ có DUY NHẤT 1 tác vụ được thực thi tại một thời điểm, ngăn chặn xung đột ghi đồng thời (race condition) giữa nhiều tab trình duyệt.",
        inputs: [
          { id: "lock-name-input", label: "Tên tài nguyên cần khoá:", type: "text", value: "sync_database_resource" },
          { id: "lock-duration", label: "Thời gian giữ khoá (mili-giây):", type: "text", value: "3000" }
        ],
        actions: [
          { id: "btn-acquire-lock", label: "Yêu Cầu Khoá Độc Quyền (Exclusive)", variant: "primary", handler: "acquireLock" },
          { id: "btn-race-test", label: "Mô Phỏng Tranh Chấp 2 Tab (Contention Test)", variant: "secondary", handler: "runContentionTest" },
          { id: "btn-query-locks", label: "Truy Vấn Danh Sách Khoá (locks.query)", variant: "secondary", handler: "queryLocks" }
        ],
        previewBox: {
          id: "locks-status-box",
          initialText: "Chưa có khoá nào được giữ."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Locks API sẵn sàng");
      if (!('locks' in navigator)) {
        ctx.warn("navigator.locks không khả dụng trên trình duyệt này.");
      } else {
        ctx.success("navigator.locks sẵn sàng hoạt động!");
      }
    },

    acquireLock: async (ctx) => {
      if (!('locks' in navigator)) return;

      const name = ctx.getVal('lock-name-input');
      const duration = parseInt(ctx.getVal('lock-duration'), 10) || 3000;

      ctx.workflowStep(`Yêu cầu navigator.locks.request("${name}", { mode: 'exclusive' })`);
      ctx.setHtml('locks-status-box', `<span style="color:#fbbf24;">Đang đợi cấp quyền khoá "${name}"...</span>`);

      navigator.locks.request(name, { mode: 'exclusive' }, async (lock) => {
        ctx.success(`ĐÃ CẤP KHOÁ ĐỘC QUYỀN [${lock.name}] (mode: ${lock.mode})! Giữ trong ${duration}ms...`);
        ctx.setHtml('locks-status-box', `
          <div style="color:#34d399; font-weight:700;">● Đang nắm giữ khoá "${lock.name}"</div>
          <div>Các tab hoặc tiến trình khác yêu cầu khoá này sẽ phải đứng chờ cho tới khi hoàn tất.</div>
        `);

        await new Promise(r => setTimeout(r, duration));

        ctx.warn(`Đã giải phóng khoá [${lock.name}].`);
        ctx.setHtml('locks-status-box', 'Trạng thái: Khoá đã được giải phóng.');
      });
    },

    runContentionTest: async (ctx) => {
      if (!('locks' in navigator)) return;
      const name = "contention_test_lock";

      ctx.workflowStep("Kích hoạt đồng thời 2 tiến trình A và B yêu cầu cùng một Exclusive Lock");
      ctx.info("Tiến trình A gửi yêu cầu khoá 2000ms...");

      // Tiến trình A
      navigator.locks.request(name, async () => {
        ctx.success("[Tiến trình A] Đã nhận khoá! Đang xử lý trong 2000ms...");
        await new Promise(r => setTimeout(r, 2000));
        ctx.info("[Tiến trình A] Đã xong, giải phóng khoá!");
      });

      // Tiến trình B gửi ngay sau đó 10ms
      setTimeout(() => {
        ctx.info("Tiến trình B gửi yêu cầu khoá (sẽ bị xếp hàng đợi)...");
        navigator.locks.request(name, async () => {
          ctx.success("[Tiến trình B] ĐÃ ĐẾN LƯỢT! Tiến trình A đã nhả khoá an toàn.");
          ctx.setHtml('locks-status-box', '<div style="color:#34d399; font-weight:700;">✔ Cả 2 tiến trình thực thi tuần tự hoàn hảo không có race condition!</div>');
        });
      }, 50);
    },

    queryLocks: async (ctx) => {
      if (!('locks' in navigator) || !navigator.locks.query) return;
      ctx.workflowStep("Gọi navigator.locks.query()");
      const snapshot = await navigator.locks.query();

      ctx.info("Khoá đang nắm giữ (held):", snapshot.held);
      ctx.info("Khoá đang xếp hàng chờ (pending):", snapshot.pending);

      ctx.setHtml('locks-status-box', `
        <div>• Số lượng khoá đang giữ (Held): <strong>${snapshot.held.length}</strong></div>
        <div>• Số lượng đang chờ cấp (Pending): <strong>${snapshot.pending.length}</strong></div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
