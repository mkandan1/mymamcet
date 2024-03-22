export const LoggingFailed = (errorMessage) => ({
    type: 'SHOW_ERROR',
    payload: {errorMessage}
});