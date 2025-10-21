export const areFilesValid = (files, extensions) => {
    let result = false;
    for(let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        extensions.forEach(ext => {
            if (!result && fileName.includes(ext)) result = true
        })
    }
    return result;
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

export const maskValue = (value, mask) => {
    const rawMask = getRawNumbers(mask);

    // Чуть чуть захардкодил, но я ненавижу делать маски
    const numbers = getRawNumbers(value)[0] === rawMask[0] ? getRawNumbers(value).slice(1) : getRawNumbers(value);
    let numberIndex = 0;
    let result = '';

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '9') {
            if (numberIndex < numbers.length) {
                result += numbers[numberIndex];
                numberIndex++;
            } else {
                result += '_';
            }
        } else {
            result += mask[i];
        }
    }

    return result;
}

export const getRawNumbers = (value) => value.replace(/\D/g, '');