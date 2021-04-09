function buildErrorLogFields (error) {
    return {
        ...(error && error instanceof Error && {
            exception: error.name,
            exceptionMessage: error.message,
            exceptionStackTrace: error.stack
        })
    };
}

export default {
    methods: {
        logInvoker (message, data, callback, error) {
            const errorFields = buildErrorLogFields(error);
            callback(message, this.$store, { data, ...errorFields });
        }
    }
};
