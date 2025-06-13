# VS Code 配置

Visual Studio Code 是目前最受欢迎的代码编辑器之一。本文分享我的 VS Code 配置和使用技巧。

## 基础配置

### 必装插件

| 插件名称                   | 功能                | 重要程度 |
| -------------------------- | ------------------- | -------- |
| **Chinese (Simplified)**   | 中文界面            | ⭐⭐⭐⭐⭐    |
| **Prettier**               | 代码格式化          | ⭐⭐⭐⭐⭐    |
| **ESLint**                 | JavaScript 语法检查 | ⭐⭐⭐⭐⭐    |
| **Auto Rename Tag**        | HTML 标签自动重命名 | ⭐⭐⭐⭐     |
| **Bracket Pair Colorizer** | 括号颜色匹配        | ⭐⭐⭐⭐     |
| **Live Server**            | 本地服务器          | ⭐⭐⭐⭐     |
| **GitLens**                | Git 增强            | ⭐⭐⭐⭐     |

### 编程语言插件

```javascript
// JavaScript/TypeScript
- JavaScript (ES6) code snippets
- TypeScript Hero
- Vetur (Vue.js)

// Python
- Python
- Python Docstring Generator
- Pylance

// Markdown
- Markdown All in One
- Markdown Preview Enhanced
```

## 个性化设置

### settings.json 配置

```json
{
  // 编辑器设置
  "editor.fontSize": 14,
  "editor.fontFamily": "'Cascadia Code', 'Fira Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "editor.rulers": [80, 120],
  
  // 自动保存和格式化
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  
  // 代码提示
  "editor.suggestSelection": "first",
  "editor.quickSuggestions": {
    "strings": true
  },
  
  // 主题和图标
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme",
  
  // 终端设置
  "terminal.integrated.fontSize": 12,
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  
  // 文件关联
  "files.associations": {
    "*.vue": "vue",
    "*.wxml": "html",
    "*.wxss": "css"
  },
  
  // Prettier 配置
  "prettier.singleQuote": true,
  "prettier.semi": false,
  "prettier.trailingComma": "es5",
  
  // ESLint 配置
  "eslint.enable": true,
  "eslint.autoFixOnSave": true
}
```

### keybindings.json 快捷键

```json
[
  {
    "key": "ctrl+d",
    "command": "editor.action.deleteLines"
  },
  {
    "key": "ctrl+shift+d",
    "command": "editor.action.copyLinesDownAction"
  },
  {
    "key": "alt+up",
    "command": "editor.action.moveLinesUpAction"
  },
  {
    "key": "alt+down",
    "command": "editor.action.moveLinesDownAction"
  }
]
```

## 实用技巧

### 多光标编辑

```bash
# 选择相同单词
Ctrl + D              # 选择下一个相同单词
Ctrl + Shift + L      # 选择所有相同单词
Alt + Click           # 添加光标
Ctrl + Alt + Up/Down  # 在上下行添加光标
```

### 快速导航

```bash
# 文件操作
Ctrl + P              # 快速打开文件
Ctrl + Shift + P      # 命令面板
Ctrl + Shift + E      # 文件资源管理器
Ctrl + Shift + F      # 全局搜索
Ctrl + Shift + G      # Git 面板

# 编辑操作
Ctrl + /              # 注释/取消注释
Ctrl + Shift + K      # 删除当前行
Ctrl + Enter          # 在下方插入新行
Ctrl + Shift + Enter  # 在上方插入新行
```

### 代码片段 (Snippets)

创建自定义代码片段：

```json
// JavaScript 片段
{
  "Console Log": {
    "prefix": "clg",
    "body": [
      "console.log('$1:', $1);"
    ],
    "description": "快速输出console.log"
  },
  
  "Arrow Function": {
    "prefix": "arrf",
    "body": [
      "const $1 = ($2) => {",
      "  $3",
      "}"
    ],
    "description": "箭头函数模板"
  },
  
  "Vue Component": {
    "prefix": "vue",
    "body": [
      "<template>",
      "  <div class=\"$1\">",
      "    $2",
      "  </div>",
      "</template>",
      "",
      "<script>",
      "export default {",
      "  name: '$1',",
      "  data() {",
      "    return {",
      "      $3",
      "    }",
      "  }",
      "}",
      "</script>",
      "",
      "<style scoped>",
      ".$1 {",
      "  $4",
      "}",
      "</style>"
    ],
    "description": "Vue 组件模板"
  }
}
```

