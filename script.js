document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const cards = document.querySelectorAll(".card");
    const themeToggle = document.getElementById("themeToggle");
    const suggestionsContainer = document.getElementById("suggestions");
    const historySection = document.getElementById("historySection");
    const searchHistory = document.getElementById("searchHistory");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    const STORAGE_KEY = "novaSearchHistory";
    const MAX_HISTORY = 10;
    let currentSearchType = "all";
    let searchHistory_data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Popular search suggestions
    const suggestionData = [
        "artificial intelligence",
        "web development",
        "machine learning",
        "cloud computing",
        "cybersecurity",
        "blockchain",
        "augmented reality",
        "quantum computing",
        "data science",
        "python tutorial",
        "javascript tips",
        "react hooks"
    ];

    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        localStorage.setItem("novaTheme", document.body.classList.contains("light-mode"));
        updateThemeIcon();
    });

    function updateThemeIcon() {
        if (document.body.classList.contains("light-mode")) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Load theme preference
    if (localStorage.getItem("novaTheme") === "true") {
        document.body.classList.add("light-mode");
        updateThemeIcon();
    }

    // Search functionality
    function performSearch(type = "all") {
        const query = searchInput.value.trim();

        if (query === "") {
            alert("Please type something to search first!");
            return;
        }

        // Add to history
        addToHistory(query);

        let searchUrl = "";

        switch(type) {
            case "images":
                searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
                break;
            case "videos":
                searchUrl = `https://www.google.com/search?tbm=vid&q=${encodeURIComponent(query)}`;
                break;
            case "news":
                searchUrl = `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query)}`;
                break;
            case "shopping":
                searchUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`;
                break;
            default:
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        window.location.href = searchUrl;
    }

    // History Management
    function addToHistory(query) {
        // Remove duplicates
        searchHistory_data = searchHistory_data.filter(item => item !== query);
        // Add to beginning
        searchHistory_data.unshift(query);
        // Keep only max items
        searchHistory_data = searchHistory_data.slice(0, MAX_HISTORY);
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory_data));
        renderHistory();
    }

    function renderHistory() {
        if (searchHistory_data.length === 0) {
            historySection.style.display = "none";
            return;
        }

        historySection.style.display = "block";
        searchHistory.innerHTML = "";

        searchHistory_data.forEach((query, index) => {
            const item = document.createElement("div");
            item.className = "history-item";
            item.innerHTML = `
                <span>${escapeHtml(query)}</span>
                <button class="remove-btn" title="Remove from history">×</button>
            `;

            item.querySelector("span").addEventListener("click", () => {
                searchInput.value = query;
                performSearch(currentSearchType);
            });

            item.querySelector(".remove-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                searchHistory_data.splice(index, 1);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory_data));
                renderHistory();
            });

            searchHistory.appendChild(item);
        });
    }

    function clearHistory_func() {
        if (confirm("Are you sure you want to clear all search history?")) {
            searchHistory_data = [];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory_data));
            renderHistory();
        }
    }

    // Suggestions
    function updateSuggestions() {
        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            suggestionsContainer.classList.remove("active");
            return;
        }

        const filtered = suggestionData.filter(s => s.includes(query));

        if (filtered.length === 0) {
            suggestionsContainer.classList.remove("active");
            return;
        }

        suggestionsContainer.innerHTML = "";
        suggestionsContainer.classList.add("active");

        filtered.slice(0, 5).forEach(suggestion => {
            const item = document.createElement("div");
            item.className = "suggestion-item";
            item.textContent = suggestion;
            item.addEventListener("click", () => {
                searchInput.value = suggestion;
                performSearch(currentSearchType);
            });
            suggestionsContainer.appendChild(item);
        });
    }

    // Event Listeners
    searchBtn.addEventListener("click", () => performSearch(currentSearchType));

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch(currentSearchType);
        }
    });

    searchInput.addEventListener("input", updateSuggestions);
    searchInput.addEventListener("focus", updateSuggestions);

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-section")) {
            suggestionsContainer.classList.remove("active");
        }
    });

    // Category Cards
    cards.forEach(card => {
        card.addEventListener("click", () => {
            currentSearchType = card.getAttribute("data-type");
            performSearch(currentSearchType);
        });

        // Visual feedback
        card.addEventListener("mouseenter", () => {
            card.style.position = "relative";
        });
    });

    // Clear History Button
    clearHistoryBtn.addEventListener("click", clearHistory_func);

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
        // Ctrl/Cmd + Shift + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "K") {
            e.preventDefault();
            searchInput.focus();
        }
        // Ctrl/Cmd + B to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === "b") {
            e.preventDefault();
            themeToggle.click();
        }
    });

    // Utility function to escape HTML
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Initialize
    renderHistory();

    // Focus search input on load
    searchInput.focus();
});