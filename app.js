// Application data
const destinationsData = [
  {
    name: "Paris, France",
    continent: "Europe",
    type: "Culture",
    budget: "Luxury",
    description: "The city of love and lights, featuring iconic landmarks, world-class museums, and exquisite cuisine.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise", "Montmartre District"],
    bestTime: "April-June, September-October",
    priceFrom: 2500,
    image: "paris-destination.jpg"
  },
  {
    name: "Tokyo, Japan",
    continent: "Asia",
    type: "Culture",
    budget: "Mid-range",
    description: "A fascinating blend of ancient traditions and cutting-edge technology in Japan's vibrant capital.",
    highlights: ["Sensoji Temple", "Shibuya Crossing", "Mount Fuji Day Trip", "Traditional Ryokan Stay"],
    bestTime: "March-May, September-November",
    priceFrom: 2800,
    image: "tokyo-destination.jpg"
  },
  {
    name: "Bali, Indonesia",
    continent: "Asia",
    type: "Beach",
    budget: "Budget",
    description: "Tropical paradise with stunning beaches, lush rice terraces, and rich cultural heritage.",
    highlights: ["Ubud Rice Terraces", "Beach Clubs in Seminyak", "Temple Hopping", "Volcano Sunrise Trek"],
    bestTime: "April-October",
    priceFrom: 1200,
    image: "bali-destination.jpg"
  },
  {
    name: "New York, USA",
    continent: "North America",
    type: "City",
    budget: "Luxury",
    description: "The city that never sleeps, offering Broadway shows, world-class shopping, and iconic skylines.",
    highlights: ["Statue of Liberty", "Central Park", "Broadway Shows", "Empire State Building"],
    bestTime: "April-June, September-November",
    priceFrom: 2200,
    image: "newyork-destination.jpg"
  },
  {
    name: "Iceland",
    continent: "Europe",
    type: "Adventure",
    budget: "Mid-range",
    description: "Land of fire and ice, featuring dramatic landscapes, Northern Lights, and geothermal wonders.",
    highlights: ["Blue Lagoon", "Northern Lights", "Golden Circle", "Glacier Hiking"],
    bestTime: "June-August (summer), September-March (Northern Lights)",
    priceFrom: 2000,
    image: "iceland-destination.jpg"
  },
  {
    name: "Kenya Safari",
    continent: "Africa",
    type: "Adventure",
    budget: "Luxury",
    description: "Ultimate safari experience with the Big Five, Great Migration, and authentic cultural encounters.",
    highlights: ["Masai Mara", "Great Migration", "Big Five Safari", "Maasai Village Visit"],
    bestTime: "July-October",
    priceFrom: 3500,
    image: "kenya-destination.jpg"
  }
];

const testimonialsData = [
  {
    name: "Sarah Johnson",
    location: "California, USA",
    text: "Wanderlust Travel planned the most incredible honeymoon to Bali. Every detail was perfect, from the stunning resorts to the cultural experiences. We couldn't have asked for better service!",
    rating: 5
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada", 
    text: "Our family trip to Japan was absolutely amazing. The team at Wanderlust understood exactly what we wanted and delivered beyond our expectations. The kids are already asking when we can go back!",
    rating: 5
  },
  {
    name: "Emma Williams",
    location: "London, UK",
    text: "I was hesitant about booking a solo trip to Kenya, but Wanderlust made me feel completely comfortable and safe. The safari experience was life-changing, and I made lifelong memories.",
    rating: 5
  }
];

const teamData = [
  {
    name: "Jessica Martinez",
    title: "Founder & CEO",
    bio: "With over 15 years in the travel industry, Jessica has visited 60+ countries and specializes in luxury and adventure travel planning.",
    image: "team-jessica.jpg"
  },
  {
    name: "David Thompson",
    title: "Senior Travel Consultant",
    bio: "David's expertise in Asian destinations and cultural immersion experiences has helped hundreds of travelers discover authentic adventures.",
    image: "team-david.jpg"
  },
  {
    name: "Rachel Foster",
    title: "European Travel Specialist",
    bio: "Rachel lived in Europe for 8 years and brings insider knowledge to create unforgettable European vacation experiences.",
    image: "team-rachel.jpg"
  }
];

