// webapis/screen_orientation/script.js - Screen Orientation API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "screen_orientation",
    panels: [
      {
        id: "panel-screen-orientation",
        title: "1. Giám Sát & Điều Khiển Hướng Màn Hình",
        badge: "screen.orientation",
        desc: "Đọc góc quay vật lý và loại hướng (dọc / ngang). Lưu ý: Việc khoá màn hình (lock) chỉ hoạt động trên thiết bị di động hoặc khi đang ở chế độ Fullscreen.",
        customHtml: `
          <div class="screen-mock-wrap">
            <div id="phone-screen" class="screen-mock portrait">
              <div style="font-size:1.8rem; margin-bottom:4px;">📱</div>
              <div id="mock-orient-text" style="font-size:0.75rem; color:#38bdf8; font-weight:700;">Dọc (Portrait)</div>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-lock-landscape", label: "Khoá Ngang (lock('landscape'))", variant: "primary", handler: "lockLandscape" },
          { id: "btn-lock-portrait", label: "Khoá Dọc (lock('portrait'))", variant: "secondary", handler: "lockPortrait" },
          { id: "btn-unlock-orient", label: "Mở Khoá Tự Do (unlock())", variant: "danger", handler: "unlockOrientation" }
        ],
        previewBox: {
          id: "orient-status-box",
          initialText: "Đang đọc hướng màn hình..."
        }
      }
    ]
  };

  function updateOrientationInfo(ctx) {
    if (typeof screen === 'undefined' || !screen || !screen.orientation) {
      ctx.setHtml('orient-status-box', '<span style="color:#f87171;">screen.orientation không khả dụng.</span>');
      return;
    }

    const type = screen.orientation.type;
    const angle = screen.orientation.angle;
    const isLandscape = type && type.includes('landscape');

    const phoneEl = document.getElementById('phone-screen');
    const textEl = document.getElementById('mock-orient-text');

    if (phoneEl) {
      phoneEl.className = `screen-mock ${isLandscape ? 'landscape' : 'portrait'}`;
    }
    if (textEl) {
      textEl.innerText = isLandscape ? `Ngang (${angle}°)` : `Dọc (${angle}°)`;
    }

    ctx.setHtml('orient-status-box', `
      <div>• Loại hướng hiện tại (screen.orientation.type): <strong style="color:#38bdf8; text-transform:uppercase;">${type}</strong></div>
      <div>• Góc quay (angle): <strong>${angle}°</strong></div>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
        Thử xoay điện thoại hoặc đổi kích thước cửa sổ để quan sát sự kiện thay đổi hướng tự động.
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Screen Orientation API sẵn sàng");
      if (typeof screen !== 'undefined' && screen && screen.orientation) {
        screen.orientation.addEventListener('change', () => {
          ctx.event("screen.orientation change event", {
            type: screen.orientation.type,
            angle: screen.orientation.angle
          });
          updateOrientationInfo(ctx);
        });
      }
      updateOrientationInfo(ctx);
    },

    lockLandscape: async (ctx) => {
      ctx.workflowStep("Yêu cầu screen.orientation.lock('landscape')");
      if (typeof screen === 'undefined' || !screen || !screen.orientation || !screen.orientation.lock) {
        ctx.warn("screen.orientation.lock không được hỗ trợ trên thiết bị này.");
        return;
      }
      try {
        await screen.orientation.lock('landscape');
        ctx.success("Đã khoá hướng màn hình sang Ngang (Landscape) thành công!");
      } catch (err) {
        ctx.warn(`Khoá thất bại: ${err.message}. (Gợi ý: Mở toàn màn hình Fullscreen trước hoặc chạy trên mobile)`);
      }
    },

    lockPortrait: async (ctx) => {
      ctx.workflowStep("Yêu cầu screen.orientation.lock('portrait')");
      if (typeof screen === 'undefined' || !screen || !screen.orientation || !screen.orientation.lock) return;
      try {
        await screen.orientation.lock('portrait');
        ctx.success("Đã khoá hướng màn hình sang Dọc (Portrait) thành công!");
      } catch (err) {
        ctx.warn(`Khoá thất bại: ${err.message}`);
      }
    },

    unlockOrientation: (ctx) => {
      ctx.workflowStep("Yêu cầu screen.orientation.unlock()");
      if (typeof screen === 'undefined' || !screen || !screen.orientation || !screen.orientation.unlock) return;
      try {
        screen.orientation.unlock();
        ctx.info("Đã mở khoá xoay tự do.");
      } catch (err) {
        ctx.error("Lỗi:", err);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
