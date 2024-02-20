import axios from "axios";
import { encryptData } from "../../services/encrypt-decrypt";

axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "https://mymamcet.vercel.app/"
export class API {
    static api_link = import.meta.env.VITE_API_URL;
    static async getRequest(endpoint, params) {
        try {
            let url = this.api_link + endpoint;
            if (params) {
                // const queryString = new URLSearchParams(params);
                url += '?' + params;
            }
            const response = await axios.get(url, { withCredentials: true });
            const result = response.data;
            return result;
        }
        catch(err){
            console.error(err.message)
            return err.response.data
        }
    }
    static async postRequest(endpoint, data) {
        const response = await axios.post(this.api_link + endpoint, { data: encryptData(data) }, { withCredentials: true });
        const result = response.data
        return result
    }
    static async putRequest(endpoint, data) {
        const response = await axios.put(this.api_link + endpoint, { data: encryptData(data) }, { withCredentials: true });
        const result = response.data;
        return result
    }
    static async deleteRequest(endpoint, data) {
        const response = await axios.delete(this.api_link + endpoint + `/${data}`, { withCredentials: true })
        const result = response.data;
        return result
    }
}