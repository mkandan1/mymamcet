import { configureStore } from '@reduxjs/toolkit'
import { LoginReducer } from './reducer/LoginReducer';
import { LoadingFullScreenReducer, LoadingTopBarReducer } from './reducer/LoadingFullScreen';
import { UserReducer } from './reducer/UserReducer';
const store = configureStore({
    reducer: {
        login: LoginReducer,
        loadingFullScreen: LoadingFullScreenReducer,
        loadingTopBar: LoadingTopBarReducer,
        user: UserReducer
    }
});

export default store;