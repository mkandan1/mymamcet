import axios from "axios"
import { decryptData, encryptData } from '../../services/encrypt-decrypt'
import { API } from "../constant/api";

export class CourseServices {
    static async addNewCourse(data) {
        const newCourseReslt = await API.postRequest('/course/add', data);
        return newCourseReslt
    }

    static async getAllCourse(){
        return new Promise(async(resolve, reject)=> {
            const coursesResult = await API.getRequest('/course/all');
            if(coursesResult.success){
                resolve(coursesResult);
            }
            else{
                reject(coursesResult)
            }
        })
    }
    static async getCourseDetails(courseId){
        return new Promise(async(resolve, reject)=> {
            const courseDetailResult = await API.getRequest('/course/'+courseId);
            if(courseDetailResult){
                resolve(courseDetailResult)
            }
            else{
                reject(courseDetailResult)
            }
        })
    }

    static async deleteCourse(courseId){
        return new Promise(async(resolve, reject)=> {
            const courseDeletionResult = await API.deleteRequest('/course', courseId);
            
            if(courseDeletionResult.success){
                resolve(courseDeletionResult)
            }
            else{
                reject(courseDeletionResult)
            }
        })
    }

    static async editCourse(course){
        return new Promise(async(resolve, reject)=> {
            const editCourseResult = await API.putRequest('/course/edit', course);

            if(editCourseResult.success){
                resolve(editCourseResult)
            }
            else{
                reject(editCourseResult)
            }
        })
    }
}
