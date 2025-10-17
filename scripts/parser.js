import { Loader, SubmitButton } from './components.js';
import { isFileIsJson, readFileAsText } from './utils.js';

// ЭЛЕМЕНТЫ
const form = document.querySelector('.parser-form');
const formErrorText = document.querySelector('.parser-form__error');
const formFileInput = document.querySelector('.parser-form__input');

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
        .then((result) => contentsOfFile = result)
        .catch((err) => {
            formErrorText.textContent = err;
        })
        .finally(() => {
            loader.hide();
        });
}

formFileInput.addEventListener('change', handleFileChange);
form.addEventListener('submit', handleSubmit);