// webapis/audio_output_devices/script.js - Audio Output Devices API: Workflow thực tế
(function() {
  'use strict';

  let discoveredOutputs = [];
  let currentAudioContext = null;
  let currentOscillator = null;

  WebAPICore.init({
    id: "audio_output_devices",
    name: "Audio Output Devices API",
    group: "A",
    category: "Audio & Media",
    status: "Standard",
    browserMatrix: {
      chrome: "49+",
      edge: "79+",
      firefox: "Flag",
      safari: "17+"
    },
    supportCheck: () => {
      return (
        typeof navigator !== 'undefined' &&
        navigator.mediaDevices &&
        ('selectAudioOutput' in navigator.mediaDevices || 'enumerateDevices' in navigator.mediaDevices) &&
        typeof HTMLMediaElement !== 'undefined' &&
        ('setSinkId' in HTMLMediaElement.prototype)
      );
    },
    why: "Mặc định trình duyệt phát toàn bộ âm thanh ra loa hệ thống mặc định. API này cho phép code JS can thiệp và định tuyến từng thẻ <audio>/<video> hoặc Web Audio ra loa ngoài, tai nghe có dây hay tai nghe Bluetooth cụ thể theo ý người dùng.",
    whenToUse: "Ứng dụng gọi thoại (Zoom, Google Meet, Discord): tiếng chuông reo phát ra loa ngoài laptop, nhưng giọng người nói phát riêng vào tai nghe; bàn mixer DJ phát nhạc nền ra loa chính và nhạc cue ra tai nghe.",
    whenNotToUse: "Website thông thường chỉ phát 1 video hay audio đơn giản không cần tách luồng thiết bị; hoặc trang chạy ở ngữ cảnh không bảo mật (non-HTTPS).",
    coreItems: [
      "navigator.mediaDevices.enumerateDevices()",
      "navigator.mediaDevices.selectAudioOutput()",
      "HTMLMediaElement.prototype.setSinkId(deviceId)",
      "HTMLMediaElement.prototype.sinkId",
      "AudioContext.prototype.setSinkId(deviceId)"
    ],
    onReady: function(core) {
      core.workflowStep("Khởi động môi trường kiểm tra Audio Output Devices");
      setupListeners();
      generateSampleAudioClip();
    }
  });

  function generateSampleAudioClip() {
    try {
      const sampleRate = 44100;
      const durationSeconds = 3;
      const numSamples = sampleRate * durationSeconds;
      const buffer = new ArrayBuffer(44 + numSamples * 2);
      const view = new DataView(buffer);

      function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }

      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + numSamples * 2, true);
      writeString(view, 8, 'WAVE');
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeString(view, 36, 'data');
      view.setUint32(40, numSamples * 2, true);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const envelope = Math.sin((Math.PI * t) / durationSeconds);
        const sampleVal = Math.sin(2 * Math.PI * 440 * t) * 0.7 + Math.sin(2 * Math.PI * 880 * t) * 0.3;
        const sample16 = Math.max(-1, Math.min(1, sampleVal * envelope)) * 0x7FFF;
        view.setInt16(44 + i * 2, sample16, true);
      }

      const blob = new Blob([buffer], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);
      const audioPlayer = document.getElementById('demo-audio-player');
      if (audioPlayer) audioPlayer.src = audioUrl;
    } catch (err) {
      WebAPICore.warn("Lỗi sinh âm thanh mẫu:", err);
    }
  }

  function setupListeners() {
    const btnEnumerate = document.getElementById('btn-enumerate-devices');
    const btnSelectOutput = document.getElementById('btn-select-audio-output');
    const btnListenChange = document.getElementById('btn-listen-device-change');
    const btnApplySink = document.getElementById('btn-apply-sink-id');
    const btnTestInvalid = document.getElementById('btn-test-invalid-sink');
    const btnGenerateTone = document.getElementById('btn-generate-tone-audio');
    const btnPlayWebAudio = document.getElementById('btn-play-webaudio-tone');
    const btnStopWebAudio = document.getElementById('btn-stop-webaudio-tone');
    const btnApplyWebAudioSink = document.getElementById('btn-apply-webaudio-sink');
    const selectTarget = document.getElementById('select-target-device');
    const audioPlayer = document.getElementById('demo-audio-player');
    const inputSinkId = document.getElementById('input-current-sink-id');

    // 1. Quét danh sách thiết bị
    btnEnumerate.addEventListener('click', async () => {
      WebAPICore.workflowStep("Bắt đầu quét danh sách phần cứng: enumerateDevices()");
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        WebAPICore.error("Trình duyệt không hỗ trợ navigator.mediaDevices.enumerateDevices()");
        return;
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        discoveredOutputs = devices.filter(d => d.kind === 'audiooutput');

        WebAPICore.success(`Tìm thấy ${discoveredOutputs.length} thiết bị đầu ra âm thanh:`, discoveredOutputs.map(d => ({
          deviceId: d.deviceId || 'default',
          label: d.label || '(Nhãn bị ẩn do chưa xin quyền microphone)',
          groupId: d.groupId
        })));

        renderDevicesList(discoveredOutputs);
        populateDeviceSelect(discoveredOutputs);
      } catch (err) {
        WebAPICore.error("Lỗi khi quét thiết bị:", err);
      }
    });

    // 2. Mở dialog chọn loa
    btnSelectOutput.addEventListener('click', async () => {
      WebAPICore.workflowStep("Kích hoạt hộp thoại hệ thống: selectAudioOutput()");
      if (!navigator.mediaDevices || !navigator.mediaDevices.selectAudioOutput) {
        WebAPICore.warn("selectAudioOutput() không khả dụng (Cần Chrome 110+ trên Desktop)");
        return;
      }

      try {
        const device = await navigator.mediaDevices.selectAudioOutput();
        WebAPICore.success(`Người dùng đã chọn: "${device.label}" (ID: ${device.deviceId.substring(0, 10)}...)`, {
          deviceId: device.deviceId,
          label: device.label
        });

        if (!discoveredOutputs.some(d => d.deviceId === device.deviceId)) {
          discoveredOutputs.push(device);
        }
        renderDevicesList(discoveredOutputs);
        populateDeviceSelect(discoveredOutputs, device.deviceId);

        if (typeof audioPlayer.setSinkId === 'function') {
          await audioPlayer.setSinkId(device.deviceId);
          inputSinkId.value = audioPlayer.sinkId || '"" (default)';
          WebAPICore.workflowStep(`Đã tự động gán setSinkId("${device.deviceId}") vào thẻ <audio>`);
        }
      } catch (err) {
        if (err.name === 'NotFoundError') {
          WebAPICore.warn("Người dùng đã bấm Huỷ / đóng hộp thoại chọn thiết bị.");
        } else {
          WebAPICore.error("Lỗi gọi selectAudioOutput():", err);
        }
      }
    });

    // 3. Lắng nghe thay đổi phần cứng
    let isListeningChange = false;
    btnListenChange.addEventListener('click', () => {
      if (!navigator.mediaDevices) return;

      if (!isListeningChange) {
        navigator.mediaDevices.addEventListener('devicechange', onDeviceChange);
        isListeningChange = true;
        btnListenChange.classList.add('btn-success');
        btnListenChange.innerText = "✔ Đang theo dõi (devicechange)";
        WebAPICore.success("Đã bật lắng nghe 'devicechange'. Hãy thử cắm hoặc rút tai nghe/loa.");
      } else {
        navigator.mediaDevices.removeEventListener('devicechange', onDeviceChange);
        isListeningChange = false;
        btnListenChange.classList.remove('btn-success');
        btnListenChange.innerText = "⚡ Theo dõi sự kiện (devicechange)";
        WebAPICore.info("Đã tắt theo dõi 'devicechange'.");
      }
    });

    function onDeviceChange(event) {
      WebAPICore.event("devicechange", {
        timestamp: new Date().toLocaleTimeString(),
        note: "Phát hiện thiết bị âm thanh vừa cắm vào hoặc rút ra khỏi máy tính!"
      });
      btnEnumerate.click();
    }

    // 4. Áp dụng setSinkId
    btnApplySink.addEventListener('click', async () => {
      const selectedId = selectTarget.value;
      WebAPICore.workflowStep(`Thực thi audioPlayer.setSinkId("${selectedId}")`);

      if (typeof audioPlayer.setSinkId !== 'function') {
        WebAPICore.error("Trình duyệt không hỗ trợ HTMLMediaElement.prototype.setSinkId");
        return;
      }

      try {
        await audioPlayer.setSinkId(selectedId);
        inputSinkId.value = audioPlayer.sinkId === '' ? '"" (Mặc định hệ thống)' : audioPlayer.sinkId;
        WebAPICore.success(`Đã định tuyến thành công! sinkId hiện hành: "${audioPlayer.sinkId}"`);
      } catch (err) {
        WebAPICore.error("Lỗi khi gọi setSinkId():", err);
      }
    });

    // 5. Bẫy lỗi sinkId giả
    btnTestInvalid.addEventListener('click', async () => {
      const fakeId = "invalid_sink_id_not_found_404";
      WebAPICore.workflowStep(`Thử gán sinkId không hợp lệ: "${fakeId}"`);

      try {
        await audioPlayer.setSinkId(fakeId);
        WebAPICore.warn("Bất ngờ: Trình duyệt không ném ngoại lệ!");
      } catch (err) {
        WebAPICore.success(`Bẫy lỗi chuẩn xác! Ngoại lệ: ${err.name} - ${err.message}`);
      }
    });

    // Phát âm thanh mẫu
    btnGenerateTone.addEventListener('click', () => {
      audioPlayer.currentTime = 0;
      audioPlayer.play().then(() => {
        WebAPICore.info(`Đang phát âm thanh mẫu qua thiết bị: "${audioPlayer.sinkId || 'Loa mặc định'}"`);
      }).catch(err => {
        WebAPICore.error("Lỗi phát âm thanh:", err);
      });
    });

    // 6. Web Audio API
    btnPlayWebAudio.addEventListener('click', () => {
      try {
        if (!currentAudioContext) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          currentAudioContext = new AudioContextClass();
        }

        if (currentAudioContext.state === 'suspended') currentAudioContext.resume();

        if (currentOscillator) {
          currentOscillator.stop();
          currentOscillator.disconnect();
        }

        currentOscillator = currentAudioContext.createOscillator();
        const gainNode = currentAudioContext.createGain();

        currentOscillator.type = 'sine';
        currentOscillator.frequency.setValueAtTime(440, currentAudioContext.currentTime);
        gainNode.gain.setValueAtTime(0.12, currentAudioContext.currentTime);

        currentOscillator.connect(gainNode);
        gainNode.connect(currentAudioContext.destination);
        currentOscillator.start();

        updateWebAudioStatus();
        WebAPICore.workflowStep("Bật sóng Synth 440Hz qua AudioContext");
      } catch (err) {
        WebAPICore.error("Lỗi khởi tạo Web Audio:", err);
      }
    });

    btnStopWebAudio.addEventListener('click', () => {
      if (currentOscillator) {
        currentOscillator.stop();
        currentOscillator.disconnect();
        currentOscillator = null;
        WebAPICore.info("Đã tắt sóng Synth.");
      }
      updateWebAudioStatus();
    });

    btnApplyWebAudioSink.addEventListener('click', async () => {
      if (!currentAudioContext) {
        WebAPICore.warn("Khởi tạo AudioContext trước bằng nút 'Bật Sóng Âm Synth'.");
        return;
      }

      if (typeof currentAudioContext.setSinkId !== 'function') {
        WebAPICore.warn("AudioContext.setSinkId() không được hỗ trợ trên trình duyệt này.");
        return;
      }

      const selectedId = selectTarget.value;
      WebAPICore.workflowStep(`Gọi AudioContext.setSinkId("${selectedId}")`);
      try {
        await currentAudioContext.setSinkId(selectedId);
        WebAPICore.success(`AudioContext đã chuyển sang loa: ${JSON.stringify(currentAudioContext.sinkId)}`);
        updateWebAudioStatus();
      } catch (err) {
        WebAPICore.error("Lỗi khi gán AudioContext.setSinkId():", err);
      }
    });

    function updateWebAudioStatus() {
      const box = document.getElementById('webaudio-status-box');
      if (!box || !currentAudioContext) return;
      const sinkVal = currentAudioContext.sinkId !== undefined ? JSON.stringify(currentAudioContext.sinkId) : 'Không hỗ trợ';
      box.innerHTML = `Trạng thái: <strong>${currentAudioContext.state}</strong> | sinkId: <strong>${sinkVal}</strong> | Oscillator: <strong>${currentOscillator ? 'Đang phát' : 'Đang tắt'}</strong>`;
    }
  }

  function renderDevicesList(devices) {
    const container = document.getElementById('devices-container');
    if (!container) return;

    if (devices.length === 0) {
      container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.82rem;">Không tìm thấy thiết bị audiooutput nào.</span>`;
      return;
    }

    container.innerHTML = devices.map((d, index) => {
      const label = d.label || `Thiết bị #${index + 1} (Chưa cấp quyền nhãn)`;
      return `
        <div class="device-item" data-id="${d.deviceId}">
          <div>
            <div style="font-weight: 600; color: #fff; font-size: 0.85rem;">${label}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">ID: ${d.deviceId || '(Default)'}</div>
          </div>
          <button type="button" class="btn btn-secondary btn-set-this" data-id="${d.deviceId}" style="padding: 3px 8px; font-size: 0.75rem;">
            Chọn Loa Này
          </button>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-set-this').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const select = document.getElementById('select-target-device');
        if (select) {
          select.value = id;
          document.getElementById('btn-apply-sink-id').click();
        }
      });
    });
  }

  function populateDeviceSelect(devices, selectedId = "") {
    const select = document.getElementById('select-target-device');
    if (!select) return;

    select.innerHTML = `<option value="">(Mặc định hệ thống - Default)</option>` + devices.map((d, index) => {
      const label = d.label || `Thiết bị #${index + 1}`;
      return `<option value="${d.deviceId}">${label} (${d.deviceId.substring(0, 8)}...)</option>`;
    }).join('');

    if (selectedId) select.value = selectedId;
  }

})();
