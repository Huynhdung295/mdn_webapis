// webapis/performance/script.js - Performance API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  const spec = {
    id: "performance",
    panels: [
      {
        id: "panel-navigation-timing",
        title: "1. Thước Đo Tốc Độ Tải Trang Web (Navigation Timing v2)",
        badge: "performance.getEntriesByType('navigation')",
        desc: "Đo chính xác thời gian từng giai đoạn kết nối mạng từ lúc gõ URL đến khi trang web sẵn sàng: DNS, TCP Handshake, SSL/TLS, TTFB (phản hồi server) và DOM Ready.",
        actions: [
          { id: "btn-get-nav-metrics", label: "Phân Tích Tốc Độ Tải Trang Hiện Tại", variant: "primary", handler: "getNavigationMetrics" }
        ],
        previewBox: {
          id: "nav-metrics-box",
          initialText: "Bấm nút phía trên để đọc các mốc thời gian tải trang."
        }
      },
      {
        id: "panel-user-timing",
        title: "2. Đo Tốc Độ Thực Thi Đoạn Code (User Timing: mark & measure)",
        badge: "performance.mark() & measure()",
        desc: "Gắn thẻ mốc thời gian với độ chính xác micro-giây (µs) để benchmark hàm xử lý dữ liệu nặng hoặc thuật toán phức tạp.",
        inputs: [
          {
            id: "select-iterations",
            type: "select",
            label: "Số lượng phần tử Array cần sắp xếp (Benchmark Array Sort):",
            options: [
              { value: "50000", label: "50,000 phần tử ngẫu nhiên" },
              { value: "200000", label: "200,000 phần tử ngẫu nhiên" },
              { value: "500000", label: "500,000 phần tử ngẫu nhiên" }
            ]
          }
        ],
        actions: [
          { id: "btn-run-benchmark", label: "Chạy Thử Nghiệm Đo Tốc Độ (mark/measure)", variant: "primary", handler: "runBenchmark" },
          { id: "btn-check-memory", label: "Kiểm Tra Bộ Nhớ RAM JS Heap (performance.memory)", variant: "secondary", handler: "checkMemory" }
        ],
        previewBox: {
          id: "benchmark-preview-box",
          initialText: "Chưa chạy thử nghiệm đo hiệu năng code."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Performance API");
      if (!('performance' in window)) {
        ctx.warn("Trình duyệt không hỗ trợ Performance API.");
        return;
      }
      ctx.success("Trình duyệt hỗ trợ đầy đủ High-Resolution Time (performance.now())!");
      handlers.getNavigationMetrics(ctx);
    },

    getNavigationMetrics: (ctx) => {
      ctx.workflowStep("Lấy dữ liệu performance.getEntriesByType('navigation')[0]");
      if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function') {
        ctx.warn("Performance API không khả dụng trên môi trường này.");
        return;
      }
      const entries = performance.getEntriesByType('navigation');
      if (!entries || entries.length === 0) {
        ctx.warn("Chưa có bản ghi navigation timing hoàn chỉnh.");
        return;
      }

      const nav = entries[0];
      const dnsTime = Math.max(0, nav.domainLookupEnd - nav.domainLookupStart).toFixed(1);
      const tcpTime = Math.max(0, nav.connectEnd - nav.connectStart).toFixed(1);
      const ttfb = Math.max(0, nav.responseStart - nav.requestStart).toFixed(1);
      const domLoad = Math.max(0, nav.domContentLoadedEventEnd - nav.startTime).toFixed(1);
      const totalLoad = Math.max(0, nav.loadEventEnd - nav.startTime).toFixed(1);

      ctx.success("Đã phân tích các mốc thời gian tải trang:", {
        dnsTime: `${dnsTime} ms`,
        tcpTime: `${tcpTime} ms`,
        ttfb: `${ttfb} ms`,
        domLoad: `${domLoad} ms`,
        totalLoad: `${totalLoad} ms`
      });

      const html = `
        <div class="metrics-dashboard-grid">
          <div class="metric-pill">
            <div class="label">Phân giải DNS</div>
            <div class="value">${dnsTime} ms</div>
          </div>
          <div class="metric-pill">
            <div class="label">Bắt tay TCP</div>
            <div class="value">${tcpTime} ms</div>
          </div>
          <div class="metric-pill">
            <div class="label">Thời gian TTFB (Server)</div>
            <div class="value" style="color:#34d399;">${ttfb} ms</div>
          </div>
          <div class="metric-pill">
            <div class="label">DOM Content Loaded</div>
            <div class="value">${domLoad} ms</div>
          </div>
          <div class="metric-pill">
            <div class="label">Toàn bộ trang sẵn sàng</div>
            <div class="value" style="color:#f59e0b;">${totalLoad} ms</div>
          </div>
        </div>
      `;
      ctx.setHtml('nav-metrics-box', html);
    },

    runBenchmark: (ctx) => {
      if (typeof performance === 'undefined' || typeof performance.mark !== 'function') {
        ctx.warn("Performance API không khả dụng trên môi trường này.");
        return;
      }
      const count = Number(ctx.getVal('select-iterations')) || 50000;
      ctx.workflowStep(`Bắt đầu benchmark: Khởi tạo & Sắp xếp mảng ngẫu nhiên ${count.toLocaleString()} số nguyên`);

      // 1. Tạo mark bắt đầu
      performance.mark('benchmark-start');

      // Tạo mảng ngẫu nhiên
      const arr = new Float64Array(count);
      for (let i = 0; i < count; i++) {
        arr[i] = Math.random();
      }

      // Sắp xếp
      arr.sort();

      // 2. Tạo mark kết thúc
      performance.mark('benchmark-end');

      // 3. Tạo measure
      performance.measure('array-sort-task', 'benchmark-start', 'benchmark-end');

      const measureEntries = performance.getEntriesByName('array-sort-task');
      const latestMeasure = measureEntries && measureEntries.length > 0 ? measureEntries[measureEntries.length - 1] : { duration: 1.0 };

      const durationMs = (latestMeasure.duration || 1).toFixed(2);
      ctx.success(`Hoàn thành tác vụ trong ${durationMs} ms! (Độ phân giải performance.now)`, {
        duration: `${durationMs} ms`,
        itemsSorted: count
      });

      ctx.setHtml('benchmark-preview-box', `
        <div style="font-weight:600; color:#34d399;">
          ✔ Hoàn thành sắp xếp <strong>${count.toLocaleString()}</strong> phần tử trong <strong>${durationMs} ms</strong>!
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
          Tên thước đo: <code>array-sort-task</code> | Độ chính xác micro-seconds cao hơn rất nhiều so với Date.now().
        </div>
      `);
    },

    checkMemory: (ctx) => {
      ctx.workflowStep("Đọc thuộc tính performance.memory (Chỉ có trên Chromium)");
      if (typeof performance === 'undefined' || !performance.memory) {
        ctx.warn("performance.memory là API phi chuẩn độc quyền trên trình duyệt Chrome/Edge để tránh fingerprinting trên Firefox/Safari.");
        ctx.setHtml('benchmark-preview-box', `
          <div style="color:var(--accent-warning);">
            Trình duyệt này không mở performance.memory để bảo mật quyền riêng tư chống fingerprinting.
          </div>
        `);
        return;
      }

      const mem = performance.memory;
      const usedMb = (mem.usedJSHeapSize / (1024 * 1024)).toFixed(1);
      const totalMb = (mem.totalJSHeapSize / (1024 * 1024)).toFixed(1);
      const limitMb = (mem.jsHeapSizeLimit / (1024 * 1024)).toFixed(1);

      ctx.success("Thông số bộ nhớ JS Heap:", {
        used: `${usedMb} MB`,
        total: `${totalMb} MB`,
        limit: `${limitMb} MB`
      });

      ctx.setHtml('benchmark-preview-box', `
        <div class="metrics-dashboard-grid">
          <div class="metric-pill">
            <div class="label">RAM JS Đang Dùng</div>
            <div class="value" style="color:#34d399;">${usedMb} MB</div>
          </div>
          <div class="metric-pill">
            <div class="label">Tổng RAM Đã Cấp Phát</div>
            <div class="value">${totalMb} MB</div>
          </div>
          <div class="metric-pill">
            <div class="label">Giới Hạn Heap Tối Đa</div>
            <div class="value" style="color:#f59e0b;">${limitMb} MB</div>
          </div>
        </div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
