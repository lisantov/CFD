import { useObserverForAnimation } from "../animationUtils.js";

const cover = document.querySelector('.promo__cover');
const outTrigger = document.getElementById('promo-out');
const inTrigger = document.querySelector('.promo');

useObserverForAnimation(cover, [{
    trigger: outTrigger,
    class: 'promo__cover--out',
    invert: false
},
{
    trigger: inTrigger,
    class: 'promo__cover--in',
    invert: false
}])