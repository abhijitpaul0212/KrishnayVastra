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
