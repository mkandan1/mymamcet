export const notificationReducer = (state = { show: false, type: '', message: '' }, action) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
        return {
          show: true,
          type: action.payload.type,
          message: action.payload.message,
        };
        break
      case 'HIDE_NOTIFICATION':
        return {
          ...state,
          show: false
        };
        break
      default:
        return state;
    }
  };
  