// Application Data
const servicesData = [
  {
    title: "Automated Time Tracking & Workforce Management",
    description: "Replace paper attendance with automated tracking, real-time monitoring, and workforce analytics",
    features: ["Digital attendance tracking", "Real-time monitoring", "Productivity analytics", "Leave management"],
    trial: "7-day free trial",
    icon: "⏰"
  },
  {
    title: "Streamlined Hiring & Candidate Management",
    description: "Transform your recruitment process with automated candidate tracking and interview scheduling",
    features: ["Candidate database", "Interview automation", "Skills assessment", "Onboarding workflows"],
    trial: "7-day free trial",
    icon: "👥"
  },
  {
    title: "Real-time Performance & Productivity Insights",
    description: "Get instant visibility into team performance with automated dashboards and reporting",
    features: ["Live dashboards", "Performance metrics", "Team analytics", "Custom reports"],
    trial: "7-day free trial",
    icon: "📊"
  },
  {
    title: "Automated Stock Control & Optimization",
    description: "Replace spreadsheet inventory management with automated stock control and optimization",
    features: ["Real-time inventory", "Auto-reordering", "Stock optimization", "Vendor integration"],
    trial: "7-day free trial",
    icon: "📦"
  },
  {
    title: "Vendor Relationship & Procurement Automation",
    description: "Streamline vendor management and automate procurement processes for better relationships",
    features: ["Vendor portal", "Purchase automation", "Contract management", "Payment tracking"],
    trial: "7-day free trial",
    icon: "🤝"
  },
  {
    title: "Manufacturing Workflow Optimization",
    description: "Optimize production workflows with automated scheduling and quality control",
    features: ["Production scheduling", "Quality checkpoints", "Resource optimization", "Workflow automation"],
    trial: "7-day free trial",
    icon: "🏭"
  },
  {
    title: "Customer Relationship & Pipeline Management",
    description: "Transform customer interactions with automated CRM and pipeline management",
    features: ["Customer database", "Sales pipeline", "Follow-up automation", "Customer analytics"],
    trial: "7-day free trial",
    icon: "🎯"
  },
  {
    title: "Business Process Automation & Optimization",
    description: "Automate repetitive tasks and optimize business processes for maximum efficiency",
    features: ["Process mapping", "Task automation", "Workflow optimization", "Integration hub"],
    trial: "7-day free trial",
    icon: "⚙️"
  },
  {
    title: "Unified Business Intelligence & Reporting",
    description: "Get complete visibility with unified dashboards and automated business intelligence",
    features: ["Unified dashboards", "Business intelligence", "Automated reports", "Data visualization"],
    trial: "7-day free trial",
    icon: "📈"
  },
  {
    title: "Quality Control & Compliance Management",
    description: "Ensure compliance and maintain quality standards with automated monitoring and reporting",
    features: ["Compliance tracking", "Quality checkpoints", "Audit automation", "Regulatory reporting"],
    trial: "7-day free trial",
    icon: "✅"
  }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
});

// Initialize Application
function initializeApp() {
  setupNavigation();
  populateServices();
  setupScrollAnimations();
  setupCounterAnimations();
  setupFormHandling();
  setupWhatsAppIntegration();
  setupModalHandling();
  setupSmoothScrolling();
  console.log('App initialized successfully');
}

// Navigation Setup
function setupNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on menu items
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(19, 52, 59, 0.98)';
      } else {
        navbar.style.background = 'rgba(19, 52, 59, 0.95)';
      }
    }
  });
}

// Populate Services
function populateServices() {
  const servicesGrid = document.getElementById('services-grid');
  if (!servicesGrid) return;
  
  servicesGrid.innerHTML = servicesData.map(service => `
    <div class="service-card loading">
      <div class="service-icon">${service.icon}</div>
      <div class="service-trial">${service.trial}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <ul class="service-features">
        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <a href="#trial" class="btn btn--primary">Start Free Trial</a>
    </div>
  `).join('');
  
  // Trigger loading animation
  setTimeout(() => {
    const serviceCards = servicesGrid.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('loaded');
      }, index * 100);
    });
  }, 100);
}

// Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .trial-info, .trial-form');
  animatedElements.forEach(el => {
    el.classList.add('loading');
    observer.observe(el);
  });
}

