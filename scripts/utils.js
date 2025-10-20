export const isFileIsJson = (file) => {
    return file.type === 'application/json' ||
        file.type === 'text/javascript' ||
        file.name.toLowerCase().endsWith('.json');
}

export const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(new Error('Ошибка чтения файла'));
        }
    });
}

export const isThereArrayInObject = (obj) => {
    let result = false;
    const values = Object.values(obj);
    values.forEach((val) => {
        (Array.isArray(val) || result) ? result = true : result = false;
    });
    return result;
}