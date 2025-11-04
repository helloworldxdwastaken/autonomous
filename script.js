// ============================================
// Autonomous Lab - Interactive JavaScript
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Scroll Effect - Contract & Expand
// ============================================

let lastScroll = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class based on position
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animatable elements
const animateElements = document.querySelectorAll(`
    .feature-card, 
    .agent-card, 
    .mermaid-box, 
    .diff-card, 
    .pricing-card,
    .roadmap-phase
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Dynamic Gradient Orbs - Mouse Tracking
// ============================================

const orbs = document.querySelectorAll('.gradient-orb');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateOrbs() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    orbs.forEach((orb, index) => {
        const multiplier = (index + 1) * 0.015;
        const x = (currentX - window.innerWidth / 2) * multiplier;
        const y = (currentY - window.innerHeight / 2) * multiplier;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ============================================
// Counter Animation for Statistics
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isInfinity = target === Infinity;
    
    const timer = setInterval(() => {
        if (isInfinity) {
            clearInterval(timer);
            element.textContent = '∞';
        } else {
            current += increment;
            if (current >= target) {
                element.textContent = Math.ceil(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }
    }, 16);
}

// Observe hero stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent.trim();
            
            if (text === '24/7' || text === '∞') {
                // Keep as is
            } else {
                const value = parseInt(text);
                if (!isNaN(value)) {
                    number.textContent = '0';
                    animateCounter(number, value);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// Enhanced Pricing Card Interactions
// ============================================

document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.borderColor = 'var(--primary-color)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.borderColor = '';
        }
    });
});

// ============================================
// Ripple Effect on Buttons
// ============================================

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS animation
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Parallax Effect for Hero Background
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// Active Navigation Highlighting
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Smooth Page Load Animation
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Enhanced Glassmorphism on Scroll
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glassElements = document.querySelectorAll('.feature-card, .agent-card, .pricing-card');
    
    glassElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            el.style.animationDelay = `${index * 0.1}s`;
        }
    });
});

// ============================================
// Workflow Diagram Animation on Scroll
// ============================================

const workflowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animations when workflow comes into view
            const boxes = entry.target.querySelectorAll('.mermaid-box');
            boxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

const mermaidContainer = document.querySelector('.mermaid-container');
if (mermaidContainer) {
    workflowObserver.observe(mermaidContainer);
}

// ============================================
// Performance Optimization - Debounce Scroll
// ============================================

function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Placeholder for any heavy scroll computations
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// Console Branding
// ============================================

console.log('%c🧬 AUTONOMOUS LAB ', 'color: #00d4ff; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%c✨ The world\'s first autonomous scientific laboratory', 'color: #ffd700; font-size: 14px; font-weight: 500;');
console.log('%cPowered by AI • Built with glassmorphism • Designed for the future', 'color: #718096; font-size: 12px;');

// ============================================
// Mobile Menu Toggle (for future implementation)
// ============================================

// Prepared for mobile hamburger menu if needed
const createMobileMenu = () => {
    // Future implementation for hamburger menu
};

// ============================================
// Accessibility Enhancements
// ============================================

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(a11yStyle);

// ============================================
// Preload Critical Resources
// ============================================

window.addEventListener('load', () => {
    // Preload fonts and critical assets
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
});

// ============================================
// Performance Monitoring (Development)
// ============================================

if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
    });
}
