// webapis/fetch/script.js - Fetch API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentAbortController = null;

  const fetchSpec = {
    id: "fetch",
    name: "Fetch API",
    group: "F",
    category: "Network & HTTP",
    status: "Standard",
    support: { chrome: "42+", edge: "14+", firefox: "39+", safari: "10.1+" },
    supportCheck: () => 'fetch' in window,
    why: "Chuẩn giao tiếp mạng HTTP hiện đại thay thế hoàn toàn XMLHttpRequest cổ xưa. Dựa trên Promise bất đồng bộ, tích hợp luồng ReadableStream, kiểm soát timeout/huỷ bỏ bằng AbortController và hỗ trợ CORS.",
    whenToUse: "Gọi API RESTful, GraphQL, tải dữ liệu JSON, upload/download tệp tin, giao tiếp dữ liệu giữa client và backend.",
    whenNotToUse: "Tải file ngầm dung lượng lớn sau khi đóng tab (dùng Background Fetch); gửi log phân tích lúc đóng tab (dùng Beacon API).",
    coreItems: [
      "fetch(url, { method, headers, body, signal, credentials, mode })",
      "Response.prototype.json(), text(), blob(), arrayBuffer()",
      "Headers.prototype.set(), get(), has(), delete()",
      "AbortController.prototype.abort() (Ngắt kết nối mạng)"
    ],
    panels: [
      {
        id: "panel-get-post",
        title: "1. Thử Nghiệm GET & POST Request",
        badge: "fetch()",
        desc: "Gửi request mạng tới server mock nội bộ (/api/echo) và hiển thị phản hồi tức thì.",
        inputs: [
          { id: "fetch-url-input", label: "Endpoint URL:", type: "text", value: "/api/echo?query=web_apis_test", fullWidth: true },
          { id: "fetch-body-input", label: "Dữ liệu JSON Body (cho POST):", type: "textarea", rows: 2, value: '{"author": "Developer", "framework": "Vanilla JS", "status": "Master"}' }
        ],
        actions: [
          { id: "btn-send-get", label: "Gửi GET Request", variant: "primary", handler: "sendGet" },
          { id: "btn-send-post", label: "Gửi POST JSON Request", variant: "secondary", handler: "sendPost" }
        ],
        previewBox: {
          id: "fetch-response-box",
          initialText: "Chưa gửi yêu cầu mạng nào."
        }
      },
      {
        id: "panel-abort-controller",
        title: "2. Huỷ Request Giữa Chừng & Timeout (AbortController)",
        badge: "AbortController.signal",
        desc: "Khởi tạo AbortController gắn vào fetch. Khi gọi controller.abort(), kết nối mạng bị ngắt lập tức với ngoại lệ AbortError.",
        actions: [
          { id: "btn-fetch-with-abort", label: "Bắt Đầu Fetch Có Gắn Signal", variant: "secondary", handler: "fetchWithSignal" },
          { id: "btn-trigger-abort", label: "Ngắt Kết Nối Ngay (controller.abort())", variant: "danger", handler: "triggerAbort" }
        ],
        previewBox: {
          id: "abort-status-box",
          initialText: "Trạng thái: Chưa gắn tín hiệu ngắt."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Fetch API sẵn sàng");
    },

    sendGet: async (ctx) => {
      const url = ctx.getVal('fetch-url-input');
      ctx.workflowStep(`Gửi fetch("${url}", { method: 'GET' })`);

      try {
        const res = await fetch(url);
        ctx.info(`Nhận phản hồi HTTP Status: ${res.status} ${res.statusText}`);

        const data = await res.json();
        ctx.success("Dữ liệu JSON phân tích thành công:", data);

        ctx.setHtml('fetch-response-box', `
          <div>• HTTP Status: <strong style="color:#34d399;">${res.status} ${res.statusText}</strong></div>
          <div>• Content-Type: <code>${res.headers.get('content-type')}</code></div>
          <div style="margin-top:4px; max-height:80px; overflow-y:auto; font-family:var(--font-mono); font-size:0.75rem; color:#38bdf8;">
            ${ctx.escapeHtml(JSON.stringify(data, null, 2))}
          </div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi gửi GET:", err);
      }
    },

    sendPost: async (ctx) => {
      const url = ctx.getVal('fetch-url-input');
      const bodyRaw = ctx.getVal('fetch-body-input');
      ctx.workflowStep(`Gửi fetch("${url}", { method: 'POST', headers: {'Content-Type': 'application/json'} })`);

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: bodyRaw
        });

        const data = await res.json();
        ctx.success(`POST hoàn tất! Status: ${res.status}:`, data);

        ctx.setHtml('fetch-response-box', `
          <div>• HTTP Status: <strong style="color:#34d399;">${res.status} OK</strong></div>
          <div>• Dữ liệu Server nhận được (Body echo): <code>${ctx.escapeHtml(data.body)}</code></div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi gửi POST:", err);
      }
    },

    fetchWithSignal: async (ctx) => {
      currentAbortController = new AbortController();
      ctx.workflowStep("Khởi tạo currentAbortController = new AbortController() và bắt đầu fetch...");
      ctx.setHtml('abort-status-box', '<div style="color:#38bdf8;">Đang chờ phản hồi mạng... Bấm "Ngắt Kết Nối Ngay" để huỷ!</div>');

      try {
        const res = await fetch('/api/echo?delay=test', {
          signal: currentAbortController.signal
        });
        const data = await res.json();
        ctx.success("Yêu cầu hoàn tất bình thường trước khi bị ngắt:", data);
        ctx.setHtml('abort-status-box', "Yêu cầu đã kết thúc bình thường.");
      } catch (err) {
        if (err.name === 'AbortError') {
          ctx.warn("Ngoại lệ chuẩn xác: DOMException: AbortError (Yêu cầu mạng đã bị huỷ thành công bởi AbortController)!");
          ctx.setHtml('abort-status-box', '<div style="color:#f87171;">✔ Đã ngắt kết nối mạng bằng AbortController (AbortError)!</div>');
        } else {
          ctx.error("Lỗi khác:", err);
        }
      } finally {
        currentAbortController = null;
      }
    },

    triggerAbort: (ctx) => {
      if (currentAbortController) {
        ctx.workflowStep("Gọi currentAbortController.abort()");
        currentAbortController.abort();
        ctx.success("Đã gửi tín hiệu ngắt mạng abort()!");
      } else {
        ctx.warn("Không có request mạng nào đang chạy với signal.");
      }
    }
  };

  WebAPICore.renderApp(fetchSpec, handlers);
})();
