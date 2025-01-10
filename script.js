document.addEventListener('DOMContentLoaded', () => {
    const mainProductImage = document.getElementById('main-product-image');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('popup-image');
    const closeModal = document.querySelector('.close');

    // Enable zoom functionality for the main product image
    if (mainProductImage) {
        mainProductImage.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImage.src = mainProductImage.src;
        });
    }

    // Close the modal view
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
