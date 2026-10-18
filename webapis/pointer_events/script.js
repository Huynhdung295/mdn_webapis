// webapis/pointer_events/script.js - Pointer Events API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let canvas = null;
  let ctx2d = null;
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  const spec = {
    id: "pointer_events",
    panels: [
      {
        id: "panel-pointer-canvas",
        title: "1. Bảng Vẽ Cảm Ứng Lực (Pressure & Pointer Capture)",
        badge: "pointerdown / pointermove & e.pressure",
        desc: "Thao tác bằng Chuột, Bút cảm ứng (Stylus/Apple Pencil/Wacom) hoặc Ngón tay trên bảng vẽ bên dưới. Lực nhấn (pressure), góc nghiêng (tilt) và loại con trỏ sẽ được hiển thị thời gian thực.",
        customHtml: `
          <div class="pointer-canvas-wrap">
            <canvas id="pointer-draw-canvas" width="500" height="260"></canvas>
            <div class="pointer-telemetry-bar">
              <span class="telemetry-item">Loại: <strong id="val-pointer-type">Chờ tương tác</strong></span>
              <span class="telemetry-item">Lực nhấn: <strong id="val-pressure">0.00</strong></span>
              <span class="telemetry-item">Tọa độ: <strong id="val-coords">X: 0, Y: 0</strong></span>
              <span class="telemetry-item">Nghiêng (Tilt): <strong id="val-tilt">0°, 0°</strong></span>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-clear-canvas", label: "Xoá Trắng Bảng Vẽ", variant: "secondary", handler: "clearCanvas" },
          { id: "btn-toggle-capture", label: "Kiểm Tra setPointerCapture()", variant: "primary", handler: "demoPointerCapture" }
        ],
        previewBox: {
          id: "pointer-status-box",
          initialText: "Hãy di chuột hoặc chạm bút lên canvas để bắt đầu đo lực nhấn."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Pointer Events API");
      if (!('PointerEvent' in window)) {
        ctx.warn("Trình duyệt không hỗ trợ Pointer Events API.");
        return;
      }
      ctx.success("Trình duyệt hỗ trợ đầy đủ Pointer Events và touch-action!");

      canvas = document.getElementById('pointer-draw-canvas');
      if (!canvas) return;
      ctx2d = canvas.getContext('2d');
      ctx2d.lineCap = 'round';
      ctx2d.lineJoin = 'round';

      // Gán sự kiện pointerdown
      canvas.addEventListener('pointerdown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        lastX = (e.clientX - rect.left) * scaleX;
        lastY = (e.clientY - rect.top) * scaleY;

        // Bắt trọn con trỏ kể cả khi rê ra ngoài viền canvas
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (err) {}

        updateTelemetry(e);
        ctx.event("pointerdown", {
          pointerId: e.pointerId,
          pointerType: e.pointerType,
          pressure: e.pressure.toFixed(2),
          isPrimary: e.isPrimary
        });
      });

      // Gán sự kiện pointermove
      canvas.addEventListener('pointermove', (e) => {
        updateTelemetry(e);
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const currentX = (e.clientX - rect.left) * scaleX;
        const currentY = (e.clientY - rect.top) * scaleY;

        // Độ dày nét vẽ biến thiên theo lực nhấn (pressure từ 0.0 đến 1.0)
        // Chuột thông thường thường trả về pressure = 0.5 khi click
        const pressureWeight = e.pressure > 0 ? e.pressure * 14 : 3;

        ctx2d.beginPath();
        ctx2d.moveTo(lastX, lastY);
        ctx2d.lineTo(currentX, currentY);

        if (e.pointerType === 'pen') {
          ctx2d.strokeStyle = '#34d399';
        } else if (e.pointerType === 'touch') {
          ctx2d.strokeStyle = '#fbbf24';
        } else {
          ctx2d.strokeStyle = '#38bdf8';
        }

        ctx2d.lineWidth = Math.max(1.5, pressureWeight);
        ctx2d.stroke();

        lastX = currentX;
        lastY = currentY;
      });

      // Gán sự kiện pointerup / pointercancel
      const onPointerEnd = (e) => {
        if (isDrawing) {
          isDrawing = false;
          try {
            canvas.releasePointerCapture(e.pointerId);
          } catch (err) {}
          ctx.event("pointerup", { pointerId: e.pointerId });
        }
      };

      canvas.addEventListener('pointerup', onPointerEnd);
      canvas.addEventListener('pointercancel', onPointerEnd);
    },

    clearCanvas: (ctx) => {
      if (ctx2d && canvas) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        ctx.workflowStep("Đã xoá sạch bảng vẽ Canvas.");
      }
    },

    demoPointerCapture: (ctx) => {
      ctx.workflowStep("Kiểm tra setPointerCapture(pointerId)");
      ctx.success("setPointerCapture giúp bạn tiếp tục vẽ ngay cả khi rê con trỏ ra ngoài phạm vi thẻ canvas (rất quan trọng cho Slider, Color Picker, CAD vẽ kỹ thuật).");
    }
  };

  function updateTelemetry(e) {
    const typeEl = document.getElementById('val-pointer-type');
    const pressEl = document.getElementById('val-pressure');
    const coordsEl = document.getElementById('val-coords');
    const tiltEl = document.getElementById('val-tilt');

    if (typeEl) typeEl.innerText = `${e.pointerType} (id: ${e.pointerId})`;
    if (pressEl) pressEl.innerText = e.pressure.toFixed(3);
    if (coordsEl) coordsEl.innerText = `X: ${Math.round(e.offsetX)}, Y: ${Math.round(e.offsetY)}`;
    if (tiltEl) tiltEl.innerText = `${e.tiltX || 0}°, ${e.tiltY || 0}°`;
  }

  WebAPICore.renderApp(spec, handlers);
})();
