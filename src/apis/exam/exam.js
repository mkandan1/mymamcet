import { API } from "../constant/api"

export class Exam {
    static async getStudentsAndSemester(data) {
        try {
            return new Promise(async (resolve, reject) => {
                const query = this.constructParams(data);
                const studentsAndSemesterResult = await API.getRequest('/exam/students-and-semester', query);
                if (studentsAndSemesterResult.success) {
                    resolve(studentsAndSemesterResult);
                } else {
                    reject(studentsAndSemesterResult);
                }
            });
        } catch (err) {
            console.error(err);
            throw new Error('Error in getStudentsAndSemester');
        }
    }

    static constructParams(obj) {
        return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
    }

    static async getSubjects(batch) {
        try {
            console.log(batch);
            const subjects = [];
            for (const semester of batch.semesters) {
                for (const subject of semester.subjects) {
                    subjects.push(subject);
                }
            }
            return subjects;
        } catch (err) {
            console.error(err);
            throw new Error('Error in getSubjects');
        }
    }

    static async getStudents(batch) {
        try {
            return batch.students;
        } catch (err) {
            console.error(err);
            throw new Error('Error in getStudents');
        }
    }
}
