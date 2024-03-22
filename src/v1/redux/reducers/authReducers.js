const initialState = {
    loggedin: false,
    user: null
}

export const authReducers = (state = initialState, action) => {
    switch (action.type){
        case 'LOGGED_IN':
            return {
                ...state,
                loggedin: true,
                user: action.payload
            };
        case 'LOG_OUT':
            return {
                ...state,
                loggedin: false,
                user: null
            }
        default:
            return state;
    }
}