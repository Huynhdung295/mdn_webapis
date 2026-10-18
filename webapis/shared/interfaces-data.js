// webapis/shared/interfaces-data.js - Danh bạ tra cứu toàn diện tất cả Interfaces chuẩn MDN Web APIs
(function(window) {
  'use strict';

  const MDN_INTERFACES_DATA = [
  {
    "name": "AbortController",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Standard",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "AbortSignal",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Standard",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "AbsoluteOrientationSensor",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "AbstractRange",
    "apiId": "selection",
    "apiName": "Selection API",
    "status": "Standard",
    "desc": "Thao tác và kiểm soát dải văn bản đang được bôi đen trên DOM."
  },
  {
    "name": "Accelerometer",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Experimental",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "AesCbcParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "AesCtrParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "AesDerivedKeyParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "AesGcmParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "AesKeyGenParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "AmbientLightSensor",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Experimental",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "AnalyserNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "ANGLE_instanced_arrays",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "Animation",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "AnimationEffect",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "AnimationEvent",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "AnimationPlaybackEvent",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "AnimationTimeline",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "Attr",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "AudioBuffer",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioBufferSourceNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioContext",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioData",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý và giải mã luồng gói tin âm thanh thô độ trễ cực thấp."
  },
  {
    "name": "AudioDecoder",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý và giải mã luồng gói tin âm thanh thô độ trễ cực thấp."
  },
  {
    "name": "AudioDestinationNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioEncoder",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý và giải mã luồng gói tin âm thanh thô độ trễ cực thấp."
  },
  {
    "name": "AudioListener",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioParam",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioParamDescriptor",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioParamMap",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioPlaybackStats",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Experimental",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioScheduledSourceNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioSession",
    "apiId": "audio_session",
    "apiName": "Audio Session API",
    "status": "Experimental",
    "desc": "Cấu hình và kiểm soát phiên âm thanh hệ thống (trộn nhạc, tạm dừng khi gọi)."
  },
  {
    "name": "AudioSinkInfo",
    "apiId": "audio_output_devices",
    "apiName": "Audio Output Devices API",
    "status": "Experimental",
    "desc": "Mô tả thông tin thiết bị đầu ra âm thanh (loa ngoài, tai nghe, bluetooth)."
  },
  {
    "name": "AudioTrack",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioTrackList",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioWorklet",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioWorkletGlobalScope",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioWorkletNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AudioWorkletProcessor",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "AuthenticatorAssertionResponse",
    "apiId": "web_authentication",
    "apiName": "Web Authentication API (WebAuthn)",
    "status": "Standard",
    "desc": "Xác thực đăng nhập sinh trắc học (vân tay, khuôn mặt FaceID) với Passkey bảo mật tuyệt đối."
  },
  {
    "name": "AuthenticatorAttestationResponse",
    "apiId": "web_authentication",
    "apiName": "Web Authentication API (WebAuthn)",
    "status": "Standard",
    "desc": "Xác thực đăng nhập sinh trắc học (vân tay, khuôn mặt FaceID) với Passkey bảo mật tuyệt đối."
  },
  {
    "name": "AuthenticatorResponse",
    "apiId": "web_authentication",
    "apiName": "Web Authentication API (WebAuthn)",
    "status": "Standard",
    "desc": "Xác thực đăng nhập sinh trắc học (vân tay, khuôn mặt FaceID) với Passkey bảo mật tuyệt đối."
  },
  {
    "name": "BackgroundFetchEvent",
    "apiId": "background_fetch",
    "apiName": "Background Fetch API",
    "status": "Experimental",
    "desc": "Tải ngầm file dung lượng lớn không lo mất kết nối khi đóng tab."
  },
  {
    "name": "BackgroundFetchManager",
    "apiId": "background_fetch",
    "apiName": "Background Fetch API",
    "status": "Experimental",
    "desc": "Tải ngầm file dung lượng lớn không lo mất kết nối khi đóng tab."
  },
  {
    "name": "BackgroundFetchRecord",
    "apiId": "background_fetch",
    "apiName": "Background Fetch API",
    "status": "Experimental",
    "desc": "Tải ngầm file dung lượng lớn không lo mất kết nối khi đóng tab."
  },
  {
    "name": "BackgroundFetchRegistration",
    "apiId": "background_fetch",
    "apiName": "Background Fetch API",
    "status": "Experimental",
    "desc": "Tải ngầm file dung lượng lớn không lo mất kết nối khi đóng tab."
  },
  {
    "name": "BackgroundFetchUpdateUIEvent",
    "apiId": "background_fetch",
    "apiName": "Background Fetch API",
    "status": "Experimental",
    "desc": "Tải ngầm file dung lượng lớn không lo mất kết nối khi đóng tab."
  },
  {
    "name": "BarcodeDetector",
    "apiId": "barcode_detection",
    "apiName": "Barcode Detection API",
    "status": "Experimental",
    "desc": "Nhận diện mã vạch và mã QR trực tiếp từ ảnh hoặc camera siêu tốc."
  },
  {
    "name": "BarProp",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "BaseAudioContext",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "BeforeInstallPromptEvent",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Non-standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "BeforeUnloadEvent",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "BiquadFilterNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "Blob",
    "apiId": "file",
    "apiName": "File API",
    "status": "Standard",
    "desc": "Đại diện và thao tác tệp tin nhị phân và đối tượng Blob."
  },
  {
    "name": "BlobEvent",
    "apiId": "file",
    "apiName": "File API",
    "status": "Standard",
    "desc": "Đại diện và thao tác tệp tin nhị phân và đối tượng Blob."
  },
  {
    "name": "Bluetooth",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Experimental",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BluetoothCharacteristicProperties",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Experimental",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BluetoothDevice",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Experimental",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BluetoothRemoteGATTCharacteristic",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Experimental",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BluetoothRemoteGATTDescriptor",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Experimental",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BluetoothRemoteGATTServer",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Experimental",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BluetoothRemoteGATTService",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Experimental",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BluetoothUUID",
    "apiId": "web_bluetooth",
    "apiName": "Web Bluetooth API",
    "status": "Standard",
    "desc": "Kết nối và trao đổi dữ liệu với thiết bị Bluetooth Low Energy (BLE)."
  },
  {
    "name": "BroadcastChannel",
    "apiId": "broadcast_channel",
    "apiName": "Broadcast Channel API",
    "status": "Standard",
    "desc": "Kênh giao tiếp 1-nhiều tức thì giữa các tab/cửa sổ cùng nguồn gốc."
  },
  {
    "name": "BrowserCaptureMediaStreamTrack",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Experimental",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "BufferedChangeEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Experimental",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "ByteLengthQueuingStrategy",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "Cache",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "CacheStorage",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "CanMakePaymentEvent",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Experimental",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "CanvasCaptureMediaStreamTrack",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "CanvasGradient",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "CanvasPattern",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "CanvasRenderingContext2D",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "CaptureController",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Experimental",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "CaretPosition",
    "apiId": "selection",
    "apiName": "Selection API",
    "status": "Standard",
    "desc": "Thao tác và kiểm soát dải văn bản đang được bôi đen trên DOM."
  },
  {
    "name": "CDATASection",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "ChannelMergerNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "ChannelSplitterNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "ChapterInformation",
    "apiId": "media_session",
    "apiName": "Media Session API",
    "status": "Experimental",
    "desc": "Tùy biến metadata bài hát và xử lý phím bấm media cứng trên tai nghe/bàn phím."
  },
  {
    "name": "CharacterBoundsUpdateEvent",
    "apiId": "virtual_keyboard",
    "apiName": "VirtualKeyboard & EditContext API",
    "status": "Experimental",
    "desc": "Kiểm soát bàn phím ảo di động và hỗ trợ bộ gõ chữ phức tạp (IME)."
  },
  {
    "name": "CharacterData",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "Client",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "Clients",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "Clipboard",
    "apiId": "clipboard",
    "apiName": "Clipboard API",
    "status": "Standard",
    "desc": "Đọc và ghi văn bản, hình ảnh trực tiếp vào khay nhớ tạm hệ thống."
  },
  {
    "name": "ClipboardChangeEvent",
    "apiId": "clipboard",
    "apiName": "Clipboard API",
    "status": "Experimental",
    "desc": "Đọc và ghi văn bản, hình ảnh trực tiếp vào khay nhớ tạm hệ thống."
  },
  {
    "name": "ClipboardEvent",
    "apiId": "clipboard",
    "apiName": "Clipboard API",
    "status": "Standard",
    "desc": "Đọc và ghi văn bản, hình ảnh trực tiếp vào khay nhớ tạm hệ thống."
  },
  {
    "name": "ClipboardItem",
    "apiId": "clipboard",
    "apiName": "Clipboard API",
    "status": "Standard",
    "desc": "Đọc và ghi văn bản, hình ảnh trực tiếp vào khay nhớ tạm hệ thống."
  },
  {
    "name": "CloseEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "CloseWatcher",
    "apiId": "popover",
    "apiName": "Popover & Modern UI API",
    "status": "Standard",
    "desc": "Quản lý cửa sổ nổi popover, sự kiện đóng thoát và lệnh tương tác gốc."
  },
  {
    "name": "COEPViolationReport",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Standard",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "CommandEvent",
    "apiId": "popover",
    "apiName": "Popover & Modern UI API",
    "status": "Standard",
    "desc": "Quản lý cửa sổ nổi popover, sự kiện đóng thoát và lệnh tương tác gốc."
  },
  {
    "name": "Comment",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "CompositionEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "CompressionStream",
    "apiId": "compression_streams",
    "apiName": "Compression Streams API",
    "status": "Standard",
    "desc": "Luồng nén và giải nén dữ liệu chuẩn gzip / deflate theo thời gian thực."
  },
  {
    "name": "console",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "ConstantSourceNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "ContactAddress",
    "apiId": "contact_picker",
    "apiName": "Contact Picker API",
    "status": "Experimental",
    "desc": "Mở danh bạ điện thoại cho người dùng chọn số điện thoại hoặc email liên hệ."
  },
  {
    "name": "ContactsManager",
    "apiId": "contact_picker",
    "apiName": "Contact Picker API",
    "status": "Experimental",
    "desc": "Mở danh bạ điện thoại cho người dùng chọn số điện thoại hoặc email liên hệ."
  },
  {
    "name": "ContentIndex",
    "apiId": "content_index",
    "apiName": "Content Index API",
    "status": "Experimental",
    "desc": "Đăng ký nội dung ngoại tuyến hiển thị trên mục tải về của trình duyệt."
  },
  {
    "name": "ContentIndexEvent",
    "apiId": "content_index",
    "apiName": "Content Index API",
    "status": "Experimental",
    "desc": "Đăng ký nội dung ngoại tuyến hiển thị trên mục tải về của trình duyệt."
  },
  {
    "name": "ContentVisibilityAutoStateChangeEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "ConvolverNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "CookieChangeEvent",
    "apiId": "cookie_store",
    "apiName": "Cookie Store API",
    "status": "Standard",
    "desc": "Thao tác cookie bất đồng bộ không làm nghẽn luồng xử lý giao diện."
  },
  {
    "name": "CookieStore",
    "apiId": "cookie_store",
    "apiName": "Cookie Store API",
    "status": "Standard",
    "desc": "Thao tác cookie bất đồng bộ không làm nghẽn luồng xử lý giao diện."
  },
  {
    "name": "CookieStoreManager",
    "apiId": "cookie_store",
    "apiName": "Cookie Store API",
    "status": "Standard",
    "desc": "Thao tác cookie bất đồng bộ không làm nghẽn luồng xử lý giao diện."
  },
  {
    "name": "CountQueuingStrategy",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "CrashReport",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Standard",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "CrashReportContext",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Experimental",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "CreateMonitor",
    "apiId": "screen_details",
    "apiName": "Window Management API",
    "status": "Experimental",
    "desc": "Quản lý hiển thị đa màn hình rời (Multi-Screen Window Placement)."
  },
  {
    "name": "Credential",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Standard",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "CredentialsContainer",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Standard",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "CropTarget",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Experimental",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "Crypto",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "CryptoKey",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "CryptoKeyPair",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "CSPViolationReport",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Standard",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "CSS",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSAnimation",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSConditionRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSContainerRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSCounterStyleRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSFontFaceDescriptors",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Standard",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "CSSFontFaceRule",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Standard",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "CSSFontFeatureValuesMap",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Experimental",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "CSSFontFeatureValuesRule",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Standard",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "CSSFontPaletteValuesRule",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Standard",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "CSSFunctionDeclarations",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Experimental",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSFunctionDescriptors",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Experimental",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSFunctionRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Experimental",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSGroupingRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSImageValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSImportRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSKeyframeRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSKeyframesRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSKeywordValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSLayerBlockRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSLayerStatementRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathClamp",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathInvert",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathMax",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathMin",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathNegate",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathProduct",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathSum",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMathValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMatrixComponent",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSMediaRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSNamespaceRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSNestedDeclarations",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSNumericArray",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSNumericValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSPageDescriptors",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSPageRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSPerspective",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSPositionTryDescriptors",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSPositionTryRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSPropertyRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSPseudoElement",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Experimental",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSRotate",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSRuleList",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSScale",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSScopeRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSSkew",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSSkewX",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSSkewY",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSStartingStyleRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSStyleDeclaration",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSStyleProperties",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSStyleRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSStyleSheet",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSStyleValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSSupportsRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSTransformComponent",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSTransformValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSTransition",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSTranslate",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSUnitValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSUnparsedValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSVariableReferenceValue",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CSSViewTransitionRule",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "CustomElementRegistry",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "CustomEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "CustomStateSet",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DataCue",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Experimental",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "DataTransfer",
    "apiId": "html_drag_and_drop",
    "apiName": "HTML Drag and Drop API",
    "status": "Standard",
    "desc": "Kéo thả tệp tin hoặc phần tử DOM trực tiếp trên trang web."
  },
  {
    "name": "DataTransferItem",
    "apiId": "html_drag_and_drop",
    "apiName": "HTML Drag and Drop API",
    "status": "Standard",
    "desc": "Kéo thả tệp tin hoặc phần tử DOM trực tiếp trên trang web."
  },
  {
    "name": "DataTransferItemList",
    "apiId": "html_drag_and_drop",
    "apiName": "HTML Drag and Drop API",
    "status": "Standard",
    "desc": "Kéo thả tệp tin hoặc phần tử DOM trực tiếp trên trang web."
  },
  {
    "name": "DecompressionStream",
    "apiId": "compression_streams",
    "apiName": "Compression Streams API",
    "status": "Standard",
    "desc": "Luồng nén và giải nén dữ liệu chuẩn gzip / deflate theo thời gian thực."
  },
  {
    "name": "DedicatedWorkerGlobalScope",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "DeferredRequestInit",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Experimental",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "DelayNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "DelegatedInkTrailPresenter",
    "apiId": "ink",
    "apiName": "Ink API",
    "status": "Experimental",
    "desc": "Vẽ nét bút cảm ứng (stylus) trực tiếp độ trễ cực thấp bỏ qua pipeline DOM."
  },
  {
    "name": "DeprecationReport",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Standard",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "DeviceMotionEvent",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "DeviceMotionEventAcceleration",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "DeviceMotionEventRotationRate",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "DeviceOrientationEvent",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "DevicePosture",
    "apiId": "device_posture",
    "apiName": "Device Posture API",
    "status": "Experimental",
    "desc": "Nhận biết tư thế gập hoặc mở của thiết bị màn hình gập (Foldable devices)."
  },
  {
    "name": "Document",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DocumentFragment",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DocumentPictureInPicture",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DocumentPictureInPictureEvent",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DocumentTimeline",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "DocumentType",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DOMException",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DOMHighResTimeStamp",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DOMImplementation",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DOMMatrix",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMMatrixReadOnly",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMParser",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DOMPoint",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMPointReadOnly",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMQuad",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMRect",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMRectList",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMRectReadOnly",
    "apiId": "canvas",
    "apiName": "Geometry Interfaces",
    "status": "Standard",
    "desc": "Cấu trúc hình học cơ bản (ma trận 4x4, điểm, hình chữ nhật) hỗ trợ vẽ và biến đổi."
  },
  {
    "name": "DOMStringList",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DOMStringMap",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DOMTokenList",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "DragEvent",
    "apiId": "html_drag_and_drop",
    "apiName": "HTML Drag and Drop API",
    "status": "Standard",
    "desc": "Kéo thả tệp tin hoặc phần tử DOM trực tiếp trên trang web."
  },
  {
    "name": "DynamicsCompressorNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "EcdhKeyDeriveParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "EcdsaParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "EcKeyGenParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "EcKeyImportParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "EditContext",
    "apiId": "virtual_keyboard",
    "apiName": "VirtualKeyboard & EditContext API",
    "status": "Experimental",
    "desc": "Kiểm soát bàn phím ảo di động và hỗ trợ bộ gõ chữ phức tạp (IME)."
  },
  {
    "name": "Element",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "ElementInternals",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "EncodedAudioChunk",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "EncodedVideoChunk",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "ErrorEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "Event",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "EventCounts",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "EventSource",
    "apiId": "server_sent_events",
    "apiName": "Server-Sent Events",
    "status": "Standard",
    "desc": "Nhận luồng dữ liệu đẩy 1 chiều liên tục từ Server qua HTTP thông thường."
  },
  {
    "name": "EventTarget",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "ExtendableCookieChangeEvent",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "ExtendableEvent",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "ExtendableMessageEvent",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "EyeDropper",
    "apiId": "eyedropper",
    "apiName": "EyeDropper API",
    "status": "Experimental",
    "desc": "Công cụ ống hút chấm màu pixel bất kỳ trên toàn màn hình máy tính."
  },
  {
    "name": "FederatedCredential",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Experimental",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "FederatedCredentialInit",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Standard",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "FetchEvent",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Standard",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "FetchLaterResult",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Experimental",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "File",
    "apiId": "file",
    "apiName": "File API",
    "status": "Standard",
    "desc": "Đại diện và thao tác tệp tin nhị phân và đối tượng Blob."
  },
  {
    "name": "FileList",
    "apiId": "file",
    "apiName": "File API",
    "status": "Standard",
    "desc": "Đại diện và thao tác tệp tin nhị phân và đối tượng Blob."
  },
  {
    "name": "FileReader",
    "apiId": "file",
    "apiName": "File API",
    "status": "Standard",
    "desc": "Đại diện và thao tác tệp tin nhị phân và đối tượng Blob."
  },
  {
    "name": "FileReaderSync",
    "apiId": "file",
    "apiName": "File API",
    "status": "Standard",
    "desc": "Đại diện và thao tác tệp tin nhị phân và đối tượng Blob."
  },
  {
    "name": "FileSystem",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemChangeRecord",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemDirectoryEntry",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemDirectoryHandle",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemDirectoryReader",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemEntry",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemFileEntry",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemFileHandle",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemHandle",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemObserver",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Non-standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemSyncAccessHandle",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FileSystemWritableFileStream",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "FocusEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "FontData",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Experimental",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "FontFace",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Standard",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "FontFaceSet",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Standard",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "FontFaceSetLoadEvent",
    "apiId": "css_font_loading",
    "apiName": "CSS Font Loading API",
    "status": "Standard",
    "desc": "Quản lý nạp font chữ linh hoạt và theo dõi sự kiện font tải xong."
  },
  {
    "name": "FormData",
    "apiId": "xmlhttprequest",
    "apiName": "XMLHttpRequest / FormData",
    "status": "Standard",
    "desc": "Giao tiếp mạng AJAX cổ điển và đóng gói dữ liệu form multipart."
  },
  {
    "name": "FormDataEvent",
    "apiId": "xmlhttprequest",
    "apiName": "XMLHttpRequest / FormData",
    "status": "Standard",
    "desc": "Giao tiếp mạng AJAX cổ điển và đóng gói dữ liệu form multipart."
  },
  {
    "name": "FragmentDirective",
    "apiId": "url",
    "apiName": "URL API",
    "status": "Standard",
    "desc": "Xây dựng, phân tích cú pháp và thao tác query parameters URL."
  },
  {
    "name": "GainNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "Gamepad",
    "apiId": "gamepad",
    "apiName": "Gamepad API",
    "status": "Standard",
    "desc": "Đọc trạng thái các phím và joystick của tay cầm chơi game."
  },
  {
    "name": "GamepadButton",
    "apiId": "gamepad",
    "apiName": "Gamepad API",
    "status": "Standard",
    "desc": "Đọc trạng thái các phím và joystick của tay cầm chơi game."
  },
  {
    "name": "GamepadEvent",
    "apiId": "gamepad",
    "apiName": "Gamepad API",
    "status": "Standard",
    "desc": "Đọc trạng thái các phím và joystick của tay cầm chơi game."
  },
  {
    "name": "GamepadHapticActuator",
    "apiId": "gamepad",
    "apiName": "Gamepad API",
    "status": "Standard",
    "desc": "Đọc trạng thái các phím và joystick của tay cầm chơi game."
  },
  {
    "name": "GamepadPose",
    "apiId": "gamepad",
    "apiName": "Gamepad API",
    "status": "Experimental",
    "desc": "Đọc trạng thái các phím và joystick của tay cầm chơi game."
  },
  {
    "name": "Geolocation",
    "apiId": "geolocation",
    "apiName": "Geolocation API",
    "status": "Standard",
    "desc": "Xác định tọa độ vị trí địa lý GPS (kinh độ, vĩ độ, độ cao)."
  },
  {
    "name": "GeolocationCoordinates",
    "apiId": "geolocation",
    "apiName": "Geolocation API",
    "status": "Standard",
    "desc": "Xác định tọa độ vị trí địa lý GPS (kinh độ, vĩ độ, độ cao)."
  },
  {
    "name": "GeolocationPosition",
    "apiId": "geolocation",
    "apiName": "Geolocation API",
    "status": "Standard",
    "desc": "Xác định tọa độ vị trí địa lý GPS (kinh độ, vĩ độ, độ cao)."
  },
  {
    "name": "GeolocationPositionError",
    "apiId": "geolocation",
    "apiName": "Geolocation API",
    "status": "Standard",
    "desc": "Xác định tọa độ vị trí địa lý GPS (kinh độ, vĩ độ, độ cao)."
  },
  {
    "name": "GestureEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Non-standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "GPU",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUAdapter",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUAdapterInfo",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUBindGroup",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUBindGroupLayout",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUBuffer",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUCanvasContext",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUCommandBuffer",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUCommandEncoder",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUCompilationInfo",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUCompilationMessage",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUComputePassEncoder",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUComputePipeline",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUDevice",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUDeviceLostInfo",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUError",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUExternalTexture",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUInternalError",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUOutOfMemoryError",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUPipelineError",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUPipelineLayout",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUQuerySet",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUQueue",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPURenderBundle",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPURenderBundleEncoder",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPURenderPassEncoder",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPURenderPipeline",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUSampler",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUShaderModule",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUSupportedFeatures",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUSupportedLimits",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUTexture",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUTextureView",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUUncapturedErrorEvent",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GPUValidationError",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "GravitySensor",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "Gyroscope",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "HashChangeEvent",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "Headers",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Standard",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "HID",
    "apiId": "webhid",
    "apiName": "WebHID API",
    "status": "Experimental",
    "desc": "Giao tiếp với thiết bị phần cứng tương tác người máy (bàn phím chuyên dụng, thiết bị đo)."
  },
  {
    "name": "HIDConnectionEvent",
    "apiId": "webhid",
    "apiName": "WebHID API",
    "status": "Experimental",
    "desc": "Giao tiếp với thiết bị phần cứng tương tác người máy (bàn phím chuyên dụng, thiết bị đo)."
  },
  {
    "name": "HIDDevice",
    "apiId": "webhid",
    "apiName": "WebHID API",
    "status": "Experimental",
    "desc": "Giao tiếp với thiết bị phần cứng tương tác người máy (bàn phím chuyên dụng, thiết bị đo)."
  },
  {
    "name": "HIDInputReportEvent",
    "apiId": "webhid",
    "apiName": "WebHID API",
    "status": "Experimental",
    "desc": "Giao tiếp với thiết bị phần cứng tương tác người máy (bàn phím chuyên dụng, thiết bị đo)."
  },
  {
    "name": "Highlight",
    "apiId": "css_custom_highlight",
    "apiName": "CSS Custom Highlight API",
    "status": "Standard",
    "desc": "Tô sáng dải văn bản tùy biến tốc độ cao bằng CSS Highlight."
  },
  {
    "name": "HighlightRegistry",
    "apiId": "css_custom_highlight",
    "apiName": "CSS Custom Highlight API",
    "status": "Standard",
    "desc": "Tô sáng dải văn bản tùy biến tốc độ cao bằng CSS Highlight."
  },
  {
    "name": "History",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "HkdfParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "HmacImportParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "HmacKeyGenParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "HTMLAnchorElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLAreaElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLAudioElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLBaseElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLBodyElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLBRElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLButtonElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLCanvasElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLCollection",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLDataElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLDataListElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLDetailsElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLDialogElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLDivElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLDListElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLDocument",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLEmbedElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLFieldSetElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLFormControlsCollection",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLFormElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLGeolocationElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Experimental",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLHeadElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLHeadingElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLHRElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLHtmlElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLIFrameElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLImageElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLInputElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLLabelElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLLegendElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLLIElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLLinkElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLMapElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLMediaElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLMenuElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLMetaElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLMeterElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLModElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLObjectElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLOListElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLOptGroupElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLOptionElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLOptionsCollection",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLOutputElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLParagraphElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLPictureElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLPreElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLProgressElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLQuoteElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLScriptElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLSelectedContentElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLSelectElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLSlotElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLSourceElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLSpanElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLStyleElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTableCaptionElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTableCellElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTableColElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTableElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTableRowElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTableSectionElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTemplateElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTextAreaElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTimeElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTitleElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLTrackElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLUListElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLUnknownElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "HTMLVideoElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "IDBCursor",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBCursorWithValue",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBDatabase",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBFactory",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBIndex",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBKeyRange",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBObjectStore",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBOpenDBRequest",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBRecord",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBRequest",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBTransaction",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IDBVersionChangeEvent",
    "apiId": "indexeddb",
    "apiName": "IndexedDB API",
    "status": "Standard",
    "desc": "Cơ sở dữ liệu NoSQL lưu trữ đối tượng dung lượng lớn trong trình duyệt."
  },
  {
    "name": "IdentityCredential",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Experimental",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "IdentityCredentialError",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Experimental",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "IdentityCredentialRequestOptions",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Standard",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "IdentityProvider",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Experimental",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "IdleDeadline",
    "apiId": "background_tasks",
    "apiName": "Background Tasks / Task Scheduling API",
    "status": "Standard",
    "desc": "Lập lịch phân chia tác vụ nền ưu tiên cao/thấp tránh lag giật giao diện."
  },
  {
    "name": "IdleDetector",
    "apiId": "idle_detection",
    "apiName": "Idle Detection API",
    "status": "Experimental",
    "desc": "Phát hiện khi người dùng rời bàn phím hoặc khoá màn hình."
  },
  {
    "name": "IIRFilterNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "ImageBitmap",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "ImageBitmapRenderingContext",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "ImageCapture",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "ImageData",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "ImageDecoder",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "ImageTrack",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Theo dõi luồng hình ảnh trích xuất từ khung hình đa phương tiện giải mã."
  },
  {
    "name": "ImageTrackList",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Theo dõi luồng hình ảnh trích xuất từ khung hình đa phương tiện giải mã."
  },
  {
    "name": "Ink",
    "apiId": "ink",
    "apiName": "Ink API",
    "status": "Experimental",
    "desc": "Vẽ nét bút cảm ứng (stylus) trực tiếp độ trễ cực thấp bỏ qua pipeline DOM."
  },
  {
    "name": "InputDeviceCapabilities",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Experimental",
    "desc": "Thông tin và năng lực phần cứng đầu vào của thiết bị người dùng."
  },
  {
    "name": "InputDeviceInfo",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thông tin và năng lực phần cứng đầu vào của thiết bị người dùng."
  },
  {
    "name": "InputEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "InstallEvent",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "IntegrityViolationReport",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Standard",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "InteractionContentfulPaint",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "InterestEvent",
    "apiId": "popover",
    "apiName": "Popover & Modern UI API",
    "status": "Non-standard",
    "desc": "Quản lý cửa sổ nổi popover, sự kiện đóng thoát và lệnh tương tác gốc."
  },
  {
    "name": "IntersectionObserver",
    "apiId": "intersection_observer",
    "apiName": "Intersection Observer API",
    "status": "Standard",
    "desc": "Theo dõi khi phần tử DOM xuất hiện trong khung nhìn (Lazy loading ảnh/video)."
  },
  {
    "name": "IntersectionObserverEntry",
    "apiId": "intersection_observer",
    "apiName": "Intersection Observer API",
    "status": "Standard",
    "desc": "Theo dõi khi phần tử DOM xuất hiện trong khung nhìn (Lazy loading ảnh/video)."
  },
  {
    "name": "Keyboard",
    "apiId": "keyboard",
    "apiName": "Keyboard API",
    "status": "Experimental",
    "desc": "Khóa phím toàn màn hình và nhận diện bố cục bàn phím vật lý."
  },
  {
    "name": "KeyboardEvent",
    "apiId": "keyboard",
    "apiName": "Keyboard API",
    "status": "Standard",
    "desc": "Khóa phím toàn màn hình và nhận diện bố cục bàn phím vật lý."
  },
  {
    "name": "KeyboardLayoutMap",
    "apiId": "keyboard",
    "apiName": "Keyboard API",
    "status": "Experimental",
    "desc": "Khóa phím toàn màn hình và nhận diện bố cục bàn phím vật lý."
  },
  {
    "name": "KeyframeEffect",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "LanguageDetector",
    "apiId": "web_speech",
    "apiName": "Built-in AI & Speech API",
    "status": "Experimental",
    "desc": "Mô hình trí tuệ nhân tạo nạp sẵn trong trình duyệt (dịch thuật, tóm tắt, nhận diện ngôn ngữ)."
  },
  {
    "name": "LanguageModel",
    "apiId": "web_speech",
    "apiName": "Built-in AI & Speech API",
    "status": "Standard",
    "desc": "Mô hình trí tuệ nhân tạo nạp sẵn trong trình duyệt (dịch thuật, tóm tắt, nhận diện ngôn ngữ)."
  },
  {
    "name": "LargestContentfulPaint",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "LaunchParams",
    "apiId": "window_controls_overlay",
    "apiName": "Window Controls Overlay & Launch API",
    "status": "Experimental",
    "desc": "Mở rộng giao diện web tràn lên thanh tiêu đề cửa sổ Desktop PWA."
  },
  {
    "name": "LaunchQueue",
    "apiId": "window_controls_overlay",
    "apiName": "Window Controls Overlay & Launch API",
    "status": "Experimental",
    "desc": "Mở rộng giao diện web tràn lên thanh tiêu đề cửa sổ Desktop PWA."
  },
  {
    "name": "LayoutShift",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "LayoutShiftAttribution",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "LinearAccelerationSensor",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "Location",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "Lock",
    "apiId": "web_locks",
    "apiName": "Web Locks API",
    "status": "Standard",
    "desc": "Khóa tài nguyên đồng bộ giữa các Tab tránh xung đột ghi đè dữ liệu."
  },
  {
    "name": "LockManager",
    "apiId": "web_locks",
    "apiName": "Web Locks API",
    "status": "Standard",
    "desc": "Khóa tài nguyên đồng bộ giữa các Tab tránh xung đột ghi đè dữ liệu."
  },
  {
    "name": "Magnetometer",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Experimental",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "ManagedMediaSource",
    "apiId": "media_source",
    "apiName": "Media Source Extensions (MSE)",
    "status": "Experimental",
    "desc": "Tiếp nhận và ghép nối các phân đoạn video truyền phát trực tiếp (HLS/DASH)."
  },
  {
    "name": "ManagedSourceBuffer",
    "apiId": "media_source",
    "apiName": "Media Source Extensions (MSE)",
    "status": "Experimental",
    "desc": "Tiếp nhận và ghép nối các phân đoạn video truyền phát trực tiếp (HLS/DASH)."
  },
  {
    "name": "MathMLAnchorElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Experimental",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "MathMLElement",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "MediaCapabilities",
    "apiId": "media_capabilities",
    "apiName": "Media Capabilities API",
    "status": "Standard",
    "desc": "Đánh giá khả năng giải mã và mã hóa video mượt mà, tiết kiệm năng lượng của máy."
  },
  {
    "name": "MediaDeviceInfo",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MediaDevices",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MediaElementAudioSourceNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "MediaEncryptedEvent",
    "apiId": "encrypted_media_extensions",
    "apiName": "Encrypted Media Extensions (EME)",
    "status": "Standard",
    "desc": "Giải mã nội dung đa phương tiện bản quyền DRM (Widevine, FairPlay)."
  },
  {
    "name": "MediaError",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Error Handling",
    "status": "Standard",
    "desc": "Mã lỗi và nguyên nhân thất bại khi nạp hoặc phát tập tin đa phương tiện."
  },
  {
    "name": "MediaKeyMessageEvent",
    "apiId": "encrypted_media_extensions",
    "apiName": "Encrypted Media Extensions (EME)",
    "status": "Standard",
    "desc": "Giải mã nội dung đa phương tiện bản quyền DRM (Widevine, FairPlay)."
  },
  {
    "name": "MediaKeys",
    "apiId": "encrypted_media_extensions",
    "apiName": "Encrypted Media Extensions (EME)",
    "status": "Standard",
    "desc": "Giải mã nội dung đa phương tiện bản quyền DRM (Widevine, FairPlay)."
  },
  {
    "name": "MediaKeySession",
    "apiId": "encrypted_media_extensions",
    "apiName": "Encrypted Media Extensions (EME)",
    "status": "Standard",
    "desc": "Giải mã nội dung đa phương tiện bản quyền DRM (Widevine, FairPlay)."
  },
  {
    "name": "MediaKeyStatusMap",
    "apiId": "encrypted_media_extensions",
    "apiName": "Encrypted Media Extensions (EME)",
    "status": "Standard",
    "desc": "Giải mã nội dung đa phương tiện bản quyền DRM (Widevine, FairPlay)."
  },
  {
    "name": "MediaKeySystemAccess",
    "apiId": "encrypted_media_extensions",
    "apiName": "Encrypted Media Extensions (EME)",
    "status": "Standard",
    "desc": "Giải mã nội dung đa phương tiện bản quyền DRM (Widevine, FairPlay)."
  },
  {
    "name": "MediaList",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM & Media Queries",
    "status": "Standard",
    "desc": "Danh sách và truy vấn điều kiện hiển thị CSS Media Query."
  },
  {
    "name": "MediaMetadata",
    "apiId": "media_session",
    "apiName": "Media Session API",
    "status": "Standard",
    "desc": "Tùy biến metadata bài hát và xử lý phím bấm media cứng trên tai nghe/bàn phím."
  },
  {
    "name": "MediaQueryList",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM & Media Queries",
    "status": "Standard",
    "desc": "Danh sách và truy vấn điều kiện hiển thị CSS Media Query."
  },
  {
    "name": "MediaQueryListEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "MediaRecorder",
    "apiId": "media_stream_recording",
    "apiName": "MediaStream Recording API",
    "status": "Standard",
    "desc": "Ghi lại luồng âm thanh/video MediaStream thành file WebM hoặc MP4."
  },
  {
    "name": "MediaSession",
    "apiId": "media_session",
    "apiName": "Media Session API",
    "status": "Standard",
    "desc": "Tùy biến metadata bài hát và xử lý phím bấm media cứng trên tai nghe/bàn phím."
  },
  {
    "name": "MediaSource",
    "apiId": "media_source",
    "apiName": "Media Source Extensions (MSE)",
    "status": "Standard",
    "desc": "Tiếp nhận và ghép nối các phân đoạn video truyền phát trực tiếp (HLS/DASH)."
  },
  {
    "name": "MediaSourceHandle",
    "apiId": "media_source",
    "apiName": "Media Source Extensions (MSE)",
    "status": "Standard",
    "desc": "Tiếp nhận và ghép nối các phân đoạn video truyền phát trực tiếp (HLS/DASH)."
  },
  {
    "name": "MediaStream",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MediaStreamAudioDestinationNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "MediaStreamAudioSourceNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "MediaStreamTrack",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MediaStreamTrackAudioSourceNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "MediaStreamTrackEvent",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MediaStreamTrackGenerator",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Non-standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MediaStreamTrackProcessor",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MediaTrackConstraints",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "MessageChannel",
    "apiId": "channel_messaging",
    "apiName": "Channel Messaging API",
    "status": "Standard",
    "desc": "Ống dẫn tin nhắn hai chiều độc lập truyền giữa các context."
  },
  {
    "name": "MessageEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "MessagePort",
    "apiId": "channel_messaging",
    "apiName": "Channel Messaging API",
    "status": "Standard",
    "desc": "Ống dẫn tin nhắn hai chiều độc lập truyền giữa các context."
  },
  {
    "name": "Metadata",
    "apiId": "file_system",
    "apiName": "File System API",
    "status": "Non-standard",
    "desc": "Đọc và ghi trực tiếp vào tệp tin/thư mục thực tế trên ổ đĩa máy tính."
  },
  {
    "name": "MIDIAccess",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MIDIConnectionEvent",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MIDIInput",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MIDIInputMap",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MIDIMessageEvent",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MIDIOutput",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MIDIOutputMap",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MIDIPort",
    "apiId": "web_midi",
    "apiName": "Web MIDI API",
    "status": "Standard",
    "desc": "Giao tiếp nhạc cụ điện tử và đàn piano MIDI trực tiếp trên web."
  },
  {
    "name": "MouseEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "MutationObserver",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "MutationRecord",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "NamedNodeMap",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "NavigateEvent",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "Navigation",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "NavigationActivation",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "NavigationCurrentEntryChangeEvent",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "NavigationDestination",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "NavigationHistoryEntry",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "NavigationPrecommitController",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "NavigationPreloadManager",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "NavigationTransition",
    "apiId": "navigation",
    "apiName": "Navigation API",
    "status": "Standard",
    "desc": "API điều hướng ứng dụng trang đơn (SPA) hiện đại với interceptor tích hợp."
  },
  {
    "name": "Navigator",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "NavigatorLogin",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "NavigatorUAData",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Experimental",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "NDEFMessage",
    "apiId": "web_nfc",
    "apiName": "Web NFC API",
    "status": "Experimental",
    "desc": "Đọc và ghi thẻ thông minh NFC tầm ngắn (Near Field Communication)."
  },
  {
    "name": "NDEFReader",
    "apiId": "web_nfc",
    "apiName": "Web NFC API",
    "status": "Experimental",
    "desc": "Đọc và ghi thẻ thông minh NFC tầm ngắn (Near Field Communication)."
  },
  {
    "name": "NDEFReadingEvent",
    "apiId": "web_nfc",
    "apiName": "Web NFC API",
    "status": "Experimental",
    "desc": "Đọc và ghi thẻ thông minh NFC tầm ngắn (Near Field Communication)."
  },
  {
    "name": "NDEFRecord",
    "apiId": "web_nfc",
    "apiName": "Web NFC API",
    "status": "Experimental",
    "desc": "Đọc và ghi thẻ thông minh NFC tầm ngắn (Near Field Communication)."
  },
  {
    "name": "NetworkInformation",
    "apiId": "network_information",
    "apiName": "Network Information API",
    "status": "Standard",
    "desc": "Đọc thông tin loại kết nối mạng (wifi, 4g, ethernet) và băng thông downlink."
  },
  {
    "name": "Node",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "NodeIterator",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "NodeList",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "Notification",
    "apiId": "notifications",
    "apiName": "Notifications API",
    "status": "Standard",
    "desc": "Hiển thị thông báo màn hình hệ điều hành cho người dùng."
  },
  {
    "name": "NotificationEvent",
    "apiId": "notifications",
    "apiName": "Notifications API",
    "status": "Standard",
    "desc": "Hiển thị thông báo màn hình hệ điều hành cho người dùng."
  },
  {
    "name": "NotRestoredReasonDetails",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "NotRestoredReasons",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "Observable",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Experimental",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "OES_draw_buffers_indexed",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "OfflineAudioCompletionEvent",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "OfflineAudioContext",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "OffscreenCanvas",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "OffscreenCanvasRenderingContext2D",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "OrientationSensor",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "OscillatorNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "OTPCredential",
    "apiId": "web_otp",
    "apiName": "WebOTP API",
    "status": "Experimental",
    "desc": "Tự động đọc mã xác thực OTP từ tin nhắn SMS khi người dùng nhận mã."
  },
  {
    "name": "OverconstrainedError",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "PageRevealEvent",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "PageSwapEvent",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "PageTransitionEvent",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "PaintRenderingContext2D",
    "apiId": "css_painting_api",
    "apiName": "CSS Painting API",
    "status": "Standard",
    "desc": "Vẽ đồ họa nền CSS bằng mã JavaScript chạy trong Paint Worklet."
  },
  {
    "name": "PaintSize",
    "apiId": "css_painting_api",
    "apiName": "CSS Painting API",
    "status": "Standard",
    "desc": "Vẽ đồ họa nền CSS bằng mã JavaScript chạy trong Paint Worklet."
  },
  {
    "name": "PaintWorkletGlobalScope",
    "apiId": "css_painting_api",
    "apiName": "CSS Painting API",
    "status": "Experimental",
    "desc": "Vẽ đồ họa nền CSS bằng mã JavaScript chạy trong Paint Worklet."
  },
  {
    "name": "PannerNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "PasswordCredential",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Experimental",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "PasswordCredentialInit",
    "apiId": "credential_management",
    "apiName": "Credential Management API",
    "status": "Standard",
    "desc": "Lưu trữ và đồng bộ thông tin đăng nhập tự động của người dùng."
  },
  {
    "name": "Path2D",
    "apiId": "canvas",
    "apiName": "Canvas API",
    "status": "Standard",
    "desc": "Ngữ cảnh và cấu trúc vẽ đồ họa 2D pixel hiệu năng cao."
  },
  {
    "name": "PaymentManager",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Experimental",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "PaymentMethodChangeEvent",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Standard",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "PaymentRequest",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Standard",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "PaymentRequestEvent",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Experimental",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "PaymentRequestUpdateEvent",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Standard",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "PaymentResponse",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Standard",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "Pbkdf2Params",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "Performance",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceElementTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceEntry",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceEventTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceLongAnimationFrameTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceLongTaskTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceMark",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceMeasure",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceNavigationTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceObserver",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceObserverEntryList",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformancePaintTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceResourceTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceScriptTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceServerTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Standard",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceSoftNavigation",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PerformanceTimingConfidence",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "PeriodicSyncEvent",
    "apiId": "background_sync",
    "apiName": "Background Sync API",
    "status": "Experimental",
    "desc": "Đồng bộ dữ liệu nền khi máy kết nối lại internet."
  },
  {
    "name": "PeriodicSyncManager",
    "apiId": "background_sync",
    "apiName": "Background Sync API",
    "status": "Experimental",
    "desc": "Đồng bộ dữ liệu nền khi máy kết nối lại internet."
  },
  {
    "name": "PeriodicWave",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "Permissions",
    "apiId": "permissions",
    "apiName": "Permissions API",
    "status": "Standard",
    "desc": "Truy vấn và giám sát trạng thái cấp quyền (Camera, Mic, GPS) của trang web."
  },
  {
    "name": "PermissionsPolicyViolationReport",
    "apiId": "permissions",
    "apiName": "Permissions API",
    "status": "Experimental",
    "desc": "Truy vấn và giám sát trạng thái cấp quyền (Camera, Mic, GPS) của trang web."
  },
  {
    "name": "PermissionStatus",
    "apiId": "permissions",
    "apiName": "Permissions API",
    "status": "Standard",
    "desc": "Truy vấn và giám sát trạng thái cấp quyền (Camera, Mic, GPS) của trang web."
  },
  {
    "name": "PictureInPictureEvent",
    "apiId": "picture_in_picture",
    "apiName": "Picture-in-Picture API",
    "status": "Standard",
    "desc": "Cửa sổ video nổi thu nhỏ ghim ở góc màn hình."
  },
  {
    "name": "PictureInPictureWindow",
    "apiId": "picture_in_picture",
    "apiName": "Picture-in-Picture API",
    "status": "Standard",
    "desc": "Cửa sổ video nổi thu nhỏ ghim ở góc màn hình."
  },
  {
    "name": "PointerEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "PopStateEvent",
    "apiId": "history",
    "apiName": "History & Lifecycle API",
    "status": "Standard",
    "desc": "Quản lý ngăn xếp lịch sử trình duyệt, điều hướng URL và vòng đời trang."
  },
  {
    "name": "PreferenceManager",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Experimental",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "PreferenceObject",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Experimental",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "Presentation",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PresentationAvailability",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PresentationConnection",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PresentationConnectionAvailableEvent",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PresentationConnectionCloseEvent",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PresentationConnectionList",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PresentationReceiver",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PresentationRequest",
    "apiId": "presentation",
    "apiName": "Presentation API",
    "status": "Experimental",
    "desc": "Chiếu nội dung trang web lên màn hình phụ hoặc TV không dây."
  },
  {
    "name": "PressureObserver",
    "apiId": "compute_pressure",
    "apiName": "Compute Pressure API",
    "status": "Experimental",
    "desc": "Theo dõi mức độ quá tải nhiệt độ và tải CPU của phần cứng theo thời gian thực."
  },
  {
    "name": "PressureRecord",
    "apiId": "compute_pressure",
    "apiName": "Compute Pressure API",
    "status": "Experimental",
    "desc": "Theo dõi mức độ quá tải nhiệt độ và tải CPU của phần cứng theo thời gian thực."
  },
  {
    "name": "ProcessingInstruction",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "Profiler",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "ProgressEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "PromiseRejectionEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "PublicKeyCredential",
    "apiId": "web_authentication",
    "apiName": "Web Authentication API (WebAuthn)",
    "status": "Standard",
    "desc": "Xác thực đăng nhập sinh trắc học (vân tay, khuôn mặt FaceID) với Passkey bảo mật tuyệt đối."
  },
  {
    "name": "PublicKeyCredentialCreationOptions",
    "apiId": "web_authentication",
    "apiName": "Web Authentication API (WebAuthn)",
    "status": "Standard",
    "desc": "Xác thực đăng nhập sinh trắc học (vân tay, khuôn mặt FaceID) với Passkey bảo mật tuyệt đối."
  },
  {
    "name": "PublicKeyCredentialRequestOptions",
    "apiId": "web_authentication",
    "apiName": "Web Authentication API (WebAuthn)",
    "status": "Standard",
    "desc": "Xác thực đăng nhập sinh trắc học (vân tay, khuôn mặt FaceID) với Passkey bảo mật tuyệt đối."
  },
  {
    "name": "PushEvent",
    "apiId": "push_api",
    "apiName": "Push API",
    "status": "Standard",
    "desc": "Nhận thông điệp đẩy từ máy chủ ngay cả khi trang web đang đóng."
  },
  {
    "name": "PushManager",
    "apiId": "push_api",
    "apiName": "Push API",
    "status": "Standard",
    "desc": "Nhận thông điệp đẩy từ máy chủ ngay cả khi trang web đang đóng."
  },
  {
    "name": "PushMessageData",
    "apiId": "push_api",
    "apiName": "Push API",
    "status": "Standard",
    "desc": "Nhận thông điệp đẩy từ máy chủ ngay cả khi trang web đang đóng."
  },
  {
    "name": "PushSubscription",
    "apiId": "push_api",
    "apiName": "Push API",
    "status": "Standard",
    "desc": "Nhận thông điệp đẩy từ máy chủ ngay cả khi trang web đang đóng."
  },
  {
    "name": "PushSubscriptionOptions",
    "apiId": "push_api",
    "apiName": "Push API",
    "status": "Standard",
    "desc": "Nhận thông điệp đẩy từ máy chủ ngay cả khi trang web đang đóng."
  },
  {
    "name": "QuotaExceededError",
    "apiId": "web_storage",
    "apiName": "Web Storage API",
    "status": "Experimental",
    "desc": "Lưu trữ cục bộ dạng khóa-giá trị đơn giản (localStorage, sessionStorage)."
  },
  {
    "name": "RadioNodeList",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "Range",
    "apiId": "selection",
    "apiName": "Selection API",
    "status": "Standard",
    "desc": "Thao tác và kiểm soát dải văn bản đang được bôi đen trên DOM."
  },
  {
    "name": "ReadableByteStreamController",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "ReadableStream",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "ReadableStreamBYOBReader",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "ReadableStreamBYOBRequest",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "ReadableStreamDefaultController",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "ReadableStreamDefaultReader",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "RelativeOrientationSensor",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "RemotePlayback",
    "apiId": "presentation",
    "apiName": "Remote Playback API",
    "status": "Standard",
    "desc": "Điều khiển phát media không dây lên Smart TV hoặc thiết bị Chromecast."
  },
  {
    "name": "ReportingObserver",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Standard",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "Request",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Standard",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "RequestInit",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Standard",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "ResizeObserver",
    "apiId": "resize_observer",
    "apiName": "Resize Observer API",
    "status": "Standard",
    "desc": "Theo dõi sự thay đổi kích thước chính xác của các phần tử DOM."
  },
  {
    "name": "ResizeObserverEntry",
    "apiId": "resize_observer",
    "apiName": "Resize Observer API",
    "status": "Standard",
    "desc": "Theo dõi sự thay đổi kích thước chính xác của các phần tử DOM."
  },
  {
    "name": "ResizeObserverSize",
    "apiId": "resize_observer",
    "apiName": "Resize Observer API",
    "status": "Standard",
    "desc": "Theo dõi sự thay đổi kích thước chính xác của các phần tử DOM."
  },
  {
    "name": "Response",
    "apiId": "fetch",
    "apiName": "Fetch API",
    "status": "Standard",
    "desc": "Gọi yêu cầu mạng HTTP bất đồng bộ hiện đại tích hợp tín hiệu hủy AbortSignal."
  },
  {
    "name": "RestrictionTarget",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Experimental",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "RsaHashedImportParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "RsaHashedKeyGenParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "RsaOaepParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "RsaPssParams",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "RTCAudioSourceStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCCertificate",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCCertificateStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCCodecStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCDataChannel",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCDataChannelEvent",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCDataChannelStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCDtlsTransport",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCDTMFSender",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCDTMFToneChangeEvent",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCEncodedAudioFrame",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCEncodedVideoFrame",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCError",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCErrorEvent",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCIceCandidate",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCIceCandidatePair",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Experimental",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCIceCandidatePairStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCIceCandidateStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCIceParameters",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCIceTransport",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCIdentityAssertion",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Experimental",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCInboundRtpStreamStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCOutboundRtpStreamStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCPeerConnection",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCPeerConnectionIceErrorEvent",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCPeerConnectionIceEvent",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCPeerConnectionStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCRemoteInboundRtpStreamStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCRemoteOutboundRtpStreamStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCRtpReceiver",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCRtpScriptTransform",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCRtpScriptTransformer",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCRtpSender",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCRtpTransceiver",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCSctpTransport",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCSessionDescription",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCStatsReport",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCTrackEvent",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCTransformEvent",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCTransportStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "RTCVideoSourceStats",
    "apiId": "webrtc",
    "apiName": "WebRTC API",
    "status": "Standard",
    "desc": "Giao tiếp thời gian thực P2P (đàm thoại video, audio, truyền dữ liệu DataChannel)."
  },
  {
    "name": "Sanitizer",
    "apiId": "html_sanitizer",
    "apiName": "HTML Sanitizer API",
    "status": "Standard",
    "desc": "Làm sạch chuỗi HTML an toàn tuyệt đối chống tấn công XSS."
  },
  {
    "name": "SanitizerConfig",
    "apiId": "html_sanitizer",
    "apiName": "HTML Sanitizer API",
    "status": "Standard",
    "desc": "Làm sạch chuỗi HTML an toàn tuyệt đối chống tấn công XSS."
  },
  {
    "name": "Scheduler",
    "apiId": "background_tasks",
    "apiName": "Background Tasks / Task Scheduling API",
    "status": "Standard",
    "desc": "Lập lịch phân chia tác vụ nền ưu tiên cao/thấp tránh lag giật giao diện."
  },
  {
    "name": "Screen",
    "apiId": "screen_orientation",
    "apiName": "Screen Orientation API",
    "status": "Standard",
    "desc": "Đọc và khóa hướng hiển thị màn hình (ngang landscape hoặc dọc portrait)."
  },
  {
    "name": "ScreenDetailed",
    "apiId": "screen_details",
    "apiName": "Window Management API",
    "status": "Experimental",
    "desc": "Quản lý hiển thị đa màn hình rời (Multi-Screen Window Placement)."
  },
  {
    "name": "ScreenDetails",
    "apiId": "screen_details",
    "apiName": "Window Management API",
    "status": "Experimental",
    "desc": "Quản lý hiển thị đa màn hình rời (Multi-Screen Window Placement)."
  },
  {
    "name": "ScreenOrientation",
    "apiId": "screen_orientation",
    "apiName": "Screen Orientation API",
    "status": "Standard",
    "desc": "Đọc và khóa hướng hiển thị màn hình (ngang landscape hoặc dọc portrait)."
  },
  {
    "name": "ScrollTimeline",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "SecurePaymentConfirmationRequest",
    "apiId": "payment_request",
    "apiName": "Payment Request API",
    "status": "Standard",
    "desc": "Khởi chạy giao diện thanh toán gốc của hệ điều hành (Apple Pay / Google Pay)."
  },
  {
    "name": "SecurityPolicyViolationEvent",
    "apiId": "reporting",
    "apiName": "Reporting API",
    "status": "Standard",
    "desc": "Ghi nhận và báo cáo tự động các sự cố CSP, COOP, lỗi bảo mật về máy chủ."
  },
  {
    "name": "Selection",
    "apiId": "selection",
    "apiName": "Selection API",
    "status": "Standard",
    "desc": "Thao tác và kiểm soát dải văn bản đang được bôi đen trên DOM."
  },
  {
    "name": "Sensor",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "SensorErrorEvent",
    "apiId": "device_orientation",
    "apiName": "Device Orientation & Sensor API",
    "status": "Standard",
    "desc": "Đo chuyển động gia tốc 3D, độ nghiêng con quay hồi chuyển và độ sáng môi trường."
  },
  {
    "name": "Serial",
    "apiId": "web_serial",
    "apiName": "Web Serial API",
    "status": "Standard",
    "desc": "Giao tiếp cổng COM nối tiếp với vi điều khiển (Arduino, ESP32)."
  },
  {
    "name": "SerialPort",
    "apiId": "web_serial",
    "apiName": "Web Serial API",
    "status": "Standard",
    "desc": "Giao tiếp cổng COM nối tiếp với vi điều khiển (Arduino, ESP32)."
  },
  {
    "name": "ServiceWorker",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "ServiceWorkerContainer",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "ServiceWorkerGlobalScope",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "ServiceWorkerRegistration",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "ShadowRoot",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "SharedWorker",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "SharedWorkerGlobalScope",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "SnapEvent",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Experimental",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "SourceBuffer",
    "apiId": "media_source",
    "apiName": "Media Source Extensions (MSE)",
    "status": "Standard",
    "desc": "Tiếp nhận và ghép nối các phân đoạn video truyền phát trực tiếp (HLS/DASH)."
  },
  {
    "name": "SourceBufferList",
    "apiId": "media_source",
    "apiName": "Media Source Extensions (MSE)",
    "status": "Standard",
    "desc": "Tiếp nhận và ghép nối các phân đoạn video truyền phát trực tiếp (HLS/DASH)."
  },
  {
    "name": "SpeechRecognition",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechRecognitionAlternative",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechRecognitionErrorEvent",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechRecognitionEvent",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechRecognitionPhrase",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Experimental",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechRecognitionResult",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechRecognitionResultList",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechSynthesis",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechSynthesisErrorEvent",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechSynthesisEvent",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechSynthesisUtterance",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "SpeechSynthesisVoice",
    "apiId": "web_speech",
    "apiName": "Web Speech API",
    "status": "Standard",
    "desc": "Chuyển đổi giọng nói thành văn bản (STT) và đọc văn bản thành tiếng nói (TTS)."
  },
  {
    "name": "StaticRange",
    "apiId": "selection",
    "apiName": "Selection API",
    "status": "Standard",
    "desc": "Thao tác và kiểm soát dải văn bản đang được bôi đen trên DOM."
  },
  {
    "name": "StereoPannerNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "Storage",
    "apiId": "web_storage",
    "apiName": "Web Storage API",
    "status": "Standard",
    "desc": "Lưu trữ cục bộ dạng khóa-giá trị đơn giản (localStorage, sessionStorage)."
  },
  {
    "name": "StorageAccessHandle",
    "apiId": "web_storage",
    "apiName": "Web Storage API",
    "status": "Standard",
    "desc": "Lưu trữ cục bộ dạng khóa-giá trị đơn giản (localStorage, sessionStorage)."
  },
  {
    "name": "StorageEvent",
    "apiId": "web_storage",
    "apiName": "Web Storage API",
    "status": "Standard",
    "desc": "Lưu trữ cục bộ dạng khóa-giá trị đơn giản (localStorage, sessionStorage)."
  },
  {
    "name": "StorageManager",
    "apiId": "web_storage",
    "apiName": "Web Storage API",
    "status": "Standard",
    "desc": "Lưu trữ cục bộ dạng khóa-giá trị đơn giản (localStorage, sessionStorage)."
  },
  {
    "name": "StylePropertyMap",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "StylePropertyMapReadOnly",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "StyleSheet",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "StyleSheetList",
    "apiId": "css_typed_om",
    "apiName": "CSS Typed OM API",
    "status": "Standard",
    "desc": "Mô hình đối tượng CSS kiểu hóa (Typed OM) giúp tính toán style siêu tốc, tránh parse chuỗi."
  },
  {
    "name": "SubmitEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "Subscriber",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Experimental",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "SubtleCrypto",
    "apiId": "web_crypto",
    "apiName": "Web Crypto API",
    "status": "Standard",
    "desc": "Mật mã học web: sinh số ngẫu nhiên an toàn, mã hóa đối xứng/bất đối xứng, ký số SHA/HMAC."
  },
  {
    "name": "Summarizer",
    "apiId": "web_speech",
    "apiName": "Built-in AI & Speech API",
    "status": "Experimental",
    "desc": "Mô hình trí tuệ nhân tạo nạp sẵn trong trình duyệt (dịch thuật, tóm tắt, nhận diện ngôn ngữ)."
  },
  {
    "name": "SVGAElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAngle",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedAngle",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedBoolean",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedEnumeration",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedInteger",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedLength",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedLengthList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedNumber",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedNumberList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedPreserveAspectRatio",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedRect",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedString",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimatedTransformList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimateElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimateMotionElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimateTransformElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGAnimationElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGCircleElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGClipPathElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGComponentTransferFunctionElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGDefsElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGDescElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGEllipseElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEBlendElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEColorMatrixElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEComponentTransferElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFECompositeElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEConvolveMatrixElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEDiffuseLightingElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEDisplacementMapElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEDistantLightElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEDropShadowElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEFloodElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEFuncAElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEFuncBElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEFuncGElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEFuncRElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEGaussianBlurElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEImageElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEMergeElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEMergeNodeElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEMorphologyElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEOffsetElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFEPointLightElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFESpecularLightingElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFESpotLightElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFETileElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFETurbulenceElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGFilterElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGForeignObjectElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGGElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGGeometryElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGGradientElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGGraphicsElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGImageElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGLength",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGLengthList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGLinearGradientElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGLineElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGMarkerElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGMaskElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGMetadataElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGMPathElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGNumber",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGNumberList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGPathElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGPatternElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGPointList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGPolygonElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGPolylineElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGPreserveAspectRatio",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGRadialGradientElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGRect",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGRectElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGScriptElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGSetElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGStopElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGStringList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGStyleElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGSVGElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGSwitchElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGSymbolElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTextContentElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTextElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTextPathElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTextPositioningElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTitleElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTransform",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTransformList",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGTSpanElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGUnitTypes",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGUseElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SVGViewElement",
    "apiId": "canvas",
    "apiName": "Canvas / SVG Graphics",
    "status": "Standard",
    "desc": "Đồ họa vector tương tác SVG nhúng trong trang web."
  },
  {
    "name": "SyncEvent",
    "apiId": "background_sync",
    "apiName": "Background Sync API",
    "status": "Standard",
    "desc": "Đồng bộ dữ liệu nền khi máy kết nối lại internet."
  },
  {
    "name": "SyncManager",
    "apiId": "background_sync",
    "apiName": "Background Sync API",
    "status": "Standard",
    "desc": "Đồng bộ dữ liệu nền khi máy kết nối lại internet."
  },
  {
    "name": "TaskAttributionTiming",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "TaskController",
    "apiId": "background_tasks",
    "apiName": "Background Tasks / Task Scheduling API",
    "status": "Standard",
    "desc": "Lập lịch phân chia tác vụ nền ưu tiên cao/thấp tránh lag giật giao diện."
  },
  {
    "name": "TaskPriorityChangeEvent",
    "apiId": "background_tasks",
    "apiName": "Background Tasks / Task Scheduling API",
    "status": "Standard",
    "desc": "Lập lịch phân chia tác vụ nền ưu tiên cao/thấp tránh lag giật giao diện."
  },
  {
    "name": "TaskSignal",
    "apiId": "background_tasks",
    "apiName": "Background Tasks / Task Scheduling API",
    "status": "Standard",
    "desc": "Lập lịch phân chia tác vụ nền ưu tiên cao/thấp tránh lag giật giao diện."
  },
  {
    "name": "Text",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "TextDecoder",
    "apiId": "encoding",
    "apiName": "Encoding API",
    "status": "Standard",
    "desc": "Mã hóa chuỗi văn bản thành byte UTF-8 và giải mã byte thành văn bản."
  },
  {
    "name": "TextDecoderStream",
    "apiId": "encoding",
    "apiName": "Encoding API",
    "status": "Standard",
    "desc": "Mã hóa chuỗi văn bản thành byte UTF-8 và giải mã byte thành văn bản."
  },
  {
    "name": "TextEncoder",
    "apiId": "encoding",
    "apiName": "Encoding API",
    "status": "Standard",
    "desc": "Mã hóa chuỗi văn bản thành byte UTF-8 và giải mã byte thành văn bản."
  },
  {
    "name": "TextEncoderStream",
    "apiId": "encoding",
    "apiName": "Encoding API",
    "status": "Standard",
    "desc": "Mã hóa chuỗi văn bản thành byte UTF-8 và giải mã byte thành văn bản."
  },
  {
    "name": "TextFormat",
    "apiId": "virtual_keyboard",
    "apiName": "VirtualKeyboard & EditContext API",
    "status": "Experimental",
    "desc": "Kiểm soát bàn phím ảo di động và hỗ trợ bộ gõ chữ phức tạp (IME)."
  },
  {
    "name": "TextFormatUpdateEvent",
    "apiId": "virtual_keyboard",
    "apiName": "VirtualKeyboard & EditContext API",
    "status": "Experimental",
    "desc": "Kiểm soát bàn phím ảo di động và hỗ trợ bộ gõ chữ phức tạp (IME)."
  },
  {
    "name": "TextMetrics",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "TextTrack",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "TextTrackCue",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "TextTrackCueList",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "TextTrackList",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "TextUpdateEvent",
    "apiId": "virtual_keyboard",
    "apiName": "VirtualKeyboard & EditContext API",
    "status": "Experimental",
    "desc": "Kiểm soát bàn phím ảo di động và hỗ trợ bộ gõ chữ phức tạp (IME)."
  },
  {
    "name": "TimeEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "TimeRanges",
    "apiId": "media_capture_and_streams",
    "apiName": "Media Capture and Streams API",
    "status": "Standard",
    "desc": "Thu âm thanh, hình ảnh camera hoặc quay màn hình thời gian thực."
  },
  {
    "name": "ToggleEvent",
    "apiId": "popover",
    "apiName": "Popover & Modern UI API",
    "status": "Standard",
    "desc": "Quản lý cửa sổ nổi popover, sự kiện đóng thoát và lệnh tương tác gốc."
  },
  {
    "name": "Touch",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "TouchEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "TouchList",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "TrackEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "TransformStream",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "TransformStreamDefaultController",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "TransitionEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "Translator",
    "apiId": "web_speech",
    "apiName": "Built-in AI & Speech API",
    "status": "Experimental",
    "desc": "Mô hình trí tuệ nhân tạo nạp sẵn trong trình duyệt (dịch thuật, tóm tắt, nhận diện ngôn ngữ)."
  },
  {
    "name": "TreeWalker",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "TrustedHTML",
    "apiId": "trusted_types",
    "apiName": "Trusted Types API",
    "status": "Standard",
    "desc": "Bảo vệ mã nguồn chống tiêm nhiễm mã độc XSS dựa trên kiểu dữ liệu tin cậy."
  },
  {
    "name": "TrustedScript",
    "apiId": "trusted_types",
    "apiName": "Trusted Types API",
    "status": "Standard",
    "desc": "Bảo vệ mã nguồn chống tiêm nhiễm mã độc XSS dựa trên kiểu dữ liệu tin cậy."
  },
  {
    "name": "TrustedScriptURL",
    "apiId": "trusted_types",
    "apiName": "Trusted Types API",
    "status": "Standard",
    "desc": "Bảo vệ mã nguồn chống tiêm nhiễm mã độc XSS dựa trên kiểu dữ liệu tin cậy."
  },
  {
    "name": "TrustedTypePolicy",
    "apiId": "trusted_types",
    "apiName": "Trusted Types API",
    "status": "Standard",
    "desc": "Bảo vệ mã nguồn chống tiêm nhiễm mã độc XSS dựa trên kiểu dữ liệu tin cậy."
  },
  {
    "name": "TrustedTypePolicyFactory",
    "apiId": "trusted_types",
    "apiName": "Trusted Types API",
    "status": "Standard",
    "desc": "Bảo vệ mã nguồn chống tiêm nhiễm mã độc XSS dựa trên kiểu dữ liệu tin cậy."
  },
  {
    "name": "UIEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "URL",
    "apiId": "url",
    "apiName": "URL API",
    "status": "Standard",
    "desc": "Xây dựng, phân tích cú pháp và thao tác query parameters URL."
  },
  {
    "name": "URLPattern",
    "apiId": "url_pattern",
    "apiName": "URL Pattern API",
    "status": "Standard",
    "desc": "Khớp và trích xuất tham số từ URL theo mẫu regex tiêu chuẩn."
  },
  {
    "name": "URLSearchParams",
    "apiId": "url",
    "apiName": "URL API",
    "status": "Standard",
    "desc": "Xây dựng, phân tích cú pháp và thao tác query parameters URL."
  },
  {
    "name": "USB",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBAlternateInterface",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBConfiguration",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBConnectionEvent",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBDevice",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBEndpoint",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBInterface",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBInTransferResult",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBIsochronousInTransferPacket",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBIsochronousInTransferResult",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBIsochronousOutTransferPacket",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBIsochronousOutTransferResult",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "USBOutTransferResult",
    "apiId": "webusb",
    "apiName": "WebUSB API",
    "status": "Experimental",
    "desc": "Giao tiếp trực tiếp với thiết bị phần cứng cắm qua cổng USB."
  },
  {
    "name": "UserActivation",
    "apiId": "permissions",
    "apiName": "Permissions API",
    "status": "Standard",
    "desc": "Truy vấn và giám sát trạng thái cấp quyền (Camera, Mic, GPS) của trang web."
  },
  {
    "name": "ValidityState",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện cấu trúc phần tử, đối tượng DOM và API nền tảng của trang web."
  },
  {
    "name": "VideoColorSpace",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "VideoDecoder",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "VideoEncoder",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "VideoFrame",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "VideoPlaybackQuality",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "VideoTrack",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "VideoTrackGenerator",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Experimental",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "VideoTrackList",
    "apiId": "webcodecs",
    "apiName": "WebCodecs API",
    "status": "Standard",
    "desc": "Xử lý giải mã và mã hóa khung hình đa phương tiện (Video/Audio) trực tiếp với GPU."
  },
  {
    "name": "Viewport",
    "apiId": "visual_viewport",
    "apiName": "Visual Viewport API",
    "status": "Experimental",
    "desc": "Xác định kích thước hiển thị thực tế khi bàn phím ảo hoặc phóng to trang web kích hoạt."
  },
  {
    "name": "ViewTimeline",
    "apiId": "web_animations",
    "apiName": "Web Animations API",
    "status": "Standard",
    "desc": "Điều khiển chuyển động, trục thời gian và hiệu ứng đồ họa hoạt hoạ CSS/JS."
  },
  {
    "name": "ViewTransition",
    "apiId": "view_transition",
    "apiName": "View Transition API",
    "status": "Standard",
    "desc": "Hiệu ứng chuyển trang mượt mà giữa các giao diện web SPA và MPA."
  },
  {
    "name": "ViewTransitionTypeSet",
    "apiId": "view_transition",
    "apiName": "View Transition API",
    "status": "Standard",
    "desc": "Hiệu ứng chuyển trang mượt mà giữa các giao diện web SPA và MPA."
  },
  {
    "name": "VirtualKeyboard",
    "apiId": "virtual_keyboard",
    "apiName": "VirtualKeyboard & EditContext API",
    "status": "Experimental",
    "desc": "Kiểm soát bàn phím ảo di động và hỗ trợ bộ gõ chữ phức tạp (IME)."
  },
  {
    "name": "VisibilityStateEntry",
    "apiId": "performance",
    "apiName": "Performance API",
    "status": "Experimental",
    "desc": "Đo lường thời gian tải, chỉ số Core Web Vitals và benchmark hiệu năng code."
  },
  {
    "name": "VisualViewport",
    "apiId": "visual_viewport",
    "apiName": "Visual Viewport API",
    "status": "Standard",
    "desc": "Xác định kích thước hiển thị thực tế khi bàn phím ảo hoặc phóng to trang web kích hoạt."
  },
  {
    "name": "VTTCue",
    "apiId": "media_capture_and_streams",
    "apiName": "WebVTT API",
    "status": "Standard",
    "desc": "Định dạng và hiển thị phụ đề video đồng bộ theo mốc thời gian."
  },
  {
    "name": "VTTRegion",
    "apiId": "media_capture_and_streams",
    "apiName": "WebVTT API",
    "status": "Standard",
    "desc": "Định dạng và hiển thị phụ đề video đồng bộ theo mốc thời gian."
  },
  {
    "name": "WakeLock",
    "apiId": "screen_wake_lock",
    "apiName": "Screen Wake Lock API",
    "status": "Standard",
    "desc": "Giữ màn hình thiết bị luôn bật sáng khi đọc sách hoặc xem tài liệu."
  },
  {
    "name": "WakeLockSentinel",
    "apiId": "screen_wake_lock",
    "apiName": "Screen Wake Lock API",
    "status": "Standard",
    "desc": "Giữ màn hình thiết bị luôn bật sáng khi đọc sách hoặc xem tài liệu."
  },
  {
    "name": "WaveShaperNode",
    "apiId": "web_audio",
    "apiName": "Web Audio API",
    "status": "Standard",
    "desc": "Nút hoặc thành phần xử lý đồ thị âm thanh chuyên nghiệp Web Audio."
  },
  {
    "name": "WebGL2RenderingContext",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLActiveInfo",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLBuffer",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLContextEvent",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLFramebuffer",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLObject",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Experimental",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLProgram",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLQuery",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLRenderbuffer",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLRenderingContext",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLSampler",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLShader",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLShaderPrecisionFormat",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLSync",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLTexture",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLTransformFeedback",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLUniformLocation",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebGLVertexArrayObject",
    "apiId": "webgl",
    "apiName": "WebGL API",
    "status": "Standard",
    "desc": "Đồ họa 3D tương tác trên nền tảng OpenGL ES trong thẻ Canvas."
  },
  {
    "name": "WebSocket",
    "apiId": "websockets",
    "apiName": "WebSockets API",
    "status": "Standard",
    "desc": "Kết nối song công 2 chiều liên tục qua một socket TCP duy nhất."
  },
  {
    "name": "WebSocketStream",
    "apiId": "websockets",
    "apiName": "WebSockets API",
    "status": "Non-standard",
    "desc": "Kết nối song công 2 chiều liên tục qua một socket TCP duy nhất."
  },
  {
    "name": "WebTransport",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WebTransportBidirectionalStream",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WebTransportDatagramDuplexStream",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WebTransportDatagramsWritable",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WebTransportError",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WebTransportReceiveStream",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WebTransportSendGroup",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WebTransportSendStream",
    "apiId": "webtransport",
    "apiName": "WebTransport API",
    "status": "Standard",
    "desc": "Giao thức truyền thông hai chiều độ trễ cực thấp chạy trên HTTP/3 và QUIC."
  },
  {
    "name": "WGSLLanguageFeatures",
    "apiId": "webgpu",
    "apiName": "WebGPU API",
    "status": "Standard",
    "desc": "Đối tượng đồ họa và tính toán GPU thế hệ mới chuẩn WebGPU và ngôn ngữ WGSL."
  },
  {
    "name": "WheelEvent",
    "apiId": "pointer_events",
    "apiName": "DOM Events API",
    "status": "Standard",
    "desc": "Mô hình xử lý và phát luồng sự kiện tương tác trên tài liệu web."
  },
  {
    "name": "Window",
    "apiId": "canvas",
    "apiName": "DOM & HTML Window API",
    "status": "Standard",
    "desc": "Đối tượng toàn cục đại diện cho cửa sổ duyệt web chứa cây tài liệu DOM."
  },
  {
    "name": "WindowClient",
    "apiId": "service_worker",
    "apiName": "Service Worker API",
    "status": "Standard",
    "desc": "Bộ đệm mạng chạy nền quản lý offline cache, cập nhật ngầm và trải nghiệm PWA."
  },
  {
    "name": "WindowControlsOverlay",
    "apiId": "window_controls_overlay",
    "apiName": "Window Controls Overlay & Launch API",
    "status": "Experimental",
    "desc": "Mở rộng giao diện web tràn lên thanh tiêu đề cửa sổ Desktop PWA."
  },
  {
    "name": "WindowControlsOverlayGeometryChangeEvent",
    "apiId": "window_controls_overlay",
    "apiName": "Window Controls Overlay & Launch API",
    "status": "Experimental",
    "desc": "Mở rộng giao diện web tràn lên thanh tiêu đề cửa sổ Desktop PWA."
  },
  {
    "name": "Worker",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "WorkerGlobalScope",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "WorkerLocation",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "WorkerNavigator",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "Worklet",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "WorkletGlobalScope",
    "apiId": "web_workers",
    "apiName": "Web Workers API",
    "status": "Standard",
    "desc": "Chạy đa luồng tính toán độc lập không chặn luồng render chính."
  },
  {
    "name": "WritableStream",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "WritableStreamDefaultController",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "WritableStreamDefaultWriter",
    "apiId": "streams",
    "apiName": "Streams API",
    "status": "Standard",
    "desc": "Xử lý luồng dữ liệu liên tục theo cơ chế chunking và backpressure."
  },
  {
    "name": "XMLDocument",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện đối tượng XMLDocument chuẩn MDN Web Docs."
  },
  {
    "name": "XMLHttpRequest",
    "apiId": "xmlhttprequest",
    "apiName": "XMLHttpRequest / FormData",
    "status": "Standard",
    "desc": "Giao tiếp mạng AJAX cổ điển và đóng gói dữ liệu form multipart."
  },
  {
    "name": "XMLHttpRequestEventTarget",
    "apiId": "xmlhttprequest",
    "apiName": "XMLHttpRequest / FormData",
    "status": "Standard",
    "desc": "Giao tiếp mạng AJAX cổ điển và đóng gói dữ liệu form multipart."
  },
  {
    "name": "XMLHttpRequestUpload",
    "apiId": "xmlhttprequest",
    "apiName": "XMLHttpRequest / FormData",
    "status": "Standard",
    "desc": "Giao tiếp mạng AJAX cổ điển và đóng gói dữ liệu form multipart."
  },
  {
    "name": "XMLSerializer",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện đối tượng XMLSerializer chuẩn MDN Web Docs."
  },
  {
    "name": "XPathEvaluator",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện đối tượng XPathEvaluator chuẩn MDN Web Docs."
  },
  {
    "name": "XPathExpression",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện đối tượng XPathExpression chuẩn MDN Web Docs."
  },
  {
    "name": "XPathResult",
    "apiId": "canvas",
    "apiName": "DOM & HTML Standard API",
    "status": "Standard",
    "desc": "Giao diện đối tượng XPathResult chuẩn MDN Web Docs."
  },
  {
    "name": "XRAnchor",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRAnchorSet",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRBoundedReferenceSpace",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRCompositionLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRCPUDepthInformation",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRCubeLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRCylinderLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRDepthInformation",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XREquirectLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRFrame",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRHand",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRHitTestResult",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRHitTestSource",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRInputSource",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRInputSourceArray",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRInputSourceEvent",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRInputSourcesChangeEvent",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRJointPose",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRJointSpace",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRLayerEvent",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRLightEstimate",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRLightProbe",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRMediaBinding",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRPose",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRProjectionLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRQuadLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRRay",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRReferenceSpace",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRReferenceSpaceEvent",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRRenderState",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRRigidTransform",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRSession",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRSessionEvent",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRSpace",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRSubImage",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRSystem",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRTransientInputHitTestResult",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRTransientInputHitTestSource",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRView",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRViewerPose",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRViewport",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Standard",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRVisibilityMaskChangeEvent",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRWebGLBinding",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRWebGLDepthInformation",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRWebGLLayer",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  },
  {
    "name": "XRWebGLSubImage",
    "apiId": "webxr",
    "apiName": "WebXR Device API",
    "status": "Experimental",
    "desc": "Trải nghiệm không gian thực tế ảo (VR) và thực tế tăng cường (AR)."
  }
];

  window.MDN_INTERFACES_DATA = MDN_INTERFACES_DATA;
})(window);
