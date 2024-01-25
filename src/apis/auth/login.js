import axios from 'axios';
import CryptoJS from 'crypto-js';

export const signInUser = async (email, password) => {
  try {
    const data = { email: email.toLowerCase(), password };
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_CRYPTO_SECRET_KEY).toString();

    const response = await axios.post('http://localhost:3035/api/v1/auth/login', {
      data: cipherText
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Error during sign in');
  }
};

