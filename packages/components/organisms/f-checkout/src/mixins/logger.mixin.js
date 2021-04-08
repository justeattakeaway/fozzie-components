function BuildErrorLogFields (error) {
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
            const ex = BuildErrorLogFields(error);
            callback(message, this.$store, { data, ...ex });
        }
    }
};
