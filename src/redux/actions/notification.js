export const showNotification = ({ type, message }) => ({
    type: 'SHOW_NOTIFICATION',
    payload: { type, message },
  });

  export const hideNotification = () => ({
    type: 'HIDE_NOTIFICATION',
  });
  