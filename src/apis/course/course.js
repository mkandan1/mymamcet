import axios from "axios"
import { decryptData, encryptData } from '../../services/encrypt-decrypt'

export const addNewCourse = async (data) => {
    try {
        const cipherText = encryptData(data);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/course/add`, {data: cipherText}, {
            withCredentials: true
        });
        const result = response.data;
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const getAllCourse = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/course/all`, {
            withCredentials: true
        });
        const result = response.data;
        result.data = decryptData(result.data)
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const getCourseDetails = async(courseId) => {
    try {
        const cipherText = encryptData(courseId);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/course/details`,{data: cipherText}, {
            withCredentials: true
        });
        const result = response.data;
        result.data = decryptData(result.data)
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const editCourseDetails = async(data) => {
    try {
        const cipherText = encryptData(data);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/course/edit`,{data: cipherText}, {
            withCredentials: true
        });
        const result = response.data;
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const deleteCourse = async(courseId) => {
    try {
        const cipherText = encryptData(courseId);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/course/delete`,{data: cipherText}, {
            withCredentials: true
        });
        const result = response.data;
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}