// ===================================
// Theme Toggle & Persistence
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

if (themeToggle && themeIcon) {
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    
    // Update icon
    if (isLight) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
    
    // Save preference
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}


// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const icon = menuToggle.querySelector('i');
    
    if (navLinks.classList.contains('show')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}


// ===================================
// Smooth Scroll & Active Nav Links
// ===================================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active state
        navItems.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu if open
        if (navLinks && menuToggle) {
            navLinks.classList.remove('show');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
      }
    }
  });
});


// ===================================
// Scroll Progress Bar
// ===================================
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  if (!scrollProgress) return;
  const windowHeight = window.innerHeight;
  // document.documentElement.scrollHeight is total height of content
  // document.documentElement.scrollHeight - windowHeight is the maximum scrollable distance
  const documentHeight = document.documentElement.scrollHeight - windowHeight; 
  const scrolled = window.scrollY;
  
  if (documentHeight > 0) {
    const progress = (scrolled / documentHeight) * 100;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
  } else {
    // Handle case where content is not scrollable (e.g., very short page)
    scrollProgress.style.width = '100%'; 
  }
}

// ===================================
// Header Scroll Effect
// ===================================
const header = document.querySelector('header');

function handleHeaderScroll() {
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}


// ===================================
// Active Section Detection
// ===================================
function updateActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  // Offset the scroll position by the height of the fixed header
  const scrollPos = window.scrollY + 100; 
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navItems.forEach(item => {
        // Remove 'active' from all nav items
        item.classList.remove('active');
        
        // Add 'active' to the corresponding nav item
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}


// ===================================
// Reveal on Scroll Animation
// ===================================
const revealElements = document.querySelectorAll('.reveal');

function handleReveal() {
  revealElements.forEach(element => {
    // Get the element's position relative to the viewport
    const elementTop = element.getBoundingClientRect().top; 
    const windowHeight = window.innerHeight;
    
    // Check if element is within the visible area with a 100px buffer
    if (elementTop < windowHeight - 100) { 
      element.classList.add('active');
    }
  });
}


// ===================================
// Skill Progress Bar Animation
// ===================================
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress');
      if (progressBar) {
        // Store the target width from the CSS/HTML data attributes
        const targetWidth = progressBar.style.width; 
        
        // Reset width to 0 for animation start
        progressBar.style.width = '0%'; 
        
        // Timeout ensures the width reset is applied before the transition starts
        setTimeout(() => {
          progressBar.style.width = targetWidth; // Animate to target width
        }, 100); 
      }
      skillObserver.unobserve(entry.target); // Stop observing once animated
    }
  });
}, observerOptions);

skillCards.forEach(card => skillObserver.observe(card));


// ===================================
// Starfield Background
// ===================================
function createStarfield() {
  const starfield = document.getElementById('starfield');
  if (!starfield) return;

  // Calculate star count based on screen area, min 50
  const starCount = Math.max(50, Math.floor((window.innerWidth * window.innerHeight) / 25000));
  
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    
    // Random size (bigger stars are rarer)
    const size = Math.random() > 0.85 ? randomRange(2.5, 4) : randomRange(1, 2.5);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation
    const duration = randomRange(3, 10);
    const delay = randomRange(-duration, 0);
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;
    
    // Occasional color tints for realism
    if (Math.random() > 0.96) {
      star.style.background = '#ffd86b';
    } else if (Math.random() > 0.98) {
      star.style.background = '#9be3ff';
    }
    
    starfield.appendChild(star);
  }
}

// Create stars on load
document.addEventListener('DOMContentLoaded', createStarfield);

// Recreate on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const starfield = document.getElementById('starfield');
    if (starfield) {
        starfield.innerHTML = '';
        createStarfield();
    }
  }, 500);
});


// ===================================
// Image Slider Class
// ===================================
class Slider {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    if (!this.root) return;
    
    this.slidesWrap = this.root.querySelector('.slides');
    this.slides = Array.from(this.slidesWrap.children);
    this.total = this.slides.length;
    this.currentIndex = 0;
    this.dotsContainer = this.root.querySelector('.slider-dots');
    
