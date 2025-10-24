// ЭЛЕМЕНТЫ СЛАЙДЕРА
const container = document.querySelector('.steps__content-slider');
const slides = document.querySelectorAll('.steps__content-tab');
const scrollToSlide = (slideIndex) => container.style.transform = `translateX(${-100 * slideIndex}%)`;
slides.forEach((slide) => {
    const tabButtons = slide.querySelectorAll('.steps__header-text');
    tabButtons.forEach((tab, index) => tab.addEventListener('click', () => scrollToSlide(index)))
})