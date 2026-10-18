// webapis/keyboard/script.js - Keyboard API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let keyListenerActive = false;

  const spec = {
    id: "keyboard",
    panels: [
      {
        id: "panel-keyboard-layout",
        title: "1. Đọc Sơ Đồ Bàn Phím Vật Lý (getLayoutMap)",
        badge: "navigator.keyboard.getLayoutMap()",
        desc: "Xác định ký tự thực tế trên bàn phím của người dùng (QWERTY, AZERTY, Dvorak) tương ứng với từng mã phím phần cứng (KeyCode).",
        actions: [
          { id: "btn-get-layout", label: "Quét Sơ Đồ Bàn Phím (getLayoutMap)", variant: "primary", handler: "getLayoutMap" }
        ],
        previewBox: {
          id: "layout-preview-box",
          initialText: "Chưa quét sơ đồ bàn phím."
        }
      },
      {
        id: "panel-keyboard-lock",
        title: "2. Khoá Phím Hệ Thống Trong Toàn Màn Hình (Keyboard Lock)",
        badge: "navigator.keyboard.lock()",
        desc: "Chặn trình duyệt xử lý phím tắt như Escape, Alt+Tab, Ctrl+W để game hoặc remote desktop bắt trọn tín hiệu.",
        inputs: [
          {
            id: "input-lock-keys",
            type: "text",
            label: "Danh sách mã phím muốn khoá (ngăn cách bằng dấu phẩy):",
            value: "Escape, KeyW, KeyA, KeyS, KeyD, Tab"
          }
        ],
        actions: [
          { id: "btn-lock-keys", label: "Yêu Cầu Khoá Phím (Cần Fullscreen)", variant: "primary", handler: "lockKeys" },
          { id: "btn-unlock-keys", label: "Mở Khoá Bàn Phím (unlock())", variant: "secondary", handler: "unlockKeys" }
        ]
      },
      {
        id: "panel-keyboard-listener",
        title: "3. Bộ Giám Sát Phím Bấm Thời Gian Thực (Live Key Inspector)",
        badge: "keydown / keyup & Code vs Key",
        desc: "Bấm bất kỳ phím nào trên bàn phím của bạn để phân tích sự khác nhau giữa e.key, e.code và e.location.",
        customHtml: `
          <div class="key-press-monitor">
            <div id="key-badge-display" class="key-badge">_</div>
            <div style="flex:1;">
              <div id="key-info-main" style="font-weight:600; color:var(--text-main);">Chưa bấm phím nào</div>
              <div id="key-info-sub" style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
                Mã phím phần cứng (e.code) vs Ký tự sinh ra (e.key)
              </div>
            </div>
          </div>
        `,
        actions: [
          { id: "btn-toggle-key-log", label: "Bật Lắng Nghe Phím Bấm Toàn Trang", variant: "secondary", handler: "toggleKeyListener" }
        ]
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo môi trường Keyboard API");
      if (!('keyboard' in navigator)) {
        ctx.warn("navigator.keyboard chỉ hỗ trợ trên trình duyệt nhân Chromium (Chrome, Edge, Opera) và yêu cầu ngữ cảnh bảo mật HTTPS.");
      } else {
        ctx.success("Trình duyệt hỗ trợ navigator.keyboard native!");
      }
    },

    getLayoutMap: async (ctx) => {
      ctx.workflowStep("Bắt đầu truy vấn navigator.keyboard.getLayoutMap()");
      if (!('keyboard' in navigator && navigator.keyboard.getLayoutMap)) {
        ctx.warn("navigator.keyboard.getLayoutMap không được hỗ trợ trên trình duyệt này. Hiển thị demo mô phỏng chuẩn QWERTY.");
        const simulatedMap = {
          "KeyQ": "q", "KeyW": "w", "KeyE": "e", "KeyR": "r", "KeyT": "t", "KeyY": "y",
          "KeyA": "a", "KeyS": "s", "KeyD": "d", "KeyF": "f", "KeyZ": "z", "KeyX": "x"
        };
        renderLayoutCards(simulatedMap, 'layout-preview-box', ctx);
        return;
      }

      try {
        const layoutMap = await navigator.keyboard.getLayoutMap();
        ctx.success(`Đã đọc thành công sơ đồ bàn phím với ${layoutMap.size} mã phím!`);

        const mapObj = {};
        for (const [code, key] of layoutMap.entries()) {
          mapObj[code] = key;
        }
        renderLayoutCards(mapObj, 'layout-preview-box', ctx);
      } catch (err) {
        ctx.error(`Lỗi khi lấy layout map: ${err.message}`, err);
      }
    },

    lockKeys: async (ctx) => {
      const keysInput = ctx.getVal('input-lock-keys');
      const keyList = keysInput.split(',').map(s => s.trim()).filter(Boolean);

      ctx.workflowStep(`Yêu cầu khoá phím: [${keyList.join(', ')}]`);

      if (!('keyboard' in navigator && navigator.keyboard.lock)) {
        ctx.warn("navigator.keyboard.lock không được hỗ trợ trên trình duyệt này (chỉ có trên Chrome/Edge).");
        return;
      }

      try {
        // Kiểm tra xem đã fullscreen chưa, nếu chưa xin vào fullscreen
        if (!document.fullscreenElement) {
          ctx.workflowStep("Keyboard lock yêu cầu màn hình tràn (Fullscreen). Đang yêu cầu document.documentElement.requestFullscreen()...");
          await document.documentElement.requestFullscreen();
        }

        await navigator.keyboard.lock(keyList);
        ctx.success(`Đã khoá thành công các phím: [${keyList.join(', ')}]. Nhấn giữ Escape để thoát.`);
      } catch (err) {
        ctx.error(`Không thể khoá phím: ${err.message}`, err);
      }
    },

    unlockKeys: (ctx) => {
      ctx.workflowStep("Gọi navigator.keyboard.unlock()");
      if ('keyboard' in navigator && navigator.keyboard.unlock) {
        navigator.keyboard.unlock();
        ctx.success("Đã mở khoá tất cả các phím bàn phím.");
      } else {
        ctx.warn("Trình duyệt không hỗ trợ unlock().");
      }

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    },

    toggleKeyListener: (ctx) => {
      keyListenerActive = !keyListenerActive;
      const btn = document.getElementById('btn-toggle-key-log');
      if (btn) {
        btn.innerText = keyListenerActive ? "Tắt Lắng Nghe Phím Bấm" : "Bật Lắng Nghe Phím Bấm Toàn Trang";
      }

      if (keyListenerActive) {
        ctx.success("Đã kích hoạt lắng nghe phím bấm! Hãy gõ phím bất kỳ trên bàn phím.");
        if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
          window.addEventListener('keydown', onKeyDownGlobal);
        }
      } else {
        ctx.workflowStep("Đã tắt lắng nghe phím bấm.");
        if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
          window.removeEventListener('keydown', onKeyDownGlobal);
        }
      }
    }
  };

  function onKeyDownGlobal(e) {
    const badge = document.getElementById('key-badge-display');
    const infoMain = document.getElementById('key-info-main');
    const infoSub = document.getElementById('key-info-sub');

    if (badge) badge.innerText = e.key.length === 1 ? e.key.toUpperCase() : e.key;
    if (infoMain) infoMain.innerText = `Phím vừa bấm: "${e.key}" (code: ${e.code})`;
    if (infoSub) infoSub.innerHTML = `
      Alt: <strong>${e.altKey}</strong> | Ctrl: <strong>${e.ctrlKey}</strong> | Shift: <strong>${e.shiftKey}</strong> | Meta/Win: <strong>${e.metaKey}</strong> | Location: <strong>${e.location}</strong>
    `;

    WebAPICore.log(`Nhấn phím: key="${e.key}", code="${e.code}"`, 'event', {
      key: e.key,
      code: e.code,
      repeat: e.repeat
    });
  }

  function renderLayoutCards(mapObj, targetId, ctx) {
    const keys = Object.keys(mapObj);
    const html = `
      <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">
        Đã phân tích <strong>${keys.length}</strong> phím phần cứng:
      </div>
      <div class="layout-map-grid">
        ${keys.slice(0, 40).map(k => `
          <div class="layout-key-pill">
            <span style="color:#94a3b8;">${k}:</span>
            <strong style="color:#38bdf8;">"${mapObj[k]}"</strong>
          </div>
        `).join('')}
      </div>
      ${keys.length > 40 ? `<div style="font-size:0.75rem; color:#64748b; margin-top:4px;">(Hiển thị 40/${keys.length} phím tiêu biểu)</div>` : ''}
    `;
    ctx.setHtml(targetId, html);
  }

  WebAPICore.renderApp(spec, handlers);
})();
