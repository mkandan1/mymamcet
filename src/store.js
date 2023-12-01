import { createStore, combineReducers } from "redux";
import  authReducer  from "./Reducers/authReducer";
import  loadingReducer  from "./Reducers/loadingReducer"
import toggleMenuReducer from "./Reducers/toggleMenuReducer";
import notificationReducer from "./Reducers/notificationReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    toggle: toggleMenuReducer,
    notification: notificationReducer
});

const store = createStore(rootReducer);

export default store;