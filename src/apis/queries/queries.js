import axios from "axios"
import { API } from "../constant/api"

class Queries {
    static getQueries = (query) => {
        return new Promise(async (resolve, reject) => {
            const convertedQuery = this.constructQueriesParams(query)
            const result = await API.getRequest('/queries/query', convertedQuery);
            if(result.success){
                resolve(result)
            }
            else{
                reject(result)
            }
        })
    }

    static getDocuments = (queries) => {
        return new Promise(async (resolve, reject) => {
            try {
                const convertedQuery = this.constructDocumentQueriesParams(queries);
                console.log(convertedQuery);
                const result = await API.getRequest('/queries/documents', convertedQuery);
                if (result.success) {
                    resolve(result);
                } else {
                    reject(result);
                }
            } catch (error) {
                reject({ success: false, message: "Internal Server Error" });
            }
        });
    }

    static getLogs = (logs) => {
        return new Promise(async (resolve, reject)=> {
            const convertedQuery = this.constructLogsParams(logs)
            const result = await API.getRequest('/queries/logs', convertedQuery)
            if(result.success){
                resolve(result)
            }
            else{
                reject(result)
            }
        })
    }

    static constructDocumentQueriesParams(queries) {
        const queryStrings = queries.map(queryObj => {
            const { collectionName, values, responseData } = queryObj;
            // Constructing the query string from values object
            const queryString = Object.entries(values).map(([key, value]) => Object.entries(value).map(([key, value])=> `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)).join('&');
            
            // Constructing the response format string
            const responseFormatString = responseData.join(',');
    
            return `collection=${collectionName}&values=${queryString}&responseFormat=${responseFormatString}`;
        });
    
        return queryStrings;
    }
    
    
    static constructLogsParams(logs){
        const query = logs.join(',')
        return `logs=${query}`
    }

    static constructQueriesParams(queries) {
        const query = queries.map(query => {
            const { collectionName, fields } = query;
            const fieldArray = Array.isArray(fields) ? fields : [fields];
            const fieldString = fieldArray.join(',');
            return `${collectionName}=${fieldString}`;
        }).join('&');
    
        return query;
    }    
}

export { Queries }

export const getRegulation = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/queries/regulations`, {
            withCredentials: true
        })
        const result = response.data
        return result
    }
    catch (err) {
        return { success: false, message: err.message }
    }
}