// Snowfall Effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
    document.getElementById('snowfall').appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 10000);
}
setInterval(createSnowflake, 500);

// Email Form Handler
// Form submission handler
document.getElementById('googleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
        // Show temporary error message
        showTempErrorMessage('Please fill in all required fields');
        return;
    }
    
    // Hide temporary error message if it was shown
    hideTempErrorMessage();
    
    // Get form elements
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const loadingIndicator = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide any previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    loadingIndicator.style.display = 'block';
    
    // Get form data
    const formData = new FormData(form);
    
    // IMPORTANT: Replace with your actual Google Form submission URL
    const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSchptoV6pNnZACo04lnJwVQAschgWWpMnnOTm-CDFHBkUv2TQ/formResponse';
    
    // Create URL parameters from form data
    const urlParams = new URLSearchParams(formData);
    
    // Submit to Google Forms using fetch
    fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // Important: This prevents CORS issues
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlParams
    })
    .then(() => {
        // Since we're using no-cors mode, we can't check the response status
        // But we assume it was successful if we reach this point
        
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Reset button state after a short delay
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Notify Me';
        }, 2000);
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
        
        // Show error message
        errorMessage.style.display = 'block';
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Notify Me';
    });
});

// Form validation function - NOW CHECKS ALL THREE FIELDS ARE FILLED
function validateForm() {
    let isValid = true;
    
    // Validate name (required)
    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showValidationError(nameInput, 'Name is required');
        isValid = false;
    } else if (nameValue.length < 2) {
        showValidationError(nameInput, 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        clearValidationError(nameInput);
    }
    
    // Validate email (required)
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
        showValidationError(emailInput, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        showValidationError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearValidationError(emailInput);
    }
    
    // Validate phone (NOW REQUIRED)
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    
    if (phoneValue === '') {
        showValidationError(phoneInput, 'Phone number is required');
        isValid = false;
    } else {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneValue.replace(/[\s\-\(\)]/g, ''))) {
            showValidationError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearValidationError(phoneInput);
        }
    }
    
    return isValid;
}

// Show validation error
function showValidationError(input, message) {
    input.classList.add('invalid');
    
    // Find or create validation message element
    let validationMessage = input.parentNode.querySelector('.validation-message');
    if (!validationMessage) {
        validationMessage = document.createElement('div');
        validationMessage.className = 'validation-message';
        input.parentNode.appendChild(validationMessage);
    }
    
    validationMessage.textContent = message;
    validationMessage.classList.add('invalid');
}

// Clear validation error
function clearValidationError(input) {
    input.classList.remove('invalid');
    
    const validationMessage = input.parentNode.querySelector('.validation-message');
    if (validationMessage) {
        validationMessage.classList.remove('invalid');
    }
}

// Show temporary error message
function showTempErrorMessage(message) {
    let tempError = document.getElementById('tempErrorMessage');
    if (!tempError) {
        tempError = document.createElement('div');
        tempError.id = 'tempErrorMessage';
        tempError.className = 'temp-error-message';
        // Insert after the form
        const form = document.getElementById('googleForm');
        form.parentNode.insertBefore(tempError, form.nextSibling);
    }
    
    tempError.textContent = message;
    tempError.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideTempErrorMessage();
    }, 5000);
}

// Hide temporary error message
function hideTempErrorMessage() {
    const tempError = document.getElementById('tempErrorMessage');
    if (tempError) {
        tempError.style.display = 'none';
    }
}

// Real-time validation for all three fields
document.getElementById('name').addEventListener('blur', function() {
    const value = this.value.trim();
    if (value === '') {
        showValidationError(this, 'Name is required');
    } else if (value.length < 2) {
        showValidationError(this, 'Name must be at least 2 characters long');
    } else {
        clearValidationError(this);
    }
});

document.getElementById('email').addEventListener('blur', function() {
    const value = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        showValidationError(this, 'Email is required');
    } else if (!emailRegex.test(value)) {
        showValidationError(this, 'Please enter a valid email address');
    } else {
        clearValidationError(this);
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    const value = this.value.trim();
    if (value === '') {
        showValidationError(this, 'Phone number is required');
    } else {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showValidationError(this, 'Please enter a valid phone number');
        } else {
            clearValidationError(this);
        }
    }
});

// Clear validation on input and hide temp error
document.querySelectorAll('.email-input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('invalid')) {
            clearValidationError(this);
        }
        // Hide temporary error message when user starts typing
        hideTempErrorMessage();
    });
});
// Form Submission JS code ends here

