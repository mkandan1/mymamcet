const initialState = {
    show: false,
}

export const LoadingFullScreenReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SHOW':
            return {
                ...state,
                show: true
            };
        case 'HIDE':
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}

const topBarInitialState = {
    show: false,
}


export const LoadingTopBarReducer = (state = topBarInitialState, action) => {
    switch (action.type){
        case 'SHOW':
            return {
                ...state,
                show: true
            };
        case 'HIDE':
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}