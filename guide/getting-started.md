# VitePress 从 0 到 1 搭建个人技术博客

本文将带你完整走完「VitePress 搭建个人技术博客」的全流程，从环境准备到项目初始化、配置优化、插件开发/使用，再到最终部署上线，手把手打造一个高性能、可定制化的个人技术博客。

## 📋 前置准备
### 1. 环境要求
- **Node.js**：版本 ≥ 16.0.0（推荐 18.x/20.x LTS 版本）
- **包管理器**：Yarn（推荐）、npm 或 pnpm
- **代码编辑器**：VS Code（推荐，搭配 Volar 插件）
- **Git**：用于版本管理和部署到 GitHub Pages

### 2. 环境验证
打开终端执行以下命令，确认环境符合要求：
```bash
# 检查 Node.js 版本
node -v # 输出 v16.x 及以上即可
# 检查 yarn 版本（若使用 yarn）
yarn -v
# 检查 git 版本
git --version
```

## 🚀 第一步：初始化 VitePress 项目
### 1. 创建项目目录

```Markdown
# 创建项目文件夹并进入
mkdir my-tech-blog && cd my-tech-blog
# 初始化 package.json
yarn init -y
# 或使用 npm
npm init -y
```

### 2. 安装 VitePress

```Bash
# 安装 VitePress（核心依赖）
yarn add vitepress -D
# 或使用 npm
npm install vitepress -D
```

### 3. 初始化 VitePress 基础结构

```Bash
# 初始化 VitePress 项目（自动生成基础目录/文件）
npx vitepress init
```

执行后按提示选择：

- `Where should VitePress initialize the config?` → 直接回车（默认根目录）

- `Site title` → 输入博客标题（如「我的技术博客」）

- `Site description` → 输入博客描述（如「专注前端技术分享」）

- `Theme` → 选择 `Default Theme`（默认主题，新手推荐）

- `Use TypeScript for config and theme?` → 选 `No`（新手无需 TS）

- `Add npm scripts?` → 选 `Yes`（自动添加 dev/build/preview 脚本）

### 4. 验证基础项目

```Bash
# 启动本地开发服务
yarn dev
# 或使用 npm
npm run dev
```

访问 `http://localhost:5173`，即可看到 VitePress 默认博客骨架。

## ⚙️ 第二步：核心配置优化

### 1. 基础配置（.vitepress/config.js）

修改 `.vitepress/config.js`，完善站点核心配置：

```JavaScript
// .vitepress/config.js
export default {
  // 站点基础配置
  title: "我的技术博客", // 博客标题
  description: "专注前端技术分享，从入门到进阶", // 博客描述
  lang: "zh-CN", // 站点语言
  base: process.env.NODE_ENV === "production" ? "/my-tech-blog/" : "/", // 适配 GitHub Pages 子路径

  // 主题配置（默认主题）
  themeConfig: {
    // 导航栏 Logo
    logo: "/logo.png", // 放在根目录 public 下的 logo 图片
    // 导航栏链接
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "关于", link: "/about/" },
    ],
    // 侧边栏配置（指南页面）
    sidebar: {
      "/guide/": [
        {
          text: "VitePress 基础",
          items: [
            { text: "项目初始化", link: "/guide/init" },
            { text: "配置详解", link: "/guide/config" },
          ],
        },
        {
          text: "高级定制",
          items: [
            { text: "插件使用", link: "/guide/plugin" },
            { text: "主题定制", link: "/guide/theme" },
          ],
        },
      ],
      // 其他页面侧边栏可单独配置
    },
    // 页脚配置
    footer: {
      message: "基于 VitePress 构建",
      copyright: "Copyright © 2025 我的技术博客",
    },
    // 社交链接（可选）
    socialLinks: [
      { icon: "github", link: "https://github.com/你的用户名/my-tech-blog" },
      { icon: "zhihu", link: "你的知乎链接" },
    ],
  },
};
```

### 2. 静态资源配置（public 目录）

- 在项目根目录创建 `public` 文件夹（静态资源根目录）；

- 放入 `logo.png`（导航栏 Logo）、`favicon.ico`（网站图标）等静态资源；

- 通过 `/logo.png`、`/favicon.ico` 直接访问这些资源。

### 3. 环境适配（本地/生产区分）

修改 `package.json`，添加跨平台环境变量配置：

```JSON
{
  "scripts": {
    "dev": "vitepress dev .",
    "build": "cross-env NODE_ENV=production vitepress build .",
    "preview": "vitepress preview ."
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "vitepress": "^1.0.0"
  }
}
```

安装跨平台依赖：

```Bash
yarn add cross-env -D
# 或 npm install cross-env -D
```

## 🧩 第三步：搜索功能扩展

### 1. 搜索功能（必装）

通过内置配置实现本地模糊搜索：
在 `config.js` 中配置：

```JavaScript
// .vitepress/config.js

export default {
  themeConfig: {
    // 其他配置...
    // 搜索配置
    search: {
      provider: "local",
    },
  }
  // 其他配置...
};
```

### 2. 图片放大功能

在 `.vitepress/theme/index.js` 中扩展主题，实现图片点击放大：