// Carousel Items Dictionary - UPDATED PATHS
const carouselItems = [
    { "image": "images/carousel/Male/1.png" },
    { "image": "images/carousel/Female/1.png" },
    { "image": "images/carousel/Male/2.png" },
    { "image": "images/carousel/Female/2.png" },
    { "image": "images/carousel/Male/3.png" },
    { "image": "images/carousel/Female/3.png" },
    { "image": "images/carousel/Male/4.png" },
    { "image": "images/carousel/Female/4.png" },
    { "image": "images/carousel/Male/5.png" },
    { "image": "images/carousel/Female/5.png" },
    { "image": "images/carousel/Male/6.png" },
    { "image": "images/carousel/Female/6.png" },
    { "image": "images/carousel/Male/7.png" },
    { "image": "images/carousel/Female/7.png" },
    { "image": "images/carousel/Male/8.png" },
    { "image": "images/carousel/Female/8.png" },
    { "image": "images/carousel/Male/9.png" },
    { "image": "images/carousel/Female/9.png" },
    { "image": "images/carousel/Male/10.png" },
    { "image": "images/carousel/Female/10.png" },
    { "image": "images/carousel/Male/11.png" },
    { "image": "images/carousel/Female/11.png" },
    { "image": "images/carousel/Male/12.png" },
    { "image": "images/carousel/Female/12.png" },
];

// Carousel functionality
let isManualScrolling = false;
let scrollTimeout;
let carouselTrack;

function createCarouselItems() {
    carouselTrack = document.getElementById('carouselTrack');
    
    // Clear existing content
    carouselTrack.innerHTML = '';
    
    // Create items from dictionary (twice for seamless loop)
    carouselItems.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="Carousel Item">
            <div class="image-overlay">
                <span class="overlay-text">Coming Soon</span>
            </div>
        `;
        
        carouselTrack.appendChild(carouselItem);
    });
    
    // Duplicate items for seamless loop
    carouselItems.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="Carousel Item">
            <div class="image-overlay">
                <span class="overlay-text">Coming Soon</span>
            </div>
        `;
        
        carouselTrack.appendChild(carouselItem);
    });
    
    // Add event listeners for manual scrolling
    setupCarouselInteractions();
}

function setupCarouselInteractions() {
    // Mouse down/touch start - switch to manual scroll
    carouselTrack.addEventListener('mousedown', startManualScroll);
    carouselTrack.addEventListener('touchstart', startManualScroll);
    
    // Mouse up/touch end - wait and then resume auto-scroll
    carouselTrack.addEventListener('mouseup', endManualScroll);
    carouselTrack.addEventListener('touchend', endManualScroll);
    carouselTrack.addEventListener('mouseleave', endManualScroll);
    
    // Wheel event for mouse wheel scrolling
    carouselTrack.addEventListener('wheel', handleWheel);
}

function startManualScroll() {
    if (!isManualScrolling) {
        isManualScrolling = true;
        carouselTrack.classList.add('manual-scroll');
        carouselTrack.classList.remove('paused');
    }
    
    // Clear any existing timeout
    clearTimeout(scrollTimeout);
}

function endManualScroll() {
    if (isManualScrolling) {
        scrollTimeout = setTimeout(() => {
            isManualScrolling = false;
            carouselTrack.classList.remove('manual-scroll');
            // Restart animation from current position
            const currentScroll = carouselTrack.scrollLeft;
            carouselTrack.style.transform = `translateX(-${currentScroll}px)`;
        }, 2000); // Wait 2 seconds after user stops scrolling
    }
}

function handleWheel(e) {
    if (!isManualScrolling) {
        startManualScroll();
    }
    
    // Prevent default vertical scrolling
    e.preventDefault();
    
    // Scroll horizontally with wheel
    carouselTrack.scrollLeft += e.deltaY;
    
    // Reset timeout on wheel activity
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (isManualScrolling) {
            endManualScroll();
        }
    }, 2000);
}

// Video handling for hero section
function initHeroVideo() {
    const video = document.querySelector('.showcase-video');
    
    if (video) {
        // Set the video source explicitly
        video.innerHTML = `
            <source src="videos/showcase.mp4" type="video/mp4">
            <source src="videos/christmas-showcase.webm" type="video/webm">
            Your browser does not support the video tag.
        `;
        
        // Ensure video plays correctly on mobile
        video.addEventListener('loadedmetadata', function() {
            video.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
            });
        });
        
        // Fallback if video fails to load
        video.addEventListener('error', function() {
            console.log('Video failed to load, using fallback image');
            const videoContainer = document.querySelector('.hero-video');
            videoContainer.innerHTML = `
                <div class="video-fallback" style="width:100%;height:100%;background:linear-gradient(45deg,#dc2626,#16a34a);display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem;border-radius:12px;">
                    <div style="text-align:center;">
                        <div style="font-size:3rem;margin-bottom:1rem;">🎄</div>
                        Christmas Collection Coming Soon
                    </div>
                </div>
            `;
        });
        
        // Load the video
        video.load();
    }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    createCarouselItems();
    initHeroVideo();
});

// Smooth scroll function
function smoothScrollToEmail() {
    const emailSection = document.getElementById('notify');
    if (!emailSection) return;
    
    const targetPosition = emailSection.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const headerHeight = 100;
    const distance = targetPosition - startPosition - headerHeight;
    const duration = 500;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * progress);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        // Toggle mobile menu
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideHeader = event.target.closest('header');
        if (!isClickInsideHeader && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});
