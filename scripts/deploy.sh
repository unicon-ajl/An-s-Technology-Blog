#!/usr/bin/env sh
set -e

# ===================== 配置项（修正为实际路径） =====================
REPO_URL="https://github.com/unicon-ajl/An-s-Technology-Blog.git"
DEPLOY_BRANCH="gh-pages"
BUILD_DIR=".vitepress/dist" # 匹配截图中 dist 所在路径
BASE="/"

# ===================== 执行打包 =====================
echo "🔨 开始打包 VitePress 项目..."
yarn install
yarn build

# ===================== 部署到 GitHub Pages =====================
echo "🚀 开始部署到 GitHub Pages..."
cd ../$BUILD_DIR # 进入 .vitepress/dist

git init
git add -A
git commit -m "deploy: $(date +'%Y-%m-%d %H:%M:%S')"
git push -f $REPO_URL master:$DEPLOY_BRANCH

cd -
rm -rf $BUILD_DIR/.git

echo "✅ 部署完成！访问地址：https://unicon-ajl.github.io/An-s-Technology-Blog/"