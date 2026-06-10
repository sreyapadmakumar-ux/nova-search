document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-bar-wrapper input");
    const searchButton = document.querySelector(".search-btn");
    const cards = document.querySelectorAll(".card");

    // Core function to execute search based on type (all, images, videos, news)
    function performSearch(type = "all") {
        const query = searchInput.value.trim();
        
        if (query === "") {
            alert("Please type something to search first!");
            return;
        }

        let searchUrl = "";

        // Route to different search types based on what was clicked
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
            default:
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        // Redirect to the target search URL
        window.location.href = searchUrl;
    }

    // Trigger standard search on button click
    searchButton.addEventListener("click", () => performSearch("all"));

    // Trigger standard search on 'Enter' key
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch("all");
        }
    });

    // Make each category card clickable
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const searchType = card.getAttribute("data-type");
            performSearch(searchType);
        });
    });
});