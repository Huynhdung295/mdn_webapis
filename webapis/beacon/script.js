// webapis/beacon/script.js - Beacon API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const beaconSpec = {
    id: "beacon",
    name: "Beacon API",
    group: "B",
    category: "Network & Background",
    status: "Standard",
    support: { chrome: "39+", edge: "14+", firefox: "31+", safari: "11.1+" },
    supportCheck: () => 'sendBeacon' in navigator,
    why: "Gửi bất đồng bộ các gói dữ liệu phân tích / telemetry nhỏ lên máy chủ trước khi người dùng đóng trang mà không làm chậm chuyển trang (fetch thường sẽ bị trình duyệt huỷ ngay khi unload).",
    whenToUse: "Đo lường thời gian xem trang, sự kiện click cuối cùng, nhật ký lỗi phiên người dùng khi đóng hoặc đổi tab (sự kiện visibilitychange / pagehide).",
    whenNotToUse: "Cần nhận dữ liệu phản hồi từ máy chủ (sendBeacon chỉ gửi 1 chiều không nhận response), hoặc payload vượt quá giới hạn hàng đợi (~64KB).",
    coreItems: [
      "navigator.sendBeacon(url, data)",
      "data: USVString | Blob | FormData | ArrayBufferView",
      "Trả về boolean: true (đã vào hàng đợi), false (quá tải hàng đợi hoặc URL không hợp lệ)"
    ],
    panels: [
      {
        id: "panel-send-beacon",
        title: "1. Thử Nghiệm Gửi Beacon Trực Tiếp",
        badge: "navigator.sendBeacon(url, data)",
        desc: "Thử gửi chuỗi Text, Blob JSON hoặc FormData tới endpoint server nội bộ.",
        inputs: [
          { id: "beacon-url", label: "Endpoint URL nhận Beacon:", type: "text", value: "/api/beacon-collector", fullWidth: true },
          { id: "beacon-msg", label: "Nội dung dữ liệu mẫu:", type: "text", value: "User_Session_Leave_Event_12345", fullWidth: true }
        ],
        actions: [
          { id: "btn-send-text", label: "Gửi Chuỗi Text", variant: "primary", handler: "sendText" },
          { id: "btn-send-blob", label: "Gửi Dữ Liệu Blob (JSON)", variant: "secondary", handler: "sendBlob" },
          { id: "btn-send-formdata", label: "Gửi FormData", variant: "secondary", handler: "sendFormData" }
        ],
        previewBox: {
          id: "beacon-result-box",
          initialText: "Chưa gửi Beacon nào."
        }
      },
      {
        id: "panel-visibility-beacon",
        title: "2. Gửi Tự Động Khi Ẩn Tab (visibilitychange)",
        badge: "document.onvisibilitychange",
        desc: "Tiêu chuẩn W3C khuyến cáo kích hoạt Beacon trong sự kiện `visibilitychange` thay vì `unload` hoặc `beforeunload` đã lỗi thời.",
        actions: [
          { id: "btn-toggle-auto-beacon", label: "Bật Theo Dõi Tự Động Gửi Khi Ẩn Tab", variant: "secondary", handler: "toggleAutoBeacon" }
        ],
        previewBox: {
          id: "visibility-status-box",
          initialText: "Trạng thái theo dõi tự động: Đang tắt."
        }
      },
      {
        id: "panel-limit-test",
        title: "3. Thử Nghiệm Giới Hạn Hàng Đợi (Payload Limit)",
        badge: "Buffer Limit ~64KB",
        desc: "sendBeacon có hàng đợi trong bộ nhớ trình duyệt (~64KB). Nếu vượt quá, nó sẽ trả về false.",
        actions: [
          { id: "btn-test-normal-size", label: "Gửi Gói 10KB (Thành công)", variant: "secondary", handler: "testNormalSize" },
          { id: "btn-test-oversize", label: "Gửi Gói 150KB (Bẫy Lỗi Quá Tải)", variant: "danger", handler: "testOversize" }
        ]
      }
    ]
  };

  let isAutoBeaconActive = false;

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Beacon API sẵn sàng");
    },

    sendText: (ctx) => {
      const url = ctx.getVal('beacon-url');
      const msg = ctx.getVal('beacon-msg');

      ctx.workflowStep(`Gọi navigator.sendBeacon("${url}", text)`);
      if (!('sendBeacon' in navigator)) {
        ctx.error("Trình duyệt không hỗ trợ navigator.sendBeacon");
        return;
      }

      const success = navigator.sendBeacon(url, msg);
      if (success) {
        ctx.success(`navigator.sendBeacon trả về: true (Gói tin đã được đưa vào hàng đợi mạng của OS)`);
        ctx.setHtml('beacon-result-box', `<div>Trạng thái: <strong style="color:#34d399;">Thành công (Queued)</strong> | Độ dài: ${msg.length} ký tự</div>`);
      } else {
        ctx.error(`navigator.sendBeacon trả về: false (Hàng đợi đầy hoặc URL bị từ chối)`);
      }
    },

    sendBlob: (ctx) => {
      const url = ctx.getVal('beacon-url');
      const payload = {
        event: "page_interaction",
        timestamp: Date.now(),
        path: (typeof window !== 'undefined' && window.location && window.location.pathname) || '/',
        metrics: {
          scrollY: typeof window !== 'undefined' && window.scrollY !== undefined ? window.scrollY : 0,
          screenWidth: typeof window !== 'undefined' && window.innerWidth !== undefined ? window.innerWidth : 1920
        }
      };

      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      ctx.workflowStep(`Gọi navigator.sendBeacon("${url}", Blob JSON)`);

      const success = navigator.sendBeacon(url, blob);
      if (success) {
        ctx.success(`Đã xếp hàng Blob JSON (${blob.size} bytes):`, payload);
        ctx.setHtml('beacon-result-box', `<div>Trạng thái: <strong style="color:#34d399;">Thành công (Queued)</strong> | Dung lượng: ${blob.size} bytes</div>`);
      } else {
        ctx.error("Gửi Blob thất bại (sendBeacon trả về false)");
      }
    },

    sendFormData: (ctx) => {
      const url = ctx.getVal('beacon-url');
      const formData = new FormData();
      formData.append('username', 'dev_test');
      formData.append('action', 'exit_page');
      formData.append('time', new Date().toISOString());

      ctx.workflowStep(`Gọi navigator.sendBeacon("${url}", FormData)`);
      const success = navigator.sendBeacon(url, formData);
      if (success) {
        ctx.success("Đã gửi FormData thành công qua sendBeacon!");
      } else {
        ctx.error("Gửi FormData thất bại");
      }
    },

    toggleAutoBeacon: (ctx, e) => {
      const btn = (e && e.currentTarget) || (e && e.target) || ctx.getEl('btn-toggle-auto-beacon');
      if (!isAutoBeaconActive) {
        document.addEventListener('visibilitychange', onVisibilityChange);
        isAutoBeaconActive = true;
        btn.classList.add('btn-success');
        btn.innerText = "✔ Đang Theo Dõi (Thử đổi sang tab khác)";
        ctx.setHtml('visibility-status-box', '<div style="color:#34d399;">Đang kích hoạt! Hãy chuyển sang tab khác trong trình duyệt để kích hoạt sự kiện tự động gửi.</div>');
        ctx.success("Đã bật tự động gửi Beacon khi ẩn tab.");
      } else {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        isAutoBeaconActive = false;
        btn.classList.remove('btn-success');
        btn.innerText = "Bật Theo Dõi Tự Động Gửi Khi Ẩn Tab";
        ctx.setHtml('visibility-status-box', 'Trạng thái theo dõi tự động: Đang tắt.');
        ctx.info("Đã tắt theo dõi.");
      }

      function onVisibilityChange() {
        if (document.visibilityState === 'hidden') {
          const url = ctx.getVal('beacon-url') || '/api/beacon-collector';
          const payload = JSON.stringify({ event: 'tab_hidden', time: new Date().toISOString() });
          navigator.sendBeacon(url, payload);
          ctx.event("visibilitychange:hidden", "Tab vừa bị ẩn! Đã tự động kích hoạt sendBeacon.");
        }
      }
    },

    testNormalSize: (ctx) => {
      const url = ctx.getVal('beacon-url');
      const data10kb = "A".repeat(10 * 1024); // 10KB
      ctx.workflowStep("Thử nghiệm gửi payload 10KB");

      const ok = navigator.sendBeacon(url, data10kb);
      if (ok) {
        ctx.success("Gói tin 10KB đã xếp hàng thành công (dưới ngưỡng 64KB)");
      } else {
        ctx.error("Gói tin 10KB bị từ chối");
      }
    },

    testOversize: (ctx) => {
      const url = ctx.getVal('beacon-url');
      const data150kb = "X".repeat(150 * 1024); // 150KB
      ctx.workflowStep("Thử nghiệm gửi payload 150KB (Vượt quá dung lượng cho phép của browser buffer)");

      try {
        const ok = navigator.sendBeacon(url, data150kb);
        if (!ok) {
          ctx.warn("Kết quả đúng chuẩn MDN: navigator.sendBeacon() trả về FALSE vì kích thước 150KB vượt quá giới hạn hàng đợi!");
        } else {
          ctx.info("Trình duyệt chấp nhận gói tin lớn (tuỳ thuộc vào cấu hình buffer)");
        }
      } catch (err) {
        ctx.error("Lỗi ngoại lệ khi gửi dữ liệu quá tải:", err);
      }
    }
  };

  WebAPICore.renderApp(beaconSpec, handlers);
})();
