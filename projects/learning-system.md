# 学习管理系统项目

这是我开发的一个完整的学习管理系统，记录了从需求分析到部署上线的完整过程。

## 项目概述

### 项目背景
开发一个在线学习平台，支持课程管理、在线学习、作业提交、成绩统计等功能。

### 技术栈选择

**前端技术栈：**
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Ant Design** - UI 组件库
- **React Router** - 路由管理
- **Zustand** - 状态管理
- **React Query** - 数据获取和缓存

**后端技术栈：**
- **Node.js** + **Express** - 服务端框架
- **TypeScript** - 类型安全
- **MongoDB** - 数据库
- **Mongoose** - ODM 框架
- **JWT** - 身份认证
- **Multer** - 文件上传

**部署和工具：**
- **Docker** - 容器化部署
- **GitHub Actions** - CI/CD
- **Nginx** - 反向代理
- **PM2** - 进程管理

## 需求分析

### 用户角色

| 角色       | 权限     | 主要功能                     |
| ---------- | -------- | ---------------------------- |
| **学生**   | 基础用户 | 学习课程、提交作业、查看成绩 |
| **教师**   | 内容管理 | 创建课程、发布作业、评分     |
| **管理员** | 系统管理 | 用户管理、课程审核、数据统计 |

### 核心功能

1. **用户管理**
   - 注册登录
   - 个人信息管理
   - 角色权限控制

2. **课程管理**
   - 课程创建和编辑
   - 章节内容管理
   - 视频/文档上传

3. **学习功能**
   - 在线观看视频
   - 阅读文档资料
   - 学习进度跟踪

4. **作业系统**
   - 作业发布和提交
   - 在线批改
   - 成绩统计

## 系统设计

### 数据库设计

```javascript
// 用户模型
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  profile: {
    avatar: String,
    name: String,
    phone: String,
    bio: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 课程模型
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  duration: Number, // 课程时长（分钟）
  thumbnail: String,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chapters: [{
    title: String,
    order: Number,
    lessons: [{
      title: String,
      type: { type: String, enum: ['video', 'document', 'quiz'] },
      content: String, // 视频URL或文档内容
      duration: Number,
      order: Number
    }]
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 作业模型
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dueDate: Date,
  maxScore: { type: Number, default: 100 },
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    files: [String], // 文件路径
    submittedAt: { type: Date, default: Date.now },
    score: Number,
    feedback: String,
    gradedAt: Date
  }],
  createdAt: { type: Date, default: Date.now }
});
```

### API 设计

```javascript
// 认证相关
POST /api/auth/register       // 用户注册
POST /api/auth/login          // 用户登录
POST /api/auth/logout         // 用户登出
GET  /api/auth/profile        // 获取用户信息
PUT  /api/auth/profile        // 更新用户信息

// 课程相关
GET    /api/courses           // 获取课程列表
POST   /api/courses           // 创建课程（教师）
GET    /api/courses/:id       // 获取课程详情
PUT    /api/courses/:id       // 更新课程（教师）
DELETE /api/courses/:id       // 删除课程（教师）
POST   /api/courses/:id/enroll // 报名课程（学生）

// 作业相关
GET    /api/assignments       // 获取作业列表
POST   /api/assignments       // 创建作业（教师）
GET    /api/assignments/:id   // 获取作业详情
POST   /api/assignments/:id/submit // 提交作业（学生）
PUT    /api/assignments/:id/grade  // 批改作业（教师）
```

## 核心功能实现

### 用户认证系统

```javascript
// JWT 中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '访问令牌不存在' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: '令牌无效' });
    }
    req.user = user;
    next();
  });
};

// 权限检查中间件
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '权限不足' });
    }
    next();
  };
};

// 登录接口
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }
    
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }
    
    // 生成 JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});
```

### 文件上传处理

```javascript
// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB 限制
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|avi|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('不支持的文件类型'));
    }
  }
});

// 文件上传接口
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '没有文件上传' });
  }
  
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    url: fileUrl
  });
});
```

### 前端状态管理

```typescript
// Zustand 状态管理
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      throw new Error('登录失败');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateProfile: async (profile: Partial<User>) => {
    try {
      const response = await api.put('/auth/profile', profile);
      set({ user: response.data });
    } catch (error) {
      throw new Error('更新失败');
    }
  }
}));

// React Query 数据获取
const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/courses');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5分钟
  });
};

const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (courseData: CreateCourseData) => {
      const response = await api.post('/courses', courseData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
```

