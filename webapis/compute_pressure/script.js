// webapis/compute_pressure/script.js - Compute Pressure API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let observer = null;
  let isSimulatingStress = false;
  let stressInterval = null;

  const pressureSpec = {
    id: "compute_pressure",
    name: "Compute Pressure API",
    group: "C",
    category: "Device & Performance",
    status: "Standard",
    support: { chrome: "125+", edge: "125+", firefox: "No", safari: "No" },
    supportCheck: () => 'PressureObserver' in window,
    why: "Cung cấp chỉ số áp lực tải thực tế của CPU hệ thống theo các mức độ (nominal, fair, serious, critical) để ứng dụng web tự động điều chỉnh hiệu năng: hạ độ phân giải video gọi thoại, giảm chất lượng đồ họa game hoặc tạm hoãn tác vụ nặng.",
    whenToUse: "Họp trực tuyến đa người (Google Meet, Zoom web) tự động hạ khung hình camera khi máy người dùng quá nóng; game 3D WebGL tự động giảm khử răng cưa khi CPU quá tải.",
    whenNotToUse: "Ứng dụng web thông thường không tiêu tốn nhiều tài nguyên xử lý.",
    coreItems: [
      "new PressureObserver((records, observer) => ...)",
      "observer.observe('cpu', { sampleInterval: 1000 })",
      "observer.unobserve('cpu'), observer.disconnect()",
      "record.state ('nominal' | 'fair' | 'serious' | 'critical')"
    ],
    panels: [
      {
        id: "panel-pressure-observer",
        title: "1. Giám Sát Áp Lực Tải CPU (PressureObserver)",
        badge: "PressureObserver.observe('cpu')",
        desc: "Đăng ký lắng nghe trạng thái tải CPU từ hệ thống theo chu kỳ lấy mẫu (sampleInterval).",
        inputs: [
          {
            id: "sample-interval-input",
            label: "Chu kỳ lấy mẫu tối thiểu (ms):",
            type: "number",
            value: 1000
          }
        ],
        actions: [
          { id: "btn-start-observe", label: "Bắt Đầu Quan Sát (observe)", variant: "primary", handler: "startObserving" },
          { id: "btn-stop-observe", label: "Dừng Quan Sát (disconnect)", variant: "danger", handler: "stopObserving" }
        ],
        previewBox: {
          id: "pressure-state-box",
          initialText: "Trạng thái CPU: Chưa theo dõi."
        }
      },
      {
        id: "panel-stress-simulator",
        title: "2. Thử Nghiệm Tăng Tải CPU Giả Lập",
        badge: "CPU Workload Generator",
        desc: "Kích hoạt vòng lặp tính toán ma trận để kích thích tăng áp lực tải CPU và quan sát sự phản hồi của PressureObserver.",
        actions: [
          { id: "btn-toggle-stress", label: "Bật / Tắt Tăng Tải CPU", variant: "warning", handler: "toggleStress" }
        ],
        previewBox: {
          id: "stress-status-box",
          initialText: "Bộ tạo tải: Đang tắt."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Compute Pressure API sẵn sàng");
      handlers.startObserving(ctx);
    },

    startObserving: (ctx) => {
      if (!('PressureObserver' in window)) {
        ctx.error("Trình duyệt không hỗ trợ PressureObserver (Yêu cầu Chrome 125+ / Edge 125+).");
        ctx.setHtml('pressure-state-box', `<span style="color:#f87171;">✖ PressureObserver chưa hỗ trợ trên trình duyệt này.</span>`);
        return;
      }

      const sampleInterval = parseInt(ctx.getVal('sample-interval-input'), 10) || 1000;
      ctx.workflowStep(`Khởi tạo observer = new PressureObserver() và observe('cpu', { sampleInterval: ${sampleInterval} })`);

      try {
        if (observer) observer.disconnect();

        observer = new PressureObserver((records) => {
          for (const record of records) {
            ctx.event("ComputePressureUpdate", {
              source: record.source,
              state: record.state,
              time: record.time
            });

            const stateColor = record.state === 'nominal' ? '#34d399' :
                               record.state === 'fair' ? '#38bdf8' :
                               record.state === 'serious' ? '#fbbf24' : '#ef4444';

            ctx.setHtml('pressure-state-box', `
              <div>• Nguồn đo: <strong>${record.source}</strong></div>
              <div>• Trạng thái áp lực CPU: <strong style="color:${stateColor};font-size:1.1rem;">${record.state.toUpperCase()}</strong></div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">(nominal: mát mẻ/thấp, fair: bình thường, serious: tải nặng, critical: quá tải)</div>
            `);
          }
        });

        observer.observe('cpu', { sampleInterval });
        ctx.success("Đang tích cực lắng nghe áp lực tải CPU từ hệ thống!");
      } catch (err) {
        ctx.error("Lỗi khi quan sát áp lực CPU:", err);
      }
    },

    stopObserving: (ctx) => {
      if (observer) {
        ctx.workflowStep("Gọi observer.disconnect()");
        observer.disconnect();
        observer = null;
        ctx.warn("Đã ngừng theo dõi áp lực CPU.");
        ctx.setHtml('pressure-state-box', "Đã dừng theo dõi.");
      }
    },

    toggleStress: (ctx) => {
      isSimulatingStress = !isSimulatingStress;

      if (isSimulatingStress) {
        ctx.workflowStep("Bắt đầu kích hoạt chu kỳ tính toán nặng để đẩy áp lực CPU");
        stressInterval = setInterval(() => {
          for (let i = 0; i < 5000000; i++) {
            Math.sqrt(i) * Math.sin(i);
          }
        }, 50);

        ctx.setHtml('stress-status-box', `<strong style="color:#ef4444;">Đang tạo tải CPU giả lập... Hãy theo dõi ô trạng thái phía trên!</strong>`);
      } else {
        clearInterval(stressInterval);
        stressInterval = null;
        ctx.workflowStep("Đã dừng bộ tạo tải CPU.");
        ctx.setHtml('stress-status-box', "Bộ tạo tải: Đang tắt.");
      }
    }
  };

  WebAPICore.renderApp(pressureSpec, handlers);
})();
