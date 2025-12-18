// .vitepress/theme/index.js
import { h, onMounted } from "vue"; // 仅保留必要依赖
import DefaultTheme from "vitepress/theme";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 仅用 onMounted 保证在浏览器端执行（无需 isClient）
    onMounted(() => {
      // 监听全局图片点击事件
      document.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG" && e.target.closest(".VPContent")) {
          e.target.style.opacity = "0";

          const zoomOverlay = document.createElement("div");
          zoomOverlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            cursor: zoom-out;
          `;

          const zoomImg = document.createElement("img");
          zoomImg.src = e.target.src;
          zoomImg.style.cssText = `
            max-width: 95%; max-height: 95%;
            transition: transform 0.2s ease;
          `;

          zoomOverlay.appendChild(zoomImg);
          document.body.appendChild(zoomOverlay);
          zoomOverlay.addEventListener("click", () => {
            e.target.style.opacity = "1";
            document.body.removeChild(zoomOverlay);
          });
        }
      });
    });
  },
};
