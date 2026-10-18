// webapis/selection/script.js - Selection API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "selection",
    panels: [
      {
        id: "panel-selection-demo",
        title: "1. Thao Tác Bôi Đen Văn Bản (Selection & Range)",
        badge: "window.getSelection()",
        desc: "Dùng chuột bôi đen bất kỳ đoạn chữ nào trong khung văn bản mẫu bên dưới để lấy toạ độ và nội dung trích xuất.",
        customHtml: `
          <div id="text-container" class="selectable-text-box" style="margin-bottom:16px;">
            Web APIs theo chuẩn MDN cung cấp khả năng can thiệp trực tiếp vào <strong>vùng chọn văn bản</strong> của người dùng thông qua đối tượng <code>Selection</code> và <code>Range</code>. Các ứng dụng như Notion, Medium hay Google Docs sử dụng Selection API để hiển thị thanh công cụ định dạng chữ nổi ngay phía trên vị trí bôi đen, cho phép người dùng In đậm, Gắn link hoặc Tô màu ghi chú một cách tự nhiên và liền mạch.
          </div>
        `,
        actions: [
          { id: "btn-get-selection", label: "Đọc Vùng Đang Chọn (getSelection)", variant: "primary", handler: "inspectSelection" },
          { id: "btn-highlight-sel", label: "Tô Màu Vàng Vùng Đang Chọn (surroundContents)", variant: "secondary", handler: "highlightSelection" },
          { id: "btn-clear-selection", label: "Bỏ Chọn (removeAllRanges)", variant: "danger", handler: "clearSelection" }
        ],
        previewBox: {
          id: "selection-status-box",
          initialText: "Hãy bôi đen một đoạn chữ ở trên."
        }
      }
    ]
  };

  function updateSelectionBox(ctx) {
    if (typeof window === 'undefined' || typeof window.getSelection !== 'function') {
      ctx.setHtml('selection-status-box', '<div style="color:var(--text-muted);">Trình duyệt không hỗ trợ window.getSelection.</div>');
      return;
    }
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      ctx.setHtml('selection-status-box', '<div style="color:var(--text-muted);">Chưa có đoạn văn bản nào được bôi đen.</div>');
      return;
    }

    const range = sel.getRangeAt(0);
    const rect = range && range.getBoundingClientRect ? range.getBoundingClientRect() : { left: 0, right: 0, top: 0, bottom: 0 };
    const text = sel.toString();

    ctx.setHtml('selection-status-box', `
      <div style="color:#34d399; font-weight:700; margin-bottom:4px;">● Đã phát hiện vùng chọn (${text.length} ký tự):</div>
      <div style="font-style:italic; color:#38bdf8; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-bottom:8px;">
        "${ctx.escapeHtml(text)}"
      </div>
      <div style="font-size:0.8rem; color:var(--text-muted); display:grid; grid-template-columns:1fr 1fr; gap:6px;">
        <div>• Toạ độ X (Left/Right): <code>${Math.round(rect.left)}px - ${Math.round(rect.right)}px</code></div>
        <div>• Toạ độ Y (Top/Bottom): <code>${Math.round(rect.top)}px - ${Math.round(rect.bottom)}px</code></div>
      </div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Selection API sẵn sàng: Lắng nghe sự kiện selectionchange");

      if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
        document.addEventListener('selectionchange', () => {
          if (typeof window === 'undefined' || typeof window.getSelection !== 'function') return;
          const sel = window.getSelection();
          if (sel && !sel.isCollapsed) {
            const text = sel.toString().trim();
            if (text.length > 0) {
              ctx.event("selectionchange: Bôi đen văn bản", { length: text.length, snippet: text.substring(0, 30) });
              updateSelectionBox(ctx);
            }
          }
        });
      }
    },

    inspectSelection: (ctx) => {
      ctx.workflowStep("Gọi window.getSelection()");
      if (typeof window === 'undefined' || typeof window.getSelection !== 'function') {
        ctx.warn("window.getSelection không khả dụng.");
        return;
      }
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        ctx.warn("Chưa bôi đen đoạn chữ nào trong khung văn bản.");
        return;
      }
      ctx.success("Trích xuất vùng chọn thành công:", {
        text: sel.toString(),
        rangeCount: sel.rangeCount,
        anchorOffset: sel.anchorOffset,
        focusOffset: sel.focusOffset
      });
      updateSelectionBox(ctx);
    },

    highlightSelection: (ctx) => {
      ctx.workflowStep("Bọc thẻ <mark> quanh vùng chọn: range.surroundContents()");
      if (typeof window === 'undefined' || typeof window.getSelection !== 'function') {
        ctx.warn("window.getSelection không khả dụng.");
        return;
      }
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        ctx.warn("Vui lòng bôi đen một đoạn chữ trước.");
        return;
      }

      try {
        const range = sel.getRangeAt(0);
        const mark = document.createElement('mark');
        mark.style.background = '#fef08a';
        mark.style.color = '#020617';
        mark.style.borderRadius = '4px';
        mark.style.padding = '2px 4px';
        range.surroundContents(mark);
        ctx.success("Đã tô màu vùng văn bản thành công!");
        sel.removeAllRanges();
      } catch (err) {
        ctx.error("Không thể bọc nội dung (vùng chọn giao cắt nhiều thẻ DOM lồng nhau):", err.message);
      }
    },

    clearSelection: (ctx) => {
      ctx.workflowStep("Huỷ bôi đen: window.getSelection().removeAllRanges()");
      if (typeof window === 'undefined' || typeof window.getSelection !== 'function') return;
      const sel = window.getSelection();
      if (sel && typeof sel.removeAllRanges === 'function') {
        sel.removeAllRanges();
        ctx.info("Đã bỏ chọn văn bản.");
        updateSelectionBox(ctx);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