// Counter Animations
function setupCounterAnimations() {
  const counters = document.querySelectorAll('.benefit-number');
  let animated = false;
  
  const animateCounters = () => {
    if (animated) return;
    animated = true;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 50);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          setTimeout(updateCounter, 50);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };
  
  // Trigger animation when benefits section is visible
  const benefitsSection = document.getElementById('benefits');
  if (benefitsSection) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(benefitsSection);
  }
}

// Form Handling - Fixed version
function setupFormHandling() {
  const trialForm = document.getElementById('trialForm');
  if (!trialForm) {
    console.log('Trial form not found');
    return;
  }
  
  console.log('Setting up form handling...');
  
  trialForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    // Get form data
    const formData = new FormData(trialForm);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value.trim();
    }
    
    console.log('Form data:', data);
    
    // Basic validation - simplified
    const requiredFields = ['name', 'email', 'phone', 'company', 'service'];
    let isValid = true;
    let errors = [];
    
    requiredFields.forEach(field => {
      if (!data[field] || data[field].length < 2) {
        isValid = false;
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      isValid = false;
      errors.push('Please enter a valid email address');
    }
    
    if (!isValid) {
      console.log('Validation errors:', errors);
      alert('Please fix the following errors:\n\n' + errors.join('\n'));
      return;
    }
    
    // Show loading state
    const submitBtn = trialForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Show success modal
      showSuccessModal();
      
      // Reset form
      trialForm.reset();
      
      // Track form submission
      console.log('Trial form submitted successfully:', data);
      trackEvent('trial_form_submitted', data);
    }, 1500);
  });
  
  console.log('Form handling setup complete');
}

// WhatsApp Integration
function setupWhatsAppIntegration() {
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn, a[href="#whatsapp"]');
  const whatsappNumber = '+918434507008';
  const whatsappMessage = "Hi! I'm interested in the 7-day free trial for digital transformation services. Please provide more details.";
  
  console.log('Found', whatsappButtons.length, 'WhatsApp buttons');
  
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
      
      console.log('Opening WhatsApp:', whatsappUrl);
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Track WhatsApp click
      trackEvent('whatsapp_clicked');
    });
  });
}

// Modal Handling - Fixed version
function setupModalHandling() {
  const modal = document.getElementById('successModal');
  const modalClose = document.getElementById('modalClose');
  const modalOk = document.getElementById('modalOk');
  
  if (!modal) {
    console.log('Success modal not found');
    return;
  }
  
  console.log('Setting up modal handling...');
  
  // Close modal handlers
  if (modalClose) {
    modalClose.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Modal close clicked');
      hideModal();
    });
  }
  
  if (modalOk) {
    modalOk.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Modal OK clicked');
      hideModal();
    });
  }
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      console.log('Modal backdrop clicked');
      hideModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      console.log('Escape key pressed');
      hideModal();
    }
  });
  
  console.log('Modal handling setup complete');
}

// Show Success Modal - Fixed version
function showSuccessModal() {
  console.log('Showing success modal...');
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    console.log('Success modal shown');
  } else {
    console.log('Modal element not found');
  }
}

// Hide Modal - Fixed version
function hideModal() {
  console.log('Hiding modal...');
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    console.log('Modal hidden');
  }
}

// Smooth Scrolling
function setupSmoothScrolling() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's a special href
      if (href === '#whatsapp' || href === '#') {
        return;
      }
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80; // Account for fixed navbar
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance Optimizations
const debouncedScroll = debounce(function() {
  // Handle scroll events efficiently
}, 16);

const throttledResize = throttle(function() {
  // Handle resize events efficiently
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

// Preload Critical Images
function preloadImages() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize image preloading
preloadImages();

// Loading State Management
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Remove loading states
  const loadingElements = document.querySelectorAll('.loading');
  loadingElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('loaded');
    }, index * 100);
  });
});

// Error Handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
  // In production, send error to logging service
});

// Accessibility Enhancements
document.addEventListener('keydown', function(e) {
  // Skip to main content with Tab key
  if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
    const firstFocusable = document.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  }
});

// Analytics Tracking (placeholder for real implementation)
function trackEvent(eventName, parameters = {}) {
  console.log('Event tracked:', eventName, parameters);
  // In production, send to analytics service like Google Analytics
}

// Track page view
trackEvent('page_view', { page: 'landing' });

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    trackEvent
  };
}