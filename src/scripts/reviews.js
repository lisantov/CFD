// ЭЛЕМЕНТЫ
let reviewsCards = document.querySelectorAll('.reviews__card');
const reviewClasses = ['reviews__card--top', 'reviews__card--right', 'reviews__card--bottom'];
const reviewsContainer = document.querySelector('.reviews');
const structureButton = document.querySelector('.reviews__button');

const reOrderReviews = () => {
    reviewsCards = [reviewsCards[3], reviewsCards[0], reviewsCards[1], reviewsCards[2]];
    reviewsCards.forEach((card, index) => {
        reviewClasses.forEach((className) => card.classList.remove(className));
        if (index > 0) card.classList.add(reviewClasses[index - 1]);
    })
};

const structurizeReviews = () => {
    reviewsCards.forEach((card) => {
        card.removeEventListener('click', reOrderReviews);
        reviewClasses.forEach((className) => card.classList.remove(className));
    });
    structureButton.remove();
    const structuredText = document.querySelector('.reviews__card-text--success');
    structuredText.classList.remove('reviews__card-text--hidden');
};

reviewsCards.forEach((card) => card.addEventListener('click', reOrderReviews));
structureButton.addEventListener('click', structurizeReviews);