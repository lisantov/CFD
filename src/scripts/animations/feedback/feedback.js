import { useObserverForAnimation } from "../animationUtils.js";

const cover = document.querySelector('.feedback__cover');
const container = document.querySelector('.feedback');

useObserverForAnimation(cover, [{
    trigger: container,
    class: 'feedback__cover--animation',
    invert: false
}]);