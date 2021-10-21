/* eslint-disable camelcase */
import StatisticsClient from '../index';

describe('f-statistics', () => {
    const basePayload = {
        je_feature: 'f-statistics',
        je_logType: 'client-stats',
        je_environment: 'test',
        je_feature_for: 'Generic Front End'
    };

    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(StatisticsClient).toBeDefined();
    });

    describe('constructor ::', () => {
        it('should expose base payload when none is provided', () => {
            // Arrange
            const expectedPayload = {
                ...basePayload
            };

            // Act
            const statisticsClient = new StatisticsClient();

            // Assert
            expect(statisticsClient.basePayload).toEqual(expectedPayload);
        });

        it('should merge base payload when additional properties are provided', () => {
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

        it('should use default payload as merge priority over provided payload', () => {
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
});
