import { configureStore } from '@reduxjs/toolkit'
import { userRoleReducer } from './reducers/roleReducer'

const store = configureStore({
    reducer: {
        userRoles: userRoleReducer
    }
});

export default store;