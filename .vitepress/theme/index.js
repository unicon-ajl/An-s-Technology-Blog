// .vitepress/theme/index.js
import { h } from "vue";
import DefaultTheme from "vitepress/theme";

export default {
  ...DefaultTheme,
  // 渲染页面后执行
  enhanceApp({ app }) {
    // 监听全局图片点击事件
    document.addEventListener("click", (e) => {
      // 仅匹配内容区的图片
      if (e.target.tagName === "IMG" && e.target.closest(".VPContent")) {
        // 隐藏原图片
        e.target.style.opacity = "0";

        // 创建放大层
        const zoomOverlay = document.createElement("div");
        zoomOverlay.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.85); z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          cursor: zoom-out;
        `;

        // 创建放大后的图片
        const zoomImg = document.createElement("img");
        zoomImg.src = e.target.src;
        zoomImg.style.cssText = `
          max-width: 95%; max-height: 95%;
          transition: transform 0.2s ease;
        `;

        // 点击放大层关闭
        zoomOverlay.appendChild(zoomImg);
        document.body.appendChild(zoomOverlay);
        zoomOverlay.addEventListener("click", () => {
          e.target.style.opacity = "1";
          document.body.removeChild(zoomOverlay);
        });
      }
    });
  },
};
