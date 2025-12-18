import DefaultTheme from "vitepress/theme";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 全局图片预览功能（仅长按左键可拖拽）
    app.mixin({
      mounted() {
        this.unbindImageClick();
        this.bindImageClick();
      },
      beforeUnmount() {
        this.unbindImageClick();
        const overlay = document.getElementById("image-preview-overlay");
        if (overlay) overlay.remove();
        document.body.style.overflow = "";
      },
      methods: {
        bindImageClick() {
          const imgs = document.querySelectorAll("img:not(.image-preview-img)");
          imgs.forEach((img) => {
            if (
              img.closest(".VPNavBar") ||
              img.alt === "logo" ||
              img.src.includes("favicon")
            )
              return;

            img.style.cursor = "zoom-in";
            img.style.transition = "cursor 0.2s ease";
            img.addEventListener("click", this.handleImageClick);
          });
        },
        unbindImageClick() {
          const imgs = document.querySelectorAll("img");
          imgs.forEach((img) => {
            img.removeEventListener("click", this.handleImageClick);
          });
        },
        handleImageClick(e) {
          e.stopPropagation();
          const targetImg = e.target;

          let overlay = document.getElementById("image-preview-overlay");
          if (overlay) overlay.remove();

          // 1. 创建遮罩层
          overlay = document.createElement("div");
          overlay.id = "image-preview-overlay";
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 20px;
            box-sizing: border-box;
          `;

          // 2. 创建右上角关闭按钮
          const closeBtn = document.createElement("button");
          closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
            z-index: 10000;
          `;
          closeBtn.innerHTML = "×";
          closeBtn.addEventListener("mouseover", () => {
            closeBtn.style.background = "rgba(255, 255, 255, 0.4)";
          });
          closeBtn.addEventListener("mouseout", () => {
            closeBtn.style.background = "rgba(255, 255, 255, 0.2)";
          });

          // 3. 图片容器（解耦缩放和拖拽）
          const imgContainer = document.createElement("div");
          imgContainer.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
          `;

          // 4. 预览图片
          const previewImg = document.createElement("img");
          previewImg.className = "image-preview-img";
          previewImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 4px;
            transform: scale(0.95);
            transition: transform 0.3s ease;
            cursor: grab;
          `;
          previewImg.src = targetImg.src;
          previewImg.alt = targetImg.alt || "预览图片";
          imgContainer.appendChild(previewImg);

          // 5. 统一关闭函数
          const closePreview = () => {
            overlay.style.opacity = "0";
            previewImg.style.transform = "scale(0.95)";
            setTimeout(() => overlay.remove(), 300);
            document.body.style.overflow = "";
          };

          // 6. 关闭事件绑定
          closeBtn.addEventListener("click", closePreview);
          overlay.addEventListener("click", closePreview);
          imgContainer.addEventListener("click", (e) => e.stopPropagation());
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closePreview();
          });

          // 7. 加载完成后初始化交互
          previewImg.onload = () => {
            overlay.style.opacity = "1";
            previewImg.style.transform = "scale(1)";

            let scale = 1; // 缩放比例
            let posX = 0,
              posY = 0; // 容器偏移量
            let isDragging = false; // 最终拖拽状态
            let pressTimer = null; // 长按计时器
            let startX = 0,
              startY = 0;
            const LONG_PRESS_TIME = 300; // 长按判定时长（ms），可自定义

            // 滚轮缩放
            previewImg.addEventListener("wheel", (e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              scale = Math.max(0.5, Math.min(2, scale + delta));
              previewImg.style.transform = `scale(${scale})`;
            });

            // 🔧 核心逻辑：长按左键判定
            previewImg.addEventListener("mousedown", (e) => {
              // 仅鼠标左键按下时触发
              if (e.button !== 0) return;

              // 记录初始位置
              startX = e.clientX - posX;
              startY = e.clientY - posY;

              // 启动长按计时器：超过设定时长才激活拖拽
              pressTimer = setTimeout(() => {
                isDragging = true;
                previewImg.style.cursor = "grabbing"; // 长按后切换鼠标样式
              }, LONG_PRESS_TIME);

              e.stopPropagation();
            });

            // 鼠标移动：仅长按激活后才执行拖拽
            document.addEventListener("mousemove", (e) => {
              if (!isDragging) return; // 未长按激活，不执行拖拽

              // 计算并更新容器偏移
              posX = e.clientX - startX;
              posY = e.clientY - startY;
              imgContainer.style.transform = `translate(${posX}px, ${posY}px)`;
            });

            // 鼠标松开/离开：清除计时器+停止拖拽
            const stopDrag = () => {
              clearTimeout(pressTimer); // 清除长按计时器
              pressTimer = null;
              isDragging = false; // 关闭拖拽状态
              previewImg.style.cursor = "grab"; // 恢复鼠标样式
            };

            document.addEventListener("mouseup", stopDrag);
            document.addEventListener("mouseleave", stopDrag);
          };

          // 8. 组装DOM
          overlay.appendChild(closeBtn);
          overlay.appendChild(imgContainer);
          document.body.appendChild(overlay);
          document.body.style.overflow = "hidden";
        },
      },
    });
  },
};
