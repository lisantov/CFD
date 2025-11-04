import { useObserverForAnimation } from "../animationUtils.js";

const cover = document.querySelector('.steps__cover');
const inTrigger = document.querySelector('.steps');

useObserverForAnimation(cover, [{
    trigger: inTrigger,
    class: 'steps__cover--animation',
    invert: false
}]);