import {areFilesValid, getRawNumbers, isThereArrayInObject, maskValue} from "./utils.js";

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

        if(attrs.type === 'file') this.element.classList.add('hidden-element');
        this.setAttributes(attrs);
    }

    setAttributes(attrs) {
        const keys = Object.keys(attrs);

        keys.forEach((key) => {
            if (key === 'filetype') {
                this.element.addEventListener('change', () => {
                    if (!areFilesValid(this.element.files, attrs[key])) {
                        this.element.value = '';
                        alert('Неподходящий формат файла');
                    }
                })
            }
            if (key === 'mask') {
                const mask = attrs[key];
                this.element.type = 'text';
                this.element.addEventListener('input', (e) => {
                    this.element.value = maskValue(e.target.value, mask);
                })
                this.element.addEventListener('keydown', (e) =>{
                    if(e.key === 'Backspace') {
                        const rawValue = getRawNumbers(e.target.value);

                        // Не получится удалить конкретный символ, всё удаляется с конца строки
                        this.element.value = maskValue(rawValue.slice(0, rawValue.length - 1), mask);
                    }
                })
            }
            else this.element.setAttribute(key, attrs[key]);
        })
    }
}

export class SelectField {
    element;
    choiceContainer;
    constructor(attrs, name) {
        this.element = document.createElement('div');
        this.element.classList.add('result-form__select-wrapper');

        const title = document.createElement('p');
        title.classList.add('result-form__label');
        title.textContent = name;

        this.element.appendChild(title);

        this.choiceContainer = document.createElement('div');
        this.choiceContainer.classList.add('result-form__select-container');

        this.setAttributes(attrs);

        this.element.appendChild(this.choiceContainer);

        if (!attrs.multiple)
            this.choiceContainer.addEventListener("click", (e) => {
                e.stopPropagation();
                this.choiceContainer.childNodes.forEach(label => {
                    if(label.textContent === e.target.value) {
                        label.classList.add('result-form__select--checked');
                    } else label.classList.remove('result-form__select--checked');
                })
            })
    }

    setAttributes(attrs) {
        const keys = Object.keys(attrs);

        keys.forEach((key) => {
            if(!Array.isArray(attrs[key])) {
                this.choiceContainer.setAttribute(key, attrs[key]);
            }
            else {
                attrs[key].forEach((option) => {
                    const labelElement = document.createElement('label');
                    labelElement.classList.add('result-form__select');
                    if (attrs.type === 'color') labelElement.style.backgroundColor = option;
                    labelElement.textContent = option;

                    const optionElement = document.createElement('input');
                    attrs.multiple ? optionElement.type = 'checkbox' : optionElement.type = 'radio';
                    optionElement.classList.add('hidden-element');
                    optionElement.value = option;
                    optionElement.name = 'select';
                    if (attrs.multiple)
                        optionElement.addEventListener("click", (e) => {
                            e.stopPropagation();
                            return optionElement.checked ?
                                labelElement.classList.add('result-form__select--active') :
                                labelElement.classList.remove('result-form__select--active')
                        });

                    labelElement.appendChild(optionElement);

                    this.choiceContainer.appendChild(labelElement);
                })
            }
        })
    }
}

export class Input {
    element;
    isSelect;
    constructor(fieldObject) {
        this.element = document.createElement('label');
        this.element.classList.add('result-form__label');
        this.element.textContent = fieldObject.label;

        this.isSelect = isThereArrayInObject(fieldObject.input) && fieldObject.input.type !== 'file';

        const field = this.isSelect ?
            new SelectField(fieldObject.input, fieldObject.label) :
            new InputField(fieldObject.input);

        if (fieldObject.input.type === 'file') {
            this.element.textContent = '🔗 ' + fieldObject.label;
            this.element.classList.add('result-form__custom-input');
            let counter = 0;
            this.element.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            this.element.addEventListener('dragenter', (e) => {
                this.element.classList.add("result-form__custom-input--active");
                counter++;
            })

            this.element.addEventListener('dragleave', (e) => {
                counter--;
                if (counter === 0)
                    this.element.classList.remove("result-form__custom-input--active");
            })

            this.element.addEventListener("drop", (e) => {
                e.preventDefault();
                this.element.classList.remove("result-form__custom-input--active");
                field.element.files = e.dataTransfer.files;
                field.element.dispatchEvent(new Event('change'));
                const topFiles = Array.from(field.element.files).map((file) => file.name);
                this.element.textContent = `🔗 Выбрано: ${topFiles[0]} ${topFiles.length > 1 ? `и ещё(${topFiles.length - 1})` : ''}`;
            })
        }

        this.isSelect ?
            this.element = field.element :
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

export class Reference {
    element;
    constructor(data) {
        this.element = document.createElement('p');
        this.element.classList.add('result-form__ref');

        if (data['text without ref']) this.element.textContent = `${data["text without ref"]} `;
        if (data.text) {
            const link = document.createElement('a');
            link.classList.add('result-form__link');
            link.href = `#${data.ref}`;
            link.textContent = data.text;
            this.element.appendChild(link);
        }
    }
}

export class References {
    element;
    constructor(attrs) {
        this.element = document.createElement('div');
        this.element.classList.add('result-form__refs');

        let i = 0;

        while (i < attrs.length) {
            if (attrs[i].input && i + 1 < attrs.length) {
                const ref = this.createRefWithCheckbox(attrs[i], attrs[i + 1]);
                this.element.appendChild(ref);
                i += 2;
            }
            else {
                const ref = new Reference(attrs[i]);
                this.element.appendChild(ref.element);
                i++;
            }
        }
    }

    createRefWithCheckbox(checkboxInfo, refInfo) {
        const container = document.createElement('label');
        container.classList.add('result-form__ref-container');

        const checkboxElement = new InputField(checkboxInfo.input);
        const refElement = new Reference(refInfo);

        container.appendChild(checkboxElement.element);
        container.appendChild(refElement.element);

        return container;
    }
}