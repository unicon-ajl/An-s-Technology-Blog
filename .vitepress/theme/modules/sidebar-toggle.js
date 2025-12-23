/**
 * 侧边栏收缩/展开按钮控制模块
 * 功能：
 * 1. 仅在宽度>960px且非首页（路径≠/）时显示按钮
 * 2. 按钮插入到搜索框子元素中
 * 3. 响应窗口缩放、路由变化自动创建/销毁按钮
 * 4. 点击按钮控制侧边栏、内容区、右侧目录的样式切换
 */
export function initSidebarToggle() {
  // ========== 状态管理 ==========
  let isSidebarCollapsed = false // 侧边栏是否收缩（语义化命名）
  let toggleButton = null // 收缩按钮DOM引用
  let buttonClickHandler = null // 按钮点击事件引用
  let resizeTimer = null // 窗口缩放防抖计时器

  // ========== DOM选择器常量（统一管理，便于维护） ==========
  const SELECTORS = {
    sidebar: ".VPSidebar",
    vpContent: "#VPContent",
    header: "header",
    contentContainer: ".VPDoc .content-container",
    // docAside: ".VPDoc .aside",
    searchBox: ".VPNavBarSearch.search",
  }

  // ========== 工具函数 ==========
  /**
   * 安全获取DOM元素
   * @param {string} selector - CSS选择器
   * @returns {HTMLElement|null}
   */
  const getElement = (selector) => {
    const element = document.querySelector(selector)
    if (!element) {
      console.warn(`[SidebarToggle] 未找到元素: ${selector}`)
    }
    return element
  }

  /**
   * 销毁收缩按钮（移除DOM+解绑事件）
   */
  const destroyToggleButton = () => {
    if (toggleButton && buttonClickHandler) {
      // 解绑点击事件
      toggleButton.removeEventListener("click", buttonClickHandler)
      buttonClickHandler = null

      // 从DOM移除按钮
      toggleButton.parentNode?.removeChild(toggleButton)
      toggleButton = null
    }
    // 重置收缩状态
    isSidebarCollapsed = false
  }

  // ========== 核心业务逻辑 ==========
  /**
   * 处理按钮点击事件（控制侧边栏样式切换）
   */
  const handleToggleClick = () => {
    // 安全获取所有需要操作的DOM元素
    const sidebar = getElement(SELECTORS.sidebar)
    const vpContent = getElement(SELECTORS.vpContent)
    const header = getElement(SELECTORS.header)
    const contentContainer = getElement(SELECTORS.contentContainer)
    // const docAside = getElement(SELECTORS.docAside)

    // 元素不全则终止执行
    // if (!sidebar || !vpContent || !header || !contentContainer || !docAside) return
    if (!sidebar || !vpContent || !header || !contentContainer) return

    if (isSidebarCollapsed) {
      // 展开侧边栏：恢复默认样式
      sidebar.style.transform = "translateX(0)"
      vpContent.style.paddingLeft = ""
      header.style.background = ""
      contentContainer.style.maxWidth = "688px"
      toggleButton.textContent = "✕ 收缩"
      // 根据宽度控制右侧目录显示
      // docAside.style.display = window.innerWidth >= 1280 ? "block" : "none"
    } else {
      // 收缩侧边栏：修改样式
      sidebar.style.transform = "translateX(-100%)"
      vpContent.style.paddingLeft =
        "max(32px, calc((100% - (var(--vp-layout-max-width))) / 2))"
      header.style.background = "#fff"
      contentContainer.style.maxWidth = "100%"
      toggleButton.textContent = "☰ 展开"
      // docAside.style.display = "none"
    }

    // 切换收缩状态
    isSidebarCollapsed = !isSidebarCollapsed
  }

  /**
   * 创建收缩按钮（插入到搜索框子元素）
   */
  const createToggleButton = () => {
    // 避免重复创建
    if (toggleButton) return

    const searchBox = getElement(SELECTORS.searchBox)
    if (!searchBox) return

    // 创建按钮元素
    toggleButton = document.createElement("button")
    toggleButton.className = "sidebar-toggle-btn"
    toggleButton.textContent = "✕ 收缩"
    // 内联样式抽离，便于维护
    toggleButton.style.cssText = `
      margin-left: 12px;
      padding: 4px 8px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      background: var(--vp-c-bg);
      color: var(--vp-c-text-1);
      cursor: pointer;
      font-size: 12px;
      vertical-align: middle;
    `

    // 绑定点击事件并保存引用
    buttonClickHandler = handleToggleClick
    toggleButton.addEventListener("click", buttonClickHandler)

    // 插入到搜索框子元素中
    searchBox.appendChild(toggleButton)
  }

  /**
   * 检查按钮显示条件（宽度+路径），控制按钮创建/销毁
   */
  const checkDisplayCondition = () => {
    const currentWidth = window.innerWidth
    const currentPath = window.location.pathname
    console.debug("[SidebarToggle] 检查条件：", {
      width: currentWidth,
      path: currentPath,
    })

    // 不满足显示条件：销毁按钮
    if (currentWidth <= 960 || currentPath === "/") {
      destroyToggleButton()
      return
    }

    // 控制右侧目录默认显示状态
    // const docAside = getElement(SELECTORS.docAside)
    // if (docAside) {
    //   docAside.style.display = currentWidth >= 1280 ? "block" : "none"
    // }

    // 满足显示条件：创建按钮
    createToggleButton()
  }

  /**
   * 监听VitePress前端路由变化（覆盖pushState/replaceState）
   */
  const watchRouterChange = () => {
    // 保存原始方法，避免覆盖后丢失功能
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    // 重写pushState：路由变化后检查按钮状态
    history.pushState = function (...args) {
      originalPushState.apply(this, args)
      checkDisplayCondition()
    }

    // 重写replaceState：路由变化后检查按钮状态
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args)
      checkDisplayCondition()
    }
  }

  /**
   * 初始化窗口缩放监听（防抖处理）
   */
  const initResizeListener = () => {
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkDisplayCondition, 50)
    }
    window.addEventListener("resize", handleResize)
    return handleResize // 返回句柄，便于卸载
  }

  // ========== 初始化执行 ==========
  // 1. 初始检查显示条件
  checkDisplayCondition()

  // 2. 监听前端路由变化
  watchRouterChange()

  // 3. 初始化窗口缩放监听
  const resizeHandler = initResizeListener()

  // 4. 监听浏览器前进/后退
  window.addEventListener("popstate", checkDisplayCondition)

  // ========== 卸载清理（返回清理函数，支持组件卸载时调用） ==========
  return () => {
    // 销毁按钮
    destroyToggleButton()
    // 解绑全局事件
    window.removeEventListener("resize", resizeHandler)
    window.removeEventListener("popstate", checkDisplayCondition)
    // 清除防抖计时器
    clearTimeout(resizeTimer)
    // 重置history方法（可选，还原原始方法）
    history.pushState = originalPushState
    history.replaceState = originalReplaceState
  }
}
