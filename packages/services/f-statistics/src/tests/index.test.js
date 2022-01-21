/* eslint-disable no-import-assign */
/* eslint-disable camelcase */
import StatisticsClient from '../index';
import * as config from '../config';

jest.mock('../config', () => ({
    __esModule: true,
    IS_BATCH_PUBLISHING_ENABLED: false,
    BATCH_QUEUE_SIZE: 5,
    BATCH_INTERVAL_TIMER: 0
}));


jest.spyOn(global, 'setInterval');

describe('f-statistics', () => {
    const basePayload = {
        je_feature: 'f-statistics',
        je_logType: 'client-stats',
        je_environment: 'test',
        je_feature_for: 'Generic Front End'
    };

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(StatisticsClient).toBeDefined();
    });

    describe('constructor ::', () => {
        it.skip('should expose base payload when none is provided', () => {
            // Arrange
            const expectedPayload = {
                ...basePayload
            };

            // Act
            const statisticsClient = new StatisticsClient();

            // Assert
            expect(statisticsClient.basePayload).toEqual(expectedPayload);
        });

        it.skip('should merge base payload when additional properties are provided', () => {
            // Arrange
            const expectedPayload = {
                ...basePayload,
                a_test_property: 'this is a test'
            };

            // Act
            const statisticsClient = new StatisticsClient(null, null, { a_test_property: 'this is a test' });

            // Assert
            expect(statisticsClient.basePayload).toEqual(expectedPayload);
        });

        it.skip('should use default payload as merge priority over provided payload', () => {
            // Arrange
            const expectedPayload = {
                ...basePayload,
                a_test_property: 'this is a test'
            };

            // Act
            const statisticsClient = new StatisticsClient(null, null, {
                a_test_property: 'this is a test',
                je_feature: 'a modified value'
            });

            // Assert
            expect(statisticsClient.basePayload).toEqual(expectedPayload);
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
            expect(new StatisticsClient().publish).toBeDefined();
        });

        describe('single log publishing', () => {
            beforeEach(() => {
                config.IS_BATCH_PUBLISHING_ENABLED = false;
            });

            it('should publish logs with expected properties', () => {
                // Arrange
                const statisticsClient = new StatisticsClient(justLogMock, null, null);

                const expectedPayload = {
                    ...basePayload,
                    testValue: 'A test value'
                };

                // Act
                statisticsClient.publish('Test message', { testValue: 'A test value' });

                // Assert
                expect(publications[0]).toEqual(expectedPayload);
            });

            it('should publish logs with additional base payload properties when provided', () => {
                // Arrange
                const statisticsClient = new StatisticsClient(justLogMock, null, { a_base_payload_property: 'This is a test' });

                const expectedPayload = {
                    ...basePayload,
                    a_base_payload_property: 'This is a test'
                };

                // Act
                statisticsClient.publish('Test message', {});

                // Assert
                expect(publications[0]).toEqual(expectedPayload);
            });
        });

        describe.skip('batch log publishing', () => {
            let statisticsClient;
            beforeEach(() => {
                config.IS_BATCH_PUBLISHING_ENABLED = true;
            });

            it('should not publish logs immediately', () => {
                // Arrange
                statisticsClient = new StatisticsClient(justLogMock, null, null);

                // Act
                statisticsClient.publish('Test message', { testValue: 'A test value' });
                statisticsClient.publish('Test message', { testValue: 'B test value' });

                // Assert
                expect(publications.length).toEqual(0);
            });

            it('should publish logs when BATCH_QUEUE_SIZE is met', () => {
                // Arrange
                statisticsClient = new StatisticsClient(justLogMock, null, null);

                // Act
                statisticsClient.publish('Test message', { testValue: 'A test value' });
                statisticsClient.publish('Test message', { testValue: 'B test value' });
                statisticsClient.publish('Test message', { testValue: 'C test value' });
                statisticsClient.publish('Test message', { testValue: 'D test value' });
                statisticsClient.publish('Test message', { testValue: 'E test value' });

                // Assert
                expect(publications.length).toEqual(5);
            });
            it('should publish logs when  is met', async () => {
                // Arrange
                config.BATCH_INTERVAL_TIMER = 2000;
                statisticsClient = new StatisticsClient(justLogMock, null, null);

                // Act
                statisticsClient.publish('Test message', { testValue: 'A test value' });
                statisticsClient.publish('Test message', { testValue: 'B test value' });

                // Assert
                jest.useRealTimers();
                jest.runOnlyPendingTimers();
                expect(publications.length).toEqual(2);
            });
        });
    });
});
