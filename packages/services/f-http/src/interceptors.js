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
            method: res.config.method.toUpperCase(),
            url: res.config.url,
            status: res.status,
            responseTimeMs: res.responseTimeMs
        };

        statisticsClient.publish({
            payload
        });

        return res;
    });
};

export default {
    captureResponseStatistics
};
