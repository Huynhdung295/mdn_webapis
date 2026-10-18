// webapis/page_visibility/script.js - Page Visibility API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let tickCount = 0;
  let timerId = null;
  let audioCtx = null;
  let oscNode = null;

  const spec = {
    id: "page_visibility",
    panels: [
      {
        id: "panel-visibility-monitor",
        title: "1. Giám Sát Trạng Thái Tab Ẩn / Hiện (visibilitychange)",
        badge: "document.visibilityState",
        desc: "Thử chuyển sang tab khác trong trình duyệt hoặc thu nhỏ cửa sổ để chứng kiến trang tự động phát hiện và tạm dừng tác vụ nền.",
        actions: [
          { id: "btn-start-ticker", label: "Bắt Đầu Bộ Đếm Thời Gian Thực", variant: "primary", handler: "startTicker" },
          { id: "btn-toggle-tone", label: "Bật/Tắt Âm Thanh Test (Tự tắt khi ẩn tab)", variant: "secondary", handler: "toggleTone" }
        ],
        previewBox: {
          id: "visibility-status-box",
          initialText: "Trạng thái: Đang theo dõi..."
        }
      }
    ]
  };

  function updateDisplay(ctx) {
    const isVisible = document.visibilityState === 'visible';
    ctx.setHtml('visibility-status-box', `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          • Trạng thái trang: <strong style="color:${isVisible ? '#34d399' : '#f87171'}; font-size:1.1rem;">
            ${isVisible ? '🟢 VISIBLE (Người dùng đang xem)' : '🔴 HIDDEN (Tab đã bị ẩn / Thu nhỏ)'}
          </strong>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
            document.hidden: <code>${document.hidden}</code> | document.visibilityState: <code>"${document.visibilityState}"</code>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Số nhịp đếm:</div>
          <div style="font-size:1.6rem; font-weight:800; color:#38bdf8; font-family:var(--font-mono);">${tickCount}s</div>
        </div>
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Đăng ký sự kiện document.addEventListener('visibilitychange')");

      document.addEventListener('visibilitychange', () => {
        const state = document.visibilityState;
        if (state === 'hidden') {
          ctx.warn("Sự kiện visibilitychange: Tab đã bị ẩn (Người dùng chuyển tab hoặc thu nhỏ trình duyệt)");
          // Tự động tạm dừng âm thanh nếu đang phát
          if (oscNode && audioCtx && audioCtx.state === 'running') {
            audioCtx.suspend();
            ctx.info("[Auto-Save] Đã tự động suspend Web Audio để tiết kiệm pin/CPU");
          }
        } else {
          ctx.success("Sự kiện visibilitychange: Người dùng đã QUAY LẠI tab!");
          if (oscNode && audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
            ctx.info("[Auto-Resume] Đã tự động kích hoạt lại Web Audio");
          }
        }
        updateDisplay(ctx);
      });

      updateDisplay(ctx);
    },

    startTicker: (ctx) => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        ctx.warn("Đã dừng bộ đếm thời gian.");
        return;
      }

      ctx.workflowStep("Khởi động setInterval(1000ms)");
      timerId = setInterval(() => {
        tickCount++;
        updateDisplay(ctx);
      }, 1000);
      ctx.success("Bộ đếm thời gian đang chạy (Mở tab khác rồi quay lại để xem tiến trình).");
    },

    toggleTone: (ctx) => {
      if (oscNode) {
        oscNode.stop();
        oscNode.disconnect();
        oscNode = null;
        ctx.info("Đã tắt âm thanh thử nghiệm.");
        return;
      }

      ctx.workflowStep("Tạo âm thanh Web Audio dao động 440Hz (Nốt La)");
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        oscNode = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.05; // âm lượng nhỏ dịu tai
        oscNode.frequency.value = 440;
        oscNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscNode.start();
        ctx.success("Âm thanh đang phát. Thử CHUYỂN SANG TAB KHÁC -> âm thanh sẽ tự ngắt ngay lập tức!");
      } catch (err) {
        ctx.error("Lỗi âm thanh:", err);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
