// webapis/web_bluetooth/script.js - Web Bluetooth API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let connectedGattDevice = null;

  const spec = {
    id: "web_bluetooth",
    panels: [
      {
        id: "panel-ble-scan",
        title: "1. Quét & Ghép Nối Thiết Bị Bluetooth Low Energy (BLE)",
        badge: "navigator.bluetooth.requestDevice()",
        desc: "Mở hộp thoại quét sóng vô tuyến Bluetooth xung quanh (đồng hồ thông minh, cảm biến nhịp tim, thiết bị IoT) để kết nối GATT Server.",
        inputs: [
          {
            id: "select-ble-filter",
            type: "select",
            label: "Bộ lọc dịch vụ Bluetooth:",
            options: [
              { value: "all", label: "Quét tất cả thiết bị (acceptAllDevices: true)" },
              { value: "battery_service", label: "Thiết bị có dịch vụ pin (battery_service)" },
              { value: "heart_rate", label: "Dây đeo đo nhịp tim (heart_rate)" }
            ]
          }
        ],
        actions: [
          { id: "btn-check-ble-radio", label: "Kiểm Tra Chip Bluetooth Máy Tính", variant: "secondary", handler: "checkRadioAvailability" },
          { id: "btn-scan-ble-devices", label: "📡 Quét Tìm Thiết Bị BLE", variant: "primary", handler: "scanDevices" },
          { id: "btn-simulate-ble", label: "Giả Lập Kết Nối Thiết Bị BLE (Demo)", variant: "secondary", handler: "simulateBleConnection" }
        ],
        previewBox: {
          id: "ble-device-preview-box",
          initialText: "Chưa kết nối thiết bị Bluetooth."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Web Bluetooth API");
      if (!('bluetooth' in navigator)) {
        ctx.warn("Web Bluetooth API chỉ hỗ trợ trên trình duyệt nhân Chromium (Chrome, Edge, Opera) và yêu cầu HTTPS hoặc localhost.");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ Web Bluetooth API!");
      }
    },

    checkRadioAvailability: async (ctx) => {
      ctx.workflowStep("Kiểm tra sóng Bluetooth qua navigator.bluetooth.getAvailability()");

      if (!('bluetooth' in navigator && navigator.bluetooth.getAvailability)) {
        ctx.warn("Trình duyệt không hỗ trợ getAvailability.");
        return;
      }

      try {
        const available = await navigator.bluetooth.getAvailability();
        ctx.success(`Trạng thái chip Bluetooth của máy: ${available ? 'ĐÃ BẬT' : 'CHƯA BẬT HOẶC KHÔNG CÓ'}`);
        ctx.setHtml('ble-device-preview-box', `
          <div style="color:${available ? '#34d399' : '#f59e0b'}; font-weight:600;">
            ${available ? '✔ Phần cứng Bluetooth đã sẵn sàng kết nối.' : '● Máy tính chưa bật Bluetooth hoặc không có card Bluetooth.'}
          </div>
        `);
      } catch (err) {
        ctx.error(`Lỗi kiểm tra Bluetooth: ${err.message}`, err);
      }
    },

    scanDevices: async (ctx) => {
      const filterMode = ctx.getVal('select-ble-filter');
      ctx.workflowStep(`Bắt đầu quét thiết bị BLE (filter: ${filterMode})`);

      if (!('bluetooth' in navigator)) {
        ctx.warn("Không có Web Bluetooth, chuyển sang chế độ mô phỏng...");
        handlers.simulateBleConnection(ctx);
        return;
      }

      let options = {};
      if (filterMode === 'all') {
        options = { acceptAllDevices: true, optionalServices: ['battery_service', 'device_information'] };
      } else {
        options = { filters: [{ services: [filterMode] }] };
      }

      try {
        const device = await navigator.bluetooth.requestDevice(options);
        connectedGattDevice = device;

        ctx.success(`Đã ghép nối với thiết bị: "${device.name || 'Thiết bị không tên'}" (id: ${device.id})`);

        device.addEventListener('gattserverdisconnected', () => {
          ctx.warn(`Thiết bị "${device.name}" đã ngắt kết nối GATT.`);
          ctx.setHtml('ble-device-preview-box', 'Thiết bị đã ngắt kết nối.');
        });

        // Kết nối GATT Server
        ctx.workflowStep("Đang kết nối GATT Server (device.gatt.connect())...");
        const server = await device.gatt.connect();
        ctx.success("Đã kết nối GATT Server thành công!", { connected: server.connected });

        ctx.setHtml('ble-device-preview-box', `
          <div class="ble-device-card">
            <div class="ble-icon">📶</div>
            <div>
              <div style="font-weight:700; color:#38bdf8;">${device.name || 'BLE Device'}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">ID: ${device.id}</div>
              <div style="font-size:0.8rem; color:#34d399; margin-top:4px;">✔ GATT Server Connected: ${server.connected}</div>
            </div>
          </div>
        `);
      } catch (err) {
        if (err.name === 'NotFoundError') {
          ctx.warn("Người dùng đã huỷ hoặc không có thiết bị Bluetooth nào trong phạm vi.", err);
        } else {
          ctx.error(`Lỗi requestDevice: ${err.message}`, err);
          handlers.simulateBleConnection(ctx);
        }
      }
    },

    simulateBleConnection: (ctx) => {
      ctx.workflowStep("[GIẢ LẬP] Mô phỏng kết nối cảm biến nhịp tim & pin BLE");
      const mockBle = {
        name: "Polar H10 Heart Rate Sensor",
        id: "BLE-UUID-7A9B-44F2",
        gatt: { connected: true },
        services: ["0x180D (Heart Rate)", "0x180F (Battery Service)"],
        heartRateBpm: 72,
        batteryPercent: 88
      };

      ctx.success("Mô phỏng GATT Server kết nối thành công:", mockBle);
      ctx.setHtml('ble-device-preview-box', `
        <div class="ble-device-card">
          <div class="ble-icon">❤️</div>
          <div>
            <div style="font-weight:700; color:#38bdf8;">${mockBle.name}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">ID: ${mockBle.id}</div>
            <div style="font-size:0.85rem; color:#34d399; margin-top:4px;">
              Nhịp tim: <strong>${mockBle.heartRateBpm} BPM</strong> | Pin: <strong>${mockBle.batteryPercent}%</strong>
            </div>
          </div>
        </div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