## 调试功能

### JavaScript 调试

```json
// launch.json 配置
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/app.js"
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Chrome 调试",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### 调试技巧

- **断点设置** - 点击行号左侧设置断点
- **条件断点** - 右键断点设置条件
- **变量监视** - 在 Watch 面板添加变量
- **调用堆栈** - 查看函数调用路径

## 工作区管理

### 多项目工作区

```json
// workspace.code-workspace
{
  "folders": [
    {
      "name": "前端项目",
      "path": "./frontend"
    },
    {
      "name": "后端项目", 
      "path": "./backend"
    }
  ],
  "settings": {
    "typescript.preferences.useAliasesForRenames": false
  }
}
```

### 任务自动化

```json
// tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "构建项目",
      "type": "shell",
      "command": "npm",
      "args": ["run", "build"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always"
      }
    },
    {
      "label": "启动开发服务器",
      "type": "shell", 
      "command": "npm",
      "args": ["run", "dev"],
      "group": "build",
      "isBackground": true
    }
  ]
}
```

## 团队协作

### EditorConfig

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,ts,vue}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

### 工作区设置同步

启用 Settings Sync 功能：
1. 登录 GitHub 账号
2. 开启设置同步
3. 选择要同步的内容：
   - Settings
   - Keybindings
   - Extensions
   - Snippets

## 性能优化

### 提升启动速度

```json
{
  // 禁用不需要的功能
  "telemetry.enableTelemetry": false,
  "workbench.startupEditor": "none",
  "extensions.autoUpdate": false,
  
  // 减少文件监视
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/dist/**": true
  },
  
  // 搜索排除
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true
  }
}
```

### 内存优化

- 关闭不需要的扩展
- 限制打开的文件数量
- 定期重启 VS Code
- 清理无用的工作区

## 高级功能

### 正则表达式搜索

使用正则表达式进行复杂搜索替换：

```regex
# 查找所有 console.log
console\.log\([^)]*\)

# 替换为注释
// console.log($1)

# 查找函数定义
function\s+(\w+)\s*\([^)]*\)

# 重构为箭头函数
const $1 = () =>
```

### 代码重构

- **重命名符号** - F2 重命名变量/函数
- **提取方法** - 选中代码后右键提取
- **自动导入** - 自动添加 import 语句
- **代码格式化** - Shift+Alt+F 格式化

## 推荐主题和字体

### 热门主题

- **One Dark Pro** - 暗色主题，护眼舒适
- **Dracula** - 紫色系暗色主题
- **Material Theme** - Google Material 设计
- **Monokai Pro** - 经典 Monokai 升级版

### 编程字体

- **Cascadia Code** - 微软开源编程字体
- **Fira Code** - 支持连字符的字体
- **Source Code Pro** - Adobe 开源字体
- **JetBrains Mono** - JetBrains 开发的字体

## 故障排除

### 常见问题

1. **扩展冲突** - 禁用扩展逐一排查
2. **设置丢失** - 检查设置同步状态
3. **性能问题** - 查看扩展占用情况
4. **调试失败** - 检查 launch.json 配置

### 重置设置

```bash
# 完全重置 VS Code
1. 关闭 VS Code
2. 删除用户设置目录：
   Windows: %APPDATA%\Code
   macOS: ~/Library/Application Support/Code
   Linux: ~/.config/Code
3. 重新启动 VS Code
```

## 学习资源

- [VS Code 官方文档](https://code.visualstudio.com/docs)
- [VS Code 技巧集合](https://github.com/Microsoft/vscode-tips-and-tricks)
- [VS Code 键盘快捷键](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

---

*最后更新: 2024年12月*
