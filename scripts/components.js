export class Loader {
    element;

    constructor(template, root) {
        this.element = template.querySelector('.loader');
        root.appendChild(this.element);
    }

    show = () => this.element.classList.add('loader--loading');

    hide = () => this.element.classList.remove('loader--loading');
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

export class InputField {
    element;
    constructor(attrs) {
        this.element = document.createElement('input');
        this.element.classList.add('result-form__input');
        this.setAttributes(attrs);
    }

    setAttributes(attrs) {
        const keys = Object.keys(attrs);

        keys.forEach((key) => {
            this.element.setAttribute(key, attrs[key]);
        })
    }
}

export class Input {
    element;
    constructor(fieldObject) {
        this.element = document.createElement('label');
        this.element.classList.add('result-form__label');
        this.element.textContent = fieldObject.label;
        const field = new InputField(fieldObject.input);
        this.element.appendChild(field.element);
    }
}