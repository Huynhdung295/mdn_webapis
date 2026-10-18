// webapis/websockets/script.js - WebSockets API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let wsInstance = null;

  const spec = {
    id: "websockets",
    panels: [
      {
        id: "panel-ws-client",
        title: "1. Kết Nối Kênh Song Công Hai Chiều (Full-Duplex TCP)",
        badge: "new WebSocket()",
        desc: "Mở socket TCP liên tục truyền nhận tin nhắn 2 chiều thời gian thực với độ trễ tối thiểu.",
        inputs: [
          { id: "ws-server-url", label: "WebSocket Server URL:", type: "text", value: "wss://echo.websocket.org", fullWidth: true },
          { id: "ws-message-body", label: "Tin nhắn gửi đi:", type: "text", value: '{"action": "ping", "client": "MDN Lab", "time": "now"}' }
        ],
        actions: [
          { id: "btn-connect-ws", label: "Kết Nối WebSocket", variant: "primary", handler: "connectWebSocket" },
          { id: "btn-send-ws", label: "Gửi Tin Nhắn (ws.send)", variant: "secondary", handler: "sendMessage" },
          { id: "btn-disconnect-ws", label: "Ngắt Kết Nối (close)", variant: "danger", handler: "closeWebSocket" }
        ],
        previewBox: {
          id: "ws-status-box",
          initialText: "Chưa kết nối WebSocket."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường WebSockets API sẵn sàng");
    },

    connectWebSocket: (ctx) => {
      if (wsInstance && wsInstance.readyState === WebSocket.OPEN) {
        ctx.warn("Đang có kết nối WebSocket mở rồi.");
        return;
      }

      const url = ctx.getVal('ws-server-url');
      ctx.workflowStep(`Khởi tạo new WebSocket("${url}")`);

      try {
        wsInstance = new WebSocket(url);

        wsInstance.onopen = () => {
          ctx.success("WebSocket: Kết nối thành công (onopen)!");
          ctx.setHtml('ws-status-box', '<div style="color:#34d399; font-weight:700;">● WebSocket ĐÃ KẾT NỐI (OPEN)! Có thể gửi/nhận tin nhắn liên tục.</div>');
        };

        wsInstance.onmessage = (e) => {
          ctx.event("WebSocket onmessage nhận phản hồi từ server:", e.data);
          ctx.setHtml('ws-status-box', `
            <div style="color:#34d399; font-weight:700;">✔ Nhận tin nhắn từ Server:</div>
            <div style="font-family:var(--font-mono); font-size:0.8rem; color:#38bdf8; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-top:4px;">
              ${ctx.escapeHtml(e.data)}
            </div>
          `);
        };

        wsInstance.onerror = (err) => {
          ctx.error("Lỗi WebSocket:", err);
        };

        wsInstance.onclose = (e) => {
          ctx.warn(`WebSocket đã đóng (Code: ${e.code}, Reason: ${e.reason || 'None'})`);
          ctx.setHtml('ws-status-box', 'Trạng thái: Kết nối WebSocket đã đóng.');
        };
      } catch (err) {
        ctx.error("Không thể mở WebSocket:", err.message);
      }
    },

    sendMessage: (ctx) => {
      const msg = ctx.getVal('ws-message-body');
      if (!wsInstance || wsInstance.readyState !== WebSocket.OPEN) {
        ctx.warn("WebSocket chưa kết nối. Bấm 'Kết Nối WebSocket' trước.");
        return;
      }

      ctx.workflowStep(`ws.send("${msg}")`);
      wsInstance.send(msg);
      ctx.info(`[Gửi Đi] "${msg}"`);
    },

    closeWebSocket: (ctx) => {
      ctx.workflowStep("Gọi wsInstance.close(1000, 'Normal Closure')");
      if (wsInstance) {
        wsInstance.close(1000, "Đóng chủ động");
        wsInstance = null;
      } else {
        ctx.warn("Không có kết nối nào đang mở.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
