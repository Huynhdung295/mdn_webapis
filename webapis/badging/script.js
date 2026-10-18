// webapis/badging/script.js - Badging API: Workflow thực tế
(function() {
  'use strict';

  WebAPICore.init({
    id: "badging",
    name: "Badging API",
    group: "B",
    category: "Device & PWA",
    status: "Standard",
    browserMatrix: {
      chrome: "81+",
      edge: "81+",
      firefox: "No",
      safari: "17+"
    },
    supportCheck: () => {
      return 'setAppBadge' in navigator && 'clearAppBadge' in navigator;
    },
    why: "Hiển thị số đếm tin nhắn chưa đọc hoặc trạng thái tác vụ tinh tế trực tiếp trên icon ứng dụng ở Taskbar (Windows) hoặc Dock (macOS) mà không cần bật popup thông báo làm phiền người dùng.",
    whenToUse: "Ứng dụng PWA nhắn tin chat (Slack, Zalo, Telegram), email, bộ đếm số lượt tải xong, số lượng thông báo cần duyệt.",
    whenNotToUse: "Website thông thường mở trong tab bình thường (người dùng sẽ không nhìn thấy icon trên taskbar nếu chưa cài PWA).",
    coreItems: [
      "navigator.setAppBadge(count)",
      "navigator.setAppBadge() (Không truyền số: hiển thị chấm đỏ không số)",
      "navigator.clearAppBadge()"
    ],
    onReady: function(core) {
      core.workflowStep("Khởi động môi trường Badging API");
      setupListeners();
    }
  });

  function setupListeners() {
    const btnSetNum = document.getElementById('btn-set-numeric-badge');
    const btnSetDot = document.getElementById('btn-set-dot-badge');
    const btnClear = document.getElementById('btn-clear-badge');
    const countInput = document.getElementById('badge-count-input');
    const simBadge = document.getElementById('simulated-badge-el');

    // 1. Gán số đếm
    btnSetNum.addEventListener('click', async () => {
      const count = parseInt(countInput.value, 10) || 1;
      WebAPICore.workflowStep(`Gọi navigator.setAppBadge(${count})`);

      if (!('setAppBadge' in navigator)) {
        WebAPICore.warn("navigator.setAppBadge không được hỗ trợ trên trình duyệt này (Mô phỏng giao diện)");
      } else {
        try {
          await navigator.setAppBadge(count);
          WebAPICore.success(`Đã gọi setAppBadge(${count}) lên hệ điều hành thành công!`);
        } catch (err) {
          WebAPICore.error("Lỗi khi gọi setAppBadge():", err);
        }
      }

      // Cập nhật mô phỏng UI
      if (simBadge) {
        simBadge.style.display = 'block';
        simBadge.classList.remove('dot-only');
        simBadge.innerText = count > 99 ? '99+' : count;
      }
    });

    // 2. Gán chấm đỏ (không số)
    btnSetDot.addEventListener('click', async () => {
      WebAPICore.workflowStep("Gọi navigator.setAppBadge() (Không tham số -> Chấm đỏ không số)");

      if (!('setAppBadge' in navigator)) {
        WebAPICore.warn("navigator.setAppBadge chưa được hỗ trợ (Mô phỏng giao diện)");
      } else {
        try {
          await navigator.setAppBadge();
          WebAPICore.success("Đã kích hoạt huy hiệu chấm đỏ (unread flag) lên hệ điều hành!");
        } catch (err) {
          WebAPICore.error("Lỗi gọi setAppBadge():", err);
        }
      }

      if (simBadge) {
        simBadge.style.display = 'block';
        simBadge.classList.add('dot-only');
        simBadge.innerText = '';
      }
    });

    // 3. Xoá badge
    btnClear.addEventListener('click', async () => {
      WebAPICore.workflowStep("Gọi navigator.clearAppBadge()");

      if (!('clearAppBadge' in navigator)) {
        WebAPICore.warn("navigator.clearAppBadge không được hỗ trợ (Mô phỏng giao diện)");
      } else {
        try {
          await navigator.clearAppBadge();
          WebAPICore.success("Đã xoá huy hiệu ứng dụng thành công!");
        } catch (err) {
          WebAPICore.error("Lỗi khi gọi clearAppBadge():", err);
        }
      }

      if (simBadge) {
        simBadge.style.display = 'none';
      }
    });
  }

})();
