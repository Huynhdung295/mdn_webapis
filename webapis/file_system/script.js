// webapis/file_system/script.js - File System Access API: JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let currentFileHandle = null;

  const fsSpec = {
    id: "file_system",
    name: "File System Access API",
    group: "F",
    category: "Storage & System",
    status: "Standard",
    support: { chrome: "86+", edge: "86+", firefox: "No", safari: "No" },
    supportCheck: () => 'showOpenFilePicker' in window && 'showSaveFilePicker' in window,
    why: "Cho phép web app ĐỌC, GHI ĐÈ VÀ SỬA ĐỔI TRỰC TIẾP tệp tin / thư mục trên ổ đĩa máy tính người dùng như ứng dụng Desktop đích thực (như VS Code for Web), thay vì chỉ tải xuống tệp mới qua thẻ a[download].",
    whenToUse: "Trình soạn thảo mã nguồn / IDE trên web, ứng dụng ghi chú markdown lưu trực tiếp vào ổ đĩa, phần mềm chỉnh sửa ảnh lưu đè lên file gốc.",
    whenNotToUse: "Ứng dụng web thông thường chỉ cần upload file 1 lần (dùng input[type=file] an toàn và phổ biến hơn).",
    coreItems: [
      "window.showOpenFilePicker({ types, multiple })",
      "window.showSaveFilePicker({ suggestedName })",
      "window.showDirectoryPicker()",
      "fileHandle.createWritable() -> FileSystemWritableFileStream",
      "writable.write(content), writable.close()"
    ],
    panels: [
      {
        id: "panel-open-save",
        title: "1. Mở & Ghi Đè Tệp Tin Trực Tiếp (showOpenFilePicker & createWritable)",
        badge: "FileSystemFileHandle",
        desc: "Chọn một tệp văn bản từ máy tính, chỉnh sửa nội dung trong ô và bấm 'Lưu Đè' để cập nhật trực tiếp vào ổ cứng.",
        inputs: [
          { id: "fs-editor-content", label: "Nội dung tệp tin đang mở:", type: "textarea", rows: 4, value: "Nội dung soạn thảo ban đầu... Hãy bấm 'Mở Tệp Tin Từ Ổ Đĩa' để nạp file thật." }
        ],
        actions: [
          { id: "btn-open-file", label: "Mở Tệp Tin Từ Ổ Đĩa (showOpenFilePicker)", variant: "primary", handler: "openFile" },
          { id: "btn-save-file", label: "Lưu Đè Trực Tiếp (createWritable)", variant: "secondary", handler: "saveFile" },
          { id: "btn-save-as", label: "Lưu Thành Tệp Mới (showSaveFilePicker)", variant: "secondary", handler: "saveAsNew" }
        ],
        previewBox: {
          id: "fs-status-box",
          initialText: "Trạng thái: Chưa mở tệp nào."
        }
      },
      {
        id: "panel-directory-picker",
        title: "2. Duyệt Cả Thư Mục (showDirectoryPicker)",
        badge: "FileSystemDirectoryHandle",
        desc: "Chọn một thư mục để duyệt toàn bộ danh sách tệp con bên trong giống như cây thư mục Explorer.",
        actions: [
          { id: "btn-open-dir", label: "Chọn Một Thư Mục (showDirectoryPicker)", variant: "primary", handler: "openDirectory" }
        ],
        previewBox: {
          id: "dir-listing-box",
          initialText: "Chưa chọn thư mục nào."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường File System Access API sẵn sàng");
    },

    openFile: async (ctx) => {
      if (!('showOpenFilePicker' in window)) {
        ctx.error("Trình duyệt không hỗ trợ showOpenFilePicker (Yêu cầu Chrome 86+ / Edge 86+).");
        ctx.setHtml('fs-status-box', `<span style="color:#f87171;">✖ File System Access API chưa hỗ trợ trên trình duyệt này.</span>`);
        return;
      }

      ctx.workflowStep("Mở hộp thoại chọn tệp: window.showOpenFilePicker()");
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{
            description: 'Tệp văn bản (*.txt, *.md, *.json, *.js)',
            accept: { 'text/*': ['.txt', '.md', '.json', '.js', '.html', '.css'] }
          }],
          multiple: false
        });

        currentFileHandle = handle;
        const file = await handle.getFile();
        const content = await file.text();

        ctx.setVal('fs-editor-content', content);
        ctx.success(`Đã mở tệp: "${handle.name}" (${file.size} bytes)!`);
        ctx.setHtml('fs-status-box', `<div>Đang mở tệp: <strong style="color:#38bdf8;">${handle.name}</strong> (${(file.size / 1024).toFixed(2)} KB)</div>`);
      } catch (err) {
        if (err.name === 'AbortError') {
          ctx.warn("Người dùng đã huỷ chọn tệp.");
        } else {
          ctx.error("Lỗi khi mở tệp:", err);
        }
      }
    },

    saveFile: async (ctx) => {
      if (!currentFileHandle) {
        ctx.warn("Chưa mở tệp nào để lưu đè. Hãy bấm 'Lưu Thành Tệp Mới' hoặc 'Mở Tệp Tin' trước.");
        return;
      }

      const content = ctx.getVal('fs-editor-content');
      ctx.workflowStep(`Tạo writable stream và ghi đè nội dung vào "${currentFileHandle.name}"`);

      try {
        const writable = await currentFileHandle.createWritable();
        await writable.write(content);
        await writable.close();

        ctx.success(`Đã lưu đè thành công nội dung mới vào ổ đĩa: "${currentFileHandle.name}"!`);
        ctx.setHtml('fs-status-box', `<div>Đã lưu tệp: <strong style="color:#34d399;">${currentFileHandle.name}</strong> lúc ${new Date().toLocaleTimeString()}</div>`);
      } catch (err) {
        ctx.error("Lỗi khi ghi tệp:", err);
      }
    },

    saveAsNew: async (ctx) => {
      if (!('showSaveFilePicker' in window)) return;

      const content = ctx.getVal('fs-editor-content');
      ctx.workflowStep("Mở hộp thoại Lưu tệp mới: window.showSaveFilePicker()");

      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: 'mdn_demo_notes.txt',
          types: [{
            description: 'Tệp văn bản (*.txt)',
            accept: { 'text/plain': ['.txt'] }
          }]
        });

        currentFileHandle = handle;
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();

        ctx.success(`Đã lưu thành công tệp mới: "${handle.name}"!`);
        ctx.setHtml('fs-status-box', `<div>Đã lưu tệp mới: <strong style="color:#34d399;">${handle.name}</strong></div>`);
      } catch (err) {
        if (err.name !== 'AbortError') ctx.error("Lỗi khi lưu tệp mới:", err);
      }
    },

    openDirectory: async (ctx) => {
      if (!('showDirectoryPicker' in window)) return;

      ctx.workflowStep("Mở hộp thoại chọn thư mục: window.showDirectoryPicker()");
      try {
        const dirHandle = await window.showDirectoryPicker();
        ctx.info(`Đã cấp quyền truy cập thư mục: "${dirHandle.name}". Bắt đầu duyệt danh sách tệp con...`);

        const entries = [];
        for await (const [name, handle] of dirHandle.entries()) {
          entries.push({ name, kind: handle.kind });
        }

        ctx.success(`Đã quét thấy ${entries.length} mục trong thư mục "${dirHandle.name}":`, entries);

        ctx.setHtml('dir-listing-box', `
          <div style="font-weight:600;color:#38bdf8;">Thư mục: "${dirHandle.name}" (${entries.length} mục)</div>
          <div style="margin-top:6px;max-height:120px;overflow-y:auto;font-family:var(--font-mono);font-size:0.75rem;">
            ${entries.map(e => `<div>${e.kind === 'directory' ? '📁' : '📄'} ${e.name}</div>`).join('')}
          </div>
        `);
      } catch (err) {
        if (err.name !== 'AbortError') ctx.error("Lỗi duyệt thư mục:", err);
      }
    }
  };

  WebAPICore.renderApp(fsSpec, handlers);
})();
