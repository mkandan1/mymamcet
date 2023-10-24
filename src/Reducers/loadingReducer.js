const initialState = {
    isLoading: true,
}

const loadingReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'SET_LOADING':
            return { isLoading: true};
        case 'REMOVE_LOADING':
            return { isLoading: false };
        default:
            return state;
    }
}

export default loadingReducer;