// Global variables
let currentCarouselSlide = 0;
let filteredDestinations = [...destinationsData];
let carouselInterval;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCarousel();
    populateDestinations();
    populateTestimonials();
    populateTeam();
    initializeFilters();
    initializeContactForm();
    initializeModal();
    initializeMobileMenu();
    initializeFooterLinks();
    
    // Track page load for analytics
    trackEvent('page_view', 'home', 'initial_load');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('href').substring(1);
            navigateToPage(targetPage);
            
            // Track navigation
            trackEvent('navigation', targetPage, 'nav_click');
        });
    });
    
    // Handle CTA buttons
    const ctaButtons = document.querySelectorAll('[data-ga-action="cta_click"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const label = button.getAttribute('data-ga-label');
            if (label === 'hero_start_planning' || label === 'get_quote') {
                e.preventDefault();
                navigateToPage('contact');
            } else if (label === 'call_us') {
                e.preventDefault();
                alert('Call us at +1 (555) WANDER for immediate assistance!');
            }
            
            trackEvent('cta_click', label, 'button_click');
        });
    });
    
    // Handle view all destinations button
    const viewAllBtn = document.querySelector('[data-ga-label="featured_destinations"]');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('destinations');
            trackEvent('view_all_click', 'destinations', 'button_click');
        });
    }
}

function navigateToPage(pageName) {
    const navLinks = document.querySelectorAll('.navbar-link');
    const pages = document.querySelectorAll('.page');
    
    // Update active states
    navLinks.forEach(nl => nl.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    
    // Set new active states
    const targetLink = document.querySelector(`[href="#${pageName}"]`);
    const targetPage = document.getElementById(pageName);
    
    if (targetLink && targetPage) {
        targetLink.classList.add('active');
        targetPage.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Close mobile menu if open
        const menu = document.getElementById('navbarMenu');
        const toggle = document.getElementById('navbarToggle');
        if (menu && toggle) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
        
        // Special handling for destinations page
        if (pageName === 'destinations') {
            renderFilteredDestinations();
        }
    }
}

// Footer links
function initializeFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('href').substring(1);
            navigateToPage(targetPage);
        });
    });
}

// Carousel functionality
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (slides.length === 0) return;
    
    // Auto advance carousel
    carouselInterval = setInterval(() => {
        nextSlide();
    }, 5000);
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        heroSection.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            trackEvent('carousel_interaction', 'prev', 'hero_carousel');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            trackEvent('carousel_interaction', 'next', 'hero_carousel');
        });
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    slides[currentCarouselSlide].classList.remove('active');
    currentCarouselSlide = (currentCarouselSlide + 1) % slides.length;
    slides[currentCarouselSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    slides[currentCarouselSlide].classList.remove('active');
    currentCarouselSlide = currentCarouselSlide === 0 ? slides.length - 1 : currentCarouselSlide - 1;
    slides[currentCarouselSlide].classList.add('active');
}

// Destinations functionality
function populateDestinations() {
    const featuredContainer = document.getElementById('featuredDestinations');
    const allContainer = document.getElementById('allDestinations');
    
    if (featuredContainer) {
        featuredContainer.innerHTML = '';
        destinationsData.slice(0, 6).forEach(destination => {
            const card = createDestinationCard(destination, true);
            featuredContainer.appendChild(card);
        });
    }
    
    if (allContainer) {
        filteredDestinations = [...destinationsData];
        renderFilteredDestinations();
    }
}

