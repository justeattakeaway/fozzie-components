/* eslint-disable no-import-assign */
/* eslint-disable camelcase */
import StatisticsService from '../statistics.service';
import statisticsModule from '../../store/statistics.module';
import * as config from '../../config';
import {
    defaultState,
    createStore
} from '../../tests/helpers/setup';

jest.mock('../../config', () => ({
    __esModule: true,
    IS_BATCH_PUBLISHING_ENABLED: false,
    BATCH_QUEUE_SIZE: 5,
    BATCH_INTERVAL_TIMER: 0
}));


jest.spyOn(global, 'setInterval');

describe('f-statistics', () => {
    let store,
        registerStoreModuleSpy;

    const basePayload = {
        je_feature: 'f-statistics',
        je_logType: 'client-stats',
        je_environment: 'test',
        je_feature_for: 'Generic Front End'
    };

    const mockStore = () => {
        store = createStore({
            state: { ...defaultState },
            actions: statisticsModule.actions,
            mutations: statisticsModule.mutations
        });

        registerStoreModuleSpy = jest.fn();
        store.registerModule = registerStoreModuleSpy;
    };

    beforeEach(() => {
        mockStore();

        jest.useFakeTimers();
    });

    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(StatisticsService).toBeDefined();
    });

    describe('constructor ::', () => {
        it.skip('should expose base payload when none is provided', () => {
            // Arrange
            const expectedPayload = {
                ...basePayload
            };

            // Act
            const statisticsService = new StatisticsService();

            // Assert
            expect(statisticsService.basePayload).toEqual(expectedPayload);
        });

        it.skip('should merge base payload when additional properties are provided', () => {
            // Arrange
            const expectedPayload = {
                ...basePayload,
                a_test_property: 'this is a test'
            };

            // Act
            const statisticsService = new StatisticsService(null, null, { a_test_property: 'this is a test' });

            // Assert
            expect(statisticsService.basePayload).toEqual(expectedPayload);
        });

        it.skip('should use default payload as merge priority over provided payload', () => {
            // Arrange
            const expectedPayload = {
                ...basePayload,
                a_test_property: 'this is a test'
            };

            // Act
            const statisticsService = new StatisticsService(null, null, {
                a_test_property: 'this is a test',
                je_feature: 'a modified value'
            });

            // Assert
            expect(statisticsService.basePayload).toEqual(expectedPayload);
        });
    });

    describe('publish ::', () => {
        let publications = [];

        const justLogMock = {
            info: (message, payload) => {
                publications = [
                    payload,
                    ...publications
                ];
            }
        };

        beforeEach(() => {
            publications = [];
        });

        it('should define expected publish method', () => {
        // Arrange, Act & Assert
            expect(new StatisticsService(null, null, null, store).publish).toBeDefined();
        });

        describe('single log publishing', () => {
            beforeEach(() => {
                config.IS_BATCH_PUBLISHING_ENABLED = false;
            });

            it('should publish logs with expected properties', () => {
                // Arrange
                const statisticsService = new StatisticsService(justLogMock, null, null, store);

                const expectedPayload = {
                    ...basePayload,
                    testValue: 'A test value'
                };

                // Act
                statisticsService.publish('Test message', { testValue: 'A test value' });

                // Assert
                expect(publications[0]).toEqual(expectedPayload);
            });

            it('should publish logs with additional base payload properties when provided', () => {
                // Arrange
                const statisticsService = new StatisticsService(justLogMock, null, { a_base_payload_property: 'This is a test' }, store);

                const expectedPayload = {
                    ...basePayload,
                    a_base_payload_property: 'This is a test'
                };

                // Act
                statisticsService.publish('Test message', {});

                // Assert
                expect(publications[0]).toEqual(expectedPayload);
            });
        });

        describe.skip('batch log publishing', () => {
            let statisticsService;
            beforeEach(() => {
                config.IS_BATCH_PUBLISHING_ENABLED = true;
            });

            it('should not publish logs immediately', () => {
                // Arrange
                statisticsService = new StatisticsService(justLogMock, null, null, store);

                // Act
                statisticsService.publish('Test message', { testValue: 'A test value' });
                statisticsService.publish('Test message', { testValue: 'B test value' });

                // Assert
                expect(publications.length).toEqual(0);
            });

            it('should publish logs when BATCH_QUEUE_SIZE is met', () => {
                // Arrange
                statisticsService = new StatisticsService(justLogMock, null, null, localStorage);

                // Act
                statisticsService.publish('Test message', { testValue: 'A test value' });
                statisticsService.publish('Test message', { testValue: 'B test value' });
                statisticsService.publish('Test message', { testValue: 'C test value' });
                statisticsService.publish('Test message', { testValue: 'D test value' });
                statisticsService.publish('Test message', { testValue: 'E test value' });

                // Assert
                expect(publications.length).toEqual(5);
            });
            it('should publish logs when  is met', async () => {
                // Arrange
                config.BATCH_INTERVAL_TIMER = 2000;
                statisticsService = new StatisticsService(justLogMock, null, null, store);

                // Act
                statisticsService.publish('Test message', { testValue: 'A test value' });
                statisticsService.publish('Test message', { testValue: 'B test value' });

                // Assert
                jest.useRealTimers();
                jest.runOnlyPendingTimers();
                expect(publications.length).toEqual(2);
            });
        });
    });
});
