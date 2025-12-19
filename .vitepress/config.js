// 导航配置项
import { navigateConfig } from "../utils/navigate";
import { sidebarConfig } from "../utils/sidebar";

// 本地开发环境：npm run dev → base 为 '/'
// 生产部署环境：npm run build → base 为 '/An-s-Technology-Blog/'
const base =
  process.env.NODE_ENV === "production" ? "/An-s-Technology-Blog/" : "/";

// VitePress 仅支持 ES 模块导出，需替换 module.exports 为 export default
export default {
  // ===================== 顶层全局配置 =====================
  base: base, // 站点基础路径
  title: "小安的技术博客", // 网站标题
  description:
    "专注前端技术分享，包含VuePress建站、Vue/React框架、工程化工具等实战内容", // 网站描述
  lang: "zh-CN", // 站点语言
  appearance: true, // 启用深色模式切换
  ignoreDeadLinks: true, // 忽略死链，避免构建报错

  // ===================== 头部标签配置 =====================
  // .vitepress/config.js
  head: [
    // 正确写法（用模板字符串拼接整个 href 属性值）
    // ["link", { rel: "icon", href: `${base}favicon.ico` }],
    ["link", { rel: "icon", href: `${base}favicon.ico` }],
  ],

  // ===================== Markdown 配置 =====================
  markdown: {
    headers: {
      level: [1, 2, 3],
    },
  },

  // ===================== 主题配置 =====================
  themeConfig: {
    logo: "/favicon.ico", // 站点 Logo，路径相对于 base
    // 新增：默认收起左侧侧边栏（全局生效）
    sidebarCollapsed: true,

    // 顶部导航栏配置
    nav: navigateConfig,

    // 侧边栏配置
    sidebar: sidebarConfig,

    // 页面底部配置
    lastUpdated: {
      text: "最后更新于",
    },

    // 编辑此页链接配置
    editLink: {
      pattern:
        "https://github.com/unicon-ajl/An-s-Technology-Blog/edit/master/:path",
      text: "发现错误？点击编辑",
    },

    // 页脚配置
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2025 小安 版权所有",
    },

    // 大纲导航配置
    outline: {
      level: [1, 2, 3],
      label: "页面目录",
    },

    // 搜索配置
    search: {
      provider: "local",
      // 【必选】参与搜索的文件范围（glob 语法）
      include: [
        "**/*.md", // 所有 Markdown 文件
        "**/*.html", // 所有 HTML 文件（若有）
      ],

      // 【可选】排除不参与搜索的文件/目录
      exclude: [
        "**/node_modules/**", // 排除 node_modules
        "**/dist/**", // 排除构建产物
        "**/public/**", // 排除静态资源目录
        "**/README.md", // （可选）排除根目录 README
      ],

      // 【可选】搜索结果最大显示数量（默认：10）
      limit: 15,

      // 【可选】是否区分大小写（默认：false，不区分）
      caseSensitive: false,

      // 【可选】搜索框占位提示文字
      placeholder: "搜索文档内容...",

      // 【可选】无匹配结果时的提示文字
      emptyText: "未找到相关内容",

      // 【可选】搜索结果的标题长度限制（避免过长）
      resultTitleLength: 50,

      // 【可选】搜索结果的描述长度限制
      resultDescriptionLength: 100,

      // 【可选】是否高亮搜索关键词（默认：true）
      highlightMatches: true,
    },

    // 启用页面滚动
    smoothScroll: true,
    // 启用返回顶部按钮
    backToTop: true,
  },

  // ===================== 构建配置 =====================
  build: {
    // 修正：使用 VitePress 标准输出目录（避免路径错误）
    outDir: ".vitepress/dist",
    target: "esnext",
  },

  // ===================== 插件配置 =====================
  vite: {
    plugins: [
      // 插件需安装后取消注释，且确保类名适配 VitePress
      // mediumZoomPlugin({ selector: ".VPContent img" }),
      // fullTextSearchPlugin(),
    ],
  },
};