function createDestinationCard(destination, isFeatured = false) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.setAttribute('data-destination', destination.name.toLowerCase().replace(/[^a-z0-9]/g, '-'));
    
    // Generate background color based on destination type
    const bgColors = {
        'Culture': 'var(--color-bg-1)',
        'Beach': 'var(--color-bg-3)',
        'City': 'var(--color-bg-2)',
        'Adventure': 'var(--color-bg-4)'
    };
    
    card.innerHTML = `
        <div class="destination-card-image" style="background: ${bgColors[destination.type] || 'var(--color-bg-1)'}"></div>
        <div class="destination-card-content">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <div class="destination-meta">
                <span class="destination-price">From $${destination.priceFrom.toLocaleString()}</span>
                <span class="destination-type">${destination.type}</span>
            </div>
            <button class="btn btn--primary" data-destination-name="${destination.name}">
                ${isFeatured ? 'Explore' : 'View Details'}
            </button>
        </div>
    `;
    
    // Add click handlers
    const button = card.querySelector('button');
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        openDestinationModal(destination.name);
        trackEvent('destination_click', destination.name, 'button_click');
    });
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            openDestinationModal(destination.name);
            trackEvent('destination_click', destination.name, 'card_click');
        }
    });
    
    return card;
}

function renderFilteredDestinations() {
    const container = document.getElementById('allDestinations');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredDestinations.length === 0) {
        container.innerHTML = '<div class="text-center"><p>No destinations found matching your criteria.</p></div>';
        return;
    }
    
    filteredDestinations.forEach(destination => {
        const card = createDestinationCard(destination, false);
        container.appendChild(card);
    });
}

// Filter functionality
function initializeFilters() {
    const continentFilter = document.getElementById('continentFilter');
    const typeFilter = document.getElementById('typeFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    
    if (!continentFilter || !typeFilter || !budgetFilter) return;
    
    [continentFilter, typeFilter, budgetFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            applyFilters();
            trackEvent('filter_use', filter.id, filter.value || 'all');
        });
    });
}

function applyFilters() {
    const continentFilter = document.getElementById('continentFilter');
    const typeFilter = document.getElementById('typeFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    
    if (!continentFilter || !typeFilter || !budgetFilter) return;
    
    const continentValue = continentFilter.value;
    const typeValue = typeFilter.value;
    const budgetValue = budgetFilter.value;
    
    filteredDestinations = destinationsData.filter(destination => {
        const matchesContinent = !continentValue || destination.continent === continentValue;
        const matchesType = !typeValue || destination.type === typeValue;
        const matchesBudget = !budgetValue || destination.budget === budgetValue;
        
        return matchesContinent && matchesType && matchesBudget;
    });
    
    renderFilteredDestinations();
    
    // Show results count
    const resultsText = `Showing ${filteredDestinations.length} of ${destinationsData.length} destinations`;
    console.log(resultsText);
}

// Testimonials
function populateTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    testimonialsData.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        const stars = '★'.repeat(testimonial.rating);
        
        card.innerHTML = `
            <div class="testimonial-rating">${stars}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">${testimonial.name}</div>
            <div class="testimonial-location">${testimonial.location}</div>
        `;
        
        container.appendChild(card);
    });
}

// Team
function populateTeam() {
    const container = document.getElementById('teamGrid');
    if (!container) return;
    
    container.innerHTML = '';
    teamData.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        
        // Generate initials for team photo placeholder
        const initials = member.name.split(' ').map(n => n[0]).join('');
        
        card.innerHTML = `
            <div class="team-photo">${initials}</div>
            <h3>${member.name}</h3>
            <div class="team-title">${member.title}</div>
            <p class="team-bio">${member.bio}</p>
        `;
        
        container.appendChild(card);
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('destinationModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDestinationModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDestinationModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDestinationModal();
        }
    });
}

