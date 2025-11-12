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
function handleSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('.email-input');
    const email = input.value;
    
    if (email) {
        alert(`Thank you! We'll notify you at ${email} when we launch.`);
        input.value = '';
    }
}

// Carousel Items Dictionary - UPDATED PATHS
const carouselItems = [
    { "image": "images/carousel/male/1.png" },
    { "image": "images/carousel/female/1.png" },
    { "image": "images/carousel/male/2.png" },
    { "image": "images/carousel/female/2.png" },
    { "image": "images/carousel/male/3.png" },
    { "image": "images/carousel/female/3.png" },
    { "image": "images/carousel/male/4.png" },
    { "image": "images/carousel/female/4.png" },
    { "image": "images/carousel/male/5.png" },
    { "image": "images/carousel/female/5.png" },
    { "image": "images/carousel/male/6.png" },
    { "image": "images/carousel/female/6.png" },
    { "image": "images/carousel/male/7.png" },
    { "image": "images/carousel/female/7.png" },
    { "image": "images/carousel/male/8.png" },
    { "image": "images/carousel/female/8.png" },
    { "image": "images/carousel/male/9.png" },
    { "image": "images/carousel/female/9.png" },
    { "image": "images/carousel/male/10.png" },
    { "image": "images/carousel/female/10.png" },
    { "image": "images/carousel/male/11.png" },
    { "image": "images/carousel/female/11.png" },
    { "image": "images/carousel/male/12.png" },
    { "image": "images/carousel/female/12.png" }
];

// Function to create carousel items
function createCarouselItems() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    // Clear existing content
    carouselTrack.innerHTML = '';
    
    // Create items from dictionary (twice for seamless loop)
    carouselItems.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="Carousel Item" loading="lazy">
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
            <img src="${item.image}" alt="Carousel Item" loading="lazy">
            <div class="image-overlay">
                <span class="overlay-text">Coming Soon</span>
            </div>
        `;
        
        carouselTrack.appendChild(carouselItem);
    });
}

// Video handling for hero section
function initHeroVideo() {
    const video = document.querySelector('.showcase-video');
    
    if (video) {
        // Set the video source explicitly
        video.innerHTML = `
            <source src="images/videos/showcase.mp4" type="video/mp4">
            <source src="images/videos/christmas-showcase.webm" type="video/webm">
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
