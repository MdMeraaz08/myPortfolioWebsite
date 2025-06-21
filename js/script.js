/**
 * Portfolio Website JavaScript
 * Author: John Doe
 * Description: Main JavaScript file for portfolio website functionality
 */

// ===================================
// Global Variables and Configuration
// ===================================

let typingIndex = 0;
let typingTextIndex = 0;
let isDeleting = false;
const typingTexts = [
    "Software Developer",
    "Cybersecurity Enthusiast", 
    "Problem Solver",
    "Tech Innovator",
    "Data Analyst"
];
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

// ===================================
// DOM Content Loaded Event Listener
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeThemeToggle();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeProjectFilters();
    initializeCertificationFilters();
    initializeContactForm();
    initializeBackToTop();
    initializeStatsCounter();
    initializeLazyLoading();
    
    // Page-specific initializations
    if (window.location.pathname.includes('about.html')) {
        initializeTimelineAnimations();
    }
});

// ===================================
// Navigation Functionality
// ===================================

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                if (document.body.classList.contains('dark')) {
                    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                }
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                if (document.body.classList.contains('dark')) {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
        });
    }

    // Active navigation highlighting for single page
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        window.addEventListener('scroll', updateActiveNavigation);
    }
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Theme Toggle Functionality
// ===================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Load saved theme or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark');
            
            // Save theme preference
            const isDark = body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update navbar background immediately
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (isDark) {
                    navbar.style.background = window.scrollY > 100 ? 
                        'rgba(15, 23, 42, 0.98)' : 'rgba(15, 23, 42, 0.95)';
                } else {
                    navbar.style.background = window.scrollY > 100 ? 
                        'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
                }
            }
        });
    }
}

// ===================================
// Typing Effect Animation
// ===================================

function initializeTypingEffect() {
    const typingElement = document.getElementById('typingText');
    
    if (typingElement) {
        typeText();
    }
}

function typeText() {
    const typingElement = document.getElementById('typingText');
    const currentText = typingTexts[typingTextIndex];
    
    if (!isDeleting) {
        // Typing
        typingElement.textContent = currentText.substring(0, typingIndex + 1);
        typingIndex++;
        
        if (typingIndex === currentText.length) {
            // Pause before deleting
            setTimeout(() => {
                isDeleting = true;
                typeText();
            }, pauseTime);
            return;
        }
        
        setTimeout(typeText, typingSpeed);
    } else {
        // Deleting
        typingElement.textContent = currentText.substring(0, typingIndex - 1);
        typingIndex--;
        
        if (typingIndex === 0) {
            isDeleting = false;
            typingTextIndex = (typingTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
            return;
        }
        
        setTimeout(typeText, deletingSpeed);
    }
}

// ===================================
// Scroll Animations
// ===================================

function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .cert-card, .contact-item, .about-section, .feature-item, .learning-item'
    );

    animatedElements.forEach((el, index) => {
        // Add animation classes based on position
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('scale-in');
        }
        observer.observe(el);
    });
}

// ===================================
// Skill Bars Animation
// ===================================

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progressBar = skillItem.querySelector('.skill-progress');
                const level = skillItem.getAttribute('data-level');
                
                if (progressBar && level) {
                    // Animate progress bar
                    setTimeout(() => {
                        progressBar.style.width = level + '%';
                    }, 200);
                    
                    // Add tooltip functionality
                    addSkillTooltip(skillItem);
                }
                
                skillObserver.unobserve(skillItem);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

function addSkillTooltip(skillItem) {
    const skillName = skillItem.getAttribute('data-skill');
    const skillLevel = skillItem.getAttribute('data-level');
    
    skillItem.addEventListener('mouseenter', function(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.innerHTML = `
            <strong>${skillName}</strong><br>
            Proficiency: ${skillLevel}%
        `;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--dark-bg-primary);
            color: var(--dark-text-primary);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = skillItem.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });
    
    skillItem.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
}

// ===================================
// Project Filtering System
// ===================================

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// Certification Filtering System
// ===================================

function initializeCertificationFilters() {
    const filterButtons = document.querySelectorAll('.cert-filters .filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter certifications with animation
            certCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// Contact Form Functionality
// ===================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (validateContactForm(name, email, message)) {
                // Simulate form submission
                submitContactForm(name, email, subject, message);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateContactForm(name, email, message) {
    let isValid = true;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate name
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    if (inputElement) {
        inputElement.style.borderColor = 'var(--error-color)';
    }
}

function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    field.style.borderColor = 'var(--border-color)';
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    errorElements.forEach(el => el.textContent = '');
    inputElements.forEach(el => el.style.borderColor = 'var(--border-color)');
}

function submitContactForm(name, email, subject, message) {
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear form
        document.getElementById('contactForm').reset();
        
        // Show success modal
        showSuccessModal();
        
        // In a real application, you would send the data to your server
        // Example: sendEmailViaAPI(name, email, subject, message);
    }, 2000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Close modal functionality
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            modal.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// Back to Top Button
// ===================================

function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// Stats Counter Animation
// ===================================

function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateCounter(statNumber, target);
                    statsObserver.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed by changing divisor
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ===================================
// Timeline Animations (About Page)
// ===================================

function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            // Add staggered animation delay
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('fade-in');
            timelineObserver.observe(item);
        });
    }
}

// ===================================
// Lazy Loading for Images
// ===================================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// ===================================
// Keyboard Navigation Support
// ===================================

document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal[style*="flex"]');
        if (modal) {
            modal.style.display = 'none';
        }
        
        const lightbox = document.querySelector('.lightbox[style*="flex"]');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Enter key to activate buttons
    if (e.key === 'Enter' && e.target.classList.contains('filter-btn')) {
        e.target.click();
    }
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
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

// Throttle function for resize events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    updateActiveNavigation();
}, 10);

// Optimized resize handler
const optimizedResizeHandler = throttle(function() {
    // Handle responsive adjustments
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
}, 250);

// Add optimized event listeners
window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// ===================================
// Error Handling and Fallbacks
// ===================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send error reports to your analytics service here
});

// Fallback for browsers that don't support IntersectionObserver
if (!window.IntersectionObserver) {
    // Fallback: immediately show all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        el.classList.add('visible');
    });
    
    // Fallback: immediately animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const level = bar.parentElement.parentElement.getAttribute('data-level');
        if (level) {
            bar.style.width = level + '%';
        }
    });
}

// ===================================
// Utility Functions
// ===================================

// Function to format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to sanitize HTML
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return Promise.resolve();
    }
}

// ===================================
// Console Welcome Message
// ===================================

console.log(`
🚀 Welcome to John Doe's Portfolio!
📧 Contact: john.doe@example.com
🔗 GitHub: https://github.com
💼 LinkedIn: https://linkedin.com

Thanks for checking out the code! 
This portfolio is built with vanilla HTML, CSS, and JavaScript.
`);

// ===================================
// Export functions for testing (if needed)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        sanitizeHTML,
        formatDate,
        debounce,
        throttle
    };
}