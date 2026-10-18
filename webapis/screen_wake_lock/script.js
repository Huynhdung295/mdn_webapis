// webapis/screen_wake_lock/script.js - Screen Wake Lock API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let wakeLockSentinel = null;

  const spec = {
    id: "screen_wake_lock",
    panels: [
      {
        id: "panel-wake-lock",
        title: "1. Giữ Màn Hình Luôn Sáng (Screen Wake Lock)",
        badge: "navigator.wakeLock.request('screen')",
        desc: "Ngăn màn hình máy tính / điện thoại tự động tắt hoặc rơi vào chế độ ngủ (sleep) khi người dùng đang theo dõi thông tin.",
        actions: [
          { id: "btn-acquire-lock", label: "Giữ Sáng Màn Hình (Acquire Lock)", variant: "primary", handler: "acquireLock" },
          { id: "btn-release-lock", label: "Giải Phóng Khoá (Release Lock)", variant: "danger", handler: "releaseLock" }
        ],
        previewBox: {
          id: "wake-lock-status-box",
          initialText: "Trạng thái: Màn hình ở chế độ tiết kiệm năng lượng bình thường."
        }
      }
    ]
  };

  function updateStatus(ctx) {
    const isLocked = wakeLockSentinel !== null && !wakeLockSentinel.released;
    ctx.setHtml('wake-lock-status-box', `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          • Trạng thái Wake Lock: <strong style="color:${isLocked ? '#34d399' : '#f87171'}; font-size:1.1rem;">
            ${isLocked ? '💡 ĐANG GIỮ MÀN HÌNH SÁNG' : '💤 BÌNH THƯỜNG (Tự tắt theo cài đặt OS)'}
          </strong>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
            ${isLocked ? 'Thiết bị sẽ không ngủ hoặc khoá màn hình cho tới khi bạn nhấn Giải Phóng Khoá hoặc chuyển tab.' : 'Không tốn pin thêm.'}
          </div>
        </div>
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Screen Wake Lock API sẵn sàng");
      if (!('wakeLock' in navigator)) {
        ctx.warn("navigator.wakeLock chưa được hỗ trợ trên trình duyệt này.");
      } else {
        ctx.success("navigator.wakeLock sẵn sàng hoạt động!");
      }
      updateStatus(ctx);

      // Khi chuyển tab, Wake Lock bị OS tự huỷ. Lắng nghe để cập nhật UI
      document.addEventListener('visibilitychange', () => {
        if (wakeLockSentinel !== null && document.visibilityState === 'visible') {
          // Có thể tự động xin lại khoá khi tab quay lại
          ctx.info("Tab quay lại hiển thị -> Tự động khôi phục Screen Wake Lock...");
          handlers.acquireLock(ctx);
        }
      });
    },

    acquireLock: async (ctx) => {
      ctx.workflowStep("Gọi navigator.wakeLock.request('screen')");
      if (!('wakeLock' in navigator)) {
        ctx.error("Trình duyệt không hỗ trợ Wake Lock API.");
        return;
      }

      try {
        wakeLockSentinel = await navigator.wakeLock.request('screen');
        ctx.success("Đã kích hoạt Screen Wake Lock thành công!");

        wakeLockSentinel.addEventListener('release', () => {
          ctx.warn("Wake Lock đã bị giải phóng (Sentinel released).");
          updateStatus(ctx);
        });

        updateStatus(ctx);
      } catch (err) {
        ctx.error("Lỗi khi xin Wake Lock:", err.message);
      }
    },

    releaseLock: async (ctx) => {
      ctx.workflowStep("Gọi wakeLockSentinel.release()");
      if (wakeLockSentinel) {
        await wakeLockSentinel.release();
        wakeLockSentinel = null;
        ctx.info("Đã giải phóng khoá màn hình.");
        updateStatus(ctx);
      } else {
        ctx.warn("Chưa có khoá màn hình nào đang hoạt động.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
