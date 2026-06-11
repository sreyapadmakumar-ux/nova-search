/* ================================================================
   NOVA SEARCH - PREMIUM JAVASCRIPT ENGINE
   Interactive Features & Animations
   ================================================================ */

class NovaSearch {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeParticles();
        this.loadSuggestions();
        this.setupAnimations();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.suggestionsBox = document.getElementById('suggestions');
        this.themeToggle = document.getElementById('themeToggle');
        this.particleCanvas = document.getElementById('particleCanvas');
        this.floatingParticlesContainer = document.querySelector('.floating-particles');
    }

    setupEventListeners() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        // Search suggestions
        this.searchInput.addEventListener('input', (e) => this.showSuggestions(e.target.value));
        this.searchInput.addEventListener('focus', () => this.showSuggestions(this.searchInput.value));
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.suggestionsBox.classList.remove('active');
            }
        });

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '/') {
                this.searchInput.focus();
            }
        });
    }

    performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        // Add search animation
        this.addSearchAnimation();

        // In a real app, this would perform the actual search
        console.log('Searching for:', query);

        // Simulate search
        setTimeout(() => {
            window.location.href = `results.html?q=${encodeURIComponent(query)}`;
        }, 500);
    }

    addSearchAnimation() {
        this.searchBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.searchBtn.style.transform = '';
        }, 200);
    }

    showSuggestions(value) {
        if (!value.trim()) {
            this.suggestionsBox.classList.remove('active');
            return;
        }

        const suggestions = this.getSuggestedQueries(value);
        this.renderSuggestions(suggestions);
        this.suggestionsBox.classList.add('active');
    }

    getSuggestedQueries(input) {
        const allSuggestions = [
            'Artificial Intelligence Trends 2026',
            'Advanced Machine Learning',
            'Web Development Frameworks',
            'JavaScript Best Practices',
            'React Hooks Tutorial',
            'TypeScript Guide',
            'Cloud Computing Services',
            'Cybersecurity Essentials',
            'Blockchain Technology',
            'Web3 Development',
            'API Design Patterns',
            'Database Optimization',
            'DevOps Pipeline',
            'Docker Containerization',
            'Kubernetes Orchestration',
        ];

        return allSuggestions
            .filter(s => s.toLowerCase().includes(input.toLowerCase()))
            .slice(0, 8);
    }

    renderSuggestions(suggestions) {
        this.suggestionsBox.innerHTML = '';
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `<i class="fas fa-search"></i> ${suggestion}`;
            item.addEventListener('click', () => {
                this.searchInput.value = suggestion;
                this.performSearch();
            });
            this.suggestionsBox.appendChild(item);
        });
    }

    toggleTheme() {
        // Theme toggle functionality - can be extended with localStorage
        document.body.classList.toggle('light-mode');
        const icon = this.themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    initializeParticles() {
        // Canvas particle system
        if (this.particleCanvas) {
            this.setupCanvasParticles();
        }

        // Floating particles in background
        this.createFloatingParticles();
    }

    setupCanvasParticles() {
        const ctx = this.particleCanvas.getContext('2d');
        const w = this.particleCanvas.width = window.innerWidth;
        const h = this.particleCanvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 1.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += Math.random() * 0.01 - 0.005;

                if (this.opacity > 0.8) this.opacity = 0.8;
                if (this.opacity < 0) this.opacity = 0;

                if (this.x > w) this.x = 0;
                if (this.x < 0) this.x = w;
                if (this.y > h) this.y = 0;
                if (this.y < 0) this.y = h;
            }

            draw() {
                ctx.fillStyle = `rgba(79, 126, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            this.particleCanvas.width = window.innerWidth;
            this.particleCanvas.height = window.innerHeight;
        });
    }

    createFloatingParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '-10px';
            particle.style.width = Math.random() * 2 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';

            this.floatingParticlesContainer.appendChild(particle);
        }
    }

    setupAnimations() {
        // Observe elements for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards
        document.querySelectorAll('.feature-card, .action-card, .trending-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            observer.observe(el);
        });
    }

    loadSuggestions() {
        // Placeholder for future suggestion loading
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new NovaSearch();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Keyboard shortcuts info
console.log('%cNova Search Keyboard Shortcuts', 'color: #4F7EFF; font-size: 16px; font-weight: bold;');
console.log('%cCtrl + / : Focus search bar', 'color: #00E5FF; font-size: 14px;');
console.log('%cEnter : Perform search', 'color: #00E5FF; font-size: 14px;');
