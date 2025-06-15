# 矩阵计算

本文档整理了矩阵计算的基本公式和方法，包括二阶和三阶矩阵的行列式、伴随矩阵、逆矩阵计算，以及相关的复数分析内容。

## 三阶矩阵

对于三阶矩阵：

$$A = \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix}$$

### 1. 行列式 $\det(A)$

$$\det(A) = a(ei - fh) + b(fg - di) + c(dh - eg)$$

### 2. 伴随矩阵 $\operatorname{adj}(A)$

$$\operatorname{adj}(A) = \begin{pmatrix}
ei - fh & ch - bi & bf - ce \\
fg - di & ai - cg & cd - af \\
dh - eg & bg - ah & ae - bd
\end{pmatrix}$$

### 3. 逆矩阵 $A^{-1}$

$$A^{-1} = \frac{1}{\Delta} \begin{pmatrix}
ei - fh & ch - bi & bf - ce \\
fg - di & ai - cg & cd - af \\
dh - eg & bg - ah & ae - bd
\end{pmatrix}$$

### 最终结果

$$A^{-1} = \frac{1}{a(ei - fh) + b(fg - di) + c(dh - eg)} \begin{pmatrix}
ei - fh & ch - bi & bf - ce \\
fg - di & ai - cg & cd - af \\
dh - eg & bg - ah & ae - bd
\end{pmatrix}$$

## 二阶矩阵

给定矩阵：

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

其逆矩阵为：

$$\boxed{A^{-1} = \dfrac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}}$$

## 欧拉公式

### 基本公式

$$e^{i\theta} = \cos\theta + i\sin\theta$$

### 欧拉恒等式

$$e^{i\pi} + 1 = 0$$

### 三角函数的指数表示

$$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$$

$$\sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$$

$$\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{e^{i\theta} - e^{-i\theta}}{i(e^{i\theta} + e^{-i\theta})}$$

### 一般复数的指数形式

对于一般的复数 $z = x + iy$：

$$e^z = e^{x+iy} = e^x \cdot e^{iy} = e^x(\cos y + i\sin y)$$

## 指数方程求解

求解形如 $e^z = c$ 的复指数方程（$c \in \mathbb{C}$，且 $c \neq 0$），通解公式为：

$$\boxed{z = \ln|c| + i(\arg c + 2k\pi) \quad k \in \mathbb{Z}}$$

### 求解步骤

1. **计算模长**：$|c| = \sqrt{\operatorname{Re}(c)^2 + \operatorname{Im}(c)^2}$
2. **求主辐角**：$\arg c = \operatorname{atan2}(\operatorname{Im}(c), \operatorname{Re}(c))$
3. **构造解集**：$z_k = \ln|c| + i(\arg c + 2k\pi) \quad (k = 0, \pm1, \pm2, \cdots)$

## 指数相关计算

### 1. 基本复指数形式：$Ae^{j(\omega t + \phi)}$

- **幅值**：直接取模 $|A|$
- **相位**：取指数相位 $\omega t + \phi$

### 2. 分式形式：$\frac{N(j\omega)}{D(j\omega)}$

#### 分子分母同乘共轭分母

$$\frac{a+jb}{c+jd} \cdot \frac{c-jd}{c-jd} = \frac{(ac+bd) + j(bc-ad)}{c^2+d^2}$$

#### 分离实部虚部

$$\text{Re} = \frac{ac+bd}{c^2+d^2}, \quad \text{Im} = \frac{bc-ad}{c^2+d^2}$$

#### 计算模值

$$\left| \frac{a+jb}{c+jd} \right| = \frac{\sqrt{a^2+b^2}}{\sqrt{c^2+d^2}}$$

## 分式分解

### 假分式处理

若分子次数 ≥ 分母次数（假分式）：

$$\frac{P(x)}{Q(x)} = R(x) + \frac{S(x)}{Q(x)}$$

### 分母因式分解

| 因式类型 | 处理方式 |
|---------|---------|
| **线性因子** $(x-a)$ | 对应简单分式 |
| **重复线性因子** $(x-a)^n$ | 多重分式 |
| **二次不可约因子** $(x^2+px+q)$ | 带二次分母 |
| **重复二次因子** $(x^2+px+q)^n$ | 多重二次分式 |

### 设定分解形式

| 分母因子 | 对应的部分分式 |
|---------|---------------|
| $(x-a)$ | $\frac{A}{x-a}$ |
| $(x-a)^k$ | $\frac{A_1}{x-a} + \frac{A_2}{(x-a)^2} + \cdots + \frac{A_k}{(x-a)^k}$ |
| $x^2+px+q$ | $\frac{Bx+C}{x^2+px+q}$ |
| $(x^2+px+q)^k$ | $\frac{B_1x+C_1}{x^2+px+q} + \frac{B_2x+C_2}{(x^2+px+q)^2} + \cdots$ |

### 示例分解

$$\frac{P(x)}{x^2(x-1)(x^2+1)^2} = \frac{A}{x} + \frac{B}{x^2} + \frac{C}{x-1} + \frac{Dx+E}{x^2+1} + \frac{Fx+G}{(x^2+1)^2}$$

---

::: tip 提示
本文档中的所有数学公式都支持完整的LaTeX渲染，可以直接复制使用。
:::

::: warning 注意
在计算逆矩阵时，请确保矩阵的行列式不为零，否则逆矩阵不存在。
:::
