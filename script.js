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
    // const quantityDropdown = document.getElementById("modal-qty"); // Corrected ID
    const outOfStockMessage = document.getElementById('out-of-stock-message');
    const cartItemsContainer = document.getElementById('cart-items');

    // Expand/Collapse Cart Tray for Mobile View
    const mobileCart = document.querySelector('.cart');
    const cartToggle = document.getElementById('cart-toggle');
    
    const cartTotalDisplay = document.getElementById('cart-total');
    const sendOrderButton = document.getElementById('send-order');

    // User Details Form
    const userDetailsForm = document.getElementById('user-details-form');

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

    // Expand/Collapse Cart Tray for Mobile View
    cartToggle.addEventListener('click', () => {
        mobileCart.classList.toggle('expanded');
    });

    // Open User Details Modal and Collapse Cart Tray
    sendOrderButton.addEventListener('click', () => {
        mobileCart.classList.remove('expanded'); // Collapse the cart tray
        userDetailsModal.style.display = 'flex'; // Show the user details modal
    });

    // Process User Details and Send Order
    userDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Gather user details
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim() || "Not Provided";
        const address = document.getElementById('address').value.trim();
        const pin = document.getElementById('pin').value.trim();
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();
    
        // Validate mandatory fields
        if (!fullName || !address || !pin || !city || !state) {
            alert("Please fill in all mandatory fields!");
            return;
        }
    
        // Construct the cart details message
        const cartDetails = cart.map(item => `${item.name} (x${item.qty}): ₹${item.price * item.qty}`).join('\n');
        const cartTotal = `Total: ₹${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}`;
    
        // Construct the user details message
        const userDetails = `Delivery Details:\nName: ${fullName}\nEmail: ${email}\nAddress: ${address}, ${city}, ${state}, ${pin}\n\n**Delivery Charges will be separately calculated and not included in Order Price.`;
    
        // Combine the messages
        const message = `Order Details:\n\n${cartDetails}\n\n${cartTotal}\n\n${userDetails}`;
    
        // Open WhatsApp link
        const whatsappLink = `https://wa.me/9284641924?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    
        // Send email using Emailjs
        sendEmail({
            fullName,
            email,
            address,
            city,
            state,
            pin,
            cartDetails,
            cartTotal,
        });
    
        // Close the modal after sending
        userDetailsModal.style.display = 'none';
    });

    // Function to Send Email
    function sendEmail(details) {
        const emailParams = {
            to_email: "krishnayvastra@gmail.com", // Recipient email
            user_name: details.fullName,
            user_email: details.email || "Not provided",
            user_address: details.address,
            user_city: details.city,
            user_state: details.state,
            user_pin: details.pin,
            order_details: details.cartDetails,
            total_price: details.cartTotal,
        };
    
        emailjs.send("service_lplcjok", "template_9zqnuu8", emailParams)
            .then((response) => {
                console.log("Email sent successfully:", response.status, response.text);
            })
            .catch((error) => {
                console.error("Failed to send email:", error);
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
        sendOrderButton.disabled = cart.length === 0;
    
        // Attach Remove Item Event Listeners
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'), 10);
                cart.splice(index, 1); // Remove item from the cart
                updateCartDisplay();
            });
        });

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

    // if (quantityDropdown) {
    //     // Populate the quantity dropdown with numbers 1 to 9
    //     for (let i = 1; i <= 9; i++) {
    //         const option = document.createElement("option");
    //         option.value = i;
    //         option.textContent = i;
    //         quantityDropdown.appendChild(option);
    //     }
    // }
});
