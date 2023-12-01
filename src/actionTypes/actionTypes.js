export const LOGIN = () => ({
    type: 'LOGIN'
})

export const LOGOUT = () => ({
    type: 'LOGOUT'
})

export const SET_LOADING = () => ({
    type: 'SET_LOADING'
})

export const REMOVE_LOADING = () => ({
    type: 'REMOVE_LOADING'
})

export const TOGGLE_MENU_OPEN = () => ({
    type: 'TOGGLE_MENU_OPEN'
})

export const TOGGLE_MENU_CLOSE = () => ({
    type: 'TOGGLE_MENU_CLOSE'
})

export const SET_NOTIFICATION_ON = (code, message) => ({
    type: 'SET_NOTIFICATION_ON',
    payload: {code, message}
})

export const SET_NOTIFICATION_OFF = () => ({
    type: 'SET_NOTIFICATION_OFF'
})