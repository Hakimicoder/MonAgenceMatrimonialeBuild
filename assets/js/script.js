const slider = document.getElementById('slider');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');

const slides = slider.children;
let currentIndex = 0;

const updateSlideWidth = () => slides[0].offsetWidth;

const goToSlide = (index) => {
    const slideWidth = updateSlideWidth();
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
};

const goToNext = () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    goToSlide(currentIndex);
};

const goToPrev = () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    goToSlide(currentIndex);
};

// Boutons manuels
nextBtn.addEventListener('click', () => {
    goToNext();
    resetAutoplay(); // reset timer on click
});

prevBtn.addEventListener('click', () => {
    goToPrev();
    resetAutoplay(); // reset timer on click
});

// Resize
window.addEventListener('resize', () => {
    goToSlide(currentIndex);
});

// AutoPlay
let autoplayInterval = null;

const startAutoplay = () => {
    autoplayInterval = setInterval(goToNext, 4000); // 4 secondes
};

const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
};

startAutoplay();