// webapis/shared/api-encyclopedia.js - Bách khoa toàn thư toàn diện Web APIs chuẩn
(function(window) {
  'use strict';

  const MDN_ENCYCLOPEDIA_DATA = {
  "audio_output_devices": {
    "id": "audio_output_devices",
    "name": "Audio Output Devices API",
    "category": "Audio & Media",
    "group": "A",
    "path": "webapis/audio_output_devices/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "49+",
      "edge": "79+",
      "firefox": "Flag",
      "safari": "17+"
    },
    "why": "Mặc định trình duyệt phát âm thanh ra loa hệ thống mặc định. API này cho phép web chọn chính xác loa/tai nghe/Bluetooth riêng biệt cho từng luồng âm thanh.",
    "whenToUse": "Ứng dụng gọi thoại (Zoom, Meet, Discord) cần cho tiếng chuông reo ra loa ngoài nhưng giọng đàm thoại phát qua tai nghe; phần mềm DJ, phát nhạc đa phòng.",
    "whenNotToUse": "Web thông thường chỉ phát video/audio đơn giản, không cần can thiệp lựa chọn thiết bị của người dùng.",
    "interfaces": [
      "MediaDevices",
      "HTMLMediaElement",
      "AudioContext"
    ],
    "props": [
      {
        "name": "HTMLMediaElement.prototype.sinkId",
        "type": "string",
        "desc": "ID định danh duy nhất của thiết bị loa đang phát âm thanh (rỗng nếu mặc định hệ thống)."
      },
      {
        "name": "MediaDeviceInfo.deviceId",
        "type": "string",
        "desc": "Chuỗi hash duy nhất của thiết bị phần cứng âm thanh."
      },
      {
        "name": "MediaDeviceInfo.kind",
        "type": "\"audiooutput\" | \"audioinput\" | \"videoinput\"",
        "desc": "Phân loại thiết bị phần cứng."
      },
      {
        "name": "MediaDeviceInfo.label",
        "type": "string",
        "desc": "Tên thân thiện của thiết bị (ví dụ: \"Tai nghe Sony WH-1000XM5\")."
      }
    ],
    "methods": [
      {
        "signature": "navigator.mediaDevices.selectAudioOutput(options?)",
        "returns": "Promise<MediaDeviceInfo>",
        "desc": "Mở hộp thoại trình duyệt cấp quyền để người dùng chọn thiết bị phát loa.",
        "code": "const device = await navigator.mediaDevices.selectAudioOutput();"
      },
      {
        "signature": "navigator.mediaDevices.enumerateDevices()",
        "returns": "Promise<MediaDeviceInfo[]>",
        "desc": "Liệt kê danh sách tất cả micro, camera và loa có trong hệ thống.",
        "code": "const devices = await navigator.mediaDevices.enumerateDevices();"
      },
      {
        "signature": "mediaElement.setSinkId(deviceId)",
        "returns": "Promise<void>",
        "desc": "Định tuyến âm thanh của thẻ video/audio ra loa hoặc tai nghe chỉ định.",
        "code": "await audioElement.setSinkId(device.deviceId);"
      }
    ],
    "events": [
      {
        "name": "devicechange",
        "type": "Event",
        "desc": "Bắn ra trên navigator.mediaDevices khi người dùng cắm thêm hoặc rút loa/tai nghe/USB."
      }
    ],
    "realWorldApp": "Phần mềm họp Zoom/Discord (định tuyến chuông reo ra loa ngoài, đàm thoại ra tai nghe); phần mềm DJ phát nhạc trước (cueing).",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: AUDIO OUTPUT DEVICES API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeAudioOutputDevices() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = (navigator.mediaDevices && ('selectAudioOutput' in navigator.mediaDevices || 'enumerateDevices' in navigator.mediaDevices)) && ('setSinkId' in HTMLMediaElement.prototype);\n  if (!isSupported) {\n    console.warn(\"⚠️ [Audio Output Devices API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Audio Output Devices API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    const device = await navigator.mediaDevices.selectAudioOutput();\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Audio Output Devices API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "audio_session": {
    "id": "audio_session",
    "name": "Audio Session API",
    "category": "Audio & Media",
    "group": "A",
    "path": "webapis/audio_session/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Draft",
      "edge": "Draft",
      "firefox": "Draft",
      "safari": "16.4+"
    },
    "why": "Hệ điều hành cần biết âm thanh trang web thuộc loại nào để xử lý trộn (mix) hoặc ngắt (duck/pause) với các app khác như Spotify, Apple Music, cuộc gọi.",
    "whenToUse": "Ứng dụng nghe nhạc, podcast cần tiếp tục chạy khi khoá màn hình (playback); game cần tiếng bấm nút không làm tắt nhạc người dùng đang nghe (ambient).",
    "whenNotToUse": "Trang web tĩnh, banner quảng cáo, hoặc ứng dụng không phát âm thanh liên tục.",
    "interfaces": [
      "AudioSession"
    ],
    "props": [
      {
        "name": "navigator.audioSession.type",
        "type": "\"auto\" | \"ambient\" | \"playback\" | \"transient\" | \"transient-solo\"",
        "desc": "Thể loại âm thanh: playback (nghe nhạc nền), ambient (âm thanh game không ngắt nhạc khác), transient (tiếng thông báo ngắn)."
      },
      {
        "name": "navigator.audioSession.state",
        "type": "\"active\" | \"inactive\" | \"interrupted\"",
        "desc": "Trạng thái hoạt động của phiên âm thanh trên hệ điều hành."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "statechange",
        "type": "Event",
        "desc": "Kích hoạt khi hệ thống tạm ngắt hoặc khôi phục âm thanh (ví dụ có cuộc gọi đến)."
      }
    ],
    "realWorldApp": "Web nghe nhạc Spotify/Apple Music giữ phát khi khóa màn hình; game nền web không tắt podcast người dùng đang nghe dở.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: AUDIO SESSION API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeAudioSession() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'audioSession' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Audio Session API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Audio Session API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Thực hiện tương tác với API\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Audio Session API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "background_fetch": {
    "id": "background_fetch",
    "name": "Background Fetch API",
    "category": "Network & Background",
    "group": "B",
    "path": "webapis/background_fetch/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "74+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Tải file dung lượng lớn (video 4K, bản cập nhật game, album nhạc) nếu dùng fetch thường sẽ chết khi người dùng đóng tab hoặc khoá máy.",
    "whenToUse": "App PWA xem video offline, nghe nhạc ngoại tuyến, cần tải ngầm hàng trăm MB và hiển thị tiến trình trên notification bar của hệ điều hành.",
    "whenNotToUse": "Gọi API dữ liệu JSON nhỏ thông thường; tải file dưới 5MB nên dùng fetch() thông thường.",
    "interfaces": [
      "Background Fetch"
    ],
    "props": [
      {
        "name": "BackgroundFetchRegistration",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Background Fetch API."
      },
      {
        "name": "progress event",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Background Fetch API."
      }
    ],
    "methods": [
      {
        "signature": "BackgroundFetchManager.fetch()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Fetch API.",
        "code": "// Sử dụng BackgroundFetchManager.fetch()\nconst result = await BackgroundFetchManager.fetch(/* options */);"
      },
      {
        "signature": "caches.open(taskId)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Fetch API.",
        "code": "// Sử dụng caches.open(taskId)\nconst result = await caches.open(taskId);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Background Fetch API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: BACKGROUND FETCH API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeBackgroundFetch() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'BackgroundFetchManager' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Background Fetch API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Background Fetch API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng BackgroundFetchManager.fetch()\nconst result = await BackgroundFetchManager.fetch(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Background Fetch API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "background_sync": {
    "id": "background_sync",
    "name": "Background Synchronization API",
    "category": "Network & Background",
    "group": "B",
    "path": "webapis/background_sync/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "49+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Đảm bảo dữ liệu chắc chắn gửi lên server khi mất mạng: người dùng nhấn 'Gửi tin nhắn' lúc offline, hệ điều hành tự động gửi ngay khi có mạng trở lại.",
    "whenToUse": "Ứng dụng nhắn tin, ghi chú, gửi email, đặt hàng mà người dùng hay di chuyển qua vùng sóng yếu.",
    "whenNotToUse": "Thao tác cần phản hồi tức thì dạng request-response bắt buộc người dùng chờ ngay lập tức.",
    "interfaces": [
      "Background Synchronization"
    ],
    "props": [],
    "methods": [
      {
        "signature": "SyncManager.register(tag)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Synchronization API.",
        "code": "// Sử dụng SyncManager.register(tag)\nconst result = await SyncManager.register(tag);"
      },
      {
        "signature": "SyncManager.getTags()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Synchronization API.",
        "code": "// Sử dụng SyncManager.getTags()\nconst result = await SyncManager.getTags(/* options */);"
      },
      {
        "signature": "ServiceWorker self.addEventListener('sync')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Synchronization API.",
        "code": "// Sử dụng ServiceWorker self.addEventListener('sync')\nconst result = await ServiceWorker self.addEventListener('sync');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Background Synchronization API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: BACKGROUND SYNCHRONIZATION API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeBackgroundSync() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'SyncManager' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Background Synchronization API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Background Synchronization API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng SyncManager.register(tag)\nconst result = await SyncManager.register(tag);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Background Synchronization API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "background_tasks": {
    "id": "background_tasks",
    "name": "Background Tasks API (requestIdleCallback)",
    "category": "Performance & Tasks",
    "group": "B",
    "path": "webapis/background_tasks/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "47+",
      "edge": "79+",
      "firefox": "55+",
      "safari": "17.4+"
    },
    "why": "Tránh giật lag khung hình (jank): cho phép lập lịch chạy tác vụ nặng chỉ khi CPU trình duyệt rảnh rỗi giữa các chu kỳ vẽ giao diện.",
    "whenToUse": "Gửi dữ liệu thống kê phân tích (analytics), tiền xử lý tìm kiếm, giải thuật indexing dữ liệu nền, dọn dẹp bộ nhớ đệm.",
    "whenNotToUse": "Cập nhật trực tiếp animation trên DOM (phải dùng requestAnimationFrame) hoặc logic nghiệp vụ cần kết quả tức thì.",
    "interfaces": [
      "Background Tasks API (requestIdleCallback)"
    ],
    "props": [
      {
        "name": "IdleDeadline.didTimeout",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Background Tasks API (requestIdleCallback)."
      }
    ],
    "methods": [
      {
        "signature": "window.requestIdleCallback(callback, { timeout })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Tasks API (requestIdleCallback).",
        "code": "// Sử dụng window.requestIdleCallback(callback, { timeout })\nconst result = await window.requestIdleCallback(callback, { timeout });"
      },
      {
        "signature": "window.cancelIdleCallback(id)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Tasks API (requestIdleCallback).",
        "code": "// Sử dụng window.cancelIdleCallback(id)\nconst result = await window.cancelIdleCallback(id);"
      },
      {
        "signature": "IdleDeadline.timeRemaining()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Background Tasks API (requestIdleCallback).",
        "code": "// Sử dụng IdleDeadline.timeRemaining()\nconst result = await IdleDeadline.timeRemaining(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Background Tasks API (requestIdleCallback).",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: BACKGROUND TASKS API (REQUESTIDLECALLBACK)\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeBackgroundTasks() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'requestIdleCallback' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Background Tasks API (requestIdleCallback)] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Background Tasks API (requestIdleCallback)] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng window.requestIdleCallback(callback, { timeout })\nconst result = await window.requestIdleCallback(callback, { timeout });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Background Tasks API (requestIdleCallback)] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "badging": {
    "id": "badging",
    "name": "Badging API",
    "category": "Device & PWA",
    "group": "B",
    "path": "webapis/badging/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "81+",
      "edge": "81+",
      "firefox": "No",
      "safari": "17+"
    },
    "why": "Thông báo tinh tế cho người dùng số tin nhắn chưa đọc hoặc trạng thái tác vụ ngay trên icon ứng dụng ở Taskbar/Dock mà không cần pop-up làm phiền.",
    "whenToUse": "PWA ứng dụng chat, email, mạng xã hội, tiến trình tải file.",
    "whenNotToUse": "Web thông thường chạy trong tab thường (chỉ hiệu quả nhất khi cài đặt dạng PWA).",
    "interfaces": [
      "Badging"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.setAppBadge(count)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Badging API.",
        "code": "// Sử dụng navigator.setAppBadge(count)\nconst result = await navigator.setAppBadge(count);"
      },
      {
        "signature": "navigator.clearAppBadge()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Badging API.",
        "code": "// Sử dụng navigator.clearAppBadge()\nconst result = await navigator.clearAppBadge(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Badging API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: BADGING API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeBadging() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'setAppBadge' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Badging API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Badging API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.setAppBadge(count)\nconst result = await navigator.setAppBadge(count);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Badging API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "barcode_detection": {
    "id": "barcode_detection",
    "name": "Barcode Detection API",
    "category": "Device & Sensors",
    "group": "B",
    "path": "webapis/barcode_detection/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "83+",
      "edge": "83+",
      "firefox": "No",
      "safari": "17+"
    },
    "why": "Tận dụng chip phần cứng (NPU/GPU) của thiết bị để quét mã QR và barcode cực nhanh, không cần nhúng thư viện JS nặng nề (như jsQR hay zxing 500KB).",
    "whenToUse": "Quét mã QR thanh toán, quét mã vạch sản phẩm kho bãi, quét vé điện tử trên camera điện thoại/laptop.",
    "whenNotToUse": "Trình duyệt không hỗ trợ cần fallback sang thư viện WASM/JS.",
    "interfaces": [
      "Barcode Detection"
    ],
    "props": [],
    "methods": [
      {
        "signature": "BarcodeDetector.getSupportedFormats()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Barcode Detection API.",
        "code": "// Sử dụng BarcodeDetector.getSupportedFormats()\nconst result = await BarcodeDetector.getSupportedFormats(/* options */);"
      },
      {
        "signature": "new BarcodeDetector({ formats })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Barcode Detection API.",
        "code": "// Sử dụng new BarcodeDetector({ formats })\nconst result = await new BarcodeDetector({ formats });"
      },
      {
        "signature": "detector.detect(imageSource)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Barcode Detection API.",
        "code": "// Sử dụng detector.detect(imageSource)\nconst result = await detector.detect(imageSource);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Barcode Detection API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: BARCODE DETECTION API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeBarcodeDetection() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'BarcodeDetector' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Barcode Detection API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Barcode Detection API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng BarcodeDetector.getSupportedFormats()\nconst result = await BarcodeDetector.getSupportedFormats(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Barcode Detection API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "beacon": {
    "id": "beacon",
    "name": "Beacon API",
    "category": "Network & Background",
    "group": "B",
    "path": "webapis/beacon/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "39+",
      "edge": "14+",
      "firefox": "31+",
      "safari": "11.1+"
    },
    "why": "Gửi dữ liệu thống kê / log khi người dùng đóng tab: fetch thường hoặc XHR sẽ bị trình duyệt huỷ ngay khi chuyển trang.",
    "whenToUse": "Ghi nhận thời gian on-site, sự kiện click cuối cùng, telemetry khi unload trang.",
    "whenNotToUse": "Cần nhận dữ liệu phản hồi từ server (sendBeacon chỉ bắn đi 1 chiều, không đợi response), hoặc gửi dữ liệu quá 64KB.",
    "interfaces": [
      "Beacon"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.sendBeacon(url, data)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Beacon API.",
        "code": "// Sử dụng navigator.sendBeacon(url, data)\nconst result = await navigator.sendBeacon(url, data);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Beacon API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: BEACON API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeBeacon() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'sendBeacon' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Beacon API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Beacon API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.sendBeacon(url, data)\nconst result = await navigator.sendBeacon(url, data);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Beacon API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "broadcast_channel": {
    "id": "broadcast_channel",
    "name": "Broadcast Channel API",
    "category": "Communication",
    "group": "B",
    "path": "webapis/broadcast_channel/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "54+",
      "edge": "79+",
      "firefox": "38+",
      "safari": "15.4+"
    },
    "why": "Giao tiếp tức thì 1-nhiều giữa các tab/cửa sổ/worker cùng domain mà không cần qua server WebSocket hay hack bằng storage event.",
    "whenToUse": "Người dùng đăng xuất ở 1 tab -> các tab khác tự đăng xuất; cập nhật giỏ hàng giữa nhiều tab đang mở cùng lúc.",
    "whenNotToUse": "Giao tiếp khác domain (cross-origin - phải dùng postMessage) hoặc lưu trữ dữ liệu vĩnh viễn.",
    "interfaces": [
      "Broadcast Channel"
    ],
    "props": [
      {
        "name": "channel.onmessage",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Broadcast Channel API."
      }
    ],
    "methods": [
      {
        "signature": "new BroadcastChannel(channelName)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Broadcast Channel API.",
        "code": "// Sử dụng new BroadcastChannel(channelName)\nconst result = await new BroadcastChannel(channelName);"
      },
      {
        "signature": "channel.postMessage(data)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Broadcast Channel API.",
        "code": "// Sử dụng channel.postMessage(data)\nconst result = await channel.postMessage(data);"
      },
      {
        "signature": "channel.close()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Broadcast Channel API.",
        "code": "// Sử dụng channel.close()\nconst result = await channel.close(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Broadcast Channel API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: BROADCAST CHANNEL API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeBroadcastChannel() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'BroadcastChannel' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Broadcast Channel API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Broadcast Channel API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new BroadcastChannel(channelName)\nconst result = await new BroadcastChannel(channelName);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Broadcast Channel API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "css_custom_highlight": {
    "id": "css_custom_highlight",
    "name": "CSS Custom Highlight API",
    "category": "Styling & DOM",
    "group": "C",
    "path": "webapis/css_custom_highlight/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "105+",
      "edge": "105+",
      "firefox": "117+",
      "safari": "17.2+"
    },
    "why": "Tô màu tìm kiếm / kiểm tra lỗi chính tả trực tiếp qua Range và CSS pseudo ::highlight() mà KHÔNG làm thay đổi cây DOM (không cần chèn thẻ span làm vỡ cấu trúc).",
    "whenToUse": "Trình soạn thảo văn bản, tính năng tìm kiếm Ctrl+F tuỳ biến trong web, code editor, highlight ngữ pháp.",
    "whenNotToUse": "Chỉ đổi style tĩnh của phần tử DOM thông thường.",
    "interfaces": [
      "CSS Custom Highlight"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new Highlight(...ranges)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Custom Highlight API.",
        "code": "// Sử dụng new Highlight(...ranges)\nconst result = await new Highlight(...ranges);"
      },
      {
        "signature": "CSS.highlights.set(name, highlight)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Custom Highlight API.",
        "code": "// Sử dụng CSS.highlights.set(name, highlight)\nconst result = await CSS.highlights.set(name, highlight);"
      },
      {
        "signature": "::highlight(name)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Custom Highlight API.",
        "code": "// Sử dụng ::highlight(name)\nconst result = await ::highlight(name);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của CSS Custom Highlight API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CSS CUSTOM HIGHLIGHT API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeCssCustomHighlight() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'Highlight' in window && 'highlights' in CSS;\n  if (!isSupported) {\n    console.warn(\"⚠️ [CSS Custom Highlight API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [CSS Custom Highlight API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new Highlight(...ranges)\nconst result = await new Highlight(...ranges);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [CSS Custom Highlight API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "css_font_loading": {
    "id": "css_font_loading",
    "name": "CSS Font Loading API",
    "category": "Styling & DOM",
    "group": "C",
    "path": "webapis/css_font_loading/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "35+",
      "edge": "79+",
      "firefox": "41+",
      "safari": "10+"
    },
    "why": "Kiểm soát chính xác thời điểm font chữ tải xong bằng JS, tránh giật layout (FOUT/FOIT) và nạp font động từ ArrayBuffer/URL.",
    "whenToUse": "Canvas cần vẽ chữ với font chuẩn, game nạp font trước khi vào màn chơi, ứng dụng thiết kế đồ hoạ như Canva.",
    "whenNotToUse": "Font chữ hệ thống có sẵn, hoặc web cơ bản đã dùng font-display: swap trong CSS.",
    "interfaces": [
      "CSS Font Loading"
    ],
    "props": [
      {
        "name": "document.fonts.ready",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của CSS Font Loading API."
      }
    ],
    "methods": [
      {
        "signature": "new FontFace(family, source)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Font Loading API.",
        "code": "// Sử dụng new FontFace(family, source)\nconst result = await new FontFace(family, source);"
      },
      {
        "signature": "document.fonts.add(font)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Font Loading API.",
        "code": "// Sử dụng document.fonts.add(font)\nconst result = await document.fonts.add(font);"
      },
      {
        "signature": "document.fonts.load()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Font Loading API.",
        "code": "// Sử dụng document.fonts.load()\nconst result = await document.fonts.load(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của CSS Font Loading API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CSS FONT LOADING API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeCssFontLoading() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'fonts' in document && 'FontFace' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [CSS Font Loading API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [CSS Font Loading API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new FontFace(family, source)\nconst result = await new FontFace(family, source);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [CSS Font Loading API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "css_properties_and_values": {
    "id": "css_properties_and_values",
    "name": "CSS Properties and Values API",
    "category": "Styling & DOM",
    "group": "C",
    "path": "webapis/css_properties_and_values/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "78+",
      "edge": "79+",
      "firefox": "128+",
      "safari": "16.4+"
    },
    "why": "CSS biến mặc định là chuỗi (string) nên không thể tạo animation mượt được (như chuyển màu gradient). API này định nghĩa kiểu cụ thể cho biến CSS.",
    "whenToUse": "Tạo animation chuyển động gradient mượt mà, định kiểu dữ liệu số, góc xoay, màu sắc cho biến CSS để có giá trị fallback an toàn.",
    "whenNotToUse": "Các biến CSS đơn giản chỉ để lưu màu tĩnh không cần animate.",
    "interfaces": [
      "CSS Properties and Values"
    ],
    "props": [
      {
        "name": "@property trong CSS",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của CSS Properties and Values API."
      }
    ],
    "methods": [
      {
        "signature": "CSS.registerProperty({ name, syntax, inherits, initialValue })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Properties and Values API.",
        "code": "// Sử dụng CSS.registerProperty({ name, syntax, inherits, initialValue })\nconst result = await CSS.registerProperty({ name, syntax, inherits, initialValue });"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của CSS Properties and Values API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CSS PROPERTIES AND VALUES API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeCssPropertiesAndValues() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'registerProperty' in CSS;\n  if (!isSupported) {\n    console.warn(\"⚠️ [CSS Properties and Values API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [CSS Properties and Values API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng CSS.registerProperty({ name, syntax, inherits, initialValue })\nconst result = await CSS.registerProperty({ name, syntax, inherits, initialValue });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [CSS Properties and Values API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "css_typed_om": {
    "id": "css_typed_om",
    "name": "CSS Typed Object Model API",
    "category": "Styling & DOM",
    "group": "C",
    "path": "webapis/css_typed_om/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "66+",
      "edge": "79+",
      "firefox": "No",
      "safari": "16.4+"
    },
    "why": "Thay thế việc cộng chuỗi chậm chạp và dễ lỗi (như el.style.opacity = parseFloat(val) + 0.1 + 'px') bằng các object JS có kiểu số học rõ ràng.",
    "whenToUse": "Xử lý hàng nghìn phép biến đổi animation, tính toán kích thước động với hiệu năng gấp 2-5 lần so với thao tác string CSSOM.",
    "whenNotToUse": "Chỉ gán class CSS thông thường hoặc style tĩnh đơn giản.",
    "interfaces": [
      "CSS Typed Object Model"
    ],
    "props": [
      {
        "name": "CSSUnitValue",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của CSS Typed Object Model API."
      }
    ],
    "methods": [
      {
        "signature": "element.computedStyleMap()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Typed Object Model API.",
        "code": "// Sử dụng element.computedStyleMap()\nconst result = await element.computedStyleMap(/* options */);"
      },
      {
        "signature": "element.attributeStyleMap.set()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Typed Object Model API.",
        "code": "// Sử dụng element.attributeStyleMap.set()\nconst result = await element.attributeStyleMap.set(/* options */);"
      },
      {
        "signature": "CSS.px()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Typed Object Model API.",
        "code": "// Sử dụng CSS.px()\nconst result = await CSS.px(/* options */);"
      },
      {
        "signature": "CSS.em()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của CSS Typed Object Model API.",
        "code": "// Sử dụng CSS.em()\nconst result = await CSS.em(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của CSS Typed Object Model API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CSS TYPED OBJECT MODEL API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeCssTypedOm() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'attributeStyleMap' in Element.prototype;\n  if (!isSupported) {\n    console.warn(\"⚠️ [CSS Typed Object Model API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [CSS Typed Object Model API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng element.computedStyleMap()\nconst result = await element.computedStyleMap(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [CSS Typed Object Model API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "channel_messaging": {
    "id": "channel_messaging",
    "name": "Channel Messaging API",
    "category": "Communication",
    "group": "C",
    "path": "webapis/channel_messaging/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Tạo một 'đường ống' liên lạc 2 chiều độc lập (MessagePort) trực tiếp giữa 2 iframe hoặc giữa Web Worker với iframe mà không cần đi qua cửa sổ chính.",
    "whenToUse": "Hệ thống widget nhúng (iframe thanh toán, bot chat) cần trao đổi dữ liệu an toàn, module hoá cao.",
    "whenNotToUse": "Giao tiếp trong cùng một file script đơn giản.",
    "interfaces": [
      "Channel Messaging"
    ],
    "props": [
      {
        "name": "channel.port1",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Channel Messaging API."
      },
      {
        "name": "channel.port2",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Channel Messaging API."
      },
      {
        "name": "port.onmessage",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Channel Messaging API."
      }
    ],
    "methods": [
      {
        "signature": "new MessageChannel()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Channel Messaging API.",
        "code": "// Sử dụng new MessageChannel()\nconst result = await new MessageChannel(/* options */);"
      },
      {
        "signature": "port.postMessage()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Channel Messaging API.",
        "code": "// Sử dụng port.postMessage()\nconst result = await port.postMessage(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Channel Messaging API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CHANNEL MESSAGING API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeChannelMessaging() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'MessageChannel' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Channel Messaging API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Channel Messaging API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new MessageChannel()\nconst result = await new MessageChannel(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Channel Messaging API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "clipboard": {
    "id": "clipboard",
    "name": "Clipboard API",
    "category": "Device & System",
    "group": "C",
    "path": "webapis/clipboard/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "66+",
      "edge": "79+",
      "firefox": "63+",
      "safari": "13.1+"
    },
    "why": "Thay thế phương thức cũ document.execCommand('copy') đã lỗi thời, hỗ trợ đọc và ghi văn bản, HTML và cả ảnh nhị phân (Blob/PNG) bất đồng bộ.",
    "whenToUse": "Nút 'Sao chép mã', dán ảnh chụp màn hình trực tiếp vào khung chat, rich text editor.",
    "whenNotToUse": "Thực thi mà không có tương tác người dùng (bị chặn quyền bảo mật).",
    "interfaces": [
      "Clipboard",
      "ClipboardItem"
    ],
    "props": [
      {
        "name": "navigator.clipboard",
        "type": "Clipboard",
        "desc": "Giao diện hệ thống truy cập khay nhớ tạm clipboard."
      }
    ],
    "methods": [
      {
        "signature": "navigator.clipboard.writeText(text)",
        "returns": "Promise<void>",
        "desc": "Ghi chuỗi văn bản thuần túy vào khay nhớ tạm.",
        "code": "await navigator.clipboard.writeText(\"Mã giảm giá: SAVE20\");"
      },
      {
        "signature": "navigator.clipboard.readText()",
        "returns": "Promise<string>",
        "desc": "Đọc văn bản đang lưu trong khay nhớ tạm hệ thống.",
        "code": "const text = await navigator.clipboard.readText();"
      },
      {
        "signature": "navigator.clipboard.write([ClipboardItem])",
        "returns": "Promise<void>",
        "desc": "Ghi hình ảnh PNG hoặc HTML định dạng phong phú vào clipboard.",
        "code": "await navigator.clipboard.write([new ClipboardItem({ \"image/png\": blob })]);"
      }
    ],
    "events": [],
    "realWorldApp": "Nút \"Copy to clipboard\" trong web quản trị, chụp ảnh màn hình dán trực tiếp vào chat Slack/Zalo.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CLIPBOARD API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeClipboard() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'clipboard' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Clipboard API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Clipboard API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    await navigator.clipboard.writeText(\"Mã giảm giá: SAVE20\");\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Clipboard API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "compression_streams": {
    "id": "compression_streams",
    "name": "Compression Streams API",
    "category": "Data & Streams",
    "group": "C",
    "path": "webapis/compression_streams/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "80+",
      "edge": "80+",
      "firefox": "113+",
      "safari": "16.4+"
    },
    "why": "Nén gzip/deflate dữ liệu trực tiếp trong trình duyệt với chuẩn Web Streams, tiết kiệm 70-90% băng thông tải lên mà không cần thư viện pako/gzip.js.",
    "whenToUse": "Nén log trước khi gửi lên server, lưu trữ offline tệp lớn vào IndexedDB, xuất báo cáo CSV/JSON nén.",
    "whenNotToUse": "Các tệp vốn đã nén như JPEG, PNG, MP4, ZIP (nén lại sẽ không giảm dung lượng).",
    "interfaces": [
      "Compression Streams"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new CompressionStream('gzip'|'deflate')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Compression Streams API.",
        "code": "// Sử dụng new CompressionStream('gzip'|'deflate')\nconst result = await new CompressionStream('gzip'|'deflate');"
      },
      {
        "signature": "new DecompressionStream('gzip'|'deflate')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Compression Streams API.",
        "code": "// Sử dụng new DecompressionStream('gzip'|'deflate')\nconst result = await new DecompressionStream('gzip'|'deflate');"
      },
      {
        "signature": "readableStream.pipeThrough()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Compression Streams API.",
        "code": "// Sử dụng readableStream.pipeThrough()\nconst result = await readableStream.pipeThrough(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Compression Streams API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: COMPRESSION STREAMS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeCompressionStreams() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'CompressionStream' in window && 'DecompressionStream' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Compression Streams API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Compression Streams API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new CompressionStream('gzip'|'deflate')\nconst result = await new CompressionStream('gzip'|'deflate');\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Compression Streams API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "cookie_store": {
    "id": "cookie_store",
    "name": "Cookie Store API",
    "category": "Storage & Security",
    "group": "C",
    "path": "webapis/cookie_store/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "87+",
      "edge": "87+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Thay thế chuỗi document.cookie cổ xưa dễ gây race-condition và làm chậm UI. Cung cấp API Promise bất đồng bộ và dùng được trong cả Service Worker.",
    "whenToUse": "Quản lý cookie trong ứng dụng hiện đại, theo dõi sự thay đổi cookie qua event `change`, truy cập cookie từ Service Worker ngầm.",
    "whenNotToUse": "Dữ liệu lưu trữ lớn (dùng IndexedDB) hoặc các cookie nhạy cảm có cờ `HttpOnly` (JS không được phép đọc).",
    "interfaces": [
      "Cookie Store"
    ],
    "props": [
      {
        "name": "cookieStore.onchange",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Cookie Store API."
      }
    ],
    "methods": [
      {
        "signature": "cookieStore.get(name)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Cookie Store API.",
        "code": "// Sử dụng cookieStore.get(name)\nconst result = await cookieStore.get(name);"
      },
      {
        "signature": "cookieStore.set(options)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Cookie Store API.",
        "code": "// Sử dụng cookieStore.set(options)\nconst result = await cookieStore.set(options);"
      },
      {
        "signature": "cookieStore.delete(name)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Cookie Store API.",
        "code": "// Sử dụng cookieStore.delete(name)\nconst result = await cookieStore.delete(name);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Cookie Store API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: COOKIE STORE API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeCookieStore() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'cookieStore' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Cookie Store API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Cookie Store API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng cookieStore.get(name)\nconst result = await cookieStore.get(name);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Cookie Store API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "compute_pressure": {
    "id": "compute_pressure",
    "name": "Compute Pressure API",
    "category": "Performance & Hardware",
    "group": "C",
    "path": "webapis/compute_pressure/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "125+",
      "edge": "125+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Cho phép web app 'cảm nhận' độ căng thẳng của CPU và phần cứng thiết bị (nhiệt độ, throttling) để chủ động giảm tải tính toán trước khi quạt rú hoặc giật khung hình.",
    "whenToUse": "Gọi video trực tuyến (giảm độ phân giải khi CPU quá tải), game 3D/Canvas (hạ bớt hiệu ứng đổ bóng khi máy nóng), render video thời gian thực.",
    "whenNotToUse": "Trang web đọc báo, thương mại điện tử hoặc ứng dụng ít tính toán logic nặng.",
    "interfaces": [
      "Compute Pressure"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new PressureObserver(callback)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Compute Pressure API.",
        "code": "// Sử dụng new PressureObserver(callback)\nconst result = await new PressureObserver(callback);"
      },
      {
        "signature": "observer.observe('cpu', { sampleInterval })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Compute Pressure API.",
        "code": "// Sử dụng observer.observe('cpu', { sampleInterval })\nconst result = await observer.observe('cpu', { sampleInterval });"
      },
      {
        "signature": "record.state ('nominal'|'fair'|'serious'|'critical')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Compute Pressure API.",
        "code": "// Sử dụng record.state ('nominal'|'fair'|'serious'|'critical')\nconst result = await record.state ('nominal'|'fair'|'serious'|'critical');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Compute Pressure API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: COMPUTE PRESSURE API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeComputePressure() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'PressureObserver' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Compute Pressure API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Compute Pressure API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new PressureObserver(callback)\nconst result = await new PressureObserver(callback);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Compute Pressure API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "console": {
    "id": "console",
    "name": "Console API",
    "category": "Developer Tools",
    "group": "C",
    "path": "webapis/console/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Bộ công cụ chẩn đoán, debug, đo thời gian thực thi thuật toán và hiển thị trực quan dữ liệu phức tạp ngay trong DevTools.",
    "whenToUse": "Debug luồng code, đo benchmark thời gian chạy bằng console.time, in dữ liệu mảng dạng bảng với console.table, đếm số lần gọi hàm với console.count.",
    "whenNotToUse": "Để nguyên các lệnh log debug nhạy cảm hoặc log rác ra môi trường production.",
    "interfaces": [
      "Console"
    ],
    "props": [],
    "methods": [
      {
        "signature": "console.table(data)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Console API.",
        "code": "// Sử dụng console.table(data)\nconst result = await console.table(data);"
      },
      {
        "signature": "console.time(label) / console.timeEnd(label)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Console API.",
        "code": "// Sử dụng console.time(label) / console.timeEnd(label)\nconst result = await console.time(label) / console.timeEnd(label);"
      },
      {
        "signature": "console.count(label)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Console API.",
        "code": "// Sử dụng console.count(label)\nconst result = await console.count(label);"
      },
      {
        "signature": "console.assert(cond, msg)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Console API.",
        "code": "// Sử dụng console.assert(cond, msg)\nconst result = await console.assert(cond, msg);"
      },
      {
        "signature": "console.groupCollapsed()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Console API.",
        "code": "// Sử dụng console.groupCollapsed()\nconst result = await console.groupCollapsed(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Console API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CONSOLE API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeConsole() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'console' in window && 'table' in console;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Console API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Console API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng console.table(data)\nconst result = await console.table(data);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Console API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "credential_management": {
    "id": "credential_management",
    "name": "Credential Management API",
    "category": "Authentication & Security",
    "group": "C",
    "path": "webapis/credential_management/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "51+",
      "edge": "79+",
      "firefox": "60+",
      "safari": "13+"
    },
    "why": "Lưu trữ và đồng bộ an toàn thông tin đăng nhập (mật khẩu, liên kết tài khoản) vào trình quản lý mật khẩu của trình duyệt, hỗ trợ đăng nhập 1 chạm (one-tap) hoặc tự động đăng nhập lại.",
    "whenToUse": "Quy trình đăng ký / đăng nhập của web, hỏi người dùng lưu mật khẩu sau khi login thành công, tự động đăng nhập khi quay lại web.",
    "whenNotToUse": "Các trang web không có tài khoản người dùng hoặc lưu trữ thông tin cấu hình không phải danh tính xác thực.",
    "interfaces": [
      "Credential Management"
    ],
    "props": [
      {
        "name": "PasswordCredential",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Credential Management API."
      },
      {
        "name": "FederatedCredential",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Credential Management API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.credentials.store()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Credential Management API.",
        "code": "// Sử dụng navigator.credentials.store()\nconst result = await navigator.credentials.store(/* options */);"
      },
      {
        "signature": "navigator.credentials.get()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Credential Management API.",
        "code": "// Sử dụng navigator.credentials.get()\nconst result = await navigator.credentials.get(/* options */);"
      },
      {
        "signature": "navigator.credentials.preventSilentAccess()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Credential Management API.",
        "code": "// Sử dụng navigator.credentials.preventSilentAccess()\nconst result = await navigator.credentials.preventSilentAccess(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Credential Management API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CREDENTIAL MANAGEMENT API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeCredentialManagement() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'credentials' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Credential Management API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Credential Management API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.credentials.store()\nconst result = await navigator.credentials.store(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Credential Management API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "device_memory": {
    "id": "device_memory",
    "name": "Device Memory API",
    "category": "Performance & Hardware",
    "group": "D",
    "path": "webapis/device_memory/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "63+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Biết được dung lượng RAM ước lượng của máy người dùng (0.25, 0.5, 1, 2, 4, 8 GB) để tải phiên bản web phù hợp với cấu hình thiết bị.",
    "whenToUse": "Adaptive Loading: máy RAM < 2GB thì tắt hiệu ứng 3D/lottie, giảm kích thước ảnh tải về; máy RAM 8GB thì bật full hiệu ứng và video 4K.",
    "whenNotToUse": "Đo đạc dung lượng bộ nhớ khả dụng theo thời gian thực (giá trị này là cố định và làm tròn để chống vân tay người dùng).",
    "interfaces": [
      "Device Memory"
    ],
    "props": [
      {
        "name": "Client Hint: Device-Memory HTTP Header",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Device Memory API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.deviceMemory (GB làm tròn luỹ thừa 2)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Device Memory API.",
        "code": "// Sử dụng navigator.deviceMemory (GB làm tròn luỹ thừa 2)\nconst result = await navigator.deviceMemory (GB làm tròn luỹ thừa 2);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Device Memory API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: DEVICE MEMORY API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeDeviceMemory() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'deviceMemory' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Device Memory API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Device Memory API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.deviceMemory (GB làm tròn luỹ thừa 2)\nconst result = await navigator.deviceMemory (GB làm tròn luỹ thừa 2);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Device Memory API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "device_orientation": {
    "id": "device_orientation",
    "name": "Device Orientation Events",
    "category": "Sensors & Device",
    "group": "D",
    "path": "webapis/device_orientation/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "7+",
      "edge": "12+",
      "firefox": "6+",
      "safari": "4.2+"
    },
    "why": "Đọc dữ liệu con quay hồi chuyển và la bàn vật lý (alpha, beta, gamma) để xác định tư thế nghiêng và góc xoay 3D của thiết bị trong không gian thực.",
    "whenToUse": "Điều khiển game đua xe/lái máy bay nghiêng máy trên điện thoại, ảnh toàn cảnh 360 độ (panoramas), ứng dụng la bàn chỉ đường.",
    "whenNotToUse": "Thiết bị desktop không có con quay hồi chuyển; chỉ muốn xoay màn hình ngang/dọc (dùng Screen Orientation API).",
    "interfaces": [
      "Device Orientation Events"
    ],
    "props": [],
    "methods": [
      {
        "signature": "window.addEventListener('deviceorientation', e => { e.alpha, e.beta, e.gamma })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Device Orientation Events.",
        "code": "// Sử dụng window.addEventListener('deviceorientation', e => { e.alpha, e.beta, e.gamma })\nconst result = await window.addEventListener('deviceorientation', e => { e.alpha, e.beta, e.gamma });"
      },
      {
        "signature": "DeviceOrientationEvent.requestPermission() (trên iOS Safari)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Device Orientation Events.",
        "code": "// Sử dụng DeviceOrientationEvent.requestPermission() (trên iOS Safari)\nconst result = await DeviceOrientationEvent.requestPermission(/* options */) (trên iOS Safari);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Device Orientation Events.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: DEVICE ORIENTATION EVENTS\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeDeviceOrientation() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'DeviceOrientationEvent' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Device Orientation Events] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Device Orientation Events] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng window.addEventListener('deviceorientation', e => { e.alpha, e.beta, e.gamma })\nconst result = await window.addEventListener('deviceorientation', e => { e.alpha, e.beta, e.gamma });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Device Orientation Events] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "document_picture_in_picture": {
    "id": "document_picture_in_picture",
    "name": "Document Picture-in-Picture API",
    "category": "Media & Windows",
    "group": "D",
    "path": "webapis/document_picture_in_picture/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "116+",
      "edge": "116+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Picture-in-Picture cũ chỉ cho phép thu nhỏ 1 thẻ <video>. API mới này mở một cửa sổ nổi luôn đè lên trên (always-on-top) chứa BẤT KỲ phần tử DOM nào (HTML, chatbox, canvas, nút bấm điều khiển).",
    "whenToUse": "Phòng họp Zoom/Meet nổi có cả video + chat + nút mute khi mở tab khác; trình phát nhạc mini có lời karaoke cuộn động; bộ đếm giờ Pomodoro nổi.",
    "whenNotToUse": "Chỉ muốn phát video đơn thuần mà không cần tương tác DOM (dùng Picture-in-Picture thường nhẹ hơn và tương thích mọi trình duyệt).",
    "interfaces": [
      "Document Picture-in-Picture"
    ],
    "props": [],
    "methods": [
      {
        "signature": "documentPictureInPicture.requestWindow({ width, height })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Document Picture-in-Picture API.",
        "code": "// Sử dụng documentPictureInPicture.requestWindow({ width, height })\nconst result = await documentPictureInPicture.requestWindow({ width, height });"
      },
      {
        "signature": "pipWindow.document.body.append()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Document Picture-in-Picture API.",
        "code": "// Sử dụng pipWindow.document.body.append()\nconst result = await pipWindow.document.body.append(/* options */);"
      },
      {
        "signature": "pipWindow.addEventListener('pagehide')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Document Picture-in-Picture API.",
        "code": "// Sử dụng pipWindow.addEventListener('pagehide')\nconst result = await pipWindow.addEventListener('pagehide');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Document Picture-in-Picture API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: DOCUMENT PICTURE-IN-PICTURE API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeDocumentPictureInPicture() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'documentPictureInPicture' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Document Picture-in-Picture API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Document Picture-in-Picture API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng documentPictureInPicture.requestWindow({ width, height })\nconst result = await documentPictureInPicture.requestWindow({ width, height });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Document Picture-in-Picture API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "encoding": {
    "id": "encoding",
    "name": "Encoding API",
    "category": "Data & Streams",
    "group": "E",
    "path": "webapis/encoding/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "38+",
      "edge": "79+",
      "firefox": "19+",
      "safari": "10.1+"
    },
    "why": "Chuyển đổi 2 chiều giữa chuỗi văn bản Javascript (UTF-16) và mảng byte nhị phân (Uint8Array) chuẩn hoá siêu nhanh theo các bảng mã UTF-8, Windows-1258, v.v.",
    "whenToUse": "Xử lý dữ liệu nhị phân WebSocket, nén/giải nén Web Streams, mã hoá dữ liệu với Web Crypto, phân tích định dạng file nhị phân.",
    "whenNotToUse": "Thao tác nối chuỗi thông thường trong Javascript.",
    "interfaces": [
      "Encoding"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new TextEncoder().encode(str)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Encoding API.",
        "code": "// Sử dụng new TextEncoder().encode(str)\nconst result = await new TextEncoder(/* options */).encode(str);"
      },
      {
        "signature": "new TextEncoder().encodeInto(str, uint8Array)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Encoding API.",
        "code": "// Sử dụng new TextEncoder().encodeInto(str, uint8Array)\nconst result = await new TextEncoder(/* options */).encodeInto(str, uint8Array);"
      },
      {
        "signature": "new TextDecoder(encoding).decode(buffer)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Encoding API.",
        "code": "// Sử dụng new TextDecoder(encoding).decode(buffer)\nconst result = await new TextDecoder(encoding).decode(buffer);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Encoding API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: ENCODING API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeEncoding() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'TextEncoder' in window && 'TextDecoder' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Encoding API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Encoding API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new TextEncoder().encode(str)\nconst result = await new TextEncoder(/* options */).encode(str);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Encoding API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "eyedropper": {
    "id": "eyedropper",
    "name": "EyeDropper API",
    "category": "Device & System",
    "group": "E",
    "path": "webapis/eyedropper/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "95+",
      "edge": "95+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Cho phép người dùng chấm lấy mã màu chính xác của bất kỳ điểm ảnh nào hiển thị trên toàn bộ màn hình máy tính (kể cả ngoài phạm vi trình duyệt).",
    "whenToUse": "Ứng dụng thiết kế đồ hoạ web (Figma, Canva, Photoshop web), công cụ chọn màu theme, bảng vẽ palette.",
    "whenNotToUse": "Không thể tự động chấm màu ngầm không có người dùng thao tác click (bảo mật màn hình).",
    "interfaces": [
      "EyeDropper"
    ],
    "props": [
      {
        "name": "result.sRGBHex",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của EyeDropper API."
      }
    ],
    "methods": [
      {
        "signature": "new EyeDropper().open({ signal })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của EyeDropper API.",
        "code": "// Sử dụng new EyeDropper().open({ signal })\nconst result = await new EyeDropper(/* options */).open({ signal });"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của EyeDropper API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: EYEDROPPER API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeEyedropper() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'EyeDropper' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [EyeDropper API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [EyeDropper API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new EyeDropper().open({ signal })\nconst result = await new EyeDropper(/* options */).open({ signal });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [EyeDropper API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "fetch": {
    "id": "fetch",
    "name": "Fetch API",
    "category": "Network & HTTP",
    "group": "F",
    "path": "webapis/fetch/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "42+",
      "edge": "14+",
      "firefox": "39+",
      "safari": "10.1+"
    },
    "why": "Chuẩn giao tiếp mạng HTTP hiện đại thay thế hoàn toàn XMLHttpRequest cổ xưa. Dựa trên Promise bất đồng bộ, tích hợp luồng ReadableStream, kiểm soát timeout/huỷ bỏ bằng AbortController và hỗ trợ CORS.",
    "whenToUse": "Gọi API RESTful, GraphQL, tải dữ liệu JSON, upload/download tệp tin, giao tiếp dữ liệu giữa client và backend.",
    "whenNotToUse": "Tải file ngầm dung lượng lớn sau khi đóng tab (dùng Background Fetch); gửi log phân tích lúc đóng tab (dùng Beacon API).",
    "interfaces": [
      "Request",
      "Response",
      "Headers",
      "AbortController",
      "AbortSignal"
    ],
    "props": [
      {
        "name": "Response.status",
        "type": "number",
        "desc": "Mã trạng thái HTTP trả về từ server (200, 404, 500)."
      },
      {
        "name": "Response.ok",
        "type": "boolean",
        "desc": "True nếu mã HTTP nằm trong khoảng thành công 200-299."
      },
      {
        "name": "Response.headers",
        "type": "Headers",
        "desc": "Đối tượng chứa các header HTTP nhận về."
      },
      {
        "name": "AbortSignal.aborted",
        "type": "boolean",
        "desc": "True nếu request đã bị gửi lệnh hủy."
      },
      {
        "name": "AbortSignal.reason",
        "type": "any",
        "desc": "Lý do gửi lệnh hủy (DOMException hoặc giá trị tùy chọn)."
      }
    ],
    "methods": [
      {
        "signature": "fetch(input, init?)",
        "returns": "Promise<Response>",
        "desc": "Khởi tạo yêu cầu mạng HTTP bất đồng bộ.",
        "code": "const res = await fetch(\"/api/data\", { signal: controller.signal });"
      },
      {
        "signature": "Response.json()",
        "returns": "Promise<any>",
        "desc": "Giải mã dữ liệu phản hồi dạng chuỗi JSON thành JavaScript Object.",
        "code": "const data = await res.json();"
      },
      {
        "signature": "Response.blob()",
        "returns": "Promise<Blob>",
        "desc": "Đọc dữ liệu thô nhị phân (hình ảnh, file zip, audio).",
        "code": "const blob = await res.blob();"
      },
      {
        "signature": "AbortController.abort(reason?)",
        "returns": "void",
        "desc": "Phát tín hiệu hủy bỏ tác vụ gọi mạng đang chờ phản hồi.",
        "code": "controller.abort(\"Timeout quá 5 giây\");"
      }
    ],
    "events": [
      {
        "name": "abort",
        "type": "Event",
        "desc": "Kích hoạt trên AbortSignal khi có lệnh hủy bỏ."
      }
    ],
    "realWorldApp": "Mọi ứng dụng web hiện đại gọi API backend RESTful / GraphQL, tải ảnh, gửi dữ liệu form.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: FETCH API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeFetch() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'fetch' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Fetch API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Fetch API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    const res = await fetch(\"/api/data\", { signal: controller.signal });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Fetch API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "file": {
    "id": "file",
    "name": "File API",
    "category": "Files & Storage",
    "group": "F",
    "path": "webapis/file/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Xử lý tệp do người dùng chọn qua <input type='file'> hoặc kéo thả (drag & drop), đọc nội dung dạng Text, Base64 DataURL hoặc ArrayBuffer mà không cần gửi lên server.",
    "whenToUse": "Xem trước ảnh ngay khi chọn (preview avatar), đọc nội dung file CSV/JSON phân tích trực tiếp trên client, cắt lát file dung lượng lớn (file.slice) để chunk upload.",
    "whenNotToUse": "Tự do đọc file trên ổ cứng mà không có tương tác người dùng (bảo vệ quyền riêng tư).",
    "interfaces": [
      "File"
    ],
    "props": [
      {
        "name": "File.size / File.type",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của File API."
      }
    ],
    "methods": [
      {
        "signature": "FileReader.readAsText()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của File API.",
        "code": "// Sử dụng FileReader.readAsText()\nconst result = await FileReader.readAsText(/* options */);"
      },
      {
        "signature": "FileReader.readAsDataURL()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của File API.",
        "code": "// Sử dụng FileReader.readAsDataURL()\nconst result = await FileReader.readAsDataURL(/* options */);"
      },
      {
        "signature": "FileReader.readAsArrayBuffer()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của File API.",
        "code": "// Sử dụng FileReader.readAsArrayBuffer()\nconst result = await FileReader.readAsArrayBuffer(/* options */);"
      },
      {
        "signature": "File.slice(start, end)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của File API.",
        "code": "// Sử dụng File.slice(start, end)\nconst result = await File.slice(start, end);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của File API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: FILE API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeFile() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'FileReader' in window && 'File' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [File API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [File API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng FileReader.readAsText()\nconst result = await FileReader.readAsText(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [File API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "file_system": {
    "id": "file_system",
    "name": "File System API (Access)",
    "category": "Files & Storage",
    "group": "F",
    "path": "webapis/file_system/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "86+",
      "edge": "86+",
      "firefox": "No",
      "safari": "15.2+"
    },
    "why": "Đọc và GHI trực tiếp vào file thật trên ổ đĩa máy tính người dùng mà không cần bấm 'Tải về' nhiều lần như web truyền thống (biến web thành phần mềm desktop thực thụ).",
    "whenToUse": "Trình chỉnh sửa code (VS Code web), phần mềm biên tập ảnh/video (CapCut web, Photoshop), lưu dự án trực tiếp vào thư mục máy tính.",
    "whenNotToUse": "Trang web đơn giản chỉ cần tải file pdf xuống 1 lần; trình duyệt Safari/Firefox cần fallback sang thẻ input file.",
    "interfaces": [
      "FileSystemFileHandle",
      "FileSystemDirectoryHandle",
      "FileSystemWritableFileStream"
    ],
    "props": [
      {
        "name": "FileSystemHandle.name",
        "type": "string",
        "desc": "Tên tệp tin hoặc thư mục (ví dụ: \"document.txt\")."
      },
      {
        "name": "FileSystemHandle.kind",
        "type": "\"file\" | \"directory\"",
        "desc": "Phân loại handle tệp tin hay thư mục."
      }
    ],
    "methods": [
      {
        "signature": "window.showOpenFilePicker(options?)",
        "returns": "Promise<FileSystemFileHandle[]>",
        "desc": "Mở hộp thoại hệ điều hành để người dùng chọn một hoặc nhiều file thực tế.",
        "code": "const [fileHandle] = await window.showOpenFilePicker();"
      },
      {
        "signature": "window.showSaveFilePicker(options?)",
        "returns": "Promise<FileSystemFileHandle>",
        "desc": "Mở hộp thoại lưu file tạo mới hoặc ghi đè trên máy tính.",
        "code": "const handle = await window.showSaveFilePicker({ suggestedName: \"code.js\" });"
      },
      {
        "signature": "window.showDirectoryPicker(options?)",
        "returns": "Promise<FileSystemDirectoryHandle>",
        "desc": "Mở hộp thoại cấp quyền duyệt toàn bộ một thư mục trên ổ đĩa.",
        "code": "const dirHandle = await window.showDirectoryPicker();"
      },
      {
        "signature": "FileSystemFileHandle.createWritable()",
        "returns": "Promise<FileSystemWritableFileStream>",
        "desc": "Tạo luồng ghi dữ liệu trực tiếp vào tệp tin mà không cần tải lại.",
        "code": "const writable = await handle.createWritable(); await writable.write(data); await writable.close();"
      }
    ],
    "events": [],
    "realWorldApp": "Trình soạn thảo mã VS Code for Web, chỉnh sửa ảnh Photoshop Web lưu trực tiếp file PSD lên ổ cứng máy tính.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: FILE SYSTEM API (ACCESS)\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeFileSystem() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'showOpenFilePicker' in window || 'showSaveFilePicker' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [File System API (Access)] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [File System API (Access)] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    const [fileHandle] = await window.showOpenFilePicker();\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [File System API (Access)] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "fullscreen": {
    "id": "fullscreen",
    "name": "Fullscreen API",
    "category": "Display & User Interface",
    "group": "F",
    "path": "webapis/fullscreen/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "71+",
      "edge": "71+",
      "firefox": "64+",
      "safari": "16.4+"
    },
    "why": "Mở rộng giao diện web hoặc một phần tử DOM cụ thể (video, canvas, slide trình chiếu) tràn toàn bộ màn hình thực tế của người dùng, ẩn thanh taskbar và viền trình duyệt.",
    "whenToUse": "Trình chiếu slide, chế độ rạp chiếu phim xem video, trò chơi web (HTML5 games), ứng dụng bản đồ tương tác.",
    "whenNotToUse": "Tự động kích hoạt khi mới vào trang mà không có thao tác click/phím của người dùng (bị trình duyệt chặn bảo mật).",
    "interfaces": [
      "Fullscreen"
    ],
    "props": [
      {
        "name": "document.fullscreenElement",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Fullscreen API."
      },
      {
        "name": "document.fullscreenEnabled",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Fullscreen API."
      },
      {
        "name": "fullscreenchange event",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Fullscreen API."
      },
      {
        "name": "::backdrop trong CSS",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Fullscreen API."
      }
    ],
    "methods": [
      {
        "signature": "element.requestFullscreen()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Fullscreen API.",
        "code": "// Sử dụng element.requestFullscreen()\nconst result = await element.requestFullscreen(/* options */);"
      },
      {
        "signature": "document.exitFullscreen()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Fullscreen API.",
        "code": "// Sử dụng document.exitFullscreen()\nconst result = await document.exitFullscreen(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Fullscreen API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: FULLSCREEN API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeFullscreen() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'requestFullscreen' in Element.prototype || 'webkitRequestFullscreen' in Element.prototype;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Fullscreen API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Fullscreen API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng element.requestFullscreen()\nconst result = await element.requestFullscreen(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Fullscreen API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "gamepad": {
    "id": "gamepad",
    "name": "Gamepad API",
    "category": "Device & Gaming",
    "group": "G",
    "path": "webapis/gamepad/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "21+",
      "edge": "12+",
      "firefox": "29+",
      "safari": "10.1+"
    },
    "why": "Kết nối và đọc dữ liệu điều khiển từ tay cầm chơi game USB/Bluetooth (PlayStation DualSense, Xbox Controller, Nintendo Switch Pro) với độ trễ siêu thấp.",
    "whenToUse": "Trò chơi Web HTML5/Canvas/WebGL, trình giả lập (emulators), điều khiển robot hoặc camera từ xa qua web.",
    "whenNotToUse": "Ứng dụng văn phòng, form nhập liệu bình thường không dùng tay cầm.",
    "interfaces": [
      "Gamepad"
    ],
    "props": [
      {
        "name": "gamepad.buttons[i].pressed / value",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Gamepad API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.getGamepads()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Gamepad API.",
        "code": "// Sử dụng navigator.getGamepads()\nconst result = await navigator.getGamepads(/* options */);"
      },
      {
        "signature": "window.addEventListener('gamepadconnected')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Gamepad API.",
        "code": "// Sử dụng window.addEventListener('gamepadconnected')\nconst result = await window.addEventListener('gamepadconnected');"
      },
      {
        "signature": "gamepad.axes (cần gạt analog)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Gamepad API.",
        "code": "// Sử dụng gamepad.axes (cần gạt analog)\nconst result = await gamepad.axes (cần gạt analog);"
      },
      {
        "signature": "gamepad.vibrationActuator.playEffect()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Gamepad API.",
        "code": "// Sử dụng gamepad.vibrationActuator.playEffect()\nconst result = await gamepad.vibrationActuator.playEffect(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Gamepad API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: GAMEPAD API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeGamepad() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'getGamepads' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Gamepad API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Gamepad API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.getGamepads()\nconst result = await navigator.getGamepads(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Gamepad API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "geolocation": {
    "id": "geolocation",
    "name": "Geolocation API",
    "category": "Sensors & Location",
    "group": "G",
    "path": "webapis/geolocation/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "5+",
      "edge": "12+",
      "firefox": "3.5+",
      "safari": "5+"
    },
    "why": "Xác định toạ độ địa lý thực tế (vĩ độ, kinh độ, độ cao, tốc độ di chuyển) của thiết bị thông qua GPS, Wi-Fi và trạm phát sóng di động.",
    "whenToUse": "Ứng dụng giao hàng, bản đồ tìm đường (Google Maps/OSM), định vị chi nhánh cửa hàng gần nhất, tracking quãng đường chạy bộ.",
    "whenNotToUse": "Tự động hỏi quyền vị trí ngay khi vừa mở trang (gây khó chịu cho người dùng, hãy hỏi khi người dùng bấm 'Tìm vị trí của tôi').",
    "interfaces": [
      "Geolocation"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.geolocation.getCurrentPosition()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Geolocation API.",
        "code": "// Sử dụng navigator.geolocation.getCurrentPosition()\nconst result = await navigator.geolocation.getCurrentPosition(/* options */);"
      },
      {
        "signature": "navigator.geolocation.watchPosition()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Geolocation API.",
        "code": "// Sử dụng navigator.geolocation.watchPosition()\nconst result = await navigator.geolocation.watchPosition(/* options */);"
      },
      {
        "signature": "navigator.geolocation.clearWatch()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Geolocation API.",
        "code": "// Sử dụng navigator.geolocation.clearWatch()\nconst result = await navigator.geolocation.clearWatch(/* options */);"
      },
      {
        "signature": "GeolocationCoordinates (latitude, longitude, accuracy)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Geolocation API.",
        "code": "// Sử dụng GeolocationCoordinates (latitude, longitude, accuracy)\nconst result = await GeolocationCoordinates (latitude, longitude, accuracy);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Geolocation API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: GEOLOCATION API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeGeolocation() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'geolocation' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Geolocation API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Geolocation API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.geolocation.getCurrentPosition()\nconst result = await navigator.geolocation.getCurrentPosition(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Geolocation API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "history": {
    "id": "history",
    "name": "History API",
    "category": "Navigation & History",
    "group": "H",
    "path": "webapis/history/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Nền tảng kiến tạo Single Page Application (SPA): thay đổi URL trên thanh địa chỉ và lưu trữ state trong lịch sử duyệt web mà không làm tải lại toàn bộ trang.",
    "whenToUse": "Bộ định tuyến Router SPA (React Router, Vue Router, Vanilla SPA Router), mở modal popup có thể bấm Back trên trình duyệt để đóng.",
    "whenNotToUse": "Chuyển hướng hoàn toàn sang website ngoài domain khác.",
    "interfaces": [
      "History"
    ],
    "props": [],
    "methods": [
      {
        "signature": "history.pushState(state, unused, url)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của History API.",
        "code": "// Sử dụng history.pushState(state, unused, url)\nconst result = await history.pushState(state, unused, url);"
      },
      {
        "signature": "history.replaceState(state, unused, url)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của History API.",
        "code": "// Sử dụng history.replaceState(state, unused, url)\nconst result = await history.replaceState(state, unused, url);"
      },
      {
        "signature": "history.back() / history.forward()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của History API.",
        "code": "// Sử dụng history.back() / history.forward()\nconst result = await history.back(/* options */) / history.forward();"
      },
      {
        "signature": "window.addEventListener('popstate')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của History API.",
        "code": "// Sử dụng window.addEventListener('popstate')\nconst result = await window.addEventListener('popstate');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của History API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: HISTORY API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeHistory() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'history' in window && 'pushState' in history;\n  if (!isSupported) {\n    console.warn(\"⚠️ [History API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [History API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng history.pushState(state, unused, url)\nconst result = await history.pushState(state, unused, url);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [History API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "idle_detection": {
    "id": "idle_detection",
    "name": "Idle Detection API",
    "category": "Device & System",
    "group": "I",
    "path": "webapis/idle_detection/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "94+",
      "edge": "94+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Nhận biết khi nào người dùng không chạm vào bàn phím/chuột hoặc màn hình bị khoá để tự động chuyển trạng thái Away/Offline hoặc tạm dừng tác vụ tốn tài nguyên.",
    "whenToUse": "Ứng dụng chat (Slack, Teams, Discord) tự đổi trạng thái sang 'Vắng mặt', phần mềm thi trực tuyến chống gian lận, tự động logout phiên làm việc ngân hàng.",
    "whenNotToUse": "Chỉ phát hiện tab đang xem hay ẩn (dùng Page Visibility API nhẹ và hỗ trợ toàn diện hơn).",
    "interfaces": [
      "Idle Detection"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new IdleDetector()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Idle Detection API.",
        "code": "// Sử dụng new IdleDetector()\nconst result = await new IdleDetector(/* options */);"
      },
      {
        "signature": "IdleDetector.requestPermission()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Idle Detection API.",
        "code": "// Sử dụng IdleDetector.requestPermission()\nconst result = await IdleDetector.requestPermission(/* options */);"
      },
      {
        "signature": "detector.start({ threshold })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Idle Detection API.",
        "code": "// Sử dụng detector.start({ threshold })\nconst result = await detector.start({ threshold });"
      },
      {
        "signature": "detector.userState ('active'|'idle')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Idle Detection API.",
        "code": "// Sử dụng detector.userState ('active'|'idle')\nconst result = await detector.userState ('active'|'idle');"
      },
      {
        "signature": "detector.screenState ('unlocked'|'locked')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Idle Detection API.",
        "code": "// Sử dụng detector.screenState ('unlocked'|'locked')\nconst result = await detector.screenState ('unlocked'|'locked');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Idle Detection API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: IDLE DETECTION API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeIdleDetection() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'IdleDetector' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Idle Detection API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Idle Detection API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new IdleDetector()\nconst result = await new IdleDetector(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Idle Detection API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "indexeddb": {
    "id": "indexeddb",
    "name": "IndexedDB API",
    "category": "Storage & Databases",
    "group": "I",
    "path": "webapis/indexeddb/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "23+",
      "edge": "12+",
      "firefox": "16+",
      "safari": "8+"
    },
    "why": "Cơ sở dữ liệu NoSQL lưu trữ hướng đối tượng (Object Store) dung lượng khổng lồ (hàng trăm Gigabytes) ngay trong trình duyệt, hỗ trợ giao dịch (transaction) và chỉ mục (index) tìm kiếm siêu tốc.",
    "whenToUse": "Lưu trữ dữ liệu offline cho PWA (danh sách tin nhắn, bài viết, giỏ hàng, tệp ảnh Blob/ArrayBuffer lớn), đồng bộ dữ liệu ngoại tuyến.",
    "whenNotToUse": "Lưu trữ vài chuỗi cấu hình nhỏ đơn giản (dùng localStorage tiện hơn nhiều).",
    "interfaces": [
      "IndexedDB"
    ],
    "props": [],
    "methods": [
      {
        "signature": "indexedDB.open(name, version)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của IndexedDB API.",
        "code": "// Sử dụng indexedDB.open(name, version)\nconst result = await indexedDB.open(name, version);"
      },
      {
        "signature": "db.createObjectStore()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của IndexedDB API.",
        "code": "// Sử dụng db.createObjectStore()\nconst result = await db.createObjectStore(/* options */);"
      },
      {
        "signature": "transaction(['store'], 'readwrite')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của IndexedDB API.",
        "code": "// Sử dụng transaction(['store'], 'readwrite')\nconst result = await transaction(['store'], 'readwrite');"
      },
      {
        "signature": "store.add() / store.get() / store.put()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của IndexedDB API.",
        "code": "// Sử dụng store.add() / store.get() / store.put()\nconst result = await store.add(/* options */) / store.get() / store.put();"
      },
      {
        "signature": "store.createIndex()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của IndexedDB API.",
        "code": "// Sử dụng store.createIndex()\nconst result = await store.createIndex(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của IndexedDB API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: INDEXEDDB API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeIndexeddb() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'indexedDB' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [IndexedDB API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [IndexedDB API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng indexedDB.open(name, version)\nconst result = await indexedDB.open(name, version);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [IndexedDB API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "intersection_observer": {
    "id": "intersection_observer",
    "name": "Intersection Observer API",
    "category": "Performance & DOM",
    "group": "I",
    "path": "webapis/intersection_observer/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "51+",
      "edge": "15+",
      "firefox": "55+",
      "safari": "12.1+"
    },
    "why": "Phát hiện khi nào một phần tử xuất hiện trong tầm nhìn người dùng (viewport) với hiệu năng cực cao mà KHÔNG cần lắng nghe sự kiện scroll gây tụt FPS.",
    "whenToUse": "Lazy-loading hình ảnh/video khi cuộn tới nơi, cuộn vô tận (infinite scroll phân trang), kích hoạt hiệu ứng animation khi lướt tới card, ghi nhận impression quảng cáo.",
    "whenNotToUse": "Theo dõi thay đổi kích thước của phần tử (dùng ResizeObserver).",
    "interfaces": [
      "Intersection Observer"
    ],
    "props": [
      {
        "name": "entry.isIntersecting",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Intersection Observer API."
      },
      {
        "name": "entry.intersectionRatio",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Intersection Observer API."
      }
    ],
    "methods": [
      {
        "signature": "new IntersectionObserver(callback, { root, rootMargin, threshold })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Intersection Observer API.",
        "code": "// Sử dụng new IntersectionObserver(callback, { root, rootMargin, threshold })\nconst result = await new IntersectionObserver(callback, { root, rootMargin, threshold });"
      },
      {
        "signature": "observer.observe(target)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Intersection Observer API.",
        "code": "// Sử dụng observer.observe(target)\nconst result = await observer.observe(target);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Intersection Observer API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: INTERSECTION OBSERVER API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeIntersectionObserver() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'IntersectionObserver' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Intersection Observer API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Intersection Observer API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new IntersectionObserver(callback, { root, rootMargin, threshold })\nconst result = await new IntersectionObserver(callback, { root, rootMargin, threshold });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Intersection Observer API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "navigation": {
    "id": "navigation",
    "name": "Navigation API",
    "category": "Navigation & History",
    "group": "N",
    "path": "webapis/navigation/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "102+",
      "edge": "102+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Sự thay thế thế hệ mới cho History API cũ kỹ: xử lý tập trung mọi chuyển hướng (click link, form submit, back/forward) trong một event listener `navigate` duy nhất mà không cần intercept thủ công thẻ <a>.",
    "whenToUse": "Kiến trúc SPA hiện đại, kiểm soát chuyển trang mượt mà có hiệu ứng loading bar, xử lý scroll restoration chuẩn xác.",
    "whenNotToUse": "Trình duyệt Safari và Firefox chưa hỗ trợ (cần polyfill hoặc dùng History API làm fallback).",
    "interfaces": [
      "Navigation"
    ],
    "props": [
      {
        "name": "navigation.currentEntry",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Navigation API."
      }
    ],
    "methods": [
      {
        "signature": "navigation.navigate(url, { state, info })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Navigation API.",
        "code": "// Sử dụng navigation.navigate(url, { state, info })\nconst result = await navigation.navigate(url, { state, info });"
      },
      {
        "signature": "navigation.addEventListener('navigate', e => e.intercept({ handler }))",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Navigation API.",
        "code": "// Sử dụng navigation.addEventListener('navigate', e => e.intercept({ handler }))\nconst result = await navigation.addEventListener('navigate', e => e.intercept({ handler }));"
      },
      {
        "signature": "navigation.entries()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Navigation API.",
        "code": "// Sử dụng navigation.entries()\nconst result = await navigation.entries(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Navigation API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: NAVIGATION API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeNavigation() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'navigation' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Navigation API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Navigation API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigation.navigate(url, { state, info })\nconst result = await navigation.navigate(url, { state, info });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Navigation API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "network_information": {
    "id": "network_information",
    "name": "Network Information API",
    "category": "Sensors & Network",
    "group": "N",
    "path": "webapis/network_information/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "61+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Cung cấp thông tin loại mạng (4G, 3G, 2G, slow-2g), băng thông ước tính (downlink Mbps), độ trễ ping (rtt) và cờ tiết kiệm dữ liệu (saveData).",
    "whenToUse": "Tự động hạ chất lượng video từ HD sang 360p khi người dùng dùng mạng 3G yếu; tắt tự động phát video khi người dùng bật 'Data Saver'.",
    "whenNotToUse": "Thay thế bài kiểm tra Speedtest chuyên dụng đo lường chính xác tuyệt đối.",
    "interfaces": [
      "Network Information"
    ],
    "props": [
      {
        "name": "navigator.connection.effectiveType",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Network Information API."
      },
      {
        "name": "navigator.connection.downlink",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Network Information API."
      },
      {
        "name": "navigator.connection.rtt",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Network Information API."
      },
      {
        "name": "navigator.connection.saveData",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Network Information API."
      },
      {
        "name": "navigator.connection.onchange",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Network Information API."
      }
    ],
    "methods": [],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Network Information API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: NETWORK INFORMATION API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeNetworkInformation() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'connection' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Network Information API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Network Information API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Thực hiện tương tác với API\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Network Information API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "notifications": {
    "id": "notifications",
    "name": "Notifications API",
    "category": "Device & System",
    "group": "N",
    "path": "webapis/notifications/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "22+",
      "edge": "14+",
      "firefox": "22+",
      "safari": "16+"
    },
    "why": "Hiển thị thông báo đẩy lên màn hình hệ điều hành (Windows Action Center, macOS Notification Center, Android Tray) kể cả khi trình duyệt đang thu nhỏ.",
    "whenToUse": "Thông báo tin nhắn mới, lịch hẹn sắp tới, đơn hàng được giao, nhắc nhở định kỳ kết hợp Service Worker Push Notification.",
    "whenNotToUse": "Spam quảng cáo ngay khi vừa vào trang (người dùng sẽ bấm Chặn và mất quyền mãi mãi).",
    "interfaces": [
      "Notifications"
    ],
    "props": [
      {
        "name": "notification.onclick",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Notifications API."
      }
    ],
    "methods": [
      {
        "signature": "Notification.requestPermission()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Notifications API.",
        "code": "// Sử dụng Notification.requestPermission()\nconst result = await Notification.requestPermission(/* options */);"
      },
      {
        "signature": "Notification.permission ('default'|'granted'|'denied')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Notifications API.",
        "code": "// Sử dụng Notification.permission ('default'|'granted'|'denied')\nconst result = await Notification.permission ('default'|'granted'|'denied');"
      },
      {
        "signature": "new Notification(title, { body, icon, badge, tag, data })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Notifications API.",
        "code": "// Sử dụng new Notification(title, { body, icon, badge, tag, data })\nconst result = await new Notification(title, { body, icon, badge, tag, data });"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Notifications API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: NOTIFICATIONS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeNotifications() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'Notification' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Notifications API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Notifications API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng Notification.requestPermission()\nconst result = await Notification.requestPermission(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Notifications API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "page_visibility": {
    "id": "page_visibility",
    "name": "Page Visibility API",
    "category": "Performance & Lifecycle",
    "group": "P",
    "path": "webapis/page_visibility/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "33+",
      "edge": "12+",
      "firefox": "18+",
      "safari": "7+"
    },
    "why": "Biết được khi nào người dùng đang xem trang hay đã chuyển sang tab khác/thu nhỏ trình duyệt để tạm dừng video, ngắt kết nối WebSocket không cần thiết và tiết kiệm CPU/pin.",
    "whenToUse": "Tạm dừng video/nhạc/game loop khi người dùng chuyển tab; hoãn polling dữ liệu khi tab bị ẩn.",
    "whenNotToUse": "Xử lý việc đóng hẳn tab (khi đóng hẳn tab nên dùng sự kiện pagehide hoặc Beacon API).",
    "interfaces": [
      "Page Visibility"
    ],
    "props": [
      {
        "name": "document.hidden",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Page Visibility API."
      }
    ],
    "methods": [
      {
        "signature": "document.visibilityState ('visible'|'hidden')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Page Visibility API.",
        "code": "// Sử dụng document.visibilityState ('visible'|'hidden')\nconst result = await document.visibilityState ('visible'|'hidden');"
      },
      {
        "signature": "document.addEventListener('visibilitychange')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Page Visibility API.",
        "code": "// Sử dụng document.addEventListener('visibilitychange')\nconst result = await document.addEventListener('visibilitychange');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Page Visibility API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: PAGE VISIBILITY API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializePageVisibility() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'visibilityState' in document;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Page Visibility API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Page Visibility API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng document.visibilityState ('visible'|'hidden')\nconst result = await document.visibilityState ('visible'|'hidden');\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Page Visibility API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "permissions": {
    "id": "permissions",
    "name": "Permissions API",
    "category": "Security & System",
    "group": "P",
    "path": "webapis/permissions/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "43+",
      "edge": "79+",
      "firefox": "46+",
      "safari": "16+"
    },
    "why": "Truy vấn trạng thái cấp quyền (granted, denied, prompt) của các tính năng nhạy cảm (Camera, Mic, Vị trí, Thông báo) trước khi gọi hàm để tránh hiện pop-up bất ngờ gây khó chịu.",
    "whenToUse": "Kiểm tra quyền trước khi bật camera/microphone phòng họp; theo dõi sự thay đổi quyền qua event onchange.",
    "whenNotToUse": "Trực tiếp xin cấp quyền (Permissions API chỉ để truy vấn trạng thái, việc xin quyền do từng API cụ thể đảm nhiệm).",
    "interfaces": [
      "Permissions"
    ],
    "props": [
      {
        "name": "PermissionStatus.onchange",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Permissions API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.permissions.query({ name })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Permissions API.",
        "code": "// Sử dụng navigator.permissions.query({ name })\nconst result = await navigator.permissions.query({ name });"
      },
      {
        "signature": "PermissionStatus.state ('granted'|'denied'|'prompt')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Permissions API.",
        "code": "// Sử dụng PermissionStatus.state ('granted'|'denied'|'prompt')\nconst result = await PermissionStatus.state ('granted'|'denied'|'prompt');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Permissions API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: PERMISSIONS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializePermissions() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'permissions' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Permissions API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Permissions API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.permissions.query({ name })\nconst result = await navigator.permissions.query({ name });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Permissions API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "picture_in_picture": {
    "id": "picture_in_picture",
    "name": "Picture-in-Picture API",
    "category": "Media & Windows",
    "group": "P",
    "path": "webapis/picture_in_picture/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "69+",
      "edge": "79+",
      "firefox": "No",
      "safari": "13.1+"
    },
    "why": "Thu nhỏ video thành một cửa sổ nổi mini ghim ở góc màn hình, cho phép người dùng vừa xem video vừa lướt các website khác hoặc làm việc trên phần mềm khác.",
    "whenToUse": "Trình phát video (YouTube, Netflix clone), video bài giảng học trực tuyến, livestream.",
    "whenNotToUse": "Video không có hình (chỉ có âm thanh) hoặc muốn đưa cả giao diện DOM nút bấm tuỳ biến vào cửa sổ nổi (dùng Document Picture-in-Picture).",
    "interfaces": [
      "Picture-in-Picture"
    ],
    "props": [
      {
        "name": "document.pictureInPictureElement",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Picture-in-Picture API."
      }
    ],
    "methods": [
      {
        "signature": "videoElement.requestPictureInPicture()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Picture-in-Picture API.",
        "code": "// Sử dụng videoElement.requestPictureInPicture()\nconst result = await videoElement.requestPictureInPicture(/* options */);"
      },
      {
        "signature": "document.exitPictureInPicture()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Picture-in-Picture API.",
        "code": "// Sử dụng document.exitPictureInPicture()\nconst result = await document.exitPictureInPicture(/* options */);"
      },
      {
        "signature": "videoElement.addEventListener('enterpictureinpicture')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Picture-in-Picture API.",
        "code": "// Sử dụng videoElement.addEventListener('enterpictureinpicture')\nconst result = await videoElement.addEventListener('enterpictureinpicture');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Picture-in-Picture API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: PICTURE-IN-PICTURE API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializePictureInPicture() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'pictureInPictureEnabled' in document && 'requestPictureInPicture' in HTMLVideoElement.prototype;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Picture-in-Picture API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Picture-in-Picture API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng videoElement.requestPictureInPicture()\nconst result = await videoElement.requestPictureInPicture(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Picture-in-Picture API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "pointer_lock": {
    "id": "pointer_lock",
    "name": "Pointer Lock API",
    "category": "Device & Gaming",
    "group": "P",
    "path": "webapis/pointer_lock/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Khoá con trỏ chuột vào giữa màn hình và ẩn chuột đi, cho phép thu nhận các cử động di chuột không giới hạn (deltaX, deltaY) như trong game bắn súng góc nhìn thứ nhất (FPS) hoặc xoay vật thể 3D vô tận.",
    "whenToUse": "Game góc nhìn thứ nhất (FPS 3D WebGL), phần mềm đồ hoạ 3D xoay camera (Three.js/Babylon.js), mô phỏng vật lý.",
    "whenNotToUse": "Biểu mẫu nhập liệu hoặc giao diện web thông thường cần chuột để click tương tác.",
    "interfaces": [
      "Pointer Lock"
    ],
    "props": [
      {
        "name": "document.pointerLockElement",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Pointer Lock API."
      },
      {
        "name": "e.movementX / e.movementY",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Pointer Lock API."
      }
    ],
    "methods": [
      {
        "signature": "element.requestPointerLock()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Pointer Lock API.",
        "code": "// Sử dụng element.requestPointerLock()\nconst result = await element.requestPointerLock(/* options */);"
      },
      {
        "signature": "document.exitPointerLock()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Pointer Lock API.",
        "code": "// Sử dụng document.exitPointerLock()\nconst result = await document.exitPointerLock(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Pointer Lock API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: POINTER LOCK API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializePointerLock() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'requestPointerLock' in Element.prototype;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Pointer Lock API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Pointer Lock API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng element.requestPointerLock()\nconst result = await element.requestPointerLock(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Pointer Lock API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "popover": {
    "id": "popover",
    "name": "Popover API",
    "category": "Display & User Interface",
    "group": "P",
    "path": "webapis/popover/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "114+",
      "edge": "114+",
      "firefox": "125+",
      "safari": "17+"
    },
    "why": "Chuẩn HTML bản địa cho phép tạo tooltip, menu dropdown, popup nổi lên 'Top Layer' mà KHÔNG bị lỗi z-index, tự động xử lý click ra ngoài để đóng (light-dismiss) và phím Escape.",
    "whenToUse": "Menu dropdown, tooltip hướng dẫn, menu ngữ cảnh chuột phải, action sheet mà không cần viết hàng chục dòng JS quản lý trạng thái.",
    "whenNotToUse": "Hộp thoại bắt buộc tương tác (Modal Dialog - nên dùng thẻ <dialog showModal()> vì có tính năng chặn focus bàn phím ra ngoài).",
    "interfaces": [
      "Popover"
    ],
    "props": [
      {
        "name": "thẻ popover / popovertarget",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Popover API."
      },
      {
        "name": "beforetoggle event",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Popover API."
      }
    ],
    "methods": [
      {
        "signature": "element.showPopover()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Popover API.",
        "code": "// Sử dụng element.showPopover()\nconst result = await element.showPopover(/* options */);"
      },
      {
        "signature": "element.hidePopover()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Popover API.",
        "code": "// Sử dụng element.hidePopover()\nconst result = await element.hidePopover(/* options */);"
      },
      {
        "signature": "element.togglePopover()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Popover API.",
        "code": "// Sử dụng element.togglePopover()\nconst result = await element.togglePopover(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Popover API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: POPOVER API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializePopover() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'showPopover' in HTMLElement.prototype;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Popover API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Popover API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng element.showPopover()\nconst result = await element.showPopover(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Popover API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "prioritized_task_scheduling": {
    "id": "prioritized_task_scheduling",
    "name": "Prioritized Task Scheduling API",
    "category": "Performance & Tasks",
    "group": "P",
    "path": "webapis/prioritized_task_scheduling/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "94+",
      "edge": "94+",
      "firefox": "101+",
      "safari": "No"
    },
    "why": "Thay thế setTimeout(fn, 0) bừa bãi bằng hệ thống lập lịch ưu tiên chuẩn xác của trình duyệt: phân cấp tác vụ thành 'user-blocking', 'user-visible', và 'background' để đảm bảo phản hồi tức thì với người dùng.",
    "whenToUse": "Ứng dụng web phức tạp có nhiều tác vụ nền nhưng không được làm giật thao tác gõ phím/click của người dùng.",
    "whenNotToUse": "Chỉ hoãn thực thi một hành động đơn giản.",
    "interfaces": [
      "Prioritized Task Scheduling"
    ],
    "props": [],
    "methods": [
      {
        "signature": "scheduler.postTask(taskFn, { priority: 'user-blocking'|'user-visible'|'background', delay, signal })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Prioritized Task Scheduling API.",
        "code": "// Sử dụng scheduler.postTask(taskFn, { priority: 'user-blocking'|'user-visible'|'background', delay, signal })\nconst result = await scheduler.postTask(taskFn, { priority: 'user-blocking'|'user-visible'|'background', delay, signal });"
      },
      {
        "signature": "TaskController.setPriority()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Prioritized Task Scheduling API.",
        "code": "// Sử dụng TaskController.setPriority()\nconst result = await TaskController.setPriority(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Prioritized Task Scheduling API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: PRIORITIZED TASK SCHEDULING API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializePrioritizedTaskScheduling() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'scheduler' in window && 'postTask' in scheduler;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Prioritized Task Scheduling API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Prioritized Task Scheduling API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng scheduler.postTask(taskFn, { priority: 'user-blocking'|'user-visible'|'background', delay, signal })\nconst result = await scheduler.postTask(taskFn, { priority: 'user-blocking'|'user-visible'|'background', delay, signal });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Prioritized Task Scheduling API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "resize_observer": {
    "id": "resize_observer",
    "name": "Resize Observer API",
    "category": "Performance & DOM",
    "group": "R",
    "path": "webapis/resize_observer/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "64+",
      "edge": "79+",
      "firefox": "69+",
      "safari": "13.1+"
    },
    "why": "Lắng nghe sự thay đổi kích thước (width/height) của TỪNG phần tử DOM cụ thể với độ chính xác tuyệt đối, hỗ trợ Container Queries trong JavaScript.",
    "whenToUse": "Vẽ lại biểu đồ Canvas/Chart.js khi thẻ chứa co giãn, responsive component widget độc lập không phụ thuộc kích thước toàn màn hình.",
    "whenNotToUse": "Chỉ lắng nghe resize toàn bộ cửa sổ trình duyệt (window.onresize).",
    "interfaces": [
      "Resize Observer"
    ],
    "props": [
      {
        "name": "entry.contentRect",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Resize Observer API."
      },
      {
        "name": "entry.borderBoxSize",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Resize Observer API."
      },
      {
        "name": "entry.contentBoxSize",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Resize Observer API."
      }
    ],
    "methods": [
      {
        "signature": "new ResizeObserver(callback)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Resize Observer API.",
        "code": "// Sử dụng new ResizeObserver(callback)\nconst result = await new ResizeObserver(callback);"
      },
      {
        "signature": "observer.observe(element, { box })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Resize Observer API.",
        "code": "// Sử dụng observer.observe(element, { box })\nconst result = await observer.observe(element, { box });"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Resize Observer API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: RESIZE OBSERVER API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeResizeObserver() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'ResizeObserver' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Resize Observer API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Resize Observer API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new ResizeObserver(callback)\nconst result = await new ResizeObserver(callback);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Resize Observer API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "screen_orientation": {
    "id": "screen_orientation",
    "name": "Screen Orientation API",
    "category": "Sensors & Device",
    "group": "S",
    "path": "webapis/screen_orientation/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "16.4+"
    },
    "why": "Đọc hướng xoay hiện tại của màn hình (portrait-primary, landscape-primary) và cho phép khoá (lock) hướng màn hình khi chơi game hoặc xem phim toàn màn hình.",
    "whenToUse": "Game di động yêu cầu xoay ngang màn hình (landscape), ứng dụng đọc sách khoá dọc (portrait).",
    "whenNotToUse": "Khoá màn hình khi chưa ở chế độ toàn màn hình (fullscreen) trên desktop.",
    "interfaces": [
      "Screen Orientation"
    ],
    "props": [
      {
        "name": "screen.orientation.type",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Screen Orientation API."
      },
      {
        "name": "screen.orientation.angle",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Screen Orientation API."
      },
      {
        "name": "screen.orientation.onchange",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Screen Orientation API."
      }
    ],
    "methods": [
      {
        "signature": "screen.orientation.lock('landscape')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Screen Orientation API.",
        "code": "// Sử dụng screen.orientation.lock('landscape')\nconst result = await screen.orientation.lock('landscape');"
      },
      {
        "signature": "screen.orientation.unlock()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Screen Orientation API.",
        "code": "// Sử dụng screen.orientation.unlock()\nconst result = await screen.orientation.unlock(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Screen Orientation API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: SCREEN ORIENTATION API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeScreenOrientation() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'orientation' in screen;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Screen Orientation API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Screen Orientation API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng screen.orientation.lock('landscape')\nconst result = await screen.orientation.lock('landscape');\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Screen Orientation API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "screen_wake_lock": {
    "id": "screen_wake_lock",
    "name": "Screen Wake Lock API",
    "category": "Device & System",
    "group": "S",
    "path": "webapis/screen_wake_lock/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "84+",
      "edge": "84+",
      "firefox": "126+",
      "safari": "16.4+"
    },
    "why": "Ngăn thiết bị tự động tối màn hình hoặc rơi vào chế độ ngủ (sleep) khi người dùng đang đọc tài liệu dài, xem công thức nấu ăn hoặc thuyết trình.",
    "whenToUse": "App xem công thức nấu ăn (tay người dùng dính bột không chạm màn hình được), máy quét mã vạch bán hàng, ứng dụng thể dục theo dõi động tác.",
    "whenNotToUse": "Giữ màn hình sáng liên tục mà không có lý do thiết thực (gây hao pin thiết bị người dùng).",
    "interfaces": [
      "Screen Wake Lock"
    ],
    "props": [
      {
        "name": "wakeLockSentinel.onrelease",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Screen Wake Lock API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.wakeLock.request('screen')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Screen Wake Lock API.",
        "code": "// Sử dụng navigator.wakeLock.request('screen')\nconst result = await navigator.wakeLock.request('screen');"
      },
      {
        "signature": "wakeLockSentinel.release()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Screen Wake Lock API.",
        "code": "// Sử dụng wakeLockSentinel.release()\nconst result = await wakeLockSentinel.release(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Screen Wake Lock API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: SCREEN WAKE LOCK API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeScreenWakeLock() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'wakeLock' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Screen Wake Lock API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Screen Wake Lock API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.wakeLock.request('screen')\nconst result = await navigator.wakeLock.request('screen');\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Screen Wake Lock API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "selection": {
    "id": "selection",
    "name": "Selection API",
    "category": "Display & User Interface",
    "group": "S",
    "path": "webapis/selection/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Truy cập và thao tác chính xác với vùng văn bản mà người dùng bôi đen (selected text), lấy toạ độ hiển thị thanh công cụ nổi (floating toolbar).",
    "whenToUse": "Thanh công cụ định dạng chữ nổi kiểu Medium/Notion (In đậm, nghiêng, gắn link khi bôi đen text), trích dẫn nhanh nội dung.",
    "whenNotToUse": "Bôi đen nội dung trong ô <input> hoặc <textarea> (dùng selectionStart / selectionEnd của thẻ input).",
    "interfaces": [
      "Selection"
    ],
    "props": [],
    "methods": [
      {
        "signature": "window.getSelection()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Selection API.",
        "code": "// Sử dụng window.getSelection()\nconst result = await window.getSelection(/* options */);"
      },
      {
        "signature": "selection.toString()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Selection API.",
        "code": "// Sử dụng selection.toString()\nconst result = await selection.toString(/* options */);"
      },
      {
        "signature": "selection.getRangeAt(0)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Selection API.",
        "code": "// Sử dụng selection.getRangeAt(0)\nconst result = await selection.getRangeAt(0);"
      },
      {
        "signature": "range.getBoundingClientRect()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Selection API.",
        "code": "// Sử dụng range.getBoundingClientRect()\nconst result = await range.getBoundingClientRect(/* options */);"
      },
      {
        "signature": "selection.removeAllRanges()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Selection API.",
        "code": "// Sử dụng selection.removeAllRanges()\nconst result = await selection.removeAllRanges(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Selection API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: SELECTION API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeSelection() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'getSelection' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Selection API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Selection API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng window.getSelection()\nconst result = await window.getSelection(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Selection API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "server_sent_events": {
    "id": "server_sent_events",
    "name": "Server-Sent Events API",
    "category": "Network & HTTP",
    "group": "S",
    "path": "webapis/server_sent_events/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "6+",
      "edge": "79+",
      "firefox": "6+",
      "safari": "5+"
    },
    "why": "Nhận luồng dữ liệu thời gian thực 1 chiều từ server đẩy xuống client qua HTTP tiêu chuẩn, tự động kết nối lại khi mất mạng (reconnect), cấu hình nhẹ hơn nhiều so với WebSocket.",
    "whenToUse": "Dòng text AI trả lời từng chữ (ChatGPT stream output), bảng giá chứng khoán cập nhật liên tục, thông báo realtime từ server.",
    "whenNotToUse": "Giao tiếp 2 chiều cần client bắn dữ liệu liên tục lên server với độ trễ thấp (nên dùng WebSocket).",
    "interfaces": [
      "Server-Sent Events"
    ],
    "props": [
      {
        "name": "evtSource.onmessage",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Server-Sent Events API."
      }
    ],
    "methods": [
      {
        "signature": "new EventSource(url, { withCredentials })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Server-Sent Events API.",
        "code": "// Sử dụng new EventSource(url, { withCredentials })\nconst result = await new EventSource(url, { withCredentials });"
      },
      {
        "signature": "evtSource.addEventListener(customEvent)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Server-Sent Events API.",
        "code": "// Sử dụng evtSource.addEventListener(customEvent)\nconst result = await evtSource.addEventListener(customEvent);"
      },
      {
        "signature": "evtSource.close()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Server-Sent Events API.",
        "code": "// Sử dụng evtSource.close()\nconst result = await evtSource.close(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Server-Sent Events API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: SERVER-SENT EVENTS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeServerSentEvents() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'EventSource' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Server-Sent Events API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Server-Sent Events API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new EventSource(url, { withCredentials })\nconst result = await new EventSource(url, { withCredentials });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Server-Sent Events API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "service_worker": {
    "id": "service_worker",
    "name": "Service Worker API",
    "category": "Network & Background",
    "group": "S",
    "path": "webapis/service_worker/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "40+",
      "edge": "17+",
      "firefox": "44+",
      "safari": "11.1+"
    },
    "why": "Trái tim của Progressive Web Apps (PWA): đóng vai trò như một reverse-proxy chặn và xử lý mọi network request, cache tài nguyên để web chạy offline 100%.",
    "whenToUse": "Làm web hoạt động offline khi mất mạng, tải trang tức thì (instant loading cache-first), nhận push notification khi tắt tab.",
    "whenNotToUse": "Thao tác trực tiếp với DOM (Service Worker chạy ở luồng nền độc lập không có quyền truy cập DOM hay window).",
    "interfaces": [
      "Service Worker"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.serviceWorker.register(scriptURL)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Service Worker API.",
        "code": "// Sử dụng navigator.serviceWorker.register(scriptURL)\nconst result = await navigator.serviceWorker.register(scriptURL);"
      },
      {
        "signature": "self.addEventListener('install')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Service Worker API.",
        "code": "// Sử dụng self.addEventListener('install')\nconst result = await self.addEventListener('install');"
      },
      {
        "signature": "self.addEventListener('activate')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Service Worker API.",
        "code": "// Sử dụng self.addEventListener('activate')\nconst result = await self.addEventListener('activate');"
      },
      {
        "signature": "self.addEventListener('fetch', e => e.respondWith())",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Service Worker API.",
        "code": "// Sử dụng self.addEventListener('fetch', e => e.respondWith())\nconst result = await self.addEventListener('fetch', e => e.respondWith(/* options */));"
      },
      {
        "signature": "caches.open()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Service Worker API.",
        "code": "// Sử dụng caches.open()\nconst result = await caches.open(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Service Worker API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: SERVICE WORKER API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeServiceWorker() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'serviceWorker' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Service Worker API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Service Worker API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.serviceWorker.register(scriptURL)\nconst result = await navigator.serviceWorker.register(scriptURL);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Service Worker API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "storage": {
    "id": "storage",
    "name": "Storage API",
    "category": "Files & Storage",
    "group": "S",
    "path": "webapis/storage/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Ước lượng dung lượng ổ cứng đã sử dụng và còn lại cho trang web (quota & usage), đồng thời yêu cầu quyền lưu trữ vĩnh viễn (persistent storage) không bị trình duyệt tự ý xoá khi máy đầy bộ nhớ.",
    "whenToUse": "App nghe nhạc/xem phim offline hiển thị thanh 'Bộ nhớ đã dùng: 1.2GB / 10GB'; app ghi chú quan trọng cần xin quyền lưu trữ vĩnh viễn.",
    "whenNotToUse": "Chỉ lưu vài key-value cấu hình nhẹ.",
    "interfaces": [
      "Storage"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.storage.estimate() ({ quota, usage })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Storage API.",
        "code": "// Sử dụng navigator.storage.estimate() ({ quota, usage })\nconst result = await navigator.storage.estimate(/* options */) ({ quota, usage });"
      },
      {
        "signature": "navigator.storage.persist()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Storage API.",
        "code": "// Sử dụng navigator.storage.persist()\nconst result = await navigator.storage.persist(/* options */);"
      },
      {
        "signature": "navigator.storage.persisted()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Storage API.",
        "code": "// Sử dụng navigator.storage.persisted()\nconst result = await navigator.storage.persisted(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Storage API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: STORAGE API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeStorage() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'storage' in navigator && 'estimate' in navigator.storage;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Storage API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Storage API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.storage.estimate() ({ quota, usage })\nconst result = await navigator.storage.estimate(/* options */) ({ quota, usage });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Storage API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "streams": {
    "id": "streams",
    "name": "Streams API",
    "category": "Data & Streams",
    "group": "S",
    "path": "webapis/streams/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Xử lý dữ liệu nhị phân hoặc văn bản khổng lồ theo từng mẩu nhỏ (chunks) theo thời gian thực mà KHÔNG cần đợi tải xong toàn bộ vào RAM.",
    "whenToUse": "Phát video streaming, parse file JSON/CSV hàng Gigabytes từng dòng, xử lý luồng phản hồi AI từng token.",
    "whenNotToUse": "Dữ liệu nhỏ dưới 1MB đã có sẵn trong bộ nhớ.",
    "interfaces": [
      "Streams"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new ReadableStream()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Streams API.",
        "code": "// Sử dụng new ReadableStream()\nconst result = await new ReadableStream(/* options */);"
      },
      {
        "signature": "new WritableStream()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Streams API.",
        "code": "// Sử dụng new WritableStream()\nconst result = await new WritableStream(/* options */);"
      },
      {
        "signature": "new TransformStream()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Streams API.",
        "code": "// Sử dụng new TransformStream()\nconst result = await new TransformStream(/* options */);"
      },
      {
        "signature": "readableStream.pipeThrough()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Streams API.",
        "code": "// Sử dụng readableStream.pipeThrough()\nconst result = await readableStream.pipeThrough(/* options */);"
      },
      {
        "signature": "readableStream.getReader().read()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Streams API.",
        "code": "// Sử dụng readableStream.getReader().read()\nconst result = await readableStream.getReader(/* options */).read();"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Streams API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: STREAMS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeStreams() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'ReadableStream' in window && 'WritableStream' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Streams API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Streams API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new ReadableStream()\nconst result = await new ReadableStream(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Streams API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "url": {
    "id": "url",
    "name": "URL API",
    "category": "Data & Streams",
    "group": "U",
    "path": "webapis/url/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Phân tích, xây dựng và thao tác an toàn với các thành phần URL (protocol, hostname, pathname, search query parameters) mà không cần regex phức tạp.",
    "whenToUse": "Đọc/ghi query string (?sort=asc&page=2), xây dựng endpoint động, tạo Object URL từ Blob bằng URL.createObjectURL().",
    "whenNotToUse": "Nối chuỗi URL tĩnh đơn giản không có tham số động.",
    "interfaces": [
      "URL"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new URL(urlStr, baseUrl)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL API.",
        "code": "// Sử dụng new URL(urlStr, baseUrl)\nconst result = await new URL(urlStr, baseUrl);"
      },
      {
        "signature": "new URLSearchParams(searchStr)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL API.",
        "code": "// Sử dụng new URLSearchParams(searchStr)\nconst result = await new URLSearchParams(searchStr);"
      },
      {
        "signature": "params.get() / params.set() / params.append()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL API.",
        "code": "// Sử dụng params.get() / params.set() / params.append()\nconst result = await params.get(/* options */) / params.set() / params.append();"
      },
      {
        "signature": "URL.createObjectURL(blob)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL API.",
        "code": "// Sử dụng URL.createObjectURL(blob)\nconst result = await URL.createObjectURL(blob);"
      },
      {
        "signature": "URL.revokeObjectURL(url)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL API.",
        "code": "// Sử dụng URL.revokeObjectURL(url)\nconst result = await URL.revokeObjectURL(url);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của URL API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: URL API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeUrl() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'URL' in window && 'URLSearchParams' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [URL API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [URL API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new URL(urlStr, baseUrl)\nconst result = await new URL(urlStr, baseUrl);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [URL API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "url_pattern": {
    "id": "url_pattern",
    "name": "URL Pattern API",
    "category": "Navigation & History",
    "group": "U",
    "path": "webapis/url_pattern/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "95+",
      "edge": "95+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "So khớp đường dẫn URL theo mẫu regex có định danh tham số chuẩn (/books/:id(\\d+)) tương tự như router của Express hay Next.js trực tiếp trên trình duyệt.",
    "whenToUse": "Xây dựng routing cho Single Page App, Service Worker match URL cache theo wildcard, kiểm tra URL hợp lệ.",
    "whenNotToUse": "Trình duyệt Firefox/Safari chưa hỗ trợ native (cần polyfill urlpattern-polyfill).",
    "interfaces": [
      "URL Pattern"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new URLPattern({ pathname: '/users/:id' })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL Pattern API.",
        "code": "// Sử dụng new URLPattern({ pathname: '/users/:id' })\nconst result = await new URLPattern({ pathname: '/users/:id' });"
      },
      {
        "signature": "pattern.test(url)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL Pattern API.",
        "code": "// Sử dụng pattern.test(url)\nconst result = await pattern.test(url);"
      },
      {
        "signature": "pattern.exec(url).pathname.groups",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của URL Pattern API.",
        "code": "// Sử dụng pattern.exec(url).pathname.groups\nconst result = await pattern.exec(url).pathname.groups;"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của URL Pattern API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: URL PATTERN API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeUrlPattern() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'URLPattern' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [URL Pattern API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [URL Pattern API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new URLPattern({ pathname: '/users/:id' })\nconst result = await new URLPattern({ pathname: '/users/:id' });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [URL Pattern API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "user_agent_client_hints": {
    "id": "user_agent_client_hints",
    "name": "User-Agent Client Hints API",
    "category": "Security & System",
    "group": "U",
    "path": "webapis/user_agent_client_hints/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "90+",
      "edge": "90+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Giải pháp bảo mật hiện đại thay thế chuỗi navigator.userAgent cồng kềnh và dễ giả mạo. Truy cập thông tin hệ điều hành, kiến trúc CPU (ARM/x86), bit-ness và model thiết bị an toàn.",
    "whenToUse": "Phát hiện chính xác thiết bị Windows 11 vs Windows 10 (chuỗi UA cũ đều ghi Windows 10), tải file cài đặt đúng cấu hình 64-bit hoặc ARM64.",
    "whenNotToUse": "Kiểm tra trình duyệt hỗ trợ tính năng (luôn ưu tiên kiểm tra tính năng bằng Feature Detection 'feature' in window).",
    "interfaces": [
      "User-Agent Client Hints"
    ],
    "props": [
      {
        "name": "navigator.userAgentData.brands",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của User-Agent Client Hints API."
      },
      {
        "name": "navigator.userAgentData.mobile",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của User-Agent Client Hints API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.userAgentData.getHighEntropyValues(['platform', 'platformVersion', 'architecture', 'model'])",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của User-Agent Client Hints API.",
        "code": "// Sử dụng navigator.userAgentData.getHighEntropyValues(['platform', 'platformVersion', 'architecture', 'model'])\nconst result = await navigator.userAgentData.getHighEntropyValues(['platform', 'platformVersion', 'architecture', 'model']);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của User-Agent Client Hints API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: USER-AGENT CLIENT HINTS API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeUserAgentClientHints() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'userAgentData' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [User-Agent Client Hints API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [User-Agent Client Hints API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.userAgentData.getHighEntropyValues(['platform', 'platformVersion', 'architecture', 'model'])\nconst result = await navigator.userAgentData.getHighEntropyValues(['platform', 'platformVersion', 'architecture', 'model']);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [User-Agent Client Hints API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "vibration": {
    "id": "vibration",
    "name": "Vibration API",
    "category": "Device & Sensors",
    "group": "V",
    "path": "webapis/vibration/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "32+",
      "edge": "79+",
      "firefox": "16+",
      "safari": "No"
    },
    "why": "Kích hoạt mô-tơ rung vật lý của điện thoại theo từng nhịp điệu mili-giây (haptic feedback) để tạo cảm giác xúc giác chân thực khi tương tác.",
    "whenToUse": "Phản hồi rung khi bấm phím ảo, cảnh báo rung khi game nổ hoặc nhân vật bị trúng đòn, rung cảnh báo chuông báo thức web.",
    "whenNotToUse": "Rung liên tục gây phiền toái hoặc trên thiết bị máy tính bàn desktop không có mô-tơ rung.",
    "interfaces": [
      "Vibration"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.vibrate(200)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Vibration API.",
        "code": "// Sử dụng navigator.vibrate(200)\nconst result = await navigator.vibrate(200);"
      },
      {
        "signature": "navigator.vibrate([100, 50, 100, 50, 200]) (nhịp rung và nghỉ)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Vibration API.",
        "code": "// Sử dụng navigator.vibrate([100, 50, 100, 50, 200]) (nhịp rung và nghỉ)\nconst result = await navigator.vibrate([100, 50, 100, 50, 200]) (nhịp rung và nghỉ);"
      },
      {
        "signature": "navigator.vibrate(0) (huỷ rung)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Vibration API.",
        "code": "// Sử dụng navigator.vibrate(0) (huỷ rung)\nconst result = await navigator.vibrate(0) (huỷ rung);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Vibration API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: VIBRATION API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeVibration() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'vibrate' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Vibration API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Vibration API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.vibrate(200)\nconst result = await navigator.vibrate(200);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Vibration API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "view_transition": {
    "id": "view_transition",
    "name": "View Transitions API",
    "category": "Display & User Interface",
    "group": "V",
    "path": "webapis/view_transition/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "111+",
      "edge": "111+",
      "firefox": "Draft",
      "safari": "18+"
    },
    "why": "Tạo hiệu ứng chuyển cảnh mượt mà như ứng dụng native (morphing, fade, slide) giữa các trạng thái DOM hoặc khi chuyển trang SPA chỉ với 1 dòng code.",
    "whenToUse": "Chuyển ảnh thumbnail phóng to thành ảnh chi tiết, chuyển đổi giao diện Dark/Light mode, hiệu ứng chuyển tab SPA mượt mà.",
    "whenNotToUse": "Animation liên tục 60fps của các vật thể nhỏ (dùng CSS transitions hoặc Web Animations API).",
    "interfaces": [
      "View Transitions"
    ],
    "props": [
      {
        "name": "::view-transition trong CSS",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của View Transitions API."
      },
      {
        "name": "::view-transition-old / ::view-transition-new",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của View Transitions API."
      },
      {
        "name": "view-transition-name",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của View Transitions API."
      }
    ],
    "methods": [
      {
        "signature": "document.startViewTransition(updateCallback)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của View Transitions API.",
        "code": "// Sử dụng document.startViewTransition(updateCallback)\nconst result = await document.startViewTransition(updateCallback);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của View Transitions API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: VIEW TRANSITIONS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeViewTransition() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'startViewTransition' in document;\n  if (!isSupported) {\n    console.warn(\"⚠️ [View Transitions API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [View Transitions API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng document.startViewTransition(updateCallback)\nconst result = await document.startViewTransition(updateCallback);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [View Transitions API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "virtual_keyboard": {
    "id": "virtual_keyboard",
    "name": "Virtual Keyboard API",
    "category": "Device & System",
    "group": "V",
    "path": "webapis/virtual_keyboard/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "94+",
      "edge": "94+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Kiểm soát bàn phím ảo trên điện thoại / tablet cảm ứng: ngăn trình duyệt tự co rút viewport làm vỡ layout giao diện, chủ động đọc toạ độ bàn phím qua CSS env().",
    "whenToUse": "Ứng dụng chat trên mobile (giữ thanh input chat luôn nằm sát đỉnh bàn phím ảo mà không che mất nội dung tin nhắn), form điền cố định chân trang.",
    "whenNotToUse": "Thiết bị desktop có bàn phím cơ vật lý.",
    "interfaces": [
      "Virtual Keyboard"
    ],
    "props": [
      {
        "name": "navigator.virtualKeyboard.overlaysContent = true",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Virtual Keyboard API."
      },
      {
        "name": "navigator.virtualKeyboard.boundingRect",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Virtual Keyboard API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.virtualKeyboard.show() / hide()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Virtual Keyboard API.",
        "code": "// Sử dụng navigator.virtualKeyboard.show() / hide()\nconst result = await navigator.virtualKeyboard.show(/* options */) / hide();"
      },
      {
        "signature": "env(keyboard-inset-height)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Virtual Keyboard API.",
        "code": "// Sử dụng env(keyboard-inset-height)\nconst result = await env(keyboard-inset-height);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Virtual Keyboard API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: VIRTUAL KEYBOARD API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeVirtualKeyboard() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'virtualKeyboard' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Virtual Keyboard API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Virtual Keyboard API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.virtualKeyboard.show() / hide()\nconst result = await navigator.virtualKeyboard.show(/* options */) / hide();\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Virtual Keyboard API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_animations": {
    "id": "web_animations",
    "name": "Web Animations API",
    "category": "Styling & DOM",
    "group": "W",
    "path": "webapis/web_animations/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Sức mạnh kết hợp giữa hiệu năng tăng tốc phần cứng của CSS Animations và sự linh hoạt kiểm soát (play, pause, reverse, playbackRate) của JavaScript.",
    "whenToUse": "Điều khiển hoạt hoạ động theo tương tác chuột/cuộn, làm chậm hoặc tua nhanh animation (playbackRate), đồng bộ nhiều chuỗi chuyển động phức tạp.",
    "whenNotToUse": "Hiệu ứng hover tĩnh đơn giản (dùng CSS transition nhẹ hơn).",
    "interfaces": [
      "Web Animations"
    ],
    "props": [
      {
        "name": "animation.playbackRate",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Web Animations API."
      },
      {
        "name": "animation.finished",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Web Animations API."
      }
    ],
    "methods": [
      {
        "signature": "element.animate(keyframes, options)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Animations API.",
        "code": "// Sử dụng element.animate(keyframes, options)\nconst result = await element.animate(keyframes, options);"
      },
      {
        "signature": "animation.play() / animation.pause()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Animations API.",
        "code": "// Sử dụng animation.play() / animation.pause()\nconst result = await animation.play(/* options */) / animation.pause();"
      },
      {
        "signature": "animation.reverse()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Animations API.",
        "code": "// Sử dụng animation.reverse()\nconst result = await animation.reverse(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Animations API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB ANIMATIONS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebAnimations() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'animate' in Element.prototype;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Animations API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Animations API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng element.animate(keyframes, options)\nconst result = await element.animate(keyframes, options);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Animations API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_audio": {
    "id": "web_audio",
    "name": "Web Audio API",
    "category": "Audio & Media",
    "group": "W",
    "path": "webapis/web_audio/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Hệ thống xử lý và tổng hợp âm thanh chuyên nghiệp theo mô hình đồ thị khối (modular audio graph): tạo sóng dao động (synthesizer), bộ lọc tần số, hiệu ứng âm thanh không gian 3D, phân tích phổ âm (visualizer).",
    "whenToUse": "Tạo nhạc cụ synth điện tử, hiệu ứng âm thanh game 3D (bắn súng, tiếng bước chân), vẽ phổ âm tần số thanh nhạc (audio frequency spectrum visualizer).",
    "whenNotToUse": "Chỉ phát một file mp3/wav nền đơn giản (dùng thẻ <audio> gọn gàng hơn).",
    "interfaces": [
      "AudioContext",
      "AudioBuffer",
      "AudioNode",
      "GainNode",
      "OscillatorNode",
      "AnalyserNode",
      "BiquadFilterNode"
    ],
    "props": [
      {
        "name": "AudioContext.currentTime",
        "type": "number",
        "desc": "Trục thời gian phần cứng âm thanh tính bằng giây độ chính xác nano giây."
      },
      {
        "name": "AudioContext.sampleRate",
        "type": "number",
        "desc": "Tần số lấy mẫu âm thanh (thường là 44100Hz hoặc 48000Hz)."
      },
      {
        "name": "AudioContext.state",
        "type": "\"suspended\" | \"running\" | \"closed\"",
        "desc": "Trạng thái hoạt động của đồ thị âm thanh."
      }
    ],
    "methods": [
      {
        "signature": "context.createOscillator()",
        "returns": "OscillatorNode",
        "desc": "Tạo nút phát âm thanh sóng hình học (sin, vuông, tam giác, răng cưa).",
        "code": "const osc = ctx.createOscillator(); osc.frequency.value = 440;"
      },
      {
        "signature": "context.createGain()",
        "returns": "GainNode",
        "desc": "Tạo nút điều chỉnh âm lượng.",
        "code": "const gain = ctx.createGain(); gain.gain.value = 0.5;"
      },
      {
        "signature": "context.createAnalyser()",
        "returns": "AnalyserNode",
        "desc": "Tạo nút phân tích phổ âm thanh thời gian thực FFT để vẽ sóng nhạc.",
        "code": "const analyser = ctx.createAnalyser(); analyser.fftSize = 256;"
      },
      {
        "signature": "nodeA.connect(nodeB)",
        "returns": "AudioNode",
        "desc": "Nối đầu ra của nút âm thanh A vào đầu vào của nút B trong Audio Graph.",
        "code": "osc.connect(gain); gain.connect(ctx.destination);"
      }
    ],
    "events": [
      {
        "name": "statechange",
        "type": "Event",
        "desc": "Kích hoạt khi AudioContext chuyển trạng thái (bị treo do chính sách Autoplay hoặc tiếp tục chạy)."
      }
    ],
    "realWorldApp": "Phần mềm sản xuất âm nhạc DAW trên trình duyệt, bộ chỉnh âm Equalizer Spotify, hiệu ứng âm thanh game web 3D.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB AUDIO API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebAudio() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'AudioContext' in window || 'webkitAudioContext' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Audio API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Audio API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    const osc = ctx.createOscillator(); osc.frequency.value = 440;\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Audio API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_crypto": {
    "id": "web_crypto",
    "name": "Web Cryptography API",
    "category": "Authentication & Security",
    "group": "W",
    "path": "webapis/web_crypto/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Bộ mã hoá bảo mật chuẩn quân sự cấp độ phần cứng: tạo mã băm SHA-256, sinh khoá mã hoá RSA/AES, mã hoá/giải mã và ký số điện tử với tốc độ siêu nhanh.",
    "whenToUse": "Mã hoá đầu cuối E2EE (End-to-End Encryption) cho app nhắn tin, tính hash SHA-256 xác minh tính toàn vẹn file, ký số JWT/token trên client.",
    "whenNotToUse": "Sinh số ngẫu nhiên đơn giản không cần bảo mật (Math.random).",
    "interfaces": [
      "Web Cryptography"
    ],
    "props": [],
    "methods": [
      {
        "signature": "crypto.subtle.digest('SHA-256', buffer)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Cryptography API.",
        "code": "// Sử dụng crypto.subtle.digest('SHA-256', buffer)\nconst result = await crypto.subtle.digest('SHA-256', buffer);"
      },
      {
        "signature": "crypto.subtle.generateKey()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Cryptography API.",
        "code": "// Sử dụng crypto.subtle.generateKey()\nconst result = await crypto.subtle.generateKey(/* options */);"
      },
      {
        "signature": "crypto.subtle.encrypt() / decrypt()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Cryptography API.",
        "code": "// Sử dụng crypto.subtle.encrypt() / decrypt()\nconst result = await crypto.subtle.encrypt(/* options */) / decrypt();"
      },
      {
        "signature": "crypto.getRandomValues()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Cryptography API.",
        "code": "// Sử dụng crypto.getRandomValues()\nconst result = await crypto.getRandomValues(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Cryptography API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB CRYPTOGRAPHY API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebCrypto() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'crypto' in window && 'subtle' in crypto;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Cryptography API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Cryptography API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng crypto.subtle.digest('SHA-256', buffer)\nconst result = await crypto.subtle.digest('SHA-256', buffer);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Cryptography API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_locks": {
    "id": "web_locks",
    "name": "Web Locks API",
    "category": "Performance & Lifecycle",
    "group": "W",
    "path": "webapis/web_locks/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "69+",
      "edge": "79+",
      "firefox": "96+",
      "safari": "15.4+"
    },
    "why": "Khoá luồng tài nguyên đồng bộ (Mutex / Reader-Writer lock) giữa nhiều tab/worker cùng mở một website để tránh xung đột ghi dữ liệu (race conditions).",
    "whenToUse": "Chỉ cho phép duy nhất 1 tab chạy logic đồng bộ cơ sở dữ liệu IndexedDB hoặc duy nhất 1 tab kết nối WebSocket master.",
    "whenNotToUse": "Đồng bộ biến trong cùng 1 luồng đơn luồng bình thường.",
    "interfaces": [
      "Web Locks"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.locks.request(name, { mode: 'exclusive'|'shared' }, callback)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Locks API.",
        "code": "// Sử dụng navigator.locks.request(name, { mode: 'exclusive'|'shared' }, callback)\nconst result = await navigator.locks.request(name, { mode: 'exclusive'|'shared' }, callback);"
      },
      {
        "signature": "navigator.locks.query()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Locks API.",
        "code": "// Sử dụng navigator.locks.query()\nconst result = await navigator.locks.query(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Locks API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB LOCKS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebLocks() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'locks' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Locks API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Locks API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.locks.request(name, { mode: 'exclusive'|'shared' }, callback)\nconst result = await navigator.locks.request(name, { mode: 'exclusive'|'shared' }, callback);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Locks API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_share": {
    "id": "web_share",
    "name": "Web Share API",
    "category": "Device & System",
    "group": "W",
    "path": "webapis/web_share/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "61+",
      "edge": "81+",
      "firefox": "71+",
      "safari": "12.1+"
    },
    "why": "Kích hoạt hộp thoại chia sẻ gốc của hệ điều hành (Native Share Sheet), cho phép người dùng gửi link, văn bản hoặc tệp ảnh trực tiếp qua Zalo, Messenger, AirDrop, Telegram.",
    "whenToUse": "Nút 'Chia sẻ bài viết', chia sẻ mã giảm giá, gửi file hoá đơn PDF sang các app nhắn tin khác trên điện thoại.",
    "whenNotToUse": "Tự động gọi share mà không có sự kiện click của người dùng; chia sẻ tệp không được hệ điều hành hỗ trợ.",
    "interfaces": [
      "Web Share"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.canShare(data)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Share API.",
        "code": "// Sử dụng navigator.canShare(data)\nconst result = await navigator.canShare(data);"
      },
      {
        "signature": "navigator.share({ title, text, url, files })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Share API.",
        "code": "// Sử dụng navigator.share({ title, text, url, files })\nconst result = await navigator.share({ title, text, url, files });"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Share API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB SHARE API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebShare() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'share' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Share API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Share API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.canShare(data)\nconst result = await navigator.canShare(data);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Share API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_speech": {
    "id": "web_speech",
    "name": "Web Speech API",
    "category": "Audio & Media",
    "group": "W",
    "path": "webapis/web_speech/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Flag",
      "safari": "14.1+"
    },
    "why": "Tích hợp cả 2 khả năng AI giọng nói: Chuyển văn bản thành giọng đọc tự nhiên (Text-to-Speech) và Nhận diện giọng nói thành văn bản (Speech-to-Text).",
    "whenToUse": "Đọc to nội dung bài báo cho người khiếm thị, tìm kiếm bằng giọng nói (Voice Search), bot trợ lý ảo đàm thoại.",
    "whenNotToUse": "Cần nhận diện giọng nói chính xác cao trên Firefox khi chưa bật flag.",
    "interfaces": [
      "Web Speech"
    ],
    "props": [
      {
        "name": "recognition.onresult",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Web Speech API."
      }
    ],
    "methods": [
      {
        "signature": "window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Speech API.",
        "code": "// Sử dụng window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))\nconst result = await window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));"
      },
      {
        "signature": "speechSynthesis.getVoices()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Speech API.",
        "code": "// Sử dụng speechSynthesis.getVoices()\nconst result = await speechSynthesis.getVoices(/* options */);"
      },
      {
        "signature": "new SpeechRecognition()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Speech API.",
        "code": "// Sử dụng new SpeechRecognition()\nconst result = await new SpeechRecognition(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Speech API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB SPEECH API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebSpeech() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'speechSynthesis' in window || 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Speech API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Speech API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))\nconst result = await window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Speech API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_storage": {
    "id": "web_storage",
    "name": "Web Storage API",
    "category": "Storage & Databases",
    "group": "W",
    "path": "webapis/web_storage/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Lưu trữ dữ liệu dạng Key-Value (chuỗi) đồng bộ cực kỳ đơn giản: localStorage (lưu vĩnh viễn đến khi xoá) và sessionStorage (tự xoá khi đóng tab).",
    "whenToUse": "Lưu cấu hình giao diện (Dark/Light mode, ngôn ngữ VI/EN), lưu token xác thực tạm thời, lưu trạng thái form chưa nộp.",
    "whenNotToUse": "Lưu dữ liệu lớn trên 5MB (dùng IndexedDB) hoặc dữ liệu nhạy cảm có nguy cơ bị tấn công XSS.",
    "interfaces": [
      "Web Storage"
    ],
    "props": [],
    "methods": [
      {
        "signature": "localStorage.setItem(key, val)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Storage API.",
        "code": "// Sử dụng localStorage.setItem(key, val)\nconst result = await localStorage.setItem(key, val);"
      },
      {
        "signature": "localStorage.getItem(key)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Storage API.",
        "code": "// Sử dụng localStorage.getItem(key)\nconst result = await localStorage.getItem(key);"
      },
      {
        "signature": "localStorage.removeItem(key)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Storage API.",
        "code": "// Sử dụng localStorage.removeItem(key)\nconst result = await localStorage.removeItem(key);"
      },
      {
        "signature": "window.addEventListener('storage')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Storage API.",
        "code": "// Sử dụng window.addEventListener('storage')\nconst result = await window.addEventListener('storage');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Storage API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB STORAGE API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebStorage() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'localStorage' in window && 'sessionStorage' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Storage API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Storage API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng localStorage.setItem(key, val)\nconst result = await localStorage.setItem(key, val);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Storage API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_workers": {
    "id": "web_workers",
    "name": "Web Workers API",
    "category": "Performance & Tasks",
    "group": "W",
    "path": "webapis/web_workers/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Giải phóng hoàn toàn luồng chính (Main UI Thread): chạy các phép tính toán thuật toán nặng nề trên một luồng nền hệ điều hành (background thread) riêng biệt, đảm bảo web luôn mượt mà 60 FPS.",
    "whenToUse": "Xử lý ảnh/video mờ, phân tích dữ liệu lớn, mã hoá mật mã, tìm đường AI trong game mà không làm đơ chuột hay giật giao diện.",
    "whenNotToUse": "Các tác vụ cần thao tác trực tiếp với thẻ HTML hoặc cây DOM.",
    "interfaces": [
      "Web Workers"
    ],
    "props": [
      {
        "name": "worker.onmessage",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Web Workers API."
      }
    ],
    "methods": [
      {
        "signature": "new Worker(scriptURL)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Workers API.",
        "code": "// Sử dụng new Worker(scriptURL)\nconst result = await new Worker(scriptURL);"
      },
      {
        "signature": "worker.postMessage(data)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Workers API.",
        "code": "// Sử dụng worker.postMessage(data)\nconst result = await worker.postMessage(data);"
      },
      {
        "signature": "worker.terminate()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Workers API.",
        "code": "// Sử dụng worker.terminate()\nconst result = await worker.terminate(/* options */);"
      },
      {
        "signature": "self.postMessage()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Workers API.",
        "code": "// Sử dụng self.postMessage()\nconst result = await self.postMessage(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Workers API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB WORKERS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebWorkers() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'Worker' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Workers API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Workers API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new Worker(scriptURL)\nconst result = await new Worker(scriptURL);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Workers API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webcodecs": {
    "id": "webcodecs",
    "name": "WebCodecs API",
    "category": "Audio & Media",
    "group": "W",
    "path": "webapis/webcodecs/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "94+",
      "edge": "94+",
      "firefox": "No",
      "safari": "16.4+"
    },
    "why": "Cung cấp quyền truy cập cấp thấp (low-level) trực tiếp vào bộ giải mã và mã hoá video/âm thanh của phần cứng thiết bị (GPU/VPU) với độ trễ cực thấp.",
    "whenToUse": "Phần mềm biên tập video trực tuyến (CapCut web), Cloud Gaming (Stadia, GeForce Now), livestream độ trễ dưới 50ms.",
    "whenNotToUse": "Chỉ phát video thông thường (dùng thẻ <video> đã được tối ưu sẵn).",
    "interfaces": [
      "WebCodecs"
    ],
    "props": [
      {
        "name": "VideoFrame",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của WebCodecs API."
      }
    ],
    "methods": [
      {
        "signature": "new VideoEncoder({ output, error })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebCodecs API.",
        "code": "// Sử dụng new VideoEncoder({ output, error })\nconst result = await new VideoEncoder({ output, error });"
      },
      {
        "signature": "new VideoDecoder({ output, error })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebCodecs API.",
        "code": "// Sử dụng new VideoDecoder({ output, error })\nconst result = await new VideoDecoder({ output, error });"
      },
      {
        "signature": "encoder.encode(videoFrame)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebCodecs API.",
        "code": "// Sử dụng encoder.encode(videoFrame)\nconst result = await encoder.encode(videoFrame);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của WebCodecs API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBCODECS API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWebcodecs() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'VideoEncoder' in window && 'VideoDecoder' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebCodecs API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebCodecs API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new VideoEncoder({ output, error })\nconst result = await new VideoEncoder({ output, error });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebCodecs API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webgpu": {
    "id": "webgpu",
    "name": "WebGPU API",
    "category": "Graphics & 3D",
    "group": "W",
    "path": "webapis/webgpu/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "113+",
      "edge": "113+",
      "firefox": "Draft",
      "safari": "Draft"
    },
    "why": "Kế thừa và thay thế WebGL: giao tiếp trực tiếp với các API đồ hoạ hiện đại của GPU (Vulkan, Metal, DirectX 12) và hỗ trợ tính toán song song tổng quát (Compute Shaders) cực đỉnh.",
    "whenToUse": "Game 3D thế hệ mới độ hoạ chân thực (Ray Tracing), chạy mô hình Trí tuệ nhân tạo (LLM, AI Stable Diffusion) trực tiếp trên trình duyệt bằng GPU người dùng.",
    "whenNotToUse": "Vẽ biểu đồ 2D đơn giản (dùng Canvas 2D nhẹ hơn nhiều).",
    "interfaces": [
      "GPU",
      "GPUAdapter",
      "GPUDevice",
      "GPUBuffer",
      "GPUQueue",
      "GPUCommandEncoder",
      "GPURenderPipeline"
    ],
    "props": [
      {
        "name": "navigator.gpu",
        "type": "GPU",
        "desc": "Điểm khởi tạo truy cập card đồ họa máy tính chuẩn WebGPU."
      },
      {
        "name": "GPUAdapter.limits",
        "type": "GPUSupportedLimits",
        "desc": "Giới hạn phần cứng tối đa (kích thước texture, dung lượng buffer VRAM)."
      }
    ],
    "methods": [
      {
        "signature": "navigator.gpu.requestAdapter(options?)",
        "returns": "Promise<GPUAdapter | null>",
        "desc": "Yêu cầu card màn hình vật lý (GPU rời hiệu năng cao hoặc GPU onboard).",
        "code": "const adapter = await navigator.gpu.requestAdapter({ powerPreference: \"high-performance\" });"
      },
      {
        "signature": "adapter.requestDevice(descriptor?)",
        "returns": "Promise<GPUDevice>",
        "desc": "Khởi tạo thiết bị logic để gửi lệnh tính toán shader và render đồ họa.",
        "code": "const device = await adapter.requestDevice();"
      },
      {
        "signature": "device.createBuffer(descriptor)",
        "returns": "GPUBuffer",
        "desc": "Cấp phát vùng nhớ VRAM trên card màn hình lưu trữ đỉnh hoặc ma trận.",
        "code": "const buffer = device.createBuffer({ size: 1024, usage: GPUBufferUsage.VERTEX });"
      },
      {
        "signature": "device.createShaderModule(descriptor)",
        "returns": "GPUShaderModule",
        "desc": "Biên dịch mã shader viết bằng ngôn ngữ WGSL chạy trực tiếp trên GPU.",
        "code": "const shader = device.createShaderModule({ code: wgslCode });"
      }
    ],
    "events": [
      {
        "name": "uncapturederror",
        "type": "GPUUncapturedErrorEvent",
        "desc": "Bắt lỗi cú pháp hoặc tràn bộ nhớ GPU chưa được xử lý."
      }
    ],
    "realWorldApp": "Chạy mô hình học sâu AI WebLLM/Transformers.js ngay trên máy người dùng, game đồ họa 3D Unreal Engine Web, đồ họa CAD.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBGPU API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebgpu() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'gpu' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebGPU API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebGPU API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    const adapter = await navigator.gpu.requestAdapter({ powerPreference: \"high-performance\" });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebGPU API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webhid": {
    "id": "webhid",
    "name": "WebHID API",
    "category": "Device & Hardware",
    "group": "W",
    "path": "webapis/webhid/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "89+",
      "edge": "89+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Kết nối trực tiếp với các thiết bị giao tiếp người-máy (Human Interface Devices) chuyên dụng qua USB/Bluetooth: bàn phím cơ tuỳ chỉnh LED, bàn điều khiển Stream Deck, bàn đạp pedal, tay lái giả lập đua xe.",
    "whenToUse": "Web cấu hình bàn phím cơ (VIA/QMK web configurator), điều khiển thiết bị Stream Deck từ trình duyệt.",
    "whenNotToUse": "Bàn phím và chuột máy tính thông thường (đã được trình duyệt xử lý qua sự kiện bàn phím/chuột tiêu chuẩn).",
    "interfaces": [
      "WebHID"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.hid.requestDevice({ filters })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebHID API.",
        "code": "// Sử dụng navigator.hid.requestDevice({ filters })\nconst result = await navigator.hid.requestDevice({ filters });"
      },
      {
        "signature": "device.open()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebHID API.",
        "code": "// Sử dụng device.open()\nconst result = await device.open(/* options */);"
      },
      {
        "signature": "device.sendReport()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebHID API.",
        "code": "// Sử dụng device.sendReport()\nconst result = await device.sendReport(/* options */);"
      },
      {
        "signature": "device.addEventListener('inputreport')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebHID API.",
        "code": "// Sử dụng device.addEventListener('inputreport')\nconst result = await device.addEventListener('inputreport');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của WebHID API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBHID API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWebhid() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'hid' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebHID API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebHID API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.hid.requestDevice({ filters })\nconst result = await navigator.hid.requestDevice({ filters });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebHID API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webrtc": {
    "id": "webrtc",
    "name": "WebRTC API",
    "category": "Communication",
    "group": "W",
    "path": "webapis/webrtc/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Chuẩn giao tiếp thời gian thực P2P (Peer-to-Peer): truyền âm thanh, video HD và dữ liệu nhị phân trực tiếp giữa hai trình duyệt mà không cần trung chuyển qua server với độ trễ chỉ vài chục mili-giây.",
    "whenToUse": "Gọi video/thoại 1-1 hoặc nhóm (Zoom, Google Meet, Discord web), chia sẻ file trực tiếp giữa 2 máy tính qua mạng LAN (Snapdrop).",
    "whenNotToUse": "Phát sóng trực tiếp 1 chiều tới hàng triệu người xem (nên dùng HLS/DASH streaming).",
    "interfaces": [
      "RTCPeerConnection",
      "RTCDataChannel",
      "RTCSessionDescription",
      "RTCIceCandidate"
    ],
    "props": [
      {
        "name": "connection.connectionState",
        "type": "\"new\"|\"connecting\"|\"connected\"|\"disconnected\"|\"failed\"|\"closed\"",
        "desc": "Trạng thái kết nối P2P thời gian thực giữa 2 máy khách."
      },
      {
        "name": "connection.iceConnectionState",
        "type": "RTCIceConnectionState",
        "desc": "Trạng thái tìm kiếm đường hầm mạng NAT Traversal qua STUN/TURN server."
      }
    ],
    "methods": [
      {
        "signature": "connection.createOffer(options?)",
        "returns": "Promise<RTCSessionDescriptionInit>",
        "desc": "Tạo lời mời kết nối chứa thông tin mã hóa SDP.",
        "code": "const offer = await pc.createOffer(); await pc.setLocalDescription(offer);"
      },
      {
        "signature": "connection.createAnswer(options?)",
        "returns": "Promise<RTCSessionDescriptionInit>",
        "desc": "Tạo phản hồi chấp nhận kết nối gửi lại bên gọi.",
        "code": "const answer = await pc.createAnswer(); await pc.setLocalDescription(answer);"
      },
      {
        "signature": "connection.createDataChannel(label, options?)",
        "returns": "RTCDataChannel",
        "desc": "Mở kênh truyền dữ liệu nhị phân P2P trực tiếp độ trễ cực thấp (bỏ qua server trung gian).",
        "code": "const channel = pc.createDataChannel(\"chat\");"
      }
    ],
    "events": [
      {
        "name": "icecandidate",
        "type": "RTCPeerConnectionIceEvent",
        "desc": "Bắn ra khi tìm thấy một địa chỉ mạng ứng viên để kết nối P2P."
      },
      {
        "name": "track",
        "type": "RTCTrackEvent",
        "desc": "Nhận luồng âm thanh hoặc hình ảnh video từ máy đối tác."
      }
    ],
    "realWorldApp": "Google Meet, Discord, Zoom Web, chia sẻ file P2P (như Snapdrop / Sharedrop).",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBRTC API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebrtc() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'RTCPeerConnection' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebRTC API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebRTC API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    const offer = await pc.createOffer(); await pc.setLocalDescription(offer);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebRTC API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "websockets": {
    "id": "websockets",
    "name": "WebSockets API",
    "category": "Network & HTTP",
    "group": "W",
    "path": "webapis/websockets/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Mở một kết nối TCP 2 chiều (Full-Duplex) liên tục giữa client và server qua 1 socket duy nhất, truyền nhận tin nhắn tức thì với overhead chỉ 2 bytes.",
    "whenToUse": "Ứng dụng chat thời gian thực, game nhiều người chơi (multiplayer online), bảng giá tài chính crypto nhảy số theo từng mili-giây.",
    "whenNotToUse": "Chỉ gửi một request lấy dữ liệu 1 lần rồi thôi (dùng Fetch API).",
    "interfaces": [
      "WebSockets"
    ],
    "props": [
      {
        "name": "ws.onopen",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của WebSockets API."
      },
      {
        "name": "ws.onmessage",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của WebSockets API."
      },
      {
        "name": "ws.onclose",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của WebSockets API."
      }
    ],
    "methods": [
      {
        "signature": "new WebSocket(wsUrl)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebSockets API.",
        "code": "// Sử dụng new WebSocket(wsUrl)\nconst result = await new WebSocket(wsUrl);"
      },
      {
        "signature": "ws.send(data)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebSockets API.",
        "code": "// Sử dụng ws.send(data)\nconst result = await ws.send(data);"
      },
      {
        "signature": "ws.close()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebSockets API.",
        "code": "// Sử dụng ws.close()\nconst result = await ws.close(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của WebSockets API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBSOCKETS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebsockets() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'WebSocket' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebSockets API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebSockets API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new WebSocket(wsUrl)\nconst result = await new WebSocket(wsUrl);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebSockets API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webtransport": {
    "id": "webtransport",
    "name": "WebTransport API",
    "category": "Network & HTTP",
    "group": "W",
    "path": "webapis/webtransport/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "97+",
      "edge": "97+",
      "firefox": "114+",
      "safari": "Draft"
    },
    "why": "Giao thức mạng thế hệ tiếp theo dựa trên HTTP/3 (QUIC): khắc phục hoàn toàn hiện tượng nghẽn đầu hàng (Head-of-Line Blocking) của TCP, hỗ trợ cả luồng tin cậy (Streams) và truyền tải nhanh không tin cậy (Datagrams như UDP).",
    "whenToUse": "Game online tốc độ cao cần bắn toạ độ qua Datagrams (mất gói tin không sao, chỉ cần mới nhất), livestream độ trễ cực thấp.",
    "whenNotToUse": "Server backend chưa hỗ trợ HTTP/3 / QUIC.",
    "interfaces": [
      "WebTransport"
    ],
    "props": [
      {
        "name": "transport.ready",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của WebTransport API."
      }
    ],
    "methods": [
      {
        "signature": "new WebTransport(url)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebTransport API.",
        "code": "// Sử dụng new WebTransport(url)\nconst result = await new WebTransport(url);"
      },
      {
        "signature": "transport.datagrams.writable.getWriter()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebTransport API.",
        "code": "// Sử dụng transport.datagrams.writable.getWriter()\nconst result = await transport.datagrams.writable.getWriter(/* options */);"
      },
      {
        "signature": "transport.createBidirectionalStream()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebTransport API.",
        "code": "// Sử dụng transport.createBidirectionalStream()\nconst result = await transport.createBidirectionalStream(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của WebTransport API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBTRANSPORT API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebtransport() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'WebTransport' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebTransport API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebTransport API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new WebTransport(url)\nconst result = await new WebTransport(url);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebTransport API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webusb": {
    "id": "webusb",
    "name": "WebUSB API",
    "category": "Device & Hardware",
    "group": "W",
    "path": "webapis/webusb/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "61+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Kết nối và trao đổi dữ liệu trực tiếp với phần cứng cổng USB (máy in nhiệt, cân điện tử, vi điều khiển Arduino/ESP32) ngay từ trang web mà không cần cài driver riêng.",
    "whenToUse": "Trang web nạp firmware cho vi điều khiển Arduino/ESP32, phần mềm POS in hoá đơn trực tiếp ra máy in USB.",
    "whenNotToUse": "Các thiết bị chuẩn HID hoặc ổ đĩa USB Mass Storage (bị hệ điều hành khoá chặn để bảo mật).",
    "interfaces": [
      "WebUSB"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.usb.requestDevice({ filters })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebUSB API.",
        "code": "// Sử dụng navigator.usb.requestDevice({ filters })\nconst result = await navigator.usb.requestDevice({ filters });"
      },
      {
        "signature": "device.open()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebUSB API.",
        "code": "// Sử dụng device.open()\nconst result = await device.open(/* options */);"
      },
      {
        "signature": "device.selectConfiguration()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebUSB API.",
        "code": "// Sử dụng device.selectConfiguration()\nconst result = await device.selectConfiguration(/* options */);"
      },
      {
        "signature": "device.claimInterface()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebUSB API.",
        "code": "// Sử dụng device.claimInterface()\nconst result = await device.claimInterface(/* options */);"
      },
      {
        "signature": "device.transferIn() / transferOut()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebUSB API.",
        "code": "// Sử dụng device.transferIn() / transferOut()\nconst result = await device.transferIn(/* options */) / transferOut();"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của WebUSB API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBUSB API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWebusb() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'usb' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebUSB API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebUSB API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.usb.requestDevice({ filters })\nconst result = await navigator.usb.requestDevice({ filters });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebUSB API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webxr": {
    "id": "webxr",
    "name": "WebXR Device API",
    "category": "Graphics & 3D",
    "group": "W",
    "path": "webapis/webxr/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "79+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Chuẩn chính thức thay thế WebVR đã lỗi thời: tích hợp công nghệ Thực tế ảo (VR) và Thực tế tăng cường (AR) cho kính Meta Quest, Apple Vision Pro và camera điện thoại.",
    "whenToUse": "Xem thử mô hình 3D đồ nội thất đặt vào phòng khách thực tế (AR), tour tham quan bảo tàng 360 độ bằng kính VR, game VR tương tác trên web.",
    "whenNotToUse": "Thiết bị không có kính VR hoặc không có cảm biến ARKit/ARCore.",
    "interfaces": [
      "WebXR Device"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.xr.isSessionSupported('immersive-vr')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebXR Device API.",
        "code": "// Sử dụng navigator.xr.isSessionSupported('immersive-vr')\nconst result = await navigator.xr.isSessionSupported('immersive-vr');"
      },
      {
        "signature": "navigator.xr.requestSession('immersive-ar')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebXR Device API.",
        "code": "// Sử dụng navigator.xr.requestSession('immersive-ar')\nconst result = await navigator.xr.requestSession('immersive-ar');"
      },
      {
        "signature": "session.requestAnimationFrame()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebXR Device API.",
        "code": "// Sử dụng session.requestAnimationFrame()\nconst result = await session.requestAnimationFrame(/* options */);"
      },
      {
        "signature": "XRFrame.getViewerPose()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebXR Device API.",
        "code": "// Sử dụng XRFrame.getViewerPose()\nconst result = await XRFrame.getViewerPose(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của WebXR Device API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBXR DEVICE API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWebxr() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'xr' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebXR Device API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebXR Device API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.xr.isSessionSupported('immersive-vr')\nconst result = await navigator.xr.isSessionSupported('immersive-vr');\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebXR Device API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "window_management": {
    "id": "window_management",
    "name": "Window Management API",
    "category": "Media & Windows",
    "group": "W",
    "path": "webapis/window_management/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "100+",
      "edge": "100+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Phát hiện và lấy thông tin chi tiết của TẤT CẢ các màn hình phụ đang kết nối với máy tính (vị trí tương đối, độ phân giải, màn hình chính) và điều khiển mở cửa sổ toàn màn hình trên đúng màn hình phụ mong muốn.",
    "whenToUse": "Phần mềm trình chiếu slide (màn hình laptop hiện ghi chú của diễn giả, màn hình máy chiếu hiện slide full), ứng dụng tài chính nhiều màn hình biểu đồ.",
    "whenNotToUse": "Máy tính chỉ có 1 màn hình duy nhất.",
    "interfaces": [
      "Window Management"
    ],
    "props": [
      {
        "name": "screensDetails.screens",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Window Management API."
      },
      {
        "name": "screenDetails.currentScreen",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Window Management API."
      }
    ],
    "methods": [
      {
        "signature": "window.getScreenDetails()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Window Management API.",
        "code": "// Sử dụng window.getScreenDetails()\nconst result = await window.getScreenDetails(/* options */);"
      },
      {
        "signature": "window.open(url, '_blank', `left=${x},top=${y}`)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Window Management API.",
        "code": "// Sử dụng window.open(url, '_blank', `left=${x},top=${y}`)\nconst result = await window.open(url, '_blank', `left=${x},top=${y}`);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Window Management API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WINDOW MANAGEMENT API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWindowManagement() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'getScreenDetails' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Window Management API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Window Management API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng window.getScreenDetails()\nconst result = await window.getScreenDetails(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Window Management API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "xmlhttprequest": {
    "id": "xmlhttprequest",
    "name": "XMLHttpRequest API",
    "category": "Network & HTTP",
    "group": "X",
    "path": "webapis/xmlhttprequest/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Nền tảng khởi nguồn công nghệ AJAX lịch sử của web. Dù hiện nay Fetch API chiếm ưu thế, XMLHttpRequest vẫn giữ vai trò quan trọng nhờ khả năng theo dõi tiến trình tải lên (upload progress event).",
    "whenToUse": "Tính năng upload file dung lượng lớn cần thanh tiến trình % chính xác (xhr.upload.onprogress) mà Fetch API chưa có chuẩn native.",
    "whenNotToUse": "Gọi API dữ liệu thông thường mới (luôn ưu tiên dùng Fetch API với async/await hiện đại).",
    "interfaces": [
      "XMLHttpRequest"
    ],
    "props": [
      {
        "name": "xhr.upload.onprogress",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của XMLHttpRequest API."
      },
      {
        "name": "xhr.onload / xhr.onerror",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của XMLHttpRequest API."
      }
    ],
    "methods": [
      {
        "signature": "new XMLHttpRequest()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của XMLHttpRequest API.",
        "code": "// Sử dụng new XMLHttpRequest()\nconst result = await new XMLHttpRequest(/* options */);"
      },
      {
        "signature": "xhr.open(method, url)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của XMLHttpRequest API.",
        "code": "// Sử dụng xhr.open(method, url)\nconst result = await xhr.open(method, url);"
      },
      {
        "signature": "xhr.send(data)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của XMLHttpRequest API.",
        "code": "// Sử dụng xhr.send(data)\nconst result = await xhr.send(data);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của XMLHttpRequest API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: XMLHTTPREQUEST API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeXmlhttprequest() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'XMLHttpRequest' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [XMLHttpRequest API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [XMLHttpRequest API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new XMLHttpRequest()\nconst result = await new XMLHttpRequest(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [XMLHttpRequest API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "canvas": {
    "id": "canvas",
    "name": "Canvas API",
    "category": "Graphics & 3D",
    "group": "C",
    "path": "webapis/canvas/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Cung cấp bảng vẽ đồ họa bitmap 2D độ phân giải cao có thể vẽ hình, text, đường cong, xử lý điểm ảnh (pixel manipulation) và xuất ảnh PNG/JPEG ngay lập tức.",
    "whenToUse": "Vẽ biểu đồ tương tác, game 2D, chỉnh sửa ảnh (cắt, ghép, xoay, bộ lọc filter), vẽ chữ ký điện tử.",
    "whenNotToUse": "Giao diện văn bản UI tĩnh thông thường (dùng HTML/CSS ngữ nghĩa tốt cho SEO và Accessibility).",
    "interfaces": [
      "Canvas"
    ],
    "props": [],
    "methods": [
      {
        "signature": "canvas.getContext('2d')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Canvas API.",
        "code": "// Sử dụng canvas.getContext('2d')\nconst result = await canvas.getContext('2d');"
      },
      {
        "signature": "ctx.fillRect() / strokeRect()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Canvas API.",
        "code": "// Sử dụng ctx.fillRect() / strokeRect()\nconst result = await ctx.fillRect(/* options */) / strokeRect();"
      },
      {
        "signature": "ctx.drawImage()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Canvas API.",
        "code": "// Sử dụng ctx.drawImage()\nconst result = await ctx.drawImage(/* options */);"
      },
      {
        "signature": "ctx.getImageData() / putImageData()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Canvas API.",
        "code": "// Sử dụng ctx.getImageData() / putImageData()\nconst result = await ctx.getImageData(/* options */) / putImageData();"
      },
      {
        "signature": "canvas.toDataURL()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Canvas API.",
        "code": "// Sử dụng canvas.toDataURL()\nconst result = await canvas.toDataURL(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Canvas API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CANVAS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeCanvas() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'HTMLCanvasElement' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Canvas API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Canvas API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng canvas.getContext('2d')\nconst result = await canvas.getContext('2d');\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Canvas API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "contact_picker": {
    "id": "contact_picker",
    "name": "Contact Picker API",
    "category": "Device & System",
    "group": "C",
    "path": "webapis/contact_picker/index.html",
    "supportedCount": 3,
    "baselineLevel": "Rộng rãi (3/4 Trình duyệt)",
    "support": {
      "chrome": "80+",
      "edge": "80+",
      "firefox": "No",
      "safari": "14.5+"
    },
    "why": "Cho phép người dùng chọn số điện thoại, tên hoặc email trực tiếp từ danh bạ của điện thoại để điền tự động vào ứng dụng web mà không cần gõ tay.",
    "whenToUse": "Ứng dụng chuyển tiền qua số điện thoại, mời bạn bè qua email/SMS, gửi thiệp chúc mừng.",
    "whenNotToUse": "Trang web desktop không có danh bạ điện thoại hoặc cố tình thu thập danh bạ ngầm không có tương tác người dùng.",
    "interfaces": [
      "Contact Picker"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.contacts.select(['name', 'email', 'tel'], { multiple })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Contact Picker API.",
        "code": "// Sử dụng navigator.contacts.select(['name', 'email', 'tel'], { multiple })\nconst result = await navigator.contacts.select(['name', 'email', 'tel'], { multiple });"
      },
      {
        "signature": "navigator.contacts.getProperties()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Contact Picker API.",
        "code": "// Sử dụng navigator.contacts.getProperties()\nconst result = await navigator.contacts.getProperties(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Contact Picker API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: CONTACT PICKER API\n// Hỗ trợ trình duyệt: 3/4 (Rộng rãi (3/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeContactPicker() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'contacts' in navigator && 'ContactsManager' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Contact Picker API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Contact Picker API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.contacts.select(['name', 'email', 'tel'], { multiple })\nconst result = await navigator.contacts.select(['name', 'email', 'tel'], { multiple });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Contact Picker API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "html_drag_and_drop": {
    "id": "html_drag_and_drop",
    "name": "HTML Drag and Drop API",
    "category": "User Interaction & Events",
    "group": "H",
    "path": "webapis/html_drag_and_drop/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Chuẩn kéo thả bản địa của HTML: kéo phần tử DOM hoặc tệp tin từ desktop vào trang web kèm dữ liệu truyền tải DataTransfer.",
    "whenToUse": "Bảng Kanban kéo thả công việc (Trello clone), sắp xếp thứ tự danh sách, kéo thả file upload trực tiếp vào vùng thả.",
    "whenNotToUse": "Kéo thả trên màn hình cảm ứng di động (nên kết hợp Pointer Events hoặc Touch Events vì Drag & Drop chuẩn thiết kế cho chuột).",
    "interfaces": [
      "HTML Drag and Drop"
    ],
    "props": [
      {
        "name": "element.draggable = true",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của HTML Drag and Drop API."
      },
      {
        "name": "dragstart event",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của HTML Drag and Drop API."
      },
      {
        "name": "drop event",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của HTML Drag and Drop API."
      }
    ],
    "methods": [
      {
        "signature": "dragover event (e.preventDefault())",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của HTML Drag and Drop API.",
        "code": "// Sử dụng dragover event (e.preventDefault())\nconst result = await dragover event (e.preventDefault(/* options */));"
      },
      {
        "signature": "e.dataTransfer.setData() / getData()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của HTML Drag and Drop API.",
        "code": "// Sử dụng e.dataTransfer.setData() / getData()\nconst result = await e.dataTransfer.setData(/* options */) / getData();"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của HTML Drag and Drop API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: HTML DRAG AND DROP API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeHtmlDragAndDrop() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'ondragstart' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [HTML Drag and Drop API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [HTML Drag and Drop API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng dragover event (e.preventDefault())\nconst result = await dragover event (e.preventDefault(/* options */));\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [HTML Drag and Drop API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "keyboard": {
    "id": "keyboard",
    "name": "Keyboard API",
    "category": "Device & Gaming",
    "group": "K",
    "path": "webapis/keyboard/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "68+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Khoá phím chức năng (Escape, Tab, phím Windows) khi chơi game fullscreen và truy vấn sơ đồ phím vật lý (Keyboard Layout Map) bất kể người dùng dùng bàn phím QWERTY, AZERTY hay Dvorak.",
    "whenToUse": "Game bắn súng/nhập vai toàn màn hình cần dùng phím Esc mở menu trong game thay vì thoát fullscreen; phần mềm remote desktop.",
    "whenNotToUse": "Form nhập liệu thông thường trong trang web.",
    "interfaces": [
      "Keyboard"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.keyboard.lock(['Escape'])",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Keyboard API.",
        "code": "// Sử dụng navigator.keyboard.lock(['Escape'])\nconst result = await navigator.keyboard.lock(['Escape']);"
      },
      {
        "signature": "navigator.keyboard.unlock()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Keyboard API.",
        "code": "// Sử dụng navigator.keyboard.unlock()\nconst result = await navigator.keyboard.unlock(/* options */);"
      },
      {
        "signature": "navigator.keyboard.getLayoutMap()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Keyboard API.",
        "code": "// Sử dụng navigator.keyboard.getLayoutMap()\nconst result = await navigator.keyboard.getLayoutMap(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Keyboard API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: KEYBOARD API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeKeyboard() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'keyboard' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Keyboard API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Keyboard API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.keyboard.lock(['Escape'])\nconst result = await navigator.keyboard.lock(['Escape']);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Keyboard API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "media_capabilities": {
    "id": "media_capabilities",
    "name": "Media Capabilities API",
    "category": "Audio & Media",
    "group": "M",
    "path": "webapis/media_capabilities/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "66+",
      "edge": "79+",
      "firefox": "63+",
      "safari": "13+"
    },
    "why": "Xác định phần cứng thiết bị có thể giải mã/mã hoá video/audio mượt mà (smooth) và tiết kiệm điện (powerEfficient) hay không trước khi phát.",
    "whenToUse": "Tự động chọn định dạng video tối ưu (AV1 vs VP9 vs H.264 vs HEVC) giúp máy người dùng không bị tụt pin hoặc quạt rú khi xem phim.",
    "whenNotToUse": "Chỉ phát âm thanh/video đơn giản mà không cần tối ưu hoá cấu hình phần cứng sâu.",
    "interfaces": [
      "Media Capabilities"
    ],
    "props": [
      {
        "name": "result.supported",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Media Capabilities API."
      },
      {
        "name": "result.smooth",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Media Capabilities API."
      },
      {
        "name": "result.powerEfficient",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Media Capabilities API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.mediaCapabilities.decodingInfo({ type, video, audio })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Media Capabilities API.",
        "code": "// Sử dụng navigator.mediaCapabilities.decodingInfo({ type, video, audio })\nconst result = await navigator.mediaCapabilities.decodingInfo({ type, video, audio });"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Media Capabilities API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: MEDIA CAPABILITIES API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeMediaCapabilities() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'mediaCapabilities' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Media Capabilities API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Media Capabilities API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.mediaCapabilities.decodingInfo({ type, video, audio })\nconst result = await navigator.mediaCapabilities.decodingInfo({ type, video, audio });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Media Capabilities API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "media_capture_and_streams": {
    "id": "media_capture_and_streams",
    "name": "Media Capture and Streams API",
    "category": "Audio & Media",
    "group": "M",
    "path": "webapis/media_capture_and_streams/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "53+",
      "edge": "12+",
      "firefox": "36+",
      "safari": "11+"
    },
    "why": "Truy cập trực tiếp vào luồng dữ liệu camera và microphone (MediaStream) của thiết bị với cấu hình độ phân giải và lọc tạp âm chuyên nghiệp.",
    "whenToUse": "Phòng họp trực tuyến (Google Meet/Zoom), chụp ảnh chân dung selfie, quét mã QR qua webcam, ứng dụng đàm thoại trực tiếp.",
    "whenNotToUse": "Tự động bật camera mà không có sự đồng ý của người dùng (bảo vệ quyền riêng tư).",
    "interfaces": [
      "Media Capture and Streams"
    ],
    "props": [
      {
        "name": "videoElement.srcObject = stream",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Media Capture and Streams API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.mediaDevices.getUserMedia({ video, audio })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Media Capture and Streams API.",
        "code": "// Sử dụng navigator.mediaDevices.getUserMedia({ video, audio })\nconst result = await navigator.mediaDevices.getUserMedia({ video, audio });"
      },
      {
        "signature": "MediaStream.getTracks()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Media Capture and Streams API.",
        "code": "// Sử dụng MediaStream.getTracks()\nconst result = await MediaStream.getTracks(/* options */);"
      },
      {
        "signature": "track.stop()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Media Capture and Streams API.",
        "code": "// Sử dụng track.stop()\nconst result = await track.stop(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Media Capture and Streams API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: MEDIA CAPTURE AND STREAMS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeMediaCaptureAndStreams() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Media Capture and Streams API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Media Capture and Streams API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.mediaDevices.getUserMedia({ video, audio })\nconst result = await navigator.mediaDevices.getUserMedia({ video, audio });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Media Capture and Streams API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "media_session": {
    "id": "media_session",
    "name": "Media Session API",
    "category": "Audio & Media",
    "group": "M",
    "path": "webapis/media_session/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "73+",
      "edge": "79+",
      "firefox": "71+",
      "safari": "15+"
    },
    "why": "Đưa thông tin bài hát (tên bài, nghệ sĩ, ảnh bìa album) và các nút điều khiển (Play, Pause, Next, Prev, Seek) lên màn hình khoá OS và phím đa phương tiện bàn phím.",
    "whenToUse": "Trang web nghe nhạc trực tuyến (Spotify, Zing MP3, YouTube Music), podcast, sách nói audiobooks.",
    "whenNotToUse": "Trang web chỉ phát hiệu ứng âm thanh click nút ngắn.",
    "interfaces": [
      "Media Session"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.mediaSession.metadata = new MediaMetadata()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Media Session API.",
        "code": "// Sử dụng navigator.mediaSession.metadata = new MediaMetadata()\nconst result = await navigator.mediaSession.metadata = new MediaMetadata(/* options */);"
      },
      {
        "signature": "navigator.mediaSession.setActionHandler('play', ...)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Media Session API.",
        "code": "// Sử dụng navigator.mediaSession.setActionHandler('play', ...)\nconst result = await navigator.mediaSession.setActionHandler('play', ...);"
      },
      {
        "signature": "navigator.mediaSession.setPositionState()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Media Session API.",
        "code": "// Sử dụng navigator.mediaSession.setPositionState()\nconst result = await navigator.mediaSession.setPositionState(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Media Session API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: MEDIA SESSION API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeMediaSession() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'mediaSession' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Media Session API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Media Session API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.mediaSession.metadata = new MediaMetadata()\nconst result = await navigator.mediaSession.metadata = new MediaMetadata(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Media Session API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "media_stream_recording": {
    "id": "media_stream_recording",
    "name": "MediaStream Recording API",
    "category": "Audio & Media",
    "group": "M",
    "path": "webapis/media_stream_recording/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "47+",
      "edge": "79+",
      "firefox": "25+",
      "safari": "14+"
    },
    "why": "Ghi âm hoặc quay video trực tiếp từ micro, webcam hoặc màn hình máy tính thành tệp nhị phân Blob (WebM / MP4) chất lượng cao ngay trên trình duyệt.",
    "whenToUse": "Gửi tin nhắn thoại voice message, ghi hình bài thuyết trình, quay video phỏng vấn online, thu âm podcast.",
    "whenNotToUse": "Ghi âm/ghi hình lén không thông báo người dùng.",
    "interfaces": [
      "MediaStream Recording"
    ],
    "props": [
      {
        "name": "recorder.ondataavailable",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của MediaStream Recording API."
      }
    ],
    "methods": [
      {
        "signature": "new MediaRecorder(stream, { mimeType })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của MediaStream Recording API.",
        "code": "// Sử dụng new MediaRecorder(stream, { mimeType })\nconst result = await new MediaRecorder(stream, { mimeType });"
      },
      {
        "signature": "recorder.start(timeslice)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của MediaStream Recording API.",
        "code": "// Sử dụng recorder.start(timeslice)\nconst result = await recorder.start(timeslice);"
      },
      {
        "signature": "recorder.stop()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của MediaStream Recording API.",
        "code": "// Sử dụng recorder.stop()\nconst result = await recorder.stop(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của MediaStream Recording API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: MEDIASTREAM RECORDING API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeMediaStreamRecording() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'MediaRecorder' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [MediaStream Recording API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [MediaStream Recording API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new MediaRecorder(stream, { mimeType })\nconst result = await new MediaRecorder(stream, { mimeType });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [MediaStream Recording API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "payment_request": {
    "id": "payment_request",
    "name": "Payment Request API",
    "category": "E-Commerce & Payments",
    "group": "P",
    "path": "webapis/payment_request/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "60+",
      "edge": "15+",
      "firefox": "55+",
      "safari": "11.1+"
    },
    "why": "Chuẩn thanh toán 1-chạm bản địa của trình duyệt (Apple Pay, Google Pay): tự động điền địa chỉ giao hàng, thông tin thẻ mà người dùng không phải gõ form thanh toán rườm rà.",
    "whenToUse": "Nút thanh toán nhanh 'Mua ngay với Google Pay / Apple Pay' trên các website thương mại điện tử, tăng tỷ lệ hoàn tất đơn hàng (conversion rate).",
    "whenNotToUse": "Thanh toán nội bộ công ty không dùng thẻ tín dụng hoặc ví điện tử quốc tế.",
    "interfaces": [
      "Payment Request"
    ],
    "props": [],
    "methods": [
      {
        "signature": "new PaymentRequest(methodData, details, options)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Payment Request API.",
        "code": "// Sử dụng new PaymentRequest(methodData, details, options)\nconst result = await new PaymentRequest(methodData, details, options);"
      },
      {
        "signature": "request.canMakePayment()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Payment Request API.",
        "code": "// Sử dụng request.canMakePayment()\nconst result = await request.canMakePayment(/* options */);"
      },
      {
        "signature": "request.show()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Payment Request API.",
        "code": "// Sử dụng request.show()\nconst result = await request.show(/* options */);"
      },
      {
        "signature": "paymentResponse.complete('success')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Payment Request API.",
        "code": "// Sử dụng paymentResponse.complete('success')\nconst result = await paymentResponse.complete('success');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Payment Request API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: PAYMENT REQUEST API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializePaymentRequest() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'PaymentRequest' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Payment Request API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Payment Request API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng new PaymentRequest(methodData, details, options)\nconst result = await new PaymentRequest(methodData, details, options);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Payment Request API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "performance": {
    "id": "performance",
    "name": "Performance API",
    "category": "Performance & Profiling",
    "group": "P",
    "path": "webapis/performance/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Đo đạc thời gian thực thi thuật toán với độ chính xác cao đến micro-giây (performance.now) và thu thập các chỉ số trải nghiệm người dùng Core Web Vitals (LCP, FID, CLS).",
    "whenToUse": "Benchmark tối ưu hoá code, gắn telemetry đo thời gian tải trang, theo dõi các tài nguyên mạng tải chậm qua PerformanceObserver.",
    "whenNotToUse": "Chỉ lấy ngày giờ lịch theo định dạng người đọc (dùng Date.now()).",
    "interfaces": [
      "Performance"
    ],
    "props": [],
    "methods": [
      {
        "signature": "performance.now()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Performance API.",
        "code": "// Sử dụng performance.now()\nconst result = await performance.now(/* options */);"
      },
      {
        "signature": "performance.mark(name)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Performance API.",
        "code": "// Sử dụng performance.mark(name)\nconst result = await performance.mark(name);"
      },
      {
        "signature": "performance.measure(name, start, end)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Performance API.",
        "code": "// Sử dụng performance.measure(name, start, end)\nconst result = await performance.measure(name, start, end);"
      },
      {
        "signature": "new PerformanceObserver(callback)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Performance API.",
        "code": "// Sử dụng new PerformanceObserver(callback)\nconst result = await new PerformanceObserver(callback);"
      },
      {
        "signature": "performance.getEntriesByType()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Performance API.",
        "code": "// Sử dụng performance.getEntriesByType()\nconst result = await performance.getEntriesByType(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Performance API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: PERFORMANCE API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializePerformance() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'performance' in window && 'now' in performance;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Performance API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Performance API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng performance.now()\nconst result = await performance.now(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Performance API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "pointer_events": {
    "id": "pointer_events",
    "name": "Pointer Events API",
    "category": "User Interaction & Events",
    "group": "P",
    "path": "webapis/pointer_events/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "API hợp nhất xử lý TẤT CẢ các thiết bị trỏ: chuột (mouse), ngón tay cảm ứng (touch) và bút kỹ thuật số (stylus pen) vào cùng một hệ thống sự kiện duy nhất kèm lực nhấn (pressure) và góc nghiêng (tilt).",
    "whenToUse": "Ứng dụng vẽ tranh bảng vẽ số (nhận diện lực đè của bút cảm ứng), điều khiển tương tác đa điểm (pinch-to-zoom), bắt trọn di chuột ra ngoài phần tử với setPointerCapture.",
    "whenNotToUse": "Chỉ click chuột đơn giản (dùng click event cơ bản là đủ).",
    "interfaces": [
      "Pointer Events"
    ],
    "props": [
      {
        "name": "pointerdown / pointermove / pointerup",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Pointer Events API."
      },
      {
        "name": "e.tiltX / e.tiltY",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Pointer Events API."
      }
    ],
    "methods": [
      {
        "signature": "element.setPointerCapture(pointerId)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Pointer Events API.",
        "code": "// Sử dụng element.setPointerCapture(pointerId)\nconst result = await element.setPointerCapture(pointerId);"
      },
      {
        "signature": "e.pressure (0.0 - 1.0)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Pointer Events API.",
        "code": "// Sử dụng e.pressure (0.0 - 1.0)\nconst result = await e.pressure (0.0 - 1.0);"
      },
      {
        "signature": "e.pointerType ('mouse'|'pen'|'touch')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Pointer Events API.",
        "code": "// Sử dụng e.pointerType ('mouse'|'pen'|'touch')\nconst result = await e.pointerType ('mouse'|'pen'|'touch');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Pointer Events API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: POINTER EVENTS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializePointerEvents() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'PointerEvent' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Pointer Events API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Pointer Events API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng element.setPointerCapture(pointerId)\nconst result = await element.setPointerCapture(pointerId);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Pointer Events API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "screen_capture": {
    "id": "screen_capture",
    "name": "Screen Capture API",
    "category": "Audio & Media",
    "group": "S",
    "path": "webapis/screen_capture/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "72+",
      "edge": "79+",
      "firefox": "66+",
      "safari": "13+"
    },
    "why": "Quay và chia sẻ màn hình máy tính (toàn màn hình, cửa sổ ứng dụng hoặc tab trình duyệt cụ thể) kèm âm thanh hệ thống.",
    "whenToUse": "Chia sẻ màn hình trong cuộc họp online (Google Meet, Discord), phần mềm quay video màn hình bài giảng web, công cụ chụp ảnh màn hình web.",
    "whenNotToUse": "Chụp ảnh khuôn mặt người dùng (phải dùng getUserMedia với camera).",
    "interfaces": [
      "Screen Capture"
    ],
    "props": [
      {
        "name": "track.onended",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Screen Capture API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.mediaDevices.getDisplayMedia({ video, audio })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Screen Capture API.",
        "code": "// Sử dụng navigator.mediaDevices.getDisplayMedia({ video, audio })\nconst result = await navigator.mediaDevices.getDisplayMedia({ video, audio });"
      },
      {
        "signature": "track.getSettings().displaySurface ('monitor'|'window'|'browser')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Screen Capture API.",
        "code": "// Sử dụng track.getSettings().displaySurface ('monitor'|'window'|'browser')\nconst result = await track.getSettings(/* options */).displaySurface ('monitor'|'window'|'browser');"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Screen Capture API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: SCREEN CAPTURE API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeScreenCapture() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Screen Capture API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Screen Capture API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.mediaDevices.getDisplayMedia({ video, audio })\nconst result = await navigator.mediaDevices.getDisplayMedia({ video, audio });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Screen Capture API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "touch_events": {
    "id": "touch_events",
    "name": "Touch Events API",
    "category": "User Interaction & Events",
    "group": "T",
    "path": "webapis/touch_events/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Xử lý tương tác cảm ứng đa điểm (multi-touch) độc quyền trên màn hình điện thoại/tablet: theo dõi đồng thời nhiều ngón tay chạm vào màn hình (e.touches, targetTouches).",
    "whenToUse": "Cử chỉ zoom 2 ngón (pinch), xoay 2 ngón tay, vuốt lướt màn hình trên điện thoại, bàn phím piano cảm ứng đa ngón.",
    "whenNotToUse": "Chỉ dùng chuột máy tính desktop thông thường.",
    "interfaces": [
      "Touch Events"
    ],
    "props": [
      {
        "name": "touchstart / touchmove / touchend / touchcancel",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Touch Events API."
      },
      {
        "name": "e.touches",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Touch Events API."
      },
      {
        "name": "e.targetTouches",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Touch Events API."
      },
      {
        "name": "e.changedTouches",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Touch Events API."
      },
      {
        "name": "touch.clientX / touch.clientY",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Touch Events API."
      }
    ],
    "methods": [],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Touch Events API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: TOUCH EVENTS API\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeTouchEvents() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);\n  if (!isSupported) {\n    console.warn(\"⚠️ [Touch Events API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Touch Events API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Thực hiện tương tác với API\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Touch Events API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_authentication": {
    "id": "web_authentication",
    "name": "Web Authentication API (WebAuthn / Passkeys)",
    "category": "Authentication & Security",
    "group": "W",
    "path": "webapis/web_authentication/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "67+",
      "edge": "18+",
      "firefox": "60+",
      "safari": "13+"
    },
    "why": "Đăng nhập không cần mật khẩu (Passkeys) an toàn tuyệt đối chống lừa đảo Phishing: sử dụng vân tay Touch ID, khuôn mặt Face ID hoặc khoá bảo mật phần cứng YubiKey.",
    "whenToUse": "Đăng nhập sinh trắc học 1-chạm (Face ID, Windows Hello), xác thực 2 yếu tố (2FA FIDO2), loại bỏ hoàn toàn mật khẩu dễ bị lộ.",
    "whenNotToUse": "Hệ thống nội bộ cổ điển chưa hỗ trợ máy chủ xác thực chữ ký khoá công khai Public Key.",
    "interfaces": [
      "Web Authentication API (WebAuthn / Passkeys)"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.credentials.create({ publicKey }) (Đăng ký Passkey)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Authentication API (WebAuthn / Passkeys).",
        "code": "// Sử dụng navigator.credentials.create({ publicKey }) (Đăng ký Passkey)\nconst result = await navigator.credentials.create({ publicKey }) (Đăng ký Passkey);"
      },
      {
        "signature": "navigator.credentials.get({ publicKey }) (Đăng nhập)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Authentication API (WebAuthn / Passkeys).",
        "code": "// Sử dụng navigator.credentials.get({ publicKey }) (Đăng nhập)\nconst result = await navigator.credentials.get({ publicKey }) (Đăng nhập);"
      },
      {
        "signature": "PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Authentication API (WebAuthn / Passkeys).",
        "code": "// Sử dụng PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()\nconst result = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Authentication API (WebAuthn / Passkeys).",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB AUTHENTICATION API (WEBAUTHN / PASSKEYS)\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebAuthentication() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'credentials' in navigator && 'PublicKeyCredential' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Authentication API (WebAuthn / Passkeys)] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Authentication API (WebAuthn / Passkeys)] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.credentials.create({ publicKey }) (Đăng ký Passkey)\nconst result = await navigator.credentials.create({ publicKey }) (Đăng ký Passkey);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Authentication API (WebAuthn / Passkeys)] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_bluetooth": {
    "id": "web_bluetooth",
    "name": "Web Bluetooth API",
    "category": "Device & Hardware",
    "group": "W",
    "path": "webapis/web_bluetooth/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "56+",
      "edge": "79+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Kết nối trực tiếp với các thiết bị Bluetooth Low Energy (BLE) xung quanh: máy đo nhịp tim, nhiệt kế thông minh, bóng đèn thông minh, robot đồ chơi.",
    "whenToUse": "Web điều khiển thiết bị IoT thông minh trong nhà (smart home), ứng dụng thể thao kết nối vòng đeo tay theo dõi sức khoẻ.",
    "whenNotToUse": "Thiết bị Bluetooth Classic (tai nghe nhạc âm thanh Bluetooth A2DP được hệ điều hành quản lý riêng).",
    "interfaces": [
      "Web Bluetooth"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.bluetooth.requestDevice({ filters, optionalServices })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Bluetooth API.",
        "code": "// Sử dụng navigator.bluetooth.requestDevice({ filters, optionalServices })\nconst result = await navigator.bluetooth.requestDevice({ filters, optionalServices });"
      },
      {
        "signature": "device.gatt.connect()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Bluetooth API.",
        "code": "// Sử dụng device.gatt.connect()\nconst result = await device.gatt.connect(/* options */);"
      },
      {
        "signature": "service.getCharacteristic()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Bluetooth API.",
        "code": "// Sử dụng service.getCharacteristic()\nconst result = await service.getCharacteristic(/* options */);"
      },
      {
        "signature": "characteristic.readValue() / writeValue()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Bluetooth API.",
        "code": "// Sử dụng characteristic.readValue() / writeValue()\nconst result = await characteristic.readValue(/* options */) / writeValue();"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Bluetooth API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB BLUETOOTH API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWebBluetooth() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'bluetooth' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Bluetooth API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Bluetooth API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.bluetooth.requestDevice({ filters, optionalServices })\nconst result = await navigator.bluetooth.requestDevice({ filters, optionalServices });\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Bluetooth API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "web_serial": {
    "id": "web_serial",
    "name": "Web Serial API",
    "category": "Device & Hardware",
    "group": "W",
    "path": "webapis/web_serial/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "89+",
      "edge": "89+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Giao tiếp trực tiếp với cổng COM / Serial Port phần cứng: đọc và ghi luồng byte nhị phân tới mạch Arduino, máy quét mã vạch RS-232, bộ định tuyến viễn thông.",
    "whenToUse": "Trang web nạp code Arduino/ESP32 trực tiếp (Web Serial Flasher), giao tiếp cảm biến công nghiệp trong nhà máy.",
    "whenNotToUse": "Trang web thương mại điện tử hoặc ứng dụng văn phòng thông thường.",
    "interfaces": [
      "Web Serial"
    ],
    "props": [],
    "methods": [
      {
        "signature": "navigator.serial.requestPort()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Serial API.",
        "code": "// Sử dụng navigator.serial.requestPort()\nconst result = await navigator.serial.requestPort(/* options */);"
      },
      {
        "signature": "port.open({ baudRate })",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Serial API.",
        "code": "// Sử dụng port.open({ baudRate })\nconst result = await port.open({ baudRate });"
      },
      {
        "signature": "port.readable.getReader()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Serial API.",
        "code": "// Sử dụng port.readable.getReader()\nconst result = await port.readable.getReader(/* options */);"
      },
      {
        "signature": "port.writable.getWriter()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Serial API.",
        "code": "// Sử dụng port.writable.getWriter()\nconst result = await port.writable.getWriter(/* options */);"
      },
      {
        "signature": "port.close()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Web Serial API.",
        "code": "// Sử dụng port.close()\nconst result = await port.close(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Web Serial API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEB SERIAL API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWebSerial() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'serial' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Web Serial API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Web Serial API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.serial.requestPort()\nconst result = await navigator.serial.requestPort(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Web Serial API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "webgl": {
    "id": "webgl",
    "name": "WebGL API (2D & 3D Graphics)",
    "category": "Graphics & 3D",
    "group": "W",
    "path": "webapis/webgl/index.html",
    "supportedCount": 4,
    "baselineLevel": "Universal Baseline (Phổ cập 4/4)",
    "support": {
      "chrome": "Yes",
      "edge": "Yes",
      "firefox": "Yes",
      "safari": "Yes"
    },
    "why": "Chuẩn đồ hoạ 3D tăng tốc phần cứng phổ biến nhất lịch sử web: chạy trên 100% mọi thiết bị và trình duyệt, làm nền tảng cho Three.js, Babylon.js và Google Earth.",
    "whenToUse": "Game 3D web, mô hình xem trước sản phẩm 360 độ (xe hơi, nhà cửa, giày dép), bản đồ địa hình 3D, trực quan hoá dữ liệu khối cầu.",
    "whenNotToUse": "Giao diện phẳng 2D đơn giản (nên dùng CSS/Canvas 2D nhẹ hơn).",
    "interfaces": [
      "WebGL API (2D & 3D Graphics)"
    ],
    "props": [],
    "methods": [
      {
        "signature": "canvas.getContext('webgl2')",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebGL API (2D & 3D Graphics).",
        "code": "// Sử dụng canvas.getContext('webgl2')\nconst result = await canvas.getContext('webgl2');"
      },
      {
        "signature": "gl.createShader()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebGL API (2D & 3D Graphics).",
        "code": "// Sử dụng gl.createShader()\nconst result = await gl.createShader(/* options */);"
      },
      {
        "signature": "gl.createProgram()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebGL API (2D & 3D Graphics).",
        "code": "// Sử dụng gl.createProgram()\nconst result = await gl.createProgram(/* options */);"
      },
      {
        "signature": "gl.createBuffer()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebGL API (2D & 3D Graphics).",
        "code": "// Sử dụng gl.createBuffer()\nconst result = await gl.createBuffer(/* options */);"
      },
      {
        "signature": "gl.drawArrays()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của WebGL API (2D & 3D Graphics).",
        "code": "// Sử dụng gl.drawArrays()\nconst result = await gl.drawArrays(/* options */);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của WebGL API (2D & 3D Graphics).",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WEBGL API (2D & 3D GRAPHICS)\n// Hỗ trợ trình duyệt: 4/4 (Universal Baseline (Phổ cập 4/4))\n// ==========================================================\n\nasync function initializeWebgl() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'WebGLRenderingContext' in window || 'WebGL2RenderingContext' in window;\n  if (!isSupported) {\n    console.warn(\"⚠️ [WebGL API (2D & 3D Graphics)] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [WebGL API (2D & 3D Graphics)] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng canvas.getContext('webgl2')\nconst result = await canvas.getContext('webgl2');\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [WebGL API (2D & 3D Graphics)] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  },
  "window_controls_overlay": {
    "id": "window_controls_overlay",
    "name": "Window Controls Overlay API",
    "category": "Device & PWA",
    "group": "W",
    "path": "webapis/window_controls_overlay/index.html",
    "supportedCount": 2,
    "baselineLevel": "Hệ Chromium (2/4 Trình duyệt)",
    "support": {
      "chrome": "105+",
      "edge": "105+",
      "firefox": "No",
      "safari": "No"
    },
    "why": "Cho phép PWA desktop tuỳ biến toàn bộ thanh tiêu đề (Titlebar): đặt thanh tìm kiếm, avatar, menu ngay cạnh 3 nút Close/Minimize/Maximize như ứng dụng native (Spotify, VS Code).",
    "whenToUse": "PWA desktop cần giao diện cực kỳ hiện đại, mở rộng diện tích hiển thị lên sát đỉnh màn hình.",
    "whenNotToUse": "Trang web thông thường chạy trong tab trình duyệt.",
    "interfaces": [
      "Window Controls Overlay"
    ],
    "props": [
      {
        "name": "navigator.windowControlsOverlay.visible",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Window Controls Overlay API."
      },
      {
        "name": "navigator.windowControlsOverlay.ongeometrychange",
        "type": "any / context object",
        "desc": "Thuộc tính điều khiển chuẩn của Window Controls Overlay API."
      }
    ],
    "methods": [
      {
        "signature": "navigator.windowControlsOverlay.getTitlebarAreaRect()",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Window Controls Overlay API.",
        "code": "// Sử dụng navigator.windowControlsOverlay.getTitlebarAreaRect()\nconst result = await navigator.windowControlsOverlay.getTitlebarAreaRect(/* options */);"
      },
      {
        "signature": "env(titlebar-area-x)",
        "returns": "Promise<any> | void",
        "desc": "Phương thức thực thi nghiệp vụ cốt lõi của Window Controls Overlay API.",
        "code": "// Sử dụng env(titlebar-area-x)\nconst result = await env(titlebar-area-x);"
      }
    ],
    "events": [],
    "realWorldApp": "Các hệ thống ứng dụng web chuyên nghiệp tận dụng tối đa năng lực phần cứng và hệ điều hành của Window Controls Overlay API.",
    "boilerplateCode": "// ==========================================================\n// 🚀 PRODUCTION BOILERPLATE: WINDOW CONTROLS OVERLAY API\n// Hỗ trợ trình duyệt: 2/4 (Hệ Chromium (2/4 Trình duyệt))\n// ==========================================================\n\nasync function initializeWindowControlsOverlay() {\n  // 1. Kiểm tra tính tương thích của thiết bị\n  const isSupported = 'windowControlsOverlay' in navigator;\n  if (!isSupported) {\n    console.warn(\"⚠️ [Window Controls Overlay API] Trình duyệt này chưa hỗ trợ tính năng.\");\n    return { success: false, reason: \"UNSUPPORTED_BROWSER\" };\n  }\n\n  try {\n    console.log(\"🟢 [Window Controls Overlay API] Thiết bị sẵn sàng, đang khởi tạo...\");\n    \n    // 2. Thực thi nghiệp vụ chuẩn\n    // Sử dụng navigator.windowControlsOverlay.getTitlebarAreaRect()\nconst result = await navigator.windowControlsOverlay.getTitlebarAreaRect(/* options */);\n    \n    return { success: true };\n  } catch (err) {\n    console.error(\"🔴 [Window Controls Overlay API] Thao tác thất bại:\", err);\n    return { success: false, error: err };\n  }\n}"
  }
};

  window.MDN_ENCYCLOPEDIA_DATA = MDN_ENCYCLOPEDIA_DATA;
})(window);
