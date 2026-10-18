// webapis/canvas/script.js - Canvas API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "canvas",
    panels: [
      {
        id: "panel-canvas-draw",
        title: "1. Bảng Vẽ Đồ Hoạ 2D & Xử Lý Điểm Ảnh (Pixel Manipulation)",
        badge: "canvas.getContext('2d')",
        desc: "Vẽ gradient, vector path, text và áp dụng bộ lọc đảo màu trực tiếp lên từng pixel (ImageData) ở 60 FPS.",
        customHtml: `
          <canvas id="demo-canvas" class="canvas-box" width="600" height="200"></canvas>
        `,
        actions: [
          { id: "btn-draw-art", label: "Vẽ Nghệ Thuật Gradient & Hình Học", variant: "primary", handler: "drawArt" },
          { id: "btn-invert-pixels", label: "Áp Dụng Bộ Lọc Đảo Màu (Invert Pixels)", variant: "secondary", handler: "invertPixels" },
          { id: "btn-export-png", label: "Xuất Ảnh PNG (toDataURL)", variant: "secondary", handler: "exportPng" }
        ],
        previewBox: {
          id: "canvas-status-box",
          initialText: "Đang khởi tạo Canvas 2D..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Canvas API sẵn sàng");
      handlers.drawArt(ctx);
    },

    drawArt: (ctx) => {
      const canvas = document.getElementById('demo-canvas');
      if (!canvas || !canvas.getContext) return;
      const c = canvas.getContext('2d');
      if (!c || !c.createLinearGradient) return;

      ctx.workflowStep("Vẽ LinearGradient, bóng đổ shadow và cung tròn arc");

      c.fillStyle = '#0f172a';
      c.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient
      const grad = c.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#818cf8');
      grad.addColorStop(1, '#ec4899');

      c.fillStyle = grad;
      c.shadowColor = 'rgba(56, 189, 248, 0.5)';
      c.shadowBlur = 20;

      // Draw stylized circles
      for (let i = 0; i < 5; i++) {
        c.beginPath();
        c.arc(80 + i * 110, 100, 35 + i * 4, 0, Math.PI * 2);
        c.fill();
      }

      c.shadowBlur = 0;
      c.fillStyle = '#f8fafc';
      c.font = 'bold 18px Inter, sans-serif';
      c.fillText('Canvas 2D Rendering Engine', 30, 40);

      ctx.success("Đã vẽ đồ hoạ vector và gradient thành công trên Canvas!");
      ctx.setHtml('canvas-status-box', '<div style="color:#34d399; font-weight:700;">● Bảng vẽ Canvas 2D đã sẵn sàng! Thử bấm "Áp Dụng Bộ Lọc Đảo Màu".</div>');
    },

    invertPixels: (ctx) => {
      const canvas = document.getElementById('demo-canvas');
      if (!canvas || !canvas.getContext) return;
      const c = canvas.getContext('2d');
      if (!c || !c.getImageData) return;

      ctx.workflowStep("Bóc tách mảng byte điểm ảnh: c.getImageData() ➔ Đảo RGB (255 - x)");

      const imgData = c.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];         // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
      }

      c.putImageData(imgData, 0, 0);
      ctx.success("Đã áp dụng thuật toán đảo ngược màu sắc từng điểm ảnh trực tiếp trên RAM!");
    },

    exportPng: (ctx) => {
      const canvas = document.getElementById('demo-canvas');
      if (!canvas || typeof canvas.toDataURL !== 'function') return;
      ctx.workflowStep("Xuất file ảnh base64: canvas.toDataURL('image/png')");
      const dataUrl = canvas.toDataURL('image/png');
      ctx.success("Đã xuất ảnh PNG thành công! Dung lượng chuỗi base64:", dataUrl.length);
      ctx.setHtml('canvas-status-box', `
        <div>• Ảnh PNG Data URL đã tạo (kích thước ${dataUrl.length} ký tự).</div>
        <div style="margin-top:6px;"><a href="${dataUrl}" download="canvas-art.png" class="btn btn-primary" style="font-size:0.75rem;">Tải Ảnh Về Máy</a></div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
