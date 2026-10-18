// webapis/screen_capture/script.js - Screen Capture API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let displayStream = null;

  const spec = {
    id: "screen_capture",
    panels: [
      {
        id: "panel-screen-share",
        title: "1. Chia Sẻ Màn Hình / Cửa Sổ Ứng Dụng (getDisplayMedia)",
        badge: "navigator.mediaDevices.getDisplayMedia()",
        desc: "Yêu cầu quyền quay màn hình hệ thống (Toàn bộ màn hình, Cửa sổ phần mềm cụ thể hoặc một Tab trình duyệt) cho ứng dụng Họp trực tuyến (Google Meet/Zoom) hoặc phần mềm Remote Desktop.",
        inputs: [
          {
            id: "select-cursor-mode",
            type: "select",
            label: "Chế độ hiển thị con trỏ chuột trong video:",
            options: [
              { value: "always", label: "Luôn hiển thị con trỏ (always)" },
              { value: "motion", label: "Chỉ hiện khi di chuyển (motion)" },
              { value: "never", label: "Ẩn con trỏ chuột (never)" }
            ]
          }
        ],
        customHtml: `
          <div class="screen-video-wrap">
            <video id="screen-live-player" autoplay playsinline muted></video>
          </div>
        `,
        actions: [
          { id: "btn-start-screen-share", label: "🖥️ Bắt Đầu Chia Sẻ Màn Hình", variant: "primary", handler: "startScreenShare" },
          { id: "btn-stop-screen-share", label: "■ Dừng Chia Sẻ (Stop)", variant: "danger", handler: "stopScreenShare" }
        ],
        previewBox: {
          id: "screen-track-details",
          initialText: "Màn hình chưa được chia sẻ."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Screen Capture API");
      if (!('mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices)) {
        ctx.warn("navigator.mediaDevices.getDisplayMedia không khả dụng trên trình duyệt này (cần môi trường Desktop & HTTPS/localhost).");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ Screen Capture API!");
      }
    },

    startScreenShare: async (ctx) => {
      const cursorMode = ctx.getVal('select-cursor-mode');
      ctx.workflowStep(`Yêu cầu chia sẻ màn hình với cursor: "${cursorMode}"`);

      if (!('mediaDevices' in navigator && navigator.mediaDevices.getDisplayMedia)) {
        ctx.warn("getDisplayMedia không khả dụng trên thiết bị này.");
        return;
      }

      try {
        if (displayStream) {
          displayStream.getTracks().forEach(t => t.stop());
        }

        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: cursorMode,
            displaySurface: 'monitor'
          },
          audio: true
        });

        displayStream = stream;
        const videoEl = document.getElementById('screen-live-player');
        if (videoEl) videoEl.srcObject = stream;

        const vTrack = stream.getVideoTracks()[0];
        const settings = vTrack.getSettings();

        ctx.success("Đã kết nối luồng chia sẻ màn hình thành công!", {
          displaySurface: settings.displaySurface || 'unknown',
          width: settings.width,
          height: settings.height,
          frameRate: settings.frameRate
        });

        // Lắng nghe khi người dùng bấm nút 'Stop sharing' trên thanh banner nổi của hệ điều hành
        vTrack.onended = () => {
          ctx.warn("Người dùng đã dừng chia sẻ màn hình qua thanh điều khiển của hệ điều hành (onended event).");
          handlers.stopScreenShare(ctx);
        };

        const detailsHtml = `
          <div style="font-size:0.85rem;">
            <div>🖥️ <strong>Bề mặt chia sẻ:</strong> <span class="badge badge-info">${settings.displaySurface || 'Màn hình/Tab'}</span></div>
            <div style="margin-top:4px;">
              Độ phân giải thực: <strong>${settings.width || '?'} x ${settings.height || '?'}</strong> | Tần số quét: <strong>${settings.frameRate || '?'} fps</strong>
            </div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">
              Nhãn track: ${vTrack.label}
            </div>
          </div>
        `;
        ctx.setHtml('screen-track-details', detailsHtml);
      } catch (err) {
        if (err.name === 'NotAllowedError') {
          ctx.warn("Người dùng đã huỷ hoặc đóng hộp thoại chọn màn hình.", err);
        } else {
          ctx.error(`Lỗi getDisplayMedia: ${err.message}`, err);
        }
      }
    },

    stopScreenShare: (ctx) => {
      if (displayStream) {
        displayStream.getTracks().forEach(t => t.stop());
        displayStream = null;
      }
      const videoEl = document.getElementById('screen-live-player');
      if (videoEl) videoEl.srcObject = null;

      ctx.success("Đã ngắt kết nối luồng chia sẻ màn hình.");
      ctx.setHtml('screen-track-details', 'Màn hình đã dừng chia sẻ.');
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
