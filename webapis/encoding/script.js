// webapis/encoding/script.js - Encoding API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let lastEncodedBytes = null;

  const encSpec = {
    id: "encoding",
    name: "Encoding API",
    group: "E",
    category: "Data & Binary",
    status: "Standard",
    support: { chrome: "38+", edge: "79+", firefox: "19+", safari: "10.1+" },
    supportCheck: () => 'TextEncoder' in window && 'TextDecoder' in window,
    why: "Mã hoá chuỗi văn bản JavaScript (UTF-16) thành mảng nhị phân Uint8Array (UTF-8) và giải mã ngược lại các luồng byte nhị phân thành chuỗi ký tự hiển thị được, hỗ trợ đa bảng mã (UTF-8, Windows-1258 cho tiếng Việt, Shift-JIS, v.v.).",
    whenToUse: "Xử lý tệp tin nhị phân (ArrayBuffer, Blob, File), truyền nhận nhị phân qua WebSocket / WebTransport / WebRTC, giao tiếp chuyển đổi dữ liệu với module WebAssembly (WASM).",
    whenNotToUse: "Dữ liệu JSON chuỗi thuần túy không yêu cầu chuyển đổi mảng byte nhị phân.",
    coreItems: [
      "new TextEncoder().encode(string) -> Uint8Array",
      "new TextDecoder(encoding).decode(buffer) -> string",
      "encoder.encodeInto(string, destinationUint8Array)",
      "Bảng mã hỗ trợ: 'utf-8', 'windows-1258', 'shift_jis', 'iso-8859-1', v.v."
    ],
    panels: [
      {
        id: "panel-encode",
        title: "1. Mã Hoá Chuỗi Sang Mảng Byte (TextEncoder)",
        badge: "TextEncoder.prototype.encode",
        desc: "Mã hoá chuỗi tiếng Việt có dấu sang mảng các byte nhị phân UTF-8 (mỗi ký tự có dấu chiếm 2 đến 3 bytes).",
        inputs: [
          { id: "encode-input-text", label: "Chuỗi văn bản cần mã hoá:", type: "text", value: "Cộng hoà Xã hội Chủ nghĩa Việt Nam 🇻🇳", fullWidth: true }
        ],
        actions: [
          { id: "btn-run-encode", label: "Mã Hoá Sang Uint8Array (encode)", variant: "primary", handler: "runEncode" },
          { id: "btn-encode-into", label: "Ghi Vào Buffer Có Sẵn (encodeInto)", variant: "secondary", handler: "runEncodeInto" }
        ],
        previewBox: {
          id: "encode-result-box",
          initialText: "Chưa mã hoá."
        }
      },
      {
        id: "panel-decode",
        title: "2. Giải Mã Mảng Byte Sang Chuỗi (TextDecoder)",
        badge: "TextDecoder.prototype.decode",
        desc: "Đọc mảng byte nhị phân và chuyển thành chuỗi văn bản hiển thị theo bảng mã mong muốn.",
        inputs: [
          {
            id: "decode-encoding-select",
            label: "Bảng mã giải mã (Encoding format):",
            type: "select",
            options: [
              { value: "utf-8", label: "utf-8 (Tiêu chuẩn thế giới)" },
              { value: "windows-1258", label: "windows-1258 (Tiếng Việt Windows cũ)" },
              { value: "iso-8859-1", label: "iso-8859-1 (Latin-1)" }
            ]
          }
        ],
        actions: [
          { id: "btn-run-decode", label: "Giải Mã Byte Đang Có (decode)", variant: "primary", handler: "runDecode" }
        ],
        previewBox: {
          id: "decode-result-box",
          initialText: "Chưa giải mã."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Encoding API sẵn sàng");
      handlers.runEncode(ctx);
    },

    runEncode: (ctx) => {
      const text = ctx.getVal('encode-input-text');
      ctx.workflowStep(`Khởi tạo encoder = new TextEncoder() và encode("${text}")`);

      try {
        const encoder = new TextEncoder();
        lastEncodedBytes = encoder.encode(text);

        const hexArr = Array.from(lastEncodedBytes.slice(0, 30)).map(b => b.toString(16).padStart(2, '0')).join(' ');
        ctx.success(`Mã hoá thành công: "${text}" (${text.length} ký tự) -> ${lastEncodedBytes.length} bytes UTF-8!`);

        ctx.setHtml('encode-result-box', `
          <div>• Số ký tự chuỗi gốc: <strong>${text.length}</strong></div>
          <div>• Kích thước mảng byte UTF-8: <strong style="color:#34d399;">${lastEncodedBytes.length} bytes</strong></div>
          <div style="margin-top:4px;font-family:var(--font-mono);font-size:0.75rem;color:#38bdf8;word-break:break-all;">
            Hex preview (30 byte đầu): [${hexArr}${lastEncodedBytes.length > 30 ? ' ...' : ''}]
          </div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi mã hoá:", err);
      }
    },

    runEncodeInto: (ctx) => {
      const text = ctx.getVal('encode-input-text');
      ctx.workflowStep("Thử nghiệm encodeInto: Ghi trực tiếp vào bộ nhớ đệm ArrayBuffer định sẵn để tránh cấp phát bộ nhớ mới (Zero GC Allocation)");

      try {
        const encoder = new TextEncoder();
        // Cấp phát trước bộ nhớ đệm
        const buffer = new Uint8Array(256);
        const result = encoder.encodeInto(text, buffer);

        ctx.success(`encodeInto hoàn tất: read = ${result.read} ký tự, written = ${result.written} bytes!`);
        ctx.info("Kỹ thuật này cực kỳ quan trọng cho các ứng dụng hiệu năng cao (game, streaming, WASM).");
      } catch (err) {
        ctx.error("Lỗi encodeInto:", err);
      }
    },

    runDecode: (ctx) => {
      if (!lastEncodedBytes) {
        ctx.warn("Hãy bấm 'Mã Hoá' trước.");
        return;
      }

      const encFormat = ctx.getVal('decode-encoding-select') || 'utf-8';
      ctx.workflowStep(`Khởi tạo decoder = new TextDecoder("${encFormat}") và giải mã mảng byte...`);

      try {
        const decoder = new TextDecoder(encFormat);
        const decodedString = decoder.decode(lastEncodedBytes);

        ctx.success(`Giải mã thành công bằng "${encFormat}": "${decodedString}"`);
        ctx.setHtml('decode-result-box', `
          <div>Chuỗi nhận được: <strong style="color:#34d399;">"${ctx.escapeHtml(decodedString)}"</strong></div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">(Bảng mã sử dụng: ${encFormat})</div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi giải mã:", err);
      }
    }
  };

  WebAPICore.renderApp(encSpec, handlers);
})();
