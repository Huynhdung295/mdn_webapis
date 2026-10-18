// webapis/gamepad/script.js - Gamepad API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let pollingRaf = null;
  let simulatedGamepad = null;

  const spec = {
    id: "gamepad",
    panels: [
      {
        id: "panel-gamepad-detection",
        title: "1. Giám Sát Kết Nối Tay Cầm",
        badge: "navigator.getGamepads()",
        desc: "Hệ thống tự động phát hiện tay cầm USB / Bluetooth hoặc giả lập tín hiệu tay cầm ảo.",
        actions: [
          { id: "btn-scan-gamepads", label: "Quét Tay Cầm (navigator.getGamepads)", variant: "primary", handler: "scanGamepads" },
          { id: "btn-simulate-gamepad", label: "Tạo Tay Cầm Ảo (Simulate Controller)", variant: "secondary", handler: "simulateGamepad" },
          { id: "btn-vibrate-gamepad", label: "Rung Tay Cầm (vibrationActuator)", variant: "secondary", handler: "triggerVibration" }
        ],
        customHtml: `
          <div class="gamepad-display">
            <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
              <div style="font-weight: 600; font-size: 0.8rem; color: #38bdf8; margin-bottom: 8px;">CẦN GẠT ANALOG (AXES)</div>
              <div class="axis-bar-wrap">
                <div style="font-size:0.75rem; color:var(--text-muted); display:flex; justify-content:space-between;">
                  <span>Trục 0 (Left Stick X):</span>
                  <span id="axis-0-val">0.00</span>
                </div>
                <div class="axis-bar"><div id="axis-0-fill" class="axis-fill"></div></div>
              </div>
              <div class="axis-bar-wrap">
                <div style="font-size:0.75rem; color:var(--text-muted); display:flex; justify-content:space-between;">
                  <span>Trục 1 (Left Stick Y):</span>
                  <span id="axis-1-val">0.00</span>
                </div>
                <div class="axis-bar"><div id="axis-1-fill" class="axis-fill"></div></div>
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
              <div style="font-weight: 600; font-size: 0.8rem; color: #34d399; margin-bottom: 8px;">NÚT BẤM (BUTTONS 0-7)</div>
              <div class="buttons-grid" id="buttons-container">
                <div class="btn-indicator" id="gp-btn-0">B0: A</div>
                <div class="btn-indicator" id="gp-btn-1">B1: B</div>
                <div class="btn-indicator" id="gp-btn-2">B2: X</div>
                <div class="btn-indicator" id="gp-btn-3">B3: Y</div>
                <div class="btn-indicator" id="gp-btn-4">B4: LB</div>
                <div class="btn-indicator" id="gp-btn-5">B5: RB</div>
                <div class="btn-indicator" id="gp-btn-6">B6: LT</div>
                <div class="btn-indicator" id="gp-btn-7">B7: RT</div>
              </div>
            </div>
          </div>
        `,
        previewBox: {
          id: "gamepad-info-box",
          initialText: "Chưa kết nối tay cầm nào. Bạn có thể cắm tay cầm thật hoặc nhấn 'Tạo Tay Cầm Ảo' để kiểm thử."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Lắng nghe sự kiện gamepadconnected & gamepaddisconnected");

      window.addEventListener("gamepadconnected", (e) => {
        ctx.success(`Tay cầm kết nối: [${e.gamepad.index}] ${e.gamepad.id}`);
        handlers.startPolling(ctx);
      });

      window.addEventListener("gamepaddisconnected", (e) => {
        ctx.warn(`Tay cầm ngắt kết nối: [${e.gamepad.index}] ${e.gamepad.id}`);
      });
    },

    startPolling: (ctx) => {
      if (pollingRaf) return;

      const loop = () => {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        const gp = simulatedGamepad || gamepads[0];

        if (gp) {
          // Update axes
          if (gp.axes && gp.axes.length >= 2) {
            const x = gp.axes[0] || 0;
            const y = gp.axes[1] || 0;
            ctx.setHtml('axis-0-val', x.toFixed(2));
            ctx.setHtml('axis-1-val', y.toFixed(2));

            const fill0 = document.getElementById('axis-0-fill');
            const fill1 = document.getElementById('axis-1-fill');
            if (fill0) {
              const pct = (x + 1) * 50;
              fill0.style.width = '10px';
              fill0.style.left = `calc(${pct}% - 5px)`;
            }
            if (fill1) {
              const pct = (y + 1) * 50;
              fill1.style.width = '10px';
              fill1.style.left = `calc(${pct}% - 5px)`;
            }
          }

          // Update buttons
          if (gp.buttons) {
            for (let i = 0; i < Math.min(8, gp.buttons.length); i++) {
              const btnEl = document.getElementById(`gp-btn-${i}`);
              const isPressed = gp.buttons[i].pressed || gp.buttons[i].value > 0.5;
              if (btnEl) {
                if (isPressed) {
                  btnEl.classList.add('pressed');
                } else {
                  btnEl.classList.remove('pressed');
                }
              }
            }
          }
        }

        pollingRaf = requestAnimationFrame(loop);
      };

      pollingRaf = requestAnimationFrame(loop);
    },

    scanGamepads: (ctx) => {
      ctx.workflowStep("Quét danh sách tay cầm: navigator.getGamepads()");
      const gamepads = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
      if (gamepads.length === 0 && !simulatedGamepad) {
        ctx.warn("Không tìm thấy tay cầm vật lý nào đang kết nối.");
        ctx.setHtml('gamepad-info-box', 'Không có thiết bị. Hãy nhấn "Tạo Tay Cầm Ảo" để trải nghiệm ngay.');
        return;
      }

      ctx.success(`Đã phát hiện ${gamepads.length + (simulatedGamepad ? 1 : 0)} tay cầm:`);
      const all = simulatedGamepad ? [simulatedGamepad, ...gamepads] : gamepads;
      all.forEach(gp => {
        ctx.info(`- [Slot ${gp.index}] ${gp.id} | Nút: ${gp.buttons.length} | Trục: ${gp.axes.length}`);
      });

      handlers.startPolling(ctx);
    },

    simulateGamepad: (ctx) => {
      ctx.workflowStep("Khởi động Tay Cầm Ảo (Virtual Controller Simulator)");
      let angle = 0;
      let pressedIndex = 0;

      simulatedGamepad = {
        index: 0,
        id: "Virtual Xbox Wireless Controller (Simulator)",
        connected: true,
        axes: [0, 0],
        buttons: Array.from({ length: 16 }, () => ({ pressed: false, value: 0 })),
        vibrationActuator: {
          playEffect: async (type, params) => {
            ctx.success(`[Haptic Simulator] Hiệu ứng rung ${type}: thời lượng ${params.duration}ms, cường độ ${params.strongMagnitude}`);
            return "complete";
          }
        }
      };

      // Tự động xoay cần gạt và bấm nút giả lập
      setInterval(() => {
        if (!simulatedGamepad) return;
        angle += 0.08;
        simulatedGamepad.axes[0] = Math.cos(angle);
        simulatedGamepad.axes[1] = Math.sin(angle);

        simulatedGamepad.buttons.forEach((b, idx) => {
          b.pressed = (idx === pressedIndex);
          b.value = b.pressed ? 1.0 : 0.0;
        });
        pressedIndex = (pressedIndex + 1) % 8;
      }, 200);

      handlers.startPolling(ctx);
      ctx.success("Tay Cầm Ảo đang mô phỏng chuyển động xoay Analog và bấm nút liên tục!");
      ctx.setHtml('gamepad-info-box', `
        <div style="color:#34d399; font-weight:600;">● Tay Cầm Ảo đang hoạt động</div>
        <div>• Tên: <code>${simulatedGamepad.id}</code></div>
        <div>• Quan sát cần Analog và các nút B0-B7 nhảy trạng thái ở trên!</div>
      `);
    },

    triggerVibration: async (ctx) => {
      ctx.workflowStep("Thử nghiệm rung: vibrationActuator.playEffect()");
      const gamepads = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
      const gp = simulatedGamepad || gamepads[0];

      if (!gp) {
        ctx.warn("Cần có tay cầm (hoặc bấm Tạo Tay Cầm Ảo) để thử nghiệm rung.");
        return;
      }

      if (gp.vibrationActuator && typeof gp.vibrationActuator.playEffect === 'function') {
        try {
          await gp.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: 800,
            weakMagnitude: 0.5,
            strongMagnitude: 1.0
          });
          ctx.success("Lệnh rung dual-rumble đã gửi tới tay cầm (800ms)");
        } catch (err) {
          ctx.error("Lỗi khi kích hoạt rung:", err);
        }
      } else {
        ctx.warn("Tay cầm này không hỗ trợ vibrationActuator.");
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
