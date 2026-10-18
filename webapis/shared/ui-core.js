// webapis/shared/ui-core.js - Engine điều khiển theo chuẩn DRY dựa trên JSON Spec
(function(window) {
  'use strict';

  const WebAPICore = {
    currentConfig: null,

    // Kiểm tra tính khả dụng của API
    isSupported: function(checkFn) {
      try {
        if (typeof checkFn === 'function') return !!checkFn();
        return false;
      } catch (e) {
        return false;
      }
    },

    getBrowserInfo: function() {
      const ua = navigator.userAgent;
      let name = "Khác";
      let version = "";

      if (ua.includes("Firefox/")) {
        name = "Firefox";
        version = ua.split("Firefox/")[1].split(" ")[0];
      } else if (ua.includes("Edg/")) {
        name = "Edge";
        version = ua.split("Edg/")[1].split(" ")[0];
      } else if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
        name = "Chrome";
        version = ua.split("Chrome/")[1].split(" ")[0];
      } else if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
        name = "Safari";
        version = ua.split("Version/")[1]?.split(" ")[0] || "";
      }

      return { name, version, full: `${name} ${version}` };
    },

    // Phương thức khởi tạo tương thích ngược cho các bài lab dùng WebAPICore.init(config)
    init: function(config) {
      if (typeof config === 'string') {
        config = { id: config };
      }
      if (config && config.id && window.MDN_WEB_APIS_DATA) {
        const meta = window.MDN_WEB_APIS_DATA.find(x => x.id === config.id);
        if (meta) {
          config = Object.assign({}, meta, config);
        }
      }
      if (config && config.name) {
        document.title = `${config.name} - MDN Interactive Lab`;
      }
      this.currentConfig = config;
      this.setupLogger();

      const bInfo = this.getBrowserInfo();
      const supported = this.isSupported(config.supportCheck);

      // Tự động dựng thanh Top Nav nếu chưa có
      if (!document.querySelector('.top-nav')) {
        const nav = document.createElement('nav');
        nav.className = 'top-nav';
        nav.innerHTML = `
          <div class="nav-left">
            <a href="../../client/index.html" class="back-btn">
              <span>←</span>
              <span>Danh mục Web APIs</span>
            </a>
            <div class="breadcrumbs">
              <span class="group-tag">Nhóm ${config.group || 'A'}</span>
              <span class="separator">/</span>
              <span class="current">${config.name || ''}</span>
            </div>
          </div>
          <div class="nav-right">
            <span class="badge ${supported ? 'badge-success' : 'badge-danger'}">
              ${supported ? '✔ Thiết bị hỗ trợ' : '✖ Thiết bị chưa hỗ trợ'}
            </span>
          </div>
        `;
        document.body.insertBefore(nav, document.body.firstChild);
      }

      // Tự động dựng phần lý thuyết nếu có #overview-container
      const overviewContainer = document.getElementById('overview-container');
      if (overviewContainer) {
        let compatChipsHtml = '';
        const matrix = config.browserMatrix || config.support;
        if (matrix) {
          for (const [bName, bSupport] of Object.entries(matrix)) {
            const isOk = bSupport !== 'No' && bSupport !== false;
            compatChipsHtml += `
              <span class="compat-chip ${isOk ? 'supported' : 'unsupported'}">
                <strong>${bName.toUpperCase()}:</strong> ${bSupport}
              </span>
            `;
          }
        }

        let coreItemsHtml = '';
        if (config.coreItems && config.coreItems.length > 0) {
          coreItemsHtml = config.coreItems.map(item => `<code>${this.escapeHtml(item)}</code>`).join(' ');
        }

        overviewContainer.innerHTML = `
          <div class="dev-header">
            <div class="dev-title-row">
              <h1>${config.name || ''}</h1>
              <span class="badge ${config.status === 'Standard' ? 'badge-success' : 'badge-warning'}">${config.status || 'Standard'}</span>
            </div>
            <div class="compat-chips" style="margin-top: 8px;">
              ${compatChipsHtml}
              <span class="compat-chip ${supported ? 'supported' : 'unsupported'}" style="margin-left: 8px;">
                <strong>MÁY HIỆN TẠI:</strong> ${supported ? '✔ Có hỗ trợ' : '✖ Chưa hỗ trợ'} (${bInfo.full})
              </span>
            </div>
          </div>

          <div class="dev-theory-grid">
            <div class="theory-card theory-why">
              <div class="theory-title">🎯 Vì sao dùng?</div>
              <div class="theory-content">${config.why || 'Đang cập nhật...'}</div>
            </div>
            <div class="theory-card theory-when">
              <div class="theory-title">⚖ Khi nào nên dùng?</div>
              <div class="theory-content">${config.whenToUse || 'Đang cập nhật...'}</div>
            </div>
            <div class="theory-card theory-avoid">
              <div class="theory-title">🚫 Khi nào KHÔNG nên dùng?</div>
              <div class="theory-content">${config.whenNotToUse || 'Đang cập nhật...'}</div>
            </div>
          </div>

          ${coreItemsHtml ? `
          <div class="core-items-row">
            <span style="color:var(--text-muted);font-weight:600;font-size:0.8rem;">CÁC THÀNH PHẦN CỐT LÕI:</span>
            <div class="core-tags">${coreItemsHtml}</div>
          </div>` : ''}
        `;
      }

      if (typeof config.onReady === 'function') {
        config.onReady(this);
      }
    },

    // Các hàm helper ghi log & DOM trực tiếp trên WebAPICore
    workflowStep: function(step, data) { this.log(`[BƯỚC] ${step}`, 'workflow', data); },
    info: function(msg, data) { this.log(msg, 'info', data); },
    success: function(msg, data) { this.log(msg, 'success', data); },
    warn: function(msg, data) { this.log(msg, 'warning', data); },
    error: function(msg, data) { this.log(msg, 'error', data); },
    event: function(name, data) { this.log(`Sự kiện: ${name}`, 'event', data); },
    getVal: function(id) { const el = document.getElementById(id); return el ? el.value : ''; },
    setVal: function(id, val) { const el = document.getElementById(id); if (el) el.value = val; },
    setHtml: function(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; },
    getEl: function(id) { return document.getElementById(id); },

    // Hàm DRY tối thượng: Dựng toàn bộ UI trang từ JSON Spec (tự động kết nối với MDN_WEB_APIS_DATA)
    renderApp: function(spec, handlers = {}) {
      if (typeof spec === 'string') {
        spec = { id: spec };
      }

      // Tự động kế thừa toàn bộ lý thuyết và ma trận tương thích từ api-data.js
      if (spec && spec.id && window.MDN_WEB_APIS_DATA) {
        const meta = window.MDN_WEB_APIS_DATA.find(x => x.id === spec.id);
        if (meta) {
          spec = Object.assign({}, meta, spec);
          if (!spec.supportCheck && meta.testSupportStr) {
            spec.supportCheck = () => {
              try {
                return new Function('return !!(' + meta.testSupportStr + ')')();
              } catch(e) {
                return false;
              }
            };
          }
        }
      }

      if (spec && spec.name) {
        document.title = `${spec.name} - MDN Interactive Lab`;
      }

      this.currentConfig = spec;
      const appEl = document.getElementById('app') || document.body;
      const bInfo = this.getBrowserInfo();
      const supported = this.isSupported(spec.supportCheck);

      // 1. Tạo thanh điều hướng (Top Nav)
      const navHtml = `
        <nav class="top-nav">
          <div class="nav-left">
            <a href="../../client/index.html" class="back-btn">
              <span>←</span>
              <span>Danh mục Web APIs</span>
            </a>
            <div class="breadcrumbs">
              <span class="group-tag">Nhóm ${spec.group || 'A'}</span>
              <span class="separator">/</span>
              <span class="current">${spec.name}</span>
            </div>
          </div>
          <div class="nav-right">
            <span class="badge ${supported ? 'badge-success' : 'badge-danger'}">
              ${supported ? '✔ Thiết bị hỗ trợ' : '✖ Thiết bị chưa hỗ trợ'}
            </span>
          </div>
        </nav>
      `;

      // 2. Tạo khối lý thuyết Dev (Theory Grid)
      let compatChipsHtml = '';
      if (spec.support) {
        for (const [bName, bSupport] of Object.entries(spec.support)) {
          const isOk = bSupport !== 'No' && bSupport !== false;
          compatChipsHtml += `
            <span class="compat-chip ${isOk ? 'supported' : 'unsupported'}">
              <strong>${bName.toUpperCase()}:</strong> ${bSupport}
            </span>
          `;
        }
      }

      let coreItemsHtml = '';
      if (spec.coreItems && spec.coreItems.length > 0) {
        coreItemsHtml = spec.coreItems.map(item => `<code>${this.escapeHtml(item)}</code>`).join(' ');
      }

      const theoryHtml = `
        <div class="overview-card">
          <div class="dev-header">
            <div class="dev-title-row">
              <h1>${spec.name}</h1>
              <span class="badge ${spec.status === 'Standard' ? 'badge-success' : 'badge-warning'}">${spec.status || 'Standard'}</span>
            </div>
            <div class="compat-chips" style="margin-top: 8px;">
              ${compatChipsHtml}
              <span class="compat-chip ${supported ? 'supported' : 'unsupported'}" style="margin-left: 8px;">
                <strong>MÁY HIỆN TẠI:</strong> ${supported ? '✔ Có hỗ trợ' : '✖ Chưa hỗ trợ'} (${bInfo.full})
              </span>
            </div>
          </div>

          <div class="dev-theory-grid">
            <div class="theory-card theory-why">
              <div class="theory-title">🎯 Vì sao dùng?</div>
              <div class="theory-content">${spec.why || 'Đang cập nhật...'}</div>
            </div>
            <div class="theory-card theory-when">
              <div class="theory-title">⚖ Khi nào nên dùng?</div>
              <div class="theory-content">${spec.whenToUse || 'Đang cập nhật...'}</div>
            </div>
            <div class="theory-card theory-avoid">
              <div class="theory-title">🚫 Khi nào KHÔNG nên dùng?</div>
              <div class="theory-content">${spec.whenNotToUse || 'Đang cập nhật...'}</div>
            </div>
          </div>

          ${coreItemsHtml ? `
          <div class="core-items-row">
            <span style="color:var(--text-muted);font-weight:600;font-size:0.8rem;">CÁC THÀNH PHẦN CỐT LÕI:</span>
            <div class="core-tags">${coreItemsHtml}</div>
          </div>` : ''}
        </div>
      `;

      // 3. Tạo các Panels hành động từ JSON spec.panels
      let panelsHtml = '';
      (spec.panels || []).forEach(panel => {
        let inputsHtml = '';
        if (panel.inputs && panel.inputs.length > 0) {
          inputsHtml = '<div class="form-row">';
          panel.inputs.forEach(inp => {
            if (inp.type === 'select') {
              const optionsHtml = (inp.options || []).map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
              inputsHtml += `
                <div class="form-group" style="${inp.fullWidth ? 'grid-column: 1 / -1;' : ''}">
                  <label class="form-label" for="${inp.id}">${inp.label}</label>
                  <select id="${inp.id}" class="form-select">${optionsHtml}</select>
                </div>
              `;
            } else if (inp.type === 'textarea') {
              inputsHtml += `
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label class="form-label" for="${inp.id}">${inp.label}</label>
                  <textarea id="${inp.id}" class="form-input" rows="${inp.rows || 3}">${inp.value || ''}</textarea>
                </div>
              `;
            } else {
              inputsHtml += `
                <div class="form-group" style="${inp.fullWidth ? 'grid-column: 1 / -1;' : ''}">
                  <label class="form-label" for="${inp.id}">${inp.label}</label>
                  <input type="${inp.type || 'text'}" id="${inp.id}" class="form-input" value="${inp.value !== undefined ? inp.value : ''}" ${inp.readonly ? 'readonly' : ''}>
                </div>
              `;
            }
          });
          inputsHtml += '</div>';
        }

        let customContent = panel.customHtml || '';

        let actionsHtml = '';
        if (panel.actions && panel.actions.length > 0) {
          actionsHtml = '<div class="btn-group" style="margin-top: 10px;">';
          panel.actions.forEach(act => {
            actionsHtml += `
              <button type="button" id="${act.id}" class="btn btn-${act.variant || 'secondary'}" data-action="${act.handler || ''}">
                ${act.label}
              </button>
            `;
          });
          actionsHtml += '</div>';
        }

        let previewBoxHtml = '';
        if (panel.previewBox) {
          previewBoxHtml = `
            <div id="${panel.previewBox.id}" class="preview-box" style="${panel.previewBox.style || ''}">
              ${panel.previewBox.initialText || ''}
            </div>
          `;
        }

        panelsHtml += `
          <div class="panel" id="${panel.id || ''}">
            <div class="panel-header">
              <h2 class="panel-title">${panel.title}</h2>
              ${panel.badge ? `<span class="badge badge-info">${panel.badge}</span>` : ''}
            </div>
            ${panel.desc ? `<p class="panel-desc">${panel.desc}</p>` : ''}
            ${inputsHtml}
            ${customContent}
            ${actionsHtml}
            ${previewBoxHtml}
          </div>
        `;
      });

      // 4. Tạo Sidebar Log UI
      const loggerHtml = `
        <aside class="logger-card">
          <div class="logger-header">
            <div class="logger-title">
              <span>⚡</span>
              <span>Workflow Log UI</span>
            </div>
            <div class="logger-actions">
              <button type="button" id="logger-copy" class="logger-btn">Sao chép</button>
              <button type="button" id="logger-clear" class="logger-btn">Xoá</button>
            </div>
          </div>
          <div id="logger-body" class="logger-body"></div>
        </aside>
      `;

      // 5. Kết hợp toàn bộ vào DOM
      appEl.innerHTML = `
        ${navHtml}
        <main class="app-container">
          ${theoryHtml}
          <div class="layout-grid">
            <div class="test-section">
              ${panelsHtml}
            </div>
            ${loggerHtml}
          </div>
        </main>
      `;

      this.setupLogger();

      // 6. Gán các sự kiện Handler tự động theo JSON
      const ctx = {
        log: (msg, data) => this.log(msg, 'info', data),
        info: (msg, data) => this.log(msg, 'info', data),
        success: (msg, data) => this.log(msg, 'success', data),
        warn: (msg, data) => this.log(msg, 'warning', data),
        error: (msg, data) => this.log(msg, 'error', data),
        event: (name, data) => this.log(`Sự kiện: ${name}`, 'event', data),
        workflowStep: (step, data) => this.log(`[BƯỚC] ${step}`, 'workflow', data),
        escapeHtml: (str) => this.escapeHtml(str),
        core: this,
        isSupported: (fn) => this.isSupported(fn),
        getVal: (id) => {
          const el = document.getElementById(id);
          return el ? el.value : '';
        },
        setVal: (id, val) => {
          const el = document.getElementById(id);
          if (el) el.value = val;
        },
        setHtml: (id, html) => {
          const el = document.getElementById(id);
          if (el) el.innerHTML = html;
        },
        getEl: (id) => document.getElementById(id)
      };

      document.querySelectorAll('[data-action]').forEach(btn => {
        const handlerName = btn.getAttribute('data-action');
        if (handlerName && typeof handlers[handlerName] === 'function') {
          btn.addEventListener('click', (e) => {
            try {
              const res = handlers[handlerName](ctx, e);
              if (res && typeof res.catch === 'function') {
                res.catch(err => {
                  console.error(`[Handler Error: ${handlerName}]`, err);
                  ctx.error(`Lỗi thao tác bất đồng bộ: ${err?.message || err}`);
                });
              }
            } catch (err) {
              console.error(`[Handler Error: ${handlerName}]`, err);
              ctx.error(`Lỗi thực thi: ${err?.message || err}`);
            }
          });
        }
      });

      if (typeof handlers.onReady === 'function') {
        handlers.onReady(ctx);
      }
    },

    setupLogger: function() {
      const loggerBody = document.getElementById('logger-body');
      const clearBtn = document.getElementById('logger-clear');
      const copyBtn = document.getElementById('logger-copy');

      if (clearBtn && loggerBody) {
        clearBtn.addEventListener('click', () => {
          loggerBody.innerHTML = '';
          this.log('Đã xoá nhật ký workflow.', 'info');
        });
      }

      if (copyBtn && loggerBody) {
        copyBtn.addEventListener('click', () => {
          const text = Array.from(loggerBody.querySelectorAll('.log-entry'))
            .map(el => el.innerText)
            .join('\n');
          navigator.clipboard.writeText(text).then(() => {
            const original = copyBtn.innerText;
            copyBtn.innerText = 'Đã chép!';
            setTimeout(() => copyBtn.innerText = original, 1500);
          });
        });
      }

      if (!this._hasGlobalErrorHandler && typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        this._hasGlobalErrorHandler = true;
        window.addEventListener('error', (event) => {
          this.error(`Lỗi Uncaught Runtime: ${event.message || event}`);
        });
        window.addEventListener('unhandledrejection', (event) => {
          const reason = event.reason;
          this.error(`Lỗi Unhandled Promise Rejection: ${reason?.message || reason}`);
        });
      }
    },

    log: function(stepName, type = 'info', data = null) {
      const loggerBody = document.getElementById('logger-body');
      if (!loggerBody) {
        console.log(`[${type.toUpperCase()}] ${stepName}`, data || '');
        return;
      }

      const entry = document.createElement('div');
      entry.className = `log-entry log-${type}`;

      const time = new Date().toLocaleTimeString('vi-VN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });

      let dataHtml = '';
      if (data !== null && data !== undefined) {
        let formattedData = '';
        try {
          if (typeof data === 'object') {
            formattedData = JSON.stringify(data, (key, value) => {
              if (value instanceof HTMLElement) return `<${value.tagName.toLowerCase()}>`;
              if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`;
              return value;
            }, 2);
          } else {
            formattedData = String(data);
          }
        } catch (e) {
          formattedData = String(data);
        }
        dataHtml = `<div class="log-data">${this.escapeHtml(formattedData)}</div>`;
      }

      entry.innerHTML = `
        <div class="log-head">
          <span class="log-time">[${time}]</span>
          <span class="log-step-tag">${type.toUpperCase()}</span>
          <span class="log-step-title">${this.escapeHtml(stepName)}</span>
        </div>
        ${dataHtml}
      `;

      loggerBody.appendChild(entry);
      loggerBody.scrollTop = loggerBody.scrollHeight;
    },

    escapeHtml: function(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  };

  window.WebAPICore = WebAPICore;
})(window);
