export const StoreUser = (user) => ({
    type: 'STORE_USER',
    payload: {user}
});

export const ClearUser = () => ({
    type: 'CLEAR_USER',
}) 