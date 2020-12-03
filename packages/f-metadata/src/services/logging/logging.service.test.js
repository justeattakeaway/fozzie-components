import { LogService } from './logging.service';

const TEST_LOG_MESSAGE = '__TEST_MESSAGE__';
const TEST_PAYLOAD = {
    test: '__TEST_PAYLOAD__'
};
const $logger = {
    logInfo: jest.fn(),
    logWarn: jest.fn(),
    logError: jest.fn()
};

function loggerCallback (logger) {
    // eslint-disable-next-line func-names
    return function (type, message, payload) {
        logger[type](message, payload);
    };
}

describe('LogService', () => {
    let logService;

    beforeEach(() => {
        logService = new LogService(loggerCallback($logger));
    });

    it('should be initialized with a callback', () => {
        // Assert
        expect(typeof logService.$logger).toBe('function');
    });

    /* eslint-disable indent */
    describe('LogService > callbacks', () => {
        it.each`
            key          | value
            ${'info'}    | ${'logInfo'}
            ${'warn'}    | ${'logWarn'}
            ${'error'}   | ${'logError'}
        `('should for each key call the callback with the relevant log data', ({ key, value }) => {
            // Act
            logService[key](TEST_LOG_MESSAGE, TEST_PAYLOAD);

            // Assert
            expect($logger[value]).toHaveBeenCalledWith(TEST_LOG_MESSAGE, TEST_PAYLOAD);
        });
    });
});