```JavaScript
import DefaultTheme from "vitepress/theme";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 全局图片预览功能（仅长按左键可拖拽）
    app.mixin({
      mounted() {
        this.unbindImageClick();
        this.bindImageClick();
      },
      beforeUnmount() {
        this.unbindImageClick();
        const overlay = document.getElementById("image-preview-overlay");
        if (overlay) overlay.remove();
        document.body.style.overflow = "";
      },
      methods: {
        bindImageClick() {
          const imgs = document.querySelectorAll("img:not(.image-preview-img)");
          imgs.forEach((img) => {
            if (
              img.closest(".VPNavBar") ||
              img.alt === "logo" ||
              img.src.includes("favicon")
            )
              return;

            img.style.cursor = "zoom-in";
            img.style.transition = "cursor 0.2s ease";
            img.addEventListener("click", this.handleImageClick);
          });
        },
        unbindImageClick() {
          const imgs = document.querySelectorAll("img");
          imgs.forEach((img) => {
            img.removeEventListener("click", this.handleImageClick);
          });
        },
        handleImageClick(e) {
          e.stopPropagation();
          const targetImg = e.target;

          let overlay = document.getElementById("image-preview-overlay");
          if (overlay) overlay.remove();

          // 1. 创建遮罩层
          overlay = document.createElement("div");
          overlay.id = "image-preview-overlay";
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 20px;
            box-sizing: border-box;
          `;

          // 2. 创建右上角关闭按钮
          const closeBtn = document.createElement("button");
          closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
            z-index: 10000;
          `;
          closeBtn.innerHTML = "×";
          closeBtn.addEventListener("mouseover", () => {
            closeBtn.style.background = "rgba(255, 255, 255, 0.4)";
          });
          closeBtn.addEventListener("mouseout", () => {
            closeBtn.style.background = "rgba(255, 255, 255, 0.2)";
          });

          // 3. 图片容器（解耦缩放和拖拽）
          const imgContainer = document.createElement("div");
          imgContainer.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
          `;

          // 4. 预览图片
          const previewImg = document.createElement("img");
          previewImg.className = "image-preview-img";
          previewImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 4px;
            transform: scale(0.95);
            transition: transform 0.3s ease;
            cursor: grab;
          `;
          previewImg.src = targetImg.src;
          previewImg.alt = targetImg.alt || "预览图片";
          imgContainer.appendChild(previewImg);

          // 5. 统一关闭函数
          const closePreview = () => {
            overlay.style.opacity = "0";
            previewImg.style.transform = "scale(0.95)";
            setTimeout(() => overlay.remove(), 300);
            document.body.style.overflow = "";
          };

          // 6. 关闭事件绑定
          closeBtn.addEventListener("click", closePreview);
          overlay.addEventListener("click", closePreview);
          imgContainer.addEventListener("click", (e) => e.stopPropagation());
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closePreview();
          });

          // 7. 加载完成后初始化交互
          previewImg.onload = () => {
            overlay.style.opacity = "1";
            previewImg.style.transform = "scale(1)";

            let scale = 1; // 缩放比例
            let posX = 0,
              posY = 0; // 容器偏移量
            let isDragging = false; // 最终拖拽状态
            let pressTimer = null; // 长按计时器
            let startX = 0,
              startY = 0;
            const LONG_PRESS_TIME = 300; // 长按判定时长（ms），可自定义

            // 滚轮缩放
            previewImg.addEventListener("wheel", (e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              scale = Math.max(0.5, Math.min(2, scale + delta));
              previewImg.style.transform = `scale(${scale})`;
            });

            // 🔧 核心逻辑：长按左键判定
            previewImg.addEventListener("mousedown", (e) => {
              // 仅鼠标左键按下时触发
              if (e.button !== 0) return;

              // 记录初始位置
              startX = e.clientX - posX;
              startY = e.clientY - posY;

              // 启动长按计时器：超过设定时长才激活拖拽
              pressTimer = setTimeout(() => {
                isDragging = true;
                previewImg.style.cursor = "grabbing"; // 长按后切换鼠标样式
              }, LONG_PRESS_TIME);

              e.stopPropagation();
            });

            // 鼠标移动：仅长按激活后才执行拖拽
            document.addEventListener("mousemove", (e) => {
              if (!isDragging) return; // 未长按激活，不执行拖拽

              // 计算并更新容器偏移
              posX = e.clientX - startX;
              posY = e.clientY - startY;
              imgContainer.style.transform = `translate(${posX}px, ${posY}px)`;
            });

            // 鼠标松开/离开：清除计时器+停止拖拽
            const stopDrag = () => {
              clearTimeout(pressTimer); // 清除长按计时器
              pressTimer = null;
              isDragging = false; // 关闭拖拽状态
              previewImg.style.cursor = "grab"; // 恢复鼠标样式
            };

            document.addEventListener("mouseup", stopDrag);
            document.addEventListener("mouseleave", stopDrag);
          };

          // 8. 组装DOM
          overlay.appendChild(closeBtn);
          overlay.appendChild(imgContainer);
          document.body.appendChild(overlay);
          document.body.style.overflow = "hidden";
        },
      },
    });
  },
};
```

