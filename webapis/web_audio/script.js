// webapis/web_audio/script.js - Web Audio API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let audioCtx = null;
  let analyserNode = null;
  let visualizerRaf = null;

  const NOTES = [
    { note: "C4", freq: 261.63 },
    { note: "D4", freq: 293.66 },
    { note: "E4", freq: 329.63 },
    { note: "F4", freq: 349.23 },
    { note: "G4", freq: 392.00 },
    { note: "A4", freq: 440.00 },
    { note: "B4", freq: 493.88 },
    { note: "C5", freq: 523.25 }
  ];

  const spec = {
    id: "web_audio",
    panels: [
      {
        id: "panel-audio-synth",
        title: "1. Nhạc Cụ Tổng Hợp Sóng Âm (Audio Synthesizer & Spectrum)",
        badge: "AudioContext & AnalyserNode",
        desc: "Tạo đồ thị âm thanh chuyên nghiệp (Audio Graph): Oscillator ➔ Gain ➔ Analyser ➔ Destination và vẽ phổ tần số FFT thời gian thực.",
        inputs: [
          { id: "synth-wave-type", label: "Dạng sóng âm (Oscillator wave):", type: "select", options: [
            { value: "sine", label: "Sine (Mượt mà / Tiếng chuông)" },
            { value: "square", label: "Square (Game 8-bit cổ điển)" },
            { value: "sawtooth", label: "Sawtooth (Âm sắc Synth điện tử sắc nét)" },
            { value: "triangle", label: "Triangle (Âm sáo dịu)" }
          ]}
        ],
        customHtml: `
          <div>
            <canvas id="audio-visualizer" class="audio-visualizer-canvas" width="600" height="140"></canvas>
            <div class="piano-keys" id="piano-keyboard">
              ${NOTES.map(n => `<button type="button" class="piano-key" data-freq="${n.freq}">${n.note}</button>`).join('')}
            </div>
          </div>
        `,
        actions: [
          { id: "btn-play-chord", label: "Phát Hợp Âm Đô Trưởng (C Major Chord)", variant: "primary", handler: "playChord" }
        ],
        previewBox: {
          id: "audio-status-box",
          initialText: "Nhấn vào các phím đàn ở trên để nghe âm thanh và xem phổ tần số."
        }
      }
    ]
  };

  function initAudioContext() {
    if (!audioCtx) {
      const AudioClass = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
      if (!AudioClass) {
        return false;
      }
      try {
        audioCtx = new AudioClass();
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 64;
        analyserNode.connect(audioCtx.destination);
        startVisualizer();
      } catch (e) {
        return false;
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return true;
  }

  function startVisualizer() {
    const canvas = document.getElementById('audio-visualizer');
    if (!canvas) return;
    const c = canvas.getContext('2d');
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      visualizerRaf = requestAnimationFrame(draw);
      analyserNode.getByteFrequencyData(dataArray);

      c.fillStyle = '#020617';
      c.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) - 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        c.fillStyle = `hsl(${(i / bufferLength) * 240 + 160}, 85%, 60%)`;
        c.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
      }
    }
    draw();
  }

  function playTone(freq, duration = 0.4, waveType = 'sine') {
    if (!initAudioContext() || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // ADSR Envelope: Attack nhẹ, Decay dần về 0
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(analyserNode);

      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('playTone error', e);
    }
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Audio API sẵn sàng");

      const keyboard = document.getElementById('piano-keyboard');
      if (keyboard) {
        keyboard.querySelectorAll('[data-freq]').forEach(btn => {
          btn.addEventListener('click', () => {
            const freq = parseFloat(btn.getAttribute('data-freq'));
            const wave = ctx.getVal('synth-wave-type') || 'sine';
            ctx.event(`Phát nốt nhạc: ${btn.innerText} (${freq}Hz, sóng: ${wave})`);
            playTone(freq, 0.5, wave);
            ctx.setHtml('audio-status-box', `• Đang phát nốt: <strong>${btn.innerText}</strong> (Tần số: <code>${freq}Hz</code>) | Sóng: <code>${wave}</code>`);
          });
        });
      }
    },

    playChord: (ctx) => {
      ctx.workflowStep("Tạo 3 luồng dao động song song: C4 (261Hz) + E4 (329Hz) + G4 (392Hz)");
      if (!initAudioContext() || !audioCtx) {
        ctx.warn("AudioContext không khả dụng.");
        return;
      }
      const wave = ctx.getVal('synth-wave-type') || 'sine';
      playTone(261.63, 1.2, wave);
      playTone(329.63, 1.2, wave);
      playTone(392.00, 1.2, wave);
      ctx.success("Đã phát hợp âm Đô Trưởng!");
      ctx.setHtml('audio-status-box', '<span style="color:#34d399;">● Đang phát Hợp âm Đô Trưởng (C Major) - Quan sát phổ âm nhảy tần số!</span>');
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
