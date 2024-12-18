// Image Slider
document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.product-slider');
    const leftBtn = container.querySelector('.slider-btn.left');
    const rightBtn = container.querySelector('.slider-btn.right');

    let scrollAmount = 0;

    leftBtn.addEventListener('click', () => {
        scrollAmount -= 100;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    rightBtn.addEventListener('click', () => {
        scrollAmount += 100;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});

// Modal Popup
const images = document.querySelectorAll('.slider-image');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('popup-image');
const closeModal = document.querySelector('.close');

images.forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = image.src;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
