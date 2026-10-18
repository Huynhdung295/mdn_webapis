// webapis/pointer_lock/script.js - Pointer Lock API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let posX = 180, posY = 110;
  let totalDeltaX = 0, totalDeltaY = 0;

  const spec = {
    id: "pointer_lock",
    panels: [
      {
        id: "panel-pointer-lock",
        title: "1. Khoá Con Trỏ Chuột (FPS 3D Controls)",
        badge: "element.requestPointerLock()",
        desc: "Bấm vào khung canvas bên dưới để khoá chuột (chuột sẽ bị ẩn đi và có thể di chuyển vô tận theo deltaX/deltaY như trong game FPS). Bấm Escape để thoát.",
        customHtml: `
          <div style="margin-bottom:12px;">
            <canvas id="pointer-canvas" class="lock-target-canvas" width="600" height="220"></canvas>
          </div>
        `,
        actions: [
          { id: "btn-lock-pointer", label: "Khoá Chuột Vào Canvas (requestPointerLock)", variant: "primary", handler: "lockPointer" },
          { id: "btn-unlock-pointer", label: "Thoát Khoá Chuột (exitPointerLock)", variant: "danger", handler: "unlockPointer" }
        ],
        previewBox: {
          id: "lock-status-box",
          initialText: "Trạng thái: Chưa khoá con trỏ chuột."
        }
      }
    ]
  };

  function drawCanvas() {
    const canvas = document.getElementById('pointer-canvas');
    if (!canvas || !canvas.getContext) return;
    const c = canvas.getContext('2d');
    if (!c || typeof c.moveTo !== 'function') return;
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Crosshair grid
    c.strokeStyle = 'rgba(255,255,255,0.06)';
    c.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      c.beginPath(); c.moveTo(x, 0); c.lineTo(x, canvas.height); c.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      c.beginPath(); c.moveTo(0, y); c.lineTo(canvas.width, y); c.stroke();
    }

    // Target reticle
    c.strokeStyle = '#38bdf8';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(posX, posY, 14, 0, Math.PI * 2);
    c.stroke();

    c.beginPath();
    c.moveTo(posX - 22, posY); c.lineTo(posX + 22, posY);
    c.moveTo(posX, posY - 22); c.lineTo(posX, posY + 22);
    c.stroke();

    // Center dot
    c.fillStyle = '#34d399';
    c.beginPath();
    c.arc(posX, posY, 3, 0, Math.PI * 2);
    c.fill();
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Pointer Lock API khởi động: Thiết lập Canvas");
      drawCanvas();

      const canvas = document.getElementById('pointer-canvas');

      // Click vào canvas cũng kích hoạt lock
      if (canvas) {
        canvas.addEventListener('click', () => handlers.lockPointer(ctx));
      }

      const onLockChange = () => {
        const isLocked = document.pointerLockElement === canvas;
        if (isLocked) {
          ctx.success("Sự kiện pointerlockchange: Chuột ĐÃ BỊ KHOÁ vào Canvas!");
          ctx.setHtml('lock-status-box', `
            <div style="color:#34d399; font-weight:700;">● CON TRỎ CHUỘT ĐANG BỊ KHOÁ</div>
            <div>• Di chuột để điều khiển tâm ngắm trong không gian vô hạn (movementX/Y).</div>
            <div>• Nhấn phím <code>Escape</code> hoặc nút bên dưới để giải phóng chuột.</div>
          `);
        } else {
          ctx.warn("Sự kiện pointerlockchange: Con trỏ chuột đã ĐƯỢC GIẢI PHÓNG.");
          ctx.setHtml('lock-status-box', 'Trạng thái: Con trỏ chuột bình thường.');
        }
      };

      document.addEventListener('pointerlockchange', onLockChange);
      document.addEventListener('pointerlockerror', (err) => {
        ctx.error("Lỗi pointerlockerror:", err);
      });

      // Theo dõi chuyển động di chuột khi đã lock
      document.addEventListener('mousemove', (e) => {
        if (document.pointerLockElement === canvas) {
          const dx = e.movementX || 0;
          const dy = e.movementY || 0;
          totalDeltaX += dx;
          totalDeltaY += dy;

          posX = Math.max(20, Math.min(canvas.width - 20, posX + dx));
          posY = Math.max(20, Math.min(canvas.height - 20, posY + dy));

          drawCanvas();

          // Log theo nhịp
          if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            ctx.event("Pointer Movement", {
              movementX: dx,
              movementY: dy,
              totalX: totalDeltaX,
              totalY: totalDeltaY
            });
          }
        }
      });
    },

    lockPointer: async (ctx) => {
      const canvas = document.getElementById('pointer-canvas');
      if (!canvas) return;

      ctx.workflowStep("Gọi canvas.requestPointerLock()");
      try {
        await canvas.requestPointerLock();
      } catch (err) {
        ctx.error("Lỗi khi yêu cầu Pointer Lock:", err.message);
      }
    },

    unlockPointer: (ctx) => {
      ctx.workflowStep("Gọi document.exitPointerLock()");
      if (!document.pointerLockElement) {
        ctx.warn("Chuột chưa bị khoá.");
        return;
      }
      document.exitPointerLock();
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
