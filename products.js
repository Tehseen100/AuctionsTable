document.addEventListener('DOMContentLoaded', () => {
    const bestSellingContainers = document.querySelectorAll('.bestSellingContainer');
    const trendingProContainers = document.querySelectorAll('.trendingProContainer');
    const allProductsContainer = document.querySelector('.allProductsContainer');

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const bestSellingProducts = products.filter(product => product.categories.includes("Best Selling"));
            const trendingProducts = products.filter(product => product.categories.includes("Trending"));
            const allProducts = [...products];

            bestSellingContainers.forEach(container => {
                renderProducts(container, bestSellingProducts);
                attachClickEvents(container); // Attach click events
            });

            trendingProContainers.forEach(container => {
                renderProducts(container, trendingProducts);
                attachClickEvents(container); // Attach click events
            });

            if (allProductsContainer) {
                renderProducts(allProductsContainer, allProducts);
                attachClickEvents(allProductsContainer); // Attach click events
            }
        })
        .catch(err => console.error("Error Loading Products:", err));


    function renderProducts(container, products) {
        container.innerHTML = products.map(product => {
            const stars = Array.from({ length: 5 }, (_, i) =>
                i < product.rating
                    ? `<i class="fas fa-star"></i>`  // Filled star
                    : `<i class="far fa-star"></i>`  // Empty star
            ).join('');

            return `<div class="pro" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="des">
                    <h5>${product.name}</h5>
                    <div class="star">
                        ${stars}
                    </div>
                </div>
                <div class="cart-container">
                    <h4>${product.price}</h4>
                    <div class="cart">
                        <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    function attachClickEvents(container) {
        const products = container.querySelectorAll('.pro'); // Select all `.pro` elements inside the container

        products.forEach(pro => {
            const productId = pro.getAttribute('data-id'); // Get the product ID from `data-id`

            pro.addEventListener('click', () => {
                // Navigate to the product details page
                window.location.href = `product-details.html?id=${productId}`;
            });
        });
    }

});
