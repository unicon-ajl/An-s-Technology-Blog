<template>
	<button class="back-to-top" @click="scrollToTop" :class="{ 'show': isVisible }" aria-label="回到顶部">
		<!-- SVG 箭头图标 -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 8.414l4.293 4.293 1.414-1.414L12 5.586 6.293 11.293 7.707 12.707 12 8.414z" />
		</svg>
	</button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

// 监听滚动，控制按钮显示/隐藏
const handleScroll = () => {
	isVisible.value = window.scrollY > 300 // 滚动超过300px显示
}

// 平滑回到顶部
const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 挂载/卸载滚动监听
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.back-to-top {
	/* 原有样式保持不变 */
	position: fixed;
	bottom: 32px;
	right: 32px;
	width: 42px;
	height: 42px;
	border: none;
	border-radius: 16px;
	background: linear-gradient(135deg, #3b82f6, #2563eb);
	color: #fff;
	cursor: pointer;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	z-index: 999;
	box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
	/* 关键：按钮内居中（覆盖默认对齐） */
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	/* 清除默认内边距干扰 */
}

/* 新增：强制SVG在按钮内居中 */
.back-to-top svg {
	width: 24px;
	height: 24px;
	/* 若仍有偏移，可加微小的位置调整（比如y轴微调） */
	/* transform: translateY(-1px); */
}

/* 其他样式（show、hover）保持不变 */
.back-to-top.show {
	opacity: 1;
	visibility: visible;
	transform: translateY(0);
}

.back-to-top:hover {
	background: linear-gradient(135deg, #2563eb, #1d4ed8);
	box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
	transform: translateY(-2px);
}
</style>