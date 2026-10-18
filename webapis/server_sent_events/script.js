// webapis/server_sent_events/script.js - Server-Sent Events API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let eventSourceInstance = null;

  const spec = {
    id: "server_sent_events",
    panels: [
      {
        id: "panel-sse-stream",
        title: "1. Kết Nối Luồng Dữ Liệu Thời Gian Thực (EventSource)",
        badge: "new EventSource()",
        desc: "Mở luồng HTTP SSE lắng nghe dữ liệu cập nhật thời gian thực từ server (/api/sse-stream) và tự động nhận diện Custom Events ('price-update').",
        inputs: [
          { id: "sse-endpoint", label: "SSE Endpoint URL:", type: "text", value: "/api/sse-stream", fullWidth: true }
        ],
        actions: [
          { id: "btn-connect-sse", label: "Mở Kết Nối SSE (new EventSource)", variant: "primary", handler: "connectSSE" },
          { id: "btn-close-sse", label: "Đóng Kết Nối (close)", variant: "danger", handler: "closeSSE" }
        ],
        previewBox: {
          id: "sse-stream-box",
          initialText: "Chưa kết nối SSE stream."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Server-Sent Events API sẵn sàng");
    },

    connectSSE: (ctx) => {
      if (eventSourceInstance) {
        ctx.warn("Đang có một kết nối SSE đang mở. Hãy đóng trước.");
        return;
      }

      const url = ctx.getVal('sse-endpoint');
      ctx.workflowStep(`Khởi tạo new EventSource("${url}")`);

      try {
        eventSourceInstance = new EventSource(url);

        eventSourceInstance.onopen = () => {
          ctx.success("SSE: Kết nối luồng thành công (onopen)!");
          ctx.setHtml('sse-stream-box', '<div style="color:#34d399; font-weight:700;">● Đang kết nối SSE... Đang đợi tin nhắn từ server.</div>');
        };

        // Lắng nghe tin nhắn mặc định (data:)
        eventSourceInstance.onmessage = (e) => {
          ctx.info("SSE onmessage nhận:", e.data);
        };

        // Lắng nghe sự kiện tuỳ biến (event: price-update)
        eventSourceInstance.addEventListener('price-update', (e) => {
          try {
            const data = JSON.parse(e.data);
            ctx.event("Custom Event: price-update", data);

            ctx.setHtml('sse-stream-box', `
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  • Sự kiện: <code>price-update</code> (Lần cập nhật #${data.count})
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">
                    Thời gian: ${data.time} | Kết nối duy trì: HTTP/1.1 Keep-Alive
                  </div>
                </div>
                <div style="font-size:1.6rem; font-weight:800; color:#38bdf8; font-family:var(--font-mono);">
                  $${data.price}
                </div>
              </div>
            `);
          } catch (err) {
            ctx.info("SSE data:", e.data);
          }
        });

        eventSourceInstance.onerror = (err) => {
          ctx.error("Lỗi SSE (hoặc server đóng kết nối):", err);
          if (eventSourceInstance.readyState === EventSource.CLOSED) {
            ctx.warn("SSE readyState: CLOSED");
          }
        };
      } catch (err) {
        ctx.error("Không thể mở EventSource:", err.message);
      }
    },

    closeSSE: (ctx) => {
      ctx.workflowStep("Đóng luồng SSE: eventSourceInstance.close()");
      if (eventSourceInstance) {
        eventSourceInstance.close();
        eventSourceInstance = null;
        ctx.info("Đã đóng kết nối SSE.");
        ctx.setHtml('sse-stream-box', 'Trạng thái: Kết nối SSE đã đóng.');
      } else {
        ctx.warn("Chưa có kết nối SSE nào đang mở.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
