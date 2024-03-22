import { configureStore } from '@reduxjs/toolkit'
import { LoginReducer } from './reducer/LoginReducer';
import { LoadingFullScreenReducer, LoadingTopBarReducer } from './reducer/LoadingFullScreen';
const store = configureStore({
    reducer: {
        login: LoginReducer,
        loadingFullScreen: LoadingFullScreenReducer,
        loadingTopBar: LoadingTopBarReducer
    }
});

export default store;