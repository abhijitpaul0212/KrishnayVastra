// Modal Logic
const images = document.querySelectorAll('.slider-image');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('popup-image');
const modalImageName = document.getElementById('modal-image-name');
const modalAddToCartButton = document.getElementById('modal-add-to-cart');
const closeModal = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const modalQtyDropdown = document.getElementById('modal-qty');

let currentImageIndex = 0;

const updateModalContent = (index) => {
    const selectedImage = images[index];
    modalImage.src = selectedImage.src;
    modalImageName.textContent = selectedImage.getAttribute('data-name');
    modalAddToCartButton.setAttribute('data-name', selectedImage.getAttribute('data-name'));
    modalAddToCartButton.setAttribute('data-price', selectedImage.getAttribute('data-price'));
};

// Open Modal
images.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentImageIndex = index;
        modal.style.display = 'flex';
        document.body.classList.add('modal-open'); // Add modal-open class
        updateModalContent(currentImageIndex);
    });
});

// Reset Quantity to 1 on New Image View
const resetQuantity = () => {
    modalQtyDropdown.value = "1";
};

// Zoom In/Out Feature
modalImage.addEventListener('click', () => {
    modalImage.classList.toggle('zoomed');
});

// Modal Navigation Persistence
prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalContent(currentImageIndex);
});

nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalContent(currentImageIndex);
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Remove modal-open class
});

// Close Modal on Outside Click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Remove modal-open class
    }
});

// Cart Logic
let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const sendOrderButton = document.getElementById('send-order');

// Toggle Cart Visibility
const cart = document.querySelector('.cart');
const cartArrow = document.getElementById('cart-arrow');

cartArrow.addEventListener('click', () => {
    if (cart.classList.contains('collapsed')) {
        cart.classList.remove('collapsed');
        cart.classList.add('expanded');
        cartArrow.innerHTML = '&#10096;'; // Change arrow direction
    } else {
        cart.classList.remove('expanded');
        cart.classList.add('collapsed');
        cartArrow.innerHTML = '&#10094;'; // Change arrow direction
    }
});


// Update Cart Display with Correct Price Calculation
const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty; // Calculate total price
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

// Cart Expand/Collapse Logic
const cartHeader = document.getElementById('cart-header');
const cartContent = document.getElementById('cart-content');

cartHeader.addEventListener('click', () => {
    cartContent.classList.toggle('hidden'); // Toggle visibility of cart content
});

// Dropdown Fix: Ensure it has values 1–9
modalQtyDropdown.innerHTML = Array.from({ length: 9 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');

// Modal Add to Cart Logic
modalAddToCartButton.addEventListener('click', () => {
    const name = modalAddToCartButton.getAttribute('data-name');
    const price = parseInt(modalAddToCartButton.getAttribute('data-price'), 10); // Ensure price is parsed correctly
    const qty = parseInt(modalQtyDropdown.value, 10); // Ensure quantity is parsed correctly

    if (!isNaN(price) && qty > 0) { // Validate price and quantity
        cart.push({ name, price, qty });
        updateCartDisplay();
        alert(`${qty} x ${name} added to cart!`);
    } else {
        alert('Error: Invalid price or quantity!');
    }
});

// Open User Details Modal
const userDetailsModal = document.getElementById('user-details-modal');
const closeUserDetailsModal = document.getElementById('close-user-modal');
const userDetailsForm = document.getElementById('user-details-form');

// Open User Details Modal
sendOrderButton.addEventListener('click', () => {
    userDetailsModal.style.display = 'flex';
});

// Close User Details Modal
closeUserDetailsModal.addEventListener('click', () => {
    userDetailsModal.style.display = 'none';
});

// Process User Details and Send Order
// userDetailsForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const fullName = document.getElementById('full-name').value;
//     const email = document.getElementById('email').value || "Not Provided";
//     const address = document.getElementById('address').value;
//     const pin = document.getElementById('pin').value;
//     const city = document.getElementById('city').value;
//     const state = document.getElementById('state').value;

//     const message = `Order Details:\n\n${cart.map(item => `${item.name} (x${item.qty}): ₹${item.price * item.qty}`).join('\n')}` +
//         `\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}` +
//         `\n\nDelivery Details:\nName: ${fullName}\nEmail: ${email}\nAddress: ${address}, ${city}, ${state}, ${pin}` +
//         `\n\n**Delivery Charges will be separately calculated and not included in Order Price.`;

//     const whatsappLink = `https://wa.me/9284641924?text=${encodeURIComponent(message)}`;
//     window.open(whatsappLink, '_blank');
//     userDetailsModal.style.display = 'none';
// });

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

    // Close the modal after sending
    userDetailsModal.style.display = 'none';
});


// sendOrderButton.addEventListener('click', () => {
//     const message = cart.map(item => `${item.name} (x${item.qty}): ₹${item.price * item.qty}`).join('\n') +
//         `\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}`;
//     const whatsappLink = `https://wa.me/9284641924?text=${encodeURIComponent(message)}`;
//     window.open(whatsappLink, '_blank');
// });
