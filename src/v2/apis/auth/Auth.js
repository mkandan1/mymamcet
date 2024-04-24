import { API } from "../api"
import { StoreUser } from '../../redux/action/UserActions'

class Auth {

    static loginWithEmailAndPassword(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await API.postRequest('/auth/login', { email, password });
                if (result.success) {
                    localStorage.setItem('mamcet_auth', true);
                    resolve(result)
                }
                else {
                    reject(result)
                }
            }
            catch (err) {
                console.log(err.response);
                reject(err.response.data)
            }
        })
    }

    static Authorization = (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await API.getRequest('/auth/user-state')
                if (result.success) {
                    dispatch(StoreUser(result.user))
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