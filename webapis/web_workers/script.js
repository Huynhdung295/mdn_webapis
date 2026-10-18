// webapis/web_workers/script.js - Web Workers API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentWorker = null;

  const spec = {
    id: "web_workers",
    panels: [
      {
        id: "panel-workers-benchmark",
        title: "1. Đa Luồng Nền Tách Biệt CPU (Background Multithreading)",
        badge: "new Worker()",
        desc: "Chạy phép tính toán 50.000.000 phép tính số học trên luồng nền của hệ điều hành. Vòng quay màu xanh (60 FPS) vẫn quay tít không hề bị giật đơ!",
        customHtml: `
          <div class="spinner-wrap">
            <div class="fps-spinner"></div>
            <div>
              <div style="font-weight:700; color:#38bdf8;">Thước Đo Độ Mượt UI (Main Thread 60 FPS)</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Nếu Main Thread bị nghẽn, vòng xoay này sẽ bị đứng hình lập tức.</div>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-run-worker", label: "Chạy Trên Web Worker (Không Giật UI)", variant: "primary", handler: "runInWorker" },
          { id: "btn-run-main", label: "Chạy Trực Tiếp Trên Main Thread (Đơ 2 Giây)", variant: "danger", handler: "runInMainThread" },
          { id: "btn-stop-worker", label: "Dừng Worker Ngay (terminate())", variant: "secondary", handler: "terminateWorker" }
        ],
        previewBox: {
          id: "worker-status-box",
          initialText: "Chưa kích hoạt tính toán."
        }
      }
    ]
  };

  // Tạo code worker dạng Blob để chạy độc lập không cần file ngoài
  const workerCode = `
    self.onmessage = function(e) {
      const iterations = e.data.iterations || 50000000;
      const start = performance.now();
      let sum = 0;
      for (let i = 0; i < iterations; i++) {
        sum += Math.sqrt(i) * Math.sin(i);
      }
      const duration = (performance.now() - start).toFixed(2);
      self.postMessage({ sum, duration, iterations });
    };
  `;

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Workers API sẵn sàng");
      if (!('Worker' in window)) {
        ctx.warn("Web Workers không được hỗ trợ.");
      } else {
        ctx.success("Web Workers sẵn sàng hoạt động!");
      }
    },

    runInWorker: (ctx) => {
      ctx.workflowStep("Khởi tạo new Worker(blobUrl) & postMessage({ iterations: 50.000.000 })");
      if (typeof Worker === 'undefined') {
        ctx.warn("Trình duyệt không hỗ trợ Web Workers.");
        return;
      }
      ctx.setHtml('worker-status-box', '<span style="color:#38bdf8;">Web Worker đang tính toán ngầm 50.000.000 số học... Hãy quan sát vòng xoay vẫn quay siêu mượt!</span>');

      if (currentWorker) currentWorker.terminate();

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      currentWorker = new Worker(workerUrl);

      currentWorker.onmessage = (e) => {
        ctx.success(`[Web Worker] Đã hoàn thành 50.000.000 phép tính trong ${e.data.duration}ms mà KHÔNG giật UI!`);
        ctx.setHtml('worker-status-box', `
          <div style="color:#34d399; font-weight:700;">✔ Tính toán thành công trên Web Worker!</div>
          <div>• Thời gian thực thi: <strong style="color:#38bdf8;">${e.data.duration} ms</strong></div>
          <div>• Kết quả tích luỹ: <code>${e.data.sum.toFixed(4)}</code></div>
          <div>• UI FPS: Giữ vững 60 khung hình/giây.</div>
        `);
      };

      currentWorker.onerror = (err) => {
        ctx.error("Lỗi Worker:", err);
      };

      currentWorker.postMessage({ iterations: 50000000 });
    },

    runInMainThread: (ctx) => {
      ctx.workflowStep("Chạy 50.000.000 phép tính TRỰC TIẾP trên Main UI Thread");
      ctx.warn("Cảnh báo: Main Thread sẽ bị khoá cứng (Blocked) trong ~1-2 giây!");

      setTimeout(() => {
        const start = performance.now();
        let sum = 0;
        for (let i = 0; i < 50000000; i++) {
          sum += Math.sqrt(i) * Math.sin(i);
        }
        const duration = (performance.now() - start).toFixed(2);

        ctx.error(`[Main Thread Blocked] Đã làm đơ chuột và đứng hình vòng quay trong ${duration}ms!`);
        ctx.setHtml('worker-status-box', `
          <div style="color:#f87171; font-weight:700;">✖ Main Thread Bị Đơ Trong ${duration}ms!</div>
          <div>Đây là lý do bạn NÊN DÙNG Web Workers cho các thuật toán tính toán nặng.</div>
        `);
      }, 50);
    },

    terminateWorker: (ctx) => {
      ctx.workflowStep("Gọi currentWorker.terminate()");
      if (currentWorker) {
        currentWorker.terminate();
        currentWorker = null;
        ctx.info("Đã ngắt hoàn toàn Worker.");
        ctx.setHtml('worker-status-box', 'Trạng thái: Worker đã bị dừng.');
      } else {
        ctx.warn("Không có Worker nào đang chạy.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
