// webapis/background_tasks/script.js - Background Tasks API: Workflow thực tế
(function() {
  'use strict';

  let currentIdleHandle = null;
  let taskQueue = [];
  let totalTasks = 0;
  let processedTasks = 0;

  WebAPICore.init({
    id: "background_tasks",
    name: "Background Tasks API (requestIdleCallback)",
    group: "B",
    category: "Performance & Tasks",
    status: "Standard",
    browserMatrix: {
      chrome: "47+",
      edge: "79+",
      firefox: "55+",
      safari: "17.4+"
    },
    supportCheck: () => {
      return 'requestIdleCallback' in window;
    },
    why: "Giữ vững 60-120fps cho trang web: cho phép lập lịch chạy tác vụ nặng (analytics, indexing dữ liệu, dọn cache) chỉ trong các khoảng trống CPU giữa các chu kỳ vẽ khung hình mà không làm đơ giao diện.",
    whenToUse: "Gửi log phân tích telemetry, lọc/phân loại mảng dữ liệu lớn hàng chục ngàn phần tử, preload tài nguyên phụ trước khi người dùng cần.",
    whenNotToUse: "Vẽ animation DOM (bắt buộc dùng requestAnimationFrame); xử lý sự kiện click/input của người dùng cần phản hồi tức thì dưới 16ms.",
    coreItems: [
      "window.requestIdleCallback(callback, { timeout })",
      "window.cancelIdleCallback(handleId)",
      "IdleDeadline.prototype.timeRemaining()",
      "IdleDeadline.prototype.didTimeout"
    ],
    onReady: function(core) {
      core.workflowStep("Khởi động môi trường kiểm tra Background Tasks");
      setupListeners();
    }
  });

  // Tác vụ tính toán số nguyên tố giả lập khối lượng CPU
  function doHeavyMath(difficulty) {
    let count = 0;
    for (let i = 2; i <= difficulty; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) { isPrime = false; break; }
      }
      if (isPrime) count++;
    }
    return count;
  }

  function setupListeners() {
    const btnRunBlocking = document.getElementById('btn-run-blocking');
    const btnRunIdle = document.getElementById('btn-run-idle-tasks');
    const btnScheduleTimeout = document.getElementById('btn-schedule-timeout');
    const btnCancelTask = document.getElementById('btn-cancel-task');
    const progressFill = document.getElementById('idle-progress-fill');
    const countLabel = document.getElementById('idle-tasks-count-label');
    const timeLabel = document.getElementById('idle-time-remaining-label');
    const timeoutBox = document.getElementById('timeout-result-box');

    // 1. Chạy đồng bộ làm đứng hình
    btnRunBlocking.addEventListener('click', () => {
      const numTasks = parseInt(document.getElementById('num-tasks-input').value, 10) || 500;
      const difficulty = parseInt(document.getElementById('task-difficulty-input').value, 10) || 2000;

      WebAPICore.workflowStep(`Bắt đầu chạy ${numTasks} tác vụ ĐỒNG BỘ (Sẽ làm khựng quả cầu animation)`);
      const startTime = performance.now();

      for (let i = 0; i < numTasks; i++) {
        doHeavyMath(difficulty);
      }

      const elapsed = (performance.now() - startTime).toFixed(2);
      progressFill.style.width = '100%';
      countLabel.innerText = `Đã xử lý: ${numTasks} / ${numTasks} (Khựng UI trong ${elapsed} ms)`;
      WebAPICore.error(`Đã chiếm dụng Main Thread liên tục trong ${elapsed} ms! Trình duyệt bị đơ trong suốt thời gian này.`);
    });

    // 2. Chạy qua requestIdleCallback
    btnRunIdle.addEventListener('click', () => {
      if (!('requestIdleCallback' in window)) {
        WebAPICore.error("Trình duyệt không hỗ trợ requestIdleCallback.");
        return;
      }

      const numTasks = parseInt(document.getElementById('num-tasks-input').value, 10) || 1000;
      const difficulty = parseInt(document.getElementById('task-difficulty-input').value, 10) || 2000;

      totalTasks = numTasks;
      processedTasks = 0;
      taskQueue = [];
      for (let i = 0; i < numTasks; i++) taskQueue.push(i);

      progressFill.style.width = '0%';
      countLabel.innerText = `Đã xử lý: 0 / ${totalTasks}`;

      WebAPICore.workflowStep(`Lập lịch ${numTasks} tác vụ qua requestIdleCallback (Animation vẫn chạy mượt mà)`);
      const overallStart = performance.now();

      function processIdleChunk(deadline) {
        // Chỉ chạy tác vụ trong khi deadline.timeRemaining() còn lớn hơn 1ms hoặc bị timeout
        while ((deadline.timeRemaining() > 1 || deadline.didTimeout) && taskQueue.length > 0) {
          taskQueue.shift();
          doHeavyMath(difficulty);
          processedTasks++;
        }

        const pct = Math.round((processedTasks / totalTasks) * 100);
        progressFill.style.width = `${pct}%`;
        countLabel.innerText = `Đã xử lý: ${processedTasks} / ${totalTasks} (${pct}%)`;
        timeLabel.innerText = `timeRemaining(): ${deadline.timeRemaining().toFixed(2)} ms`;

        if (taskQueue.length > 0) {
          // Còn tác vụ -> tiếp tục đăng ký chu kỳ rảnh rỗi tiếp theo
          currentIdleHandle = window.requestIdleCallback(processIdleChunk);
        } else {
          const totalElapsed = (performance.now() - overallStart).toFixed(2);
          WebAPICore.success(`Hoàn tất 100% (${totalTasks} tác vụ) trong ${totalElapsed} ms mà KHÔNG hề làm gián đoạn chuyển động UI!`);
        }
      }

      currentIdleHandle = window.requestIdleCallback(processIdleChunk);
    });

    // 3. Lập lịch timeout
    btnScheduleTimeout.addEventListener('click', () => {
      if (!('requestIdleCallback' in window)) return;

      WebAPICore.workflowStep("Gọi requestIdleCallback với { timeout: 2000 }");
      const scheduleTime = performance.now();

      currentIdleHandle = window.requestIdleCallback((deadline) => {
        const waitedMs = (performance.now() - scheduleTime).toFixed(2);
        timeoutBox.innerHTML = `
          <div>Thời gian từ lúc lập lịch đến lúc chạy: <strong>${waitedMs} ms</strong></div>
          <div>deadline.didTimeout: <strong style="color:${deadline.didTimeout ? '#f59e0b' : '#34d399'}">${deadline.didTimeout}</strong></div>
          <div>deadline.timeRemaining(): <strong>${deadline.timeRemaining().toFixed(2)} ms</strong></div>
        `;
        WebAPICore.success(`Tác vụ timeout đã được thực thi sau ${waitedMs} ms (didTimeout = ${deadline.didTimeout})`);
      }, { timeout: 2000 });

      timeoutBox.innerHTML = `<div>Đã lên lịch tác vụ (Handle ID: ${currentIdleHandle}). Đang đợi CPU rảnh hoặc hết 2 giây...</div>`;
    });

    // 4. Huỷ tác vụ
    btnCancelTask.addEventListener('click', () => {
      if (!currentIdleHandle) {
        WebAPICore.warn("Chưa có tác vụ nào đang trong hàng đợi để huỷ.");
        return;
      }

      WebAPICore.workflowStep(`Gọi window.cancelIdleCallback(${currentIdleHandle})`);
      window.cancelIdleCallback(currentIdleHandle);
      WebAPICore.warn(`Đã huỷ thành công tác vụ ID: ${currentIdleHandle}`);
      timeoutBox.innerHTML = `<div>Đã gọi cancelIdleCallback(${currentIdleHandle}). Tác vụ đã bị loại bỏ khỏi hàng đợi!</div>`;
      currentIdleHandle = null;
    });
  }

})();
