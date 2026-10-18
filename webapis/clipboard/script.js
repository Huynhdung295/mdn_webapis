// webapis/clipboard/script.js - Clipboard API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const clipSpec = {
    id: "clipboard",
    name: "Clipboard API",
    group: "C",
    category: "Device & System",
    status: "Standard",
    support: { chrome: "66+", edge: "79+", firefox: "63+", safari: "13.1+" },
    supportCheck: () => 'clipboard' in navigator,
    why: "Thay thế document.execCommand('copy') đã lỗi thời. Cung cấp API Promise bất đồng bộ đọc/ghi an toàn vào khay nhớ tạm hệ thống, hỗ trợ văn bản thuần, HTML định dạng và hình ảnh Blob qua ClipboardItem.",
    whenToUse: "Nút sao chép mã nguồn/liên kết 1-chạm, dán ảnh chụp màn hình trực tiếp từ clipboard vào khung chat/trình soạn thảo, sao chép bảng tính Excel có định dạng.",
    whenNotToUse: "Đọc clipboard ngầm mà không có tương tác người dùng (bị trình duyệt chặn quyền bảo mật clipboard-read).",
    coreItems: [
      "navigator.clipboard.writeText(string)",
      "navigator.clipboard.readText() -> Promise<string>",
      "navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])",
      "navigator.clipboard.read() -> Promise<ClipboardItem[]>"
    ],
    panels: [
      {
        id: "panel-text-clipboard",
        title: "1. Đọc & Ghi Văn Bản (writeText & readText)",
        badge: "navigator.clipboard.writeText",
        desc: "Thao tác đơn giản nhất cho các nút 'Copy to clipboard' và 'Paste'.",
        inputs: [
          { id: "text-to-copy", label: "Văn bản muốn sao chép vào Clipboard:", type: "text", value: "https://developer.mozilla.org/en-US/docs/Web/API", fullWidth: true }
        ],
        actions: [
          { id: "btn-write-text", label: "Ghi Vào Clipboard (writeText)", variant: "primary", handler: "copyText" },
          { id: "btn-read-text", label: "Đọc Từ Clipboard (readText)", variant: "secondary", handler: "pasteText" }
        ],
        previewBox: {
          id: "clipboard-read-box",
          initialText: "Nội dung vừa đọc từ Clipboard sẽ xuất hiện tại đây."
        }
      },
      {
        id: "panel-image-clipboard",
        title: "2. Ghi Hình Ảnh Blob Vào Clipboard (ClipboardItem)",
        badge: "new ClipboardItem({ 'image/png': blob })",
        desc: "Tạo một ảnh PNG trong bộ nhớ và ghi trực tiếp vào Clipboard hệ thống. Sau đó bạn có thể bấm Ctrl+V dán vào Word, Paint, Zalo, Photoshop ngay lập tức!",
        actions: [
          { id: "btn-write-image", label: "Vẽ & Ghi Ảnh PNG Vào Clipboard", variant: "primary", handler: "copyImage" },
          { id: "btn-read-blob", label: "Đọc Mọi Định Dạng Từ Clipboard (read())", variant: "secondary", handler: "readAny" }
        ],
        customHtml: `
          <div style="display:flex; justify-content:center; margin-top:10px;">
            <canvas id="clip-canvas" width="180" height="70" style="background:white; border-radius:6px; box-shadow:0 4px 12px rgba(0,0,0,0.3);"></canvas>
          </div>
        `
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Clipboard API sẵn sàng");
      drawSampleCanvas(ctx);
    },

    copyText: async (ctx) => {
      const text = ctx.getVal('text-to-copy');
      ctx.workflowStep(`Gọi navigator.clipboard.writeText("${text}")`);

      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        ctx.error("Trình duyệt không hỗ trợ navigator.clipboard.writeText");
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        ctx.success(`Đã sao chép văn bản vào khay nhớ tạm hệ thống thành công!`);
      } catch (err) {
        ctx.error("Lỗi khi ghi văn bản:", err);
      }
    },

    pasteText: async (ctx) => {
      ctx.workflowStep("Gọi navigator.clipboard.readText()");

      if (!navigator.clipboard || !navigator.clipboard.readText) {
        ctx.error("Trình duyệt không hỗ trợ navigator.clipboard.readText");
        return;
      }

      try {
        const text = await navigator.clipboard.readText();
        ctx.success(`Đã đọc được từ Clipboard: "${text}"`);
        ctx.setHtml('clipboard-read-box', `<div>Nội dung trong clipboard: <strong style="color:#34d399;">"${text}"</strong></div>`);
      } catch (err) {
        ctx.error("Lỗi khi đọc clipboard (Người dùng có thể đã từ chối quyền cấp phép):", err);
      }
    },

    copyImage: async (ctx) => {
      const canvas = ctx.getEl('clip-canvas');
      if (!window.ClipboardItem) {
        ctx.warn("Trình duyệt chưa hỗ trợ window.ClipboardItem.");
        return;
      }

      ctx.workflowStep("Chuyển đổi Canvas sang Blob PNG và gọi navigator.clipboard.write([ClipboardItem])");
      canvas.toBlob(async (blob) => {
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          ctx.success("Đã ghi ảnh PNG vào Clipboard thành công! Hãy thử mở Paint hoặc Telegram/Zalo và bấm Ctrl+V để dán ảnh.");
        } catch (err) {
          ctx.error("Lỗi khi ghi ảnh vào clipboard:", err);
        }
      }, 'image/png');
    },

    readAny: async (ctx) => {
      ctx.workflowStep("Gọi navigator.clipboard.read()");
      if (!navigator.clipboard || !navigator.clipboard.read) {
        ctx.warn("navigator.clipboard.read() không khả dụng.");
        return;
      }

      try {
        const items = await navigator.clipboard.read();
        ctx.info(`Tìm thấy ${items.length} mục trong clipboard:`);

        for (const item of items) {
          ctx.log(`Các định dạng hỗ trợ trong item: ${item.types.join(', ')}`, 'info');
          for (const type of item.types) {
            const blob = await item.getType(type);
            ctx.success(`• Loại: ${type} (${blob.size} bytes)`);
          }
        }
      } catch (err) {
        ctx.error("Lỗi khi gọi read():", err);
      }
    }
  };

  function drawSampleCanvas(ctx) {
    const canvas = ctx.getEl('clip-canvas');
    if (!canvas) return;
    const c = canvas.getContext('2d');
    c.fillStyle = '#6366f1';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#ffffff';
    c.font = 'bold 15px sans-serif';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText("MDN Clipboard Demo", canvas.width / 2, canvas.height / 2);
  }

  WebAPICore.renderApp(clipSpec, handlers);
})();
