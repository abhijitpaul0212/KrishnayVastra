// // Modal Popup
// const images = document.querySelectorAll('.slider-image');
// const modal = document.getElementById('image-modal');
// const modalImage = document.getElementById('popup-image');
// const closeModal = document.querySelector('.close');

// images.forEach(image => {
//     image.addEventListener('click', () => {
//         modal.style.display = 'flex';
//         modalImage.src = image.src;
//     });
// });

// closeModal.addEventListener('click', () => {
//     modal.style.display = 'none';
// });

// window.addEventListener('click', (e) => {
//     if (e.target === modal) {
//         modal.style.display = 'none';
//     }
// });

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
const modalAddToCartButton = document.getElementById('modal-add-to-cart');

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

prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalContent(currentImageIndex);
});

nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalContent(currentImageIndex);
});

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

//     cart.forEach(item => {
//         const itemDiv = document.createElement('div');
//         itemDiv.textContent = `${item.name} - ₹${item.price}`;
//         cartItemsContainer.appendChild(itemDiv);
//         total += item.price;
//     });

//     cartTotalDisplay.textContent = `Total: ₹${total}`;
//     sendOrderButton.disabled = cart.length === 0;
// };

// modalAddToCartButton.addEventListener('click', () => {
//     const name = modalAddToCartButton.getAttribute('data-name');
//     const price = parseInt(modalAddToCartButton.getAttribute('data-price'), 10);
//     cart.push({ name, price });
//     updateCartDisplay();
//     modal.style.display = 'none';
// });

// sendOrderButton.addEventListener('click', () => {
//     const message = cart.map(item => `${item.name}: ₹${item.price}`).join('\n') +
//         `\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price, 0)}`;
//     const whatsappLink = `https://wa.me/9284641924?text=${encodeURIComponent(message)}`;
//     window.open(whatsappLink, '_blank');
// });

const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</span>
            <span class="remove-item" data-index="${index}">×</span>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.qty;
    });

    cartTotalDisplay.textContent = `Total: ₹${total}`;
    sendOrderButton.disabled = cart.length === 0;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            cart.splice(index, 1);
            updateCartDisplay();
        });
    });
};

modalAddToCartButton.addEventListener('click', () => {
    const name = modalAddToCartButton.getAttribute('data-name');
    const price = parseInt(modalAddToCartButton.getAttribute('data-price'), 10);
    const qty = parseInt(modalQtyDropdown.value, 10);
    cart.push({ name, price, qty });
    updateCartDisplay();
    modal.style.display = 'none';
});

sendOrderButton.addEventListener('click', () => {
    const message = cart.map(item => `${item.name} (x${item.qty}): ₹${item.price * item.qty}`).join('\n') +
        `\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}`;
    const whatsappLink = `https://wa.me/9284641924?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
});


// // Cart Logic
// let cart = [];
// const cartItemsContainer = document.getElementById('cart-items');
// const cartTotalDisplay = document.getElementById('cart-total');
// const sendOrderButton = document.getElementById('send-order');

// const updateCartDisplay = () => {
//     cartItemsContainer.innerHTML = '';
//     let total = 0;

//     cart.forEach((item, index) => {
//         const itemDiv = document.createElement('div');
//         itemDiv.textContent = `${item.name} - ₹${item.price}`;
//         cartItemsContainer.appendChild(itemDiv);
//         total += item.price;
//     });

//     cartTotalDisplay.textContent = `Total: ₹${total}`;
//     sendOrderButton.disabled = cart.length === 0;
// };

// document.querySelectorAll('.add-to-cart').forEach(button => {
//     button.addEventListener('click', () => {
//         const name = button.getAttribute('data-name');
//         const price = parseInt(button.getAttribute('data-price'), 10);
//         cart.push({ name, price });
//         updateCartDisplay();
//     });
// });

// sendOrderButton.addEventListener('click', () => {
//     const message = cart.map(item => `${item.name}: ₹${item.price}`).join('\n') +
//         `\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price, 0)}`;
//     const whatsappLink = `https://wa.me/9284641924?text=${encodeURIComponent(message)}`;
//     window.open(whatsappLink, '_blank');
// });
