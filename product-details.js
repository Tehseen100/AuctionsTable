document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById("productDetail");

    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch the products JSON
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);

            if (product) {
                // Generate stars for rating
                const stars = Array.from({ length: 5 }, (_, i) =>
                    i < product.rating
                        ? `<i class='fas fa-star'></i>` // Filled star
                        : `<i class='far fa-star'></i>` // Empty star
                ).join('');

                // Construct the product detail HTML
                const productHtml = `
                    <div class="pro-dets-img">
                        <img id="proDetsImg" src="${product.image}" width="100%" alt="${product.name}">
                    </div>
        
                    <div class="pro-dets">
                        <h6>Home / Shop</h6>
                        <h4 id="proDetsName">${product.name}</h4>
                        <div class="star">
                            ${stars}
                        </div>
                        <h2 id="proDetsPrice">${product.price}</h2>
                        <div class="detail-cart">
                            <input class="quantity" type="number" placeholder="1" min="1" value="1">
                            <button class="normal cartBtn">Add To Cart</button>
                        </div>
                        <h4>Product Details</h4>
                        <p id="proDescription">${product.description}</p>
                    </div> 
                `;

                productDetailContainer.innerHTML = productHtml;

                const cartBtn = productDetailContainer.querySelector('.cartBtn');
                const quantityInput = productDetailContainer.querySelector('.quantity');
                const priceDisplay = productDetailContainer.querySelector('#proDetsPrice');

                // Parse the product price (remove "$" if present)
                const basePrice = parseFloat(product.price.replace('$', ''));

                // Update price dynamically when quantity changes
                quantityInput.addEventListener('input', () => {
                    const quantity = Math.max(1, parseInt(quantityInput.value, 10) || 1); // Ensure min is 1
                    const totalPrice = (basePrice * quantity).toFixed(2); // Calculate total price
                    priceDisplay.textContent = `$${totalPrice}`; // Update price display
                });

                // Add product to cart when "Add to Cart" is clicked
                cartBtn.addEventListener('click', () => {
                    const quantity = Math.max(1, parseInt(quantityInput.value, 10) || 1); // Get selected quantity
                    addToCart(product, quantity); // Save to cart
                    window.location.href = 'cart.html'; // Redirect to cart page
                });
            } else {
                // Handle case where product is not found
                productDetailContainer.innerHTML = `<p>Product not found.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching product details:", error);
            productDetailContainer.innerHTML = `<p>Error loading product details. Please try again later.</p>`;
        });

    function addToCart(product, quantity) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Get existing cart from localStorage

        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity; // Update the quantity of the existing item
        } else {
            product.quantity = quantity; // Add new product with selected quantity
            cartItems.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cartItems)); // Save updated cart to localStorage
    }
});
