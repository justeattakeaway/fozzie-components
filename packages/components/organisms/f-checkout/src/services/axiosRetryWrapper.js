/**
 * @param  {Error}  error
 * @return {boolean}
 */
function isRetryableError (error) {
    return (
        error.code !== 'ECONNABORTED' &&
      (!error.response || (error.response.status >= 500 && error.response.status <= 599))
    );
}


const retryWrapper = (axios, options = { retryAmount: 3 }) => {
    let counter = 0;
    axios.interceptors.response.use(null, error => {
        const { config } = error;
        const { retryAmount } = options;

        if (
            counter < retryAmount && isRetryableError(error)
        ) {
            counter++;
            return new Promise(resolve => {
                resolve(axios(config));
            });
        }
        return Promise.reject(error);
    });
};

export default retryWrapper;


