// webapis/compression_streams/script.js - Compression Streams API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let lastCompressedBytes = null;
  let originalRawString = '';

  const compSpec = {
    id: "compression_streams",
    name: "Compression Streams API",
    group: "C",
    category: "Data & Streams",
    status: "Standard",
    support: { chrome: "80+", edge: "80+", firefox: "113+", safari: "16.4+" },
    supportCheck: () => 'CompressionStream' in window && 'DecompressionStream' in window,
    why: "Nén và giải nén dữ liệu luồng (gzip, deflate) trực tiếp trong trình duyệt bằng Web Streams tiêu chuẩn, tiết kiệm 70-90% băng thông tải lên hoặc dung lượng lưu trữ IndexedDB mà không cần thư viện bên thứ 3.",
    whenToUse: "Nén log / telemetry trước khi gửi lên máy chủ; nén các tệp JSON, CSV, văn bản lớn xuất từ web; giải nén các tệp dữ liệu gzip tải về từ server.",
    whenNotToUse: "Các tệp dữ liệu vốn đã nén (ảnh JPEG, PNG, video MP4, tệp ZIP) - nén thêm chỉ làm tốn CPU mà không giảm dung lượng.",
    coreItems: [
      "new CompressionStream('gzip' | 'deflate' | 'deflate-raw')",
      "new DecompressionStream('gzip' | 'deflate' | 'deflate-raw')",
      "stream.pipeThrough(compressionStream)",
      "new Response(stream).arrayBuffer()"
    ],
    panels: [
      {
        id: "panel-compress",
        title: "1. Thử Nghiệm Nén Dữ Liệu GZIP (CompressionStream)",
        badge: "new CompressionStream('gzip')",
        desc: "Nhập một chuỗi văn bản dài (hoặc văn bản lặp lại) để quan sát hiệu quả nén.",
        inputs: [
          {
            id: "raw-text-input",
            label: "Dữ liệu văn bản gốc cần nén:",
            type: "textarea",
            rows: 4,
            value: "MDN Web APIs Interactive Laboratory. MDN Web APIs Interactive Laboratory. MDN Web APIs Interactive Laboratory. JavaScript Web Platform is incredible! ".repeat(15)
          },
          {
            id: "format-select",
            label: "Thuật toán nén:",
            type: "select",
            options: [
              { value: "gzip", label: "gzip (Phổ biến nhất, có header kiểm tra toàn vẹn)" },
              { value: "deflate", label: "deflate (Zlib RFC 1950)" },
              { value: "deflate-raw", label: "deflate-raw (Không có zlib wrapper)" }
            ]
          }
        ],
        actions: [
          { id: "btn-run-compress", label: "Bắt Đầu Nén (CompressionStream)", variant: "primary", handler: "compressData" },
          { id: "btn-run-decompress", label: "Giải Nén Ngược Lại (DecompressionStream)", variant: "secondary", handler: "decompressData" }
        ],
        previewBox: {
          id: "compress-stats-box",
          initialText: "Trạng thái: Chưa thực hiện nén."
        }
      },
      {
        id: "panel-decompressed-view",
        title: "2. Kiểm Tra Tính Toàn Vẹn Của Dữ Liệu Sau Khi Giải Nén",
        badge: "Data Integrity Verification",
        desc: "Đối chiếu chuỗi văn bản giải nén được với chuỗi gốc ban đầu để đảm bảo không bị sai lệch từng bit.",
        previewBox: {
          id: "decompressed-result-box",
          initialText: "Chưa có dữ liệu giải nén."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Compression Streams sẵn sàng");
    },

    compressData: async (ctx) => {
      if (!('CompressionStream' in window)) {
        ctx.error("Trình duyệt không hỗ trợ CompressionStream.");
        return;
      }

      const text = ctx.getVal('raw-text-input');
      const format = ctx.getVal('format-select') || 'gzip';
      originalRawString = text;

      ctx.workflowStep(`Chuyển text sang Blob và nén bằng new CompressionStream("${format}")`);
      const originalBytes = new TextEncoder().encode(text).length;

      try {
        const stream = new Blob([text]).stream();
        const compressedStream = stream.pipeThrough(new CompressionStream(format));
        const compressedBuffer = await new Response(compressedStream).arrayBuffer();
        lastCompressedBytes = new Uint8Array(compressedBuffer);

        const compSize = lastCompressedBytes.byteLength;
        const savedPct = Math.round(((originalBytes - compSize) / originalBytes) * 100);

        ctx.success(`Nén ${format.toUpperCase()} thành công: ${originalBytes} bytes -> ${compSize} bytes (Tiết kiệm ${savedPct}%)!`);
        ctx.setHtml('compress-stats-box', `
          <div>• Kích thước gốc ban đầu: <strong>${originalBytes} bytes</strong></div>
          <div>• Kích thước sau khi nén (${format}): <strong style="color:#34d399;">${compSize} bytes</strong></div>
          <div>• Tỷ lệ tiết kiệm băng thông: <strong style="color:#38bdf8;">${savedPct}%</strong></div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi nén dữ liệu:", err);
      }
    },

    decompressData: async (ctx) => {
      if (!lastCompressedBytes) {
        ctx.warn("Hãy bấm 'Bắt Đầu Nén' trước để có gói tin giải nén.");
        return;
      }

      const format = ctx.getVal('format-select') || 'gzip';
      ctx.workflowStep(`Giải nén bằng new DecompressionStream("${format}")`);

      try {
        const stream = new Blob([lastCompressedBytes]).stream();
        const decompressedStream = stream.pipeThrough(new DecompressionStream(format));
        const decompressedText = await new Response(decompressedStream).text();

        const isExactMatch = decompressedText === originalRawString;
        ctx.success(`Giải nén hoàn tất! Trùng khớp 100% với bản gốc: ${isExactMatch}`);

        ctx.setHtml('decompressed-result-box', `
          <div>Trạng thái: <strong style="color:${isExactMatch ? '#34d399' : '#f87171'}">${isExactMatch ? '✔ Toàn vẹn 100% (Khớp từng ký tự)' : '✖ Dữ liệu bị biến đổi'}</strong></div>
          <div style="margin-top:4px; max-height:80px; overflow-y:auto; color:var(--text-muted); font-size:0.75rem;">
            ${ctx.escapeHtml(decompressedText.substring(0, 200))}...
          </div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi giải nén:", err);
      }
    }
  };

  WebAPICore.renderApp(compSpec, handlers);
})();