## 遇到的挑战

### 1. 视频流媒体处理

**问题：** 大视频文件上传和播放性能问题

**解决方案：**
```javascript
// 视频分片上传
const uploadVideoChunks = async (file, onProgress) => {
  const CHUNK_SIZE = 1024 * 1024; // 1MB
  const chunks = Math.ceil(file.size / CHUNK_SIZE);
  const uploadId = Date.now().toString();
  
  for (let i = 0; i < chunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);
    
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('uploadId', uploadId);
    formData.append('chunkIndex', i.toString());
    formData.append('totalChunks', chunks.toString());
    
    await api.post('/upload/chunk', formData);
    onProgress((i + 1) / chunks * 100);
  }
  
  // 合并分片
  await api.post('/upload/merge', { uploadId, filename: file.name });
};

// 视频流式播放
app.get('/api/video/:filename', (req, res) => {
  const filename = req.params.filename;
  const videoPath = path.join(__dirname, '../uploads/videos', filename);
  
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});
```

### 2. 实时消息推送

**问题：** 作业提交、成绩发布需要实时通知

**解决方案：**
```javascript
// Socket.IO 实时通信
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

// 连接管理
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);
  
  // 用户身份验证
  socket.on('authenticate', (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      activeUsers.set(decoded.id, socket.id);
    } catch (error) {
      socket.emit('auth_error', '身份验证失败');
    }
  });
  
  // 加入课程房间
  socket.on('join_course', (courseId) => {
    socket.join(`course_${courseId}`);
  });
  
  // 断开连接
  socket.on('disconnect', () => {
    if (socket.userId) {
      activeUsers.delete(socket.userId);
    }
  });
});

// 发送通知
const sendNotification = (userId, type, data) => {
  const socketId = activeUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit('notification', { type, data });
  }
};

// 作业提交通知
app.post('/api/assignments/:id/submit', authenticateToken, async (req, res) => {
  try {
    // ... 作业提交逻辑
    
    // 通知教师
    const assignment = await Assignment.findById(req.params.id);
    sendNotification(assignment.instructor, 'assignment_submitted', {
      studentName: req.user.username,
      assignmentTitle: assignment.title
    });
    
    res.json({ message: '作业提交成功' });
  } catch (error) {
    res.status(500).json({ message: '提交失败' });
  }
});
```

### 3. 性能优化

**前端优化：**
```typescript
// 组件懒加载
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Assignment = lazy(() => import('./pages/Assignment'));

// 虚拟列表处理大量数据
import { FixedSizeList as List } from 'react-window';

const CourseList = ({ courses }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <CourseCard course={courses[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={courses.length}
      itemSize={200}
    >
      {Row}
    </List>
  );
};

// 图片懒加载
const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
};
```

## 部署和运维

### Docker 容器化

```dockerfile
# 前端 Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# 后端 Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - DB_CONNECTION=${DB_CONNECTION}
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}

volumes:
  mongodb_data:
```

### CI/CD 流程

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
      - name: Deploy to server
        run: |
          # 部署脚本
          rsync -avz dist/ user@server:/path/to/app/
          ssh user@server 'pm2 restart app'
```

## 项目总结

### 成果展示

- **用户规模：** 支持 1000+ 并发用户
- **课程数量：** 平台上线后收录 100+ 优质课程
- **性能指标：** 页面加载时间 < 2秒，接口响应时间 < 500ms
- **代码质量：** 测试覆盖率 > 80%，ESLint 零警告

### 技术收获

1. **全栈开发经验** - 从前端到后端的完整实践
2. **性能优化技巧** - 学会了多种优化策略
3. **DevOps 实践** - 掌握了容器化部署和 CI/CD
4. **项目管理** - 学会了需求分析和技术选型

### 改进方向

1. **微服务架构** - 拆分单体应用为微服务
2. **缓存优化** - 引入 Redis 提升性能
3. **监控告警** - 添加应用性能监控
4. **国际化支持** - 支持多语言切换

### 经验教训

::: tip 关键经验
1. **早期规划很重要** - 数据库设计和 API 设计要充分考虑扩展性
2. **测试驱动开发** - 单元测试和集成测试能大大提高代码质量
3. **用户体验优先** - 功能再强大，用户体验不好也是失败的
4. **持续学习** - 技术更新很快，要保持学习新技术的习惯
:::

---

*最后更新: 2024年12月*