    this.init();
  }
  
  init() {
    // Create dots
    this.dots = [];
    if (this.dotsContainer) {
      for (let i = 0; i < this.total; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => this.goToSlide(i));
        this.dotsContainer.appendChild(dot);
        this.dots.push(dot);
      }
    }
    
    // Arrow buttons
    const prevBtn = document.querySelector(`.slider-arrow.prev[data-slider="${this.root.id}"]`);
    const nextBtn = document.querySelector(`.slider-arrow.next[data-slider="${this.root.id}"]`);
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Touch/swipe support
    this.setupSwipe();
    
    // Keyboard navigation
    this.root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Initial render
    this.updateSlider();
  }
  
  setupSwipe() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    this.slidesWrap.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      this.slidesWrap.style.transition = 'none';
      this.slidesWrap.setPointerCapture(e.pointerId);
    });
    
    this.slidesWrap.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
      const deltaX = currentX - startX;
      const containerWidth = this.root.clientWidth;
      const percentMove = (deltaX / containerWidth) * 100;
      const offset = -this.currentIndex * 100 + percentMove;
      this.slidesWrap.style.transform = `translateX(${offset}%)`;
    });
    
    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      this.slidesWrap.style.transition = '';
      
      const deltaX = (currentX || e.clientX) - startX;
      const threshold = this.root.clientWidth * 0.2;
      
      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      } else {
        this.goToSlide(this.currentIndex);
      }
    };
    
    this.slidesWrap.addEventListener('pointerup', endDrag);
    this.slidesWrap.addEventListener('pointercancel', endDrag);
  }
  
  goToSlide(index) {
    // Clamp index to boundaries
    if (index < 0) index = this.total - 1;
    if (index >= this.total) index = 0;
    
    this.currentIndex = index;
    this.updateSlider();
  }
  
  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }
  
  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }
  
  updateSlider() {
    const offset = -this.currentIndex * 100;
    this.slidesWrap.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    if (this.dots) {
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
  }
}

// Initialize sliders (must be run on DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
  // Replace 'project-slider-1' with the actual ID of your slider container
  new Slider('project-slider-1'); 
});


// ===================================
// Back to Top Button
// ===================================
const backToTop = document.getElementById('back-to-top');

function handleBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// Footer Year
// ===================================
const yearFooter = document.getElementById('year-footer');
if (yearFooter) {
    yearFooter.textContent = new Date().getFullYear();
}


// ===================================
// Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}


// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});


// ===================================
// Performance Optimization - Debounce
// ===================================
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Create the optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  updateScrollProgress();
  handleHeaderScroll();
  updateActiveSection();
  handleReveal();
  handleBackToTop();
}, 10);

// Add the single, optimized scroll listener
window.addEventListener('scroll', optimizedScrollHandler);

// Execute on load to ensure initial state is correct (e.g., header class, active section)
window.addEventListener('load', () => {
    handleHeaderScroll();
    updateActiveSection();
    handleReveal();
    updateScrollProgress();
    handleBackToTop();
});


// ===================================
// Accessibility Enhancements
// ===================================

// Add skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#main'; // Assuming your main content has an ID of 'main'
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Announce page changes for screen readers
const announcer = document.createElement('div');
announcer.setAttribute('aria-live', 'polite');
announcer.setAttribute('aria-atomic', 'true');
announcer.className = 'sr-only'; // Use CSS to visually hide this
announcer.style.cssText = `
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
document.body.appendChild(announcer);

function announce(message) {
  announcer.textContent = message;
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
}

// Announce section changes
navItems.forEach(link => {
  link.addEventListener('click', () => {
    const sectionName = link.textContent.trim();
    // Use a slight delay to ensure scroll has finished
    setTimeout(() => { 
      announce(`Mapsd to ${sectionName} section`);
    }, 500);
  });
});


// ===================================
// Console Easter Egg
// ===================================
console.log('%cHey there! 👋', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');
console.log('%cLooking to hire a developer? Let\'s talk!', 'font-size: 14px; color: #7c3aed;');
console.log('%c📧 novelya.gasis@gmail.com', 'font-size: 12px; color: #10b981;');
console.log('%c🔗 https://github.com/novelygasis233-art', 'font-size: 12px; color: #10b981;');


// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
  // Optionally send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Optionally send to error tracking service
});
