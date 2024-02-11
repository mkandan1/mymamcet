export const getID = () => {
    const path = new URL(window.location).pathname
    const arrayOfPaths = path.split('/');
    return arrayOfPaths[arrayOfPaths.length - 1]
}