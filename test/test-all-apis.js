// test/test-all-apis.js - Bộ kiểm thử tự động toàn diện cho 94 Web APIs Labs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('===========================================================');
console.log('🧪 MDN WEB APIS INTERACTIVE LABS - AUTOMATED TEST SUITE');
console.log('===========================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✔ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✖ [FAIL] ${testName}: ${details}`);
    failures.push({ testName, details });
  }
}

// -------------------------------------------------------------
// SUITE 1: Kiểm tra cấu hình và metadata trung tâm (api-data.js)
// -------------------------------------------------------------
console.log('📦 SUITE 1: Kiểm Tra Cấu Hình Metadata Trung Tâm (api-data.js)');
const apiDataPath = path.join(__dirname, '../webapis/shared/api-data.js');
assert(fs.existsSync(apiDataPath), 'Tệp webapis/shared/api-data.js tồn tại');

const apiDataContent = fs.readFileSync(apiDataPath, 'utf8');
const fakeWin = {};
try {
  vm.runInNewContext(apiDataContent, { window: fakeWin });
} catch (e) {
  assert(false, 'Biên dịch api-data.js không có lỗi cú pháp', e.message);
}

const apis = fakeWin.MDN_WEB_APIS_DATA || [];
assert(apis.length === 94, `Chứa đủ 94 Web APIs chuẩn (hiện tại: ${apis.length})`);

// Kiểm tra tính đầy đủ của từng API
let validMetaCount = 0;
apis.forEach(api => {
  if (api.id && api.name && api.category && api.path && api.support && api.why && api.whenToUse && api.whenNotToUse) {
    validMetaCount++;
  }
});
assert(validMetaCount === 94, 'Tất cả 94 Web APIs có đủ metadata (id, name, path, why, whenToUse, whenNotToUse, support)');

// -------------------------------------------------------------
// SUITE 2: Kiểm tra cấu trúc thư mục & tệp của tất cả 94 Labs
// -------------------------------------------------------------
console.log('\n📁 SUITE 2: Kiểm Tra Cấu Trúc Thư Mục & Tệp Của 94 Labs');
let existingHtmlCount = 0;
let existingScriptCount = 0;

apis.forEach(api => {
  const fullHtmlPath = path.join(__dirname, '..', api.path);
  const dirPath = path.dirname(fullHtmlPath);
  const scriptPath = path.join(dirPath, 'script.js');

  if (fs.existsSync(fullHtmlPath)) existingHtmlCount++;
  if (fs.existsSync(scriptPath)) existingScriptCount++;
});

assert(existingHtmlCount === 94, `Tất cả 94 bài lab có index.html tồn tại trên đĩa (thực tế: ${existingHtmlCount}/94)`);
assert(existingScriptCount === 94, `Tất cả 94 bài lab có script.js tồn tại trên đĩa (thực tế: ${existingScriptCount}/94)`);

// -------------------------------------------------------------
// SUITE 3: Kiểm tra cú pháp JavaScript của tất cả 94 tệp script.js
// -------------------------------------------------------------
console.log('\n⚙️ SUITE 3: Kiểm Tra Cú Pháp JavaScript (Syntax Validation)');
let validSyntaxCount = 0;
const syntaxErrors = [];

apis.forEach(api => {
  const fullHtmlPath = path.join(__dirname, '..', api.path);
  const scriptPath = path.join(path.dirname(fullHtmlPath), 'script.js');

  try {
    const code = fs.readFileSync(scriptPath, 'utf8');
    new vm.Script(code);
    validSyntaxCount++;
  } catch (err) {
    syntaxErrors.push({ id: api.id, error: err.message });
  }
});

assert(syntaxErrors.length === 0, `94/94 tệp script.js hợp lệ cú pháp không có SyntaxError`, JSON.stringify(syntaxErrors));

// -------------------------------------------------------------
// SUITE 4: Kiểm tra tính toàn vẹn của ui-core.js và các hàm Context
// -------------------------------------------------------------
console.log('\n🛡️ SUITE 4: Kiểm Tra Hợp Đồng Hàm Context (WebAPICore & ctx Contract)');
const uiCorePath = path.join(__dirname, '../webapis/shared/ui-core.js');
const uiCoreContent = fs.readFileSync(uiCorePath, 'utf8');

