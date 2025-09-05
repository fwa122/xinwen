class NewsApp {
    constructor() {
        this.newsData = [];
        this.categories = new Set();
        this.currentCategory = 'all';
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadNewsData();
        this.renderNews();
    }

    bindEvents() {
        // 刷新按钮
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        // 分类导航
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                this.changeCategory(e.target.getAttribute('href').substring(1));
            }
        });
    }

    async loadNewsData() {
        try {
            // 获取最新的新闻数据文件
            const files = await this.getNewsDataFiles();
            if (files.length === 0) {
                this.showMessage('暂无新闻数据');
                return;
            }

            // 加载最新的数据文件
            const latestFile = files[files.length - 1];
            const response = await fetch(`./news_data/${latestFile}`);
            const data = await response.json();
            
            this.newsData = data;
            this.updateCategories();
            this.updateStats();
            
        } catch (error) {
            console.error('加载新闻数据失败:', error);
            this.showMessage('加载新闻数据失败，请稍后重试');
        }
    }

    async getNewsDataFiles() {
        try {
            // 直接使用固定的latest文件
            const response = await fetch('news_data/综合_latest.json');
            if (response.ok) {
                return ['综合_latest.json'];
            }
            return ['综合_latest.json']; // 即使文件不存在也返回这个名称用于错误处理
        } catch (error) {
            console.error('获取文件列表失败:', error);
            return ['综合_latest.json'];
        }
    }

    updateCategories() {
        this.categories = new Set(this.newsData.map(item => item.category));
        this.renderCategoryNav();
    }

    renderCategoryNav() {
        const nav = document.getElementById('categoryNav');
        let html = '<li><a href="#all" class="nav-link active">全部</a></li>';
        
        this.categories.forEach(category => {
            html += `<li><a href="#${category}" class="nav-link">${category}</a></li>`;
        });
        
        nav.innerHTML = html;
    }

    renderNews() {
        const container = document.getElementById('newsContainer');
        const filteredNews = this.currentCategory === 'all' 
            ? this.newsData 
            : this.newsData.filter(item => item.category === this.currentCategory);
        
        if (filteredNews.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-newspaper fa-3x"></i>
                    <h3>暂无新闻数据</h3>
                    <p>当前分类没有新闻内容</p>
                </div>
            `;
            return;
        }

        let html = '<div class="news-grid">';
        
        filteredNews.forEach(news => {
            html += `
                <article class="news-card">
                    <div class="news-header">
                        <h3 class="news-title">
                            <a href="${news.url}" target="_blank" rel="noopener">
                                ${news.title}
                            </a>
                        </h3>
                        <span class="news-source">${news.source}</span>
                    </div>
                    
                    <div class="news-meta">
                        <span class="news-date">
                            <i class="fas fa-clock"></i>
                            ${news.date}
                        </span>
                        <span class="news-category">${news.category}</span>
                    </div>
                    
                    <div class="news-actions">
                        <a href="${news.url}" target="_blank" class="read-more">
                            阅读全文 <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </article>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    changeCategory(category) {
        this.currentCategory = category;
        
        // 更新导航激活状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[href="#${category}"]`).classList.add('active');
        
        this.renderNews();
    }

    updateStats() {
        document.getElementById('totalNews').textContent = this.newsData.length;
        document.getElementById('updateTime').textContent = new Date().toLocaleString();
    }

    async refreshData() {
        const btn = document.getElementById('refreshBtn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 刷新中...';
        
        try {
            await this.loadNewsData();
            this.renderNews();
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> 刷新数据';
        }
    }

    showMessage(message) {
        const container = document.getElementById('newsContainer');
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle fa-3x"></i>
                <h3>${message}</h3>
            </div>
        `;
    }
}

// 初始化应用
new NewsApp();