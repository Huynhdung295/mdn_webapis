// webapis/device_memory/script.js - Device Memory API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const memSpec = {
    id: "device_memory",
    name: "Device Memory API",
    group: "D",
    category: "Device & System",
    status: "Standard",
    support: { chrome: "63+", edge: "79+", firefox: "No", safari: "No" },
    supportCheck: () => 'deviceMemory' in navigator,
    why: "Cung cấp dung lượng RAM xấp xỉ của thiết bị tính theo GiB (làm tròn thành 0.25, 0.5, 1, 2, 4, 8 để bảo vệ quyền riêng tư người dùng), giúp ứng dụng web tự động quyết định phục vụ phiên bản Lite (nhẹ) hay bản Full đồ hoạ cao.",
    whenToUse: "Tự động chọn độ phân giải ảnh/video phù hợp; giới hạn kích thước mảng lưu cache trong RAM trên thiết bị cấu hình yếu (<= 2GB RAM); tối ưu cài đặt đồ hoạ game WebGL/WebGPU.",
    whenNotToUse: "Cần số byte RAM chính xác tuyệt đối (trình duyệt chỉ làm tròn số nguyên lũy thừa 2 và cận trên tối đa là 8 GiB).",
    coreItems: [
      "navigator.deviceMemory (Số GiB: 0.25, 0.5, 1, 2, 4, 8)",
      "HTTP Client Hints: Device-Memory"
    ],
    panels: [
      {
        id: "panel-read-memory",
        title: "1. Đọc Dung Lượng RAM Hệ Thống (navigator.deviceMemory)",
        badge: "navigator.deviceMemory",
        desc: "Truy vấn giá trị bộ nhớ RAM mà trình duyệt báo cáo cho trang web.",
        actions: [
          { id: "btn-read-memory", label: "Kiểm Tra RAM Thiết Bị", variant: "primary", handler: "readMemory" }
        ],
        previewBox: {
          id: "memory-display-box",
          initialText: "Trạng thái: Chưa truy vấn."
        }
      },
      {
        id: "panel-adaptive-policy",
        title: "2. Chiến Lược Tải Thích Ứng Theo Cấu Hình RAM (Adaptive Loading)",
        badge: "Performance Strategy",
        desc: "Gợi ý chính sách tối ưu tài nguyên tự động dựa trên mức RAM thiết bị.",
        previewBox: {
          id: "policy-display-box",
          initialText: "Đang phân tích chính sách thích ứng..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Device Memory API sẵn sàng");
      handlers.readMemory(ctx);
    },

    readMemory: (ctx) => {
      ctx.workflowStep("Đọc giá trị navigator.deviceMemory");

      if (!('deviceMemory' in navigator)) {
        ctx.warn("navigator.deviceMemory không khả dụng trên trình duyệt này (Chỉ có trên Chromium engine).");
        ctx.setHtml('memory-display-box', `<span style="color:#f87171;">✖ Trình duyệt chưa hỗ trợ navigator.deviceMemory (Thường chỉ có trên Chrome/Edge).</span>`);
        return;
      }

      const ramGiB = navigator.deviceMemory;
      ctx.success(`Dung lượng RAM hệ thống được báo cáo: ${ramGiB} GiB`);

      ctx.setHtml('memory-display-box', `
        <div>RAM ước tính: <strong style="color:#38bdf8;font-size:1.4rem;">${ramGiB} GiB</strong></div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:3px;">
          (Giá trị được trình duyệt làm tròn về lũy thừa của 2 để chống fingerprinting nhận dạng danh tính người dùng)
        </div>
      `);

      // Phân tích chính sách thích ứng
      let policyHtml = '';
      if (ramGiB <= 2) {
        policyHtml = `
          <div style="color:#fbbf24;font-weight:600;">⚠ Cấu hình thiết bị cấp thấp (Low-end device)</div>
          <div style="margin-top:4px;">• Tự động chọn chất lượng video: <strong>360p / 480p</strong></div>
          <div>• Giảm số lượng ảnh preload trong danh sách cuộn (Infinite scroll)</div>
          <div>• Tắt hiệu ứng đổ bóng mờ (box-shadow) và backdrop-filter mờ nền để tránh nghẽn GPU</div>
        `;
      } else if (ramGiB <= 4) {
        policyHtml = `
          <div style="color:#38bdf8;font-weight:600;">ℹ Cấu hình thiết bị tầm trung (Mid-tier device)</div>
          <div style="margin-top:4px;">• Chất lượng video: <strong>720p / 1080p</strong></div>
          <div>• Bật hiệu ứng animation mượt tiêu chuẩn</div>
        `;
      } else {
        policyHtml = `
          <div style="color:#34d399;font-weight:600;">✔ Cấu hình thiết bị cao cấp (High-end device: >= 8GB RAM)</div>
          <div style="margin-top:4px;">• Bật toàn bộ đồ hoạ cao cấp: <strong>Video 4K / 60fps</strong></div>
          <div>• Kích hoạt khử răng cưa và ánh sáng chân thực trong WebGL/WebGPU</div>
          <div>• Preload trước toàn bộ asset của màn hình tiếp theo vào bộ nhớ cache</div>
        `;
      }

      ctx.setHtml('policy-display-box', policyHtml);
    }
  };

  WebAPICore.renderApp(memSpec, handlers);
})();
