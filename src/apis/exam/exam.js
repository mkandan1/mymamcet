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

    static async updateScores(data){
        return new Promise(async (resolve, reject) => {
            try {
                const updateScoreResult = await API.putRequest('/exam/update-score', data);

                if (updateScoreResult.success) {
                    resolve(updateScoreResult);
                } else {
                    reject(updateScoreResult);
                }
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    static async storeScores(scoreArray) {
        return new Promise(async (resolve, reject) => {
            try {
                const addScoreResult = await API.postRequest('/exam/add-score', scoreArray);

                if (addScoreResult.success) {
                    resolve(addScoreResult);
                } else {
                    reject(addScoreResult);
                }
            }
            catch (err) {
                return reject(err)
            }
        });
    }

    static constructParams(obj) {
        return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
    }

    static async getSubjects(batch) {
        try {
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
