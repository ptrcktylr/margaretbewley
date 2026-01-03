// Gallery modal functionality

class Gallery {
  constructor() {
    this.selectedImage = null;
    this.modal = document.getElementById('gallery-modal');
    this.modalImage = document.getElementById('modal-image');
    this.modalDimensions = { width: 0, height: 0 };

    this.init();
  }

  calculateModalDimensions(imageSrc) {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const viewportWidth = window.innerWidth * 0.9;
      const viewportHeight = window.innerHeight * 0.9;
      const aspectRatio = img.width / img.height;

      let width, height;

      if (aspectRatio > 1) {
        // Landscape: Constrain width
        width = Math.min(viewportWidth, img.width);
        height = width / aspectRatio;

        // If height exceeds viewport height, constrain height and recalculate width
        if (height > viewportHeight) {
          height = viewportHeight;
          width = height * aspectRatio;
        }
      } else {
        // Portrait: Constrain height
        height = Math.min(viewportHeight, img.height);
        width = height * aspectRatio;

        // If width exceeds viewport width, constrain width and recalculate height
        if (width > viewportWidth) {
          width = viewportWidth;
          height = width / aspectRatio;
        }
      }

      this.modalDimensions = { width, height };
      this.updateModalImage();
    };
  }

  updateModalImage() {
    if (this.modalImage && this.selectedImage) {
      this.modalImage.src = this.selectedImage;
      this.modalImage.style.width = `${this.modalDimensions.width}px`;
      this.modalImage.style.height = `${this.modalDimensions.height}px`;
    }
  }

  openModal(imageSrc) {
    this.selectedImage = imageSrc;
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.calculateModalDimensions(imageSrc);
  }

  closeModal() {
    this.selectedImage = null;
    this.modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  handleResize() {
    if (this.selectedImage) {
      this.calculateModalDimensions(this.selectedImage);
    }
  }

  init() {
    // Add click handlers to all gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        this.openModal(img.src);
      });
    });

    // Close modal when clicking on the backdrop
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Close button
    const closeButton = document.getElementById('modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeModal();
      });
    }

    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.selectedImage) {
        this.closeModal();
      }
    });
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Gallery();
});
