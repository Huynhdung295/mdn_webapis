// webapis/eyedropper/script.js - EyeDropper API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let abortController = null;

  const eyeSpec = {
    id: "eyedropper",
    name: "EyeDropper API",
    group: "E",
    category: "Device & System",
    status: "Standard",
    support: { chrome: "95+", edge: "95+", firefox: "No", safari: "No" },
    supportCheck: () => 'EyeDropper' in window,
    why: "Cung cấp công cụ chấm hút màu màn hình (Eyedropper Pipette) của hệ điều hành, cho phép người dùng click chọn mã màu pixel tại BẤT KỲ ĐÂU trên toàn bộ màn hình máy tính (kể cả ngoài cửa sổ trình duyệt, thanh taskbar, desktop) và trả về mã màu HEX sRGB.",
    whenToUse: "Ứng dụng thiết kế web (Figma, Canva), công cụ chỉnh sửa ảnh trực tuyến (Photoshop web), bộ chọn màu Palette màu UI/UX chuyên nghiệp.",
    whenNotToUse: "Thiết bị di động hoặc trình duyệt không dựa trên Chromium (Firefox/Safari chưa bật theo mặc định).",
    coreItems: [
      "new EyeDropper()",
      "eyeDropper.open({ signal }) -> Promise<{ sRGBHex: string }>",
      "AbortController để huỷ thao tác chấm màu bằng code"
    ],
    panels: [
      {
        id: "panel-eyedropper-tool",
        title: "1. Kích Hoạt Công Cụ Chấm Hút Màu (eyeDropper.open)",
        badge: "eyeDropper.open()",
        desc: "Bấm nút phía dưới để biến con trỏ chuột thành kính lúp hút màu hệ thống. Click chuột vào bất kỳ vị trí nào trên màn hình để lấy mã HEX.",
        actions: [
          { id: "btn-open-eyedropper", label: "Kích Hoạt Ống Hút Màu (Open Pipette)", variant: "primary", handler: "openDropper" },
          { id: "btn-cancel-eyedropper", label: "Huỷ Chấm Màu (AbortSignal)", variant: "danger", handler: "cancelDropper" }
        ],
        customHtml: `
          <div class="color-swatch-box" id="color-swatch">
            #6366F1
          </div>
        `,
        previewBox: {
          id: "eyedropper-status-box",
          initialText: "Mã màu hiện hành: #6366f1"
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường EyeDropper API sẵn sàng");
    },

    openDropper: async (ctx) => {
      if (!('EyeDropper' in window)) {
        ctx.error("Trình duyệt không hỗ trợ EyeDropper API (Yêu cầu Chrome 95+ / Edge 95+).");
        ctx.setHtml('eyedropper-status-box', `<span style="color:#f87171;">✖ EyeDropper chưa được hỗ trợ trên trình duyệt này.</span>`);
        return;
      }

      ctx.workflowStep("Khởi tạo eyeDropper = new EyeDropper() và gọi eyeDropper.open()");
      abortController = new AbortController();

      try {
        const eyeDropper = new window.EyeDropper();
        ctx.info("Kính lúp hút màu đang bật! Hãy click vào điểm màu bất kỳ trên màn hình (hoặc nhấn Esc để huỷ)...");

        const result = await eyeDropper.open({ signal: abortController.signal });
        const hex = result.sRGBHex;

        ctx.success(`Đã hút được mã màu sRGB: ${hex}`);
        ctx.setHtml('eyedropper-status-box', `<div>Mã màu vừa chấm: <strong style="color:${hex};font-size:1.2rem;">${hex.toUpperCase()}</strong></div>`);

        const swatch = ctx.getEl('color-swatch');
        if (swatch) {
          swatch.style.backgroundColor = hex;
          swatch.innerText = hex.toUpperCase();
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          ctx.warn("Thao tác chấm màu đã bị huỷ bởi AbortController.");
        } else {
          ctx.warn("Người dùng đã nhấn phím Esc để huỷ chấm màu.");
        }
      } finally {
        abortController = null;
      }
    },

    cancelDropper: (ctx) => {
      if (abortController) {
        ctx.workflowStep("Gọi abortController.abort()");
        abortController.abort();
        abortController = null;
        ctx.warn("Đã gửi tín hiệu huỷ kính lúp hút màu.");
      } else {
        ctx.info("Kính lúp hút màu hiện không bật.");
      }
    }
  };

  WebAPICore.renderApp(eyeSpec, handlers);
})();
