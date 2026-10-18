// webapis/file/script.js - File API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let selectedFile = null;

  const fileSpec = {
    id: "file",
    name: "File API",
    group: "F",
    category: "Data & Binary",
    status: "Standard",
    support: { chrome: "Yes", edge: "Yes", firefox: "Yes", safari: "Yes" },
    supportCheck: () => 'File' in window && 'FileReader' in window,
    why: "Cung cấp giao diện chuẩn để web app đọc metadata (kích thước, định dạng MIME, thời gian sửa) và đọc nội dung tệp tin do người dùng chọn dưới dạng text, Data URL (ảnh xem trước) hoặc ArrayBuffer hoàn toàn tại client mà không cần upload lên server.",
    whenToUse: "Xem trước ảnh chụp trước khi upload, phân tích file CSV/JSON offline, chia nhỏ file lớn thành nhiều chunk (file.slice) để upload nhiều phần (resumable upload).",
    whenNotToUse: "Ghi hoặc sửa trực tiếp tệp tin trên ổ đĩa máy tính (cần dùng File System Access API).",
    coreItems: [
      "file.name, file.size, file.type, file.lastModified",
      "file.slice(start, end, contentType)",
      "FileReader.prototype.readAsText(file)",
      "FileReader.prototype.readAsDataURL(file)",
      "FileReader.prototype.readAsArrayBuffer(file)"
    ],
    panels: [
      {
        id: "panel-pick-file",
        title: "1. Chọn Tệp Tin & Trích Xuất Metadata",
        badge: "File / FileList",
        desc: "Chọn bất kỳ tệp tin nào từ máy tính để phân tích kích thước, định dạng và cắt lát (chunking).",
        actions: [
          { id: "btn-slice-chunk", label: "Cắt 512 Byte Đầu Tiên (file.slice)", variant: "secondary", handler: "sliceFile" }
        ],
        customHtml: `
          <div class="file-drop-area" id="drop-zone">
            <span style="font-size:1.5rem;">📁</span>
            <div style="font-weight:600;color:#fff;margin-top:4px;">Kéo thả tệp vào đây hoặc nhấn để chọn</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">(Hỗ trợ mọi định dạng: txt, json, png, jpg, pdf...)</div>
            <input type="file" id="real-file-input" style="display:none;">
          </div>
          <img id="image-preview-element" alt="Xem trước ảnh">
        `,
        previewBox: {
          id: "file-meta-box",
          initialText: "Chưa chọn tệp tin nào."
        }
      },
      {
        id: "panel-read-content",
        title: "2. Đọc Nội Dung Tệp Bằng FileReader",
        badge: "FileReader.readAs...",
        desc: "Đọc nội dung tệp tin dưới dạng chuỗi văn bản (readAsText) hoặc chuỗi Base64 Data URL (readAsDataURL).",
        actions: [
          { id: "btn-read-text", label: "Đọc Dạng Văn Bản (readAsText)", variant: "primary", handler: "readAsText" },
          { id: "btn-read-dataurl", label: "Đọc Dạng Data URL (readAsDataURL)", variant: "secondary", handler: "readAsDataUrl" },
          { id: "btn-read-arraybuffer", label: "Đọc Dạng Nhị Phân (readAsArrayBuffer)", variant: "secondary", handler: "readAsArrayBuffer" }
        ],
        previewBox: {
          id: "file-content-box",
          initialText: "Nội dung tệp sẽ hiển thị tại đây sau khi đọc."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường File API sẵn sàng");
      setupDropZone(ctx);
    },

    readAsText: (ctx) => {
      if (!selectedFile) {
        ctx.warn("Hãy chọn một tệp tin trước.");
        return;
      }

      ctx.workflowStep(`Khởi tạo reader = new FileReader() và đọc file "${selectedFile.name}" dạng text`);
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target.result;
        ctx.success(`Đọc xong tệp text (${text.length} ký tự):`, text.substring(0, 100));
        ctx.setHtml('file-content-box', `
          <div style="font-weight:600;color:#34d399;">Nội dung đọc được (200 ký tự đầu):</div>
          <pre style="margin-top:4px;max-height:100px;overflow-y:auto;font-family:var(--font-mono);font-size:0.75rem;color:#38bdf8;white-space:pre-wrap;">${ctx.escapeHtml(text.substring(0, 300))}</pre>
        `);
      };

      reader.onerror = () => ctx.error("Lỗi khi đọc file bằng FileReader:", reader.error);
      reader.readAsText(selectedFile);
    },

    readAsDataUrl: (ctx) => {
      if (!selectedFile) {
        ctx.warn("Hãy chọn một tệp tin trước.");
        return;
      }

      ctx.workflowStep(`Gọi reader.readAsDataURL() cho file: ${selectedFile.name}`);
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target.result;
        ctx.success(`Tạo Data URL thành công! Độ dài chuỗi base64: ${dataUrl.length} ký tự.`);

        if (selectedFile.type.startsWith('image/')) {
          const img = ctx.getEl('image-preview-element');
          if (img) {
            img.src = dataUrl;
            img.style.display = 'block';
          }
        }

        ctx.setHtml('file-content-box', `
          <div>Data URL (Base64 preview):</div>
          <code style="font-size:0.72rem;color:#93c5fd;word-break:break-all;">${dataUrl.substring(0, 100)}...</code>
        `);
      };

      reader.readAsDataURL(selectedFile);
    },

    readAsArrayBuffer: (ctx) => {
      if (!selectedFile) { ctx.warn("Hãy chọn một tệp tin trước."); return; }

      ctx.workflowStep(`Gọi reader.readAsArrayBuffer() cho file: ${selectedFile.name}`);
      const reader = new FileReader();

      reader.onload = (e) => {
        const buffer = e.target.result;
        ctx.success(`Đã nạp ArrayBuffer vào RAM thành công! ByteLength: ${buffer.byteLength} bytes.`);
        ctx.setHtml('file-content-box', `<div>Đã chuyển tệp sang <strong>ArrayBuffer</strong> nhị phân (${buffer.byteLength} bytes). Sẵn sàng truyền sang Web Worker hoặc WebAssembly!</div>`);
      };

      reader.readAsArrayBuffer(selectedFile);
    },

    sliceFile: (ctx) => {
      if (!selectedFile) { ctx.warn("Hãy chọn một tệp tin trước."); return; }

      ctx.workflowStep(`Thực thi file.slice(0, 512) để lấy 512 byte đầu tiên`);
      const chunk = selectedFile.slice(0, Math.min(512, selectedFile.size));

      ctx.success(`Tạo thành công Blob chunk: kích thước ${chunk.size} bytes (loại: ${chunk.type || 'unknown'})`);
      ctx.info("Kỹ thuật này dùng trong các thư viện TUS / S3 multipart upload để chia nhỏ file 10GB thành các phần 5MB tải song song!");
    }
  };

  function setupDropZone(ctx) {
    const dropZone = ctx.getEl('drop-zone');
    const realInput = ctx.getEl('real-file-input');

    dropZone.addEventListener('click', () => realInput.click());

    realInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileSelection(e.target.files[0], ctx);
      }
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = '#10b981';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'rgba(99, 102, 241, 0.4)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      if (e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files[0], ctx);
      }
    });
  }

  function handleFileSelection(file, ctx) {
    selectedFile = file;
    ctx.workflowStep(`Người dùng đã chọn tệp: "${file.name}"`, {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type || '(Không xác định MIME)',
      lastModified: new Date(file.lastModified).toLocaleString()
    });

    ctx.setHtml('file-meta-box', `
      <div>• Tên tệp: <strong style="color:#38bdf8;">${file.name}</strong></div>
      <div>• Kích thước: <strong>${(file.size / 1024).toFixed(2)} KB</strong> (${file.size} bytes)</div>
      <div>• Định dạng MIME: <code>${file.type || 'application/octet-stream'}</code></div>
      <div>• Lần sửa đổi cuối: <span>${new Date(file.lastModified).toLocaleString()}</span></div>
    `);

    // Tự động xem trước nếu là ảnh
    if (file.type.startsWith('image/')) {
      handlers.readAsDataUrl(ctx);
    }
  }

  WebAPICore.renderApp(fileSpec, handlers);
})();
