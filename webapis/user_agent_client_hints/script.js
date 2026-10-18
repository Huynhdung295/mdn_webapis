// webapis/user_agent_client_hints/script.js - User-Agent Client Hints API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "user_agent_client_hints",
    panels: [
      {
        id: "panel-client-hints",
        title: "1. Thông Tin Thiết Bị Chính Xác (High Entropy Hints)",
        badge: "navigator.userAgentData",
        desc: "Chuẩn thay thế chuỗi navigator.userAgent cũ. Cho phép lấy chính xác kiến trúc CPU (ARM/x86), phiên bản Windows 11 thật và model thiết bị.",
        actions: [
          { id: "btn-get-hints", label: "Lấy Dữ Liệu High-Entropy", variant: "primary", handler: "getHighEntropy" }
        ],
        previewBox: {
          id: "hints-result-box",
          initialText: "Đang đọc thông tin client hints..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường User-Agent Client Hints API khởi động");
      handlers.getHighEntropy(ctx);
    },

    getHighEntropy: async (ctx) => {
      if (!navigator.userAgentData) {
        ctx.warn("navigator.userAgentData không được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome / Edge).");
        ctx.setHtml('hints-result-box', '<span style="color:#f87171;">navigator.userAgentData không khả dụng. Fallback về chuỗi UA cũ:</span><br><code>' + navigator.userAgent + '</code>');
        return;
      }

      ctx.workflowStep("Gọi navigator.userAgentData.getHighEntropyValues([...])");

      try {
        const brands = navigator.userAgentData.brands.map(b => `${b.brand} (v${b.version})`).join(', ');
        const isMobile = navigator.userAgentData.mobile;
        const platform = navigator.userAgentData.platform;

        const hints = await navigator.userAgentData.getHighEntropyValues([
          'architecture',
          'bitness',
          'model',
          'platformVersion',
          'fullVersionList',
          'wow64'
        ]);

        ctx.success("Đã lấy thành công High Entropy Values:", hints);

        ctx.setHtml('hints-result-box', `
          <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px; margin-bottom:10px; font-size:0.85rem;">
            <div>• Hệ điều hành (Platform): <strong style="color:#38bdf8;">${platform}</strong> (v${hints.platformVersion || 'N/A'})</div>
            <div>• Kiến trúc CPU: <strong style="color:#34d399;">${hints.architecture || 'x86'} (${hints.bitness || '64'}-bit)</strong></div>
            <div>• Thiết bị di động: <code>${isMobile ? 'Có (Mobile)' : 'Không (Desktop)'}</code></div>
            <div>• Model thiết bị: <code>${hints.model || 'Desktop PC / Laptop'}</code></div>
            <div>• Giả lập 32-bit trên 64-bit (WOW64): <code>${hints.wow64 ? 'Có' : 'Không'}</code></div>
            <div>• Trình duyệt (Brands): <code>${brands}</code></div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:6px; font-size:0.75rem; color:var(--text-muted);">
            Chuỗi navigator.userAgent cũ (để so sánh): <code>${navigator.userAgent}</code>
          </div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi đọc Client Hints:", err);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
