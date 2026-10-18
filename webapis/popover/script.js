// webapis/popover/script.js - Popover API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "popover",
    panels: [
      {
        id: "panel-popover-controls",
        title: "1. Thử Nghiệm Popover Bản Địa (Top Layer)",
        badge: "popover='auto' | 'manual'",
        desc: "Chuẩn HTML mới không bị lỗi z-index, tự động đưa lên Top Layer và hỗ trợ Light-dismiss.",
        actions: [
          { id: "btn-open-auto", label: "Mở Popover Auto (Tự đóng khi bấm ra ngoài)", variant: "primary", handler: "openAutoPopover" },
          { id: "btn-open-manual", label: "Mở Popover Manual (Chỉ đóng khi nhấn nút)", variant: "secondary", handler: "openManualPopover" },
          { id: "btn-toggle-js", label: "Chuyển Đổi Bằng JS (togglePopover)", variant: "secondary", handler: "togglePopoverJs" }
        ],
        previewBox: {
          id: "popover-status-box",
          initialText: "Trạng thái: Tất cả popover đang ẩn."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Popover API sẵn sàng: Đăng ký sự kiện beforetoggle");

      const pAuto = document.getElementById('demo-popover-auto');
      const pManual = document.getElementById('demo-popover-manual');

      [pAuto, pManual].forEach(el => {
        if (!el) return;
        el.addEventListener('beforetoggle', (e) => {
          ctx.event(`beforetoggle trên #${el.id}: ${e.oldState} ➔ ${e.newState}`, {
            target: el.id,
            oldState: e.oldState,
            newState: e.newState
          });

          if (e.newState === 'open') {
            ctx.setHtml('popover-status-box', `
              <div style="color:#34d399; font-weight:700;">● Popover #${el.id} ĐANG MỞ trên Top Layer!</div>
              <div>• Thử bấm chuột ra ngoài vùng tối (backdrop) để xem cơ chế Light Dismiss của trình duyệt.</div>
            `);
          } else {
            ctx.setHtml('popover-status-box', `
              <div style="color:var(--text-muted);">● Popover #${el.id} ĐÃ ĐÓNG.</div>
            `);
          }
        });
      });
    },

    openAutoPopover: (ctx) => {
      const el = document.getElementById('demo-popover-auto');
      if (!el || !el.showPopover) {
        ctx.warn("Trình duyệt không hỗ trợ showPopover() native.");
        return;
      }
      ctx.workflowStep("Gọi elAuto.showPopover()");
      el.showPopover();
    },

    openManualPopover: (ctx) => {
      const el = document.getElementById('demo-popover-manual');
      if (!el || !el.showPopover) {
        ctx.warn("Trình duyệt không hỗ trợ showPopover() native.");
        return;
      }
      ctx.workflowStep("Gọi elManual.showPopover()");
      el.showPopover();
    },

    togglePopoverJs: (ctx) => {
      const el = document.getElementById('demo-popover-auto');
      if (!el || !el.togglePopover) return;
      ctx.workflowStep("Gọi elAuto.togglePopover()");
      el.togglePopover();
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
