/* ========================================
   STARSTRUCK — Main JavaScript
   ======================================== */

(function() {
  'use strict';

  // ========================================
  // Configuration & Constants
  // ========================================
  const CONFIG = {
    whatsappNumber: '8801975882211', // Bangladesh country code + number
    currency: 'BDT',
    currencySymbol: '৳',
    toastDuration: 5000, // 5 seconds
    animationDuration: 300,
  };

  const CATEGORIES = {
    processor: 'Processors',
    graphics: 'Graphics Cards',
    motherboard: 'Motherboards',
    ram: 'Memory (RAM)',
    storage: 'Storage',
    psu: 'Power Supplies',
    casing: 'Cases',
    cooling: 'Cooling',
    peripherals: 'Peripherals'
  };

  // Product data extracted from inventory PDF (10+ inventory)
  const PRODUCTS = [
    // Processors
    { id: 'proc-1', name: 'AMD Ryzen 5 5600X', category: 'processor', price: 18500, inventory: 78, image: null },
    { id: 'proc-2', name: 'AMD Ryzen 7 5700G', category: 'processor', price: 22000, inventory: 99, image: null },
    { id: 'proc-3', name: 'AMD Ryzen 7 Pro 5755G', category: 'processor', price: 24500, inventory: 107, image: null },
    { id: 'proc-4', name: 'Intel Core i3-10100', category: 'processor', price: 11500, inventory: 32, image: null },
    { id: 'proc-5', name: 'Intel Core i5-10400', category: 'processor', price: 16500, inventory: 165, image: null },
    { id: 'proc-6', name: 'Intel Core i5-12400F', category: 'processor', price: 18900, inventory: 41, image: null },
    { id: 'proc-7', name: 'Intel Core i7-10700', category: 'processor', price: 28500, inventory: 27, image: null },
    { id: 'proc-8', name: 'Intel Processor Cap 10th Gen', category: 'processor', price: 800, inventory: 50, image: null },

    // Graphics Cards
    { id: 'gpu-1', name: 'AMD Radeon RX 580 8GB', category: 'graphics', price: 16500, inventory: 51, image: null },
    { id: 'gpu-2', name: 'GUNNIR Intel Arc A380 6GB', category: 'graphics', price: 14500, inventory: 48, image: null },
    { id: 'gpu-3', name: 'UNIKA Radeon RX 580 Blizzards V2 8GB', category: 'graphics', price: 17000, inventory: 51, image: null },

    // Motherboards
    { id: 'mb-1', name: 'WINMAX B85 4th Gen', category: 'motherboard', price: 4500, inventory: 113, image: null },
    { id: 'mb-2', name: 'WINMAX H81 4th Gen', category: 'motherboard', price: 4000, inventory: 113, image: null },

    // RAM
    { id: 'ram-1', name: 'AOALOO DDR3 4GB 1600MHz', category: 'ram', price: 1200, inventory: 244, image: null },
    { id: 'ram-2', name: 'AOALOO DDR3 8GB 1600MHz', category: 'ram', price: 1800, inventory: 19, image: null },
    { id: 'ram-3', name: 'KINGSMAN AITC Innovator 16GB DDR4 3200MHz', category: 'ram', price: 4200, inventory: 43, image: null },
    { id: 'ram-4', name: 'KINGSMAN AITC Innovator 8GB DDR4 3200MHz', category: 'ram', price: 2400, inventory: 10, image: null },
    { id: 'ram-5', name: 'KINGSMAN AITC Gaming 16GB DDR5 6000MHz', category: 'ram', price: 7500, inventory: 10, image: null },
    { id: 'ram-6', name: 'Kingston FURY Beast 16GB DDR5 6000MHz', category: 'ram', price: 8500, inventory: 45, image: null },
    { id: 'ram-7', name: 'Samsung 8GB DDR5 5600MHz', category: 'ram', price: 3800, inventory: 5600, image: null },
    { id: 'ram-8', name: 'TwinMOS TornadoX 8GB DDR5 5600MHz', category: 'ram', price: 3600, inventory: 10, image: null },
    { id: 'ram-9', name: 'TwinMOS VOLTX RGB 16GB DDR5 6000MHz', category: 'ram', price: 7200, inventory: 10, image: null },
    { id: 'ram-10', name: 'Lexar THOR 16GB DDR4 3600MHz', category: 'ram', price: 4800, inventory: 10, image: null },
    { id: 'ram-11', name: 'Desktop RAM Kingston DDR5 FURY 16GB 6000MHz Black', category: 'ram', price: 8500, inventory: 3, image: null },

    // Storage
    { id: 'sto-1', name: 'COLORFUL CN600 Pro 512GB M.2 NVMe', category: 'storage', price: 4200, inventory: 106, image: null },
    { id: 'sto-2', name: 'CRUCIAL BX500 480GB 2.5" SATA', category: 'storage', price: 3800, inventory: 64, image: null },
    { id: 'sto-3', name: 'HP EX900 Plus 1TB M.2 NVMe', category: 'storage', price: 6500, inventory: 80, image: null },
    { id: 'sto-4', name: 'HP EX900 Plus 512GB M.2 NVMe', category: 'storage', price: 3800, inventory: 64, image: null },
    { id: 'sto-5', name: 'HP EX920 1TB M.2 NVMe', category: 'storage', price: 7200, inventory: 21, image: null },
    { id: 'sto-6', name: 'HP EX900 Plus 256GB M.2 NVMe', category: 'storage', price: 2400, inventory: 20, image: null },
    { id: 'sto-7', name: 'HP FX900 Plus 512GB M.2 NVMe', category: 'storage', price: 4500, inventory: 15, image: null },
    { id: 'sto-8', name: 'HP S650 480GB 2.5" SATA', category: 'storage', price: 3500, inventory: 25, image: null },
    { id: 'sto-9', name: 'KINGSPEC P3 256GB 2.5" SATA', category: 'storage', price: 2200, inventory: 64, image: null },
    { id: 'sto-10', name: 'Lexar NM620 1TB M.2 NVMe', category: 'storage', price: 6800, inventory: 51, image: null },
    { id: 'sto-11', name: 'SOMNAMBULIST 256GB NVMe', category: 'storage', price: 2000, inventory: 11, image: null },
    { id: 'sto-12', name: 'SOMNAMBULIST H650 128GB SATA', category: 'storage', price: 1500, inventory: 31, image: null },
    { id: 'sto-13', name: 'TECMIYO 240GB SATA (3 Years)', category: 'storage', price: 1800, inventory: 11, image: null },
    { id: 'sto-14', name: 'Portable HDD Seagate One Touch Hub 6TB', category: 'storage', price: 14500, inventory: 12, image: null },
    { id: 'sto-15', name: 'Portable HDD Transcend StoreJet 25M3 2TB', category: 'storage', price: 6500, inventory: 43, image: null },
    { id: 'sto-16', name: 'Portable HDD Transcend StoreJet 5M 2TB', category: 'storage', price: 7200, inventory: 272, image: null },

    // Power Supplies
    { id: 'psu-1', name: 'VALUE-TOP 600W 80+ Bronze', category: 'psu', price: 3200, inventory: 200, image: null },
    { id: 'psu-2', name: 'Power Strip 1.5m 4-Way', category: 'psu', price: 450, inventory: 80, image: null },

    // Cases
    { id: 'case-1', name: 'CASING VALUE-TOP V200 Micro ATX with PSU', category: 'casing', price: 3500, inventory: 10, image: null },
    { id: 'case-2', name: 'CASING OVO ICE CUBE Gaming ARGB', category: 'casing', price: 4500, inventory: 1, image: null },

    // Cooling
    { id: 'cool-1', name: 'CPU Fan AMD Ryzen Cooler', category: 'cooling', price: 800, inventory: 198, image: null },
    { id: 'cool-2', name: 'CPU Fan Intel 10th Gen', category: 'cooling', price: 700, inventory: 2200, image: null },
    { id: 'cool-3', name: 'CPU Fan Intel 12th Gen', category: 'cooling', price: 750, inventory: 2840, image: null },
    { id: 'cool-4', name: 'Casing Fan Non-Brand RGB SF-1225M1', category: 'cooling', price: 350, inventory: 6, image: null },
    { id: 'cool-5', name: 'Casing Fan Non-Brand Multi Colour SF-1', category: 'cooling', price: 400, inventory: 10, image: null },

    // Peripherals
    { id: 'per-1', name: 'ATECH OP-620 USB Wired Mouse', category: 'peripherals', price: 450, inventory: 720, image: null },
    { id: 'per-2', name: 'SSD Enclosure UGREEN CM449 NVMe', category: 'peripherals', price: 1200, inventory: 31, image: null },
    { id: 'per-3', name: 'Data Cable WiWU Type-C to Type-C', category: 'peripherals', price: 350, inventory: 2840, image: null },
    { id: 'per-4', name: 'Data Cable WiWU USB to iPhone', category: 'peripherals', price: 450, inventory: 2840, image: null },
    { id: 'per-5', name: 'Data Cable WiWU USB to Type-C', category: 'peripherals', price: 350, inventory: 2840, image: null },
    { id: 'per-6', name: 'CMOS Battery CR2032', category: 'peripherals', price: 50, inventory: 1013, image: null },
  ];

  // Essential PC Builds
  const ESSENTIALS = [
    {
      id: 'ess-1',
      name: 'Budget Gaming Build',
      price: 45000,
      specs: ['Ryzen 5 5600X', 'RX 580 8GB', '16GB DDR4', '512GB NVMe', '500W PSU', 'V200 Case'],
      description: 'Perfect for 1080p gaming on a budget'
    },
    {
      id: 'ess-2',
      name: 'Mid-Range Gaming Build',
      price: 75000,
      specs: ['Ryzen 7 5700X', 'RTX 4060 8GB', '32GB DDR4', '1TB NVMe', '650W PSU', 'Mid Tower Case'],
      description: 'High refresh rate 1080p / 1440p gaming'
    },
    {
      id: 'ess-3',
      name: 'Content Creator Build',
      price: 115000,
      specs: ['Ryzen 9 7900X', 'RTX 4070 12GB', '64GB DDR5', '2TB NVMe', '850W PSU', 'Full Tower Case'],
      description: 'Video editing, 3D rendering, streaming'
    }
  ];

  // Reviews (placeholder)
  const REVIEWS = [
    {
      id: 'rev-1',
      author: 'Rahim H.',
      avatar: 'RH',
      rating: 5,
      product: 'AMD Ryzen 5 5600X',
      content: 'Excellent performance for the price. Runs cool and handles all my games at 1440p. Starstruck delivered within 2 days in Dhaka.',
      date: '2025-01-15'
    },
    {
      id: 'rev-2',
      author: 'Fatima K.',
      avatar: 'FK',
      rating: 5,
      product: 'Kingston FURY 32GB DDR5',
      content: 'Great RAM kit, XMP worked instantly. Packaging was secure and the WhatsApp order process was smooth.',
      date: '2025-01-12'
    },
    {
      id: 'rev-3',
      author: 'Karim M.',
      avatar: 'KM',
      rating: 4,
      product: 'Samsung 990 Pro 1TB',
      content: 'Fast NVMe drive, good thermals. Only complaint is the price could be slightly better but overall happy.',
      date: '2025-01-10'
    },
    {
      id: 'rev-4',
      author: 'Sadia A.',
      avatar: 'SA',
      rating: 5,
      product: 'Custom PC Build Service',
      content: 'The team helped me pick parts for my streaming setup. Built it perfectly, cable management is clean. Highly recommend!',
      date: '2025-01-08'
    },
    {
      id: 'rev-5',
      author: 'Tanvir R.',
      avatar: 'TR',
      rating: 5,
      product: 'RX 580 8GB',
      content: 'Great budget GPU for 1080p gaming. Card was clean, fans quiet. Good value for money.',
      date: '2025-01-05'
    },
    {
      id: 'rev-6',
      author: 'Nusrat J.',
      avatar: 'NJ',
      rating: 4,
      product: 'WINMAX B85 Motherboard',
      content: 'Works perfectly for my i7-4770 build. Good condition, all ports functional. Fast shipping.',
      date: '2025-01-03'
    }
  ];

  // ========================================
  // State Management
  // ========================================
  const state = {
    cart: [],
    isCartOpen: false,
    isMobileMenuOpen: false,
    currentPage: getCurrentPage(),
  };

  // ========================================
  // Utility Functions
  // ========================================
  function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path.endsWith('index.html')) return 'home';
    if (path.includes('recent')) return 'recent';
    if (path.includes('parts')) return 'parts';
    if (path.includes('builder')) return 'builder';
    if (path.includes('essentials')) return 'essentials';
    if (path.includes('reviews')) return 'reviews';
    if (path.includes('cart')) return 'cart';
    return 'other';
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: CONFIG.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('BDT', CONFIG.currencySymbol).trim();
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ========================================
  // Toast Notifications
  // ========================================
  function showToast(message, type = 'success', title = '') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');

    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    };

    const defaultTitles = {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.success}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title || defaultTitles[type]}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Dismiss notification">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => dismissToast(toast));

    container.appendChild(toast);

    // Auto dismiss after duration
    setTimeout(() => dismissToast(toast), CONFIG.toastDuration);

    return toast;
  }

  function dismissToast(toast) {
    toast.classList.add('dismissing');
    toast.addEventListener('animationend', () => toast.remove());
  }

  // ========================================
  // Cart Management
  // ========================================
  function getCart() {
    try {
      const stored = localStorage.getItem('starstruck_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem('starstruck_cart', JSON.stringify(cart));
    state.cart = cart;
    updateCartUI();
  }

  function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      showToast('Product not found', 'error');
      return false;
    }

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
      });
    }

    saveCart(cart);
    showToast(`${product.name} added to cart`, 'success', 'Added to Cart');
    openCartSidebar();
    return true;
  }

  function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    showToast('Item removed from cart', 'info');
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      saveCart(cart);
    }
  }

  function clearCart() {
    saveCart([]);
    showToast('Cart cleared', 'info');
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
  }

  function getCartSubtotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  function updateCartUI() {
    // Update cart count badge
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
      const count = getCartCount();
      countEl.textContent = count > 99 ? '99+' : count;
    }

    // Update cart sidebar items
    const cartItemsEl = document.getElementById('cart-items');
    const cartSubtotalEl = document.querySelector('.cart-subtotal');
    const cartClearBtn = document.querySelector('.cart-clear');

    if (cartItemsEl) {
      const cart = getCart();
      if (cart.length === 0) {
        cartItemsEl.innerHTML = `
          <div class="cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Your cart is empty</p>
            <a href="/pages/parts.html" class="btn btn-primary mt-4" style="width: auto;">Continue Shopping</a>
          </div>
        `;
      } else {
        cartItemsEl.innerHTML = cart.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image || '/images/placeholder-product.svg'}" alt="" class="cart-item-image" loading="lazy">
            <div class="cart-item-info">
              <div class="cart-item-name">${escapeHtml(item.name)}</div>
              <div class="cart-item-price">${formatPrice(item.price)}</div>
              <div class="cart-item-qty">
                <button class="qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <button class="cart-item-remove" data-action="remove" aria-label="Remove ${escapeHtml(item.name)}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        `).join('');

        // Bind quantity buttons
        cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const itemEl = this.closest('.cart-item');
            const id = itemEl.dataset.id;
            const action = this.dataset.action;
            const qtyEl = itemEl.querySelector('.qty-value');
            let qty = parseInt(qtyEl.textContent);
            qty = action === 'increase' ? qty + 1 : qty - 1;
            updateCartQuantity(id, qty);
          });
        });

        cartItemsEl.querySelectorAll('[data-action="remove"]').forEach(btn => {
          btn.addEventListener('click', function() {
            const itemEl = this.closest('.cart-item');
            removeFromCart(itemEl.dataset.id);
          });
        });
      }
    }

    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = formatPrice(getCartSubtotal());
    }

    if (cartClearBtn) {
      cartClearBtn.disabled = getCart().length === 0;
    }
  }

  function openCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    if (sidebar && overlay) {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      sidebar.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      state.isCartOpen = true;
      updateCartUI();
    }
  }

  function closeCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      state.isCartOpen = false;
    }
  }

  // ========================================
  // Mobile Menu
  // ========================================
  function toggleMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isOpen);
    menu.hidden = isOpen;

    if (!isOpen) {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
      state.isMobileMenuOpen = true;
      // Focus first link
      const firstLink = menu.querySelector('.mobile-nav-link');
      if (firstLink) firstLink.focus();
    } else {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      state.isMobileMenuOpen = false;
      btn.focus();
    }
  }

  function closeMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu && !menu.hidden) {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      menu.classList.remove('open');
      document.body.style.overflow = '';
      state.isMobileMenuOpen = false;
    }
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    const handleScroll = throttle(() => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ========================================
  // Dropdown Menus (Mobile)
  // ========================================
  function initMobileDropdowns() {
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', function() {
        const dropdown = this.closest('.mobile-dropdown');
        const menu = dropdown.querySelector('.mobile-dropdown-menu');
        const isOpen = dropdown.getAttribute('aria-expanded') === 'true';

        dropdown.setAttribute('aria-expanded', !isOpen);
        menu.hidden = isOpen;
      });
    });
  }

  // ========================================
  // Product Rendering
  // ========================================
  function getProductsByCategory(category) {
    if (!category || category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
  }

  function getRecentProducts(limit = 8) {
    // Return newest products (last added in array)
    return [...PRODUCTS].reverse().slice(0, limit);
  }

  function renderProductCard(product, options = {}) {
    const { showCategory = true, showAddToCart = true } = options;
    const badge = product.inventory < 20 ? 'low-stock' : (product.category === 'processor' ? 'new' : '');

    return `
      <article class="product-card" data-id="${product.id}" role="listitem">
        <div class="product-image">
          ${product.image ? `<img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">` : '<div class="placeholder-image"></div>'}
          ${badge ? `<span class="product-badge ${badge}">${badge === 'low-stock' ? 'Low Stock' : badge.charAt(0).toUpperCase() + badge.slice(1)}</span>` : ''}
          ${showAddToCart ? `
            <div class="product-actions">
              <button class="btn btn-secondary btn-sm" data-action="quick-view" aria-label="Quick view ${escapeHtml(product.name)}">View</button>
              <button class="btn btn-primary btn-sm" data-action="add-to-cart" aria-label="Add ${escapeHtml(product.name)} to cart">Add</button>
            </div>
          ` : ''}
        </div>
        <div class="product-info">
          ${showCategory ? `<span class="product-category">${escapeHtml(CATEGORIES[product.category] || product.category)}</span>` : ''}
          <h3 class="product-name">${escapeHtml(product.name)}</h3>
          <div class="product-price">${formatPrice(product.price)}</div>
          <div class="product-footer">
            ${showAddToCart ? `
              <button class="btn btn-primary" data-action="add-to-cart" data-id="${product.id}" aria-label="Add ${escapeHtml(product.name)} to cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                Add to Cart
              </button>
              <button class="btn btn-secondary" data-action="quick-view" data-id="${product.id}" aria-label="Quick view ${escapeHtml(product.name)}">Details</button>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  function renderEssentialCard(essential) {
    return `
      <article class="essential-card" role="listitem">
        <div class="essential-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M6 3v14M18 3v14M2 9h20"></path></svg>
        </div>
        <h3>${escapeHtml(essential.name)}</h3>
        <p>${escapeHtml(essential.description)}</p>
        <div class="essential-price">${formatPrice(essential.price)}</div>
        <div class="essential-specs">
          ${essential.specs.map(spec => `<span class="spec-tag">${escapeHtml(spec)}</span>`).join('')}
        </div>
        <button class="btn btn-primary btn-full" data-action="build-this" data-id="${essential.id}">Build This PC</button>
      </article>
    `;
  }

  function renderReviewCard(review) {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    return `
      <article class="review-card" role="listitem">
        <div class="review-header">
          <div class="review-avatar">${escapeHtml(review.avatar)}</div>
          <div class="review-author">
            <div class="review-author-name">${escapeHtml(review.author)}</div>
            <div class="review-meta">
              <span class="review-rating" aria-label="${review.rating} out of 5 stars">${stars}</span>
              <time datetime="${review.date}">${formatDate(review.date)}</time>
            </div>
          </div>
        </div>
        <p class="review-content">${escapeHtml(review.content)}</p>
        <div class="review-product">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M6 3v14M18 3v14M2 9h20"></path></svg>
          ${escapeHtml(review.product)}
        </div>
      </article>
    `;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-BD', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ========================================
  // Page Initialization Functions
  // ========================================
  function initHomePage() {
    // Recent arrivals
    const recentContainer = document.getElementById('recent-products');
    if (recentContainer) {
      const recent = getRecentProducts(8);
      recentContainer.innerHTML = recent.map(p => renderProductCard(p)).join('');
      bindProductActions(recentContainer);
    }

    // Essentials
    const essentialsContainer = document.getElementById('essentials-products');
    if (essentialsContainer) {
      essentialsContainer.innerHTML = ESSENTIALS.map(e => renderEssentialCard(e)).join('');
      bindEssentialActions(essentialsContainer);
    }
  }

  function initPartsPage() {
    const container = document.querySelector('.products-grid') || document.getElementById('parts-products');
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'all';
    const sort = urlParams.get('sort') || 'featured';

    let products = getProductsByCategory(category);

    // Sort
    switch (sort) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.reverse();
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured: high inventory first
        products.sort((a, b) => b.inventory - a.inventory);
    }

    if (container) {
      container.innerHTML = products.map(p => renderProductCard(p)).join('');
      bindProductActions(container);
    }

    // Update results count
    const countEl = document.querySelector('.results-count');
    if (countEl) {
      countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;
    }

    // Update active filter
    const filterSelect = document.querySelector('.filter-select[name="category"]');
    if (filterSelect) {
      filterSelect.value = category;
    }

    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.value = sort;
    }
  }

  function initBuilderPage() {
    // Render sidebar categories
    const sidebar = document.querySelector('.builder-sidebar');
    if (sidebar) {
      const categories = [...new Set(PRODUCTS.map(p => p.category))];
      sidebar.innerHTML = categories.map(cat => `
        <div class="builder-category" data-category="${cat}">
          <button class="builder-category-header" type="button" aria-expanded="false">
            <h3>${escapeHtml(CATEGORIES[cat] || cat)}</h3>
            <span class="builder-category-toggle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
          </button>
          <div class="builder-category-content">
            <div class="builder-parts-list">
              ${getProductsByCategory(cat).map(p => `
                <button class="builder-part-item" data-id="${p.id}" type="button" aria-label="Add ${escapeHtml(p.name)} to build">
                  <img src="${p.image || '/images/placeholder-product.svg'}" alt="" class="builder-part-image" loading="lazy">
                  <div class="builder-part-info">
                    <div class="builder-part-name">${escapeHtml(p.name)}</div>
                    <div class="builder-part-price">${formatPrice(p.price)}</div>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('');

      // Bind category toggles
      sidebar.querySelectorAll('.builder-category-header').forEach(header => {
        header.addEventListener('click', function() {
          const category = this.closest('.builder-category');
          const isOpen = category.classList.toggle('open');
          this.setAttribute('aria-expanded', isOpen);
        });
      });

      // Bind part items
      sidebar.querySelectorAll('.builder-part-item').forEach(item => {
        item.addEventListener('click', function() {
          const productId = this.dataset.id;
          addPartToBuild(productId);
        });
      });
    }

    // Initialize build slots
    initBuildSlots();
  }

  function initBuildSlots() {
    const slots = [
      { key: 'processor', label: 'Processor', icon: 'cpu' },
      { key: 'motherboard', label: 'Motherboard', icon: 'motherboard' },
      { key: 'ram', label: 'Memory (RAM)', icon: 'ram' },
      { key: 'graphics', label: 'Graphics Card', icon: 'gpu' },
      { key: 'storage', label: 'Storage', icon: 'storage' },
      { key: 'psu', label: 'Power Supply', icon: 'psu' },
      { key: 'casing', label: 'Case', icon: 'case' },
      { key: 'cooling', label: 'Cooling', icon: 'cooling' },
    ];

    const container = document.querySelector('.builder-build');
    if (!container) return;

    // Load saved build
    const savedBuild = getSavedBuild();

    container.innerHTML = slots.map(slot => {
      const part = savedBuild[slot.key];
      const isFilled = !!part;
      return `
        <div class="build-slot ${isFilled ? 'filled' : 'empty'}" data-slot="${slot.key}">
          <div class="build-slot-icon">
            ${isFilled ? '' : getSlotIcon(slot.icon)}
          </div>
          <div class="build-slot-info">
            <div class="build-slot-label">${escapeHtml(slot.label)}</div>
            <div class="build-slot-name">${isFilled ? escapeHtml(part.name) : 'Not selected'}</div>
          </div>
          ${isFilled ? `
            <div class="build-slot-price">${formatPrice(part.price)}</div>
            <button class="build-slot-remove" data-slot="${slot.key}" aria-label="Remove ${escapeHtml(part.name)}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          ` : ''}
        </div>
      `;
    }).join('');

    // Add total
    const total = Object.values(savedBuild).reduce((sum, p) => sum + p.price, 0);
    container.innerHTML += `
      <div class="build-summary">
        <div class="build-total">
          <span class="build-total-label">Estimated Total</span>
          <span class="build-total-price">${formatPrice(total)}</span>
        </div>
        <div class="build-actions">
          <button class="btn btn-primary" data-action="order-build">Order on WhatsApp</button>
          <button class="btn btn-secondary" data-action="clear-build">Clear Build</button>
        </div>
      </div>
    `;

    // Bind slot clicks
    container.querySelectorAll('.build-slot.empty').forEach(slot => {
      slot.addEventListener('click', function() {
        const category = this.dataset.slot;
        openCategoryInSidebar(category);
      });
    });

    container.querySelectorAll('.build-slot-remove').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        removePartFromBuild(this.dataset.slot);
      });
    });

    container.querySelector('[data-action="order-build"]').addEventListener('click', orderBuild);
    container.querySelector('[data-action="clear-build"]').addEventListener('click', clearBuild);
  }

  function getSlotIcon(type) {
    const icons = {
      cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 4v16M15 4v16M4 9h16M4 15h16"></path></svg>',
      motherboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2"></rect><path d="M12 2v20M2 12h20"></path><circle cx="12" cy="12" r="3"></circle></svg>',
      ram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="1"></rect><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path><path d="M8 18v2M16 18v2"></path></svg>',
      gpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M6 3v14M18 3v14M2 9h20"></path></svg>',
      storage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path><path d="M6 6v12"></path><path d="M18 6v12"></path></svg>',
      psu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>',
      case: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>',
      cooling: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>',
    };
    return icons[type] || '';
  }

  function getSavedBuild() {
    try {
      const stored = localStorage.getItem('starstruck_build');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  function saveBuild(build) {
    localStorage.setItem('starstruck_build', JSON.stringify(build));
    initBuildSlots();
  }

  function addPartToBuild(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Check if slot matches
    const slotKey = product.category;
    const build = getSavedBuild();
    build[slotKey] = { id: product.id, name: product.name, price: product.price, category: product.category };
    saveBuild(build);
    showToast(`${product.name} added to build`, 'success');
  }

  function removePartFromBuild(slotKey) {
    const build = getSavedBuild();
    const removed = build[slotKey];
    delete build[slotKey];
    saveBuild(build);
    if (removed) showToast(`${removed.name} removed from build`, 'info');
  }

  function clearBuild() {
    localStorage.removeItem('starstruck_build');
    initBuildSlots();
    showToast('Build cleared', 'info');
  }

  function openCategoryInSidebar(category) {
    const categoryEl = document.querySelector(`.builder-category[data-category="${category}"]`);
    if (categoryEl) {
      const header = categoryEl.querySelector('.builder-category-header');
      if (header && !categoryEl.classList.contains('open')) {
        header.click();
      }
      categoryEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function orderBuild() {
    const build = getSavedBuild();
    if (Object.keys(build).length === 0) {
      showToast('Your build is empty', 'warning');
      return;
    }

    const parts = Object.values(build).map(p => `• ${p.name} - ${formatPrice(p.price)}`).join('%0A');
    const total = Object.values(build).reduce((sum, p) => sum + p.price, 0);
    const message = `Hi Starstruck, I'd like to order this custom PC build:%0A%0A${parts}%0A%0ATotal: ${formatPrice(total)}%0A%0APlease confirm availability and delivery.`;

    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp...', 'info');
  }

  function initReviewsPage() {
    const container = document.querySelector('.reviews-grid');
    if (container) {
      container.innerHTML = REVIEWS.map(r => renderReviewCard(r)).join('');
    }
  }

  function initCartPage() {
    const itemsContainer = document.querySelector('.cart-items-list');
    const checkoutContainer = document.querySelector('.cart-checkout');

    if (itemsContainer) {
      const cart = getCart();
      if (cart.length === 0) {
        itemsContainer.innerHTML = `
          <div class="cart-empty" style="padding: var(--space-16); grid-column: 1 / -1;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any components yet.</p>
            <a href="/pages/parts.html" class="btn btn-primary mt-4">Start Shopping</a>
          </div>
        `;
        if (checkoutContainer) checkoutContainer.style.display = 'none';
        return;
      }

      itemsContainer.innerHTML = cart.map(item => `
        <div class="cart-page-item" data-id="${item.id}">
          <img src="${item.image || '/images/placeholder-product.svg'}" alt="${escapeHtml(item.name)}" class="cart-page-image" loading="lazy">
          <div class="cart-page-info">
            <div class="cart-page-name">${escapeHtml(item.name)}</div>
            <div class="cart-page-category">${escapeHtml(CATEGORIES[item.category] || item.category)}</div>
          </div>
          <div class="cart-page-qty">
            <button class="qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-page-price">${formatPrice(item.price * item.quantity)}</div>
          <button class="cart-page-remove" data-action="remove" aria-label="Remove ${escapeHtml(item.name)}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `).join('');

      // Bind events
      itemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const itemEl = this.closest('.cart-page-item');
          const id = itemEl.dataset.id;
          const action = this.dataset.action;
          const qtyEl = itemEl.querySelector('.qty-value');
          let qty = parseInt(qtyEl.textContent);
          qty = action === 'increase' ? qty + 1 : qty - 1;
          updateCartQuantity(id, qty);
        });
      });

      itemsContainer.querySelectorAll('[data-action="remove"]').forEach(btn => {
        btn.addEventListener('click', function() {
          const itemEl = this.closest('.cart-page-item');
          removeFromCart(itemEl.dataset.id);
        });
      });
    }

    if (checkoutContainer) {
      const subtotal = getCartSubtotal();
      checkoutContainer.innerHTML = `
        <h3 class="checkout-title">Order Summary</h3>
        <div class="checkout-row">
          <span>Subtotal</span>
          <span class="price">${formatPrice(subtotal)}</span>
        </div>
        <div class="checkout-row">
          <span>Shipping</span>
          <span class="price">Calculated at checkout</span>
        </div>
        <div class="checkout-row total">
          <span>Total</span>
          <span class="price">${formatPrice(subtotal)}</span>
        </div>
        <button class="btn btn-primary checkout-btn" data-action="checkout">Proceed to WhatsApp Checkout</button>
        <p class="checkout-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          Secure checkout via WhatsApp. We'll confirm your order and delivery details.
        </p>
      `;

      checkoutContainer.querySelector('[data-action="checkout"]').addEventListener('click', checkoutCart);
    }
  }

  function checkoutCart() {
    const cart = getCart();
    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }

    const items = cart.map(item => `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`).join('%0A');
    const subtotal = getCartSubtotal();
    const message = `Hi Starstruck, I'd like to place an order:%0A%0A${items}%0A%0ASubtotal: ${formatPrice(subtotal)}%0A%0APlease confirm availability, total with shipping, and delivery to my address.`;

    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp for checkout...', 'info');
  }

  // ========================================
  // Event Binding
  // ========================================
  function bindProductActions(container) {
    // Add to cart buttons
    container.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const productId = this.dataset.id || this.closest('[data-id]')?.dataset.id;
        if (productId) addToCart(productId);
      });
    });

    // Quick view buttons
    container.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const productId = this.dataset.id || this.closest('[data-id]')?.dataset.id;
        if (productId) showQuickView(productId);
      });
    });
  }

  function bindEssentialActions(container) {
    container.querySelectorAll('[data-action="build-this"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const essentialId = this.dataset.id;
        const essential = ESSENTIALS.find(e => e.id === essentialId);
        if (essential) {
          // Pre-fill build with essential parts
          const build = {};
          essential.specs.forEach(specName => {
            const product = PRODUCTS.find(p => p.name.includes(specName.split(' ')[0]) || specName.includes(p.name.split(' ')[0]));
            if (product) build[product.category] = { id: product.id, name: product.name, price: product.price, category: product.category };
          });
          saveBuild(build);
          showToast(`${essential.name} loaded into builder`, 'success');
          // Scroll to builder if on same page, or navigate
          const builderSection = document.querySelector('.builder-main');
          if (builderSection) {
            builderSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = '/pages/builder.html';
          }
        }
      });
    });
  }

  function showQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'quick-view-title');
    modal.innerHTML = `
      <div class="modal" role="document">
        <button class="modal-close" aria-label="Close quick view">&times;</button>
        <div class="modal-content">
          <div class="modal-image">
            ${product.image ? `<img src="${product.image}" alt="${escapeHtml(product.name)}">` : '<div class="placeholder-image-large"></div>'}
          </div>
          <div class="modal-info">
            <span class="product-category">${escapeHtml(CATEGORIES[product.category] || product.category)}</span>
            <h2 id="quick-view-title">${escapeHtml(product.name)}</h2>
            <div class="product-price">${formatPrice(product.price)}</div>
            <p class="modal-description">${getProductDescription(product)}</p>
            <div class="modal-actions">
              <button class="btn btn-primary" data-action="add-to-cart" data-id="${product.id}">Add to Cart</button>
              <button class="btn btn-secondary modal-close-btn">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Focus trap
    const closeBtn = modal.querySelector('.modal-close');
    const closeBtn2 = modal.querySelector('.modal-close-btn');
    const addBtn = modal.querySelector('[data-action="add-to-cart"]');

    function closeModal() {
      modal.classList.add('closing');
      modal.addEventListener('animationend', () => {
        modal.remove();
        document.body.style.overflow = '';
      }, { once: true });
    }

    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    addBtn.addEventListener('click', () => {
      addToCart(productId);
      closeModal();
    });

    // ESC key
    function handleEsc(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEsc);
      }
    }
    document.addEventListener('keydown', handleEsc);

    // Animate in
    requestAnimationFrame(() => modal.classList.add('open'));
  }

  function getProductDescription(product) {
    const descriptions = {
      processor: 'High-performance CPU for gaming and productivity. Compatible with modern motherboards.',
      graphics: 'Powerful graphics card for 1080p/1440p gaming. Supports latest APIs and features.',
      motherboard: 'Reliable motherboard with all essential features. Supports latest CPUs and memory.',
      ram: 'High-speed memory kit for smooth multitasking and gaming performance.',
      storage: 'Fast and reliable storage solution. Improves system responsiveness significantly.',
      psu: 'Efficient power supply with stable output. Protects your components.',
      casing: 'Well-ventilated case with good cable management. Supports various form factors.',
      cooling: 'Effective cooling solution to keep temperatures low under load.',
      peripherals: 'Quality accessory to complete your setup.',
    };
    return descriptions[product.category] || 'Quality computer component from Starstruck.';
  }

  // ========================================
  // Modal Styles (injected)
  // ========================================
  function injectModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: var(--z-modal);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-4);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--duration-normal) var(--ease-out), visibility var(--duration-normal) var(--ease-out);
      }
      .modal-overlay.open {
        opacity: 1;
        visibility: visible;
      }
      .modal-overlay.closing {
        opacity: 0;
        visibility: hidden;
      }
      .modal {
        background: var(--color-white);
        border-radius: var(--radius-xl);
        max-width: 720px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.95) translateY(20px);
        transition: transform var(--duration-normal) var(--ease-out);
      }
      .modal-overlay.open .modal {
        transform: scale(1) translateY(0);
      }
      .modal-close {
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--text-2xl);
        color: var(--color-text-muted);
        border-radius: var(--radius-full);
        background: var(--color-gray-100);
        z-index: 1;
        transition: background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
      }
      .modal-close:hover {
        background: var(--color-pink-light);
        color: var(--color-burgundy);
      }
      .modal-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        padding: var(--space-6);
      }
      @media (min-width: 768px) {
        .modal-content {
          grid-template-columns: 300px 1fr;
        }
      }
      .modal-image {
        aspect-ratio: 1;
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--color-cream);
      }
      .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .placeholder-image-large {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-gray-300);
      }
      .placeholder-image-large::before {
        content: '🖥️';
        font-size: 4rem;
      }
      .modal-info {
        display: flex;
        flex-direction: column;
      }
      .modal-description {
        flex: 1;
        color: var(--color-text-muted);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-4);
      }
      .modal-actions {
        display: flex;
        gap: var(--space-3);
      }
      .modal-actions .btn {
        flex: 1;
      }
    `;
    document.head.appendChild(style);
  }

  // ========================================
  // WhatsApp Integration
  // ========================================
  function initWhatsAppLinks() {
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
      link.addEventListener('click', function(e) {
        // Allow default behavior but track
        const message = this.href.split('text=')[1];
        if (message) {
          console.log('WhatsApp click:', decodeURIComponent(message).substring(0, 100));
        }
      });
    });
  }

  // ========================================
  // Intersection Observer for Animations
  // ========================================
  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    document.querySelectorAll('.category-card, .product-card, .essential-card, .review-card, .section-header, .hero-content > *').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)';
      observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ========================================
  // Form Validation (for future forms)
  // ========================================
  function initForms() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn?.textContent;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        // Simulate form submission
        setTimeout(() => {
          showToast('Message sent successfully!', 'success');
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }, 1500);
      });
    });
  }

  // ========================================
  // Initialize Everything
  // ========================================
  function init() {
    // Inject modal styles
    injectModalStyles();

    // Core UI
    initHeaderScroll();
    initMobileDropdowns();
    initWhatsAppLinks();
    initScrollAnimations();
    initForms();

    // Cart
    updateCartUI();

    // Cart sidebar events
    const cartBtn = document.querySelector('.cart-btn');
    const cartClose = document.querySelector('.cart-close');
    const cartOverlay = document.querySelector('.cart-overlay');

    if (cartBtn) cartBtn.addEventListener('click', openCartSidebar);
    if (cartClose) cartClose.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-item').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeCartSidebar();
      }
    });

    // Page-specific init
    switch (state.currentPage) {
      case 'home':
        initHomePage();
        break;
      case 'recent':
        initPartsPage(); // Recent uses same layout
        break;
      case 'parts':
        initPartsPage();
        break;
      case 'builder':
        initBuilderPage();
        break;
      case 'essentials':
        initEssentialsPage();
        break;
      case 'reviews':
        initReviewsPage();
        break;
      case 'cart':
        initCartPage();
        break;
    }

    // Bind global product actions (for dynamically added content)
    document.addEventListener('click', function(e) {
      const addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn && !addBtn.closest('.modal')) {
        const productId = addBtn.dataset.id || addBtn.closest('[data-id]')?.dataset.id;
        if (productId) addToCart(productId);
      }

      const quickViewBtn = e.target.closest('[data-action="quick-view"]');
      if (quickViewBtn) {
        const productId = quickViewBtn.dataset.id || quickViewBtn.closest('[data-id]')?.dataset.id;
        if (productId) showQuickView(productId);
      }
    });

    console.log('Starstruck initialized');
  }

  function initEssentialsPage() {
    const container = document.querySelector('.essentials-grid') || document.getElementById('essentials-products');
    if (container) {
      container.innerHTML = ESSENTIALS.map(e => renderEssentialCard(e)).join('');
      bindEssentialActions(container);
    }
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for debugging
  window.Starstruck = {
    addToCart,
    showToast,
    getCart,
    PRODUCTS,
    ESSENTIALS,
    REVIEWS,
  };
})();