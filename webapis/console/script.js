// webapis/console/script.js - Console API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const consoleSpec = {
    id: "console",
    name: "Console API",
    group: "C",
    category: "Developer Tools",
    status: "Standard",
    support: { chrome: "Yes", edge: "Yes", firefox: "Yes", safari: "Yes" },
    supportCheck: () => 'console' in window,
    why: "Bộ công cụ chẩn đoán, debug lỗi toàn diện cho lập trình viên: xuất dữ liệu dạng bảng (table), đo đạc thời gian thực thi mili-giây (time/timeEnd), gom nhóm log phân cấp (group), đếm số lần gọi (count) và bẫy điều kiện (assert).",
    whenToUse: "Kiểm tra luồng logic, đánh giá tốc độ xử lý của thuật toán, kiểm tra payload API dạng bảng dễ đọc trong DevTools.",
    whenNotToUse: "Để nguyên các log chứa dữ liệu nhạy cảm của người dùng (mật khẩu, token) khi deploy lên môi trường Production.",
    coreItems: [
      "console.table(data, [columns])",
      "console.time(label), console.timeEnd(label)",
      "console.group(label), console.groupEnd()",
      "console.count(label), console.countReset(label)",
      "console.assert(condition, ...args)",
      "console.trace()"
    ],
    panels: [
      {
        id: "panel-table-data",
        title: "1. Hiển Thị Bảng Cấu Trúc (console.table)",
        badge: "console.table()",
        desc: "Định dạng mảng đối tượng thành bảng có cột rõ ràng trong DevTools và Log UI.",
        actions: [
          { id: "btn-run-table", label: "Xuất Dữ Liệu Dạng Bảng (console.table)", variant: "primary", handler: "runTable" }
        ],
        previewBox: {
          id: "table-preview-box",
          initialText: "Bấm nút phía trên để xem bảng dữ liệu."
        }
      },
      {
        id: "panel-time-measure",
        title: "2. Đo Đạc Thời Gian Thực Thi (console.time & timeEnd)",
        badge: "console.time / console.timeEnd",
        desc: "Đo thời gian thực thi của một đoạn mã với độ chính xác cao.",
        actions: [
          { id: "btn-run-timer", label: "Đo Thời Gian Tính Toán 1 Triệu Phép Tính", variant: "secondary", handler: "runTimer" },
          { id: "btn-run-counter", label: "Đếm Số Lần Nhấn (console.count)", variant: "secondary", handler: "runCounter" },
          { id: "btn-run-assert", label: "Bẫy Điều Kiện (console.assert)", variant: "danger", handler: "runAssert" }
        ]
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Console API sẵn sàng");
    },

    runTable: (ctx) => {
      const users = [
        { id: 101, name: "Nguyễn Văn A", role: "Frontend Dev", level: "Senior", status: "Active" },
        { id: 102, name: "Trần Thị B", role: "Backend Dev", level: "Lead", status: "Active" },
        { id: 103, name: "Lê Hoàng C", role: "DevOps Engineer", level: "Mid", status: "Away" }
      ];

      ctx.workflowStep("Thực thi console.table(users)");
      console.table(users);
      ctx.success("Đã in dữ liệu dạng bảng ra DevTools F12 và Log UI:", users);

      ctx.setHtml('table-preview-box', `
        <table style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:#38bdf8;">
              <th style="padding:4px;">ID</th><th>Tên</th><th>Vai trò</th><th>Level</th><th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:4px;">${u.id}</td><td>${u.name}</td><td>${u.role}</td><td>${u.level}</td><td style="color:#34d399;">${u.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `);
    },

    runTimer: (ctx) => {
      ctx.workflowStep("Bắt đầu đo: console.time('Thử Nghiệm Tính Toán')");
      if (typeof console !== 'undefined' && console.time) console.time("Thử Nghiệm Tính Toán");
      const getNow = () => typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
      const start = getNow();

      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += Math.sqrt(i);
      }

      if (typeof console !== 'undefined' && console.timeEnd) console.timeEnd("Thử Nghiệm Tính Toán");
      const elapsed = (getNow() - start).toFixed(2);
      ctx.success(`Hoàn tất console.timeEnd('Thử Nghiệm Tính Toán'): ${elapsed} ms (Tổng: ${Math.round(sum)})`);
    },

    runCounter: (ctx) => {
      ctx.workflowStep("Gọi console.count('Click-Counter')");
      console.count('Click-Counter');
      ctx.info("Đã tăng biến đếm console.count('Click-Counter') (Mở DevTools F12 để thấy bộ đếm chi tiết).");
    },

    runAssert: (ctx) => {
      const balance = 50;
      const price = 100;
      ctx.workflowStep("Gọi console.assert(balance >= price, 'Số dư không đủ!')");

      // Nếu điều kiện SAI (false) -> console.assert sẽ ném log lỗi màu đỏ vào console
      console.assert(balance >= price, "Lỗi Assert: Số dư tài khoản nhỏ hơn giá tiền thanh toán!");
      ctx.error("console.assert phát hiện điều kiện SAI (balance < price) -> Đã bắn cảnh báo lỗi vào DevTools!");
    }
  };

  WebAPICore.renderApp(consoleSpec, handlers);
})();
