const initialState = {
    email: null,
    firstName: null,
    lastName: null,
    dob: null,
    country_code: null,
    ph_no: null,
    designation: null,
    photo: null
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type){
        case 'STORE_USER':
            return {
                ...state,
                email:  action.payload.user.email,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                dob: action.payload.user.dob,
                country_code: action.payload.user.country_code,
                ph_no: action.payload.user.ph_no,
                photo: action.payload.user.photo,
                designation: action.payload.user.designation
            };
        case 'CLEAR_USER':
            return {
                ...state,
                email: null,
                firstName: null,
                lastName: null,
                dob: null,
                country_code: null,
                ph_no: null,
                designation: null
            }
        default:
            return state;
    }
}