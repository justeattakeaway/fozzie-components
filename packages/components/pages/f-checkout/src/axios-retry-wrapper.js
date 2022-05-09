const retryWrapper = (axios, options = { retryAmount: 1 }) => {
    let retries = 0;
    axios.interceptors.response.use(null, error => {
        const { config, response } = error;
        const { retryAmount, statusCodes } = options;

        if (
            retries < retryAmount &&
        (!statusCodes || statusCodes.includes(response.status))
        ) {
            retries++;
            return new Promise(resolve => {
                resolve(axios(config));
            });
        }
        return Promise.reject(error);
    });
};

export default retryWrapper;
