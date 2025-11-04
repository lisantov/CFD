// ЭЛЕМЕНТЫ
const languagesButtons = document.querySelectorAll('.header__language');
const sidebarLanguagesButtons = document.querySelectorAll('.sidebar__language');

const selectActiveLanguage = (targetIndex) => {
    languagesButtons.forEach((language, index) => {
        if (index === targetIndex) language.classList.add('header__language--active')
        else language.classList.remove('header__language--active');
    });
    sidebarLanguagesButtons.forEach((language, index) => {
        if (index === targetIndex) language.classList.add('sidebar__language--active')
        else language.classList.remove('sidebar__language--active');
    });
};

languagesButtons.forEach((language, index) => language.addEventListener('click', () => selectActiveLanguage(index)));
sidebarLanguagesButtons.forEach((language, index) => language.addEventListener('click', () => selectActiveLanguage(index)));