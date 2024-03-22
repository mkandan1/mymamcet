import { API } from "../constant/api";

export class StudentService {
    static async getAllStudents() {
        return new Promise(async (resolve, reject) => {
            const studentsResult = await API.getRequest('/student');
            if (studentsResult.success) {
                resolve(studentsResult);
            }
            else {
                reject(studentsResult)
            }
        })
    }
}