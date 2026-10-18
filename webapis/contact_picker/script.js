// webapis/contact_picker/script.js - Contact Picker API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "contact_picker",
    panels: [
      {
        id: "panel-contact-check",
        title: "1. Kiểm Tra Thuộc Tính Danh Bạ Được Hỗ Trợ",
        badge: "navigator.contacts.getProperties()",
        desc: "Truy vấn hệ điều hành xem danh bạ thiết bị cho phép web đọc những trường dữ liệu nào (name, tel, email, address, icon).",
        actions: [
          { id: "btn-check-props", label: "Quét Thuộc Tính Khả Dụng (getProperties)", variant: "primary", handler: "checkProperties" }
        ],
        previewBox: {
          id: "props-preview-box",
          initialText: "Chưa quét. Bấm nút phía trên để kiểm tra."
        }
      },
      {
        id: "panel-contact-select",
        title: "2. Mở Hộp Thoại Chọn Danh Bạ Hệ Thống",
        badge: "navigator.contacts.select()",
        desc: "Yêu cầu quyền truy cập có chủ đích của người dùng qua giao diện Picker của hệ thống (Android / ChromeOS / Edge).",
        inputs: [
          {
            id: "select-multiple",
            type: "select",
            label: "Chế độ chọn danh bạ:",
            options: [
              { value: "single", label: "Chọn 1 liên hệ duy nhất ({ multiple: false })" },
              { value: "multiple", label: "Cho phép chọn nhiều liên hệ ({ multiple: true })" }
            ]
          }
        ],
        actions: [
          { id: "btn-select-contacts", label: "Mở Hộp Thoại Chọn Danh Bạ", variant: "primary", handler: "selectContacts" },
          { id: "btn-simulate-contacts", label: "Giả Lập Dữ Liệu Danh Bạ (Demo Desktop)", variant: "secondary", handler: "simulateContacts" }
        ],
        previewBox: {
          id: "contacts-preview-box",
          initialText: "Danh sách danh bạ chọn được sẽ hiển thị ở đây."
        }
      }
    ]
  };

  function renderContactCards(contacts, targetId, ctx) {
    if (!contacts || contacts.length === 0) {
      ctx.setHtml(targetId, '<span style="color:var(--text-muted);">Không có danh bạ nào được chọn hoặc trả về.</span>');
      return;
    }

    const cardsHtml = `
      <div class="contact-card-grid">
        ${contacts.map((c, i) => {
          const name = (c.name && c.name[0]) || `Liên hệ #${i + 1}`;
          const initial = name.charAt(0).toUpperCase();
          const tels = (c.tel && c.tel.join(', ')) || 'Không có SĐT';
          const emails = (c.email && c.email.join(', ')) || 'Không có Email';
          const addresses = (c.address && c.address.join(', ')) || '';

          return `
            <div class="contact-card">
              <div style="display:flex; align-items:center; gap:10px;">
                <div class="contact-avatar">${initial}</div>
                <div>
                  <div class="contact-name">${ctx.escapeHtml ? ctx.escapeHtml(name) : name}</div>
                  <div class="contact-field">📞 ${tels}</div>
                </div>
              </div>
              <div class="contact-field" style="margin-top:6px;">✉️ ${emails}</div>
              ${addresses ? `<div class="contact-field">📍 ${addresses}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;

    ctx.setHtml(targetId, cardsHtml);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo môi trường Contact Picker API");
      if (!('contacts' in navigator && 'ContactsManager' in window)) {
        ctx.warn("Contact Picker API chủ yếu hỗ trợ trên Chrome Android / HTTPS Secure Context. Trên máy tính để bàn (Desktop), nút 'Giả Lập Dữ Liệu Danh Bạ' sẽ mô phỏng luồng hoàn hảo.");
      } else {
        ctx.success("Thiết bị này hỗ trợ Contact Picker API natively!");
      }
    },

    checkProperties: async (ctx) => {
      ctx.workflowStep("Bắt đầu gọi navigator.contacts.getProperties()");
      if (!('contacts' in navigator)) {
        ctx.warn("Trình duyệt không có navigator.contacts. Thuộc tính chuẩn theo W3C gồm: ['name', 'email', 'tel', 'address', 'icon'].");
        ctx.setHtml('props-preview-box', `
          <div style="color:var(--accent-warning);">
            <strong>Thiết bị chưa hỗ trợ native:</strong> Theo đặc tả W3C Contacts Manager API:
            <ul style="margin:6px 0 0 16px;">
              <li><code>name</code>: Họ tên người liên hệ</li>
              <li><code>tel</code>: Danh sách số điện thoại</li>
              <li><code>email</code>: Danh sách địa chỉ email</li>
              <li><code>address</code>: Địa chỉ bưu chính/nhà riêng</li>
              <li><code>icon</code>: Ảnh đại diện dạng Blob</li>
            </ul>
          </div>
        `);
        return;
      }

      try {
        const supportedProps = await navigator.contacts.getProperties();
        ctx.success(`Đã nhận ${supportedProps.length} thuộc tính được hỗ trợ từ hệ điều hành:`, supportedProps);
        ctx.setHtml('props-preview-box', `
          <div style="color:var(--accent-success); font-weight:600; margin-bottom:6px;">
            ✔ Hệ điều hành cho phép các thuộc tính:
          </div>
          <div>${supportedProps.map(p => `<span class="badge badge-info" style="margin-right:6px;">${p}</span>`).join('')}</div>
        `);
      } catch (err) {
        ctx.error(`Lỗi khi lấy getProperties(): ${err.message}`, err);
      }
    },

    selectContacts: async (ctx) => {
      const mode = ctx.getVal('select-multiple');
      const isMultiple = mode === 'multiple';

      ctx.workflowStep(`Yêu cầu mở Contact Picker với { multiple: ${isMultiple} }`);

      if (!('contacts' in navigator)) {
        ctx.warn("Không tìm thấy navigator.contacts native. Đang chuyển sang Demo Giả lập...");
        handlers.simulateContacts(ctx);
        return;
      }

      try {
        const props = ['name', 'email', 'tel'];
        const contacts = await navigator.contacts.select(props, { multiple: isMultiple });
        ctx.success(`Người dùng đã chọn ${contacts.length} liên hệ:`, contacts);
        renderContactCards(contacts, 'contacts-preview-box', ctx);
      } catch (err) {
        if (err.name === 'SecurityError') {
          ctx.error("Lỗi bảo mật: Contact Picker yêu cầu cử chỉ người dùng (user gesture) và HTTPS.", err);
        } else if (err.name === 'InvalidStateError') {
          ctx.warn("Người dùng đã đóng hộp thoại hoặc huỷ chọn.", err);
        } else {
          ctx.error(`Lỗi gọi contacts.select(): ${err.message}`, err);
        }
      }
    },

    simulateContacts: (ctx) => {
      const mode = ctx.getVal('select-multiple');
      const isMultiple = mode === 'multiple';

      ctx.workflowStep(`[GIẢ LẬP DEMO] Mô phỏng phản hồi từ Contact Picker ({ multiple: ${isMultiple} })`);
      
      const mockDb = [
        { name: ["Nguyễn Văn An"], tel: ["0903 123 456"], email: ["an.nguyen@example.com"], address: ["Hà Nội, Việt Nam"] },
        { name: ["Trần Thị Bích"], tel: ["0988 654 321"], email: ["bich.tran@techcorp.vn"], address: ["TP. Hồ Chí Minh, Việt Nam"] },
        { name: ["Lê Hoàng Nam"], tel: ["0912 888 999"], email: ["nam.le@startup.io"], address: ["Đà Nẵng, Việt Nam"] }
      ];

      const selected = isMultiple ? mockDb : [mockDb[0]];
      ctx.success(`Đã mô phỏng chọn ${selected.length} liên hệ an toàn:`, selected);
      renderContactCards(selected, 'contacts-preview-box', ctx);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
