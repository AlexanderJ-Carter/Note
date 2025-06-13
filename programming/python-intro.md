# Python 入门

Python 是一门简洁易学的编程语言，广泛应用于数据科学、Web开发、自动化等领域。

## 环境搭建

### 安装 Python

1. **官方下载** - 访问 [python.org](https://www.python.org/) 下载最新版本
2. **包管理器安装**
   ```bash
   # Windows (Chocolatey)
   choco install python
   
   # macOS (Homebrew)
   brew install python
   ```

### 验证安装

```bash
python --version
pip --version
```

## 基础语法

### 变量和数据类型

```python
# 数字类型
age = 25
price = 99.99
complex_num = 3 + 4j

# 字符串
name = "Alexander"
message = '你好，世界！'
multiline = """
这是一个
多行字符串
"""

# 布尔值
is_student = True
is_graduated = False

# 列表
fruits = ["苹果", "香蕉", "橙子"]
numbers = [1, 2, 3, 4, 5]

# 字典
person = {
    "name": "张三",
    "age": 30,
    "city": "北京"
}

# 元组
coordinates = (10, 20)
```

### 控制流

```python
# if 语句
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
else:
    print("需要努力")

# for 循环
for fruit in fruits:
    print(f"我喜欢{fruit}")

for i in range(5):
    print(f"数字: {i}")

# while 循环
count = 0
while count < 3:
    print(f"计数: {count}")
    count += 1
```

### 函数

```python
# 基础函数
def greet(name):
    return f"你好, {name}!"

# 带默认参数的函数
def introduce(name, age=18):
    return f"我是{name}，今年{age}岁"

# 可变参数
def calculate_sum(*numbers):
    return sum(numbers)

# 关键字参数
def create_profile(**kwargs):
    return kwargs

# 示例调用
print(greet("Alexander"))
print(introduce("小明", 25))
print(calculate_sum(1, 2, 3, 4, 5))
print(create_profile(name="李四", job="程序员"))
```

## 常用库介绍

### 标准库

```python
# datetime - 日期时间处理
from datetime import datetime, date
now = datetime.now()
today = date.today()

# os - 操作系统接口
import os
current_dir = os.getcwd()
files = os.listdir('.')

# json - JSON 数据处理
import json
data = {"name": "Python", "version": "3.9"}
json_string = json.dumps(data, ensure_ascii=False)
```

### 第三方库

```python
# requests - HTTP 请求
import requests
response = requests.get('https://api.github.com/users/octocat')
data = response.json()

# pandas - 数据分析
import pandas as pd
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35]
})

# matplotlib - 数据可视化
import matplotlib.pyplot as plt
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()
```

## 面向对象编程

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.courses = []
    
    def add_course(self, course):
        self.courses.append(course)
        print(f"{self.name} 添加了课程: {course}")
    
    def get_info(self):
        return f"学生: {self.name}, 年龄: {self.age}"
    
    def __str__(self):
        return self.get_info()

# 继承
class GraduateStudent(Student):
    def __init__(self, name, age, research_area):
        super().__init__(name, age)
        self.research_area = research_area
    
    def get_info(self):
        base_info = super().get_info()
        return f"{base_info}, 研究方向: {self.research_area}"

# 使用示例
student = Student("小明", 20)
student.add_course("Python编程")
print(student)

grad_student = GraduateStudent("小红", 25, "机器学习")
print(grad_student)
```

## 文件操作

```python
# 写入文件
with open('example.txt', 'w', encoding='utf-8') as f:
    f.write('这是一个示例文件\n')
    f.write('第二行内容')

# 读取文件
with open('example.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# 逐行读取
with open('example.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# JSON 文件操作
import json

# 写入 JSON
data = {"students": [{"name": "Alice", "score": 95}]}
with open('students.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON
with open('students.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print(data)
```

## 错误处理

```python
# 基础异常处理
try:
    number = int(input("请输入一个数字: "))
    result = 10 / number
    print(f"结果: {result}")
except ValueError:
    print("输入的不是有效数字!")
except ZeroDivisionError:
    print("不能除以零!")
except Exception as e:
    print(f"发生了其他错误: {e}")
else:
    print("计算成功完成!")
finally:
    print("程序执行结束")

# 自定义异常
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def validate_age(age):
    if age < 0:
        raise CustomError("年龄不能为负数")
    if age > 150:
        raise CustomError("年龄不能超过150岁")
    return True
```

## 学习建议

::: tip Python 学习路径
1. **基础语法** - 变量、数据类型、控制流
2. **函数和模块** - 代码复用和组织
3. **面向对象** - 类和对象的概念
4. **标准库** - 充分利用内置功能
5. **第三方库** - 根据需求学习相关库
6. **项目实践** - 通过项目巩固知识
:::

::: warning 常见误区
- 不要过早优化代码
- 遵循 PEP 8 编码规范
- 善用 Python 的内置函数
- 理解可变和不可变对象的区别
:::

## 实用资源

- [Python 官方文档](https://docs.python.org/zh-cn/3/)
- [Python Package Index (PyPI)](https://pypi.org/)
- [Real Python](https://realpython.com/)
- [廖雪峰 Python 教程](https://www.liaoxuefeng.com/wiki/1016959663602400)

---

*最后更新: 2024年12月*
