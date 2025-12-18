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

    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "关于", link: "/about/" },
      {
        text: "更多",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/unicon-ajl/An-s-Technology-Blog",
          },
          { text: "掘金", link: "https://juejin.cn/user/yourid" },
        ],
      },
    ],

    // 核心修正：删除重复的侧边栏分组，保持配置唯一
    sidebar: {
      "/guide/": [
        {
          text: "VuePress 入门",
          collapsible: true,
          items: [
            { text: "指南", link: "/guide/" },
            { text: "快速上手", link: "/guide/getting-started" },
            { text: "目录结构", link: "/guide/directory-structure" },
          ],
        },
        {
          text: "前端工程化",
          collapsible: true,
          items: [
            { text: "Webpack 基础", link: "/guide/webpack-basic" },
            { text: "Yarn 使用技巧", link: "/guide/yarn-usage" },
          ],
        },
      ],
      "/about/": [
        {
          text: "关于页面",
          collapsible: true,
          items: [
            { text: "首页", link: "/about/" },
            { text: "博主介绍", link: "/about/me" },
          ],
        },
        {
          text: "更多信息",
          collapsible: true,
          items: [
            { text: "联系方式", link: "/about/contact" },
            { text: "博客介绍", link: "/about/blog.md" },
          ],
        },
      ],
    },

    lastUpdated: {
      text: "最后更新于",
    },

    editLink: {
      pattern:
        "https://github.com/unicon-ajl/An-s-Technology-Blog/edit/master/:path",
      text: "发现错误？点击编辑",
    },

    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2025 小安 版权所有",
    },

    // 修正：仅显示 h2/h3 作为右侧目录（符合 VitePress 默认规范）
    outline: {
      level: [1, 2, 3],
      label: "页面目录",
    },

    smoothScroll: true,
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
