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
    constructor(attrs, callback) {
        this.element = document.createElement('input');
        this.element.classList.add('result-form__input');
        this.setAttributes(attrs, callback);
    }

    setAttributes(attrs, callback) {
        const keys = Object.keys(attrs);

        keys.forEach((key) => {
            if(!Array.isArray(attrs[key])) {
                this.element.setAttribute(key, attrs[key]);
            }
            else {
                this.element.setAttribute('list', key);
                callback({ [key]: attrs[key] });
            }
        })
    }
}

export class Input {
    element;
    datalistElement = null;
    constructor(fieldObject) {
        this.element = document.createElement('label');
        this.element.classList.add('result-form__label');
        this.element.textContent = fieldObject.label;
        const field = new InputField(fieldObject.input, (data) => this.createDatalist(data));
        this.element.appendChild(field.element);
        if (this.datalistElement !== null) this.element.appendChild(this.datalistElement);
    }

    createDatalist(data) {
        const keys = Object.keys(data);
        const id = keys[0];
        const datalist = document.createElement('datalist');
        datalist.id = id;
        data[id].forEach((value) => {
           const option = document.createElement('option');
           option.value = value;
           datalist.appendChild(option);
        });
        this.datalistElement = datalist;
    }
}