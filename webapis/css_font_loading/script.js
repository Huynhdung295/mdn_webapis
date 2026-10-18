// webapis/css_font_loading/script.js - CSS Font Loading API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let customFontFace = null;

  const fontSpec = {
    id: "css_font_loading",
    name: "CSS Font Loading API",
    group: "C",
    category: "Styling & DOM",
    status: "Standard",
    support: { chrome: "35+", edge: "79+", firefox: "41+", safari: "10+" },
    supportCheck: () => 'fonts' in document && 'FontFace' in window,
    why: "Kiểm soát chính xác 100% thời điểm font chữ nạp xong vào bộ nhớ trước khi vẽ lên Canvas hoặc render giao diện, loại bỏ lỗi giật chữ (FOUT/FOIT) và cho phép nạp font động từ JS.",
    whenToUse: "Vẽ chữ trên Canvas / WebGL (bắt buộc font phải load xong trước khi gọi ctx.fillText), app thiết kế đồ hoạ như Canva/Figma web, game nạp font trước khi vào màn hình.",
    whenNotToUse: "Website thông thường chỉ dùng font CSS tĩnh với `@font-face` và `font-display: swap`.",
    coreItems: [
      "new FontFace(family, source, descriptors)",
      "fontFace.load() -> Promise<FontFace>",
      "document.fonts.add(fontFace)",
      "document.fonts.check(fontSpec)",
      "document.fonts.ready -> Promise<FontFaceSet>"
    ],
    panels: [
      {
        id: "panel-load-font",
        title: "1. Nạp Font Động Bằng JavaScript (new FontFace)",
        badge: "document.fonts.add()",
        desc: "Nạp font chữ nghệ thuật từ URL ngoại vi (Google Fonts woff2) hoàn toàn bằng code JavaScript.",
        inputs: [
          { id: "font-family-input", label: "Tên Font Family:", type: "text", value: "Dancing Script" },
          { id: "font-url-input", label: "URL Tệp Font (.woff2):", type: "text", value: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Sup6.woff2", fullWidth: true }
        ],
        actions: [
          { id: "btn-check-font", label: "Kiểm Tra document.fonts.check()", variant: "secondary", handler: "checkFont" },
          { id: "btn-load-font", label: "Nạp Font (font.load())", variant: "primary", handler: "loadFont" },
          { id: "btn-apply-to-box", label: "Áp Dụng Font Lên Khung Xem Thử", variant: "secondary", handler: "applyToBox" }
        ],
        customHtml: `
          <div class="font-preview-box" id="font-preview-text">
            Đây là dòng chữ xem thử font nghệ thuật!
          </div>
        `,
        previewBox: {
          id: "font-status-box",
          initialText: "Trạng thái font: Chưa tải vào bộ nhớ."
        }
      },
      {
        id: "panel-canvas-test",
        title: "2. Vẽ Font Lên Canvas An Toàn (Tránh Lỗi Fallback Font)",
        badge: "Canvas ctx.fillText()",
        desc: "Nếu vẽ Canvas trước khi font nạp xong, Canvas sẽ vẽ bằng font mặc định hệ thống và không bao giờ tự cập nhật lại. Font Loading API giải quyết dứt điểm vấn đề này.",
        actions: [
          { id: "btn-draw-canvas", label: "Vẽ Lên Canvas Sau Khi Đảm Bảo Font Sẵn Sàng", variant: "primary", handler: "drawOnCanvas" }
        ],
        customHtml: `
          <div style="display:flex; justify-content:center;">
            <canvas id="font-canvas" width="460" height="90"></canvas>
          </div>
        `
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường CSS Font Loading API sẵn sàng");
      initCanvas(ctx);
    },

    checkFont: (ctx) => {
      const family = ctx.getVal('font-family-input') || 'Pacifico';
      if (!document.fonts || typeof document.fonts.check !== 'function') {
        ctx.warn("Trình duyệt không hỗ trợ document.fonts.check()");
        return;
      }
      const isLoaded = document.fonts.check(`24px "${family}"`);
      ctx.workflowStep(`Gọi document.fonts.check('24px "${family}"'): ${isLoaded}`);

      if (isLoaded) {
        ctx.success(`Font "${family}" ĐÃ SẴN SÀNG trong bộ nhớ trình duyệt!`);
      } else {
        ctx.warn(`Font "${family}" CHƯA ĐƯỢC NẠP.`);
      }
      ctx.setHtml('font-status-box', `<div>Kiểm tra font: <strong>"${family}"</strong> -> <span style="color:${isLoaded ? '#34d399' : '#f87171'}">${isLoaded ? 'Đã nạp sẵn sàng' : 'Chưa nạp'}</span></div>`);
    },

    loadFont: async (ctx) => {
      const family = ctx.getVal('font-family-input') || 'Pacifico';
      const url = ctx.getVal('font-url-input');

      if (typeof FontFace === 'undefined' || !document.fonts) {
        ctx.error("Trình duyệt không hỗ trợ FontFace hoặc document.fonts.");
        return;
      }

      ctx.workflowStep(`Khởi tạo new FontFace("${family}", "url(...)")`);
      try {
        customFontFace = new FontFace(family, `url(${url})`);
        ctx.info("Bắt đầu gọi font.load()...");

        const loadedFace = await customFontFace.load();
        document.fonts.add(loadedFace);

        ctx.success(`Đã nạp và thêm font "${family}" vào document.fonts thành công! Trạng thái: ${loadedFace.status}`);
        ctx.setHtml('font-status-box', `<div>Font: <strong style="color:#34d399;">"${family}"</strong> | Trạng thái: <strong style="color:#34d399;">${loadedFace.status}</strong></div>`);

        handlers.applyToBox(ctx);
        handlers.drawOnCanvas(ctx);
      } catch (err) {
        ctx.error("Lỗi khi nạp font:", err);
      }
    },

    applyToBox: (ctx) => {
      const family = ctx.getVal('font-family-input');
      const box = ctx.getEl('font-preview-text');
      if (box) {
        box.style.fontFamily = `"${family}", sans-serif`;
        ctx.workflowStep(`Gán style.fontFamily = "${family}" cho phần tử DOM`);
      }
    },

    drawOnCanvas: async (ctx) => {
      const family = ctx.getVal('font-family-input');
      const canvasEl = ctx.getEl('font-canvas');
      const canvasCtx = canvasEl.getContext('2d');

      ctx.workflowStep(`Đợi document.fonts.load('32px "${family}"') trước khi vẽ Canvas`);
      try {
        await document.fonts.load(`32px "${family}"`);

        canvasCtx.fillStyle = '#ffffff';
        canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);

        canvasCtx.fillStyle = '#4f46e5';
        canvasCtx.font = `32px "${family}", sans-serif`;
        canvasCtx.textAlign = 'center';
        canvasCtx.textBaseline = 'middle';
        canvasCtx.fillText("Canvas Font Render Thành Công!", canvasEl.width / 2, canvasEl.height / 2);

        ctx.success("Đã vẽ chữ lên Canvas với đúng font chữ nghệ thuật vừa nạp!");
      } catch (err) {
        ctx.error("Lỗi khi vẽ lên Canvas:", err);
      }
    }
  };

  function initCanvas(ctx) {
    const canvasEl = ctx.getEl('font-canvas');
    if (!canvasEl) return;
    const canvasCtx = canvasEl.getContext('2d');
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    canvasCtx.fillStyle = '#64748b';
    canvasCtx.font = '18px sans-serif';
    canvasCtx.textAlign = 'center';
    canvasCtx.textBaseline = 'middle';
    canvasCtx.fillText("Chưa vẽ font mẫu lên Canvas", canvasEl.width / 2, canvasEl.height / 2);
  }

  WebAPICore.renderApp(fontSpec, handlers);
})();
