// webapis/webcodecs/script.js - WebCodecs API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "webcodecs",
    panels: [
      {
        id: "panel-webcodecs-demo",
        title: "1. Mã Hoá & Giải Mã Video Cấp Thấp (Hardware VideoEncoder)",
        badge: "VideoEncoder & VideoFrame",
        desc: "Truy cập trực tiếp bộ mã hoá phần cứng GPU để nén khung hình VideoFrame thành EncodedVideoChunk với độ trễ siêu thấp dưới 20ms.",
        inputs: [
          { id: "codec-choice", label: "Chuẩn nén Video (Codec):", type: "select", options: [
            { value: "vp8", label: "VP8 (Độ tương thích cao nhất)" },
            { value: "vp09.00.10.08", label: "VP9 (Nén tốt hơn)" },
            { value: "avc1.42001E", label: "H.264 / AVC (Baseline)" }
          ]}
        ],
        actions: [
          { id: "btn-test-codec-support", label: "Kiểm Tra Hỗ Trợ Codec (isConfigSupported)", variant: "primary", handler: "testCodecSupport" },
          { id: "btn-encode-frame", label: "Mã Hoá 1 Khung Hình Canvas Thật (encode)", variant: "secondary", handler: "encodeSingleFrame" }
        ],
        previewBox: {
          id: "codecs-status-box",
          initialText: "Đang kiểm tra VideoEncoder..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường WebCodecs API sẵn sàng");
      if (!('VideoEncoder' in window)) {
        ctx.warn("VideoEncoder chưa được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome 94+, Edge 94+, Safari 16.4+).");
      } else {
        ctx.success("VideoEncoder & VideoDecoder sẵn sàng!");
      }
      handlers.testCodecSupport(ctx);
    },

    testCodecSupport: async (ctx) => {
      if (!('VideoEncoder' in window)) {
        ctx.setHtml('codecs-status-box', '<span style="color:#f87171;">Trình duyệt không hỗ trợ VideoEncoder.</span>');
        return;
      }

      const codec = ctx.getVal('codec-choice');
      const config = {
        codec: codec,
        width: 640,
        height: 360,
        bitrate: 1_000_000,
        framerate: 30
      };

      ctx.workflowStep(`Kiểm tra VideoEncoder.isConfigSupported("${codec}")`);

      try {
        const support = await VideoEncoder.isConfigSupported(config);
        if (support.supported) {
          ctx.success(`Phần cứng THIẾT BỊ HỖ TRỢ chuẩn ${codec}!`, support.config);
          ctx.setHtml('codecs-status-box', `
            <div style="color:#34d399; font-weight:700;">✔ PHẦN CỨNG HỖ TRỢ CODEC: <code>${codec}</code></div>
            <div>• Độ phân giải tối ưu: ${support.config.width}x${support.config.height} @ 30fps</div>
            <div>• Bitrate: ${support.config.bitrate / 1000} kbps</div>
          `);
        } else {
          ctx.warn(`Codec ${codec} không được phần cứng hỗ trợ.`);
        }
      } catch (err) {
        ctx.error("Lỗi kiểm tra codec:", err);
      }
    },

    encodeSingleFrame: async (ctx) => {
      if (!('VideoEncoder' in window) || !('VideoFrame' in window)) {
        ctx.error("WebCodecs không khả dụng.");
        return;
      }

      const codec = ctx.getVal('codec-choice');
      ctx.workflowStep("Vẽ khung hình lên Canvas và tạo new VideoFrame()");

      // Tạo canvas mẫu
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 180;
      const c = canvas.getContext('2d');
      c.fillStyle = '#0f172a';
      c.fillRect(0, 0, 320, 180);
      c.fillStyle = '#38bdf8';
      c.font = 'bold 20px Inter, sans-serif';
      c.fillText('WebCodecs Live Frame', 40, 90);

      const frame = new VideoFrame(canvas, { timestamp: 0 });

      let encodedChunk = null;
      const encoder = new VideoEncoder({
        output(chunk, metadata) {
          encodedChunk = chunk;
          ctx.success(`[VideoEncoder] Đã nén thành công chunk loại "${chunk.type}" dung lượng ${chunk.byteLength} bytes trong vài mili-giây!`);
          ctx.setHtml('codecs-status-box', `
            <div style="color:#34d399; font-weight:700;">● Đã nén thành công EncodedVideoChunk!</div>
            <div>• Kiểu chunk: <strong style="color:#38bdf8;">${chunk.type} (Khung hình khoá / Keyframe)</strong></div>
            <div>• Dung lượng nén nhị phân: <strong>${chunk.byteLength} bytes</strong></div>
            <div>• Timestamp: <code>${chunk.timestamp} µs</code></div>
          `);
        },
        error(e) {
          ctx.error("Lỗi nén encoder:", e);
        }
      });

      try {
        encoder.configure({
          codec: codec,
          width: 320,
          height: 180,
          bitrate: 500_000,
          framerate: 30
        });

        ctx.workflowStep("encoder.encode(frame, { keyFrame: true })");
        encoder.encode(frame, { keyFrame: true });
        frame.close();
        await encoder.flush();
      } catch (err) {
        ctx.error("Lỗi khi encode khung hình:", err.message);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
