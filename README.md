# 我的学习笔记

这是我的个人学习笔记仓库，使用 VitePress 构建，部署在 GitHub Pages 上。

## 📚 内容结构

- **编程学习** - 各种编程语言和技术的学习记录
- **技术笔记** - 开发过程中的技术总结和经验分享
- **工具使用** - 开发工具的配置和使用技巧
- **项目经验** - 实际项目中的经验教训和最佳实践

## 🚀 快速开始

### 本地开发

1. 克隆仓库
```bash
git clone https://github.com/yourusername/Note.git
cd Note
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run docs:dev
```

4. 在浏览器中打开 `http://localhost:5173` 查看网站

### 构建部署

```bash
# 构建静态文件
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 📝 写作指南

### 添加新文章

1. 在相应目录下创建 `.md` 文件
2. 在配置文件中添加导航和侧边栏链接
3. 使用 Markdown 语法编写内容

### 文件结构

```
├── programming/          # 编程学习
├── tech/                # 技术笔记
├── tools/               # 工具使用
├── projects/            # 项目经验
├── .vitepress/          # VitePress 配置
│   └── config.js        # 站点配置
├── index.md             # 主页
└── package.json         # 项目配置
```

## 🛠️ 技术栈

- **VitePress** - 静态站点生成器
- **GitHub Pages** - 网站托管
- **GitHub Actions** - 自动化部署
- **Markdown** - 内容编写

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提出建议和改进意见！请通过以下方式：

1. 提交 Issue
2. 创建 Pull Request
3. 直接联系我

---

**最后更新:** 2024年12月

**在线访问:** [https://yourusername.github.io/Note/](https://yourusername.github.io/Note/)
