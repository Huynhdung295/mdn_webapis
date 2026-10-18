// webapis/payment_request/script.js - Payment Request API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  const spec = {
    id: "payment_request",
    panels: [
      {
        id: "panel-checkout-flow",
        title: "1. Khởi Tạo Quy Trình Thanh Toán Chuẩn Trình Duyệt",
        badge: "new PaymentRequest()",
        desc: "Gọi giao diện thanh toán gốc (Native Payment Sheet) của hệ điều hành (Apple Pay trên Safari iOS/macOS, Google Pay trên Chrome/Android) mà không cần form nhập thẻ dài dòng.",
        inputs: [
          {
            id: "input-item-name",
            type: "text",
            label: "Tên sản phẩm / Dịch vụ:",
            value: "Gói Hội Viên MDN Master VIP (1 Năm)"
          },
          {
            id: "input-item-price",
            type: "text",
            label: "Số tiền thanh toán (VND):",
            value: "499000"
          }
        ],
        customHtml: `
          <table class="cart-summary-table">
            <thead>
              <tr>
                <th>Mục</th>
                <th>Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Khóa học MDN Master VIP (1 Năm)</td>
                <td>450.000 ₫</td>
              </tr>
              <tr>
                <td>Thuế VAT (10%)</td>
                <td>49.000 ₫</td>
              </tr>
              <tr style="font-weight:700; color:#38bdf8;">
                <td>TỔNG CỘNG:</td>
                <td>499.000 ₫</td>
              </tr>
            </tbody>
          </table>
        `,
        actions: [
          { id: "btn-check-wallet", label: "Kiểm Tra Khả Năng Thanh Toán (canMakePayment)", variant: "secondary", handler: "checkCanMakePayment" },
          { id: "btn-launch-payment", label: "💳 Mở Giao Diện Thanh Toán (request.show())", variant: "primary", handler: "launchPaymentSheet" },
          { id: "btn-simulate-payment", label: "Giả Lập Quy Trình Hoàn Tất Giao Dịch", variant: "secondary", handler: "simulatePayment" }
        ],
        previewBox: {
          id: "payment-result-box",
          initialText: "Chưa có giao dịch nào được thực hiện."
        }
      }
    ]
  };

  function createPaymentRequest(amountVnd, itemName) {
    const supportedMethods = [
      {
        supportedMethods: 'https://google.com/pay',
        data: {
          environment: 'TEST',
          apiVersion: 2,
          apiVersionMinor: 0,
          merchantInfo: { merchantName: 'MDN Demo Store' },
          allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: { gateway: 'example', gatewayMerchantId: 'exampleGatewayMerchantId' }
            }
          }]
        }
      },
      {
        supportedMethods: 'basic-card',
        data: {
          supportedNetworks: ['visa', 'mastercard']
        }
      }
    ];

    const paymentDetails = {
      total: {
        label: itemName,
        amount: { currency: 'VND', value: amountVnd }
      },
      displayItems: [
        { label: 'Gói dịch vụ', amount: { currency: 'VND', value: String(Number(amountVnd) - 49000) } },
        { label: 'Thuế VAT', amount: { currency: 'VND', value: '49000' } }
      ]
    };

    const options = {
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true
    };

    return new PaymentRequest(supportedMethods, paymentDetails, options);
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo Payment Request API");
      if (!('PaymentRequest' in window)) {
        ctx.warn("Trình duyệt không hỗ trợ PaymentRequest API.");
      } else {
        ctx.success("Trình duyệt hỗ trợ đầy đủ PaymentRequest native!");
      }
    },

    checkCanMakePayment: async (ctx) => {
      ctx.workflowStep("Kiểm tra ví / phương thức thanh toán qua canMakePayment()");

      if (!('PaymentRequest' in window)) {
        ctx.warn("PaymentRequest không khả dụng.");
        return;
      }

      try {
        const req = createPaymentRequest('499000', 'Kiểm tra ví');
        const canPay = await req.canMakePayment();

        if (canPay) {
          ctx.success("Người dùng có sẵn thẻ hoặc ví điện tử (Google Pay / Apple Pay) sẵn sàng thanh toán!");
          ctx.setHtml('payment-result-box', '<span style="color:#34d399;">✔ Trình duyệt báo: Thiết bị có sẵn phương thức thanh toán.</span>');
        } else {
          ctx.warn("Không tìm thấy thẻ lưu sẵn hoặc ví điện tử chưa được cấu hình.");
          ctx.setHtml('payment-result-box', '<span style="color:#f59e0b;">● Không có ví lưu sẵn trên trình duyệt. Thao tác show() có thể yêu cầu nhập thẻ mới hoặc mở giả lập.</span>');
        }
      } catch (err) {
        ctx.error(`Lỗi kiểm tra: ${err.message}`, err);
      }
    },

    launchPaymentSheet: async (ctx) => {
      const price = ctx.getVal('input-item-price');
      const name = ctx.getVal('input-item-name');

      ctx.workflowStep(`Bắt đầu quy trình PaymentRequest.show() cho "${name}" (${price} ₫)`);

      if (!('PaymentRequest' in window)) {
        ctx.warn("Không có PaymentRequest, chuyển sang giả lập...");
        handlers.simulatePayment(ctx);
        return;
      }

      try {
        const req = createPaymentRequest(price, name);
        const paymentResponse = await req.show();

        ctx.success("Người dùng đã xác nhận thanh toán qua Native Sheet!", {
          methodName: paymentResponse.methodName,
          payerName: paymentResponse.payerName,
          payerEmail: paymentResponse.payerEmail,
          payerPhone: paymentResponse.payerPhone
        });

        // Hoàn tất giao dịch
        await paymentResponse.complete('success');
        ctx.workflowStep("Đã gọi paymentResponse.complete('success')");

        ctx.setHtml('payment-result-box', `
          <div style="color:#34d399; font-weight:600;">
            ✔ Giao dịch thành công qua ${paymentResponse.methodName}!
          </div>
          <div style="font-size:0.8rem; margin-top:4px;">
            Người trả: ${paymentResponse.payerName || 'N/A'} (${paymentResponse.payerEmail || 'N/A'})
          </div>
        `);
      } catch (err) {
        if (err.name === 'AbortError') {
          ctx.warn("Người dùng đã huỷ hoặc đóng cửa sổ thanh toán.", err);
        } else {
          ctx.error(`Lỗi thanh toán: ${err.message}. Đang thử mở giả lập thành công.`, err);
          handlers.simulatePayment(ctx);
        }
      }
    },

    simulatePayment: (ctx) => {
      ctx.workflowStep("[GIẢ LẬP] Mô phỏng thành công giao dịch Apple Pay / Google Pay");
      const mockResult = {
        transactionId: "TX-" + Math.floor(Math.random() * 900000 + 100000),
        method: "Apple Pay (Visa •••• 4242)",
        amount: "499.000 VND",
        status: "APPROVED_CAPTURED",
        timestamp: new Date().toISOString()
      };

      ctx.success("Mô phỏng thanh toán hoàn tất thành công:", mockResult);
      ctx.setHtml('payment-result-box', `
        <div style="color:#34d399; font-weight:700;">
          ✔ [MÔ PHỎNG] GIAO DỊCH ĐÃ ĐƯỢC DUYỆT THÀNH CÔNG!
        </div>
        <div style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">
          Mã GD: <strong>${mockResult.transactionId}</strong> | Phương thức: <strong>${mockResult.method}</strong><br>
          Số tiền: <strong>${mockResult.amount}</strong> | Thời gian: ${new Date().toLocaleTimeString()}
        </div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
