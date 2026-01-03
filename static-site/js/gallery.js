// Gallery modal functionality

class Gallery {
  constructor() {
    this.selectedImage = null;
    this.modal = document.getElementById('gallery-modal');
    this.modalImage = document.getElementById('modal-image');
    this.modalDimensions = { width: 0, height: 0 };
    this.galleryGrid = document.getElementById('gallery-grid');

    this.init();
  }

  async loadImages() {
    try {
      const response = await fetch('/api/images');

      if (response.ok) {
        const images = await response.json();
        this.renderImages(images.map(img => img.url));
      } else {
        this.galleryGrid.innerHTML = '<div class="col-span-full text-center py-12 opacity-50">Error loading gallery.</div>';
      }
    } catch (error) {
      console.error('Error loading images:', error);
      this.galleryGrid.innerHTML = '<div class="col-span-full text-center py-12 opacity-50">Error loading gallery.</div>';
    }
  }

  renderImages(imageUrls) {
    this.galleryGrid.innerHTML = '';

    if (imageUrls.length === 0) {
      this.galleryGrid.innerHTML = '<div class="col-span-full text-center py-12 opacity-50">No images in gallery yet.</div>';
      return;
    }

    imageUrls.forEach((url, index) => {
      const div = document.createElement('div');
      div.className = 'mb-4 break-inside-avoid';

      const img = document.createElement('img');
      img.src = url;
      img.alt = `Gallery Image ${index}`;
      img.className = 'w-full h-auto cursor-pointer gallery-image';
      img.loading = 'lazy';

      div.appendChild(img);
      this.galleryGrid.appendChild(div);
    });

    // Re-attach click handlers
    this.attachClickHandlers();
  }

  attachClickHandlers() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        this.openModal(img.src);
      });
    });
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
    // Load images first
    this.loadImages();

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
