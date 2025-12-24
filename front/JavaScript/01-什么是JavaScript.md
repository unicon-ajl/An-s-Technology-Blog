
# 什么是 JavaScript？

> 💡 **JavaScript 是 Web 的“行为层”**——它让网页从静态文档变为可交互的应用。  
> 但今天的 JavaScript，早已不止于浏览器。

---

## 一、JavaScript 能做什么？

| 环境 | 能力 | 示例 |
|------|------|------|
| **浏览器** | 操作 DOM、响应用户事件、发送网络请求 | 表单验证、动画、SPA（如 React 应用） |
| **服务器（Node.js）** | 文件读写、数据库连接、API 服务 | Express 后端、脚本工具 |
| **移动端/桌面端** | 通过框架构建原生应用 | React Native、Electron |
| **物联网/嵌入式** | 控制硬件、传感器交互 | Tessel、Espruino |

> ✅ 核心定位：**通用、动态、单线程、事件驱动的脚本语言**。

---

## 二、一个最简单的 JavaScript 示例

```html
<!DOCTYPE html>
<html>
<body>
  <button id="btn">点我</button>
  <p id="output"></p>

  <script>
    // 获取按钮和输出元素
    const button = document.getElementById('btn');
    const output = document.getElementById('output');

    // 添加点击事件监听
    button.addEventListener('click', () => {
      output.textContent = '你好，JavaScript！';
    });
  </script>
</body>
</html>
```

效果：点击按钮，段落显示文字。

> 💬 注意：HTML 定义“有什么”，CSS 定义“长什么样”，**JavaScript 定义“能做什么”**。

---

## 三、JavaScript 的运行环境

### 1. 浏览器（宿主环境）
- 内置 **BOM（Browser Object Model）**：`window`, `location`, `navigator`
- 内置 **DOM（Document Object Model）**：`document`, `Element`
- 执行在 **主线程**，通过事件循环处理异步任务

### 2. Node.js（服务端环境）
- 无 `window` 和 `document`
- 提供 `fs`, `http`, `path` 等模块
- 使用 **CommonJS** 模块系统（也支持 ESM）

> 🔁 无论在哪运行，**JavaScript 引擎（如 V8、SpiderMonkey）负责解析执行代码**。

---

## 四、如何引入 JavaScript？

### 1. 内联脚本（`<script>` 标签）
```html
<script>
  console.log('内联脚本');
</script>
```

### 2. 外部文件（推荐 ✅）
```html
<script src="app.js"></script>
```
- 可缓存、可复用、便于团队协作

### 3. 模块化脚本（现代标准）
```html
<script type="module" src="main.js"></script>
```
- 支持 `import`/`export`
- 默认延迟执行（等效 `defer`）

> ⚠️ 避免在 HTML 中混杂大量 JS 逻辑——**结构、样式、行为应分离**。

---

## 五、JavaScript 的版本演进

- **ES5（2009）**：`JSON`、`Array.prototype.forEach`
- **ES6 / ES2015（里程碑）**：`let/const`、箭头函数、类、模块、Promise
- **ES2016+**：每年更新，如 `async/await`（ES2017）、`?.`（可选链，ES2020）

> ✅ 本系列以 **ES6+** 为基准，覆盖现代开发所需核心语法。

---

## 六、常见误区

❌ “JavaScript 就是 jQuery”  
✅ jQuery 是基于 JS 的库，如今原生 JS 已足够强大。

❌ “JS 只能做简单特效”  
✅ 现代 JS 可构建复杂应用（如 Figma、VS Code Web 版）。

❌ “JS 不是‘真正’的编程语言”  
✅ JS 是图灵完备语言，支持函数式、面向对象等多种范式。

---

## 七、开发工具推荐

- **浏览器开发者工具（F12）**：调试、性能分析
- **VS Code + ESLint + Prettier**：代码规范与格式化
- **Node.js + npm**：运行脚本、管理依赖
- **Playground**：[JSFiddle](https://jsfiddle.net/)、[CodePen](https://codepen.io/)

---

✅ 本篇亮点：
- 明确 JS 在 Web 三层架构中的角色；
- 展示跨环境能力（浏览器/Node/桌面）；
- 强调“行为层”定位，避免与 HTML/CSS 混淆；
- 澄清历史误区，建立正确认知。

---
