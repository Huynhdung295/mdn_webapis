// webapis/webusb/script.js - WebUSB API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "webusb",
    panels: [
      {
        id: "panel-webusb-devices",
        title: "1. Kết Nối Thiết Bị Phần Cứng Cổng USB (Arduino / Vi Điều Khiển)",
        badge: "navigator.usb",
        desc: "Giao tiếp nhị phân trực tiếp với các thiết bị phần cứng cắm cổng USB (vi điều khiển, cân điện tử, máy in hoá đơn...) ngay từ web mà không cần cài driver riêng.",
        actions: [
          { id: "btn-request-usb", label: "Quét & Kết Nối Thiết Bị USB (requestDevice)", variant: "primary", handler: "requestUsbDevice" },
          { id: "btn-list-usb", label: "Xem Thiết Bị Đã Ghép Đôi (getDevices)", variant: "secondary", handler: "listUsbDevices" },
          { id: "btn-simulate-arduino", label: "Giả Lập Vi Điều Khiển Arduino USB", variant: "secondary", handler: "simulateArduino" }
        ],
        previewBox: {
          id: "usb-status-box",
          initialText: "Đang kiểm tra WebUSB API..."
        }
      }
    ]
  };

  function renderUsbDevices(ctx, devices) {
    if (!devices || devices.length === 0) {
      ctx.setHtml('usb-status-box', '<div style="color:var(--text-muted);">Không có thiết bị USB nào được cấp quyền. Bấm "Giả Lập" để kiểm thử.</div>');
      return;
    }

    let rowsHtml = '';
    devices.forEach(d => {
      rowsHtml += `
        <div style="background:rgba(0,0,0,0.3); padding:8px 10px; border-radius:6px; margin-bottom:6px;">
          <div>• Tên: <strong style="color:#38bdf8;">${d.productName || 'USB Device'}</strong> (${d.manufacturerName || 'Vendor'})</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">
            Vendor ID: <code>0x${(d.vendorId || 0).toString(16).padStart(4, '0')}</code> | 
            Product ID: <code>0x${(d.productId || 0).toString(16).padStart(4, '0')}</code> | 
            Phiên bản USB: <code>${d.usbVersionMajor || 2}.${d.usbVersionMinor || 0}</code>
          </div>
        </div>
      `;
    });

    ctx.setHtml('usb-status-box', `
      <div style="color:#34d399; font-weight:700; margin-bottom:6px;">● Thiết bị USB đang kết nối:</div>
      ${rowsHtml}
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường WebUSB API khởi động");
      if (!('usb' in navigator)) {
        ctx.warn("navigator.usb không được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome / Edge).");
        ctx.setHtml('usb-status-box', '<span style="color:#f87171;">navigator.usb không khả dụng. Bạn có thể bấm "Giả Lập" để kiểm tra luồng xử lý.</span>');
      } else {
        ctx.success("navigator.usb khả dụng!");
        handlers.listUsbDevices(ctx);
      }
    },

    requestUsbDevice: async (ctx) => {
      if (!('usb' in navigator)) return;
      ctx.workflowStep("Gọi navigator.usb.requestDevice({ filters: [] })");

      try {
        const device = await navigator.usb.requestDevice({ filters: [] });
        ctx.success(`Đã cấp quyền cho thiết bị: ${device.productName}`);
        await device.open();
        ctx.info("Đã mở kết nối device.open()");
        handlers.listUsbDevices(ctx);
      } catch (err) {
        if (err.name === 'NotFoundError') {
          ctx.warn("Người dùng đã huỷ hộp thoại chọn thiết bị USB.");
        } else {
          ctx.error("Lỗi WebUSB:", err.message);
        }
      }
    },

    listUsbDevices: async (ctx) => {
      if (!('usb' in navigator)) return;
      ctx.workflowStep("Gọi navigator.usb.getDevices()");
      const devices = await navigator.usb.getDevices();
      renderUsbDevices(ctx, devices);
    },

    simulateArduino: (ctx) => {
      ctx.workflowStep("Mô phỏng cắm mạch vi điều khiển Arduino Uno qua cổng USB");
      const mockDev = {
        productName: "Arduino Uno R3 (Atmega328P)",
        manufacturerName: "Arduino LLC",
        vendorId: 0x2341,
        productId: 0x0043,
        usbVersionMajor: 2,
        usbVersionMinor: 0
      };

      ctx.success("Mô phỏng vi điều khiển USB thành công!");
      renderUsbDevices(ctx, [mockDev]);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
