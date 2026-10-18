// webapis/web_crypto/script.js - Web Cryptography API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentKey = null;
  let lastIv = null;
  let lastCipherText = null;

  const spec = {
    id: "web_crypto",
    panels: [
      {
        id: "panel-crypto-suite",
        title: "1. Mã Hoá Quân Sự (SHA-256 Hash & Mã Hoá AES-256-GCM)",
        badge: "crypto.subtle",
        desc: "Thực thi tính toán mật mã cấp độ phần cứng siêu nhanh: Hash chuỗi bằng SHA-256 và Mã hoá/Giải mã dữ liệu với AES-GCM.",
        inputs: [
          { id: "crypto-input-text", label: "Văn bản gốc (Plaintext):", type: "text", value: "Bảo mật thông tin tối mật 2026", fullWidth: true }
        ],
        actions: [
          { id: "btn-hash-sha256", label: "Tạo Mã Băm SHA-256", variant: "primary", handler: "hashSha256" },
          { id: "btn-encrypt-aes", label: "Mã Hoá AES-256-GCM", variant: "secondary", handler: "encryptAes" },
          { id: "btn-decrypt-aes", label: "Giải Mã Dữ Liệu Ngược Lại", variant: "secondary", handler: "decryptAes" }
        ],
        previewBox: {
          id: "crypto-status-box",
          initialText: "Chưa thực thi thao tác mã hoá."
        }
      }
    ]
  };

  function buf2hex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Cryptography API sẵn sàng");
    },

    hashSha256: async (ctx) => {
      const text = ctx.getVal('crypto-input-text');
      ctx.workflowStep(`Gọi crypto.subtle.digest('SHA-256', encoder.encode("${text}"))`);

      try {
        const enc = new TextEncoder();
        const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(text));
        const hex = buf2hex(hashBuf);

        ctx.success("Băm SHA-256 hoàn tất! Độ dài: 256 bits (64 hex characters):", hex);
        ctx.setHtml('crypto-status-box', `
          <div style="color:#34d399; font-weight:700; margin-bottom:4px;">● Mã Băm SHA-256:</div>
          <div style="font-family:var(--font-mono); font-size:0.8rem; color:#38bdf8; word-break:break-all; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">
            ${hex}
          </div>
        `);
      } catch (err) {
        ctx.error("Lỗi hash SHA-256:", err);
      }
    },

    encryptAes: async (ctx) => {
      const text = ctx.getVal('crypto-input-text');
      ctx.workflowStep("Sinh khoá AES-256-GCM và IV ngẫu nhiên 12 bytes");

      try {
        currentKey = await crypto.subtle.generateKey(
          { name: "AES-GCM", length: 256 },
          true,
          ["encrypt", "decrypt"]
        );

        lastIv = crypto.getRandomValues(new Uint8Array(12));
        const enc = new TextEncoder();

        ctx.workflowStep("Mã hoá dữ liệu bằng crypto.subtle.encrypt()");
        const cipherBuf = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv: lastIv },
          currentKey,
          enc.encode(text)
        );

        lastCipherText = cipherBuf;
        const hexCipher = buf2hex(cipherBuf);
        const hexIv = buf2hex(lastIv);

        ctx.success("Mã hoá AES-GCM 256-bit thành công!");
        ctx.setHtml('crypto-status-box', `
          <div style="color:#34d399; font-weight:700; margin-bottom:4px;">● Đã Mã Hoá (Ciphertext Hex):</div>
          <div style="font-family:var(--font-mono); font-size:0.8rem; color:#f87171; word-break:break-all; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-bottom:6px;">
            ${hexCipher}
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted);">
            Initialization Vector (IV): <code>${hexIv}</code> | Bấm nút "Giải Mã" để kiểm tra tính toàn vẹn!
          </div>
        `);
      } catch (err) {
        ctx.error("Lỗi mã hoá AES:", err);
      }
    },

    decryptAes: async (ctx) => {
      if (!currentKey || !lastCipherText || !lastIv) {
        ctx.warn("Chưa có dữ liệu đã mã hoá. Hãy bấm 'Mã Hoá AES-256-GCM' trước.");
        return;
      }

      ctx.workflowStep("Giải mã bằng crypto.subtle.decrypt(AES-GCM)");

      try {
        const decryptedBuf = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv: lastIv },
          currentKey,
          lastCipherText
        );

        const dec = new TextDecoder();
        const decryptedText = dec.decode(decryptedBuf);

        ctx.success("Giải mã thành công! Nội dung ban đầu phục hồi nguyên vẹn:", decryptedText);
        ctx.setHtml('crypto-status-box', `
          <div style="color:#34d399; font-weight:700; margin-bottom:4px;">✔ GIẢI MÃ THÀNH CÔNG (Decrypted Text):</div>
          <div style="font-family:var(--font-mono); font-size:0.95rem; color:#38bdf8; background:rgba(0,0,0,0.3); padding:10px; border-radius:6px;">
            "${ctx.escapeHtml(decryptedText)}"
          </div>
        `);
      } catch (err) {
        ctx.error("Giải mã thất bại (khoá sai hoặc dữ liệu bị can thiệp):", err);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
