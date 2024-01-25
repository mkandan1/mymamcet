import CryptoJS from 'crypto-js';

export const encryptData = (data)=> {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_CRYPTO_SECRET_KEY).toString()
    return encryptedData;
}

export const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, import.meta.env.CRYPTO_SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}