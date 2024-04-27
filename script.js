document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");
    const categoryFilter = document.getElementById("category-filter");
    const searchInput = document.getElementById("search-input");
    const sortOrder = document.getElementById("sort-order");

    // Fetch products from FakeStoreAPI
    fetchProducts();

    async function fetchProducts() {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        displayProducts(products);
        populateCategories(products);
    }

    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productList.appendChild(productItem);
        });
    }

    function populateCategories(products) {
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    categoryFilter.addEventListener("change", function() {
        filterProducts();
    });

    searchInput.addEventListener("input", function() {
        filterProducts();
    });

    sortOrder.addEventListener("change", function() {
        sortProducts();
    });

    function filterProducts() {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => {
            return (category === "all" || product.category === category) &&
                   (product.title.toLowerCase().includes(searchTerm));
        });
        displayProducts(filteredProducts);
    }

    function sortProducts() {
        const order = sortOrder.value;
        const sortedProducts = [...products].sort((a, b) => {
            return order === "asc" ? a.price - b.price : b.price - a.price;
        });
        displayProducts(sortedProducts);
    }
});