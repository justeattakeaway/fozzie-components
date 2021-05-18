const outputToConsole = response => {
    const outputString = `${response.config.method.toUpperCase()}|${response.config.url}|${response.status}|${response.responseTimeMs}ms`;

    console.log(outputString);	// eslint-disable-line
};

/**
 * Attach interceptors to the axios client to record response time from an API
 *
 * @param {AxiosInstance} axiosInstance
 * @param {Boolean} `isDevelopment` option flag - if provided and is true then the api stats are outputted to the console
 */
const addTimingInterceptor = ({ interceptors }, isDevelopment) => {
    interceptors.request.use(req => {
        req.meta = req.meta || {};
        req.meta.requestStartedAt = new Date().getTime();

        return req;
    });

    interceptors.response.use(res => {
        const timeTakenMs = new Date().getTime() - res.config.meta.requestStartedAt;
        res.responseTimeMs = timeTakenMs;

        if (isDevelopment) {
            outputToConsole(res);
        } else {
            // TODO : Output to stats engine
        }

        return res;
    });
};

export default {
    addTimingInterceptor
};
