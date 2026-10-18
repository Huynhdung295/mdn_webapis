// webapis/html_drag_and_drop/script.js - HTML Drag and Drop API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  const spec = {
    id: "html_drag_and_drop",
    panels: [
      {
        id: "panel-dnd-items",
        title: "1. Kéo Thả Đối Tượng Nội Bộ (DataTransfer & EffectAllowed)",
        badge: "draggable='true' & e.dataTransfer",
        desc: "Kéo các thẻ công việc bên trái và thả vào Hộp Thả Đích bên phải để xem cơ chế đóng gói MIME type và dropEffect.",
        customHtml: `
          <div class="dnd-sandbox">
            <div class="drag-items-container">
              <div style="font-weight:600; font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">Nguồn Kéo (Draggable Items):</div>
              <div id="drag-item-1" class="draggable-card" draggable="true" data-type="task" data-id="TASK-101" data-title="Tối ưu SEO Landing Page">
                <span>📑 Task #101: Tối ưu SEO</span>
                <span class="badge badge-info">drag me</span>
              </div>
              <div id="drag-item-2" class="draggable-card" draggable="true" data-type="task" data-id="TASK-102" data-title="Sửa lỗi Memory Leak Canvas">
                <span>🐛 Task #102: Fix Memory Leak</span>
                <span class="badge badge-warning">urgent</span>
              </div>
              <div id="drag-item-3" class="draggable-card" draggable="true" data-type="task" data-id="TASK-103" data-title="Tích hợp WebAuthn Passkeys">
                <span>🔑 Task #103: Thêm Passkeys</span>
                <span class="badge badge-success">feature</span>
              </div>
            </div>

            <div>
              <div style="font-weight:600; font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">Khu Vực Thả (Drop Target):</div>
              <div id="drop-zone-1" class="drop-zone">
                <div style="font-size:2rem;">📥</div>
                <div style="font-size:0.85rem; color:var(--text-muted); text-align:center;">
                  Thả thẻ công việc vào đây<br>
                  <span style="font-size:0.75rem; color:#64748b;">(dragover, dragenter, drop)</span>
                </div>
                <div id="dropped-list-1" class="dropped-list"></div>
              </div>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-reset-dnd", label: "Làm Mới Hộp Thả", variant: "secondary", handler: "resetDropZone" }
        ]
      },
      {
        id: "panel-dnd-files",
        title: "2. Kéo Thả File Từ Máy Tính Vào Trình Duyệt (DataTransfer.files)",
        badge: "dataTransfer.files & items",
        desc: "Kéo bất kỳ file nào (hình ảnh, tài liệu, text) từ máy tính của bạn và thả trực tiếp vào ô bên dưới để trích xuất thông tin mà không cần upload lên server.",
        customHtml: `
          <div id="file-drop-zone" class="drop-zone" style="margin-top: 10px; min-height: 140px;">
            <div style="font-size:2rem;">📁</div>
            <div style="font-size:0.9rem; font-weight:600; color:var(--text-main);">
              Kéo thả tập tin từ máy tính vào đây
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted);">
              Tự động đọc MIME, dung lượng, thời gian sửa đổi
            </div>
            <div id="file-drop-results" class="dropped-list" style="margin-top:10px;"></div>
          </div>
        `
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo HTML Drag and Drop API sandbox");
      ctx.success("Trình duyệt hỗ trợ đầy đủ DataTransfer và Drag events!");

      // Thiết lập draggable items
      document.querySelectorAll('.draggable-card').forEach(el => {
        el.addEventListener('dragstart', (e) => {
          const itemData = {
            id: el.getAttribute('data-id'),
            title: el.getAttribute('data-title'),
            type: el.getAttribute('data-type')
          };
          e.dataTransfer.setData('application/json', JSON.stringify(itemData));
          e.dataTransfer.setData('text/plain', itemData.title);
          e.dataTransfer.effectAllowed = 'copyMove';

          ctx.event("dragstart", itemData);
          ctx.workflowStep(`Bắt đầu kéo phần tử [${itemData.id}]: "${itemData.title}"`);
        });

        el.addEventListener('dragend', (e) => {
          ctx.event("dragend", { dropEffect: e.dataTransfer.dropEffect });
        });
      });

      // Thiết lập Drop Zone 1 (Item drop)
      const dropZone1 = document.getElementById('drop-zone-1');
      const droppedList1 = document.getElementById('dropped-list-1');

      if (dropZone1) {
        dropZone1.addEventListener('dragenter', (e) => {
          e.preventDefault();
          dropZone1.classList.add('drag-over');
        });

        dropZone1.addEventListener('dragover', (e) => {
          e.preventDefault(); // Cực kỳ quan trọng: MDN bắt buộc preventDefault để cho phép drop!
          e.dataTransfer.dropEffect = 'move';
        });

        dropZone1.addEventListener('dragleave', () => {
          dropZone1.classList.remove('drag-over');
        });

        dropZone1.addEventListener('drop', (e) => {
          e.preventDefault();
          dropZone1.classList.remove('drag-over');

          const rawJson = e.dataTransfer.getData('application/json');
          if (rawJson) {
            try {
              const data = JSON.parse(rawJson);
              ctx.success(`Đã nhận sự kiện 'drop' với dữ liệu:`, data);

              const itemEl = document.createElement('div');
              itemEl.className = 'dropped-item';
              itemEl.innerHTML = `
                <span>✔ <strong>${data.id}</strong>: ${data.title}</span>
                <span style="font-size:0.75rem; color:#94a3b8;">${new Date().toLocaleTimeString()}</span>
              `;
              droppedList1.appendChild(itemEl);
            } catch (err) {
              ctx.error("Lỗi parse JSON khi thả:", err);
            }
          } else {
            const text = e.dataTransfer.getData('text/plain');
            ctx.success(`Thả dạng text: "${text}"`);
          }
        });
      }

      // Thiết lập File Drop Zone (External files)
      const fileZone = document.getElementById('file-drop-zone');
      const fileResults = document.getElementById('file-drop-results');

      if (fileZone) {
        fileZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          fileZone.classList.add('drag-over');
          e.dataTransfer.dropEffect = 'copy';
        });

        fileZone.addEventListener('dragleave', () => {
          fileZone.classList.remove('drag-over');
        });

        fileZone.addEventListener('drop', (e) => {
          e.preventDefault();
          fileZone.classList.remove('drag-over');

          const files = e.dataTransfer.files;
          if (files && files.length > 0) {
            ctx.workflowStep(`Đã phát hiện ${files.length} file thả từ máy tính`);
            fileResults.innerHTML = '';

            Array.from(files).forEach((file, idx) => {
              const sizeKb = (file.size / 1024).toFixed(1);
              ctx.success(`File #${idx + 1}: ${file.name} (${file.type || 'không rõ'}, ${sizeKb} KB)`);

              const fEl = document.createElement('div');
              fEl.className = 'dropped-item';
              fEl.innerHTML = `
                <span>📄 <strong>${file.name}</strong> (${sizeKb} KB, ${file.type || 'text/binary'})</span>
                <span class="badge badge-info">Sửa lần cuối: ${new Date(file.lastModified).toLocaleDateString()}</span>
              `;
              fileResults.appendChild(fEl);
            });
          } else {
            ctx.warn("Không có file nào trong e.dataTransfer.files.");
          }
        });
      }
    },

    resetDropZone: (ctx) => {
      ctx.setHtml('dropped-list-1', '');
      ctx.setHtml('file-drop-results', '');
      ctx.workflowStep("Đã làm trống danh sách các phần tử đã thả.");
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
