export class Preloader {
    element;
    constructor(template) {
        this.element = template.querySelector('.preloader');
    }


    showPreloader = () => {
        this.element.classList.add('loading');
    }

    hidePreloader = () => {
        this.element.classList.remove('loading');
    }
}
