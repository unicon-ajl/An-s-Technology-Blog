// .vitepress/theme/index.js
import { h } from "vue"
import DefaultTheme from "vitepress/theme"
import "./style/index.css"
import BackToTop from "./components/BackToTop.vue"
import { initSidebarToggle } from "./modules/sidebar-toggle"

export default {
  ...DefaultTheme,
  Layout() {
    // 页面渲染后执行（确保DOM已加载）
    setTimeout(initSidebarToggle, 0)

    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(BackToTop),
    })
  },
}
