import axios from "axios";
import { decryptData, encryptData } from "../../services/encrypt-decrypt";

export const addSubject = async (data) => {
    try {
        const cipherText = encryptData(data);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subject/add`, {data: cipherText}, {
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

export const getAllSubjects = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/subject/all`, {
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


export const getSubjectDetails = async(courseId) => {
    try {
        const cipherText = encryptData(courseId);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subject/details`,{data: cipherText}, {
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

export const editSubjectDetails = async(data) => {
    try {
        const cipherText = encryptData(data);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subject/edit`,{data: cipherText}, {
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

export const deleteSubject = async(subjectId) => {
    try {
        const cipherText = encryptData(subjectId);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subject/delete`,{data: cipherText}, {
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