import axios from "axios";
import { encryptData } from "../../services/encrypt-decrypt";
import { API } from "../constant/api";

export const fetchQueries = async(program, department) => {
    try{
        const cipherText = encryptData({program, department});
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/subject/queries`, {data: cipherText}, {
            withCredentials: true
        });
        const result = response.data
        return result
    }
    catch(err){
        console.error(err);
        return { success: false, message: "Something went wrong! Please try again" }
    }
}

export const addSemester = async (data) => {
    try{
        const cipherText = encryptData(data)
        const response = axios.post(`${import.meta.env.VITE_API_URL}/api/v1/semester/add`, {data: cipherText}, {withCredentials: true});
        const result = response.data
        console.log(result);
        return result
    }
    catch(err){
        console.error(err);
        return result= {success: false, message: err.response.data.message}
    }
}