// Enhanced App.js with Customizations functionality

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const contactForm = document.getElementById('contact-form');

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }

    // Initialize loading animations
    initializeAnimations();

    // Initialize navbar scroll effect
    initializeNavbarScroll();

    // Initialize customization cards functionality
    initializeCustomizationCards();
});

// WhatsApp functionality with updated number
function openWhatsApp() {
    const phone = '918789356816';
    const message = 'Hi! I am interested in requesting a custom business automation system. Can you please provide more information about your services?';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Enhanced function to request specific custom system
function requestCustomSystem(systemName) {
    const phone = '918789356816';
    const message = `Hi! I am interested in the "${systemName}" system.

Could you please provide more details about:
- Implementation process and timeline
- Customization options available
- Pricing and packages
- Integration with existing systems
- Support and maintenance

I would like to discuss my specific requirements for this system.

Thank you!`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Track the system request
    trackEvent('system_request', {
        system_name: systemName,
        source: 'customization_card'
    });

    showNotification(`Redirecting to WhatsApp for ${systemName} consultation`, 'success');
}

// Contact modal functionality
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Enhanced form submission with new fields including system interest
function handleFormSubmission() {
    const formData = new FormData(document.getElementById('contact-form'));
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const systemInterest = formData.get('system-interest');
    const message = formData.get('message');
    const budget = formData.get('budget');

    // Validate required fields
    if (!name || !email || !company || !budget) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Create WhatsApp message with all form data
    const whatsappMessage = `
🔥 New System Creation Request 🔥

👤 Name: ${name}
📧 Email: ${email}
🏢 Company: ${company}
${systemInterest ? `🎯 System of Interest: ${systemInterest}` : ''}
💰 Budget Range: ${budget}

📝 Requirements & Features Needed:
${message || 'Not specified'}

---
Please contact me to discuss the custom business automation system requirements.
    `.trim();

    const phone = '918789356816';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Track form submission
    trackEvent('form_submission', {
        system_interest: systemInterest || 'not_specified',
        budget_range: budget,
        has_message: !!message
    });

    // Open WhatsApp
    window.open(url, '_blank');

    // Show success message
    showNotification('Request sent! You will be redirected to WhatsApp to complete your system creation request.', 'success');

    // Reset form
    document.getElementById('contact-form').reset();

    // Close modal if open
    closeContactModal();
}

// Initialize customization cards functionality
function initializeCustomizationCards() {
    const customizationCards = document.querySelectorAll('.customization-card');

    customizationCards.forEach((card, index) => {
        // Add click handler to entire card
        card.addEventListener('click', function(e) {
            // Don't trigger if button was clicked
            if (e.target.tagName === 'BUTTON') return;

            const button = this.querySelector('.btn');
            if (button) {
                button.click();
            }
        });

        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = this.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
        });

        // Add intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(card);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Loading animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.service-card, .benefit-card, .testimonial-card');
    animatableElements.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }

        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('contact-modal');
    if (modal && !modal.classList.contains('hidden') && e.target === modal) {
        closeContactModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// Enhanced service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                // Get service information
                const serviceTitle = card.querySelector('h3').textContent;
                const serviceDescription = card.querySelector('p').textContent;

                // Create custom message for this specific service
                const customMessage = `Hi! I'm interested in requesting a custom "${serviceTitle}" system for my business.

Service Details: ${serviceDescription}

Could you please provide more information about:
- Implementation timeline
- Customization options  
- Pricing details
- Next steps to get started

Thank you!`;

                const phone = '918789356816';
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`;
                window.open(url, '_blank');

                trackEvent('service_request', {
                    service_name: serviceTitle,
                    source: 'service_card'
                });

                showNotification(`Redirecting to WhatsApp for ${serviceTitle} consultation`, 'success');
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Form field validation
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Show error if validation failed
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = `
            color: #EF4444;
            font-size: 14px;
            margin-top: 4px;
        `;
        field.parentNode.appendChild(errorElement);
    }

    return isValid;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', setupFormValidation);

// Analytics tracking
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }

    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }

    console.log('Event tracked:', eventName, parameters);
}

// Track various user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const systemInterest = document.getElementById('system-interest')?.value;
            trackEvent('form_submission', {
                form_name: 'contact_form',
                system_interest: systemInterest || 'not_specified',
                page_location: window.location.href
            });
        });
    }

    // Track WhatsApp button clicks
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('whatsapp_click', {
                button_location: this.closest('section')?.id || 'unknown',
                page_location: window.location.href
            });
        });
    });

    // Track customization card interactions
    const customizationCards = document.querySelectorAll('.customization-card');
    customizationCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const systemName = this.querySelector('h3')?.textContent || `System ${index + 1}`;
            trackEvent('customization_interest', {
                system_name: systemName,
                page_location: window.location.href
            });
        });
    });

    // Track service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h3')?.textContent || `Service ${index + 1}`;
            trackEvent('service_interest', {
                service_name: serviceTitle,
                page_location: window.location.href
            });
        });
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);

    trackEvent('javascript_error', {
        error_message: e.error?.message || 'Unknown error',
        page_location: window.location.href
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    trackEvent('page_performance', {
        load_time: loadTime,
        page_location: window.location.href
    });
});

// Progressive enhancement for system selection
document.addEventListener('DOMContentLoaded', function() {
    const systemSelect = document.getElementById('system-interest');
    const messageField = document.getElementById('message');

    if (systemSelect && messageField) {
        systemSelect.addEventListener('change', function() {
            const selectedSystem = this.value;
            if (selectedSystem && selectedSystem !== 'Multiple Systems' && selectedSystem !== 'Custom Analytics Dashboard') {
                messageField.placeholder = `Tell us more about your specific requirements for ${selectedSystem}. For example: team size, current challenges, integration needs, etc.`;
            } else if (selectedSystem === 'Multiple Systems') {
                messageField.placeholder = 'Please specify which systems you need and how you'd like them integrated together...';
            } else {
                messageField.placeholder = 'Describe your requirements, features needed, and any specific customizations...';
            }
        });
    }
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add search functionality for customizations
function initializeCustomizationSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search customizations...';
    searchInput.className = 'customization-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        margin: 0 auto 32px;
        padding: 12px 16px;
        border: 1px solid #D1D5DB;
        border-radius: 8px;
        font-size: 16px;
        display: block;
    `;

    const customizationsHeader = document.querySelector('.customizations .section-header');
    if (customizationsHeader) {
        customizationsHeader.appendChild(searchInput);
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.customization-card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = searchTerm ? 'none' : 'block';
            }
        });
    });
}

// Initialize search after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are rendered
    setTimeout(initializeCustomizationSearch, 500);
});

// Auto-populate form with system interest when coming from customization cards
function populateFormWithSystemInterest(systemName) {
    const systemSelect = document.getElementById('system-interest');
    if (systemSelect) {
        // Try to find matching option
        const options = systemSelect.querySelectorAll('option');
        let foundMatch = false;

        options.forEach(option => {
            if (option.value === systemName) {
                systemSelect.value = systemName;
                foundMatch = true;

                // Trigger change event
                systemSelect.dispatchEvent(new Event('change'));
            }
        });

        // If no exact match, scroll to form
        if (!foundMatch) {
            const trialSection = document.getElementById('trial');
            if (trialSection) {
                trialSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

// Enhanced requestCustomSystem function
const originalRequestCustomSystem = window.requestCustomSystem;
window.requestCustomSystem = function(systemName) {
    // First try to populate the form
    populateFormWithSystemInterest(systemName);

    // Then call the original function
    if (originalRequestCustomSystem) {
        originalRequestCustomSystem(systemName);
    }
};
