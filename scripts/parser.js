import { Loader, SubmitButton, Input } from './components.js';
import { isFileIsJson, readFileAsText } from './utils.js';

// ЭЛЕМЕНТЫ
const form = document.querySelector('.parser-form');
const formErrorText = document.querySelector('.parser-form__error');
const formFileInput = document.querySelector('.parser-form__input');

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
            form.classList.add('parser-form--hidden');
            createForm(wrap);
        })
        .catch((err) => {
            formErrorText.textContent = err;
        })
        .finally(() => {
            loader.hide();
        });
}

const createForm = (root) => {
    const resultForm = document.createElement('form');
    resultForm.classList.add('result-form');
    if (contentsOfFile.name) resultForm.name = contentsOfFile.name;
    if (contentsOfFile.fields) contentsOfFile.fields.forEach((fieldData) => {
        const field = new Input(fieldData);
        resultForm.appendChild(field.element);
    });

    console.log(resultForm);
    root.appendChild(resultForm);
}

formFileInput.addEventListener('change', handleFileChange);
form.addEventListener('submit', handleSubmit);