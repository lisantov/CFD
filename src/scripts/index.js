import './steps.js';
import './reviews.js';
import './languageSelect.js';
import './sidebar.js';

import './animations/hero.js';
import './animations/steps.js';
import './animations/promo.js';
import './animations/feedback.js';

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const blocks = [header, ...main.children, footer];
let currentBlock = 0;
let isScrollBlocked = false;

let lastScrollPosition = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'pageUp' || e.key === 'pageDown') e.preventDefault();
});

document.onscroll = (e) => {
    e.preventDefault();
    const currentScrollPosition = window.scrollY;

    if (!isScrollBlocked && currentScrollPosition > lastScrollPosition) {
        if (currentBlock < blocks.length - 1) {
            isScrollBlocked = true;
            currentBlock++;
            location.hash = "#" + blocks[currentBlock].id;
            setTimeout(() => isScrollBlocked = false, 700);
        }
    }
    else {
        if (!isScrollBlocked && currentBlock > 0) {
            isScrollBlocked = true;
            currentBlock--;
            location.hash = "#" + blocks[currentBlock].id;
            setTimeout(() => isScrollBlocked = false, 700);
        }
    }

    lastScrollPosition = currentScrollPosition;
};