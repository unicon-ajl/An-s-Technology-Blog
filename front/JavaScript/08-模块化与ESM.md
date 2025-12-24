
# 模块化与 ESM

> 🧱 **当项目从“脚本”成长为“应用”，代码组织方式决定可维护性上限**。  
> JavaScript 的模块系统从社区方案走向标准——**ES 模块（ESM）** 已成为现代开发的基石。

---

## 一、为什么需要模块化？

早期 JS 全局作用域混杂，导致：
- 命名冲突（`var utils = ...` 被覆盖）；
- 依赖混乱（“这个函数在哪定义的？”）；
- 难以复用和测试。

✅ **模块化解决**：
- **封装**：私有变量/函数不外泄；
- **依赖显式声明**：`import` 清晰表达依赖关系；
- **按需加载**：支持代码分割与懒加载。

---

## 二、模块系统的演进

| 方案 | 时代 | 特点 | 现状 |
|------|------|------|------|
| **全局变量 + IIFE** | 2000s | `(function(){...})()` 模拟私有 | 过时 |
| **CommonJS（CJS）** | Node.js 早期 | `require()` / `module.exports` | Node.js 仍支持 |
| **AMD / RequireJS** | 浏览器异步加载 | `define()` 回调 | 基本淘汰 |
| **UMD** | 通用兼容 | 同时支持 CJS/AMD/全局 | 用于库兼容 |
| **ES 模块（ESM）** | ES6+（2015） | `import` / `export`，静态分析 | **现代标准 ✅** |

> ✅ **新项目应默认使用 ESM**。

---

## 三、ES 模块（ESM）核心语法

### 1. 导出（Export）

#### 默认导出（一个模块一个）
```js
// math.js
export default function add(a, b) {
  return a + b;
}
```

#### 命名导出（多个）
```js
// utils.js
export const PI = 3.14159;
export function square(x) { return x * x; }

// 或统一导出
const log = console.log;
const version = "1.0";
export { log, version };
```

---

### 2. 导入（Import）

#### 导入默认导出
```js
import add from './math.js'; // 名字可自定义
```

#### 导入命名导出
```js
import { PI, square } from './utils.js';

// 重命名
import { square as sq } from './utils.js';

// 导入全部
import * as utils from './utils.js';
console.log(utils.PI);
```

#### 同时导入默认和命名
```js
import add, { PI } from './math-utils.js';
```

> ⚠️ **路径必须包含 `.js` 扩展名**（浏览器中），Node.js 可省略（但推荐写全）。

---

## 四、ESM vs CommonJS：关键区别

| 特性 | ESM | CommonJS |
|------|-----|----------|
| **加载时机** | **静态分析**（编译时） | 动态加载（运行时） |
| **`this`** | `undefined` | 指向 `module.exports` |
| **循环依赖** | 只导出已初始化绑定 | 导出完整对象（可能未初始化完） |
| **顶层 await** | 支持（在模块顶层） | 不支持 |
| **浏览器原生支持** | ✅（`<script type="module">`） | ❌（需打包工具） |

### 静态分析的优势：
- **Tree Shaking**：打包工具可移除未使用的导出；
- **更快启动**：依赖图在执行前已知；
- **更好的 IDE 支持**：自动补全、跳转更准确。

---

## 五、在浏览器中使用 ESM

```html
<!-- 启用模块模式 -->
<script type="module" src="./main.js"></script>

<!-- 内联模块 -->
<script type="module">
  import { greet } from './utils.js';
  greet();
</script>
```

### 特性：
- 自动 **defer**（等同于 `defer` 属性）；
- **严格模式** 默认开启；
- **MIME 类型** 必须为 `application/javascript`（本地文件直接打开可能报错，建议用本地服务器）。

---

## 六、在 Node.js 中使用 ESM

### 方式 1：文件扩展名为 `.mjs`
```bash
node app.mjs
```

### 方式 2：`package.json` 中设置 `"type": "module"`
```json
{
  "type": "module"
}
```
此时 `.js` 文件也被视为 ESM。

> 🔁 若需混用 CJS 和 ESM，可用动态 `import()`（见下文）。

---

## 七、动态导入（Dynamic Import）

```js
// 条件加载或懒加载
button.addEventListener('click', async () => {
  const { showModal } = await import('./modal.js');
  showModal();
});
```

### 优势：
- **按需加载**：减少首屏体积；
- **兼容 CJS/ESM 混合环境**；
- 返回 **Promise**，天然支持异步。

> ✅ 适用于路由懒加载、功能插件、A/B 测试等场景。

---

## 八、常见陷阱与最佳实践

### 1. 文件扩展名问题
- **浏览器必须写 `.js`**：`import foo from './foo.js'`;
- **Node.js 推荐写全**，避免解析歧义。

### 2. 默认导出 vs 命名导出
- **库作者**：常用默认导出（如 `React`, `lodash`）；
- **应用内部模块**：**优先使用命名导出**，便于 Tree Shaking 和重构。

✅ 推荐：
```js
// 避免
export default { foo, bar };

// 改为
export { foo, bar };
```

### 3. 循环依赖
```js
// a.js
import { b } from './b.js';
export const a = 'A';
console.log(b); // undefined！b 尚未初始化

// b.js
import { a } from './a.js';
export const b = 'B';
```
> 💡 尽量避免；若必须，确保只使用**已声明的绑定**（而非值）。

---

## 最佳实践

✅ **新项目统一使用 ESM**；  
✅ **应用代码优先用命名导出**，提升可维护性；  
✅ **利用动态 `import()` 实现代码分割**；  
✅ **在 `package.json` 中明确 `"type": "module"`**；  
✅ **浏览器中始终写 `.js` 扩展名**；  
✅ **避免循环依赖，模块职责单一化**。

---

✅ 本篇亮点：
- 清晰对比 ESM 与 CommonJS 的本质差异（静态 vs 动态）；
- 强调命名导出优于默认导出的应用开发实践；
- 提供浏览器与 Node.js 中 ESM 的具体使用规范；
- 揭示循环依赖在 ESM 中的“绑定未初始化”陷阱；
- 推荐动态 `import()` 作为懒加载标准方案。