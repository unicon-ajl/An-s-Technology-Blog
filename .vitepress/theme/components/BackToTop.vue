<template>
	<button class="back-to-top" @click="scrollToTop" :class="{ 'show': isVisible }" aria-label="回到顶部">
		<!-- 可替换为 SVG 图标 -->
		↑
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
	position: fixed;
	bottom: 24px;
	right: 24px;
	width: 40px;
	height: 40px;
	border: none;
	border-radius: 50%;
	background: #3b82f6;
	color: #fff;
	font-size: 18px;
	cursor: pointer;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s, visibility 0.3s;
	z-index: 999;
}

.back-to-top.show {
	opacity: 1;
	visibility: visible;
}

.back-to-top:hover {
	background: #2563eb;
}
</style>