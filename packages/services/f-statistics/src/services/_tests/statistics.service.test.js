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

const justLog = jest.fn();

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
            if (action === `${options.namespace}/addLog`) {
                state.logs = [...state.logs, payload];
            }
        });
        store.dispatch = storeDispatchSpy;

        registerStoreModuleSpy = jest.fn();
        store.registerModule = registerStoreModuleSpy;
    };

    beforeEach(() => {
        // Arrange - store
        mockStore();
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
            const statisticsService = new StatisticsService(justLog, null, null, store);

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
            const statisticsService = new StatisticsService(justLog, null, null, store);
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
            const statisticsService = new StatisticsService(justLog, null, { testProperty: expected.payload.testProperty, je_feature: 'a modified value' }, store);
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
            const statisticsService = new StatisticsService(justLog, null, { testProperty: expected.payload.testProperty }, store);
            statisticsService.publish(log.message);

            // Assert
            expect(store.state[`${options.namespace}`].logs).toEqual([expected]);
        });
    });
});
