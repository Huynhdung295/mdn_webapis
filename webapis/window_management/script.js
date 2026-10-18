// webapis/window_management/script.js - Window Management API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "window_management",
    panels: [
      {
        id: "panel-screen-details",
        title: "1. Quản Lý Đa Màn Hình Máy Tính (Multi-Screen Details)",
        badge: "window.getScreenDetails()",
        desc: "Phát hiện tất cả các màn hình ngoài kết nối với máy tính để bố trí cửa sổ trình chiếu, bảng biểu đồ tài chính hoặc phòng thu đa màn hình.",
        actions: [
          { id: "btn-get-screen-details", label: "Quét Mọi Màn Hình Kết Nối (getScreenDetails)", variant: "primary", handler: "getScreens" },
          { id: "btn-open-popup-window", label: "Mở Cửa Sổ Phụ Cố Định Toạ Độ (window.open)", variant: "secondary", handler: "openSubWindow" }
        ],
        previewBox: {
          id: "wm-status-box",
          initialText: "Đang đọc thông tin màn hình..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Window Management API sẵn sàng");
      if (!('getScreenDetails' in window)) {
        ctx.warn("window.getScreenDetails không được hỗ trợ native trên trình duyệt này (hỗ trợ tốt nhất trên Chrome 100+, Edge 100+).");
      } else {
        ctx.success("window.getScreenDetails sẵn sàng!");
      }

      // Thông tin màn hình hiện thời cơ bản
      const screenObj = typeof window !== 'undefined' && window.screen ? window.screen : { width: 1920, height: 1080, availWidth: 1920, availHeight: 1040 };
      const dpr = typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1;
      ctx.setHtml('wm-status-box', `
        <div>• Màn hình hiện tại (window.screen): <code>${screenObj.width} x ${screenObj.height} px</code></div>
        <div>• Độ phân giải khả dụng (availWidth/Height): <code>${screenObj.availWidth} x ${screenObj.availHeight} px</code></div>
        <div>• Tỷ lệ pixel thiết bị (devicePixelRatio): <strong>${dpr}x</strong></div>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
          Bấm nút "Quét Mọi Màn Hình Kết Nối" để xin quyền đọc chi tiết toàn bộ các màn hình phụ khác.
        </div>
      `);
    },

    getScreens: async (ctx) => {
      if (!('getScreenDetails' in window)) {
        ctx.warn("window.getScreenDetails không khả dụng.");
        return;
      }

      ctx.workflowStep("Yêu cầu quyền truy cập đa màn hình: window.getScreenDetails()");

      try {
        const details = await window.getScreenDetails();
        const screens = details.screens;

        ctx.success(`Đã quét thấy ${screens.length} màn hình đang kết nối!`);

        let screensHtml = '';
        screens.forEach((sc, idx) => {
          screensHtml += `
            <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:6px; margin-bottom:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#38bdf8;">Màn hình #${idx + 1} (${sc.label || 'Monitor'})</strong>
                <span class="badge ${sc.isPrimary ? 'badge-success' : 'badge-secondary'}">${sc.isPrimary ? 'Màn Hình Chính (Primary)' : 'Màn Hình Phụ'}</span>
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
                Độ phân giải: <code>${sc.width}x${sc.height}</code> | Toạ độ: <code>Left: ${sc.left}, Top: ${sc.top}</code> | Tỷ lệ: <code>${sc.devicePixelRatio}x</code>
              </div>
            </div>
          `;
        });

        ctx.setHtml('wm-status-box', `
          <div style="color:#34d399; font-weight:700; margin-bottom:6px;">● Danh Sách ${screens.length} Màn Hình Máy Tính:</div>
          ${screensHtml}
        `);
      } catch (err) {
        ctx.error("Lỗi khi đọc đa màn hình:", err.message);
      }
    },

    openSubWindow: (ctx) => {
      ctx.workflowStep("Mở cửa sổ phụ độc lập tại toạ độ góc phải");
      const availW = (typeof window !== 'undefined' && window.screen && window.screen.availWidth) || 1920;
      const left = Math.max(0, availW - 420);
      const top = 100;
      if (typeof window !== 'undefined' && typeof window.open === 'function') {
        window.open(
          "about:blank",
          "_blank",
          `width=400,height=300,left=${left},top=${top},menubar=no,status=no`
        );
      }
      ctx.success(`Đã mở cửa sổ popup tại toạ độ (Left: ${left}, Top: ${top})`);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
