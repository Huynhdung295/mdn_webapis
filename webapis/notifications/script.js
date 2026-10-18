// webapis/notifications/script.js - Notifications API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let activeNotification = null;

  const spec = {
    id: "notifications",
    panels: [
      {
        id: "panel-notification-sender",
        title: "1. Bắn Thông Báo Hệ Điều Hành (Desktop Push)",
        badge: "new Notification()",
        desc: "Xin quyền hệ thống và hiển thị thông báo ngoài màn hình desktop có âm thanh và gắn tag phân nhóm.",
        inputs: [
          { id: "notif-title", label: "Tiêu đề thông báo:", type: "text", value: "Tin nhắn mới từ MDN Demo" },
          { id: "notif-body", label: "Nội dung chi tiết:", type: "textarea", rows: 2, value: "Bạn vừa hoàn thành xuất sắc module Notifications API!" },
          { id: "notif-tag", label: "Tag phân nhóm (thay thế thông báo cũ cùng tag):", type: "text", value: "chat-messages" }
        ],
        actions: [
          { id: "btn-request-perm", label: "Xin Quyền Thông Báo (requestPermission)", variant: "primary", handler: "requestPermission" },
          { id: "btn-send-notif", label: "Gửi Thông Báo Ngay", variant: "secondary", handler: "sendNotification" },
          { id: "btn-close-notif", label: "Đóng Thông Báo Đang Mở", variant: "danger", handler: "closeNotification" }
        ],
        previewBox: {
          id: "notif-status-box",
          initialText: "Đang kiểm tra quyền thông báo..."
        }
      }
    ]
  };

  function updatePermStatus(ctx) {
    if (!('Notification' in window)) {
      ctx.setHtml('notif-status-box', '<span style="color:#f87171;">Trình duyệt này không hỗ trợ window.Notification.</span>');
      return;
    }

    const perm = Notification.permission;
    let color = '#fbbf24';
    let text = 'Default (Chưa hỏi quyền)';
    if (perm === 'granted') {
      color = '#34d399';
      text = 'Granted (Đã cho phép)';
    } else if (perm === 'denied') {
      color = '#f87171';
      text = 'Denied (Đã bị chặn)';
    }

    ctx.setHtml('notif-status-box', `
      <div>• Trạng thái quyền hiện tại (Notification.permission): <strong style="color:${color};">${text}</strong></div>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
        ${perm === 'granted' ? '✔ Bạn có thể bấm "Gửi Thông Báo Ngay" để xem popup nổi góc màn hình!' : '⚠ Hãy bấm "Xin Quyền Thông Báo" và chọn Cho phép (Allow) trên popup trình duyệt.'}
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Notifications API sẵn sàng");
      updatePermStatus(ctx);
    },

    requestPermission: async (ctx) => {
      ctx.workflowStep("Gọi Notification.requestPermission()");
      if (!('Notification' in window)) {
        ctx.error("Notification API không được hỗ trợ.");
        return;
      }

      try {
        const result = await Notification.requestPermission();
        ctx.info(`Người dùng phản hồi: ${result}`);
        if (result === 'granted') {
          ctx.success("Quyền thông báo đã được cấp thành công!");
        } else {
          ctx.warn(`Quyền thông báo: ${result}`);
        }
        updatePermStatus(ctx);
      } catch (err) {
        ctx.error("Lỗi khi xin quyền:", err);
      }
    },

    sendNotification: (ctx) => {
      if (!('Notification' in window)) {
        ctx.error("Notification API không được hỗ trợ.");
        return;
      }

      if (Notification.permission !== 'granted') {
        ctx.warn("Chưa được cấp quyền (Notification.permission !== 'granted'). Hãy bấm nút Xin Quyền trước!");
        return;
      }

      const title = ctx.getVal('notif-title');
      const body = ctx.getVal('notif-body');
      const tag = ctx.getVal('notif-tag');

      ctx.workflowStep(`Tạo new Notification("${title}", { body, tag: "${tag}" })`);

      try {
        activeNotification = new Notification(title, {
          body: body,
          tag: tag,
          renotify: true,
          requireInteraction: false
        });

        activeNotification.onshow = () => {
          ctx.event("Sự kiện notification.onshow (Thông báo đã hiện trên màn hình OS)");
        };

        activeNotification.onclick = () => {
          ctx.event("Sự kiện notification.onclick: Người dùng click vào thông báo!");
          window.focus();
        };

        activeNotification.onclose = () => {
          ctx.warn("Sự kiện notification.onclose: Thông báo đã bị đóng.");
          activeNotification = null;
        };

        activeNotification.onerror = (err) => {
          ctx.error("Lỗi notification.onerror:", err);
        };

        ctx.success("Đã gửi lệnh thông báo tới hệ điều hành thành công!");
      } catch (err) {
        ctx.error("Không thể tạo Notification:", err.message);
      }
    },

    closeNotification: (ctx) => {
      ctx.workflowStep("Gọi activeNotification.close()");
      if (activeNotification) {
        activeNotification.close();
        activeNotification = null;
        ctx.info("Đã đóng thông báo.");
      } else {
        ctx.warn("Không có thông báo nào đang mở.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
