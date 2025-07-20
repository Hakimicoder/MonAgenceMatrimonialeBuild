const slider = document.getElementById('slider');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');
const pFooter = document.getElementById('pFooter');

const date = 2025;
pFooter.innerText = `${date} Afromeet - Alls rights reserved.`;

const slides = slider.children;
let currentIndex = 0;
let isTransitioning = false;

// Clone du premier slide
const firstSlide = slides[0].cloneNode(true);
slider.appendChild(firstSlide);

// Largeur d’un slide
const updateSlideWidth = () => slides[0].offsetWidth;

// Aller au slide avec transition
const goToSlide = (index, withTransition = true) => {
    const slideWidth = updateSlideWidth();
    if (withTransition) {
        slider.style.transition = 'transform 0.5s ease-in-out';
    } else {
        slider.style.transition = 'none';
    }
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
};

// Suivant
const goToNext = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    goToSlide(currentIndex);

    // Si on est sur le clone (dernier slide visuel)
    if (currentIndex === slider.children.length - 1) {
        setTimeout(() => {
            currentIndex = 0;
            goToSlide(currentIndex, false); // instantané
            isTransitioning = false;
        }, 500); // correspond à la durée de la transition
    } else {
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
};

// Précédent
const goToPrev = () => {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex === 0) {
        // Aller au clone avant d’aller en arrière
        currentIndex = slider.children.length - 1;
        goToSlide(currentIndex, false); // instantané
        setTimeout(() => {
            currentIndex--;
            goToSlide(currentIndex);
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }, 20);
    } else {
        currentIndex--;
        goToSlide(currentIndex);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
};

// Autoplay
let autoplayInterval = null;

const startAutoplay = () => {
    autoplayInterval = setInterval(goToNext, 4000);
};

const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
};

// Événements
nextBtn.addEventListener('click', () => {
    goToNext();
    resetAutoplay();
});

prevBtn.addEventListener('click', () => {
    goToPrev();
    resetAutoplay();
});

window.addEventListener('resize', () => {
    goToSlide(currentIndex, false);
});

startAutoplay();
