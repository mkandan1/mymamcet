import axios from "axios";
import { API } from '../constant/api'

export class SubjectServices {
    static async addSubject(data) {
        return new Promise(async (resolve, reject) => {
            const addedSubjectResult = await API.postRequest('/subject/add', data);

            if (addedSubjectResult.success) {
                resolve(addedSubjectResult)
            }
            else {
                reject(addedSubjectResult)
            }
        })
    }

    static async getAllSubjects() {
        return new Promise(async (resolve, reject) => {
            const subjectsResult = await API.getRequest('/subject/all')

            if (subjectsResult.success) {
                resolve(subjectsResult)
            }
            else {
                reject(subjectsResult)
            }
        })
    }

    static async deleteSubject(subjectId) {
        return new Promise(async (resolve, reject) => {
            const deletionResult = await API.deleteRequest('/subject', subjectId);

            if (deletionResult.success) {
                resolve(deletionResult)
            }
            else {
                reject(deletionResult)
            }
        })
    }

    static async getSubjectDetails(subjectId) {
        return new Promise(async (resolve, reject) => {
            const subjectResult = await API.getRequest('/subject/' + subjectId);

            if (subjectResult.success) {
                resolve(subjectResult)
            }
            else {
                reject(subjectResult)
            }
        })
    }

    static async editSubject(subject) {
        return new Promise(async (resolve, reject) => {
            const editSubjectResult = await API.putRequest('/subject/edit', subject);

            if (editSubjectResult.success) {
                resolve(editSubjectResult)
            }
            else {
                reject(editSubjectResult)
            }
        })
    }
}