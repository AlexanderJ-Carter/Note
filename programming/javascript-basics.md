# JavaScript 基础

JavaScript 是现代 Web 开发的核心语言，本文记录了我学习 JS 的重要知识点。

## 基础语法

### 变量声明

```javascript
// ES6+ 推荐使用 let 和 const
let userName = "张三";
const PI = 3.14159;

// 避免使用 var（作用域问题）
var oldStyle = "不推荐";
```

### 数据类型

JavaScript 有七种基本数据类型：

```javascript
// 基本类型
let str = "字符串";          // String
let num = 42;              // Number
let bool = true;           // Boolean
let nothing = null;        // Null
let notDefined;            // Undefined
let sym = Symbol('id');    // Symbol
let bigNum = 123n;         // BigInt

// 引用类型
let obj = { name: "对象" };  // Object
let arr = [1, 2, 3];       // Array
let func = function() {};  // Function
```

## 函数

### 函数声明方式

```javascript
// 1. 函数声明
function greet(name) {
    return `你好, ${name}!`;
}

// 2. 函数表达式
const greet2 = function(name) {
    return `你好, ${name}!`;
};

// 3. 箭头函数 (ES6)
const greet3 = (name) => `你好, ${name}!`;

// 4. 简写形式
const greet4 = name => `你好, ${name}!`;
```

## DOM 操作

### 元素选择

```javascript
// 获取元素
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');
const firstElement = document.querySelector('.myClass');

// 创建元素
const newDiv = document.createElement('div');
newDiv.textContent = '新内容';
newDiv.className = 'new-class';
```

### 事件处理

```javascript
// 添加事件监听器
button.addEventListener('click', function(event) {
    console.log('按钮被点击了!');
    event.preventDefault(); // 阻止默认行为
});

// 箭头函数版本
button.addEventListener('click', (e) => {
    console.log('按钮被点击了!');
});
```

## 异步编程

### Promise

```javascript
// 创建 Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        // 模拟异步操作
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve('数据获取成功');
            } else {
                reject('数据获取失败');
            }
        }, 1000);
    });
};

// 使用 Promise
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Async/Await

```javascript
// 使用 async/await
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
        return data;
    } catch (error) {
        console.error('错误:', error);
    }
}

// 调用
getData();
```

## ES6+ 新特性

### 解构赋值

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// 对象解构
const { name, age, ...others } = {
    name: "张三",
    age: 25,
    city: "北京",
    job: "程序员"
};
```

### 模板字符串

```javascript
const name = "张三";
const age = 25;

// 模板字符串
const message = `我的名字是 ${name}，今年 ${age} 岁`;

// 多行字符串
const html = `
    <div>
        <h1>${name}</h1>
        <p>年龄: ${age}</p>
    </div>
`;
```

## 学习心得

::: warning 注意事项
1. **this 指向问题** - 普通函数和箭头函数的 this 指向不同
2. **闭包理解** - 理解作用域链和闭包的概念
3. **异步操作** - 掌握 Promise 和 async/await 的使用
:::

::: tip 学习建议
- 多写代码，实践中学习
- 理解 JavaScript 的执行机制
- 关注浏览器兼容性问题
- 学习现代 JavaScript (ES6+) 语法
:::

## 相关资源

- [MDN JavaScript 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://zh.javascript.info/)
- [ES6 入门教程](https://es6.ruanyifeng.com/)

---

*最后更新: 2024年12月*
