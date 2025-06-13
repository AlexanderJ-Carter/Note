# 数据结构与算法

数据结构和算法是编程的基础，本文记录了我在学习过程中的重点知识和实践经验。

## 为什么要学习数据结构与算法？

- **提升编程思维** - 培养逻辑思维和问题解决能力
- **优化程序性能** - 选择合适的数据结构和算法提升效率
- **面试必备** - 大部分技术面试都会考查算法题
- **打好基础** - 为学习更复杂的技术做准备

## 时间复杂度与空间复杂度

### 时间复杂度

| 复杂度     | 描述         | 示例操作     |
| ---------- | ------------ | ------------ |
| O(1)       | 常数时间     | 数组索引访问 |
| O(log n)   | 对数时间     | 二分查找     |
| O(n)       | 线性时间     | 遍历数组     |
| O(n log n) | 线性对数时间 | 归并排序     |
| O(n²)      | 平方时间     | 冒泡排序     |
| O(2ⁿ)      | 指数时间     | 递归斐波那契 |

### 复杂度分析示例

```javascript
// O(1) - 常数时间
function getFirst(arr) {
    return arr[0]; // 无论数组多大，都是一次操作
}

// O(n) - 线性时间
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) { // 遍历 n 次
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// O(n²) - 平方时间
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {     // 外层循环 n 次
        for (let j = 0; j < arr.length - 1; j++) { // 内层循环 n 次
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// O(log n) - 对数时间
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

## 基础数据结构

### 数组 (Array)

```javascript
class DynamicArray {
    constructor() {
        this.data = [];
        this.size = 0;
    }
    
    // 添加元素 - O(1)
    push(element) {
        this.data[this.size] = element;
        this.size++;
    }
    
    // 删除元素 - O(1)
    pop() {
        if (this.size === 0) return undefined;
        const element = this.data[this.size - 1];
        this.size--;
        return element;
    }
    
    // 插入元素 - O(n)
    insert(index, element) {
        if (index < 0 || index > this.size) return false;
        
        // 移动元素
        for (let i = this.size; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        
        this.data[index] = element;
        this.size++;
        return true;
    }
    
    // 删除指定位置元素 - O(n)
    removeAt(index) {
        if (index < 0 || index >= this.size) return undefined;
        
        const element = this.data[index];
        
        // 移动元素
        for (let i = index; i < this.size - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        
        this.size--;
        return element;
    }
    
    // 查找元素 - O(n)
    indexOf(element) {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === element) return i;
        }
        return -1;
    }
}
```

### 链表 (Linked List)

```javascript
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // 添加到头部 - O(1)
    addFirst(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    // 添加到尾部 - O(n)
    addLast(val) {
        const newNode = new ListNode(val);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    // 删除第一个节点 - O(1)
    removeFirst() {
        if (!this.head) return null;
        
        const val = this.head.val;
        this.head = this.head.next;
        this.size--;
        return val;
    }
    
    // 删除指定值的节点 - O(n)
    remove(val) {
        if (!this.head) return false;
        
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.val !== val) {
            current = current.next;
        }
        
        if (current.next) {
            current.next = current.next.next;
            this.size--;
            return true;
        }
        
        return false;
    }
    
    // 查找元素 - O(n)
    contains(val) {
        let current = this.head;
        while (current) {
            if (current.val === val) return true;
            current = current.next;
        }
        return false;
    }
    
    // 转换为数组
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }
}
```

### 栈 (Stack)

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    // 入栈 - O(1)
    push(element) {
        this.items.push(element);
    }
    
    // 出栈 - O(1)
    pop() {
        if (this.isEmpty()) return undefined;
        return this.items.pop();
    }
    
    // 查看栈顶元素 - O(1)
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1];
    }
    
    // 检查是否为空 - O(1)
    isEmpty() {
        return this.items.length === 0;
    }
    
    // 获取栈大小 - O(1)
    size() {
        return this.items.length;
    }
}

// 栈的应用：括号匹配
function isValidParentheses(s) {
    const stack = new Stack();
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (['(', '{', '['].includes(char)) {
            stack.push(char);
        } else if ([')', '}', ']'].includes(char)) {
            if (stack.isEmpty() || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.isEmpty();
}
```

