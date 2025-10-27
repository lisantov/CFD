const cover = document.querySelector('.promo__cover');
const outTrigger = document.getElementById('promo-out');
const inTrigger = document.querySelector('.promo');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id !== 'promo-out') {
            cover.classList.add('promo__cover--in');
            return;
        }
        else if (entry.isIntersecting && entry.target.id === 'promo-out') {
            cover.classList.add('promo__cover--out');
            return;
        }
        cover.classList.remove('promo__cover--in');
        cover.classList.remove('promo__cover--out');
    });
});
observer.observe(inTrigger);
observer.observe(outTrigger);