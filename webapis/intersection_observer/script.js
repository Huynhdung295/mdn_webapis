// webapis/intersection_observer/script.js - Intersection Observer API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let observerInstance = null;

  const spec = {
    id: "intersection_observer",
    panels: [
      {
        id: "panel-intersection-sandbox",
        title: "1. Giám Sát Tầm Nhìn (Intersection Sandbox)",
        badge: "IntersectionObserver",
        desc: "Cuộn khung bên dưới để quan sát thẻ mục tiêu giao cắt với khung nhìn (viewport) theo các ngưỡng 0%, 25%, 50%, 75%, 100%.",
        customHtml: `
          <div id="scroll-container" class="scroll-sandbox">
            <div class="spacer">↓ Cuộn xuống để đưa khối mục tiêu vào tầm nhìn ↓</div>
            <div id="observe-target" class="target-block">
              <div style="font-size: 1.5rem; margin-bottom: 4px;">🎯</div>
              <div style="font-weight: 700; color: #38bdf8;">KHỐI MỤC TIÊU (TARGET ELEMENT)</div>
              <div id="ratio-display" style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                Độ lộ diện: 0%
              </div>
            </div>
            <div class="spacer">↑ Cuộn lên để đưa khối ra khỏi tầm nhìn ↑</div>
            <div class="spacer">Vùng đệm cuộn thêm...</div>
          </div>
        `,
        actions: [
          { id: "btn-scroll-into-view", label: "Tự Cuộn Tới Mục Tiêu (scrollIntoView)", variant: "primary", handler: "scrollIntoView" },
          { id: "btn-disconnect-obs", label: "Ngắt Quan Sát (disconnect)", variant: "danger", handler: "disconnectObserver" },
          { id: "btn-reconnect-obs", label: "Kích Hoạt Lại Quan Sát", variant: "secondary", handler: "reconnectObserver" }
        ],
        previewBox: {
          id: "observer-status-box",
          initialText: "Trạng thái: Đang theo dõi tầm nhìn khối mục tiêu."
        }
      }
    ]
  };

  function setupObserver(ctx) {
    const rootEl = document.getElementById('scroll-container');
    const targetEl = document.getElementById('observe-target');

    if (!rootEl || !targetEl) return;
    if (typeof IntersectionObserver === 'undefined') {
      ctx.warn("Trình duyệt không hỗ trợ IntersectionObserver.");
      return;
    }

    if (observerInstance) observerInstance.disconnect();

    ctx.workflowStep("Tạo new IntersectionObserver với 5 ngưỡng: [0, 0.25, 0.5, 0.75, 1.0]");

    observerInstance = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const ratioPct = Math.round(entry.intersectionRatio * 100);
        const isVisible = entry.isIntersecting;

        const ratioDisplay = document.getElementById('ratio-display');
        if (ratioDisplay) {
          ratioDisplay.innerText = `Độ lộ diện: ${ratioPct}% (${isVisible ? 'Đang nhìn thấy' : 'Ngoài tầm nhìn'})`;
        }

        if (entry.intersectionRatio >= 0.5) {
          targetEl.classList.add('active');
        } else {
          targetEl.classList.remove('active');
        }

        ctx.event("Intersection Threshold Trigger", {
          isIntersecting: isVisible,
          ratio: `${ratioPct}%`,
          intersectionRect: `${Math.round(entry.intersectionRect.width)}x${Math.round(entry.intersectionRect.height)}`
        });

        ctx.setHtml('observer-status-box', `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              • Trạng thái: <strong style="color:${isVisible ? '#34d399' : '#f87171'};">${isVisible ? 'XUẤT HIỆN TRONG TẦM NHÌN' : 'NGOÀI TẦM NHÌN'}</strong>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">
                Tỷ lệ diện tích giao cắt (intersectionRatio): <code>${(entry.intersectionRatio).toFixed(2)} (${ratioPct}%)</code>
              </div>
            </div>
            <div style="font-size:1.8rem; font-weight:800; color:#38bdf8; font-family:var(--font-mono);">${ratioPct}%</div>
          </div>
        `);
      });
    }, {
      root: rootEl,
      rootMargin: "0px",
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    });

    observerInstance.observe(targetEl);
    ctx.success("Đã gắn IntersectionObserver thành công vào khối mục tiêu!");
  }

  const handlers = {
    onReady: (ctx) => {
      setupObserver(ctx);
    },

    scrollIntoView: (ctx) => {
      const targetEl = document.getElementById('observe-target');
      if (targetEl && typeof targetEl.scrollIntoView === 'function') {
        ctx.workflowStep("targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })");
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        ctx.info("Đã điều hướng tới khối mục tiêu.");
      }
    },

    disconnectObserver: (ctx) => {
      ctx.workflowStep("Gọi observer.disconnect()");
      if (observerInstance) {
        observerInstance.disconnect();
        observerInstance = null;
        ctx.warn("Đã ngắt hoàn toàn IntersectionObserver. Cuộn chuột sẽ không còn kích hoạt sự kiện.");
        ctx.setHtml('observer-status-box', 'Trạng thái: Đã ngắt quan sát.');
      }
    },

    reconnectObserver: (ctx) => {
      setupObserver(ctx);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
