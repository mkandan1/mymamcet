export const isObjectEmpty = (obj) => {
    let result = false
    for (let key in obj) {
        if (obj[key] == '') {
            result = true
        }
    }
    return result;
};