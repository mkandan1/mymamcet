import axios from "axios";
import { encryptData } from '../../services/encrypt-decrypt'

export const getQueries = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/batch/query`, {
            withCredentials: true
        })

        const result = response.data
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const addBatch = async (data) => {
    try {
        const cipherText = encryptData(data)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/batch/add`, { data: cipherText }, {
            withCredentials: true
        })

        const result = response.data
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: err.response.data.message }
    }
}

export const getAllBatches = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/batch/all`, {
            withCredentials: true
        })

        const result = response.data
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const getBatchDetails = async (id) => {
    try {
        const cipherText = encryptData({id: id});
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/batch/details`,{data: cipherText}, {
            withCredentials: true
        })

        const result = response.data
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const updateBatchDetails = async (data) => {
    try {
        const cipherText = encryptData(data);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/batch/update`,{data: cipherText}, {
            withCredentials: true
        })

        const result = response.data
        return result
    }
    catch (err) {
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}