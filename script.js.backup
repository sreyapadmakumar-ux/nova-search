/* ============================================
   NOVASEARCH v2.0 - PREMIUM JAVASCRIPT ENGINE
   World-Class Search Engine with AI Features
   ============================================ */

class NovaSearchEngine {
    constructor() {
        // Storage Keys
        this.HISTORY_KEY = 'nova_search_history';
        this.THEME_KEY = 'nova_theme';
        this.MAX_HISTORY = 20;

        // DOM Elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.suggestionsBox = document.getElementById('suggestions');
        this.historySection = document.getElementById('historySection');
        this.searchHistoryList = document.getElementById('searchHistory');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.trendingSection = document.getElementById('trendingSection');
        this.trendingList = document.getElementById('trendingList');
        this.refreshTrendingBtn = document.getElementById('refreshTrending');
        this.categoryCards = document.querySelectorAll('.category-card');
        this.voiceSearchBtn = document.querySelector('.voice-search-btn');
        this.cameraSearchBtn = document.querySelector('.camera-search-btn');
        this.particleCanvas = document.getElementById('particleCanvas');

        // State
        this.currentSearchType = 'all';
        this.particles = [];

        // Data
        this.searchHistoryData = JSON.parse(localStorage.getItem(this.HISTORY_KEY)) || [];

        this.trendingSearches = [
            { text: 'Artificial Intelligence Breakthroughs 2026', count: '2.8M' },
            { text: 'Web Development Latest Frameworks', count: '2.1M' },
            { text: 'Machine Learning Deep Dive', count: '1.9M' },
            { text: 'Cloud Computing Architecture', count: '1.5M' },
            { text: 'Cybersecurity Best Practices', count: '1.2M' },
            { text: 'Blockchain & Web3 Future', count: '950K' }
        ];

        this.suggestionDatabase = [
            'artificial intelligence trends',
            'machine learning algorithms',
            'web development tutorial',
            'javascript async await',
            'react hooks explained',
            'python data science',
            'cloud computing aws',
            'cybersecurity tips',
            'blockchain technology',
            'web design trends 2026',
            'node.js best practices',
            'vue.js vs react comparison',
            'angular framework guide',
            'restful api development',
            'database optimization techniques',
            'docker containerization',
            'kubernetes orchestration',
            'microservices architecture',
            'serverless computing',
            'progressive web apps'
        ];

        // Initialize
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.restoreTheme();
        this.renderHistory();
        this.renderTrendingSearches();
        this.initializeParticles();
        this.animateParticles();
        this.loadAnimation();

        console.log('🚀 NovaSearch v2.0 Initialized');
    }

