# 新闻聚合爬虫系统

一个基于Python 3.12.8的现代化新闻爬虫系统，自动从各大正规新闻网站采集信息，并按分类展示在网页上。

## 功能特点

- ✅ **多源采集**: 支持人民网、新华网、中国新闻网等正规媒体
- ✅ **自动分类**: 新闻按类别自动分类展示
- ✅ **定时爬取**: 可配置爬取间隔时间
- ✅ **Web展示**: 美观的网页界面展示新闻内容
- ✅ **API接口**: 提供RESTful API接口
- ✅ **错误处理**: 完善的错误处理和日志记录
- ✅ **中文支持**: 完整的中文编码处理

## 安装依赖

```bash
pip install -r requirements.txt
```

## 使用方法

### 启动爬虫系统

```bash
python modern_news_crawler.py
```

或者运行批处理文件：
```bash
run_crawler.bat
```

## 配置说明

在 `modern_news_crawler.py` 中可以修改配置参数：

- `crawl_interval`: 爬取间隔时间（秒）
- `data_dir`: 数据存储目录
- `web_port`: Web服务端口
- `sources`: 新闻源配置

## 文件结构

```
├── modern_news_crawler.py  # 主爬虫程序
├── requirements.txt        # 依赖包列表
├── run_crawler.bat        # Windows启动脚本
├── templates/            # HTML模板
│   └── index.html
├── static/               # 静态资源
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── news_data/           # 新闻数据存储目录
```

## 技术支持

如有问题，请检查日志文件 `crawler.log`。