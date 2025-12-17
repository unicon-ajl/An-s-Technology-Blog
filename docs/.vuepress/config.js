// docs/.vuepress/config.js
module.exports = {
  // ===================== 顶层全局配置（网站基础信息） =====================
  /**
   * 网站全局标题
   * - 浏览器标签栏默认显示
   * - 首页导航栏标题来源
   * - SEO 核心标题
   */
  title: "小安的技术博客",

  /**
   * 网站全局描述（SEO 关键）
   * - 对应 HTML 的 <meta name="description"> 标签
   * - 搜索引擎结果页展示在标题下方
   * - 建议 50-100 字，简洁描述网站定位
   */
  description:
    "专注前端技术分享，包含VuePress建站、Vue/React框架、工程化工具等实战内容",

  /**
   * 部署基础路径（核心！部署时必看）
   * - 默认 "/"：部署在域名根目录（如 https://xiaonan.com/）
   * - 若部署到子路径（如 https://xiaonan.com/blog/），需改为 "/blog/"
   * - 本地开发无需修改，仅部署时调整
   */
  base: "/",

  /**
   * 语言配置（默认中文）
   * - 影响内置组件的文字（如"最后更新时间"、"编辑此页"等）
   * - 可选值：zh-CN / en-US 等
   */
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  // ===================== 主题配置（默认主题的视觉/交互） =====================
  themeConfig: {
    /**
     * 顶部导航栏配置
     * - text：导航栏显示的文字
     * - link：跳转路径（内部路径不带.md后缀，外部路径写完整URL）
     * - items：可选，用于下拉菜单
     */
    nav: [
      // 首页：对应 docs/README.md
      { text: "首页", link: "/" },
      // 指南：对应 docs/guide/README.md
      { text: "指南", link: "/guide/" },
      // 关于：对应 docs/about.md（核心修正！去掉.md后缀）
      { text: "关于", link: "/about/" },
      // 扩展：带下拉菜单的导航项（可选）
      {
        text: "更多",
        items: [
          { text: "GitHub", link: "https://github.com/yourname" }, // 外部链接
          { text: "掘金", link: "https://juejin.cn/user/yourid" }, // 外部链接
        ],
      },
    ],

    /**
     * 侧边栏配置（按路径分栏，更灵活）
     * - 键名：侧边栏生效的路径前缀（如 "/guide/" 仅对guide目录生效）
     * - title：侧边栏分组标题
     * - collapsable：是否可折叠（false=默认展开，true=默认折叠）
     * - children：子菜单（空字符串对应该目录的README.md，其余为文件名）
     */
    sidebar: {
      // 仅对 /guide/ 路径生效的侧边栏
      "/guide/": [
        {
          title: "VuePress 入门", // 分组标题
          collapsable: true, // 禁止折叠（新手推荐）
          // 子菜单：对应 docs/guide/ 下的文件
          children: [
            "", // 空字符串 → /guide/ → docs/guide/README.md
            ["getting-started", "快速上手"], // → /guide/getting-started/ → docs/guide/getting-started.md
            ["directory-structure", "目录结构"], // 扩展：新增目录结构说明页 → docs/guide/directory-structure.md
          ],
        },
        // 扩展：新增第二个侧边栏分组（可选）
        {
          title: "前端工程化",
          collapsable: true, // 可折叠（点击展开/收起）
          children: [
            ["webpack-basic", "Webpack 基础"], // → docs/guide/webpack-basic.   md
            ["yarn-usage", "Yarn 使用技巧"], // → docs/guide/yarn-usage.md
          ],
        },
      ],
      // 扩展：给 /about/ 路径单独配置侧边栏（可选，也可设为false关闭）
      "/about/": [
        {
          title: "关于页面",
          collapsable: false,
          children: [""], // 对应 /about/ → docs/about.md
        },
      ],
    },

    /**
     * 最后更新时间（基于Git提交记录）
     * - 显示在页面底部
     * - 需满足：项目已初始化Git（git init），文件已提交（git add & git commit）
     * - 字符串值为自定义提示文字
     */
    lastUpdated: "最后更新时间",

    /**
     * 编辑此页（可选，需配置Git仓库）
     * - 显示在页面底部，点击跳转到Git仓库编辑对应Markdown文件
     */
    editLinks: true, // 开启编辑链接
    editLinkText: "发现错误？点击编辑", // 自定义提示文字
    // 编辑链接模板（替换为你的仓库地址）
    editLinkPattern:
      "https://github.com/unicon-ajl/An-s-Technology-Blog/edit/main/docs/:path",

    /**
     * 页脚配置（可选）
     * - 显示在网站最底部
     */
    footer: "MIT Licensed | Copyright © 2025 小安 版权所有",

    /**
     * 侧边栏深度（可选）
     * - 控制侧边栏自动生成时，显示Markdown标题的层级
     * - 1：仅显示h1，2：显示h1+h2，以此类推
     */
    sidebarDepth: 2,

    /**
     * 平滑滚动（可选）
     * - 点击锚点链接时，页面平滑滚动（而非瞬间跳转）
     */
    smoothScroll: true,
  },

  // ===================== 额外配置（扩展功能） =====================
  /**
   * 插件配置（可选，示例：开启代码复制功能）
   * - VuePress 1.x 内置插件，无需额外安装
   */
  plugins: [
    // 代码块复制按钮
    ["@vuepress/back-to-top", true], // 回到顶部按钮
    [
      "@vuepress/medium-zoom",
      {
        // 图片点击放大
        selector: ".content-container img",
      },
    ],
  ],

  /**
   * 自定义页面模板（可选）
   * - 覆盖默认的HTML模板，一般无需修改
   */
  // templateDev: './.vuepress/templates/dev.html',
  // templateBuild: './.vuepress/templates/build.html',

  /**
   * 构建配置（可选）
   * - 控制打包后的文件路径、压缩等
   */
  dest: "./docs/.vuepress/dist", // 打包输出目录（默认）
  evergreen: true, // 仅针对现代浏览器打包（减小体积）
};
