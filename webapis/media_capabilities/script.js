// webapis/media_capabilities/script.js - Media Capabilities API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  const spec = {
    id: "media_capabilities",
    panels: [
      {
        id: "panel-decoding-info",
        title: "1. Đánh Giá Khả Năng Giải Mã Video (Decoding Info)",
        badge: "navigator.mediaCapabilities.decodingInfo()",
        desc: "Kiểm tra xem phần cứng máy tính/điện thoại có giải mã mượt mà (smooth) và tiết kiệm pin (powerEfficient) cho độ phân giải và codec cụ thể hay không.",
        inputs: [
          {
            id: "select-video-codec",
            type: "select",
            label: "Codec Video:",
            options: [
              { value: 'video/mp4; codecs="avc1.42E01E"', label: "H.264 / AVC (Baseline)" },
              { value: 'video/mp4; codecs="avc1.640028"', label: "H.264 / AVC (High Profile 1080p)" },
              { value: 'video/webm; codecs="vp9"', label: "VP9 (YouTube WebM)" },
              { value: 'video/mp4; codecs="av01.0.08M.08"', label: "AV1 (AOMedia Video 1 Next-Gen)" },
              { value: 'video/mp4; codecs="hev1.1.6.L93.B0"', label: "H.265 / HEVC" }
            ]
          },
          {
            id: "select-resolution",
            type: "select",
            label: "Độ phân giải & FPS:",
            options: [
              { value: "1920x1080x60", label: "Full HD 1080p @ 60fps (10 Mbps)" },
              { value: "3840x2160x60", label: "4K UHD 2160p @ 60fps (25 Mbps)" },
              { value: "7680x4320x30", label: "8K UHD 4320p @ 30fps (50 Mbps)" },
              { value: "1280x720x30", label: "HD 720p @ 30fps (3 Mbps)" }
            ]
          }
        ],
        actions: [
          { id: "btn-check-decoding", label: "Kiểm Tra Khả Năng Giải Mã (decodingInfo)", variant: "primary", handler: "checkDecoding" }
        ],
        previewBox: {
          id: "decoding-preview-box",
          initialText: "Bấm nút phía trên để kiểm tra khả năng giải mã phần cứng."
        }
      },
      {
        id: "panel-encoding-info",
        title: "2. Đánh Giá Khả Năng Ghi Hình / Nén Video (Encoding Info)",
        badge: "navigator.mediaCapabilities.encodingInfo()",
        desc: "Dành cho WebRTC livestream hoặc MediaRecorder: kiểm tra máy có đủ GPU để encode video 1080p60 không giật lag.",
        actions: [
          { id: "btn-check-encoding", label: "Kiểm Tra Nén WebM VP8/Opus (encodingInfo)", variant: "secondary", handler: "checkEncoding" }
        ],
        previewBox: {
          id: "encoding-preview-box",
          initialText: "Chưa kiểm tra khả năng nén."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Media Capabilities API");
      if (!('mediaCapabilities' in navigator)) {
        ctx.warn("navigator.mediaCapabilities không khả dụng trên trình duyệt này.");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ navigator.mediaCapabilities!");
      }
    },

    checkDecoding: async (ctx) => {
      const contentType = ctx.getVal('select-video-codec');
      const resStr = ctx.getVal('select-resolution');
      const [w, h, fps] = resStr.split('x').map(Number);
      const bitrate = w >= 3840 ? (w >= 7680 ? 50000000 : 25000000) : 10000000;

      const mediaConfig = {
        type: 'file',
        video: {
          contentType: contentType,
          width: w,
          height: h,
          bitrate: bitrate,
          framerate: fps
        }
      };

      ctx.workflowStep(`Bắt đầu truy vấn decodingInfo cho ${w}x${h}@${fps}fps, codec: ${contentType}`);

      if (!('mediaCapabilities' in navigator && navigator.mediaCapabilities.decodingInfo)) {
        ctx.warn("Trình duyệt không hỗ trợ decodingInfo native.");
        return;
      }

      try {
        const result = await navigator.mediaCapabilities.decodingInfo(mediaConfig);
        ctx.success(`Kết quả đánh giá từ GPU & OS:`, result);

        const html = `
          <div class="capability-matrix-grid">
            <div class="cap-metric-card">
              <div style="font-size:0.75rem; color:var(--text-muted);">ĐƯỢC HỖ TRỢ (Supported)</div>
              <div class="cap-metric-val ${result.supported ? 'cap-true' : 'cap-false'}">
                ${result.supported ? '✔ CÓ' : '✖ KHÔNG'}
              </div>
            </div>
            <div class="cap-metric-card">
              <div style="font-size:0.75rem; color:var(--text-muted);">MƯỢT MÀ (Smooth)</div>
              <div class="cap-metric-val ${result.smooth ? 'cap-true' : 'cap-false'}">
                ${result.smooth ? '✔ MƯỢT' : '✖ GIẬT LAG'}
              </div>
            </div>
            <div class="cap-metric-card">
              <div style="font-size:0.75rem; color:var(--text-muted);">TIẾT KIỆM PIN (Power Efficient)</div>
              <div class="cap-metric-val ${result.powerEfficient ? 'cap-true' : 'cap-false'}">
                ${result.powerEfficient ? '✔ GPU HARDWARE' : '✖ ĂN CPU / TỐN PIN'}
              </div>
            </div>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:10px;">
            Độ phân giải: <strong>${w}x${h} @ ${fps}fps</strong> | Bitrate: <strong>${(bitrate / 1000000).toFixed(0)} Mbps</strong>
          </div>
        `;
        ctx.setHtml('decoding-preview-box', html);
      } catch (err) {
        ctx.error(`Lỗi khi gọi decodingInfo: ${err.message}`, err);
      }
    },

    checkEncoding: async (ctx) => {
      ctx.workflowStep("Bắt đầu truy vấn encodingInfo cho luồng ghi hình WebM/VP8");

      if (!('mediaCapabilities' in navigator && navigator.mediaCapabilities.encodingInfo)) {
        ctx.warn("navigator.mediaCapabilities.encodingInfo chưa được hỗ trợ rộng rãi trên trình duyệt này.");
        return;
      }

      const encConfig = {
        type: 'record',
        video: {
          contentType: 'video/webm; codecs="vp8"',
          width: 1280,
          height: 720,
          bitrate: 2500000,
          framerate: 30
        },
        audio: {
          contentType: 'audio/webm; codecs="opus"',
          channels: 2,
          bitrate: 128000,
          samplerate: 48000
        }
      };

      try {
        const result = await navigator.mediaCapabilities.encodingInfo(encConfig);
        ctx.success("Kết quả encodingInfo:", result);

        const html = `
          <div class="capability-matrix-grid">
            <div class="cap-metric-card">
              <div style="font-size:0.75rem; color:var(--text-muted);">HỖ TRỢ NÉN (Supported)</div>
              <div class="cap-metric-val ${result.supported ? 'cap-true' : 'cap-false'}">
                ${result.supported ? '✔ CÓ' : '✖ KHÔNG'}
              </div>
            </div>
            <div class="cap-metric-card">
              <div style="font-size:0.75rem; color:var(--text-muted);">NÉN MƯỢT (Smooth)</div>
              <div class="cap-metric-val ${result.smooth ? 'cap-true' : 'cap-false'}">
                ${result.smooth ? '✔ MƯỢT' : '✖ NGHẼN'}
              </div>
            </div>
            <div class="cap-metric-card">
              <div style="font-size:0.75rem; color:var(--text-muted);">PHẦN CỨNG (Power Efficient)</div>
              <div class="cap-metric-val ${result.powerEfficient ? 'cap-true' : 'cap-false'}">
                ${result.powerEfficient ? '✔ GPU ENCODER' : '✖ PHẦN MỀM'}
              </div>
            </div>
          </div>
        `;
        ctx.setHtml('encoding-preview-box', html);
      } catch (err) {
        ctx.error(`Lỗi khi gọi encodingInfo: ${err.message}`, err);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
