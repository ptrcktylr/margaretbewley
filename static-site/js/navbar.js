// Navbar functionality: theme toggle, mobile dropdown, cookie management

class Navbar {
  constructor() {
    this.isDark = this.getInitialTheme();
    this.dropdownRef = document.getElementById('mobile-dropdown');
    this.dropdownMenu = document.getElementById('dropdown-menu');
    this.themeToggle = document.getElementById('theme-toggle');

    this.init();
  }

  // Cookie management functions
  setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getInitialTheme() {
    const savedTheme = this.getCookie('isdark');
    return savedTheme === 'true';
  }

  setTheme(isDark) {
    this.isDark = isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    this.setCookie('isdark', String(isDark));

    // Update checkbox state
    if (this.themeToggle) {
      this.themeToggle.checked = isDark;
    }
  }

  toggleTheme() {
    this.setTheme(!this.isDark);
  }

  toggleDropdown() {
    if (this.dropdownMenu) {
      this.dropdownMenu.classList.toggle('hidden');
    }
  }

  closeDropdown() {
    if (this.dropdownMenu && !this.dropdownMenu.classList.contains('hidden')) {
      this.dropdownMenu.classList.add('hidden');
    }
  }

  handleClickOutside(event) {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.closeDropdown();
    }
  }

  handleLinkClick(event) {
    this.closeDropdown();
    // Blur the clicked element
    event.target.blur();
  }

  init() {
    // Set initial theme
    this.setTheme(this.isDark);

    // Theme toggle event listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener('change', () => this.toggleTheme());
    }

    // Mobile dropdown toggle
    const dropdownButton = document.getElementById('dropdown-button');
    if (dropdownButton) {
      dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });
    }

    // Click outside to close dropdown
    document.addEventListener('mousedown', (e) => this.handleClickOutside(e));

    // Handle all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e));
    });
  }
}

// Initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
});
