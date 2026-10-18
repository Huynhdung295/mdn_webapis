// webapis/barcode_detection/script.js - Barcode Detection API: Workflow thực tế
(function() {
  'use strict';

  let supportedFormats = [];
  const canvas = document.getElementById('barcode-canvas');
  const ctx = canvas.getContext('2d');

  WebAPICore.init({
    id: "barcode_detection",
    name: "Barcode Detection API",
    group: "B",
    category: "Device & Sensors",
    status: "Standard",
    browserMatrix: {
      chrome: "83+",
      edge: "83+",
      firefox: "No",
      safari: "17+"
    },
    supportCheck: () => {
      return 'BarcodeDetector' in window;
    },
    why: "Tận dụng chip phần cứng (NPU/GPU) của thiết bị để quét mã vạch và mã QR trực tiếp từ ảnh tĩnh hoặc luồng camera cực nhanh, không cần nhúng các thư viện JS nặng nề (như jsQR 500KB-1MB).",
    whenToUse: "Ứng dụng web quét mã QR thanh toán (VietQR), quét mã vạch sản phẩm kiểm kho, quét vé điện tử trên camera điện thoại/laptop.",
    whenNotToUse: "Cần hỗ trợ các trình duyệt không bật Shape Detection (cần cơ chế fallback sang thư viện WASM).",
    coreItems: [
      "BarcodeDetector.getSupportedFormats()",
      "new BarcodeDetector({ formats: ['qr_code', 'ean_13', ...] })",
      "detector.detect(HTMLCanvasElement | HTMLImageElement | HTMLVideoElement)"
    ],
    onReady: function(core) {
      core.workflowStep("Khởi động môi trường Barcode Detection");
      setupListeners();
      drawInitialPattern();
    }
  });

  // Vẽ mẫu QR code chuẩn trên canvas
  function drawInitialPattern() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f172a';
    const size = 10;
    const offset = 30;

    // Vẽ 3 ô vuông định vị (Position markers) ở 3 góc
    function drawPositionMarker(x, y) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, 7 * size, 7 * size);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + size, y + size, 5 * size, 5 * size);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 2 * size, y + 2 * size, 3 * size, 3 * size);
    }

    drawPositionMarker(offset, offset);
    drawPositionMarker(canvas.width - offset - 7 * size, offset);
    drawPositionMarker(offset, canvas.height - offset - 7 * size);

    // Vẽ các khối dữ liệu ngẫu nhiên mô phỏng mã
    ctx.fillStyle = '#000000';
    for (let r = 0; r < 14; r++) {
      for (let c = 0; c < 14; c++) {
        if ((r * c + r + c) % 3 === 0) {
          ctx.fillRect(offset + 75 + c * 8, offset + 75 + r * 8, 8, 8);
        }
      }
    }
  }

  function setupListeners() {
    const btnFormats = document.getElementById('btn-get-formats');
    const btnDrawQR = document.getElementById('btn-draw-sample-qr');
    const btnDetect = document.getElementById('btn-detect-barcode');
    const fileInput = document.getElementById('file-upload-input');
    const formatsBox = document.getElementById('formats-container');
    const resultBox = document.getElementById('detection-result-box');

    // 1. Lấy định dạng hỗ trợ
    btnFormats.addEventListener('click', async () => {
      WebAPICore.workflowStep("Gọi BarcodeDetector.getSupportedFormats()");

      if (!('BarcodeDetector' in window)) {
        WebAPICore.warn("BarcodeDetector không khả dụng trên trình duyệt này.");
        formatsBox.innerHTML = `<span style="color:#f87171;">Trình duyệt chưa hỗ trợ API BarcodeDetector</span>`;
        return;
      }

      try {
        supportedFormats = await BarcodeDetector.getSupportedFormats();
        WebAPICore.success(`Tìm thấy ${supportedFormats.length} định dạng mã vạch hỗ trợ:`, supportedFormats);

        formatsBox.innerHTML = supportedFormats.map(fmt => `<span class="format-tag">${fmt}</span>`).join('');
      } catch (err) {
        WebAPICore.error("Lỗi khi tra cứu định dạng:", err);
      }
    });

    // 2. Vẽ lại mã mẫu
    btnDrawQR.addEventListener('click', () => {
      drawInitialPattern();
      resultBox.innerHTML = `<div>Đã tạo mẫu QR trên Canvas. Bấm "Nhận Diện Mã" để quét.</div>`;
      WebAPICore.workflowStep("Vẽ mã QR mẫu lên Canvas");
    });

    // 3. Nhận diện mã từ Canvas
    btnDetect.addEventListener('click', async () => {
      WebAPICore.workflowStep("Thực hiện detector.detect(canvas)");

      if (!('BarcodeDetector' in window)) {
        WebAPICore.warn("BarcodeDetector không khả dụng để quét ảnh thực tế (Cần Chrome/Edge/Safari 17+).");
        return;
      }

      try {
        const detector = new BarcodeDetector({ formats: supportedFormats.length ? supportedFormats : ['qr_code'] });
        const barcodes = await detector.detect(canvas);

        if (barcodes.length === 0) {
          WebAPICore.warn("Không tìm thấy mã vạch hợp lệ trong khung hình.");
          resultBox.innerHTML = `<div>Không tìm thấy mã vạch hợp lệ. Hãy thử tải ảnh mã QR thật từ máy tính lên.</div>`;
          return;
        }

        WebAPICore.success(`Phát hiện thành công ${barcodes.length} mã vạch!`, barcodes);

        // Hiển thị kết quả & vẽ bounding box
        resultBox.innerHTML = barcodes.map(b => `
          <div>• Định dạng: <strong style="color:#38bdf8;">${b.format}</strong></div>
          <div>• Nội dung giải mã: <strong style="color:#34d399;">${b.rawValue}</strong></div>
          <div>• Toạ độ BoundingBox: x=${b.boundingBox.x.toFixed(0)}, y=${b.boundingBox.y.toFixed(0)}, w=${b.boundingBox.width.toFixed(0)}, h=${b.boundingBox.height.toFixed(0)}</div>
        `).join('<hr style="border-color:rgba(255,255,255,0.1);margin:6px 0;">');

        // Vẽ khung bounding box màu xanh lá lên canvas
        barcodes.forEach(b => {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 4;
          ctx.strokeRect(b.boundingBox.x, b.boundingBox.y, b.boundingBox.width, b.boundingBox.height);
        });

      } catch (err) {
        WebAPICore.error("Lỗi trong quá trình quét:", err);
      }
    });

    // 4. Quét từ ảnh tải lên
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      WebAPICore.workflowStep(`Người dùng chọn ảnh: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          canvas.width = Math.min(img.width, 600);
          canvas.height = Math.min(img.height, 600);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          WebAPICore.info("Đã nạp ảnh lên Canvas. Đang tự động quét...");
          btnDetect.click();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

})();
