export class SemesterService {
    constructor() {
        
    }

    async getSemester(program, department, batchName) {
        try {
            const fetchedSemester = API.getRequest('/semester/getSemester', {program, department, batchName})
            console.log(fetchedSemester);
        } catch (err) {
            console.error(err);
            return { success: false, message: "Something went wrong! Please try again" };
        }
    }
}