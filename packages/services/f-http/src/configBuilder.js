/**
 * Build Axios Config payload
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns config object
 */
const configBuilder = (headers = {}) => {
    const config = {
        headers
    };

    return config;
};

export default configBuilder;
