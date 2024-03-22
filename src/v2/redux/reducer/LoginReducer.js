const initialState = {
    show: false,
    message: ''
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SHOW_ERROR':
            return {
                ...state,
                show: true,
                message: action.payload.errorMessage
            };
        default:
            return state;
    }
}