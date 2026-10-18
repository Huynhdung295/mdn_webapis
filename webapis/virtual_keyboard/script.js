// webapis/virtual_keyboard/script.js - Virtual Keyboard API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "virtual_keyboard",
    panels: [
      {
        id: "panel-virtual-keyboard",
        title: "1. Kiểm Soát Bàn Phím Ảo (Virtual Keyboard Overlays)",
        badge: "navigator.virtualKeyboard",
        desc: "Bật chế độ overlaysContent để bàn phím ảo hiển thị đè lên trên trang thay vì co rút toàn bộ viewport trình duyệt làm vỡ giao diện chat.",
        inputs: [
          { id: "vk-test-input", label: "Ô nhập dữ liệu kích hoạt bàn phím ảo (inputmode='text'):", type: "text", value: "Nhấn vào đây để bật bàn phím ảo", fullWidth: true }
        ],
        actions: [
          { id: "btn-toggle-overlay", label: "Bật/Tắt overlaysContent", variant: "primary", handler: "toggleOverlaysContent" },
          { id: "btn-show-keyboard", label: "Mở Bàn Phím (show())", variant: "secondary", handler: "showKeyboard" },
          { id: "btn-hide-keyboard", label: "Ẩn Bàn Phím (hide())", variant: "secondary", handler: "hideKeyboard" }
        ],
        previewBox: {
          id: "vk-status-box",
          initialText: "Đang kiểm tra Virtual Keyboard API..."
        }
      }
    ]
  };

  function updateDisplay(ctx) {
    if (!('virtualKeyboard' in navigator)) {
      ctx.setHtml('vk-status-box', '<span style="color:#f87171;">navigator.virtualKeyboard chưa được hỗ trợ (chủ yếu trên thiết bị cảm ứng Chrome 94+).</span>');
      return;
    }

    const vk = navigator.virtualKeyboard;
    const rect = vk.boundingRect;

    ctx.setHtml('vk-status-box', `
      <div>• overlaysContent: <strong style="color:${vk.overlaysContent ? '#34d399' : '#fbbf24'};">${vk.overlaysContent}</strong></div>
      <div>• Kích thước bàn phím ảo (boundingRect): <code>${rect.width}x${rect.height}px (Top: ${rect.top}, Bottom: ${rect.bottom})</code></div>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
        Khi overlaysContent = true, layout không bị giật co rút. Bạn có thể dùng biến CSS <code>env(keyboard-inset-height)</code> để đẩy thanh input chat lên chính xác đỉnh bàn phím.
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Virtual Keyboard API sẵn sàng");

      if ('virtualKeyboard' in navigator) {
        navigator.virtualKeyboard.addEventListener('geometrychange', () => {
          ctx.event("Sự kiện geometrychange (Kích thước bàn phím ảo thay đổi):", {
            boundingRect: navigator.virtualKeyboard.boundingRect
          });
          updateDisplay(ctx);
        });
      }

      updateDisplay(ctx);
    },

    toggleOverlaysContent: (ctx) => {
      if (!('virtualKeyboard' in navigator)) {
        ctx.warn("navigator.virtualKeyboard không khả dụng.");
        return;
      }

      const vk = navigator.virtualKeyboard;
      vk.overlaysContent = !vk.overlaysContent;
      ctx.workflowStep(`Gán navigator.virtualKeyboard.overlaysContent = ${vk.overlaysContent}`);
      ctx.success(`Đã chuyển overlaysContent sang: ${vk.overlaysContent}`);
      updateDisplay(ctx);
    },

    showKeyboard: (ctx) => {
      ctx.workflowStep("Gọi navigator.virtualKeyboard.show()");
      const input = document.getElementById('vk-test-input');
      if (input) input.focus();

      if ('virtualKeyboard' in navigator && navigator.virtualKeyboard.show) {
        navigator.virtualKeyboard.show();
      }
    },

    hideKeyboard: (ctx) => {
      ctx.workflowStep("Gọi navigator.virtualKeyboard.hide()");
      if ('virtualKeyboard' in navigator && navigator.virtualKeyboard.hide) {
        navigator.virtualKeyboard.hide();
        ctx.info("Đã gửi lệnh ẩn bàn phím ảo.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
