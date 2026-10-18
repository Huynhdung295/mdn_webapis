// test/test-each-api.js - Bộ kiểm thử tự động chi tiết cho từng bài lab trong 94 Web APIs
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const apiDataPath = path.join(rootDir, 'webapis', 'shared', 'api-data.js');
const apiDataCode = fs.readFileSync(apiDataPath, 'utf8');

const fakeWin = {};
vm.runInNewContext(apiDataCode, { window: fakeWin });
const apis = fakeWin.MDN_WEB_APIS_DATA || [];

console.log(`\n===========================================================`);
console.log(`🧪 CHẠY KIỂM THỬ TỪNG BÀI LAB TRONG 94 WEB APIS (94 SUITES)`);
console.log(`===========================================================\n`);

function createMockEnvironment() {
  const mockElements = new Map();

  const getMockEl = (id) => {
    if (!mockElements.has(id)) {
      mockElements.set(id, {
        id,
        value: 'mock_test_value_42',
        innerHTML: '',
        innerText: '',
        style: {
          width: '100px',
          height: '100px',
          setProperty: () => {},
          getPropertyValue: () => '0deg'
        },
        classList: {
          add: () => {},
          remove: () => {},
          toggle: () => {},
          contains: () => false
        },
        appendChild: () => {},
        setAttribute: () => {},
        getAttribute: () => '',
        addEventListener: () => {},
        removeEventListener: () => {},
        querySelector: () => null,
        querySelectorAll: () => [],
        focus: () => {},
        blur: () => {},
        click: () => {},
        scrollIntoView: () => {},
        getContext: () => ({
          fillRect: () => {},
          strokeRect: () => {},
          drawImage: () => {},
          fillText: () => {},
          measureText: () => ({ width: 10 }),
          beginPath: () => {},
          arc: () => {},
          fill: () => {},
          stroke: () => {},
          clearRect: () => {},
          createLinearGradient: () => ({ addColorStop: () => {} }),
          getImageData: () => ({ data: new Uint8ClampedArray(100) }),
          putImageData: () => {},
          save: () => {},
          restore: () => {},
          translate: () => {},
          rotate: () => {},
          moveTo: () => {},
          lineTo: () => {}
        }),
        toDataURL: () => 'data:image/png;base64,mock',
        play: async () => {},
        pause: () => {}
      });
    }
    return mockElements.get(id);
  };

  const env = {
    console: {
      log: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
      table: () => {},
      time: () => {},
      timeEnd: () => {},
      count: () => {},
      assert: () => {}
    },
    setTimeout: () => 1,
    clearTimeout: () => {},
    setInterval: () => 1,
    clearInterval: () => {},
    requestAnimationFrame: () => 1,
    cancelAnimationFrame: () => {},
    URL: URL,
    Blob: Blob,
    File: typeof File !== 'undefined' ? File : class File {},
    FormData: FormData,
    Headers: Headers,
    Request: Request,
    Response: Response,
    fetch: async () => ({
      ok: true,
      status: 200,
      json: async () => ({ status: 'ok', data: 'mock' }),
      text: async () => 'mock response text'
    }),
    document: {
      title: '',
      getElementById: (id) => getMockEl(id),
      querySelector: (sel) => getMockEl(sel),
      querySelectorAll: () => [],
      createElement: (tag) => getMockEl(tag),
      body: getMockEl('body'),
      documentElement: getMockEl('html'),
      fullscreenElement: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      fonts: {
        check: () => true,
        add: () => {}
      }
    },
    navigator: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
      clipboard: {
        writeText: async () => {},
        readText: async () => 'mock clipboard text'
      },
      sendBeacon: () => true,
      serviceWorker: {
        register: async () => ({}),
        getRegistration: async () => null
      },
      storage: {
        estimate: async () => ({ quota: 1000000, usage: 50000 })
      },
      permissions: {
        query: async () => ({ state: 'granted' })
      },
      locks: {
        request: async (...args) => {
          const callback = args.find(a => typeof a === 'function');
          if (callback) return callback({ name: args[0] });
        }
      },
      mediaDevices: {
        enumerateDevices: async () => [],
        getUserMedia: async () => ({ getTracks: () => [] })
      },
      wakeLock: {
        request: async () => ({ release: async () => {} })
      },
      vibrate: () => true,
      keyboard: {
        getLayoutMap: async () => new Map([['KeyQ', 'q'], ['KeyW', 'w']]),
        lock: async () => {},
        unlock: () => {}
      },
      mediaSession: {
        setActionHandler: () => {},
        playbackState: 'none'
      },
      geolocation: {
        getCurrentPosition: (success) => {
          success({
            coords: { latitude: 21.0285, longitude: 105.8542, accuracy: 10, altitude: null, heading: null, speed: null },
            timestamp: Date.now()
          });
        },
        watchPosition: () => 123,
        clearWatch: () => {}
      }
    },
    screen: {
      width: 1920,
      height: 1080,
      availWidth: 1920,
      availHeight: 1040,
      orientation: {
        type: 'landscape-primary',
        angle: 0,
        lock: async () => {},
        unlock: () => {},
        addEventListener: () => {}
      }
    },
    performance: {
      now: () => Date.now(),
      mark: () => {},
      measure: () => {},
      getEntriesByName: () => [{ duration: 1.5 }],
      getEntriesByType: () => [{
        domainLookupStart: 10, domainLookupEnd: 20,
        connectStart: 20, connectEnd: 40,
        requestStart: 40, responseStart: 60,
        domContentLoadedEventEnd: 100,
        startTime: 0, loadEventEnd: 150
      }],
      memory: { usedJSHeapSize: 10000000, totalJSHeapSize: 20000000, jsHeapSizeLimit: 50000000 }
    },
    window: null,
    getComputedStyle: () => ({ getPropertyValue: () => '0deg' }),
    location: { href: 'http://localhost:3000/', pathname: '/' },
    history: { pushState: () => {}, replaceState: () => {}, back: () => {}, forward: () => {} },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
    sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
    FontFace: class { constructor() {} async load() { return { status: 'loaded' }; } },
    Range: class {
      constructor() {}
      setStart() {}
      setEnd() {}
      surroundContents() {}
      getBoundingClientRect() { return { left: 10, right: 100, top: 10, bottom: 30 }; }
    },
    Highlight: class { constructor() {} },
    CSS: {
      registerProperty: () => {},
      highlights: { set: () => {}, delete: () => {} },
      px: (v) => ({ value: v, unit: 'px' }),
      percent: (v) => ({ value: v, unit: 'percent' })
    },
    CSSMathSum: class { constructor() {} },
    AudioContext: class {
      constructor() {
        this.currentTime = 0;
        this.destination = {};
        this.state = 'running';
      }
      createOscillator() { return { type: 'sine', frequency: { setValueAtTime: () => {} }, connect: () => {}, start: () => {}, stop: () => {} }; }
      createGain() { return { gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
      createAnalyser() { return { frequencyBinCount: 32, fftSize: 64, connect: () => {}, getByteFrequencyData: () => {} }; }
      resume() {}
    },
    IntersectionObserver: class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  };

  env.addEventListener = () => {};
  env.removeEventListener = () => {};
  env.window = env;
  env.window.addEventListener = () => {};
  env.window.removeEventListener = () => {};
  env.window.getSelection = () => ({
    isCollapsed: false,
    rangeCount: 1,
    toString: () => 'Test selected text',
    getRangeAt: () => new env.Range(),
    removeAllRanges: () => {}
  });

  return { env, getMockEl };
}

apis.forEach(api => {
  describe(`Lab [${api.id}] - ${api.name}`, () => {
    const htmlPath = path.join(rootDir, api.path);
    const scriptPath = path.join(path.dirname(htmlPath), 'script.js');

    it('Tệp HTML và script.js tồn tại trên đĩa', () => {
      assert.ok(fs.existsSync(htmlPath), `HTML missing for ${api.id}`);
      assert.ok(fs.existsSync(scriptPath), `script.js missing for ${api.id}`);
    });

    it('script.js không có lỗi biên dịch cú pháp', () => {
      const code = fs.readFileSync(scriptPath, 'utf8');
      assert.doesNotThrow(() => {
        new vm.Script(code);
      }, `Syntax error in ${api.id}`);
    });

    it('Dựng UI (renderApp / init) và thực thi onReady sạch sẽ không văng Exception', () => {
      const code = fs.readFileSync(scriptPath, 'utf8');
      const { env, getMockEl } = createMockEnvironment();

      let capturedSpec = null;
      let capturedHandlers = null;

      env.WebAPICore = {
        renderApp: (spec, handlers) => {
          capturedSpec = spec;
          capturedHandlers = handlers;
        },
        init: (config) => {
          capturedSpec = config;
          capturedHandlers = config;
        },
        escapeHtml: (s) => String(s || ''),
        log: () => {},
        info: () => {},
        success: () => {},
        warn: () => {},
        error: () => {},
        event: () => {},
        workflowStep: () => {},
        getVal: (id) => getMockEl(id).value,
        setVal: (id, val) => { getMockEl(id).value = val; },
        setHtml: (id, html) => { getMockEl(id).innerHTML = html; },
        getEl: (id) => getMockEl(id),
        isSupported: () => true
      };

      // Chạy script
      assert.doesNotThrow(() => {
        vm.runInNewContext(code, env);
      }, `Execution threw error in ${api.id}`);

      // Chạy onReady nếu có
      if (capturedHandlers && typeof capturedHandlers.onReady === 'function') {
        const ctx = {
          log: () => {},
          info: () => {},
          success: () => {},
          warn: () => {},
          error: () => {},
          event: () => {},
          workflowStep: () => {},
          escapeHtml: (s) => String(s || ''),
          getVal: (id) => getMockEl(id).value,
          setVal: (id, val) => { getMockEl(id).value = val; },
          setHtml: (id, html) => { getMockEl(id).innerHTML = html; },
          getEl: (id) => getMockEl(id),
          core: env.WebAPICore,
          isSupported: () => true
        };

        assert.doesNotThrow(() => {
          capturedHandlers.onReady(ctx);
        }, `onReady failed in ${api.id}`);
      }
    });

    it('Tất cả các nút hành động [data-action] tương tác an toàn không crash', async () => {
      const code = fs.readFileSync(scriptPath, 'utf8');
      const { env, getMockEl } = createMockEnvironment();

      let capturedHandlers = null;

      env.WebAPICore = {
        renderApp: (spec, handlers) => { capturedHandlers = handlers; },
        init: (config) => { capturedHandlers = config; },
        escapeHtml: (s) => String(s || ''),
        log: () => {}, info: () => {}, success: () => {}, warn: () => {}, error: () => {}, event: () => {}, workflowStep: () => {},
        getVal: (id) => getMockEl(id).value,
        setVal: (id, val) => { getMockEl(id).value = val; },
        setHtml: (id, html) => { getMockEl(id).innerHTML = html; },
        getEl: (id) => getMockEl(id),
        isSupported: () => true
      };

      vm.runInNewContext(code, env);

      if (!capturedHandlers) return;

      const ctx = {
        log: () => {}, info: () => {}, success: () => {}, warn: () => {}, error: () => {}, event: () => {}, workflowStep: () => {},
        escapeHtml: (s) => String(s || ''),
        getVal: (id) => getMockEl(id).value,
        setVal: (id, val) => { getMockEl(id).value = val; },
        setHtml: (id, html) => { getMockEl(id).innerHTML = html; },
        getEl: (id) => getMockEl(id),
        core: env.WebAPICore,
        isSupported: () => true
      };

      const mockEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: getMockEl('btn'),
        currentTarget: getMockEl('btn')
      };

      for (const [name, fn] of Object.entries(capturedHandlers)) {
        if (typeof fn === 'function' && name !== 'onReady' && name !== 'supportCheck') {
          // Thử gọi hàm với ctx và event giả lập
          let didThrow = false;
          let errMsg = '';
          try {
            const res = fn(ctx, mockEvent);
            if (res && typeof res.catch === 'function') {
              await res.catch(err => {
                // Async handler reject handled
              });
            }
          } catch (e) {
            didThrow = true;
            errMsg = e.message;
          }

          assert.strictEqual(didThrow, false, `Handler "${name}" in lab [${api.id}] threw: ${errMsg}`);
        }
      }
    });
  });
});
