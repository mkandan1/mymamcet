import { configureStore } from '@reduxjs/toolkit'
import { userRoleReducer } from './reducers/roleReducer'
import { notificationReducer } from './reducers/notificationReducer';
import { authReducers } from './reducers/authReducers';

const store = configureStore({
    reducer: {
        userRoles: userRoleReducer,
        notification: notificationReducer,
        auth: authReducers
    }
});

export default store;