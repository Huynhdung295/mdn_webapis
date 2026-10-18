// webapis/network_information/script.js - Network Information API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  const spec = {
    id: "network_information",
    panels: [
      {
        id: "panel-network-status",
        title: "1. Giám Sát Băng Thông & Loại Mạng",
        badge: "navigator.connection",
        desc: "Đọc các chỉ số mạng thời gian thực và tự động điều chỉnh chất lượng nội dung (Adaptive Loading).",
        actions: [
          { id: "btn-refresh-net", label: "Cập Nhật Chỉ Số Mạng", variant: "primary", handler: "inspectNetwork" },
          { id: "btn-simulate-3g", label: "Mô Phỏng Mạng Yếu 3G (Downlink 0.4Mbps)", variant: "secondary", handler: "simulateSlowNetwork" },
          { id: "btn-simulate-4g", label: "Mô Phỏng Mạng Nhanh 4G/WiFi (Downlink 10Mbps)", variant: "secondary", handler: "simulateFastNetwork" }
        ],
        previewBox: {
          id: "net-status-box",
          initialText: "Đang kiểm tra kết nối mạng..."
        }
      }
    ]
  };

  function renderNetworkInfo(ctx, conn) {
    const isSaveData = conn.saveData || false;
    const effType = conn.effectiveType || 'Không rõ';
    const downlink = conn.downlink !== undefined ? `${conn.downlink} Mbps` : 'Không rõ';
    const rtt = conn.rtt !== undefined ? `${conn.rtt} ms` : 'Không rõ';

    // Quyết định chất lượng thích ứng
    let qualityBadge = '<span class="badge badge-success">Full HD / 4K (Băng thông tốt)</span>';
    if (effType === '3g' || (conn.downlink && conn.downlink < 1.5)) {
      qualityBadge = '<span class="badge badge-warning">SD 480p (Tiết kiệm băng thông)</span>';
    } else if (effType === '2g' || effType === 'slow-2g') {
      qualityBadge = '<span class="badge badge-danger">Audio-Only / Tắt ảnh (Mạng rất yếu)</span>';
    }
    if (isSaveData) {
      qualityBadge += ' <span class="badge badge-info">Data Saver Bật</span>';
    }

    ctx.setHtml('net-status-box', `
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:12px; margin-bottom:12px;">
        <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Loại mạng hiệu dụng (effectiveType):</div>
          <div style="font-size:1.2rem; font-weight:800; color:#38bdf8; text-transform:uppercase;">${effType}</div>
        </div>
        <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Băng thông ước tính (downlink):</div>
          <div style="font-size:1.2rem; font-weight:800; color:#34d399;">${downlink}</div>
        </div>
        <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Độ trễ khứ hồi (rtt latency):</div>
          <div style="font-size:1.2rem; font-weight:800; color:#fbbf24;">${rtt}</div>
        </div>
        <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Chế độ tiết kiệm dữ liệu (saveData):</div>
          <div style="font-size:1.2rem; font-weight:800; color:${isSaveData ? '#f87171' : '#34d399'};">${isSaveData ? 'BẬT' : 'TẮT'}</div>
        </div>
      </div>
      <div>• Đề xuất tải thích ứng (Adaptive Loading): ${qualityBadge}</div>
    `);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường Network Information API sẵn sàng");

      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (!conn) {
        ctx.warn("navigator.connection chưa được hỗ trợ trên trình duyệt này (Hỗ trợ tốt nhất trên Chrome / Edge / Android). Bạn có thể bấm nút Mô Phỏng.");
        ctx.setHtml('net-status-box', '<span style="color:#f87171;">navigator.connection không khả dụng. Hãy bấm nút Mô Phỏng để kiểm tra logic thích ứng.</span>');
        return;
      }

      ctx.success("navigator.connection khả dụng!");
      renderNetworkInfo(ctx, conn);

      conn.addEventListener('change', () => {
        ctx.event("navigator.connection change event", {
          effectiveType: conn.effectiveType,
          downlink: conn.downlink,
          rtt: conn.rtt
        });
        renderNetworkInfo(ctx, conn);
      });
    },

    inspectNetwork: (ctx) => {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (!conn) {
        ctx.warn("Không có navigator.connection.");
        return;
      }
      ctx.workflowStep("Kiểm tra thông số mạng hiện tại");
      ctx.info("Chi tiết:", {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      });
      renderNetworkInfo(ctx, conn);
    },

    simulateSlowNetwork: (ctx) => {
      ctx.workflowStep("Mô phỏng mạng di động 3G yếu");
      const mockConn = {
        effectiveType: '3g',
        downlink: 0.45,
        rtt: 450,
        saveData: true
      };
      ctx.warn("[Simulator] Đã chuyển sang cấu hình 3G yếu + DataSaver!");
      renderNetworkInfo(ctx, mockConn);
    },

    simulateFastNetwork: (ctx) => {
      ctx.workflowStep("Mô phỏng mạng cáp quang / 4G tốc độ cao");
      const mockConn = {
        effectiveType: '4g',
        downlink: 12.8,
        rtt: 25,
        saveData: false
      };
      ctx.success("[Simulator] Đã chuyển sang cấu hình 4G / Wi-Fi siêu tốc!");
      renderNetworkInfo(ctx, mockConn);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
