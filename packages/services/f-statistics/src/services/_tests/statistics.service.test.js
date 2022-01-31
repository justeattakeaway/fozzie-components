import StatisticsService from '../statistics.service';
import statisticsModule from '../../store/statistics.module';
import defaultConfig from '../../defaultOptions';
import {
    log,
    basePayload
} from '../../tests/helpers/setup';

const store = {
    state: {},
    dispatch: jest.fn(),
    registerModule: jest.fn()
};
const justLog = jest.fn();

describe('f-statistics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(StatisticsService).toBeDefined();
    });

    describe('constructor ::', () => {
        it('should call store.registerModule() to register the statisticsModule', () => {
            // Act
            // eslint-disable-next-line no-unused-vars
            const statisticsService = new StatisticsService(justLog, null, null, store);

            // Assert
            expect(store.registerModule).toHaveBeenLastCalledWith(defaultConfig.namespace, statisticsModule, { preserveState: false });
        });
        it('should preserve state when calling store.registerModule() if the store already contains state', () => {
            // Arrange
            store.state[defaultConfig.namespace] = {};

            // Act
            // eslint-disable-next-line no-unused-vars
            const statisticsService = new StatisticsService(justLog, null, null, store);

            // Assert
            expect(store.registerModule).toHaveBeenLastCalledWith(defaultConfig.namespace, statisticsModule, { preserveState: true });
        });
        it('should merge base payload when additional properties are provided', () => {
            // Arrange
            const expected = {
                message: 'This is a message',
                payload: {
                    ...basePayload,
                    testProperty: 'this is a test'
                }
            };

            // Act
            const statisticsService = new StatisticsService(justLog, null, { testProperty: expected.payload.testProperty }, store);
            statisticsService.publish(log.message);

            // Assert
            expect(store.dispatch).toBeCalledWith(expect.any(String), { justLog, log: expected });
        });

        it('should use default payload as merge priority over provided payload', () => {
            // Arrange
            const expected = {
                message: 'This is a message',
                payload: {
                    ...basePayload,
                    testProperty: 'this is a test'
                }
            };

            // Act
            // eslint-disable-next-line camelcase
            const statisticsService = new StatisticsService(justLog, null, { testProperty: expected.payload.testProperty, je_feature: 'a modified value' }, store);
            statisticsService.publish(log.message);

            // Assert
            expect(store.dispatch).toBeCalledWith(expect.any(String), { justLog, log: expected });
        });
    });


    describe('publish ::', () => {
        it('should define expected publish method', () => {
        // Arrange, Act & Assert
            expect(new StatisticsService(null, null, null, store).publish).toBeDefined();
        });

        it('should call store `addToPublishQueue` action passing the log', () => {
            // Arrange
            const expectedLogObject = {
                message: log.message,
                payload: {
                    ...basePayload,
                    ...log.payload
                }
            };
            const statisticsService = new StatisticsService(justLog, null, null, store);

            // Act
            statisticsService.publish(log.message, { ...log.payload });

            // Assert
            expect(store.dispatch).toBeCalledWith(`${defaultConfig.namespace}/addToPublishQueue`, { justLog, log: expectedLogObject });
        });

        it('should expose base payload when none is provided', () => {
            // Arrange
            const expected = {
                message: 'This is a message',
                payload: {
                    ...basePayload
                }
            };

            // Act
            const statisticsService = new StatisticsService(justLog, null, null, store);
            statisticsService.publish(expected.message);

            // Assert
            expect(store.dispatch).toBeCalledWith(expect.any(String), { justLog, log: expected });
        });
    });
});
