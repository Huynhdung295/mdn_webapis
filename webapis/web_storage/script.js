// webapis/web_storage/script.js - Web Storage API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "web_storage",
    panels: [
      {
        id: "panel-storage-crud",
        title: "1. Lưu Trữ Khóa-Giá Trị (localStorage vs sessionStorage)",
        badge: "localStorage & sessionStorage",
        desc: "Thao tác đồng bộ dữ liệu Key-Value: localStorage (tồn tại vĩnh viễn) và sessionStorage (tự xoá khi đóng tab).",
        inputs: [
          { id: "store-type", label: "Loại bộ nhớ:", type: "select", options: [
            { value: "local", label: "localStorage (Lưu vĩnh viễn)" },
            { value: "session", label: "sessionStorage (Lưu theo phiên đóng tab)" }
          ]},
          { id: "store-key", label: "Khóa (Key):", type: "text", value: "app_theme" },
          { id: "store-val", label: "Giá trị (Value):", type: "text", value: "dark_glassmorphic" }
        ],
        actions: [
          { id: "btn-set-item", label: "Lưu Giá Trị (setItem)", variant: "primary", handler: "setItem" },
          { id: "btn-get-item", label: "Đọc Giá Trị (getItem)", variant: "secondary", handler: "getItem" },
          { id: "btn-remove-item", label: "Xóa Khóa (removeItem)", variant: "danger", handler: "removeItem" },
          { id: "btn-refresh-list", label: "Tải Danh Sách Hiện Có", variant: "secondary", handler: "loadAllItems" }
        ],
        previewBox: {
          id: "storage-items-box",
          initialText: "Đang tải dữ liệu lưu trữ..."
        }
      }
    ]
  };

  function renderStorageTable(ctx) {
    const isLocal = ctx.getVal('store-type') === 'local';
    const storageObj = isLocal ? localStorage : sessionStorage;
    const name = isLocal ? 'localStorage' : 'sessionStorage';

    const keys = Object.keys(storageObj);
    if (keys.length === 0) {
      ctx.setHtml('storage-items-box', `<div style="color:var(--text-muted);">Không có dữ liệu nào trong ${name}.</div>`);
      return;
    }

    let rowsHtml = '';
    keys.forEach(k => {
      const val = storageObj.getItem(k);
      rowsHtml += `
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
          <td style="padding:6px 8px; font-family:var(--font-mono); color:#38bdf8; font-weight:700;"><code>${ctx.escapeHtml(k)}</code></td>
          <td style="padding:6px 8px; word-break:break-all;">${ctx.escapeHtml(val)}</td>
          <td style="padding:6px 8px; text-align:right;">
            <button type="button" class="btn btn-danger" style="padding:2px 8px; font-size:0.7rem;" data-del-key="${ctx.escapeHtml(k)}">Xóa</button>
          </td>
        </tr>
      `;
    });

    ctx.setHtml('storage-items-box', `
      <div style="font-weight:600; color:#34d399; margin-bottom:6px;">● Danh sách ${keys.length} mục trong ${name}:</div>
      <div style="max-height: 160px; overflow-y: auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
          <thead>
            <tr style="color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.1);">
              <th style="padding:6px 8px;">Key</th>
              <th style="padding:6px 8px;">Value</th>
              <th style="padding:6px 8px; text-align:right;">Hành động</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `);

    const box = document.getElementById('storage-items-box');
    box.querySelectorAll('[data-del-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.getAttribute('data-del-key');
        storageObj.removeItem(k);
        ctx.warn(`Đã xoá ${k} khỏi ${name}`);
        renderStorageTable(ctx);
      });
    });
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Storage API sẵn sàng");

      // Lắng nghe thay đổi từ các tab khác
      if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        window.addEventListener('storage', (e) => {
          ctx.event("Sự kiện storage từ tab khác:", {
            key: e.key,
            oldValue: e.oldValue,
            newValue: e.newValue,
            url: e.url
          });
          renderStorageTable(ctx);
        });
      }

      renderStorageTable(ctx);
    },

    setItem: (ctx) => {
      const isLocal = ctx.getVal('store-type') === 'local';
      const storageObj = isLocal ? localStorage : sessionStorage;
      const key = ctx.getVal('store-key');
      const val = ctx.getVal('store-val');

      if (!key) return;

      ctx.workflowStep(`${isLocal ? 'localStorage' : 'sessionStorage'}.setItem("${key}", "${val}")`);
      storageObj.setItem(key, val);
      ctx.success(`Đã lưu "${key}" thành công!`);
      renderStorageTable(ctx);
    },

    getItem: (ctx) => {
      const isLocal = ctx.getVal('store-type') === 'local';
      const storageObj = isLocal ? localStorage : sessionStorage;
      const key = ctx.getVal('store-key');

      ctx.workflowStep(`${isLocal ? 'localStorage' : 'sessionStorage'}.getItem("${key}")`);
      const val = storageObj.getItem(key);
      if (val !== null) {
        ctx.success(`Giá trị tìm thấy cho "${key}":`, val);
      } else {
        ctx.warn(`Khóa "${key}" không tồn tại.`);
      }
    },

    removeItem: (ctx) => {
      const isLocal = ctx.getVal('store-type') === 'local';
      const storageObj = isLocal ? localStorage : sessionStorage;
      const key = ctx.getVal('store-key');

      ctx.workflowStep(`${isLocal ? 'localStorage' : 'sessionStorage'}.removeItem("${key}")`);
      storageObj.removeItem(key);
      ctx.warn(`Đã xoá khóa "${key}".`);
      renderStorageTable(ctx);
    },

    loadAllItems: (ctx) => {
      renderStorageTable(ctx);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
