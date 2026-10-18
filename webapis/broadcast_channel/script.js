// webapis/broadcast_channel/script.js - Broadcast Channel API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let channelA = null;
  let simulatedTabChannel = null;

  const broadcastSpec = {
    id: "broadcast_channel",
    name: "Broadcast Channel API",
    group: "B",
    category: "Communication",
    status: "Standard",
    support: { chrome: "54+", edge: "79+", firefox: "38+", safari: "15.4+" },
    supportCheck: () => 'BroadcastChannel' in window,
    why: "Cho phép các tab, cửa sổ, iframe và Web Worker cùng domain giao tiếp tức thì 1-nhiều (Pub/Sub) mà không cần máy chủ WebSocket hay hack qua localStorage.",
    whenToUse: "Đồng bộ đăng xuất tài khoản giữa mọi tab; cập nhật giỏ hàng theo thời gian thực; chia sẻ theme sáng/tối hoặc đồng bộ âm thanh giữa các cửa sổ.",
    whenNotToUse: "Giao tiếp khác domain (cross-origin - bắt buộc dùng postMessage), hoặc lưu trữ dữ liệu bền vững.",
    coreItems: [
      "new BroadcastChannel(channelName)",
      "channel.postMessage(data) (Hỗ trợ Structured Clone: Object, Array, Blob, Date)",
      "channel.onmessage = (event) => ...",
      "channel.close()"
    ],
    panels: [
      {
        id: "panel-channel-control",
        title: "1. Kênh Chính (Tab Hiện Tại - Channel A)",
        badge: "BroadcastChannel.postMessage",
        desc: "Mở kênh liên lạc và phát tin nhắn cho tất cả các tab khác cùng đang lắng nghe.",
        inputs: [
          { id: "channel-name", label: "Tên Kênh (Channel Name):", type: "text", value: "system_notifications" },
          { id: "channel-msg-input", label: "Nội Dung Tin Nhắn Cần Phát:", type: "text", value: "User_Logged_In: Nguyễn Văn A", fullWidth: true }
        ],
        actions: [
          { id: "btn-open-channel", label: "Mở Kênh (new BroadcastChannel)", variant: "primary", handler: "openChannel" },
          { id: "btn-send-message", label: "Phát Tin Nhắn (postMessage)", variant: "secondary", handler: "sendMessage" },
          { id: "btn-close-channel", label: "Đóng Kênh (close)", variant: "danger", handler: "closeChannel" }
        ],
        previewBox: {
          id: "channel-status-box",
          initialText: "Trạng thái: Kênh chưa mở."
        }
      },
      {
        id: "panel-simulated-tab",
        title: "2. Tab Ảo Giả Lập (Simulated Tab B Trong Bộ Nhớ)",
        badge: "Khách lắng nghe độc lập",
        desc: "Kênh độc lập thứ hai giả lập một tab khác đang mở để bạn thấy dữ liệu truyền tức thời mà không cần mở tab trình duyệt mới.",
        inputs: [
          { id: "tab-b-response-text", label: "Nội dung Tab B phản hồi lại:", type: "text", value: "Tab B: Đã nhận được tin!", fullWidth: true }
        ],
        actions: [
          { id: "btn-init-tab-b", label: "Khởi Chạy Tab B Lắng Nghe", variant: "secondary", handler: "initTabB" },
          { id: "btn-tab-b-reply", label: "Tab B Phát Tin Nhắn Đáp Lại", variant: "primary", handler: "tabBReply" }
        ],
        previewBox: {
          id: "tab-b-inbox",
          initialText: "Hộp thư đến của Tab B: Chưa nhận tin nào."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Broadcast Channel sẵn sàng");
      handlers.openChannel(ctx);
      handlers.initTabB(ctx);
    },

    openChannel: (ctx) => {
      const name = ctx.getVal('channel-name') || 'system_notifications';
      ctx.workflowStep(`Khởi tạo channelA = new BroadcastChannel("${name}")`);

      if (typeof BroadcastChannel === 'undefined') {
        ctx.warn("Trình duyệt không hỗ trợ BroadcastChannel API.");
        return;
      }

      if (channelA) {
        channelA.close();
      }

      channelA = new BroadcastChannel(name);
      channelA.onmessage = (event) => {
        ctx.event(`Nhận được tin nhắn trên Kênh "${name}"`, event.data);
      };

      channelA.onmessageerror = (event) => {
        ctx.error("Lỗi giải mã tin nhắn trên BroadcastChannel:", event);
      };

      ctx.success(`Đã mở kênh BroadcastChannel: "${name}" thành công!`);
      ctx.setHtml('channel-status-box', `<div>Kênh: <strong style="color:#34d399;">"${name}"</strong> | Trạng thái: <strong style="color:#38bdf8;">Đang mở & Lắng nghe</strong></div>`);
    },

    sendMessage: (ctx) => {
      if (!channelA) {
        ctx.warn("Hãy bấm 'Mở Kênh' trước khi gửi tin.");
        return;
      }

      const msg = ctx.getVal('channel-msg-input');
      const payload = {
        text: msg,
        timestamp: Date.now(),
        sender: "Tab Chính (Tab A)"
      };

      ctx.workflowStep(`Gọi channelA.postMessage()`, payload);
      try {
        channelA.postMessage(payload);
        ctx.success(`Đã phát tin nhắn vào kênh: "${msg}"`);
      } catch (err) {
        ctx.error("Lỗi khi gọi postMessage:", err);
      }
    },

    closeChannel: (ctx) => {
      if (channelA) {
        const name = channelA.name;
        ctx.workflowStep(`Gọi channelA.close()`);
        channelA.close();
        channelA = null;
        ctx.warn(`Đã đóng kênh "${name}". Kênh sẽ ngừng nhận và gửi tin nhắn.`);
        ctx.setHtml('channel-status-box', `<div>Trạng thái: <strong style="color:#f87171;">Đã đóng (Closed)</strong></div>`);
      }
    },

    initTabB: (ctx) => {
      const name = ctx.getVal('channel-name') || 'system_notifications';
      ctx.workflowStep(`Khởi tạo Tab B ảo: simulatedTabChannel = new BroadcastChannel("${name}")`);

      if (typeof BroadcastChannel === 'undefined') {
        ctx.warn("Trình duyệt không hỗ trợ BroadcastChannel API.");
        return;
      }

      if (simulatedTabChannel) simulatedTabChannel.close();

      simulatedTabChannel = new BroadcastChannel(name);
      simulatedTabChannel.onmessage = (event) => {
        const data = event.data;
        ctx.log(`[Tab B Ảo Nhận Tin] Từ: ${data.sender || 'Không rõ'} - Nội dung: "${data.text}"`, 'info');
        ctx.setHtml('tab-b-inbox', `
          <div style="color:#34d399;font-weight:600;">✔ Tin mới nhất lúc ${new Date(data.timestamp).toLocaleTimeString()}:</div>
          <div style="margin-top:2px;font-size:0.85rem;">"${data.text}"</div>
        `);
      };

      ctx.success(`Tab B ảo đã sẵn sàng trên kênh "${name}"!`);
    },

    tabBReply: (ctx) => {
      if (!simulatedTabChannel) {
        ctx.warn("Khởi chạy Tab B trước.");
        return;
      }

      const replyText = ctx.getVal('tab-b-response-text');
      const payload = {
        text: replyText,
        timestamp: Date.now(),
        sender: "Tab B Ảo"
      };

      ctx.workflowStep("Tab B ảo gọi postMessage() đáp lại", payload);
      simulatedTabChannel.postMessage(payload);
      ctx.success("Tab B đã phát tin nhắn phản hồi vào kênh!");
    }
  };

  WebAPICore.renderApp(broadcastSpec, handlers);
})();
