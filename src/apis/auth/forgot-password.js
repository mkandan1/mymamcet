import axios from 'axios';
import { encryptData } from '../../services/encrypt-decrypt';

export const forgotPassword = async (email) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return { success: false, message: "Invalid email format" };
        }

        const data = { email: email };
        const cipherText = encryptData(data);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`, {
            data: cipherText
        });

        const result = response.data;

        return result
    }
    catch (err) {
        return new Error(err);
    }
}