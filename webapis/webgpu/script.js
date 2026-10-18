// webapis/webgpu/script.js - WebGPU API: DRY JSON Spec + Workflow Handlers
(function() {
  'use strict';

  let gpuAdapter = null;
  let gpuDevice = null;

  const spec = {
    id: "webgpu",
    panels: [
      {
        id: "panel-webgpu-render",
        title: "1. Đồ Hoạ Phần Cứng & Shader GPU (Vulkan / Metal / DirectX 12)",
        badge: "navigator.gpu",
        desc: "Chuẩn thay thế WebGL: giao tiếp trực tiếp với vi xử lý đồ hoạ GPU qua ngôn ngữ WGSL shader để vẽ hình khối và tính toán song song.",
        customHtml: `
          <canvas id="gpu-canvas" class="webgpu-canvas" width="600" height="220"></canvas>
        `,
        actions: [
          { id: "btn-init-webgpu", label: "Yêu Cầu GPU Device (requestAdapter)", variant: "primary", handler: "initWebGPU" },
          { id: "btn-render-triangle", label: "Vẽ Tam Giác Màu Bằng WGSL Shader", variant: "secondary", handler: "renderTriangle" }
        ],
        previewBox: {
          id: "webgpu-status-box",
          initialText: "Đang kiểm tra card đồ hoạ WebGPU..."
        }
      }
    ]
  };

  const handlers = {
    onReady: async (ctx) => {
      ctx.workflowStep("Môi trường WebGPU API khởi động");
      if (!navigator.gpu) {
        ctx.warn("navigator.gpu không được hỗ trợ trên trình duyệt này (hỗ trợ tốt nhất trên Chrome 113+, Edge 113+).");
        ctx.setHtml('webgpu-status-box', '<span style="color:#f87171;">Trình duyệt hoặc hệ điều hành hiện tại chưa bật WebGPU native.</span>');
      } else {
        ctx.success("navigator.gpu khả dụng!");
        handlers.initWebGPU(ctx);
      }
    },

    initWebGPU: async (ctx) => {
      if (!navigator.gpu) return;
      ctx.workflowStep("Gọi navigator.gpu.requestAdapter()");

      try {
        gpuAdapter = await navigator.gpu.requestAdapter();
        if (!gpuAdapter) {
          ctx.warn("Không tìm thấy Adapter GPU phù hợp.");
          return;
        }

        const info = gpuAdapter.info || {};
        ctx.info("Đã phát hiện card đồ hoạ:", {
          vendor: info.vendor || "GPU",
          architecture: info.architecture || "Modern",
          device: info.device || "Dedicated/Integrated"
        });

        gpuDevice = await gpuAdapter.requestDevice();
        ctx.success("Đã khởi tạo GPUDevice thành công!");

        ctx.setHtml('webgpu-status-box', `
          <div style="color:#34d399; font-weight:700;">✔ KẾT NỐI GPU PHẦN CỨNG THÀNH CÔNG!</div>
          <div>• Hãng sản xuất (Vendor): <strong>${info.vendor || 'Phần cứng GPU'}</strong></div>
          <div>• Kiến trúc (Architecture): <code>${info.architecture || 'Tăng tốc phần cứng'}</code></div>
          <div>• Giới hạn bộ nhớ Texture tối đa: <code>${gpuDevice.limits.maxTextureDimension2D}px</code></div>
        `);
      } catch (err) {
        ctx.error("Lỗi khi kết nối GPU:", err);
      }
    },

    renderTriangle: async (ctx) => {
      if (!gpuDevice) {
        await handlers.initWebGPU(ctx);
        if (!gpuDevice) return;
      }

      ctx.workflowStep("Biên dịch WGSL Shader và dựng RenderPipeline");
      const canvas = document.getElementById('gpu-canvas');
      const gpuCtx = canvas.getContext('webgpu');
      const format = navigator.gpu.getPreferredCanvasFormat();

      gpuCtx.configure({
        device: gpuDevice,
        format: format,
        alphaMode: 'premultiplied'
      });

      // Mã nguồn WGSL Shader
      const wgslCode = `
        @vertex
        fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4f {
          var pos = array<vec2f, 3>(
            vec2f(0.0, 0.6),
            vec2f(-0.6, -0.6),
            vec2f(0.6, -0.6)
          );
          return vec4f(pos[in_vertex_index], 0.0, 1.0);
        }

        @fragment
        fn fs_main() -> @location(0) vec4f {
          return vec4f(0.22, 0.74, 0.97, 1.0); // Màu xanh dương #38bdf8
        }
      `;

      try {
        const shaderModule = gpuDevice.createShaderModule({ code: wgslCode });
        const pipeline = gpuDevice.createRenderPipeline({
          layout: 'auto',
          vertex: { module: shaderModule, entryPoint: 'vs_main' },
          fragment: {
            module: shaderModule,
            entryPoint: 'fs_main',
            targets: [{ format: format }]
          },
          primitive: { topology: 'triangle-list' }
        });

        const commandEncoder = gpuDevice.createCommandEncoder();
        const textureView = gpuCtx.getCurrentTexture().createView();
        const renderPassDescriptor = {
          colorAttachments: [{
            view: textureView,
            clearValue: { r: 0.02, g: 0.04, b: 0.09, a: 1.0 },
            loadOp: 'clear',
            storeOp: 'store'
          }]
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.draw(3);
        passEncoder.end();

        gpuDevice.queue.submit([commandEncoder.finish()]);

        ctx.success("Tam giác WebGPU đã được render trực tiếp bằng GPU Shaders!");
        ctx.setHtml('webgpu-status-box', '<div style="color:#34d399; font-weight:700;">● Tam giác màu xanh đã được vẽ thành công trên Canvas bằng WGSL Shader!</div>');
      } catch (err) {
        ctx.error("Lỗi khi render WebGPU:", err.message);
      }
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
