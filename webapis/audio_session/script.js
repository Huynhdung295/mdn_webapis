// webapis/audio_session/script.js - Audio Session API: Workflow thực tế
(function() {
  'use strict';

  let audioCtx = null;
  let oscillator = null;
  let isListeningStateChange = false;

  WebAPICore.init({
    id: "audio_session",
    name: "Audio Session API",
    group: "A",
    category: "Audio & Media",
    status: "Standard",
    browserMatrix: {
      chrome: "Draft",
      edge: "Draft",
      firefox: "Draft",
      safari: "16.4+"
    },
    supportCheck: () => {
      return 'audioSession' in navigator;
    },
    why: "Hệ điều hành cần biết mục đích âm thanh của trang web để tự động quyết định: có cho phép tiếp tục phát khi khoá màn hình không, có hạ nhỏ nhạc của app khác xuống (ducking) không, hay hoà trộn bình thường.",
    whenToUse: "App phát nhạc/podcast/sách nói cần nghe liên tục khi gạt nút im lặng hoặc tắt màn hình điện thoại (playback); app game có nhạc nền không làm tắt nhạc Spotify của người dùng (ambient).",
    whenNotToUse: "Website thông thường không phát âm thanh nền, hoặc web xem video tĩnh đơn giản.",
    coreItems: [
      "navigator.audioSession.type",
      "navigator.audioSession.state",
      "navigator.audioSession.addEventListener('statechange')"
    ],
    onReady: function(core) {
      core.workflowStep("Khởi động môi trường kiểm tra Audio Session");
      updateStatusDisplay();
      setupListeners();
    }
  });

  function updateStatusDisplay() {
    const box = document.getElementById('session-status-display');
    if (!box) return;

    if (!('audioSession' in navigator)) {
      box.innerHTML = `
        <span style="color:#f87171;font-weight:600;">✖ navigator.audioSession chưa có sẵn trên trình duyệt này</span>
        <div style="font-size:0.78rem;color:var(--text-muted);margin-top:3px;">
          (Chuẩn W3C hiện được Apple Safari 16.4+ trên macOS và iOS hỗ trợ đầy đủ. Chromium đang triển khai).
        </div>
      `;
      return;
    }

    const type = navigator.audioSession.type;
    const state = navigator.audioSession.state;

    box.innerHTML = `
      <div>Loại phiên hiện hành (type): <strong style="color:#38bdf8;">"${type}"</strong></div>
      <div style="margin-top:2px;">Trạng thái phiên (state): <strong style="color:${state === 'active' ? '#34d399' : '#f59e0b'};">${state}</strong></div>
    `;

    document.querySelectorAll('.type-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-type') === type);
    });
  }

  function setupListeners() {
    document.querySelectorAll('.type-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const selectedType = e.currentTarget.getAttribute('data-type');
        WebAPICore.workflowStep(`Yêu cầu đổi AudioSession.type -> "${selectedType}"`);

        if (!('audioSession' in navigator)) {
          WebAPICore.warn(`Giả lập gán navigator.audioSession.type = "${selectedType}" (API chưa hỗ trợ trên browser này)`);
          document.querySelectorAll('.type-card').forEach(c => c.classList.remove('active'));
          e.currentTarget.classList.add('active');
          return;
        }

        try {
          navigator.audioSession.type = selectedType;
          WebAPICore.success(`Đã cập nhật type = "${selectedType}"`);
          updateStatusDisplay();
        } catch (err) {
          WebAPICore.error(`Lỗi đổi type = "${selectedType}":`, err);
        }
      });
    });

    const btnPlay = document.getElementById('btn-play-tone');
    const btnStop = document.getElementById('btn-stop-tone');
    const btnToggleListen = document.getElementById('btn-toggle-listen-state');

    btnPlay.addEventListener('click', () => {
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx) audioCtx = new AudioCtxClass();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        if (oscillator) {
          oscillator.stop();
          oscillator.disconnect();
        }

        oscillator = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(528, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);

        oscillator.connect(gain);
        gain.connect(audioCtx.destination);
        oscillator.start();

        WebAPICore.workflowStep("Bật sóng âm 528Hz. AudioSession chuyển sang Active");
        updateStatusDisplay();
      } catch (err) {
        WebAPICore.error("Lỗi phát âm thanh:", err);
      }
    });

    btnStop.addEventListener('click', () => {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
        WebAPICore.info("Đã tắt âm thanh.");
      }
      updateStatusDisplay();
    });

    btnToggleListen.addEventListener('click', () => {
      if (!('audioSession' in navigator)) {
        WebAPICore.warn("navigator.audioSession không khả dụng để lắng nghe statechange.");
        return;
      }

      if (!isListeningStateChange) {
        navigator.audioSession.addEventListener('statechange', onSessionStateChange);
        isListeningStateChange = true;
        btnToggleListen.classList.add('btn-success');
        btnToggleListen.innerText = "✔ Đang theo dõi (statechange)";
        WebAPICore.success("Đã bật lắng nghe 'statechange'.");
      } else {
        navigator.audioSession.removeEventListener('statechange', onSessionStateChange);
        isListeningStateChange = false;
        btnToggleListen.classList.remove('btn-success');
        btnToggleListen.innerText = "Bật Lắng Nghe (statechange)";
        WebAPICore.info("Đã tắt theo dõi 'statechange'.");
      }
    });

    function onSessionStateChange(event) {
      WebAPICore.event("statechange", {
        type: navigator.audioSession.type,
        state: navigator.audioSession.state,
        timestamp: new Date().toLocaleTimeString()
      });
      updateStatusDisplay();
    }
  }

})();