## 📝 第四步：编写博客内容

### 1. 首页定制（[index.md](index.md)）

替换根目录 `index.md`，打造个性化首页：

```Markdown
---
# 首页 Frontmatter 配置
layout: home
title: 小安的技术博客
sidebar: false
outline: false

# Home 布局配置（VitePress 专属）
hero:
  name: 小安的技术博客
  text: 前端开发 · 持续沉淀
  tagline: 分享 Vue、React、工程化、静态站点搭建等实战经验
  image:
    src: /logo.png # 首页图标/头像
    alt: 博客图标
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started/
    - theme: alt
      text: 关于博主
      link: /about/me/

features:
  - icon: 📖
    title: VitePress 实战
    details: 从 0 到 1 搭建个人技术博客，配置优化、插件开发、部署上线全流程。
    link: /guide/
  - icon: ⚙️
    title: 前端工程化
    details: Webpack、Vite、ESLint 等工具实战配置，提升开发效率和项目质量。
    link: /guide/webpack-basic/
  - icon: 🧰
    title: 开发工具技巧
    details: VS Code、Git、Yarn 等工具隐藏技巧，让开发更丝滑。
    link: /guide/yarn-usage/
---

```

### 2. 指南页面（guide/ 目录）

- 在根目录创建 `guide` 文件夹；

- 创建 `guide/index.md`（指南首页）、`guide/init.md`（项目初始化详解）等文档；

- 按照 `config.js` 中侧边栏配置的路径编写对应内容。

## 🚢 第五步：部署上线（GitHub Pages）

### 1. 编写部署脚本（`deploy.sh`）

在项目根目录创建 `deploy.sh`：

```Bash
#!/usr/bin/env sh
set -e

# 构建项目
yarn build

# 进入构建产物目录
cd .vitepress/dist

# 初始化 git 仓库
git init
git add -A
git commit -m 'deploy: 更新博客内容'

# 推送至 GitHub Pages 分支（替换为你的仓库地址）
git push -f https://github.com/你的用户名/my-tech-blog.git master:gh-pages

cd -
# 删除临时 git 仓库
rm -rf .vitepress/dist/.git
```

### 2. 赋予脚本执行权限

```Bash
chmod +x deploy.sh
```

### 3. 执行部署

```Bash
# Windows（Git Bash）/macOS/Linux
./deploy.sh
```

### 4. 配置 GitHub Pages

- 打开 GitHub 仓库 → `Settings` → `Pages`；

- `Source` 选择 `gh-pages` 分支，`Folder` 选择 `/ (root)`；

- 点击 `Save`，等待 1-5 分钟后访问 `https://你的用户名.github.io/my-tech-blog/`。

## 🎯 常见问题与优化

### 1. 样式错乱/资源404

- 检查 `config.js` 中 `base` 配置是否与 GitHub 仓库名一致；

- 静态资源路径使用根路径（如 `/logo.png`），避免相对路径；

- 部署后强制刷新浏览器（Ctrl+Shift+R）清除缓存。

### 2. 部署脚本执行失败

- Windows 系统需使用 Git Bash 执行 `.sh` 脚本；

- 检查 Git 远程仓库地址是否正确；

- 网络不稳定时，增大 Git 缓存：`git config --global http.postBuffer 524288000`。
- 配置 vscode 局部仓库代理：`git config https.proxy https://127.0.0.1:7890`

## 📌 总结

通过以上步骤，你已经完成了 VitePress 博客从 0 到 1 的搭建：

1. 环境准备 → 项目初始化 → 核心配置优化；

2. 功能扩展（搜索、图片放大）→ 内容编写；

3. 部署脚本编写 → GitHub Pages 上线。

后续可根据需求扩展：

- 自定义主题样式（修改 CSS 变量）；

- 集成评论功能（如 Giscus）；

- 添加访问量统计（如 Valine）；

- 自动化部署（GitHub Actions）。

```Plain Text


### 核心适配说明
1. 文档结构完全匹配「从 0 到 1 搭建个人技术博客，配置优化、插件开发、部署上线全流程」的核心描述；
2. 步骤从环境准备到最终部署，覆盖新手搭建的所有关键环节，每个步骤都有可执行的命令和代码；
3. 包含常见问题解决方案，避免新手踩坑；
4. 代码示例均为 VitePress 最新版（1.0.0+）的标准写法，兼容 GitHub Pages 部署场景。

### 使用方法
1. 将上述内容复制到你的项目 `/guide/index.md` 文件中；
2. 根据实际情况替换：
   - 仓库地址、用户名；
   - 博客标题、描述；
   - 静态资源名称/路径；
3. 保存后运行 `yarn dev`，即可在 `/guide/` 路径下看到完整的实战教程。

### 总结
- 这份文档覆盖 VitePress 博客搭建全流程，从基础初始化到高级配置、插件使用、部署上线；
- 代码示例可直接复用，新手只需替换个性化信息即可快速落地；
- 包含常见问题解决方案，降低实操难度。
```