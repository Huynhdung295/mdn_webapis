// webapis/web_authentication/script.js - Web Authentication API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let lastCreatedCredentialId = null;

  const spec = {
    id: "web_authentication",
    panels: [
      {
        id: "panel-passkey-check",
        title: "1. Kiểm Tra Hỗ Trợ Xác Thực Sinh Trắc Học (Passkeys Check)",
        badge: "PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()",
        desc: "Truy vấn Windows Hello (Face / Vân tay), Touch ID / Face ID trên Apple hoặc Cảm biến vân tay Android có sẵn sàng tạo Passkey không cần mật khẩu hay không.",
        actions: [
          { id: "btn-check-biometric", label: "Kiểm Tra Phần Cứng Sinh Trắc Học (Biometric Ready)", variant: "primary", handler: "checkBiometric" }
        ],
        previewBox: {
          id: "biometric-preview-box",
          initialText: "Bấm nút phía trên để kiểm tra phần cứng thiết bị."
        }
      },
      {
        id: "panel-passkey-registration",
        title: "2. Đăng Ký Khóa Passkey Mới (navigator.credentials.create)",
        badge: "credentials.create({ publicKey })",
        desc: "Tạo cặp khóa mã hóa bất đối xứng công khai/bí mật (Public/Private Key) gắn với danh tính người dùng và lưu trữ an toàn trong chip bảo mật TPM / Secure Enclave.",
        inputs: [
          {
            id: "input-passkey-username",
            type: "text",
            label: "Tên tài khoản người dùng (Username):",
            value: "antigravity.developer@techcorp.vn"
          },
          {
            id: "input-passkey-display-name",
            type: "text",
            label: "Tên hiển thị (Display Name):",
            value: "Antigravity Pro Dev"
          }
        ],
        actions: [
          { id: "btn-create-passkey", label: "🔑 Tạo Khóa Passkey Mới", variant: "primary", handler: "createPasskey" }
        ],
        previewBox: {
          id: "create-result-box",
          initialText: "Chưa tạo khóa Passkey."
        }
      },
      {
        id: "panel-passkey-authentication",
        title: "3. Đăng Nhập Không Mật Khẩu Bằng Passkey (navigator.credentials.get)",
        badge: "credentials.get({ publicKey })",
        desc: "Hệ điều hành yêu cầu người dùng quét vân tay hoặc khuôn mặt để ký điện tử (Sign Challenge) giải bài toán xác thực từ server.",
        actions: [
          { id: "btn-auth-passkey", label: "🛡️ Đăng Nhập Bằng Passkey Đã Lưu", variant: "primary", handler: "authWithPasskey" }
        ],
        previewBox: {
          id: "auth-result-box",
          initialText: "Chưa thực hiện đăng nhập."
        }
      }
    ]
  };

  function bufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Web Authentication API (WebAuthn / Passkeys)");
      if (!('credentials' in navigator && 'PublicKeyCredential' in window)) {
        ctx.warn("Web Authentication API chỉ hoạt động trong môi trường HTTPS Secure Context hoặc localhost.");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ Web Authentication API (WebAuthn)!");
      }
    },

    checkBiometric: async (ctx) => {
      ctx.workflowStep("Kiểm tra PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()");

      if (!('PublicKeyCredential' in window)) {
        ctx.warn("PublicKeyCredential không khả dụng.");
        return;
      }

      try {
        const isAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        let conditionalAvailable = false;
        if (PublicKeyCredential.isConditionalMediationAvailable) {
          conditionalAvailable = await PublicKeyCredential.isConditionalMediationAvailable();
        }

        ctx.success(`Kết quả kiểm tra phần cứng xác thực:`, {
          platformAuthenticator: isAvailable,
          conditionalMediationAutofill: conditionalAvailable
        });

        ctx.setHtml('biometric-preview-box', `
          <div style="color:${isAvailable ? '#34d399' : '#f59e0b'}; font-weight:600;">
            ${isAvailable ? '✔ Thiết bị có sẵn bộ xác thực nền tảng (Windows Hello / Touch ID / Face ID)!' : '● Không tìm thấy bộ xác thực sinh trắc học tích hợp sẵn (có thể cắm USB Security Key YubiKey bên ngoài).'}
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
            Tự động điền Passkey (Conditional Autofill): <strong>${conditionalAvailable ? 'Có hỗ trợ' : 'Không'}</strong>
          </div>
        `);
      } catch (err) {
        ctx.error(`Lỗi kiểm tra sinh trắc học: ${err.message}`, err);
      }
    },

    createPasskey: async (ctx) => {
      const username = ctx.getVal('input-passkey-username') || 'user@example.com';
      const displayName = ctx.getVal('input-passkey-display-name') || 'User';

      ctx.workflowStep(`Bắt đầu đăng ký Passkey cho tài khoản: "${username}"`);

      // 1. Tạo ngẫu nhiên challenge (32 bytes)
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // 2. Tạo userId (16 bytes)
      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);

      const publicKeyCredentialCreationOptions = {
        challenge: challenge,
        rp: {
          name: "MDN Web API Master Lab",
          id: window.location.hostname
        },
        user: {
          id: userId,
          name: username,
          displayName: displayName
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },  // ES256 (ECDSA w/ SHA-256)
          { alg: -257, type: "public-key" } // RS256 (RSA w/ SHA-256)
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform", // Ưu tiên Face ID / Touch ID / Windows Hello
          userVerification: "preferred",
          residentKey: "preferred"
        },
        timeout: 60000,
        attestation: "none"
      };

      try {
        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions
        });

        lastCreatedCredentialId = credential.rawId;
        const b64Id = bufferToBase64(credential.rawId);

        ctx.success("Đã tạo Passkey thành công trên thiết bị!", {
          id: credential.id,
          type: credential.type,
          base64Id: b64Id
        });

        ctx.setHtml('create-result-box', `
          <div style="color:#34d399; font-weight:600;">
            ✔ ĐÃ TẠO PASSKEY THÀNH CÔNG!
          </div>
          <div style="font-size:0.8rem; margin-top:4px; word-break:break-all;">
            <strong>Credential ID:</strong> <code>${b64Id}</code><br>
            Khóa riêng tư (Private Key) được bảo mật vĩnh viễn trong chip phần cứng và không bao giờ rời khỏi máy.
          </div>
        `);
      } catch (err) {
        if (err.name === 'NotAllowedError') {
          ctx.warn("Người dùng đã huỷ hoặc đóng hộp thoại xác thực Passkey.", err);
        } else {
          ctx.error(`Lỗi tạo Passkey: ${err.message}`, err);
        }
      }
    },

    authWithPasskey: async (ctx) => {
      ctx.workflowStep("Bắt đầu thử thách đăng nhập bằng Passkey (navigator.credentials.get)");

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const publicKeyCredentialRequestOptions = {
        challenge: challenge,
        rpId: window.location.hostname,
        timeout: 60000,
        userVerification: "preferred"
      };

      if (lastCreatedCredentialId) {
        publicKeyCredentialRequestOptions.allowCredentials = [{
          id: lastCreatedCredentialId,
          type: 'public-key',
          transports: ['internal']
        }];
      }

      try {
        const assertion = await navigator.credentials.get({
          publicKey: publicKeyCredentialRequestOptions
        });

        ctx.success("Đăng nhập thành công! Thiết bị đã xác thực sinh trắc học và ký Challenge an toàn:", {
          credentialId: assertion.id,
          clientDataJSONLength: assertion.response.clientDataJSON.byteLength,
          signatureLength: assertion.response.signature.byteLength
        });

        ctx.setHtml('auth-result-box', `
          <div style="color:#34d399; font-weight:700;">
            ✔ XÁC THỰC PASSKEY THÀNH CÔNG!
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
            Đã đăng nhập an toàn bằng sinh trắc học không cần mật khẩu. Chữ ký số điện tử hợp lệ 100%.
          </div>
        `);
      } catch (err) {
        if (err.name === 'NotAllowedError') {
          ctx.warn("Người dùng huỷ thao tác đăng nhập Passkey.", err);
        } else {
          ctx.error(`Lỗi xác thực: ${err.message}`, err);
        }
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
