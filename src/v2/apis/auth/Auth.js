import { API } from "../api"

class Auth {

    static loginWithEmailAndPassword(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await API.postRequest('/auth/login', { email, password });
                if (result.success) {
                    resolve(result)
                }
                else {
                    reject(result)
                }
            }
            catch (err) {
                reject(err.response.data)
            }
        })
    }

    static Authorization = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await API.getRequest('/auth/user-state')
                if (result.success) {
                    resolve(result)
                }
                else {
                    reject(reject)
                }
            }
            catch(err){
                reject(err.response.data)
            }
            
        })
    }
}

export default Auth