// webapis/history/script.js - History API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let stepCounter = 1;

  const spec = {
    id: "history",
    panels: [
      {
        id: "panel-history-navigation",
        title: "1. Thao Tác Thêm & Thay Thế Trạng Thái Lịch Sử",
        badge: "pushState() / replaceState()",
        desc: "Mô phỏng cơ chế bộ định tuyến (Router) trong Single Page App mà không làm tải lại trang.",
        inputs: [
          { id: "hist-path", label: "Đường dẫn URL ảo (Relative Path):", type: "text", value: "?view=dashboard&step=1", fullWidth: true },
          { id: "hist-data", label: "Dữ liệu State Object (JSON):", type: "text", value: '{"step": 1, "view": "dashboard", "title": "Bảng điều khiển"}' }
        ],
        actions: [
          { id: "btn-push-state", label: "Thêm Bước Mới (history.pushState)", variant: "primary", handler: "pushStateAction" },
          { id: "btn-replace-state", label: "Ghi Đè Bước Hiện Tại (history.replaceState)", variant: "secondary", handler: "replaceStateAction" },
          { id: "btn-history-back", label: "← Quay Lại (history.back)", variant: "secondary", handler: "backAction" },
          { id: "btn-history-forward", label: "Tiến Lên → (history.forward)", variant: "secondary", handler: "forwardAction" }
        ],
        previewBox: {
          id: "hist-state-box",
          initialText: "Trạng thái history.state hiện tại: null"
        }
      }
    ]
  };

  function updateStatus(ctx) {
    const st = history.state;
    ctx.setHtml('hist-state-box', `
      <div>• URL hiện tại: <code>${window.location.search || window.location.pathname}</code></div>
      <div>• Số trang trong stack: <strong>${history.length}</strong></div>
      <div>• history.state:</div>
      <div style="font-family:var(--font-mono); font-size:0.75rem; color:#38bdf8; margin-top:4px;">
        ${st ? JSON.stringify(st, null, 2) : 'null'}
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Lắng nghe sự kiện popstate trên window");
      if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        window.addEventListener('popstate', (e) => {
          ctx.event("Sự kiện popstate kích hoạt (Người dùng bấm nút Back/Forward)", e.state);
          updateStatus(ctx);
        });
      }
      updateStatus(ctx);
    },

    pushStateAction: (ctx) => {
      stepCounter++;
      const path = ctx.getVal('hist-path');
      let data = {};
      try {
        data = JSON.parse(ctx.getVal('hist-data'));
        data.counter = stepCounter;
      } catch (e) {
        data = { counter: stepCounter, raw: ctx.getVal('hist-data') };
      }

      ctx.workflowStep(`Gọi history.pushState(state, '', '${path}')`);
      history.pushState(data, '', path);
      ctx.success("Đã đẩy state mới vào lịch sử trình duyệt!");
      updateStatus(ctx);

      // Cập nhật giá trị gợi ý cho lần bấm tiếp theo
      ctx.setVal('hist-path', `?view=step-${stepCounter}`);
    },

    replaceStateAction: (ctx) => {
      const path = ctx.getVal('hist-path');
      let data = {};
      try {
        data = JSON.parse(ctx.getVal('hist-data'));
        data.replacedAt = new Date().toLocaleTimeString();
      } catch (e) {
        data = { replacedAt: new Date().toLocaleTimeString() };
      }

      ctx.workflowStep(`Gọi history.replaceState(state, '', '${path}')`);
      history.replaceState(data, '', path);
      ctx.warn("Đã thay thế state của trang hiện tại (không tăng history.length)");
      updateStatus(ctx);
    },

    backAction: (ctx) => {
      ctx.workflowStep("Gọi history.back()");
      if (typeof history !== 'undefined' && typeof history.back === 'function') {
        history.back();
      } else {
        ctx.warn("history.back() không khả dụng trong môi trường này.");
      }
    },

    forwardAction: (ctx) => {
      ctx.workflowStep("Gọi history.forward()");
      if (typeof history !== 'undefined' && typeof history.forward === 'function') {
        history.forward();
      } else {
        ctx.warn("history.forward() không khả dụng trong môi trường này.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
