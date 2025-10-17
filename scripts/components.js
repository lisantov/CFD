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

export class SubmitButton {
    element;
    constructor() {
        this.element = document.querySelector('.parser-form__button');
    }


    setButtonActive = () => {
        this.element.disabled = false;
        this.element.classList.remove('parser-form__button--disabled');
        this.element.classList.add('parser-form__button--active');
    }

    setButtonDisabled = () => {
        this.element.disabled = true;
        this.element.classList.remove('parser-form__button--active');
        this.element.classList.add('parser-form__button--disabled');
    }
}
