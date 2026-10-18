// webapis/fullscreen/script.js - Fullscreen API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "fullscreen",
    panels: [
      {
        id: "panel-fullscreen-controls",
        title: "1. Kiểm Soát Toàn Màn Hình (Fullscreen Controls)",
        badge: "element.requestFullscreen()",
        desc: "Thử nghiệm kích hoạt toàn màn hình cho toàn trang hoặc riêng biệt cho một phần tử DOM có tuỳ biến CSS ::backdrop.",
        customHtml: `
          <div id="target-box" class="fullscreen-target" style="margin-bottom: 16px;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🖥️</div>
            <h3 style="color: #38bdf8; margin-bottom: 6px;">Phần Tử Mục Tiêu (Target Box)</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 480px; margin: 0 auto 16px;">
              Phần tử này được gán CSS pseudo <code>:fullscreen</code> và <code>::backdrop</code> làm mờ nền tối.
            </p>
            <div class="btn-group" style="justify-content: center;">
              <button type="button" class="btn btn-primary" id="btn-fs-target-inner" data-action="toggleTargetFs">
                Phóng To Phần Tử Này
              </button>
              <button type="button" class="btn btn-danger" id="btn-fs-exit-inner" data-action="exitFs">
                Thoát Toàn Màn Hình
              </button>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-fs-page", label: "Phóng To Toàn Trang (document.documentElement)", variant: "secondary", handler: "enterPageFs" },
          { id: "btn-fs-exit", label: "Thoát Toàn Màn Hình (document.exitFullscreen)", variant: "danger", handler: "exitFs" },
          { id: "btn-fs-check", label: "Kiểm Tra Trạng Thái (document.fullscreenElement)", variant: "secondary", handler: "checkFsStatus" }
        ],
        previewBox: {
          id: "fs-status-box",
          initialText: "Trạng thái: Chưa ở chế độ toàn màn hình."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Fullscreen API: Đăng ký sự kiện fullscreenchange");

      const isEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || false;
      ctx.info(`Quyền kích hoạt Fullscreen (document.fullscreenEnabled): ${isEnabled ? 'Có' : 'Không'}`);

      const onFsChange = () => {
        const current = document.fullscreenElement || document.webkitFullscreenElement;
        if (current) {
          ctx.success(`Sự kiện fullscreenchange: Đang ở chế độ Fullscreen trên phần tử <${current.tagName.toLowerCase()}${current.id ? ' id="' + current.id + '"' : ''}>`);
          ctx.setHtml('fs-status-box', `
            <div style="color:#34d399; font-weight:600;">● Đang BẬT Toàn Màn Hình</div>
            <div>• Phần tử kích hoạt: <code>&lt;${current.tagName.toLowerCase()} id="${current.id || 'none'}"&gt;</code></div>
            <div>• Nhấn phím <code>Escape</code> hoặc nút "Thoát Toàn Màn Hình" để trở về.</div>
          `);
        } else {
          ctx.warn("Sự kiện fullscreenchange: Đã THOÁT khỏi chế độ Fullscreen");
          ctx.setHtml('fs-status-box', `
            <div style="color:var(--text-muted);">● Chế độ bình thường (Không toàn màn hình)</div>
            <div>• document.fullscreenElement = <code>null</code></div>
          `);
        }
      };

      document.addEventListener('fullscreenchange', onFsChange);
      document.addEventListener('webkitfullscreenchange', onFsChange);

      document.addEventListener('fullscreenerror', (err) => {
        ctx.error("Sự kiện fullscreenerror: Không thể chuyển sang chế độ toàn màn hình", err);
      });
    },

    enterPageFs: async (ctx) => {
      ctx.workflowStep("Yêu cầu document.documentElement.requestFullscreen()");
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          await document.documentElement.webkitRequestFullscreen();
        } else {
          throw new Error("Trình duyệt không hỗ trợ requestFullscreen");
        }
      } catch (err) {
        ctx.error("Thao tác Fullscreen thất bại:", err.message);
      }
    },

    toggleTargetFs: async (ctx) => {
      const target = document.getElementById('target-box');
      ctx.workflowStep("Yêu cầu targetBox.requestFullscreen()");
      try {
        if (target.requestFullscreen) {
          await target.requestFullscreen();
        } else if (target.webkitRequestFullscreen) {
          await target.webkitRequestFullscreen();
        } else {
          throw new Error("Trình duyệt không hỗ trợ requestFullscreen");
        }
      } catch (err) {
        ctx.error("Thao tác Fullscreen cho phần tử thất bại:", err.message);
      }
    },

    exitFs: async (ctx) => {
      ctx.workflowStep("Yêu cầu document.exitFullscreen()");
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        ctx.warn("Hiện tại trang web không ở chế độ toàn màn hình.");
        return;
      }
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      } catch (err) {
        ctx.error("Thoát Fullscreen thất bại:", err.message);
      }
    },

    checkFsStatus: (ctx) => {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      ctx.workflowStep("Kiểm tra trạng thái Fullscreen hiện thời");
      ctx.info("Trạng thái:", {
        fullscreenEnabled: document.fullscreenEnabled || document.webkitFullscreenEnabled,
        fullscreenElement: fsEl ? `<${fsEl.tagName.toLowerCase()} id="${fsEl.id}">` : null
      });
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
