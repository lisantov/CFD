// ЭЛЕМЕНТЫ
const languagesButtons = document.querySelectorAll('.header__language');

const selectActiveLanguage = (e) => {
    languagesButtons.forEach((language) => language.classList.remove('header__language--active'));
    e.target.classList.add('header__language--active');
};

languagesButtons.forEach((language) => language.addEventListener('click', selectActiveLanguage));