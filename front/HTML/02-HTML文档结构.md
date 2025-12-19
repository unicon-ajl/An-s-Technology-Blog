
# HTML 文档结构

> 🏗️ 一个标准的 HTML 页面，就像一栋房子：  
> **`<!DOCTYPE>` 是地基，`<html>` 是主体，`<head>` 是蓝图，`<body>` 是房间**。

所有网页都应遵循这一基本结构，确保浏览器正确解析。

---

## 最小合法 HTML5 文档

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>页面标题</title>
</head>
<body>
  <h1>欢迎来到我的网站</h1>
</body>
</html>
```

这个结构看似简单，但每一部分都不可或缺。

---

## 各部分详解

### 1. `<!DOCTYPE html>`
- **作用**：告诉浏览器“这是 HTML5 文档”；
- **必须放在文件最顶部**；
- 写法固定，**不区分大小写**，但推荐全小写。

> 💡 没有它？浏览器可能进入“怪异模式”（Quirks Mode），导致布局错乱！

---

### 2. `<html lang="...">`
- 根元素，包裹整个文档；
- **`lang` 属性指定语言**，对无障碍和 SEO 至关重要：
  ```html
  <html lang="zh-CN">  <!-- 简体中文 -->
  <html lang="en">     <!-- 英文 -->
  ```

> ✅ 屏幕阅读器会根据 `lang` 自动切换发音语种。

---

### 3. `<head>` —— 页面的“元信息区”
不显示在页面上，但包含关键配置：

| 标签 | 作用 |
|------|------|
| `<meta charset="UTF-8">` | **声明字符编码**（必须！避免乱码） |
| `<title>` | 浏览器标签页标题，**SEO 核心字段** |
| `<meta name="description" content="...">` | 页面描述（搜索引擎摘要） |
| `<link rel="stylesheet" href="style.css">` | 引入 CSS |
| `<script src="app.js"></script>` | 引入 JS（通常放 `<body>` 底部） |

> ⚠️ `<head>` 中**不能放**可见内容（如 `<p>`、`<div>`）。

---

### 4. `<body>` —— 页面的“可见内容区”
- 所有用户看到的内容都放在这里；
- 可嵌套任意 HTML 元素：标题、段落、图片、表单等。

```html
<body>
  <header>网站头部</header>
  <main>
    <article>文章内容</article>
  </main>
  <footer>页脚信息</footer>
</body>
```

---

## 完整示例（带注释）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- 字符编码：防止中文乱码 -->
  <meta charset="UTF-8">
  <!-- 视口设置：适配移动设备 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 页面标题（必填！） -->
  <title>小安的技术博客</title>
  <!-- 页面描述（SEO 用） -->
  <meta name="description" content="专注前端技术分享">
</head>
<body>
  <h1>前端入门指南</h1>
  <p>从 HTML 开始，构建你的第一个网页。</p>
</body>
</html>
```

> 💡 提示：现代编辑器（如 VS Code）输入 `!` + Tab 可快速生成此模板。

---

## 常见错误

❌ 忘记 `<!DOCTYPE html>`  
❌ 漏掉 `<meta charset="UTF-8">` → 中文变乱码  
❌ 把内容写在 `<head>` 里  
❌ 不设置 `lang` 属性

---