// webapis/web_share/script.js - Web Share API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "web_share",
    panels: [
      {
        id: "panel-share-controls",
        title: "1. Kích Hoạt Hộp Thoại Chia Sẻ Gốc Hệ Điều Hành (Native Share Sheet)",
        badge: "navigator.share()",
        desc: "Mở menu chia sẻ gốc của hệ điều hành (Zalo, Messenger, AirDrop, Telegram, Email...) kèm liên kết và tệp đính kèm.",
        inputs: [
          { id: "share-title", label: "Tiêu đề bài viết (Title):", type: "text", value: "MDN Web APIs Interactive Lab" },
          { id: "share-text", label: "Nội dung mô tả (Text):", type: "text", value: "Khám phá phòng thí nghiệm thực hành toàn diện các Web APIs hiện đại!" },
          { id: "share-url", label: "Đường dẫn liên kết (URL):", type: "text", value: window.location.href, fullWidth: true }
        ],
        actions: [
          { id: "btn-share-native", label: "Mở Menu Chia Sẻ Hệ Thống (navigator.share)", variant: "primary", handler: "triggerShare" },
          { id: "btn-check-canshare", label: "Kiểm Tra Hỗ Trợ (navigator.canShare)", variant: "secondary", handler: "checkCanShare" }
        ],
        previewBox: {
          id: "share-status-box",
          initialText: "Đang kiểm tra tính năng Web Share..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Share API sẵn sàng");
      if (!('share' in navigator)) {
        ctx.warn("navigator.share không khả dụng trên trình duyệt này (Hỗ trợ tốt nhất trên điện thoại iOS/Android và Safari macOS/Edge Windows).");
        ctx.setHtml('share-status-box', '<span style="color:#fbbf24;">navigator.share không hỗ trợ trên trình duyệt này. Hệ thống sẽ fallback sang sao chép liên kết vào Clipboard khi nhấn chia sẻ.</span>');
      } else {
        ctx.success("navigator.share khả dụng!");
        ctx.setHtml('share-status-box', '<span style="color:#34d399;">✔ Trình duyệt hỗ trợ hộp thoại chia sẻ gốc của hệ điều hành!</span>');
      }
    },

    triggerShare: async (ctx) => {
      const shareData = {
        title: ctx.getVal('share-title'),
        text: ctx.getVal('share-text'),
        url: ctx.getVal('share-url')
      };

      ctx.workflowStep(`Yêu cầu chia sẻ: "${shareData.title}"`);

      if (!navigator.share) {
        ctx.warn("Fallback: Sao chép link vào Clipboard...");
        try {
          await navigator.clipboard.writeText(shareData.url);
          ctx.success("Đã sao chép liên kết vào Clipboard để bạn tự gửi thủ công!");
          ctx.setHtml('share-status-box', '<span style="color:#34d399;">✔ Đã chép link vào bộ nhớ tạm!</span>');
        } catch (e) {
          ctx.error("Không thể chép link:", e);
        }
        return;
      }

      try {
        await navigator.share(shareData);
        ctx.success("Người dùng đã hoàn tất chia sẻ nội dung thành công!");
      } catch (err) {
        if (err.name === 'AbortError') {
          ctx.warn("Người dùng đã đóng hộp thoại chia sẻ (AbortError).");
        } else {
          ctx.error("Lỗi chia sẻ:", err.message);
        }
      }
    },

    checkCanShare: (ctx) => {
      const shareData = {
        title: ctx.getVal('share-title'),
        text: ctx.getVal('share-text'),
        url: ctx.getVal('share-url')
      };

      ctx.workflowStep("Gọi navigator.canShare(shareData)");
      if (!navigator.canShare) {
        ctx.warn("navigator.canShare không khả dụng.");
        return;
      }

      const ok = navigator.canShare(shareData);
      if (ok) {
        ctx.success("navigator.canShare: Dữ liệu này HỢP LỆ và có thể chia sẻ!");
      } else {
        ctx.warn("navigator.canShare: Hệ điều hành không hỗ trợ chia sẻ định dạng dữ liệu này.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
