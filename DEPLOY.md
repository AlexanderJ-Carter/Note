# 部署到 GitHub Pages (自定义域名)

## 快速部署

1. **创建 GitHub 仓库** - 新建公开仓库，仓库名为 `Note`

2. **推送代码**

```bash
git remote add origin https://github.com/AlexanderJ-Carter/Note.git
git branch -M main
git push -u origin main
```

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - Custom domain 填入 `note.alexander.xin`
   - 勾选 "Enforce HTTPS"

4. **配置 DNS** 
   - 在您的域名提供商处添加 CNAME 记录：
   ```
   类型: CNAME
   名称: note
   值: alexanderj-carter.github.io
   ```

5. **访问网站** - `https://note.alexander.xin`

## 注意事项

- CNAME 文件已包含在项目中，无需手动创建
- DNS 生效可能需要几分钟到几小时
- 确保域名解析正确后 GitHub Pages 才能使用自定义域名

## 本地开发

```bash
# 启动开发服务器
npm run docs:dev

# 构建预览
npm run docs:build
npm run docs:preview
```
