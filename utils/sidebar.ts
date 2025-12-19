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
				{ text: "标签", link: "/front/HTML/" },
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