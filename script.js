document.addEventListener("DOMContentLoaded", () => {
    // Selectors for modal view
    const mainProductImage = document.getElementById('main-product-image');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('popup-image');
    const closeModal = document.querySelector('.close');

    // Selectors for product page
    // const addToCartButton = document.getElementById('add-to-cart');
    const addToCartButton = document.getElementById("modal-add-to-cart");
    const quantityDropdown = document.getElementById('quantity');
    const outOfStockMessage = document.getElementById('out-of-stock-message');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');

    let cart = []; // To track cart items

    // Enable zoom functionality for the main product image
    if (mainProductImage) {
        mainProductImage.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImage.src = mainProductImage.src;
        });
    }

    // Close Modal View
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal on clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Dropdown Fix: Ensure it has values 1–9
    quantityDropdown.innerHTML = Array.from({ length: 9 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');


    // Add to Cart Logic on Product Page
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productName = addToCartButton.getAttribute('data-name');
            const productPrice = parseInt(addToCartButton.getAttribute('data-price'), 10);
            const quantity = parseInt(quantityDropdown.value, 10);

            // Validate quantity and add to cart
            if (!isNaN(productPrice) && quantity > 0) {
                cart.push({ name: productName, price: productPrice, qty: quantity });
                updateCartDisplay();
                alert(`${quantity} x ${productName} added to cart!`);
            } else {
                alert("Error: Invalid quantity or price!");
            }
        });
    }

    // Update Cart Display
    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <span>${item.name} (x${item.qty}) - ₹${itemTotal}</span>
                <span class="remove-item" data-index="${index}">×</span>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += itemTotal;
        });

        cartTotalDisplay.textContent = `Total: ₹${total}`;
    };

    // Handle Out of Stock
    const handleOutOfStock = () => {
        const isOutOfStock = addToCartButton.getAttribute('data-stock') === "0";
        if (isOutOfStock) {
            addToCartButton.style.display = "none";
            quantityDropdown.style.display = "none";
            if (!outOfStockMessage) {
                const message = document.createElement('p');
                message.id = "out-of-stock-message";
                message.textContent = "Out of Stock";
                message.style.color = "red";
                message.style.fontWeight = "bold";
                message.style.textAlign = "center";
                addToCartButton.parentElement.appendChild(message);
            }
        }
    };

    // Run Out of Stock check on page load
    if (addToCartButton) {
        handleOutOfStock();
    }

    const quantityDropdown = document.getElementById("modal-qty"); // Corrected ID

    if (quantityDropdown) {
        // Populate the quantity dropdown with numbers 1 to 9
        for (let i = 1; i <= 9; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            quantityDropdown.appendChild(option);
        }
    }
});
