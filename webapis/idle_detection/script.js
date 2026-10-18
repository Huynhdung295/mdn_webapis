// webapis/idle_detection/script.js - Idle Detection API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentDetector = null;
  let abortController = null;

  const spec = {
    id: "idle_detection",
    panels: [
      {
        id: "panel-idle-monitor",
        title: "1. Giám Sát Trạng Thái Rảnh Rỗi & Khoá Màn Hình",
        badge: "new IdleDetector()",
        desc: "API yêu cầu quyền thông báo người dùng và ngưỡng thời gian tối thiểu 60.000ms (1 phút). Có sẵn bộ giả lập để kiểm thử tức thì.",
        inputs: [
          { id: "idle-threshold", label: "Ngưỡng thời gian rảnh rỗi (mili-giây, tối thiểu 60000ms):", type: "text", value: "60000" }
        ],
        actions: [
          { id: "btn-start-idle", label: "Xin Quyền & Bắt Đầu Giám Sát", variant: "primary", handler: "startIdleDetector" },
          { id: "btn-stop-idle", label: "Dừng Giám Sát", variant: "danger", handler: "stopIdleDetector" },
          { id: "btn-simulate-idle", label: "Giả Lập Người Dùng Vắng Mặt (Simulate Idle)", variant: "secondary", handler: "simulateIdle" }
        ],
        previewBox: {
          id: "idle-status-box",
          initialText: "Trạng thái: Chưa khởi động IdleDetector."
        }
      }
    ]
  };

  function renderStatus(ctx, userState, screenState) {
    const isUserActive = userState === 'active';
    const isScreenUnlocked = screenState === 'unlocked';

    ctx.setHtml('idle-status-box', `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
        <div style="padding:10px; background:rgba(0,0,0,0.3); border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Trạng thái tương tác (userState):</div>
          <div style="font-size:1.1rem; font-weight:700; color:${isUserActive ? '#34d399' : '#f87171'};">
            ${isUserActive ? '🟢 ACTIVE (Đang thao tác)' : '🔴 IDLE (Vắng mặt / Không chạm chuột)'}
          </div>
        </div>
        <div style="padding:10px; background:rgba(0,0,0,0.3); border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Trạng thái màn hình (screenState):</div>
          <div style="font-size:1.1rem; font-weight:700; color:${isScreenUnlocked ? '#38bdf8' : '#fbbf24'};">
            ${isScreenUnlocked ? '🔓 UNLOCKED (Mở khoá)' : '🔒 LOCKED (Đã khoá màn hình)'}
          </div>
        </div>
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Idle Detection API sẵn sàng");
    },

    startIdleDetector: async (ctx) => {
      ctx.workflowStep("Kiểm tra và xin cấp quyền: IdleDetector.requestPermission()");

      if (!('IdleDetector' in window)) {
        ctx.warn("Trình duyệt này chưa hỗ trợ IdleDetector native (hỗ trợ tốt nhất trên Chrome/Edge). Bạn có thể bấm nút Giả Lập để thử nghiệm luồng xử lý.");
        return;
      }

      try {
        const state = await IdleDetector.requestPermission();
        ctx.info(`Trạng thái cấp quyền: ${state}`);

        if (state !== 'granted') {
          ctx.error("Người dùng đã từ chối quyền Idle Detection.");
          return;
        }

        abortController = new AbortController();
        currentDetector = new IdleDetector();

        currentDetector.addEventListener('change', () => {
          ctx.event("IdleDetector state change:", {
            userState: currentDetector.userState,
            screenState: currentDetector.screenState
          });
          renderStatus(ctx, currentDetector.userState, currentDetector.screenState);
        });

        const threshold = parseInt(ctx.getVal('idle-threshold'), 10) || 60000;
        await currentDetector.start({
          threshold: Math.max(60000, threshold),
          signal: abortController.signal
        });

        ctx.success("IdleDetector đã kích hoạt thành công!");
        renderStatus(ctx, currentDetector.userState, currentDetector.screenState);
      } catch (err) {
        ctx.error("Lỗi khi khởi động IdleDetector:", err.message);
      }
    },

    stopIdleDetector: (ctx) => {
      ctx.workflowStep("Dừng giám sát IdleDetector");
      if (abortController) {
        abortController.abort();
        abortController = null;
        currentDetector = null;
        ctx.success("Đã dừng IdleDetector.");
        ctx.setHtml('idle-status-box', 'Trạng thái: Đã dừng giám sát.');
      } else {
        ctx.warn("Không có IdleDetector nào đang chạy.");
      }
    },

    simulateIdle: (ctx) => {
      ctx.workflowStep("Mô phỏng sự kiện chuyển đổi trạng thái Idle");
      let isIdle = false;

      ctx.info("Bắt đầu kịch bản mô phỏng: Sau 2 giây chuyển sang IDLE, sau 5 giây quay lại ACTIVE...");
      renderStatus(ctx, 'active', 'unlocked');

      setTimeout(() => {
        isIdle = true;
        ctx.warn("[Simulator] Người dùng đã ngừng thao tác > 1 phút -> userState: 'idle'");
        renderStatus(ctx, 'idle', 'unlocked');
      }, 2000);

      setTimeout(() => {
        ctx.warn("[Simulator] Thiết bị tự khoá màn hình sau 5 phút -> screenState: 'locked'");
        renderStatus(ctx, 'idle', 'locked');
      }, 4000);

      setTimeout(() => {
        isIdle = false;
        ctx.success("[Simulator] Người dùng gõ phím trở lại -> userState: 'active', screenState: 'unlocked'");
        renderStatus(ctx, 'active', 'unlocked');
      }, 6500);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
