const cover = document.querySelector('.hero__cover');
const outTrigger = document.getElementById('hero-out');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            cover.classList.add('hero__cover--out');
            return;
        }
        cover.classList.remove('hero__cover--out');
    });
});
observer.observe(outTrigger);