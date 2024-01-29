import axios from "axios";

export const addEmployeesToDB = async (formData)=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/mamcet/user/add`, formData);
        const result = response.data;
        if(result.success){
            return result
        }

        throw new Error(result);
    }
    catch(err){
        console.error(err.message)
        return {success: false, message: err.message}
    }
}