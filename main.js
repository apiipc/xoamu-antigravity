document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressFill = document.getElementById('progress-fill');
    const footerProgress = document.getElementById('footer-progress');
    const currentNumDisplay = document.getElementById('current-slide-num');
    const totalNumDisplay = document.getElementById('total-slides-num');
    const resetBtn = document.getElementById('reset-btn');

    // Set initial total count
    if (totalNumDisplay) totalNumDisplay.textContent = totalSlides;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('prev');
            }
        });

        // Update UI Text
        if (currentNumDisplay) currentNumDisplay.textContent = currentSlide + 1;
        
        // Update Progress Bars
        const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
        if (footerProgress) footerProgress.style.width = `${progressPercent}%`;

        // Update buttons
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Scroll slide content to top when changing
        const activeContent = slides[currentSlide].querySelector('.content-scroll');
        if (activeContent) activeContent.scrollTop = 0;
    }

    function goToNext() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function goToPrev() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentSlide = 0;
            updateSlides();
        });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            goToNext();
        } else if (e.key === 'ArrowLeft') {
            goToPrev();
        }
    });

    // Touch support (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            goToNext();
        } else if (touchEndX > touchStartX + threshold) {
            goToPrev();
        }
    }

    // Initialize
    updateSlides();
});
