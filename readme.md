
# 小安的技术博客

一个基于 VitePress 搭建的前端技术博客，部署在 GitHub Pages 上，专注分享前端开发相关的知识和实践。

## ✨ 项目特性
- 基于 VitePress 2.x 构建，轻量、快速
- 支持图片点击放大预览
- 侧边栏可折叠/展开
- 一键部署到 GitHub Pages
- 兼容本地开发和生产环境的路径配置

## 📋 环境要求
- Node.js ≥ 16.0.0
- Yarn (推荐) 或 npm

## 🚀 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/unicon-ajl/An-s-Technology-Blog.git
cd An-s-Technology-Blog

2. 安装依赖

yarn install
# 或使用 npm
npm install

3. 本地开发

yarn dev
# 或使用 npm
npm run dev

访问 http://localhost:5173 即可预览博客。

4. 构建打包

yarn build
# 或使用 npm
npm run build

打包产物会输出到 .vitepress/dist 目录。

5. 部署到 GitHub Pages

# 赋予脚本执行权限（首次执行）
chmod +x deploy.sh

# 执行部署脚本
./deploy.sh

部署完成后，访问 https://unicon-ajl.github.io/An-s-Technology-Blog/ 即可查看在线博客。

⚙️ 配置说明

核心配置文件

- .vitepress/config.js：VitePress 核心配置（标题、侧边栏、base 路径等）

- .vitepress/theme/index.js：自定义主题配置（图片放大功能、侧边栏按钮等）

- deploy.sh：GitHub Pages 一键部署脚本

环境适配

- 本地开发环境：base 默认为 /，资源路径正常访问

- 生产部署环境：base 自动切换为 /An-s-Technology-Blog/，适配 GitHub Pages 子路径

📁 目录结构

An-s-Technology-Blog/
├── .vitepress/          # VitePress 配置目录
│   ├── config.js        # 核心配置
│   ├── theme/           # 自定义主题
│   │   └── index.js     # 主题扩展（图片放大、侧边栏等）
│   └── dist/            # 打包输出目录（部署用）
├── guide/               # 指南类文章目录
│   ├── index.md         # 指南首页
│   └── xxx.md           # 具体指南文章
├── about/               # 关于页面目录
│   ├── index.md         # 关于首页
│   └── xxx.md           # 关于子页面
├── deploy.sh            # 部署脚本
├── package.json         # 项目依赖和脚本
└── README.md            # 项目说明（本文档）

📌 注意事项

1. GitHub Pages 仅对公共仓库免费开放，若仓库设为私有需升级 GitHub Enterprise

2. 部署后需等待 1-5 分钟让 GitHub Pages 生效

3. 若页面样式错乱，检查 .vitepress/config.js 中的 base 配置是否与仓库名一致

📄 许可证

本项目基于 MIT 许可证开源，你可以自由修改和使用。


### 关键修改点（根据你的实际情况调整）
1. 替换标题「小安的技术博客」为你实际的博客名称；
2. 调整「项目特性」部分，补充/删减符合你博客的功能；
3. 确认仓库克隆地址、访问链接与你的 GitHub 仓库一致；
4. 补充/修改「目录结构」中实际存在的文件/文件夹；
5. 若有额外的许可证要求，修改「许可证」部分。