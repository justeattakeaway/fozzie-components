import StatisticsService from '../statistics.service';
import statisticsModule from '../../store/statistics.module';
import defaultConfig from '../../defaultOptions';
import {
    defaultState,
    createStore,
    log,
    basePayload,
    options
} from '../../tests/helpers/setup';

const justLog = {
    info: jest.fn()
};

jest.spyOn(global, 'setInterval');

describe('f-statistics', () => {
    let store,
        storeDispatchSpy,
        registerStoreModuleSpy;

    const mockStore = () => {
        store = createStore({
            state: { ...defaultState },
            actions: statisticsModule.actions,
            mutations: statisticsModule.mutations
        });

        // Hijack and replicate updating the State thru dispatch calls
        storeDispatchSpy = jest.fn((action, payload) => {
            const state = store.state[`${options.namespace}`];
            // eslint-disable-next-line default-case
            switch (action) {
                case `${options.namespace}/addLog`:
                    state.logs = [...state.logs, payload];
                    return;
                case `${options.namespace}/clearLogs`:
                    state.logs = [];
            }
        });
        store.dispatch = storeDispatchSpy;

        registerStoreModuleSpy = jest.fn();
        store.registerModule = registerStoreModuleSpy;
    };

    beforeEach(() => {
        // Arrange - store
        mockStore();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        store = undefined;
        storeDispatchSpy.mockRestore();
    });

    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(StatisticsService).toBeDefined();
    });

    describe('constructor ::', () => {
        it('should preserve state when calling store.registerModule() if the store already contains state', () => {
            // Arrange
            store.state[defaultConfig.namespace] = {};

            // Act
            // eslint-disable-next-line no-unused-vars
            const statisticsService = new StatisticsService(justLog, null, null, store);

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalledWith(options.namespace, expect.anything(), { preserveState: true });
        });
    });


    describe('publish ::', () => {
        it('should define expected publish method', () => {
            // Arrange, Act & Assert
            expect(new StatisticsService(null, null, null, store).publish).toBeDefined();
        });

        it('should add the log to state.logs', () => {
            // Arrange
            const expected = {
                message: log.message,
                payload: {
                    ...basePayload,
                    ...log.payload
                }
            };
            const statisticsService = new StatisticsService(justLog, { logsIntervalTimer: 0 }, null, store);

            // Act
            statisticsService.publish(log.message, { ...log.payload });

            // Assert
            expect(store.state[`${options.namespace}`].logs).toEqual([expected]);
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
            const statisticsService = new StatisticsService(justLog, { logsIntervalTimer: 0 }, null, store);
            statisticsService.publish(expected.message);

            // Assert
            expect(store.state[`${options.namespace}`].logs).toEqual([expected]);
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
            const statisticsService = new StatisticsService(justLog, { logsIntervalTimer: 0 }, { testProperty: expected.payload.testProperty, je_feature: 'a modified value' }, store);
            statisticsService.publish(log.message);

            // Assert
            expect(store.state[`${options.namespace}`].logs).toEqual([expected]);
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
            const statisticsService = new StatisticsService(justLog, { logsIntervalTimer: 0 }, { testProperty: expected.payload.testProperty }, store);
            statisticsService.publish(log.message);

            // Assert
            expect(store.state[`${options.namespace}`].logs).toEqual([expected]);
        });


        it('should call justLog.info when logs.length equal or exceeded', () => {
            // Arrange
            const config = { logsMaxLength: 3, logsIntervalTimer: 0, logsMaxByteSize: 1000 };
            const statisticsService = new StatisticsService(justLog, config, null, store);

            // Act
            statisticsService.publish(log.message, { ...log.payload });
            statisticsService.publish(log.message, { ...log.payload });
            statisticsService.publish(log.message, { ...log.payload });

            // Assert
            expect(justLog.info).toBeCalledTimes(3);
        });

        it('should batch log publishing using length', () => {
            // Arrange
            const config = { logsMaxLength: 2, logsIntervalTimer: 0, logsMaxByteSize: 2000 };
            const statisticsService = new StatisticsService(justLog, config, null, store);

            // Act
            statisticsService.publish(log.message, { ...log.payload });
            statisticsService.publish(log.message, { ...log.payload });

            expect(justLog.info).toBeCalledTimes(2);

            statisticsService.publish(log.message, { ...log.payload });
            statisticsService.publish(log.message, { ...log.payload });

            // Assert
            expect(justLog.info).toBeCalledTimes(4);
        });

        it('should call justLog.info when byte size exceeded', () => {
            // Arrange
            const config = { logsMaxLength: 10, logsMaxByteSize: 500, logsIntervalTimer: 0 };
            const statisticsService = new StatisticsService(justLog, config, null, store);

            // Act
            statisticsService.publish(log.message, { ...log.payload });
            statisticsService.publish(log.message, { ...log.payload });
            statisticsService.publish(log.message, { ...log.payload });

            // Assert
            expect(justLog.info).toBeCalledTimes(3);
        });

        it('should call justLog.info when timer exceeded', () => {
            // Arrange
            const config = { logsMaxLength: 10, logsMaxByteSize: 1000, logsIntervalTimer: 1000 };
            const statisticsService = new StatisticsService(justLog, config, null, store);

            // Act
            statisticsService.publish(log.message, { ...log.payload });
            jest.runTimersToTime(1000);

            // Assert
            expect(justLog.info).toBeCalledTimes(1);
        });

        it('should reset and repeat timer calling Just Log', () => {
            // Arrange
            const config = { logsMaxLength: 10, logsMaxByteSize: 1000, logsIntervalTimer: 1000 };
            const statisticsService = new StatisticsService(justLog, config, null, store);

            // Act
            statisticsService.publish(log.message, { ...log.payload });
            jest.runTimersToTime(1000);

            expect(justLog.info).toBeCalledTimes(1);

            statisticsService.publish(log.message, { ...log.payload });
            statisticsService.publish(log.message, { ...log.payload });
            jest.runTimersToTime(1000);

            expect(justLog.info).toBeCalledTimes(3);
        });
    });
});
