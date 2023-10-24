import { createStore, combineReducers } from "redux";
import  authReducer  from "./Reducers/authReducer";
import  loadingReducer  from "./Reducers/loadingReducer"
import toggleMenuReducer from "./Reducers/toggleMenuReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    toggle: toggleMenuReducer,
});

const store = createStore(rootReducer);

export default store;