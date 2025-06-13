# 工具使用

这里整理了我在开发过程中常用的工具和配置，帮助提高开发效率。

## 开发工具清单

### 代码编辑器
- **VS Code** - 微软出品的免费代码编辑器
- **WebStorm** - JetBrains 的专业前端 IDE
- **Sublime Text** - 轻量级文本编辑器

### 版本控制
- **Git** - 分布式版本控制系统
- **GitHub** - 代码托管平台
- **GitLab** - 企业级代码托管

### 设计工具
- **Figma** - 在线设计协作工具
- **Sketch** - MacOS 设计工具
- **Adobe XD** - Adobe 设计套件

## 必备插件和扩展

### VS Code 插件推荐
| 插件名称              | 功能描述            | 重要程度 |
| --------------------- | ------------------- | -------- |
| Chinese Language Pack | 中文语言包          | ⭐⭐⭐⭐⭐    |
| Prettier              | 代码格式化          | ⭐⭐⭐⭐⭐    |
| ESLint                | JavaScript 代码检查 | ⭐⭐⭐⭐⭐    |
| Auto Rename Tag       | 自动重命名HTML标签  | ⭐⭐⭐⭐     |
| Live Server           | 本地开发服务器      | ⭐⭐⭐⭐     |
| GitLens               | Git 增强工具        | ⭐⭐⭐⭐     |

### 浏览器插件
- **Vue DevTools** - Vue.js 调试工具
- **React DevTools** - React 调试工具
- **JSON Viewer** - JSON 格式化显示

## 常用配置

### 终端配置
```bash
# Windows 推荐使用 PowerShell 或 Windows Terminal
# 配置别名提高效率
Set-Alias ll Get-ChildItem
Set-Alias grep Select-String
```

### Git 全局配置
```bash
# 用户信息
git config --global user.name "你的姓名"
git config --global user.email "你的邮箱"

# 常用别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

## 效率提升技巧

::: tip 快捷键
- `Ctrl + Shift + P` - VS Code 命令面板
- `Ctrl + `` ` - 打开/关闭终端
- `Ctrl + Shift + E` - 文件资源管理器
- `Ctrl + Shift + F` - 全局搜索
:::

::: warning 注意
定期备份你的配置文件，可以使用 VS Code 的设置同步功能。
:::

## 内容导航

| 主题                              | 描述                   | 状态     |
| --------------------------------- | ---------------------- | -------- |
| [Git 使用指南](./git-guide)       | Git 基础命令和工作流程 | ✅ 完成   |
| [VS Code 配置](./vscode-setup)    | VS Code 个性化配置     | ✅ 完成   |
| [开发环境搭建](./dev-environment) | 各种开发环境的搭建     | 📝 计划中 |

---

*最后更新: 2024年12月*
