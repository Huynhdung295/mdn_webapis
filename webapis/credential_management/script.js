// webapis/credential_management/script.js - Credential Management API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const credSpec = {
    id: "credential_management",
    name: "Credential Management API",
    group: "C",
    category: "Identity & Auth",
    status: "Standard",
    support: { chrome: "51+", edge: "79+", firefox: "60+", safari: "13+" },
    supportCheck: () => 'credentials' in navigator,
    why: "Tích hợp trực tiếp với trình quản lý mật khẩu của trình duyệt (Google Password Manager, Apple Keychain) để tự động đăng nhập 1-chạm (One-tap / Auto sign-in), lưu trữ tài khoản và hỗ trợ khoá bảo mật sinh trắc học Passkeys.",
    whenToUse: "Quy trình đăng ký / đăng nhập tài khoản, ghi nhớ mật khẩu người dùng sau khi login thành công, đăng xuất và ngăn chặn đăng nhập ngầm khi người dùng bấm Logout.",
    whenNotToUse: "Trang chạy trên giao thức HTTP không an toàn (API yêu cầu HTTPS nghiêm ngặt).",
    coreItems: [
      "navigator.credentials.get({ password: true, mediation: 'silent'|'optional'|'required' })",
      "navigator.credentials.store(credential)",
      "navigator.credentials.create({ password: ... })",
      "navigator.credentials.preventSilentAccess()"
    ],
    panels: [
      {
        id: "panel-store-cred",
        title: "1. Lưu Trữ Mật Khẩu Vào Trình Quản Lý Trình Duyệt (credentials.store)",
        badge: "navigator.credentials.store()",
        desc: "Mô phỏng sự kiện đăng nhập thành công: gửi thông tin tài khoản cho trình duyệt lưu vào Keychain / Password Manager.",
        inputs: [
          { id: "cred-username", label: "Tên đăng nhập (ID):", type: "text", value: "developer_pro@example.com" },
          { id: "cred-password", label: "Mật khẩu:", type: "password", value: "SuperSecretPass_2026!" }
        ],
        actions: [
          { id: "btn-store-cred", label: "Lưu Tài Khoản (credentials.store)", variant: "primary", handler: "storeCredential" }
        ],
        previewBox: {
          id: "store-status-box",
          initialText: "Trạng thái: Chưa lưu tài khoản nào."
        }
      },
      {
        id: "panel-get-cred",
        title: "2. Truy Xuất & Đăng Nhập Tự Động (credentials.get)",
        badge: "navigator.credentials.get()",
        desc: "Lấy tài khoản đã lưu từ trình duyệt để đăng nhập tự động 1-chạm khi người dùng vào lại trang web.",
        actions: [
          { id: "btn-get-cred", label: "Lấy Tài Khoản Đã Lưu (credentials.get)", variant: "secondary", handler: "getCredential" },
          { id: "btn-prevent-silent", label: "Chặn Đăng Nhập Ngầm (preventSilentAccess - Khi Logout)", variant: "danger", handler: "preventSilent" }
        ],
        previewBox: {
          id: "get-cred-result-box",
          initialText: "Chưa truy xuất tài khoản."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Credential Management API sẵn sàng");
    },

    storeCredential: async (ctx) => {
      if (!('credentials' in navigator)) {
        ctx.error("Trình duyệt không hỗ trợ navigator.credentials.");
        return;
      }

      const id = ctx.getVal('cred-username');
      const password = ctx.getVal('cred-password');

      ctx.workflowStep(`Tạo PasswordCredential cho user: "${id}"`);
      try {
        if (window.PasswordCredential) {
          const cred = new PasswordCredential({
            id: id,
            password: password,
            name: "Lập trình viên MDN"
          });

          await navigator.credentials.store(cred);
          ctx.success(`Đã lưu thông tin đăng nhập của "${id}" vào Password Manager của trình duyệt thành công!`);
          ctx.setHtml('store-status-box', `<div>Đã lưu tài khoản: <strong style="color:#34d399;">"${id}"</strong></div>`);
        } else {
          ctx.warn("Trình duyệt không hỗ trợ constructor PasswordCredential trực tiếp (Cần chạy trên HTTPS và môi trường Chromium/Safari hỗ trợ).");
        }
      } catch (err) {
        ctx.error("Lỗi khi gọi credentials.store():", err);
      }
    },

    getCredential: async (ctx) => {
      if (!('credentials' in navigator)) return;

      ctx.workflowStep("Gọi navigator.credentials.get({ password: true, mediation: 'optional' })");
      try {
        const cred = await navigator.credentials.get({
          password: true,
          mediation: 'optional'
        });

        if (cred) {
          ctx.success(`Lấy được tài khoản tự động từ trình duyệt! ID: "${cred.id}"`, {
            id: cred.id,
            type: cred.type
          });
          ctx.setHtml('get-cred-result-box', `
            <div>Tài khoản tự động nhận diện: <strong style="color:#38bdf8;">"${cred.id}"</strong></div>
            <div>Loại xác thực: <code>${cred.type}</code></div>
          `);
        } else {
          ctx.warn("Không tìm thấy thông tin đăng nhập nào trong trình duyệt (hoặc người dùng đã đóng hộp thoại).");
          ctx.setHtml('get-cred-result-box', "Không có tài khoản nào được trả về.");
        }
      } catch (err) {
        ctx.error("Lỗi khi gọi credentials.get():", err);
      }
    },

    preventSilent: async (ctx) => {
      if (!('credentials' in navigator)) return;

      ctx.workflowStep("Gọi navigator.credentials.preventSilentAccess() (Thường dùng khi người dùng nhấn Đăng Xuất)");
      try {
        await navigator.credentials.preventSilentAccess();
        ctx.success("Đã vô hiệu hoá tự động đăng nhập ngầm! Lần tới người dùng vào web sẽ phải xác nhận lại bằng tay.");
      } catch (err) {
        ctx.error("Lỗi preventSilentAccess:", err);
      }
    }
  };

  WebAPICore.renderApp(credSpec, handlers);
})();