// Kiểm tra xem các phương thức ctx bắt buộc có đầy đủ trong ui-core.js
const requiredMethods = ['info', 'log', 'success', 'warn', 'error', 'event', 'workflowStep', 'setHtml', 'setVal', 'getVal', 'getEl'];
requiredMethods.forEach(method => {
  assert(uiCoreContent.includes(`${method}:`), `ui-core.js cung cấp đầy đủ phương thức ctx.${method}`);
});

// -------------------------------------------------------------
// SUITE 5: Kiểm tra các nút tương tác [data-action] và Handler
// -------------------------------------------------------------
console.log('\n🎯 SUITE 5: Kiểm Tra Tương Tác Nút Bấm [data-action] & Event Handlers');
let missingHandlerCount = 0;
const missingHandlers = [];

apis.forEach(api => {
  const fullHtmlPath = path.join(__dirname, '..', api.path);
  const scriptPath = path.join(path.dirname(fullHtmlPath), 'script.js');

  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  // Nếu file dùng WebAPICore.renderApp(spec, handlers)
  if (scriptContent.includes('WebAPICore.renderApp(')) {
    // Trích xuất các action từ scriptContent
    const actionMatches = [...scriptContent.matchAll(/action:\s*["']([^"']+)["']/g)].map(m => m[1]);
    
    // Đảm bảo trong script có định nghĩa handler tương ứng
    actionMatches.forEach(action => {
      // handler có dạng `actionName(ctx` hoặc `actionName: function` hoặc `actionName:`
      const hasHandler = scriptContent.includes(`${action}(`) || scriptContent.includes(`${action}:`);
      if (!hasHandler) {
        missingHandlerCount++;
        missingHandlers.push({ api: api.id, action });
      }
    });
  }
});

assert(missingHandlers.length === 0, `Tất cả các nút hành động [data-action] đều có hàm xử lý tương ứng`, JSON.stringify(missingHandlers));

// -------------------------------------------------------------
// SUITE 6: Kiểm tra Bách Khoa Toàn Thư (api-encyclopedia.js)
// -------------------------------------------------------------
console.log('\n📖 SUITE 6: Kiểm Tra Dữ Liệu Bách Khoa Toàn Thư (api-encyclopedia.js)');
const encPath = path.join(__dirname, '../webapis/shared/api-encyclopedia.js');
assert(fs.existsSync(encPath), 'Tệp webapis/shared/api-encyclopedia.js tồn tại');

const encContent = fs.readFileSync(encPath, 'utf8');
const fakeEncWin = {};
try {
  vm.runInNewContext(encContent, { window: fakeEncWin });
} catch (e) {
  assert(false, 'Biên dịch api-encyclopedia.js không có lỗi', e.message);
}

const encData = fakeEncWin.MDN_ENCYCLOPEDIA_DATA || {};
const encKeys = Object.keys(encData);
assert(encKeys.length === 94, `Bách khoa toàn thư đã bao phủ đủ 94/94 Web APIs (hiện có: ${encKeys.length})`);

// Kiểm tra từng mục encyclopedia có đầy đủ mã mẫu và bảng tra cứu
let fullEncCount = 0;
encKeys.forEach(k => {
  const item = encData[k];
  if (item.why && item.whenToUse && item.whenNotToUse && item.boilerplateCode && item.props && item.methods) {
    fullEncCount++;
  }
});
assert(fullEncCount === 94, '100% các mục Bách khoa toàn thư có đủ props, methods, và boilerplate code copyable');

// -------------------------------------------------------------
// KẾT QUẢ TỔNG HỢP
// -------------------------------------------------------------
console.log('\n===========================================================');
console.log(`📊 TỔNG KẾT KIỂM THỬ: ${passedTests}/${totalTests} TESTS ĐẠT (${Math.round((passedTests/totalTests)*100)}%)`);
if (failedTests === 0) {
  console.log('🎉 TẤT CẢ 94 WEB APIS LABS VÀ ENGINE ĐỀU VƯỢT QUA KIỂM THỬ XUẤT SẮC!');
} else {
  console.error(`⚠️ CÓ ${failedTests} KIỂM THỬ THẤT BẠI:`, failures);
}
console.log('===========================================================');

process.exit(failedTests > 0 ? 1 : 0);
