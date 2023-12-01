const initialState = {
    showNotification: false,
    notificationMessage: null,
    notificationCode: null
}

const notificationReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'SET_NOTIFICATION_ON':
            return { ...state, showNotification: true, notificationMessage: action.payload.message, notificationCode: action.payload.code};
        case 'SET_NOTIFICATION_OFF':
            return {...state, showNotification: false };
        default:
            return state;
    }
}

export default notificationReducer;