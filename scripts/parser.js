import { Loader, SubmitButton, Input, Button, References } from './components.js';
import { areFilesValid, readFileAsText } from './utils.js';

// ЭЛЕМЕНТЫ
const form = document.querySelector('.parser-form');
const formErrorText = document.querySelector('.parser-form__error');
const formFileInput = document.querySelector('.parser-form__input');
const resetButton = document.getElementById('reset-button');
const customInput = document.querySelector('.parser-form__custom-input');
const wrap = document.querySelector('.wrapper');
const loaderTemplate = document.getElementById('loader-template');
let currentResultForm;

// СЛУШАТЕЛИ ДЛЯ КАСТОМНОГО ИНПУТА
let counter = 0;
customInput.addEventListener('dragover', (e) => {
    e.preventDefault();
});

customInput.addEventListener('dragenter', (e) => {
    customInput.classList.add("parser-form__custom-input--active");
    counter++;
})

customInput.addEventListener('dragleave', (e) => {
    counter--;
    if (counter === 0)
        customInput.classList.remove("parser-form__custom-input--active");
})

customInput.addEventListener("drop", (e) => {
    e.preventDefault();
    customInput.classList.remove("parser-form__custom-input--active");
    formFileInput.files = e.dataTransfer.files;
    formFileInput.dispatchEvent(new Event('change'));
})

// КОМПОНЕНТЫ
const loader = new Loader(loaderTemplate.content, form);
const submitButton = new SubmitButton();

// ТЕКУЩИЙ ВАЛИДНЫЙ ФАЙЛ
let currentFile;

// СОЖЕРЖИМОЕ ФАЙЛА
let contentsOfFile;

const handleFileChange = () => {
    const file = formFileInput.files[0];
    const title = document.getElementById('file-title');
    if (!file) {
        formErrorText.textContent = '';
        submitButton.setButtonDisabled();
        title.textContent = `Выберите файл или перетащите его сюда`;
    }
    else if(areFilesValid(formFileInput.files, ['.js', '.json'])) {
        formErrorText.textContent = '';
        submitButton.setButtonActive();
        currentFile = file;
        title.textContent = `Выбран: ${file.name}`;
    }
    else {
        formErrorText.textContent = 'Невалидный формат файла. Принимаются только .js, .json';
        submitButton.setButtonDisabled();
        title.textContent = `Выберите файл или перетащите его сюда`;
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
    formFileInput.dispatchEvent(new Event('change'));
    resetButton.classList.add('reset-button--hidden');
    if (currentResultForm) currentResultForm.remove();
}

formFileInput.addEventListener('change', handleFileChange);
form.addEventListener('submit', handleSubmit);
resetButton.addEventListener('click', handleReset);
