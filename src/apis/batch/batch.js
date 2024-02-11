import axios from "axios";
import { encryptData } from '../../services/encrypt-decrypt'
import { API } from "../constant/api";

export class Batch {
    static getQueries = async () => {
        try {
            const response = await API.getRequest('/batch/query'); 
            return response
        }
        catch (err) {
            console.error(err);
            return { success: false, message: "Something went wrong! Please try again" }
        }
    }

    static addBatch = async (data) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const batchResult = await API.postRequest('/batch/add', data);
                if(batchResult.success){
                    resolve(batchResult)
                }
                else{
                    reject(batchResult)
                }
            }
            catch(err){
                console.log(err);
                reject(err.response.data)
            }
        }) 
    }
    static getAllBatches = async () => {
        return new Promise(async(resolve, reject)=> {
            const batchResult = await API.getRequest('/batch/all');
            if(batchResult.success){
                resolve(batchResult)
            }
            else{
                reject(batchResult)
            }
        })
    }

    static editBatchDetails = async (data) => {
        return new Promise(async(resolve, reject)=> {
            const batchResult = await API.putRequest('/batch/edit', data);
            if(batchResult.success){
                resolve(batchResult)
            }
            else{
                reject(batchResult)
            }
        }) 
    }
    
    static getBatchDetails = async (id) => {
        return new Promise(async(resolve, reject)=> {
            const batchResult = await API.getRequest('/batch/'+id);
            if(batchResult.success){
                resolve(batchResult)
            }
            else{
                reject(batchResult)
            }
        })
    }
    
    static updateBatchDetails = async (data) => {
        try {
            const cipherText = encryptData(data);
            const response = await API.putRequest('/batch.')
    
            const result = response.data
            return result
        }
        catch (err) {
            console.error(err);
            return { success: false, message: "Something went wrong! Please try again" }
        }
    }
}