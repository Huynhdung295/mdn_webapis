// webapis/media_session/script.js - Media Session API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let audioElement = null;
  let currentTrackIdx = 0;

  const playlist = [
    {
      title: "Antigravity Symphony in C Major",
      artist: "Google DeepMind Sound Lab",
      album: "The AI Revolution 2026",
      emoji: "🎵",
      freq: 440
    },
    {
      title: "Lo-Fi Midnight Coding Vibes",
      artist: "Cyber Programmer",
      album: "Late Night Syntax",
      emoji: "🎧",
      freq: 523.25
    },
    {
      title: "Cyberpunk 2077 Synthwave",
      artist: "Neural Beats",
      album: "Neon Dreams",
      emoji: "⚡",
      freq: 330
    }
  ];

  const spec = {
    id: "media_session",
    panels: [
      {
        id: "panel-media-session-controls",
        title: "1. Đồng Bộ Trạng Thái Với Trung Tâm Điều Khiển OS",
        badge: "navigator.mediaSession.metadata",
        desc: "Đẩy bài hát, ca sĩ, album và ảnh bìa lên Lockscreen Windows / macOS / Android / iOS và nhận lệnh từ phím cứng đa phương tiện (Media Keys).",
        customHtml: `
          <div class="now-playing-card">
            <div id="track-art-box" class="track-artwork-thumb">🎵</div>
            <div class="track-details">
              <div id="track-title-txt" class="track-title">Chưa phát nhạc</div>
              <div id="track-artist-txt" class="track-artist">Bấm nút 'Bật Nhạc Thử Nghiệm' để bắt đầu</div>
              <div id="track-album-txt" class="track-album">Lockscreen & Windows Media Overlay sẽ tự động đồng bộ</div>
            </div>
            <audio id="audio-synth-player" loop></audio>
          </div>
        `,
        actions: [
          { id: "btn-media-play", label: "▶ Phát Nhạc (Play)", variant: "primary", handler: "playTrack" },
          { id: "btn-media-pause", label: "⏸ Tạm Dừng (Pause)", variant: "secondary", handler: "pauseTrack" },
          { id: "btn-media-prev", label: "⏮ Bài Trước (Previous)", variant: "secondary", handler: "prevTrack" },
          { id: "btn-media-next", label: "⏭ Bài Kế Tiếp (Next)", variant: "secondary", handler: "nextTrack" }
        ],
        previewBox: {
          id: "session-state-preview",
          initialText: "Trạng thái: navigator.mediaSession.playbackState = 'none'"
        }
      }
    ]
  };

  function generateToneWavUrl(freq = 440) {
    const sampleRate = 8000;
    const durationSec = 2;
    const totalSamples = sampleRate * durationSec;
    const buffer = new ArrayBuffer(44 + totalSamples);
    const view = new DataView(buffer);

    function writeString(offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + totalSamples, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate, true);
    view.setUint16(32, 1, true);
    view.setUint16(34, 8, true);
    writeString(36, 'data');
    view.setUint32(40, totalSamples, true);

    for (let i = 0; i < totalSamples; i++) {
      const t = i / sampleRate;
      const sample = Math.sin(2 * Math.PI * freq * t);
      view.setUint8(44 + i, Math.floor((sample + 1) * 127.5));
    }

    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  function updateTrackMetadata(idx, ctx) {
    const track = playlist[idx];
    document.getElementById('track-art-box').innerText = track.emoji;
    document.getElementById('track-title-txt').innerText = track.title;
    document.getElementById('track-artist-txt').innerText = track.artist;
    document.getElementById('track-album-txt').innerText = track.album;

    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist,
          album: track.album,
          artwork: [
            { src: 'https://via.placeholder.com/96/38bdf8/ffffff?text=' + track.emoji, sizes: '96x96', type: 'image/png' },
            { src: 'https://via.placeholder.com/256/38bdf8/ffffff?text=' + track.emoji, sizes: '256x256', type: 'image/png' }
          ]
        });
        ctx.success(`Đã cập nhật MediaMetadata: "${track.title}" bởi ${track.artist}`);
      } catch (e) {
        ctx.warn("Lỗi cập nhật MediaMetadata:", e);
      }
    }

    if (audioElement) {
      audioElement.src = generateToneWavUrl(track.freq);
    }
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Media Session API");
      audioElement = document.getElementById('audio-synth-player');

      if (!('mediaSession' in navigator)) {
        ctx.warn("navigator.mediaSession không khả dụng trên trình duyệt này.");
        return;
      }

      ctx.success("Trình duyệt hỗ trợ đầy đủ navigator.mediaSession!");

      // Đăng ký các action handlers nhận tín hiệu từ phần cứng / media keys
      const actions = [
        ['play', () => handlers.playTrack(ctx)],
        ['pause', () => handlers.pauseTrack(ctx)],
        ['previoustrack', () => handlers.prevTrack(ctx)],
        ['nexttrack', () => handlers.nextTrack(ctx)],
        ['seekbackward', (details) => {
          ctx.workflowStep(`Tua lùi ${details.seekOffset || 10}s`);
        }],
        ['seekforward', (details) => {
          ctx.workflowStep(`Tua tới ${details.seekOffset || 10}s`);
        }],
        ['stop', () => handlers.pauseTrack(ctx)]
      ];

      actions.forEach(([action, handlerFn]) => {
        try {
          navigator.mediaSession.setActionHandler(action, handlerFn);
          ctx.workflowStep(`Đã lắng nghe action: mediaSession.setActionHandler('${action}')`);
        } catch (err) {
          // Action có thể không được hỗ trợ bởi một số browser
        }
      });

      updateTrackMetadata(currentTrackIdx, ctx);
    },

    playTrack: async (ctx) => {
      ctx.workflowStep("Yêu cầu phát nhạc và đặt mediaSession.playbackState = 'playing'");
      if (!audioElement) audioElement = document.getElementById('audio-synth-player');
      if (!audioElement) {
        ctx.warn("Không tìm thấy audio player");
        return;
      }
      if (!audioElement.src) {
        updateTrackMetadata(currentTrackIdx, ctx);
      }

      try {
        if (typeof audioElement.play === 'function') {
          await audioElement.play();
        }
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
        ctx.success("Đang phát nhạc! Bấm phím Media Play/Pause trên bàn phím máy tính hoặc nút tai nghe để thử điều khiển.");
        ctx.setHtml('session-state-preview', `<span style="color:#34d399;">● Đang phát: <strong>${playlist[currentTrackIdx].title}</strong> (playbackState: 'playing')</span>`);
      } catch (e) {
        ctx.error(`Lỗi phát audio: ${e.message}`, e);
      }
    },

    pauseTrack: (ctx) => {
      ctx.workflowStep("Tạm dừng nhạc và đặt mediaSession.playbackState = 'paused'");
      if (!audioElement) audioElement = document.getElementById('audio-synth-player');
      if (audioElement && typeof audioElement.pause === 'function') {
        audioElement.pause();
      }
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
      ctx.success("Đã tạm dừng phát nhạc.");
      ctx.setHtml('session-state-preview', `<span style="color:#f59e0b;">❚❚ Đã tạm dừng (playbackState: 'paused')</span>`);
    },

    nextTrack: (ctx) => {
      currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
      ctx.workflowStep(`Chuyển sang bài tiếp theo (Track #${currentTrackIdx + 1})`);
      updateTrackMetadata(currentTrackIdx, ctx);
      handlers.playTrack(ctx);
    },

    prevTrack: (ctx) => {
      currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
      ctx.workflowStep(`Chuyển về bài trước (Track #${currentTrackIdx + 1})`);
      updateTrackMetadata(currentTrackIdx, ctx);
      handlers.playTrack(ctx);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
