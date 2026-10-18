// webapis/media_stream_recording/script.js - MediaStream Recording API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let mediaRecorder = null;
  let recordedChunks = [];
  let animCanvas = null;
  let animContext = null;
  let animId = null;

  const spec = {
    id: "media_stream_recording",
    panels: [
      {
        id: "panel-recorder-controls",
        title: "1. Ghi Hình Luồng Đồ Hoạ Thời Gian Thực (Canvas Stream Recording)",
        badge: "MediaRecorder & canvas.captureStream()",
        desc: "Sử dụng MediaRecorder để quay phim đồ hoạ động trực tiếp từ Canvas mà không cần xin quyền Camera/Mic, tạo file WebM hoặc MP4 chất lượng cao.",
        customHtml: `
          <div style="display:flex; flex-direction:column; align-items:center; gap:8px; margin-top:10px;">
            <canvas id="record-source-canvas" width="480" height="240" style="background:#0f172a; border-radius:8px; border:1px solid rgba(255,255,255,0.1); width:100%; max-width:480px;"></canvas>
            <div id="rec-status-wrap" class="recording-status-badge" style="background:rgba(255,255,255,0.05); color:var(--text-muted);">
              <span id="rec-dot" class="rec-indicator"></span>
              <span id="rec-status-text">Đang ở chế độ chờ (Idle)</span>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-start-record", label: "● Bắt Đầu Quay (Start Record)", variant: "danger", handler: "startRecording" },
          { id: "btn-pause-record", label: "⏸ Tạm Dừng (Pause)", variant: "secondary", handler: "pauseRecording" },
          { id: "btn-resume-record", label: "▶ Tiếp Tục (Resume)", variant: "secondary", handler: "resumeRecording" },
          { id: "btn-stop-record", label: "■ Kết Thúc & Xuất Video (Stop)", variant: "primary", handler: "stopRecording" }
        ],
        previewBox: {
          id: "record-preview-box",
          initialText: "Video hoàn chỉnh sau khi quay sẽ xuất hiện ở đây để xem lại hoặc tải về."
        }
      }
    ]
  };

  function startCanvasAnimation() {
    animCanvas = document.getElementById('record-source-canvas');
    if (!animCanvas) return;
    animContext = animCanvas.getContext('2d');

    let x = 40;
    let y = 120;
    let dx = 3;
    let dy = 2;
    let angle = 0;

    function render() {
      animContext.fillStyle = 'rgba(15, 23, 42, 0.3)';
      animContext.fillRect(0, 0, animCanvas.width, animCanvas.height);

      // Vẽ hình cầu phát sáng
      animContext.save();
      animContext.translate(x, y);
      animContext.rotate(angle);
      animContext.fillStyle = '#38bdf8';
      animContext.shadowColor = '#38bdf8';
      animContext.shadowBlur = 15;
      animContext.fillRect(-20, -20, 40, 40);
      animContext.restore();

      // Đồng hồ đếm thời gian
      animContext.fillStyle = '#f8fafc';
      animContext.font = '16px monospace';
      animContext.fillText(`LIVE STREAM: ${new Date().toLocaleTimeString()}.${Math.floor(performance.now() % 1000)}`, 16, 30);

      x += dx;
      y += dy;
      angle += 0.04;

      if (x + 20 >= animCanvas.width || x - 20 <= 0) dx = -dx;
      if (y + 20 >= animCanvas.height || y - 20 <= 0) dy = -dy;

      animId = requestAnimationFrame(render);
    }

    render();
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo MediaStream Recording API");
      if (!('MediaRecorder' in window)) {
        ctx.warn("Trình duyệt không hỗ trợ MediaRecorder API.");
        return;
      }

      ctx.success("Trình duyệt hỗ trợ MediaRecorder!");
      startCanvasAnimation();

      // Liệt kê các MIME types được hỗ trợ
      const testTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
        'video/mp4;codecs=avc1',
        'video/mp4'
      ];
      const supportedTypes = testTypes.filter(t => MediaRecorder.isTypeSupported(t));
      ctx.workflowStep(`Các định dạng ghi video phần cứng hỗ trợ: [${supportedTypes.join(', ')}]`);
    },

    startRecording: (ctx) => {
      ctx.workflowStep("Bắt đầu gọi mediaRecorder.start(1000) (nhận chunk mỗi 1 giây)");

      if (!animCanvas) return;
      const stream = animCanvas.captureStream(30); // 30 FPS stream

      recordedChunks = [];

      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType });

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunks.push(e.data);
            ctx.event("dataavailable", { chunkSize: `${(e.data.size / 1024).toFixed(1)} KB`, totalChunks: recordedChunks.length });
          }
        };

        mediaRecorder.onstart = () => {
          ctx.success("MediaRecorder đã bắt đầu ghi (state: 'recording')");
          const dot = document.getElementById('rec-dot');
          const txt = document.getElementById('rec-status-text');
          if (dot) dot.classList.add('rec-blinking');
          if (txt) txt.innerText = "● Đang quay video (Recording...)";
        };

        mediaRecorder.onpause = () => {
          ctx.warn("MediaRecorder tạm dừng (state: 'paused')");
          const txt = document.getElementById('rec-status-text');
          if (txt) txt.innerText = "❚❚ Tạm dừng quay (Paused)";
        };

        mediaRecorder.onresume = () => {
          ctx.success("MediaRecorder tiếp tục quay (state: 'recording')");
          const txt = document.getElementById('rec-status-text');
          if (txt) txt.innerText = "● Đang quay video (Recording...)";
        };

        mediaRecorder.onstop = () => {
          ctx.success(`Quá trình ghi hoàn tất với ${recordedChunks.length} chunks.`);
          const dot = document.getElementById('rec-dot');
          const txt = document.getElementById('rec-status-text');
          if (dot) dot.classList.remove('rec-blinking');
          if (txt) txt.innerText = "Đã dừng và hoàn tất.";

          // Tạo Blob hoàn chỉnh
          const blob = new Blob(recordedChunks, { type: mimeType });
          const videoUrl = URL.createObjectURL(blob);
          const sizeKb = (blob.size / 1024).toFixed(1);

          const resultHtml = `
            <div class="media-playback-box">
              <div style="font-weight:600; color:#34d399;">✔ Đã xuất video thành công (${sizeKb} KB, MIME: ${mimeType})</div>
              <video controls autoplay style="width:100%; max-height:220px; border-radius:6px; background:#000;">
                <source src="${videoUrl}" type="${mimeType}">
              </video>
              <div style="margin-top:6px;">
                <a href="${videoUrl}" download="recorded-canvas-demo.webm" class="btn btn-primary" style="text-decoration:none; display:inline-block; font-size:0.8rem; padding:6px 12px;">
                  ⬇ Tải File Video Xuống Máy
                </a>
              </div>
            </div>
          `;
          ctx.setHtml('record-preview-box', resultHtml);
        };

        mediaRecorder.start(1000);
      } catch (err) {
        ctx.error(`Lỗi khởi tạo MediaRecorder: ${err.message}`, err);
      }
    },

    pauseRecording: (ctx) => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
      } else {
        ctx.warn("MediaRecorder không ở trạng thái 'recording' để pause.");
      }
    },

    resumeRecording: (ctx) => {
      if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
      } else {
        ctx.warn("MediaRecorder không ở trạng thái 'paused' để resume.");
      }
    },

    stopRecording: (ctx) => {
      if (mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused')) {
        ctx.workflowStep("Gọi mediaRecorder.stop()");
        mediaRecorder.stop();
      } else {
        ctx.warn("Chưa có tiến trình ghi nào đang chạy.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
