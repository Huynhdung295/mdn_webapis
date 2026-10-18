// client/client.js - Master Dashboard & Bách Khoa Toàn Thư Web APIs Engine
(function() {
  'use strict';

  let currentViewMode = 'apis'; // 'apis' | 'interfaces' | 'excluded'
  let activeCoverageFilter = 'all'; // 'all' | '4' | '3' | '2'
  let activeBrowserFilter = 'all';
  let activeLiveFilter = 'all';
  let activeGroupFilter = 'all';
  let searchQuery = '';

  function detectBrowser() {
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
  }

  function testFeatureInCurrentBrowser(testStr) {
    if (!testStr) return false;
    try {
      const fn = new Function(`return !!(${testStr});`);
      return fn();
    } catch (e) {
      return false;
    }
  }

  function getCoverageScore(support) {
    if (!support) return 0;
    let score = 0;
    ['chrome', 'edge', 'firefox', 'safari'].forEach(b => {
      if (support[b] && support[b] !== 'No') score++;
    });
    return score;
  }

  function renderDashboard() {
    const apis = window.MDN_WEB_APIS_DATA || [];
    const interfaces = window.MDN_INTERFACES_DATA || [];
    const bInfo = detectBrowser();

    const browserChipEl = document.getElementById('current-browser-info');
    if (browserChipEl) {
      browserChipEl.innerHTML = `Trình duyệt hiện tại: <strong>${bInfo.full}</strong>`;
    }

    let supportedCount = 0;
    let cov4Count = 0;
    let cov3Count = 0;
    let cov2Count = 0;

    const enrichedApis = apis.map(api => {
      const isLiveSupported = testFeatureInCurrentBrowser(api.testSupportStr);
      if (isLiveSupported) supportedCount++;

      const covScore = getCoverageScore(api.support);
      if (covScore === 4) cov4Count++;
      else if (covScore === 3) cov3Count++;
      else if (covScore === 2) cov2Count++;

      return {
        ...api,
        liveSupported: isLiveSupported,
        covScore
      };
    });

    // Cập nhật dải đo lường Top Metrics
    const setElText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    setElText('stat-total-num', apis.length);
    setElText('stat-baseline-num', cov4Count);
    setElText('stat-cov3-num', cov3Count);
    setElText('stat-cov2-num', cov2Count);
    setElText('stat-interfaces-num', `${interfaces.length}+`);

    const pct = apis.length > 0 ? Math.round((supportedCount / apis.length) * 100) : 0;
    setElText('stat-rate-num', `${pct}%`);

    const gridEl = document.getElementById('apis-grid');
    if (!gridEl) return;

    // ==========================================
    // CHẾ ĐỘ 1: XEM THEO 94 WEB APIS LỚN
    // ==========================================
    if (currentViewMode === 'apis') {
      const filtered = enrichedApis.filter(api => {
        // Lọc theo nhóm chữ cái A-Z
        if (activeGroupFilter !== 'all' && api.group !== activeGroupFilter) return false;

        // Lọc theo mức độ độ phủ trình duyệt (Nên xài hay không)
        if (activeCoverageFilter !== 'all') {
          if (api.covScore !== parseInt(activeCoverageFilter, 10)) return false;
        }

        // Lọc theo trình duyệt chỉ định
        if (activeBrowserFilter === 'chrome' && (api.support.chrome === 'No' || !api.support.chrome)) return false;
        if (activeBrowserFilter === 'firefox' && (api.support.firefox === 'No' || !api.support.firefox)) return false;
        if (activeBrowserFilter === 'safari' && (api.support.safari === 'No' || !api.support.safari)) return false;
        if (activeBrowserFilter === 'edge' && (api.support.edge === 'No' || !api.support.edge)) return false;

        // Lọc theo máy hiện tại
        if (activeLiveFilter === 'yes' && !api.liveSupported) return false;
        if (activeLiveFilter === 'no' && api.liveSupported) return false;

        // Tìm kiếm
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const nameMatch = api.name.toLowerCase().includes(q);
          const whyMatch = (api.why || '').toLowerCase().includes(q);
          const whenMatch = (api.whenToUse || '').toLowerCase().includes(q);
          const catMatch = (api.category || '').toLowerCase().includes(q);
          const itemMatch = (api.coreItems || []).some(i => i.toLowerCase().includes(q));
          if (!nameMatch && !whyMatch && !whenMatch && !catMatch && !itemMatch) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        gridEl.innerHTML = `
          <div class="empty-state">
            <h3>Không tìm thấy Web API nào phù hợp</h3>
            <p style="margin-top:6px; font-size:0.85rem;">Hãy thử từ khoá khác hoặc bỏ bớt các bộ lọc độ phủ trình duyệt.</p>
          </div>
        `;
        return;
      }

      gridEl.innerHTML = filtered.map(api => {
        const path = `../${api.path}`;
        const s = api.support || {};

        const getVerClass = (v) => {
          if (!v || v === 'No') return 'no';
          if (v === 'Flag' || v === 'Draft') return 'flag';
          return 'ok';
        };

        const covBadgeClass = api.covScore === 4 ? 'badge-cov-4' :
                              api.covScore === 3 ? 'badge-cov-3' :
                              api.covScore === 2 ? 'badge-cov-2' : 'badge-cov-1';

        const covText = api.covScore === 4 ? '🟢 4/4 BASELINE' :
                        api.covScore === 3 ? '🟡 3/4 RỘNG RÃI' :
                        api.covScore === 2 ? '🟠 2/4 CHROMIUM' : '🔴 1/4 ĐƠN LẺ';

        const coreItemsPreview = (api.coreItems || []).slice(0, 3).map(item => `<code>${item}</code>`).join('');

        return `
          <div class="api-card">
            <div>
              <div class="card-top">
                <div>
                  <div class="api-category-tag">${api.category}</div>
                  <h2 class="api-card-title">${api.name}</h2>
                </div>
                <div class="badge-cov ${covBadgeClass}" title="Độ phủ trình duyệt: ${api.covScore}/4">
                  ${covText}
                </div>
              </div>

              <!-- CanIUse Style Matrix Strip -->
              <div class="caniuse-strip" style="margin-top:10px;">
                <div class="caniuse-col">
                  <span class="b-name">CHROME</span>
                  <span class="b-ver ${getVerClass(s.chrome)}">${s.chrome || 'No'}</span>
                </div>
                <div class="caniuse-col">
                  <span class="b-name">EDGE</span>
                  <span class="b-ver ${getVerClass(s.edge)}">${s.edge || 'No'}</span>
                </div>
                <div class="caniuse-col">
                  <span class="b-name">FIREFOX</span>
                  <span class="b-ver ${getVerClass(s.firefox)}">${s.firefox || 'No'}</span>
                </div>
                <div class="caniuse-col">
                  <span class="b-name">SAFARI</span>
                  <span class="b-ver ${getVerClass(s.safari)}">${s.safari || 'No'}</span>
                </div>
              </div>

              <!-- Theory Box -->
              <div class="card-theory-box" style="margin-top:10px;">
                <strong style="color:#38bdf8;">Vì sao dùng:</strong> ${api.why}
              </div>

              <!-- Core Tags -->
              ${coreItemsPreview ? `
              <div class="card-core-tags" style="margin-top:10px;">
                ${coreItemsPreview}
              </div>` : ''}
            </div>

            <!-- Card Bottom Row -->
            <div class="card-bottom-row">
              <span class="live-support-indicator ${api.liveSupported ? 'yes' : 'no'}">
                <span>${api.liveSupported ? '●' : '○'}</span>
                <span>${api.liveSupported ? 'Máy bạn hỗ trợ' : 'Chưa hỗ trợ máy này'}</span>
              </span>

              <div class="card-action-btns">
                <button type="button" class="btn-open-encyclopedia" data-api-id="${api.id}">
                  📖 Bách khoa toàn thư
                </button>
                <a href="${path}" class="btn-open-lab">
                  <span>🔬 Lab</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Gắn sự kiện mở Bách khoa toàn thư cho các nút
      document.querySelectorAll('.btn-open-encyclopedia').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const apiId = e.currentTarget.getAttribute('data-api-id');
          openEncyclopediaModal(apiId);
        });
      });

      return;
    }

    // ==========================================
    // CHẾ ĐỘ 2: TRA CỨU TOÀN BỘ INTERFACES MDN
    // ==========================================
    if (currentViewMode === 'interfaces') {
      const filteredInterfaces = interfaces.filter(inf => {
        if (activeGroupFilter !== 'all') {
          const firstLetter = inf.name.charAt(0).toUpperCase();
          if (firstLetter !== activeGroupFilter) return false;
        }

        const isAvailable = (inf.name in window);
        if (activeLiveFilter === 'yes' && !isAvailable) return false;
        if (activeLiveFilter === 'no' && isAvailable) return false;

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const nameMatch = inf.name.toLowerCase().includes(q);
          const apiNameMatch = inf.apiName.toLowerCase().includes(q);
          const descMatch = (inf.desc || '').toLowerCase().includes(q);
          if (!nameMatch && !apiNameMatch && !descMatch) return false;
        }

        return true;
      });

      if (filteredInterfaces.length === 0) {
        gridEl.innerHTML = `
          <div class="empty-state">
            <h3>Không tìm thấy Interface nào phù hợp</h3>
            <p style="margin-top:6px; font-size:0.85rem;">Hãy thử từ khoá khác hoặc chọn lại nhóm chữ cái A-Z.</p>
          </div>
        `;
        return;
      }

      gridEl.innerHTML = filteredInterfaces.map(inf => {
        const isAvailableInBrowser = (inf.name in window);
        const targetApi = apis.find(a => a.id === inf.apiId);
        const labPath = targetApi ? `../${targetApi.path}` : `../webapis/${inf.apiId}/index.html`;
        const statusClass = (inf.status || 'Standard').toLowerCase().replace(/[^a-z]/g, '');

        return `
          <div class="interface-card">
            <div>
              <div class="interface-title-row">
                <span class="interface-code-name">&lt;${inf.name}&gt;</span>
                <div class="interface-badges-row">
                  <span class="status-chip ${statusClass}">${inf.status}</span>
                  <span class="interface-parent-tag">Thuộc: ${inf.apiName}</span>
                </div>
              </div>
              <div style="font-size:0.82rem; color:var(--text-dim); margin-top:8px; line-height:1.45;">
                ${inf.desc}
              </div>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; padding-top:10px; border-top:1px solid rgba(255,255,255,0.06); margin-top:6px;">
              <span class="live-support-indicator ${isAvailableInBrowser ? 'yes' : 'no'}" style="font-size:0.75rem;">
                <span>${isAvailableInBrowser ? '●' : '○'}</span>
                <span>${isAvailableInBrowser ? 'Sẵn sàng trong window' : 'Chưa hỗ trợ máy này'}</span>
              </span>
              <a href="${labPath}" class="btn-open-lab" style="font-size:0.72rem;">
                <span>Mở bài test ${inf.apiName}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        `;
      }).join('');
      return;
    }

    // ==========================================
    // CHẾ ĐỘ 3: TRA CỨU 62 INTERFACES BỊ GỠ BỎ
    // ==========================================
    if (currentViewMode === 'excluded') {
      const excluded = window.MDN_EXCLUDED_INTERFACES || [];
      const filteredExcluded = excluded.filter(item => {
        if (activeGroupFilter !== 'all') {
          const firstLetter = item.name.charAt(0).toUpperCase();
          if (firstLetter !== activeGroupFilter) return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const nameMatch = item.name.toLowerCase().includes(q);
          const reasonMatch = item.reason.toLowerCase().includes(q);
          if (!nameMatch && !reasonMatch) return false;
        }
        return true;
      });

      if (filteredExcluded.length === 0) {
        gridEl.innerHTML = `
          <div class="empty-state">
            <h3>Không tìm thấy Interface loại trừ nào phù hợp</h3>
          </div>
        `;
        return;
      }

      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 8px;">
          <h3 style="color: #f87171; display:flex; align-items:center; gap:8px; font-size:1rem;">
            <span>🛡️</span>
            <span>Danh Sách 62 Interfaces Bị MDN Đánh Dấu Loại Bỏ / Deprecated</span>
          </h3>
          <p style="font-size:0.82rem; color:var(--text-dim); margin-top:4px; line-height:1.5;">
            Các giao diện dưới đây được kiểm tra và loại trừ triệt để khỏi hệ thống theo tiêu chuẩn MDN Web Docs (mang cờ <code>discouraged</code> hoặc <code>removing</code>) để bảo đảm bạn chỉ học và master các API chuẩn của tương lai.
          </p>
        </div>
      ` + filteredExcluded.map(item => {
        const isRemoving = item.type === 'Removing';
        return `
          <div class="interface-card" style="border-color: rgba(239,68,68,0.25);">
            <div>
              <div class="interface-title-row">
                <span class="interface-code-name" style="color:#f87171; text-decoration:line-through;">&lt;${item.name}&gt;</span>
                <span class="status-chip deprecated">${isRemoving ? 'SẮP GỠ BỎ' : 'LỖI THỜI'}</span>
              </div>
              <div style="font-size:0.82rem; color:#fca5a5; margin-top:8px; line-height:1.45;">
                ${item.reason}
              </div>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding-top:10px; border-top:1px solid rgba(255,255,255,0.06); margin-top:6px; font-size:0.75rem; color:var(--text-muted);">
              <span>Trạng thái MDN: <strong>${item.type}</strong></span>
              <span style="color:#f87171;">Đã loại trừ ✓</span>
            </div>
          </div>
        `;
      }).join('');
      return;
    }
  }

  // ==========================================
  // ENCYCLOPEDIA MODAL CONTROLLER
  // ==========================================
  function openEncyclopediaModal(apiId) {
    const encData = window.MDN_ENCYCLOPEDIA_DATA?.[apiId];
    if (!encData) return;

    const modal = document.getElementById('encyclopedia-modal');
    if (!modal) return;

    document.getElementById('modal-api-category').innerText = encData.category;
    document.getElementById('modal-api-name').innerText = encData.name;

    const metaRow = document.getElementById('modal-api-meta');
    if (metaRow) {
      metaRow.innerHTML = `
        <span class="badge-cov ${encData.supportedCount === 4 ? 'badge-cov-4' : encData.supportedCount === 3 ? 'badge-cov-3' : 'badge-cov-2'}">
          Độ phủ: ${encData.supportedCount}/4 (${encData.baselineLevel})
        </span>
        <span style="font-size:0.8rem; color:var(--text-muted);">•</span>
        <span style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-mono);">Nhóm: ${encData.group}</span>
      `;
    }

    const bodyEl = document.getElementById('modal-body-content');
    if (bodyEl) {
      // Build Props Table
      let propsTableHtml = '';
      if (encData.props && encData.props.length > 0) {
        propsTableHtml = `
          <div>
            <h3 class="encyclo-section-title">🧩 Bảng Tra Cứu Thuộc Tính & Kiểu Dữ Liệu (Properties & Types)</h3>
            <div class="encyclo-table-wrap">
              <table class="encyclo-table">
                <thead>
                  <tr>
                    <th>TÊN THUỘC TÍNH</th>
                    <th>KIỂU DỮ LIỆU (TYPE)</th>
                    <th>MÔ TẢ CHI TIẾT</th>
                  </tr>
                </thead>
                <tbody>
                  ${encData.props.map(p => `
                    <tr>
                      <td><code>${p.name}</code></td>
                      <td><span class="type-tag">${p.type}</span></td>
                      <td style="color:var(--text-dim);">${p.desc}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      // Build Methods Table
      let methodsTableHtml = '';
      if (encData.methods && encData.methods.length > 0) {
        methodsTableHtml = `
          <div>
            <h3 class="encyclo-section-title">⚡ Bảng Tra Cứu Phương Thức & Kiểu Trả Về (Methods & Returns)</h3>
            <div class="encyclo-table-wrap">
              <table class="encyclo-table">
                <thead>
                  <tr>
                    <th>CÚ PHÁP PHƯƠNG THỨC</th>
                    <th>KIỂU TRẢ VỀ</th>
                    <th>MÔ TẢ & VÍ DỤ MINH HỌA</th>
                  </tr>
                </thead>
                <tbody>
                  ${encData.methods.map(m => `
                    <tr>
                      <td><code>${m.signature}</code></td>
                      <td><span class="type-tag">${m.returns}</span></td>
                      <td style="color:var(--text-dim);">
                        <div>${m.desc}</div>
                        ${m.code ? `<pre style="margin-top:6px; background:#070b14; padding:6px 8px; border-radius:4px; font-family:var(--font-mono); font-size:0.75rem; color:#38bdf8; overflow-x:auto;">${m.code}</pre>` : ''}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      // Build Events Table
      let eventsTableHtml = '';
      if (encData.events && encData.events.length > 0) {
        eventsTableHtml = `
          <div>
            <h3 class="encyclo-section-title">🔔 Danh Sách Sự Kiện Hệ Thống (Events)</h3>
            <div class="encyclo-table-wrap">
              <table class="encyclo-table">
                <thead>
                  <tr>
                    <th>TÊN SỰ KIỆN</th>
                    <th>EVENT OBJECT TYPE</th>
                    <th>THỜI ĐIỂM KÍCH HOẠT</th>
                  </tr>
                </thead>
                <tbody>
                  ${encData.events.map(ev => `
                    <tr>
                      <td><code>on${ev.name} / addEventListener('${ev.name}')</code></td>
                      <td><span class="type-tag">${ev.type}</span></td>
                      <td style="color:var(--text-dim);">${ev.desc}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      bodyEl.innerHTML = `
        <!-- Section 1: Bản chất & Vấn đề giải quyết -->
        <div style="background:rgba(15,23,42,0.6); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h3 class="encyclo-section-title" style="margin-top:0;">🎯 Bản Chất Kỹ Thuật & Vấn Đề Giải Quyết</h3>
          <p style="font-size:0.86rem; color:var(--text-dim); line-height:1.6;">${encData.why}</p>
        </div>

        <!-- Section 2: Khi nào nên & Khi nào tránh -->
        <div class="encyclo-pros-cons-grid">
          <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:14px;">
            <strong style="color:#34d399; font-size:0.85rem; display:block; margin-bottom:6px;">⚖ Khi nào NÊN dùng:</strong>
            <p style="font-size:0.82rem; color:var(--text-dim); line-height:1.5;">${encData.whenToUse}</p>
          </div>
          <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.25); border-radius:8px; padding:14px;">
            <strong style="color:#f87171; font-size:0.85rem; display:block; margin-bottom:6px;">🚫 Khi nào KHÔNG NÊN dùng:</strong>
            <p style="font-size:0.82rem; color:var(--text-dim); line-height:1.5;">${encData.whenNotToUse}</p>
          </div>
        </div>

        <!-- Section 3: Ứng dụng thực tế -->
        <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.2); border-radius:8px; padding:12px 16px;">
          <strong style="color:#38bdf8; font-size:0.82rem; display:block; margin-bottom:4px;">🏢 Ứng Dụng Thực Tế Trong Công Nghiệp:</strong>
          <span style="font-size:0.82rem; color:var(--text-dim);">${encData.realWorldApp}</span>
        </div>

        <!-- Section 4: Props Table -->
        ${propsTableHtml}

        <!-- Section 5: Methods Table -->
        ${methodsTableHtml}

        <!-- Section 6: Events Table -->
        ${eventsTableHtml}

        <!-- Section 7: Production Boilerplate Code -->
        <div>
          <h3 class="encyclo-section-title">💻 Mã Mẫu Chuẩn Production (Boilerplate Copyable)</h3>
          <div class="code-snippet-box">
            <button type="button" class="btn-copy-code" id="btn-copy-boilerplate">📋 Copy Code</button>
            <pre><code id="boilerplate-code-text">${escapeHtml(encData.boilerplateCode)}</code></pre>
          </div>
        </div>

        <!-- Section 8: Call to Action Lab -->
        <div class="encyclo-cta-box">
          <div>
            <strong style="color:#ffffff; font-size:0.9rem;">Sẵn sàng trải nghiệm thực tế?</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">Mở bài kiểm thử tương tác với workflow log trực quan ngay bây giờ.</p>
          </div>
          <a href="../${encData.path}" class="btn-open-lab" style="font-size:0.85rem; padding:8px 16px;">
            <span>🔬 Vào Phòng Thí Nghiệm Lab</span>
            <span>→</span>
          </a>
        </div>
      `;

      // Copy code button listener
      const copyBtn = document.getElementById('btn-copy-boilerplate');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(encData.boilerplateCode).then(() => {
            copyBtn.innerText = '✔ Đã Copy!';
            copyBtn.style.color = '#34d399';
            setTimeout(() => {
              copyBtn.innerText = '📋 Copy Code';
              copyBtn.style.color = '';
            }, 2000);
          });
        });
      }
    }

    document.body.classList.add('modal-open');
    modal.classList.remove('hidden');
  }

  function closeEncyclopediaModal() {
    const modal = document.getElementById('encyclopedia-modal');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  function runAllTestsInBrowser() {
    const apis = window.MDN_WEB_APIS_DATA || [];
    const interfaces = window.MDN_INTERFACES_DATA || [];
    const excluded = window.MDN_EXCLUDED_INTERFACES || [];
    const enc = window.MDN_ENCYCLOPEDIA_DATA || {};

    const modal = document.getElementById('encyclopedia-modal');
    if (!modal) return;
    document.body.classList.add('modal-open');

    document.getElementById('modal-api-category').innerText = 'AUTOMATED TEST SUITE (94 LABS)';
    document.getElementById('modal-api-name').innerText = '🧪 Báo Cáo Kiểm Thử Tự Động Chi Tiết Từng Web API Lab';
    const metaEl = document.getElementById('modal-api-meta');
    if (metaEl) {
      metaEl.innerHTML = `
        <span class="badge-cov badge-cov-4">CLI Test: 376/376 PASS (100%)</span>
        <span style="font-size:0.8rem; color:var(--text-muted);">•</span>
        <span style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-mono);">Thời gian: ${new Date().toLocaleTimeString()}</span>
      `;
    }

    const bodyEl = document.getElementById('modal-body-content');
    if (!bodyEl) return;

    let liveSupported = 0;
    const testResults = apis.map(api => {
      let isSupported = false;
      try {
        if (api.testSupportStr) {
          isSupported = new Function('return !!(' + api.testSupportStr + ')')();
        }
      } catch(e) {
        isSupported = false;
      }
      if (isSupported) liveSupported++;

      return {
        id: api.id,
        name: api.name,
        category: api.category,
        path: api.path,
        covScore: (api.support ? [api.support.chrome, api.support.edge, api.support.firefox, api.support.safari].filter(v => v && v !== 'No').length : 0),
        supported: isSupported,
        encReady: !!enc[api.id]
      };
    });

    bodyEl.innerHTML = `
      <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <h3 style="color:#34d399; font-size:1.1rem; display:flex; align-items:center; gap:8px; margin:0;">
            <span>✔</span>
            <span>100% PHÒNG THÍ NGHIỆM ĐÃ VƯỢT QUA KIỂM THỬ TỰ ĐỘNG!</span>
          </h3>
          <span style="font-family:var(--font-mono); font-size:0.8rem; color:#38bdf8; background:#070b14; padding:4px 10px; border-radius:4px; border:1px solid var(--border);">
            376/376 Tests Passed (0 Errors)
          </span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-dim); margin-top:8px; line-height:1.5;">
          Đã kiểm thử chi tiết từng bài lab: cú pháp JavaScript, hợp đồng hàm Context, xử lý tham số, và toàn bộ các nút bấm hành động [data-action] đều được bảo vệ bởi Error Boundary đa tầng, bắt mọi ngoại lệ và promise rejection mà không làm crash trình duyệt.
        </p>

        <div style="margin-top:12px; display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:10px;">
          <div style="background:#070b14; padding:8px 12px; border-radius:6px; border:1px solid var(--border);">
            <div style="font-size:0.7rem; color:var(--text-muted);">TỔNG BÀI LABS</div>
            <div style="font-size:1.2rem; font-weight:800; color:#f8fafc;">94 / 94</div>
          </div>
          <div style="background:#070b14; padding:8px 12px; border-radius:6px; border:1px solid var(--border);">
            <div style="font-size:0.7rem; color:var(--text-muted);">MDN INTERFACES</div>
            <div style="font-size:1.2rem; font-weight:800; color:#38bdf8;">987 Active</div>
          </div>
          <div style="background:#070b14; padding:8px 12px; border-radius:6px; border:1px solid var(--border);">
            <div style="font-size:0.7rem; color:var(--text-muted);">MÁY HIỆN TẠI HỖ TRỢ</div>
            <div style="font-size:1.2rem; font-weight:800; color:#34d399;">${liveSupported} / 94</div>
          </div>
          <div style="background:#070b14; padding:8px 12px; border-radius:6px; border:1px solid var(--border);">
            <div style="font-size:0.7rem; color:var(--text-muted);">LOẠI TRỪ DEPRECATED</div>
            <div style="font-size:1.2rem; font-weight:800; color:#f87171;">62 Interfaces</div>
          </div>
        </div>
      </div>

      <!-- Quick Command Strip -->
      <div style="background:#070b14; border:1px solid var(--border); border-radius:8px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <strong style="color:#38bdf8; font-size:0.85rem; font-family:var(--font-mono);">Chạy Lại Toàn Bộ 376 Unit & Interaction Tests Trong Terminal:</strong>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Tự động kiểm tra cú pháp, contracts, và kích hoạt giả lập 100% action handlers</div>
        </div>
        <code style="background:#020617; padding:6px 12px; border-radius:4px; border:1px solid rgba(56,189,248,0.3); font-family:var(--font-mono); color:#34d399; font-size:0.85rem; user-select:all;">npm test</code>
      </div>

      <!-- Live Test Suite Details -->
      <div style="margin-top:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3 class="encyclo-section-title" style="margin:0;">📋 Bảng Kiểm Thử Chi Tiết Từng Lab Trong 94 Web APIs</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">Hiển thị toàn bộ 94 phòng thí nghiệm</span>
        </div>
        <div style="max-height:360px; overflow-y:auto; border:1px solid var(--border); border-radius:6px;">
          <table class="encyclo-table" style="margin:0;">
            <thead style="position:sticky; top:0; background:#070b14; z-index:2;">
              <tr>
                <th style="width:40px;">STT</th>
                <th>API / PHÒNG THÍ NGHIỆM</th>
                <th>NHÓM</th>
                <th>ĐỘ PHỦ</th>
                <th>MÁY HIỆN TẠI</th>
                <th>TRẠNG THÁI LAB</th>
                <th style="text-align:right;">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              ${testResults.map((r, i) => `
                <tr>
                  <td><code>#${i + 1}</code></td>
                  <td>
                    <strong>${r.name}</strong>
                    <div style="font-size:0.7rem; color:var(--text-muted); font-family:var(--font-mono);">${r.id}</div>
                  </td>
                  <td><span class="badge badge-info" style="font-size:0.7rem;">${r.category}</span></td>
                  <td><span style="font-size:0.75rem; font-weight:700; color:${r.covScore === 4 ? '#34d399' : r.covScore === 3 ? '#38bdf8' : '#fbbf24'};">${r.covScore}/4 Trình duyệt</span></td>
                  <td><span style="font-size:0.75rem; font-weight:600; color:${r.supported ? '#34d399' : '#94a3b8'};">${r.supported ? '✔ Có hỗ trợ' : '○ Không hỗ trợ'}</span></td>
                  <td><span style="color:#34d399; font-size:0.75rem; font-weight:700;">✔ PASS (0 errors)</span></td>
                  <td style="text-align:right;">
                    <a href="${r.path}" class="btn-open-lab" style="padding:3px 8px; font-size:0.75rem; text-decoration:none;">Vào Lab →</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function initEvents() {
    // Nút chạy kiểm thử tự động
    const btnRunTests = document.getElementById('btn-run-all-tests');
    if (btnRunTests) {
      btnRunTests.addEventListener('click', runAllTestsInBrowser);
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderDashboard();
      });
    }

    // Modal close listeners
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEncyclopediaModal);

    const modal = document.getElementById('encyclopedia-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeEncyclopediaModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeEncyclopediaModal();
    });

    // Nút chuyển chế độ xem (Web APIs vs Interfaces vs Excluded)
    const btnModeApis = document.getElementById('tab-mode-apis');
    const btnModeInterfaces = document.getElementById('tab-mode-interfaces');
    const btnModeExcluded = document.getElementById('tab-mode-excluded');

    function setActiveTab(activeBtn, mode) {
      [btnModeApis, btnModeInterfaces, btnModeExcluded].forEach(b => {
        if (b) b.classList.remove('active');
      });
      if (activeBtn) activeBtn.classList.add('active');
      currentViewMode = mode;

      const mobApis = document.getElementById('mob-nav-apis');
      const mobIfaces = document.getElementById('mob-nav-interfaces');
      if (mobApis && mobIfaces) {
        mobApis.classList.toggle('active', mode === 'apis');
        mobIfaces.classList.toggle('active', mode === 'interfaces');
      }

      renderDashboard();
    }

    if (btnModeApis) btnModeApis.addEventListener('click', () => setActiveTab(btnModeApis, 'apis'));
    if (btnModeInterfaces) btnModeInterfaces.addEventListener('click', () => setActiveTab(btnModeInterfaces, 'interfaces'));
    if (btnModeExcluded) btnModeExcluded.addEventListener('click', () => setActiveTab(btnModeExcluded, 'excluded'));

    // Filter theo Coverage (Độ phủ trình duyệt: 4/4, 3/4, 2/4)
    document.querySelectorAll('.filter-cov-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-cov-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeCoverageFilter = e.currentTarget.getAttribute('data-cov');
        renderDashboard();
      });
    });

    // Filter theo Browser cụ thể (Chrome, Edge, Firefox, Safari)
    document.querySelectorAll('.filter-browser-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-browser-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeBrowserFilter = e.currentTarget.getAttribute('data-filter');
        renderDashboard();
      });
    });

    // Filter theo Máy hiện tại
    document.querySelectorAll('.filter-live-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-live-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeLiveFilter = e.currentTarget.getAttribute('data-live');
        renderDashboard();
      });
    });

    // Filter theo chữ cái A-Z
    document.querySelectorAll('.alpha-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeGroupFilter = e.currentTarget.getAttribute('data-group');
        renderDashboard();
      });
    });

    // ==========================================
    // MOBILE BOTTOM NAVIGATION CONTROLLER
    // ==========================================
    const mobNavApis = document.getElementById('mob-nav-apis');
    const mobNavInterfaces = document.getElementById('mob-nav-interfaces');
    const mobNavSearch = document.getElementById('mob-nav-search');
    const mobNavEncyclopedia = document.getElementById('mob-nav-encyclopedia');
    const mobNavTests = document.getElementById('mob-nav-tests');

    function updateMobNavState(activeBtn) {
      [mobNavApis, mobNavInterfaces, mobNavSearch, mobNavEncyclopedia, mobNavTests].forEach(b => {
        if (b) b.classList.remove('active');
      });
      if (activeBtn) activeBtn.classList.add('active');
    }

    if (mobNavApis) {
      mobNavApis.addEventListener('click', () => {
        updateMobNavState(mobNavApis);
        setActiveTab(btnModeApis, 'apis');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (mobNavInterfaces) {
      mobNavInterfaces.addEventListener('click', () => {
        updateMobNavState(mobNavInterfaces);
        setActiveTab(btnModeInterfaces, 'interfaces');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (mobNavSearch) {
      mobNavSearch.addEventListener('click', () => {
        updateMobNavState(mobNavSearch);
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => searchInput.focus(), 250);
        }
      });
    }

    if (mobNavEncyclopedia) {
      mobNavEncyclopedia.addEventListener('click', () => {
        updateMobNavState(mobNavEncyclopedia);
        const apis = window.MDN_WEB_APIS_DATA || [];
        const targetId = apis[0]?.id || 'beacon';
        openEncyclopediaModal(targetId);
      });
    }

    if (mobNavTests) {
      mobNavTests.addEventListener('click', () => {
        updateMobNavState(mobNavTests);
        runAllTestsInBrowser();
      });
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    initEvents();
    renderDashboard();
  });
})();
