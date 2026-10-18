// webapis/webhid/script.js - WebHID API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let connectedDevices = [];

  const spec = {
    id: "webhid",
    panels: [
      {
        id: "panel-hid-devices",
        title: "1. Kết Nối Thiết Bị Giao Tiếp HID (Bàn Phím Cơ / Stream Deck)",
        badge: "navigator.hid",
        desc: "Giao tiếp trực tiếp với các thiết bị Human Interface Devices (HID) chuyên dụng qua cổng USB hoặc Bluetooth.",
        actions: [
          { id: "btn-request-hid", label: "Quét & Kết Nối Thiết Bị HID (requestDevice)", variant: "primary", handler: "requestDevice" },
          { id: "btn-list-hid", label: "Xem Thiết Bị Đã Ghép Đôi (getDevices)", variant: "secondary", handler: "listDevices" },
          { id: "btn-simulate-hid", label: "Giả Lập Bàn Phím Cơ HID (Simulate Macro Pad)", variant: "secondary", handler: "simulateHidDevice" }
        ],
        previewBox: {
          id: "hid-status-box",
          initialText: "Chưa kết nối thiết bị HID nào."
        }
      }
    ]
  };

  function renderDevicesList(ctx, devices) {
    if (!devices || devices.length === 0) {
      ctx.setHtml('hid-status-box', '<div style="color:var(--text-muted);">Không có thiết bị HID nào được kết nối. Nhấn nút "Giả Lập" để kiểm thử.</div>');
      return;
    }

    let rowsHtml = '';
    devices.forEach(d => {
      rowsHtml += `
        <div style="background:rgba(0,0,0,0.3); padding:8px 10px; border-radius:6px; margin-bottom:6px;">
          <div>• Tên: <strong style="color:#38bdf8;">${d.productName || 'Thiết bị HID'}</strong></div>
          <div style="font-size:0.75rem; color:var(--text-muted);">
            Vendor ID: <code>0x${(d.vendorId || 0).toString(16).padStart(4, '0')}</code> | 
            Product ID: <code>0x${(d.productId || 0).toString(16).padStart(4, '0')}</code> | 
            Trạng thái: <span class="badge ${d.opened ? 'badge-success' : 'badge-warning'}">${d.opened ? 'Đang mở (Opened)' : 'Chưa mở'}</span>
          </div>
        </div>
      `;
    });

    ctx.setHtml('hid-status-box', `
      <div style="color:#34d399; font-weight:700; margin-bottom:6px;">● Danh sách thiết bị HID:</div>
      ${rowsHtml}
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường WebHID API sẵn sàng");
      if (!('hid' in navigator)) {
        ctx.warn("navigator.hid không được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome / Edge).");
      } else {
        ctx.success("navigator.hid sẵn sàng!");
        handlers.listDevices(ctx);
      }
    },

    requestDevice: async (ctx) => {
      if (!('hid' in navigator)) {
        ctx.error("WebHID không khả dụng.");
        return;
      }

      ctx.workflowStep("Gọi navigator.hid.requestDevice({ filters: [] })");
      try {
        const devices = await navigator.hid.requestDevice({ filters: [] });
        if (devices.length > 0) {
          const dev = devices[0];
          ctx.success(`Đã chọn thiết bị: ${dev.productName}`);
          await dev.open();
          dev.addEventListener('inputreport', (e) => {
            ctx.event("Báo cáo tín hiệu HID Input Report:", {
              reportId: e.reportId,
              data: Array.from(new Uint8Array(e.data.buffer))
            });
          });
          handlers.listDevices(ctx);
        } else {
          ctx.warn("Người dùng đã huỷ chọn thiết bị.");
        }
      } catch (err) {
        ctx.error("Lỗi kết nối HID:", err.message);
      }
    },

    listDevices: async (ctx) => {
      if (!('hid' in navigator)) return;
      ctx.workflowStep("Gọi navigator.hid.getDevices()");
      const devices = await navigator.hid.getDevices();
      connectedDevices = devices;
      renderDevicesList(ctx, devices);
    },

    simulateHidDevice: (ctx) => {
      ctx.workflowStep("Khởi động thiết bị giả lập Macro Pad QMK/VIA");
      const mockDev = {
        productName: "Custom Mechanical Macro Pad (Simulated)",
        vendorId: 0xfeed,
        productId: 0x0001,
        opened: true
      };

      ctx.success("Thiết bị HID giả lập đã kết nối!");
      renderDevicesList(ctx, [mockDev]);

      // Mô phỏng nhận input report
      setTimeout(() => {
        ctx.event("HID Input Report Simulator: Người dùng bấm phím Macro #1 [M1]", { keycode: "KC_F13" });
      }, 1000);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
