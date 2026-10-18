// webapis/web_speech/script.js - Web Speech API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let recognitionInstance = null;

  const spec = {
    id: "web_speech",
    panels: [
      {
        id: "panel-tts",
        title: "1. Chuyển Văn Bản Thành Giọng Nói (Text-to-Speech)",
        badge: "window.speechSynthesis",
        desc: "Đọc to bất kỳ đoạn văn bản nào bằng các giọng đọc tự nhiên có sẵn trong hệ điều hành.",
        inputs: [
          { id: "tts-input-text", label: "Văn bản cần đọc:", type: "textarea", rows: 2, value: "Xin chào! Bạn đang trải nghiệm phòng thí nghiệm Web APIs chuẩn MDN." },
          { id: "tts-rate", label: "Tốc độ đọc (rate 0.5 - 2.0):", type: "text", value: "1.0" },
          { id: "tts-pitch", label: "Cao độ giọng (pitch 0.5 - 2.0):", type: "text", value: "1.0" }
        ],
        actions: [
          { id: "btn-speak-now", label: "Đọc Văn Bản (speechSynthesis.speak)", variant: "primary", handler: "speakText" },
          { id: "btn-pause-speech", label: "Tạm Dừng / Tiếp Tục", variant: "secondary", handler: "togglePauseSpeech" },
          { id: "btn-cancel-speech", label: "Dừng Hẳn (cancel)", variant: "danger", handler: "cancelSpeech" }
        ],
        previewBox: {
          id: "tts-status-box",
          initialText: "Trạng thái: Sẵn sàng đọc."
        }
      },
      {
        id: "panel-stt",
        title: "2. Nhận Diện Giọng Nói Thành Chữ (Speech Recognition)",
        badge: "webkitSpeechRecognition",
        desc: "Bật microphone để chuyển lời nói tiếng Việt của bạn thành chữ viết trực tiếp thời gian thực.",
        actions: [
          { id: "btn-start-record", label: "Bắt Đầu Ghi Âm Nói", variant: "primary", handler: "startRecognition" },
          { id: "btn-stop-record", label: "Dừng Ghi Âm", variant: "danger", handler: "stopRecognition" }
        ],
        previewBox: {
          id: "stt-result-box",
          initialText: "Chưa ghi âm giọng nói nào."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Web Speech API sẵn sàng");
      if ('speechSynthesis' in window) {
        ctx.success("SpeechSynthesis (Text-to-Speech) sẵn sàng!");
      }
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        ctx.success("SpeechRecognition (Speech-to-Text) sẵn sàng!");
      } else {
        ctx.warn("SpeechRecognition chưa được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome / Edge).");
      }
    },

    speakText: (ctx) => {
      if (!('speechSynthesis' in window)) {
        ctx.error("Trình duyệt không hỗ trợ speechSynthesis.");
        return;
      }

      const text = ctx.getVal('tts-input-text');
      const rate = parseFloat(ctx.getVal('tts-rate')) || 1.0;
      const pitch = parseFloat(ctx.getVal('tts-pitch')) || 1.0;

      ctx.workflowStep(`Tạo new SpeechSynthesisUtterance("${text}")`);
      speechSynthesis.cancel(); // huỷ giọng cũ nếu có

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;

      // Ưu tiên chọn giọng tiếng Việt nếu có trong OS
      const voices = speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.startsWith('vi') || v.lang.startsWith('vi_VN'));
      if (viVoice) {
        utterance.voice = viVoice;
        ctx.info(`Đã chọn giọng: ${viVoice.name} (${viVoice.lang})`);
      }

      utterance.onstart = () => {
        ctx.success("Đang phát âm thanh giọng đọc...");
        ctx.setHtml('tts-status-box', '<div style="color:#34d399; font-weight:700;">● Đang đọc văn bản...</div>');
      };

      utterance.onend = () => {
        ctx.info("Đã hoàn tất đọc văn bản.");
        ctx.setHtml('tts-status-box', 'Trạng thái: Đã đọc xong.');
      };

      utterance.onerror = (e) => {
        ctx.error("Lỗi khi đọc giọng nói:", e);
      };

      speechSynthesis.speak(utterance);
    },

    togglePauseSpeech: (ctx) => {
      if (!('speechSynthesis' in window)) return;
      if (speechSynthesis.paused) {
        ctx.workflowStep("speechSynthesis.resume()");
        speechSynthesis.resume();
        ctx.info("Đã tiếp tục phát giọng đọc.");
      } else if (speechSynthesis.speaking) {
        ctx.workflowStep("speechSynthesis.pause()");
        speechSynthesis.pause();
        ctx.warn("Đã tạm dừng giọng đọc.");
      }
    },

    cancelSpeech: (ctx) => {
      if (!('speechSynthesis' in window)) return;
      ctx.workflowStep("speechSynthesis.cancel()");
      speechSynthesis.cancel();
      ctx.info("Đã huỷ giọng đọc.");
      ctx.setHtml('tts-status-box', 'Trạng thái: Đã dừng.');
    },

    startRecognition: (ctx) => {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        ctx.error("Trình duyệt không hỗ trợ SpeechRecognition.");
        return;
      }

      ctx.workflowStep("Khởi động SpeechRecognition (Ngôn ngữ: vi-VN)");
      try {
        recognitionInstance = new SpeechRec();
        recognitionInstance.lang = 'vi-VN';
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;

        recognitionInstance.onstart = () => {
          ctx.success("Microphone đang lắng nghe! Hãy nói vào mic...");
          ctx.setHtml('stt-result-box', '<div style="color:#34d399; font-weight:700;">🎤 Đang lắng nghe giọng nói của bạn... Hãy nói gì đó!</div>');
        };

        recognitionInstance.onresult = (e) => {
          const transcript = Array.from(e.results)
            .map(res => res[0].transcript)
            .join('');
          const isFinal = e.results[0].isFinal;

          ctx.event("Speech recognition result", { transcript, isFinal });
          ctx.setHtml('stt-result-box', `
            <div style="color:#38bdf8; font-weight:700; margin-bottom:4px;">● Kết quả nhận diện (${isFinal ? 'Chính thức' : 'Tạm thời'}):</div>
            <div style="font-size:1.1rem; color:#f8fafc; background:rgba(0,0,0,0.3); padding:10px; border-radius:6px;">
              "${ctx.escapeHtml(transcript)}"
            </div>
          `);
        };

        recognitionInstance.onerror = (err) => {
          ctx.error("Lỗi nhận diện giọng nói:", err.error);
        };

        recognitionInstance.start();
      } catch (err) {
        ctx.error("Không thể bật microphone:", err.message);
      }
    },

    stopRecognition: (ctx) => {
      ctx.workflowStep("Dừng SpeechRecognition");
      if (recognitionInstance) {
        recognitionInstance.stop();
        recognitionInstance = null;
        ctx.info("Đã dừng nhận diện giọng nói.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
