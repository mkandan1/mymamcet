const initialState = {
    status: true,
}

const toggleMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU_OPEN':
            return { status: true };
        case 'TOGGLE_MENU_CLOSE':
            return { status: false };
        default:
            return state;
    }
};

export default toggleMenuReducer;