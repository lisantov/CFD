const cover = document.querySelector('.feedback__cover');
const container = document.querySelector('.feedback');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cover.classList.add('feedback__cover--animation');
            return;
        }
        cover.classList.remove('feedback__cover--animation');
    });
});
observer.observe(container);