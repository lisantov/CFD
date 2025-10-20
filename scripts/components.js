import { isThereArrayInObject } from "./utils.js";

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

export class SelectField {
    element;
    constructor(attrs) {
        this.element = document.createElement('select');
        this.element.classList.add('result-form__select');
        this.setAttributes(attrs);

        if(attrs.type === 'color') {
            this.actualizeBackgroundColor();
            this.element.addEventListener('change', () => this.actualizeBackgroundColor());
        }
    }

    actualizeBackgroundColor() {
        this.element.style.backgroundColor = this.element.options[this.element.selectedIndex].value
    }

    setAttributes(attrs) {
        const keys = Object.keys(attrs);

        keys.forEach((key) => {
            if(!Array.isArray(attrs[key])) {
                this.element.setAttribute(key, attrs[key]);
            }
            else {
                attrs[key].forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    if (attrs.type === 'color') optionElement.style.backgroundColor = option;
                    else optionElement.textContent = option;
                    this.element.appendChild(optionElement);
                })
            }
        })
    }
}

export class Input {
    element;
    constructor(fieldObject) {
        this.element = document.createElement('label');
        this.element.classList.add('result-form__label');
        this.element.textContent = fieldObject.label;

        const field = (isThereArrayInObject(fieldObject.input) && fieldObject.input.type !== 'file') ?
            new SelectField(fieldObject.input) :
            new InputField(fieldObject.input);

        this.element.appendChild(field.element);
    }
}

export class Button {
    element;
    constructor(attrs) {
        this.element = document.createElement('button');
        this.element.classList.add('result-form__button');
        this.setAttributes(attrs);
    }

    setAttributes(attrs) {
        const keys = Object.keys(attrs);

        keys.forEach((key) => {
            if(key === 'text') this.element.textContent = attrs[key];
            else this.element.setAttribute(key, attrs[key]);
        })
    }
}