function openDestinationModal(destinationName) {
    const destination = destinationsData.find(d => d.name === destinationName);
    if (!destination) return;
    
    const modal = document.getElementById('destinationModal');
    const content = document.getElementById('modalContent');
    
    if (!modal || !content) return;
    
    const bgColors = {
        'Culture': 'var(--color-bg-1)',
        'Beach': 'var(--color-bg-3)',
        'City': 'var(--color-bg-2)',
        'Adventure': 'var(--color-bg-4)'
    };
    
    content.innerHTML = `
        <div class="modal-destination-image" style="background: ${bgColors[destination.type]}"></div>
        <h2 class="modal-destination-title">${destination.name}</h2>
        <div class="modal-destination-meta">
            <span class="modal-meta-item">${destination.continent}</span>
            <span class="modal-meta-item">${destination.type}</span>
            <span class="modal-meta-item">${destination.budget}</span>
        </div>
        <p class="modal-destination-description">${destination.description}</p>
        <div class="modal-highlights">
            <h4>Trip Highlights</h4>
            <ul>
                ${destination.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
        </div>
        <p><strong>Best Time to Visit:</strong> ${destination.bestTime}</p>
        <div class="modal-price">Starting from $${destination.priceFrom.toLocaleString()}</div>
        <div style="display: flex; gap: 16px; margin-top: 24px; flex-wrap: wrap;">
            <button class="btn btn--primary" onclick="closeDestinationModal(); navigateToPage('contact');">Get Quote</button>
            <button class="btn btn--outline" onclick="closeDestinationModal();">Close</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    trackEvent('modal_open', destinationName, 'destination_details');
}

function closeDestinationModal() {
    const modal = document.getElementById('destinationModal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    trackEvent('modal_close', 'destination_modal', 'close');
}

// Contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleContactForm(e);
    });
    
    // Add validation on blur for immediate feedback
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    if (!value && field.required) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    clearFieldError({ target: field });
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--space-4)';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = 'var(--color-error)';
}

function clearFieldError(e) {
    const field = e.target;
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const destination = document.getElementById('destinationInterest').value;
    const budget = document.getElementById('budgetRange').value;
    const travelDate = document.getElementById('travelDate').value;
    const travelers = document.getElementById('travelers').value;
    const requirements = document.getElementById('specialRequirements').value.trim();
    
    // Validate required fields
    let isValid = true;
    
    if (!fullName) {
        showFieldError(document.getElementById('fullName'), 'Please enter your full name');
        isValid = false;
    }
    
    if (!email) {
        showFieldError(document.getElementById('email'), 'Please enter your email address');
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError(document.getElementById('email'), 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    if (!isValid) {
        return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Thank you, ${fullName}! We've received your inquiry and will contact you at ${email} within 24 hours to discuss your travel plans.`);
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track form submission
        trackEvent('form_submit', 'contact_form', 'inquiry_sent');
        
        // Optional: Show success message
        showSuccessMessage('Your travel inquiry has been submitted successfully!');
    }, 1500);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-success);
        color: var(--color-white);
        padding: var(--space-16) var(--space-24);
        border-radius: var(--radius-base);
        z-index: 3000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Mobile menu
function initializeMobileMenu() {
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        } else {
            menu.classList.add('active');
            toggle.classList.add('active');
        }
        
        trackEvent('mobile_menu', 'toggle', 'nav_interaction');
    });
    
    // Close menu when clicking on links
    const navLinks = menu.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}

// Analytics tracking function
function trackEvent(action, label, category) {
    // This is a placeholder for Google Analytics tracking
    // When GA is implemented, this function will send events to GA
    console.log('Analytics Event:', {
        action: action,
        label: label,
        category: category,
        timestamp: new Date().toISOString()
    });
    
    // Example of what this would look like with GA4:
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label,
    //     custom_map: {'dimension1': 'travel_website'}
    // });
}

// Scroll animations and interactions
function initializeScrollAnimations() {
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.destination-card, .testimonial-card, .feature-card, .team-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeScrollAnimations, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    const menu = document.getElementById('navbarMenu');
    const toggle = document.getElementById('navbarToggle');
    
    if (window.innerWidth > 768 && menu && toggle) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

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

// Export functions for global access
window.openDestinationModal = openDestinationModal;
window.closeDestinationModal = closeDestinationModal;
window.navigateToPage = navigateToPage;