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
			text: "前端技术全景",
			// collapsed: true,
			items: [
				{ text: "Web 三剑客共创数字世界", link: "/front/" },
			],
		},
		{
			text: "HTML",
			collapsed: true,
			items: [
				{ text: "00-引言", link: "/front/HTML/" },
				{ text: "01-什么是HTML", link: "/front/HTML/01-什么是HTML.md" },
				{ text: "02-HTML文档结构", link: "/front/HTML/02-HTML文档结构.md" },
				{ text: "03-常用文本标签", link: "/front/HTML/03-常用文本标签.md" },
				{ text: "04-链接与图像", link: "/front/HTML/04-链接与图像.md" },
				{ text: "05-列表与语义化", link: "/front/HTML/05-列表与语义化.md" },
				{ text: "06-表格与表单基础", link: "/front/HTML/06-表格与表单基础.md" },
				{ text: "07-多媒体与嵌入内容", link: "/front/HTML/07-多媒体与嵌入内容.md" },
				{ text: "08-语义化与无障碍（a11y）", link: "/front/HTML/08-语义化与无障碍（a11y）.md" },
				{ text: "09-HTML5新特性", link: "/front/HTML/09-HTML5新特性.md" },
				{ text: "10-最佳实践与常见误区", link: "/front/HTML/10-最佳实践与常见误区.md" },
				{ text: "11-HTML与SEO", link: "/front/HTML/11-HTML与SEO.md" },
			],
		},
		{
			text: "CSS",
			collapsed: true,
			items: [
				{ text: "00-引言", link: "/front/CSS/" },
				{ text: "01-什么是CSS", link: "/front/CSS/01-什么是CSS.md" },
				{ text: "02-CSS引入方式与优先级", link: "/front/CSS/02-CSS引入方式与优先级.md" },
				{ text: "03-选择器详解", link: "/front/CSS/03-选择器详解.md" },
				{ text: "04-盒模型与布局基础", link: "/front/CSS/04-盒模型与布局基础.md" },
				{ text: "05-文本与字体样式", link: "/front/CSS/05-文本与字体样式.md" },
				{ text: "06-颜色与背景", link: "/front/CSS/06-颜色与背景.md" },
				{ text: "07-定位与层叠上下文", link: "/front/CSS/07-定位与层叠上下文.md" },
				{ text: "08-响应式设计与媒体查询", link: "/front/CSS/08-响应式设计与媒体查询.md" },
				{ text: "09-过渡、动画与变换", link: "/front/CSS/09-过渡、动画与变换.md" },
				{ text: "10-Flexbox弹性布局", link: "/front/CSS/10-Flexbox弹性布局.md" },
				{ text: "11-CSS-Grid网格布局", link: "/front/CSS/11-CSS-Grid网格布局.md" },
				{ text: "12-CSS最佳实践与性能优化", link: "/front/CSS/12-CSS最佳实践与性能优化.md" },
			],
		},
		{
			text: "JavaScript",
			collapsed: true,
			items: [
				{ text: "00-引言", link: "/front/JavaScript/" },
				{ text: "01-什么是JavaScript", link: "/front/JavaScript/01-什么是JavaScript.md" },
				{ text: "02-变量与数据类型", link: "/front/JavaScript/02-变量与数据类型.md" },
				{ text: "03-运算符与表达式", link: "/front/JavaScript/03-运算符与表达式.md" },
				{ text: "04-函数与作用域", link: "/front/JavaScript/04-函数与作用域.md" },
				{ text: "05-对象与原型链", link: "/front/JavaScript/05-对象与原型链.md" },
				{ text: "06-数组与常用方法", link: "/front/JavaScript/06-数组与常用方法.md" },
				{ text: "07-异步编程", link: "/front/JavaScript/07-异步编程.md" },
				{ text: "08-模块化与ESM", link: "/front/JavaScript/08-模块化与ESM.md" },
				{ text: "09-错误处理与调试", link: "/front/JavaScript/09-错误处理与调试.md" },
				{ text: "10-面向对象编程", link: "/front/JavaScript/10-面向对象编程.md" },
				{ text: "11-高级特性与元编程", link: "/front/JavaScript/11-高级特性与元编程.md" },
				{ text: "12-性能优化与内存管理", link: "/front/JavaScript/12-性能优化与内存管理.md" },
			],
		},
	],
}