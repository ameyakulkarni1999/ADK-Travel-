// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                } else {
                    field.style.borderColor = '#e2e8f0';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                alert('Thank you for your inquiry! We will get back to you within 24 hours.');
                contactForm.reset();
                
                // Track form submission for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form Submission'
                    });
                }
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Destination search and filter functionality
    const searchInput = document.getElementById('destinationSearch');
    const continentFilter = document.getElementById('continentFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    const typeFilter = document.getElementById('typeFilter');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    function filterDestinations() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedContinent = continentFilter ? continentFilter.value.toLowerCase() : '';
        const selectedBudget = budgetFilter ? budgetFilter.value.toLowerCase() : '';
        const selectedType = typeFilter ? typeFilter.value.toLowerCase() : '';
        
        if (destinationCards.length > 0) {
            destinationCards.forEach(card => {
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                const cardContinent = card.getAttribute('data-continent') || '';
                const cardBudget = card.getAttribute('data-budget') || '';
                const cardType = card.getAttribute('data-type') || '';
                
                const matchesSearch = !searchTerm || cardTitle.includes(searchTerm);
                const matchesContinent = !selectedContinent || cardContinent === selectedContinent;
                const matchesBudget = !selectedBudget || cardBudget === selectedBudget;
                const matchesType = !selectedType || cardType === selectedType;
                
                if (matchesSearch && matchesContinent && matchesBudget && matchesType) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
    
    // Add event listeners for search and filters
    if (searchInput) {
        searchInput.addEventListener('input', filterDestinations);
    }
    
    if (continentFilter) {
        continentFilter.addEventListener('change', filterDestinations);
    }
    
    if (budgetFilter) {
        budgetFilter.addEventListener('change', filterDestinations);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterDestinations);
    }
    
    // Search button functionality
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', filterDestinations);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation for destination cards
    const destinationCardElements = document.querySelectorAll('.destination-card');
    if (destinationCardElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        destinationCardElements.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Form field focus enhancement
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Newsletter signup tracking
    const newsletterCheckbox = document.querySelector('input[name="newsletter"]');
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    event_category: 'Engagement',
                    event_label: this.checked ? 'Opted In' : 'Opted Out'
                });
            }
        });
    }
    
    // Track button clicks for analytics
    const trackableButtons = document.querySelectorAll('[data-ga-action]');
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-ga-action');
            const label = this.getAttribute('data-ga-label');
            
            // Track with Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    event_category: 'User Interaction',
                    event_label: label
                });
            }
            
            // Console log for debugging (remove in production)
            console.log('Analytics Event:', action, label);
        });
    });
    
    // Hero image carousel (for home page)
    const heroImages = [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ];
    
    const heroImageElement = document.querySelector('.hero-image img');
    if (heroImageElement) {
        let currentImageIndex = 0;
        
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImageElement.src = heroImages[currentImageIndex];
        }, 5000); // Change image every 5 seconds
    }
    
    // FAQ accordion functionality (if needed)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const answer = item.querySelector('p');
                if (answer) {
                    const isVisible = answer.style.display !== 'none';
                    answer.style.display = isVisible ? 'none' : 'block';
                    
                    // Add some visual feedback
                    this.style.color = isVisible ? '#2d3748' : '#3182ce';
                }
            });
        }
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3182ce;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_to_top', {
                event_category: 'Navigation',
                event_label: 'Back to Top Button'
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .navbar-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        gap: 1rem;
    }
    
    .navbar-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .navbar-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .navbar-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .form-group.focused label {
        color: #3182ce;
    }
    
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: #3182ce;
        box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }
    
    .back-to-top:hover {
        background: #2c5282;
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .navbar-menu {
            display: none;
        }
        
        .navbar-toggle {
            display: flex !important;
        }
    }
`;

document.head.appendChild(style);