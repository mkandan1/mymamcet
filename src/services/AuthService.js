import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../FirebaseConfig"
import { useDispatch } from "react-redux"
import { SET_NOTIFICATION_ON } from "../actionTypes/actionTypes";

export const getUserIdToken = () => {
   return new Promise((resolve, reject)=>{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            user.getIdToken().then((idToken)=> {
                resolve(idToken);
            })
        }
        else {
            reject(new Error('User not logged in'))
        }
    })
   })
}