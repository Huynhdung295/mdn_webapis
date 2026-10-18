// webapis/picture_in_picture/script.js - Picture-in-Picture API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let canvasStream = null;
  let animId = null;

  const spec = {
    id: "picture_in_picture",
    panels: [
      {
        id: "panel-pip-video",
        title: "1. Kích Hoạt Video Picture-in-Picture",
        badge: "video.requestPictureInPicture()",
        desc: "Video hoạt hoạ được vẽ bằng Canvas thời gian thực và truyền qua luồng video. Bấm nút bên dưới để đưa video ra cửa sổ nổi màn hình.",
        customHtml: `
          <div style="display:flex; justify-content:center; margin-bottom:16px;">
            <video id="pip-video-el" autoplay playsinline muted style="width:360px; height:200px; border-radius:8px; border:2px solid rgba(56,189,248,0.3); background:#020617;"></video>
          </div>
        `,
        actions: [
          { id: "btn-start-pip", label: "Mở Cửa Sổ Nổi (requestPictureInPicture)", variant: "primary", handler: "enterPip" },
          { id: "btn-exit-pip", label: "Thoát Cửa Sổ Nổi (exitPictureInPicture)", variant: "danger", handler: "exitPip" }
        ],
        previewBox: {
          id: "pip-status-box",
          initialText: "Trạng thái: Video đang phát trong trang."
        }
      }
    ]
  };

  function setupCanvasVideo(ctx) {
    const canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 200;
    const c = canvas.getContext('2d');
    if (!c || typeof c.moveTo !== 'function') return;

    let x = 50, y = 50, vx = 3, vy = 2, hue = 0;

    function draw() {
      c.fillStyle = '#0f172a';
      c.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      c.strokeStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i < canvas.width; i += 20) {
        c.beginPath(); c.moveTo(i, 0); c.lineTo(i, canvas.height); c.stroke();
      }

      // Bouncing ball
      x += vx; y += vy;
      if (x < 20 || x > canvas.width - 20) vx = -vx;
      if (y < 20 || y > canvas.height - 20) vy = -vy;

      hue = (hue + 1) % 360;
      c.fillStyle = `hsl(${hue}, 80%, 60%)`;
      c.beginPath();
      c.arc(x, y, 18, 0, Math.PI * 2);
      c.fill();

      // Text
      c.fillStyle = '#f8fafc';
      c.font = 'bold 16px Inter, sans-serif';
      c.fillText('Picture-in-Picture Live Stream', 20, 30);
      c.fillStyle = '#94a3b8';
      c.font = '12px Inter, sans-serif';
      c.fillText(`Time: ${new Date().toLocaleTimeString()}`, 20, 50);

      animId = requestAnimationFrame(draw);
    }
    draw();

    if (typeof canvas.captureStream === 'function') {
      canvasStream = canvas.captureStream(30);
    } else if (typeof canvas.mozCaptureStream === 'function') {
      canvasStream = canvas.mozCaptureStream(30);
    }

    const video = document.getElementById('pip-video-el');
    if (video && canvasStream) {
      video.srcObject = canvasStream;
      if (typeof video.play === 'function') {
        video.play().catch(() => {});
      }
    }
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Picture-in-Picture khởi động: Tạo luồng Canvas Stream");
      setupCanvasVideo(ctx);

      const video = document.getElementById('pip-video-el');
      if (video) {
        video.addEventListener('enterpictureinpicture', (e) => {
          ctx.success("Sự kiện enterpictureinpicture: Video đã nổi ra cửa sổ ngoài màn hình!");
          ctx.setHtml('pip-status-box', `
            <div style="color:#34d399; font-weight:700;">● Video đang ở chế độ Cửa Sổ Nổi (Picture-in-Picture)</div>
            <div>• Kích thước PiP: ${e.pictureInPictureWindow.width} x ${e.pictureInPictureWindow.height}px</div>
          `);
        });

        video.addEventListener('leavepictureinpicture', () => {
          ctx.warn("Sự kiện leavepictureinpicture: Video đã quay trở lại giao diện web.");
          ctx.setHtml('pip-status-box', 'Trạng thái: Video đang phát bình thường trong trang.');
        });
      }
    },

    enterPip: async (ctx) => {
      const video = document.getElementById('pip-video-el');
      ctx.workflowStep("Gọi video.requestPictureInPicture()");

      if (!document.pictureInPictureEnabled) {
        ctx.error("Trình duyệt không cho phép hoặc không hỗ trợ Picture-in-Picture.");
        return;
      }

      try {
        await video.requestPictureInPicture();
      } catch (err) {
        ctx.error("Lỗi khi mở Picture-in-Picture:", err.message);
      }
    },

    exitPip: async (ctx) => {
      ctx.workflowStep("Gọi document.exitPictureInPicture()");
      if (!document.pictureInPictureElement) {
        ctx.warn("Hiện tại video không ở chế độ Picture-in-Picture.");
        return;
      }
      try {
        await document.exitPictureInPicture();
      } catch (err) {
        ctx.error("Lỗi khi thoát Picture-in-Picture:", err.message);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
