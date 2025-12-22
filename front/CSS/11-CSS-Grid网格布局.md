
# CSS Grid 网格布局

> 🧱 **Grid 是二维布局的终极解决方案**。  
> 行与列同时掌控，区域命名清晰直观——复杂仪表盘、杂志排版、响应式网格，从此不再头疼。

---

## 为什么需要 Grid？

Flexbox 擅长**一维布局**（一行或一列），但面对**真正的二维结构**（如表格、卡片网格、杂志封面）时力不从心：

- 无法精确控制行高；
- 列与列之间难以对齐；
- 跨行跨列需 hack。

**CSS Grid 原生支持行列定义**，让二维布局回归本质。

---

## 启用 Grid

只需一行：
```css
.container {
  display: grid; /* 或 inline-grid */
}
```
- 所有直接子元素自动成为 **grid 项目（Grid Items）**；
- 默认堆叠在第一格，需通过轨道定义布局。

---

## 核心概念：轨道、线、单元格、区域

```
 列线1   列线2   列线3   列线4
    │       │       │       │
    ▼       ▼       ▼       ▼
┌───────┬───────┬───────┐  ← 行线1
│       │       │       │
│  A    │   B   │   C   │
├───────┼───────┼───────┤  ← 行线2
│       │               │
│  D    │       E       │
└───────┴───────┴───────┘  ← 行线3
```

- **轨道（Tracks）**：行轨道（rows）和列轨道（columns）；
- **网格线（Grid Lines）**：编号从 1 开始；
- **单元格（Cells）**：行列交叉形成的格子；
- **区域（Areas）**：一个或多个单元格组成的矩形区域。

---

## 容器属性：定义网格结构

### 1. 定义列与行
```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 2fr; /* 三列：固定 + 弹性 */
  grid-template-rows: 100px auto;       /* 两行：固定 + 内容高度 */
}
```

#### 常用单位：
- `fr`：**弹性单位**（fraction），分配剩余空间；
- `auto`：根据内容自适应；
- `minmax(min, max)`：限制轨道尺寸范围；
- `repeat()`：简化重复模式。

##### 示例：响应式 3 列 → 1 列
```css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```
- `auto-fit`：自动填充尽可能多的列；
- `minmax(250px, 1fr)`：每列至少 250px，最多均分。

---

### 2. 间距（Gap）
```css
grid-gap: 1rem;           /* 行列间距相同 */
gap: 1rem 2rem;           /* 行间距 / 列间距 */
```
> ✅ 替代 `margin`，更干净、无外边距合并问题。

---

### 3. 区域命名（`grid-template-areas`）
用字符串直观描述布局：
```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "nav    main"
    "footer footer";
  grid-template-rows: 80px 1fr 60px;
  grid-template-columns: 200px 1fr;
}
```
然后为项目指定区域：
```css
header { grid-area: header; }
nav    { grid-area: nav; }
main   { grid-area: main; }
footer { grid-area: footer; }
```

> 💡 区域名必须连续且为矩形，`.` 表示空单元格。

---

## 项目属性：放置与跨越

### 1. 使用网格线定位
```css
.item {
  grid-column: 2 / 4; /* 从列线2开始，到列线4结束（占2列） */
  grid-row: 1 / 3;    /* 跨越两行 */
}
```
简写：`grid-area: row-start / col-start / row-end / col-end;`

### 2. 自动放置与密集填充
- 默认：按 DOM 顺序自动填入空格；
- `grid-auto-flow: dense`：允许小项目回填大项目留下的空隙（可能打乱顺序）。

---

## 经典布局实战

### 1. 仪表盘（Dashboard）
```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.widget--large {
  grid-column: span 2; /* 横跨两列 */
}
```

### 2. 杂志风格布局（文字环绕图片）
```css
.article {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas:
    "text sidebar"
    "text sidebar";
}
.sidebar { grid-area: sidebar; }
```

### 3. 完全居中（比 Flex 更可控）
```css
.center {
  display: grid;
  place-items: center; /* 等价于 align-items + justify-items */
  height: 100vh;
}
```

---

## Grid vs Flexbox：如何选择？

| 场景 | 推荐 |
|------|------|
| 一行/一列布局（导航、按钮组） | **Flexbox** |
| 卡片网格（自动换行） | **Grid + `repeat(auto-fit, minmax(...))`** |
| 复杂二维结构（表单、仪表盘） | **Grid** |
| 需要内容驱动的弹性分布 | **Flexbox** |
| 需要精确行列控制 | **Grid** |

> ✅ **现代项目常两者结合**：Grid 做整体骨架，Flexbox 处理内部对齐。

---

## 最佳实践

✅ 优先使用 `fr` 和 `minmax()` 构建弹性网格；  
✅ 用 `grid-template-areas` 提升可读性（尤其复杂布局）；  
✅ 响应式中结合 `auto-fit` / `auto-fill` 实现智能列数；  
✅ 避免硬编码网格线数字，改用命名区域或相对跨度（`span 2`）。

---

✅ 本篇亮点：
- 用“轨道/线/区域”图示建立二维空间认知；
- 强调 `repeat(auto-fit, minmax(...))` 这一响应式网格神器；
- 提供 `grid-template-areas` 的语义化布局方案；
- 明确 Grid 与 Flexbox 的分工与协作策略。