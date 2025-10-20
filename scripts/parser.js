import { Loader, SubmitButton, Input, Button, References } from './components.js';
import { isFileIsJson, readFileAsText } from './utils.js';

// ЭЛЕМЕНТЫ
const form = document.querySelector('.parser-form');
const formErrorText = document.querySelector('.parser-form__error');
const formFileInput = document.querySelector('.parser-form__input');
const resetButton = document.getElementById('reset-button');

let currentResultForm;

const wrap = document.querySelector('.wrapper');

const loaderTemplate = document.getElementById('loader-template');

// КОМПОНЕНТЫ
const loader = new Loader(loaderTemplate.content, form);
const submitButton = new SubmitButton();

// ТЕКУЩИЙ ВАЛИДНЫЙ ФАЙЛ
let currentFile;

// СОЖЕРЖИМОЕ ФАЙЛА
let contentsOfFile;

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(isFileIsJson(file)) {
        formErrorText.textContent = '';
        submitButton.setButtonActive();
        currentFile = file;
    }
    else {
        formErrorText.textContent = 'Невалидный формат файла. Принимается только файлы с содержанием JSON';
        submitButton.setButtonDisabled();
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    readFileAsText(currentFile)
        .then((data) => {
            loader.show();
            return JSON.parse(data);
        })
        .then((result) => {
            contentsOfFile = result;

            // Намеренная задержка, чтобы показать лоадер
            setTimeout(() => {
                form.classList.add('parser-form--hidden');
                createForm(wrap);
                resetButton.classList.remove('reset-button--hidden');
            }, 1000)

        })
        .catch((err) => {
            formErrorText.textContent = err;
        })
        .finally(() => {

            // Намеренная задержка, чтобы показать лоадер
            setTimeout(() => loader.hide(), 1000);

        });
}

const createForm = (root) => {
    const resultForm = document.createElement('form');
    currentResultForm = resultForm;
    resultForm.classList.add('result-form');
    if (contentsOfFile.name) resultForm.name = contentsOfFile.name;
    if (contentsOfFile.fields) contentsOfFile.fields.forEach((fieldData) => {
        const field = new Input(fieldData);
        resultForm.appendChild(field.element);
    });
    if (contentsOfFile.references) {
        const refs = new References(contentsOfFile.references);
        resultForm.appendChild(refs.element);
    }
    if (contentsOfFile.buttons) contentsOfFile.buttons.forEach((buttonData) => {
        const button = new Button(buttonData);
        resultForm.appendChild(button.element);
    })

    root.appendChild(resultForm);
}

const handleReset = () => {
    form.classList.remove('parser-form--hidden');
    form.reset();
    resetButton.classList.add('reset-button--hidden');
    if (currentResultForm) currentResultForm.remove();
}

formFileInput.addEventListener('change', handleFileChange);
form.addEventListener('submit', handleSubmit);
resetButton.addEventListener('click', handleReset);