### 队列 (Queue)

```javascript
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
    }
    
    // 入队 - O(1)
    enqueue(element) {
        this.items.push(element);
    }
    
    // 出队 - O(1)
    dequeue() {
        if (this.isEmpty()) return undefined;
        
        const element = this.items[this.front];
        this.front++;
        
        // 清理空间
        if (this.front > this.items.length / 2) {
            this.items = this.items.slice(this.front);
            this.front = 0;
        }
        
        return element;
    }
    
    // 查看队首元素 - O(1)
    front() {
        if (this.isEmpty()) return undefined;
        return this.items[this.front];
    }
    
    // 检查是否为空 - O(1)
    isEmpty() {
        return this.front >= this.items.length;
    }
    
    // 获取队列大小 - O(1)
    size() {
        return this.items.length - this.front;
    }
}

// 队列的应用：BFS 广度优先搜索
function bfs(graph, start) {
    const visited = new Set();
    const queue = new Queue();
    const result = [];
    
    queue.enqueue(start);
    visited.add(start);
    
    while (!queue.isEmpty()) {
        const vertex = queue.dequeue();
        result.push(vertex);
        
        for (let neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.enqueue(neighbor);
            }
        }
    }
    
    return result;
}
```

## 高级数据结构

### 二叉树 (Binary Tree)

```javascript
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    // 前序遍历 (根-左-右)
    preorderTraversal(node = this.root) {
        if (!node) return [];
        
        return [
            node.val,
            ...this.preorderTraversal(node.left),
            ...this.preorderTraversal(node.right)
        ];
    }
    
    // 中序遍历 (左-根-右)
    inorderTraversal(node = this.root) {
        if (!node) return [];
        
        return [
            ...this.inorderTraversal(node.left),
            node.val,
            ...this.inorderTraversal(node.right)
        ];
    }
    
    // 后序遍历 (左-右-根)
    postorderTraversal(node = this.root) {
        if (!node) return [];
        
        return [
            ...this.postorderTraversal(node.left),
            ...this.postorderTraversal(node.right),
            node.val
        ];
    }
    
    // 层序遍历 (BFS)
    levelOrderTraversal() {
        if (!this.root) return [];
        
        const result = [];
        const queue = [this.root];
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                currentLevel.push(node.val);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(currentLevel);
        }
        
        return result;
    }
    
    // 计算树的最大深度
    maxDepth(node = this.root) {
        if (!node) return 0;
        
        const leftDepth = this.maxDepth(node.left);
        const rightDepth = this.maxDepth(node.right);
        
        return Math.max(leftDepth, rightDepth) + 1;
    }
}
```

### 二叉搜索树 (BST)

```javascript
class BST extends BinaryTree {
    // 插入节点 - O(log n) 平均情况
    insert(val) {
        this.root = this._insertNode(this.root, val);
    }
    
    _insertNode(node, val) {
        if (!node) return new TreeNode(val);
        
        if (val < node.val) {
            node.left = this._insertNode(node.left, val);
        } else if (val > node.val) {
            node.right = this._insertNode(node.right, val);
        }
        
        return node;
    }
    
    // 查找节点 - O(log n) 平均情况
    search(val) {
        return this._searchNode(this.root, val);
    }
    
    _searchNode(node, val) {
        if (!node || node.val === val) return node;
        
        if (val < node.val) {
            return this._searchNode(node.left, val);
        } else {
            return this._searchNode(node.right, val);
        }
    }
    
    // 删除节点 - O(log n) 平均情况
    delete(val) {
        this.root = this._deleteNode(this.root, val);
    }
    
    _deleteNode(node, val) {
        if (!node) return null;
        
        if (val < node.val) {
            node.left = this._deleteNode(node.left, val);
        } else if (val > node.val) {
            node.right = this._deleteNode(node.right, val);
        } else {
            // 找到要删除的节点
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            // 有两个子节点：找到右子树的最小值
            const minNode = this._findMin(node.right);
            node.val = minNode.val;
            node.right = this._deleteNode(node.right, minNode.val);
        }
        
        return node;
    }
    
    _findMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }
}
```

