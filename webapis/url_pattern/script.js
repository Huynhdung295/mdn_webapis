// webapis/url_pattern/script.js - URL Pattern API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "url_pattern",
    panels: [
      {
        id: "panel-pattern-matcher",
        title: "1. So Khớp Mẫu URL (Regex Pattern Matching)",
        badge: "new URLPattern()",
        desc: "Chuẩn cú pháp so khớp đường dẫn với tham số động kiểu Express / Next.js trực tiếp trên trình duyệt.",
        inputs: [
          { id: "pattern-input", label: "Mẫu đường dẫn (URLPattern pathname):", type: "text", value: "/books/:category/:id(\\d+)", fullWidth: true },
          { id: "test-url-input", label: "URL cần kiểm tra:", type: "text", value: "https://example.com/books/javascript/123", fullWidth: true }
        ],
        actions: [
          { id: "btn-match-pattern", label: "Kiểm Tra So Khớp (pattern.exec)", variant: "primary", handler: "matchPattern" }
        ],
        previewBox: {
          id: "pattern-result-box",
          initialText: "Đang chờ kiểm tra so khớp..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường URL Pattern API sẵn sàng");
      if (!('URLPattern' in window)) {
        ctx.warn("URLPattern chưa được hỗ trợ native trên trình duyệt này (hỗ trợ tốt nhất trên Chrome 95+, Edge 95+).");
      }
      handlers.matchPattern(ctx);
    },

    matchPattern: (ctx) => {
      if (!('URLPattern' in window)) {
        ctx.setHtml('pattern-result-box', '<span style="color:#f87171;">window.URLPattern không khả dụng trên trình duyệt này.</span>');
        return;
      }

      const patternStr = ctx.getVal('pattern-input');
      const testUrl = ctx.getVal('test-url-input');

      ctx.workflowStep(`Tạo new URLPattern({ pathname: "${patternStr}" })`);

      try {
        const pattern = new URLPattern({ pathname: patternStr });
        const isMatched = pattern.test(testUrl);
        const matchResult = pattern.exec(testUrl);

        if (isMatched && matchResult) {
          const groups = matchResult.pathname.groups;
          ctx.success("URL KHỚP HOÀN TOÀN với mẫu!", groups);

          let groupsHtml = '';
          for (const [k, v] of Object.entries(groups)) {
            groupsHtml += `<div>• Tham số <code>:${k}</code>: <strong style="color:#34d399;">"${v}"</strong></div>`;
          }

          ctx.setHtml('pattern-result-box', `
            <div style="color:#34d399; font-weight:700; margin-bottom:6px;">✔ SO KHỚP THÀNH CÔNG (Matched)</div>
            <div>• URL kiểm tra: <code>${ctx.escapeHtml(testUrl)}</code></div>
            <div>• Mẫu Pattern: <code>${ctx.escapeHtml(patternStr)}</code></div>
            <div style="margin-top:8px; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">
              <span style="color:var(--text-muted); font-size:0.8rem;">Các tham số đã trích xuất (groups):</span>
              <div style="margin-top:4px;">${groupsHtml}</div>
            </div>
          `);
        } else {
          ctx.warn("URL KHÔNG KHỚP với mẫu.");
          ctx.setHtml('pattern-result-box', `
            <div style="color:#f87171; font-weight:700;">✖ KHÔNG KHỚP (No Match)</div>
            <div>URL không tuân theo đúng cấu trúc hoặc kiểu dữ liệu của mẫu pattern.</div>
          `);
        }
      } catch (err) {
        ctx.error("Lỗi cú pháp URLPattern:", err.message);
        ctx.setHtml('pattern-result-box', `<span style="color:#f87171;">Lỗi cú pháp: ${err.message}</span>`);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
