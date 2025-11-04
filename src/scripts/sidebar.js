const wrapper = document.querySelector('.wrapper');
const sidebarButton = document.querySelector('.header__sidebar-button');
const sidebarLinks = document.querySelectorAll('.sidebar__link');
sidebarButton.addEventListener('click', () => wrapper.classList.toggle('wrapper--menu'));
sidebarLinks.forEach(link =>
    link.addEventListener('click', () =>
        wrapper.classList.remove('wrapper--menu')));