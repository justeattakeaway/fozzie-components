/* eslint-disable camelcase */
import StatisticsService from '../statistics.service';

const basePayload = {
    je_feature: 'f-statistics',
    je_logType: 'client-stats',
    je_environment: 'test',
    je_feature_for: 'Generic Front End'
};

const log = {
    message: 'This is a message',
    payload: {
        alpha: 'alpha',
        beta: 'beta'
    }
};

const justLog = {
    info: jest.fn()
};

jest.spyOn(global, 'setInterval');

describe('f-statistics', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(StatisticsService).toBeDefined();
    });


    describe('publish ::', () => {
        it('should define expected publish method', () => {
            // Arrange, Act & Assert
            expect(new StatisticsService(null, null, null).publish).toBeDefined();
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
            const statisticsService = new StatisticsService(justLog, { logsMaxLength: 1, logsIntervalTimer: 0 }, null);
            statisticsService.publish(expected.message);

            // Assert
            expect(justLog.info).toHaveBeenCalledWith(expected.message, expected.payload);
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
            const statisticsService = new StatisticsService(justLog, { logsMaxLength: 1, logsIntervalTimer: 0 }, { testProperty: expected.payload.testProperty, je_feature: 'a modified value' });
            statisticsService.publish(log.message);

            // Assert
            expect(justLog.info).toHaveBeenCalledWith(expected.message, expected.payload);
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
            const statisticsService = new StatisticsService(justLog, { logsMaxLength: 1, logsIntervalTimer: 0 }, { testProperty: expected.payload.testProperty });
            statisticsService.publish(log.message);

            // Assert
            expect(justLog.info).toHaveBeenCalledWith(expected.message, expected.payload);
        });


        it('should call justLog.info when logs.length equal or exceeded', () => {
            // Arrange
            const config = { logsMaxLength: 3, logsIntervalTimer: 0, logsMaxByteSize: 1000 };
            const statisticsService = new StatisticsService(justLog, config, null);

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
            const statisticsService = new StatisticsService(justLog, config, null);

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
            const statisticsService = new StatisticsService(justLog, config, null);

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
            const statisticsService = new StatisticsService(justLog, config, null);

            // Act
            statisticsService.publish(log.message, { ...log.payload });
            jest.runTimersToTime(1000);

            // Assert
            expect(justLog.info).toBeCalledTimes(1);
        });

        it('should reset and repeat timer calling Just Log', () => {
            // Arrange
            const config = { logsMaxLength: 10, logsMaxByteSize: 1000, logsIntervalTimer: 1000 };
            const statisticsService = new StatisticsService(justLog, config, null);

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
