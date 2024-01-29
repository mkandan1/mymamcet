import axios from "axios"
import { showNotification } from "../../redux/actions/notification";
import { logOut, loggedIn } from "../../redux/actions/authActions";
import { decryptData } from "../../services/encrypt-decrypt";

axios.defaults.withCredentials = true;

let user;

export const getUser = async(dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/mamcet/user/details`, {
            withCredentials: true
        });
    
        const result = response.data;
        result.data = decryptData(result.data)
        if (!result.success && !result.user) {
            dispatch(showNotification({ type: "error", message: "Session has expired" }));
            user = false
            dispatch(logOut())
            return result
        }
        else {
            dispatch(loggedIn({user: result.data}));
            user = true
            return result
        }
    }
    catch (err) {
        dispatch(showNotification({ type: "error", message: "Session has expired" }))
        return err
    }
}

export const authorization = async (dispatch) => {
  const result = await getUser(dispatch);
  return user
}

export const logOutUser = async (dispatch, navigate) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/mamcet/auth/logOut`, {
            withCredentials: true
        });
    
        const result = response.data;

        if(result.success){
            dispatch(logOut());
            window.location.href = "/v1/auth/login"
        }
        else{
            dispatch(showNotification({type: "error", message: "Can not log out"}))
        }
    }
    catch(err){

    }
}
