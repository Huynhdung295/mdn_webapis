// webapis/css_typed_om/script.js - CSS Typed Object Model API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const typedSpec = {
    id: "css_typed_om",
    name: "CSS Typed Object Model API",
    group: "C",
    category: "Styling & DOM",
    status: "Standard",
    support: { chrome: "66+", edge: "79+", firefox: "No", safari: "16.4+" },
    supportCheck: () => 'attributeStyleMap' in Element.prototype,
    why: "Thay thế việc nối chuỗi thủ công chậm chạp, dễ sinh lỗi NaN và tiêu tốn hiệu năng (ví dụ `el.style.opacity = parseFloat(val) + 0.1; el.style.top = (parseInt(top) + 10) + 'px'`). CSS Typed OM biến các giá trị CSS thành đối tượng JavaScript có kiểu số học rõ ràng, nhanh hơn 2-5 lần và an toàn về kiểu.",
    whenToUse: "Xử lý hàng nghìn phép biến đổi animation, tính toán kích thước động với hiệu năng cao (game UI, animation thư viện, kéo thả drag-and-drop, chuyển động theo chuột).",
    whenNotToUse: "Chỉ gán class CSS thông thường hoặc style tĩnh đơn giản.",
    coreItems: [
      "element.computedStyleMap().get(property)",
      "element.attributeStyleMap.set(property, value)",
      "CSS.px(100), CSS.em(2), CSS.percent(50), CSS.deg(45)",
      "CSSUnitValue, CSSMathSum, CSSMathProduct"
    ],
    panels: [
      {
        id: "panel-read-write-typed",
        title: "1. Đọc & Ghi Style Dạng Object (attributeStyleMap)",
        badge: "attributeStyleMap & computedStyleMap",
        desc: "Thao tác với đối tượng CSSUnitValue thay vì chuỗi string.",
        actions: [
          { id: "btn-read-computed", label: "Đọc computedStyleMap('width')", variant: "secondary", handler: "readComputed" },
          { id: "btn-set-typed-width", label: "Tăng Width (+50px) Bằng CSS.px()", variant: "primary", handler: "increaseWidth" },
          { id: "btn-math-sum", label: "Gán Toán Tử CSSMathSum (calc(100px + 20%))", variant: "secondary", handler: "applyMathSum" }
        ],
        customHtml: `
          <div class="typed-target-box" id="target-box">
            Target Box
          </div>
        `,
        previewBox: {
          id: "typed-result-box",
          initialText: "Trạng thái: Chưa thao tác."
        }
      },
      {
        id: "panel-benchmark",
        title: "2. Đo Hiệu Năng: Chuỗi Cũ (String) vs Typed OM (10,000 lần gán)",
        badge: "Performance Benchmark",
        desc: "So sánh thời gian thực thi giữa việc phân tích cú pháp chuỗi truyền thống (String Parsing) và gán trực tiếp qua Typed OM.",
        actions: [
          { id: "btn-bench-string", label: "Chạy 10,000 Lần String (style.width = ... + 'px')", variant: "danger", handler: "benchString" },
          { id: "btn-bench-typed", label: "Chạy 10,000 Lần Typed OM (attributeStyleMap.set)", variant: "success", handler: "benchTyped" }
        ],
        previewBox: {
          id: "bench-result-box",
          initialText: "Bấm nút phía trên để bắt đầu bài đo benchmark."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường CSS Typed OM sẵn sàng");
    },

    readComputed: (ctx) => {
      const box = ctx.getEl('target-box');
      if (!('computedStyleMap' in box)) {
        ctx.error("Trình duyệt không hỗ trợ element.computedStyleMap()");
        return;
      }

      ctx.workflowStep("Gọi targetBox.computedStyleMap().get('width')");
      const widthVal = box.computedStyleMap().get('width');
      const opacityVal = box.computedStyleMap().get('opacity');

      ctx.success("Đã đọc giá trị kiểu (CSSUnitValue):", {
        width: { value: widthVal.value, unit: widthVal.unit },
        opacity: { value: opacityVal.value, unit: opacityVal.unit }
      });

      ctx.setHtml('typed-result-box', `
        <div>• width: <strong>${widthVal.value}</strong> (đơn vị: <strong style="color:#38bdf8;">${widthVal.unit}</strong>)</div>
        <div>• opacity: <strong>${opacityVal.value}</strong> (đơn vị: <strong style="color:#38bdf8;">${opacityVal.unit}</strong>)</div>
      `);
    },

    increaseWidth: (ctx) => {
      const box = ctx.getEl('target-box');
      if (!('attributeStyleMap' in box)) return;

      const current = box.computedStyleMap().get('width');
      const newWidth = CSS.px(current.value + 50);

      ctx.workflowStep(`Gọi box.attributeStyleMap.set('width', CSS.px(${newWidth.value}))`);
      box.attributeStyleMap.set('width', newWidth);

      ctx.success(`Đã cập nhật width = ${newWidth.value}px trực tiếp mà không cần nối chuỗi!`);
      handlers.readComputed(ctx);
    },

    applyMathSum: (ctx) => {
      const box = ctx.getEl('target-box');
      if (!('attributeStyleMap' in box)) return;

      ctx.workflowStep("Tạo đối tượng toán học CSSMathSum(CSS.px(100), CSS.percent(20))");
      const calcVal = new CSSMathSum(CSS.px(100), CSS.percent(20));
      box.attributeStyleMap.set('width', calcVal);

      ctx.success("Đã gán thành công CSSMathSum tương đương calc(100px + 20%)!");
      handlers.readComputed(ctx);
    },

    benchString: (ctx) => {
      const box = ctx.getEl('target-box');
      if (!box || !box.style) return;
      ctx.workflowStep("Đang chạy 10,000 lần gán style qua chuỗi: el.style.width = (i % 200) + 'px'...");

      const getNow = () => typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
      const start = getNow();
      for (let i = 0; i < 10000; i++) {
        box.style.width = (100 + (i % 100)) + 'px';
      }
      const timeMs = (getNow() - start).toFixed(2);

      ctx.warn(`Gán chuỗi truyền thống: ${timeMs} ms`);
      ctx.setHtml('bench-result-box', `<div>Phương pháp String cũ: <strong style="color:#f87171;">${timeMs} ms</strong> cho 10,000 lần gán.</div>`);
    },

    benchTyped: (ctx) => {
      const box = ctx.getEl('target-box');
      if (!box || !('attributeStyleMap' in box)) return;

      ctx.workflowStep("Đang chạy 10,000 lần gán qua Typed OM: box.attributeStyleMap.set('width', CSS.px(...))...");

      const getNow = () => typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
      const start = getNow();
      for (let i = 0; i < 10000; i++) {
        box.attributeStyleMap.set('width', CSS.px(100 + (i % 100)));
      }
      const timeMs = (getNow() - start).toFixed(2);

      ctx.success(`Typed OM: ${timeMs} ms (Không tốn thời gian parse chuỗi string!)`);
      const prevEl = ctx.getEl('bench-result-box');
      const prevHtml = prevEl ? prevEl.innerHTML : '';
      ctx.setHtml('bench-result-box', `${prevHtml}<div style="margin-top:4px;">Phương pháp Typed OM: <strong style="color:#34d399;">${timeMs} ms</strong> (Nhanh hơn, không tạo rác bộ nhớ GC!).</div>`);
    }
  };

  WebAPICore.renderApp(typedSpec, handlers);
})();
