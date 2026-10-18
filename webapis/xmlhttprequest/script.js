// webapis/xmlhttprequest/script.js - XMLHttpRequest API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentXhr = null;

  const spec = {
    id: "xmlhttprequest",
    panels: [
      {
        id: "panel-xhr-upload",
        title: "1. Tải Lên & Theo Dõi Tiến Trình (Upload Progress)",
        badge: "xhr.upload.onprogress",
        desc: "Lý do quan trọng nhất khiến XMLHttpRequest vẫn được dùng song song với Fetch API: khả năng theo dõi tiến trình tải lên (upload progress event) từng % chính xác.",
        inputs: [
          { id: "xhr-payload-size", label: "Kích thước gói dữ liệu tải lên thử nghiệm:", type: "select", options: [
            { value: "50000", label: "50 KB (Nhỏ)" },
            { value: "500000", label: "500 KB (Vừa)" },
            { value: "2000000", label: "2 MB (Lớn)" }
          ]}
        ],
        actions: [
          { id: "btn-send-xhr", label: "Gửi Yêu Cầu XHR Kèm Theo Dõi Tiến Trình", variant: "primary", handler: "sendXhrWithProgress" },
          { id: "btn-abort-xhr", label: "Huỷ Bỏ Giữa Chừng (xhr.abort)", variant: "danger", handler: "abortXhr" }
        ],
        previewBox: {
          id: "xhr-status-box",
          initialText: "Chưa gửi yêu cầu XHR nào."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường XMLHttpRequest API sẵn sàng");
    },

    sendXhrWithProgress: (ctx) => {
      if (typeof XMLHttpRequest === 'undefined') {
        ctx.warn("Trình duyệt không hỗ trợ XMLHttpRequest.");
        return;
      }
      const size = parseInt(ctx.getVal('xhr-payload-size'), 10) || 50000;
      const dummyData = "X".repeat(size);

      ctx.workflowStep(`Khởi tạo new XMLHttpRequest() & tải lên ${size} bytes tới /api/echo`);

      currentXhr = new XMLHttpRequest();
      currentXhr.open('POST', '/api/echo', true);
      currentXhr.setRequestHeader('Content-Type', 'text/plain');

      // 1. Theo dõi tiến trình tải lên
      currentXhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          ctx.event(`xhr.upload.onprogress: ${pct}% (${e.loaded}/${e.total} bytes)`);

          ctx.setHtml('xhr-status-box', `
            <div style="font-weight:600; color:#38bdf8;">Đang tải lên server: ${pct}%</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${e.loaded} / ${e.total} bytes</div>
          `);
        }
      };

      // 2. Theo dõi khi hoàn tất
      currentXhr.onload = () => {
        ctx.success(`XHR hoàn tất! HTTP Status: ${currentXhr.status} ${currentXhr.statusText}`);
        ctx.setHtml('xhr-status-box', `
          <div style="color:#34d399; font-weight:700;">✔ TẢI LÊN HOÀN TẤT (100%)</div>
          <div>• HTTP Status: <code>${currentXhr.status} ${currentXhr.statusText}</code></div>
          <div>• Kích thước gửi: <strong>${size} bytes</strong></div>
        `);
      };

      currentXhr.onerror = (e) => {
        ctx.error("Lỗi mạng XHR:", e);
      };

      currentXhr.onabort = () => {
        ctx.warn("Yêu cầu XHR đã bị huỷ (xhr.abort).");
        ctx.setHtml('xhr-status-box', '<span style="color:#f87171;">Yêu cầu đã bị ngắt giữa chừng.</span>');
      };

      currentXhr.send(dummyData);
    },

    abortXhr: (ctx) => {
      ctx.workflowStep("Gọi currentXhr.abort()");
      if (currentXhr) {
        currentXhr.abort();
        currentXhr = null;
      } else {
        ctx.warn("Không có request XHR nào đang chạy.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
