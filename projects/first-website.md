# 第一个网站项目

这是我的第一个完整网站项目，记录了从零开始创建个人主页的全过程。

## 项目背景

作为编程学习的第一个实战项目，我决定创建一个个人主页网站来：
- 展示个人信息和技能
- 练习 HTML、CSS、JavaScript 基础
- 学习网站部署和域名配置

## 技术选择

### 前端技术栈
- **HTML5** - 页面结构
- **CSS3** - 样式和布局
- **JavaScript** - 交互功能
- **Bootstrap** - 响应式框架

### 开发工具
- **VS Code** - 代码编辑器
- **Live Server** - 本地预览
- **Git** - 版本控制

## 项目结构

```
my-website/
├── index.html          # 主页
├── about.html          # 关于页面
├── projects.html       # 项目展示
├── contact.html        # 联系页面
├── css/
│   ├── style.css      # 主样式文件
│   └── responsive.css  # 响应式样式
├── js/
│   ├── main.js        # 主要脚本
│   └── contact.js     # 联系表单脚本
├── images/            # 图片资源
└── assets/            # 其他资源
```

## 核心功能

### 1. 响应式导航栏

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#home">我的网站</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#home">首页</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#about">关于</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#projects">项目</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#contact">联系</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

### 2. 动态打字效果

```javascript
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 初始化打字效果
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.type-writer');
    const words = ['Web 开发者', '学习者', '创造者'];
    new TypeWriter(txtElement, words, 2000);
});
```

### 3. 平滑滚动效果

```css
/* 平滑滚动 */
html {
    scroll-behavior: smooth;
}

/* 导航栏样式 */
.navbar {
    transition: all 0.3s ease;
}

.navbar.scrolled {
    background-color: rgba(0, 0, 0, 0.9) !important;
    backdrop-filter: blur(10px);
}

/* 动画效果 */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.fade-in.show {
    opacity: 1;
    transform: translateY(0);
}
```

## 遇到的问题

### 1. 响应式布局问题

**问题描述**: 在移动设备上布局混乱

**解决方案**:
```css
/* 使用 Flexbox 布局 */
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

/* 媒体查询适配移动端 */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
    
    .col-md-6 {
        width: 100%;
        margin-bottom: 20px;
    }
}
```

### 2. 图片加载优化

**问题描述**: 图片加载缓慢影响用户体验

**解决方案**:
```html
<!-- 使用 lazy loading -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     loading="lazy" 
     alt="描述">

<!-- 使用 WebP 格式 -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="描述">
</picture>
```

## 部署过程

### 1. GitHub Pages 部署

```bash
# 创建 GitHub 仓库
git init
git add .
git commit -m "初始提交"
git branch -M main
git remote add origin https://github.com/username/my-website.git
git push -u origin main
```

### 2. 自定义域名配置

```
# 在仓库根目录创建 CNAME 文件
echo "www.mydomain.com" > CNAME
git add CNAME
git commit -m "添加自定义域名"
git push
```

## 性能优化

### 1. 资源压缩

```bash
# CSS 压缩
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# JavaScript 压缩
npm install -g uglify-js
uglifyjs main.js -o main.min.js
```

### 2. 缓存策略

```html
<!-- 为静态资源添加版本号 -->
<link rel="stylesheet" href="css/style.css?v=1.0.0">
<script src="js/main.js?v=1.0.0"></script>
```

## 学到的经验

::: tip 成功经验
1. **移动优先设计** - 先设计移动端，再适配桌面端
2. **渐进增强** - 基础功能优先，然后添加增强功能
3. **性能优化** - 关注加载速度和用户体验
4. **代码组织** - 保持代码结构清晰和注释完整
:::

::: warning 踩过的坑
1. **浏览器兼容性** - 没有充分测试不同浏览器
2. **SEO 优化** - 忽略了搜索引擎优化
3. **无障碍访问** - 没有考虑残障用户的访问需求
:::

## 后续改进

- [ ] 添加暗黑模式切换
- [ ] 集成 Google Analytics
- [ ] 添加博客功能
- [ ] 优化 SEO
- [ ] 添加多语言支持

## 项目链接

- **在线预览**: [https://username.github.io/my-website](https://username.github.io/my-website)  
- **源代码**: [https://github.com/username/my-website](https://github.com/username/my-website)

---

*项目完成时间: 2024年10月*  
*最后更新: 2025年6月*
