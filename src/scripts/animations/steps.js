const cover = document.querySelector('.steps__cover');
const inTrigger = document.querySelector('.steps');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cover.classList.add('steps__cover--animation');
            return;
        }
        cover.classList.remove('steps__cover--animation');
    });
});
observer.observe(inTrigger);