import axios from "axios";
import { encryptData } from "../../services/encrypt-decrypt";
import { API } from "../constant/api";

export class SubjectMappingServices {
    static async addSemester(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const semesterResult = await API.postRequest('/semester', data)
                if (semesterResult.success) {
                    resolve(semesterResult)
                }
                else {
                    reject(semesterResult)
                }
            }
            catch (err) {
                reject(err)
            }
        })
    }

    static async getAllSemster() {
        return new Promise(async (resolve, reject) => {
            const semesterResult = await API.getRequest('/semester')
            if (semesterResult.success) {
                resolve(semesterResult)
            }
            else {
                reject(semesterResult)
            }
        })
    }

    static async editSemester(data) {
        return new Promise(async (resolve, reject) => {
            const semesterResult = await API.putRequest('/semester', data)
            if (semesterResult.success) {
                resolve(semesterResult)
            }
            else {
                reject(semesterResult)
            }
        })
    }
}