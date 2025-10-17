import { Preloader, SubmitButton } from './components.js';
import { isFileIsJson, readFileAsText } from './utils.js';

// ЭЛЕМЕНТЫ
const form = document.querySelector('.parser-form');
const formErrorText = document.querySelector('.parser-form__error');
const formFileInput = document.querySelector('.parser-form__input');

const preloaderTemplate = document.getElementById('preloader-template');

// КОМПОНЕНТЫ
const preloader = new Preloader(preloaderTemplate.content);
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
        .then((data) => JSON.parse(data))
        .then((result) => contentsOfFile = result)
        .catch((err) => {
            formErrorText.textContent = err;
        })
}

formFileInput.addEventListener('change', handleFileChange);
form.addEventListener('submit', handleSubmit);