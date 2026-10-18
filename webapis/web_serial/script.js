// webapis/web_serial/script.js - Web Serial API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let currentSerialPort = null;
  let reader = null;

  const spec = {
    id: "web_serial",
    panels: [
      {
        id: "panel-serial-connect",
        title: "1. Kết Nối Cổng Nối Tiếp COM / USB Serial",
        badge: "navigator.serial.requestPort()",
        desc: "Giao tiếp trực tiếp với vi điều khiển (Arduino, ESP32, Raspberry Pi Pico), máy in 3D hoặc cảm biến công nghiệp qua giao thức UART/Serial.",
        inputs: [
          {
            id: "select-baud-rate",
            type: "select",
            label: "Tốc độ truyền (Baud Rate):",
            options: [
              { value: "115200", label: "115,200 baud (ESP32 / Chuẩn hiện đại)" },
              { value: "9600", label: "9,600 baud (Arduino Uno mặc định)" },
              { value: "57600", label: "57,600 baud" }
            ]
          }
        ],
        actions: [
          { id: "btn-request-port", label: "🔌 Chọn Cổng COM & Kết Nối (requestPort)", variant: "primary", handler: "connectSerialPort" },
          { id: "btn-close-port", label: "Ngắt Kết Nối Cổng (Close)", variant: "danger", handler: "closeSerialPort" }
        ],
        previewBox: {
          id: "port-info-box",
          initialText: "Chưa kết nối cổng Serial nào."
        }
      },
      {
        id: "panel-serial-terminal",
        title: "2. Gửi & Nhận Lệnh Qua Terminal (Read / Write)",
        badge: "port.readable & port.writable",
        desc: "Gửi chuỗi ký tự xuống vi điều khiển và đọc luồng phản hồi nhị phân trả về theo thời gian thực.",
        inputs: [
          {
            id: "input-command-text",
            type: "text",
            label: "Lệnh gửi xuống vi điều khiển:",
            value: "AT+STATUS"
          }
        ],
        actions: [
          { id: "btn-send-serial", label: "Gửi Lệnh (Write to Port)", variant: "primary", handler: "sendCommand" },
          { id: "btn-simulate-arduino", label: "Giả Lập Dữ Liệu Cảm Biến Arduino (Demo)", variant: "secondary", handler: "simulateArduino" }
        ],
        customHtml: `
          <div style="margin-top: 10px;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Màn hình Console UART (Serial Monitor):</div>
            <div id="serial-terminal-log" class="serial-terminal">
              [SYSTEM] Sẵn sàng giao tiếp Serial...
            </div>
          </div>
        `
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Web Serial API");
      if (!('serial' in navigator)) {
        ctx.warn("Web Serial API chỉ hỗ trợ trên trình duyệt nhân Chromium (Chrome, Edge, Opera) trên máy tính để bàn (Windows, macOS, Linux, ChromeOS).");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ Web Serial API!");
      }
    },

    connectSerialPort: async (ctx) => {
      const baudRate = Number(ctx.getVal('select-baud-rate')) || 115200;
      ctx.workflowStep(`Yêu cầu mở cổng Serial với baudRate: ${baudRate}`);

      if (!('serial' in navigator)) {
        ctx.warn("Không có Web Serial native, chuyển sang mô phỏng...");
        handlers.simulateArduino(ctx);
        return;
      }

      try {
        const port = await navigator.serial.requestPort();
        currentSerialPort = port;

        const info = port.getInfo();
        ctx.success("Người dùng đã cấp quyền mở cổng Serial:", {
          usbVendorId: info.usbVendorId,
          usbProductId: info.usbProductId
        });

        await port.open({ baudRate: baudRate });
        ctx.success(`Đã mở cổng Serial thành công với tốc độ ${baudRate} baud!`);

        ctx.setHtml('port-info-box', `
          <div style="color:#34d399; font-weight:600;">✔ ĐÃ MỞ CỔNG SERIAL!</div>
          <div style="font-size:0.8rem; margin-top:2px;">
            USB VID: <code>0x${(info.usbVendorId || 0).toString(16)}</code> | PID: <code>0x${(info.usbProductId || 0).toString(16)}</code> | Baud: <strong>${baudRate}</strong>
          </div>
        `);

        // Bắt đầu đọc stream ngầm
        readSerialStream(port, ctx);
      } catch (err) {
        if (err.name === 'NotFoundError') {
          ctx.warn("Người dùng đã đóng hoặc huỷ chọn cổng COM.", err);
        } else {
          ctx.error(`Lỗi mở cổng Serial: ${err.message}`, err);
          handlers.simulateArduino(ctx);
        }
      }
    },

    sendCommand: async (ctx) => {
      const cmd = ctx.getVal('input-command-text') || 'AT';
      ctx.workflowStep(`Gửi lệnh xuống Serial: "${cmd}\\r\\n"`);

      appendTerminalLine(`> ${cmd}`);

      if (currentSerialPort && currentSerialPort.writable) {
        try {
          const textEncoder = new TextEncoderStream();
          const writableStreamClosed = textEncoder.readable.pipeTo(currentSerialPort.writable);
          const writer = textEncoder.writable.getWriter();
          await writer.write(cmd + "\r\n");
          writer.releaseLock();
          ctx.success(`Đã truyền "${cmd}" thành công qua Tx line.`);
        } catch (err) {
          ctx.error(`Lỗi gửi dữ liệu: ${err.message}`, err);
        }
      } else {
        ctx.warn("Cổng Serial chưa mở vật lý. Đang mô phỏng phản hồi...");
        setTimeout(() => {
          appendTerminalLine(`[MOCK RESP] OK: Command "${cmd}" acknowledged. Sensor temp=28.4°C`);
          ctx.success("Mô phỏng phản hồi từ chip thành công.");
        }, 300);
      }
    },

    closeSerialPort: async (ctx) => {
      ctx.workflowStep("Đóng cổng Serial");
      try {
        if (reader) {
          await reader.cancel();
          reader = null;
        }
        if (currentSerialPort) {
          await currentSerialPort.close();
          currentSerialPort = null;
        }
        ctx.success("Đã đóng an toàn cổng Serial.");
        ctx.setHtml('port-info-box', 'Cổng Serial đã đóng.');
        appendTerminalLine("[SYSTEM] Port closed.");
      } catch (err) {
        ctx.error(`Lỗi đóng cổng: ${err.message}`, err);
      }
    },

    simulateArduino: (ctx) => {
      ctx.workflowStep("[GIẢ LẬP] Mô phỏng kết nối vi điều khiển Arduino ESP32");
      ctx.setHtml('port-info-box', `
        <div style="color:#34d399; font-weight:600;">✔ [MÔ PHỎNG] KẾT NỐI ARDUINO ESP32 (COM3)</div>
        <div style="font-size:0.8rem; margin-top:2px;">Baud Rate: 115200 | Firmware: v2.1.0-Release</div>
      `);

      appendTerminalLine("[SIMULATOR] COM3 Connected at 115200 baud");
      appendTerminalLine("[ESP32] Booting FreeRTOS kernel...");
      appendTerminalLine("[ESP32] WiFi connected, IP: 192.168.1.105");
      appendTerminalLine("[DHT22] Humidity: 65.2% | Temperature: 27.8 C");
      ctx.success("Mô phỏng luồng dữ liệu UART thành công!");
    }
  };

  async function readSerialStream(port, ctx) {
    while (port.readable && !reader) {
      try {
        const textDecoder = new TextDecoderStream();
        port.readable.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) {
            appendTerminalLine(`< ${value}`);
            ctx.event("serial_read", { data: value });
          }
        }
      } catch (err) {
        break;
      }
    }
  }

  function appendTerminalLine(text) {
    const term = document.getElementById('serial-terminal-log');
    if (!term) return;
    const line = document.createElement('div');
    line.innerText = `[${new Date().toLocaleTimeString()}] ${text}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
  }

  WebAPICore.renderApp(spec, handlers);
})();
