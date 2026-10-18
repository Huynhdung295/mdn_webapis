// webapis/webrtc/script.js - WebRTC API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let peerA = null;
  let peerB = null;
  let dataChannelA = null;
  let dataChannelB = null;

  const spec = {
    id: "webrtc",
    panels: [
      {
        id: "panel-webrtc-p2p",
        title: "1. Kết Nối Ngang Hàng P2P & Data Channel",
        badge: "RTCPeerConnection & RTCDataChannel",
        desc: "Thiết lập luồng bắt tay SDP Offer / Answer và trao đổi gói tin trực tiếp giữa 2 peer A ⟷ B không qua server trung gian.",
        inputs: [
          { id: "p2p-msg-input", label: "Tin nhắn gửi qua Data Channel:", type: "text", value: "Xin chào từ Peer A qua WebRTC P2P!", fullWidth: true }
        ],
        actions: [
          { id: "btn-start-p2p", label: "Thiết Lập Kết Nối P2P (Offer/Answer/ICE)", variant: "primary", handler: "setupP2P" },
          { id: "btn-send-p2p", label: "Gửi Tin Nhắn Qua Kênh (dataChannel.send)", variant: "secondary", handler: "sendP2PMessage" },
          { id: "btn-close-p2p", label: "Đóng Kết Nối (close())", variant: "danger", handler: "closeP2P" }
        ],
        previewBox: {
          id: "webrtc-status-box",
          initialText: "Chưa kết nối Peer-to-Peer."
        }
      }
    ]
  };

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Môi trường WebRTC API sẵn sàng");
      if (!('RTCPeerConnection' in window)) {
        ctx.warn("RTCPeerConnection không khả dụng.");
      } else {
        ctx.success("RTCPeerConnection khả dụng!");
      }
    },

    setupP2P: async (ctx) => {
      if (!('RTCPeerConnection' in window)) return;
      ctx.workflowStep("Bắt đầu quy trình bắt tay WebRTC Loopback: Peer A ⟷ Peer B");

      if (peerA) peerA.close();
      if (peerB) peerB.close();

      peerA = new RTCPeerConnection();
      peerB = new RTCPeerConnection();

      // Trao đổi ICE Candidates
      peerA.onicecandidate = (e) => {
        if (e.candidate) {
          ctx.info("[Peer A] Sinh ICE Candidate ➔ Gửi sang Peer B");
          peerB.addIceCandidate(e.candidate);
        }
      };

      peerB.onicecandidate = (e) => {
        if (e.candidate) {
          ctx.info("[Peer B] Sinh ICE Candidate ➔ Gửi sang Peer A");
          peerA.addIceCandidate(e.candidate);
        }
      };

      // Peer B đón nhận Data Channel
      peerB.ondatachannel = (e) => {
        dataChannelB = e.channel;
        ctx.success("[Peer B] Đã nhận RTCDataChannel từ Peer A!");
        dataChannelB.onmessage = (msgEvent) => {
          ctx.event("[Peer B Nhận Được Tin Nhắn P2P]:", msgEvent.data);
          ctx.setHtml('webrtc-status-box', `
            <div style="color:#34d399; font-weight:700;">✔ Tin nhắn đã truyền qua P2P thành công!</div>
            <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-top:4px;">
              • Nội dung nhận được: <strong style="color:#38bdf8;">"${ctx.escapeHtml(msgEvent.data)}"</strong>
            </div>
          `);
        };
      };

      // Peer A tạo Data Channel
      dataChannelA = peerA.createDataChannel("chatChannel");
      dataChannelA.onopen = () => {
        ctx.success("[Peer A] Kênh DataChannel ĐÃ MỞ (readyState: open)! Bạn có thể gửi tin nhắn ngay.");
        ctx.setHtml('webrtc-status-box', '<div style="color:#34d399; font-weight:700;">● Kênh P2P Đã Kết Nối! Nhấn "Gửi Tin Nhắn Qua Kênh" để thử nghiệm.</div>');
      };

      try {
        // Tạo Offer
        const offer = await peerA.createOffer();
        await peerA.setLocalDescription(offer);
        ctx.info("[Peer A] Đã tạo SDP Offer và gán setLocalDescription()");

        await peerB.setRemoteDescription(offer);
        const answer = await peerB.createAnswer();
        await peerB.setLocalDescription(answer);
        ctx.info("[Peer B] Đã tạo SDP Answer và gán setLocalDescription()");

        await peerA.setRemoteDescription(answer);
        ctx.success("Bắt tay SDP Offer/Answer hoàn tất thành công!");
      } catch (err) {
        ctx.error("Lỗi bắt tay P2P:", err);
      }
    },

    sendP2PMessage: (ctx) => {
      const msg = ctx.getVal('p2p-msg-input');
      if (!dataChannelA || dataChannelA.readyState !== 'open') {
        ctx.warn("Kênh DataChannel chưa mở. Hãy nhấn nút 'Thiết Lập Kết Nối P2P' trước.");
        return;
      }

      ctx.workflowStep(`dataChannelA.send("${msg}")`);
      dataChannelA.send(msg);
      ctx.info(`[Peer A Gửi Đi] "${msg}"`);
    },

    closeP2P: (ctx) => {
      ctx.workflowStep("Đóng kết nối WebRTC RTCPeerConnection");
      if (peerA) peerA.close();
      if (peerB) peerB.close();
      peerA = null;
      peerB = null;
      dataChannelA = null;
      dataChannelB = null;
      ctx.warn("Đã đóng kết nối P2P.");
      ctx.setHtml('webrtc-status-box', 'Trạng thái: Kết nối đã đóng.');
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
