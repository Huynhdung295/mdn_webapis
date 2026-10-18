// webapis/prioritized_task_scheduling/script.js - Prioritized Task Scheduling API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentTaskController = null;

  const spec = {
    id: "prioritized_task_scheduling",
    panels: [
      {
        id: "panel-scheduler-test",
        title: "1. Thử Nghiệm Lập Lịch Phân Cấp Ưu Tiên (scheduler.postTask)",
        badge: "scheduler.postTask()",
        desc: "Bắn cùng lúc 3 tác vụ có mức ưu tiên khác nhau: 'background' (thấp), 'user-visible' (vừa), 'user-blocking' (cao nhất) để kiểm chứng thứ tự thực thi của CPU trình duyệt.",
        actions: [
          { id: "btn-run-priority-race", label: "Chạy Cuộc Đua 3 Thứ Hạng Ưu Tiên", variant: "primary", handler: "runPriorityRace" },
          { id: "btn-post-cancellable", label: "Tạo Tác Vụ Có Thể Huỷ / Đổi Ưu Tiên", variant: "secondary", handler: "createCancellableTask" },
          { id: "btn-abort-task", label: "Huỷ Tác Vụ (controller.abort)", variant: "danger", handler: "abortTask" }
        ],
        previewBox: {
          id: "scheduler-status-box",
          initialText: "Chưa kích hoạt tác vụ nào."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Prioritized Task Scheduling API khởi động");
      if (!('scheduler' in window) || !('postTask' in window.scheduler)) {
        ctx.warn("window.scheduler.postTask chưa được hỗ trợ native trên trình duyệt này (Hỗ trợ tốt nhất trên Chrome 94+, Edge 94+).");
      } else {
        ctx.success("window.scheduler.postTask sẵn sàng hoạt động!");
      }
    },

    runPriorityRace: (ctx) => {
      if (!('scheduler' in window) || !('postTask' in window.scheduler)) {
        ctx.warn("window.scheduler không khả dụng.");
        return;
      }

      ctx.workflowStep("Đẩy đồng thời 3 tác vụ vào hàng đợi scheduler với thứ tự gọi ngược (background -> user-visible -> user-blocking)");

      const executionOrder = [];

      // 1. Đẩy background trước
      scheduler.postTask(() => {
        executionOrder.push("3. [background] (Chạy cuối cùng dù được enqueue trước)");
        ctx.info("Đã xong tác vụ [background]");
        updateBox();
      }, { priority: 'background' });

      // 2. Đẩy user-visible
      scheduler.postTask(() => {
        executionOrder.push("2. [user-visible] (Chạy ở mức ưu tiên tiêu chuẩn)");
        ctx.info("Đã xong tác vụ [user-visible]");
        updateBox();
      }, { priority: 'user-visible' });

      // 3. Đẩy user-blocking sau cùng
      scheduler.postTask(() => {
        executionOrder.push("1. [user-blocking] (VƯỢT LÊN ĐẦU TIÊN để phản hồi UI ngay lập tức!)");
        ctx.success("Đã xong tác vụ [user-blocking]");
        updateBox();
      }, { priority: 'user-blocking' });

      function updateBox() {
        ctx.setHtml('scheduler-status-box', `
          <div style="font-weight:600; color:#34d399; margin-bottom:6px;">● Thứ tự hoàn thành thực tế do CPU lập lịch:</div>
          <ol style="margin:0; padding-left:20px; font-family:var(--font-mono); font-size:0.8rem; line-height:1.6;">
            ${executionOrder.map(item => `<li>${item}</li>`).join('')}
          </ol>
        `);
      }
    },

    createCancellableTask: (ctx) => {
      if (!('scheduler' in window) || !('postTask' in window.scheduler)) return;

      const TaskControllerClass = window.TaskController || window.AbortController;
      currentTaskController = new TaskControllerClass({ priority: 'background' });

      ctx.workflowStep("Lập lịch tác vụ có độ trễ 2000ms có gắn signal huỷ bỏ");
      ctx.setHtml('scheduler-status-box', 'Đang chờ 2000ms... Bấm "Huỷ Tác Vụ" ngay nếu muốn ngắt!');

      scheduler.postTask(() => {
        ctx.success("Tác vụ đã hoàn thành sau 2 giây trì hoãn an toàn.");
        ctx.setHtml('scheduler-status-box', 'Tác vụ đã hoàn tất thành công!');
        currentTaskController = null;
      }, {
        delay: 2000,
        signal: currentTaskController.signal
      }).catch(err => {
        if (err.name === 'AbortError') {
          ctx.warn("Tác vụ đã bị huỷ thành công qua signal.abort()!");
          ctx.setHtml('scheduler-status-box', '<span style="color:#f87171;">Tác vụ đã bị huỷ (AbortError).</span>');
        } else {
          ctx.error("Lỗi:", err);
        }
      });
    },

    abortTask: (ctx) => {
      ctx.workflowStep("Gọi currentTaskController.abort()");
      if (currentTaskController) {
        currentTaskController.abort();
        currentTaskController = null;
      } else {
        ctx.warn("Không có tác vụ nào đang chờ để huỷ.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
