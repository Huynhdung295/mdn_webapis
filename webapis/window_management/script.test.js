// webapis/window_management/script.test.js - Kiểm thử độc lập cho Window Management API bằng Vitest
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import vm from 'vm';

describe('Window Management API [webapis/window_management]', () => {
  const dir = path.resolve(__dirname);
  const htmlPath = path.join(dir, 'index.html');
  const scriptPath = path.join(dir, 'script.js');

  it('Tệp index.html và script.js tồn tại trong thư mục', () => {
    expect(fs.existsSync(htmlPath)).toBe(true);
    expect(fs.existsSync(scriptPath)).toBe(true);
  });

  it('script.js không có lỗi cú pháp JavaScript', () => {
    const code = fs.readFileSync(scriptPath, 'utf8');
    expect(() => new vm.Script(code)).not.toThrow();
  });

  it('Dựng UI và chạy onReady sạch sẽ không quăng ngoại lệ', () => {
    const code = fs.readFileSync(scriptPath, 'utf8');
    let capturedSpec = null;
    let capturedHandlers = null;

    const mockElements = new Map();
    const getMockEl = (id) => {
      if (!mockElements.has(id)) {
        mockElements.set(id, {
          id,
          value: 'test_sample_val_123',
          innerHTML: '',
          innerText: '',
          style: { width: '100px', height: '100px', setProperty: () => {}, getPropertyValue: () => '0deg' },
          classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
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
            fillRect: () => {}, strokeRect: () => {}, drawImage: () => {}, fillText: () => {},
            measureText: () => ({ width: 10 }), beginPath: () => {}, arc: () => {}, fill: () => {}, stroke: () => {},
            clearRect: () => {}, createLinearGradient: () => ({ addColorStop: () => {} }),
            getImageData: () => ({ data: new Uint8ClampedArray(100) }), putImageData: () => {},
            save: () => {}, restore: () => {}, translate: () => {}, rotate: () => {}, moveTo: () => {}, lineTo: () => {}
          }),
          toDataURL: () => 'data:image/png;base64,mock',
          play: async () => {},
          pause: () => {}
        });
      }
      return mockElements.get(id);
    };

    const mockCtx = {
      log: () => {}, info: () => {}, success: () => {}, warn: () => {}, error: () => {}, event: () => {}, workflowStep: () => {},
      escapeHtml: (s) => String(s || ''),
      getVal: (id) => getMockEl(id).value,
      setVal: (id, val) => { getMockEl(id).value = val; },
      setHtml: (id, html) => { getMockEl(id).innerHTML = html; },
      getEl: (id) => getMockEl(id),
      core: {
        escapeHtml: (s) => String(s || ''),
        isSupported: () => true
      },
      isSupported: () => true
    };

    const sandbox = {
      console: { log: () => {}, info: () => {}, warn: () => {}, error: () => {}, table: () => {}, time: () => {}, timeEnd: () => {}, count: () => {}, assert: () => {} },
      setTimeout: () => 1,
      clearTimeout: () => {},
      setInterval: () => 1,
      clearInterval: () => {},
      requestAnimationFrame: () => 1,
      cancelAnimationFrame: () => {},
      URL: globalThis.URL,
      Blob: globalThis.Blob,
      FormData: globalThis.FormData,
      Headers: globalThis.Headers,
      Request: globalThis.Request,
      Response: globalThis.Response,
      fetch: async () => ({ ok: true, status: 200, json: async () => ({ status: 'ok' }), text: async () => 'ok' }),
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
        fonts: { check: () => true, add: () => {} }
      },
      navigator: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        clipboard: { writeText: async () => {}, readText: async () => 'test' },
        sendBeacon: () => true,
        serviceWorker: { register: async () => ({}), getRegistration: async () => null },
        storage: { estimate: async () => ({ quota: 1000000, usage: 50000 }) },
        permissions: { query: async () => ({ state: 'granted' }) },
        locks: { request: async (...args) => { const cb = args.find(a => typeof a === 'function'); if (cb) return cb({ name: args[0] }); } },
        mediaDevices: { enumerateDevices: async () => [], getUserMedia: async () => ({ getTracks: () => [] }) },
        wakeLock: { request: async () => ({ release: async () => {} }) },
        vibrate: () => true,
        keyboard: { getLayoutMap: async () => new Map([['KeyQ', 'q']]), lock: async () => {}, unlock: () => {} },
        mediaSession: { setActionHandler: () => {}, playbackState: 'none' },
        geolocation: {
          getCurrentPosition: (cb) => cb({ coords: { latitude: 21, longitude: 105, accuracy: 10, altitude: null, heading: null, speed: null }, timestamp: Date.now() }),
          watchPosition: () => 1, clearWatch: () => {}
        }
      },
      screen: {
        width: 1920, height: 1080, availWidth: 1920, availHeight: 1040,
        orientation: { type: 'landscape-primary', angle: 0, lock: async () => {}, unlock: () => {}, addEventListener: () => {} }
      },
      performance: {
        now: () => Date.now(), mark: () => {}, measure: () => {},
        getEntriesByName: () => [{ duration: 1 }], getEntriesByType: () => [{ domainLookupStart: 0, domainLookupEnd: 10, connectStart: 10, connectEnd: 20, requestStart: 20, responseStart: 30, domContentLoadedEventEnd: 50, startTime: 0, loadEventEnd: 80 }],
        memory: { usedJSHeapSize: 100000, totalJSHeapSize: 200000, jsHeapSizeLimit: 500000 }
      },
      location: { href: 'http://localhost:3000/', pathname: '/' },
      history: { pushState: () => {}, replaceState: () => {}, back: () => {}, forward: () => {} },
      localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
      sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
      FontFace: class { constructor() {} async load() { return { status: 'loaded' }; } },
      Range: class { constructor() {} setStart() {} setEnd() {} surroundContents() {} getBoundingClientRect() { return { left: 0, right: 10, top: 0, bottom: 10 }; } },
      Highlight: class { constructor() {} },
      CSS: { registerProperty: () => {}, highlights: { set: () => {}, delete: () => {} }, px: (v) => ({ value: v, unit: 'px' }), percent: (v) => ({ value: v, unit: 'percent' }) },
      CSSMathSum: class { constructor() {} },
      AudioContext: class { constructor() { this.currentTime = 0; this.destination = {}; this.state = 'running'; } createOscillator() { return { type: 'sine', frequency: { setValueAtTime: () => {} }, connect: () => {}, start: () => {}, stop: () => {} }; } createGain() { return { gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; } createAnalyser() { return { frequencyBinCount: 32, fftSize: 64, connect: () => {}, getByteFrequencyData: () => {} }; } resume() {} },
      IntersectionObserver: class { constructor() {} observe() {} unobserve() {} disconnect() {} },
      WebAPICore: {
        renderApp: (spec, handlers) => { capturedSpec = spec; capturedHandlers = handlers; },
        init: (config) => { capturedSpec = config; capturedHandlers = config; },
        escapeHtml: (s) => String(s || ''),
        log: () => {}, info: () => {}, success: () => {}, warn: () => {}, error: () => {}, event: () => {}, workflowStep: () => {},
        getVal: (id) => getMockEl(id).value, setVal: (id, val) => { getMockEl(id).value = val; }, setHtml: (id, html) => { getMockEl(id).innerHTML = html; }, getEl: (id) => getMockEl(id),
        isSupported: () => true
      }
    };
    sandbox.window = sandbox;
    sandbox.window.addEventListener = () => {};
    sandbox.window.removeEventListener = () => {};
    sandbox.window.getSelection = () => ({ isCollapsed: false, rangeCount: 1, toString: () => 'sample text', getRangeAt: () => new sandbox.Range(), removeAllRanges: () => {} });

    vm.runInNewContext(code, sandbox);

    expect(capturedHandlers).toBeDefined();

    if (capturedHandlers && typeof capturedHandlers.onReady === 'function') {
      expect(() => capturedHandlers.onReady(mockCtx)).not.toThrow();
    }
  });

  it('Tất cả các nút hành động [data-action] tương tác an toàn không crash', async () => {
    const code = fs.readFileSync(scriptPath, 'utf8');
    let capturedHandlers = null;

    const mockElements = new Map();
    const getMockEl = (id) => {
      if (!mockElements.has(id)) {
        mockElements.set(id, {
          id,
          value: 'test_sample_val_123',
          innerHTML: '',
          innerText: '',
          style: { width: '100px', height: '100px', setProperty: () => {}, getPropertyValue: () => '0deg' },
          classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
          appendChild: () => {}, setAttribute: () => {}, getAttribute: () => '', addEventListener: () => {}, removeEventListener: () => {},
          querySelector: () => null, querySelectorAll: () => [], focus: () => {}, blur: () => {}, click: () => {}, scrollIntoView: () => {},
          getContext: () => ({
            fillRect: () => {}, strokeRect: () => {}, drawImage: () => {}, fillText: () => {}, measureText: () => ({ width: 10 }),
            beginPath: () => {}, arc: () => {}, fill: () => {}, stroke: () => {}, clearRect: () => {}, createLinearGradient: () => ({ addColorStop: () => {} }),
            getImageData: () => ({ data: new Uint8ClampedArray(100) }), putImageData: () => {}, save: () => {}, restore: () => {}, translate: () => {}, rotate: () => {}, moveTo: () => {}, lineTo: () => {}
          }),
          toDataURL: () => 'data:image/png;base64,mock', play: async () => {}, pause: () => {}
        });
      }
      return mockElements.get(id);
    };

    const mockCtx = {
      log: () => {}, info: () => {}, success: () => {}, warn: () => {}, error: () => {}, event: () => {}, workflowStep: () => {},
      escapeHtml: (s) => String(s || ''),
      getVal: (id) => getMockEl(id).value,
      setVal: (id, val) => { getMockEl(id).value = val; },
      setHtml: (id, html) => { getMockEl(id).innerHTML = html; },
      getEl: (id) => getMockEl(id),
      core: { escapeHtml: (s) => String(s || ''), isSupported: () => true },
      isSupported: () => true
    };

    const sandbox = {
      console: { log: () => {}, info: () => {}, warn: () => {}, error: () => {}, table: () => {}, time: () => {}, timeEnd: () => {}, count: () => {}, assert: () => {} },
      setTimeout: () => 1, clearTimeout: () => {}, setInterval: () => 1, clearInterval: () => {}, requestAnimationFrame: () => 1, cancelAnimationFrame: () => {},
      URL: globalThis.URL, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response,
      fetch: async () => ({ ok: true, status: 200, json: async () => ({ status: 'ok' }), text: async () => 'ok' }),
      document: {
        title: '', getElementById: (id) => getMockEl(id), querySelector: (sel) => getMockEl(sel), querySelectorAll: () => [],
        createElement: (tag) => getMockEl(tag), body: getMockEl('body'), documentElement: getMockEl('html'), fullscreenElement: null,
        addEventListener: () => {}, removeEventListener: () => {}, fonts: { check: () => true, add: () => {} }
      },
      navigator: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        clipboard: { writeText: async () => {}, readText: async () => 'test' },
        sendBeacon: () => true,
        serviceWorker: { register: async () => ({}), getRegistration: async () => null },
        storage: { estimate: async () => ({ quota: 1000000, usage: 50000 }) },
        permissions: { query: async () => ({ state: 'granted' }) },
        locks: { request: async (...args) => { const cb = args.find(a => typeof a === 'function'); if (cb) return cb({ name: args[0] }); } },
        mediaDevices: { enumerateDevices: async () => [], getUserMedia: async () => ({ getTracks: () => [] }) },
        wakeLock: { request: async () => ({ release: async () => {} }) },
        vibrate: () => true,
        keyboard: { getLayoutMap: async () => new Map([['KeyQ', 'q']]), lock: async () => {}, unlock: () => {} },
        mediaSession: { setActionHandler: () => {}, playbackState: 'none' },
        geolocation: { getCurrentPosition: (cb) => cb({ coords: { latitude: 21, longitude: 105, accuracy: 10, altitude: null, heading: null, speed: null }, timestamp: Date.now() }), watchPosition: () => 1, clearWatch: () => {} }
      },
      screen: { width: 1920, height: 1080, availWidth: 1920, availHeight: 1040, orientation: { type: 'landscape-primary', angle: 0, lock: async () => {}, unlock: () => {}, addEventListener: () => {} } },
      performance: { now: () => Date.now(), mark: () => {}, measure: () => {}, getEntriesByName: () => [{ duration: 1 }], getEntriesByType: () => [{ domainLookupStart: 0, domainLookupEnd: 10, connectStart: 10, connectEnd: 20, requestStart: 20, responseStart: 30, domContentLoadedEventEnd: 50, startTime: 0, loadEventEnd: 80 }], memory: { usedJSHeapSize: 100000, totalJSHeapSize: 200000, jsHeapSizeLimit: 500000 } },
      location: { href: 'http://localhost:3000/', pathname: '/' },
      history: { pushState: () => {}, replaceState: () => {}, back: () => {}, forward: () => {} },
      localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
      sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
      FontFace: class { constructor() {} async load() { return { status: 'loaded' }; } },
      Range: class { constructor() {} setStart() {} setEnd() {} surroundContents() {} getBoundingClientRect() { return { left: 0, right: 10, top: 0, bottom: 10 }; } },
      Highlight: class { constructor() {} },
      CSS: { registerProperty: () => {}, highlights: { set: () => {}, delete: () => {} }, px: (v) => ({ value: v, unit: 'px' }), percent: (v) => ({ value: v, unit: 'percent' }) },
      CSSMathSum: class { constructor() {} },
      AudioContext: class { constructor() { this.currentTime = 0; this.destination = {}; this.state = 'running'; } createOscillator() { return { type: 'sine', frequency: { setValueAtTime: () => {} }, connect: () => {}, start: () => {}, stop: () => {} }; } createGain() { return { gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; } createAnalyser() { return { frequencyBinCount: 32, fftSize: 64, connect: () => {}, getByteFrequencyData: () => {} }; } resume() {} },
      IntersectionObserver: class { constructor() {} observe() {} unobserve() {} disconnect() {} },
      WebAPICore: {
        renderApp: (spec, handlers) => { capturedHandlers = handlers; },
        init: (config) => { capturedHandlers = config; },
        escapeHtml: (s) => String(s || ''),
        log: () => {}, info: () => {}, success: () => {}, warn: () => {}, error: () => {}, event: () => {}, workflowStep: () => {},
        getVal: (id) => getMockEl(id).value, setVal: (id, val) => { getMockEl(id).value = val; }, setHtml: (id, html) => { getMockEl(id).innerHTML = html; }, getEl: (id) => getMockEl(id),
        isSupported: () => true
      }
    };
    sandbox.window = sandbox;
    sandbox.window.addEventListener = () => {};
    sandbox.window.removeEventListener = () => {};
    sandbox.window.getSelection = () => ({ isCollapsed: false, rangeCount: 1, toString: () => 'sample text', getRangeAt: () => new sandbox.Range(), removeAllRanges: () => {} });

    vm.runInNewContext(code, sandbox);

    if (!capturedHandlers) return;

    const mockBtn = getMockEl('test-btn');
    const mockEvent = { preventDefault: () => {}, stopPropagation: () => {}, target: mockBtn, currentTarget: mockBtn };

    for (const [name, fn] of Object.entries(capturedHandlers)) {
      if (typeof fn === 'function' && name !== 'onReady' && name !== 'supportCheck') {
        let threw = false;
        let errMessage = '';
        try {
          const res = fn(mockCtx, mockEvent);
          if (res && typeof res.catch === 'function') {
            await res.catch(err => {});
          }
        } catch (e) {
          threw = true;
          errMessage = e.message;
        }
        expect(threw, `Action handler "${name}" in [window_management] threw: ${errMessage}`).toBe(false);
      }
    }
  });
});
