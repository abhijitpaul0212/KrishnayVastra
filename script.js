const images = document.querySelectorAll('.slider-image');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('popup-image');
const modalImageName = document.getElementById('modal-image-name');
const modalAddToCartButton = document.getElementById('modal-add-to-cart');
const closeModal = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const modalQtyDropdown = document.getElementById('modal-qty');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const sendOrderButton = document.getElementById('send-order');
// Expand/Collapse Cart Tray for Mobile View
const mobileCart = document.querySelector('.cart');
const cartToggle = document.getElementById('cart-toggle');
// Open User Details Modal
const userDetailsModal = document.getElementById('user-details-modal');
const closeUserDetailsModal = document.getElementById('close-user-modal');
const userDetailsForm = document.getElementById('user-details-form');

let currentImageIndex = 0;
let cart = [];
// Functions
// Update the modal display with new values
const updateModalContent = (index) => {
    const selectedImage = images[index];
    modalImage.src = selectedImage.src;
    modalImageName.textContent = selectedImage.getAttribute('data-name');
    modalAddToCartButton.setAttribute('data-name', selectedImage.getAttribute('data-name'));
    modalAddToCartButton.setAttribute('data-price', selectedImage.getAttribute('data-price'));

    // Reset the quantity dropdown to 1 when updating content
    resetQuantity();
};

// Reset Quantity to 1 on New Image View
const resetQuantity = () => {
    modalQtyDropdown.value = "1";
};

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

// Begining of the body

// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.slider-image');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('popup-image');
    const modalImageName = document.getElementById('modal-image-name');
    const modalAddToCartButton = document.getElementById('modal-add-to-cart');
    const closeModal = document.querySelector('.close');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const modalQtyDropdown = document.getElementById('modal-qty');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const sendOrderButton = document.getElementById('send-order');
    // Expand/Collapse Cart Tray for Mobile View
    const mobileCart = document.querySelector('.cart');
    const cartToggle = document.getElementById('cart-toggle');
    // Open User Details Modal
    const userDetailsModal = document.getElementById('user-details-modal');
    const closeUserDetailsModal = document.getElementById('close-user-modal');
    const userDetailsForm = document.getElementById('user-details-form');
    
    let currentImageIndex = 0;
    let cart = [];

    // Ensure the modalImage exists before adding an event listener
    if (modalImage && prevButton && nextButton && closeModal) {

        // Open Modal
        images.forEach((image, index) => {
            image.addEventListener('click', () => {
                currentImageIndex = index;
                modal.style.display = 'flex';
                document.body.classList.add('modal-open'); // Add modal-open class
                updateModalContent(currentImageIndex);
            });
        });
        
        // Zoom In/Out Feature
        modalImage.addEventListener("click", () => {
            modalImage.classList.toggle("zoomed");
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

        // Expand/Collapse Cart Tray for Mobile View
        cartToggle.addEventListener('click', () => {
            mobileCart.classList.toggle('expanded');
        });

        // Open User Details Modal and Collapse Cart Tray
        sendOrderButton.addEventListener('click', () => {
            mobileCart.classList.remove('expanded'); // Collapse the cart tray
            userDetailsModal.style.display = 'flex'; // Show the user details modal
        });
        
        // Close User Details Modal
        closeUserDetailsModal.addEventListener('click', () => {
            userDetailsModal.style.display = 'none';
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
        
        // Close Modal on Outside Click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open'); // Remove modal-open class
            }
        });

    } else {
        console.warn("Modal image element not found. Please check the DOM structure.");
    }
}); // <-- Add this closing braces for DOMContentLoaded
