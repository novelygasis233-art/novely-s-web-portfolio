// ===================================
// Theme Toggle & Persistence
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

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


// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

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
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('show');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});


// ===================================
// Smooth Scroll & Active Nav Links
// ===================================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active state
      navItems.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
      
      // Close mobile menu
      navLinks.classList.remove('show');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});


// ===================================
// Scroll Progress Bar
// ===================================
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener('scroll', updateScrollProgress);


// ===================================
// Header Scroll Effect
// ===================================
const header = document.querySelector('header');

function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll);


// ===================================
// Active Section Detection
// ===================================
function updateActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveSection);


// ===================================
// Reveal on Scroll Animation
// ===================================
const revealElements = document.querySelectorAll('.reveal');

function handleReveal() {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);


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
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

skillCards.forEach(card => skillObserver.observe(card));


// ===================================
// Starfield Background
// ===================================
function createStarfield() {
  const starfield = document.getElementById('starfield');
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
    
    // Occasional color tints
    if (Math.random() > 0.96) {
      star.style.background = '#ffd86b';
    } else if (Math.random() > 0.98) {
      star.style.background = '#9be3ff';
    }
    
    starfield.appendChild(star);
  }
}

// Create stars on load
createStarfield();

// Recreate on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const starfield = document.getElementById('starfield');
    starfield.innerHTML = '';
    createStarfield();
  }, 500);
});


// ===================================
// Image Slider
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
    this.isTransitioning = false;
    
    this.init();
  }
  
  init() {
    // Create dots
    this.dots = [];
    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
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
    
    // Auto-advance (optional - currently disabled)
    // this.startAutoplay(5000);
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
    if (this.isTransitioning) return;
    
    // Wrap around
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
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  startAutoplay(interval = 5000) {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, interval);
    
    // Pause on hover
    this.root.addEventListener('pointerenter', () => this.stopAutoplay());
    this.root.addEventListener('pointerleave', () => this.startAutoplay(interval));
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
  new Slider('project-slider-1');
  // Add more sliders here if needed
});


// ===================================
// Back to Top Button
// ===================================
const backToTop = document.getElementById('back-to-top');

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', handleBackToTop);


// ===================================
// Footer Year
// ===================================
document.getElementById('year-footer').textContent = new Date().getFullYear();


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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
  updateScrollProgress();
  handleHeaderScroll();
  updateActiveSection();
  handleReveal();
  handleBackToTop();
}, 10);

// Replace individual scroll listeners with optimized version
window.removeEventListener('scroll', updateScrollProgress);
window.removeEventListener('scroll', handleHeaderScroll);
window.removeEventListener('scroll', updateActiveSection);
window.removeEventListener('scroll', handleReveal);
window.removeEventListener('scroll', handleBackToTop);
window.addEventListener('scroll', optimizedScrollHandler);


// ===================================
// Accessibility Enhancements
// ===================================

// Add skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#main';
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
announcer.className = 'sr-only';
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
    setTimeout(() => {
      announce(`Navigated to ${sectionName} section`);
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