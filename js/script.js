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
// Email Form Handler
async function handleSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('.email-input');
    const email = input.value;
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    if (!email) {
        alert('Please enter your email address');
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        // Show loading state
        button.textContent = 'Saving...';
        button.disabled = true;

        // REPLACE WITH YOUR ACTUAL WEB APP URL
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbyUM5K8TRTWo6s20UO6yf7M8LIOgkQDr0YDTZ-zAACsIzdyYzrGVQ1xEpBFojhyJBwLjw/exec';

        const response = await fetch(webAppUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        const result = await response.json();

        if (result.result === 'success') {
            alert(`Thank you! We'll notify you at ${email} when we launch.`);
            input.value = '';
        } else {
            throw new Error(result.message);
        }

    } catch (error) {
        console.error('Error saving email:', error);
        alert('Sorry, there was an error saving your email. Please try again later.');
    } finally {
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;
    }
}

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
