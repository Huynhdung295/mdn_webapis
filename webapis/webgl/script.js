// webapis/webgl/script.js - WebGL API: DRY JSON Spec + Handlers
(function() {
  'use strict';

  let gl = null;
  let animId = null;
  let rotationSpeed = 0.02;
  let isRotating = true;
  let currentAngle = 0;

  const spec = {
    id: "webgl",
    panels: [
      {
        id: "panel-webgl-cube",
        title: "1. Render Khối Hộp 3D Quay Không Gian (Shaders & Pipeline)",
        badge: "WebGL2RenderingContext",
        desc: "Khởi tạo GPU Rendering Pipeline thực tế: biên dịch Vertex Shader, Fragment Shader, nạp Vertex Buffer Object (VBO) và vẽ khối lập phương 3D với màu sắc ma trận.",
        inputs: [
          {
            id: "select-wireframe-mode",
            type: "select",
            label: "Kiểu dựng hình khối 3D:",
            options: [
              { value: "triangles", label: "Đổ màu đa giác đặc (gl.TRIANGLES)" },
              { value: "lines", label: "Khung lưới dây cáp (gl.LINES - Wireframe)" },
              { value: "points", label: "Đám mây điểm hạt (gl.POINTS)" }
            ]
          }
        ],
        customHtml: `
          <div class="webgl-canvas-wrap">
            <canvas id="webgl-cube-canvas" width="480" height="260"></canvas>
          </div>
        `,
        actions: [
          { id: "btn-toggle-rotate", label: "Tạm Dừng / Tiếp Tục Quay", variant: "primary", handler: "toggleRotation" },
          { id: "btn-query-gpu", label: "Truy Vấn Chip Đồ Hoạ GPU (gl.getParameter)", variant: "secondary", handler: "queryGpuDetails" }
        ],
        previewBox: {
          id: "webgl-gpu-info-box",
          initialText: "Đang khởi tạo WebGL 3D Pipeline..."
        }
      }
    ]
  };

  function initWebGLSandbox() {
    const canvas = document.getElementById('webgl-cube-canvas');
    if (!canvas) return;

    gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl || typeof gl.createShader !== 'function') return;

    // Vertex Shader
    const vsSource = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      uniform mat4 uMatrix;
      varying vec3 vColor;
      void main() {
        vColor = aColor;
        gl_Position = uMatrix * vec4(aPosition, 1.0);
        gl_PointSize = 4.0;
      }
    `;

    // Fragment Shader
    const fsSource = `
      precision mediump float;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Tọa độ các đỉnh của khối lập phương (Cube 8 vertices)
    const vertices = new Float32Array([
      // Front face
      -0.5, -0.5,  0.5,   1, 0, 0,
       0.5, -0.5,  0.5,   0, 1, 0,
       0.5,  0.5,  0.5,   0, 0, 1,
      -0.5,  0.5,  0.5,   1, 1, 0,
      // Back face
      -0.5, -0.5, -0.5,   1, 0, 1,
      -0.5,  0.5, -0.5,   0, 1, 1,
       0.5,  0.5, -0.5,   1, 1, 1,
       0.5, -0.5, -0.5,   0.5, 0.5, 0.5
    ]);

    const indices = new Uint16Array([
      0, 1, 2,  0, 2, 3, // front
      1, 7, 6,  1, 6, 2, // right
      7, 4, 5,  7, 5, 6, // back
      4, 0, 3,  4, 3, 5, // left
      3, 2, 6,  3, 6, 5, // top
      4, 7, 1,  4, 1, 0  // bottom
    ]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 24, 0);

    const aCol = gl.getAttribLocation(program, 'aColor');
    gl.enableVertexAttribArray(aCol);
    gl.vertexAttribPointer(aCol, 3, gl.FLOAT, false, 24, 12);

    const uMatrix = gl.getUniformLocation(program, 'uMatrix');

    gl.enable(gl.DEPTH_TEST);

    function renderLoop() {
      if (isRotating) {
        currentAngle += rotationSpeed;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.01, 0.03, 0.09, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Ma trận xoay 3D cơ bản (X and Y rotation)
      const cosA = Math.cos(currentAngle);
      const sinA = Math.sin(currentAngle);
      const cosB = Math.cos(currentAngle * 0.7);
      const sinB = Math.sin(currentAngle * 0.7);

      // Ma trận nhân đơn giản hiển thị lập phương ở góc nhìn nghiêng
      const matrix = new Float32Array([
        cosA * 0.8, sinA * sinB * 0.8, sinA * cosB * 0.8, 0,
        0, cosB * 0.8, -sinB * 0.8, 0,
        -sinA * 0.8, cosA * sinB * 0.8, cosA * cosB * 0.8, 0,
        0, 0, -2.0, 1
      ]);

      gl.uniformMatrix4fv(uMatrix, false, matrix);

      const modeSelect = document.getElementById('select-wireframe-mode');
      const modeVal = modeSelect ? modeSelect.value : 'triangles';

      let drawMode = gl.TRIANGLES;
      if (modeVal === 'lines') drawMode = gl.LINES;
      if (modeVal === 'points') drawMode = gl.POINTS;

      gl.drawElements(drawMode, indices.length, gl.UNSIGNED_SHORT, 0);

      animId = requestAnimationFrame(renderLoop);
    }

    renderLoop();
  }

  const handlers = {
    onReady: (ctx) => {
      ctx.workflowStep("Khởi tạo WebGL 3D Engine");
      initWebGLSandbox();

      if (!gl) {
        ctx.warn("Không thể tạo WebGL Context trên trình duyệt này.");
        return;
      }

      ctx.success("Khởi tạo WebGL Context thành công!");
      handlers.queryGpuDetails(ctx);
    },

    toggleRotation: (ctx) => {
      isRotating = !isRotating;
      ctx.workflowStep(`Chuyển trạng thái quay 3D: isRotating = ${isRotating}`);
    },

    queryGpuDetails: (ctx) => {
      ctx.workflowStep("Truy vấn thông số phần cứng đồ hoạ (gl.getParameter)");
      if (!gl || typeof gl.getParameter !== 'function') return;

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      let vendor = "N/A";
      let renderer = "N/A";

      if (debugInfo) {
        vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }

      const version = gl.getParameter(gl.VERSION);
      const glslVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);

      ctx.success("Thông số GPU trích xuất thành công:", {
        renderer: renderer,
        vendor: vendor,
        version: version,
        glsl: glslVersion
      });

      ctx.setHtml('webgl-gpu-info-box', `
        <div style="font-size:0.85rem;">
          <div>🎮 <strong>Chip GPU:</strong> <span style="color:#38bdf8;">${renderer}</span></div>
          <div style="margin-top:2px;">Nhà cung cấp: <strong>${vendor}</strong></div>
          <div style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">
            Phiên bản: ${version} | GLSL: ${glslVersion}
          </div>
        </div>
      `);
    }
  };

  WebAPICore.renderApp(spec, handlers);
})();
