// ЭЛЕМЕНТЫ
let reviewsCards = document.querySelectorAll('.reviews__card');
const reviewClasses = ['reviews__card--top', 'reviews__card--right', 'reviews__card--bottom'];
const reviewsContainer = document.querySelector('.reviews__container');
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
    const structuredText = document.createElement('p');
    structuredText.classList.add('reviews__card-text reviews__card-text--success');
    structuredText.textContent = 'Котики структурированы!';
    reviewsContainer.appendChild(structuredText);
};

reviewsCards.forEach((card) => card.addEventListener('click', reOrderReviews));
structureButton.addEventListener('click', structurizeReviews);