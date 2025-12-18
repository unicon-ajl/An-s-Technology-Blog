#!/usr/bin/env sh
set -e

# ===================== 配置项（统一管理，注释清晰） =====================
# 仓库地址
REPO_URL="https://github.com/unicon-ajl/An-s-Technology-Blog.git"
# 部署分支
DEPLOY_BRANCH="gh-pages"
# 构建输出目录（相对项目根目录）
BUILD_DIR=".vitepress/dist"
# 站点基础路径
BASE="/"
# 项目根目录（脚本所在目录的上级目录，生成绝对路径）
PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)
# 构建目录绝对路径（核心优化：避免相对路径漂移）
BUILD_PATH="${PROJECT_ROOT}/${BUILD_DIR}"

# ===================== 工具函数（优雅输出日志） =====================
info() {
  echo -e "\033[32mℹ️ $1\033[0m"
}

error() {
  echo -e "\033[31m❌ $1\033[0m"
  exit 1
}

# ===================== 执行打包 =====================
info "开始打包 VitePress 项目..."
yarn install --frozen-lockfile  # 锁定依赖版本，避免意外更新
yarn build

# ===================== 校验构建目录 =====================
if [ ! -d "${BUILD_PATH}" ]; then
  error "构建目录不存在！路径：${BUILD_PATH}\n请先确保 yarn build 执行成功"
fi

# ===================== 部署到 GitHub Pages =====================
info "开始部署到 GitHub Pages..."
# 进入构建目录（绝对路径+容错）
cd "${BUILD_PATH}" || error "无法进入构建目录：${BUILD_PATH}"

# 初始化 git 并提交
git init
git add -A
git commit -m "deploy: $(date +'%Y-%m-%d %H:%M:%S')" || info "无更新内容，跳过提交"
git push -f "${REPO_URL}" "master:${DEPLOY_BRANCH}" || error "部署推送失败，请检查仓库权限/网络"

# ===================== 清理环境 =====================
# 回到原目录（用绝对路径更稳定）
cd "${PROJECT_ROOT}"
# 清理构建目录的 git 残留
rm -rf "${BUILD_PATH}/.git"

# ===================== 部署完成 =====================
info "部署完成！访问地址：https://unicon-ajl.github.io/An-s-Technology-Blog/"