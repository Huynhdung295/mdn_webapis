// webapis/resize_observer/script.js - Resize Observer API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let roInstance = null;

  const spec = {
    id: "resize_observer",
    panels: [
      {
        id: "panel-resize-box",
        title: "1. Giám Sát Co Giãn Phần Tử (Container Breakpoints)",
        badge: "ResizeObserver",
        desc: "Kéo góc dưới bên phải của chiếc hộp xanh để thay đổi kích thước. ResizeObserver sẽ bắt chính xác từng pixel và tự động đổi giao diện theo Container Queries.",
        customHtml: `
          <div style="display:flex; justify-content:center; margin-bottom:16px;">
            <div id="demo-box" class="resizable-box">
              <div style="font-size:1.4rem; margin-bottom:4px;">📐</div>
              <div id="box-dimensions" style="font-weight:700; color:#38bdf8; font-family:var(--font-mono);">280 x 140 px</div>
              <div id="box-breakpoint-tag" class="badge badge-info" style="margin-top:6px;">Chế độ: Vừa (Medium)</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:8px;">↘ Kéo góc này để co giãn</div>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-preset-small", label: "Kích Thước Nhỏ (180x100)", variant: "secondary", handler: "setSmallSize" },
          { id: "btn-preset-large", label: "Kích Thước Lớn (460x180)", variant: "secondary", handler: "setLargeSize" }
        ],
        previewBox: {
          id: "ro-status-box",
          initialText: "Đang khởi tạo ResizeObserver..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Resize Observer API sẵn sàng");

      const box = document.getElementById('demo-box');
      if (!box) return;

      if (!('ResizeObserver' in window)) {
        ctx.warn("ResizeObserver không được hỗ trợ.");
        return;
      }

      ctx.workflowStep("Tạo new ResizeObserver(callback)");
      roInstance = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = Math.round(entry.contentRect.width);
          const h = Math.round(entry.contentRect.height);

          const dimEl = document.getElementById('box-dimensions');
          const bpEl = document.getElementById('box-breakpoint-tag');

          if (dimEl) dimEl.innerText = `${w} x ${h} px`;

          let bpName = 'Vừa (Medium)';
          let bpClass = 'badge-info';
          if (w < 220) {
            bpName = 'Nhỏ (Compact)';
            bpClass = 'badge-warning';
          } else if (w > 380) {
            bpName = 'Rộng (Expanded)';
            bpClass = 'badge-success';
          }

          if (bpEl) {
            bpEl.innerText = `Chế độ: ${bpName}`;
            bpEl.className = `badge ${bpClass}`;
          }

          ctx.event("Resize Entry", { width: `${w}px`, height: `${h}px`, breakpoint: bpName });

          ctx.setHtml('ro-status-box', `
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                • Kích thước contentRect: <strong>${w}px</strong> (rộng) x <strong>${h}px</strong> (cao)
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">
                  Phù hợp dựng Container Queries bằng Javascript cho biểu đồ Canvas & widget độc lập.
                </div>
              </div>
              <span class="badge ${bpClass}" style="font-size:0.85rem;">${bpName}</span>
            </div>
          `);
        }
      });

      roInstance.observe(box);
      ctx.success("Đã gắn ResizeObserver vào hộp thử nghiệm!");
    },

    setSmallSize: (ctx) => {
      const box = document.getElementById('demo-box');
      if (box) {
        ctx.workflowStep("Đổi kích thước hộp sang 180x100px");
        box.style.width = '180px';
        box.style.height = '100px';
      }
    },

    setLargeSize: (ctx) => {
      const box = document.getElementById('demo-box');
      if (box) {
        ctx.workflowStep("Đổi kích thước hộp sang 460x180px");
        box.style.width = '460px';
        box.style.height = '180px';
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
