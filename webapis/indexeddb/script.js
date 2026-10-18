// webapis/indexeddb/script.js - IndexedDB API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const DB_NAME = "MDN_Interactive_Lab_DB";
  const DB_VERSION = 1;
  const STORE_NAME = "notes";
  let dbInstance = null;

  const spec = {
    id: "indexeddb",
    panels: [
      {
        id: "panel-idb-crud",
        title: "1. Thao Tác Cơ Sở Dữ Liệu NoSQL Client (CRUD)",
        badge: "IndexedDB Transaction",
        desc: "Thêm, đọc, cập nhật và xoá bản ghi với ObjectStore hỗ trợ tự tăng ID và Index danh mục.",
        inputs: [
          { id: "note-title", label: "Tiêu đề ghi chú:", type: "text", value: "Học Web APIs cấp tốc" },
          { id: "note-category", label: "Danh mục (Index):", type: "select", options: [
            { value: "Frontend", label: "Frontend" },
            { value: "Backend", label: "Backend" },
            { value: "DevOps", label: "DevOps" },
            { value: "Security", label: "Security" }
          ]},
          { id: "note-content", label: "Nội dung:", type: "textarea", rows: 2, value: "Nắm vững lý thuyết vì sao dùng, khi nào nên và không nên dùng." }
        ],
        actions: [
          { id: "btn-add-record", label: "Thêm Bản Ghi (store.add)", variant: "primary", handler: "addRecord" },
          { id: "btn-load-all", label: "Tải Tất Cả (store.getAll)", variant: "secondary", handler: "loadAllRecords" },
          { id: "btn-filter-category", label: "Lọc Theo Danh Mục (index.getAll)", variant: "secondary", handler: "filterByCategory" },
          { id: "btn-clear-store", label: "Xoá Toàn Bộ Dữ Liệu (store.clear)", variant: "danger", handler: "clearStore" }
        ],
        previewBox: {
          id: "idb-records-box",
          initialText: "Đang kết nối database..."
        }
      }
    ]
  };

  function openDatabase(ctx) {
    return new Promise((resolve, reject) => {
      if (dbInstance) return resolve(dbInstance);

      ctx.workflowStep(`Mở kết nối indexedDB.open("${DB_NAME}", ${DB_VERSION})`);
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        ctx.warn("Sự kiện onupgradeneeded: Khởi tạo ObjectStore & Index");

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
          store.createIndex("category", "category", { unique: false });
          store.createIndex("createdAt", "createdAt", { unique: false });
          ctx.info(`Đã tạo ObjectStore '${STORE_NAME}' với keyPath: 'id' và index: 'category'`);
        }
      };

      req.onsuccess = (e) => {
        dbInstance = e.target.result;
        ctx.success(`Kết nối IndexedDB thành công: ${dbInstance.name} (v${dbInstance.version})`);
        resolve(dbInstance);
      };

      req.onerror = (e) => {
        ctx.error("Lỗi kết nối IndexedDB:", e.target.error);
        reject(e.target.error);
      };
    });
  }

  function renderTable(ctx, records) {
    if (!records || records.length === 0) {
      ctx.setHtml('idb-records-box', '<div style="color:var(--text-muted);">Không có bản ghi nào trong ObjectStore.</div>');
      return;
    }

    let rowsHtml = '';
    records.forEach(r => {
      rowsHtml += `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 6px 8px; color: #38bdf8; font-weight:700;">#${r.id}</td>
          <td style="padding: 6px 8px; font-weight:600;">${ctx.escapeHtml(r.title)}</td>
          <td style="padding: 6px 8px;"><span class="badge badge-info">${ctx.escapeHtml(r.category)}</span></td>
          <td style="padding: 6px 8px; color: var(--text-muted); font-size:0.8rem;">${ctx.escapeHtml(r.content)}</td>
          <td style="padding: 6px 8px; text-align:right;">
            <button type="button" class="btn btn-danger" style="padding: 2px 8px; font-size: 0.7rem;" data-del-id="${r.id}">Xoá</button>
          </td>
        </tr>
      `;
    });

    ctx.setHtml('idb-records-box', `
      <div style="font-weight:600; color:#34d399; margin-bottom:8px;">● Tổng cộng ${records.length} bản ghi:</div>
      <div style="max-height: 200px; overflow-y: auto;">
        <table style="width: 100%; text-align: left; border-collapse: collapse; font-size: 0.85rem;">
          <thead>
            <tr style="color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.1);">
              <th style="padding: 6px 8px;">ID</th>
              <th style="padding: 6px 8px;">Tiêu đề</th>
              <th style="padding: 6px 8px;">Danh mục</th>
              <th style="padding: 6px 8px;">Nội dung</th>
              <th style="padding: 6px 8px; text-align:right;">Hành động</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `);

    // Gán nút xoá từng dòng
    const box = document.getElementById('idb-records-box');
    box.querySelectorAll('[data-del-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-del-id'), 10);
        handlers.deleteRecord(ctx, id);
      });
    });
  }

  const handlers = {
    onReady: async (ctx) => {
      try {
        await openDatabase(ctx);
        handlers.loadAllRecords(ctx);
      } catch (err) {
        ctx.error("Khởi động IndexedDB thất bại:", err);
      }
    },

    addRecord: async (ctx) => {
      const db = await openDatabase(ctx);
      const title = ctx.getVal('note-title');
      const category = ctx.getVal('note-category');
      const content = ctx.getVal('note-content');

      if (!title.trim()) {
        ctx.warn("Vui lòng nhập tiêu đề ghi chú.");
        return;
      }

      ctx.workflowStep(`Khởi tạo transaction(['${STORE_NAME}'], 'readwrite')`);
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const record = {
        title,
        category,
        content,
        createdAt: Date.now()
      };

      const req = store.add(record);
      req.onsuccess = (e) => {
        ctx.success(`Đã thêm bản ghi mới với ID = ${e.target.result}`, record);
        handlers.loadAllRecords(ctx);
      };
      req.onerror = (e) => ctx.error("Thêm bản ghi thất bại:", e.target.error);
    },

    loadAllRecords: async (ctx) => {
      const db = await openDatabase(ctx);
      ctx.workflowStep(`Truy vấn toàn bộ: store.getAll()`);
      const tx = db.transaction([STORE_NAME], 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        ctx.info(`Đã tải ${req.result.length} bản ghi từ ObjectStore.`);
        renderTable(ctx, req.result);
      };
    },

    filterByCategory: async (ctx) => {
      const db = await openDatabase(ctx);
      const cat = ctx.getVal('note-category');
      ctx.workflowStep(`Truy vấn qua Index: store.index('category').getAll('${cat}')`);

      const tx = db.transaction([STORE_NAME], 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const idx = store.index('category');
      const req = idx.getAll(cat);

      req.onsuccess = () => {
        ctx.success(`Tìm thấy ${req.result.length} bản ghi thuộc danh mục '${cat}'`);
        renderTable(ctx, req.result);
      };
    },

    deleteRecord: async (ctx, id) => {
      const db = await openDatabase(ctx);
      ctx.workflowStep(`Xoá bản ghi ID = ${id}: store.delete(${id})`);
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);

      req.onsuccess = () => {
        ctx.warn(`Đã xoá thành công bản ghi #${id}`);
        handlers.loadAllRecords(ctx);
      };
    },

    clearStore: async (ctx) => {
      const db = await openDatabase(ctx);
      ctx.workflowStep(`Dọn sạch ObjectStore: store.clear()`);
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      req.onsuccess = () => {
        ctx.warn("Đã dọn sạch toàn bộ dữ liệu trong ObjectStore.");
        handlers.loadAllRecords(ctx);
      };
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
