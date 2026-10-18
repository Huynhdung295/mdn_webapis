// webapis/webxr/script.js - WebXR Device API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "webxr",
    panels: [
      {
        id: "panel-xr-devices",
        title: "1. Thực Tế Ảo (VR) & Thực Tế Tăng Cường (AR)",
        badge: "navigator.xr",
        desc: "Chuẩn thay thế WebVR: tích hợp kính VR (Meta Quest, Apple Vision Pro) và cảm biến AR camera điện thoại để hiển thị không gian 3D tương tác.",
        customHtml: `
          <canvas id="xr-canvas" class="xr-preview-canvas" width="600" height="180"></canvas>
        `,
        actions: [
          { id: "btn-check-xr-support", label: "Kiểm Tra Hỗ Trợ VR / AR (isSessionSupported)", variant: "primary", handler: "checkXrSupport" },
          { id: "btn-simulate-vr", label: "Chạy Hoạt Hoạ 3D VR Simulator", variant: "secondary", handler: "startVrSimulator" }
        ],
        previewBox: {
          id: "xr-status-box",
          initialText: "Đang kiểm tra phần cứng WebXR..."
        }
      }
    ]
  };

  let cubeAngle = 0;
  function drawVrSimulator() {
    const canvas = document.getElementById('xr-canvas');
    if (!canvas || !canvas.getContext) return;
    const c = canvas.getContext('2d');
    if (!c || !c.save) return;

    c.fillStyle = '#020617';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ khối cầu/lập phương xoay 3D giả lập
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    cubeAngle += 0.03;
    const size = 50;

    c.save();
    c.translate(cx, cy);
    c.rotate(cubeAngle);

    // 3D wireframe box
    c.strokeStyle = '#38bdf8';
    c.lineWidth = 2;
    c.strokeRect(-size, -size, size * 2, size * 2);

    c.strokeStyle = '#34d399';
    c.strokeRect(-size * 0.7, -size * 0.7, size * 1.4, size * 1.4);

    c.restore();

    c.fillStyle = '#f8fafc';
    c.font = '12px Inter, sans-serif';
    c.fillText('Spatial 3D Tracking Simulator', 20, 30);

    requestAnimationFrame(drawVrSimulator);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường WebXR Device API sẵn sàng");
      drawVrSimulator();
      handlers.checkXrSupport(ctx);
    },

    checkXrSupport: async (ctx) => {
      if (!('xr' in navigator)) {
        ctx.warn("navigator.xr không được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome / Edge / Meta Quest Browser).");
        ctx.setHtml('xr-status-box', '<span style="color:#fbbf24;">navigator.xr không khả dụng trên thiết bị hiện tại (cần kính VR hoặc browser có WebXR flag).</span>');
        return;
      }

      ctx.workflowStep("Kiểm tra các chế độ WebXR: inline, immersive-vr, immersive-ar");

      try {
        const hasInline = await navigator.xr.isSessionSupported('inline');
        let hasVr = false;
        let hasAr = false;

        try { hasVr = await navigator.xr.isSessionSupported('immersive-vr'); } catch(e){}
        try { hasAr = await navigator.xr.isSessionSupported('immersive-ar'); } catch(e){}

        ctx.success("Kết quả kiểm tra WebXR:", { inline: hasInline, immersiveVr: hasVr, immersiveAr: hasAr });

        ctx.setHtml('xr-status-box', `
          <div style="color:#34d399; font-weight:700; margin-bottom:6px;">● Trạng thái hỗ trợ WebXR:</div>
          <div>• Chế độ nhúng trang (Inline): <strong style="color:${hasInline ? '#34d399' : '#f87171'};">${hasInline ? 'Có' : 'Không'}</strong></div>
          <div>• Kính Thực tế ảo (Immersive VR): <strong style="color:${hasVr ? '#34d399' : '#fbbf24'};">${hasVr ? 'Có thiết bị' : 'Chưa gắn kính VR'}</strong></div>
          <div>• Thực tế tăng cường (Immersive AR): <strong style="color:${hasAr ? '#34d399' : '#fbbf24'};">${hasAr ? 'Có camera AR' : 'Không có AR'}</strong></div>
        `);
      } catch (err) {
        ctx.error("Lỗi kiểm tra WebXR:", err);
      }
    },

    startVrSimulator: (ctx) => {
      ctx.workflowStep("Kích hoạt vòng lặp không gian 3D WebXR Frame Simulator");
      ctx.success("Vòng lặp không gian 3D đang hiển thị trên Canvas!");
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