### 哈希表 (Hash Table)

```javascript
class HashTable {
    constructor(size = 10) {
        this.size = size;
        this.buckets = new Array(size);
        
        // 初始化每个桶为空数组
        for (let i = 0; i < size; i++) {
            this.buckets[i] = [];
        }
    }
    
    // 哈希函数
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }
    
    // 插入键值对 - O(1) 平均情况
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        // 查找是否已存在该键
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; // 更新值
                return;
            }
        }
        
        // 添加新的键值对
        bucket.push([key, value]);
    }
    
    // 获取值 - O(1) 平均情况
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        
        return undefined;
    }
    
    // 删除键值对 - O(1) 平均情况
    delete(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        
        return false;
    }
    
    // 获取所有键
    keys() {
        const keys = [];
        for (let bucket of this.buckets) {
            for (let pair of bucket) {
                keys.push(pair[0]);
            }
        }
        return keys;
    }
}
```

## 经典算法

### 排序算法

```javascript
// 冒泡排序 - O(n²)
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // 如果没有交换，说明已经排序完成
        if (!swapped) break;
    }
    
    return arr;
}

// 快速排序 - O(n log n) 平均情况
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];
    
    for (let element of arr) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }
    
    return [
        ...quickSort(left),
        ...equal,
        ...quickSort(right)
    ];
}

// 归并排序 - O(n log n)
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### 搜索算法

```javascript
// 线性搜索 - O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

// 二分搜索 - O(log n)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// DFS 深度优先搜索
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (let neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// BFS 广度优先搜索
function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        console.log(vertex);
        
        for (let neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

## LeetCode 题目练习

### 简单难度

```javascript
// 1. 两数之和
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// 2. 反转链表
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

// 3. 最大子数组和 (Kadane's Algorithm)
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

### 中等难度

```javascript
// 1. 三数之和
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// 2. 最长回文子串
function longestPalindrome(s) {
    if (s.length <= 1) return s;
    
    let start = 0;
    let maxLength = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLength = right - left + 1;
            if (currentLength > maxLength) {
                start = left;
                maxLength = currentLength;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // 奇数长度回文
        expandAroundCenter(i, i + 1); // 偶数长度回文
    }
    
    return s.substring(start, start + maxLength);
}
```

## 动态规划

```javascript
// 斐波那契数列 - 记忆化搜索
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// 斐波那契数列 - 动态规划
function fibonacciDP(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// 爬楼梯问题
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 0-1 背包问题
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w], // 不选择当前物品
                    dp[i - 1][w - weights[i - 1]] + values[i - 1] // 选择当前物品
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}
```

## 学习建议

### 循序渐进的学习路径

1. **基础数据结构** (2-3周)
   - 数组、链表、栈、队列
   - 理解原理，动手实现

2. **基础算法** (2-3周)
   - 排序算法、搜索算法
   - 分析时间复杂度

3. **高级数据结构** (3-4周)
   - 树、图、哈希表
   - 掌握应用场景

4. **算法思想** (4-6周)
   - 递归、分治、动态规划
   - 贪心算法、回溯算法

5. **实战练习** (持续)
   - LeetCode 刷题
   - 项目中应用

### 刷题策略

::: tip 刷题技巧
1. **按标签刷题** - 同类型题目一起练习
2. **先易后难** - 建立信心，循序渐进
3. **总结模板** - 归纳常见解题模式
4. **定期回顾** - 复习做过的题目
5. **理解原理** - 不要死记硬背代码
:::

### 推荐资源

**书籍推荐：**
- 《算法导论》- 经典教材，理论深入
- 《剑指Offer》- 面试题目精选
- 《编程珠玑》- 算法思维训练

**在线平台：**
- [LeetCode](https://leetcode.cn/) - 最受欢迎的刷题平台
- [牛客网](https://www.nowcoder.com/) - 国内面试题库
- [HackerRank](https://www.hackerrank.com/) - 国际编程挑战

**可视化工具：**
- [VisuAlgo](https://visualgo.net/) - 算法可视化
- [Algorithm Visualizer](https://algorithm-visualizer.org/) - 交互式算法演示

---

*最后更新: 2024年12月*
