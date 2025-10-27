const cover = document.querySelector('.hero__cover');
const outTrigger = document.getElementById('hero-out');
const inTrigger = document.querySelector('.hero');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.target.id === "hero-out") {
            cover.classList.add('hero__cover--out');
            return;
        }
        else if (entry.isIntersecting && entry.target.id !== "hero-out") {
            cover.classList.add('hero__cover--in');
            return;
        }
        cover.classList.remove('hero__cover--in')
        cover.classList.remove('hero__cover--out');
    });
});
observer.observe(inTrigger);
observer.observe(outTrigger);