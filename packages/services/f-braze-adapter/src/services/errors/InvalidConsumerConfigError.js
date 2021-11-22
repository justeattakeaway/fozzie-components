class InvalidConsumerConfigError extends Error {
    constructor (message) {
        super(message);
        this.name = 'InvalidConsumerConfigError';
    }
}

export default InvalidConsumerConfigError;
