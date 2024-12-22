document.addEventListener('DOMContentLoaded', () => {
    const cartContainerBody = document.querySelector('.cartContainerBody');
    const grandTotalContainer = document.querySelector('.grandTotalPrice');

    // Get cart items from localStorage or initialize empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Render the cart items initially
    updateCart();

    // Function to update the cart table
    function updateCart() {
        cartContainerBody.innerHTML = ''; // Clear current table

        if (cartItems.length === 0) {
            cartContainerBody.innerHTML = `
                <tr>
                    <td colspan="5" >Your cart is empty. <a href="auctions.html">Continue shopping</a> </td>
                </tr>
            `;
            grandTotalContainer.innerHTML = '$0.00';
            return;
        }

        let grandTotalPrice = 0; // Initialize grand total

        cartItems.forEach((product, index) => {
            const totalPrice = (parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2);
            grandTotalPrice += parseInt(totalPrice)
            const productHTML = `
            <tr>
            <td class="imgName">
                <div class="cartProImage">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="cartProName">
                ${product.name}
                </div>
            </td>

            <td class="quantityPrice">
                <div class="CartproQuantity">

                    <div class="add" data-index="${index}">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div class="quantityBox" data-index="${index}">
                    ${product.quantity}                  
                    </div>
                    <div class="minus" data-index="${index}">
                        <i class="fa-solid fa-minus"></i>
                    </div>

                </div>

                <div class="CartproTotalPrice">
                $${totalPrice}
                </div>
            </td>

            <td>
                <div class="removeProduct" data-index="${index}">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </td>

        </tr>
                `;
            cartContainerBody.innerHTML += productHTML;
        });

        // Update grand total display
        grandTotalContainer.innerHTML = `$${grandTotalPrice.toFixed(2)}`

        // Add event listeners for dynamic actions
        attachEventListeners();
    }

    // Attach event listeners for quantity adjustments and removing items
    function attachEventListeners() {
        // Increase quantity
        const addButtons = document.querySelectorAll('.add');
        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                cartItems[index].quantity++;
                saveAndUpdateCart();
            });
        });

        // Decrease quantity
        const minusButtons = document.querySelectorAll('.minus');
        minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                    saveAndUpdateCart();
                }
            });
        });


        // Remove product
        const removeButtons = document.querySelectorAll('.removeProduct');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                cartItems.splice(index, 1); // Remove product
                saveAndUpdateCart();
            });
        });
    }

    // Save cart to localStorage and update UI
    function saveAndUpdateCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }
});
