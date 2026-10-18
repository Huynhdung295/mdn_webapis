// webapis/media_capture_and_streams/script.js - Media Capture and Streams API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let activeStream = null;
  let audioContext = null;
  let animFrameId = null;

  const spec = {
    id: "media_capture_and_streams",
    panels: [
      {
        id: "panel-camera-stream",
        title: "1. Thu Âm & Bật Camera Trực Tiếp (getUserMedia)",
        badge: "navigator.mediaDevices.getUserMedia()",
        desc: "Yêu cầu quyền truy cập phần cứng Camera và Microphone để nhận đối tượng MediaStream thời gian thực.",
        inputs: [
          {
            id: "select-camera-res",
            type: "select",
            label: "Độ phân giải yêu cầu (Video Constraints):",
            options: [
              { value: "640x480", label: "VGA 480p (640x480)" },
              { value: "1280x720", label: "HD 720p (1280x720)" },
              { value: "1920x1080", label: "Full HD 1080p (1920x1080)" }
            ]
          }
        ],
        customHtml: `
          <div class="video-viewport-wrap">
            <video id="live-cam-player" autoplay playsinline muted></video>
          </div>
          <div style="margin-top: 10px;">
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted);">
              <span>Âm lượng Microphone (Mic Level):</span>
              <span id="mic-level-label">0%</span>
            </div>
            <div class="volume-meter-bar">
              <div id="mic-level-fill" class="volume-meter-fill"></div>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-start-stream", label: "Bật Camera & Mic", variant: "primary", handler: "startMediaStream" },
          { id: "btn-toggle-video", label: "Tắt/Bật Video Track", variant: "secondary", handler: "toggleVideoTrack" },
          { id: "btn-toggle-audio", label: "Mute/Unmute Mic", variant: "secondary", handler: "toggleAudioTrack" },
          { id: "btn-stop-stream", label: "Dừng Luồng (Stop Tracks)", variant: "danger", handler: "stopMediaStream" }
        ],
        previewBox: {
          id: "stream-track-details",
          initialText: "Camera đang tắt. Bấm 'Bật Camera & Mic' để bắt đầu."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Media Capture and Streams API");
      if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)) {
        ctx.warn("Trình duyệt không hỗ trợ getUserMedia hoặc chưa chạy trên HTTPS/localhost.");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ getUserMedia và MediaStream!");
      }
    },

    startMediaStream: async (ctx) => {
      ctx.workflowStep("Yêu cầu quyền truy cập getUserMedia({ video, audio })");

      const res = ctx.getVal('select-camera-res');
      const [w, h] = res.split('x').map(Number);

      const constraints = {
        video: { width: { ideal: w }, height: { ideal: h } },
        audio: true
      };

      try {
        if (activeStream) {
          activeStream.getTracks().forEach(t => t.stop());
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        activeStream = stream;

        const videoEl = document.getElementById('live-cam-player');
        if (videoEl) {
          videoEl.srcObject = stream;
        }

        ctx.success("Đã kết nối luồng MediaStream thành công!", {
          streamId: stream.id,
          active: stream.active,
          videoTracks: stream.getVideoTracks().length,
          audioTracks: stream.getAudioTracks().length
        });

        // Thiết lập đồng hồ đo âm lượng qua Web Audio API
        setupAudioVisualizer(stream);

        // Hiển thị thông số tracks
        const vTrack = stream.getVideoTracks()[0];
        const aTrack = stream.getAudioTracks()[0];

        let trackInfoHtml = '<div style="font-size:0.85rem;">';
        if (vTrack) {
          const settings = vTrack.getSettings();
          trackInfoHtml += `
            <div>📹 <strong>Video Track:</strong> ${vTrack.label}</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-left:14px;">
              Độ phân giải: <strong>${settings.width || '?'}x${settings.height || '?'}</strong> | FPS: <strong>${settings.frameRate || '?'}</strong>
            </div>
          `;
        }
        if (aTrack) {
          trackInfoHtml += `
            <div style="margin-top:6px;">🎙️ <strong>Audio Track:</strong> ${aTrack.label}</div>
          `;
        }
        trackInfoHtml += '</div>';

        ctx.setHtml('stream-track-details', trackInfoHtml);
      } catch (err) {
        if (err.name === 'NotAllowedError') {
          ctx.error("Người dùng đã từ chối quyền truy cập Camera/Mic (Permission Denied).", err);
        } else if (err.name === 'NotFoundError') {
          ctx.warn("Không tìm thấy phần cứng Camera hoặc Microphone cắm vào máy tính.", err);
        } else {
          ctx.error(`Lỗi getUserMedia: ${err.message}`, err);
        }
      }
    },

    toggleVideoTrack: (ctx) => {
      if (!activeStream || typeof activeStream.getVideoTracks !== 'function') return ctx.warn("Chưa có luồng video nào đang chạy.");
      const vTrack = activeStream.getVideoTracks()[0];
      if (vTrack) {
        vTrack.enabled = !vTrack.enabled;
        ctx.workflowStep(`Chuyển trạng thái Video Track -> enabled = ${vTrack.enabled}`);
        ctx.success(vTrack.enabled ? "Đã bật lại hình ảnh Camera" : "Đã tạm che hình ảnh Camera (Mute Video)");
      }
    },

    toggleAudioTrack: (ctx) => {
      if (!activeStream || typeof activeStream.getAudioTracks !== 'function') return ctx.warn("Chưa có luồng audio nào đang chạy.");
      const aTrack = activeStream.getAudioTracks()[0];
      if (aTrack) {
        aTrack.enabled = !aTrack.enabled;
        ctx.workflowStep(`Chuyển trạng thái Audio Track -> enabled = ${aTrack.enabled}`);
        ctx.success(aTrack.enabled ? "Đã bật lại micro (Unmuted)" : "Đã tắt tiếng micro (Muted)");
      }
    },

    stopMediaStream: (ctx) => {
      if (activeStream && typeof activeStream.getTracks === 'function') {
        activeStream.getTracks().forEach(t => {
          t.stop();
          ctx.event("track.stop()", { kind: t.kind, label: t.label });
        });
        activeStream = null;
      }
      if (audioContext) {
        audioContext.close().catch(() => {});
        audioContext = null;
      }
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }

      const videoEl = document.getElementById('live-cam-player');
      if (videoEl) videoEl.srcObject = null;

      const fill = document.getElementById('mic-level-fill');
      if (fill) fill.style.width = '0%';
      const label = document.getElementById('mic-level-label');
      if (label) label.innerText = '0%';

      ctx.success("Đã giải phóng toàn bộ phần cứng Camera & Microphone.");
      ctx.setHtml('stream-track-details', 'Camera đã tắt hoàn toàn.');
    }
  };

  function setupAudioVisualizer(stream) {
    try {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioClass();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const fillEl = document.getElementById('mic-level-fill');
      const labelEl = document.getElementById('mic-level-label');

      function updateMeter() {
        if (!activeStream || !audioContext) return;
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const percent = Math.min(100, Math.round((avg / 128) * 100));

        if (fillEl) fillEl.style.width = percent + '%';
        if (labelEl) labelEl.innerText = percent + '%';

        animFrameId = requestAnimationFrame(updateMeter);
      }

      updateMeter();
    } catch (e) {}
  }

  WebAPICore.renderApp(spec, handlers);
})();
