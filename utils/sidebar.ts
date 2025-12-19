export const sidebarConfig = {
	"/guide/": [
		{
			text: "Blog 指南",
			// collapsed: false, // 可选：默认折叠（false 为默认展开）
			items: [
				{ text: "指南", link: "/guide/" },
				{ text: "博主介绍", link: "/guide/introduction" },
				{ text: "VitePress 入门", link: "/guide/vitepress-start" },
			],
		},
	],
	"/front/": [
		{
			text: "前端框架",
			// collapsed: true,
			items: [
				{ text: "介绍", link: "/front/" },
			],
		},
		{
			text: "HTML",
			collapsed: true,
			items: [
				{ text: "介绍", link: "/front/HTML/" },
				{ text: "什么是HTML", link: "/front/HTML/01-什么是HTML" },
				{ text: "HTML文档结构", link: "/front/HTML/02-HTML文档结构" },
				{ text: "常用文本标签", link: "/front/HTML/03-常用文本标签" },
				{ text: "链接与图像", link: "/front/HTML/04-链接与图像" },
				{ text: "列表与语义化", link: "/front/HTML/05-列表与语义化" },
				{ text: "表格与表单基础", link: "/front/HTML/06-表格与表单基础" },
				{ text: "多媒体与嵌入内容", link: "/front/HTML/07-多媒体与嵌入内容" },
				{ text: "语义化与无障碍（a11y）", link: "/front/HTML/08-语义化与无障碍（a11y）" },
				{ text: "HTML5 新特性", link: "/front/HTML/09-HTML5新特性" },
				{ text: "最佳实践与常见误区", link: "/front/HTML/10-最佳实践与常见误区" },
				{ text: "HTML与SEO", link: "/front/HTML/11-HTML与SEO" },
			],
		},
		{
			text: "CSS",
			collapsed: true,
			items: [
				{ text: "行内样式", link: "/front/CSS/" },
			],
		},
	],
}