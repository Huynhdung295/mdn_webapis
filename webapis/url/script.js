// webapis/url/script.js - URL API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentBlobUrl = null;

  const spec = {
    id: "url",
    panels: [
      {
        id: "panel-url-parser",
        title: "1. Phân Tích & Thao Tác URL & Query Parameters",
        badge: "new URL() & URLSearchParams",
        desc: "Bóc tách từng thành phần URL chuẩn hóa và chỉnh sửa query parameters an toàn.",
        inputs: [
          { id: "url-input-str", label: "Chuỗi URL mẫu:", type: "text", value: "https://developer.mozilla.org:443/vi/docs/Web/API?sort=desc&category=network&page=2#section-examples", fullWidth: true },
          { id: "param-key", label: "Tên tham số query cần thêm:", type: "text", value: "filter" },
          { id: "param-val", label: "Giá trị tham số:", type: "text", value: "active" }
        ],
        actions: [
          { id: "btn-parse-url", label: "Phân Tích URL (Parse)", variant: "primary", handler: "parseUrl" },
          { id: "btn-add-param", label: "Thêm Tham Số (params.set)", variant: "secondary", handler: "addQueryParam" },
          { id: "btn-create-blob-url", label: "Tạo Blob Object URL (URL.createObjectURL)", variant: "secondary", handler: "createBlobUrl" }
        ],
        previewBox: {
          id: "url-result-box",
          initialText: "Đang chờ phân tích URL..."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường URL API sẵn sàng");
      handlers.parseUrl(ctx);
    },

    parseUrl: (ctx) => {
      const raw = ctx.getVal('url-input-str');
      ctx.workflowStep(`Khởi tạo new URL("${raw}")`);

      try {
        const u = new URL(raw);
        ctx.success("URL phân tích thành công:");

        const paramsList = [];
        u.searchParams.forEach((val, key) => {
          paramsList.push(`<code>${ctx.escapeHtml(key)}</code>: <strong>${ctx.escapeHtml(val)}</strong>`);
        });

        ctx.setHtml('url-result-box', `
          <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:8px; margin-bottom:8px; font-size:0.85rem;">
            <div>• Protocol: <code>${u.protocol}</code></div>
            <div>• Hostname: <code>${u.hostname}</code></div>
            <div>• Port: <code>${u.port || '(Mặc định)'}</code></div>
            <div>• Pathname: <code>${u.pathname}</code></div>
            <div>• Search: <code>${u.search}</code></div>
            <div>• Hash: <code>${u.hash || '(Rỗng)'}</code></div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:6px; font-size:0.8rem;">
            <span style="color:var(--text-muted);">Danh sách tham số (URLSearchParams):</span>
            <div style="margin-top:4px;">${paramsList.length > 0 ? paramsList.join(' | ') : 'Không có query params'}</div>
          </div>
        `);
      } catch (err) {
        ctx.error("URL không hợp lệ:", err.message);
        ctx.setHtml('url-result-box', `<span style="color:#f87171;">Lỗi: ${err.message}</span>`);
      }
    },

    addQueryParam: (ctx) => {
      const raw = ctx.getVal('url-input-str');
      const key = ctx.getVal('param-key');
      const val = ctx.getVal('param-val');

      if (!key) return;

      try {
        const u = new URL(raw);
        u.searchParams.set(key, val);
        ctx.workflowStep(`u.searchParams.set("${key}", "${val}")`);
        ctx.setVal('url-input-str', u.toString());
        ctx.success(`Đã thêm tham số ?${key}=${val} vào URL.`);
        handlers.parseUrl(ctx);
      } catch (err) {
        ctx.error("Lỗi:", err.message);
      }
    },

    createBlobUrl: (ctx) => {
      ctx.workflowStep("Tạo Blob Object URL: URL.createObjectURL(blob)");
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }

      const sampleJson = JSON.stringify({ message: "Xin chào từ Blob Object URL!", timestamp: Date.now() }, null, 2);
      const blob = new Blob([sampleJson], { type: 'application/json' });
      currentBlobUrl = URL.createObjectURL(blob);

      ctx.success("Đã sinh Object URL tạm thời trong RAM:", currentBlobUrl);
      ctx.setHtml('url-result-box', `
        <div style="color:#34d399; font-weight:700;">● Đã sinh Blob Object URL:</div>
        <div style="margin:6px 0;"><a href="${currentBlobUrl}" target="_blank" style="color:#38bdf8; text-decoration:underline;">${currentBlobUrl} ↗</a></div>
        <div style="font-size:0.8rem; color:var(--text-muted);">Click vào link trên để xem nội dung JSON được phục vụ trực tiếp từ bộ nhớ RAM của trình duyệt.</div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
