// webapis/window_controls_overlay/script.js - Window Controls Overlay API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  const spec = {
    id: "window_controls_overlay",
    panels: [
      {
        id: "panel-wco-demo",
        title: "1. Tùy Biến Thanh Tiêu Đề Hệ Thống Desktop PWA",
        badge: "navigator.windowControlsOverlay",
        desc: "Cho phép Web App cài đặt (PWA) trên Desktop mở rộng nội dung lên tận cùng thanh tiêu đề cửa sổ hệ điều hành (bên cạnh nút Min/Max/Close), biến Web App trông như ứng dụng Native (VS Code, Spotify).",
        actions: [
          { id: "btn-check-wco", label: "Kiểm Tra Trạng Thái Overlay (getTitlebarAreaRect)", variant: "primary", handler: "checkOverlayState" }
        ],
        customHtml: `
          <div style="margin-top: 10px;">
            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">Bộ giả lập thanh tiêu đề PWA (Titlebar Customization):</div>
            <div class="custom-titlebar-frame">
              <div class="custom-titlebar">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:1rem;">⚡</span>
                  <strong style="color:var(--text-main); font-size:0.85rem;">MDN Master PWA</strong>
                  <input type="text" class="titlebar-search-box" placeholder="🔍 Tìm kiếm trực tiếp trên Titlebar..." readonly>
                </div>
                <div class="os-window-buttons">
                  <span class="win-btn win-min"></span>
                  <span class="win-btn win-max"></span>
                  <span class="win-btn win-close"></span>
                </div>
              </div>
              <div class="simulated-app-body">
                Nội dung ứng dụng nằm liền mạch không bị thanh tiêu đề màu xám truyền thống của trình duyệt chiếm chỗ.<br>
                Sử dụng biến CSS: <code>env(titlebar-area-x)</code>, <code>env(titlebar-area-width)</code>, <code>env(titlebar-area-height)</code>.
              </div>
            </div>
          </div>
        `,
        previewBox: {
          id: "wco-status-box",
          initialText: "Bấm nút phía trên để kiểm tra kích thước vùng tiêu đề."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Window Controls Overlay API");
      if (!('windowControlsOverlay' in navigator)) {
        ctx.warn("navigator.windowControlsOverlay chỉ khả dụng trên Chromium Desktop PWA khi đã cài đặt app và khai báo 'display_override': ['window-controls-overlay'] trong manifest.json.");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ Window Controls Overlay API!");

        // Lắng nghe sự kiện co giãn cửa sổ
        navigator.windowControlsOverlay.addEventListener('geometrychange', (e) => {
          ctx.event("geometrychange", {
            titlebarRect: e.titlebarAreaRect,
            visible: e.visible
          });
        });
      }

      handlers.checkOverlayState(ctx);
    },

    checkOverlayState: (ctx) => {
      ctx.workflowStep("Truy vấn navigator.windowControlsOverlay.getTitlebarAreaRect()");

      if (!('windowControlsOverlay' in navigator)) {
        ctx.warn("Trang đang chạy trong tab trình duyệt thông thường. Để kích hoạt thực tế, trang cần được Cài đặt dạng PWA (Install PWA).");
        ctx.setHtml('wco-status-box', `
          <div style="color:var(--accent-warning);">
            <strong>Trạng thái:</strong> Đang chạy trong tab web thông thường.<br>
            Khi được cài đặt PWA: <code>navigator.windowControlsOverlay.visible</code> sẽ chuyển thành <code>true</code> và trả về kích thước chính xác vùng trống bên cạnh 3 nút Min/Max/Close của Windows/macOS.
          </div>
        `);
        return;
      }

      const overlay = navigator.windowControlsOverlay;
      const rect = overlay.getTitlebarAreaRect();

      ctx.success("Đã đọc thông số Window Controls Overlay:", {
        visible: overlay.visible,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      });

      ctx.setHtml('wco-status-box', `
        <div style="font-size:0.85rem;">
          <div>Trạng thái hiển thị (visible): <strong>${overlay.visible ? '✔ ĐANG BẬT PWA TITLEBAR' : 'Chưa bật (Tab thông thường)'}</strong></div>
          <div style="margin-top:4px;">
            Kích thước vùng khả dụng: <strong>X: ${rect.x}, Y: ${rect.y}, Rộng: ${rect.width}px, Cao: ${rect.height}px</strong>
          </div>
        </div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
