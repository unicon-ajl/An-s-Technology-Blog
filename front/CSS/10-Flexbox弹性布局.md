
# Flexbox 弹性布局

> 🧩 **Flexbox 是一维布局的终极答案**。  
> 无论是水平居中、等高列、还是动态分配空间，它都能用简洁的代码优雅解决。

---

## 为什么需要 Flexbox？

在 Flexbox 出现前，开发者靠 `float`、`display: inline-block` 甚至表格 hack 实现布局——  
- 垂直居中？难！  
- 子项等高？难！  
- 动态分配剩余空间？更难！

**Flexbox 专为“沿一条轴线排列元素”而生**，彻底终结这些痛点。

---

## 核心概念：容器与项目

启用 Flexbox 只需一行：
```css
.container {
  display: flex; /* 或 inline-flex */
}
```
- **容器（Flex Container）**：应用了 `display: flex` 的元素；
- **项目（Flex Items）**：容器的直接子元素。

> 💡 注意：**只有直接子元素**成为 flex 项目，孙级元素不受影响。

---

## 主轴（Main Axis）与交叉轴（Cross Axis）

Flexbox 基于两条轴工作：

```
主轴（main axis） → → → → → 
┌───────────────┐
│ 项目1  项目2  项目3 │ ← 交叉轴（cross axis）
└───────────────┘
```

- **主轴方向由 `flex-direction` 决定**（默认从左到右）；
- 所有对齐、分布属性都围绕这两条轴展开。

---

## 容器属性（控制整体布局）

### 1. `flex-direction`：主轴方向
```css
flex-direction: row;            /* 默认：水平从左到右 */
flex-direction: row-reverse;    /* 水平从右到左 */
flex-direction: column;         /* 垂直从上到下 */
flex-direction: column-reverse; /* 垂直从下到上 */
```

### 2. `justify-content`：主轴对齐
```css
justify-content: flex-start;  /* 默认：起点对齐 */
justify-sync: center;         /* 居中 */
justify-content: space-between; /* 两端对齐，项目间留空 */
justify-content: space-around;  /* 每个项目两侧等宽空白 */
justify-content: space-evenly;  /* 项目间及边缘空白均等 */
```

### 3. `align-items`：交叉轴对齐（单行）
```css
align-items: stretch;     /* 默认：拉伸填满容器高度 */
align-items: center;      /* 居中 */
align-items: flex-start;  /* 起点对齐 */
align-items: flex-end;    /* 末尾对齐 */
align-items: baseline;    /* 文本基线对齐 */
```

### 4. `flex-wrap`：是否换行
```css
flex-wrap: nowrap;  /* 默认：不换行 */
flex-wrap: wrap;    /* 换行，从上到下 */
flex-wrap: wrap-reverse; /* 换行，从下到上 */
```

> ✅ 当内容可能溢出时，**务必设置 `flex-wrap: wrap`**。

### 5. `align-content`：多行交叉轴对齐（仅当 `flex-wrap: wrap` 时生效）
```css
align-content: space-between; /* 多行之间分布 */
align-content: center;        /* 多行整体居中 */
```

---

## 项目属性（控制个体行为）

### 1. `flex`：空间分配神器（简写）
```css
.item {
  flex: 1; /* 等价于 flex: 1 1 0% */
}
```
完整语法：`flex: grow shrink basis`

| 值 | 含义 |
|----|------|
| `flex-grow` | 放大比例（默认 0，不放大） |
| `flex-shrink` | 缩小比例（默认 1，可缩小） |
| `flex-basis` | 初始主轴尺寸（如 `200px`, `30%`, `auto`） |

#### 实战：三栏布局（侧边栏固定，主内容自适应）
```css
.sidebar { flex: 0 0 250px; } /* 不放大、可缩小、基础宽度 250px */
.main   { flex: 1; }          /* 占据剩余所有空间 */
```

### 2. `align-self`：单独覆盖 `align-items`
```css
.special-item {
  align-self: flex-end; /* 仅此项目底部对齐 */
}
```

### 3. `order`：改变显示顺序（不影响 DOM）
```css
.first { order: -1; } /* 提前显示 */
```
> ⚠️ 谨慎使用，可能破坏无障碍导航顺序。

---

## 经典布局实战

### 1. 完美居中（水平+垂直）
```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 2. 圣杯布局（Header + Footer + 自适应内容）
```html
<body class="layout">
  <header>顶部</header>
  <main>主要内容</main>
  <footer>底部</footer>
</body>
```
```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1; /* 占据剩余高度 */
}
```

### 3. 响应式卡片网格
```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card {
  flex: 1 1 300px; /* 最小 300px，可增长可缩小 */
}
```

---

## 最佳实践

✅ **优先用于一维布局**（行或列），二维布局用 Grid；  
✅ **用 `gap` 替代 `margin` 控制间距**（现代浏览器支持好）；  
✅ **避免深层嵌套 flex 容器**，保持结构扁平；  
✅ **结合 `min-width`/`max-width` 防止项目过度压缩**。

---

✅ 本篇亮点：
- 用“主轴/交叉轴”图示建立空间认知；
- `flex: 1` 和 `flex: 0 0 250px` 等实用模式直接给出；
- 包含圣杯布局、居中、响应式卡片三大经典案例；
- 明确 Flexbox 与 Grid 的分工（一维 vs 二维）。