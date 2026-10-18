// webapis/cookie_store/script.js - Cookie Store API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const cookieSpec = {
    id: "cookie_store",
    name: "Cookie Store API",
    group: "C",
    category: "Storage & Security",
    status: "Standard",
    support: { chrome: "87+", edge: "87+", firefox: "No", safari: "No" },
    supportCheck: () => 'cookieStore' in window,
    why: "Thay thế document.cookie cũ kỹ vốn là chuỗi đồng bộ làm chậm Main Thread và không thể gọi từ Service Worker. Cookie Store API cung cấp Promise bất đồng bộ hiện đại và sự kiện change tự động.",
    whenToUse: "Quản lý cookie phiên người dùng trong Web App hiện đại, theo dõi sự thay đổi cookie qua event `change`, truy cập cookie trực tiếp trong Service Worker ngầm.",
    whenNotToUse: "Lưu dữ liệu lớn (hãy dùng IndexedDB); các cookie nhạy cảm có cờ HttpOnly (trình duyệt cấm JavaScript truy cập để chống XSS).",
    coreItems: [
      "cookieStore.get(name) -> Promise<{ name, value, ... }>",
      "cookieStore.getAll() -> Promise<Array>",
      "cookieStore.set({ name, value, expires, domain, path, sameSite })",
      "cookieStore.delete(name)",
      "cookieStore.addEventListener('change', (e) => ...)"
    ],
    panels: [
      {
        id: "panel-crud-cookie",
        title: "1. Thao Tác Bất Đồng Bộ (Async CRUD Cookie)",
        badge: "cookieStore.get / set / delete",
        desc: "Đọc, ghi và xoá Cookie bằng các hàm trả về Promise.",
        inputs: [
          { id: "cookie-name-input", label: "Tên Cookie (Name):", type: "text", value: "user_session_token" },
          { id: "cookie-val-input", label: "Giá Trị Cookie (Value):", type: "text", value: "token_abc_xyz_987654" }
        ],
        actions: [
          { id: "btn-set-cookie", label: "Ghi Cookie (cookieStore.set)", variant: "primary", handler: "setCookie" },
          { id: "btn-get-cookie", label: "Đọc Cookie (cookieStore.get)", variant: "secondary", handler: "getCookie" },
          { id: "btn-get-all-cookies", label: "Liệt Kê Mọi Cookies (getAll)", variant: "secondary", handler: "getAllCookies" },
          { id: "btn-delete-cookie", label: "Xoá Cookie (cookieStore.delete)", variant: "danger", handler: "deleteCookie" }
        ],
        previewBox: {
          id: "cookie-result-box",
          initialText: "Trạng thái: Chưa thao tác."
        }
      },
      {
        id: "panel-cookie-change",
        title: "2. Theo Dõi Sự Kiện Biến Đổi Cookie (onchange)",
        badge: "CookieChangeEvent",
        desc: "Đăng ký sự kiện lắng nghe bất kỳ thay đổi nào của cookie (thêm mới, cập nhật giá trị hoặc bị xoá) trên toàn bộ trang web.",
        actions: [
          { id: "btn-toggle-watch-cookie", label: "Bật Lắng Nghe Sự Kiện 'change'", variant: "secondary", handler: "toggleWatchChange" }
        ],
        previewBox: {
          id: "cookie-event-box",
          initialText: "Chưa ghi nhận sự kiện biến đổi cookie nào."
        }
      }
    ]
  };

  let isWatchingChange = false;

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Cookie Store API sẵn sàng");
      handlers.toggleWatchChange(ctx);
    },

    setCookie: async (ctx) => {
      if (!('cookieStore' in window)) {
        ctx.error("Trình duyệt không hỗ trợ window.cookieStore.");
        return;
      }

      const name = ctx.getVal('cookie-name-input').trim();
      const value = ctx.getVal('cookie-val-input').trim();

      ctx.workflowStep(`Gọi cookieStore.set({ name: "${name}", value: "${value}" })`);
      try {
        await cookieStore.set({
          name: name,
          value: value,
          sameSite: 'lax',
          path: '/'
        });
        ctx.success(`Đã ghi cookie "${name}" thành công!`);
        handlers.getCookie(ctx);
      } catch (err) {
        ctx.error("Lỗi khi ghi cookie:", err);
      }
    },

    getCookie: async (ctx) => {
      if (!('cookieStore' in window)) return;

      const name = ctx.getVal('cookie-name-input').trim();
      ctx.workflowStep(`Gọi cookieStore.get("${name}")`);

      try {
        const item = await cookieStore.get(name);
        if (item) {
          ctx.success(`Đọc được cookie: "${item.name}" = "${item.value}"`, item);
          ctx.setHtml('cookie-result-box', `
            <div>• Tên: <strong style="color:#38bdf8;">${item.name}</strong></div>
            <div>• Giá trị: <strong style="color:#34d399;">${item.value}</strong></div>
            <div>• Đường dẫn: <code>${item.path}</code> | SameSite: <code>${item.sameSite}</code></div>
          `);
        } else {
          ctx.warn(`Không tìm thấy cookie có tên: "${name}"`);
          ctx.setHtml('cookie-result-box', `<div>Cookie "${name}" không tồn tại.</div>`);
        }
      } catch (err) {
        ctx.error("Lỗi khi đọc cookie:", err);
      }
    },

    getAllCookies: async (ctx) => {
      if (!('cookieStore' in window)) return;

      ctx.workflowStep("Gọi cookieStore.getAll()");
      try {
        const all = await cookieStore.getAll();
        ctx.info(`Tìm thấy ${all.length} cookies có thể đọc được trong domain này:`, all);

        if (all.length === 0) {
          ctx.setHtml('cookie-result-box', "Không có cookie nào.");
        } else {
          ctx.setHtml('cookie-result-box', all.map(c => `
            <div>• <strong>${c.name}</strong> = <code>${c.value}</code></div>
          `).join(''));
        }
      } catch (err) {
        ctx.error("Lỗi getAll:", err);
      }
    },

    deleteCookie: async (ctx) => {
      if (!('cookieStore' in window)) return;

      const name = ctx.getVal('cookie-name-input').trim();
      ctx.workflowStep(`Gọi cookieStore.delete("${name}")`);

      try {
        await cookieStore.delete(name);
        ctx.success(`Đã xoá cookie "${name}" thành công!`);
        handlers.getCookie(ctx);
      } catch (err) {
        ctx.error("Lỗi khi xoá cookie:", err);
      }
    },

    toggleWatchChange: (ctx) => {
      if (!('cookieStore' in window)) return;

      if (!isWatchingChange) {
        cookieStore.addEventListener('change', onChange);
        isWatchingChange = true;
        ctx.success("Đã bật lắng nghe sự kiện cookieStore 'change'.");
      }

      function onChange(event) {
        ctx.event("CookieChangeEvent", {
          changed: event.changed,
          deleted: event.deleted
        });

        let text = '';
        if (event.changed.length > 0) {
          text += `<div>Đã thay đổi: <strong>${event.changed.map(c => c.name).join(', ')}</strong></div>`;
        }
        if (event.deleted.length > 0) {
          text += `<div style="color:#f87171;">Đã xoá: <strong>${event.deleted.map(c => c.name).join(', ')}</strong></div>`;
        }
        ctx.setHtml('cookie-event-box', text || 'Có sự kiện change xảy ra.');
      }
    }
  };

  WebAPICore.renderApp(cookieSpec, handlers);
})();
