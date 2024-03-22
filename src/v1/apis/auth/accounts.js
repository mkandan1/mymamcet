import axios from "axios";
import { decryptData, encryptData } from "../../services/encrypt-decrypt";

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