export const isDataModified = (userData, fetchedData) => {
    for (const key in userData) {
      if (userData.hasOwnProperty(key) && fetchedData.hasOwnProperty(key)) {
        if (userData[key] !== fetchedData[key]) {
          return true;
        }
      }
    }
    return false;
  };