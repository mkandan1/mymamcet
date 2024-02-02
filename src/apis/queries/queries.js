import axios from "axios"

export const getRegulation = async () => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/queries/regulations`, {
            withCredentials: true
        })
        const result = response.data
        return result
    }
    catch(err){
        return {success: false, message: err.message}
    }
}