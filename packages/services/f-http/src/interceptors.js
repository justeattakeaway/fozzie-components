/**
 * Attach interceptors to the axios client to record response time from an API
 *
 * @param {AxiosInstance} axiosInstance
 * @param {object} statsClient An initialised instance of f-statistics
 */
const captureResponseStatistics = ({ interceptors }, statisticsClient) => {
    interceptors.request.use(req => {
        req.meta = req.meta || {};
        req.meta.requestStartedAt = new Date().getTime();

        return req;
    });

    interceptors.response.use(res => {
        const timeTakenMs = new Date().getTime() - res.config.meta.requestStartedAt;
        res.responseTimeMs = timeTakenMs;

        const payload = {
            'cs-method': res.config.method.toUpperCase(),
            'cs-uri-stem': `${res.config.baseURL}${res.config.url}`,
            'sc-status': res.status,
            'time-taken': res.responseTimeMs
        };

        statisticsClient.publish(`${payload['cs-method']} request to ${payload['cs-uri-stem']} took ${payload['time-taken']}ms`, payload);

        return res;
    });
};

export default {
    captureResponseStatistics
};
