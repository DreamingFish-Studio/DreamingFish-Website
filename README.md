# DreamingFish Official Website

梦鱼服（DreamingFish）官网首页项目。页面定位是 Minecraft 合作多模组生存服务器的品牌展示页，包含服务器介绍、玩法特色、模组列表、加入教程、玩家作品、更新日志、背景音乐和点击特效。

当前主站也接入了下一周目「守望梦屿」的预告入口：首页会展示简短预告卡片，完整介绍页通过 `/dreamhaven` 访问。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react

## 环境要求

建议使用 Node.js 20 或更高版本。

查看当前版本：

```bash
node -v
npm -v
```

## 安装依赖

首次拉取项目后，在项目根目录执行：

```bash
npm install
```

如果 npm 下载较慢，可以使用国内镜像：

```bash
npm install --registry=https://registry.npmmirror.com --no-audit --no-fund
```

## 本地开发

启动开发服务器：

```bash
npm run dev
```

浏览器打开：

```text
http://localhost:3000
```

守望梦屿完整介绍页：

```text
http://localhost:3000/dreamhaven
```

## 生产构建

检查项目是否可以正常构建：

```bash
npm run build
```

构建完成后，本地预览生产版本：

```bash
npm run start
```

默认访问地址仍然是：

```text
http://localhost:3000
```

## 常用脚本

```bash
npm run dev
npm run build
npm run start
```

说明：

- `npm run dev`：启动开发环境。
- `npm run build`：生成生产构建并执行类型检查。
- `npm run start`：运行已构建的生产版本，需要先执行 `npm run build`。

## 内容编辑

大部分展示内容集中在：

```text
lib/site-data.ts
```

可以在这里修改：

- 导航链接
- Hero 状态卡片
- 服务器介绍卡片
- 玩法特色
- 模组列表
- 加入服务器步骤
- 玩家作品 / 截图墙
- 更新日志
- 页脚链接

首页里的守望梦屿预告区组件在：

```text
components/DreamHavenSection.tsx
```

守望梦屿完整介绍页使用从静态 HTML 接入的方式，入口路由在：

```text
app/dreamhaven/route.ts
```

对应静态页面在：

```text
public/dreamhaven/index.html
```

服务器地址和论坛地址在：

```text
lib/constants.ts
```

当前配置：

```ts
SERVER_ADDRESS = "dreamingfish.top"
FORUM_URL = "https://forum.dreamingfish.cn"
```

## 图片和音频资源

公共资源放在 `public` 目录下。

当前主要资源：

```text
public/images/hero-dreamingfish.png
public/images/about-server.png
public/audio/bg_music.mp3
public/dreamhaven/index.html
public/dreamhaven/assets/
```

玩家作品截图墙默认读取：

```text
public/images/gallery/
```

如果对应图片不存在，页面会显示渐变占位，不会导致布局崩坏。

守望梦屿页面资源路径应使用 `/dreamhaven/assets/...` 这种绝对路径，避免 `/dreamhaven` 路由下相对路径解析到错误位置。

## 主要组件

```text
components/Navbar.tsx
components/HeroSection.tsx
components/DreamHavenSection.tsx
components/AboutSection.tsx
components/FeaturesSection.tsx
components/ModsSection.tsx
components/JoinGuideSection.tsx
components/GallerySection.tsx
components/ChangelogSection.tsx
components/CTASection.tsx
components/Footer.tsx
components/CopyToast.tsx
components/MusicPlayer.tsx
components/ClickEffect.tsx
```

页面入口：

```text
app/page.tsx
```

全局样式：

```text
app/globals.css
```

## 交互说明

- 点击“复制服务器地址”会复制 `dreamingfish.top`，并显示底部居中的 Toast。
- 右下角音乐按钮控制背景音乐播放和暂停。
- 页面加载会尝试自动播放音乐。如果浏览器拦截有声自动播放，用户第一次点击、滚动、按键或触摸页面时会自动解锁播放。
- 点击页面会显示简约的随机水波 / 方块光效。
- 页面动效尊重系统的 `prefers-reduced-motion` 设置。

## Git 提交和推送

项目提供了一个 Windows 批处理脚本：

```text
commit-and-push.bat
```

双击运行后，输入本次提交信息，脚本会自动执行：

```bash
git add .
git commit -m "你的提交信息"
git push origin main
```

如果本地还没有配置 `origin`，脚本会提示输入远程仓库地址。

也可以手动提交：

```bash
git status
git add .
git commit -m "提交信息"
git push origin main
```

## 部署建议

这是标准 Next.js 项目，可以部署到：

- Vercel
- Netlify
- Cloudflare Pages
- 自有服务器

部署前建议先本地运行：

```bash
npm run build
```

确保构建通过后再上传或触发自动部署。

### GitHub Pages

仓库包含 `.github/workflows/deploy-pages.yml`，推送到 `main` 后会自动构建并发布静态网站。

首次部署时，在 GitHub 仓库的 `Settings > Pages` 中把 `Source` 设为 `GitHub Actions`。项目站点地址为：

```text
https://qingmo-a.github.io/DreamingFishOfficialWebsite/
```

以后需要增加文档时，可以把静态文档输出放入 `public/docs/`，发布后通过以下地址访问：

```text
https://qingmo-a.github.io/DreamingFishOfficialWebsite/docs/
```
