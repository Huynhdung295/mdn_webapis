// webapis/channel_messaging/script.js - Channel Messaging API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let channel = null;

  const channelSpec = {
    id: "channel_messaging",
    name: "Channel Messaging API",
    group: "C",
    category: "Communication",
    status: "Standard",
    support: { chrome: "Yes", edge: "Yes", firefox: "Yes", safari: "Yes" },
    supportCheck: () => 'MessageChannel' in window,
    why: "Tạo một đường ống giao tiếp 2 chiều trực tiếp (Direct MessagePort) giữa 2 ngữ cảnh độc lập (iframe <-> iframe, hoặc iframe <-> Worker) mà không cần phải đi qua cửa sổ trang cha làm cầu nối trung gian, bảo mật tuyệt đối.",
    whenToUse: "Tích hợp iframe nhúng bên thứ 3 (cổng thanh toán VNPay/Stripe, chat widget, plugin nhúng) cần một kênh giao tiếp an toàn, độc lập hoàn toàn với trang chính.",
    whenNotToUse: "Giao tiếp trong cùng một file script đơn giản (hãy dùng gọi hàm trực tiếp hoặc EventTarget).",
    coreItems: [
      "new MessageChannel()",
      "channel.port1, channel.port2",
      "port.postMessage(message, [transferList])",
      "port.onmessage = (event) => ...",
      "port.close()"
    ],
    panels: [
      {
        id: "panel-direct-channel",
        title: "1. Kênh Hai Chiều: Cổng 1 (Port 1) &lt;---&gt; Cổng 2 (Port 2)",
        badge: "MessageChannel / MessagePort",
        desc: "Khởi tạo 2 cổng liên lạc. Bất kỳ dữ liệu nào gửi vào Port 1 sẽ lập tức xuất hiện ở Port 2 và ngược lại.",
        inputs: [
          { id: "msg-from-port1", label: "Tin nhắn gửi từ Port 1 sang Port 2:", type: "text", value: "Xin chào từ Port 1!", fullWidth: true },
          { id: "msg-from-port2", label: "Tin nhắn gửi từ Port 2 đáp lại Port 1:", type: "text", value: "Đã nhận tin, xin chào lại từ Port 2!", fullWidth: true }
        ],
        actions: [
          { id: "btn-init-channel", label: "Khởi Tạo new MessageChannel()", variant: "primary", handler: "initChannel" },
          { id: "btn-send-port1", label: "Gửi Từ Port 1 -> Port 2", variant: "secondary", handler: "sendFromPort1" },
          { id: "btn-send-port2", label: "Gửi Từ Port 2 -> Port 1", variant: "secondary", handler: "sendFromPort2" },
          { id: "btn-close-ports", label: "Đóng Kênh (port.close())", variant: "danger", handler: "closePorts" }
        ],
        previewBox: {
          id: "channel-traffic-box",
          initialText: "Trạng thái: Kênh chưa khởi tạo."
        }
      },
      {
        id: "panel-transfer-iframe",
        title: "2. Chuyển Giao Cổng Sang Iframe Nhúng (Transferable Objects)",
        badge: "window.postMessage(..., [port2])",
        desc: "Gửi hẳn quyền sở hữu của Port 2 vào một iframe con bằng mảng Transferable List. Sau đó Trang chính và Iframe giao tiếp trực tiếp qua cổng đó.",
        actions: [
          { id: "btn-create-sub-iframe", label: "Tạo Iframe Con & Bàn Giao Port 2", variant: "primary", handler: "createIframeAndTransfer" },
          { id: "btn-ping-iframe", label: "Ping Tin Nhắn Trực Tiếp Vào Iframe", variant: "secondary", handler: "pingIframe" }
        ],
        customHtml: `
          <div style="margin-top:10px;">
            <iframe id="child-iframe" style="width:100%;height:100px;background:#0d1527;border:1px dashed rgba(255,255,255,0.15);border-radius:6px;" srcdoc="<html><body style='font-family:sans-serif;color:#94a3b8;padding:12px;font-size:12px;'>Iframe con đang chờ nhận MessagePort...</body></html>"></iframe>
          </div>
        `
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Channel Messaging sẵn sàng");
      handlers.initChannel(ctx);
    },

    initChannel: (ctx) => {
      if (typeof MessageChannel === 'undefined') {
        ctx.warn("Trình duyệt không hỗ trợ MessageChannel.");
        return;
      }

      ctx.workflowStep("Khởi tạo channel = new MessageChannel()");
      if (channel) {
        channel.port1.close();
        channel.port2.close();
      }

      channel = new MessageChannel();

      channel.port1.onmessage = (event) => {
        ctx.event("Port 1 nhận được tin từ Port 2", event.data);
        ctx.setHtml('channel-traffic-box', `<div>[Port 1] Nhận tin: <strong style="color:#38bdf8;">"${event.data.text}"</strong> (lúc ${new Date(event.data.time).toLocaleTimeString()})</div>`);
      };

      channel.port2.onmessage = (event) => {
        ctx.event("Port 2 nhận được tin từ Port 1", event.data);
        ctx.setHtml('channel-traffic-box', `<div>[Port 2] Nhận tin: <strong style="color:#34d399;">"${event.data.text}"</strong> (lúc ${new Date(event.data.time).toLocaleTimeString()})</div>`);
      };

      ctx.success("Đã mở thành công MessageChannel (port1 & port2 đã liên kết trực tiếp)!");
      ctx.setHtml('channel-traffic-box', "Kênh đang hoạt động. Sẵn sàng truyền nhận dữ liệu.");
    },

    sendFromPort1: (ctx) => {
      if (!channel) { ctx.warn("Hãy khởi tạo kênh trước."); return; }
      const text = ctx.getVal('msg-from-port1');
      const payload = { text, time: Date.now(), from: "Port 1" };

      ctx.workflowStep("Gọi channel.port1.postMessage(payload)", payload);
      channel.port1.postMessage(payload);
    },

    sendFromPort2: (ctx) => {
      if (!channel) { ctx.warn("Hãy khởi tạo kênh trước."); return; }
      const text = ctx.getVal('msg-from-port2');
      const payload = { text, time: Date.now(), from: "Port 2" };

      ctx.workflowStep("Gọi channel.port2.postMessage(payload)", payload);
      channel.port2.postMessage(payload);
    },

    closePorts: (ctx) => {
      if (channel) {
        ctx.workflowStep("Gọi channel.port1.close() và channel.port2.close()");
        channel.port1.close();
        channel.port2.close();
        channel = null;
        ctx.warn("Đã đóng hoàn toàn cả 2 cổng. Không thể truyền nhận tin nữa.");
        ctx.setHtml('channel-traffic-box', "Kênh đã đóng.");
      }
    },

    createIframeAndTransfer: (ctx) => {
      if (typeof MessageChannel === 'undefined') {
        ctx.warn("Trình duyệt không hỗ trợ MessageChannel.");
        return;
      }
      const iframe = ctx.getEl('child-iframe');
      if (!iframe) return;

      const iframeChannel = new MessageChannel();
      ctx.workflowStep("Tạo MessageChannel mới và chuyển giao port2 vào Iframe...");

      // Lắng nghe ở Port 1 phía trang chính
      iframeChannel.port1.onmessage = (event) => {
        ctx.event("Trang chính nhận tin từ bên trong Iframe", event.data);
      };

      // Gửi Port 2 vào iframe qua window.postMessage với transfer list
      setTimeout(() => {
        iframe.contentWindow.postMessage('INIT_PORT', '*', [iframeChannel.port2]);
        ctx.success("Đã chuyển giao Port 2 vào trong Iframe qua postMessage(..., [port2])!");
      }, 300);

      window.iframePort = iframeChannel.port1;
    },

    pingIframe: (ctx) => {
      if (!window.iframePort) {
        ctx.warn("Hãy bấm 'Tạo Iframe Con & Bàn Giao Port 2' trước.");
        return;
      }

      ctx.workflowStep("Gửi tin nhắn trực tiếp qua window.iframePort.postMessage()");
      window.iframePort.postMessage({ type: "PING", text: "Xin chào từ trang cha!", time: Date.now() });
      ctx.success("Đã bắn tin nhắn trực tiếp vào Iframe qua MessagePort!");
    }
  };

  WebAPICore.renderApp(channelSpec, handlers);
})();
