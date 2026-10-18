// webapis/webtransport/script.js - WebTransport API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let transportInstance = null;

  const spec = {
    id: "webtransport",
    panels: [
      {
        id: "panel-webtransport-demo",
        title: "1. Giao Thức Mạng HTTP/3 (QUIC Streams & Datagrams)",
        badge: "new WebTransport()",
        desc: "Chuẩn mạng thế hệ tiếp theo dựa trên UDP/QUIC: loại bỏ hoàn toàn hiện tượng nghẽn đầu hàng (Head-of-Line Blocking) của TCP, hỗ trợ gửi gói tin siêu tốc không tin cậy (Datagrams) cho game và livestream.",
        inputs: [
          { id: "wt-url-input", label: "WebTransport Endpoint (HTTPS / HTTP/3):", type: "text", value: "https://transport.quic.ai:4433/echo", fullWidth: true }
        ],
        actions: [
          { id: "btn-connect-wt", label: "Kết Nối WebTransport (ready)", variant: "primary", handler: "connectTransport" },
          { id: "btn-send-datagram", label: "Bắn Gói Tin Datagram (UDP-like)", variant: "secondary", handler: "sendDatagram" },
          { id: "btn-close-wt", label: "Đóng Kết Nối (close)", variant: "danger", handler: "closeTransport" }
        ],
        previewBox: {
          id: "wt-status-box",
          initialText: "Đang kiểm tra tính năng WebTransport..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường WebTransport API khởi động");
      if (!('WebTransport' in window)) {
        ctx.warn("WebTransport không được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome 97+, Edge 97+, Firefox 114+).");
        ctx.setHtml('wt-status-box', '<span style="color:#f87171;">Trình duyệt chưa hỗ trợ WebTransport native.</span>');
      } else {
        ctx.success("WebTransport sẵn sàng!");
        ctx.setHtml('wt-status-box', '<span style="color:#34d399;">✔ Trình duyệt hỗ trợ WebTransport (HTTP/3 QUIC)!</span>');
      }
    },

    connectTransport: async (ctx) => {
      if (!('WebTransport' in window)) return;
      const url = ctx.getVal('wt-url-input');

      ctx.workflowStep(`Khởi tạo new WebTransport("${url}")`);
      ctx.setHtml('wt-status-box', '<span style="color:#fbbf24;">Đang bắt tay QUIC qua HTTP/3...</span>');

      try {
        transportInstance = new WebTransport(url);
        await transportInstance.ready;
        ctx.success("WebTransport: Kết nối HTTP/3 thành công (transport.ready)!");
        ctx.setHtml('wt-status-box', '<div style="color:#34d399; font-weight:700;">● WebTransport ĐÃ KẾT NỐI! Sẵn sàng bắn Datagrams hoặc mở Luồng Stream 2 chiều.</div>');
      } catch (err) {
        ctx.warn(`Kết nối tới ${url} thất bại (Server HTTP/3 không online hoặc chứng chỉ TLS không khớp): ${err.message}`);
        ctx.setHtml('wt-status-box', `<span style="color:#fbbf24;">Server test ngoại tuyến. Nhưng WebTransport API khả dụng 100%!</span>`);
      }
    },

    sendDatagram: async (ctx) => {
      if (!('WebTransport' in window)) return;
      ctx.workflowStep("Bắn gói tin Datagram không tin cậy: transport.datagrams.writable");

      if (!transportInstance) {
        ctx.warn("Mô phỏng: WebTransport Datagrams cho phép bắn dữ liệu nhị phân với độ trễ 5ms mà không cần ACK.");
        ctx.info("[Datagram Mock] Gói tin toạ độ game {x: 102.4, y: 55.1} đã bắn đi!");
        return;
      }

      try {
        const writer = transportInstance.datagrams.writable.getWriter();
        const data = new TextEncoder().encode("Hello QUIC Datagram!");
        await writer.write(data);
        writer.releaseLock();
        ctx.success("Đã bắn gói tin Datagram thành công!");
      } catch (err) {
        ctx.error("Lỗi gửi Datagram:", err.message);
      }
    },

    closeTransport: (ctx) => {
      ctx.workflowStep("Đóng kết nối WebTransport");
      if (transportInstance) {
        transportInstance.close();
        transportInstance = null;
        ctx.info("Đã đóng kết nối WebTransport.");
        ctx.setHtml('wt-status-box', 'Trạng thái: Kết nối đã đóng.');
      } else {
        ctx.warn("Không có kết nối nào đang mở.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
