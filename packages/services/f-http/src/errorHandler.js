/**
    * Reusable method for handling errors while making requests. Errors are handled by callbacks when provided, or re-thrown.
    * @param {object} error - The error object
    * @param {object} errorCallback - Configured callback method for handling global errors
*/
const handleError = (error, errorCallback) => {
    if (errorCallback) {
        errorCallback(error);
    } else {
        // When not handled globally; re-throw
        throw error;
    }
};

export default handleError;
