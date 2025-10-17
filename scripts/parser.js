import { Preloader } from './components';
import { isFileIsJson, readFileAsText } from './utils';

const form = document.querySelector('.parser-form');
const formFileInput = document.querySelector('.parser-form__input');

const preloaderTemplate = document.getElementById('preloader-template');
const preloader = new Preloader(preloaderTemplate.content);

let currentFile;