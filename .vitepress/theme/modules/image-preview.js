// 图片预览：独立插件，通过mixin注册
import "../style/image-preview.css"

// 生成图片预览的mixin
export function createImagePreviewMixin() {
  return {
    mounted() {
      this.$nextTick(() => {
        this.unbindImageClick()
        this.bindImageClick()
      })
    },
    beforeUnmount() {
      this.unbindImageClick()
      const overlay = document.getElementById("image-preview-overlay")
      if (overlay) overlay.remove()
      document.body.style.overflow = ""
    },
    methods: {
      bindImageClick() {
        const imgs = document.querySelectorAll("img:not(.image-preview-img)")
        imgs.forEach((img) => {
          if (
            img.closest(".VPNavBar") ||
            img.alt === "logo" ||
            img.src.includes("favicon")
          )
            return

          img.style.cursor = "zoom-in"
          img.style.transition = "cursor 0.2s ease"
          img.addEventListener("click", this.handleImageClick)
        })
      },
      unbindImageClick() {
        const imgs = document.querySelectorAll("img")
        imgs.forEach((img) => {
          img.removeEventListener("click", this.handleImageClick)
        })
      },
      handleImageClick(e) {
        e.stopPropagation()
        const targetImg = e.target

        let overlay = document.getElementById("image-preview-overlay")
        if (overlay) overlay.remove()

        // 1. 创建遮罩层
        overlay = document.createElement("div")
        overlay.id = "image-preview-overlay"
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
        `

        // 2. 关闭按钮
        const closeBtn = document.createElement("button")
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
        `
        closeBtn.innerHTML = "×"
        closeBtn.addEventListener("mouseover", () => {
          closeBtn.style.background = "rgba(255, 255, 255, 0.4)"
        })
        closeBtn.addEventListener("mouseout", () => {
          closeBtn.style.background = "rgba(255, 255, 255, 0.2)"
        })

        // 3. 图片容器
        const imgContainer = document.createElement("div")
        imgContainer.style.cssText = `
          position: relative;
          max-width: 90%;
          max-height: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
        `

        // 4. 预览图片
        const previewImg = document.createElement("img")
        previewImg.className = "image-preview-img"
        previewImg.style.cssText = `
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 4px;
          transform: scale(0.95);
          transition: transform 0.3s ease;
          cursor: grab;
        `
        previewImg.src = targetImg.src
        previewImg.alt = targetImg.alt || "预览图片"
        imgContainer.appendChild(previewImg)

        // 5. 关闭函数
        const closePreview = () => {
          overlay.style.opacity = "0"
          previewImg.style.transform = "scale(0.95)"
          setTimeout(() => overlay.remove(), 300)
          document.body.style.overflow = ""
        }

        // 6. 绑定关闭事件
        closeBtn.addEventListener("click", closePreview)
        overlay.addEventListener("click", closePreview)
        imgContainer.addEventListener("click", (e) => e.stopPropagation())
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closePreview()
        })

        // 7. 加载完成后初始化交互
        previewImg.onload = () => {
          overlay.style.opacity = "1"
          previewImg.style.transform = "scale(1)"

          let scale = 1
          let posX = 0,
            posY = 0
          let isDragging = false
          let pressTimer = null
          const LONG_PRESS_TIME = 300
          let startX = 0,
            startY = 0

          // 滚轮缩放
          previewImg.addEventListener("wheel", (e) => {
            e.preventDefault()
            const delta = e.deltaY > 0 ? -0.1 : 0.1
            scale = Math.max(0.5, Math.min(2, scale + delta))
            previewImg.style.transform = `scale(${scale})`
          })

          // 长按拖拽
          previewImg.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return
            startX = e.clientX - posX
            startY = e.clientY - posY

            pressTimer = setTimeout(() => {
              isDragging = true
              previewImg.style.cursor = "grabbing"
            }, LONG_PRESS_TIME)
            e.stopPropagation()
          })

          document.addEventListener("mousemove", (e) => {
            if (!isDragging) return
            posX = e.clientX - startX
            posY = e.clientY - startY
            imgContainer.style.transform = `translate(${posX}px, ${posY}px)`
          })

          const stopDrag = () => {
            clearTimeout(pressTimer)
            pressTimer = null
            isDragging = false
            previewImg.style.cursor = "grab"
          }

          document.addEventListener("mouseup", stopDrag)
          document.addEventListener("mouseleave", stopDrag)
        }

        // 8. 组装DOM
        overlay.appendChild(closeBtn)
        overlay.appendChild(imgContainer)
        document.body.appendChild(overlay)
        document.body.style.overflow = "hidden"
      },
    },
  }
}
