# GitHub Actions + Pages 自动部署指南

## 部署步骤

### 1. 准备 GitHub 仓库
1. 在 GitHub 创建新的仓库
2. 将所有文件上传到仓库
3. 确保包含以下文件：
   - `modern_news_crawler.py` - 爬虫主程序
   - `requirements.txt` - Python 依赖
   - `.github/workflows/crawler.yml` - GitHub Actions 配置
   - `index.html`, `styles.css`, `script.js` - 网页文件
   - `.nojekyll` - 禁用 Jekyll 处理

### 2. 配置 GitHub Pages
1. 进入仓库的 Settings → Pages
2. 选择部署源：GitHub Actions
3. 选择分支：main（或你的主分支）
4. 保存设置

### 3. 手动触发首次运行
1. 进入仓库的 Actions 标签页
2. 选择 "News Crawler Automation" workflow
3. 点击 "Run workflow" 手动触发
4. 等待运行完成（约 2-3 分钟）

### 4. 访问网站
1. 运行完成后，进入 Settings → Pages
2. 查看您的网站地址（格式：`https://用户名.github.io/仓库名`）
3. 访问网站查看新闻内容

## 自动化流程

### GitHub Actions 工作流程：
1. **定时触发**：每 4 小时自动运行一次
2. **环境准备**：设置 Python 环境，安装依赖
3. **运行爬虫**：执行 `modern_news_crawler.py --crawl-only`
4. **保存数据**：生成带时间戳的 JSON 文件和最新的 `_latest.json` 文件
5. **提交更改**：自动提交更新的数据文件到仓库
6. **部署更新**：GitHub Pages 自动部署最新内容

### 文件结构：
```
仓库根目录/
├── .github/workflows/crawler.yml    # 自动化配置
├── news_data/                       # 新闻数据目录
│   ├── 综合_20250904_120000.json    # 带时间戳的文件
│   └── 综合_latest.json             # 最新的数据文件
├── index.html                       # 主页面
├── styles.css                       # 样式文件
├── script.js                        # 前端逻辑
├── modern_news_crawler.py           # 爬虫程序
└── requirements.txt                 # Python 依赖
```

## 自定义配置

### 修改爬虫频率：
编辑 `.github/workflows/crawler.yml` 中的 cron 表达式：
```yaml
schedule:
  - cron: '0 */4 * * *'  # 每4小时一次
```

### 修改新闻源：
编辑 `modern_news_crawler.py` 中的 CONFIG 字典，修改 sources 列表。

### 添加新的新闻分类：
在爬虫配置中添加新的新闻源，并指定对应的 category。

## 故障排除

### 常见问题：
1. **Actions 运行失败**：检查 Python 依赖是否正确
2. **网页无法加载**：确认 `.nojekyll` 文件存在
3. **数据不更新**：检查爬虫日志，确认网站可访问
4. **跨域问题**：确保新闻网站支持 CORS

### 查看日志：
1. 进入仓库的 Actions 标签页
2. 选择最近的工作流运行
3. 查看详细日志输出

## 高级功能

### 手动触发：
随时可以在 Actions 页面手动运行工作流。

### 多分类支持：
爬虫会自动根据配置生成多个分类的数据文件。

### 静态资源优化：
所有资源都是静态文件，加载速度快，支持 CDN 加速。

## 成本说明
- GitHub Actions：每月 2000 分钟免费额度
- GitHub Pages：完全免费
- 存储空间：GitHub 免费提供 1GB 存储空间

完全免费使用，无需任何服务器费用！