// webapis/geolocation/script.js - Geolocation API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentWatchId = null;

  const spec = {
    id: "geolocation",
    panels: [
      {
        id: "panel-get-position",
        title: "1. Lấy Toạ Độ Hiện Tại (getCurrentPosition)",
        badge: "getCurrentPosition()",
        desc: "Truy vấn toạ độ GPS/Wi-Fi chính xác 1 lần kèm cấu hình độ chính xác cao.",
        inputs: [
          { id: "geo-accuracy", label: "Độ chính xác cao (enableHighAccuracy):", type: "select", options: [{ value: "true", label: "Bật (GPS thật)" }, { value: "false", label: "Tắt (Tiết kiệm pin / Wi-Fi IP)" }] },
          { id: "geo-timeout", label: "Thời gian chờ tối đa (Timeout ms):", type: "text", value: "10000" }
        ],
        actions: [
          { id: "btn-get-pos", label: "Lấy Toạ Độ Ngay", variant: "primary", handler: "getPosition" }
        ],
        previewBox: {
          id: "pos-result-box",
          initialText: "Chưa truy vấn vị trí."
        }
      },
      {
        id: "panel-watch-position",
        title: "2. Theo Dõi Vị Trí Liên Tục (watchPosition)",
        badge: "watchPosition()",
        desc: "Lắng nghe sự dịch chuyển của thiết bị theo thời gian thực (hữu ích cho tracking lộ trình).",
        actions: [
          { id: "btn-start-watch", label: "Bắt Đầu Theo Dõi", variant: "secondary", handler: "startWatch" },
          { id: "btn-stop-watch", label: "Dừng Theo Dõi (clearWatch)", variant: "danger", handler: "stopWatch" }
        ],
        previewBox: {
          id: "watch-result-box",
          initialText: "Trạng thái: Chưa bắt đầu theo dõi."
        }
      }
    ]
  };

  function formatCoords(coords, timestamp) {
    return `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
        <div>• Vĩ độ (Latitude): <strong style="color:#38bdf8;">${coords.latitude.toFixed(6)}°</strong></div>
        <div>• Kinh độ (Longitude): <strong style="color:#38bdf8;">${coords.longitude.toFixed(6)}°</strong></div>
        <div>• Độ chính xác (Accuracy): <code>±${Math.round(coords.accuracy)} mét</code></div>
        <div>• Độ cao (Altitude): <code>${coords.altitude !== null ? coords.altitude + ' m' : 'Không có'}</code></div>
        <div>• Hướng di chuyển (Heading): <code>${coords.heading !== null ? coords.heading + '°' : 'Không có'}</code></div>
        <div>• Tốc độ (Speed): <code>${coords.speed !== null ? coords.speed + ' m/s' : 'Không có'}</code></div>
      </div>
      <div style="margin-top:8px; font-size:0.8rem; color:var(--text-muted);">
        Thời gian: ${new Date(timestamp).toLocaleTimeString()}
        | <a href="https://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}&zoom=15" target="_blank" style="color:#34d399; text-decoration:underline;">Xem trên OpenStreetMap ↗</a>
      </div>
    `;
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Geolocation API sẵn sàng");
    },

    getPosition: (ctx) => {
      if (!navigator.geolocation) {
        ctx.warn("Trình duyệt không hỗ trợ Geolocation API.");
        return;
      }
      const highAcc = ctx.getVal('geo-accuracy') === 'true';
      const timeout = parseInt(ctx.getVal('geo-timeout'), 10) || 10000;

      ctx.workflowStep(`Gọi navigator.geolocation.getCurrentPosition({ highAccuracy: ${highAcc}, timeout: ${timeout} })`);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          ctx.success("Đã nhận toạ độ thành công:", {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          });
          ctx.setHtml('pos-result-box', formatCoords(pos.coords, pos.timestamp));
        },
        (err) => {
          const reasons = {
            1: "PERMISSION_DENIED (Người dùng từ chối cấp quyền vị trí)",
            2: "POSITION_UNAVAILABLE (Không thể xác định vị trí vệ tinh/mạng)",
            3: "TIMEOUT (Hết thời gian chờ)"
          };
          ctx.error(`Lỗi định vị [Mã ${err.code}]: ${reasons[err.code] || err.message}`);
          ctx.setHtml('pos-result-box', `<span style="color:#f87171;">✖ ${reasons[err.code] || err.message}</span>`);
        },
        {
          enableHighAccuracy: highAcc,
          timeout: timeout,
          maximumAge: 0
        }
      );
    },

    startWatch: (ctx) => {
      if (!navigator.geolocation) {
        ctx.warn("Trình duyệt không hỗ trợ Geolocation API.");
        return;
      }
      if (currentWatchId !== null) {
        ctx.warn("Đang theo dõi vị trí rồi. Watch ID: " + currentWatchId);
        return;
      }

      ctx.workflowStep("Bắt đầu theo dõi: navigator.geolocation.watchPosition()");
      currentWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          ctx.event("Vị trí cập nhật (watchPosition)", {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            speed: pos.coords.speed
          });
          ctx.setHtml('watch-result-box', `
            <div style="color:#34d399; font-weight:600; margin-bottom:4px;">● Đang theo dõi liên tục (Watch ID: ${currentWatchId})</div>
            ${formatCoords(pos.coords, pos.timestamp)}
          `);
        },
        (err) => {
          ctx.error("Lỗi khi theo dõi vị trí:", err.message);
        },
        { enableHighAccuracy: true }
      );

      ctx.info(`Đã đăng ký watchPosition thành công. ID: ${currentWatchId}`);
    },

    stopWatch: (ctx) => {
      ctx.workflowStep("Dừng theo dõi: navigator.geolocation.clearWatch()");
      if (currentWatchId !== null) {
        if (navigator.geolocation) navigator.geolocation.clearWatch(currentWatchId);
        ctx.success(`Đã huỷ theo dõi Watch ID: ${currentWatchId}`);
        currentWatchId = null;
        ctx.setHtml('watch-result-box', 'Trạng thái: Đã dừng theo dõi.');
      } else {
        ctx.warn("Không có phiên theo dõi nào đang chạy.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
