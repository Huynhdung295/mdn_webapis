// webapis/streams/script.js - Streams API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "streams",
    panels: [
      {
        id: "panel-streams-pipeline",
        title: "1. Đường Ống Dữ Liệu Luồng (Readable ➔ Transform ➔ Writable)",
        badge: "Web Streams API",
        desc: "Mô phỏng cơ chế truyền tải từng mẩu dữ liệu nhỏ (chunks) theo thời gian thực như cách ChatGPT / LLM stream phản hồi từng chữ mà không tốn RAM.",
        inputs: [
          { id: "stream-input-text", label: "Chuỗi văn bản nguồn để stream:", type: "textarea", rows: 2, value: "Web Streams API cho phép xử lý dữ liệu khổng lồ từng mẩu (chunk) mà không cần chờ tải toàn bộ vào RAM!" }
        ],
        actions: [
          { id: "btn-start-stream", label: "Bắt Đầu Chạy Luồng (pipeThrough & pipeTo)", variant: "primary", handler: "runStreamPipeline" }
        ],
        previewBox: {
          id: "stream-output-box",
          initialText: "Chưa kích hoạt luồng dữ liệu."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Streams API sẵn sàng");
    },

    runStreamPipeline: async (ctx) => {
      const text = ctx.getVal('stream-input-text');
      const words = text.split(' ');

      ctx.workflowStep("Khởi tạo ReadableStream phát từng từ với độ trễ 100ms");
      ctx.setHtml('stream-output-box', '<span style="color:#38bdf8;">Đang mở luồng stream...</span>');

      // 1. ReadableStream
      const readable = new ReadableStream({
        async start(controller) {
          for (let i = 0; i < words.length; i++) {
            await new Promise(r => setTimeout(r, 120));
            controller.enqueue(words[i] + ' ');
          }
          controller.close();
        }
      });

      // 2. TransformStream (Chuyển đổi từng chunk, ví dụ thêm định dạng)
      const transform = new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(chunk.toUpperCase());
        }
      });

      // 3. WritableStream (Nhận chunk và vẽ ra UI theo thời gian thực)
      let accumulated = '';
      const writable = new WritableStream({
        write(chunk) {
          accumulated += chunk;
          ctx.setHtml('stream-output-box', `
            <div style="font-weight:600; color:#34d399; margin-bottom:4px;">● Dữ liệu đang được đẩy qua luồng WritableStream:</div>
            <div style="font-family:var(--font-mono); font-size:0.9rem; color:#f8fafc; line-height:1.6; background:rgba(0,0,0,0.3); padding:10px; border-radius:6px;">
              ${ctx.escapeHtml(accumulated)}<span style="display:inline-block; width:8px; height:14px; background:#38bdf8; vertical-align:middle; animation:pulse 1s infinite;"></span>
            </div>
          `);
        },
        close() {
          ctx.success("Luồng ReadableStream đã đóng (controller.close). Toàn bộ dữ liệu đã được xử lý xong!");
        }
      });

      try {
        await readable.pipeThrough(transform).pipeTo(writable);
      } catch (err) {
        ctx.error("Lỗi luồng stream:", err);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
