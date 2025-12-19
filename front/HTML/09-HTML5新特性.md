
# HTML5 新特性

> 🆕 **HTML5 不只是“新标签”，更是一次 Web 能力的飞跃**。  
> 它让 HTML 更语义、更强大、更贴近现代应用需求。

---

## 一、语义化标签（最常用）

HTML5 引入了**描述内容角色**的标签，替代泛滥的 `<div>`：

| 新标签 | 用途 | 替代旧写法 |
|--------|------|-----------|
| `<header>` | 页头或区块头部 | `<div class="header">` |
| `<nav>` | 主要导航 | `<div class="nav">` |
| `<main>` | 页面主内容（唯一） | `<div id="content">` |
| `<article>` | 独立可分发内容（如博客） | `<div class="post">` |
| `<section>` | 主题分组区块 | `<div class="section">` |
| `<aside>` | 侧边内容（广告、相关链接） | `<div class="sidebar">` |
| `<footer>` | 页脚 | `<div class="footer">` |

> ✅ 这些标签**无默认样式**，纯粹用于语义表达，对 SEO 和无障碍至关重要。

---

## 二、增强表单控件

HTML5 为 `<input>` 增加了**语义化类型**，提升用户体验与校验能力：

| 类型 | 示例 | 效果 |
|------|------|------|
| `email` | `<input type="email">` | 自动校验格式，移动端调出邮箱键盘 |
| `url` | `<input type="url">` | 校验 URL 格式 |
| `tel` | `<input type="tel">` | 移动端调出数字键盘 |
| `number` | `<input type="number" min="1" max="10">` | 数字输入 + 范围限制 |
| `date` | `<input type="date">` | 弹出日期选择器 |
| `color` | `<input type="color">` | 颜色选择器 |
| `range` | `<input type="range" min="0" max="100">` | 滑块控件 |

> 💡 浏览器会自动进行**基础校验**（如格式、必填），无需 JavaScript。

---

## 三、多媒体原生支持

告别 Flash！HTML5 内置音视频播放：

```html
<!-- 视频 -->
<video src="movie.mp4" controls></video>

<!-- 音频 -->
<audio src="song.mp3" controls></audio>
```

- 无需插件；
- 支持字幕（`<track>`）；
- 可通过 JavaScript 控制播放逻辑。

---

## 四、其他实用新元素

| 元素 | 用途 |
|------|------|
| `<figure>` + `<figcaption>` | 图文组合（图表、照片说明） |
| `<time>` | 时间/日期语义化：<br>`<time datetime="2025-12-19">今天</time>` |
| `<mark>` | 高亮文本（如搜索关键词） |
| `<progress>` | 进度条：<br>`<progress value="70" max="100">70%</progress>` |
| `<meter>` | 度量值（如磁盘使用率） |

---

## 五、API 与能力扩展（简要提及）

HTML5 还定义了一系列 JavaScript API，虽非标签，但常被归为“HTML5 特性”：

- **本地存储**：`localStorage` / `sessionStorage`
- **Canvas**：`<canvas>` 绘图
- **拖放（Drag & Drop）**：`draggable` 属性
- **地理定位**：`navigator.geolocation`
- **历史管理**：`history.pushState()`

> 📌 注意：这些属于 **Web API**，需配合 JavaScript 使用。

---

## 六、向后兼容与降级处理

- 所有 HTML5 标签在旧浏览器中**仍可渲染**（视为行内元素）；
- 通过 CSS 重置确保块级显示：
  ```css
  header, nav, main, article, aside, footer {
    display: block;
  }
  ```
- 对于不支持的 input 类型（如 IE），会**自动降级为 `type="text"`**，功能不受损。

> ✅ 现代开发中，可放心使用 HTML5，无需 polyfill。

---

## 总结：HTML5 的核心价值

| 方面 | 提升 |
|------|------|
| **语义** | 结构清晰，机器可读 |
| **体验** | 原生控件，减少 JS 依赖 |
| **性能** | 内置能力，无需插件 |
| **可访问性** | 与无障碍天然契合 |

> ✅ HTML5 让 Web 回归本质：**内容为王，结构先行**。

---
