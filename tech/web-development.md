# 技术笔记

这里记录我在开发过程中遇到的技术问题、解决方案和心得体会。

## 内容分类

### Web 开发
- **前端技术** - HTML、CSS、JavaScript 框架
- **后端开发** - Node.js、Python、数据库
- **全栈应用** - 前后端整合经验

### 移动开发
- **跨平台方案** - React Native、Flutter
- **原生开发** - iOS、Android 开发笔记
- **小程序开发** - 微信、支付宝小程序

### 工程化
- **构建工具** - Webpack、Vite、Rollup
- **包管理** - npm、yarn、pnpm
- **CI/CD** - 持续集成和部署

## 技术栈经验

### 前端框架对比

| 框架        | 优势               | 适用场景             | 学习难度 |
| ----------- | ------------------ | -------------------- | -------- |
| **React**   | 生态丰富、灵活性高 | 大型项目、复杂交互   | ⭐⭐⭐      |
| **Vue.js**  | 易学易用、文档详细 | 中小型项目、快速开发 | ⭐⭐       |
| **Angular** | 功能完整、企业级   | 大型企业应用         | ⭐⭐⭐⭐     |
| **Svelte**  | 性能优秀、包体积小 | 性能敏感应用         | ⭐⭐⭐      |

### 后端技术选择

```javascript
// Node.js - JavaScript 全栈
优势：
- 语言统一，学习成本低
- npm 生态丰富
- 适合 I/O 密集型应用

适用场景：
- API 服务
- 实时应用（WebSocket）
- 微服务架构
```

```python
# Python - 简洁高效
优势：
- 语法简洁，开发效率高
- 丰富的第三方库
- 数据科学和 AI 支持

适用场景：
- Web 应用（Django/Flask）
- 数据处理和分析
- 机器学习项目
```

## 开发经验分享

### 项目架构设计

```
典型前端项目结构：
src/
├── components/          # 公共组件
│   ├── ui/             # UI 组件
│   └── business/       # 业务组件
├── pages/              # 页面组件
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
├── services/           # API 服务
├── store/              # 状态管理
└── assets/             # 静态资源
```

### 代码规范

#### JavaScript/TypeScript

```javascript
// 1. 使用有意义的变量名
const userAccountBalance = 1000; // ✅ 清晰
const balance = 1000;            // ❌ 模糊

// 2. 函数单一职责
function calculateUserAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  return today.getFullYear() - birth.getFullYear();
}

// 3. 使用 const/let 替代 var
const API_URL = 'https://api.example.com'; // 常量
let userCount = 0;                         // 变量

// 4. 错误处理
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
```

#### CSS 最佳实践

```css
/* 1. BEM 命名规范 */
.card { }
.card__header { }
.card__title { }
.card--featured { }

/* 2. CSS 变量 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 4px;
}

/* 3. 响应式设计 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
}

/* 4. Flexbox 布局 */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 性能优化

#### 前端性能优化

```javascript
// 1. 懒加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 2. 防抖和节流
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 3. 图片懒加载
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

// 4. 缓存策略
const cache = new Map();

function memoize(fn) {
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

#### 数据库优化

```sql
-- 1. 索引优化
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_date ON orders(created_at);

-- 2. 查询优化
-- 避免 SELECT *
SELECT id, name, email FROM users WHERE status = 'active';

-- 使用 LIMIT 限制结果集
SELECT * FROM products ORDER BY created_at DESC LIMIT 10;

-- 3. 分页查询
SELECT * FROM posts 
WHERE id > 1000 
ORDER BY id 
LIMIT 20;
```

## 常见问题解决

### 跨域问题

```javascript
// 1. 开发环境代理配置 (Vite)
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}

// 2. CORS 后端配置 (Express)
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}));

// 3. JSONP 方案（仅限 GET 请求）
function jsonp(url, callback) {
  const script = document.createElement('script');
  const callbackName = 'jsonp_callback_' + Date.now();
  
  window[callbackName] = function(data) {
    callback(data);
    document.head.removeChild(script);
    delete window[callbackName];
  };
  
  script.src = `${url}?callback=${callbackName}`;
  document.head.appendChild(script);
}
```

### 状态管理

```javascript
// 1. Redux Toolkit 使用
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    }
  }
})

// 2. Zustand 状态管理
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
```

### 错误监控

```javascript
// 1. 全局错误捕获
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // 发送错误到监控服务
  reportError(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  reportError(event.reason);
});

// 2. React 错误边界
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## 开发工具推荐

### 调试工具

- **Chrome DevTools** - 浏览器调试神器
- **Vue DevTools** - Vue.js 专用调试工具
- **React DevTools** - React 开发工具
- **Redux DevTools** - Redux 状态调试

### API 测试

- **Postman** - API 测试和文档
- **Insomnia** - 轻量级 API 客户端
- **curl** - 命令行 HTTP 工具

### 性能监控

- **Lighthouse** - 网页性能评估
- **WebPageTest** - 在线性能测试
- **Bundle Analyzer** - 打包体积分析

## 学习资源

### 官方文档
- [MDN Web Docs](https://developer.mozilla.org/) - Web 技术权威文档
- [React 官方文档](https://react.dev/) - React 学习资源
- [Vue.js 官方文档](https://vuejs.org/) - Vue.js 指南

### 技术博客
- [阮一峰的网络日志](http://www.ruanyifeng.com/blog/) - 技术科普
- [张鑫旭的博客](https://www.zhangxinxu.com/) - 前端技术深度文章
- [掘金](https://juejin.cn/) - 开发者社区

### 实战项目
- [GitHub Trending](https://github.com/trending) - 热门开源项目
- [CodePen](https://codepen.io/) - 前端代码演示
- [LeetCode](https://leetcode.cn/) - 算法练习

---

*最后更新: 2024年12月*
