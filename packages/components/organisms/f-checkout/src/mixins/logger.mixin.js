function buildErrorLogFields (error) {
    return {
        ...(error && error instanceof Error && {
            exception: error.name,
            exceptionMessage: error.message,
            exceptionStackTrace: error.stack,
            traceId: error.traceId || (error.response && error.response.data.traceId)
        })
    };
}

export default {
    methods: {
        /**
         * @function logInvoker
         * @param  {string} message   - Text that will appear in kibana log.
         * @param  {object} data    - Bag of objects that will attempt to be displayed
         *                              as labels and text in the kibana logs.
         * @param  {method} logMethod - The `this.$logger` method that will be executed.
         * @param  {Error} error      - Spread into key/value pairs using the method `buildErrorLogFields`
         *                              and appear in the kibana logs as labels and text.
         */
        logInvoker ({
            message, data, logMethod, error
        }) {
            const errorFields = buildErrorLogFields(error);
            logMethod(message, this.$store, {
                data,
                tags: 'checkout',
                ...errorFields
            });
        }
    }
};
