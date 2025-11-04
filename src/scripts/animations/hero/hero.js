import { useObserverForAnimation } from "../animationUtils.js";

const cover = document.querySelector('.hero__cover');
const outTrigger = document.getElementById('hero-out');

useObserverForAnimation(cover, [{
    trigger: outTrigger,
    class: 'hero__cover--out',
    invert: true
}]);