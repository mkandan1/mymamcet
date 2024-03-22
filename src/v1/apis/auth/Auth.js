import { logOut, setLoggedIn } from '../../redux/actions/authActions';
import { API } from '../constant/api'

class Authorization {
    static async onAuthState(dispatch) {
        try {
            const userAuthStateResult = await API.getRequest('/auth/user-state')
            if (!userAuthStateResult.success) {
                return dispatch(logOut())
            }
            dispatch(setLoggedIn({ user: userAuthStateResult.user }))
            return
        }
        catch(err){
            console.error(err.message)
        }
    }
}

export class Auth {

    static async signInWithEmailAndPassword(loginCredentials) {
        // Email, Password => loginCredentials
        const loginResult = await API.postRequest('/auth/login', loginCredentials);
        if (!loginResult.success) {
            return loginResult;
        }
        return loginResult;
    }

    static async signUpWithEmailAndPassword(newUserDetails) {
        // firstName, lastName, Name, Email, Phone, Address, Job Title, role, department => newUserDetails
        const signUpResult = await API.postRequest('/auth/register', newUserDetails);
        return signUpResult;
    }

    static async logOut(dispatch){
        try{
            return new Promise(async(resolve, reject)=> {
                const logOutResult = await API.getRequest('/auth/logOut');

                if(logOutResult.success){
                    dispatch(logOut())
                    resolve(logOutResult)
                }
                else{
                    reject(logOutResult)
                }
            })
        }
        catch(err){
            return err
        }
    }

    static async changeProfilePhoto(url) {
        try {
            const changePhotoURLResult = await API.putRequest('/auth/change-profile-photo', { url: url })
            return changePhotoURLResult
        }
        catch (err) {
            console.error(err);
        }
    }

    static async init(dispatch) {
        this.isloggedIn = await Authorization.onAuthState(dispatch);
    }
}

export const auth = new Auth();