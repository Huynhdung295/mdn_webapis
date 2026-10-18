// webapis/touch_events/script.js - Touch Events API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let canvas = null;
  let ctx2d = null;
  const colors = ['#38bdf8', '#34d399', '#f59e0b', '#ec4899', '#a855f7'];

  const spec = {
    id: "touch_events",
    panels: [
      {
        id: "panel-touch-surface",
        title: "1. Bảng Cảm Ứng Đa Điểm (Multi-Touch Surface)",
        badge: "touches, targetTouches & changedTouches",
        desc: "Chạm đồng thời 1, 2, 3 ngón tay lên bảng màu đen bên dưới để theo dõi toạ độ từng điểm chạm, bán kính tiếp xúc (radiusX/Y) và phát hiện cử chỉ chụm/zoom (pinch).",
        customHtml: `
          <div class="touch-surface-wrap">
            <canvas id="multi-touch-canvas" width="500" height="260"></canvas>
            <div style="font-size:0.8rem; color:var(--text-muted);">
              Số điểm cảm ứng tối đa phần cứng: <strong id="lbl-max-touch-points" style="color:#34d399;">0</strong>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-clear-touch-canvas", label: "Làm Sạch Bảng Vẽ", variant: "secondary", handler: "clearTouchCanvas" },
          { id: "btn-simulate-multitouch", label: "Mô Phỏng 2 Ngón Tay Chụm (Pinch Zoom Demo)", variant: "primary", handler: "simulatePinch" }
        ],
        previewBox: {
          id: "touch-status-box",
          initialText: "Chạm ngón tay lên canvas để kiểm tra các sự kiện touchstart, touchmove, touchend."
        }
      }
    ]
  };

  function drawTouches(touchList) {
    if (!ctx2d || !canvas) return;
    ctx2d.fillStyle = 'rgba(9, 13, 22, 0.25)';
    ctx2d.fillRect(0, 0, canvas.width, canvas.height);

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    for (let i = 0; i < touchList.length; i++) {
      const touch = touchList[i];
      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;
      const color = colors[touch.identifier % colors.length] || '#38bdf8';
      const radius = Math.max(18, (touch.radiusX || 12) * scaleX);

      // Vẽ vòng tròn điểm chạm
      ctx2d.beginPath();
      ctx2d.arc(x, y, radius, 0, Math.PI * 2);
      ctx2d.fillStyle = color;
      ctx2d.globalAlpha = 0.35;
      ctx2d.fill();

      ctx2d.beginPath();
      ctx2d.arc(x, y, 6, 0, Math.PI * 2);
      ctx2d.fillStyle = '#ffffff';
      ctx2d.globalAlpha = 1;
      ctx2d.fill();

      ctx2d.strokeStyle = color;
      ctx2d.lineWidth = 2;
      ctx2d.stroke();

      // Vẽ nhãn id & toạ độ
      ctx2d.fillStyle = '#ffffff';
      ctx2d.font = '12px monospace';
      ctx2d.fillText(`Touch #${touch.identifier} (${Math.round(x)}, ${Math.round(y)})`, x + radius + 4, y);
    }

    // Nếu có 2 ngón tay, vẽ đường thẳng nối đo khoảng cách
    if (touchList.length >= 2) {
      const t1 = touchList[0];
      const t2 = touchList[1];
      const x1 = (t1.clientX - rect.left) * scaleX;
      const y1 = (t1.clientY - rect.top) * scaleY;
      const x2 = (t2.clientX - rect.left) * scaleX;
      const y2 = (t2.clientY - rect.top) * scaleY;

      ctx2d.beginPath();
      ctx2d.moveTo(x1, y1);
      ctx2d.lineTo(x2, y2);
      ctx2d.strokeStyle = '#fbbf24';
      ctx2d.lineWidth = 2;
      ctx2d.setLineDash([4, 4]);
      ctx2d.stroke();
      ctx2d.setLineDash([]);

      const dist = Math.hypot(x2 - x1, y2 - y1);
      ctx2d.fillStyle = '#fbbf24';
      ctx2d.fillText(`Khoảng cách Pinch: ${Math.round(dist)}px`, (x1 + x2) / 2, (y1 + y2) / 2 - 10);
    }
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Touch Events API");
      const maxPts = navigator.maxTouchPoints || 0;
      const lbl = document.getElementById('lbl-max-touch-points');
      if (lbl) lbl.innerText = `${maxPts} ngón tay`;

      canvas = document.getElementById('multi-touch-canvas');
      if (canvas) {
        ctx2d = canvas.getContext('2d');
      }

      if (!('ontouchstart' in window) && maxPts === 0) {
        ctx.warn("Máy tính không có màn hình cảm ứng vật lý. Sử dụng tính năng 'Mô Phỏng 2 Ngón Tay' hoặc bật Device Mode (Ctrl+Shift+M) trong DevTools để thử nghiệm cảm ứng.");
      } else {
        ctx.success(`Phát hiện phần cứng cảm ứng hỗ trợ tối đa ${maxPts} điểm chạm đồng thời!`);
      }

      if (!canvas) return;

      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        drawTouches(e.touches);
        ctx.event("touchstart", {
          totalTouches: e.touches.length,
          changedTouches: e.changedTouches.length
        });
        updateTouchStatus(e.touches, ctx);
      });

      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        drawTouches(e.touches);
      });

      canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        drawTouches(e.touches);
        ctx.event("touchend", { remainingTouches: e.touches.length });
        updateTouchStatus(e.touches, ctx);
      });

      canvas.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        drawTouches(e.touches);
        ctx.warn("Sự kiện touchcancel bị kích hoạt bởi hệ thống.");
      });
    },

    clearTouchCanvas: (ctx) => {
      if (ctx2d && canvas) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        ctx.workflowStep("Đã xoá sạch bảng cảm ứng.");
      }
    },

    simulatePinch: (ctx) => {
      ctx.workflowStep("Mô phỏng cử chỉ 2 ngón tay chạm và phóng to (Pinch-to-zoom)");
      if (!canvas) canvas = ctx.getEl('touch-canvas');
      const rect = canvas && typeof canvas.getBoundingClientRect === 'function' ? canvas.getBoundingClientRect() : { left: 0, top: 0 };
      const mockTouches = [
        { identifier: 0, clientX: rect.left + 140, clientY: rect.top + 130, radiusX: 18 },
        { identifier: 1, clientX: rect.left + 360, clientY: rect.top + 130, radiusX: 18 }
      ];

      drawTouches(mockTouches);
      ctx.success("Đã mô phỏng 2 điểm chạm với khoảng cách đo đạc được!");
      ctx.setHtml('touch-status-box', '<span style="color:#fbbf24;">● Mô phỏng 2 điểm chạm đồng thời: Touch #0 và Touch #1</span>');
    }
  };

  function updateTouchStatus(touches, ctx) {
    if (touches.length === 0) {
      ctx.setHtml('touch-status-box', 'Tất cả các ngón tay đã rời khỏi màn hình.');
    } else {
      ctx.setHtml('touch-status-box', `
        <span style="color:#34d399;">● Đang giữ <strong>${touches.length}</strong> điểm chạm đồng thời trên màn hình.</span>
      `);
    }
  }

  WebAPICore.renderApp(spec, handlers);
})();
