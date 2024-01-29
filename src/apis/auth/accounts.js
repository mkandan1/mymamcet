import axios from "axios";
import { decryptData, encryptData } from "../../services/encrypt-decrypt";

export const getUser = async () => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/mamcet/user/details`, {
            withCredentials: true
        });

        const result = response.data;
        result.data = decryptData(response.data.data);

        return result
    }
    catch(err){
        console.error(err);
    }
}

export const changeProfilePhoto = async(url)=> {
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/mamcet/user/change-profile-photo`, {data: url}, {
            withCredentials: true
        });
        const result = response.data;
        return result
    }
    catch(err){
        console.error(err);
    }
}