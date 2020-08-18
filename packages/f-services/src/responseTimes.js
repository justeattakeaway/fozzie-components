import { Histogram } from 'prom-client';

/**
 * Defines a histogram container for prometheus recordings
 *
 */
const RESPONSE_HISTOGRAM = new Histogram({
    name: 'dependency_response_time',
    help: 'Response times from an API dependency in milliseconds',
    labelNames: ['status_code', 'path', 'method'],
    buckets: [1, 5, 10, 50, 100, 500, 1000]
});

/**
 * Record dependency response times
 *
 * @param {object} responseObject
 */
const recordStats = ({
    method, url, statusCode, responseTimeMs
}) => {
    RESPONSE_HISTOGRAM.observe({
        method,
        path: url,
        status_code: statusCode // eslint-disable-line camelcase
    }, responseTimeMs);
};

/**
 * Attach interceptors to the axios client to record response time from an API
 *
 * @param {AxiosInstance} axiosInstance
 */
const setupResponseTimeRecording = ({ interceptors }) => {
    interceptors.request.use(config => {
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        return config;
    });

    interceptors.response.use(response => {
        const timeTakenMs = new Date().getTime() - response.config.meta.requestStartedAt;

        if (process.env.NODE_ENV === 'development') {
            console.log(`Executed (${response.config.url}) in ${timeTakenMs} ms`);
        }

        response.responseTimeMs = timeTakenMs;

        recordStats(response);

        return response;
    });
};

export default setupResponseTimeRecording;