    setupEventListeners() {
        // Search Input
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e);
        });

        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim()) {
                this.showSuggestions();
            }
        });

        // Search Buttons
        this.searchBtn.addEventListener('click', () => this.performSearch());

        // Voice & Camera Search
        this.voiceSearchBtn.addEventListener('click', () => this.initiateVoiceSearch());
        this.cameraSearchBtn.addEventListener('click', () => this.initiateCameraSearch());

        // Category Cards
        this.categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                this.currentSearchType = card.dataset.type;
                this.performSearch();
            });
        });

        // Theme Toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // History
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Trending
        this.refreshTrendingBtn.addEventListener('click', () => this.refreshTrending());

        // Suggestions Close
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-bar-glass')) {
                this.hideSuggestions();
            }
        });

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                this.searchInput.focus();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Window resize for particles
        window.addEventListener('resize', () => {
            if (this.particleCanvas) {
                this.particleCanvas.width = window.innerWidth;
                this.particleCanvas.height = window.innerHeight;
            }
        });
    }

    // ====== SEARCH ENGINE ======
    performSearch() {
        const query = this.searchInput.value.trim();

        if (!query) {
            alert('Please enter a search query');
            this.searchInput.focus();
            return;
        }

        this.addToHistory(query);
        let searchUrl = '';

        switch (this.currentSearchType) {
            case 'images':
                searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
                break;
            case 'videos':
                searchUrl = `https://www.google.com/search?tbm=vid&q=${encodeURIComponent(query)}`;
                break;
            case 'news':
                searchUrl = `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query)}`;
                break;
            case 'shopping':
                searchUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`;
                break;
            default:
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        this.animateSearchRedirect(() => {
            window.location.href = searchUrl;
        });
    }

    animateSearchRedirect(callback) {
        const searchBar = document.querySelector('.search-bar-glass');
        searchBar.style.animation = 'slideUp 0.6s ease-out forwards';
        setTimeout(callback, 300);
    }

    // ====== SUGGESTIONS ======
    handleSearchInput(e) {
        const query = e.target.value.trim().toLowerCase();

        if (!query) {
            this.hideSuggestions();
            return;
        }

        this.updateSuggestions(query);
    }

    updateSuggestions(query) {
        const filtered = this.suggestionDatabase
            .filter(s => s.includes(query) && s !== query)
            .slice(0, 8);

        if (filtered.length === 0) {
            this.hideSuggestions();
            return;
        }

        this.renderSuggestions(filtered);
        this.showSuggestions();
    }

    renderSuggestions(suggestions) {
        this.suggestionsBox.innerHTML = '';

        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `<i class="fas fa-search"></i><span>${this.escapeHtml(suggestion)}</span>`;
            item.addEventListener('click', () => {
                this.searchInput.value = suggestion;
                this.performSearch();
            });
            this.suggestionsBox.appendChild(item);
        });
    }

    showSuggestions() {
        this.suggestionsBox.classList.add('active');
    }

    hideSuggestions() {
        this.suggestionsBox.classList.remove('active');
    }

    // ====== HISTORY ======
    addToHistory(query) {
        this.searchHistoryData = this.searchHistoryData.filter(item => item !== query);
        this.searchHistoryData.unshift(query);
        this.searchHistoryData = this.searchHistoryData.slice(0, this.MAX_HISTORY);
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.searchHistoryData));
        this.renderHistory();
    }

    renderHistory() {
        if (this.searchHistoryData.length === 0) {
            this.historySection.style.display = 'none';
            return;
        }

        this.historySection.style.display = 'block';
        this.searchHistoryList.innerHTML = '';

        this.searchHistoryData.forEach((query, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <span class="history-item-text">${this.escapeHtml(query)}</span>
                <button class="history-remove" data-index="${index}">×</button>
            `;

            item.querySelector('.history-item-text').addEventListener('click', () => {
                this.searchInput.value = query;
                this.performSearch();
            });

            item.querySelector('.history-remove').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeFromHistory(index);
            });

            this.searchHistoryList.appendChild(item);
        });
    }

    removeFromHistory(index) {
        this.searchHistoryData.splice(index, 1);
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.searchHistoryData));
        this.renderHistory();
    }

    clearHistory() {
        if (confirm('Clear all search history?')) {
            this.searchHistoryData = [];
            localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.searchHistoryData));
            this.renderHistory();
        }
    }

    // ====== TRENDING ======
    renderTrendingSearches() {
        this.trendingList.innerHTML = '';

        this.trendingSearches.forEach((search, index) => {
            const item = document.createElement('div');
            item.className = 'trending-item';
            item.innerHTML = `
                <span class="trending-rank">#${index + 1}</span>
                <span class="trending-text">${this.escapeHtml(search.text)}</span>
                <span class="trending-count">${search.count}</span>
            `;
            item.addEventListener('click', () => {
                this.searchInput.value = search.text;
                this.performSearch();
            });
            this.trendingList.appendChild(item);
        });
    }

    refreshTrending() {
        const btn = this.refreshTrendingBtn;
        btn.style.animation = 'spin 0.6s ease-out';

        this.trendingSearches.sort(() => Math.random() - 0.5);
        this.renderTrendingSearches();

        setTimeout(() => {
            btn.style.animation = '';
        }, 600);
    }

    // ====== THEME ======
    toggleTheme() {
        const isDarkMode = !document.body.classList.contains('light-mode');
        document.body.classList.toggle('light-mode');
        localStorage.setItem(this.THEME_KEY, isDarkMode ? 'light' : 'dark');
        this.updateThemeIcon();
    }

    restoreTheme() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const isDarkMode = !document.body.classList.contains('light-mode');
        this.themeToggle.innerHTML = isDarkMode
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    }

    // ====== VOICE SEARCH ======
    initiateVoiceSearch() {
        const isSupported = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!isSupported) {
            alert('Voice search requires Chrome, Edge, or another modern browser.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            this.voiceSearchBtn.style.color = '#ef4444';
            this.voiceSearchBtn.style.animation = 'pulse 1s ease-in-out infinite';
        };

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            this.searchInput.value = transcript;
            this.performSearch();
        };

        recognition.onerror = () => {
            this.voiceSearchBtn.style.animation = '';
            this.voiceSearchBtn.style.color = '';
        };

        recognition.onend = () => {
            this.voiceSearchBtn.style.animation = '';
            this.voiceSearchBtn.style.color = '';
        };

        recognition.start();
    }

    // ====== CAMERA SEARCH ======
    initiateCameraSearch() {
        alert('📸 Camera search feature - Coming soon!\nThis will allow you to upload or capture images for search.');
    }

    // ====== PARTICLE SYSTEM ======
    initializeParticles() {
        if (!this.particleCanvas) return;

        const ctx = this.particleCanvas.getContext('2d');
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;

        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.particleCanvas.width,
                y: Math.random() * this.particleCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5,
                opacity: Math.random() * 0.5
            });
        }
    }

    animateParticles() {
        if (!this.particleCanvas) return;

        const ctx = this.particleCanvas.getContext('2d');
        const canvas = this.particleCanvas;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';

            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.globalAlpha = particle.opacity;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            requestAnimationFrame(animate);
        };

        animate();
    }

    loadAnimation() {
        const elements = document.querySelectorAll('[class*="slide"]');
        elements.forEach(el => {
            el.style.animation = getComputedStyle(el).animation;
        });
    }

    // ====== UTILITIES ======
    escapeHtml(unsafe) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return unsafe.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.novaEngine = new NovaSearchEngine();
    document.getElementById('searchInput').focus();
});
    constructor() {
        // Storage Keys
        this.HISTORY_KEY = 'nova_search_history';
        this.THEME_KEY = 'nova_theme_preference';
        this.MAX_HISTORY = 15;

        // DOM Elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.suggestionsBox = document.getElementById('suggestions');
        this.historySection = document.getElementById('historySection');
        this.searchHistoryList = document.getElementById('searchHistory');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.trendingSection = document.getElementById('trendingSection');
        this.trendingList = document.getElementById('trendingList');
        this.refreshTrendingBtn = document.getElementById('refreshTrending');
        this.categoryCards = document.querySelectorAll('.category-card');
        this.voiceSearchBtn = document.querySelector('.voice-search-btn');

        // Current Search Type
        this.currentSearchType = 'all';

        // Search History Data
        this.searchHistoryData = JSON.parse(localStorage.getItem(this.HISTORY_KEY)) || [];

        // Trending Searches (Simulated)
        this.trendingSearches = [
            { text: 'Artificial Intelligence Trends 2026', count: '2.4M' },
            { text: 'Web Development Best Practices', count: '1.8M' },
            { text: 'Machine Learning Tutorials', count: '1.5M' },
            { text: 'Cloud Computing Solutions', count: '1.2M' },
            { text: 'Cybersecurity News', count: '950K' },
            { text: 'Blockchain Technology', count: '780K' }
        ];

        // Suggestions Database
        this.suggestionDatabase = [
            'artificial intelligence',
            'machine learning algorithms',
            'web development tutorial',
            'javascript async await',
            'react hooks explained',
            'python data science',
            'cloud computing AWS',
            'cybersecurity tips',
            'blockchain explained',
            'web design trends',
            'node.js best practices',
            'vue.js vs react',
            'angular frameworks',
            'api development guide',
            'database optimization'
        ];

        // Initialize
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.restoreTheme();
        this.renderHistory();
        this.renderTrendingSearches();
    }

    setupEventListeners() {
        // Search Input
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e);
        });

        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim()) {
                this.showSuggestions();
            } else {
                this.hideSuggestions();
            }
        });

        // Search Button
        this.searchBtn.addEventListener('click', () => this.performSearch());

        // Voice Search
        this.voiceSearchBtn.addEventListener('click', () => this.initiateVoiceSearch());

        // Category Cards
        this.categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                this.currentSearchType = card.dataset.type;
                this.performSearch();
            });
        });

        // Theme Toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // History Clear
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Refresh Trending
        this.refreshTrendingBtn.addEventListener('click', () => this.refreshTrending());

        // Close Suggestions on Outside Click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-bar-glass')) {
                this.hideSuggestions();
            }
        });

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + K: Focus Search
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                this.searchInput.focus();
            }
            // Ctrl/Cmd + B: Toggle Theme
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // ====== SEARCH FUNCTIONALITY ======
    performSearch() {
        const query = this.searchInput.value.trim();

        if (!query) {
            alert('Please enter a search query');
            return;
        }

        // Add to history
        this.addToHistory(query);

        // Build search URL
        let searchUrl = '';

        switch (this.currentSearchType) {
            case 'images':
                searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
                break;
            case 'videos':
                searchUrl = `https://www.google.com/search?tbm=vid&q=${encodeURIComponent(query)}`;
                break;
            case 'news':
                searchUrl = `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query)}`;
                break;
            case 'shopping':
                searchUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`;
                break;
            default:
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        // Redirect with animation
        this.animateSearchRedirect(() => {
            window.location.href = searchUrl;
        });
    }

    animateSearchRedirect(callback) {
        const searchBar = document.querySelector('.search-bar-glass');
        searchBar.style.animation = 'slideUp 0.6s ease-out forwards';
        setTimeout(callback, 300);
    }

    // ====== SUGGESTIONS ======
    handleSearchInput(e) {
        const query = e.target.value.trim().toLowerCase();

        if (!query) {
            this.hideSuggestions();
            return;
        }

        this.updateSuggestions(query);
    }

    updateSuggestions(query) {
        const filtered = this.suggestionDatabase.filter(suggestion =>
            suggestion.includes(query) && suggestion !== query
        );

        if (filtered.length === 0) {
            this.hideSuggestions();
            return;
        }

        this.renderSuggestions(filtered.slice(0, 6));
        this.showSuggestions();
    }

    renderSuggestions(suggestions) {
        this.suggestionsBox.innerHTML = '';

        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `
                <i class="fas fa-search"></i>
                <span>${this.escapeHtml(suggestion)}</span>
            `;
            item.addEventListener('click', () => {
                this.searchInput.value = suggestion;
                this.performSearch();
            });
            this.suggestionsBox.appendChild(item);
        });
    }

    showSuggestions() {
        this.suggestionsBox.classList.add('active');
    }

    hideSuggestions() {
        this.suggestionsBox.classList.remove('active');
    }

    // ====== SEARCH HISTORY ======
    addToHistory(query) {
        // Remove duplicates
        this.searchHistoryData = this.searchHistoryData.filter(item => item !== query);
        // Add to beginning
        this.searchHistoryData.unshift(query);
        // Keep only max items
        this.searchHistoryData = this.searchHistoryData.slice(0, this.MAX_HISTORY);
        // Save to storage
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.searchHistoryData));
        this.renderHistory();
    }

    renderHistory() {
        if (this.searchHistoryData.length === 0) {
            this.historySection.style.display = 'none';
            return;
        }

        this.historySection.style.display = 'block';
        this.searchHistoryList.innerHTML = '';

        this.searchHistoryData.forEach((query, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <span class="history-item-text">${this.escapeHtml(query)}</span>
                <button class="history-remove" data-index="${index}" title="Remove">×</button>
            `;

            item.querySelector('.history-item-text').addEventListener('click', () => {
                this.searchInput.value = query;
                this.performSearch();
            });

            item.querySelector('.history-remove').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeFromHistory(index);
            });

            this.searchHistoryList.appendChild(item);
        });
    }

    removeFromHistory(index) {
        this.searchHistoryData.splice(index, 1);
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.searchHistoryData));
        this.renderHistory();
    }

    clearHistory() {
        if (confirm('Clear all search history? This cannot be undone.')) {
            this.searchHistoryData = [];
            localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.searchHistoryData));
            this.renderHistory();
        }
    }

    // ====== TRENDING SEARCHES ======
    renderTrendingSearches() {
        this.trendingList.innerHTML = '';

        this.trendingSearches.forEach((search, index) => {
            const item = document.createElement('div');
            item.className = 'trending-item';
            item.innerHTML = `
                <span class="trending-rank">#${index + 1}</span>
                <span class="trending-text">${this.escapeHtml(search.text)}</span>
                <span class="trending-count">${search.count}</span>
            `;
            item.addEventListener('click', () => {
                this.searchInput.value = search.text;
                this.performSearch();
            });
            this.trendingList.appendChild(item);
        });
    }

    refreshTrending() {
        const btn = this.refreshTrendingBtn;
        btn.style.animation = 'spin 0.6s ease-out';

        // Shuffle trends
        this.trendingSearches.sort(() => Math.random() - 0.5);
        this.renderTrendingSearches();

        setTimeout(() => {
            btn.style.animation = '';
        }, 600);
    }

    // ====== THEME MANAGEMENT ======
    toggleTheme() {
        const isDarkMode = !document.body.classList.contains('light-mode');
        document.body.classList.toggle('light-mode');
        localStorage.setItem(this.THEME_KEY, isDarkMode ? 'light' : 'dark');
        this.updateThemeIcon();
    }

    restoreTheme() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const isDarkMode = !document.body.classList.contains('light-mode');
        this.themeToggle.innerHTML = isDarkMode
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    }

    // ====== VOICE SEARCH ======
    initiateVoiceSearch() {
        // Simulated voice search (requires Web Speech API for real implementation)
        const isSupported = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!isSupported) {
            alert('Voice search is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            console.log('Listening...');
            this.voiceSearchBtn.style.color = '#ef4444';
            this.voiceSearchBtn.style.animation = 'pulse 1s ease-in-out infinite';
        };

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            this.searchInput.value = transcript;
            this.performSearch();
        };

        recognition.onerror = () => {
            console.log('Voice search error or no speech detected');
            this.voiceSearchBtn.style.animation = '';
            this.voiceSearchBtn.style.color = '';
        };

        recognition.onend = () => {
            this.voiceSearchBtn.style.animation = '';
            this.voiceSearchBtn.style.color = '';
        };

        recognition.start();
    }

    // ====== UTILITY FUNCTIONS ======
    escapeHtml(unsafe) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return unsafe.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize Nova Search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.novaSearch = new NovaSearch();
    console.log('Nova Search v2.0 initialized');

    // Auto-focus search input
    document.getElementById('searchInput').focus();

    // Prevent form submission
    document.addEventListener('submit', (e) => {
        if (e.target.tagName === 'FORM') {
            e.preventDefault();
        }
    });
});