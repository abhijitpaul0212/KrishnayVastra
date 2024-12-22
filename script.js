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

images.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentImageIndex = index;
        modal.style.display = 'flex';
        updateModalContent(currentImageIndex);
    });
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
});

// Cart Logic
let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const sendOrderButton = document.getElementById('send-order');

// const updateCartDisplay = () => {
//     cartItemsContainer.innerHTML = '';
//     let total = 0;

//     cart.forEach((item, index) => {
//         const itemDiv = document.createElement('div');
//         itemDiv.classList.add('cart-item');
//         itemDiv.innerHTML = `
//             <span>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</span>
//             <span class="remove-item" data-index="${index}">×</span>
//         `;
//         cartItemsContainer.appendChild(itemDiv);
//         total += item.price * item.qty;
//     });

//     cartTotalDisplay.textContent = `Total: ₹${total}`;
//     sendOrderButton.disabled = cart.length === 0;

//     // Add event listeners to remove buttons
//     document.querySelectorAll('.remove-item').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const index = parseInt(e.target.getAttribute('data-index'), 10);
//             cart.splice(index, 1);
//             updateCartDisplay();
//         });
//     });
// };

// Update Cart Display with Correct Price Calculation
const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        const itemTotal = item.price * item.qty; // Calculate total price
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
            cart.splice(index, 1);
            updateCartDisplay();
        });
    });
};



// Dropdown Fix: Ensure it has values 1–9
modalQtyDropdown.innerHTML = Array.from({ length: 9 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');


// Modal Add to Cart Logic
modalAddToCartButton.addEventListener('click', () => {
    const name = modalAddToCartButton.getAttribute('data-name');
    const price = parseInt(modalAddToCartButton.getAttribute('data-price'), 10);
    const qty = parseInt(modalQtyDropdown.value, 10);
    cart.push({ name, price, qty });
    updateCartDisplay();
    alert(`${qty} x ${name} added to cart!`);
    modal.style.display = 'none';
});

// modalAddToCartButton.addEventListener('click', () => {
//     const name = modalAddToCartButton.getAttribute('data-name');
//     const price = parseInt(modalAddToCartButton.getAttribute('data-price'), 10);
//     const qty = parseInt(modalQtyDropdown.value, 10);
//     cart.push({ name, price, qty });
//     updateCartDisplay();
//     modal.style.display = 'none';
// });

sendOrderButton.addEventListener('click', () => {
    const message = cart.map(item => `${item.name} (x${item.qty}): ₹${item.price * item.qty}`).join('\n') +
        `\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}`;
    const whatsappLink = `https://wa.me/9284641924?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
});
