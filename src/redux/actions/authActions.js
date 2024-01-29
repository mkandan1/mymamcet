export const loggedIn = ({user}) => ({
    type: 'LOGGED_IN',
    payload: {user}
});

export const logOut = () => ({
    type: 'LOG_OUT',
});