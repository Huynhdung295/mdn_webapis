// webapis/device_orientation/script.js - Device Orientation Events: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let isListening = false;

  const orientSpec = {
    id: "device_orientation",
    name: "Device Orientation Events",
    group: "D",
    category: "Device & Sensors",
    status: "Standard",
    support: { chrome: "Yes", edge: "Yes", firefox: "Yes", safari: "Yes" },
    supportCheck: () => 'DeviceOrientationEvent' in window,
    why: "Cung cấp góc nghiêng 3 chiều vật lý của thiết bị trong không gian (alpha: góc quay la bàn trục Z 0-360°, beta: nghiêng trước/sau trục X -180 đến 180°, gamma: nghiêng trái/phải trục Y -90 đến 90°), giúp tạo tương tác chuyển động theo tay cầm.",
    whenToUse: "Ứng dụng la bàn số (Compass web), game đua xe điều khiển bằng cách nghiêng điện thoại, xem ảnh/video toàn cảnh 360 độ Panorama, hiệu ứng Parallax chuyển động 3D.",
    whenNotToUse: "Thiết bị máy tính để bàn (PC Desktop) không có cảm biến con quay hồi chuyển (gyroscope) hoặc gia tốc kế phần cứng.",
    coreItems: [
      "window.addEventListener('deviceorientation', (e) => ...)",
      "e.alpha (Trục Z - La bàn 0-360°)",
      "e.beta (Trục X - Nghiêng trước/sau -180° đến 180°)",
      "e.gamma (Trục Y - Nghiêng trái/phải -90° đến 90°)",
      "DeviceOrientationEvent.requestPermission() (Bắt buộc trên iOS Safari 13+)"
    ],
    panels: [
      {
        id: "panel-orientation-controls",
        title: "1. Lắng Nghe Cảm Biến Con Quay Hồi Chuyển (deviceorientation)",
        badge: "window.ondeviceorientation",
        desc: "Bật lắng nghe góc nghiêng vật lý của thiết bị. Trên điện thoại iOS, cần nhấn nút để yêu cầu quyền cấp phép.",
        actions: [
          { id: "btn-start-listen", label: "Bật Lắng Nghe Cảm Biến", variant: "primary", handler: "toggleListen" },
          { id: "btn-simulate-tilt", label: "Giả Lập Nghiêng (Cho Máy Tính Desktop)", variant: "secondary", handler: "simulateTilt" }
        ],
        customHtml: `
          <div class="orientation-visualizer">
            <div class="phone-model" id="phone-3d-model">
              <div style="width:24px;height:4px;background:#475569;border-radius:2px;"></div>
              <div class="phone-screen" id="phone-screen-label">3D Gyro</div>
              <div style="width:14px;height:14px;border:1px solid #475569;border-radius:50%;"></div>
            </div>
          </div>
        `,
        previewBox: {
          id: "orientation-data-box",
          initialText: "Trạng thái: Chưa nhận dữ liệu góc nghiêng."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Device Orientation Events sẵn sàng");
    },

    toggleListen: async (ctx) => {
      if (isListening) {
        window.removeEventListener('deviceorientation', onOrientation);
        isListening = false;
        ctx.warn("Đã tắt theo dõi cảm biến con quay hồi chuyển.");
        ctx.setHtml('orientation-data-box', "Đã tắt theo dõi.");
        return;
      }

      ctx.workflowStep("Bắt đầu đăng ký lắng nghe window 'deviceorientation'");

      // Xử lý xin quyền trên iOS 13+
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const perm = await DeviceOrientationEvent.requestPermission();
          ctx.info(`Quyền truy cập con quay hồi chuyển trên iOS: ${perm}`);
          if (perm !== 'granted') {
            ctx.error("Người dùng đã từ chối quyền truy cập cảm biến con quay hồi chuyển.");
            return;
          }
        } catch (err) {
          ctx.error("Lỗi xin quyền cảm biến trên iOS:", err);
        }
      }

      window.addEventListener('deviceorientation', onOrientation);
      isListening = true;
      ctx.success("Đang lắng nghe góc nghiêng 3 chiều từ phần cứng!");

      function onOrientation(event) {
        const a = event.alpha !== null ? event.alpha.toFixed(1) : '0';
        const b = event.beta !== null ? event.beta.toFixed(1) : '0';
        const g = event.gamma !== null ? event.gamma.toFixed(1) : '0';

        ctx.setHtml('orientation-data-box', `
          <div>• Alpha (Góc quay trục Z): <strong style="color:#38bdf8;">${a}°</strong></div>
          <div>• Beta (Nghiêng trước/sau trục X): <strong style="color:#34d399;">${b}°</strong></div>
          <div>• Gamma (Nghiêng trái/phải trục Y): <strong style="color:#fbbf24;">${g}°</strong></div>
        `);

        // Cập nhật góc xoay 3D của mô hình điện thoại
        const phone = ctx.getEl('phone-3d-model');
        if (phone) {
          phone.style.transform = `rotateX(${b}deg) rotateY(${g}deg) rotateZ(${a}deg)`;
        }
      }
    },

    simulateTilt: (ctx) => {
      ctx.workflowStep("Giả lập góc nghiêng trên Desktop: Beta = 25°, Gamma = -35°, Alpha = 90°");
      const phone = ctx.getEl('phone-3d-model');
      if (phone) {
        phone.style.transform = `rotateX(25deg) rotateY(-35deg) rotateZ(45deg)`;
      }
      ctx.setHtml('orientation-data-box', `
        <div>[Mô phỏng] • Alpha: <strong style="color:#38bdf8;">45.0°</strong></div>
        <div>[Mô phỏng] • Beta: <strong style="color:#34d399;">25.0°</strong></div>
        <div>[Mô phỏng] • Gamma: <strong style="color:#fbbf24;">-35.0°</strong></div>
      `);
      ctx.success("Đã mô phỏng góc nghiêng 3D trên mô hình điện thoại!");
    }
  };

  WebAPICore.renderApp(orientSpec, handlers);
})();
