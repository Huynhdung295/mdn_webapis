// webapis/web_animations/script.js - Web Animations API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentAnimation = null;

  const spec = {
    id: "web_animations",
    panels: [
      {
        id: "panel-waa-controls",
        title: "1. Điều Khiển Hoạt Hoạ Nâng Cao (Animation Controls)",
        badge: "element.animate()",
        desc: "Sức mạnh kết hợp giữa tăng tốc phần cứng GPU và khả năng kiểm soát playback (play, pause, reverse, tua tốc độ) linh hoạt bằng JavaScript.",
        customHtml: `
          <div class="orb-stage">
            <div id="glow-orb" class="animated-orb"></div>
          </div>
        `,
        actions: [
          { id: "btn-anim-play", label: "Phát (play())", variant: "primary", handler: "playAnim" },
          { id: "btn-anim-pause", label: "Tạm Dừng (pause())", variant: "secondary", handler: "pauseAnim" },
          { id: "btn-anim-reverse", label: "Đảo Chiều (reverse())", variant: "secondary", handler: "reverseAnim" },
          { id: "btn-speed-slow", label: "Tốc Độ 0.3x (Slow-Mo)", variant: "secondary", handler: "slowSpeed" },
          { id: "btn-speed-fast", label: "Tốc Độ 2.5x (Fast)", variant: "secondary", handler: "fastSpeed" }
        ],
        previewBox: {
          id: "waa-status-box",
          initialText: "Đang khởi tạo Animation..."
        }
      }
    ]
  };

  function updateStatus(ctx) {
    if (!currentAnimation) return;
    const rate = currentAnimation.playbackRate;
    const state = currentAnimation.playState;

    ctx.setHtml('waa-status-box', `
      <div>• Trạng thái (playState): <strong style="color:#38bdf8; text-transform:uppercase;">${state}</strong></div>
      <div>• Tốc độ phát (playbackRate): <strong>${rate}x</strong></div>
      <div>• Thời gian hiện tại (currentTime): <code>${Math.round(currentAnimation.currentTime || 0)}ms</code></div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Animations API khởi động: Tạo element.animate()");

      const orb = document.getElementById('glow-orb');
      if (!orb || !orb.animate) {
        ctx.error("Trình duyệt không hỗ trợ element.animate().");
        return;
      }

      currentAnimation = orb.animate([
        { transform: 'scale(1) translateX(-140px)', background: '#38bdf8' },
        { transform: 'scale(1.4) translateY(-30px)', background: '#a78bfa' },
        { transform: 'scale(1) translateX(140px)', background: '#34d399' },
        { transform: 'scale(0.8) translateY(30px)', background: '#fbbf24' },
        { transform: 'scale(1) translateX(-140px)', background: '#38bdf8' }
      ], {
        duration: 3000,
        iterations: Infinity,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      ctx.success("Animation đã tạo thành công!");
      updateStatus(ctx);
    },

    playAnim: (ctx) => {
      if (!currentAnimation) return;
      ctx.workflowStep("currentAnimation.play()");
      currentAnimation.play();
      ctx.success("Animation đang phát.");
      updateStatus(ctx);
    },

    pauseAnim: (ctx) => {
      if (!currentAnimation) return;
      ctx.workflowStep("currentAnimation.pause()");
      currentAnimation.pause();
      ctx.warn("Animation đã tạm dừng.");
      updateStatus(ctx);
    },

    reverseAnim: (ctx) => {
      if (!currentAnimation) return;
      ctx.workflowStep("currentAnimation.reverse()");
      currentAnimation.reverse();
      ctx.info("Animation đang quay ngược chiều.");
      updateStatus(ctx);
    },

    slowSpeed: (ctx) => {
      if (!currentAnimation) return;
      ctx.workflowStep("Gán currentAnimation.playbackRate = 0.3");
      currentAnimation.playbackRate = 0.3;
      ctx.info("Đã chuyển sang chế độ chuyển động chậm (Slow-motion 0.3x).");
      updateStatus(ctx);
    },

    fastSpeed: (ctx) => {
      if (!currentAnimation) return;
      ctx.workflowStep("Gán currentAnimation.playbackRate = 2.5");
      currentAnimation.playbackRate = 2.5;
      ctx.info("Đã tăng tốc độ phát lên 2.5x.");
      updateStatus(ctx);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
