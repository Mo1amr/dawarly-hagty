document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("categoryFilter");
    const productCards = () => Array.from(document.querySelectorAll(".product-card"));

    const filterProducts = () => {
        const query = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value.trim().toLowerCase();

        productCards().forEach((card) => {
            const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
            const meta = card.querySelector(".product-meta")?.textContent.toLowerCase() || "";

            const matchesQuery =
                query === "" ||
                title.includes(query) ||
                meta.includes(query);

            const matchesCategory =
                selectedCategory === "" ||
                meta.includes(selectedCategory);

            card.style.display = matchesQuery && matchesCategory ? "" : "none";
        });
    };

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterProducts);
    }
});
