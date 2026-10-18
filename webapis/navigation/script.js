// webapis/navigation/script.js - Navigation API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let navCounter = 1;

  const spec = {
    id: "navigation",
    panels: [
      {
        id: "panel-navigation-actions",
        title: "1. Điều Hướng Thế Hệ Mới (navigation.navigate)",
        badge: "Navigation API (Standard)",
        desc: "Xử lý chuyển hướng tập trung qua sự kiện 'navigate' với e.intercept({ handler }) thay thế việc gắn onclick thủ công trên từng thẻ <a>.",
        inputs: [
          { id: "nav-url", label: "Đường dẫn URL SPA đích:", type: "text", value: "?section=products&page=1", fullWidth: true },
          { id: "nav-mode", label: "Chế độ lịch sử (history):", type: "select", options: [
            { value: "push", label: "Push (Tạo entry mới trong stack)" },
            { value: "replace", label: "Replace (Ghi đè entry hiện tại)" }
          ]}
        ],
        actions: [
          { id: "btn-navigate-spa", label: "Điều Hướng SPA (navigation.navigate)", variant: "primary", handler: "doNavigate" },
          { id: "btn-nav-back", label: "Quay Lại (navigation.back)", variant: "secondary", handler: "navBack" },
          { id: "btn-nav-forward", label: "Tiến Tới (navigation.forward)", variant: "secondary", handler: "navForward" },
          { id: "btn-nav-entries", label: "Xem Danh Sách Entries (navigation.entries)", variant: "secondary", handler: "inspectEntries" }
        ],
        previewBox: {
          id: "nav-status-box",
          initialText: "Đang kiểm tra tính năng Navigation API..."
        }
      }
    ]
  };

  function updateStatus(ctx) {
    if (!('navigation' in window)) {
      ctx.setHtml('nav-status-box', `
        <div style="color:#f87171;">✖ Trình duyệt này chưa hỗ trợ window.navigation native (Hỗ trợ tốt nhất trên Chrome 102+, Edge 102+).</div>
      `);
      return;
    }

    const cur = window.navigation.currentEntry;
    const entries = window.navigation.entries ? window.navigation.entries() : [];

    ctx.setHtml('nav-status-box', `
      <div style="color:#34d399; font-weight:600; margin-bottom:6px;">● window.navigation đang hoạt động:</div>
      <div>• URL hiện tại: <code>${cur ? cur.url : window.location.href}</code></div>
      <div>• Key / ID: <code>${cur ? cur.key : 'none'}</code> / <code>${cur ? cur.id : 'none'}</code></div>
      <div>• Vị trí Index: <strong>${cur ? cur.index : 0}</strong> / ${entries.length}</div>
      <div>• State: <code>${cur ? JSON.stringify(cur.getState()) : 'null'}</code></div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Navigation API khởi động");

      if (!('navigation' in window)) {
        ctx.warn("window.navigation chưa được hỗ trợ trên trình duyệt này.");
        updateStatus(ctx);
        return;
      }

      ctx.success("window.navigation được hỗ trợ native!");

      // Đăng ký bộ đón chặn điều hướng trung tâm
      window.navigation.addEventListener('navigate', (e) => {
        ctx.event(`Sự kiện 'navigate' kích hoạt tới URL: ${e.destination.url}`, {
          navigationType: e.navigationType,
          sameDocument: e.destination.sameDocument
        });

        // Chỉ chặn nếu là điều hướng cùng trang (same document)
        if (e.canIntercept && !e.hashChange) {
          e.intercept({
            async handler() {
              ctx.workflowStep(`[e.intercept] Đang xử lý chuyển trang mượt mà sang: ${e.destination.url}`);
              // Giả lập load dữ liệu mất 150ms
              await new Promise(r => setTimeout(r, 150));
              ctx.success("[e.intercept] Chuyển trang SPA hoàn tất không giật lag!");
              updateStatus(ctx);
            }
          });
        }
      });

      updateStatus(ctx);
    },

    doNavigate: (ctx) => {
      if (!('navigation' in window)) {
        ctx.warn("window.navigation không khả dụng.");
        return;
      }

      navCounter++;
      const url = ctx.getVal('nav-url');
      const mode = ctx.getVal('nav-mode');

      ctx.workflowStep(`Gọi navigation.navigate("${url}", { history: "${mode}", state: { step: ${navCounter} } })`);

      window.navigation.navigate(url, {
        history: mode,
        state: { step: navCounter, timestamp: Date.now() }
      });

      // Cập nhật gợi ý URL
      ctx.setVal('nav-url', `?section=page-${navCounter}`);
    },

    navBack: async (ctx) => {
      if (!('navigation' in window)) return;
      ctx.workflowStep("Gọi navigation.back()");
      try {
        await window.navigation.back().finished;
        ctx.success("Đã quay lại bước trước!");
      } catch (err) {
        ctx.warn("Không thể lùi thêm (đã ở đầu stack): " + err.message);
      }
    },

    navForward: async (ctx) => {
      if (!('navigation' in window)) return;
      ctx.workflowStep("Gọi navigation.forward()");
      try {
        await window.navigation.forward().finished;
        ctx.success("Đã tiến lên bước sau!");
      } catch (err) {
        ctx.warn("Không thể tiến thêm: " + err.message);
      }
    },

    inspectEntries: (ctx) => {
      if (!('navigation' in window) || !window.navigation.entries) return;
      const entries = window.navigation.entries();
      ctx.workflowStep(`Kiểm tra danh sách navigation.entries() (${entries.length} entries)`);
      entries.forEach((ent, idx) => {
        ctx.info(`- [Index ${idx}] URL: ${ent.url} | Key: ${ent.key} | sameDocument: ${ent.sameDocument}`);
      });
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
