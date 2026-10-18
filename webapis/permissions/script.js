// webapis/permissions/script.js - Permissions API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const PERMISSION_NAMES = [
    { name: "geolocation", label: "Định vị vị trí (Geolocation)" },
    { name: "notifications", label: "Thông báo hệ điều hành (Notifications)" },
    { name: "camera", label: "Máy ảnh (Camera)" },
    { name: "microphone", label: "Microphone (Thu âm)" },
    { name: "clipboard-read", label: "Đọc bộ nhớ tạm (Clipboard Read)" },
    { name: "clipboard-write", label: "Ghi bộ nhớ tạm (Clipboard Write)" }
  ];

  const spec = {
    id: "permissions",
    panels: [
      {
        id: "panel-permissions-query",
        title: "1. Ma Trận Quyền Hạn (Permissions Query Matrix)",
        badge: "navigator.permissions.query()",
        desc: "Truy vấn trạng thái cấp quyền trước khi gọi hàm để tránh hiện pop-up bất ngờ gây khó chịu.",
        actions: [
          { id: "btn-check-all-perms", label: "Quét Toàn Bộ Quyền Hạn", variant: "primary", handler: "checkAllPermissions" }
        ],
        previewBox: {
          id: "permissions-matrix-box",
          initialText: "Đang truy vấn quyền hạn..."
        }
      }
    ]
  };

  async function querySingle(ctx, permObj) {
    try {
      const status = await navigator.permissions.query({ name: permObj.name });
      status.onchange = () => {
        ctx.event(`Quyền ${permObj.name} đã THAY ĐỔI sang: ${status.state}`);
        handlers.checkAllPermissions(ctx);
      };
      return { ...permObj, state: status.state, supported: true };
    } catch (e) {
      return { ...permObj, state: "Không hỗ trợ trên trình duyệt này", supported: false };
    }
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Permissions API sẵn sàng");
      handlers.checkAllPermissions(ctx);
    },

    checkAllPermissions: async (ctx) => {
      if (!('permissions' in navigator)) {
        ctx.warn("navigator.permissions không khả dụng.");
        ctx.setHtml('permissions-matrix-box', '<span style="color:#f87171;">Trình duyệt không hỗ trợ navigator.permissions.</span>');
        return;
      }

      ctx.workflowStep("Bắt đầu truy vấn ma trận quyền qua navigator.permissions.query()");
      const results = await Promise.all(PERMISSION_NAMES.map(p => querySingle(ctx, p)));

      let rowsHtml = '';
      results.forEach(res => {
        let badge = '<span class="badge badge-warning">Prompt (Hỏi người dùng)</span>';
        if (res.state === 'granted') {
          badge = '<span class="badge badge-success">✔ Granted (Đã cấp quyền)</span>';
        } else if (res.state === 'denied') {
          badge = '<span class="badge badge-danger">✖ Denied (Đã chặn)</span>';
        } else if (!res.supported) {
          badge = '<span class="badge badge-secondary">Unsupported</span>';
        }

        rowsHtml += `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px 10px; font-weight:600;">${res.label}</td>
            <td style="padding: 8px 10px; font-family:var(--font-mono); font-size:0.8rem; color:#38bdf8;"><code>${res.name}</code></td>
            <td style="padding: 8px 10px; text-align:right;">${badge}</td>
          </tr>
        `;
      });

      ctx.setHtml('permissions-matrix-box', `
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr style="color:var(--text-muted); border-bottom:1px solid rgba(255,255,255,0.1); text-align:left;">
              <th style="padding:6px 10px;">Tính Năng</th>
              <th style="padding:6px 10px;">Permission Name</th>
              <th style="padding:6px 10px; text-align:right;">Trạng Thái Cấp Quyền</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      `);

      ctx.success("Đã cập nhật bảng trạng thái quyền hạn.");
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
