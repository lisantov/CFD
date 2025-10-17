export const isFileIsJson = (file) => {
    return file.type === 'application/json' ||
        file.type === 'text/javascript' ||
        file.name.toLowerCase().endsWith('.json');
}

export const readFileAsText = (file, onStart = () => {}, onEnd = () => {}) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onloadstart = () => {
            onStart();
        }

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(new Error('Ошибка чтения файла'));
        }

        reader.onloadend = () => {
            onEnd();
        }
    });
}