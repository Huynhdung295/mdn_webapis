// webapis/document_picture_in_picture/script.js - Document Picture-in-Picture API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let pipWindow = null;
  let timerInterval = null;
  let timerSeconds = 0;

  const pipSpec = {
    id: "document_picture_in_picture",
    name: "Document Picture-in-Picture API",
    group: "D",
    category: "Window & Display",
    status: "Standard",
    support: { chrome: "116+", edge: "116+", firefox: "No", safari: "No" },
    supportCheck: () => 'documentPictureInPicture' in window,
    why: "Khác với Picture-in-Picture cũ chỉ mở được thẻ video, Document PiP cho phép mở MỌI PHẦN TỬ HTML bất kỳ (nút bấm điều khiển nhạc, camera chat, đồng hồ đếm ngược Pomodoro) vào trong một cửa sổ nổi luôn ghim trên cùng màn hình (Always-on-top).",
    whenToUse: "Mini player nghe nhạc (có nút Next/Prev/Volume), phòng họp video call có nút tắt mic/giơ tay khi chuyển sang tab khác làm việc, đồng hồ bấm giờ luôn ghim trên góc desktop.",
    whenNotToUse: "Chỉ phát video đơn thuần (dùng video.requestPictureInPicture() nhẹ hơn).",
    coreItems: [
      "documentPictureInPicture.requestWindow({ width, height }) -> Promise<Window>",
      "documentPictureInPicture.window",
      "documentPictureInPicture.onenter = (event) => ...",
      "pipWindow.document.body.append(element)"
    ],
    panels: [
      {
        id: "panel-pip-launcher",
        title: "1. Mở Cửa Sổ Nổi Always-on-Top (requestWindow)",
        badge: "documentPictureInPicture.requestWindow()",
        desc: "Đưa khối Widget điều khiển âm nhạc & đồng hồ đếm ngược vào cửa sổ nổi độc lập ghim trên màn hình.",
        actions: [
          { id: "btn-open-pip", label: "Mở Cửa Sổ Nổi (Document PiP)", variant: "primary", handler: "openPipWindow" },
          { id: "btn-close-pip", label: "Đóng Cửa Sổ Nổi", variant: "danger", handler: "closePipWindow" }
        ],
        customHtml: `
          <div class="mini-player-box" id="player-widget">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div class="track-title">Bản Nhạc Nền Làm Việc #42</div>
                <div class="track-artist">Lofi Beats & Synthwave</div>
              </div>
              <span id="pip-timer-badge" class="badge badge-success">00:00</span>
            </div>
            <div class="btn-group" style="margin-top:6px;">
              <button type="button" class="btn btn-secondary" id="widget-btn-play" style="padding:4px 10px;font-size:0.75rem;">▶ Play/Pause</button>
              <button type="button" class="btn btn-secondary" id="widget-btn-next" style="padding:4px 10px;font-size:0.75rem;">⏭ Next Track</button>
            </div>
          </div>
        `,
        previewBox: {
          id: "pip-status-box",
          initialText: "Trạng thái: Cửa sổ nổi chưa mở."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Document Picture-in-Picture sẵn sàng");
      startTimer(ctx);
      setupWidgetEvents(ctx);
    },

    openPipWindow: async (ctx) => {
      if (!('documentPictureInPicture' in window)) {
        ctx.error("Trình duyệt không hỗ trợ window.documentPictureInPicture (Yêu cầu Chrome 116+ / Edge 116+).");
        ctx.setHtml('pip-status-box', `<span style="color:#f87171;">✖ documentPictureInPicture chưa có sẵn trên trình duyệt này.</span>`);
        return;
      }

      ctx.workflowStep("Gọi documentPictureInPicture.requestWindow({ width: 340, height: 180 })");
      try {
        if (pipWindow) {
          pipWindow.close();
        }

        pipWindow = await window.documentPictureInPicture.requestWindow({
          width: 340,
          height: 180
        });

        // Sao chép các stylesheet từ trang chính sang cửa sổ PiP để giữ nguyên giao diện
        [...document.styleSheets].forEach((styleSheet) => {
          try {
            const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
            const style = document.createElement('style');
            style.textContent = cssRules;
            pipWindow.document.head.appendChild(style);
          } catch (e) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = styleSheet.href;
            pipWindow.document.head.appendChild(link);
          }
        });

        // Di chuyển phần tử widget vào trong cửa sổ PiP
        const widget = ctx.getEl('player-widget');
        pipWindow.document.body.style.margin = '0';
        pipWindow.document.body.style.padding = '10px';
        pipWindow.document.body.style.background = '#0a0f1d';
        pipWindow.document.body.appendChild(widget);

        ctx.success("Đã mở thành công cửa sổ nổi Document Picture-in-Picture!");
        ctx.setHtml('pip-status-box', `<div>Trạng thái: <strong style="color:#34d399;">Cửa sổ nổi ĐANG MỞ</strong> (Ghim trên cùng màn hình)</div>`);

        // Khi người dùng đóng cửa sổ nổi -> đưa widget trở lại trang chính
        pipWindow.addEventListener('pagehide', () => {
          ctx.workflowStep("Cửa sổ PiP đã đóng -> Đưa widget về lại trang chính");
          const container = ctx.getEl('panel-pip-launcher');
          if (container && widget) {
            container.appendChild(widget);
          }
          pipWindow = null;
          ctx.setHtml('pip-status-box', "Trạng thái: Cửa sổ nổi đã đóng.");
        });

      } catch (err) {
        ctx.error("Lỗi khi mở Document PiP:", err);
      }
    },

    closePipWindow: (ctx) => {
      if (pipWindow) {
        ctx.workflowStep("Đóng cửa sổ nổi bằng pipWindow.close()");
        pipWindow.close();
        pipWindow = null;
      } else {
        ctx.warn("Cửa sổ nổi chưa mở.");
      }
    }
  };

  function startTimer(ctx) {
    timerInterval = setInterval(() => {
      timerSeconds++;
      const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
      const secs = String(timerSeconds % 60).padStart(2, '0');
      const badge = document.getElementById('pip-timer-badge');
      if (badge) badge.innerText = `${mins}:${secs}`;
    }, 1000);
  }

  function setupWidgetEvents(ctx) {
    const btnPlay = document.getElementById('widget-btn-play');
    const btnNext = document.getElementById('widget-btn-next');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        ctx.event("WidgetClick", "Người dùng bấm nút Play/Pause trong Widget (kể cả khi đang trong cửa sổ nổi PiP)!");
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        ctx.event("WidgetClick", "Người dùng bấm nút Next Track trong Widget!");
      });
    }
  }

  WebAPICore.renderApp(pipSpec, handlers);
})();
