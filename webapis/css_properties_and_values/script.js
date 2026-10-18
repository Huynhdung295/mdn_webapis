// webapis/css_properties_and_values/script.js - CSS Properties and Values API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let isAngleRegistered = false;
  let isColorRegistered = false;
  let isRotating = false;

  const propSpec = {
    id: "css_properties_and_values",
    name: "CSS Properties and Values API (Houdini)",
    group: "C",
    category: "Styling & DOM",
    status: "Standard",
    support: { chrome: "78+", edge: "79+", firefox: "128+", safari: "16.4+" },
    supportCheck: () => 'registerProperty' in CSS,
    why: "Biến CSS mặc định là chuỗi (string) vô hướng nên trình duyệt không thể tính toán animation chuyển tiếp mượt mà. Đăng ký kiểu dữ liệu cụ thể (<angle>, <color>, <length>) cho phép CSS engine thực hiện animation gradient và biến đổi toán học mượt mà 60fps.",
    whenToUse: "Tạo animation xoay chuyển gradient mượt mà, định kiểu dữ liệu số, góc xoay, màu sắc cho biến CSS để có giá trị fallback an toàn khi nhập sai kiểu.",
    whenNotToUse: "Các biến CSS thông thường chỉ dùng để lưu màu tĩnh hoặc giá trị không cần tạo chuyển động animation.",
    coreItems: [
      "CSS.registerProperty({ name, syntax, inherits, initialValue })",
      "@property --name { syntax: '<color>'; inherits: false; initial-value: #fff; }",
      "syntax hỗ trợ: <length>, <number>, <percentage>, <length-percentage>, <color>, <image>, <url>, <integer>, <angle>, <time>, <resolution>"
    ],
    panels: [
      {
        id: "panel-register-properties",
        title: "1. Đăng Ký Kiểu Dữ Liệu Cho Biến CSS (CSS.registerProperty)",
        badge: "CSS.registerProperty()",
        desc: "Đăng ký 2 biến: `--gradient-angle` kiểu `<angle>` và `--spot-color` kiểu `<color>`.",
        actions: [
          { id: "btn-register-angle", label: "Đăng Ký --gradient-angle (<angle>)", variant: "primary", handler: "registerAngle" },
          { id: "btn-register-color", label: "Đăng Ký --spot-color (<color>)", variant: "secondary", handler: "registerColor" }
        ],
        previewBox: {
          id: "registration-status-box",
          initialText: "Trạng thái: Chưa đăng ký biến nào."
        }
      },
      {
        id: "panel-animate-gradient",
        title: "2. Chạy Animation Chuyển Động Gradient 360 Độ",
        badge: "CSS Keyframe Animation trên Custom Property",
        desc: "Nhờ đã được định nghĩa kiểu `<angle>`, CSS có thể tính toán nội suy xoay góc gradient từ 0deg đến 360deg liên tục.",
        actions: [
          { id: "btn-toggle-rotate", label: "Bật / Tắt Xoay Gradient 360°", variant: "primary", handler: "toggleRotate" },
          { id: "btn-shift-color", label: "Chuyển Màu Mượt (--spot-color)", variant: "secondary", handler: "shiftColor" },
          { id: "btn-test-invalid-val", label: "Gán Giá Trị Sai Kiểu (Fallback test)", variant: "danger", handler: "testInvalidVal" }
        ],
        customHtml: `
          <div class="animated-gradient-card" id="gradient-card">
            Chuyển Động Gradient Bằng CSS Houdini
          </div>
        `
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường CSS Properties and Values sẵn sàng");
      handlers.registerAngle(ctx);
      handlers.registerColor(ctx);
    },

    registerAngle: (ctx) => {
      if (typeof CSS === 'undefined' || !('registerProperty' in CSS)) {
        ctx.error("Trình duyệt không hỗ trợ CSS.registerProperty.");
        return;
      }

      ctx.workflowStep("Gọi CSS.registerProperty({ name: '--gradient-angle', syntax: '<angle>', inherits: false, initialValue: '0deg' })");
      try {
        CSS.registerProperty({
          name: '--gradient-angle',
          syntax: '<angle>',
          inherits: false,
          initialValue: '0deg'
        });
        isAngleRegistered = true;
        ctx.success("Đã đăng ký thành công biến CSS --gradient-angle kiểu <angle>!");
      } catch (err) {
        if (err.name === 'InvalidModificationError') {
          ctx.info("Biến --gradient-angle đã được đăng ký trước đó.");
          isAngleRegistered = true;
        } else {
          ctx.error("Lỗi đăng ký biến:", err);
        }
      }
      updateStatus(ctx);
    },

    registerColor: (ctx) => {
      if (typeof CSS === 'undefined' || !('registerProperty' in CSS)) return;

      ctx.workflowStep("Gọi CSS.registerProperty({ name: '--spot-color', syntax: '<color>', inherits: false, initialValue: '#6366f1' })");
      try {
        CSS.registerProperty({
          name: '--spot-color',
          syntax: '<color>',
          inherits: false,
          initialValue: '#6366f1'
        });
        isColorRegistered = true;
        ctx.success("Đã đăng ký thành công biến CSS --spot-color kiểu <color>!");
      } catch (err) {
        if (err.name === 'InvalidModificationError') {
          ctx.info("Biến --spot-color đã được đăng ký trước đó.");
          isColorRegistered = true;
        } else {
          ctx.error("Lỗi đăng ký biến:", err);
        }
      }
      updateStatus(ctx);
    },

    toggleRotate: (ctx) => {
      const card = ctx.getEl('gradient-card');
      if (!card) return;

      isRotating = !isRotating;
      card.classList.toggle('rotating-active', isRotating);

      ctx.workflowStep(`Chuyển trạng thái animation xoay gradient: ${isRotating ? 'ĐANG CHẠY' : 'ĐÃ DỪNG'}`);
      if (isRotating) {
        ctx.success("Animation keyframes @keyframes rotateGradient { 0% { --gradient-angle: 0deg; } 100% { --gradient-angle: 360deg; } } đang chạy mượt mà!");
      }
    },

    shiftColor: (ctx) => {
      const card = ctx.getEl('gradient-card');
      if (!card || !card.style) return;
      const randomColors = ['#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];
      const nextColor = randomColors[Math.floor(Math.random() * randomColors.length)];

      ctx.workflowStep(`Gán card.style.setProperty('--spot-color', '${nextColor}')`);
      card.style.setProperty('--spot-color', nextColor);
      ctx.success(`Biến --spot-color chuyển màu mượt mà sang ${nextColor} qua CSS transition!`);
    },

    testInvalidVal: (ctx) => {
      const card = ctx.getEl('gradient-card');
      if (!card || !card.style) return;
      ctx.workflowStep("Thử gán giá trị chuỗi không hợp lệ: '--gradient-angle': 'khong_phai_goc'");

      card.style.setProperty('--gradient-angle', 'khong_phai_goc');
      const computed = typeof getComputedStyle === 'function' ? getComputedStyle(card).getPropertyValue('--gradient-angle') : '0deg';
      ctx.warn(`Trình duyệt tự động từ chối giá trị sai cú pháp và giữ giá trị ban đầu (initialValue): "${(computed || '').trim()}"`);
    }
  };

  function updateStatus(ctx) {
    ctx.setHtml('registration-status-box', `
      <div>• --gradient-angle: <strong style="color:${isAngleRegistered ? '#34d399' : '#f59e0b'};">${isAngleRegistered ? 'Đã đăng ký (<angle>)' : 'Chưa'}</strong></div>
      <div>• --spot-color: <strong style="color:${isColorRegistered ? '#34d399' : '#f59e0b'};">${isColorRegistered ? 'Đã đăng ký (<color>)' : 'Chưa'}</strong></div>
    `);
  }

  WebAPICore.renderApp(propSpec, handlers);
})();
