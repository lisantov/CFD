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

let currentFile;

const handleFileChange = (e) => {
    if(isFileIsJson(e.target.files[0])) {
        formErrorText.textContent = '';
        submitButton.setButtonActive();
    }
    else {
        formErrorText.textContent = 'Невалидный формат файла. Принимается только файлы с содержанием JSON';
        submitButton.setButtonDisabled();
    }
}

formFileInput.addEventListener('change', handleFileChange);