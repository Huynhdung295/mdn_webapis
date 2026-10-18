// webapis/vibration/script.js - Vibration API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let hapticAudioCtx = null;

  const spec = {
    id: "vibration",
    panels: [
      {
        id: "panel-vibration-controls",
        title: "1. Kích Hoạt Rung Phản Hồi Xúc Giác (Haptic Feedback)",
        badge: "navigator.vibrate()",
        desc: "Thử nghiệm nhịp rung trên điện thoại hoặc trải nghiệm qua Bộ giả lập Rung + Âm thanh Sub-bass trên Desktop.",
        customHtml: `
          <div class="vibration-phone-wrap">
            <div id="vibrate-target" class="vibrate-box">
              <div style="font-size:2rem; margin-bottom:6px;">📳</div>
              <div style="font-size:0.75rem; color:#38bdf8; font-weight:700;">Haptic Motor</div>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-vibe-single", label: "Rung 1 Nhịp Ngắn (200ms)", variant: "primary", handler: "vibrateSingle" },
          { id: "btn-vibe-sos", label: "Rung Nhịp Mã Morse SOS (... --- ...)", variant: "secondary", handler: "vibrateSOS" },
          { id: "btn-vibe-stop", label: "Dừng Rung (vibrate(0))", variant: "danger", handler: "stopVibration" }
        ],
        previewBox: {
          id: "vibe-status-box",
          initialText: "Trạng thái: Thiết bị đang yên lặng."
        }
      }
    ]
  };

  function playHapticTick() {
    try {
      if (!hapticAudioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        hapticAudioCtx = new AudioClass();
      }
      const osc = hapticAudioCtx.createOscillator();
      const gain = hapticAudioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 80; // sub-bass 80Hz mô phỏng tiếng rung vật lý
      gain.gain.setValueAtTime(0.3, hapticAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, hapticAudioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(hapticAudioCtx.destination);
      osc.start();
      osc.stop(hapticAudioCtx.currentTime + 0.15);
    } catch (e) {}
  }

  function triggerShakeVisual(durationMs) {
    const box = document.getElementById('vibrate-target');
    if (!box) return;
    box.classList.add('vibrating');
    playHapticTick();
    setTimeout(() => {
      box.classList.remove('vibrating');
    }, durationMs);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Vibration API sẵn sàng");
      if (!('vibrate' in navigator)) {
        ctx.warn("navigator.vibrate không khả dụng trên trình duyệt này (hỗ trợ chủ yếu trên Android Chrome / di động). Trình giả lập hình ảnh & âm thanh sẽ hoạt động thay thế!");
      } else {
        ctx.success("navigator.vibrate được hỗ trợ!");
      }
    },

    vibrateSingle: (ctx) => {
      ctx.workflowStep("Gọi navigator.vibrate(200)");
      triggerShakeVisual(200);

      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }

      ctx.success("Đã kích hoạt rung 200ms!");
      ctx.setHtml('vibe-status-box', '<span style="color:#34d399;">● Đang rung 1 nhịp 200ms</span>');
    },

    vibrateSOS: (ctx) => {
      // Mã Morse SOS: 3 ngắn (100ms), nghỉ 100ms, 3 dài (300ms), nghỉ 100ms, 3 ngắn (100ms)
      const sosPattern = [100, 100, 100, 100, 100, 200, 300, 100, 300, 100, 300, 200, 100, 100, 100, 100, 100];

      ctx.workflowStep("Gọi navigator.vibrate([100, 100, 100...]) nhịp điệu SOS");
      triggerShakeVisual(1800);

      if ('vibrate' in navigator) {
        navigator.vibrate(sosPattern);
      }

      ctx.success("Đang phát chuỗi rung cảnh báo SOS!");
      ctx.setHtml('vibe-status-box', '<span style="color:#fbbf24;">● Đang phát nhịp rung Morse SOS (... --- ...)</span>');
    },

    stopVibration: (ctx) => {
      ctx.workflowStep("Gọi navigator.vibrate(0)");
      const box = document.getElementById('vibrate-target');
      if (box) box.classList.remove('vibrating');

      if ('vibrate' in navigator) {
        navigator.vibrate(0);
      }

      ctx.info("Đã dừng tất cả các nhịp rung.");
      ctx.setHtml('vibe-status-box', 'Trạng thái: Thiết bị đang yên lặng.');
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
