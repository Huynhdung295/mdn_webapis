// webapis/view_transition/script.js - View Transitions API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let isGrid = true;

  const spec = {
    id: "view_transition",
    panels: [
      {
        id: "panel-view-transition",
        title: "1. Chuyển Đổi Layout Mượt Mà (Morphing Animation)",
        badge: "document.startViewTransition()",
        desc: "API chụp ảnh snapshot trước và sau của DOM để tự động suy luận animation chuyển hình (morphing) như ứng dụng native mà không cần viết CSS phức tạp.",
        customHtml: `
          <div id="cards-wrapper" class="cards-container grid-mode">
            <div class="vt-card" style="--vt-name: card-1;">
              <h4 style="color:#38bdf8; margin-bottom:4px;">Thẻ 1: Khởi Tạo</h4>
              <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Chụp snapshot giao diện cũ.</p>
            </div>
            <div class="vt-card" style="--vt-name: card-2;">
              <h4 style="color:#34d399; margin-bottom:4px;">Thẻ 2: Cập Nhật DOM</h4>
              <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Hàm callback thay đổi cây DOM.</p>
            </div>
            <div class="vt-card" style="--vt-name: card-3;">
              <h4 style="color:#a78bfa; margin-bottom:4px;">Thẻ 3: Biến Hình</h4>
              <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Trình duyệt tự tạo hoạt hoạ.</p>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-toggle-layout", label: "Chuyển Layout Grid ⟷ List (startViewTransition)", variant: "primary", handler: "toggleLayout" }
        ],
        previewBox: {
          id: "vt-status-box",
          initialText: "Chế độ hiện tại: Grid (Lưới 3 cột)."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường View Transitions API sẵn sàng");
      if (!document.startViewTransition) {
        ctx.warn("document.startViewTransition chưa được hỗ trợ native trên trình duyệt này (hỗ trợ tốt nhất trên Chrome 111+, Edge 111+, Safari 18+).");
      } else {
        ctx.success("document.startViewTransition khả dụng!");
      }
    },

    toggleLayout: (ctx) => {
      const container = document.getElementById('cards-wrapper');
      if (!container) return;

      const updateDom = () => {
        isGrid = !isGrid;
        if (isGrid) {
          container.className = 'cards-container grid-mode';
          ctx.setHtml('vt-status-box', 'Chế độ hiện tại: Grid (Lưới 3 cột).');
        } else {
          container.className = 'cards-container list-mode';
          ctx.setHtml('vt-status-box', 'Chế độ hiện tại: List (Danh sách 1 cột dọc).');
        }
      };

      if (!document.startViewTransition) {
        ctx.warn("Fallback: Cập nhật DOM trực tiếp (không có animation do trình duyệt chưa hỗ trợ).");
        updateDom();
        return;
      }

      ctx.workflowStep("Gọi document.startViewTransition(updateDom)");
      const transition = document.startViewTransition(() => {
        updateDom();
      });

      transition.ready.then(() => {
        ctx.info("View Transition: Trình duyệt đã chụp snapshot và đang chạy animation chuyển cảnh!");
      });

      transition.finished.then(() => {
        ctx.success("View Transition: Hoàn thành biến hình mượt mà!");
      });
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
