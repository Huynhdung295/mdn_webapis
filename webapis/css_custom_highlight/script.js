// webapis/css_custom_highlight/script.js - CSS Custom Highlight API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const highlightSpec = {
    id: "css_custom_highlight",
    name: "CSS Custom Highlight API",
    group: "C",
    category: "Styling & DOM",
    status: "Standard",
    support: { chrome: "105+", edge: "105+", firefox: "117+", safari: "17.2+" },
    supportCheck: () => 'Highlight' in window && 'highlights' in CSS,
    why: "Tô màu tìm kiếm, highlight lỗi chính tả trực tiếp bằng các đối tượng Range và CSS pseudo-element ::highlight(name) mà KHÔNG làm thay đổi cây DOM (không cần chèn thẻ span làm vỡ text node).",
    whenToUse: "Tính năng tìm kiếm từ khoá trong bài viết (Ctrl+F tuỳ biến), trình soạn thảo văn bản, highlight cú pháp code, công cụ kiểm tra ngữ pháp.",
    whenNotToUse: "Style tĩnh cho phần tử HTML thông thường (dùng class CSS thông thường sẽ đơn giản hơn).",
    coreItems: [
      "new Highlight(...ranges)",
      "CSS.highlights.set(customHighlightName, highlightObject)",
      "CSS.highlights.delete(customHighlightName)",
      "CSS.highlights.clear()",
      "::highlight(customHighlightName) trong stylesheet"
    ],
    panels: [
      {
        id: "panel-search-highlight",
        title: "1. Tìm Kiếm & Tô Màu Bằng CSS Highlight",
        badge: "CSS.highlights.set('search-result')",
        desc: "Nhập từ khoá để tự động tạo Range bao bọc các từ khớp và đưa vào CSS.highlights mà không làm biến đổi bất kỳ thẻ HTML nào.",
        inputs: [
          { id: "search-keyword", label: "Từ khoá cần tìm trong đoạn văn dưới:", type: "text", value: "JavaScript", fullWidth: true }
        ],
        actions: [
          { id: "btn-apply-highlight", label: "Tô Màu Tìm Kiếm (Apply Highlight)", variant: "primary", handler: "applySearchHighlight" },
          { id: "btn-clear-highlight", label: "Xoá Tô Màu (Clear Highlight)", variant: "danger", handler: "clearSearchHighlight" },
          { id: "btn-add-grammar-error", label: "Thêm Lỗi Ngữ Pháp (::highlight(grammar-error))", variant: "secondary", handler: "applyGrammarHighlight" }
        ],
        customHtml: `
          <div class="sample-doc-box" id="article-content">
            JavaScript là ngôn ngữ lập trình mạnh mẽ của thế giới web. Với sự ra đời của các Web APIs hiện đại, JavaScript có thể xử lý từ âm thanh, đồ họa Canvas cho đến kết nối mạng nền. Khi làm việc với văn bản trong JavaScript, các lập trình viên thường phải đối mặt với bài toán tìm kiếm và tô sáng từ khóa. Thay vì phải chèn các thẻ span vào DOM gây mất con trỏ chuột và hỏng cấu trúc văn bản, CSS Custom Highlight API mang đến giải pháp hoàn hảo, hiệu năng cao và cực kỳ mượt mà.
          </div>
        `,
        previewBox: {
          id: "highlight-stats-box",
          initialText: "Trạng thái: Chưa thực hiện tìm kiếm."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường CSS Custom Highlight API sẵn sàng");
      handlers.applySearchHighlight(ctx);
    },

    applySearchHighlight: (ctx) => {
      if (typeof window === 'undefined' || !('Highlight' in window) || typeof CSS === 'undefined' || !CSS || !('highlights' in CSS)) {
        ctx.error("Trình duyệt chưa hỗ trợ CSS Custom Highlight API (Highlight & CSS.highlights).");
        return;
      }

      const query = (ctx.getVal('search-keyword') || '').trim();
      if (!query) {
        if (typeof CSS !== 'undefined' && CSS.highlights) CSS.highlights.delete('search-result');
        ctx.warn("Từ khoá tìm kiếm trống.");
        return;
      }

      ctx.workflowStep(`Duyệt text nodes và tạo Range cho từ khoá: "${query}"`);
      const articleEl = ctx.getEl('article-content');
      if (!articleEl || !articleEl.firstChild) return;
      const textNode = articleEl.firstChild; // Lấy text node trực tiếp

      const ranges = [];
      const text = textNode.textContent || '';
      let startIndex = 0;

      while (startIndex < text.length) {
        const index = text.toLowerCase().indexOf(query.toLowerCase(), startIndex);
        if (index === -1) break;

        const range = new Range();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + query.length);
        ranges.push(range);

        startIndex = index + query.length;
      }

      // Tạo đối tượng Highlight và đăng ký vào CSS.highlights
      const searchHighlight = new Highlight(...ranges);
      CSS.highlights.set('search-result', searchHighlight);

      ctx.success(`Đã tìm thấy ${ranges.length} vị trí khớp! Đã gán vào CSS.highlights.set('search-result').`);
      ctx.setHtml('highlight-stats-box', `<div>Tìm thấy: <strong style="color:#facc15;">${ranges.length} kết quả</strong> khớp với "${query}". Đang định kiểu qua <code style="color:#38bdf8;">::highlight(search-result)</code>.</div>`);
    },

    clearSearchHighlight: (ctx) => {
      if (typeof CSS !== 'undefined' && CSS && 'highlights' in CSS) {
        CSS.highlights.delete('search-result');
        CSS.highlights.delete('grammar-error');
      }
      ctx.workflowStep("Gọi CSS.highlights.delete('search-result')");
      ctx.setHtml('highlight-stats-box', "Đã xoá toàn bộ highlight.");
    },

    applyGrammarHighlight: (ctx) => {
      if (typeof window === 'undefined' || !('Highlight' in window) || typeof CSS === 'undefined' || !CSS || !('highlights' in CSS)) return;

      const articleEl = ctx.getEl('article-content');
      if (!articleEl || !articleEl.firstChild) return;
      const textNode = articleEl.firstChild;
      const text = textNode.textContent || '';

      // Giả lập bắt lỗi từ "hỏng cấu trúc"
      const targetPhrase = "hỏng cấu trúc";
      const index = text.indexOf(targetPhrase);

      if (index !== -1) {
        ctx.workflowStep(`Tạo Range cho cụm từ lỗi ngữ pháp: "${targetPhrase}"`);
        const range = new Range();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + targetPhrase.length);

        const grammarHighlight = new Highlight(range);
        CSS.highlights.set('grammar-error', grammarHighlight);
        ctx.success(`Đã gán ::highlight(grammar-error) cho cụm: "${targetPhrase}"`);
      }
    }
  };

  WebAPICore.renderApp(highlightSpec, handlers);
})();
