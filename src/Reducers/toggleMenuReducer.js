const initialState = {
    status: true,
};

const toggleMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU_OPEN':
            return {
                ...state,
                status: true,
            };
        case 'TOGGLE_MENU_CLOSE':
            return {
                ...state,
                status: false,
            };
        default:
            return state;
    }
};

export default toggleMenuReducer;
